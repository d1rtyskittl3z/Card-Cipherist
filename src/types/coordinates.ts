/**
 * Coordinate Type System
 * Provides branded types for type-safe coordinate handling in Card Conjurer
 *
 * Coordinates in Card Conjurer use two systems:
 * - NormalizedCoord: 0-1 range coordinates (relative to card dimensions)
 * - PixelCoord: Absolute pixel coordinates on canvas
 */

/**
 * Branded type for normalized coordinates (0-1 range)
 * Used for positions and sizes relative to card dimensions
 */
export type NormalizedCoord = number & { readonly __brand: 'NormalizedCoord' };

/**
 * Branded type for pixel coordinates
 * Used for absolute positions on canvas
 */
export type PixelCoord = number & { readonly __brand: 'PixelCoord' };

/**
 * Validates and converts a number to NormalizedCoord
 * @param value - Number to validate (should be in 0-1 range)
 * @param allowOutOfRange - If true, allows values outside 0-1 (for margins/masks)
 * @returns Branded NormalizedCoord
 * @throws Error if value is invalid
 */
export function toNormalized(
  value: number,
  allowOutOfRange = false
): NormalizedCoord {
  if (typeof value !== 'number' || !isFinite(value)) {
    throw new Error(`Invalid normalized coordinate: ${value} (must be a finite number)`);
  }

  if (!allowOutOfRange && (value < 0 || value > 1)) {
    throw new Error(
      `Normalized coordinate out of range: ${value} (must be between 0 and 1)`
    );
  }

  return value as NormalizedCoord;
}

/**
 * Validates and converts a number to PixelCoord
 * @param value - Number to validate
 * @returns Branded PixelCoord
 * @throws Error if value is invalid
 */
export function toPixel(value: number): PixelCoord {
  if (typeof value !== 'number' || !isFinite(value)) {
    throw new Error(`Invalid pixel coordinate: ${value} (must be a finite number)`);
  }

  return value as PixelCoord;
}

/**
 * Type guard for NormalizedCoord
 * @param value - Value to check
 * @returns True if value is a valid NormalizedCoord
 */
export function isNormalizedCoord(value: unknown): value is NormalizedCoord {
  return typeof value === 'number' && isFinite(value);
}

/**
 * Type guard for PixelCoord
 * @param value - Value to check
 * @returns True if value is a valid PixelCoord
 */
export function isPixelCoord(value: unknown): value is PixelCoord {
  return typeof value === 'number' && isFinite(value);
}

/**
 * Safely converts a normalized coordinate to number for calculations
 * @param coord - NormalizedCoord to convert
 * @returns Plain number
 */
export function fromNormalized(coord: NormalizedCoord): number {
  return coord as number;
}

/**
 * Safely converts a pixel coordinate to number for calculations
 * @param coord - PixelCoord to convert
 * @returns Plain number
 */
export function fromPixel(coord: PixelCoord): number {
  return coord as number;
}

/**
 * Bounds interface using normalized coordinates
 */
export interface NormalizedBounds {
  x: NormalizedCoord;
  y: NormalizedCoord;
  width: NormalizedCoord;
  height: NormalizedCoord;
}

/**
 * Bounds interface using pixel coordinates
 */
export interface PixelBounds {
  x: PixelCoord;
  y: PixelCoord;
  width: PixelCoord;
  height: PixelCoord;
}

/**
 * Creates a NormalizedBounds object with validation
 * @param x - X position (0-1)
 * @param y - Y position (0-1)
 * @param width - Width (0-1)
 * @param height - Height (0-1)
 * @param allowOutOfRange - Allow coordinates outside 0-1 range
 * @returns Validated NormalizedBounds
 */
export function createNormalizedBounds(
  x: number,
  y: number,
  width: number,
  height: number,
  allowOutOfRange = false
): NormalizedBounds {
  return {
    x: toNormalized(x, allowOutOfRange),
    y: toNormalized(y, allowOutOfRange),
    width: toNormalized(width, allowOutOfRange),
    height: toNormalized(height, allowOutOfRange),
  };
}

/**
 * Creates a PixelBounds object with validation
 * @param x - X position in pixels
 * @param y - Y position in pixels
 * @param width - Width in pixels
 * @param height - Height in pixels
 * @returns Validated PixelBounds
 */
export function createPixelBounds(
  x: number,
  y: number,
  width: number,
  height: number
): PixelBounds {
  return {
    x: toPixel(x),
    y: toPixel(y),
    width: toPixel(width),
    height: toPixel(height),
  };
}
