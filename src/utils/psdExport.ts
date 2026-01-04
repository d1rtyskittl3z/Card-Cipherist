/**
 * PSD Export Utility
 * Ported from Card Conjurer's downloadCardAsPSD() function
 *
 * Exports the current card as an editable Photoshop PSD file with:
 * - Separate layers for art, frames, text, symbols
 * - Editable text layers (point and paragraph)
 * - Layer groups for organization
 * - Layer masks for complex frame shapes
 * - Clipping masks for HSL adjustments and color overlays
 *
 * Dependencies: ag-psd (v29.0.0)
 */

import { writePsd } from 'ag-psd';
import type { Psd, Layer } from 'ag-psd';
import type { Card, CardBounds, Frame, Mask, TextObject, CanvasRefs } from '../types/card.types';
import type { FramePackTemplate } from '../components/frames/packs/types';
import type { PackMetrics, RenderOptions, FieldSpec } from '../renderer/text/types';
import { scaleX, scaleY, scaleWidth, scaleHeight } from './canvasHelpers';
import { applyHSL } from './hslAdjustment';
import { renderField, createTempCanvases } from '../renderer/text/textRenderer';
import { createStandardManaAtlas, SymbolAtlas } from '../renderer/text/symbols';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Parameters required for PSD export
 */
export interface PSDExportParams {
  /** Card data from cardStore */
  card: Card;
  /** Canvas references for rendering */
  canvasRefs: Partial<CanvasRefs>;
  /** Loaded art image */
  artImage: HTMLImageElement | null;
  /** Loaded set symbol image */
  setSymbolImage: HTMLImageElement | null;
  /** Loaded watermark image */
  watermarkImage: HTMLImageElement | null;
  /** Currently loaded frame pack template */
  loadedPack: FramePackTemplate | null;
  /** Collector info enabled flag */
  collectorInfoEnabled: boolean;
  /** Art grayscale flag */
  artGrayscale: boolean;
  /** Art positioning */
  artTransform: {
    x: number;
    y: number;
    zoom: number;
    rotate: number;
  };
  /** Set symbol positioning */
  setSymbolTransform: {
    x: number;
    y: number;
    zoom: number;
    rotate: number;
  };
  /** Watermark positioning */
  watermarkTransform: {
    x: number;
    y: number;
    zoom: number;
    opacity: number;
    left: string;
    right: string;
  };
  /** Right gradient mask for watermark two-tone coloring */
  rightGradientMask: HTMLImageElement | null;
  /** Set code for layer naming */
  setCode?: string;
  /** Rarity for layer naming */
  setRarity?: string;
  /** Render text function from text renderer */
  renderTextToCanvas?: (
    textObject: TextObject,
    ctx: CanvasRenderingContext2D,
    card: Card,
    loadedPack: FramePackTemplate | null,
    fieldKey: string,
    canvasWidth: number,
    canvasHeight: number
  ) => Promise<void>;

  // ============================================================================
  // Special Card Type Parameters
  // ============================================================================

  /** Special card type canvases (from CanvasRefs) */
  specialCanvases?: {
    planeswalkerPre?: HTMLCanvasElement;
    planeswalkerPost?: HTMLCanvasElement;
    saga?: HTMLCanvasElement;
    class?: HTMLCanvasElement;
    dungeon?: HTMLCanvasElement;
    dungeonFX?: HTMLCanvasElement;
    stationPre?: HTMLCanvasElement;
    stationPost?: HTMLCanvasElement;
  };

  /** Planeswalker-specific images for loyalty badges */
  planeswalkerImages?: {
    plusIcon?: HTMLImageElement;
    minusIcon?: HTMLImageElement;
    neutralIcon?: HTMLImageElement;
  };

  /** Saga-specific images for chapter indicators */
  sagaImages?: {
    chapterIcon?: HTMLImageElement;
    divider?: HTMLImageElement;
  };

  /** Station-specific images for badges and PT boxes */
  stationImages?: {
    badgeImage?: HTMLImageElement;
    ptImage?: HTMLImageElement;
  };

  /** Planeswalker ability Y-position layout data [tallIndex][abilityCount-1][abilityIndex] */
  planeswalkerAbilityLayout?: number[][][];

  /** Flavor bar image for separate divider layer */
  flavorBarImage?: HTMLImageElement;
}

/**
 * Internal layer data structure for tracking during processing
 */
interface PSDLayerData {
  index: number;
  name: string;
  canvas: HTMLCanvasElement;
  opacity: number;
  blendMode: string;
  colorOverlay: string | null;
  hslHue: number;
  hslSaturation: number;
  hslLightness: number;
  mask?: Layer['mask'];
  /** Original frame data for recreating the layer with PSD masks */
  frameData?: {
    image: HTMLImageElement;
    bounds: CardBounds;
    ogBounds: CardBounds;
    masks: Mask[];
  };
}

/**
 * Erase mask data for second-pass mask application
 */
interface EraseMaskData {
  index: number;
  canvas: HTMLCanvasElement;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Parse a color string to RGB object
 * Supports hex colors (#RRGGBB) and named colors
 */
export function parseColorToRGB(color: string): { r: number; g: number; b: number } {
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    return {
      r: parseInt(hex.substr(0, 2), 16),
      g: parseInt(hex.substr(2, 2), 16),
      b: parseInt(hex.substr(4, 2), 16),
    };
  }

  const colorMap: Record<string, { r: number; g: number; b: number }> = {
    black: { r: 0, g: 0, b: 0 },
    white: { r: 255, g: 255, b: 255 },
    red: { r: 255, g: 0, b: 0 },
    blue: { r: 0, g: 0, b: 255 },
    green: { r: 0, g: 128, b: 0 },
    yellow: { r: 255, g: 255, b: 0 },
    orange: { r: 255, g: 165, b: 0 },
    purple: { r: 128, g: 0, b: 128 },
    gray: { r: 128, g: 128, b: 128 },
    grey: { r: 128, g: 128, b: 128 },
  };

  return colorMap[color.toLowerCase()] || { r: 0, g: 0, b: 0 };
}

/**
 * Convert Canvas blend mode to Photoshop blend mode string
 */
export function convertBlendMode(mode: GlobalCompositeOperation | string | undefined): string {
  const modeMap: Record<string, string> = {
    'source-over': 'normal',
    multiply: 'multiply',
    screen: 'screen',
    overlay: 'overlay',
    darken: 'darken',
    lighten: 'lighten',
    'color-dodge': 'color dodge',
    'color-burn': 'color burn',
    'hard-light': 'hard light',
    'soft-light': 'soft light',
    difference: 'difference',
    exclusion: 'exclusion',
    hue: 'hue',
    saturation: 'saturation',
    color: 'color',
    luminosity: 'luminosity',
  };
  return modeMap[mode || 'source-over'] || 'normal';
}

/**
 * Text baseline Y offset multipliers for different text field types
 */
const TEXT_Y_OFFSETS: Record<string, number> = {
  title: 0.95,
  type: 1.1,
  rules: 0.999,
  pt: 0.8,
  mana: 0.8,
  default: 0.95,
};

/**
 * Text X offset adjustments for specific fields
 */
const TEXT_X_OFFSETS: Record<string, number> = {
  pt: 10,
  default: 0,
};

/**
 * Font name mapping from internal names to Photoshop PostScript names
 */
const FONT_MAP: Record<string, string> = {
  mplantin: 'MPlantin',
  mplantini: 'MPlantin-It',
  belerenb: 'Beleren-Bold',
  beleren: 'Beleren',
  belerenbsc: 'BelerenSmallCaps-Bold',
  matrix: 'MatrixBoldSmallCaps',
  matrixb: 'MatrixBoldSmallCaps',
  gothammedium: 'GothamMedium',
  gothambold: 'GothamBold',
  goudymedieval: 'GoudyMediaeval',
};

/**
 * Create a filled black canvas for mask compositing
 */
function createBlackCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);
  return canvas;
}

// ============================================================================
// Special Card Type Helpers
// ============================================================================

/**
 * Extract color name from badge/PT image path for layer naming
 * e.g., "/badges/w.png" -> "White "
 */
function getColorFromSrc(imageSrc: string | undefined): string {
  if (!imageSrc) return '';
  const match = imageSrc.match(/\/(badges|pt)\/([a-z])\.png/i);
  if (match) {
    const colorMap: Record<string, string> = {
      w: 'White',
      u: 'Blue',
      b: 'Black',
      r: 'Red',
      g: 'Green',
      m: 'Multicolored',
      a: 'Artifact',
      c: 'Colorless',
      l: 'Land',
    };
    const color = colorMap[match[2].toLowerCase()];
    return color ? `${color} ` : '';
  }
  return '';
}

/**
 * Roman numeral conversion for saga chapters
 * Supports 1-99
 */
function romanNumeral(num: number): string {
  const ones = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
  const tens = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'];
  return tens[Math.floor(num / 10)] + ones[num % 10];
}

/**
 * Create combined frame mask from all masks (with optional invert)
 * Handles half-masks and complex mask combinations
 * Exported for potential use in enhanced mask handling
 */
