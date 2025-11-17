/**
 * Media Store - Zustand State Management
 *
 * Manages all media assets including art, set symbols, watermarks, and
 * their associated image elements and transformation properties.
 *
 * ## Responsibilities
 * - Art image positioning, zoom, rotation, and grayscale filter
 * - Set symbol selection and transformation
 * - Watermark images with two-tone gradient support
 * - Mana symbol image caching
 *
 * ## Migration Complete
 * All components now read media state from mediaStore directly.
 * Media properties have been fully migrated from cardStore.
 *
 * @example
 * ```typescript
 * // Access art state
 * const artX = useMediaStore((state) => state.artX);
 * const artImage = useMediaStore((state) => state.artImage);
 *
 * // Update art transformation
 * const updateArt = useMediaStore((state) => state.updateArt);
 * updateArt({ artX: 0.5, artY: 0.5, artZoom: 1.2, artGrayscale: false });
 *
 * // Set art image
 * const setArtImage = useMediaStore((state) => state.setArtImage);
 * setArtImage(loadedImage);
 * ```
 *
 * @module store/mediaStore
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

/**
 * Media Store State Interface
 *
 * Defines media assets and their transformation properties.
 */
interface MediaState {
  /** Art image source URL or file path */
  artSource: string;

  /** Art X position (normalized 0-1, relative to artBounds) */
  artX: number;

  /** Art Y position (normalized 0-1, relative to artBounds) */
  artY: number;

  /** Art zoom factor (1.0 = 100%, >1 = zoomed in) */
  artZoom: number;

  /** Art rotation in degrees (0-360) */
  artRotate: number;

  /** Art grayscale filter enabled */
  artGrayscale: boolean;

  /** Loaded art image element (null if not loaded) */
  artImage: HTMLImageElement | null;

  /** Art image loading state */
  artImageLoading: boolean;

  /** Art image error message (null if no error) */
  artImageError: string | null;

  /** Set symbol image source URL or file path */
  setSymbolSource: string;

  /** Set symbol X position (normalized 0-1, relative to setSymbolBounds) */
  setSymbolX: number;

  /** Set symbol Y position (normalized 0-1, relative to setSymbolBounds) */
  setSymbolY: number;

  /** Set symbol zoom factor (1.0 = 100%) */
  setSymbolZoom: number;

  /** Loaded set symbol image element (null if not loaded) */
  setSymbolImage: HTMLImageElement | null;

  /** Set symbol image loading state */
  setSymbolImageLoading: boolean;

  /** Set symbol image error message (null if no error) */
  setSymbolImageError: string | null;

  /** Set code input (e.g., 'MH3', 'BRO') - not persisted */
  setCode: string;

  /** Rarity input (e.g., 'common', 'rare', 'mythic') - not persisted */
  rarity: string;

  /** Watermark image source URL or file path */
  watermarkSource: string;

  /** Watermark X position (normalized 0-1, relative to watermarkBounds) */
  watermarkX: number;

  /** Watermark Y position (normalized 0-1, relative to watermarkBounds) */
  watermarkY: number;

  /** Watermark zoom factor (1.0 = 100%) */
  watermarkZoom: number;

  /** Left color for two-tone watermark gradient */
  watermarkLeft: string;

  /** Right color for two-tone watermark gradient */
  watermarkRight: string;

  /** Watermark opacity (0-1 range) */
  watermarkOpacity: number;

  /** Loaded watermark image element (null if not loaded) */
  watermarkImage: HTMLImageElement | null;

  /** Watermark image loading state */
  watermarkImageLoading: boolean;

  /** Watermark image error message (null if no error) */
  watermarkImageError: string | null;

  /** Cached mana symbol images (key: symbol name, value: image element) */
  manaSymbolImages: { [key: string]: HTMLImageElement };

  /**
   * Update art transformation properties
   * @param updates - Partial art properties to update
   */
  updateArt: (updates: {
    artSource?: string;
    artX?: number;
    artY?: number;
    artZoom?: number;
    artRotate?: number;
    artGrayscale?: boolean;
  }) => void;

  /**
   * Set the loaded art image element
   * @param image - Image element (or null to clear)
   */
  setArtImage: (image: HTMLImageElement | null) => void;

