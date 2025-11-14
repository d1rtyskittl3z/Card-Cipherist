/**
 * Application tab identifiers
 * Used in CardCreatorLayout for accordion navigation
 */
export const TABS = {
  SCRYFALL: 'scryfall',
  FRAME: 'frame',
  SAGA: 'saga',
  PLANESWALKER: 'planeswalker',
  KAMIGAWA: 'kamigawa',
  STATIONS: 'stations',
  TEXT: 'text',
  ART: 'art',
  SET_SYMBOL: 'setSymbol',
  WATERMARK: 'watermark',
  COLLECTOR: 'collector',
  SAVE: 'save',
  TUTORIAL: 'tutorial',
} as const;

export type TabKey = typeof TABS[keyof typeof TABS];
