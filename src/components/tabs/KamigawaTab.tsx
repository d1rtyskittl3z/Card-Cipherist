/**
 * Kamigawa Tab Component
 * Neo Basics-specific controls for stretchable SVG frames and color overrides.
 */

import { ChangeEvent, useMemo } from 'react';
import { Box, Button, Heading, Input, SimpleGrid, Text, VStack, chakra } from '@chakra-ui/react';
import { Field } from '../ui/field';
import { useCardStore } from '../../store/cardStore';
import {
  DEFAULT_COLOR_OVERRIDE,
  NEO_BASICS_MAX_TITLE_HEIGHT,
  NEO_BASICS_MIN_TITLE_HEIGHT,
} from '../../utils/neoBasics';

const FALLBACK_ELEMENTS = ['outline', 'top', 'bottom', 'symbol', 'Border'];

const COLOR_PRESETS: Array<{ value: string; label: string }> = [
  { value: 'auto', label: 'Default' },
  { value: 'white', label: 'White' },
  { value: 'blue', label: 'Blue' },
  { value: 'black', label: 'Black' },
  { value: 'red', label: 'Red' },
  { value: 'green', label: 'Green' },
  { value: 'colorless', label: 'Colorless' },
  { value: 'purple', label: 'Black (Alt)' },
  { value: 'custom', label: 'Custom' },
];

const COLOR_VALUES: Record<string, string> = {
  white: '#5e564b',
  blue: '#007eb9',
  black: '#000004',
  red: '#e43a2b',
  green: '#007b46',
  colorless: '#9a9a9a',
  purple: '#46375f',
};

const SelectField = chakra('select');

const formatElementLabel = (name: string): string => {
  if (name.length === 0) {
    return name;
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const KamigawaTab = () => {
  const cardVersion = useCardStore((state) => state.card.version?.toLowerCase() ?? '');
  const neoBasicsTitleHeight = useCardStore((state) => state.neoBasicsTitleHeight);
  const setNeoBasicsTitleHeight = useCardStore((state) => state.setNeoBasicsTitleHeight);
  const neoBasicsElements = useCardStore((state) => state.neoBasicsElements);
  const neoBasicsColorOverrides = useCardStore((state) => state.neoBasicsColorOverrides);
  const setNeoBasicsColorOverride = useCardStore((state) => state.setNeoBasicsColorOverride);
  const resetNeoBasicsColors = useCardStore((state) => state.resetNeoBasicsColors);

  const resolvedElements = useMemo(
    () => (neoBasicsElements.length ? neoBasicsElements : FALLBACK_ELEMENTS),
    [neoBasicsElements],
  );

  if (cardVersion !== 'neobasics') {
    return (
      <Box p={4} bg="rgba(0, 0, 0, 0.3)" borderRadius="md" color="gray.300">
        Load the Kamigawa Basics frame version to unlock height and color controls for the Neo Basics
        frames.
      </Box>
    );
  }

  const handlePresetChange = (elementName: string, value: string) => {
    if (value === 'auto') {
      setNeoBasicsColorOverride(elementName, {
        mode: 'auto',
        color: DEFAULT_COLOR_OVERRIDE.color,
        source: undefined,
      });
    } else if (value === 'custom') {
      const current = useCardStore.getState().neoBasicsColorOverrides[elementName];
      const nextColor = current?.color ?? DEFAULT_COLOR_OVERRIDE.color;
      setNeoBasicsColorOverride(elementName, {
        mode: 'manual',
        color: nextColor,
        source: 'custom',
      });
    } else {
      const presetColor = COLOR_VALUES[value] ?? DEFAULT_COLOR_OVERRIDE.color;
      setNeoBasicsColorOverride(elementName, {
        mode: 'manual',
        color: presetColor,
        source: 'preset',
      });
    }
  };

  return (
    <VStack align="stretch" gap={4}>
      <Box p={4} bg="rgba(0, 0, 0, 0.35)" borderRadius="md">
        <Heading size="sm" mb={2}>
          Title Bar Height
        </Heading>
        <Text fontSize="sm" color="gray.300" mb={3}>
          Adjust the Neo Basics title bar stretch. Increasing the value raises the top frame elements
          and adds room for the vertical title treatment.
        </Text>
        <Field label="Title Bar Height (px)">
          <Input
            type="number"
            min={NEO_BASICS_MIN_TITLE_HEIGHT}
            max={NEO_BASICS_MAX_TITLE_HEIGHT}
            step={10}
            value={neoBasicsTitleHeight}
            onChange={(event) => {
              const nextValue = Number(event.currentTarget.value);
              if (!Number.isNaN(nextValue)) {
                setNeoBasicsTitleHeight(nextValue);
              }
            }}
          />
        </Field>
      </Box>

      <Box p={4} bg="rgba(0, 0, 0, 0.35)" borderRadius="md">
        <Heading size="sm" mb={2}>
          Element Colors
        </Heading>
        <Text fontSize="sm" color="gray.300" mb={3}>
          Choose a preset or provide a custom color for each SVG layer. Auto mode uses the frame’s
          default palette.
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          {resolvedElements.map((elementName) => {
            const override = neoBasicsColorOverrides[elementName] ?? DEFAULT_COLOR_OVERRIDE;
            let selection = 'auto';

            if (override.mode === 'manual') {
              if (override.source === 'custom') {
                selection = 'custom';
              } else {
                const overrideColor = override.color?.toLowerCase();
                const matchedPreset = overrideColor
                  ? Object.entries(COLOR_VALUES).find(
                      ([, color]) => color.toLowerCase() === overrideColor,
                    )
                  : undefined;
                selection = matchedPreset ? matchedPreset[0] : 'custom';
              }
            }

            const currentColor = override.color ?? DEFAULT_COLOR_OVERRIDE.color;

            return (
              <Box
                key={elementName}
                p={3}
                borderRadius="md"
                bg="rgba(0, 0, 0, 0.25)"
              >
                <Text fontWeight="semibold" mb={2}>
                  {formatElementLabel(elementName)}
                </Text>
                <Field label="Preset">
                  <SelectField
                    value={selection}
                    onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                      handlePresetChange(elementName, event.currentTarget.value)
                    }
                  >
                    {COLOR_PRESETS.map((preset) => (
                      <option key={preset.value} value={preset.value}>
                        {preset.label}
                      </option>
                    ))}
                  </SelectField>
                </Field>
                {selection === 'custom' && (
                  <Field label="Custom Color">
                    <Input
                      type="color"
                      value={currentColor}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setNeoBasicsColorOverride(elementName, {
                          mode: 'manual',
                          color: event.currentTarget.value,
                        })
                      }
                    />
                  </Field>
                )}
              </Box>
            );
          })}
        </SimpleGrid>

        <Box textAlign="right" mt={4}>
          <Button variant="outline" onClick={resetNeoBasicsColors}>
            Reset All Colors
          </Button>
        </Box>
      </Box>
    </VStack>
  );
};
