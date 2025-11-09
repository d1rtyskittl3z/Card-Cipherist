/**
 * Canvas Helper Utilities
 * Port from creator-23.js drawing functions
 */

import type { Card, Frame, CardBounds } from '../types/card.types';
import type { FramePackTemplate } from '../components/frames/packs/types';

/**
 * Calculate auto-fit art transformation to cover artBounds
 * Uses object-fit: cover behavior - scales to fill entire bounds, may crop
 */
export const calculateAutoFitArt = (
  artImage: HTMLImageElement,
  artBounds: CardBounds,
  card: Card
): { artX: number; artY: number; artZoom: number } => {
  // Convert normalized bounds to pixel coordinates
  const boundsX = scaleX(card, artBounds.x);
  const boundsY = scaleY(card, artBounds.y);
  const boundsWidth = scaleWidth(card, artBounds.width);
  const boundsHeight = scaleHeight(card, artBounds.height);

  // Calculate center of bounds in canvas coordinates
  const boundsCenterX = boundsX + boundsWidth / 2;
  const boundsCenterY = boundsY + boundsHeight / 2;

  // Calculate canvas center
  const canvasCenterX = card.width / 2;
  const canvasCenterY = card.height / 2;

  // Position offset to center art on bounds
  const artX = boundsCenterX - canvasCenterX;
  const artY = boundsCenterY - canvasCenterY;

  // Calculate zoom to cover bounds (object-fit: cover)
  const scaleX_ratio = boundsWidth / artImage.width;
  const scaleY_ratio = boundsHeight / artImage.height;
  const artZoom = Math.max(scaleX_ratio, scaleY_ratio);

  return { artX, artY, artZoom };
};

/**
 * Calculate auto-fit watermark transformation to fit watermarkBounds
 * Port from creator-23.js resetWatermark() function
 * Uses object-fit: contain behavior - scales to fit within bounds, centered
 */
export const calculateAutoFitWatermark = (
  watermarkImage: HTMLImageElement,
  watermarkBounds: CardBounds,
  card: Card
): { watermarkX: number; watermarkY: number; watermarkZoom: number } => {
  // Convert normalized bounds to pixel coordinates
  const boundsWidth = scaleWidth(card, watermarkBounds.width);
  const boundsHeight = scaleHeight(card, watermarkBounds.height);

  // Calculate zoom to fit within bounds (object-fit: contain)
  // The zoom is calculated as: how much to scale the image to fit in the bounds
  let watermarkZoom: number;
  if (watermarkImage.width / watermarkImage.height > boundsWidth / boundsHeight) {
    // Image is wider than bounds - fit to width
    watermarkZoom = boundsWidth / watermarkImage.width;
  } else {
    // Image is taller than bounds - fit to height
    watermarkZoom = boundsHeight / watermarkImage.height;
  }

  // Convert center position from normalized to pixel offset from canvas center
  // watermarkBounds.x/y are in normalized coords (0-1), representing the center position
  // We need to convert to pixel offsets from the canvas center
  const targetCenterX = watermarkBounds.x * card.width;
  const targetCenterY = watermarkBounds.y * card.height;
  const canvasCenterX = card.width / 2;
  const canvasCenterY = card.height / 2;
  
  const watermarkX = targetCenterX - canvasCenterX;
  const watermarkY = targetCenterY - canvasCenterY;

  return { watermarkX, watermarkY, watermarkZoom };
};

/**
 * Scaling functions based on card dimensions
 */
export const scaleX = (card: Card, input: number): number => {
  return Math.round((input + card.marginX) * card.width);
};

export const scaleWidth = (card: Card, input: number): number => {
  return Math.round(input * card.width);
};

export const scaleY = (card: Card, input: number): number => {
  return Math.round((input + card.marginY) * card.height);
};

export const scaleHeight = (card: Card, input: number): number => {
  return Math.round(input * card.height);
};

/**
 * Initialize a canvas with proper dimensions
 */
export const initializeCanvas = (
  width: number,
  height: number
): { canvas: HTMLCanvasElement; context: CanvasRenderingContext2D } => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not get 2D context');
  return { canvas, context };
};

/**
 * Apply HSL color adjustments to canvas
 * Port from creator-23.js hsl() function
 */
export const applyHSL = (
  canvas: HTMLCanvasElement,
  hue: number = 0,
  saturation: number = 0,
  lightness: number = 0
): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i] / 255;
    const g = pixels[i + 1] / 255;
    const b = pixels[i + 2] / 255;

    // Convert RGB to HSL
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    // Apply adjustments
    h = (h + hue / 360) % 1;
    s = Math.max(0, Math.min(1, s + saturation / 100));
    const newL = Math.max(0, Math.min(1, l + lightness / 100));

    // Convert back to RGB
    let newR: number, newG: number, newB: number;

    if (s === 0) {
      newR = newG = newB = newL;
    } else {
      const hue2rgb = (p: number, q: number, t: number): number => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = newL < 0.5 ? newL * (1 + s) : newL + s - newL * s;
      const p = 2 * newL - q;

      newR = hue2rgb(p, q, h + 1 / 3);
      newG = hue2rgb(p, q, h);
      newB = hue2rgb(p, q, h - 1 / 3);
    }

    pixels[i] = newR * 255;
    pixels[i + 1] = newG * 255;
    pixels[i + 2] = newB * 255;
  }

  ctx.putImageData(imageData, 0, 0);
};

/**
 * Draw frame layers with masking
 * Port from creator-23.js drawFrames() function
 */
