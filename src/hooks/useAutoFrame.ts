/**
 * useAutoFrame Hook
 *
 * React hook for automatic frame generation based on card properties.
 * Monitors card data (mana cost, type line, power) and automatically
 * rebuilds frame layers when inputs change.
 *
 * ## Features
 * - Debounced rebuilding (300ms delay to avoid rebuilding on every keystroke)
 * - Integration with cardStore and frameStore
 * - Support for all frame types defined in autoFrame.types.ts
 * - Preserves extension frames during rebuild
 *
 * ## Usage
 * ```typescript
 * // In a component that needs auto-frame functionality
 * const { isEnabled, frameType, rebuild } = useAutoFrame();
 *
 * // Or just let it run automatically
 * useAutoFrame();
 * ```
 *
 * @module hooks/useAutoFrame
 */

import { useEffect, useCallback, useMemo, useRef } from 'react';
import { useCardStore } from '../store/cardStore';
import { useUIStore } from '../store/uiStore';
import { useDebounce } from './useDebounce';
import {
  buildAutoFrame,
  detectCardColors,
  getPreservedFrames,
  type AutoFrameInput,
  type AutoFrameOutput,
} from '../utils/autoFrame';
import { loadImage } from '../utils/canvasHelpers';
import type { AutoFrameType, ManaColor } from '../types/autoFrame.types';
import type { Frame, Mask } from '../types/card.types';

// ============================================================================
// CONSTANTS
// ============================================================================

/** Debounce delay for rebuilding frames (ms) */
const REBUILD_DEBOUNCE_MS = 300;

// ============================================================================
// TYPES
// ============================================================================

/**
 * Return type for the useAutoFrame hook.
 */
