/**
 * Card frame version identifiers
 */
export const CARD_VERSIONS = {
  M15_REGULAR: 'm15Regular',
  NEO_BASICS: 'neoBasics',
  SAGA: 'saga',
  PLANESWALKER: 'planeswalker',
  STATION_REGULAR: 'stationRegular',
  STATION_BORDERLESS: 'stationBorderless',
  TOKEN_REGULAR: 'tokenRegular',
  TRANSFORM: 'transform',
  MODAL_DFC: 'modalDfc',
} as const;

export type CardVersion = typeof CARD_VERSIONS[keyof typeof CARD_VERSIONS];

/**
 * Helper to check if a version is a saga card
 */
export const isSagaVersion = (version: string): boolean => {
  return version.toLowerCase().includes('saga');
};

/**
 * Helper to check if a version is a planeswalker card
 */
export const isPlaneswalkerVersion = (version: string): boolean => {
  return version.toLowerCase().includes('planeswalker');
};

/**
 * Helper to check if a version is a station card
 */
export const isStationVersion = (version: string): boolean => {
  return version.toLowerCase().includes('station');
};
