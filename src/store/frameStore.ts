/**
 * Frame Store - Zustand State Management
 *
 * Manages all frame-related state including frame layers, frame packs,
 * frame selection, and the frame editor UI.
 *
 * ## Responsibilities
 * - Frame layer management (add, remove, update, reorder)
 * - Frame pack loading and configuration
 * - Frame selection and visibility toggling
 * - Frame editor drawer state
 * - Margin calculations based on frame/mask bounds
 *
 * ## Important Notes
 * - Margins are auto-calculated via `calculateRequiredMargins()`
 * - Never set marginX/marginY directly - they're derived from frame bounds
 * - Frame visibility can be toggled independently per layer
 * - Frame editor operates on a single frame at a time (editingFrameIndex)
 *
 * @example
 * ```typescript
 * // Access frame data
 * const frames = useFrameStore((state) => state.frames);
 * const loadedPack = useFrameStore((state) => state.loadedPack);
 *
 * // Modify frames
 * const addFrame = useFrameStore((state) => state.addFrame);
 * const updateFrame = useFrameStore((state) => state.updateFrame);
 *
 * // Calculate margins after frame changes
 * const calculateMargins = useFrameStore((state) => state.calculateRequiredMargins);
 * const margins = calculateMargins();
 * updateCard(margins); // Sync margins to cardStore
 * ```
 *
 * @module store/frameStore
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Frame, FrameOption } from '../types/card.types';
import type { FramePackTemplate } from '../components/frames/packs/types';

/**
 * Frame Store State Interface
 *
 * Defines the shape of the frame store state and available actions.
 */
interface FrameState {
  /** Array of frame layers (rendered bottom-to-top) */
  frames: Frame[];

  /** Index of currently selected frame in the frame list */
  selectedFrameIndex: number;

  /** Available frame options for selection (populated from groups) */
  availableFrames: FrameOption[];

  /** Currently loaded frame pack template (defines text fields, bounds, etc.) */
  loadedPack: FramePackTemplate | null;

  /** Whether the frame editor drawer is open */
  isFrameEditorOpen: boolean;

  /** Index of frame being edited in the frame editor (null if closed) */
  editingFrameIndex: number | null;

  /** Index of currently selected mask in mask list */
  selectedMaskIndex: number;

  // ===== Actions - Frame Management =====

  /**
   * Add a new frame layer
   * @param frame - Frame to add (appended to end of frames array)
   */
  addFrame: (frame: Frame) => void;

  /**
   * Remove a frame layer by index
   * @param index - Index of frame to remove (0-based)
   */
  removeFrame: (index: number) => void;

  /**
   * Update a frame layer's properties
   * @param index - Index of frame to update
   * @param updates - Partial frame properties to update
   */
  updateFrame: (index: number, updates: Partial<Frame>) => void;

  /**
   * Reorder frame layers (for layer stacking)
   * @param oldIndex - Current index of frame
   * @param newIndex - New index position
   */
  reorderFrames: (oldIndex: number, newIndex: number) => void;

  /**
   * Replace all frames at once
   * @param frames - New frames array (used for import/reset)
   */
  setFrames: (frames: Frame[]) => void;

  // ===== Actions - Frame Selection =====

  /**
   * Set the currently selected frame index
   * @param index - Index to select (-1 for none)
   */
  setSelectedFrameIndex: (index: number) => void;

  /**
   * Set the currently selected mask index
   * @param index - Index to select (-1 for none)
   */
  setSelectedMaskIndex: (index: number) => void;

  /**
   * Toggle a frame's visibility (show/hide layer)
   * @param index - Index of frame to toggle
   */
  toggleFrameVisibility: (index: number) => void;

  // ===== Actions - Pack Management =====

  /**
   * Set the currently loaded frame pack
   * @param pack - Frame pack template (or null to clear)
   */
  setLoadedPack: (pack: FramePackTemplate | null) => void;

  /**
   * Set available frame options for selection
   * @param frames - Array of frame options (from frame groups)
   */
  setAvailableFrames: (frames: FrameOption[]) => void;

  // ===== Actions - Frame Editor =====

  /**
   * Open the frame editor drawer for a specific frame
   * @param index - Index of frame to edit
   */
  openFrameEditor: (index: number) => void;

  /**
   * Close the frame editor drawer
   */
  closeFrameEditor: () => void;

  // ===== Utilities =====

  /**
   * Calculate required margins based on current frames and masks
   *
   * Analyzes all frame and mask bounds to determine how much margin
   * is needed to accommodate elements that extend beyond [0, 1] range.
   *
   * **IMPORTANT**: Never set marginX/marginY directly - always use this
   * function to calculate margins, then sync to cardStore.
   *
   * @returns Object with marginX and marginY values (0-1 range)
   *
   * @example
   * ```typescript
   * const calculateMargins = useFrameStore ((state) => state.calculateRequiredMargins);
   * const updateCard = useCardStore((state) => state.updateCard);
   *
   * // After adding/modifying frames
   * const margins = calculateMargins();
   * updateCard(margins); // Sync to cardStore
   * ```
   *
   * @deprecated Use `margins` getter instead for derived state
   */
  calculateRequiredMargins: () => { marginX: number; marginY: number };