export interface UseAutoFrameResult {
  /** Whether auto-frame is currently enabled */
  isEnabled: boolean;
  /** The current auto-frame type (or null if none selected) */
  frameType: AutoFrameType | null;
  /** Whether "always Nyx" mode is enabled */
  alwaysNyx: boolean;
  /** Detected colors from current card */
  detectedColors: ManaColor[];
  /** Last generated output (null if not yet generated) */
  lastOutput: AutoFrameOutput | null;
  /** Manually trigger a rebuild */
  rebuild: () => void;
  /** Enable or disable auto-frame */
  setEnabled: (enabled: boolean) => void;
  /** Set the frame type */
  setFrameType: (type: AutoFrameType | null) => void;
  /** Set "always Nyx" mode */
  setAlwaysNyx: (value: boolean) => void;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Loads a mask image and returns a fully populated Mask object.
 */
async function loadMask(
  mask: { src: string; name: string }
): Promise<Mask> {
  try {
    const image = await loadImage(mask.src);
    await image.decode();
    return {
      src: mask.src,
      name: mask.name,
      image,
    };
  } catch (error) {
    console.warn(`Failed to load mask image: ${mask.src}`, error);
    return {
      src: mask.src,
      name: mask.name,
      image: null as unknown as HTMLImageElement,
    };
  }
}

/**
 * Converts AutoFrameResult masks to Frame Mask format with loaded images.
 */
async function convertMasks(
  autoMasks: Array<{ src: string; name: string }>
): Promise<Mask[]> {
  return Promise.all(autoMasks.map(loadMask));
}

/**
 * Converts AutoFrameResult to Frame format with loaded images.
 */
async function convertToFrame(
  result: {
    name: string;
    src: string;
    masks: Array<{ src: string; name: string }>;
    bounds?: { x: number; y: number; width: number; height: number };
    erase?: boolean;
  }
): Promise<Frame> {
  // Load the frame image
  let frameImage: HTMLImageElement | null = null;
  try {
    frameImage = await loadImage(result.src);
    await frameImage.decode();
  } catch (error) {
    console.warn(`Failed to load frame image: ${result.src}`, error);
  }

  // Load mask images
  const masks = await convertMasks(result.masks);

  return {
    name: result.name,
    src: result.src,
    image: frameImage,
    masks,
    bounds: result.bounds,
    ogBounds: result.bounds,
    opacity: 100, // 0-100 scale expected by canvas renderer
    erase: result.erase,
    visible: true,
  };
}

// ============================================================================
// MAIN HOOK
// ============================================================================

/**
 * Hook for automatic frame generation based on card properties.
 *
 * Monitors card text fields (mana cost, type line, power) and automatically
 * generates appropriate frame layers when these inputs change.
 *
 * @returns Object with auto-frame state and controls
 *
 * @example
 * ```typescript
 * function FramePanel() {
 *   const {
 *     isEnabled,
 *     frameType,
 *     setEnabled,
 *     setFrameType,
 *   } = useAutoFrame();
 *
 *   return (
 *     <div>
 *       <Checkbox checked={isEnabled} onChange={setEnabled} />
 *       <Select value={frameType} onChange={setFrameType} />
 *     </div>
 *   );
 * }
 * ```
 */
export function useAutoFrame(): UseAutoFrameResult {
  // ===== Store Selectors =====
  const card = useCardStore((state) => state.card);
  const setFrames = useCardStore((state) => state.setFrames);

  const autoFrameEnabled = useUIStore((state) => state.autoFrameEnabled);
  const autoFrameType = useUIStore((state) => state.autoFrameType);
  const autoFrameAlwaysNyx = useUIStore((state) => state.autoFrameAlwaysNyx);
  const setAutoFrameEnabled = useUIStore((state) => state.setAutoFrameEnabled);
  const setAutoFrameType = useUIStore((state) => state.setAutoFrameType);
  const setAutoFrameAlwaysNyx = useUIStore((state) => state.setAutoFrameAlwaysNyx);

  // ===== Refs =====
  const lastOutputRef = useRef<AutoFrameOutput | null>(null);
  const isFirstRenderRef = useRef(true);
  const isRebuildingRef = useRef(false);

  // ===== Derived Values =====

  // Extract text field values for dependency tracking
  const manaCost = card.text?.mana?.text ?? '';
  const typeLine = card.text?.type?.text ?? '';
  const power = card.text?.pt?.text ?? '';
  const rulesText = card.text?.rules?.text ?? '';
  const secondaryManaCost = card.text?.mana2?.text ?? '';

  // Debounce the inputs to avoid rebuilding on every keystroke
  const debouncedManaCost = useDebounce(manaCost, REBUILD_DEBOUNCE_MS);
  const debouncedTypeLine = useDebounce(typeLine, REBUILD_DEBOUNCE_MS);
  const debouncedPower = useDebounce(power, REBUILD_DEBOUNCE_MS);
  const debouncedRulesText = useDebounce(rulesText, REBUILD_DEBOUNCE_MS);
  const debouncedSecondaryManaCost = useDebounce(secondaryManaCost, REBUILD_DEBOUNCE_MS);

  // Detect colors from debounced type line, mana cost, and rules text
  // detectCardColors signature: (typeLine, manaCost, rulesText) => ColorDetectionResult
  const detectedColors = useMemo<ManaColor[]>(() => {
    if (!debouncedManaCost && !debouncedTypeLine) {
      return [];
    }
    const result = detectCardColors(debouncedTypeLine, debouncedManaCost, debouncedRulesText);
    return result.colors;
  }, [debouncedManaCost, debouncedTypeLine, debouncedRulesText]);

  // ===== Rebuild Function =====

  /**
   * Performs the actual frame rebuild operation.
   * Async because it needs to load frame and mask images.
   */
  const performRebuild = useCallback(async () => {
    if (!autoFrameEnabled || !autoFrameType) {
      return;
    }

    // Prevent re-entrant rebuilds
    if (isRebuildingRef.current) {
      return;
    }
    isRebuildingRef.current = true;

    try {
      // Build input for the orchestrator
      const input: AutoFrameInput = {
        frameType: autoFrameType,
        colors: detectedColors,
        manaCost: debouncedManaCost,
        typeLine: debouncedTypeLine,
        power: debouncedPower,
        alwaysNyx: autoFrameAlwaysNyx,
        secondaryManaCost: debouncedSecondaryManaCost || undefined,
      };

      // Generate new frames
      const output = buildAutoFrame(input);
      lastOutputRef.current = output;

      // Get current frames from cardStore (avoid stale closure)
      const currentFrames = useCardStore.getState().card.frames;

      // Get frames to preserve (extensions, user-added frames, etc.)
      const preservedFrames = getPreservedFrames(autoFrameType, currentFrames);

      // Convert AutoFrameResult[] to Frame[] with loaded images
      const newFrames = await Promise.all(output.frames.map(convertToFrame));

      // Combine: preserved frames go on top of generated frames
      const combinedFrames: Frame[] = [
        ...newFrames,
        ...preservedFrames as Frame[],
      ];

      // Update card store with new frames (margins calculated automatically)
      setFrames(combinedFrames);
    } catch (error) {
      console.error('Error during auto-frame rebuild:', error);
    } finally {
      // Reset rebuilding flag
      isRebuildingRef.current = false;
    }
  }, [
    autoFrameEnabled,
    autoFrameType,
    autoFrameAlwaysNyx,
    detectedColors,
    debouncedManaCost,
    debouncedTypeLine,
    debouncedPower,
    debouncedSecondaryManaCost,
    setFrames,
  ]);

  // ===== Effect: Auto-rebuild when inputs change =====

  useEffect(() => {
    // Skip first render to avoid unnecessary rebuild on mount
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    // Only rebuild if enabled and a frame type is selected
    if (autoFrameEnabled && autoFrameType) {
      performRebuild();
    }
  }, [
    autoFrameEnabled,
    autoFrameType,
    autoFrameAlwaysNyx,
    debouncedManaCost,
    debouncedTypeLine,
    debouncedPower,
    debouncedSecondaryManaCost,
    // Note: detectedColors is derived from debounced values, so not needed here
    performRebuild,
  ]);

  // ===== Return Value =====

  return {
    isEnabled: autoFrameEnabled,
    frameType: autoFrameType,
    alwaysNyx: autoFrameAlwaysNyx,
    detectedColors,
    lastOutput: lastOutputRef.current,
    rebuild: performRebuild,
    setEnabled: setAutoFrameEnabled,
    setFrameType: setAutoFrameType,
    setAlwaysNyx: setAutoFrameAlwaysNyx,
  };
}

export default useAutoFrame;
