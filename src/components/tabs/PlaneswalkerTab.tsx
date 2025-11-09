/**
 * Planeswalker Tab Component
 * Controls placement and loyalty costs for Planeswalker abilities
 */

import { useEffect, useMemo } from 'react';
import { Box, Button, Heading, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { useCardStore } from '../../store/cardStore';
import { Field } from '../ui/field';
import { Checkbox } from '../ui/checkbox';
import { PLANESWALKER_ABILITY_KEYS, applyPlaneswalkerLayout, adjustPlaneswalkerTextBounds, computePlaneswalkerCount, } from '../../utils/planeswalkerHelpers';
import { scaleHeight } from '../../utils/canvasHelpers';
import type { PlaneswalkerInfo } from '../../types/card.types';

const FALLBACK_X = 0.1167;
const FALLBACK_WIDTH = 0.8094;

interface AbilityRow {
  key: string;
  index: number;
  label: string;
  heightNormalized: number;
  heightPx: number;
  cost: string;
  shiftNormalized: number;
  shiftPx: number;
  text: string;
}

const cloneTuple = <T,>(values: T[], fallback: T, expected = 4): [T, T, T, T] => {
  const padded = [...values];
  while (padded.length < expected) {
    padded.push(fallback);
  }
  return padded.slice(0, expected) as [T, T, T, T];
};

export const PlaneswalkerTab = () => {
  const card = useCardStore((state) => state.card);
  const loadedPack = useCardStore((state) => state.loadedPack);

  const planeswalkerInfo = card.planeswalker;
  const isPlaneswalkerCard = Boolean(card.version?.toLowerCase().includes('planeswalker') && planeswalkerInfo);

  const abilityRows = useMemo<AbilityRow[]>(() => {
    return PLANESWALKER_ABILITY_KEYS.map((key, index) => {
      const textField = card.text?.[key];
      const heightNormalized = textField?.height ?? 0;
      const costValue = planeswalkerInfo?.abilities?.[index] ?? '';
      const shiftNormalized = planeswalkerInfo?.abilityAdjust?.[index] ?? 0;

      return {
        key,
        index,
        label: `Ability ${index + 1}`,
        heightNormalized,
        heightPx: scaleHeight(card, heightNormalized),
        cost: costValue,
        shiftNormalized,
        shiftPx: scaleHeight(card, shiftNormalized),
        text: textField?.text ?? '',
      };
    });
  }, [card, planeswalkerInfo]);

  const totalHeightNormalized = abilityRows.reduce((sum, ability) => sum + ability.heightNormalized, 0);
  const totalHeightPx = abilityRows.reduce((sum, ability) => sum + ability.heightPx, 0);
  const activeAbilityCount = computePlaneswalkerCount(abilityRows.map((ability) => ability.heightNormalized));

  const ensureOriginalBounds = () => {
    const store = useCardStore.getState();
    const info = store.card.planeswalker;
    if (!info) {
      return;
    }
    const hasBounds = info.originalAbilityBounds && info.originalAbilityBounds.length === PLANESWALKER_ABILITY_KEYS.length;
    if (!hasBounds) {
      const bounds = PLANESWALKER_ABILITY_KEYS.map((key) => ({
        x: store.card.text?.[key]?.x ?? 0,
        width: store.card.text?.[key]?.width ?? 0,
      }));
      store.setPlaneswalkerInfo({ originalAbilityBounds: bounds });
    }
  };

  useEffect(() => {
    if (!isPlaneswalkerCard) {
      return;
    }

    const store = useCardStore.getState();
    const info = store.card.planeswalker;
    if (!info) {
      return;
    }

    ensureOriginalBounds();

    if (info.baseY === undefined) {
      const baseY = store.card.text?.ability0?.y ?? 0.6239;
      store.setPlaneswalkerInfo({ baseY });
    }

    if (!info.defaultAbilities) {
      store.setPlaneswalkerInfo({ defaultAbilities: [...info.abilities] as [string, string, string, string] });
    }

    if (!info.defaultAbilityAdjust) {
      store.setPlaneswalkerInfo({ defaultAbilityAdjust: [...info.abilityAdjust] as [number, number, number, number] });
    }

    if (!info.defaultHeights) {
      const heights = PLANESWALKER_ABILITY_KEYS.map((key) => store.card.text?.[key]?.height ?? 0);
      store.setPlaneswalkerInfo({ defaultHeights: cloneTuple<number>(heights, 0) });
    }
  }, [isPlaneswalkerCard]);

  const updateAbilityHeights = (heights: number[]) => {
    const store = useCardStore.getState();
    const currentCard = store.card;
    const info = currentCard.planeswalker;
    if (!info) {
      return;
    }

    ensureOriginalBounds();

    const refreshedCard = useCardStore.getState().card;
    const refreshedInfo = refreshedCard.planeswalker;
    if (!refreshedInfo) {
      return;
    }

    const baseY = refreshedInfo.baseY ?? refreshedCard.text?.ability0?.y ?? 0.6239;
    let nextText = applyPlaneswalkerLayout(refreshedCard, heights, baseY);

    PLANESWALKER_ABILITY_KEYS.forEach((_, abilityIndex) => {
      const hasCost = Boolean(refreshedInfo.abilities?.[abilityIndex]?.trim());
      nextText = adjustPlaneswalkerTextBounds(nextText, refreshedInfo, abilityIndex, hasCost);
    });

    store.setText(nextText);
    store.setPlaneswalkerInfo({
      count: heights.filter((value) => value > 0).length,
      baseY,
    });
  };

  const handleHeightChange = (index: number, pixelValue: number) => {
    const store = useCardStore.getState();
    const currentCard = store.card;
    if (!currentCard.planeswalker) {
      return;
    }

    const normalized = Math.max(0, pixelValue / currentCard.height);
    const heights = PLANESWALKER_ABILITY_KEYS.map((key) => currentCard.text?.[key]?.height ?? 0);
    heights[index] = normalized;
    updateAbilityHeights(heights);
  };

  const handleCostChange = (index: number, value: string) => {
    const store = useCardStore.getState();
    const info = store.card.planeswalker;
    if (!info) {
      return;
    }

    const nextAbilities = [...info.abilities] as [string, string, string, string];
    nextAbilities[index] = value;
    store.setPlaneswalkerInfo({ abilities: nextAbilities });

    ensureOriginalBounds();

    const refreshedCard = useCardStore.getState().card;
    const refreshedInfo = refreshedCard.planeswalker;
    if (!refreshedInfo) {
      return;
    }

    let nextText = { ...(refreshedCard.text ?? {}) };
    PLANESWALKER_ABILITY_KEYS.forEach((_, abilityIndex) => {
      const hasCost = Boolean(refreshedInfo.abilities?.[abilityIndex]?.trim());
      nextText = adjustPlaneswalkerTextBounds(nextText, refreshedInfo, abilityIndex, hasCost);
    });

    store.setText(nextText);
  };

  const handleShiftChange = (index: number, pixelValue: number) => {
    const store = useCardStore.getState();
    const info = store.card.planeswalker;
    if (!info) {
      return;
    }

    const normalized = pixelValue / store.card.height;
    const nextAdjust = [...info.abilityAdjust] as [number, number, number, number];
    nextAdjust[index] = Number.isFinite(normalized) ? normalized : 0;
    store.setPlaneswalkerInfo({ abilityAdjust: nextAdjust });
  };

  const handleInvertChange = (checked: boolean) => {
    useCardStore.getState().setPlaneswalkerInfo({ invert: checked });
  };

  const handleReset = () => {
    const store = useCardStore.getState();
    const currentCard = store.card;

    const packDefaults = loadedPack?.planeswalker;
    const info = currentCard.planeswalker;
    if (!info) {
      return;
    }

    const abilitiesDefault = cloneTuple<string>(
      packDefaults?.defaultAbilities ?? info.defaultAbilities ?? ['', '+1', '0', '-7'],
      ''
    );
    const adjustDefault = cloneTuple<number>(
      packDefaults?.defaultAbilityAdjust ?? info.defaultAbilityAdjust ?? [0, 0, 0, 0],
      0
    );
    const heightsDefault = cloneTuple<number>(
      packDefaults?.defaultHeights ?? info.defaultHeights ?? PLANESWALKER_ABILITY_KEYS.map((key) => currentCard.text?.[key]?.height ?? 0),
      0
    );

    const xDefault = packDefaults?.x ?? info.x ?? FALLBACK_X;
    const widthDefault = packDefaults?.width ?? info.width ?? FALLBACK_WIDTH;
    const invertDefault = packDefaults?.invert ?? info.invert ?? false;
    const baseY = currentCard.text?.ability0?.y ?? info.baseY ?? 0.6239;

    const originalBounds = PLANESWALKER_ABILITY_KEYS.map((key) => ({
      x: currentCard.text?.[key]?.x ?? 0.18,
      width: currentCard.text?.[key]?.width ?? 0.7467,
    }));

    const preset: PlaneswalkerInfo = {
      abilities: abilitiesDefault,
      abilityAdjust: adjustDefault,
      count: computePlaneswalkerCount([...heightsDefault]),
      x: xDefault,
      width: widthDefault,
      invert: invertDefault,
      baseY,
      originalAbilityBounds: originalBounds,
      defaultAbilities: abilitiesDefault,
      defaultAbilityAdjust: adjustDefault,
      defaultHeights: heightsDefault,
    };

    store.resetPlaneswalkerInfo(preset);

    const refreshedCard = useCardStore.getState().card;
    const refreshedInfo = refreshedCard.planeswalker;
    if (!refreshedInfo) {
      return;
    }

    let nextText = applyPlaneswalkerLayout(refreshedCard, heightsDefault, baseY);
    PLANESWALKER_ABILITY_KEYS.forEach((_, abilityIndex) => {
      const hasCost = Boolean(refreshedInfo.abilities?.[abilityIndex]?.trim());
      nextText = adjustPlaneswalkerTextBounds(nextText, refreshedInfo, abilityIndex, hasCost);
    });

    store.setText(nextText);
    store.setPlaneswalkerInfo({
      count: computePlaneswalkerCount([...heightsDefault]),
      baseY,
    });
  };

  if (!isPlaneswalkerCard) {
    return (
      <Box p={4} bg="rgba(0, 0, 0, 0.3)" borderRadius="md" color="gray.300">
        Load a Planeswalker frame version to access loyalty cost controls.
      </Box>
    );
  }

  return (
    <VStack align="stretch" gap={4}>
      <Box p={4} bg="rgba(0, 0, 0, 0.35)" borderRadius="md">
        <Heading size="sm" mb={2}>
          Loyalty Ability Layout
        </Heading>
        <Text fontSize="sm" color="gray.300">
          Configure each ability&apos;s text box height, loyalty cost symbol, and vertical placement. Current text allocation:
          {' '}
          {totalHeightPx}px across {activeAbilityCount} active abilities (normalized total {totalHeightNormalized.toFixed(4)}).
        </Text>
      </Box>

      {abilityRows.map((ability) => (
        <Box key={ability.key} p={4} bg="rgba(0, 0, 0, 0.25)" borderRadius="md">
          <Heading size="sm" mb={3}>
            {ability.label}
          </Heading>
          <VStack align="stretch" gap={3}>
            <HStack align="flex-end" gap={3} flexWrap="wrap">
              <Field label="Textbox Height (px)">
                <Input
                  type="number"
                  min={0}
                  step={1}
                  value={ability.heightPx}
                  onChange={(event) => {
                    const nextValue = Number(event.currentTarget.value);
                    if (!Number.isNaN(nextValue)) {
                      handleHeightChange(ability.index, nextValue);
                    }
                  }}
                />
              </Field>

              <Field label="Loyalty Cost">
                <Input
                  value={ability.cost}
                  onChange={(event) => handleCostChange(ability.index, event.currentTarget.value)}
                  placeholder="+1, 0, -7, etc."
                />
              </Field>

              <Field label="Icon Shift (px)">
                <Input
                  type="number"
                  step={1}
                  value={ability.shiftPx}
                  onChange={(event) => {
                    const nextValue = Number(event.currentTarget.value);
                    if (!Number.isNaN(nextValue)) {
                      handleShiftChange(ability.index, nextValue);
                    }
                  }}
                />
              </Field>
            </HStack>

            {ability.text && (
              <Box bg="rgba(0, 0, 0, 0.2)" borderRadius="sm" p={2} maxH="6.5em" overflowY="auto">
                <Text fontSize="xs" color="gray.300">
                  {ability.text}
                </Text>
              </Box>
            )}
          </VStack>
        </Box>
      ))}

      <Checkbox
        checked={Boolean(planeswalkerInfo?.invert)}
        onCheckedChange={(event) => handleInvertChange(!!event.checked)}
        colorPalette="blue"
      >
        Invert ability background colors
      </Checkbox>

      <HStack gap={3} justify="flex-end">
        <Button variant="outline" onClick={handleReset}>
          Reset to defaults
        </Button>
      </HStack>
    </VStack>
  );
};
