/**
 * Font Constants
 *
 * Centralized font family names and default font configurations.
 * All fonts are custom MTG-style fonts loaded via @font-face in index.css.
 *
 * @module constants/fonts
 */

/**
 * Beleren font family (regular weight).
 *
 * Primary display font used for:
 * - Card titles
 * - Set names
 * - Planeswalker names
 *
 * Based on the font used in modern Magic: The Gathering cards.
 *
 * @constant {string}
 * @default 'beleren'
 */
export const FONT_BELEREN = 'beleren';

/**
 * Beleren Bold font family.
 *
 * Bold weight variant of Beleren, used for:
 * - Emphasized titles
 * - Headers
 *
 * @constant {string}
 * @default 'belerenBold'
 */
export const FONT_BELEREN_BOLD = 'belerenBold';

/**
 * Beleren Small Caps font family.
 *
 * Small caps variant, used for:
 * - Type lines
 * - Subtypes
 *
 * @constant {string}
 * @default 'belerenSmallCaps'
 */
export const FONT_BELEREN_SMALL_CAPS = 'belerenSmallCaps';

/**
 * Relay Medium font family.
 *
 * Used for:
 * - Collector information
 * - Artist names
 * - Set codes
 *
 * @constant {string}
 * @default 'relayMedium'
 */
export const FONT_RELAY_MEDIUM = 'relayMedium';

/**
 * MPlantin font family (regular).
 *
 * Primary rules text font, used for:
 * - Card rules text
 * - Flavor text (when not italic)
 * - Power/toughness
 *
 * Default font for text fields if not specified.
 *
 * @constant {string}
 * @default 'mplantin'
 */
export const FONT_MPLANTIN = 'mplantin';

/**
 * MPlantin Italic font family.
 *
 * Italic variant, used for:
 * - Flavor text
 * - Reminder text
 * - Ability words
 *
 * @constant {string}
 * @default 'mplantinItalic'
 */
export const FONT_MPLANTIN_ITALIC = 'mplantinItalic';

/**
 * Matrix font family.
 *
 * Used for:
 * - Saga chapter numbers
 * - Special card types
 *
 * @constant {string}
 * @default 'matrix'
 */
export const FONT_MATRIX = 'matrix';

/**
 * Matrix Bold font family.
 *
 * Bold variant of Matrix font.
 *
 * @constant {string}
 * @default 'matrixBold'
 */
export const FONT_MATRIX_BOLD = 'matrixBold';

/**
 * Matrix Bold Small Caps font family.
 *
 * Used for specific Saga formatting.
 *
 * @constant {string}
 * @default 'matrixBoldSmallCaps'
 */
export const FONT_MATRIX_BOLD_SMALL_CAPS = 'matrixBoldSmallCaps';

/**
 * NDPMTG font family.
 *
 * Used for:
 * - Mana symbols in text
 * - Special symbols
 *
 * @constant {string}
 * @default 'ndpmtg'
 */
export const FONT_NDPMTG = 'ndpmtg';

/**
 * Default fallback font stack.
 *
 * Used when custom fonts fail to load.
 *
 * @constant {string[]}
 * @default ['Arial', 'sans-serif']
 */
export const FALLBACK_FONT_STACK = ['Arial', 'sans-serif'];

/**
 * Default font family for text fields.
 *
 * Used when no font is specified in text configuration.
 *
 * @constant {string}
 * @default 'mplantin'
 */
export const DEFAULT_TEXT_FONT = FONT_MPLANTIN;

/**
 * Default font size for title text (normalized 0-1).
 *
 * Relative to card height.
 *
 * @constant {number}
 * @default 0.0364
 */
export const DEFAULT_FONT_SIZE_TITLE = 0.0364;

/**
 * Default font size for type line (normalized 0-1).
 *
 * Relative to card height.
 *
 * @constant {number}
 * @default 0.0274
 */
export const DEFAULT_FONT_SIZE_TYPE = 0.0274;

/**
 * Default font size for rules text (normalized 0-1).
 *
 * Relative to card height.
 *
 * @constant {number}
 * @default 0.0261
 */
export const DEFAULT_FONT_SIZE_RULES = 0.0261;

/**
 * All available font families.
 *
 * Used for font selection dropdowns and validation.
 *
 * @constant {string[]}
 */
export const AVAILABLE_FONTS = [
  FONT_BELEREN,
  FONT_BELEREN_BOLD,
  FONT_BELEREN_SMALL_CAPS,
  FONT_RELAY_MEDIUM,
  FONT_MPLANTIN,
  FONT_MPLANTIN_ITALIC,
  FONT_MATRIX,
  FONT_MATRIX_BOLD,
  FONT_MATRIX_BOLD_SMALL_CAPS,
  FONT_NDPMTG,
] as const;

/**
 * Type for valid font family names.
 */
export type FontFamily = typeof AVAILABLE_FONTS[number];
