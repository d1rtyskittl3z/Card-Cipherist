/**
 * Canvas Constants
 *
 * Centralized canvas-related magic numbers and configuration values.
 * All constants are used across the multi-layer canvas rendering system.
 *
 * @module constants/canvas
 */

/**
 * Canvas margin used for text rendering and layout calculations.
 *
 * This margin creates buffer space around the card content to ensure
 * text and other elements have room for rendering effects like shadows,
 * outlines, and anti-aliasing.
 *
 * Used in:
 * - Text renderer (textRenderer.ts, draw.ts)
 * - Layout calculations
 *
 * @constant {number}
 * @default 300
 */
export const CANVAS_MARGIN = 300;

/**
 * Default card width in pixels.
 *
 * Standard MTG card dimensions based on 300 DPI print quality.
 * Approximately 2.5" × 3.5" at print size.
 *
 * @constant {number}
 * @default 744
 */
export const DEFAULT_CARD_WIDTH = 744;

/**
 * Default card height in pixels.
 *
 * Standard MTG card dimensions based on 300 DPI print quality.
 * Approximately 2.5" × 3.5" at print size.
 *
 * @constant {number}
 * @default 1039
 */
export const DEFAULT_CARD_HEIGHT = 1039;

/**
 * Frame budget in milliseconds for 60fps rendering.
 *
 * Target time budget for a single frame to maintain smooth 60fps.
 * If operations exceed this, they will drop below 60fps.
 *
 * Calculation: 1000ms / 60fps = 16.67ms per frame
 *
 * @constant {number}
 * @default 16
 */
export const FRAME_BUDGET_MS = 16;

/**
 * Target frames per second for canvas rendering.
 *
 * Used by throttled render hook to limit update frequency.
 *
 * @constant {number}
 * @default 60
 */
export const TARGET_FPS = 60;

/**
 * Image loading timeout in milliseconds.
 *
 * Maximum time to wait for an image to load before throwing an error.
 * Prevents hanging on broken/slow image URLs.
 *
 * @constant {number}
 * @default 30000 (30 seconds)
 */
export const IMAGE_LOAD_TIMEOUT_MS = 30000;

/**
 * Debounce delay for canvas re-renders in milliseconds.
 *
 * Prevents excessive canvas redraws during rapid state changes
 * (e.g., slider adjustments). Batches updates for better performance.
 *
 * @constant {number}
 * @default 100
 */
export const DEBOUNCE_DELAY_MS = 100;

/**
 * Performance warning threshold in milliseconds.
 *
 * Operations exceeding this threshold log a warning in dev mode
 * but are still considered acceptable.
 *
 * @constant {number}
 * @default 10
 */
export const PERFORMANCE_WARNING_THRESHOLD_MS = 10;

/**
 * Performance error threshold in milliseconds.
 *
 * Operations exceeding this threshold are considered problematic
 * and may cause frame drops. Equals FRAME_BUDGET_MS.
 *
 * @constant {number}
 * @default 16
 */
export const PERFORMANCE_ERROR_THRESHOLD_MS = FRAME_BUDGET_MS;

/**
 * Maximum metrics entries per category in performance monitor.
 *
 * Limits memory usage for performance tracking by capping
 * the number of stored metrics per operation type.
 *
 * @constant {number}
 * @default 100
 */
export const MAX_METRICS_PER_CATEGORY = 100;

/**
 * Default opacity value for fully opaque elements.
 *
 * Used as default for frame layers and other elements
 * that should be fully visible by default.
 *
 * Range: 0-100 (percentage)
 *
 * @constant {number}
 * @default 100
 */
export const DEFAULT_OPACITY = 100;

/**
 * Text font height ratio for baseline calculations.
 *
 * Ratio used to estimate visual baseline position of text
 * relative to the font size in the text renderer.
 *
 * @constant {number}
 * @default 0.7
 */
export const TEXT_FONT_HEIGHT_RATIO = 0.7;

/**
 * Debounce delay for text input in milliseconds.
 *
 * Delays text field updates until user stops typing.
 * Prevents excessive re-renders during rapid typing.
 *
 * @constant {number}
 * @default 300
 */
export const TEXT_INPUT_DEBOUNCE_MS = 300;

/**
 * Debounce delay for slider/number inputs in milliseconds.
 *
 * Delays position/zoom/rotation updates until user stops adjusting.
 * Prevents laggy UI during rapid slider movements.
 *
 * @constant {number}
 * @default 150
 */
export const SLIDER_DEBOUNCE_MS = 150;

/**
 * Debounce delay for color picker in milliseconds.
 *
 * Delays color updates until user stops picking.
 * Prevents excessive re-renders during color selection.
 *
 * @constant {number}
 * @default 150
 */
export const COLOR_PICKER_DEBOUNCE_MS = 150;
