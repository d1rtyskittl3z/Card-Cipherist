/**
 * Art Tab Component
 * Art upload and manipulation interface
 */

import { memo } from 'react';
import { Box, Button, Heading, Input, VStack, HStack, Spinner } from '@chakra-ui/react';
import { Field } from '../ui/field';
import { NativeSelectRoot, NativeSelectField } from '../ui/native-select';
import { LabeledInput, ControlGrid, ActionButtonGroup, LabeledSwitch, FileUploadZone } from '../ui';
import { useCardStore } from '../../store/cardStore';
import { useMediaStore } from '../../store/mediaStore';
import { useUIStore } from '../../store/uiStore';
import { useFrameStore } from '../../store/frameStore';
import { useImageLoader } from '../../hooks/useImageLoader';
import { useCanvasDrag } from '../../hooks/useCanvasDrag';
import { calculateAutoFitArt } from '../../utils/canvasHelpers';
import { useRef, useState, useEffect, useMemo } from 'react';
import { toaster } from '../ui/toaster-instance';
import type { Card } from '../../types/card.types';
import { useDebouncedCallback } from '../../hooks/useDebounce';
import { SLIDER_DEBOUNCE_MS } from '../../constants/canvas';
import {
  useCardDimensions,
  useArtGrayscale,
  usePreviewCanvasRef,
  useArtState,
  useAutoFitArt,
  // useLoadedPack, // Unused - removed in Phase 8
} from '../../store/selectors';

