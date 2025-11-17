/**
 * Collector Tab Component
 * Card collector information interface (card number, rarity, artist, etc.)
 */

import { useState, useEffect, memo } from 'react';
import { Box, HStack, RadioGroup, VStack, Button } from '@chakra-ui/react';
import { Field } from '../ui/field';
import { LabeledInput, ControlGrid, LabeledSwitch } from '../ui';
import { useCardStore } from '../../store/cardStore';
import { useCollectorInfo, useSerialNumbers, useFrames } from '../../store/selectors';
import { getCollectorInfoConfig, replaceCollectorTokens } from '../../utils/collectorInfoConfig';
import { toaster } from '../ui/toaster-instance';
import type { Card } from '../../types/card.types';

const CollectorTabComponent = () => {
  // Use fine-grained selectors
  const frames = useFrames();
  const showCollectorInfo = useCardStore((state) => state.card.showCollectorInfo ?? false);
  const collectorInfoStyle = useCardStore((state) => state.card.collectorInfoStyle ?? 'default');
  const { show: showSerialNumbers, number: serialNumber, total: serialTotal, x: serialX, y: serialY, scale: serialScale } = useSerialNumbers();
  const bottomInfoColor = useCardStore((state) => state.card.bottomInfoColor);
  const updateCard = useCardStore((state) => state.updateCard);
  const setShowSerialNumbers = useCardStore((s) => s.setShowSerialNumbers)
  const [useStar, setUseStar] = useState(false);
  const [enableAdditionalFields, setEnableAdditionalFields] = useState(false);
  const [middleRight, setMiddleRight] = useState('');
  const [bottomLeft, setBottomLeft] = useState('');
  const [bottomRight, setBottomRight] = useState('');
  // removed local state; now using store-backed showSerialNumbers

  // Get collector info from store
  const { setCode, language, artist, rarity, digits } = useCollectorInfo();
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

  // Create minimal card object for config function
  const cardForConfig = { bottomInfoColor, frames };
  const config = getCollectorInfoConfig(cardForConfig as Card, collectorInfoStyle, useStar, enableAdditionalFields, middleRight, bottomLeft, bottomRight);
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
  }, [showCollectorInfo, collectorInfoStyle, setCode, language, artist, rarity, note, digits, useStar, enableAdditionalFields, middleRight, bottomLeft, bottomRight, frames]);

  // Ensure the switch is off by default on first mount
  useEffect(() => {
    if (showCollectorInfo === undefined) {
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
        <LabeledSwitch
          label="Show Collector Information"
          checked={showCollectorInfo}
          onCheckedChange={handleShowCollectorInfoChange}
          colorPalette="purple"
          size="lg"
        />

        {/* When collector info is OFF, show the Serial Numbers switch right below */}
        {!showCollectorInfo && (
          <Box>
            <LabeledSwitch
              label="Show Serial Numbers"
              checked={showSerialNumbers}
              onCheckedChange={setShowSerialNumbers}
              colorPalette="purple"
              size="lg"
            />

            {showSerialNumbers && (
              <ControlGrid columns={3} gap={3} mt={3}>
                <LabeledInput
                  label="Serial Number"
                  type="text"
                  placeholder="e.g., 001"
                  value={String(serialNumber ?? '')}
                  onChange={(val) => updateCard({ serialNumber: val })}
                />

                <LabeledInput
                  label="Serial Total"
                  type="text"
                  placeholder="e.g., 100"
                  value={String(serialTotal ?? '')}
                  onChange={(val) => updateCard({ serialTotal: val })}
                />

                <LabeledInput
                  label="Serial X (design px)"
                  type="number"
                  value={Number(serialX ?? 172)}
                  onChange={(val) => updateCard({ serialX: Number(val) || 0 })}
                />

                <LabeledInput
                  label="Serial Y (design px)"
                  type="number"
                  value={Number(serialY ?? 1383)}
                  onChange={(val) => updateCard({ serialY: Number(val) || 0 })}
                />

                <LabeledInput
                  label="Serial Scale"
                  type="number"
                  step={0.05}
                  value={Number(serialScale ?? 1)}
                  onChange={(val) => updateCard({ serialScale: Number(val) || 1 })}
                />

                {/* Reset Placement Button (full width) */}
                <Box gridColumn="1 / -1">
                  <Button
                    colorPalette="purple"
                    onClick={() => updateCard({ serialX: 172, serialY: 1383, serialScale: 1.0 })}
                  >
                    Reset Placement
                  </Button>
                </Box>
              </ControlGrid>
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
  <ControlGrid columns={3} gap={3}>
          {/* Row 1 */}
          <LabeledInput
            label="Number"
            type="number"
            value={digits}
            onChange={setCollectorDigits}
          />

          <LabeledInput
            label="Rarity"
            type="text"
            placeholder="C for common, U for uncommon, etc..."
            value={rarity}
            onChange={setCollectorRarity}
          />

          <LabeledInput
            label="Note"
            type="text"
            placeholder="Additional note"
            value={note}
            onChange={setNote}
          />

          {/* Row 2 */}
          <LabeledInput
            label="Set Code"
            type="text"
            placeholder="e.g., MID, VOW, NEO"
            value={setCode}
            onChange={setCollectorSetCode}
          />

          <LabeledInput
            label="Language"
            type="text"
            placeholder="e.g., EN, JP, DE"
            value={language}
            onChange={setCollectorLanguage}
          />

          <LabeledInput
            label="Artist"
            type="text"
            placeholder="Artist name"
            value={artist}
            onChange={setCollectorArtist}
          />

          {/* Serial inputs have been moved to render directly under the Show Serial switch only */}

          {/* Enable Additional Fields Switch (spans full width) */}
          <Box gridColumn="1 / -1">
            <LabeledSwitch
              label="Enable Additional Fields"
              checked={enableAdditionalFields}
              onCheckedChange={handleAdditionalFieldsToggle}
              colorPalette="purple"
              size="lg"
              mb={2}
            />
          </Box>

          {/* Additional Fields Row */}
          {enableAdditionalFields && (
            <>
              <LabeledInput
                label="Middle Right"
                type="text"
                placeholder="Middle Right"
                value={middleRight}
                onChange={setMiddleRight}
              />

              <LabeledInput
                label="Bottom Left"
                type="text"
                placeholder="Bottom Left"
                value={bottomLeft}
                onChange={setBottomLeft}
              />

              <LabeledInput
                label="Bottom Right"
                type="text"
                placeholder="Bottom Right"
                value={bottomRight}
                onChange={setBottomRight}
              />
            </>
          )}

          {/* Toggle Star/Dot Row (spans full width) */}
          <Box gridColumn="1 / -1">
            <LabeledSwitch
              label="Toggle Star/Dot"
              checked={useStar}
              onCheckedChange={setUseStar}
              colorPalette="purple"
              size="lg"
              mb={2}
            />
          </Box>

          {/* Row 3 */}
          <Field label="Bottom Info Color">
            <RadioGroup.Root
              value={bottomInfoColor || 'white'}
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
          <Box gridColumn="1 / -1">
            <LabeledSwitch
              label="Show Serial Numbers"
              checked={showSerialNumbers}
              onCheckedChange={setShowSerialNumbers}
              colorPalette="purple"
              size="lg"
              mb={2}
            />
          </Box>

          {showSerialNumbers && (
            <ControlGrid columns={3} gap={3} gridColumn="1 / -1" mt={3}>
              <LabeledInput
                label="Serial Number"
                type="text"
                placeholder="e.g., 001"
                value={String(serialNumber ?? '')}
                onChange={(val) => updateCard({ serialNumber: val })}
              />

              <LabeledInput
                label="Serial Total"
                type="text"
                placeholder="e.g., 100"
                value={String(serialTotal ?? '')}
                onChange={(val) => updateCard({ serialTotal: val })}
              />

              <LabeledInput
                label="Serial X (design px)"
                type="number"
                value={Number(serialX ?? 172)}
                onChange={(val) => updateCard({ serialX: Number(val) || 0 })}
              />

              <LabeledInput
                label="Serial Y (design px)"
                type="number"
                value={Number(serialY ?? 1383)}
                onChange={(val) => updateCard({ serialY: Number(val) || 0 })}
              />

              <LabeledInput
                label="Serial Scale"
                type="number"
                step={0.05}
                value={Number(serialScale ?? 1)}
                onChange={(val) => updateCard({ serialScale: Number(val) || 1 })}
              />

              {/* Reset Placement Button (full width) */}
              <Box gridColumn="1 / -1">
                <Button
                  colorPalette="purple"
                  onClick={() => updateCard({ serialX: 172, serialY: 1383, serialScale: 1.0 })}
                >
                  Reset Placement
                </Button>
              </Box>
            </ControlGrid>
          )}
  </ControlGrid>
  )}
      </Box>
    </VStack>
  );
};

CollectorTabComponent.displayName = 'CollectorTab';
export const CollectorTab = memo(CollectorTabComponent);
