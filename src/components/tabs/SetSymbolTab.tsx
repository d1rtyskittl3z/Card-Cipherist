/**
 * Set Symbol Tab Component
 * Set symbol upload and positioning interface
 */

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, Heading, Input, VStack, HStack, Drawer, Portal, CloseButton, Text, Spinner } from '@chakra-ui/react';
import { Field } from '../ui/field';
import { LabeledInput, LabeledSelect, ActionButtonGroup, LabeledSwitch, FileUploadZone } from '../ui';
// import { useCardStore } from '../../store/cardStore'; // Unused - removed in Phase 8
import { useMediaStore } from '../../store/mediaStore';
import { usePreviewCanvasRef, useSetSymbolBounds, useSetSymbolState } from '../../store/selectors';
import { useImageLoader } from '../../hooks/useImageLoader';
import { useCanvasDrag } from '../../hooks/useCanvasDrag';
import { toaster } from '../ui/toaster-instance';
import { useDebouncedCallback } from '../../hooks/useDebounce';
import { SLIDER_DEBOUNCE_MS } from '../../constants/canvas';

// // Set codes that use PNG instead of SVG
// const PNG_SET_CODES = [
//   'cmm', 'dft', 'drc', 'fic', 'fin', 'lcc', 'lci', 'ltc', 'ltr',
//   'mkc', 'mkm', 'moc', 'om1', 'onc', 'one', 'otc', 'otj', 'pio',
//   'scd', 'tdc', 'tdm', 'who', 'woc', 'woe', 'wot'
// ];

const symbolSources = [
  { label: 'Card Cipherist', value: 'cardcipherist' },
  { label: 'Hexproof.io', value: 'hexproof' },
  { label: 'Community Symbols', value: 'community' },
];