interface ScryfallCard {
  name: string;
  set: string;
  collector_number: string;
  id: string;
  artist?: string;
  image_uris?: {
    art_crop?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

interface ScryfallApiResponse {
  object?: string;
  data?: ScryfallCard[];
  [key: string]: unknown;
}

const ArtTabComponent = () => {
  // Use fine-grained selectors to prevent unnecessary re-renders
  const { width: cardWidth, height: cardHeight, marginX: cardMarginX, marginY: cardMarginY } = useCardDimensions();
  const artGrayscale = useArtGrayscale();
  const updateCard = useCardStore((state) => state.updateCard);
  const setCollectorArtist = useCardStore((state) => state.setCollectorArtist);
  const previewCanvasRef = usePreviewCanvasRef();

  // Media store - use fine-grained art selector
  const { artX, artY, artZoom, artRotate, artImage } = useArtState();
  const updateArt = useMediaStore((state) => state.updateArt);
  const resetArt = useMediaStore((state) => state.resetArt);
  const artImageLoading = useMediaStore((state) => state.artImageLoading);
  const artImageError = useMediaStore((state) => state.artImageError);

  // UI store - use fine-grained selector
  const autoFitArt = useAutoFitArt();
  const setAutoFitArt = useUIStore((state) => state.setAutoFitArt);

  // Frame store - use fine-grained selector with fallback
  const loadedPackFromFrameStore = useFrameStore((state) => state.loadedPack);
  const loadedPackFromCardStore = useCardStore((state) => state.loadedPack);
  const loadedPack = loadedPackFromFrameStore || loadedPackFromCardStore;

  const { loadArt, loadFromFile, loadFromClipboard, loading, error } = useImageLoader();
  const [urlInputValue, setUrlInputValue] = useState('');
  const [dragEnabled, setDragEnabled] = useState(false);

  // Scryfall search state
  const [cardName, setCardName] = useState('');
  const [apiResponseData, setApiResponseData] = useState<ScryfallApiResponse | null>(null);
  const [selectedCard, setSelectedCard] = useState('');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Debounced update callbacks for slider inputs
  // Provides smooth UI updates without laggy re-renders
  const debouncedUpdateArtX = useDebouncedCallback(
    (val: number) => updateArt({ artX: val }),
    SLIDER_DEBOUNCE_MS
  );

  const debouncedUpdateArtY = useDebouncedCallback(
    (val: number) => updateArt({ artY: val }),
    SLIDER_DEBOUNCE_MS
  );

  const debouncedUpdateArtZoom = useDebouncedCallback(
    (val: number) => updateArt({ artZoom: val }),
    SLIDER_DEBOUNCE_MS
  );

  const debouncedUpdateArtRotate = useDebouncedCallback(
    (val: number) => updateArt({ artRotate: val }),
    SLIDER_DEBOUNCE_MS
  );

  // Format card options for the menu
  const cardOptions = useMemo(() => {
    if (!apiResponseData || !apiResponseData.data || apiResponseData.data.length === 0) {
      return [{ label: 'No cards available', value: '' }];
    }

    return apiResponseData.data.map((card) => ({
      label: `${card.name} (${card.set.toUpperCase()} - ${card.artist || 'Unknown Artist'})`,
      value: card.id,
    }));
  }, [apiResponseData]);

  // Update canvas ref when preview canvas changes
  useEffect(() => {
    canvasRef.current = previewCanvasRef;
  }, [previewCanvasRef]);

  // Auto-fit art when pack changes (if auto-fit is enabled)
  useEffect(() => {
    if (autoFitArt && artImage && loadedPack?.artBounds) {
      // Create minimal card object for auto-fit calculation
      const cardForAutoFit = {
        width: cardWidth,
        height: cardHeight,
        marginX: cardMarginX,
        marginY: cardMarginY
      };
      const { artX: newX, artY: newY, artZoom: newZoom } = calculateAutoFitArt(
        artImage,
        loadedPack.artBounds,
        cardForAutoFit as Card
      );
      updateArt({ artX: newX, artY: newY, artZoom: newZoom, artRotate: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedPack?.id, autoFitArt]); // Only trigger when pack ID or auto-fit changes

  // Load art_crop when a card is selected
  useEffect(() => {
    if (!selectedCard || !apiResponseData?.data) return;

    // Find the selected card in the API response
    const apiCard = apiResponseData.data.find((c) => c.id === selectedCard);
    if (!apiCard) return;

    // Hydrate artist field and enable collector info
    if (apiCard.artist) {
      setCollectorArtist(apiCard.artist);
      updateCard({ showCollectorInfo: true });
    }

    // Load art from art_crop
    if (apiCard.image_uris?.art_crop) {
      loadArt(apiCard.image_uris.art_crop);
    } else {
      // Show toast notification if art_crop is not available
      toaster.create({
        title: 'Art Not Available',
        description: 'Art Crop image is not available for this card',
        type: 'warning',
        duration: 5000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCard, apiResponseData]);

  // Drag functionality with rotation support
  useCanvasDrag({
    canvasRef,
    enabled: dragEnabled,
    mode: 'art',
    onPositionChange: (x, y) => {
      updateArt({ artX: x, artY: y });
    },
    onZoomChange: (zoom) => {
      updateArt({ artZoom: zoom });
    },
    onRotateChange: (rotation) => {
      updateArt({ artRotate: rotation });
    },
    getCurrentPosition: () => ({
      x: artX,
      y: artY,
      zoom: artZoom,
      rotation: artRotate,
    }),
  });

  const handleFileUpload = async (file: File) => {
    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      toaster.create({
        title: 'Invalid File Type',
        description: 'Please upload a PNG, JPG, or SVG image',
        type: 'error',
        duration: 5000,
      });
      return;
    }

    await loadFromFile(file, 'art');
  };

  const handleUrlUpload = () => {
    if (!urlInputValue.trim()) return;

    loadArt(urlInputValue);
    setUrlInputValue(''); // Clear input after upload
  };

  const handleClipboard = async () => {
    await loadFromClipboard('art');
  };

  const handleSearch = async () => {
    if (!cardName.trim()) return;

    try {
      // Format card name: lowercase and replace spaces with underscores
      const cardNameFormatted = cardName.toLowerCase().replace(/ /g, '_');

      // Build Scryfall API URL
      const url = `https://api.scryfall.com/cards/search?order=released&include_extras=true&unique=art&q=name%3D${cardNameFormatted}&lang%3Den`;

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
          Art Upload
        </Heading>

        {/* Drag and drop zone */}
        <FileUploadZone
          label="Drag & Drop or Click to Upload Art"
          helperText="Accepts PNG, JPG, SVG"
          onFileSelect={handleFileUpload}
          accept="image/png,image/jpeg,image/jpg,image/svg+xml"
        />

        {/* URL Input */}
        <Box mb={4}>
          <Field label="Image URL:">
            <HStack gap={2}>
              <Input
                placeholder="https://example.com/art.jpg"
                bg="rgba(0, 0, 0, 0.3)"
                value={urlInputValue}
                onChange={(e) => setUrlInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && urlInputValue.trim()) {
                    handleUrlUpload();
                  }
                }}
                disabled={loading}
              />
              <Button
                colorPalette="blue"
                variant="outline"
                size="sm"
                onClick={handleUrlUpload}
                disabled={loading || !urlInputValue.trim()}
              >
                Add
              </Button>
              <Button
                colorPalette="blue"
                variant="outline"
                size="sm"
                onClick={handleClipboard}
                disabled={loading}
              >
                Paste from Clipboard
              </Button>
            </HStack>
          </Field>
        </Box>

        {/* Scryfall Search Row */}
        <Box mb={4}>
          <HStack gap={2}>
            <Box flex="1">
              <Field label="Import Card Art from Scryfall:">
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
              <Field label="Select a specific art to import">
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
          </HStack>
        </Box>

        {/* Loading/Error States */}
        {artImageLoading && (
          <HStack p={3} bg="blue.900" color="blue.100" borderRadius="md" mb={4}>
            <Spinner size="sm" />
            <Box>Loading art image...</Box>
          </HStack>
        )}

        {artImageError && (
          <Box p={3} bg="red.900" color="red.100" borderRadius="md" mb={4}>
            <strong>Art Loading Error:</strong> {artImageError}
          </Box>
        )}

        {error && (
          <Box p={3} bg="red.900" color="red.100" borderRadius="md" mb={4}>
            {error}
          </Box>
        )}
      </Box>

      <Box>

        <LabeledSwitch
          label="Auto Fit Art"
          checked={autoFitArt}
          onCheckedChange={setAutoFitArt}
        />

        <LabeledSwitch
          label="Drag to move art (hold shift to zoom, ctrl to rotate)"
          checked={dragEnabled}
          onCheckedChange={setDragEnabled}
        />

        <LabeledSwitch
          label="Make the art grayscale"
          checked={artGrayscale}
          onCheckedChange={(checked) => updateArt({ artGrayscale: checked })}
        />

        <VStack align="stretch" gap={3}>
          <ControlGrid columns={2} gap={3}>
            <LabeledInput
              label="X Position"
              type="number"
              value={artX}
              onChange={(val) => debouncedUpdateArtX(Number(val))}
            />

            <LabeledInput
              label="Y Position"
              type="number"
              value={artY}
              onChange={(val) => debouncedUpdateArtY(Number(val))}
            />

            <LabeledInput
              label="Zoom"
              type="number"
              step={0.01}
              min={0.1}
              max={5}
              value={artZoom}
              onChange={(val) => debouncedUpdateArtZoom(Number(val))}
            />

            <LabeledInput
              label="Rotation (degrees)"
              type="number"
              value={artRotate}
              onChange={(val) => debouncedUpdateArtRotate(Number(val))}
            />
          </ControlGrid>

          <ActionButtonGroup layout="grid" columns={2} gap={3}>
            <Button
              onClick={() => {
                // If we have an art image and artBounds, apply auto-fit
                if (artImage && loadedPack?.artBounds) {
                  // Create minimal card object for auto-fit calculation
                  const cardForAutoFit = {
                    width: cardWidth,
                    height: cardHeight,
                    marginX: cardMarginX,
                    marginY: cardMarginY
                  } as Card;
                  const { artX: newX, artY: newY, artZoom: newZoom } = calculateAutoFitArt(
                    artImage,
                    loadedPack.artBounds,
                    cardForAutoFit
                  );
                  updateArt({
                    artX: newX,
                    artY: newY,
                    artZoom: newZoom,
                    artRotate: 0,
                    artGrayscale: false,
                  });
                } else {
                  // Fallback to default position if no auto-fit available
                  updateArt({
                    artX: 0,
                    artY: 0,
                    artZoom: 1,
                    artRotate: 0,
                    artGrayscale: false,
                  });
                }
              }}
              colorPalette="blue"
            >
              Reset Art Position
            </Button>

            <Button
              onClick={resetArt}
              colorPalette="red"
            >
              Remove Art
            </Button>
          </ActionButtonGroup>
        </VStack>
      </Box>
    </VStack>
  );
};

ArtTabComponent.displayName = 'ArtTab';
export const ArtTab = memo(ArtTabComponent);
