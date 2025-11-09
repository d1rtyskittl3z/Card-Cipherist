/**
 * Scryfall Import Tab Component
 * Import card data from Scryfall API
 */

import { Box, Button, Heading, HStack, Input, VStack, Text } from '@chakra-ui/react';
import { Field } from '../ui/field';
import { NativeSelectRoot, NativeSelectField } from '../ui/native-select';
import { Checkbox } from '../ui/checkbox';
import { toaster } from '../ui/toaster';
import { useCardStore } from '../../store/cardStore';
import { useImageLoader } from '../../hooks/useImageLoader';
import { useState, useMemo, useEffect } from 'react';
import { convertToSmartQuotes } from '../../utils/smartQuotes';

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

export const ScryfallImportTab = () => {
  const [cardName, setCardName] = useState('');
  const [language, setLanguage] = useState('en');
  const [apiResponseData, setApiResponseData] = useState<ScryfallApiResponse | null>(null);
  const [includeAllPrints, setIncludeAllPrints] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');

  // Get actions from card store
  const updateText = useCardStore((state) => state.updateText);
  const updateSetSymbol = useCardStore((state) => state.updateSetSymbol);
  const updateCard = useCardStore((state) => state.updateCard);
  const setSetCode = useCardStore((state) => state.setSetCode);
  const setRarity = useCardStore((state) => state.setRarity);
  const setCollectorSetCode = useCardStore((state) => state.setCollectorSetCode);
  const setCollectorLanguage = useCardStore((state) => state.setCollectorLanguage);
  const setCollectorArtist = useCardStore((state) => state.setCollectorArtist);
  const setCollectorRarity = useCardStore((state) => state.setCollectorRarity);
  const setCollectorDigits = useCardStore((state) => state.setCollectorDigits);
  const loadedPack = useCardStore((state) => state.loadedPack);

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
    updateText('title', { text: card.name });

    // Update the mana field with the mana cost (if it exists)
    if (card.mana_cost) {
      updateText('mana', { text: card.mana_cost });
    }

    // Update the type field with the type line (if it exists)
    if (card.type_line) {
      updateText('type', { text: card.type_line });
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
      updateText('rules', { text: rulesText });
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

        updateCard({
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

      // Make API call
      const response = await fetch(url);
      const data = await response.json();

      // Check if the API returned an error or no results
      if (data.object === 'error' || !data.data || data.data.length === 0) {
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

      // Store the response data
      setApiResponseData(data);

      // Set the default selection to the first card
      if (data.data && data.data.length > 0) {
        setSelectedCard(data.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching from Scryfall:', error);

      // Show error toast
      toaster.create({
        title: 'Search Error',
        description: "Your query didn't match any cards.",
        type: 'error',
        duration: 5000,
      });

      // Clear selection
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
              <Field label="Card Name:">
                <Input
                  placeholder="E.g. Sol Ring"
                  bg="rgba(0, 0, 0, 0.3)"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && cardName.trim()) {
                      handleSearch();
                    }
                  }}
                />
              </Field>
            </Box>
            <Box flex="1">
              <Field label="Language:">
                <NativeSelectRoot size="sm">
                  <NativeSelectField
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    items={languages}
                  />
                </NativeSelectRoot>
              </Field>
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
          <Field label="Select a specific card to import">
            <NativeSelectRoot size="sm">
              <NativeSelectField
                value={selectedCard}
                onChange={(e) => setSelectedCard(e.target.value)}
                items={cardOptions}
                placeholder="Search for a card first"
              />
            </NativeSelectRoot>
          </Field>
        </Box>
      </Box>
    </VStack>
  );
};