export function createCombinedFrameMask(
  frame: Frame,
  card: Card,
  psdWidth: number,
  psdHeight: number,
  invert: boolean = false
): ImageData | null {
  if (!frame.masks?.length) return null;

  const maskCanvas = document.createElement('canvas');
  maskCanvas.width = psdWidth;
  maskCanvas.height = psdHeight;
  const maskCtx = maskCanvas.getContext('2d')!;

  // Start with white (fully visible)
  maskCtx.fillStyle = 'white';
  maskCtx.fillRect(0, 0, psdWidth, psdHeight);
  maskCtx.globalCompositeOperation = 'multiply';

  const bounds = frame.bounds || { x: 0, y: 0, width: 1, height: 1 };
  const ogBounds = frame.ogBounds || bounds;

  // Create temp canvas for each mask
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = psdWidth;
  tempCanvas.height = psdHeight;
  const tempCtx = tempCanvas.getContext('2d')!;

  // Calculate transform for masks
  const transform = {
    x: scaleX(
      card,
      (bounds.x || 0) -
        (ogBounds.x || 0) -
        (ogBounds.x || 0) * ((bounds.width || 1) / (ogBounds.width || 1) - 1)
    ),
    y: scaleY(
      card,
      (bounds.y || 0) -
        (ogBounds.y || 0) -
        (ogBounds.y || 0) * ((bounds.height || 1) / (ogBounds.height || 1) - 1)
    ),
    w: scaleWidth(card, (bounds.width || 1) / (ogBounds.width || 1)),
    h: scaleHeight(card, (bounds.height || 1) / (ogBounds.height || 1)),
  };

  // Apply each mask
  frame.masks.forEach((mask) => {
    if (!mask.image) return;

    tempCtx.clearRect(0, 0, psdWidth, psdHeight);
    tempCtx.drawImage(mask.image, transform.x, transform.y, transform.w, transform.h);

    const tempData = tempCtx.getImageData(0, 0, psdWidth, psdHeight);
    const pixels = tempData.data;

    // Convert alpha to grayscale (optionally inverted)
    for (let i = 0; i < pixels.length; i += 4) {
      const value = invert ? 255 - pixels[i + 3] : pixels[i + 3];
      pixels[i] = pixels[i + 1] = pixels[i + 2] = value;
      pixels[i + 3] = 255;
    }

    tempCtx.putImageData(tempData, 0, 0);
    maskCtx.drawImage(tempCanvas, 0, 0);
  });

  return maskCtx.getImageData(0, 0, psdWidth, psdHeight);
}

/**
 * Create a simple canvas layer from an existing canvas
 */
function createCanvasLayer(
  name: string,
  sourceCanvas: HTMLCanvasElement,
  psdWidth: number,
  psdHeight: number
): Layer {
  const canvas = document.createElement('canvas');
  canvas.width = psdWidth;
  canvas.height = psdHeight;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(sourceCanvas, 0, 0, psdWidth, psdHeight);
  return {
    name,
    canvas,
    left: 0,
    top: 0,
    right: psdWidth,
    bottom: psdHeight,
    blendMode: 'normal',
    opacity: 1,
  };
}

// ============================================================================
// Text Rendering for PSD Export
// ============================================================================

/** Cached symbol atlas for PSD export (loaded once) */
let cachedAtlas: SymbolAtlas | null = null;

/**
 * Get or create the symbol atlas for PSD text rendering
 */
async function getSymbolAtlas(): Promise<SymbolAtlas> {
  if (!cachedAtlas) {
    cachedAtlas = await createStandardManaAtlas();
  }
  return cachedAtlas;
}

/**
 * Create a function that renders a text field to a canvas for PSD export
 * This is the callback passed to exportCardAsPSD for raster text layers
 */
export async function createPSDTextRenderer(): Promise<
  (
    textObject: TextObject,
    ctx: CanvasRenderingContext2D,
    card: Card,
    loadedPack: FramePackTemplate | null,
    fieldKey: string,
    canvasWidth: number,
    canvasHeight: number
  ) => Promise<void>
> {
  const atlas = await getSymbolAtlas();

  return async (
    textObject: TextObject,
    ctx: CanvasRenderingContext2D,
    card: Card,
    loadedPack: FramePackTemplate | null,
    fieldKey: string,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    // Use actual canvas dimensions for scaling, not card.width/height
    const cardWidth = canvasWidth;
    const cardHeight = canvasHeight;

    // Create pack metrics for scaling
    const packMetrics: PackMetrics = {
      cardWidth,
      cardHeight,
      marginX: card.marginX || 0,
      marginY: card.marginY || 0,
      scaleX: (n: number) => Math.round((n + (card.marginX || 0)) * cardWidth),
      scaleY: (n: number) => Math.round((n + (card.marginY || 0)) * cardHeight),
      scaleWidth: (n: number) => Math.round(n * cardWidth),
      scaleHeight: (n: number) => Math.round(n * cardHeight),
    };

    // Create temporary canvases for rendering
    const tempCanvases = createTempCanvases(cardWidth, cardHeight);

    // Get field spec from pack text configuration using the key directly
    const packFieldSpec = loadedPack?.text?.[fieldKey];

    // Match the screen renderer pattern exactly:
    // 1. Start with pack spec (or card spec as fallback)
    // 2. Override with text content from card
    // 3. Only override bounds if explicitly set in card
    const positionSpec = packFieldSpec || textObject;
    const cardPositionSpec = textObject;

    // Skip if no position spec with required fields
    if (!positionSpec || positionSpec.y === undefined || positionSpec.width === undefined || 
        positionSpec.height === undefined || !positionSpec.size) {
      return;
    }

    // Build fieldSpec matching screen renderer pattern
    const fieldSpec: FieldSpec = {
      ...positionSpec,
      // Ensure required fields have values (validated above)
      y: positionSpec.y,
      width: positionSpec.width,
      height: positionSpec.height,
      size: positionSpec.size,
      text: textObject.text || '',
      // Override bounds if they exist in card.text (user-edited bounds)
      ...(cardPositionSpec?.x !== undefined && { x: cardPositionSpec.x }),
      ...(cardPositionSpec?.y !== undefined && { y: cardPositionSpec.y }),
      ...(cardPositionSpec?.width !== undefined && { width: cardPositionSpec.width }),
      ...(cardPositionSpec?.height !== undefined && { height: cardPositionSpec.height }),
    };

    // Skip if no text content
    if (!fieldSpec.text || !fieldSpec.text.trim()) {
      return;
    }

    // Build render options
    const renderOptions: RenderOptions = {
      cardName: card.text?.title?.text,
      version: loadedPack?.version,
      showsFlavorBar: card.showsFlavorBar,
    };

    // Render the field
    const result = renderField(
      ctx,
      fieldSpec,
      packMetrics,
      atlas,
      tempCanvases,
      renderOptions
    );

    if (!result.success) {
      console.warn(`PSD text render warning for "${textObject.name}":`, result.error);
    }
  };
}

// ============================================================================
// Layer Creation Functions
// ============================================================================

/**
 * Create art layer canvas
 */
function createArtLayer(
  params: PSDExportParams,
  psdWidth: number,
  psdHeight: number
): HTMLCanvasElement | null {
  const { artImage, artGrayscale, artTransform } = params;

  // Skip if no art image loaded or zoom is 0
  if (!artImage || artTransform.zoom === 0) {
    return null;
  }

  const artCanvas = document.createElement('canvas');
  artCanvas.width = psdWidth;
  artCanvas.height = psdHeight;
  const artCtx = artCanvas.getContext('2d')!;

  artCtx.save();

  // Calculate art position (center of canvas + offset)
  const centerX = psdWidth / 2 + artTransform.x;
  const centerY = psdHeight / 2 + artTransform.y;

  artCtx.translate(centerX, centerY);
  artCtx.rotate((Math.PI / 180) * artTransform.rotate);

  if (artGrayscale) {
    artCtx.filter = 'grayscale(1)';
  }

  // Draw art centered at origin (translated point)
  const scaledWidth = artImage.width * artTransform.zoom;
  const scaledHeight = artImage.height * artTransform.zoom;
  artCtx.drawImage(artImage, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);

  artCtx.restore();

  return artCanvas;
}

/**
 * Process frame layers and create PSD layer data
 * Returns regular frame layers, PT layers, crown layers, and erase masks
 */
async function processFrameLayers(
  params: PSDExportParams,
  psdWidth: number,
  psdHeight: number
): Promise<{
  frameLayers: PSDLayerData[];
  ptLayers: PSDLayerData[];
  crownLayers: PSDLayerData[];
  eraseMasks: EraseMaskData[];
}> {
  const { card } = params;
  const blackCanvas = createBlackCanvas(psdWidth, psdHeight);

  // Process frames in order - first frame in array = bottom layer in PSD
  // PSD children array: first child = bottom of layer panel, last child = top of layer panel
  // This matches the app's frame ordering where frames[0] is the bottom layer
  const orderedFrames = card.frames.slice();

  // Ensure all frame and mask images are loaded before processing
  // This handles cases where images weren't loaded (e.g., imported cards, race conditions)
  await Promise.all(
    orderedFrames.map(async (frame) => {
      // Load frame image if missing but src exists
      if (!frame.image && frame.src) {
        try {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject(new Error(`Failed to load frame: ${frame.src}`));
            img.src = frame.src;
          });
          // Mutate the frame in place (this is intentional for the export context)
          (frame as Frame).image = img;
        } catch (e) {
          console.warn(`PSD export: Could not load frame image: ${frame.src}`, e);
        }
      }

      // Load mask images if missing
      if (frame.masks) {
        await Promise.all(
          frame.masks.map(async (mask) => {
            if (!mask.image && mask.src) {
              try {
                const maskImg = new Image();
                maskImg.crossOrigin = 'anonymous';
                await new Promise<void>((resolve, reject) => {
                  maskImg.onload = () => resolve();
                  maskImg.onerror = () => reject(new Error(`Failed to load mask: ${mask.src}`));
                  maskImg.src = mask.src;
                });
                // Mutate the mask in place (this is intentional for the export context)
                (mask as Mask).image = maskImg;
              } catch (e) {
                console.warn(`PSD export: Could not load mask image: ${mask.src}`, e);
              }
            }
          })
        );
      }
    })
  );
  const frameLayers: PSDLayerData[] = [];
  const ptLayers: PSDLayerData[] = [];
  const crownLayers: PSDLayerData[] = [];
  const eraseMasks: EraseMaskData[] = [];

  for (let index = 0; index < orderedFrames.length; index++) {
    const frame = orderedFrames[index];

    // Skip invisible frames
    if (frame.visible === false) continue;

    // Handle erase layers separately
    if (frame.erase) {
      const eraseCanvas = createEraseLayerCanvas(frame, card, psdWidth, psdHeight);
      if (eraseCanvas) {
        eraseMasks.push({ index, canvas: eraseCanvas });
      }
      continue;
    }

    // Create regular frame layer
    const frameCanvas = createFrameLayerCanvas(frame, card, psdWidth, psdHeight, blackCanvas);
    if (!frameCanvas) continue;

    // Build layer name with mask names
    let layerName = frame.name || `Frame ${index + 1}`;
    if (frame.masks && frame.masks.length > 0) {
      const maskNames = frame.masks
        .map((mask) => mask.name)
        .filter((name) => name && !name.toLowerCase().includes('mask'))
        .join(', ');
      if (maskNames) {
        layerName += ', ' + maskNames;
      }
    }

    const layerData: PSDLayerData = {
      index,
      name: layerName,
      canvas: frameCanvas,
      opacity: (frame.opacity ?? 100) / 100,
      blendMode: convertBlendMode(frame.mode),
      colorOverlay: frame.colorOverlayCheck ? frame.colorOverlay || null : null,
      hslHue: frame.hslHue || 0,
      hslSaturation: frame.hslSaturation || 0,
      hslLightness: frame.hslLightness || 0,
      // Store original frame data for PSD mask creation
      frameData: frame.image ? {
        image: frame.image,
        bounds: frame.bounds || { x: 0, y: 0, width: 1, height: 1 },
        ogBounds: frame.ogBounds || frame.bounds || { x: 0, y: 0, width: 1, height: 1 },
        masks: frame.masks || [],
      } : undefined,
    };

    // Categorize layers
    if (frame.name && frame.name.toLowerCase().includes('power/toughness')) {
      ptLayers.push(layerData);
    } else if (frame.name && frame.name.toLowerCase().includes('crown')) {
      crownLayers.push(layerData);
    } else {
      frameLayers.push(layerData);
    }
  }

  return { frameLayers, ptLayers, crownLayers, eraseMasks };
}

