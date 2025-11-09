/**
 * Set Symbol Tab Component
 * Set symbol upload and positioning interface
 */

import { Box, Button, Heading, Input, VStack, HStack, Text, Drawer, Portal, CloseButton } from '@chakra-ui/react';
import { Field } from '../ui/field';
import { NativeSelectRoot, NativeSelectField } from '../ui/native-select';
import { Switch } from '../ui/switch';
import { useCardStore } from '../../store/cardStore';
import { useImageLoader } from '../../hooks/useImageLoader';
import { useCanvasDrag } from '../../hooks/useCanvasDrag';
import { useRef, useState, useEffect } from 'react';
import { toaster } from '../ui/toaster';

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

export const SetSymbolTab = () => {
  const setSymbolX = useCardStore((state) => state.card.setSymbolX);
  const setSymbolY = useCardStore((state) => state.card.setSymbolY);
  const setSymbolZoom = useCardStore((state) => state.card.setSymbolZoom);
  const updateSetSymbol = useCardStore((state) => state.updateSetSymbol);
  const setSetSymbolImage = useCardStore((state) => state.setSetSymbolImage);
  const previewCanvasRef = useCardStore((state) => state.previewCanvasRef);
  // Get setCode and rarity from store
  const setCode = useCardStore((state) => state.setCode);
  const rarity = useCardStore((state) => state.rarity);
  const setSetCode = useCardStore((state) => state.setSetCode);
  const setRarity = useCardStore((state) => state.setRarity);

  const { loadSetSymbol, loadFromFile, loading, error } = useImageLoader();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlInputValue, setUrlInputValue] = useState('');
  const [selectedSource, setSelectedSource] = useState('cardcipherist');
  const [dragEnabled, setDragEnabled] = useState(false);
  const [examplesDrawerOpen, setExamplesDrawerOpen] = useState(false);
  const [communitySymbols, setCommunitySymbols] = useState<Record<string, string[]>>({});
  const [loadingCommunitySymbols, setLoadingCommunitySymbols] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    getCurrentPosition: () => ({
      x: setSymbolX,
      y: setSymbolY,
      zoom: setSymbolZoom,
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

    loadSetSymbol(urlInputValue);
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
    updateSetSymbol({
      setSymbolX: 0,
      setSymbolY: 0,
      setSymbolZoom: 1,
    });
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
        } catch (e) {
          console.log('Could not read folders via IPC, using fallback');
        }
      }
      
      // Fallback for web mode or if IPC fails
      if (customFolders.length === 0) {
        customFolders = [
          'ABYSSALALTERS',
          'CNF',
          'JEST',
          'JOE',
          'LOGAN',
          'LOL',
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
          } catch (e) {
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
    updateSetSymbol({
      setSymbolX: 0,
      setSymbolY: 0,
      setSymbolZoom: 1,
    });
    setExamplesDrawerOpen(false);
  };

  return (
    <VStack align="stretch" gap={4}>
      <Box>
        <Heading size="md" mb={4}>
          Set Symbol Upload
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
          Drag & Drop or Click to Upload Set Symbol
          <Box fontSize="xs" mt={1} color="gray.500">
            Accepts PNG, SVG
          </Box>
        </Box>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/svg+xml"
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
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
          <Field label="Symbol Source:">
            <NativeSelectRoot size="sm">
              <NativeSelectField
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                items={symbolSources}
              />
            </NativeSelectRoot>
          </Field>
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
      </Box>

      <Box>
        <Heading size="sm" mb={4}>
          Set Symbol Position
        </Heading>

        <Box mb={4}>
          <Switch
            checked={dragEnabled}
            onCheckedChange={(e) => setDragEnabled(e.checked)}
            colorPalette="blue"
          >
            <Text fontSize="sm">Drag to move set symbol (hold shift to zoom)</Text>
          </Switch>
        </Box>

        <VStack align="stretch" gap={3}>
          <HStack gap={2}>
            <Box flex="1">
              <Field label="X Position">
                <Input
                  type="number"
                  value={setSymbolX}
                  onChange={(e) => updateSetSymbol({ setSymbolX: Number(e.target.value) })}
                />
              </Field>
            </Box>

            <Box flex="1">
              <Field label="Y Position">
                <Input
                  type="number"
                  value={setSymbolY}
                  onChange={(e) => updateSetSymbol({ setSymbolY: Number(e.target.value) })}
                />
              </Field>
            </Box>

            <Box flex="1">
              <Field label="Zoom">
                <Input
                  type="number"
                  step={0.01}
                  min={0.1}
                  max={5}
                  value={setSymbolZoom}
                  onChange={(e) => updateSetSymbol({ setSymbolZoom: Number(e.target.value) })}
                />
              </Field>
            </Box>
          </HStack>

          <HStack gap={2}>
            <Button
              onClick={() =>
                updateSetSymbol({
                  setSymbolX: 0,
                  setSymbolY: 0,
                  setSymbolZoom: 1,
                })
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
                  setSymbolX: 0,
                  setSymbolY: 0,
                  setSymbolZoom: 1,
                });
              }}
              colorPalette="blue"
              flex="1"
            >
              Remove Set Symbol
            </Button>
          </HStack>
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
