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
  useArtGrayscale2,
  usePreviewCanvasRef,
  useArtState,
  useArt2State,
  useAutoFitArt,
  useActiveArtSlot,
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
  const artGrayscale2 = useArtGrayscale2();
  const updateCard = useCardStore((state) => state.updateCard);
  const setCollectorArtist = useCardStore((state) => state.setCollectorArtist);
  const previewCanvasRef = usePreviewCanvasRef();

  // Media store - use fine-grained art selectors for both slots
  const artState = useArtState();
  const art2State = useArt2State();
  const updateArt = useMediaStore((state) => state.updateArt);
  const updateArt2 = useMediaStore((state) => state.updateArt2);
  const resetArt = useMediaStore((state) => state.resetArt);
  const resetArt2 = useMediaStore((state) => state.resetArt2);
  const artImageLoading = useMediaStore((state) => state.artImageLoading);
  const artImageError = useMediaStore((state) => state.artImageError);
  const artImageLoading2 = useMediaStore((state) => state.artImageLoading2);
  const artImageError2 = useMediaStore((state) => state.artImageError2);

  // UI store - use fine-grained selector
  const autoFitArt = useAutoFitArt();
  const activeArtSlot = useActiveArtSlot();
  const setAutoFitArt = useUIStore((state) => state.setAutoFitArt);
  const setActiveArtSlot = useUIStore((state) => state.setActiveArtSlot);

  // Frame store - use fine-grained selector with fallback
  const loadedPackFromFrameStore = useFrameStore((state) => state.loadedPack);
  const loadedPackFromCardStore = useCardStore((state) => state.loadedPack);
  const loadedPack = loadedPackFromFrameStore || loadedPackFromCardStore;

  // Determine if this pack supports dual art (Split, Fuse, Aftermath)
  const supportsDualArt = useMemo(() => {
    return loadedPack?.id === 'Split' || loadedPack?.id === 'Fuse' || loadedPack?.id === 'Aftermath';
  }, [loadedPack?.id]);

  // Switch art properties based on active slot
  const { artX, artY, artZoom, artRotate, artImage, artGrayscale: currentArtGrayscale } = useMemo(() => {
    if (activeArtSlot === 'art2') {
      return {
        artX: art2State.artX2,
        artY: art2State.artY2,
        artZoom: art2State.artZoom2,
        artRotate: art2State.artRotate2,
        artImage: art2State.artImage2,
        artGrayscale: artGrayscale2,
      };
    }
    return {
      artX: artState.artX,
      artY: artState.artY,
      artZoom: artState.artZoom,
      artRotate: artState.artRotate,
      artImage: artState.artImage,
      artGrayscale: artGrayscale,
    };
  }, [activeArtSlot, artState, art2State, artGrayscale, artGrayscale2]);

  const currentResetArt = activeArtSlot === 'art1' ? resetArt : resetArt2;
  const currentArtImageLoading = activeArtSlot === 'art1' ? artImageLoading : artImageLoading2;
  const currentArtImageError = activeArtSlot === 'art1' ? artImageError : artImageError2;

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
    (val: number) => {
      if (activeArtSlot === 'art1') {
        updateArt({ artX: val });
      } else {
        updateArt2({ artX2: val });
      }
    },
    SLIDER_DEBOUNCE_MS
  );

  const debouncedUpdateArtY = useDebouncedCallback(
    (val: number) => {
      if (activeArtSlot === 'art1') {
        updateArt({ artY: val });
      } else {
        updateArt2({ artY2: val });
      }
    },
    SLIDER_DEBOUNCE_MS
  );

  const debouncedUpdateArtZoom = useDebouncedCallback(
    (val: number) => {
      if (activeArtSlot === 'art1') {
        updateArt({ artZoom: val });
      } else {
        updateArt2({ artZoom2: val });
      }
    },
    SLIDER_DEBOUNCE_MS
  );

  const debouncedUpdateArtRotate = useDebouncedCallback(
    (val: number) => {
      if (activeArtSlot === 'art1') {
        updateArt({ artRotate: val });
      } else {
        updateArt2({ artRotate2: val });
      }
    },
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
      const { artX: newX, artY: newY, artZoom: newZoom, artRotate: newRotate } = calculateAutoFitArt(
        artImage,
        loadedPack.artBounds,
        cardForAutoFit as Card
      );
      updateArt({ artX: newX, artY: newY, artZoom: newZoom, artRotate: newRotate });
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
      loadArt(apiCard.image_uris.art_crop, activeArtSlot);
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
      if (activeArtSlot === 'art1') {
        updateArt({ artX: x, artY: y });
      } else {
        updateArt2({ artX2: x, artY2: y });
      }
    },
    onZoomChange: (zoom) => {
      if (activeArtSlot === 'art1') {
        updateArt({ artZoom: zoom });
      } else {
        updateArt2({ artZoom2: zoom });
      }
    },
    onRotateChange: (rotation) => {
      if (activeArtSlot === 'art1') {
        updateArt({ artRotate: rotation });
      } else {
        updateArt2({ artRotate2: rotation });
      }
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

    await loadFromFile(file, 'art', activeArtSlot);
  };

  const handleUrlUpload = () => {
    if (!urlInputValue.trim()) return;

    loadArt(urlInputValue, activeArtSlot);
    setUrlInputValue(''); // Clear input after upload
  };

  const handleClipboard = async () => {
    await loadFromClipboard('art', activeArtSlot);
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
      {/* Art Slot Switcher - Only show for Split/Fuse/Aftermath packs */}
      {supportsDualArt && (
        <Box>
          <Heading size="sm" mb={3}>
            Art Slot Selection
          </Heading>
          <HStack gap={2}>
            <Button
              colorPalette={activeArtSlot === 'art1' ? 'blue' : 'gray'}
              variant={activeArtSlot === 'art1' ? 'solid' : 'outline'}
              onClick={() => setActiveArtSlot('art1')}
              size="sm"
            >
              Art 1 {activeArtSlot === 'art1' && '(Active)'}
            </Button>
            <Button
              colorPalette={activeArtSlot === 'art2' ? 'blue' : 'gray'}
              variant={activeArtSlot === 'art2' ? 'solid' : 'outline'}
              onClick={() => setActiveArtSlot('art2')}
              size="sm"
            >
              Art 2 {activeArtSlot === 'art2' && '(Active)'}
            </Button>
          </HStack>
        </Box>
      )}

      <Box>
        <Heading size="md" mb={4}>
          Art Upload {supportsDualArt && `(${activeArtSlot === 'art1' ? 'Art 1' : 'Art 2'})`}
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
        {currentArtImageLoading && (
          <HStack p={3} bg="blue.900" color="blue.100" borderRadius="md" mb={4}>
            <Spinner size="sm" />
            <Box>Loading art image...</Box>
          </HStack>
        )}

        {currentArtImageError && (
          <Box p={3} bg="red.900" color="red.100" borderRadius="md" mb={4}>
            <strong>Art Loading Error:</strong> {currentArtImageError}
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
          checked={currentArtGrayscale}
          onCheckedChange={(checked) => {
            if (activeArtSlot === 'art1') {
              updateArt({ artGrayscale: checked });
            } else {
              updateArt2({ artGrayscale2: checked });
            }
          }}
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
                const artBounds = activeArtSlot === 'art1' ? loadedPack?.artBounds : loadedPack?.artBounds2;
                // If we have an art image and artBounds, apply auto-fit
                if (artImage && artBounds) {
                  // Create minimal card object for auto-fit calculation
                  const cardForAutoFit = {
                    width: cardWidth,
                    height: cardHeight,
                    marginX: cardMarginX,
                    marginY: cardMarginY
                  } as Card;
                  const { artX: newX, artY: newY, artZoom: newZoom, artRotate: newRotate } = calculateAutoFitArt(
                    artImage,
                    artBounds,
                    cardForAutoFit
                  );
                  if (activeArtSlot === 'art1') {
                    updateArt({
                      artX: newX,
                      artY: newY,
                      artZoom: newZoom,
                      artRotate: newRotate,
                      artGrayscale: false,
                    });
                  } else {
                    updateArt2({
                      artX2: newX,
                      artY2: newY,
                      artZoom2: newZoom,
                      artRotate2: newRotate,
                      artGrayscale2: false,
                    });
                  }
                } else {
                  // Fallback to default position if no auto-fit available
                  if (activeArtSlot === 'art1') {
                    updateArt({
                      artX: 0,
                      artY: 0,
                      artZoom: 1,
                      artRotate: 0,
                      artGrayscale: false,
                    });
                  } else {
                    updateArt2({
                      artX2: 0,
                      artY2: 0,
                      artZoom2: 1,
                      artRotate2: 0,
                      artGrayscale2: false,
                    });
                  }
                }
              }}
              colorPalette="blue"
            >
              Reset Art Position
            </Button>

            <Button
              onClick={currentResetArt}
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