/**
 * Create canvas for an erase layer (inverted alpha mask)
 */
function createEraseLayerCanvas(
  frame: Frame,
  card: Card,
  psdWidth: number,
  psdHeight: number
): HTMLCanvasElement | null {
  if (!frame.image) return null;

  const eraseCanvas = document.createElement('canvas');
  eraseCanvas.width = psdWidth;
  eraseCanvas.height = psdHeight;
  const eraseCtx = eraseCanvas.getContext('2d')!;

  const bounds = frame.bounds || { x: 0, y: 0, width: 1, height: 1 };
  const ogBounds = frame.ogBounds || bounds;
  const frameX = scaleX(card, bounds.x);
  const frameY = scaleY(card, bounds.y);
  const frameWidth = scaleWidth(card, bounds.width);
  const frameHeight = scaleHeight(card, bounds.height);

  // Draw the frame image
  eraseCtx.globalCompositeOperation = 'source-over';
  eraseCtx.drawImage(frame.image, frameX, frameY, frameWidth, frameHeight);

  // Apply masks if present
  if (frame.masks && frame.masks.length > 0) {
    // Calculate mask transform based on frame bounds relative to original bounds
    // This handles half-masks and complex mask positioning correctly
    const maskTransformX = scaleX(
      card,
      (bounds.x || 0) -
        (ogBounds.x || 0) -
        (ogBounds.x || 0) * ((bounds.width || 1) / (ogBounds.width || 1) - 1)
    );
    const maskTransformY = scaleY(
      card,
      (bounds.y || 0) -
        (ogBounds.y || 0) -
        (ogBounds.y || 0) * ((bounds.height || 1) / (ogBounds.height || 1) - 1)
    );
    const maskTransformW = scaleWidth(card, (bounds.width || 1) / (ogBounds.width || 1));
    const maskTransformH = scaleHeight(card, (bounds.height || 1) / (ogBounds.height || 1));

    // Apply masks
    eraseCtx.globalCompositeOperation = 'destination-in';
    frame.masks.forEach((mask) => {
      if (!mask.image) return;
      eraseCtx.drawImage(
        mask.image,
        maskTransformX,
        maskTransformY,
        maskTransformW,
        maskTransformH
      );
    });
  }

  // Apply HSL adjustments if needed
  if (frame.hslHue || frame.hslSaturation || frame.hslLightness) {
    applyHSL(eraseCanvas, frame.hslHue || 0, frame.hslSaturation || 0, frame.hslLightness || 0);
  }

  // Convert alpha to inverted grayscale mask
  // Opaque areas (alpha=255) become black (hide), transparent becomes white (show)
  const maskImageData = eraseCtx.getImageData(0, 0, psdWidth, psdHeight);
  const maskPixels = maskImageData.data;

  for (let i = 0; i < maskPixels.length; i += 4) {
    const maskValue = 255 - maskPixels[i + 3]; // Invert alpha
    maskPixels[i] = maskPixels[i + 1] = maskPixels[i + 2] = maskValue;
    maskPixels[i + 3] = 255;
  }

  eraseCtx.putImageData(maskImageData, 0, 0);

  return eraseCanvas;
}

/**
 * Create canvas for a regular frame layer with masks applied
 */
function createFrameLayerCanvas(
  frame: Frame,
  card: Card,
  psdWidth: number,
  psdHeight: number,
  blackCanvas: HTMLCanvasElement
): HTMLCanvasElement | null {
  if (!frame.image) return null;

  const frameCanvas = document.createElement('canvas');
  frameCanvas.width = psdWidth;
  frameCanvas.height = psdHeight;
  const frameCtx = frameCanvas.getContext('2d')!;

  const bounds = frame.bounds || { x: 0, y: 0, width: 1, height: 1 };
  const ogBounds = frame.ogBounds || bounds;
  const frameX = scaleX(card, bounds.x);
  const frameY = scaleY(card, bounds.y);
  const frameWidth = scaleWidth(card, bounds.width);
  const frameHeight = scaleHeight(card, bounds.height);

  // Check if this frame has any masks to apply
  const hasMasks = frame.masks && frame.masks.length > 0;

  if (!hasMasks) {
    // No masks - just draw the frame directly
    frameCtx.drawImage(frame.image, frameX, frameY, frameWidth, frameHeight);
    return frameCanvas;
  }

  // Create temporary mask canvas for mask compositing
  const tempMaskCanvas = document.createElement('canvas');
  tempMaskCanvas.width = psdWidth;
  tempMaskCanvas.height = psdHeight;
  const tempMaskCtx = tempMaskCanvas.getContext('2d')!;

  // Start with black (for mask compositing)
  tempMaskCtx.globalCompositeOperation = 'source-over';
  tempMaskCtx.drawImage(blackCanvas, 0, 0, psdWidth, psdHeight);

  // Calculate mask transform based on frame bounds relative to original bounds
  // This handles half-masks and complex mask positioning correctly
  const maskTransformX = scaleX(
    card,
    (bounds.x || 0) -
      (ogBounds.x || 0) -
      (ogBounds.x || 0) * ((bounds.width || 1) / (ogBounds.width || 1) - 1)
  );
  const maskTransformY = scaleY(
    card,
    (bounds.y || 0) -
      (ogBounds.y || 0) -
      (ogBounds.y || 0) * ((bounds.height || 1) / (ogBounds.height || 1) - 1)
  );
  const maskTransformW = scaleWidth(card, (bounds.width || 1) / (ogBounds.width || 1));
  const maskTransformH = scaleHeight(card, (bounds.height || 1) / (ogBounds.height || 1));

  // Apply masks using source-in compositing
  tempMaskCtx.globalCompositeOperation = 'source-in';
  frame.masks.forEach((mask) => {
    if (!mask.image) return;
    tempMaskCtx.drawImage(
      mask.image,
      maskTransformX,
      maskTransformY,
      maskTransformW,
      maskTransformH
    );
  });

  // Draw the frame image
  tempMaskCtx.drawImage(frame.image, frameX, frameY, frameWidth, frameHeight);

  // Copy to final canvas
  frameCtx.drawImage(tempMaskCanvas, 0, 0);

  return frameCanvas;
}

/**
 * Apply erase masks to all affected layers
 */
function applyEraseMasksToLayers(
  layers: PSDLayerData[],
  eraseMasks: EraseMaskData[],
  psdWidth: number,
  psdHeight: number
): void {
  layers.forEach((layer) => {
    // Get erase masks with higher index (drawn later = erases this layer)
    const applicableEraseMasks = eraseMasks.filter((erase) => erase.index > layer.index);

    if (applicableEraseMasks.length === 0) return;

    // Check if layer has content
    const layerCtx = layer.canvas.getContext('2d')!;
    const layerData = layerCtx.getImageData(0, 0, psdWidth, psdHeight);
    const layerPixels = layerData.data;

    let layerHasContent = false;
    for (let i = 3; i < layerPixels.length; i += 4) {
      if (layerPixels[i] > 0) {
        layerHasContent = true;
        break;
      }
    }

    if (!layerHasContent) return;

    // Combine all applicable erase masks
    const combinedMaskCanvas = document.createElement('canvas');
    combinedMaskCanvas.width = psdWidth;
    combinedMaskCanvas.height = psdHeight;
    const combinedMaskCtx = combinedMaskCanvas.getContext('2d')!;

    // Start with white (fully visible)
    combinedMaskCtx.fillStyle = 'white';
    combinedMaskCtx.fillRect(0, 0, psdWidth, psdHeight);

    // Apply each erase mask by multiplication
    applicableEraseMasks.forEach((erase) => {
      const eraseMaskData = erase.canvas.getContext('2d')!.getImageData(0, 0, psdWidth, psdHeight);
      const erasePixels = eraseMaskData.data;

      const combinedData = combinedMaskCtx.getImageData(0, 0, psdWidth, psdHeight);
      const combinedPixels = combinedData.data;

      for (let i = 0; i < combinedPixels.length; i += 4) {
        const eraseValue = erasePixels[i];
        const currentValue = combinedPixels[i];
        const finalValue = (currentValue / 255) * (eraseValue / 255) * 255;

        combinedPixels[i] = finalValue;
        combinedPixels[i + 1] = finalValue;
        combinedPixels[i + 2] = finalValue;
      }

      combinedMaskCtx.putImageData(combinedData, 0, 0);
    });

    // Check if mask actually affects this layer
    const finalMaskData = combinedMaskCtx.getImageData(0, 0, psdWidth, psdHeight);
    const finalMaskPixels = finalMaskData.data;

    let maskWouldAffectLayer = false;
    for (let i = 0; i < finalMaskPixels.length; i += 4) {
      if (layerPixels[i + 3] > 0 && finalMaskPixels[i] < 255) {
        maskWouldAffectLayer = true;
        break;
      }
    }

    if (!maskWouldAffectLayer) return;

    // Apply mask to layer
    layer.mask = {
      top: 0,
      left: 0,
      bottom: psdHeight,
      right: psdWidth,
      defaultColor: 255,
      imageData: finalMaskData,
      disabled: false,
      positionRelativeToLayer: false,
      fromVectorData: false,
    };
  });
}