  /**
   * Set art image loading state
   * @param loading - Loading state
   */
  setArtImageLoading: (loading: boolean) => void;

  /**
   * Set art image error state
   * @param error - Error message (null to clear)
   */
  setArtImageError: (error: string | null) => void;

  /**
   * Update set symbol transformation properties
   * @param updates - Partial set symbol properties to update
   */
  updateSetSymbol: (updates: {
    setSymbolSource?: string;
    setSymbolX?: number;
    setSymbolY?: number;
    setSymbolZoom?: number;
  }) => void;

  /**
   * Set the loaded set symbol image element
   * @param image - Image element (or null to clear)
   */
  setSetSymbolImage: (image: HTMLImageElement | null) => void;

  /**
   * Set set symbol image loading state
   * @param loading - Loading state
   */
  setSetSymbolImageLoading: (loading: boolean) => void;

  /**
   * Set set symbol image error state
   * @param error - Error message (null to clear)
   */
  setSetSymbolImageError: (error: string | null) => void;

  /**
   * Set the set code input field
   * @param code - Set code (e.g., 'MH3', 'BRO')
   */
  setSetCode: (code: string) => void;

  /**
   * Set the rarity input field
   * @param rarity - Rarity string (e.g., 'common', 'rare', 'mythic')
   */
  setRarity: (rarity: string) => void;

  /**
   * Update watermark transformation and color properties
   * @param updates - Partial watermark properties to update
   */
  updateWatermark: (updates: {
    watermarkSource?: string;
    watermarkX?: number;
    watermarkY?: number;
    watermarkZoom?: number;
    watermarkLeft?: string;
    watermarkRight?: string;
    watermarkOpacity?: number;
  }) => void;

  /**
   * Set the loaded watermark image element
   * @param image - Image element (or null to clear)
   */
  setWatermarkImage: (image: HTMLImageElement | null) => void;

  /**
   * Set watermark image loading state
   * @param loading - Loading state
   */
  setWatermarkImageLoading: (loading: boolean) => void;

  /**
   * Set watermark image error state
   * @param error - Error message (null to clear)
   */
  setWatermarkImageError: (error: string | null) => void;

  /**
   * Set cached mana symbol images
   * @param images - Map of symbol names to image elements
   */
  setManaSymbolImages: (images: { [key: string]: HTMLImageElement }) => void;

  /**
   * Reset art to default state (blank image, centered, no zoom/rotation)
   */
  resetArt: () => void;

  /**
   * Reset set symbol to default state (no symbol loaded)
   */
  resetSetSymbol: () => void;

  /**
   * Reset watermark to default state (no watermark loaded)
   */
  resetWatermark: () => void;
}

const DEFAULT_ART_STATE = {
  artSource: '/img/blank.png',
  artX: 0,
  artY: 0,
  artZoom: 1,
  artRotate: 0,
  artGrayscale: false,
};

const DEFAULT_SET_SYMBOL_STATE = {
  setSymbolSource: '/img/blank.png',
  setSymbolX: 0,
  setSymbolY: 0,
  setSymbolZoom: 1,
};

const DEFAULT_WATERMARK_STATE = {
  watermarkSource: '/img/blank.png',
  watermarkX: 0,
  watermarkY: 0,
  watermarkZoom: 1,
  watermarkLeft: '#b79d58',
  watermarkRight: 'none',
  watermarkOpacity: 1,
};