export const drawFrameLayers = (
  frameContext: CanvasRenderingContext2D,
  frameMaskingCanvas: HTMLCanvasElement,
  frameMaskingContext: CanvasRenderingContext2D,
  frameCompositingCanvas: HTMLCanvasElement,
  frameCompositingContext: CanvasRenderingContext2D,
  frames: Frame[],
  card: Card,
  blackImage: HTMLImageElement
): void => {
  // Always clear the canvas before drawing
  frameContext.clearRect(0, 0, frameContext.canvas.width, frameContext.canvas.height);

  // Return early if no frames to draw (after clearing)
  if (frames.length === 0) {
    return;
  }

  // Draw frames in order (first frame in list = bottom layer, last frame = top layer)
  frames.forEach((frame) => {
    if (!frame.image || !(frame.image instanceof HTMLImageElement)) return;
    // Skip hidden frames
    if (frame.visible === false) return;

    // Reset masking context state for each frame to avoid leaking blend modes
    frameMaskingContext.globalCompositeOperation = 'source-over';
    frameMaskingContext.globalAlpha = 1;

    // Set composite mode and opacity
    frameContext.globalCompositeOperation = frame.mode || 'source-over';
    frameContext.globalAlpha = frame.opacity === 0 ? 0 : (frame.opacity || 100) / 100;

    const bounds = frame.bounds || { x: 0, y: 0, width: 1, height: 1 };

    // Apply position offsets (x, y) relative to original position
    const finalX = (bounds.x || 0) + (frame.x || 0);
    const finalY = (bounds.y || 0) + (frame.y || 0);

    // Apply custom width/height if set, otherwise use bounds
    const finalWidth = frame.width ?? bounds.width ?? 1;
    const finalHeight = frame.height ?? bounds.height ?? 1;

    // If frame has no explicit bounds and margins exist, adjust to account for margins
    // Frames without bounds should fill the card area, not get offset by margins
    let frameX, frameY, frameWidth, frameHeight;
    if (!frame.bounds && (card.marginX > 0 || card.marginY > 0)) {
      // Draw at the margin-adjusted position to fill the card area
      frameX = Math.round(card.marginX * card.width);
      frameY = Math.round(card.marginY * card.height);
      frameWidth = Math.round(card.width);
      frameHeight = Math.round(card.height);
      // console.log(`Frame ${idx} (${frame.name}): NO BOUNDS, using margin offset (${frameX}, ${frameY}, ${frameWidth}x${frameHeight})`);
    } else {
      // Use normal scaling for frames with explicit bounds
      frameX = scaleX(card, finalX);
      frameY = scaleY(card, finalY);
      frameWidth = scaleWidth(card, finalWidth);
      frameHeight = scaleHeight(card, finalHeight);
      // console.log(`Frame ${idx} (${frame.name}): Has bounds, at (${frameX}, ${frameY}, ${frameWidth}x${frameHeight})`);
    }

    // Check if we should apply masking (skip if "No Mask" is selected)
    const shouldApplyMask = frame.masks &&
                           frame.masks.length > 0 &&
                           frame.masks.some(m => m.name !== 'No Mask');

    if (shouldApplyMask) {
      // Create mask - clear first to ensure clean state
      frameMaskingContext.clearRect(0, 0, frameMaskingCanvas.width, frameMaskingCanvas.height);
      frameMaskingContext.globalCompositeOperation = 'source-over';
      frameMaskingContext.drawImage(blackImage, 0, 0, frameMaskingCanvas.width, frameMaskingCanvas.height);
      frameMaskingContext.globalCompositeOperation = 'source-in';

      // Apply masks (skip "No Mask")
      frame.masks.forEach((mask) => {
        if (mask.name !== 'No Mask' && mask.image && mask.image instanceof HTMLImageElement) {
          // Use mask's ogBounds if available (for margin masks with their own positioning)
          // Otherwise fall back to frame's ogBounds or bounds
          const maskOgBounds = mask.ogBounds || frame.ogBounds || bounds;
          const maskBounds = mask.bounds || bounds;

          // Position mask using its own bounds (margin masks) or relative to frame
          frameMaskingContext.drawImage(
            mask.image,
            scaleX(card, (maskBounds.x || 0) - (maskOgBounds.x || 0) - ((maskOgBounds.x || 0) * ((maskBounds.width || 1) / (maskOgBounds.width || 1) - 1))),
            scaleY(card, (maskBounds.y || 0) - (maskOgBounds.y || 0) - ((maskOgBounds.y || 0) * ((maskBounds.height || 1) / (maskOgBounds.height || 1) - 1))),
            scaleWidth(card, (maskBounds.width || 1) / (maskOgBounds.width || 1)),
            scaleHeight(card, (maskBounds.height || 1) / (maskOgBounds.height || 1))
          );
        }
      });
    }

    if (frame.preserveAlpha) {
      // Preserve alpha blending mode
      frameCompositingContext.clearRect(0, 0, frameCompositingCanvas.width, frameCompositingCanvas.height);
      frameCompositingContext.drawImage(frame.image, frameX, frameY, frameWidth, frameHeight);

      const existingData = frameContext.getImageData(0, 0, frameContext.canvas.width, frameContext.canvas.height);
      const existingPixels = existingData.data;
      const newPixels = frameCompositingContext.getImageData(0, 0, frameCompositingCanvas.width, frameCompositingCanvas.height).data;
      const maskPixels = frameMaskingContext.getImageData(0, 0, frameMaskingCanvas.width, frameMaskingCanvas.height).data;

      const functionalAlphaMultiplier = frameContext.globalAlpha / 255;

      for (let i = 0; i < existingPixels.length; i += 4) {
        const functionalAlpha = maskPixels[i + 3] * functionalAlphaMultiplier;
        if (newPixels[i + 3] > 0) {
          existingPixels[i] = existingPixels[i] * (1 - functionalAlpha) + newPixels[i] * functionalAlpha;
          existingPixels[i + 1] = existingPixels[i + 1] * (1 - functionalAlpha) + newPixels[i + 1] * functionalAlpha;
          existingPixels[i + 2] = existingPixels[i + 2] * (1 - functionalAlpha) + newPixels[i + 2] * functionalAlpha;
        }
      }

      frameContext.putImageData(existingData, 0, 0);
    } else if (!shouldApplyMask) {
      // No mask - draw to masking canvas for effects, then to frameContext
      frameMaskingContext.clearRect(0, 0, frameMaskingCanvas.width, frameMaskingCanvas.height);
      frameMaskingContext.drawImage(frame.image, frameX, frameY, frameWidth, frameHeight);

      // Color overlay
      if (frame.colorOverlayCheck && frame.colorOverlay) {
        frameMaskingContext.globalCompositeOperation = 'source-atop';
        frameMaskingContext.fillStyle = frame.colorOverlay;
        frameMaskingContext.fillRect(0, 0, frameMaskingCanvas.width, frameMaskingCanvas.height);
        frameMaskingContext.globalCompositeOperation = 'source-over';
      }

      // HSL adjustments
      if (frame.hslHue || frame.hslSaturation || frame.hslLightness) {
        applyHSL(frameMaskingCanvas, frame.hslHue || 0, frame.hslSaturation || 0, frame.hslLightness || 0);
      }

      // Erase mode
      if (frame.erase) {
        frameContext.globalCompositeOperation = 'destination-out';
      }

      frameContext.drawImage(frameMaskingCanvas, 0, 0, frameContext.canvas.width, frameContext.canvas.height);
    } else {
      // Standard blending with mask
      frameMaskingContext.drawImage(frame.image, frameX, frameY, frameWidth, frameHeight);

      // Color overlay
      if (frame.colorOverlayCheck && frame.colorOverlay) {
        frameMaskingContext.globalCompositeOperation = 'source-in';
        frameMaskingContext.fillStyle = frame.colorOverlay;
        frameMaskingContext.fillRect(0, 0, frameMaskingCanvas.width, frameMaskingCanvas.height);
      }

      // HSL adjustments
      if (frame.hslHue || frame.hslSaturation || frame.hslLightness) {
        applyHSL(frameMaskingCanvas, frame.hslHue || 0, frame.hslSaturation || 0, frame.hslLightness || 0);
      }

      // Erase mode
      if (frame.erase) {
        frameContext.globalCompositeOperation = 'destination-out';
      }

      frameContext.drawImage(frameMaskingCanvas, 0, 0, frameContext.canvas.width, frameContext.canvas.height);
    }

    // Ensure masking context is ready for the next frame
    frameMaskingContext.globalCompositeOperation = 'source-over';
    frameMaskingContext.globalAlpha = 1;

    // All debug logging removed after verification
  });

  // Reset composite operations
  frameContext.globalCompositeOperation = 'source-over';
  frameContext.globalAlpha = 1;
};