/**
 * Add layer with optional color overlay and HSL adjustment as clipping masks
 * If frameData is present with masks, recreates the full frame and uses PSD masks
 */
function addLayerWithOverlays(
  layer: PSDLayerData,
  targetArray: Layer[],
  psdWidth: number,
  psdHeight: number,
  card: Card
): void {
  // Determine if we need to recreate the full frame with PSD masks
  const hasFrameMasks = layer.frameData?.masks && layer.frameData.masks.length > 0;
  let fullFrameCanvas = layer.canvas;
  let combinedMaskData: ImageData | null = null;

  // If we have frame masks, draw the full frame and create combined PSD mask
  if (hasFrameMasks && layer.frameData) {
    const canvas = document.createElement('canvas');
    canvas.width = psdWidth;
    canvas.height = psdHeight;
    const ctx = canvas.getContext('2d')!;
    fullFrameCanvas = canvas;

    const { bounds, image } = layer.frameData;
    if (image) {
      const frameX = scaleX(card, bounds.x);
      const frameY = scaleY(card, bounds.y);
      const frameWidth = scaleWidth(card, bounds.width);
      const frameHeight = scaleHeight(card, bounds.height);
      ctx.drawImage(image, frameX, frameY, frameWidth, frameHeight);
    }

    // Create combined frame mask for PSD
    combinedMaskData = createCombinedFrameMask(
      { masks: layer.frameData.masks, bounds: layer.frameData.bounds, ogBounds: layer.frameData.ogBounds } as Frame,
      card,
      psdWidth,
      psdHeight,
      false
    );
  }

  // Combine frame mask with erase mask if both exist
  let finalMask: Layer['mask'] | undefined;
  if (combinedMaskData && layer.mask?.imageData) {
    // Multiply the two masks together
    const combinedCanvas = document.createElement('canvas');
    combinedCanvas.width = psdWidth;
    combinedCanvas.height = psdHeight;
    const combinedCtx = combinedCanvas.getContext('2d')!;
    combinedCtx.putImageData(combinedMaskData, 0, 0);

    const eraseMaskCanvas = document.createElement('canvas');
    eraseMaskCanvas.width = psdWidth;
    eraseMaskCanvas.height = psdHeight;
    const eraseMaskCtx = eraseMaskCanvas.getContext('2d')!;
    eraseMaskCtx.putImageData(layer.mask.imageData as ImageData, 0, 0);

    combinedCtx.globalCompositeOperation = 'multiply';
    combinedCtx.drawImage(eraseMaskCanvas, 0, 0);

    finalMask = {
      top: 0,
      left: 0,
      bottom: psdHeight,
      right: psdWidth,
      defaultColor: 255,
      imageData: combinedCtx.getImageData(0, 0, psdWidth, psdHeight),
      disabled: false,
      positionRelativeToLayer: false,
      fromVectorData: false,
    };
  } else if (combinedMaskData) {
    finalMask = {
      top: 0,
      left: 0,
      bottom: psdHeight,
      right: psdWidth,
      defaultColor: 255,
      imageData: combinedMaskData,
      disabled: false,
      positionRelativeToLayer: false,
      fromVectorData: false,
    };
  } else if (layer.mask) {
    finalMask = layer.mask;
  }

  // Add base layer
  targetArray.push({
    name: layer.name,
    canvas: fullFrameCanvas,
    left: 0,
    top: 0,
    right: psdWidth,
    bottom: psdHeight,
    opacity: layer.opacity,
    blendMode: layer.blendMode as Layer['blendMode'],
    mask: finalMask,
  });

  // Add HSL adjustment as clipping mask if present
  if (layer.hslHue !== 0 || layer.hslSaturation !== 0 || layer.hslLightness !== 0) {
    const hslCanvas = document.createElement('canvas');
    hslCanvas.width = psdWidth;
    hslCanvas.height = psdHeight;
    const hslCtx = hslCanvas.getContext('2d')!;

    // Draw base layer and apply HSL
    hslCtx.drawImage(fullFrameCanvas, 0, 0);
    applyHSL(hslCanvas, layer.hslHue, layer.hslSaturation, layer.hslLightness);

    // Build label
    const hslLabel: string[] = [];
    if (layer.hslHue !== 0) hslLabel.push(`H:${layer.hslHue > 0 ? '+' : ''}${layer.hslHue}`);
    if (layer.hslSaturation !== 0)
      hslLabel.push(`S:${layer.hslSaturation > 0 ? '+' : ''}${layer.hslSaturation}`);
    if (layer.hslLightness !== 0)
      hslLabel.push(`L:${layer.hslLightness > 0 ? '+' : ''}${layer.hslLightness}`);

    targetArray.push({
      name: `${layer.name} HSL [${hslLabel.join(', ')}]`,
      canvas: hslCanvas,
      left: 0,
      top: 0,
      right: psdWidth,
      bottom: psdHeight,
      opacity: 1,
      blendMode: 'normal',
      clipping: true,
    });
  }

  // Add color overlay as clipping mask if present
  if (layer.colorOverlay) {
    const colorCanvas = document.createElement('canvas');
    colorCanvas.width = psdWidth;
    colorCanvas.height = psdHeight;
    const colorCtx = colorCanvas.getContext('2d')!;
    colorCtx.fillStyle = layer.colorOverlay;
    colorCtx.fillRect(0, 0, psdWidth, psdHeight);

    targetArray.push({
      name: `${layer.name} Color Overlay`,
      canvas: colorCanvas,
      left: 0,
      top: 0,
      right: psdWidth,
      bottom: psdHeight,
      opacity: 1,
      blendMode: 'normal',
      clipping: true,
    });
  }
}

/**
 * Create watermark layer canvas with two-tone color gradient support
 * Port from useLayerRenderers.renderWatermark() logic
 */
function createWatermarkLayer(
  params: PSDExportParams,
  psdWidth: number,
  psdHeight: number
): { canvas: HTMLCanvasElement; opacity: number } | null {
  const { watermarkImage, watermarkTransform, rightGradientMask } = params;

  // Skip if no watermark image loaded or zoom is 0 or left color is 'none'
  if (!watermarkImage || watermarkTransform.zoom === 0 || watermarkTransform.left === 'none') {
    return null;
  }

  // Render watermark at full opacity (layer opacity is set separately in PSD)
  const watermarkCanvas = document.createElement('canvas');
  watermarkCanvas.width = psdWidth;
  watermarkCanvas.height = psdHeight;
  const watermarkCtx = watermarkCanvas.getContext('2d')!;

  const x = psdWidth / 2 + watermarkTransform.x;
  const y = psdHeight / 2 + watermarkTransform.y;
  const scaledWidth = watermarkImage.width * watermarkTransform.zoom;
  const scaledHeight = watermarkImage.height * watermarkTransform.zoom;

  // Reset compositing
  watermarkCtx.globalCompositeOperation = 'source-over';
  watermarkCtx.globalAlpha = 1;

  // Draw right half with gradient if specified
  if (watermarkTransform.right !== 'none' && rightGradientMask) {
    // Draw the gradient mask image (transparent left to opaque right)
    watermarkCtx.drawImage(
      rightGradientMask,
      0,
      0,
      psdWidth,
      psdHeight
    );

    // Use source-in to clip the next drawing to the gradient mask shape
    watermarkCtx.globalCompositeOperation = 'source-in';

    if (watermarkTransform.right === 'default') {
      // Use actual watermark image for right side
      watermarkCtx.drawImage(
        watermarkImage,
        x - scaledWidth / 2,
        y - scaledHeight / 2,
        scaledWidth,
        scaledHeight
      );
    } else {
      // Fill with solid color for right side
      watermarkCtx.fillStyle = watermarkTransform.right;
      watermarkCtx.fillRect(0, 0, psdWidth, psdHeight);
    }

    // Draw left side behind the right gradient
    watermarkCtx.globalCompositeOperation = 'destination-over';
  }

  // Draw left side (main watermark)
  if (watermarkTransform.left === 'default') {
    // Use actual watermark image
    watermarkCtx.drawImage(
      watermarkImage,
      x - scaledWidth / 2,
      y - scaledHeight / 2,
      scaledWidth,
      scaledHeight
    );
  } else {
    // Fill with solid color
    watermarkCtx.fillStyle = watermarkTransform.left;
    watermarkCtx.fillRect(0, 0, psdWidth, psdHeight);
  }

  // Mask to watermark shape using destination-in
  watermarkCtx.globalCompositeOperation = 'destination-in';
  watermarkCtx.drawImage(
    watermarkImage,
    x - scaledWidth / 2,
    y - scaledHeight / 2,
    scaledWidth,
    scaledHeight
  );

  // Reset for next drawing operations
  watermarkCtx.globalCompositeOperation = 'source-over';
  watermarkCtx.globalAlpha = 1;

  return { canvas: watermarkCanvas, opacity: watermarkTransform.opacity };
}

/**
 * Create set symbol layer canvas
 */
