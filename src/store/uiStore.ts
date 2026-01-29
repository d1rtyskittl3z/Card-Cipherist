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
import type { AutoFrameType } from '../types/autoFrame.types';

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

  /** Active art slot for dual-art cards ('art1' or 'art2') */
  activeArtSlot: 'art1' | 'art2';

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

  // ===== AutoFrame State =====

  /** Whether auto-frame feature is enabled */
  autoFrameEnabled: boolean;

  /** Currently selected auto-frame type (null if none selected) */
  autoFrameType: AutoFrameType | null;

  /** Whether to always use Nyx style for enchantments (not just creatures/artifacts) */
  autoFrameAlwaysNyx: boolean;

  // ===== Custom Mana State =====

  /**
   * Global mana prefix applied to all text fields.
   * When set, symbol lookup will try prefix+code before falling back to standard.
   * Empty string means no global prefix (use default symbols).
   */
  globalManaPrefix: string;

  /**
   * Currently selected mana set identifier.
   * Format: 'builtin:prefix' for built-in sets, or 'custom:name' for uploaded sets.
   */
  customManaSetName: string;

  /**
   * Map of uploaded custom mana symbols.
   * Key: symbol name (e.g., 'w', 'u', 'b', 'wu'), Value: data URL of the image.
   * These are loaded dynamically when a custom set is selected.
   */
  customManaSymbols: Record<string, string>;

  /**
   * Name/label of the currently uploaded custom mana set.
   * Used for display in the UI.
   */
  customManaSetLabel: string;

  /**
   * Incremented whenever custom symbols are registered to trigger atlas refresh.
   */
  customSymbolsVersion: number;

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
   * Set the active art slot for dual-art cards
   * @param slot - Which art slot is active ('art1' or 'art2')
   */
  setActiveArtSlot: (slot: 'art1' | 'art2') => void;

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

  // ===== AutoFrame Actions =====

  /**
   * Enable or disable auto-frame feature
   * @param enabled - True to enable, false to disable
   */
  setAutoFrameEnabled: (enabled: boolean) => void;

  /**
   * Set the auto-frame type to use for generation
   * @param type - Frame type (or null to clear)
   */
  setAutoFrameType: (type: AutoFrameType | null) => void;

  /**
   * Set whether to always use Nyx style for enchantments
   * @param value - True to always use Nyx, false for standard behavior
   */
  setAutoFrameAlwaysNyx: (value: boolean) => void;

  // ===== Custom Mana Actions =====

  /**
   * Set the global mana prefix applied to all text fields
   * @param prefix - Prefix string (empty string for default symbols)
   */
  setGlobalManaPrefix: (prefix: string) => void;

  /**
   * Set the currently selected mana set name
   * @param setName - Set identifier ('builtin:prefix' or custom name)
   */
  setCustomManaSetName: (setName: string) => void;

  /**
   * Select a built-in mana set by prefix, updating both prefix and set name
   * @param prefix - Built-in set prefix (empty string to clear)
   */
  selectBuiltInManaSet: (prefix: string) => void;

  /**
   * Register custom mana symbols from uploaded files.
   * Stores the data URLs and updates the custom set name/label.
   * @param symbols - Map of symbol names to data URLs
   * @param setLabel - Display name for the custom set
   */
  registerCustomManaSymbols: (symbols: Record<string, string>, setLabel: string) => void;

  /**
   * Select the uploaded custom mana set, updating prefix and set name
   */
  selectCustomManaSet: () => void;

  /**
   * Clear the custom mana symbols and reset to default
   */
  clearCustomManaSymbols: () => void;
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
      activeArtSlot: 'art1',
      rotateCanvasPreview: false,
      selectedTextIndex: 0,
      hasShownSagaTab: false,
      hasShownPlaneswalkerTab: false,
      hasShownKamigawaTab: false,
      hasShownStationsTab: false,
      textRenderErrors: {},

      // AutoFrame State
      autoFrameEnabled: false,
      autoFrameType: null,
      autoFrameAlwaysNyx: false,

      // Custom Mana State
      globalManaPrefix: '',
      customManaSetName: '',
      customManaSymbols: {},
      customManaSetLabel: '',
      customSymbolsVersion: 0,

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

      // Active Art Slot
      setActiveArtSlot: (slot) =>
        set((draft) => {
          draft.activeArtSlot = slot;
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

      // AutoFrame Actions
      setAutoFrameEnabled: (enabled) =>
        set((draft) => {
          draft.autoFrameEnabled = enabled;
        }),
      setAutoFrameType: (type) =>
        set((draft) => {
          draft.autoFrameType = type;
        }),
      setAutoFrameAlwaysNyx: (value) =>
        set((draft) => {
          draft.autoFrameAlwaysNyx = value;
        }),

      // Custom Mana Actions
      setGlobalManaPrefix: (prefix) =>
        set((draft) => {
          draft.globalManaPrefix = prefix;
        }),
      setCustomManaSetName: (setName) =>
        set((draft) => {
          draft.customManaSetName = setName;
        }),
      selectBuiltInManaSet: (prefix) =>
        set((draft) => {
          draft.globalManaPrefix = prefix;
          draft.customManaSetName = prefix ? `builtin:${prefix}` : '';
        }),
      registerCustomManaSymbols: (symbols, setLabel) =>
        set((draft) => {
          // Store the custom symbols and label
          draft.customManaSymbols = symbols;
          draft.customManaSetLabel = setLabel;
          // Increment version to trigger atlas refresh
          draft.customSymbolsVersion += 1;
          // Auto-select the custom set
          draft.globalManaPrefix = 'custom';
          draft.customManaSetName = `custom:${setLabel}`;
        }),
      selectCustomManaSet: () =>
        set((draft) => {
          if (Object.keys(draft.customManaSymbols).length > 0) {
            draft.globalManaPrefix = 'custom';
            draft.customManaSetName = `custom:${draft.customManaSetLabel}`;
          }
        }),
      clearCustomManaSymbols: () =>
        set((draft) => {
          draft.customManaSymbols = {};
          draft.customManaSetLabel = '';
          // If currently using custom set, reset to default
          if (draft.globalManaPrefix === 'custom') {
            draft.globalManaPrefix = '';
            draft.customManaSetName = '';
          }
        }),
    })),
    { name: 'UIStore' }
  )
);
