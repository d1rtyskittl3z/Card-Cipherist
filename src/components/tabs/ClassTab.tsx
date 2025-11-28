/**
 * Class Tab Component
 * Controls for D&D Class card level heights and names
 */

import { memo } from 'react';
import { Box, Button, Grid, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { LabeledInput } from '../ui';
import { useCardStore } from '../../store/cardStore';
import { useClassInfo, useCardText, useLoadedPack, useIsClassCard, useCardHeight } from '../../store/selectors';
import { applyClassLayout, calculateClassCount } from '../../utils/classHelpers';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const ClassTabComponent = () => {
  // Use fine-grained selectors
  const classInfo = useClassInfo();
  const text = useCardText();
  const cardHeight = useCardHeight();
  const loadedPack = useLoadedPack();
  const isClassCard = useIsClassCard();

  if (!isClassCard) {
    return (
      <Box p={4} bg="rgba(0, 0, 0, 0.3)" borderRadius="md" color="gray.300">
        Load a Class frame version to access level controls.
      </Box>
    );
  }

  const levelData = [
    {
      index: 0,
      label: '1st Level',
      nameLabel: 'Level Name',
      costKey: null as string | null,
      nameKey: null as string | null,
      textKey: 'level0c' as const,
    },
    {
      index: 1,
      label: '2nd Level',
      nameLabel: 'Level Name',
      costKey: 'level1a' as const,
      nameKey: 'level1b' as const,
      textKey: 'level1c' as const,
    },
    {
      index: 2,
      label: '3rd Level',
      nameLabel: 'Level Name',
      costKey: 'level2a' as const,
      nameKey: 'level2b' as const,
      textKey: 'level2c' as const,
    },
    {
      index: 3,
      label: '4th Level',
      nameLabel: 'Level Name',
      costKey: 'level3a' as const,
      nameKey: 'level3b' as const,
      textKey: 'level3c' as const,
    },
  ];

  const handleHeightChange = (index: number, pixelValue: number) => {
    const store = useCardStore.getState();
    const currentCard = store.card;
    const currentHeights = classInfo?.levelHeights ?? [0, 0, 0, 0];
    const nextHeights = [...currentHeights] as [number, number, number, number];
    
    // Clamp to reasonable values
    nextHeights[index] = clamp(pixelValue, 0, cardHeight);
    
    // Apply layout changes
    const textWithClass = applyClassLayout(currentCard, nextHeights);
    store.setText(textWithClass);
    
    // Update class info
    store.setClassInfo({
      levelHeights: nextHeights,
      count: calculateClassCount(nextHeights),
    });
  };

  const handleNameChange = (key: string, value: string) => {
    const store = useCardStore.getState();
    store.updateText(key, { text: value });
  };

  const handleCostChange = (key: string, value: string) => {
    const store = useCardStore.getState();
    store.updateText(key, { text: value });
  };

  const handleReset = () => {
    const store = useCardStore.getState();
    const packDefaults = loadedPack?.class;
    
    const defaultHeightsNormalized = packDefaults?.defaultHeights ?? [0.2096, 0.2091, 0.2091, 0];
    const defaultX = packDefaults?.x ?? 0.5014;
    const defaultWidth = packDefaults?.width ?? 0.422;
    
    // Convert normalized heights to pixels
    const heightsInPixels = defaultHeightsNormalized.map((h) => h * cardHeight) as [number, number, number, number];
    
    // Apply layout with default heights
    const refreshedCard = useCardStore.getState().card;
    const textWithClass = applyClassLayout(refreshedCard, heightsInPixels);
    store.setText(textWithClass);
    
    // Reset class info
    store.resetClassInfo({
      levelHeights: heightsInPixels,
      count: calculateClassCount(heightsInPixels),
      x: defaultX,
      width: defaultWidth,
    });
    
    // Reset level names to defaults
    store.updateText('level1b', { text: 'Level 2' });
    store.updateText('level2b', { text: 'Level 3' });
    store.updateText('level3b', { text: 'Level 4' });
    
    // Reset costs to defaults
    store.updateText('level1a', { text: '{2}:' });
    store.updateText('level2a', { text: '{3}:' });
    store.updateText('level3a', { text: '{4}:' });
  };

  return (
    <VStack align="stretch" gap={4}>
      <Box p={4} bg="rgba(0, 0, 0, 0.35)" borderRadius="md">
        <Heading size="sm" mb={2}>
          Class Level Configuration
        </Heading>
        <Text fontSize="sm" color="gray.300">
          Adjust the height of each class level and customize the level names and costs.
          Active levels: {classInfo?.count ?? 1}
        </Text>
      </Box>

      <Grid templateColumns="repeat(1, 1fr)" gap={3}>
        {levelData.map((level) => {
          const heightNormalized = classInfo?.levelHeights?.[level.index] ?? 0;
          const heightPx = Math.round(heightNormalized);
          const textField = text?.[level.textKey];
          const nameField = level.nameKey ? text?.[level.nameKey] : null;
          const costField = level.costKey ? text?.[level.costKey] : null;

          return (
            <Box key={level.index} p={4} bg="rgba(0, 0, 0, 0.25)" borderRadius="md">
              <Heading size="sm" mb={3}>
                {level.label}
              </Heading>
              <VStack align="stretch" gap={3}>
                <LabeledInput
                  label="Level Height (px)"
                  type="number"
                  min={0}
                  step={1}
                  value={heightPx}
                  onChange={(val) => {
                    const nextValue = Number(val);
                    if (!Number.isNaN(nextValue)) {
                      handleHeightChange(level.index, nextValue);
                    }
                  }}
                />

                {level.nameKey && nameField && (
                  <LabeledInput
                    label={level.nameLabel}
                    value={nameField.text}
                    onChange={(val) => handleNameChange(level.nameKey!, val)}
                    placeholder="e.g., Level 2"
                  />
                )}

                {level.costKey && costField && (
                  <LabeledInput
                    label="Level Cost"
                    value={costField.text}
                    onChange={(val) => handleCostChange(level.costKey!, val)}
                    placeholder="e.g., {2}:"
                  />
                )}

                {textField?.text && (
                  <Box
                    bg="rgba(0, 0, 0, 0.2)"
                    borderRadius="sm"
                    p={2}
                    maxH="6.5em"
                    overflowY="auto"
                  >
                    <Text fontSize="xs" color="gray.300">
                      {textField.text}
                    </Text>
                  </Box>
                )}
              </VStack>
            </Box>
          );
        })}
      </Grid>

      <HStack gap={3} justify="flex-end">
        <Button variant="outline" onClick={handleReset}>
          Reset to defaults
        </Button>
      </HStack>
    </VStack>
  );
};

ClassTabComponent.displayName = 'ClassTab';
export const ClassTab = memo(ClassTabComponent);