function createSetSymbolLayer(
  params: PSDExportParams,
  psdWidth: number,
  psdHeight: number
): { canvas: HTMLCanvasElement; name: string } | null {
  const { card, setSymbolImage, setSymbolTransform, loadedPack, setCode, setRarity } = params;

  // Skip if no set symbol image loaded
  if (!setSymbolImage) {
    return null;
  }

  const setSymbolCanvas = document.createElement('canvas');
  setSymbolCanvas.width = psdWidth;
  setSymbolCanvas.height = psdHeight;
  const setSymbolCtx = setSymbolCanvas.getContext('2d')!;

  let x: number;
  let y: number;
  let symbolWidth: number;
  let symbolHeight: number;

  if (loadedPack?.setSymbolBounds) {
    const bounds = loadedPack.setSymbolBounds;
    const boundWidth = bounds.width * card.width;
    const boundHeight = bounds.height * card.height;
    const symbolAspect = setSymbolImage.width / setSymbolImage.height;
    const boundAspect = boundWidth / boundHeight;

    if (symbolAspect > boundAspect) {
      symbolWidth = boundWidth * setSymbolTransform.zoom;
      symbolHeight = (boundWidth / symbolAspect) * setSymbolTransform.zoom;
    } else {
      symbolHeight = boundHeight * setSymbolTransform.zoom;
      symbolWidth = (boundHeight * symbolAspect) * setSymbolTransform.zoom;
    }

    const baseX = (bounds.x + card.marginX) * card.width;
    const baseY = (bounds.y + card.marginY) * card.height;
    x = baseX + setSymbolTransform.x;
    y = baseY + setSymbolTransform.y;

    // Apply alignment
    if (bounds.horizontal === 'center') x -= symbolWidth / 2;
    else if (bounds.horizontal === 'right') x -= symbolWidth;
    if (bounds.vertical === 'center') y -= symbolHeight / 2;
    else if (bounds.vertical === 'bottom') y -= symbolHeight;
  } else {
    // Fallback: center the symbol if no bounds available
    symbolWidth = setSymbolImage.width * setSymbolTransform.zoom;
    symbolHeight = setSymbolImage.height * setSymbolTransform.zoom;
    x = psdWidth / 2 + setSymbolTransform.x - symbolWidth / 2;
    y = psdHeight / 2 + setSymbolTransform.y - symbolHeight / 2;
  }

  const centerX = x + symbolWidth / 2;
  const centerY = y + symbolHeight / 2;

  setSymbolCtx.save();
  setSymbolCtx.translate(centerX, centerY);
  setSymbolCtx.rotate((setSymbolTransform.rotate * Math.PI) / 180);
  setSymbolCtx.drawImage(setSymbolImage, -symbolWidth / 2, -symbolHeight / 2, symbolWidth, symbolHeight);
  setSymbolCtx.restore();

  // Build layer name
  const rarityMap: Record<string, string> = {
    c: 'Common',
    u: 'Uncommon',
    r: 'Rare',
    m: 'Mythic',
    red: 'Red',
    s: 'Timeshifted',
    t: 'Timeshifted',
  };
  const rarityLabel = rarityMap[setRarity?.toLowerCase() || ''] || setRarity || '';
  const code = setCode?.toUpperCase() || '';
  const setSymbolName = code && rarityLabel ? `Set Symbol: ${code}-${rarityLabel}` : 'Set Symbol';

  return { canvas: setSymbolCanvas, name: setSymbolName };
}

/**
 * Create editable text layer data for ag-psd
 */
function createEditableTextLayer(
  textObject: TextObject,
  key: string,
  card: Card,
  _psdWidth: number,
  _psdHeight: number
): Layer | null {
  // Clean text of mana symbols
  const cleanText = textObject.text
    .replace(/\{line\}/g, '\n')
    .replace(/\{lns\}/g, '\n')
    .replace(/\{[^}]+\}/g, '')
    .trim();

  if (!cleanText) return null;

  const textBoxX = scaleX(card, textObject.x);
  const textBoxY = scaleY(card, textObject.y);
  const textBoxWidth = scaleWidth(card, textObject.width);
  const textBoxHeight = scaleHeight(card, textObject.height);
  const fontSize = scaleHeight(card, textObject.size);
  const fillColor = parseColorToRGB(textObject.color || 'black');
  const textRotation = textObject.rotation || 0;

  // Get alignment
  let alignment: 'left' | 'center' | 'right' = 'left';
  if (textObject.align === 'center') alignment = 'center';
  else if (textObject.align === 'right') alignment = 'right';

  // Map font name
  const fontName = FONT_MAP[textObject.font?.toLowerCase() || 'mplantin'] || 'MPlantin';

  // Get offsets
  const offsetMultiplier = TEXT_Y_OFFSETS[key] || TEXT_Y_OFFSETS.default;
  const baselineOffset = fontSize * offsetMultiplier;
  const xOffset = TEXT_X_OFFSETS[key] || TEXT_X_OFFSETS.default;

  // Calculate rotation transform
  const rotationRad = (textRotation * Math.PI) / 180;
  const cos = Math.cos(rotationRad);
  const sin = Math.sin(rotationRad);

  // Calculate rotated bounding box
  const corners = [
    { x: 0, y: 0 },
    { x: textBoxWidth, y: 0 },
    { x: textBoxWidth, y: textBoxHeight },
    { x: 0, y: textBoxHeight },
  ];

  const rotatedCorners = corners.map((corner) => ({
    x: corner.x * cos - corner.y * sin + textBoxX + xOffset,
    y: corner.x * sin + corner.y * cos + textBoxY,
  }));

  const minX = Math.min(...rotatedCorners.map((c) => c.x));
  const maxX = Math.max(...rotatedCorners.map((c) => c.x));
  const minY = Math.min(...rotatedCorners.map((c) => c.y));
  const maxY = Math.max(...rotatedCorners.map((c) => c.y));

  // Check if rules text (use paragraph text)
  const isRulesText =
    key === 'rules' || (textObject.name && textObject.name.toLowerCase().includes('rules'));

  if (isRulesText) {
    // Paragraph text layer
    return {
      name: `${textObject.name || key} (Editable)`,
      text: {
        text: cleanText,
        transform: [cos, sin, -sin, cos, textBoxX + xOffset, textBoxY],
        shapeType: 'box' as const,
        boxBounds: [0, 0, textBoxWidth, textBoxHeight],
        style: {
          font: { name: fontName },
          fontSize,
          fillColor,
          leading: fontSize * 1.2,
        },
        paragraphStyle: {
          justification: alignment,
        },
      },
      top: minY,
      left: minX,
      bottom: maxY,
      right: maxX,
    };
  } else {
    // Point text layer
    return {
      name: `${textObject.name || key} (Editable)`,
      text: {
        text: cleanText,
        transform: [cos, sin, -sin, cos, textBoxX + xOffset, textBoxY + baselineOffset],
        style: {
          font: { name: fontName },
          fontSize,
          fillColor,
        },
        paragraphStyle: {
          justification: alignment,
        },
      },
      top: minY,
      left: minX,
      bottom: maxY,
      right: maxX,
    };
  }
}

// ============================================================================
// Special Card Type Layer Creation
// ============================================================================

/**
 * Create dungeon-specific layers for PSD export
 * Dungeon cards have wall grid and FX layers
 */
function createDungeonLayers(
  params: PSDExportParams,
  psdWidth: number,
  psdHeight: number
): {
  dungeonLayer: Layer | null;
  dungeonFXLayer: Layer | null;
} {
  const { card, specialCanvases } = params;

  // Check if this is a dungeon card
  if (!card.dungeon || !card.version?.toLowerCase().includes('dungeon')) {
    return { dungeonLayer: null, dungeonFXLayer: null };
  }

  let dungeonLayer: Layer | null = null;
  let dungeonFXLayer: Layer | null = null;

  // Dungeon main layer (wall grid)
  if (specialCanvases?.dungeon) {
    dungeonLayer = createCanvasLayer('Dungeon', specialCanvases.dungeon, psdWidth, psdHeight);
  }

  // Dungeon FX layer (effects overlay)
  if (specialCanvases?.dungeonFX) {
    dungeonFXLayer = createCanvasLayer('Dungeon FX', specialCanvases.dungeonFX, psdWidth, psdHeight);
  }

  return { dungeonLayer, dungeonFXLayer };
}

/**
 * Create class-specific layers for PSD export
 * Class cards have level header images
 */
function createClassLayers(
  params: PSDExportParams,
  psdWidth: number,
  psdHeight: number
): {
  headersGroup: Layer | null;
  classCanvasLayer: Layer | null;
} {
  const { card, specialCanvases } = params;

  // Check if this is a class card (but not "classic" variant)
  if (!card.class || !card.version?.includes('class') || card.version?.includes('classic')) {
    return { headersGroup: null, classCanvasLayer: null };
  }

  let classCanvasLayer: Layer | null = null;

  // Use the pre-rendered class canvas if available
  if (specialCanvases?.class) {
    classCanvasLayer = createCanvasLayer('Class Headers', specialCanvases.class, psdWidth, psdHeight);
  }

  // Note: For full implementation with individual header layers, would need to:
  // 1. Load header images (/img/frames/class/header.png or deluxe variant)
  // 2. Calculate visible levels from card.text['level1c'], ['level2c'], ['level3c']
  // 3. Create individual header layers for each visible level

  return { headersGroup: null, classCanvasLayer };
}

/**
 * Create saga-specific layers for PSD export
 * Saga cards have chapter icons, roman numerals, and dividers
 */
