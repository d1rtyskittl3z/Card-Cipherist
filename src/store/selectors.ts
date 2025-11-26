/**
 * Optimized Store Selectors
 * Fine-grained selectors for React components to prevent unnecessary re-renders
 * 
 * Usage:
 * - Import specific selectors instead of using broad state objects
 * - Selectors use shallow comparison for object returns
 * - Components only re-render when their specific data changes
 */

import { useShallow } from 'zustand/react/shallow';
import { useCardStore } from './cardStore';
import { useMediaStore } from './mediaStore';
import { useUIStore } from './uiStore';
import { useFrameStore } from './frameStore';

// ============================================================================
// Card Dimension Selectors
// ============================================================================

/**
 * Get card dimensions (width, height, margins)
 * Use this instead of subscribing to entire card object
 */
export const useCardDimensions = () => {
  return useCardStore(
    useShallow((state) => ({
      width: state.card.width,
      height: state.card.height,
      marginX: state.card.marginX,
      marginY: state.card.marginY,
    }))
  );
};

/**
 * Get individual card dimension properties
 */
export const useCardWidth = () => useCardStore((state) => state.card.width);
export const useCardHeight = () => useCardStore((state) => state.card.height);
export const useCardMarginX = () => useCardStore((state) => state.card.marginX);
export const useCardMarginY = () => useCardStore((state) => state.card.marginY);

/**
 * Get derived margins from frameStore (always up-to-date)
 * Margins are auto-calculated based on current frames
 *
 * @returns Object with marginX and marginY (0-1 normalized values)
 *
 * @example
 * ```typescript
 * const margins = useMargins();
 * // margins.marginX and margins.marginY are always current
 * ```
 */
export const useMargins = () => {
  return useFrameStore(
    useShallow((state) => state.margins)
  );
};

// ============================================================================
// Text Selectors
// ============================================================================

/**
 * Get all text fields
 * Use sparingly - prefer specific text field selectors
 */
export const useCardText = () => useCardStore((state) => state.card.text);

/**
 * Get a specific text field by key
 * Only re-renders when that specific field changes
 */
export const useTextField = (key: string) => {
  return useCardStore((state) => state.card.text?.[key]);
};

/**
 * Get multiple specific text fields
 * Returns an object with only the requested fields
 */
export const useTextFields = (...keys: string[]) => {
  return useCardStore(
    useShallow((state) => {
      const result: Record<string, unknown> = {};
      keys.forEach((key) => {
        result[key] = state.card.text?.[key];
      });
      return result;
    })
  );
};

// ============================================================================
// Frame Selectors
// ============================================================================

/**
 * Get all frames
 */
export const useFrames = () => useCardStore((state) => state.card.frames);

/**
 * Get a specific frame by index
 */
export const useFrame = (index: number) => {
  return useCardStore((state) => state.card.frames[index]);
};

/**
 * Get frame count
 */
export const useFrameCount = () => {
  return useCardStore((state) => state.card.frames.length);
};

// ============================================================================
// Art Selectors (from mediaStore)
// ============================================================================

/**
 * Get all art state properties
 * Use this for components that need multiple art properties
 */
export const useArtState = () => {
  return useMediaStore(
    useShallow((state) => ({
      artX: state.artX,
      artY: state.artY,
      artZoom: state.artZoom,
      artRotate: state.artRotate,
      artGrayscale: state.artGrayscale,
      artImage: state.artImage,
    }))
  );
};

/**
 * Get individual art properties
 */
export const useArtX = () => useMediaStore((state) => state.artX);
export const useArtY = () => useMediaStore((state) => state.artY);
export const useArtZoom = () => useMediaStore((state) => state.artZoom);
export const useArtRotation = () => useMediaStore((state) => state.artRotate);
export const useArtImage = () => useMediaStore((state) => state.artImage);

/**
 * Get art grayscale setting (from mediaStore)
 */
export const useArtGrayscale = () => useMediaStore((state) => state.artGrayscale);

/**
 * Get art position only (x, y)
 */
export const useArtPosition = () => {
  return useMediaStore(
    useShallow((state) => ({
      x: state.artX,
      y: state.artY,
    }))
  );
};

// ============================================================================
// Second Art Selectors (from mediaStore)
// ============================================================================

