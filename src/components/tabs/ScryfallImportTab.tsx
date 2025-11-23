/**
 * Scryfall Import Tab Component
 * Import card data from Scryfall API
 */

import { memo } from 'react';
import { Box, Button, Heading, HStack, VStack, Text } from '@chakra-ui/react';
import { Checkbox } from '../ui/checkbox';
import { toaster } from '../ui/toaster-instance';
import { LabeledInput, LabeledSelect } from '../ui';
import { useCardStore } from '../../store/cardStore';
import { useMediaStore } from '../../store/mediaStore';
import { useImageLoader } from '../../hooks/useImageLoader';
import { useState, useMemo, useEffect } from 'react';
import { convertToSmartQuotes } from '../../utils/smartQuotes';
import {
  retryAsync,
  isNetworkError,
  isRateLimitError,
  isNotFoundError,
  createError,
  ErrorType,
  logError,
} from '../../utils/errors';
import { TEXT_FIELDS } from '../../constants';

const languages = [
  { label: 'English', value: 'en' },                                          
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Italian', value: 'it' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Russian', value: 'ru' },
  { label: 'Simplified Chinese', value: 'zhs' },
  { label: 'Traditional Chinese', value: 'zht' },
  { label: 'Phyrexian', value: 'ph' },

];

interface ScryfallCard {
  name: string;
  set: string;
  collector_number: string;
  id: string;
  mana_cost?: string;
  type_line?: string;
  rarity: string;
  oracle_text?: string;
  flavor_text?: string;
  artist?: string;
  lang?: string;
  image_uris?: {
    art_crop?: string;
    [key: string]: unknown;
  };
  card_faces?: Array<{
    name?: string;
    mana_cost?: string;
    type_line?: string;
    oracle_text?: string;
    flavor_text?: string;
    image_uris?: {
      art_crop?: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  }>;
  // Add more Scryfall card fields as needed
  [key: string]: unknown;
}

interface ScryfallApiResponse {
  searchQuery?: string;
  language?: string;
  timestamp?: string;
  object?: string;
  name?: string;
  lang?: string;
  message?: string;
  error?: boolean;
  data?: ScryfallCard[];
  // Add more Scryfall API fields as needed
  [key: string]: unknown;
}

const ScryfallImportTabComponent = () => {
  const [cardName, setCardName] = useState('');
  const [language, setLanguage] = useState('en');
  const [apiResponseData, setApiResponseData] = useState<ScryfallApiResponse | null>(null);
  const [includeAllPrints, setIncludeAllPrints] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');

  // Get actions from card store
  const updateCard = useCardStore((state) => state.updateCard);
  const updateText = useCardStore((state) => state.updateText);
  const updateSetSymbol = useCardStore((state) => state.updateSetSymbol);
  const setSetCode = useCardStore((state) => state.setSetCode);
  const setRarity = useCardStore((state) => state.setRarity);
  const setCollectorSetCode = useCardStore((state) => state.setCollectorSetCode);
  const setCollectorLanguage = useCardStore((state) => state.setCollectorLanguage);
  const setCollectorArtist = useCardStore((state) => state.setCollectorArtist);
  const setCollectorRarity = useCardStore((state) => state.setCollectorRarity);
  const setCollectorDigits = useCardStore((state) => state.setCollectorDigits);
  const loadedPack = useCardStore((state) => state.loadedPack);
  const defaultSetSymbolRotation = loadedPack?.setSymbolBounds?.rotation ?? 0;

  // Get media actions from media store
  const updateArt = useMediaStore((state) => state.updateArt);

  // Get image loader hook
  const { loadSetSymbol, loadArt } = useImageLoader();

  // Format card options for the menu
  const cardOptions = useMemo(() => {
    if (!apiResponseData || !apiResponseData.data || apiResponseData.data.length === 0) {
      return [{ label: 'No cards available', value: '' }];
    }

    const cards = includeAllPrints ? apiResponseData.data : [apiResponseData.data[0]];

    return cards.map((card) => ({
      label: `${card.name} (${card.set.toUpperCase()} #${card.collector_number})`,
      value: card.id,
    }));
  }, [apiResponseData, includeAllPrints]);

  // Hydrate card fields when a card is selected
  useEffect(() => {
    if (!selectedCard || !apiResponseData?.data) return;

    // Find the selected card in the API response
    const card = apiResponseData.data.find((c) => c.id === selectedCard);
    if (!card) return;

    // Update the title field with the card name
    updateText(TEXT_FIELDS.TITLE, { text: card.name });

    // Update the mana field with the mana cost (if it exists)
    if (card.mana_cost) {
      updateText(TEXT_FIELDS.MANA, { text: card.mana_cost });
    }

    // Update the type field with the type line (if it exists)
    if (card.type_line) {
      updateText(TEXT_FIELDS.TYPE, { text: card.type_line });
    }

    // Update the rules text field with oracle text and flavor text
    let rulesText = '';

    if (card.oracle_text) {
      // Convert straight quotes to curly quotes
      rulesText = convertToSmartQuotes(card.oracle_text);
    }

    if (card.flavor_text) {
      // Convert straight quotes to curly quotes
      let formattedFlavor = convertToSmartQuotes(card.flavor_text);
      // Replace literal \n with {lns}
      formattedFlavor = formattedFlavor.replace(/\\n/g, '{lns}');

      // If there's oracle text, append with {flavor} (no line break)
      // If no oracle text, use {oldflavor}
      if (rulesText) {
        rulesText += `{flavor}${formattedFlavor}`;
      } else {
        rulesText = `{oldflavor}${formattedFlavor}`;
      }
    }

    // Update the rules text field if we have any text
    if (rulesText) {
      updateText(TEXT_FIELDS.RULES, { text: rulesText });
    }

    // Update the set symbol automatically using Card Cipherist source
    if (card.set && card.rarity) {
      const upperSetCode = card.set.toUpperCase();
      const upperRarity = card.rarity.toUpperCase()[0]; // First letter only

      // Update the store values so they appear in SetSymbolTab inputs
      setSetCode(upperSetCode);
      setRarity(upperRarity);

      const url = `/img/setSymbols/official/${upperSetCode}/${upperRarity}.svg`;

      // Load the set symbol
      loadSetSymbol(url);

      // Reset position to use frame pack bounds
      updateSetSymbol({
        setSymbolX: 0,
        setSymbolY: 0,
        setSymbolZoom: 1,
        setSymbolRotate: defaultSetSymbolRotation,
      });
    }

    // Hydrate collector info and enable switches if any collector fields are present
    const hasCollectorInfo = card.collector_number || card.rarity || card.artist || card.lang;

    if (hasCollectorInfo) {
      // Enable "New (post-One)" style and Show Collector Information switch
      updateCard({
        showCollectorInfo: true,
        collectorInfoStyle: 'new'
      });

      // Hydrate collector number
      if (card.collector_number) {
        setCollectorDigits(card.collector_number);
      }

      // Hydrate rarity (capitalized first letter)
      if (card.rarity) {
        const capitalizedRarity = card.rarity.charAt(0).toUpperCase();
        setCollectorRarity(capitalizedRarity);
      }

      // Hydrate artist
      if (card.artist) {
        setCollectorArtist(card.artist);
      }

      // Hydrate language (capitalize)
      if (card.lang) {
        setCollectorLanguage(card.lang.toUpperCase());
      }

      // Hydrate set code (uppercase)
      if (card.set) {
        setCollectorSetCode(card.set.toUpperCase());
      }
    }

    // Hydrate art from art_crop
    // Check both top-level image_uris and card_faces[0].image_uris (for split/double-faced cards)
    const artCropUrl = card.image_uris?.art_crop ?? card.card_faces?.[0]?.image_uris?.art_crop;
    
    if (artCropUrl) {
      // Use loaded pack's art bounds, or fallback to M15 defaults
      const artBounds = loadedPack?.artBounds ?? { x: 0.0767, y: 0.1129, width: 0.8476, height: 0.4429 };

      // Load the art image from Scryfall and calculate position/zoom
      loadArt(artCropUrl).then((img) => {
        // Get card dimensions from the store
        const currentCard = useCardStore.getState().card;

        // Calculate bounds in pixel space
        const boundsWidthPx = artBounds.width * currentCard.width;
        const boundsHeightPx = artBounds.height * currentCard.height;

        // Get actual image dimensions
        const imgWidth = img.width;
        const imgHeight = img.height;

        // Calculate aspect ratios
        const boundsAspect = boundsWidthPx / boundsHeightPx;
        const imgAspect = imgWidth / imgHeight;

        // Calculate zoom to cover the bounds (not contain)
        let zoom;
        if (imgAspect > boundsAspect) {
          // Image is wider than bounds - fit to height
          zoom = boundsHeightPx / imgHeight;
        } else {
          // Image is taller/equal - fit to width
          zoom = boundsWidthPx / imgWidth;
        }

        // Calculate center position of the bounds in normalized coordinates
        const boundsCenterX = artBounds.x + artBounds.width / 2;
        const boundsCenterY = artBounds.y + artBounds.height / 2;

        // Calculate pixel offset from canvas center to bounds center
        // Canvas center is at (width/2, height/2)
        // Bounds center is at (boundsCenterX * width, boundsCenterY * height)
        const artX = (boundsCenterX - 0.5) * currentCard.width;
        const artY = (boundsCenterY - 0.5) * currentCard.height;

        // Update art position and zoom using mediaStore
        updateArt({
          artX,
          artY,
          artZoom: zoom,
          artRotate: 0,
        });
      });
    } else {
      // Show toast notification if art_crop is not available
      toaster.create({
        title: 'Art Not Available',
        description: 'Art Crop image is not available for this card',
        type: 'warning',
        duration: 5000,
      });
    }
    // Only depend on the data that triggers the effect, not the stable setter functions
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCard, apiResponseData, loadedPack?.artBounds]);

  const handleSearch = async () => {
    if (!cardName.trim()) return;

    try {
      // Format card name: lowercase and replace spaces with underscores
      const cardNameFormatted = cardName.toLowerCase().replace(/ /g, '_');

      // Build Scryfall API URL
      const url = `https://api.scryfall.com/cards/search?order=released&include_extras=true&unique=art&q=name%3D${cardNameFormatted}&lang%3D${language}`;

      // Make API call with retry logic for network errors
      const response = await retryAsync(
        () => fetch(url),
        {
          maxRetries: 3,
          initialDelay: 1000,
          shouldRetry: (error) => {
            // Retry on network errors, but not on HTTP errors
            return isNetworkError(error);
          },
        }
      );

      // Handle HTTP errors
      if (!response.ok) {
        if (isRateLimitError(response.status)) {
          logError(
            createError(
              ErrorType.NETWORK_ERROR,
              'Scryfall API rate limit exceeded',
              { status: response.status }
            ),
            'ScryfallImportTab'
          );
          
          toaster.create({
            title: 'Rate Limit Exceeded',
            description: 'Too many requests to Scryfall API. Please wait a moment and try again.',
            type: 'warning',
            duration: 5000,
          });
          return;
        }

        if (isNotFoundError(response.status)) {
          toaster.create({
            title: 'No Results',
            description: "Your query didn't match any cards.",
            type: 'error',
            duration: 5000,
          });
          setApiResponseData(null);
          setSelectedCard('');
          return;
        }

        // Other HTTP errors
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Check if the API returned an error or no results
      if (data.object === 'error' || !data.data || data.data.length === 0) {
        toaster.create({
          title: 'No Results',
          description: data.details || "Your query didn't match any cards.",
          type: 'error',
          duration: 5000,
        });
        setApiResponseData(null);
        setSelectedCard('');
        return;
      }

      // Store the response data
      setApiResponseData(data);

      // Set the default selection to the first card
      if (data.data && data.data.length > 0) {
        setSelectedCard(data.data[0].id);
      }
    } catch (error) {
      // const errorMessage = error instanceof Error ? error.message : 'Unknown error'; // Unused - removed in Phase 8

      logError(
        createError(
          ErrorType.NETWORK_ERROR,
          'Failed to fetch from Scryfall API',
          { error, cardName, language }
        ),
        'ScryfallImportTab'
      );

      // Show error toast with more helpful message
      let description = "Failed to search Scryfall. Please check your connection and try again.";
      if (isNetworkError(error)) {
        description = "Network error. Please check your internet connection.";
      }

      toaster.create({
        title: 'Search Error',
        description,
        type: 'error',
        duration: 5000,
      });

      // Clear selection
      setApiResponseData(null);
      setSelectedCard('');
    }
  };

  return (
    <VStack align="stretch" gap={4}>
      <Box>
        <Heading size="md" mb={4}>
          Import from Scryfall
        </Heading>

        {/* Search Row */}
        <Box mb={4}>
          <HStack gap={2}>
            <Box flex="2">
              <LabeledInput
                label="Card Name:"
                placeholder="E.g. Sol Ring"
                bg="rgba(0, 0, 0, 0.3)"
                value={cardName}
                onChange={setCardName}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && cardName.trim()) {
                    handleSearch();
                  }
                }}
              />
            </Box>
            <Box flex="1">
              <LabeledSelect
                label="Language:"
                size="sm"
                value={language}
                onChange={setLanguage}
                items={languages}
              />
            </Box>
            <Button
              colorPalette="blue"
              variant="outline"
              size="sm"
              onClick={handleSearch}
              disabled={!cardName.trim()}
              alignSelf="flex-end"
            >
              Search
            </Button>
          </HStack>
        </Box>

        {/* Include all unique prints checkbox */}
        <Box mb={4}>
          <Checkbox
            checked={includeAllPrints}
            onCheckedChange={(e) => setIncludeAllPrints(!!e.checked)}
            colorPalette="blue"
          >
            <Text fontSize="sm">Include all unique prints as options</Text>
          </Checkbox>
        </Box>

        {/* Select specific card menu */}
        <Box mb={4}>
          <LabeledSelect
            label="Select a specific card to import"
            size="sm"
            value={selectedCard}
            onChange={setSelectedCard}
            items={cardOptions}
            placeholder="Search for a card first"
          />
        </Box>
      </Box>
    </VStack>
  );
};

ScryfallImportTabComponent.displayName = 'ScryfallImportTab';
export const ScryfallImportTab = memo(ScryfallImportTabComponent);