function createSagaLayers(
  params: PSDExportParams,
  psdWidth: number,
  psdHeight: number
): {
  chaptersGroup: Layer | null;
  textLayers: Layer[];
  sagaCanvasLayer: Layer | null;
} {
  const { card, specialCanvases, sagaImages } = params;

  // Check if this is a saga card
  if (!card.saga || !card.version?.toLowerCase().includes('saga')) {
    return { chaptersGroup: null, textLayers: [], sagaCanvasLayer: null };
  }

  const saga = card.saga;
  const chapterLayers: Layer[] = [];
  const textLayers: Layer[] = [];

  // Use the pre-rendered saga canvas if available
  let sagaCanvasLayer: Layer | null = null;
  if (specialCanvases?.saga) {
    sagaCanvasLayer = createCanvasLayer('Saga Frame', specialCanvases.saga, psdWidth, psdHeight);
  }

  // If we have saga images, create individual chapter layers
  if (sagaImages?.chapterIcon?.complete || sagaImages?.divider?.complete) {
    // Process abilities in reverse order for correct PSD stacking
    for (let i = saga.count - 1; i >= 0; i--) {
      // Calculate chapter number for this ability
      let currentChapterNum = 1;
      for (let j = 0; j < i; j++) {
        currentChapterNum += saga.abilities[j] || 1;
      }

      const abilityKey = `ability${i}`;
      const ability = card.text?.[abilityKey];
      if (!ability) continue;

      const x = scaleX(card, saga.x);
      const y = scaleY(card, ability.y);
      const width = scaleWidth(card, saga.width);
      const height = scaleHeight(card, ability.height || 0.1);
      const chapterCount = saga.abilities[i] || 1;

      // Chapter icon positioning
      const numeralX = x - scaleWidth(card, 0.0614);
      const numeralY = y + (height - scaleHeight(card, 0.0629)) / 2;
      const offset = scaleHeight(card, 0.0358) * 2;
      const centerOffset = (chapterCount - 1) / 2;

      // Draw each chapter icon and numeral (backwards for proper ordering)
      if (sagaImages?.chapterIcon?.complete) {
        for (let j = chapterCount - 1; j >= 0; j--) {
          const posOffset = (j - centerOffset) * offset;
          const chapterNum = currentChapterNum + j;
          const roman = romanNumeral(chapterNum);

          // Chapter icon
          const iconCanvas = document.createElement('canvas');
          iconCanvas.width = psdWidth;
          iconCanvas.height = psdHeight;
          const iconCtx = iconCanvas.getContext('2d')!;
          iconCtx.drawImage(
            sagaImages.chapterIcon,
            numeralX,
            numeralY + posOffset,
            scaleWidth(card, 0.0787),
            scaleHeight(card, 0.0629)
          );
          chapterLayers.push({
            name: `Chapter ${roman} Icon`,
            canvas: iconCanvas,
            left: 0,
            top: 0,
            right: psdWidth,
            bottom: psdHeight,
            blendMode: 'normal',
            opacity: 1,
          });

          // Roman numeral text
          const textCanvas = document.createElement('canvas');
          textCanvas.width = psdWidth;
          textCanvas.height = psdHeight;
          const textCtx = textCanvas.getContext('2d')!;
          textCtx.font = `normal normal 550 ${scaleHeight(card, 0.0324)}px plantinsemibold`;
          textCtx.textAlign = 'center';
          textCtx.fillStyle = 'black';
          textCtx.fillText(
            roman,
            numeralX + scaleWidth(card, 0.0394),
            numeralY + posOffset + scaleHeight(card, 0.0429)
          );
          textLayers.push({
            name: `Chapter ${roman} Text`,
            canvas: textCanvas,
            left: 0,
            top: 0,
            right: psdWidth,
            bottom: psdHeight,
            blendMode: 'normal',
            opacity: 1,
          });
        }
      }

      // Divider line
      if (sagaImages?.divider?.complete) {
        const dividerCanvas = document.createElement('canvas');
        dividerCanvas.width = psdWidth;
        dividerCanvas.height = psdHeight;
        const dividerCtx = dividerCanvas.getContext('2d')!;
        dividerCtx.drawImage(
          sagaImages.divider,
          x,
          y - scaleHeight(card, 0.00145),
          width,
          scaleHeight(card, 0.0029)
        );
        chapterLayers.push({
          name: `Ability ${i + 1} Divider`,
          canvas: dividerCanvas,
          left: 0,
          top: 0,
          right: psdWidth,
          bottom: psdHeight,
          blendMode: 'normal',
          opacity: 1,
        });
      }
    }
  }

  const chaptersGroup: Layer | null =
    chapterLayers.length > 0
      ? {
          name: 'Saga Chapters',
          children: chapterLayers,
          opened: false,
        }
      : null;

  return { chaptersGroup, textLayers, sagaCanvasLayer };
}

/**
 * Create planeswalker-specific layers for PSD export
 * Planeswalker cards have loyalty badges and ability cost text
 * 
 * Note: We create individual badge layers (like the original Card Conjurer) rather than
 * using the planeswalkerPost canvas, which already has badges baked in. This gives
 * better editability in Photoshop.
 */
function createPlaneswalkerLayers(
  params: PSDExportParams,
  psdWidth: number,
  psdHeight: number
): {
  preFrameLayer: Layer | null;
  postFrameLayer: Layer | null;
  badgesGroup: Layer | null;
  textLayers: Layer[];
} {
  const { card, specialCanvases, planeswalkerImages, planeswalkerAbilityLayout } = params;

  // Check if this is a planeswalker card
  if (!card.planeswalker || !card.version?.toLowerCase().includes('planeswalker')) {
    return { preFrameLayer: null, postFrameLayer: null, badgesGroup: null, textLayers: [] };
  }

  const pw = card.planeswalker;
  const textLayers: Layer[] = [];
  const badgeLayers: Layer[] = [];

  // Pre-frame canvas (background effects)
  let preFrameLayer: Layer | null = null;
  if (specialCanvases?.planeswalkerPre) {
    preFrameLayer = createCanvasLayer(
      'Planeswalker Pre-Frame',
      specialCanvases.planeswalkerPre,
      psdWidth,
      psdHeight
    );
  }

  // Check if we have the badge images to create individual badge layers
  // If not, fall back to using the post canvas (which has badges baked in)
  const hasBadgeImages = planeswalkerImages?.plusIcon || planeswalkerImages?.minusIcon || planeswalkerImages?.neutralIcon;
  
  // Post-frame canvas is only used as fallback when we don't have individual badge images
  let postFrameLayer: Layer | null = null;
  if (!hasBadgeImages && specialCanvases?.planeswalkerPost) {
    postFrameLayer = createCanvasLayer(
      'Planeswalker Frame',
      specialCanvases.planeswalkerPost,
      psdWidth,
      psdHeight
    );
    // Return early since we're using the combined canvas
    return { preFrameLayer, postFrameLayer, badgesGroup: null, textLayers: [] };
  }

  // Badge type configurations
  const badgeConfigs: Record<
    string,
    { imageKey: 'plusIcon' | 'minusIcon' | 'neutralIcon'; x: number; y: number; w: number; h: number; textY: number; type: string }
  > = {
    '+': { imageKey: 'plusIcon', x: 0.0294, y: -0.0258, w: 0.14, h: 0.0724, textY: 0.0172, type: 'Plus' },
    '-': { imageKey: 'minusIcon', x: 0.028, y: -0.0153, w: 0.1414, h: 0.0705, textY: 0.0181, type: 'Minus' },
    '0': { imageKey: 'neutralIcon', x: 0.028, y: -0.0153, w: 0.1414, h: 0.061, textY: 0.0191, type: 'Neutral' },
  };

  // Determine if tall planeswalker
  const isTall = card.version?.includes('Tall') || card.version?.includes('Compleated');
  const tallIndex = isTall ? 1 : 0;

  // Process abilities in reverse order for correct PSD stacking
  for (let i = pw.count - 1; i >= 0; i--) {
    const costValue = pw.abilities[i];
    if (!costValue) continue;

    // Get placement Y from layout
    const layoutData = planeswalkerAbilityLayout?.[tallIndex]?.[pw.count - 1]?.[i];
    const placementY =
      layoutData !== undefined
        ? scaleY(card, layoutData + (pw.abilityAdjust?.[i] || 0))
        : scaleY(card, 0.5 + i * 0.1); // Fallback positioning

    // Determine badge type
    const badgeKey = costValue.includes('+') ? '+' : costValue.includes('-') ? '-' : '0';
    const config = badgeConfigs[badgeKey];
    const badgeImage = planeswalkerImages?.[config.imageKey];

    // Draw badge icon if available
    if (badgeImage?.complete && badgeImage.naturalWidth > 0) {
      const badgeCanvas = document.createElement('canvas');
      badgeCanvas.width = psdWidth;
      badgeCanvas.height = psdHeight;
      const badgeCtx = badgeCanvas.getContext('2d')!;
      badgeCtx.drawImage(
        badgeImage,
        scaleX(card, config.x),
        placementY + scaleHeight(card, config.y),
        scaleWidth(card, config.w),
        scaleHeight(card, config.h)
      );
      badgeLayers.push({
        name: `${config.type} Badge ${i + 1}`,
        canvas: badgeCanvas,
        left: 0,
        top: 0,
        right: psdWidth,
        bottom: psdHeight,
        blendMode: 'normal',
        opacity: 1,
      });
    }

    // Draw cost text
    const textCanvas = document.createElement('canvas');
    textCanvas.width = psdWidth;
    textCanvas.height = psdHeight;
    const textCtx = textCanvas.getContext('2d')!;
    textCtx.font = `${scaleHeight(card, 0.0286)}px belerenbsc`;
    textCtx.fillStyle = 'white';
    textCtx.textAlign = 'center';
    textCtx.fillText(costValue, scaleX(card, 0.1027), placementY + scaleHeight(card, config.textY));
    textLayers.push({
      name: `Ability ${i + 1} Cost`,
      canvas: textCanvas,
      left: 0,
      top: 0,
      right: psdWidth,
      bottom: psdHeight,
      blendMode: 'normal',
      opacity: 1,
    });
  }

  // Create badges group
  const badgesGroup: Layer | null =
    badgeLayers.length > 0
      ? {
          name: 'Loyalty Badges',
          children: badgeLayers,
          opened: false,
        }
      : null;

  return { preFrameLayer, postFrameLayer, badgesGroup, textLayers };
}

/**
 * Create station-specific layers for PSD export
 * Station cards have colored squares, badges, and PT boxes
 */