/**
 * Get all second art state properties
 * Use this for components that need multiple second art properties
 */
export const useArt2State = () => {
  return useMediaStore(
    useShallow((state) => ({
      artX2: state.artX2,
      artY2: state.artY2,
      artZoom2: state.artZoom2,
      artRotate2: state.artRotate2,
      artGrayscale2: state.artGrayscale2,
      artImage2: state.artImage2,
    }))
  );
};

/**
 * Get individual second art properties
 */
export const useArtX2 = () => useMediaStore((state) => state.artX2);
export const useArtY2 = () => useMediaStore((state) => state.artY2);
export const useArtZoom2 = () => useMediaStore((state) => state.artZoom2);
export const useArtRotation2 = () => useMediaStore((state) => state.artRotate2);
export const useArtImage2 = () => useMediaStore((state) => state.artImage2);

/**
 * Get second art grayscale setting (from mediaStore)
 */
export const useArtGrayscale2 = () => useMediaStore((state) => state.artGrayscale2);

/**
 * Get second art position only (x, y)
 */
export const useArt2Position = () => {
  return useMediaStore(
    useShallow((state) => ({
      x: state.artX2,
      y: state.artY2,
    }))
  );
};

// ============================================================================
// Set Symbol Selectors (from mediaStore)
// ============================================================================

/**
 * Get all set symbol state
 */
export const useSetSymbolState = () => {
  return useMediaStore(
    useShallow((state) => ({
      setSymbolX: state.setSymbolX,
      setSymbolY: state.setSymbolY,
      setSymbolZoom: state.setSymbolZoom,
      setSymbolRotate: state.setSymbolRotate,
      setSymbolImage: state.setSymbolImage,
      setCode: state.setCode,
      rarity: state.rarity,
    }))
  );
};

/**
 * Get individual set symbol properties
 */
export const useSetSymbolX = () => useMediaStore((state) => state.setSymbolX);
export const useSetSymbolY = () => useMediaStore((state) => state.setSymbolY);
export const useSetSymbolZoom = () => useMediaStore((state) => state.setSymbolZoom);
export const useSetSymbolRotation = () => useMediaStore((state) => state.setSymbolRotate);
export const useSetSymbolImage = () => useMediaStore((state) => state.setSymbolImage);

/**
 * Get set symbol bounds from card
 */
export const useSetSymbolBounds = () => {
  return useCardStore((state) => state.card.setSymbolBounds);
};

// ============================================================================
// Watermark Selectors (from mediaStore)
// ============================================================================

/**
 * Get all watermark state
 */
export const useWatermarkState = () => {
  return useMediaStore(
    useShallow((state) => ({
      watermarkX: state.watermarkX,
      watermarkY: state.watermarkY,
      watermarkZoom: state.watermarkZoom,
      watermarkOpacity: state.watermarkOpacity,
      watermarkImage: state.watermarkImage,
      watermarkLeft: state.watermarkLeft,
      watermarkRight: state.watermarkRight,
      watermarkSource: state.watermarkSource,
    }))
  );
};

/**
 * Get watermark bounds from card
 */
export const useWatermarkBounds = () => {
  return useCardStore((state) => state.card.watermarkBounds);
};

// ============================================================================
// Mana Symbol Selectors
// ============================================================================

/**
 * Get mana symbols configuration
 */
export const useManaSymbols = () => {
  return useCardStore((state) => state.card.manaSymbols);
};

// ============================================================================
// Bottom Info Selectors
// ============================================================================

/**
 * Get bottom info (collector information)
 */
export const useBottomInfo = () => {
  return useCardStore((state) => state.card.bottomInfo);
};

/**
 * Get bottom info visibility and color
 */
export const useBottomInfoSettings = () => {
  return useCardStore(
    useShallow((state) => ({
      show: state.card.showCollectorInfo,
      color: state.card.bottomInfoColor,
      style: state.card.collectorInfoStyle,
    }))
  );
};

// ============================================================================
// Version & Pack Selectors
// ============================================================================

/**
 * Get card version
 */
export const useCardVersion = () => useCardStore((state) => state.card.version);

/**
 * Get loaded pack from frame store (primary) or card store (fallback)
 */
