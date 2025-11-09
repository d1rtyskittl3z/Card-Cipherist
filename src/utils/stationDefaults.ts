import type { StationState } from '../types/card.types';

export const LEGACY_CARD_HEIGHT = 2100;

export const createStationDefaults = (): StationState => ({
  abilityCount: 3,
  x: 0.1167,
  width: 0.8094,
  badgeX: 0.066,
  badgeValues: ['', '', ''],
  disableFirstAbility: false,
  disabledTextX: 0.087,
  disabledTextWidth: 0.825,
  importSettings: {
    singleAbility: {
      yOffset: -250,
      height1: 550,
    },
    versionOverrides: {
      stationRegular: {
        yOffset: -275,
        height1: 525,
        minDistanceFromBottom: 163,
      },
      stationBorderless: {
        yOffset: -275,
        height1: 525,
        minDistanceFromBottom: 163,
      },
    },
  },
  badgeSettings: {
    fontSize: 0.0245,
    width: 162,
    height: 162,
    x: -94,
    y: 0,
  },
  squares: {
    1: { width: 1714, height: 300, x: 0, y: 76, enabled: true, color: '#e6ecf2', opacity: 0.2 },
    2: { width: 1714, height: 250, x: 0, y: 0, enabled: true, color: '#e6ecf2', opacity: 0.4 },
  },
  minDistanceFromBottom: 150,
  baseTextPositions: {
    ability1: { x: 0.18, y: 0.7 },
    ability2: { x: 0.18, y: 0.83 },
  },
  textOffsets: {
    1: { x: 85, y: 15 },
    2: { x: 85, y: 12 },
  },
  ptSettings: {
    fontSize: 0.032,
    width: 306,
    height: 148,
    x: 0,
    y: 0,
  },
  colorModes: { 1: 'auto', 2: 'auto' },
  ptColorMode: 'auto',
  badgeColorMode: 'auto',
  colorSettings: {
    default: { square1: '#e6ecf2', square2OpacityOffset: 0.2 },
    w: { square1: '#4a4a4a', square2OpacityOffset: 0.2 },
    u: { square1: '#0075be', square2OpacityOffset: 0.2 },
    b: { square1: '#272624', square2OpacityOffset: 0.15 },
    r: { square1: '#ef3827', square2OpacityOffset: 0.2 },
    g: { square1: '#007b43', square2OpacityOffset: 0.45 },
    m: { square1: '#bc932e', square2OpacityOffset: 0.25 },
    a: { square1: '#416c77', square2OpacityOffset: 0.2 },
    l: { square1: '#7c5439', square2OpacityOffset: 0.2 },
  },
  packDefaults: {
    ability: { x: 175 / 2010, y: 1775 / 2814, width: 1660 / 2010, height: 280 / 2814 },
  },
  borderlessXOffset: 0,
});

export const cloneStationState = (station: StationState): StationState =>
  JSON.parse(JSON.stringify(station)) as StationState;

export const mergeStationDefaults = (existing?: StationState | null): StationState => {
  if (!existing) {
    return createStationDefaults();
  }

  const defaults = createStationDefaults();

  return {
    ...defaults,
    ...existing,
    badgeValues: existing.badgeValues ? [...existing.badgeValues] as [string, string, string] : [...defaults.badgeValues],
    badgeSettings: { ...defaults.badgeSettings, ...(existing.badgeSettings ?? {}) },
    squares: {
      1: { ...defaults.squares[1], ...(existing.squares?.[1] ?? {}) },
      2: { ...defaults.squares[2], ...(existing.squares?.[2] ?? {}) },
    },
    baseTextPositions: {
      ability1: { ...defaults.baseTextPositions.ability1, ...(existing.baseTextPositions?.ability1 ?? {}) },
      ability2: { ...defaults.baseTextPositions.ability2, ...(existing.baseTextPositions?.ability2 ?? {}) },
    },
    textOffsets: {
      1: { ...defaults.textOffsets[1], ...(existing.textOffsets?.[1] ?? {}) },
      2: { ...defaults.textOffsets[2], ...(existing.textOffsets?.[2] ?? {}) },
    },
    colorModes: {
      1: existing.colorModes?.[1] ?? defaults.colorModes[1],
      2: existing.colorModes?.[2] ?? defaults.colorModes[2],
    },
    colorSettings: {
      ...defaults.colorSettings,
      ...(existing.colorSettings ?? {}),
    },
    importSettings: {
      singleAbility: {
        ...defaults.importSettings.singleAbility,
        ...(existing.importSettings?.singleAbility ?? {}),
      },
      versionOverrides: {
        ...defaults.importSettings.versionOverrides,
        ...(existing.importSettings?.versionOverrides ?? {}),
      },
    },
    ptSettings: { ...defaults.ptSettings, ...(existing.ptSettings ?? {}) },
    packDefaults: {
      ...defaults.packDefaults,
      ...(existing.packDefaults ?? {}),
    },
    ptColorMode: existing.ptColorMode ?? defaults.ptColorMode,
    badgeColorMode: existing.badgeColorMode ?? defaults.badgeColorMode,
    minDistanceFromBottom: existing.minDistanceFromBottom ?? defaults.minDistanceFromBottom,
    borderlessXOffset: existing.borderlessXOffset ?? defaults.borderlessXOffset,
    badgeVariant: existing.badgeVariant ?? defaults.badgeVariant,
    ptVariant: existing.ptVariant ?? defaults.ptVariant,
  };
};

export const applyStationVersionPreset = (station: StationState, version?: string): StationState => {
  if (!version) {
    return station;
  }

  const next = cloneStationState(station);

  if (version === 'stationBorderless') {
    next.borderlessXOffset = 1;
    next.squares[1] = { ...next.squares[1], width: 1712, x: 1 };
    next.squares[2] = { ...next.squares[2], width: 1712, x: 1 };
  } else {
    next.borderlessXOffset = 0;
    next.squares[1] = { ...next.squares[1], width: 1714, x: 0 };
    next.squares[2] = { ...next.squares[2], width: 1714, x: 0 };
  }

  return next;
};

export const areStationsEqual = (a: StationState, b: StationState): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};