function createStationLayers(
  params: PSDExportParams,
  psdWidth: number,
  psdHeight: number
): {
  squareLayers: Layer[];
  ptGroup: Layer | null;
  badgesGroup: Layer | null;
  textLayers: Layer[];
  preLayer: Layer | null;
  postLayer: Layer | null;
} {
  const { card, specialCanvases, stationImages } = params;

  // Check if this is a station card
  if (!card.station || !card.version?.toLowerCase().includes('station')) {
    return { squareLayers: [], ptGroup: null, badgesGroup: null, textLayers: [], preLayer: null, postLayer: null };
  }

  const station = card.station;
  const squareLayers: Layer[] = [];
  const ptLayers: Layer[] = [];
  const badgeLayers: Layer[] = [];
  const textLayers: Layer[] = [];

  // Pre/post canvases
  let preLayer: Layer | null = null;
  let postLayer: Layer | null = null;
  if (specialCanvases?.stationPre) {
    preLayer = createCanvasLayer('Station Pre', specialCanvases.stationPre, psdWidth, psdHeight);
  }
  if (specialCanvases?.stationPost) {
    postLayer = createCanvasLayer('Station Post', specialCanvases.stationPost, psdWidth, psdHeight);
  }

  // Helper to get station position
  const getStationPosition = (
    type: 'badge' | 'pt',
    index: 1 | 2,
    settings: { x: number; y: number; width: number; height: number; fontSize: number }
  ) => {
    const square = station.squares[index];
    const abilityKey = index === 2 ? 'ability2' : 'ability1';
    const basePos = station.baseTextPositions?.[abilityKey as keyof typeof station.baseTextPositions];
    if (!basePos || !square) return null;

    const squareX = scaleX(card, basePos.x) + (square.x - 214);
    const squareY = scaleY(card, basePos.y) + square.y;
    const elementX =
      type === 'pt' ? squareX + square.width + (settings.x - 266) : squareX + (settings.x || -81);
    const elementY = squareY + square.height / 2 + (settings.y || 0);

    return { elementX, elementY, settings };
  };

  // Process squares in reverse order (2 then 1)
  ([2, 1] as const).forEach((squareIndex) => {
    const square = station.squares[squareIndex];
    const abilityKey = squareIndex === 2 ? 'ability2' : 'ability1';
    const shouldRender =
      squareIndex === 2
        ? square?.enabled && card.text?.[abilityKey]
        : square?.enabled && card.text?.[abilityKey] && !station.disableFirstAbility;

    if (shouldRender && square) {
      const basePos = station.baseTextPositions?.[abilityKey as keyof typeof station.baseTextPositions];
      if (basePos) {
        const squareX = scaleX(card, basePos.x) + (square.x - 214);
        const squareY = scaleY(card, basePos.y) + square.y;

        const squareCanvas = document.createElement('canvas');
        squareCanvas.width = psdWidth;
        squareCanvas.height = psdHeight;
        const squareCtx = squareCanvas.getContext('2d')!;
        squareCtx.fillStyle = square.color;
        squareCtx.fillRect(squareX, squareY, square.width, square.height);

        squareLayers.push({
          name: `Station Square ${squareIndex}`,
          canvas: squareCanvas,
          left: 0,
          top: 0,
          right: psdWidth,
          bottom: psdHeight,
          blendMode: 'normal',
          opacity: square.opacity || 1,
        });
      }
    }
  });

  // Station PT box
  const hasPT = card.text?.pt?.text?.trim();
  if (hasPT && stationImages?.ptImage?.complete) {
    const ptColor = getColorFromSrc(stationImages.ptImage.src);
    const pos = getStationPosition('pt', 2, station.ptSettings);

    if (pos) {
      // PT box image
      const boxCanvas = document.createElement('canvas');
      boxCanvas.width = psdWidth;
      boxCanvas.height = psdHeight;
      const boxCtx = boxCanvas.getContext('2d')!;
      boxCtx.drawImage(
        stationImages.ptImage,
        pos.elementX,
        pos.elementY - pos.settings.height / 2,
        pos.settings.width,
        pos.settings.height
      );
      ptLayers.push({
        name: `${ptColor}Station PT`,
        canvas: boxCanvas,
        left: 0,
        top: 0,
        right: psdWidth,
        bottom: psdHeight,
        blendMode: 'normal',
        opacity: 1,
      });

      // PT text
      const textCanvas = document.createElement('canvas');
      textCanvas.width = psdWidth;
      textCanvas.height = psdHeight;
      const textCtx = textCanvas.getContext('2d')!;
      textCtx.font = `${scaleHeight(card, pos.settings.fontSize)}px belerenbsc`;
      textCtx.fillStyle = 'white';
      textCtx.textAlign = 'center';
      textCtx.textBaseline = 'middle';
      textCtx.fillText(
        card.text?.pt?.text || '',
        pos.elementX + pos.settings.width / 2 + 3,
        pos.elementY + 7
      );
      textLayers.push({
        name: 'Station PT',
        canvas: textCanvas,
        left: 0,
        top: 0,
        right: psdWidth,
        bottom: psdHeight,
        blendMode: 'normal',
        opacity: 1,
      });
    }
  }

  // Station badges
  if (stationImages?.badgeImage?.complete) {
    const badgeImage = stationImages.badgeImage;
    const badgeColor = getColorFromSrc(badgeImage.src);

    ([2, 1] as const).forEach((index) => {
      const badgeValue = station.badgeValues?.[index];
      if (badgeValue?.trim() && /\d/.test(badgeValue)) {
        const pos = getStationPosition('badge', index, station.badgeSettings);

        if (pos) {
          // Badge box image
          const boxCanvas = document.createElement('canvas');
          boxCanvas.width = psdWidth;
          boxCanvas.height = psdHeight;
          const boxCtx = boxCanvas.getContext('2d')!;
          boxCtx.drawImage(
            badgeImage,
            pos.elementX,
            pos.elementY - pos.settings.height / 2,
            pos.settings.width,
            pos.settings.height
          );
          badgeLayers.push({
            name: `${badgeColor}Station Badge ${index}`,
            canvas: boxCanvas,
            left: 0,
            top: 0,
            right: psdWidth,
            bottom: psdHeight,
            blendMode: 'normal',
            opacity: 1,
          });

          // Badge text
          const textCanvas = document.createElement('canvas');
          textCanvas.width = psdWidth;
          textCanvas.height = psdHeight;
          const textCtx = textCanvas.getContext('2d')!;
          textCtx.font = `${scaleHeight(card, pos.settings.fontSize)}px belerenbsc`;
          textCtx.fillStyle = 'white';
          textCtx.textAlign = 'center';
          textCtx.textBaseline = 'middle';
          textCtx.fillText(badgeValue, pos.elementX + pos.settings.width / 2 + 3, pos.elementY + 5);
          textLayers.push({
            name: `Station Badge ${index}`,
            canvas: textCanvas,
            left: 0,
            top: 0,
            right: psdWidth,
            bottom: psdHeight,
            blendMode: 'normal',
            opacity: 1,
          });
        }
      }
    });
  }

  return {
    squareLayers,
    ptGroup:
      ptLayers.length > 0
        ? { name: 'Station PT', children: ptLayers, opened: false }
        : null,
    badgesGroup:
      badgeLayers.length > 0
        ? { name: 'Badges', children: badgeLayers, opened: false }
        : null,
    textLayers,
    preLayer,
    postLayer,
  };
}

/**
 * Create flavor divider layer for PSD export
 * Scans rendered text canvas to find the flavor bar position and creates a separate layer
 */
function createFlavorDividerLayer(
  params: PSDExportParams,
  renderedTextCanvas: HTMLCanvasElement,
  psdWidth: number,
  psdHeight: number
): Layer | null {
  const { card, flavorBarImage } = params;

  // Check if card should have a flavor bar
  if (card.showsFlavorBar === false) {
    return null;
  }

  // Check if any text field contains {flavor} or {divider}
  let hasFlavorMarker = false;
  if (card.text) {
    for (const textObject of Object.values(card.text)) {
      if (textObject.text?.includes('{flavor}') || textObject.text?.includes('{divider}') || textObject.text?.includes('///')) {
        hasFlavorMarker = true;
        break;
      }
    }
  }

  if (!hasFlavorMarker) {
    return null;
  }

  // If we have the flavor bar image, scan the rendered text canvas to find its position
  if (flavorBarImage?.complete && flavorBarImage.naturalWidth > 0) {
    const ctx = renderedTextCanvas.getContext('2d');
    if (!ctx) return null;

    // Scan the canvas from top to find a horizontal line of pixels (the bar)
    // The bar is typically in the lower half of the card
    const startY = Math.floor(psdHeight * 0.4);
    const endY = Math.floor(psdHeight * 0.9);
    const minAlpha = 20; // Minimum alpha to be considered opaque

    const imageData = ctx.getImageData(0, startY, psdWidth, endY - startY);
    const { data, width, height } = imageData;

    let barY: number | null = null;
    let barHeight = 0;

    // Scan each row to find horizontal lines
    for (let y = 0; y < height; y++) {
      let consecutivePixels = 0;
      let maxConsecutive = 0;

      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const alpha = data[idx + 3];

        if (alpha >= minAlpha) {
          consecutivePixels++;
        } else {
          if (consecutivePixels > maxConsecutive) {
            maxConsecutive = consecutivePixels;
          }
          consecutivePixels = 0;
        }
      }

      if (consecutivePixels > maxConsecutive) {
        maxConsecutive = consecutivePixels;
      }

      // If this row has a long horizontal line (at least 50% of width), it might be the bar
      if (maxConsecutive > width * 0.5) {
        if (barY === null) {
          barY = startY + y;
        }
        barHeight++;
      } else if (barY !== null && barHeight > 0) {
        // We've found the bar and passed it
        break;
      }
    }

    if (barY !== null && barHeight > 0) {
      // Create a layer with just the flavor bar at the detected position
      const barCanvas = document.createElement('canvas');
      barCanvas.width = psdWidth;
      barCanvas.height = psdHeight;
      const barCtx = barCanvas.getContext('2d')!;

      // Calculate bar dimensions based on detected height
      const scaledHeight = Math.max(barHeight, Math.floor(psdHeight * 0.003)); // Minimum height
      const barWidth = Math.floor(psdWidth * 0.7); // Typical bar width
      const barX = Math.floor((psdWidth - barWidth) / 2);

      barCtx.drawImage(
        flavorBarImage,
        barX,
        barY,
        barWidth,
        scaledHeight
      );

      return {
        name: 'Flavor Divider',
        canvas: barCanvas,
        left: 0,
        top: 0,
        right: psdWidth,
        bottom: psdHeight,
        blendMode: 'normal',
        opacity: 1,
      };
    }
  }

  return null;
}

// ============================================================================
// Main Export Function
// ============================================================================

/**
 * Export card as PSD file
 *
 * @param params Export parameters including card data, images, and canvas refs
 * @throws Error if export fails
 */
