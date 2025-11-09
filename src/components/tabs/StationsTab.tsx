import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ChangeEvent, useMemo } from 'react';
import { useCardStore } from '../../store/cardStore';
import type { StationColorMode } from '../../types/card.types';
import { Field } from '../ui/field';
import { NativeSelectRoot, NativeSelectField } from '../ui/native-select';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';

const BADGE_COLOR_OPTIONS: Array<{ value: Exclude<StationColorMode, 'artifact' | 'land' | 'custom'>; label: string }> = [
  { value: 'auto', label: 'Auto (Based on Mana Cost)' },
  { value: 'white', label: 'White' },
  { value: 'blue', label: 'Blue' },
  { value: 'black', label: 'Black' },
  { value: 'red', label: 'Red' },
  { value: 'green', label: 'Green' },
  { value: 'multi', label: 'Multicolored' },
  { value: 'colorless', label: 'Colorless' },
];

const SQUARE_COLOR_OPTIONS: Array<{ value: StationColorMode; label: string }> = [
  { value: 'auto', label: 'Auto (Based on Mana Cost)' },
  { value: 'white', label: 'White' },
  { value: 'blue', label: 'Blue' },
  { value: 'black', label: 'Black' },
  { value: 'red', label: 'Red' },
  { value: 'green', label: 'Green' },
  { value: 'multi', label: 'Multicolored' },
  { value: 'colorless', label: 'Colorless' },
  { value: 'artifact', label: 'Artifact' },
  { value: 'land', label: 'Land' },
  { value: 'custom', label: 'Custom' },
];

