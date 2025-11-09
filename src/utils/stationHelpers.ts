import type { Card, StationState, TextObject } from '../types/card.types';
import type { StationColorMode } from '../types/card.types';
import { loadImage, scaleHeight, scaleY } from './canvasHelpers';
import { LEGACY_CARD_HEIGHT, cloneStationState } from './stationDefaults';

const STATION_IMAGE_CACHE: Record<string, Promise<HTMLImageElement>> = {};

const MODE_TO_COLOR_KEY: Record<Exclude<StationColorMode, 'custom'>, string> = {
  auto: 'auto',
  white: 'w',
  blue: 'u',
  black: 'b',
  red: 'r',
  green: 'g',
  multi: 'm',
  colorless: 'a',
  artifact: 'a',
  land: 'l',
};

const DEFAULT_VARIANT = 'a';

export const shouldUseStationLayers = (card: Card): boolean => {
  return Boolean(card.version?.toLowerCase().includes('station') && card.station);
};

export const extractManaSymbols = (manaText: string): string[] => {
  const matches = manaText.match(/\{([A-Za-z])\}/g);
  if (!matches) {
    return [];
  }

  const colors: string[] = [];
  matches.forEach((token) => {
    const key = token.replace(/[{}]/g, '').toLowerCase();
    if (['w', 'u', 'b', 'r', 'g'].includes(key) && !colors.includes(key)) {
      colors.push(key);
    }
  });

  return colors;
};

const resolveAutoColorKey = (symbols: string[]): string => {
  if (symbols.length === 0) {
    return 'default';
  }
  if (symbols.length === 1) {
    return symbols[0];
  }
  return 'm';
};

const mapModeToVariant = (mode: StationColorMode, autoKey: string): string => {
  if (mode === 'custom') {
    return DEFAULT_VARIANT;
  }

  if (mode === 'auto') {
    const derived = autoKey === 'default' ? 'a' : autoKey;
    return derived;
  }

  return MODE_TO_COLOR_KEY[mode] || DEFAULT_VARIANT;
};

const getColorSetForMode = (
  mode: StationColorMode,
  station: StationState,
  autoKey: string
): { square1: string; square2OpacityOffset: number } | null => {
  if (mode === 'custom') {
    return null;
  }

  if (mode === 'auto') {
    return station.colorSettings[autoKey] ?? station.colorSettings.default;
  }

  const mappedKey = MODE_TO_COLOR_KEY[mode];
  if (!mappedKey) {
    return station.colorSettings.default;
  }

  return station.colorSettings[mappedKey] ?? station.colorSettings.default;
};

export const deriveStationState = (card: Card, station: StationState): StationState => {
  const next = cloneStationState(station);

  const manaText = card.text?.mana?.text ?? '';
  const manaSymbols = extractManaSymbols(manaText);
  const autoColorKey = resolveAutoColorKey(manaSymbols);
  const square1Mode = next.colorModes[1] ?? 'auto';
  const square2Mode = next.colorModes[2] ?? 'auto';

  const square1Set = getColorSetForMode(square1Mode, station, autoColorKey);
  if (square1Set) {
    next.squares[1].color = square1Set.square1;
  }

  const square2Set = getColorSetForMode(square2Mode, station, autoColorKey);
  if (square2Set) {
    next.squares[2].color = square2Set.square1;

    if (square2Mode === 'auto') {
      const offset = square2Set.square2OpacityOffset ?? 0.2;
      next.squares[2].opacity = next.disableFirstAbility
        ? next.squares[1].opacity
        : Math.min(1, next.squares[1].opacity + offset);
    } else if (square2Mode !== 'custom') {
      const offset = square2Set.square2OpacityOffset ?? 0.2;
      next.squares[2].opacity = next.disableFirstAbility ? 0.2 : Math.min(1, 0.2 + offset);
    }
  }

  const badgeVariant = mapModeToVariant(next.badgeColorMode ?? 'auto', autoColorKey);
  next.badgeVariant = badgeVariant || DEFAULT_VARIANT;

  const ptVariant = mapModeToVariant(next.ptColorMode ?? 'auto', autoColorKey);
  next.ptVariant = ptVariant || DEFAULT_VARIANT;

  next.squares[1].enabled = !next.disableFirstAbility;

  const baseAbility1 = next.baseTextPositions.ability1;
  const baseAbility2 = next.baseTextPositions.ability2;

  const square1Bottom = scaleY(card, baseAbility1.y) + next.squares[1].y + next.squares[1].height;
  next.squares[2].y = square1Bottom - scaleY(card, baseAbility2.y);

  const overrideKey = card.version ?? '';
  const versionOverride = next.importSettings.versionOverrides?.[overrideKey];
  let minDistance = versionOverride?.minDistanceFromBottom ?? next.minDistanceFromBottom;
  if (card.margins) {
    minDistance += 60;
  }

  const canvasHeight = Math.round(card.height * (1 + 2 * card.marginY));
  const scaledMinDistance = scaleHeight(card, minDistance / LEGACY_CARD_HEIGHT);
  const square2Top = scaleY(card, baseAbility2.y) + next.squares[2].y;
  const maxAllowedBottom = canvasHeight - scaledMinDistance;
  const computedHeight = Math.max(50, maxAllowedBottom - square2Top);
  next.squares[2].height = computedHeight;

  return next;
};

export const computeStationTextLayout = (
  card: Card,
  station: StationState
): Partial<Record<'ability1' | 'ability2', Partial<TextObject>>> => {
  const updates: Partial<Record<'ability1' | 'ability2', Partial<TextObject>>> = {};

  if (card.text?.ability1 && station.squares[1]) {
    const square = station.squares[1];
    const offset = station.textOffsets[1];
    const base = station.baseTextPositions.ability1;

    let width = (square.width * 0.9) / card.width;
    const height = (square.height * 0.9) / card.height;
    let x: number;
    const y = base.y + (square.y + offset.y) / card.height;

    if (station.disableFirstAbility) {
      x = station.disabledTextX;
      width = station.disabledTextWidth;
    } else {
      x = base.x + (square.x + offset.x - 214) / card.width;
    }

    updates.ability1 = { x, y, width, height };
  }

  if (card.text?.ability2 && station.squares[2]) {
    const square = station.squares[2];
    const offset = station.textOffsets[2];
    const base = station.baseTextPositions.ability2;

    let width = (square.width * 0.9) / card.width;
    const height = (square.height * 0.9) / card.height;

    if (card.text?.pt?.text?.trim()) {
      width *= 0.865;
    }

    const x = base.x + (square.x + offset.x - 214) / card.width;
    const y = base.y + (square.y + offset.y) / card.height;

    updates.ability2 = { x, y, width, height };
  }

  return updates;
};

export const getStationImage = (
  type: 'badge' | 'pt',
  variant: string | undefined
): Promise<HTMLImageElement> => {
  const normalizedVariant = (variant && variant.trim()) || DEFAULT_VARIANT;
  const key = `${type}:${normalizedVariant}`;

  if (!STATION_IMAGE_CACHE[key]) {
    const folder = type === 'badge' ? 'badges' : 'pt';
    const path = `/img/frames/station/${folder}/${normalizedVariant}.png`;
    STATION_IMAGE_CACHE[key] = loadImage(path);
  }

  return STATION_IMAGE_CACHE[key];
};