/**
 * Load an image with crossOrigin support
 */
export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Get card name for exports
 */
export const getCardName = (card: Card): string => {
  if (!card.text?.title) return 'unnamed';
  let imageName = card.text.title.text || 'unnamed';
  if (card.text.nickname) {
    imageName += ` (${card.text.nickname.text})`;
  }
  return imageName.replace(/\{[^}]+\}/g, '');
};

/**
 * Mana symbol configuration
 * Maps symbol names to their size multipliers [width, height]
 */
interface ManaSymbolConfig {
  name: string;
  width: number;
  height: number;
  matchColor: boolean;
}

const MANA_SYMBOL_CONFIGS: Record<string, ManaSymbolConfig> = {};

// Initialize mana symbol configurations
const initManaConfigs = () => {
  const addConfigs = (names: string[], width: number, height: number, matchColor: boolean = false) => {
    names.forEach(name => {
      MANA_SYMBOL_CONFIGS[name] = { name, width, height, matchColor };
    });
  };

  // Standard symbols [1, 1]
  addConfigs(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
              'w', 'u', 'b', 'r', 'g', 'c', 'x', 'y', 'z', 't', 'untap', 's', 'oldtap', 'originaltap', 'purple', 'inf', 'alchemy'], 1, 1);

  // Energy/acorn/ticket [1, 1] with matchColor
  addConfigs(['e', 'a', 'p'], 1, 1, true);

  // Hybrid and phyrexian [1.2, 1.2]
  addConfigs(['wu', 'wb', 'ub', 'ur', 'br', 'bg', 'rg', 'rw', 'gw', 'gu', '2w', '2u', '2b', '2r', '2g', 'wp', 'up', 'bp', 'rp', 'gp', 'h',
              'wup', 'wbp', 'ubp', 'urp', 'brp', 'bgp', 'rgp', 'rwp', 'gwp', 'gup', 'purplew', 'purpleu', 'purpleb', 'purpler', 'purpleg',
              '2purple', 'purplep', 'cw', 'cu', 'cb', 'cr', 'cg'], 1.2, 1.2);

  // Bars [1, 1]
  addConfigs(['bar', 'whitebar'], 1, 1);

  // Triple hybrid [1.2, 1.2]
  addConfigs(['xxbgw', 'xxbrg', 'xxgub', 'xxgwu', 'xxrgw', 'xxrwu', 'xxubr', 'xxurg', 'xxwbr', 'xxwub'], 1.2, 1.2);

  // Chaos [1.2, 1] with matchColor
  addConfigs(['chaos'], 1.2, 1, true);

  // TK [0.8, 1] with matchColor
  addConfigs(['tk'], 0.8, 1, true);

  // Planeswalker [0.6, 1.2] with matchColor
  addConfigs(['planeswalker'], 0.6, 1.2, true);

  // Loyalty [1.6, 1] with matchColor
  addConfigs(['+1', '+2', '+3', '+4', '+5', '+6', '+7', '+8', '+9', '-1', '-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9', '+0'], 1.6, 1, true);

  // M21 Dark mana symbols (dm21 prefix) [1, 1]
  // These load from /img/manaSymbols/m21/dark/
  addConfigs(['dm21w', 'dm21u', 'dm21b', 'dm21r', 'dm21g', 
              'dm210', 'dm211', 'dm212', 'dm213', 'dm214', 'dm215', 'dm216', 'dm217', 'dm218', 'dm219', 
              'dm21x'], 1, 1);
};

// Initialize on first import
initManaConfigs();

/**
 * Load a mana symbol image
 */
const loadManaSymbol = async (symbolName: string, manaPrefix?: string): Promise<HTMLImageElement> => {
  const img = document.createElement('img');
  img.crossOrigin = 'anonymous';

  // Strip any existing extension from symbolName
  const cleanSymbol = symbolName.replace(/\.(svg|png)$/i, '');

  // Try paths in order: prefixed .svg, prefixed .png, default .svg, default .png
  const paths: string[] = [];
  
  // Special case: dm21 prefix loads from m21/dark subdirectory (PNG files)
  if (cleanSymbol.startsWith('dm21')) {
    paths.push(`/img/manaSymbols/m21/dark/${cleanSymbol}.png`);
    paths.push(`/img/manaSymbols/m21/dark/${cleanSymbol}.svg`);
  } else if (manaPrefix) {
    paths.push(`/img/manaSymbols/${manaPrefix}/${manaPrefix}${cleanSymbol}.svg`);
    paths.push(`/img/manaSymbols/${manaPrefix}/${manaPrefix}${cleanSymbol}.png`);
  }
  
  paths.push(`/img/manaSymbols/${cleanSymbol}.svg`);
  paths.push(`/img/manaSymbols/${cleanSymbol}.png`);

  // Try each path in sequence
  for (const path of paths) {
    img.src = path;
    try {
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject();
      });
      return img; // Success - return loaded image
    } catch {
      // Try next path
      continue;
    }
  }

  // All paths failed
  console.warn(`Failed to load mana symbol: ${symbolName}${manaPrefix ? ` with prefix: ${manaPrefix}` : ''}`);
  throw new Error(`Failed to load mana symbol: ${symbolName}`);
};

