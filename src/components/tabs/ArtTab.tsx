/**
 * Art Tab Component
 * Art upload and manipulation interface
 */

import { Box, Button, Grid, Heading, Input, VStack, Text, HStack } from '@chakra-ui/react';
import { Field } from '../ui/field';
import { NativeSelectRoot, NativeSelectField } from '../ui/native-select';
import { Switch } from '../ui/switch';
import { useCardStore } from '../../store/cardStore';
import { useImageLoader } from '../../hooks/useImageLoader';
import { useCanvasDrag } from '../../hooks/useCanvasDrag';
import { calculateAutoFitArt } from '../../utils/canvasHelpers';
import { useRef, useState, useEffect, useMemo } from 'react';
import { toaster } from '../ui/toaster';

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

export const ArtTab = () => {
  const card = useCardStore((state) => state.card);
  const artImage = useCardStore((state) => state.artImage);
  const loadedPack = useCardStore((state) => state.loadedPack);
  const artX = useCardStore((state) => state.card.artX);
  const artY = useCardStore((state) => state.card.artY);
  const artZoom = useCardStore((state) => state.card.artZoom);
  const artRotate = useCardStore((state) => state.card.artRotate);
  const updateArt = useCardStore((state) => state.updateArt);
  const setArtImage = useCardStore((state) => state.setArtImage);
  const autoFitArt = useCardStore((state) => state.autoFitArt);
  const setAutoFitArt = useCardStore((state) => state.setAutoFitArt);
  const previewCanvasRef = useCardStore((state) => state.previewCanvasRef);
  const setCollectorArtist = useCardStore((state) => state.setCollectorArtist);
  const updateCard = useCardStore((state) => state.updateCard);

  const { loadArt, loadFromFile, loadFromClipboard, loading, error } = useImageLoader();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlInputValue, setUrlInputValue] = useState('');
  const [dragEnabled, setDragEnabled] = useState(false);
  const artGrayscale = useCardStore((state) => state.card.artGrayscale ?? false);

  // Scryfall search state
  const [cardName, setCardName] = useState('');
  const [apiResponseData, setApiResponseData] = useState<ScryfallApiResponse | null>(null);
  const [selectedCard, setSelectedCard] = useState('');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
      const { artX: newX, artY: newY, artZoom: newZoom } = calculateAutoFitArt(
        artImage,
        loadedPack.artBounds,
        card
      );
      updateArt({ artX: newX, artY: newY, artZoom: newZoom, artRotate: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedPack?.id, autoFitArt]); // Only trigger when pack ID or auto-fit changes

  // Load art_crop when a card is selected
  useEffect(() => {
    if (!selectedCard || !apiResponseData?.data) return;

    // Find the selected card in the API response
    const card = apiResponseData.data.find((c) => c.id === selectedCard);
    if (!card) return;

    // Hydrate artist field and enable collector info
    if (card.artist) {
      setCollectorArtist(card.artist);
      updateCard({ showCollectorInfo: true });
    }

    // Load art from art_crop
    if (card.image_uris?.art_crop) {
      loadArt(card.image_uris.art_crop);
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

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
    // Reset input so same file can be uploaded again
    e.target.value = '';
  };

  const handleUrlUpload = () => {
    if (!urlInputValue.trim()) return;

    loadArt(urlInputValue);
    setUrlInputValue(''); // Clear input after upload
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
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
        <Box
          border="2px dashed"
          borderColor="gray.600"
          borderRadius="md"
          p={6}
          textAlign="center"
          color="gray.400"
          cursor="pointer"
          _hover={{ borderColor: 'gray.500', bg: 'rgba(255, 255, 255, 0.05)' }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleFileInputClick}
          mb={4}
        >
          Drag & Drop or Click to Upload Art
          <Box fontSize="xs" mt={1} color="gray.500">
            Accepts PNG, JPG, SVG
          </Box>
        </Box>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/svg+xml"
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
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

        {error && (
          <Box p={3} bg="red.900" color="red.100" borderRadius="md" mb={4}>
            {error}
          </Box>
        )}
      </Box>

      <Box>

        <Box mb={4}>
          <Switch
            checked={autoFitArt}
            onCheckedChange={(e) => setAutoFitArt(e.checked)}
            colorPalette="blue"
          >
            <Text fontSize="sm">Auto Fit Art</Text>
          </Switch>
        </Box>

        <Box mb={4}>
          <Switch
            checked={dragEnabled}
            onCheckedChange={(e) => setDragEnabled(e.checked)}
            colorPalette="blue"
          >
            <Text fontSize="sm">Drag to move art (hold shift to zoom, ctrl to rotate)</Text>
          </Switch>
        </Box>

        <Box mb={4}>
          <Switch
            checked={artGrayscale}
            onCheckedChange={(e) => updateCard({ artGrayscale: e.checked })}
            colorPalette="blue"
          >
            <Text fontSize="sm">Make the art grayscale</Text>
          </Switch>
        </Box>

        <VStack align="stretch" gap={3}>
          <Grid templateColumns="repeat(2, 1fr)" gap={3}>
            <Field label="X Position">
              <Input
                type="number"
                value={artX}
                onChange={(e) => updateArt({ artX: Number(e.target.value) })}
              />
            </Field>

            <Field label="Y Position">
              <Input
                type="number"
                value={artY}
                onChange={(e) => updateArt({ artY: Number(e.target.value) })}
              />
            </Field>

            <Field label="Zoom">
              <Input
                type="number"
                step={0.01}
                min={0.1}
                max={5}
                value={artZoom}
                onChange={(e) => updateArt({ artZoom: Number(e.target.value) })}
              />
            </Field>

            <Field label="Rotation (degrees)">
              <Input
                type="number"
                value={artRotate}
                onChange={(e) => updateArt({ artRotate: Number(e.target.value) })}
              />
            </Field>
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={3}>
            <Button
              onClick={() => {
                updateArt({
                  artX: 0,
                  artY: 0,
                  artZoom: 1,
                  artRotate: 0,
                });
                updateCard({ artGrayscale: false });
              }}
              colorPalette="blue"
            >
              Reset Art
            </Button>

            <Button
              onClick={() => setArtImage(null)}
              colorPalette="red"
            >
              Remove Art
            </Button>
          </Grid>
        </VStack>
      </Box>
    </VStack>
  );
};
