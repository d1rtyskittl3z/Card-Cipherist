/**
 * UI Store - Zustand State Management
 *
 * Manages all UI-related state including tab navigation, visual debugging
 * flags, and special feature tab visibility.
 *
 * ## Responsibilities
 * - Tab navigation state
 * - Visual debugging toggles (guidelines, transparencies, art bounds)
 * - Serial number display toggle
 * - Auto-fit art toggle
 * - Text field selection
 * - Special feature tab visibility (Saga, Planeswalker, Kamigawa, Stations)
 *
 * ## Notes
 * - UI flags do not persist - reset on page reload
 * - Special feature tabs are shown based on loaded frame pack version
 * - Guidelines show text field boundaries when enabled
 *
 * @example
 * ```typescript
 * // Access UI state
 * const currentTab = useUIStore((state) => state.currentTab);
 * const showGuidelines = useUIStore((state) => state.showGuidelines);
 *
 * // Update UI state
 * const setCurrentTab = useUIStore((state) => state.setCurrentTab);
 * const setShowGuidelines = useUIStore((state) => state.setShowGuidelines);
 *
 * setCurrentTab('frame');
 * setShowGuidelines(true);
 * ```
 *
 * @module store/uiStore
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { CardBounds } from '../types/card.types';

/**
 * UI Store State Interface
 *
 * Defines the shape of the UI store state and available actions.
 */
interface UIState {
  /** Currently active tab (e.g., 'frame', 'text', 'art', 'scryfall') */
  currentTab: string;

  /** Whether to show text field guideline overlays on canvas */
  showGuidelines: boolean;

  /** Whether to show transparency checkerboard pattern on canvas */
  showTransparencies: boolean;

  /** Whether to show art bounds debugging overlay */
  showArtBoundsDebug: boolean;

  /** Custom art bounds for debugging (null = use pack bounds) */
  customArtBounds: CardBounds | null;

  /** Whether to show serial number plate on card */
  showSerialNumbers: boolean;

  /** Whether auto-fit art is enabled (object-fit: cover behavior) */
  autoFitArt: boolean;

  /** Whether the preview canvas should be rotated 90 degrees in the UI */
  rotateCanvasPreview: boolean;

  /** Index of currently selected text field */
  selectedTextIndex: number;

  /** Whether Saga tab has been shown (triggered by sagaNyx version) */
  hasShownSagaTab: boolean;

  /** Whether Planeswalker tab has been shown (triggered by planeswalkerRegular version) */
  hasShownPlaneswalkerTab: boolean;

  /** Whether Kamigawa tab has been shown (triggered by neoBasics version) */
  hasShownKamigawaTab: boolean;

  /** Whether Stations tab has been shown (triggered by stationsRegular version) */
  hasShownStationsTab: boolean;

  /** Text rendering errors - maps field names to error messages */
  textRenderErrors: Record<string, string>;

  /**
   * Set the currently active tab
   * @param tab - Tab identifier (e.g., 'frame', 'text', 'art')
   */
  setCurrentTab: (tab: string) => void;

  /**
   * Toggle text field guideline overlays
   * @param show - True to show guidelines, false to hide
   */
  setShowGuidelines: (show: boolean) => void;

  /**
   * Toggle transparency checkerboard pattern
   * @param show - True to show pattern, false to hide
   */
  setShowTransparencies: (show: boolean) => void;

  /**
   * Toggle art bounds debugging overlay
   * @param show - True to show overlay, false to hide
   */
  setShowArtBoundsDebug: (show: boolean) => void;

  /**
   * Set custom art bounds for debugging
   * @param bounds - Custom bounds object (or null to use pack bounds)
   */
  setCustomArtBounds: (bounds: CardBounds | null) => void;

  /**
   * Toggle serial number plate visibility
   * @param show - True to show serial plate, false to hide
   */
  setShowSerialNumbers: (show: boolean) => void;

  /**
   * Toggle auto-fit art mode
   * @param enabled - True to enable auto-fit, false to disable
   */
  setAutoFitArt: (enabled: boolean) => void;