/**
 * Parse text into segments (text and mana symbols)
 */
interface TextSegment {
  type: 'text' | 'mana';
  content: string;
}

const parseTextSegments = (text: string): TextSegment[] => {
  const segments: TextSegment[] = [];
  const regex = /\{([^}]+)\}/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the mana symbol
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        content: text.substring(lastIndex, match.index),
      });
    }

    // Add mana symbol
    segments.push({
      type: 'mana',
      content: match[1].toLowerCase(), // Mana symbol name
    });

    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({
      type: 'text',
      content: text.substring(lastIndex),
    });
  }

  return segments;
};

/**
 * Measure width of text with inline mana symbols
 */
const measureTextWithMana = async (
  context: CanvasRenderingContext2D,
  text: string,
  fontSize: number,
  manaSpacing: number = 0
): Promise<number> => {
  const segments = parseTextSegments(text);
  let totalWidth = 0;

  // Base spacing between symbols (4% of font size, matching original)
  const baseSpacing = fontSize * 0.04;

  for (const segment of segments) {
    if (segment.type === 'text') {
      totalWidth += context.measureText(segment.content).width;
    } else {
      // Mana symbol - scaled to 0.78 of fontSize
      const config = MANA_SYMBOL_CONFIGS[segment.content];
      if (config) {
        const symbolWidth = fontSize * config.width * 0.78;
        const spacing = baseSpacing + manaSpacing;
        totalWidth += symbolWidth + spacing;
      }
    }
  }

  return totalWidth;
};

/**
 * Wrap text to fit within a given width (considers mana symbols)
 */
