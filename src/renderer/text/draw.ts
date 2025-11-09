/**
 * Text Drawing Utilities
 * Renders computed layout to canvas
 */

import type {
  LayoutResult,
  // Line,
  // Glyph,
  TextGlyph,
  SymbolGlyph,
  TextCanvasRefs,
  FieldSpec,
  PackMetrics,
} from './types';
import { applyFontStyle } from './measure';

const CANVAS_MARGIN = 300;
const TEXT_FONT_HEIGHT_RATIO = 0.7;

/**
 * Draw layout result to target canvas
 */
export function drawLayout(
  targetCtx: CanvasRenderingContext2D,
  layout: LayoutResult,
  fieldSpec: FieldSpec,
  packMetrics: PackMetrics,
  tempCanvases: TextCanvasRefs,
  options: {
    ptShift?: [number, number];
    permaShift?: [number, number];
    rotation?: number;
    drawToPrePT?: boolean;
  } = {}
): void {
  const textX = packMetrics.scaleX(fieldSpec.x ?? 0);
  const textY = packMetrics.scaleY(fieldSpec.y);
  const textWidth = packMetrics.scaleWidth(fieldSpec.width);

  const paragraphCtx = tempCanvases.paragraph.getContext('2d')!;
  const lineCtx = tempCanvases.line.getContext('2d')!;

  // Clear temp canvases
  paragraphCtx.clearRect(0, 0, tempCanvases.paragraph.width, tempCanvases.paragraph.height);

  // Render each line
  for (const line of layout.lines) {
    lineCtx.clearRect(0, 0, tempCanvases.line.width, tempCanvases.line.height);

    // Calculate horizontal alignment offset
    let horizontalAdjust = 0;
    if (line.align === 'center') {
      horizontalAdjust = (textWidth - line.width) / 2;
    } else if (line.align === 'right') {
      // Add small padding from right edge (about 2% of text width)
      const rightPadding = textWidth * 0.005;
      horizontalAdjust = textWidth - line.width - rightPadding;
    }

    // Render glyphs to line canvas
    const symbolGlyphs: SymbolGlyph[] = [];

    for (const glyph of line.glyphs) {
      if (glyph.type === 'text') {
        drawTextGlyph(lineCtx, glyph as TextGlyph);
      } else if (glyph.type === 'symbol') {
        // Collect symbols for later rendering
        symbolGlyphs.push(glyph as SymbolGlyph);
      }
    }

    // Render symbols with special handling for outlines
    if (symbolGlyphs.length > 0) {
      renderManaSymbols(lineCtx, tempCanvases.line, symbolGlyphs);
    }

    // Composite line to paragraph canvas with alignment
    paragraphCtx.drawImage(
      tempCanvases.line,
      horizontalAdjust,
      line.y
    );
  }

  // Render absolute positioned symbols (e.g. manaPlacement) directly to paragraph canvas
  if (layout.absoluteSymbols && layout.absoluteSymbols.length > 0) {
    renderManaSymbols(paragraphCtx, tempCanvases.paragraph, layout.absoluteSymbols);
  }

  // Determine target context (main or prePT)
  const finalCtx = options.drawToPrePT ? tempCanvases.prePT.getContext('2d')! : targetCtx;

  // Apply transforms and draw to final target
  const ptShift = options.ptShift || [0, 0];
  const permaShift = options.permaShift || [0, 0];
  const rotation = options.rotation || 0;

  if (rotation) {
    finalCtx.save();
    const shapeX = textX + ptShift[0];
    const shapeY = textY + ptShift[1];
    finalCtx.translate(shapeX, shapeY);
    finalCtx.rotate((Math.PI * rotation) / 180);
    finalCtx.drawImage(
      tempCanvases.paragraph,
      permaShift[0] - CANVAS_MARGIN + layout.horizontalAdjust,
      layout.verticalAdjust - CANVAS_MARGIN + permaShift[1]
    );
    finalCtx.restore();
  } else {
    finalCtx.drawImage(
      tempCanvases.paragraph,
      textX - CANVAS_MARGIN + ptShift[0] + permaShift[0] + layout.horizontalAdjust,
      textY - CANVAS_MARGIN + layout.verticalAdjust + ptShift[1] + permaShift[1]
    );
  }
}

/**
 * Draw a text glyph to canvas
 */
function drawTextGlyph(ctx: CanvasRenderingContext2D, glyph: TextGlyph): void {
  applyFontStyle(ctx, glyph.style);

  const x = glyph.x + CANVAS_MARGIN;
  const y = CANVAS_MARGIN + glyph.style.size * TEXT_FONT_HEIGHT_RATIO + glyph.y;

  // Draw outline first (if enabled)
  if (glyph.style.outlineWidth >= 1) {
    ctx.strokeText(glyph.text, x, y);
  }

  // Draw fill
  ctx.fillText(glyph.text, x, y);
}

