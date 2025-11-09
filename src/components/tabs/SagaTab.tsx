/**
 * Saga Tab Component
 * Controls placement and chapter counts for Saga cards
 */

import { useMemo } from 'react';
import { Box, Button, Grid, Heading, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { Field } from '../ui/field';
import { useCardStore } from '../../store/cardStore';
import { applySagaHeights, calculateSagaAbilityHeights, SAGA_ABILITY_KEYS } from '../../utils/sagaHelpers';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const SagaTab = () => {
  const card = useCardStore((state) => state.card);
  const loadedPack = useCardStore((state) => state.loadedPack);

  const sagaInfo = card.saga;
  const isSagaCard = Boolean(card.version?.toLowerCase().includes('saga') && sagaInfo);

  const maxHeightNormalized = Math.max((card.text?.type?.y ?? 1) - (card.text?.ability0?.y ?? 0), 0);

  const abilityData = useMemo(
    () =>
      SAGA_ABILITY_KEYS.map((key, index) => ({
        key,
        index,
        label: `Ability ${index + 1}`,
        height: card.text?.[key]?.height ?? 0,
        chapters: sagaInfo?.abilities?.[index] ?? 0,
        text: card.text?.[key]?.text ?? '',
      })),
    [card.text, sagaInfo?.abilities]
  );

  if (!isSagaCard) {
    return (
      <Box p={4} bg="rgba(0, 0, 0, 0.3)" borderRadius="md" color="gray.300">
        Load a Saga frame version to access lore counter controls.
      </Box>
    );
  }

  const handleHeightChange = (index: number, rawValue: number) => {
    const store = useCardStore.getState();
    const currentCard = store.card;
    const currentHeights = SAGA_ABILITY_KEYS.map((key) => currentCard.text?.[key]?.height ?? 0);
    const nextHeights = [...currentHeights];
    const allowedMax = Math.max(0, maxHeightNormalized);
    nextHeights[index] = clamp(rawValue, 0, allowedMax);

    const textWithSaga = applySagaHeights(currentCard, nextHeights);
    store.setText(textWithSaga);
    store.setSagaInfo({ count: nextHeights.filter((value) => value > 0).length });
  };

  const handleChapterChange = (index: number, value: number) => {
    const store = useCardStore.getState();
    const currentAbilities = [...(store.card.saga?.abilities ?? [1, 1, 1, 0])];
    currentAbilities[index] = clamp(Math.round(value), 0, 6);
    store.setSagaInfo({ abilities: currentAbilities });
  };

  const handleAutoDistribute = () => {
    const store = useCardStore.getState();
    const currentCard = store.card;
    const activeCount =
      currentCard.saga?.count ??
      SAGA_ABILITY_KEYS.filter((key) => (currentCard.text?.[key]?.height ?? 0) > 0).length;
    const effectiveCount = activeCount > 0 ? activeCount : 3;
    const heights = calculateSagaAbilityHeights(currentCard, effectiveCount);

    if (heights.some((value) => value > 0)) {
      const textWithSaga = applySagaHeights(currentCard, heights);
      store.setText(textWithSaga);
      store.setSagaInfo({ count: heights.filter((value) => value > 0).length });
    }
  };

  const handleReset = () => {
    const store = useCardStore.getState();
    const defaults = loadedPack?.saga ?? {
      x: 0.1,
      width: 0.3947,
      defaultAbilities: [1, 1, 1, 0],
      defaultCount: 3,
    };

    const defaultCount =
      defaults.defaultCount ?? defaults.defaultAbilities?.filter((value) => value > 0).length ?? 0;

    store.resetSagaInfo({
      abilities: [...(defaults.defaultAbilities ?? [1, 1, 1, 0])],
      count: defaultCount,
      x: defaults.x,
      width: defaults.width,
    });

    const refreshedCard = useCardStore.getState().card;
    const heights = calculateSagaAbilityHeights(refreshedCard, refreshedCard.saga?.count);

    if (heights.some((value) => value > 0)) {
      const textWithSaga = applySagaHeights(refreshedCard, heights);
      store.setText(textWithSaga);
      store.setSagaInfo({ count: heights.filter((value) => value > 0).length });
    }
  };

  // const totalHeight = abilityData.reduce((sum, ability) => sum + ability.height, 0);
  // const heightDelta = maxHeightNormalized - totalHeight;
  // const heightSummary =
  //   heightDelta >= 0
  //     ? `${heightDelta.toFixed(4)} remaining`
  //     : `over by ${Math.abs(heightDelta).toFixed(4)}`;

  return (
    <VStack align="stretch" gap={4}>
      {/* <Box p={4} bg="rgba(0, 0, 0, 0.35)" borderRadius="md">
        <Heading size="sm" mb={2}>
          Ability Layout
        </Heading>
        <Text fontSize="sm" color="gray.300">
          Distribute the Saga text box heights (normalized) and configure lore counter groups. The available
          vertical space is approximately {(maxHeightNormalized * 100).toFixed(1)}% of the card height. Current
          allocation is {heightSummary}.
        </Text>
      </Box> */}

      <Grid templateColumns="repeat(2, 1fr)" gap={3}>
        {abilityData.map((ability) => (
          <Box key={ability.key} p={4} bg="rgba(0, 0, 0, 0.25)" borderRadius="md">
            <Heading size="sm" mb={3}>
              {ability.label}
            </Heading>
            <VStack align="stretch" gap={3}>
              <Field label="Ability Height (normalized)">
                <Input
                  type="number"
                  step={0.005}
                  min={0}
                  max={1}
                  value={ability.height.toFixed(4)}
                  onChange={(event) => {
                    const next = Number(event.currentTarget.value);
                    if (!Number.isNaN(next)) {
                      handleHeightChange(ability.index, next);
                    }
                  }}
                />
              </Field>

              <Field label="Lore Counters">
                <Input
                  type="number"
                  min={0}
                  max={6}
                  step={1}
                  value={ability.chapters}
                  onChange={(event) => {
                    const next = Number(event.currentTarget.value);
                    if (!Number.isNaN(next)) {
                      handleChapterChange(ability.index, next);
                    }
                  }}
                />
              </Field>

              {ability.text && (
                <Box
                  bg="rgba(0, 0, 0, 0.2)"
                  borderRadius="sm"
                  p={2}
                  maxH="6.5em"
                  overflowY="auto"
                >
                  <Text fontSize="xs" color="gray.300">
                    {ability.text}
                  </Text>
                </Box>
              )}
            </VStack>
          </Box>
        ))}
      </Grid>

      <HStack gap={3}>
        <Button flex={1} colorPalette="blue" onClick={handleAutoDistribute}>
          Auto distribute heights
        </Button>
        <Button flex={1} variant="outline" onClick={handleReset}>
          Reset to defaults
        </Button>
      </HStack>
    </VStack>
  );
};