export async function exportCardAsPSD(params: PSDExportParams): Promise<void> {
  const startTime = performance.now();
  const { card, canvasRefs, collectorInfoEnabled, loadedPack } = params;

  // Validate inputs
  if (!canvasRefs.card) {
    throw new Error('Canvas not ready. Please wait for card to render.');
  }

  // Use actual canvas dimensions
  const psdWidth = canvasRefs.card.width;
  const psdHeight = canvasRefs.card.height;

  // Set PPI based on margins
  const hasMargins = card.marginX > 0 || card.marginY > 0;
  const targetPPI = hasMargins ? 804.04 : 810.48;

  // Create PSD structure
  const psd: Psd = {
    width: psdWidth,
    height: psdHeight,
    channels: 3,
    bitsPerChannel: 8,
    colorMode: 3, // RGB
    children: [],
    imageResources: {
      resolutionInfo: {
        horizontalResolution: targetPPI,
        horizontalResolutionUnit: 'PPI',
        widthUnit: 'Inches',
        verticalResolution: targetPPI,
        verticalResolutionUnit: 'PPI',
        heightUnit: 'Inches',
      },
      pixelAspectRatio: {
        aspect: 1.0,
      },
      printScale: {
        style: 'centered',
        x: 1.0,
        y: 1.0,
        scale: 1.0,
      },
    },
  };

  // Add art layer
  const artCanvas = createArtLayer(params, psdWidth, psdHeight);
  if (artCanvas) {
    psd.children!.push({
      name: 'Art',
      canvas: artCanvas,
      left: 0,
      top: 0,
      right: psdWidth,
      bottom: psdHeight,
      blendMode: 'normal',
      opacity: 1,
    });
  }

  // Process frame layers (async to ensure all images are loaded)
  const { frameLayers, ptLayers, crownLayers, eraseMasks } = await processFrameLayers(
    params,
    psdWidth,
    psdHeight
  );

  // Apply erase masks to all layers
  const allFrameLayers = [...frameLayers, ...ptLayers, ...crownLayers];
  applyEraseMasksToLayers(allFrameLayers, eraseMasks, psdWidth, psdHeight);

  // ============================================================================
  // Create special card type layers
  // ============================================================================
  const planeswalkerLayers = createPlaneswalkerLayers(params, psdWidth, psdHeight);
  const sagaLayers = createSagaLayers(params, psdWidth, psdHeight);
  const stationLayers = createStationLayers(params, psdWidth, psdHeight);
  const classLayers = createClassLayers(params, psdWidth, psdHeight);
  const dungeonLayers = createDungeonLayers(params, psdWidth, psdHeight);

  // Collect special text layers for text group (added before regular text)
  const specialTextLayers: Layer[] = [
    ...sagaLayers.textLayers,
    ...planeswalkerLayers.textLayers,
    ...stationLayers.textLayers,
  ];

  // Create frame group
  const frameGroup: Layer = {
    name: 'Frame',
    children: [],
    opened: false,
  };

  // Add planeswalker pre-frame first (background effects)
  if (planeswalkerLayers.preFrameLayer) {
    frameGroup.children!.push(planeswalkerLayers.preFrameLayer);
  }

  // Add station pre layer
  if (stationLayers.preLayer) {
    frameGroup.children!.push(stationLayers.preLayer);
  }

  // Add regular frame layers
  frameLayers.forEach((layer) => {
    addLayerWithOverlays(layer, frameGroup.children!, psdWidth, psdHeight, card);
  });

  // Add station squares after frame layers
  stationLayers.squareLayers.forEach((layer) => {
    frameGroup.children!.push(layer);
  });

  // Add PT layers group (including station PT)
  const hasPTLayers = ptLayers.length > 0 || stationLayers.ptGroup;
  if (hasPTLayers) {
    const ptChildren: Layer[] = [];
    ptLayers.forEach((layer) => {
      addLayerWithOverlays(layer, ptChildren, psdWidth, psdHeight, card);
    });
    // Add station PT children
    if (stationLayers.ptGroup?.children) {
      ptChildren.push(...stationLayers.ptGroup.children);
    }
    frameGroup.children!.push({
      name: 'Power/Toughness Box',
      children: ptChildren,
      opened: false,
    });
  }

  // Add station badges group
  if (stationLayers.badgesGroup) {
    frameGroup.children!.push(stationLayers.badgesGroup);
  }

  // Add planeswalker loyalty badges group
  if (planeswalkerLayers.badgesGroup) {
    frameGroup.children!.push(planeswalkerLayers.badgesGroup);
  }

  // Add saga chapters group
  if (sagaLayers.chaptersGroup) {
    frameGroup.children!.push(sagaLayers.chaptersGroup);
  }

  // Add saga canvas layer (fallback if no individual chapter layers)
  if (sagaLayers.sagaCanvasLayer && !sagaLayers.chaptersGroup) {
    frameGroup.children!.push(sagaLayers.sagaCanvasLayer);
  }

  // Add class headers group or canvas layer
  if (classLayers.headersGroup) {
    frameGroup.children!.push(classLayers.headersGroup);
  } else if (classLayers.classCanvasLayer) {
    frameGroup.children!.push(classLayers.classCanvasLayer);
  }

  // Add dungeon layers
  if (dungeonLayers.dungeonLayer) {
    frameGroup.children!.push(dungeonLayers.dungeonLayer);
  }
  if (dungeonLayers.dungeonFXLayer) {
    frameGroup.children!.push(dungeonLayers.dungeonFXLayer);
  }

  // Add Crown layers group
  if (crownLayers.length > 0) {
    const crownChildren: Layer[] = [];
    crownLayers.forEach((layer) => {
      addLayerWithOverlays(layer, crownChildren, psdWidth, psdHeight, card);
    });
    frameGroup.children!.push({
      name: 'Crowns',
      children: crownChildren,
      opened: false,
    });
  }

  // Add planeswalker post-frame (foreground effects)
  if (planeswalkerLayers.postFrameLayer) {
    frameGroup.children!.push(planeswalkerLayers.postFrameLayer);
  }

  // Add station post layer
  if (stationLayers.postLayer) {
    frameGroup.children!.push(stationLayers.postLayer);
  }

  // Add frame group if it has children
  if (frameGroup.children!.length > 0) {
    psd.children!.push(frameGroup);
  }

  // Add watermark layer
  const watermarkLayer = createWatermarkLayer(params, psdWidth, psdHeight);
  if (watermarkLayer) {
    psd.children!.push({
      name: 'Watermark',
      canvas: watermarkLayer.canvas,
      left: 0,
      top: 0,
      right: psdWidth,
      bottom: psdHeight,
      blendMode: 'normal',
      opacity: watermarkLayer.opacity,
    });
  }

  // Create text group
  const textGroup: Layer = {
    name: 'Text',
    children: [],
    opened: false,
  };

  const staticTextLayers: Layer[] = [];
  const editableTextLayers: Layer[] = [];

  // Create a combined text canvas for flavor bar detection
  const combinedTextCanvas = document.createElement('canvas');
  combinedTextCanvas.width = psdWidth;
  combinedTextCanvas.height = psdHeight;
  const combinedTextCtx = combinedTextCanvas.getContext('2d')!;

  // Process text fields
  if (card.text) {
    for (const [key, textObject] of Object.entries(card.text)) {
      if (!textObject.text || !textObject.text.trim()) continue;

      // Create raster text layer (with mana symbols)
      const textFieldCanvas = document.createElement('canvas');
      textFieldCanvas.width = psdWidth;
      textFieldCanvas.height = psdHeight;
      const textFieldCtx = textFieldCanvas.getContext('2d')!;

      // Render text (if render function provided)
      if (params.renderTextToCanvas) {
        await params.renderTextToCanvas(textObject, textFieldCtx, card, loadedPack, key, psdWidth, psdHeight);
      }

      // Add to combined canvas for flavor bar detection
      combinedTextCtx.drawImage(textFieldCanvas, 0, 0);

      staticTextLayers.push({
        name: textObject.name || key,
        canvas: textFieldCanvas,
      });

      // Create editable text layer
      const editableLayer = createEditableTextLayer(textObject, key, card, psdWidth, psdHeight);
      if (editableLayer) {
        editableTextLayers.push(editableLayer);
      }
    }
  }

  // Create flavor divider layer if applicable
  const flavorDividerLayer = createFlavorDividerLayer(params, combinedTextCanvas, psdWidth, psdHeight);

  // Add static text group (special text layers first, then regular text)
  const allStaticTextLayers = [...specialTextLayers, ...staticTextLayers];
  if (allStaticTextLayers.length > 0) {
    textGroup.children!.push({
      name: 'Static Text Layers',
      children: allStaticTextLayers,
      opened: true,
    });
  }

  // Add editable text group (hidden by default)
  if (editableTextLayers.length > 0) {
    textGroup.children!.push({
      name: 'Editable Text',
      children: editableTextLayers,
      opened: false,
      hidden: true,
    });
  }

  // Add flavor divider layer to text group if present
  if (flavorDividerLayer) {
    textGroup.children!.push(flavorDividerLayer);
  }

  // Add text group if it has children
  if (textGroup.children!.length > 0) {
    psd.children!.push(textGroup);
  }

  // Add set symbol layer
  const setSymbolLayer = createSetSymbolLayer(params, psdWidth, psdHeight);
  if (setSymbolLayer) {
    psd.children!.push({
      name: setSymbolLayer.name,
      canvas: setSymbolLayer.canvas,
      left: 0,
      top: 0,
      right: psdWidth,
      bottom: psdHeight,
      blendMode: 'normal',
      opacity: 1,
    });
  }

  // Add collector info layer
  if (collectorInfoEnabled && canvasRefs.bottomInfo) {
    psd.children!.push({
      name: 'Collector Info',
      canvas: canvasRefs.bottomInfo,
      left: 0,
      top: 0,
      right: psdWidth,
      bottom: psdHeight,
      blendMode: 'normal',
      opacity: 1,
    });
  }

  // Write PSD file
  const buffer = writePsd(psd, {
    generateThumbnail: true,
    trimImageData: false,
    logMissingFeatures: false,
  });

  if (!buffer || buffer.byteLength === 0) {
    throw new Error('Failed to generate PSD file. The export buffer is empty.');
  }

  const endTime = performance.now();
  const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
  const fileSizeMB = (buffer.byteLength / (1024 * 1024)).toFixed(2);
  console.log(`PSD generation completed in ${timeTaken}s, file size: ${fileSizeMB}MB`);

  // Download file
  const blob = new Blob([buffer], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const downloadElement = document.createElement('a');

  // Get card name for filename
  const cardName = card.text?.title?.text?.replace(/[^a-zA-Z0-9 ]/g, '') || 'Card';
  downloadElement.download = `${cardName}.psd`;
  downloadElement.href = url;
  document.body.appendChild(downloadElement);
  downloadElement.click();
  downloadElement.remove();
  URL.revokeObjectURL(url);
}