const SetSymbolTabComponent = () => {
  // Use fine-grained selectors
  const previewCanvasRef = usePreviewCanvasRef();
  const { setSymbolX, setSymbolY, setSymbolZoom, setSymbolRotate, setCode, rarity } = useSetSymbolState();
  const setSymbolBounds = useSetSymbolBounds();
  const packRotation = setSymbolBounds?.rotation ?? 0;
  const updateSetSymbol = useMediaStore((state) => state.updateSetSymbol);
  const setSetSymbolImage = useMediaStore((state) => state.setSetSymbolImage);
  const setSetCode = useMediaStore((state) => state.setSetCode);
  const setRarity = useMediaStore((state) => state.setRarity);
  const setSymbolImageLoading = useMediaStore((state) => state.setSymbolImageLoading);
  const setSymbolImageError = useMediaStore((state) => state.setSymbolImageError);

  const { loadSetSymbol, loadFromFile, loading, error } = useImageLoader();
  const [urlInputValue, setUrlInputValue] = useState('');
  const [selectedSource, setSelectedSource] = useState('cardcipherist');
  const [dragEnabled, setDragEnabled] = useState(false);
  const [examplesDrawerOpen, setExamplesDrawerOpen] = useState(false);
  const [communitySymbols, setCommunitySymbols] = useState<Record<string, string[]>>({});
  const [loadingCommunitySymbols, setLoadingCommunitySymbols] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Debounced update callbacks for slider inputs
  const debouncedUpdateX = useDebouncedCallback(
    (val: number) => updateSetSymbol({ setSymbolX: val }),
    SLIDER_DEBOUNCE_MS
  );

  const debouncedUpdateY = useDebouncedCallback(
    (val: number) => updateSetSymbol({ setSymbolY: val }),
    SLIDER_DEBOUNCE_MS
  );

  const debouncedUpdateZoom = useDebouncedCallback(
    (val: number) => updateSetSymbol({ setSymbolZoom: val }),
    SLIDER_DEBOUNCE_MS
  );

  const debouncedUpdateRotate = useDebouncedCallback(
    (val: number) => updateSetSymbol({ setSymbolRotate: val }),
    SLIDER_DEBOUNCE_MS
  );

  const getPackAlignedTransform = useCallback(
    () => ({
      setSymbolX: 0,
      setSymbolY: 0,
      setSymbolZoom: 1,
      setSymbolRotate: packRotation,
    }),
    [packRotation]
  );

  // Update canvas ref when preview canvas changes
  useEffect(() => {
    canvasRef.current = previewCanvasRef;
  }, [previewCanvasRef]);

  // Drag functionality
  useCanvasDrag({
    canvasRef,
    enabled: dragEnabled,
    mode: 'setSymbol',
    onPositionChange: (x, y) => {
      updateSetSymbol({ setSymbolX: x, setSymbolY: y });
    },
    onZoomChange: (zoom) => {
      updateSetSymbol({ setSymbolZoom: zoom });
    },
    onRotateChange: (rotation) => {
      updateSetSymbol({ setSymbolRotate: rotation });
    },
    getCurrentPosition: () => ({
      x: setSymbolX,
      y: setSymbolY,
      zoom: setSymbolZoom,
      rotation: setSymbolRotate,
    }),
  });

  const handleFileUpload = async (file: File) => {
    // Validate file type
    const validTypes = ['image/png', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      toaster.create({
        title: 'Invalid File Type',
        description: 'Please upload a PNG or SVG image',
        type: 'error',
        duration: 5000,
      });
      return;
    }

    await loadFromFile(file, 'setSymbol');
  };

  const handleUrlUpload = () => {
    if (!urlInputValue.trim()) return;

    loadSetSymbol(urlInputValue);
    setUrlInputValue(''); // Clear input after upload
  };

  // Handle symbol lookup
  const handleSymbolLookup = () => {
    if (!setCode.trim() || !rarity.trim()) return;

    const UpperSetCode = setCode.toUpperCase().trim();
    const UpperRarity = rarity.toUpperCase().trim();

    if (selectedSource === 'cardcipherist') {
      // Check if this set code uses PNG
      // const extension = PNG_SET_CODES.includes(lowerSetCode) ? 'png' : 'svg';
      //const url = `/img/setSymbols/official/${lowerSetCode}-${lowerRarity}.${extension}`;
      const url = `/img/setSymbols/official/${UpperSetCode}/${UpperRarity}.svg`;
      loadSetSymbol(url);
    } else if (selectedSource === 'hexproof') {
      // Call Hexproof.io API
      const apiUrl = `https://corsproxy.io/?url=https://api.hexproof.io/symbols/set/${UpperSetCode}/${UpperRarity}`;
      loadSetSymbol(apiUrl);
    }

    // Reset position to use frame pack bounds
    updateSetSymbol(getPackAlignedTransform());
  };

  // Show toast notification when symbol loading fails
  useEffect(() => {
    if (error) {
      toaster.create({
        title: 'Set Symbol Not Found',
        description: 'No such Set Code and Rarity combination available. Please verify with Hexproof.io or upload a custom one.',
        type: 'error',
        duration: 5000,
      });
    }
  }, [error]);

  // Load community symbols when drawer opens
  useEffect(() => {
    if (examplesDrawerOpen && Object.keys(communitySymbols).length === 0) {
      loadCommunitySymbols();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examplesDrawerOpen]);

  // Function to load community symbols from custom folder
  const loadCommunitySymbols = async () => {
    setLoadingCommunitySymbols(true);
    try {
      // Try to get folders dynamically via Electron IPC
      let customFolders: string[] = [];
      
      if (window.ipcRenderer) {
        try {
          customFolders = await window.ipcRenderer.invoke('read-custom-symbol-folders') as string[];
        } catch (error) {
          console.log('Could not read folders via IPC, using fallback', error);
        }
      }
      
      // Fallback for web mode or if IPC fails
      if (customFolders.length === 0) {
        customFolders = [
          'ABYSSALALTERS',
          'Astral',
          'CNF',
          'Dcape',
          'JEST',
          'JOE',
          'LOGAN',
          'LOL',
          'Ocarina',
          'POK',
          'SPIRALTENTACLE',
          'TEMPLE',
          'YUG',
        ];
      }

      const symbolsMap: Record<string, string[]> = {};

      for (const folder of customFolders) {
        const basePath = `/img/setSymbols/custom/${folder}`;
        const rarities = ['C', 'U', 'R', 'M', 'S', 'T'];
        const availableSymbols: string[] = [];

        // Check which rarity symbols exist for this folder
        for (const rarity of rarities) {
          const path = `${basePath}/${rarity}.svg`;
          try {
            // Try to actually load the image to verify it exists
            await new Promise<void>((resolve, reject) => {
              const img = new Image();
              img.onload = () => resolve();
              img.onerror = () => reject();
              img.src = path;
            });
            availableSymbols.push(path);
          } catch (_error) {
            // Symbol doesn't exist, skip it
          }
        }

        if (availableSymbols.length > 0) {
          symbolsMap[folder] = availableSymbols;
        }
      }

      setCommunitySymbols(symbolsMap);
    } catch (error) {
      console.error('Error loading community symbols:', error);
    } finally {
      setLoadingCommunitySymbols(false);
    }
  };

  // Handle clicking on a community symbol
  const handleCommunitySymbolClick = (symbolPath: string) => {
    loadSetSymbol(symbolPath);
    // Reset position to use frame pack bounds
    updateSetSymbol(getPackAlignedTransform());
    setExamplesDrawerOpen(false);
  };

  return (
    <VStack align="stretch" gap={4}>
      <Box>
        <Heading size="md" mb={4}>
          Set Symbol Upload
        </Heading>

        {/* Drag and drop zone */}
        <FileUploadZone
          label="Drag & Drop or Click to Upload Set Symbol"
          helperText="Accepts PNG, SVG"
          onFileSelect={handleFileUpload}
          accept="image/png,image/svg+xml"
        />

        {/* URL Input */}
        <Box mb={4}>
          <Field label="Image URL:">
            <HStack gap={2}>
              <Input
                placeholder="https://example.com/symbol.png"
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
            </HStack>
          </Field>
        </Box>

        {/* Symbol Source Selection */}
        <Box mb={4}>
          <LabeledSelect
            label="Symbol Source:"
            value={selectedSource}
            onChange={setSelectedSource}
            items={symbolSources}
          />
        </Box>

        {/* Set Code and Rarity Inputs */}
        <Box mb={4}>
          <HStack gap={2}>
            <Field label="Set Code:">
              <Input
                placeholder="Set Code"
                bg="rgba(0, 0, 0, 0.3)"
                value={setCode}
                onChange={(e) => setSetCode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && setCode.trim() && rarity.trim()) {
                    handleSymbolLookup();
                  }
                }}
                disabled={loading}
              />
            </Field>
            <Field label="Rarity:">
              <Input
                placeholder="Rarity"
                bg="rgba(0, 0, 0, 0.3)"
                value={rarity}
                onChange={(e) => setRarity(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && setCode.trim() && rarity.trim()) {
                    handleSymbolLookup();
                  }
                }}
                disabled={loading}
              />
            </Field>
            <Button
              colorPalette="blue"
              variant="outline"
              size="sm"
              onClick={handleSymbolLookup}
              disabled={loading || !setCode.trim() || !rarity.trim()}
              alignSelf="flex-end"
            >
              Add
            </Button>
            {selectedSource === 'community' && (
              <Button
                colorPalette="purple"
                variant="outline"
                size="sm"
                onClick={() => setExamplesDrawerOpen(true)}
                alignSelf="flex-end"
              >
                View Examples
              </Button>
            )}
          </HStack>
        </Box>

        {/* Loading/Error States */}
        {setSymbolImageLoading && (
          <HStack p={3} bg="blue.900" color="blue.100" borderRadius="md" mb={4}>
            <Spinner size="sm" />
            <Box>Loading set symbol...</Box>
          </HStack>
        )}

        {setSymbolImageError && (
          <Box p={3} bg="red.900" color="red.100" borderRadius="md" mb={4}>
            <strong>Set Symbol Loading Error:</strong> {setSymbolImageError}
          </Box>
        )}
      </Box>

      <Box>
        <Heading size="sm" mb={4}>
          Set Symbol Position
        </Heading>

        <LabeledSwitch
          label="Drag to move set symbol (hold shift to zoom)"
          checked={dragEnabled}
          onCheckedChange={setDragEnabled}
        />

        <VStack align="stretch" gap={3}>
          <HStack gap={2}>
            <LabeledInput
              label="X Position"
              type="number"
              value={setSymbolX}
              onChange={(val) => debouncedUpdateX(Number(val))}
              flex="1"
            />

            <LabeledInput
              label="Y Position"
              type="number"
              value={setSymbolY}
              onChange={(val) => debouncedUpdateY(Number(val))}
              flex="1"
            />

            <LabeledInput
              label="Zoom"
              type="number"
              step={0.01}
              min={0.1}
              max={5}
              value={setSymbolZoom}
              onChange={(val) => debouncedUpdateZoom(Number(val))}
              flex="1"
            />

            <LabeledInput
              label="Rotation (°)"
              type="number"
              step={1}
              min={-180}
              max={180}
              value={setSymbolRotate}
              onChange={(val) => debouncedUpdateRotate(Number(val))}
              flex="1"
            />
          </HStack>

          <ActionButtonGroup layout="hstack" gap={2}>
            <Button
              onClick={() =>
                updateSetSymbol(getPackAlignedTransform())
              }
              colorPalette="blue"
              flex="1"
            >
              Reset Position
            </Button>
            <Button
              onClick={() => {
                setSetSymbolImage(null);
                updateSetSymbol({
                  setSymbolSource: '',
                  ...getPackAlignedTransform(),
                });
              }}
              colorPalette="blue"
              flex="1"
            >
              Remove Set Symbol
            </Button>
          </ActionButtonGroup>
        </VStack>
      </Box>

      {/* Community Symbols Examples Drawer */}
      <Drawer.Root open={examplesDrawerOpen} onOpenChange={(e) => !e.open && setExamplesDrawerOpen(false)} placement="end" size="lg">
        <Portal>
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header borderBottomWidth="1px">
                <HStack justify="space-between" w="full">
                  <Heading size="md">Set Symbols Created by the Community</Heading>
                  <Drawer.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Drawer.CloseTrigger>
                </HStack>
              </Drawer.Header>

              <Drawer.Body>
                <VStack align="stretch" gap={6} py={4}>
                  {loadingCommunitySymbols ? (
                    <Text>Loading community symbols...</Text>
                  ) : Object.keys(communitySymbols).length === 0 ? (
                    <Text>No community symbols found.</Text>
                  ) : (
                    Object.entries(communitySymbols).map(([folder, symbols]) => (
                      <Box key={folder}>
                        <Heading size="sm" mb={3}>
                          {folder}
                        </Heading>
                        <HStack gap={3} flexWrap="wrap">
                          {symbols.map((symbolPath) => (
                            <Box
                              key={symbolPath}
                              cursor="pointer"
                              onClick={() => handleCommunitySymbolClick(symbolPath)}
                              p={2}
                              border="2px solid transparent"
                              borderRadius="md"
                              transition="all 0.2s"
                              _hover={{
                                borderColor: 'purple.400',
                                bg: 'rgba(159, 122, 234, 0.1)',
                              }}
                            >
                              <img
                                src={symbolPath}
                                alt={symbolPath.split('/').pop()?.replace('.svg', '')}
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  display: 'block',
                                }}
                              />
                            </Box>
                          ))}
                        </HStack>
                      </Box>
                    ))
                  )}
                </VStack>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </VStack>
  );
};

SetSymbolTabComponent.displayName = 'SetSymbolTab';
export const SetSymbolTab = memo(SetSymbolTabComponent);