/**
 * Render mana symbols with outline support
 * Uses multi-pass rendering for outlines
 */
function renderManaSymbols(
  lineCtx: CanvasRenderingContext2D,
  lineCanvas: HTMLCanvasElement,
  symbols: SymbolGlyph[]
): void {
  // Detect Safari browser (SVG shadow workaround)
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  // Check if any symbols actually need outlines
  const hasAnyOutlines = symbols.some((s) => s.hasOutline);

  if (!hasAnyOutlines) {
    // Simple path: no outlines, just draw symbols
    for (const symbolData of symbols) {
      drawSymbolSimple(lineCtx, symbolData, isSafari);
    }
    return;
  }

  // Complex path: multi-pass rendering for outlines
  const outlineCanvas = lineCanvas.cloneNode() as HTMLCanvasElement;
  const outlineCtx = outlineCanvas.getContext('2d')!;

  const symbolCanvas = lineCanvas.cloneNode() as HTMLCanvasElement;
  const symbolCtx = symbolCanvas.getContext('2d')!;

  // Copy shadow settings
  symbolCtx.shadowColor = lineCtx.shadowColor;
  symbolCtx.shadowOffsetX = lineCtx.shadowOffsetX;
  symbolCtx.shadowOffsetY = lineCtx.shadowOffsetY;
  symbolCtx.shadowBlur = lineCtx.shadowBlur;

  // Save existing text content
  const tempCanvas = lineCanvas.cloneNode() as HTMLCanvasElement;
  const tempCtx = tempCanvas.getContext('2d')!;
  tempCtx.drawImage(lineCanvas, 0, 0);

  // Clear line canvas
  lineCtx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);

  // Pass 1: Draw outlines only
  for (const symbolData of symbols) {
    if (!symbolData.hasOutline) continue;

    // Use the outline color from the symbol glyph (respects {outlinecolor...} command)
    outlineCtx.fillStyle = symbolData.outlineColor || 'black';
    outlineCtx.beginPath();
    const centerX = symbolData.x + symbolData.width / 2;
    const centerY = symbolData.y + symbolData.height / 2;
    const baseRadius = Math.max(symbolData.width, symbolData.height) / 2;
    const outlineRadius = baseRadius + (symbolData.outlineWidth || 0) / 2;
    outlineCtx.arc(centerX, centerY + (symbolData.radius ?? 0), outlineRadius, 0, 2 * Math.PI);
    outlineCtx.fill();
  }

  // Transfer outlines to main canvas
  lineCtx.drawImage(outlineCanvas, 0, 0);

  // Restore text content on top of outlines
  lineCtx.drawImage(tempCanvas, 0, 0);

  // Pass 2: Draw symbols
  for (const symbolData of symbols) {
    drawSymbolWithContext(symbolCtx, symbolData, isSafari);
  }

  // Draw symbols on top of text
  lineCtx.drawImage(symbolCanvas, 0, 0);
}

/**
 * Draw a symbol without outline (simple path)
 */
function drawSymbolSimple(
  ctx: CanvasRenderingContext2D,
  symbolData: SymbolGlyph,
  isSafari: boolean
): void {
  let imageToUse: HTMLImageElement | HTMLCanvasElement = symbolData.symbol.image;
  let backImageToUse = symbolData.backImage;

  // Safari SVG shadow workaround: combine images first
  if (
    isSafari &&
    (symbolData.symbol.image.src?.includes('.svg') || backImageToUse?.src?.includes('.svg'))
  ) {
    const combined = createCombinedSymbol(symbolData);
    imageToUse = combined;
    backImageToUse = undefined;
  }

  // Add canvas margin to position (like text glyphs)
  const x = symbolData.x + CANVAS_MARGIN;
  const y = symbolData.y + CANVAS_MARGIN;

  // Draw based on mode
  if (symbolData.radius && symbolData.radius > 0) {
    // Arc mode
    if (backImageToUse) {
      drawImageArc(
        ctx,
        backImageToUse,
        x,
        y,
        symbolData.width,
        symbolData.height,
        symbolData.radius,
        symbolData.arcStart ?? 0,
        symbolData.currentX ?? 0
      );
    }
    drawImageArc(
      ctx,
      imageToUse,
      x,
      y,
      symbolData.width,
      symbolData.height,
      symbolData.radius,
      symbolData.arcStart ?? 0,
      symbolData.currentX ?? 0
    );
  } else if (symbolData.color) {
    // Color fill mode
    fillImage(ctx, imageToUse, x, y, symbolData.width, symbolData.height, symbolData.color);
  } else {
    // Standard mode
    if (backImageToUse) {
      ctx.drawImage(backImageToUse, x, y, symbolData.width, symbolData.height);
    }
    ctx.drawImage(imageToUse, x, y, symbolData.width, symbolData.height);
  }
}