export const useLoadedPack = () => {
  const frameStorePack = useFrameStore((state) => state.loadedPack);
  const cardStorePack = useCardStore((state) => state.loadedPack);
  return frameStorePack || cardStorePack;
};

// ============================================================================
// UI State Selectors
// ============================================================================

/**
 * Get UI flags
 */
export const useShowGuidelines = () => useCardStore((state) => state.showGuidelines);
export const useShowArtBoundsDebug = () => useUIStore((state) => state.showArtBoundsDebug);
export const useShowTransparencies = () => useCardStore((state) => state.showTransparencies);
export const useAutoFitArt = () => useUIStore((state) => state.autoFitArt);
export const useActiveArtSlot = () => useUIStore((state) => state.activeArtSlot);
export const useRotateCanvasPreview = () => useUIStore((state) => state.rotateCanvasPreview);

// ============================================================================
// Saga Selectors
// ============================================================================

/**
 * Get saga info
 */
export const useSagaInfo = () => useCardStore((state) => state.card.saga);

/**
 * Check if current card is a saga
 */
export const useIsSagaCard = () => {
  return useCardStore((state) => {
    const version = state.card.version?.toLowerCase();
    return Boolean(version?.includes('saga') && state.card.saga);
  });
};

// ============================================================================
// Planeswalker Selectors
// ============================================================================

/**
 * Get planeswalker info
 */
export const usePlaneswalkerInfo = () => {
  return useCardStore((state) => state.card.planeswalker);
};

/**
 * Check if current card is a planeswalker
 */
export const useIsPlaneswalkerCard = () => {
  return useCardStore((state) => {
    const version = state.card.version?.toLowerCase();
    return Boolean(version?.includes('planeswalker') && state.card.planeswalker);
  });
};

// ============================================================================
// Station Selectors
// ============================================================================

/**
 * Get station info
 */
export const useStationInfo = () => useCardStore((state) => state.card.station);

/**
 * Check if current card is a station card
 */
export const useIsStationCard = () => {
  return useCardStore((state) => {
    const version = state.card.version?.toLowerCase();
    return Boolean(version?.includes('station') && state.card.station);
  });
};

// ============================================================================
// Neo Basics (Kamigawa) Selectors
// ============================================================================

/**
 * Get Neo Basics title height
 */
export const useNeoBasicsTitleHeight = () => {
  return useCardStore((state) => state.neoBasicsTitleHeight);
};

/**
 * Get Neo Basics elements
 */
export const useNeoBasicsElements = () => {
  return useCardStore((state) => state.neoBasicsElements);
};

/**
 * Get Neo Basics color overrides
 */
export const useNeoBasicsColorOverrides = () => {
  return useCardStore((state) => state.neoBasicsColorOverrides);
};

/**
 * Check if current card is Neo Basics
 */
export const useIsNeoBasicsCard = () => {
  return useCardStore((state) => {
    const version = state.card.version?.toLowerCase();
    return version === 'neobasics';
  });
};

// ============================================================================
// Canvas Ref Selectors
// ============================================================================

/**
 * Get preview canvas ref
 * Use this for components that need to interact with the canvas
 */
export const usePreviewCanvasRef = () => {
  return useCardStore((state) => state.previewCanvasRef);
};

// ============================================================================
// Collector Info Selectors
// ============================================================================

/**
 * Get all collector info fields
 */
export const useCollectorInfo = () => {
  return useCardStore(
    useShallow((state) => ({
      setCode: state.collectorSetCode,
      language: state.collectorLanguage,
      artist: state.collectorArtist,
      rarity: state.collectorRarity,
      digits: state.collectorDigits,
    }))
  );
};

/**
 * Get serial number settings
 */
export const useSerialNumbers = () => {
  return useCardStore(
    useShallow((state) => ({
      show: state.showSerialNumbers,
      number: state.card.serialNumber,
      total: state.card.serialTotal,
      x: state.card.serialX,
      y: state.card.serialY,
      scale: state.card.serialScale,
    }))
  );
};

// ============================================================================
// Frame Editor UI Selectors
// ============================================================================

/**
 * Get frame editor state
 */
export const useIsFrameEditorOpen = () => useCardStore((state) => state.isFrameEditorOpen);
export const useEditingFrameIndex = () => useCardStore((state) => state.editingFrameIndex);