  /**
   * Toggle rotating the preview canvas 90 degrees (UI only)
   * @param enabled - True to rotate, false to reset orientation
   */
  setRotateCanvasPreview: (enabled: boolean) => void;

  /**
   * Set the currently selected text field index
   * @param index - Index of text field to select
   */
  setSelectedTextIndex: (index: number) => void;

  /**
   * Mark Saga tab as shown
   * @param shown - True if tab should be shown
   */
  setHasShownSagaTab: (shown: boolean) => void;

  /**
   * Mark Planeswalker tab as shown
   * @param shown - True if tab should be shown
   */
  setHasShownPlaneswalkerTab: (shown: boolean) => void;

  /**
   * Mark Kamigawa tab as shown
   * @param shown - True if tab should be shown
   */
  setHasShownKamigawaTab: (shown: boolean) => void;

  /**
   * Mark Stations tab as shown
   * @param shown - True if tab should be shown
   */
  setHasShownStationsTab: (shown: boolean) => void;

  /**
   * Set a text render error for a specific field
   * @param fieldName - Name of the field that failed to render
   * @param error - Error message
   */
  setTextRenderError: (fieldName: string, error: string) => void;

  /**
   * Clear a text render error for a specific field
   * @param fieldName - Name of the field to clear error for
   */
  clearTextRenderError: (fieldName: string) => void;

  /**
   * Clear all text render errors
   */
  clearAllTextRenderErrors: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    immer((set) => ({
      // Initial state
      currentTab: 'scryfall',
      showGuidelines: false,
      showTransparencies: false,
      showArtBoundsDebug: false,
      customArtBounds: null,
      showSerialNumbers: false,
      autoFitArt: true,
      rotateCanvasPreview: false,
      selectedTextIndex: 0,
      hasShownSagaTab: false,
      hasShownPlaneswalkerTab: false,
      hasShownKamigawaTab: false,
      hasShownStationsTab: false,
      textRenderErrors: {},

      // Tab Management
      setCurrentTab: (tab) =>
        set((draft) => {
          draft.currentTab = tab;
        }),

      // Visual Debugging
      setShowGuidelines: (show) =>
        set((draft) => {
          draft.showGuidelines = show;
        }),
      setShowTransparencies: (show) =>
        set((draft) => {
          draft.showTransparencies = show;
        }),
      setShowArtBoundsDebug: (show) =>
        set((draft) => {
          draft.showArtBoundsDebug = show;
        }),
      setCustomArtBounds: (bounds) =>
        set((draft) => {
          draft.customArtBounds = bounds;
        }),

      // Serial Numbers
      setShowSerialNumbers: (show) =>
        set((draft) => {
          draft.showSerialNumbers = show;
        }),

      // Auto-fit Art
      setAutoFitArt: (enabled) =>
        set((draft) => {
          draft.autoFitArt = enabled;
        }),

      // Canvas Orientation
      setRotateCanvasPreview: (enabled) =>
        set((draft) => {
          draft.rotateCanvasPreview = enabled;
        }),

      // Text Selection
      setSelectedTextIndex: (index) =>
        set((draft) => {
          draft.selectedTextIndex = index;
        }),

      // Special Feature Tabs
      setHasShownSagaTab: (shown) =>
        set((draft) => {
          draft.hasShownSagaTab = shown;
        }),
      setHasShownPlaneswalkerTab: (shown) =>
        set((draft) => {
          draft.hasShownPlaneswalkerTab = shown;
        }),
      setHasShownKamigawaTab: (shown) =>
        set((draft) => {
          draft.hasShownKamigawaTab = shown;
        }),
      setHasShownStationsTab: (shown) =>
        set((draft) => {
          draft.hasShownStationsTab = shown;
        }),

      // Text Render Error Management
      setTextRenderError: (fieldName, error) =>
        set((draft) => {
          draft.textRenderErrors[fieldName] = error;
        }),
      clearTextRenderError: (fieldName) =>
        set((draft) => {
          delete draft.textRenderErrors[fieldName];
        }),
      clearAllTextRenderErrors: () =>
        set((draft) => {
          draft.textRenderErrors = {};
        }),
    })),
    { name: 'UIStore' }
  )
);