/**
 * Draw a symbol with specific context (for multi-pass rendering)
 */
function drawSymbolWithContext(
  ctx: CanvasRenderingContext2D,
  symbolData: SymbolGlyph,
  isSafari: boolean
): void {
  drawSymbolSimple(ctx, symbolData, isSafari);
}

/**
 * Create combined symbol canvas (for Safari SVG shadows)
 */
function createCombinedSymbol(symbolData: SymbolGlyph): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = symbolData.width;
  canvas.height = symbolData.height;
  const ctx = canvas.getContext('2d')!;

  // Draw back image first
  if (symbolData.backImage) {
    ctx.drawImage(symbolData.backImage, 0, 0, symbolData.width, symbolData.height);
  }

  // Draw main symbol
  ctx.drawImage(symbolData.symbol.image, 0, 0, symbolData.width, symbolData.height);

  return canvas;
}

/**
 * Draw image along an arc
 */
function drawImageArc(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement | HTMLCanvasElement,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  startRotation: number,
  distance: number
): void {
  ctx.save();
  ctx.translate(x - distance + width / 2, y + radius);
  ctx.rotate(startRotation + widthToAngle(distance, radius));
  ctx.drawImage(image, 0, -radius, width, height);
  ctx.restore();
}

/**
 * Fill image with color
 */
function fillImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement | HTMLCanvasElement,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  margin = 10
): void {
  const canvas = document.createElement('canvas');
  canvas.width = width + margin * 2;
  canvas.height = height + margin * 2;
  const tempCtx = canvas.getContext('2d')!;

  tempCtx.drawImage(image, margin, margin, width, height);
  tempCtx.globalCompositeOperation = 'source-in';
  tempCtx.fillStyle = pinlineColors(color);
  tempCtx.fillRect(0, 0, width + margin * 2, height + margin * 2);

  ctx.drawImage(canvas, x - margin, y - margin, width + margin * 2, height + margin * 2);
}

/**
 * Convert width to angle for arc rendering
 */
function widthToAngle(width: number, radius: number): number {
  return width / radius;
}

/**
 * Replace color names with MTG pinline colors
 */
function pinlineColors(color: string): string {
  return color
    .replace('white', '#fcfeff')
    .replace('blue', '#0075be')
    .replace('black', '#272624')
    .replace('red', '#ef3827')
    .replace('green', '#007b43');
}

/**
 * Draw text along an arc
 */
export function fillTextArc(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  radius: number,
  startRotation: number,
  distance = 0,
  outlineWidth = 0
): void {
  ctx.save();
  ctx.translate(x - distance + 0.5, y + radius);
  ctx.rotate(startRotation + widthToAngle(distance, radius));

  for (let i = 0; i < text.length; i++) {
    const letter = text[i];
    if (outlineWidth >= 1) {
      ctx.strokeText(letter, 0, -radius);
    }
    ctx.fillText(letter, 0, -radius);
    ctx.rotate(widthToAngle(ctx.measureText(letter).width, radius));
  }

  ctx.restore();
}

/**
 * Render justified text with variable space width
 */
export function renderJustifiedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  targetWidth: number,
  renderType: 'fill' | 'stroke' | 'measure',
  settings: {
    maxSpaceSize?: number;
    minSpaceSize?: number;
  } = {}
): number {
  const maxSpaceSize = settings.maxSpaceSize ?? 3;
  const minSpaceSize = settings.minSpaceSize ?? 0.5;

  const words = text.split(' ');
  let wordsWidth = 0;

  for (const word of words) {
    wordsWidth += ctx.measureText(word).width;
  }

  const spaces = words.length - 1;
  const spaceWidth = ctx.measureText(' ').width;
  const adjSpace = Math.max(spaceWidth * minSpaceSize, (targetWidth - wordsWidth) / spaces);
  const useSize = adjSpace > spaceWidth * maxSpaceSize ? spaceWidth : adjSpace;
  const totalWidth = wordsWidth + useSize * spaces;

  if (renderType === 'measure') {
    return totalWidth;
  }

  const renderer = renderType === 'fill' ? ctx.fillText.bind(ctx) : ctx.strokeText.bind(ctx);

  if (useSize === spaceWidth) {
    renderer(text, x, y);
  } else {
    let currentX = x;
    for (let i = 0; i < words.length; i++) {
      renderer(words[i], currentX, y);
      currentX += ctx.measureText(words[i]).width + useSize;
    }
  }

  return totalWidth;
}
