/**
 * Text Measurement Utilities
 * Handles text width calculation with custom kerning
 */

import type { KerningTable, TextStyle } from './types';

/**
 * Measure text width using canvas context
 * Includes kerning adjustments if provided
 */
export function measureText(
  ctx: CanvasRenderingContext2D,
  text: string,
  kerningTable?: KerningTable
): number {
  // Base measurement
  const baseWidth = ctx.measureText(text).width;

  // No kerning table? Return base width
  if (!kerningTable || text.length < 2) {
    return baseWidth;
  }

  // Apply kerning adjustments
  let kerningAdjustment = 0;
  for (let i = 0; i < text.length - 1; i++) {
    const pair = text[i] + text[i + 1];
    if (kerningTable[pair] !== undefined) {
      kerningAdjustment += kerningTable[pair];
    }
  }

  return baseWidth + kerningAdjustment;
}

/**
 * Measure a single glyph width
 */
export function measureGlyph(
  ctx: CanvasRenderingContext2D,
  char: string
): number {
  return ctx.measureText(char).width;
}

/**
 * Apply font to context from style
 */
export function applyFontStyle(ctx: CanvasRenderingContext2D, style: TextStyle): void {
  ctx.font = `${style.fontStyle}${style.size}px ${style.font}${style.fontExtension}`;
  ctx.fillStyle = style.color;

  // Letter spacing (kerning override)
  if (style.kerning !== 0) {
    (ctx as any).letterSpacing = `${style.kerning}px`;
  } else {
    (ctx as any).letterSpacing = '0px';
  }

  // Shadow
  ctx.shadowColor = style.shadowColor;
  ctx.shadowOffsetX = style.shadowOffsetX;
  ctx.shadowOffsetY = style.shadowOffsetY;
  ctx.shadowBlur = style.shadowBlur;

  // Outline
  ctx.strokeStyle = style.outlineColor;
  ctx.lineWidth = style.outlineWidth;
  ctx.lineCap = style.lineCap;
  ctx.lineJoin = style.lineJoin;
}

/**
 * Get default style from field spec
 */
export function getDefaultTextStyle(
  fieldSpec: {
    font?: string;
    fontStyle?: string;
    size: number;
    fontSize?: string;
    color?: string;
    align?: 'left' | 'center' | 'right';
    kerning?: number;
    shadow?: string;
    shadowX?: number;
    shadowY?: number;
    shadowBlur?: number;
    outlineWidth?: number;
    outlineColor?: string;
    lineCap?: CanvasLineCap;
    lineJoin?: CanvasLineJoin;
  },
  scaleWidth: (n: number) => number,
  scaleHeight: (n: number) => number
): TextStyle {
  const size = scaleHeight(fieldSpec.size);
  const fontSizeAdjust = parseInt(fieldSpec.fontSize || '0');

  return {
    font: fieldSpec.font || 'mplantin',
    fontExtension: '',
    fontStyle: fieldSpec.fontStyle || '',
    size: size + fontSizeAdjust,
    color: fieldSpec.color || 'black',
    italic: false,
    bold: false,
    align: fieldSpec.align || 'left',
    kerning: scaleWidth(fieldSpec.kerning || 0),

    shadowColor: fieldSpec.shadow || 'black',
    shadowOffsetX: scaleWidth(fieldSpec.shadowX || 0),
    shadowOffsetY: scaleHeight(fieldSpec.shadowY || 0),
    shadowBlur: scaleHeight(fieldSpec.shadowBlur || 0),

    outlineWidth: scaleHeight(fieldSpec.outlineWidth || 0),
    outlineColor: fieldSpec.outlineColor || 'black',
    lineCap: fieldSpec.lineCap || 'round',
    lineJoin: fieldSpec.lineJoin || 'round',
  };
}

/**
 * Clone text style
 */
export function cloneTextStyle(style: TextStyle): TextStyle {
  return { ...style };
}

/**
 * Measure justified text width
 * (Simplified version - full justification happens during rendering)
 */
export function measureJustifiedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  targetWidth: number,
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
  const adjSpace = Math.max(
    spaceWidth * minSpaceSize,
    (targetWidth - wordsWidth) / spaces
  );
  const useSize = adjSpace > spaceWidth * maxSpaceSize ? spaceWidth : adjSpace;

  return wordsWidth + useSize * spaces;
}