const wrapText = async (
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  fontSize: number,
  manaSpacing: number = 0
): Promise<string[]> => {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const lineWidth = await measureTextWithMana(context, testLine, fontSize, manaSpacing);

    if (lineWidth > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
};

/**
 * Calculate optimal font size to fit text within bounds
 */
const calculateOptimalFontSize = async (
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxHeight: number,
  baseFontSize: number,
  fontFamily: string,
  lineHeightMultiplier: number = 1.2,
  manaSpacing: number = 0
): Promise<number> => {
  let fontSize = baseFontSize;
  let fits = false;
  const minFontSize = baseFontSize * 0.3; // Don't shrink below 30% of original

  while (fontSize >= minFontSize && !fits) {
    context.font = `${fontSize}px ${fontFamily}`;
    const lineHeight = fontSize * lineHeightMultiplier;

    // Split text by explicit line breaks first
    const paragraphs = text.split('\n');
    let allLines: string[] = [];

    // Wrap each paragraph
    for (const paragraph of paragraphs) {
      if (paragraph.trim()) {
        const wrapped = await wrapText(context, paragraph, maxWidth, fontSize, manaSpacing);
        allLines = allLines.concat(wrapped);
      } else {
        allLines.push(''); // Preserve empty lines
      }
    }

    const totalHeight = allLines.length * lineHeight;

    if (totalHeight <= maxHeight) {
      fits = true;
    } else {
      fontSize -= 1; // Reduce font size incrementally
    }
  }

  return fontSize;
};

/**
 * Draw text line with inline mana symbols
 */
const drawTextWithMana = async (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  align: 'left' | 'center' | 'right' = 'left',
  manaSpacing: number = 0,
  manaSymbolCache: Map<string, HTMLImageElement>,
  shadowX: number = 0,
  shadowY: number = 0,
  cardWidth: number = 0,
  cardHeight: number = 0,
  outlineWidth: number = 0,
  outlineColor?: string,
  textColor?: string,
  manaPrefix?: string
): Promise<number> => {
  const segments = parseTextSegments(text);

  // Base spacing between symbols (4% of font size, matching original)
  const baseSpacing = fontSize * 0.045;
  const spacing = baseSpacing + manaSpacing;

  // Calculate total width for alignment
  const totalWidth = await measureTextWithMana(context, text, fontSize, manaSpacing);

  // Count mana symbols for right padding
  const manaCount = segments.filter(s => s.type === 'mana').length;
  const rightPadding = (align === 'right' && manaCount > 0) ? fontSize * 0.05 : 0;

  // Adjust starting X based on alignment
  let currentX = x;
  if (align === 'center') {
    currentX = x - totalWidth / 2;
  } else if (align === 'right') {
    currentX = x - totalWidth - rightPadding;
  }

  // Determine outline color (auto-opposite if not specified)
  let finalOutlineColor = outlineColor;
  if (outlineWidth > 0 && !outlineColor && textColor) {
    // Auto-opposite: if text is closer to black, use white outline; otherwise use black
    finalOutlineColor = textColor.toLowerCase() === 'black' ? 'white' : 'black';
  }

  // Draw each segment
  for (const segment of segments) {
    if (segment.type === 'text') {
      // Draw outline if specified
      if (outlineWidth > 0 && finalOutlineColor) {
        context.strokeStyle = finalOutlineColor;
        context.lineWidth = outlineWidth;
        context.strokeText(segment.content, currentX, y);
      }
      // Draw main text
      context.fillText(segment.content, currentX, y);
      currentX += context.measureText(segment.content).width;
    } else {
      // Mana symbol
      const config = MANA_SYMBOL_CONFIGS[segment.content];
      if (config) {
        // Load symbol if not cached
        if (!manaSymbolCache.has(segment.content)) {
          try {
            const img = await loadManaSymbol(segment.content, manaPrefix);
            manaSymbolCache.set(segment.content, img);
          } catch (error) {
            // Symbol failed to load, skip it
            continue;
          }
        }

        const img = manaSymbolCache.get(segment.content);
        if (img) {
          // Scale mana symbols to 0.78 of fontSize to match original rendering
          const symbolWidth = fontSize * config.width * 0.78;
          const symbolHeight = fontSize * config.height * 0.78;

          // Vertical positioning matching original: textSize * 0.34 - symbolHeight / 2
          let symbolY = y;
          if (context.textBaseline === 'top') {
            // Original formula: position at 34% of font size, centered on symbol
            symbolY = y + fontSize * 0.34 - symbolHeight / 2;
          } else if (context.textBaseline === 'middle') {
            // For middle baseline, offset upward slightly
            symbolY = y - symbolHeight / 2 - fontSize * 0.04;
          }

          // Draw shadow if shadowX or shadowY are defined
          if (shadowX !== 0 || shadowY !== 0) {
            const scaledShadowX = shadowX * cardWidth;
            const scaledShadowY = shadowY * cardHeight;

            // Save context state
            context.save();

            // Create black shadow by drawing to offscreen canvas with color overlay
            const shadowCanvas = document.createElement('canvas');
            shadowCanvas.width = symbolWidth;
            shadowCanvas.height = symbolHeight;
            const shadowCtx = shadowCanvas.getContext('2d');

            if (shadowCtx) {
              // Draw symbol
              shadowCtx.drawImage(img, 0, 0, symbolWidth, symbolHeight);

              // Apply black color overlay
              shadowCtx.globalCompositeOperation = 'source-in';
              shadowCtx.fillStyle = 'black';
              shadowCtx.fillRect(0, 0, symbolWidth, symbolHeight);

              // Draw black shadow with opacity
              context.globalAlpha = 1.0;
              context.drawImage(
                shadowCanvas,
                currentX + scaledShadowX,
                symbolY + scaledShadowY
              );
            }

            // Restore context state
            context.restore();
          }

          // Draw main symbol
          context.drawImage(img, currentX, symbolY, symbolWidth, symbolHeight);
          currentX += symbolWidth + spacing;
        }
      }
    }
  }

  return totalWidth;
};

/**
 * Draw mana symbols with custom placement (for manaPlacement property)
 * Used for manaCost fields with custom positioning
 */
const drawManaWithPlacement = async (
  context: CanvasRenderingContext2D,
  text: string,
  manaPlacement: { x: number[]; y: number[] },
  fontSize: number,
  manaSymbolCache: Map<string, HTMLImageElement>,
  cardWidth: number,
  cardHeight: number,
  shadowX: number = 0,
  shadowY: number = 0,
  manaPrefix?: string
): Promise<void> => {
  // Parse mana symbols from text
  const segments = parseTextSegments(text);
  const manaSymbols = segments.filter(s => s.type === 'mana');

  // Validate: max 6 symbols
  if (manaSymbols.length > 6) {
    console.warn(`Only 6 mana symbols are supported with manaPlacement. Found ${manaSymbols.length}, rendering first 6 only.`);
    // TODO: Show toast notification when toast system is available
    manaSymbols.splice(6); // Trim to 6
  }

  // Render each mana symbol at specified position
  for (let i = 0; i < manaSymbols.length && i < manaPlacement.x.length && i < manaPlacement.y.length; i++) {
    const segment = manaSymbols[i];
    const config = MANA_SYMBOL_CONFIGS[segment.content];
    if (!config) {
      console.warn(`[drawManaWithPlacement] No config found for symbol "${segment.content}"`);
      continue;
    }

    // Load symbol if not cached
    if (!manaSymbolCache.has(segment.content)) {
      try {
        const img = await loadManaSymbol(segment.content, manaPrefix);
        manaSymbolCache.set(segment.content, img);
      } catch (error) {
        continue; // Skip if failed to load
      }
    }

    const img = manaSymbolCache.get(segment.content);
    if (!img) continue;

    // Scale mana symbols to 0.78 of fontSize to match original rendering
    const symbolWidth = fontSize * config.width * 0.78;
    const symbolHeight = fontSize * config.height * 0.78;

    // Get absolute position from normalized coordinates
    const symbolX = manaPlacement.x[i] * cardWidth;
    const symbolY = manaPlacement.y[i] * cardHeight;

    // Draw shadow if shadowX or shadowY are defined
    if (shadowX !== 0 || shadowY !== 0) {
      const scaledShadowX = shadowX * cardWidth;
      const scaledShadowY = shadowY * cardHeight;

      // Create black shadow
      const shadowCanvas = document.createElement('canvas');
      shadowCanvas.width = symbolWidth;
      shadowCanvas.height = symbolHeight;
      const shadowCtx = shadowCanvas.getContext('2d');

      if (shadowCtx) {
        // Draw symbol
        shadowCtx.drawImage(img, 0, 0, symbolWidth, symbolHeight);

        // Apply black color overlay
        shadowCtx.globalCompositeOperation = 'source-in';
        shadowCtx.fillStyle = 'black';
        shadowCtx.fillRect(0, 0, symbolWidth, symbolHeight);

        // Draw black shadow
        context.globalAlpha = 1.0;
        context.drawImage(shadowCanvas, symbolX + scaledShadowX, symbolY + scaledShadowY, symbolWidth, symbolHeight);
      }
    }

    // Draw main symbol
    context.globalAlpha = 1.0;
    context.drawImage(img, symbolX, symbolY, symbolWidth, symbolHeight);
  }
};

/**
 * Draw text with basic formatting support
 * Supports: line breaks, italic <i>, bold <b>, word wrapping, auto-shrinking, inline mana symbols
 * Font defaults to 'mplantin' if not specified in config
 */
export const drawText = async (
  textCanvas: HTMLCanvasElement,
  textContext: CanvasRenderingContext2D,
  card: Card,
  loadedPack: FramePackTemplate | null
): Promise<void> => {
  // Clear text canvas
  textContext.clearRect(0, 0, textCanvas.width, textCanvas.height);

  if (!loadedPack || !card.text) return;

  const packText = loadedPack.text ?? {};

  // Create mana symbol cache
  const manaSymbolCache = new Map<string, HTMLImageElement>();

  // Iterate through all text objects
  for (const [key, textObj] of Object.entries(card.text)) {
    const textConfig = packText[key];
    if (!textConfig || !textObj.text) {
      continue;
    }

    // Get font from pack config or default to mplantin
    const fontFamily = textConfig.font || 'mplantin';
    const baseFontSize = scaleHeight(card, textConfig.size);
    const x = scaleX(card, textConfig.x || 0);
    const y = scaleY(card, textConfig.y || 0);
    const width = scaleWidth(card, textConfig.width || 0);
    const height = scaleHeight(card, textConfig.height || 0);
    const manaSpacing = textConfig.manaSpacing !== undefined ? textConfig.manaSpacing : 0;

    // Set default text properties
    textContext.fillStyle = textObj.color || 'black';
    textContext.textAlign = 'left'; // We'll handle alignment manually

    // Handle single line vs multi-line
    if (textConfig.oneLine) {
      // Check for manaPlacement (custom positioning for mana cost symbols)
      if (textConfig.manaPlacement && textConfig.manaCost) {
        await drawManaWithPlacement(
          textContext,
          textObj.text,
          textConfig.manaPlacement,
          baseFontSize,
          manaSymbolCache,
          card.width,
          card.height,
          textConfig.shadowX || 0,
          textConfig.shadowY || 0,
          textConfig.manaPrefix
        );
      } else {
        // Single line text with mana symbols - vertically centered
        textContext.font = `${baseFontSize}px ${fontFamily}`;
        textContext.textBaseline = 'middle';
        const textX = textConfig.align === 'center' ? x + width / 2 :
                      textConfig.align === 'right' ? x + width : x;
        const textY = y + height / 2;

        // Calculate outline width
        const outlineWidth = textConfig.outlineWidth ? scaleWidth(card, textConfig.outlineWidth) : 0;

        await drawTextWithMana(
          textContext,
          textObj.text,
          textX,
          textY,
          baseFontSize,
          textConfig.align || 'left',
          manaSpacing,
          manaSymbolCache,
          textConfig.shadowX || 0,
          textConfig.shadowY || 0,
          card.width,
          card.height,
          outlineWidth,
          textConfig.outlineColor,
          textObj.color,
          textConfig.manaPrefix
        );
      }
    } else {
      // Multi-line text with word wrapping and auto-shrinking
      const lineHeightMultiplier = 1.2;

      // Strip formatting tags for measurement (we'll apply them later)
      const plainText = textObj.text.replace(/<\/?[ib]>/g, '');

      // Calculate optimal font size
      const fontSize = await calculateOptimalFontSize(
        textContext,
        plainText,
        width,
        height,
        baseFontSize,
        fontFamily,
        lineHeightMultiplier,
        manaSpacing
      );

      const lineHeight = fontSize * lineHeightMultiplier;

      // Set font for measurement
      textContext.font = `${fontSize}px ${fontFamily}`;

      // Split text by explicit line breaks first
      const paragraphs = textObj.text.split('\n');
      let allLines: string[] = [];

      // Wrap each paragraph
      for (const paragraph of paragraphs) {
        if (paragraph.trim()) {
          // Strip tags for wrapping calculation
          const plainParagraph = paragraph.replace(/<\/?[ib]>/g, '');
          const wrappedLines = await wrapText(textContext, plainParagraph, width, fontSize, manaSpacing);
          allLines = allLines.concat(wrappedLines);
        } else {
          allLines.push(''); // Preserve empty lines
        }
      }

      // Calculate total text height and center vertically
      const totalTextHeight = allLines.length * lineHeight;
      let currentY = y + (height - totalTextHeight) / 2;
      textContext.textBaseline = 'top';

      // Draw each line
      for (const line of allLines) {
        if (currentY + lineHeight > y + height) break; // Stop if out of bounds

        // Basic formatting support
        let processedLine = line;
        let isItalic = false;
        let isBold = false;

        // Check for italic tags
        if (processedLine.includes('<i>') || processedLine.includes('</i>')) {
          processedLine = processedLine.replace(/<\/?i>/g, '');
          isItalic = true;
        }

        // Check for bold tags
        if (processedLine.includes('<b>') || processedLine.includes('</b>')) {
          processedLine = processedLine.replace(/<\/?b>/g, '');
          isBold = true;
        }

        // Set font with formatting
        const fontStyle = isItalic ? 'italic' : 'normal';
        const fontWeight = isBold ? 'bold' : 'normal';
        textContext.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;

        const textX = textConfig.align === 'center' ? x + width / 2 :
                      textConfig.align === 'right' ? x + width : x;

        // Calculate outline width
        const outlineWidth = textConfig.outlineWidth ? scaleWidth(card, textConfig.outlineWidth) : 0;

        await drawTextWithMana(
          textContext,
          processedLine,
          textX,
          currentY,
          fontSize,
          textConfig.align || 'left',
          manaSpacing,
          manaSymbolCache,
          textConfig.shadowX || 0,
          textConfig.shadowY || 0,
          card.width,
          card.height,
          outlineWidth,
          textConfig.outlineColor,
          textObj.color,
          textConfig.manaPrefix
        );

        currentY += lineHeight;
      }
    }
  }
};

/**
 * Draw guidelines layer
 * Shows textbox bounds, art bounds, watermark bounds, set symbol bounds, grid, and center lines
 * Port from creator-23.js drawNewGuidelines() function
 */
export const drawGuidelines = (
  guidelinesContext: CanvasRenderingContext2D,
  card: Card,
  loadedPack: FramePackTemplate | null
): void => {
  const canvas = guidelinesContext.canvas;

  // Clear
  guidelinesContext.clearRect(0, 0, canvas.width, canvas.height);

  if (!loadedPack) return;

  // Set opacity for bounds
  guidelinesContext.globalAlpha = 0.25;

  // Textboxes (blue)
  if (loadedPack.text) {
    guidelinesContext.fillStyle = 'blue';
    Object.entries(loadedPack.text).forEach(([, textBounds]) => {
      guidelinesContext.fillRect(
        scaleX(card, textBounds.x || 0),
        scaleY(card, textBounds.y || 0),
        scaleWidth(card, textBounds.width || 1),
        scaleHeight(card, textBounds.height || 1)
      );
    });
  }

  // Art bounds (green)
  if (loadedPack.artBounds) {
    guidelinesContext.fillStyle = 'green';
    guidelinesContext.fillRect(
      scaleX(card, loadedPack.artBounds.x),
      scaleY(card, loadedPack.artBounds.y),
      scaleWidth(card, loadedPack.artBounds.width),
      scaleHeight(card, loadedPack.artBounds.height)
    );
  }

  // Watermark bounds (yellow)
  if (loadedPack.watermarkBounds) {
    guidelinesContext.fillStyle = 'yellow';
    const watermarkWidth = scaleWidth(card, loadedPack.watermarkBounds.width);
    const watermarkHeight = scaleHeight(card, loadedPack.watermarkBounds.height);
    guidelinesContext.fillRect(
      scaleX(card, loadedPack.watermarkBounds.x) - watermarkWidth / 2,
      scaleY(card, loadedPack.watermarkBounds.y) - watermarkHeight / 2,
      watermarkWidth,
      watermarkHeight
    );
  }

  // Set symbol bounds (red)
  if (loadedPack.setSymbolBounds) {
    let setSymbolX = scaleX(card, loadedPack.setSymbolBounds.x);
    let setSymbolY = scaleY(card, loadedPack.setSymbolBounds.y);
    const setSymbolWidth = scaleWidth(card, loadedPack.setSymbolBounds.width);
    const setSymbolHeight = scaleHeight(card, loadedPack.setSymbolBounds.height);

    // Apply vertical alignment
    if (loadedPack.setSymbolBounds.vertical === 'center') {
      setSymbolY -= setSymbolHeight / 2;
    } else if (loadedPack.setSymbolBounds.vertical === 'bottom') {
      setSymbolY -= setSymbolHeight;
    }

    // Apply horizontal alignment
    if (loadedPack.setSymbolBounds.horizontal === 'center') {
      setSymbolX -= setSymbolWidth / 2;
    } else if (loadedPack.setSymbolBounds.horizontal === 'right') {
      setSymbolX -= setSymbolWidth;
    }

    guidelinesContext.fillStyle = 'red';
    guidelinesContext.fillRect(setSymbolX, setSymbolY, setSymbolWidth, setSymbolHeight);
  }

  // Grid (gray)
  guidelinesContext.globalAlpha = 1;
  guidelinesContext.beginPath();
  guidelinesContext.strokeStyle = 'gray';
  guidelinesContext.lineWidth = 1;
  const boxPadding = 25;

  for (let x = 0; x <= card.width; x += boxPadding) {
    guidelinesContext.moveTo(x, 0);
    guidelinesContext.lineTo(x, card.height);
  }
  for (let y = 0; y <= card.height; y += boxPadding) {
    guidelinesContext.moveTo(0, y);
    guidelinesContext.lineTo(card.width, y);
  }
  guidelinesContext.stroke();

  // Center lines (black)
  guidelinesContext.beginPath();
  guidelinesContext.strokeStyle = 'black';
  guidelinesContext.lineWidth = 3;
  guidelinesContext.moveTo(card.width / 2, 0);
  guidelinesContext.lineTo(card.width / 2, card.height);
  guidelinesContext.moveTo(0, card.height / 2);
  guidelinesContext.lineTo(card.width, card.height / 2);
  guidelinesContext.stroke();

  // Reset
  guidelinesContext.globalAlpha = 1;
};

/**
 * Draw bottom info (collector information) with formatting code support
 * Supports special formatting codes like {savex}, {loadx}, {fontsize}, {kerning}, etc.
 */
export const drawBottomInfo = async (
  bottomInfoCanvas: HTMLCanvasElement,
  bottomInfoContext: CanvasRenderingContext2D,
  card: Card
): Promise<void> => {
  // Clear bottom info canvas
  bottomInfoContext.clearRect(0, 0, bottomInfoCanvas.width, bottomInfoCanvas.height);

  if (!card.bottomInfo || !card.showCollectorInfo) return;

  // Ensure custom fonts are loaded before drawing to canvas (prevents fallback fonts)
  try {
    // These are commonly used in collector info lines
    const fontsToLoad = ['gothammedium', 'belerenbsc', 'belerenb'];
    const fontSet: FontFaceSet | undefined = (document as unknown as { fonts?: FontFaceSet }).fonts;
    if (fontSet && typeof fontSet.load === 'function') {
      await Promise.all(fontsToLoad.map((f) => fontSet.load(`16px ${f}`)));
      if (fontSet.ready) await fontSet.ready;
    }
  } catch (e) {
    // Non-fatal: if fonts API is unavailable, continue; canvas will use fallbacks
  }

  // Load artist brush symbol (reuse existing loadImage function)
  let artistBrushImage: HTMLImageElement | null = null;
  try {
    artistBrushImage = await loadImage('/img/manaSymbols/artistbrush.svg');
  } catch (error) {
    console.warn('Failed to load artist brush symbol, continuing without it:', error);
    // Continue rendering even if the artist brush fails to load
  }

  // Position save/load system
  let savedX: number | null = null;
  let savedX2: number | null = null;

  // Iterate through bottom info text objects
  for (const textObj of Object.values(card.bottomInfo)) {
    if (!textObj.text) continue;

    try {
      const text = textObj.text;
  const x = scaleX(card, textObj.x);
  const y = scaleY(card, textObj.y);
  let fontSize = scaleHeight(card, textObj.size);
  const baseFontSize = fontSize;
  let fontFamily = textObj.font || 'gothammedium';
  const chosenColor = card.bottomInfoColor || textObj.color || 'white';
  const outlineWidth = textObj.outlineWidth ? scaleWidth(card, textObj.outlineWidth) : 0;

    // Set initial text properties
  bottomInfoContext.fillStyle = chosenColor;
    bottomInfoContext.textBaseline = 'top';
    bottomInfoContext.textAlign = 'left';

    // Calculate starting X based on alignment
    const textWidth = scaleWidth(card, textObj.width || 0);
    let currentX = x;
    if (textObj.align === 'right') {
      currentX = x + textWidth;
    } else if (textObj.align === 'center') {
      currentX = x + textWidth / 2;
    }

    const currentY = y;
    let kerning = 0;
    let verticalOffset = 0;
    const textAlign = textObj.align || 'left';

    // Parse and render text with formatting codes
    const segments: Array<{ type: 'text' | 'artistbrush'; content: string; font?: string; size?: number }> = [];
    let currentText = '';
    let i = 0;

  while (i < text.length) {
      // Check for formatting codes
      if (text[i] === '{') {
        // Save any accumulated text, preserving current font/size at this point
        if (currentText) {
          segments.push({ type: 'text', content: currentText, font: fontFamily, size: fontSize });
          currentText = '';
        }

        // Find closing brace
        const closeIndex = text.indexOf('}', i);
        if (closeIndex !== -1) {
          const code = text.substring(i + 1, closeIndex);

          // Handle formatting codes
          if (code === 'savex') {
            savedX = currentX;
          } else if (code === 'savex2') {
            savedX2 = currentX;
          } else if (code === 'loadx' && savedX !== null) {
            currentX = savedX;
          } else if (code === 'loadx2' && savedX2 !== null) {
            currentX = savedX2;
          } else if (code.startsWith('fontsize')) {
            const sizeStr = code.substring(8);
            const parsedSize = parseInt(sizeStr, 10);
            if (!isNaN(parsedSize)) {
              fontSize = parsedSize;
            }
          } else if (code.startsWith('kerning')) {
            const kernStr = code.substring(7);
            const parsedKern = parseInt(kernStr, 10);
            if (!isNaN(parsedKern)) {
              kerning = parsedKern;
            }
          } else if (code.startsWith('upinline')) {
            const offsetStr = code.substring(8);
            const parsedOffset = parseInt(offsetStr, 10);
            if (!isNaN(parsedOffset)) {
              verticalOffset = -parsedOffset;
            }
          } else if (code.trim().toLowerCase().startsWith('font')) {
            // Font changes/scaling (case-insensitive)
            const codeLower = code.trim().toLowerCase();
            if (codeLower === 'fontbelerenbsc') {
              fontFamily = 'belerenbsc';
            } else if (codeLower === 'fontgothammedium') {
              fontFamily = 'gothammedium';
            } else if (codeLower === 'fontbelerenb') {
              fontFamily = 'belerenb';
            } else if (codeLower.startsWith('fontrel')) {
              // Relative scale e.g., {fontrel85} or {fontrel0.85}
              const factorStr = codeLower.substring('fontrel'.length);
              const val = parseFloat(factorStr);
              if (!isNaN(val)) {
                const factor = val > 2 ? val / 100 : val; // treat >2 as percent
                fontSize = Math.max(1, Math.round(baseFontSize * factor));
              }
            } else if (codeLower === 'fontbase') {
              // Restore to base font size for this text object
              fontSize = baseFontSize;
            }
          }

          i = closeIndex + 1;
          continue;
        }
      }

      // Check for special Unicode characters
      if (text.charCodeAt(i) === 0xFFEE) {
        // Artist brush symbol
        if (currentText) {
          // Preserve the font and size at the time this segment was accumulated
          segments.push({ type: 'text', content: currentText, font: fontFamily, size: fontSize });
          currentText = '';
        }
        segments.push({ type: 'artistbrush', content: '' });
        i++;
        continue;
      }

      // Regular character
      currentText += text[i];
      i++;
    }

    // Add remaining text
    if (currentText) {
      segments.push({ type: 'text', content: currentText, font: fontFamily, size: fontSize });
    }

    // For right-aligned text, measure total width first
    if (textAlign === 'right') {
      let totalWidth = 0;
      for (const segment of segments) {
        if (segment.type === 'text') {
          const segmentFont = segment.font || fontFamily;
          const segmentSize = segment.size || fontSize;
          bottomInfoContext.font = `${segmentSize}px ${segmentFont}`;
          totalWidth += bottomInfoContext.measureText(segment.content).width + kerning;
        } else if (segment.type === 'artistbrush' && artistBrushImage) {
          const targetHeight = baseFontSize * 0.7;
          const naturalW = artistBrushImage.naturalWidth || artistBrushImage.width || 1;
          const naturalH = artistBrushImage.naturalHeight || artistBrushImage.height || 1;
          const aspect = naturalW / naturalH;
          const symbolWidth = targetHeight * aspect;
          totalWidth += symbolWidth + 2;
        }
      }
      // Start from the right edge minus total width
      currentX = currentX - totalWidth;
    }

    // Render segments
    for (const segment of segments) {
      if (segment.type === 'text') {
        const textContent = segment.content;

        // Set font for this segment, honoring captured values if present
        const segmentFont = segment.font || fontFamily;
        const segmentSize = segment.size || fontSize;
        bottomInfoContext.font = `${segmentSize}px ${segmentFont}`;

        // Apply outline/stroke if specified
        if (outlineWidth > 0) {
          bottomInfoContext.strokeStyle = (chosenColor === 'black') ? 'white' : 'black';
          bottomInfoContext.lineWidth = outlineWidth;
          bottomInfoContext.strokeText(textContent, currentX, currentY + verticalOffset);
        }

  // Draw text with selected color
  bottomInfoContext.fillStyle = chosenColor;
  bottomInfoContext.fillText(textContent, currentX, currentY + verticalOffset);

        // Update X position with kerning
        const textWidth = bottomInfoContext.measureText(textContent).width;
        currentX += textWidth + kerning;
      } else if (segment.type === 'artistbrush') {
        // Draw artist brush symbol (only if it loaded successfully)
        if (artistBrushImage) {
          // Preserve original aspect ratio of the brush symbol
          const targetHeight = fontSize * 0.7;
          const naturalW = artistBrushImage.naturalWidth || artistBrushImage.width || 1;
          const naturalH = artistBrushImage.naturalHeight || artistBrushImage.height || 1;
          const aspect = naturalW / naturalH;
          const symbolWidth = targetHeight * aspect;
          const symbolHeight = targetHeight;
          const symbolY = currentY + verticalOffset + fontSize * 0.1;
          // If an outline is specified, draw a black outline behind the symbol
          if (outlineWidth > 0) {
            // Create a black-tinted version of the brush symbol
            const outlineCanvas = document.createElement('canvas');
            outlineCanvas.width = Math.ceil(symbolWidth);
            outlineCanvas.height = Math.ceil(symbolHeight);
            const outlineCtx = outlineCanvas.getContext('2d');
            if (outlineCtx) {
              outlineCtx.clearRect(0, 0, outlineCanvas.width, outlineCanvas.height);
              outlineCtx.drawImage(artistBrushImage, 0, 0, outlineCanvas.width, outlineCanvas.height);
              outlineCtx.globalCompositeOperation = 'source-in';
              outlineCtx.fillStyle = (chosenColor === 'black') ? 'white' : 'black';
              outlineCtx.fillRect(0, 0, outlineCanvas.width, outlineCanvas.height);

              // Draw around in multiple directions to simulate stroke
              const r = Math.max(1, Math.round(outlineWidth / 2));
              const offsets = [
                [-r, 0], [r, 0], [0, -r], [0, r],
                [-r, -r], [r, -r], [-r, r], [r, r],
              ];
              for (const [dx, dy] of offsets) {
                bottomInfoContext.drawImage(
                  outlineCanvas,
                  currentX + dx,
                  symbolY + dy
                );
              }
            }
          }

          // Draw main symbol on top; tint to black when chosenColor is black
          if (chosenColor === 'black') {
            const mainCanvas = document.createElement('canvas');
            mainCanvas.width = Math.ceil(symbolWidth);
            mainCanvas.height = Math.ceil(symbolHeight);
            const mainCtx = mainCanvas.getContext('2d');
            if (mainCtx) {
              mainCtx.drawImage(artistBrushImage, 0, 0, mainCanvas.width, mainCanvas.height);
              mainCtx.globalCompositeOperation = 'source-in';
              mainCtx.fillStyle = 'black';
              mainCtx.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
              bottomInfoContext.drawImage(mainCanvas, currentX, symbolY);
            }
          } else {
            bottomInfoContext.drawImage(
              artistBrushImage,
              currentX,
              symbolY,
              symbolWidth,
              symbolHeight
            );
          }
          currentX += symbolWidth + 2;
        }
      }
    }
    } catch (error) {
      console.error('drawBottomInfo: Error rendering', textObj.name, error);
    }
  }
};