  /**
   * Derived margins (always up-to-date)
   *
   * Automatically computes required margins from current frames.
   * This is a getter property that recalculates on every access,
   * ensuring margins are always in sync with frame state.
   *
   * @returns Object with marginX and marginY values (0-1 range)
   *
   * @example
   * ```typescript
   * const margins = useFrameStore((state) => state.margins);
   * // margins.marginX and margins.marginY are always current
   * ```
   */
  margins: { marginX: number; marginY: number };
}

/**
 * Calculate Required Margins (Internal Utility)
 *
 * Analyzes frame and mask bounds to determine required margins for
 * elements that extend beyond the normalized [0, 1] coordinate space.
 *
 * ## Algorithm
 * 1. Iterate through all frames and their masks
 * 2. Check if bounds extend beyond [0, 1] in any direction
 * 3. Calculate maximum margin needed in X and Y directions
 * 4. Return margins as normalized values (0-1 range)
 *
 * ## Margin Calculation Examples
 * - Frame at x=-0.1: Requires marginX=0.1 (extends left)
 * - Frame at x=0, width=1.2: Requires marginX=0.2 (extends right)
 * - Mask at y=-0.05: Requires marginY=0.05 (extends top)
 *
 * @param frames - Array of frames to analyze
 * @returns Object with marginX and marginY (0-1 normalized values)
 *
 * @internal This is an internal utility used by the store's calculateRequiredMargins action
 */
const calculateRequiredMargins = (frames: Frame[]): { marginX: number; marginY: number } => {
  let maxMarginX = 0;
  let maxMarginY = 0;

  const checkBounds = (bounds: { x: number; y: number; width: number; height: number }) => {
    // Calculate how much the bounds extend beyond [0, 1] range
    // Negative X means it extends to the left
    if (bounds.x < 0) {
      maxMarginX = Math.max(maxMarginX, Math.abs(bounds.x));
    }

    // If (x + width) > 1, it extends to the right
    if (bounds.x + bounds.width > 1) {
      maxMarginX = Math.max(maxMarginX, bounds.x + bounds.width - 1);
    }

    // Negative Y means it extends to the top
    if (bounds.y < 0) {
      maxMarginY = Math.max(maxMarginY, Math.abs(bounds.y));
    }

    // If (y + height) > 1, it extends to the bottom
    if (bounds.y + bounds.height > 1) {
      maxMarginY = Math.max(maxMarginY, bounds.y + bounds.height - 1);
    }
  };

  frames.forEach((frame) => {
    // Check frame bounds
    if (frame.bounds) {
      checkBounds(frame.bounds);
    }

    // Check mask bounds (margin masks can extend beyond frame)
    if (frame.masks) {
      frame.masks.forEach((mask) => {
        if (mask.bounds) {
          checkBounds(mask.bounds);
        }
      });
    }
  });

  return { marginX: maxMarginX, marginY: maxMarginY };
};

export const useFrameStore = create<FrameState>()(
  devtools(
    immer((set, get) => ({
      // Initial state
      frames: [],
      selectedFrameIndex: 0,
      availableFrames: [],
      loadedPack: null,
      isFrameEditorOpen: false,
      editingFrameIndex: null,
      selectedMaskIndex: 0,

      // Frame Management
      addFrame: (frame) =>
        set((draft) => {
          draft.frames.push(frame);
        }),

      removeFrame: (index) =>
        set((draft) => {
          draft.frames.splice(index, 1);
          if (draft.selectedFrameIndex >= draft.frames.length) {
            draft.selectedFrameIndex = Math.max(0, draft.frames.length - 1);
          }
        }),

      updateFrame: (index, updates) =>
        set((draft) => {
          if (draft.frames[index]) {
            Object.assign(draft.frames[index], updates);
          }
        }),

      reorderFrames: (oldIndex, newIndex) =>
        set((draft) => {
          const [movedFrame] = draft.frames.splice(oldIndex, 1);
          draft.frames.splice(newIndex, 0, movedFrame);
        }),

      setFrames: (frames) =>
        set((draft) => {
          draft.frames = frames;
        }),

      // Frame Selection
      setSelectedFrameIndex: (index) =>
        set((draft) => {
          draft.selectedFrameIndex = index;
        }),

      setSelectedMaskIndex: (index) =>
        set((draft) => {
          draft.selectedMaskIndex = index;
        }),

      toggleFrameVisibility: (index) =>
        set((draft) => {
          if (draft.frames[index]) {
            draft.frames[index].visible = !draft.frames[index].visible;
          }
        }),

      // Pack Management
      setLoadedPack: (pack) =>
        set((draft) => {
          draft.loadedPack = pack;
        }),

      setAvailableFrames: (frames) =>
        set((draft) => {
          draft.availableFrames = frames;
        }),

      // Frame Editor
      openFrameEditor: (index) =>
        set((draft) => {
          draft.isFrameEditorOpen = true;
          draft.editingFrameIndex = index;
        }),

      closeFrameEditor: () =>
        set((draft) => {
          draft.isFrameEditorOpen = false;
          draft.editingFrameIndex = null;
        }),

      // Utilities
      calculateRequiredMargins: () => {
        const { frames } = get();
        return calculateRequiredMargins(frames);
      },

      // Derived state - margins
      get margins() {
        const { frames } = get();
        return calculateRequiredMargins(frames);
      },
    })),
    { name: 'FrameStore' }
  )
);
