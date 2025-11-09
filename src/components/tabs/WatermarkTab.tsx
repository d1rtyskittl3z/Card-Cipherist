/**
 * Watermark Tab Component
 * Watermark upload and configuration interface
 */

import { Box, Button, Grid, Heading, Input, VStack, HStack, Accordion } from '@chakra-ui/react';
import { Field } from '../ui/field';
import { NativeSelectRoot, NativeSelectField } from '../ui/native-select';
import { useCardStore } from '../../store/cardStore';
import { useImageLoader } from '../../hooks/useImageLoader';
import { useRef, useState } from 'react';
import { toaster } from '../ui/toaster';

export const WatermarkTab = () => {
  const watermarkX = useCardStore((state) => state.card.watermarkX);
  const watermarkY = useCardStore((state) => state.card.watermarkY);
  const watermarkZoom = useCardStore((state) => state.card.watermarkZoom);
  const watermarkOpacity = useCardStore((state) => state.card.watermarkOpacity);
  const watermarkLeft = useCardStore((state) => state.card.watermarkLeft);
  const watermarkRight = useCardStore((state) => state.card.watermarkRight);
  const watermarkSource = useCardStore((state) => state.card.watermarkSource);
  const updateWatermark = useCardStore((state) => state.updateWatermark);
  const setWatermarkImage = useCardStore((state) => state.setWatermarkImage);

  const { loadWatermark, loadWatermarkFromKeyrune, loadFromFile, loading, error } = useImageLoader();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlInputValue, setUrlInputValue] = useState('');
  const [setCodeInputValue, setSetCodeInputValue] = useState('');
  const [nativeSelectValue, setNativeSelectValue] = useState('');

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

    await loadFromFile(file, 'watermark');
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

    loadWatermark(urlInputValue);
    setUrlInputValue(''); // Clear input after upload
  };

  const handleSetCodeUpload = () => {
    if (!setCodeInputValue.trim()) return;

    loadWatermarkFromKeyrune(setCodeInputValue.toLowerCase());
    setSetCodeInputValue(''); // Clear input after upload
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

  return (
    <VStack align="stretch" gap={4}>
      <Box>
        <Heading size="md" mb={4}>
          Watermark Upload
        </Heading>

        {/* Upload Section - Landing Zone + Inputs Side by Side */}
        <Grid templateColumns="1fr 1fr" gap={4} mb={4}>
          {/* Left: Drag and drop zone */}
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
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            Drag & Drop or Click to Upload Watermark
            <Box fontSize="xs" mt={1} color="gray.500">
              Accepts PNG, JPG, SVG
            </Box>
          </Box>

          {/* Right: URL and Set Code Inputs */}
          <VStack align="stretch" gap={3}>
            {/* URL Input */}
            <Field label="Image URL:">
              <HStack gap={2}>
                <Input
                  placeholder="https://example.com/watermark.png"
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

            {/* Set Code Input */}
            <Field label="Via Set Code:">
              <HStack gap={2}>
                <Input
                  placeholder="e.g., war, ktk, grn"
                  bg="rgba(0, 0, 0, 0.3)"
                  value={setCodeInputValue}
                  onChange={(e) => setSetCodeInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && setCodeInputValue.trim()) {
                      handleSetCodeUpload();
                    }
                  }}
                  disabled={loading}
                />
                <Button
                  colorPalette="blue"
                  variant="outline"
                  size="sm"
                  onClick={handleSetCodeUpload}
                  disabled={loading || !setCodeInputValue.trim()}
                >
                  Add
                </Button>
              </HStack>
            </Field>
          </VStack>
        </Grid>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/svg+xml"
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
        />

        {error && (
          <Box p={3} bg="red.900" color="red.100" borderRadius="md" mb={4}>
            {error}
          </Box>
        )}

        {/* Lore-based Watermarks Menu */}
        <Box mb={4}>
          <Field label="Select lore-based watermarks">
            <NativeSelectRoot disabled={loading}>
              <NativeSelectField
                placeholder="None"
                value={nativeSelectValue}
                onChange={(e) => {
                  const value = e.target.value;
                  setNativeSelectValue(value);
                  if (value) {
                    loadWatermark(value);
                  }
                }}
              >
                <optgroup label="General">
                  <option value="/img/watermarks/planeswalker.svg">Planeswalker</option>
                  <option value="/img/watermarks/desparked-planeswalker.svg">Desparked Planeswalker</option>
                  <option value="/img/watermarks/misc-star.svg">DCI Star</option>
                  <option value="/img/watermarks/misc-dci.svg">DCI Logo</option>
                </optgroup>
                <optgroup label="Monocolors">
                  <option value="/img/watermarks/w.svg">White</option>
                  <option value="/img/watermarks/u.svg">Blue</option>
                  <option value="/img/watermarks/b.svg">Black</option>
                  <option value="/img/watermarks/r.svg">Red</option>
                  <option value="/img/watermarks/g.svg">Green</option>
                  <option value="/img/watermarks/c.svg">Colorless</option>
                </optgroup>
                <optgroup label="Mechanics">
                  <option value="/img/watermarks/ability-foretell.svg">Foretell</option>
                </optgroup>
                <optgroup label="Phyrexian/Mirrodin">
                  <option value="/img/watermarks/phyrexian.svg">Phyrexian</option>
                  <option value="/img/watermarks/mirran.svg">Mirran</option>
                </optgroup>
                <optgroup label="Guilds (Ravnica)">
                  <option value="/img/watermarks/guild-azorius.svg">Azorius</option>
                  <option value="/img/watermarks/guild-dimir.svg">Dimir</option>
                  <option value="/img/watermarks/guild-rakdos.svg">Rakdos</option>
                  <option value="/img/watermarks/guild-gruul.svg">Gruul</option>
                  <option value="/img/watermarks/guild-selesnya.svg">Selesnya</option>
                  <option value="/img/watermarks/guild-orzhov.svg">Orzhov</option>
                  <option value="/img/watermarks/guild-izzet.svg">Izzet</option>
                  <option value="/img/watermarks/guild-golgari.svg">Golgari</option>
                  <option value="/img/watermarks/guild-boros.svg">Boros</option>
                  <option value="/img/watermarks/guild-simic.svg">Simic</option>
                </optgroup>
                <optgroup label="Schools (Strixhaven)">
                  <option value="/img/watermarks/school-silverquill.svg">Silverquill</option>
                  <option value="/img/watermarks/school-prismari.svg">Prismari</option>
                  <option value="/img/watermarks/school-witherbloom.svg">Witherbloom</option>
                  <option value="/img/watermarks/school-lorehold.svg">Lorehold</option>
                  <option value="/img/watermarks/school-quandrix.svg">Quandrix</option>
                </optgroup>
                <optgroup label="Families (New Capenna)">
                  <option value="/img/watermarks/family-brokers.svg">Brokers</option>
                  <option value="/img/watermarks/family-obscura.svg">Obscura</option>
                  <option value="/img/watermarks/family-maestros.svg">Maestros</option>
                  <option value="/img/watermarks/family-riveteers.svg">Riveteers</option>
                  <option value="/img/watermarks/family-cabaretti.svg">Cabaretti</option>
                </optgroup>
                <optgroup label="Clans (Tarkir - Old Timeline)">
                  <option value="/img/watermarks/clan-abzan.svg">Abzan</option>
                  <option value="/img/watermarks/clan-jeskai.svg">Jeskai</option>
                  <option value="/img/watermarks/clan-sultai.svg">Sultai</option>
                  <option value="/img/watermarks/clan-mardu.svg">Mardu</option>
                  <option value="/img/watermarks/clan-temur.svg">Temur</option>
                </optgroup>
                <optgroup label="Clans (Tarkir - New Timeline)">
                  <option value="/img/watermarks/clan-ojutai.svg">Ojutai</option>
                  <option value="/img/watermarks/clan-silumgar.svg">Silumgar</option>
                  <option value="/img/watermarks/clan-kolaghan.svg">Kolaghan</option>
                  <option value="/img/watermarks/clan-atarka.svg">Atarka</option>
                  <option value="/img/watermarks/clan-dromoka.svg">Dromoka</option>
                </optgroup>
                <optgroup label="Poleis (Theros)">
                  <option value="/img/watermarks/polis-akros.svg">Akros</option>
                  <option value="/img/watermarks/polis-meletis.svg">Meletis</option>
                  <option value="/img/watermarks/polis-setessa.svg">Setessa</option>
                </optgroup>
                <optgroup label="Unstable Factions (Bablovia)">
                  <option value="/img/watermarks/faction-order-of-the-widget.svg">Order of the Widget</option>
                  <option value="/img/watermarks/faction-agents-of-sneak.svg">Agents of S.N.E.A.K.</option>
                  <option value="/img/watermarks/faction-league-of-dastardly-doom.svg">League of Dastardly Doom</option>
                  <option value="/img/watermarks/faction-goblin-explosioneers.svg">Goblin Explosioneers</option>
                  <option value="/img/watermarks/faction-crossbreed-labs.svg">Crossbreed Labs</option>
                </optgroup>
                <optgroup label="Avatar The Last Airbender (TLA)">
                  <option value="/img/watermarks/atla-water.svg">Water Nation</option>
                  <option value="/img/watermarks/atla-earth.svg">Earth Nation</option>
                  <option value="/img/watermarks/atla-fire.svg">Fire Nation</option>
                  <option value="/img/watermarks/atla-air.svg">Air Nation</option>
                </optgroup>
                <optgroup label="Custom">
                  <option value="/img/watermarks/purple.svg">Purple Mana</option>
                </optgroup>
              </NativeSelectField>
            </NativeSelectRoot>
          </Field>
        </Box>

        {/* Color Options - Collapsible Section */}
        <Accordion.Root collapsible>
          <Accordion.Item value="color-options">
            <Accordion.ItemTrigger>Color Options</Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <VStack align="stretch" gap={3} p={3}>
                <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                  {/* Left Color Preset */}
                  <Field label="Left Color Preset">
                    <NativeSelectRoot>
                      <NativeSelectField
                        value={watermarkLeft || 'none'}
                        onChange={(e) => updateWatermark({ watermarkLeft: e.target.value })}
                      >
                        <option value="none">None</option>
                        <option value="default">Default</option>
                        <option value="#b79d58">White</option>
                        <option value="#8cacc5">Blue</option>
                        <option value="#5e5e5e">Black</option>
                        <option value="#c66d39">Red</option>
                        <option value="#598c52">Green</option>
                        <option value="#cab34d">Gold</option>
                        <option value="#647d86">Artifact</option>
                        <option value="#5e5448">Land</option>
                        <option value="#ffffff">True White</option>
                        <option value="#000000">True Black</option>
                      </NativeSelectField>
                    </NativeSelectRoot>
                  </Field>

                  {/* Right Color Preset */}
                  <Field label="Right Color Preset">
                    <NativeSelectRoot>
                      <NativeSelectField
                        value={watermarkRight || 'none'}
                        onChange={(e) => updateWatermark({ watermarkRight: e.target.value })}
                      >
                        <option value="none">None</option>
                        <option value="default">Default</option>
                        <option value="#b79d58">White</option>
                        <option value="#8cacc5">Blue</option>
                        <option value="#5e5e5e">Black</option>
                        <option value="#c66d39">Red</option>
                        <option value="#598c52">Green</option>
                        <option value="#cab34d">Gold</option>
                        <option value="#647d86">Artifact</option>
                        <option value="#5e5448">Land</option>
                        <option value="#ffffff">True White</option>
                        <option value="#000000">True Black</option>
                      </NativeSelectField>
                    </NativeSelectRoot>
                  </Field>

                  {/* Left Color Picker */}
                  <Field label="Left Custom Color">
                    <Input
                      type="color"
                      value={watermarkLeft?.startsWith('#') ? watermarkLeft : '#ffffff'}
                      onChange={(e) => updateWatermark({ watermarkLeft: e.target.value })}
                    />
                  </Field>

                  {/* Right Color Picker */}
                  <Field label="Right Custom Color">
                    <Input
                      type="color"
                      value={watermarkRight?.startsWith('#') ? watermarkRight : '#ffffff'}
                      onChange={(e) => updateWatermark({ watermarkRight: e.target.value })}
                    />
                  </Field>
                </Grid>
              </VStack>
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
      </Box>

      <Box>
        <VStack align="stretch" gap={3}>
          <Grid templateColumns="repeat(2, 1fr)" gap={3}>
            <Field label="X Position">
              <Input
                type="number"
                value={watermarkX}
                onChange={(e) => updateWatermark({ watermarkX: Number(e.target.value) })}
              />
            </Field>

            <Field label="Y Position">
              <Input
                type="number"
                value={watermarkY}
                onChange={(e) => updateWatermark({ watermarkY: Number(e.target.value) })}
              />
            </Field>

            <Field label="Zoom">
              <Input
                type="number"
                step={0.1}
                min={0.1}
                max={30}
                value={watermarkZoom}
                onChange={(e) => updateWatermark({ watermarkZoom: Number(e.target.value) })}
              />
            </Field>

            <Field label="Opacity">
              <Input
                type="number"
                step={0.01}
                min={0}
                max={1}
                value={watermarkOpacity}
                onChange={(e) => updateWatermark({ watermarkOpacity: Number(e.target.value) })}
              />
            </Field>
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={3}>
            <Button
              onClick={() => {
                // Reset colors to default first
                updateWatermark({
                  watermarkLeft: '#b79d58',
                  watermarkRight: 'none',
                  watermarkOpacity: 0.4,
                });
                
                // Reload the current watermark to recalculate auto-fit position
                if (watermarkSource && watermarkSource !== '/img/blank.png') {
                  loadWatermark(watermarkSource);
                } else {
                  // No watermark loaded, just reset position/zoom to defaults
                  updateWatermark({
                    watermarkX: 0,
                    watermarkY: 0,
                    watermarkZoom: 1,
                  });
                }
              }}
              colorPalette="blue"
              disabled={loading}
            >
              Reset Watermark
            </Button>

            <Button
              onClick={() => {
                setWatermarkImage(null);
                setNativeSelectValue(''); // Reset native select dropdown
                updateWatermark({
                  watermarkSource: '/img/blank.png',
                  watermarkX: 0,
                  watermarkY: 0,
                  watermarkZoom: 1,
                  watermarkOpacity: 0.4,
                  watermarkLeft: '#b79d58',
                  watermarkRight: 'none',
                });
              }}
              colorPalette="red"
            >
              Remove Watermark
            </Button>
          </Grid>
        </VStack>
      </Box>
    </VStack>
  );
};
