import {
  Box,
  Button,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { memo, useState, useEffect } from 'react';
import { useCardStore } from '../../store/cardStore';
import { useStationInfo, useIsStationCard } from '../../store/selectors';
import type { StationColorMode } from '../../types/card.types';
import { Field } from '../ui/field';
import { Slider } from '../ui/slider';
import { LabeledInput, LabeledSelect, LabeledSwitch } from '../ui';

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

const StationsTabComponent = () => {
  // Use fine-grained selectors
  const station = useStationInfo();
  // const version = useCardVersion(); // Unused - removed in Phase 8
  const isStationCard = useIsStationCard();
  const updateStationState = useCardStore((state) => state.updateStationState);
  const resetStationSettings = useCardStore((state) => state.resetStationSettings);

  // Local state for sliders (immediate feedback)
  const [localSquare1Opacity, setLocalSquare1Opacity] = useState(0);
  const [localSquare2Opacity, setLocalSquare2Opacity] = useState(0);

  // Sync local state from store when station changes
  // IMPORTANT: Only sync on mount or when the entire station object reference changes
  // Do NOT sync on every opacity change to avoid fighting with user input
  useEffect(() => {
    if (station) {
      setLocalSquare1Opacity(station.squares[1].opacity ?? 0);
      setLocalSquare2Opacity(station.squares[2].opacity ?? 0);
    }
  }, [station]); // Only depend on station object, not individual opacity values

  // Unused memo - removed in Phase 8
  // const _unusedMemo = useMemo(
  //   () => isStationCard,
  //   [isStationCard]
  // );

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
          <LabeledSelect
            label="Badge Color Mode"
            value={station.badgeColorMode}
            onChange={(val) => handleBadgeModeChange(val as StationColorMode)}
            size="sm"
          >
            {BADGE_COLOR_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </LabeledSelect>

          <LabeledInput
            label="First Ability Badge Value"
            value={station.badgeValues[1] ?? ''}
            onChange={(val) => handleBadgeValueChange(1, val)}
            placeholder="Badge Text"
          />

          <LabeledInput
            label="Second Ability Badge Value"
            value={station.badgeValues[2] ?? ''}
            onChange={(val) => handleBadgeValueChange(2, val)}
            placeholder="Badge Text"
          />
        </SimpleGrid>
      </Box>

      <Box p={4} bg="rgba(0, 0, 0, 0.25)" borderRadius="md">
        <Heading size="sm" mb={4}>
          Power/Toughness Plate
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
          <LabeledSelect
            label="PT Color Mode"
            value={station.ptColorMode}
            onChange={(val) => handlePTModeChange(val as StationColorMode)}
            size="sm"
          >
            {BADGE_COLOR_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </LabeledSelect>

          <LabeledInput
            label="PT X Offset"
            type="number"
            value={station.ptSettings.x}
            onChange={(val) => {
              const value = Number(val) || 0;
              updateStationState((draft) => {
                draft.ptSettings.x = value;
                return draft;
              });
            }}
          />

          <LabeledInput
            label="PT Y Offset"
            type="number"
            value={station.ptSettings.y}
            onChange={(val) => {
              const value = Number(val) || 0;
              updateStationState((draft) => {
                draft.ptSettings.y = value;
                return draft;
              });
            }}
          />
        </SimpleGrid>
      </Box>

      <Box p={4} bg="rgba(0, 0, 0, 0.25)" borderRadius="md">
        <Heading size="sm" mb={4}>
          Square Layout
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={4}>
          <LabeledInput
            label="Square Width (both)"
            type="number"
            value={station.squares[1].width}
            onChange={(val) => {
              const value = Number(val) || 0;
              updateStationState((draft) => {
                draft.squares[1].width = value;
                draft.squares[2].width = value;
                return draft;
              });
            }}
          />

          <LabeledInput
            label="Square X Offset (both)"
            type="number"
            value={displayedSquareX}
            onChange={(val) => {
              const value = Number(val) || 0;
              updateStationState((draft) => {
                const actual = value + (draft.borderlessXOffset ?? 0);
                draft.squares[1].x = actual;
                draft.squares[2].x = actual;
                return draft;
              });
            }}
          />

          <LabeledInput
            label="Square Y Offset (first square start)"
            type="number"
            value={displayedSquareY}
            onChange={(val) => {
              const value = Number(val) || 0;
              updateStationState((draft) => {
                draft.squares[1].y = value + 76;
                return draft;
              });
            }}
          />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={4}>
          <LabeledInput
            label="First Square Height"
            type="number"
            value={station.squares[1].height}
            onChange={(val) => {
              const value = Number(val) || 0;
              updateStationState((draft) => {
                draft.squares[1].height = value;
                return draft;
              });
            }}
          />

          <LabeledInput
            label="Second Square Height"
            type="number"
            value={station.squares[2].height}
            onChange={(val) => {
              const value = Number(val) || 0;
              updateStationState((draft) => {
                draft.squares[2].height = value;
                return draft;
              });
            }}
          />
        </SimpleGrid>

        <LabeledSwitch
          label="Disable First Square Color. When enabled, only the lower square remains visible."
          checked={station.disableFirstAbility}
          onCheckedChange={(checked) => {
            updateStationState((draft) => {
              draft.disableFirstAbility = checked;
              draft.squares[1].enabled = !checked;
              return draft;
            });
          }}
        />

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mt={4}>
          <LabeledSelect
            label="Square Color Mode"
            value={station.colorModes[1]}
            onChange={(val) => handleSquareModeChange(val as StationColorMode)}
            size="sm"
          >
            {SQUARE_COLOR_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </LabeledSelect>

          {station.colorModes[1] === 'custom' && (
            <LabeledInput
              label="Custom Square Color"
              type="color"
              value={station.squares[1].color}
              onChange={(val) => {
                updateStationState((draft) => {
                  draft.squares[1].color = val;
                  draft.squares[2].color = val;
                  return draft;
                });
              }}
            />
          )}
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: station.colorModes[1] === 'auto' ? 1 : 2 }} gap={4} mt={4}>
          <Field label={station.colorModes[1] === 'auto' ? 'Square Opacity' : 'First Square Opacity'}>
            <HStack gap={3}>
              <Slider
                flex={1}
                value={[localSquare1Opacity]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={(event: { value: number[] }) => {
                  const [value] = event.value;
                  const finalValue = Number.isFinite(value) ? value : 0;
                  // Update local state immediately for smooth slider movement
                  setLocalSquare1Opacity(finalValue);
                  // Update store
                  updateStationState((draft) => {
                    draft.squares[1].opacity = finalValue;
                    return draft;
                  });
                }}
              />
              <Box minW="48px" textAlign="right" fontSize="sm">
                {localSquare1Opacity.toFixed(2)}
              </Box>
            </HStack>
          </Field>

          {station.colorModes[1] !== 'auto' && (
            <Field label="Second Square Opacity">
              <HStack gap={3}>
                <Slider
                  flex={1}
                  value={[localSquare2Opacity]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={(event: { value: number[] }) => {
                    const [value] = event.value;
                    const finalValue = Number.isFinite(value) ? value : 0;
                    // Update local state immediately for smooth slider movement
                    setLocalSquare2Opacity(finalValue);
                    // Update store
                    updateStationState((draft) => {
                      draft.squares[2].opacity = finalValue;
                      return draft;
                    });
                  }}
                />
                <Box minW="48px" textAlign="right" fontSize="sm">
                  {localSquare2Opacity.toFixed(2)}
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

StationsTabComponent.displayName = 'StationsTab';
export const StationsTab = memo(StationsTabComponent);