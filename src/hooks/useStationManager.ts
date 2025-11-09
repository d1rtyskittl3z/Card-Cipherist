import { useEffect } from 'react';
import { useCardStore } from '../store/cardStore';
import { computeStationTextLayout, deriveStationState, shouldUseStationLayers } from '../utils/stationHelpers';
import { areStationsEqual } from '../utils/stationDefaults';

export const useStationManager = (): void => {
  const card = useCardStore((state) => state.card);
  const initializeStation = useCardStore((state) => state.initializeStation);
  const updateStationState = useCardStore((state) => state.updateStationState);
  const updateText = useCardStore((state) => state.updateText);

  useEffect(() => {
    if (card.version?.toLowerCase().includes('station')) {
      initializeStation(card.version);
    }
  }, [card.version, initializeStation]);

  useEffect(() => {
    if (!shouldUseStationLayers(card) || !card.station) {
      return;
    }

    const derivedStation = deriveStationState(card, card.station);

    if (!areStationsEqual(card.station, derivedStation)) {
      updateStationState(() => derivedStation);
    }

    const layout = computeStationTextLayout({ ...card, station: derivedStation }, derivedStation);

    if (layout.ability1 && card.text?.ability1) {
      const ability = card.text.ability1;
      const { x, y, width, height } = layout.ability1;
      if (ability.x !== x || ability.y !== y || ability.width !== width || ability.height !== height) {
        updateText('ability1', { x, y, width, height });
      }
    }

    if (layout.ability2 && card.text?.ability2) {
      const ability = card.text.ability2;
      const { x, y, width, height } = layout.ability2;
      if (ability.x !== x || ability.y !== y || ability.width !== width || ability.height !== height) {
        updateText('ability2', { x, y, width, height });
      }
    }
  }, [
    card,
    card.width,
    card.height,
    card.marginX,
    card.marginY,
    card.text?.mana?.text,
    card.text?.pt?.text,
    card.text?.ability1?.text,
    card.text?.ability2?.text,
    updateStationState,
    updateText,
  ]);
};
