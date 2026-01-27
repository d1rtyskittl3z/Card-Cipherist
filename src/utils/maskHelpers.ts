/**
 * Mask Helper Utilities
 * Helper functions for mask management and global mask definitions
 */

import type { Mask } from '../types/card.types';

/**
 * Global masks available in all frame packs
 * These masks are always available for application to any frame
 */
export const GLOBAL_MASKS: Array<{ name: string; src: string }> = [
  { src: '/img/frames/maskRightHalf.png', name: 'Right Half' },
  { src: '/img/frames/maskLeftHalf.png', name: 'Left Half' },
  { src: '/img/frames/maskMiddleThird.png', name: 'Middle Third' },
  { src: '/img/frames/maskTopHalf.png', name: 'Top Half' },
  { src: '/img/frames/maskBottomHalf.png', name: 'Bottom Half' },
];

/**
 * Create a mask object with proper image loading
 * Factory function for creating mask objects with image elements and CORS settings
 *
 * @param name - Display name of the mask
 * @param src - Image source path (relative to public/)
 * @param noThumb - If true, marks mask as uploaded/custom (not from frame pack)
 * @param onLoad - Optional callback when image loads
 * @returns Mask object ready for use in frame compositing
 */
export function createMaskObject(
  name: string,
  src: string,
  noThumb = false,
  onLoad?: () => void
): Mask {
  const mask: Mask = {
    name,
    src,
    image: new Image(),
  };

  // Mark custom uploaded masks
  if (noThumb) {
    (mask as any).noThumb = true;
  }

  // Configure image loading
  mask.image.crossOrigin = 'anonymous';
  if (onLoad) {
    mask.image.onload = onLoad;
  }
  mask.image.src = src;

  return mask;
}

/**
 * Add a mask to a list without duplicates
 * Checks if mask already exists by name and src to prevent duplicates
 *
 * @param list - Target mask array
 * @param mask - Mask to add (must have name and src)
 */
export function addMaskToList(
  list: Array<{ name: string; src: string }>,
  mask: { name: string; src: string }
): void {
  if (!list.find((m) => m.name === mask.name && m.src === mask.src)) {
    list.push({ name: mask.name, src: mask.src });
  }
}

/**
 * Get available masks for a frame, excluding already-applied masks
 * Combines global masks with frame-specific availableMasks
 *
 * @param appliedMasks - Masks already applied to the frame
 * @param frameAvailableMasks - Frame-specific available masks from pack
 * @returns Filtered list of unapplied masks
 */
export function getUnappliedMasks(
  appliedMasks: Mask[],
  frameAvailableMasks: Array<{ name: string; src: string }> = []
): Array<{ name: string; src: string }> {
  const appliedMaskNames = appliedMasks.map((m) => m.name);
  const allAvailableMasks = [...GLOBAL_MASKS, ...frameAvailableMasks];

  return allAvailableMasks.filter((mask) => !appliedMaskNames.includes(mask.name));
}