export const StationsTab = () => {
  const card = useCardStore((state) => state.card);
  const updateStationState = useCardStore((state) => state.updateStationState);
  const resetStationSettings = useCardStore((state) => state.resetStationSettings);

  const station = card.station;
  const isStationCard = useMemo(
    () => Boolean(card.version?.toLowerCase().includes('station') && station),
    [card.version, station]
  );

  if (!isStationCard || !station) {
    return (
      <Box p={4} bg="rgba(0, 0, 0, 0.3)" borderRadius="md" color="gray.300">
        Load a Station frame version to access the dedicated ability badge and square controls.
      </Box>
    );
  }

  const borderlessOffset = station.borderlessXOffset ?? 0;
  const displayedSquareX = station.squares[1].x - borderlessOffset;
  const displayedSquareY = station.squares[1].y - 76;

  const handleBadgeValueChange = (index: 1 | 2, value: string) => {
    updateStationState((draft) => {
      draft.badgeValues[index] = value;
      return draft;
    });
  };

  const handleBadgeModeChange = (mode: StationColorMode) => {
    updateStationState((draft) => {
      draft.badgeColorMode = mode;
      return draft;
    });
  };

  const handlePTModeChange = (mode: StationColorMode) => {
    updateStationState((draft) => {
      draft.ptColorMode = mode;
      return draft;
    });
  };

  const handleSquareModeChange = (mode: StationColorMode) => {
    updateStationState((draft) => {
      draft.colorModes[1] = mode;
      draft.colorModes[2] = mode;
      if (mode !== 'custom') {
        draft.squares[1].opacity = 0.2;
        draft.squares[2].opacity = 0.4;
      }
      return draft;
    });
  };

  return (
    <VStack align="stretch" gap={6}>
      <Box p={4} bg="rgba(0, 0, 0, 0.35)" borderRadius="md">
        <Heading size="sm" mb={2}>
          Station Card Controls
        </Heading>
        <Text fontSize="sm" color="gray.300">
          Fine-tune the Station badge values, power/toughness plate offsets, and colored ability squares.
        </Text>
      </Box>

      <Box p={4} bg="rgba(0, 0, 0, 0.25)" borderRadius="md">
        <Heading size="sm" mb={4}>
          Badge Settings
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
          <Field label="Badge Color Mode">
            <NativeSelectRoot size="sm">
              <NativeSelectField
                value={station.badgeColorMode}
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  handleBadgeModeChange(event.target.value as StationColorMode)
                }
              >
                {BADGE_COLOR_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </NativeSelectField>
            </NativeSelectRoot>
          </Field>
          <Field label="First Ability Badge Value">
            <Input
              value={station.badgeValues[1] ?? ''}
              onChange={(event) => handleBadgeValueChange(1, event.target.value)}
              placeholder="Badge Text"
            />
          </Field>
          <Field label="Second Ability Badge Value">
            <Input
              value={station.badgeValues[2] ?? ''}
              onChange={(event) => handleBadgeValueChange(2, event.target.value)}
              placeholder="Badge Text"
            />
          </Field>
        </SimpleGrid>
      </Box>

      <Box p={4} bg="rgba(0, 0, 0, 0.25)" borderRadius="md">
        <Heading size="sm" mb={4}>
          Power/Toughness Plate
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
          <Field label="PT Color Mode">
            <NativeSelectRoot size="sm">
              <NativeSelectField
                value={station.ptColorMode}
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  handlePTModeChange(event.target.value as StationColorMode)
                }
              >
                {BADGE_COLOR_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </NativeSelectField>
            </NativeSelectRoot>
          </Field>
          <Field label="PT X Offset">
            <Input
              type="number"
              value={station.ptSettings.x}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = Number(event.target.value) || 0;
                updateStationState((draft) => {
                  draft.ptSettings.x = value;
                  return draft;
                });
              }}
            />
          </Field>
          <Field label="PT Y Offset">
            <Input
              type="number"
              value={station.ptSettings.y}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = Number(event.target.value) || 0;
                updateStationState((draft) => {
                  draft.ptSettings.y = value;
                  return draft;
                });
              }}
            />
          </Field>
        </SimpleGrid>
      </Box>

      <Box p={4} bg="rgba(0, 0, 0, 0.25)" borderRadius="md">
        <Heading size="sm" mb={4}>
          Square Layout
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={4}>
          <Field label="Square Width (both)">
            <Input
              type="number"
              value={station.squares[1].width}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = Number(event.target.value) || 0;
                updateStationState((draft) => {
                  draft.squares[1].width = value;
                  draft.squares[2].width = value;
                  return draft;
                });
              }}
            />
          </Field>
          <Field label="Square X Offset (both)">
            <Input
              type="number"
              value={displayedSquareX}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = Number(event.target.value) || 0;
                updateStationState((draft) => {
                  const actual = value + (draft.borderlessXOffset ?? 0);
                  draft.squares[1].x = actual;
                  draft.squares[2].x = actual;
                  return draft;
                });
              }}
            />
          </Field>
          <Field label="Square Y Offset (first square start)">
            <Input
              type="number"
              value={displayedSquareY}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = Number(event.target.value) || 0;
                updateStationState((draft) => {
                  draft.squares[1].y = value + 76;
                  return draft;
                });
              }}
            />
          </Field>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={4}>
          <Field label="First Square Height">
            <Input
              type="number"
              value={station.squares[1].height}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = Number(event.target.value) || 0;
                updateStationState((draft) => {
                  draft.squares[1].height = value;
                  return draft;
                });
              }}
            />
          </Field>
          <Field label="Second Square Height">
            <Input
              type="number"
              value={station.squares[2].height}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = Number(event.target.value) || 0;
                updateStationState((draft) => {
                  draft.squares[2].height = value;
                  return draft;
                });
              }}
            />
          </Field>
        </SimpleGrid>

        <Box mb={4}>
          <HStack gap={3}>
            <Switch
              checked={station.disableFirstAbility}
              onCheckedChange={(event: { checked: boolean }) => {
                updateStationState((draft) => {
                  draft.disableFirstAbility = event.checked;
                  draft.squares[1].enabled = !event.checked;
                  return draft;
                });
              }}
            >
              <Text fontSize="sm">Disable First Square Color. When enabled, only the lower square remains visible.</Text>
            </Switch>
          </HStack>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mt={4}>
          <Field label="Square Color Mode">
            <NativeSelectRoot size="sm">
              <NativeSelectField
                value={station.colorModes[1]}
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  handleSquareModeChange(event.target.value as StationColorMode)
                }
              >
                {SQUARE_COLOR_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </NativeSelectField>
            </NativeSelectRoot>
          </Field>
          {station.colorModes[1] === 'custom' && (
            <Field label="Custom Square Color">
              <Input
                type="color"
                value={station.squares[1].color}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  const color = event.target.value;
                  updateStationState((draft) => {
                    draft.squares[1].color = color;
                    draft.squares[2].color = color;
                    return draft;
                  });
                }}
              />
            </Field>
          )}
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: station.colorModes[1] === 'auto' ? 1 : 2 }} gap={4} mt={4}>
          <Field label={station.colorModes[1] === 'auto' ? 'Square Opacity' : 'First Square Opacity'}>
            <HStack gap={3}>
              <Slider
                flex={1}
                value={[station.squares[1].opacity ?? 0]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={(event: { value: number[] }) => {
                  const [value] = event.value;
                  updateStationState((draft) => {
                    draft.squares[1].opacity = Number.isFinite(value) ? value : 0;
                    return draft;
                  });
                }}
              />
              <Box minW="48px" textAlign="right" fontSize="sm">
                {(station.squares[1].opacity ?? 0).toFixed(2)}
              </Box>
            </HStack>
          </Field>

          {station.colorModes[1] !== 'auto' && (
            <Field label="Second Square Opacity">
              <HStack gap={3}>
                <Slider
                  flex={1}
                  value={[station.squares[2].opacity ?? 0]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={(event: { value: number[] }) => {
                    const [value] = event.value;
                    updateStationState((draft) => {
                      draft.squares[2].opacity = Number.isFinite(value) ? value : 0;
                      return draft;
                    });
                  }}
                />
                <Box minW="48px" textAlign="right" fontSize="sm">
                  {(station.squares[2].opacity ?? 0).toFixed(2)}
                </Box>
              </HStack>
            </Field>
          )}
        </SimpleGrid>
      </Box>

      <Box textAlign="center">
        <Button
          colorPalette="gray"
          variant="outline"
          onClick={() => resetStationSettings()}
        >
          Reset Station Settings
        </Button>
      </Box>
    </VStack>
  );
};