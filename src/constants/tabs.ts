/**
 * Tab Constants
 *
 * Defines all tab identifiers used in the Card Creator Layout accordion.
 * These constants ensure type safety and prevent typos in tab references.
 *
 * @module constants/tabs
 */

/**
 * All available tab identifiers in the Card Creator Layout
 *
 * Tabs are organized as follows:
 * - SCRYFALL: Import card data from Scryfall API
 * - FRAME: Frame pack selection and frame editor
 * - SAGA: Saga-specific controls (conditional)
 * - PLANESWALKER: Planeswalker-specific controls (conditional)
 * - KAMIGAWA: Kamigawa/Neo Basics controls (conditional)
 * - STATIONS: Station card controls (conditional)
 * - TEXT: Text field editing
 * - ART: Art upload and positioning
 * - SET_SYMBOL: Set symbol selection
 * - WATERMARK: Watermark configuration
 * - COLLECTOR: Bottom info and collector details
 * - SAVE: Export/import card JSON and save as PNG
 * - TUTORIAL: Help documentation (currently hidden)
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

/**
 * Type representing any valid tab key
 * Extracted from the TABS constant for type safety
 */
export type TabKey = typeof TABS[keyof typeof TABS];
