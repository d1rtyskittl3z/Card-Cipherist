/**
 * Color Constants
 *
 * Centralized color values used throughout the application.
 * Includes base colors, UI colors, and semi-transparent overlays.
 *
 * @module constants/colors
 */

/**
 * Pure black color.
 *
 * Used for:
 * - Default color overlay for frames
 * - Text colors
 * - Background elements
 *
 * @constant {string}
 * @default '#000000'
 */
export const COLOR_BLACK = '#000000';

/**
 * Pure white color (full hex).
 *
 * Used for:
 * - Text colors
 * - UI elements
 * - Frame backgrounds
 *
 * @constant {string}
 * @default '#FFFFFF'
 */
export const COLOR_WHITE = '#FFFFFF';

/**
 * Pure white color (short hex).
 *
 * Shorthand version of COLOR_WHITE for convenience.
 *
 * @constant {string}
 * @default '#fff'
 */
export const COLOR_WHITE_SHORT = '#fff';

/**
 * Pure black color (short hex).
 *
 * Shorthand version of COLOR_BLACK for convenience.
 *
 * @constant {string}
 * @default '#000'
 */
export const COLOR_BLACK_SHORT = '#000';

/**
 * Transparent color keyword.
 *
 * Used for clearing backgrounds and transparent elements.
 *
 * @constant {string}
 * @default 'transparent'
 */
export const COLOR_TRANSPARENT = 'transparent';

/**
 * Dark semi-transparent overlay.
 *
 * Used for:
 * - Panel backgrounds
 * - Input field backgrounds
 * - Modal overlays
 *
 * Opacity: 30%
 *
 * @constant {string}
 * @default 'rgba(0, 0, 0, 0.3)'
 */
export const OVERLAY_DARK_30 = 'rgba(0, 0, 0, 0.3)';

/**
 * Darker semi-transparent overlay.
 *
 * Used for deeper nested UI elements.
 *
 * Opacity: 35%
 *
 * @constant {string}
 * @default 'rgba(0, 0, 0, 0.35)'
 */
export const OVERLAY_DARK_35 = 'rgba(0, 0, 0, 0.35)';

/**
 * Dark medium overlay.
 *
 * Used for secondary backgrounds and containers.
 *
 * Opacity: 50%
 *
 * @constant {string}
 * @default 'rgba(0, 0, 0, 0.5)'
 */
export const OVERLAY_DARK_50 = 'rgba(0, 0, 0, 0.5)';

/**
 * Very dark overlay for headers and top-level containers.
 *
 * Opacity: 70%
 *
 * @constant {string}
 * @default 'rgba(0, 0, 0, 0.7)'
 */
export const OVERLAY_DARK_70 = 'rgba(0, 0, 0, 0.7)';

/**
 * Lighter dark overlay for tertiary elements.
 *
 * Opacity: 25%
 *
 * @constant {string}
 * @default 'rgba(0, 0, 0, 0.25)'
 */
export const OVERLAY_DARK_25 = 'rgba(0, 0, 0, 0.25)';

/**
 * Very light dark overlay for subtle backgrounds.
 *
 * Opacity: 20%
 *
 * @constant {string}
 * @default 'rgba(0, 0, 0, 0.2)'
 */
export const OVERLAY_DARK_20 = 'rgba(0, 0, 0, 0.2)';

/**
 * Light semi-transparent overlay.
 *
 * Used for:
 * - Hover states
 * - Active states
 * - Subtle highlights
 *
 * Opacity: 10%
 *
 * @constant {string}
 * @default 'rgba(255, 255, 255, 0.1)'
 */
export const OVERLAY_LIGHT_10 = 'rgba(255, 255, 255, 0.1)';

/**
 * Very light overlay for borders and dividers.
 *
 * Opacity: 15%
 *
 * @constant {string}
 * @default 'rgba(255, 255, 255, 0.15)'
 */
export const OVERLAY_LIGHT_15 = 'rgba(255, 255, 255, 0.15)';

/**
 * Ultra-light overlay for subtle hover effects.
 *
 * Opacity: 5%
 *
 * @constant {string}
 * @default 'rgba(255, 255, 255, 0.05)'
 */
export const OVERLAY_LIGHT_05 = 'rgba(255, 255, 255, 0.05)';

/**
 * High-visibility text overlay.
 *
 * Used for text on dark backgrounds.
 *
 * Opacity: 87%
 *
 * @constant {string}
 * @default 'rgba(255, 255, 255, 0.87)'
 */
export const OVERLAY_LIGHT_87 = 'rgba(255, 255, 255, 0.87)';

/**
 * Red error overlay for delete hover states.
 *
 * Opacity: 10%
 *
 * @constant {string}
 * @default 'rgba(255, 0, 0, 0.1)'
 */
export const OVERLAY_RED_10 = 'rgba(255, 0, 0, 0.1)';

/**
 * Canvas shadow color for preview card.
 *
 * Used for drop shadow effect on the card canvas.
 *
 * Opacity: 50%
 *
 * @constant {string}
 * @default 'rgba(0, 0, 0, 0.5)'
 */
export const CANVAS_SHADOW_COLOR = OVERLAY_DARK_50;

/**
 * Modal/dropdown shadow color.
 *
 * Used for box shadows on elevated elements.
 *
 * Opacity: 50%
 *
 * @constant {string}
 * @default 'rgba(0, 0, 0, 0.5)'
 */
export const MODAL_SHADOW_COLOR = OVERLAY_DARK_50;
