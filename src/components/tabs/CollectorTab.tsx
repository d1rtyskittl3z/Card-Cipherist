/**
 * Collector Tab Component
 * Card collector information interface (card number, rarity, artist, etc.)
 */

import { useState, useEffect } from 'react';
import { Box, Grid, HStack, Input, RadioGroup, VStack, Button } from '@chakra-ui/react';
import { Field } from '../ui/field';
import { Switch } from '../ui/switch';
import { useCardStore } from '../../store/cardStore';
import { getCollectorInfoConfig, replaceCollectorTokens } from '../../utils/collectorInfoConfig';
import { toaster } from '../ui/toaster';

export const CollectorTab = () => {
  const card = useCardStore((state) => state.card);
  const updateCard = useCardStore((state) => state.updateCard);
  const showSerialNumbers = useCardStore((s) => s.showSerialNumbers)
  const setShowSerialNumbers = useCardStore((s) => s.setShowSerialNumbers)
  const [useStar, setUseStar] = useState(false);
  const [enableAdditionalFields, setEnableAdditionalFields] = useState(false);
  const [middleRight, setMiddleRight] = useState('');
  const [bottomLeft, setBottomLeft] = useState('');
  const [bottomRight, setBottomRight] = useState('');
  // removed local state; now using store-backed showSerialNumbers

  // Subscribe directly to these specific state values to ensure re-renders
  const showCollectorInfo = useCardStore((state) => state.card.showCollectorInfo ?? false);
  const collectorInfoStyle = useCardStore((state) => state.card.collectorInfoStyle ?? 'default');

  // Get collector info from store
  const setCode = useCardStore((state) => state.collectorSetCode);
  const language = useCardStore((state) => state.collectorLanguage);
  const artist = useCardStore((state) => state.collectorArtist);
  const rarity = useCardStore((state) => state.collectorRarity);
  const digits = useCardStore((state) => state.collectorDigits);
  const setCollectorSetCode = useCardStore((state) => state.setCollectorSetCode);
  const setCollectorLanguage = useCardStore((state) => state.setCollectorLanguage);
  const setCollectorArtist = useCardStore((state) => state.setCollectorArtist);
  const setCollectorRarity = useCardStore((state) => state.setCollectorRarity);
  const setCollectorDigits = useCardStore((state) => state.setCollectorDigits);

  // Local state for note (not hydrated from Scryfall)
  const [note, setNote] = useState('');


  // Apply collector info configuration when style changes
  useEffect(() => {
    if (!showCollectorInfo) return;

  const config = getCollectorInfoConfig(card, collectorInfoStyle, useStar, enableAdditionalFields, middleRight, bottomLeft, bottomRight);
    const bottomInfo: Record<string, {
      name: string;
      text: string;
      x: number;
      y: number;
      width: number;
      height: number;
      size: number;
      font: string;
      color: string;
      oneLine: boolean;
      align?: 'left' | 'center' | 'right';
      outlineWidth?: number;
    }> = {};

    // Build the bottomInfo object with replaced tokens
    Object.entries(config).forEach(([key, textConfig]) => {
      let replacedText = replaceCollectorTokens(textConfig.text, {
        set: setCode,
        language,
        artist,
        rarity,
        number: digits,
        note,
      });

      // Toggle star/dot: replace bullet with a slightly smaller star (U+2605) in belerenbsc, then restore base font and gotham
      if (useStar) {
        replacedText = replacedText.replace(/\u2022/g, '{fontbelerenbsc}{fontrel85}\u2605{fontbase}{fontgothammedium}');
      }

      bottomInfo[key] = {
        name: key,
        text: replacedText,
        x: textConfig.x,
        y: textConfig.y,
        width: textConfig.width,
        height: textConfig.height,
        size: textConfig.size,
        font: textConfig.font,
        color: textConfig.color,
        oneLine: textConfig.oneLine,
        align: textConfig.align,
        outlineWidth: textConfig.outlineWidth,
      };
    });

    updateCard({ bottomInfo });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCollectorInfo, collectorInfoStyle, setCode, language, artist, rarity, note, digits, useStar, enableAdditionalFields, middleRight, bottomLeft, bottomRight, card.frames]);

  // Ensure the switch is off by default on first mount
  useEffect(() => {
    if (card.showCollectorInfo === undefined) {
      updateCard({ showCollectorInfo: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowCollectorInfoChange = (checked: boolean) => {
    updateCard({ showCollectorInfo: checked });
    if (!checked) {
      // Clear bottomInfo when hiding collector info
      updateCard({ bottomInfo: {} });
    }
  };

  const handleStyleChange = (value: string) => {
    updateCard({ collectorInfoStyle: value as 'default' | 'new' | 'artist' });
  };

  const handleAdditionalFieldsToggle = (checked: boolean) => {
    setEnableAdditionalFields(checked);
    if (checked) {
      toaster.create({
        title: 'Warning',
        description: 'Please DO NOT commit Trademark and/or Copyright infringement!',
        type: 'warning',
        duration: 5000,
      });
    }
  };

  return (
    <VStack align="stretch" gap={4}>
      <Box>
        <Box mb={4}>
          <Switch
            colorPalette="purple"
            checked={showCollectorInfo}
            onCheckedChange={(e) => handleShowCollectorInfoChange(e.checked)}
            size="lg"
          >
            Show Collector Information
          </Switch>
        </Box>

        {/* When collector info is OFF, show the Serial Numbers switch right below */}
        {!showCollectorInfo && (
          <Box mb={4}>
            <Switch
              colorPalette="purple"
              checked={showSerialNumbers}
              onCheckedChange={(e) => setShowSerialNumbers(e.checked)}
              size="lg"
            >
              Show Serial Numbers
            </Switch>

            {showSerialNumbers && (
              <Grid templateColumns="repeat(3, 1fr)" gap={3} mt={3}>
                <Field label="Serial Number">
                  <Input
                    type="text"
                    placeholder="e.g., 001"
                    value={String(card.serialNumber ?? '')}
                    onChange={(e) => updateCard({ serialNumber: e.target.value })}
                  />
                </Field>

                <Field label="Serial Total">
                  <Input
                    type="text"
                    placeholder="e.g., 100"
                    value={String(card.serialTotal ?? '')}
                    onChange={(e) => updateCard({ serialTotal: e.target.value })}
                  />
                </Field>

                <Field label="Serial X (design px)">
                  <Input
                    type="number"
                    value={Number(card.serialX ?? 172)}
                    onChange={(e) => updateCard({ serialX: Number(e.target.value) || 0 })}
                  />
                </Field>

                <Field label="Serial Y (design px)">
                  <Input
                    type="number"
                    value={Number(card.serialY ?? 1383)}
                    onChange={(e) => updateCard({ serialY: Number(e.target.value) || 0 })}
                  />
                </Field>

                <Field label="Serial Scale">
                  <Input
                    type="number"
                    step="0.05"
                    value={Number(card.serialScale ?? 1)}
                    onChange={(e) => updateCard({ serialScale: Number(e.target.value) || 1 })}
                  />
                </Field>

                {/* Reset Placement Button (full width) */}
                <Box gridColumn="1 / -1">
                  <Button
                    colorPalette="purple"
                    onClick={() => updateCard({ serialX: 172, serialY: 1383, serialScale: 1.0 })}
                  >
                    Reset Placement
                  </Button>
                </Box>
              </Grid>
            )}
          </Box>
        )}

        {showCollectorInfo && (
          <Box mb={4}>
            <RadioGroup.Root value={collectorInfoStyle} onValueChange={(e) => handleStyleChange(e.value || 'default')}>
              <HStack gap={4}>
                <RadioGroup.Item value="default">
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemControl />
                  <RadioGroup.ItemText>Default</RadioGroup.ItemText>
                </RadioGroup.Item>
                <RadioGroup.Item value="new">
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemControl />
                  <RadioGroup.ItemText>New (post-One)</RadioGroup.ItemText>
                </RadioGroup.Item>
                <RadioGroup.Item value="artist">
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemControl />
                  <RadioGroup.ItemText>Artist Only</RadioGroup.ItemText>
                </RadioGroup.Item>
              </HStack>
            </RadioGroup.Root>
          </Box>
        )}

  {showCollectorInfo && (
  <Grid templateColumns="repeat(3, 1fr)" gap={3}>
          {/* Row 1 */}
          <Field label="Number">
            <Input
              type="number"
              value={digits}
              onChange={(e) => setCollectorDigits(e.target.value)}
            />
          </Field>

          <Field label="Rarity">
            <Input
              type="text"
              placeholder="C for common, U for uncommon, etc..."
              value={rarity}
              onChange={(e) => setCollectorRarity(e.target.value)}
            />
          </Field>

          <Field label="Note">
            <Input
              type="text"
              placeholder="Additional note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Field>

          {/* Row 2 */}
          <Field label="Set Code">
            <Input
              type="text"
              placeholder="e.g., MID, VOW, NEO"
              value={setCode}
              onChange={(e) => setCollectorSetCode(e.target.value)}
            />
          </Field>

          <Field label="Language">
            <Input
              type="text"
              placeholder="e.g., EN, JP, DE"
              value={language}
              onChange={(e) => setCollectorLanguage(e.target.value)}
            />
          </Field>

          <Field label="Artist">
            <Input
              type="text"
              placeholder="Artist name"
              value={artist}
              onChange={(e) => setCollectorArtist(e.target.value)}
            />
          </Field>

          {/* Serial inputs have been moved to render directly under the Show Serial switch only */}

          {/* Enable Additional Fields Switch (spans full width) */}
          <Box gridColumn="1 / -1" mb={2}>
            <Switch
              colorPalette="purple"
              checked={enableAdditionalFields}
              onCheckedChange={(e) => handleAdditionalFieldsToggle(e.checked)}
              size="lg"
            >
              Enable Additional Fields
            </Switch>
          </Box>

          {/* Additional Fields Row */}
          {enableAdditionalFields && (
            <>
              <Field label="Middle Right">
                <Input
                  type="text"
                  placeholder="Middle Right"
                  value={middleRight}
                  onChange={(e) => setMiddleRight(e.target.value)}
                />
              </Field>

              <Field label="Bottom Left">
                <Input
                  type="text"
                  placeholder="Bottom Left"
                  value={bottomLeft}
                  onChange={(e) => setBottomLeft(e.target.value)}
                />
              </Field>

              <Field label="Bottom Right">
                <Input
                  type="text"
                  placeholder="Bottom Right"
                  value={bottomRight}
                  onChange={(e) => setBottomRight(e.target.value)}
                />
              </Field>
            </>
          )}

          {/* Toggle Star/Dot Row (spans full width) */}
          <Box gridColumn="1 / -1" mb={2}>
            <Switch
              colorPalette="purple"
              checked={useStar}
              onCheckedChange={(e) => setUseStar(e.checked)}
              size="lg"
            >
              Toggle Star/Dot
            </Switch>
          </Box>

          {/* Row 3 */}
          <Field label="Bottom Info Color">
            <RadioGroup.Root
              value={card.bottomInfoColor || 'white'}
              onValueChange={(e) => updateCard({ bottomInfoColor: e.value || 'white' })}
            >
              <HStack gap={4}>
                <RadioGroup.Item value="white">
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemControl />
                  <RadioGroup.ItemText>
                    <Box w={6} h={6} bg="white" border="1px solid" borderColor="gray.300" />
                  </RadioGroup.ItemText>
                </RadioGroup.Item>
                <RadioGroup.Item value="black">
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemControl />
                  <RadioGroup.ItemText>
                    <Box w={6} h={6} bg="black" border="1px solid" borderColor="gray.300" />
                  </RadioGroup.ItemText>
                </RadioGroup.Item>
              </HStack>
            </RadioGroup.Root>
          </Field>

          {/* When collector info is ON, move the Serial Numbers switch to the very bottom */}
          <Box gridColumn="1 / -1" mt={2}>
            <Switch
              colorPalette="purple"
              checked={showSerialNumbers}
              onCheckedChange={(e) => setShowSerialNumbers(e.checked)}
              size="lg"
            >
              Show Serial Numbers
            </Switch>
          </Box>

          {showSerialNumbers && (
            <Grid templateColumns="repeat(3, 1fr)" gap={3} gridColumn="1 / -1" mt={3}>
              <Field label="Serial Number">
                <Input
                  type="text"
                  placeholder="e.g., 001"
                  value={String(card.serialNumber ?? '')}
                  onChange={(e) => updateCard({ serialNumber: e.target.value })}
                />
              </Field>

              <Field label="Serial Total">
                <Input
                  type="text"
                  placeholder="e.g., 100"
                  value={String(card.serialTotal ?? '')}
                  onChange={(e) => updateCard({ serialTotal: e.target.value })}
                />
              </Field>

              <Field label="Serial X (design px)">
                <Input
                  type="number"
                  value={Number(card.serialX ?? 172)}
                  onChange={(e) => updateCard({ serialX: Number(e.target.value) || 0 })}
                />
              </Field>

              <Field label="Serial Y (design px)">
                <Input
                  type="number"
                  value={Number(card.serialY ?? 1383)}
                  onChange={(e) => updateCard({ serialY: Number(e.target.value) || 0 })}
                />
              </Field>

              <Field label="Serial Scale">
                <Input
                  type="number"
                  step="0.05"
                  value={Number(card.serialScale ?? 1)}
                  onChange={(e) => updateCard({ serialScale: Number(e.target.value) || 1 })}
                />
              </Field>

              {/* Reset Placement Button (full width) */}
              <Box gridColumn="1 / -1">
                <Button
                  colorPalette="purple"
                  onClick={() => updateCard({ serialX: 172, serialY: 1383, serialScale: 1.0 })}
                >
                  Reset Placement
                </Button>
              </Box>
            </Grid>
          )}
  </Grid>
  )}
      </Box>
    </VStack>
  );
};