export const useMediaStore = create<MediaState>()(
  devtools(
    immer((set) => ({
      // Initial state - Art
      ...DEFAULT_ART_STATE,
      artImage: null,
      artImageLoading: false,
      artImageError: null,

      // Initial state - Set Symbol
      ...DEFAULT_SET_SYMBOL_STATE,
      setSymbolImage: null,
      setSymbolImageLoading: false,
      setSymbolImageError: null,
      setCode: '',
      rarity: '',

      // Initial state - Watermark
      ...DEFAULT_WATERMARK_STATE,
      watermarkImage: null,
      watermarkImageLoading: false,
      watermarkImageError: null,

      // Initial state - Mana Symbols
      manaSymbolImages: {},

      // Art Management
      updateArt: (updates) => {
        set((draft) => {
          if (updates.artSource !== undefined) draft.artSource = updates.artSource;
          if (updates.artX !== undefined) draft.artX = updates.artX;
          if (updates.artY !== undefined) draft.artY = updates.artY;
          if (updates.artZoom !== undefined) draft.artZoom = updates.artZoom;
          if (updates.artRotate !== undefined) draft.artRotate = updates.artRotate;
          if (updates.artGrayscale !== undefined) draft.artGrayscale = updates.artGrayscale;
        });
      },

      setArtImage: (image) => {
        set((draft) => {
          draft.artImage = image;
        });
      },

      setArtImageLoading: (loading) => {
        set((draft) => {
          draft.artImageLoading = loading;
        });
      },

      setArtImageError: (error) => {
        set((draft) => {
          draft.artImageError = error;
        });
      },

      // Set Symbol Management
      updateSetSymbol: (updates) => {
        set((draft) => {
          if (updates.setSymbolSource !== undefined) draft.setSymbolSource = updates.setSymbolSource;
          if (updates.setSymbolX !== undefined) draft.setSymbolX = updates.setSymbolX;
          if (updates.setSymbolY !== undefined) draft.setSymbolY = updates.setSymbolY;
          if (updates.setSymbolZoom !== undefined) draft.setSymbolZoom = updates.setSymbolZoom;
        });
      },

      setSetSymbolImage: (image) => {
        set((draft) => {
          draft.setSymbolImage = image;
        });
      },

      setSetSymbolImageLoading: (loading) => {
        set((draft) => {
          draft.setSymbolImageLoading = loading;
        });
      },

      setSetSymbolImageError: (error) => {
        set((draft) => {
          draft.setSymbolImageError = error;
        });
      },

      setSetCode: (code) => {
        set((draft) => {
          draft.setCode = code;
        });
      },

      setRarity: (rarity) => {
        set((draft) => {
          draft.rarity = rarity;
        });
      },

      // Watermark Management
      updateWatermark: (updates) => {
        set((draft) => {
          if (updates.watermarkSource !== undefined) draft.watermarkSource = updates.watermarkSource;
          if (updates.watermarkX !== undefined) draft.watermarkX = updates.watermarkX;
          if (updates.watermarkY !== undefined) draft.watermarkY = updates.watermarkY;
          if (updates.watermarkZoom !== undefined) draft.watermarkZoom = updates.watermarkZoom;
          if (updates.watermarkLeft !== undefined) draft.watermarkLeft = updates.watermarkLeft;
          if (updates.watermarkRight !== undefined) draft.watermarkRight = updates.watermarkRight;
          if (updates.watermarkOpacity !== undefined) draft.watermarkOpacity = updates.watermarkOpacity;
        });
      },

      setWatermarkImage: (image) => {
        set((draft) => {
          draft.watermarkImage = image;
        });
      },

      setWatermarkImageLoading: (loading) => {
        set((draft) => {
          draft.watermarkImageLoading = loading;
        });
      },

      setWatermarkImageError: (error) => {
        set((draft) => {
          draft.watermarkImageError = error;
        });
      },

      // Mana Symbol Management
      setManaSymbolImages: (images) => {
        set((draft) => {
          draft.manaSymbolImages = images;
        });
      },

      // Reset functions
      resetArt: () => {
        set((draft) => {
          Object.assign(draft, DEFAULT_ART_STATE);
          draft.artImage = null;
          draft.artImageLoading = false;
          draft.artImageError = null;
        });
      },

      resetSetSymbol: () => {
        set((draft) => {
          Object.assign(draft, DEFAULT_SET_SYMBOL_STATE);
          draft.setSymbolImage = null;
          draft.setSymbolImageLoading = false;
          draft.setSymbolImageError = null;
          draft.setCode = '';
          draft.rarity = '';
        });
      },

      resetWatermark: () => {
        set((draft) => {
          Object.assign(draft, DEFAULT_WATERMARK_STATE);
          draft.watermarkImage = null;
          draft.watermarkImageLoading = false;
          draft.watermarkImageError = null;
        });
      },
    })),
    { name: 'MediaStore' }
  )
);
