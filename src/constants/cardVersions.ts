/**
 * Card Version Constants
 *
 * Defines all card version identifiers used in frame packs.
 * These constants ensure type safety when checking card versions and enable
 * conditional feature activation (e.g., showing Saga/Planeswalker tabs).
 *
 * @module constants/cardVersions
 */

/**
 * Card version identifiers
 *
 * Special versions that trigger conditional features:
 * - SAGA_NYX: Shows Saga tab, enables lore counter config
 * - PLANESWALKER_REGULAR: Shows Planeswalker tab
 * - PLANESWALKER_CLASSICSHIFTED: Shows Planeswalker tab (alternate style)
 * - PLANESWALKER_TRANSFORM_FRONT: Shows Planeswalker tab (transform variant)
 * - NEO_BASICS: Shows Kamigawa tab, enables frame stretching
 * - STATION_REGULAR: Shows Stations tab
 * - STATION_BORDERLESS: Shows Stations tab (borderless variant)
 */
export const CARD_VERSIONS = {
  // Standard versions
  M15_REGULAR: 'm15Regular',
  M15_TRANSFORM_FRONT: 'm15TransformFront',
  M15_TRANSFORM_NYX_FRONT: 'm15TransformNyxFront',
  M15_EXTENDED: 'm15Extended',
  M15_CLEAR_TEXTBOXES: 'm15ClearTextboxes',
  M15_NICKNAME: 'm15Nickname',
  M15_NYX: 'm15Nyx',
  M15_SNOW: 'm15Snow',
  M15_INNER_CROWNS: 'm15InnerCrowns',
  M15_LEGEND_CROWNS: 'm15LegendCrowns',
  M15_LEGEND_CROWNS_FLOATING: 'm15LegendCrownsFloating',
  M15_SPREE: 'm15Spree',
  M21: 'm21',

  // Saga versions
  SAGA_NYX: 'sagaNyx',

  // Planeswalker versions
  PLANESWALKER_REGULAR: 'planeswalkerRegular',
  PLANESWALKER_CLASSICSHIFTED: 'planeswalkerClassicshifted',
  PLANESWALKER_TRANSFORM_FRONT: 'planeswalkerTransformFront',

  // Kamigawa / Neo Basics
  NEO_BASICS: 'neoBasics',

  // Station versions
  STATION_REGULAR: 'stationRegular',
  STATION_BORDERLESS: 'stationBorderless',

  // Token versions
  TOKEN_REGULAR: 'tokenRegular',
  TOKEN_REGULAR_M15: 'tokenRegularM15',
  TOKEN_SHORT: 'tokenShort',
  TOKEN_TALL: 'tokenTall',
  TOKEN_TEXTLESS: 'tokenTextless',
  TOKEN_TEXTLESS_M15: 'tokenTextlessM15',
  TOKEN_TEXTLESS_BORDERLESS: 'tokenTextlessBorderless',
  TOKEN_MARKER: 'tokenMarker',
  TOKEN_MONARCH: 'tokenMonarch',
  TOKEN_INITIATIVE: 'tokenInitiative',

  // Modal DFC
  MODAL_REGULAR: 'modalRegular',

  // Classicshifted versions
  CLASSICSHIFTED: 'classicshifted',
  CLASSICSHIFTED_LANDS: 'classicshiftedLands',
  CLASSICSHIFTED_TRANSFORM: 'classicshiftedTransform',
  CLASSICSHIFTED_NICKNAME: 'classicshiftedNickname',

  // Showcase and promo versions
  PROMO_REGULAR: 'promoRegular',
  PROMO_EXTENDED: 'promoExtended',
  PROMO_NYX: 'promoNyx',
  PROMO_NICKNAME: 'promoNickname',
  PROMO_GENERIC_SHOWCASE: 'promoGenericShowcase',
  PROMO_OPEN_HOUSE: 'promoOpenHouse',
  BORDERLESS: 'borderless',
  BORDERLESS_STELLAR_SIGHTS: 'borderless',

  // Special frame types
  ELEMENTAL: 'elemental',
  COLORSHIFTED: 'colorshifted',
  CONSPIRACY: 'conspiracy',
  ATTRACTION: 'attraction',
  EMBLEM: 'emblem',
  WANTED: 'wanted',
  UNFINITY: 'unfinity',
  UNSTABLE: 'unstable',

  // Universes Beyond
  UB_REGULAR: 'ubRegular',
  UB_EXTENDED: 'ubExtended',
  UB_FULL: 'ubFull',

  // Oil Slick and special treatments
  OIL_SLICK: 'oilSlick',
  SNOW_REGULAR: 'snowRegular',
  MAGIC_FEST: 'magicFest',
  MARGIN: 'margin',

  // Zendikar and other basics
  ZENDIKAR_BASIC: 'zendikarBasic',
  FULLART_BASIC_ROUND_BOTTOM: 'fullartBasicRoundBottom',
  EOE_BASICS: 'eoeBasics',
  TEXTLESS_BASICS: 'textlessBasics',
  TEXTLESS_BASICS_2022: 'textlessBasics2022',
  TEXTLESS_BASICS_2022_UB: 'textlessBasics2022UB',
  TEXTLESS_GENERIC_SHOWCASE: 'textlessGenericShowcase',

  // Custom versions
  CUSTOM_NEON: 'customNeon',
  JAPANESE_SHOWCASE: 'JapaneseShowcase',
} as const;

/**
 * Type representing any valid card version
 * Extracted from the CARD_VERSIONS constant for type safety
 */
export type CardVersion = typeof CARD_VERSIONS[keyof typeof CARD_VERSIONS];

/**
 * Check if a version string indicates a Saga card
 * @param version - The version string to check
 * @returns True if the version is a Saga variant
 */
export const isSagaVersion = (version: string | undefined): boolean => {
  if (!version) return false;
  const lowerVersion = version.toLowerCase();
  return lowerVersion.includes('saga');
};

/**
 * Check if a version string indicates a Planeswalker card
 * @param version - The version string to check
 * @returns True if the version is a Planeswalker variant
 */
export const isPlaneswalkerVersion = (version: string | undefined): boolean => {
  if (!version) return false;
  const lowerVersion = version.toLowerCase();
  return lowerVersion.includes('planeswalker');
};

/**
 * Check if a version string indicates a Station card
 * @param version - The version string to check
 * @returns True if the version is a Station variant
 */
export const isStationVersion = (version: string | undefined): boolean => {
  if (!version) return false;
  const lowerVersion = version.toLowerCase();
  return lowerVersion.includes('station');
};

/**
 * Check if a version string indicates a Kamigawa/Neo Basics card
 * @param version - The version string to check
 * @returns True if the version is a Neo Basics variant
 */
export const isNeoBasicsVersion = (version: string | undefined): boolean => {
  if (!version) return false;
  return version === CARD_VERSIONS.NEO_BASICS;
};

/**
 * Check if a version string indicates a Token card
 * @param version - The version string to check
 * @returns True if the version is a Token variant
 */
export const isTokenVersion = (version: string | undefined): boolean => {
  if (!version) return false;
  const lowerVersion = version.toLowerCase();
  return lowerVersion.includes('token');
};

/**
 * Check if a version string indicates a Transform/DFC card
 * @param version - The version string to check
 * @returns True if the version is a Transform or Modal DFC variant
 */
export const isTransformVersion = (version: string | undefined): boolean => {
  if (!version) return false;
  const lowerVersion = version.toLowerCase();
  return lowerVersion.includes('transform') || lowerVersion.includes('modal');
};
