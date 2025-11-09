/**
 * Text Layout Engine
 * Computes glyph positions without rendering
 */

import type {
  Token,
  LayoutResult,
  LayoutState,
  FieldSpec,
  PackMetrics,
  RenderOptions,
  Line,
  Glyph,
  TextGlyph,
  SymbolGlyph,
} from './types';
import type { SymbolAtlas } from './symbols';
import { getDefaultTextStyle, applyFontStyle, measureText } from './measure';
import { getRandomBackImage } from './symbols';

// const CANVAS_MARGIN = 300;

/**
 * Layout text tokens into positioned glyphs
 */
export function layoutText(
  tokens: Token[],
  fieldSpec: FieldSpec,
  packMetrics: PackMetrics,
  atlas: SymbolAtlas,
  tempCanvas: HTMLCanvasElement,
  options: RenderOptions = {}
): LayoutResult {
  const ctx = tempCanvas.getContext('2d')!;

  // Calculate bounds in pixels
  const textWidth = packMetrics.scaleWidth(fieldSpec.width);
  const textHeight = packMetrics.scaleHeight(fieldSpec.height);
  const startingTextSize = packMetrics.scaleHeight(fieldSpec.size);

  // Calculate default line spacing
  const defaultLineSpacing = (fieldSpec.lineSpacing || 0) * startingTextSize;

  // Initialize layout state
  const state: LayoutState = {
    currentX: 0,
    currentY: 0,
    lineY: 0,
    startingCurrentX: 0,
    textSize: startingTextSize,
    newLineSpacing: defaultLineSpacing,
    widestLineWidth: 0,

    style: getDefaultTextStyle(fieldSpec, packMetrics.scaleWidth, packMetrics.scaleHeight),

    savedTextXPosition: 0,
    savedTextXPosition2: 0,
    savedRollYPosition: null,
    savedRollColor: 'black',
    savedFont: null,

    ptShift: [0, 0],
    permaShift: [0, 0],

    fillJustify: false,
    justifyWidth: 0,
    realTextAlign: fieldSpec.align || 'left',

    manaPlacementCounter: 0,
    manaSymbolColor: fieldSpec.manaSymbolColor || null,

    arcRadius: packMetrics.scaleHeight(fieldSpec.arcRadius || 0),
    arcStart: fieldSpec.arcStart || 0,

    rotation: fieldSpec.rotation || 0,

    drawToPrePTCanvas: false,
  };

  // Lines being built
  const lines: Line[] = [];
  let currentLineGlyphs: Glyph[] = [];
  
  // Absolute positioned symbols (e.g. manaPlacement)
  const absoluteSymbols: SymbolGlyph[] = [];

  // Apply initial font size adjustment
  state.textSize += parseInt(fieldSpec.fontSize || '0');

  // Apply font style to context for measurements
  applyFontStyle(ctx, state.style);

  // Process each token
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === 'COMMAND') {
      // Handle line break commands specially
      if (token.value === 'line' || token.value === 'lns' || token.value === 'linenospace') {
        // Set spacing for {line} command
        if (token.value === 'line') {
          state.newLineSpacing = state.textSize * 0.35;
        }
        
        // Finish current line (even if empty, to support consecutive line breaks)
        if (currentLineGlyphs.length > 0) {
          finishLine(currentLineGlyphs, state, lines, textWidth, defaultLineSpacing);
          currentLineGlyphs = [];
        } else {
          // No glyphs on line, but still add empty line and advance
          lines.push({
            glyphs: [],
            y: state.currentY,
            width: 0,
            align: state.style.align,
          });
          
          state.currentX = state.startingCurrentX;
          state.currentY += state.textSize + state.newLineSpacing;
          // Reset newLineSpacing to default after using it
          state.newLineSpacing = defaultLineSpacing;
          state.lineY = 0;
        }
        continue;
      }
      
      processCommand(token, state, fieldSpec, packMetrics, ctx, options);
      continue;
    }

    if (token.type === 'SYMBOL') {
      const symbolGlyph = processSymbol(
        token,
        state,
        fieldSpec,
        packMetrics,
        atlas,
        options
      );

      if (symbolGlyph) {
        // Check if this symbol uses absolute positioning (manaPlacement)
        if (fieldSpec.manaPlacement) {
          // Add to absolute symbols array - these bypass the line system
          absoluteSymbols.push(symbolGlyph);
        } else {
          // Add to current line as normal
          currentLineGlyphs.push(symbolGlyph);
          // Advance by symbol width plus the spacing that was added to its position
          const manaSymbolSpacing = state.textSize * 0.1 + packMetrics.scaleWidth(fieldSpec.manaSpacing || 0);
          state.currentX += symbolGlyph.width + manaSymbolSpacing;
        }
      }
      continue;
    }

    if (token.type === 'SPACE') {
      // Check if we need to skip space at line start
      if (state.currentX !== state.startingCurrentX || !fieldSpec.manaCost) {
        const spaceWidth = ctx.measureText(' ').width;
        
        // Check if adding space would exceed line width (for multi-line)
        if (
          spaceWidth + state.currentX > textWidth &&
          !fieldSpec.oneLine &&
          state.arcRadius === 0 &&
          currentLineGlyphs.length > 0
        ) {
          // Don't add space that would overflow, wrap to next line instead
          finishLine(currentLineGlyphs, state, lines, textWidth, defaultLineSpacing);
          currentLineGlyphs = [];
        } else {
          currentLineGlyphs.push({
            type: 'space',
            width: spaceWidth,
          });
          state.currentX += spaceWidth;
        }
      }
      continue;
    }

    if (token.type === 'TEXT') {
      let wordToWrite = token.value;

      // Special font replacements (belerenb ligatures)
      if (ctx.font.includes('belerenb')) {
        wordToWrite = wordToWrite
          .replace(/f(?:\s|$)/g, '\ue006')
          .replace(/h(?:\s|$)/g, '\ue007')
          .replace(/m(?:\s|$)/g, '\ue008')
          .replace(/n(?:\s|$)/g, '\ue009')
          .replace(/k(?:\s|$)/g, '\ue00a');
      }

      // Check if word fits on current line
      const wordWidth = measureText(ctx, wordToWrite);

      if (
        wordToWrite &&
        wordWidth + state.currentX > textWidth &&
        state.arcRadius === 0
      ) {
        // Word doesn't fit - handle based on field type
        if (fieldSpec.oneLine) {
          // Single-line field - mark overflow (will retry at smaller size)
          return {
            lines: [],
            overflow: true,
            finalTextSize: state.textSize,
            widestLineWidth: 0,
            totalHeight: 0,
            verticalAdjust: 0,
            horizontalAdjust: 0,
          };
        } else {
          // Multi-line - wrap to next line ONLY if there's content on current line
          if (currentLineGlyphs.length > 0) {
            finishLine(currentLineGlyphs, state, lines, textWidth, defaultLineSpacing);
            currentLineGlyphs = [];
          }
        }
      }

      // Add text glyph
      if (wordToWrite && !fieldSpec.manaCost) {
        const glyph: TextGlyph = {
          type: 'text',
          text: wordToWrite,
          x: state.currentX,
          y: state.lineY,
          width: wordWidth,
          style: { ...state.style },
        };
        currentLineGlyphs.push(glyph);
        state.currentX += wordWidth;
      }
    }

    // Check if this is the last token or we need a new line
    const isLastToken = i === tokens.length - 1;
    if (isLastToken && currentLineGlyphs.length > 0) {
      finishLine(currentLineGlyphs, state, lines, textWidth, defaultLineSpacing);
      currentLineGlyphs = [];
    }
  }

  // Check if content overflowed vertically
  const overflow = state.currentY > textHeight && (fieldSpec.bounded ?? true);

  // Also check for horizontal overflow - if any line is wider than available width
  const horizontalOverflow = state.widestLineWidth > textWidth && (fieldSpec.bounded ?? true);

  // Calculate vertical centering
  let verticalAdjust = 0;
  if (!fieldSpec.noVerticalCenter) {
    verticalAdjust = (textHeight - state.currentY + state.textSize * 0.15) / 2;
  }

  // Calculate horizontal justification
  let horizontalAdjust = 0;
  const horizontalAdjustUnit = (textWidth - state.widestLineWidth) / 2;
  const textJustify = fieldSpec.justify || 'left';
  const textAlign = state.style.align;

  if (textJustify === 'right' && textAlign !== 'right') {
    horizontalAdjust = 2 * horizontalAdjustUnit;
    if (textAlign === 'center') {
      horizontalAdjust = horizontalAdjustUnit;
    }
  } else if (textJustify === 'center' && textAlign !== 'center') {
    horizontalAdjust = horizontalAdjustUnit;
    if (textAlign === 'right') {
      horizontalAdjust = -horizontalAdjustUnit;
    }
  }

  return {
    lines,
    overflow: (overflow || horizontalOverflow) && !fieldSpec.oneLine,
    finalTextSize: state.textSize,
    widestLineWidth: state.widestLineWidth,
    totalHeight: state.currentY,
    verticalAdjust,
    horizontalAdjust,
    absoluteSymbols: absoluteSymbols.length > 0 ? absoluteSymbols : undefined,
  };
}

/**
 * Process a command token and update layout state
 */
function processCommand(
  token: Token,
  state: LayoutState,
  _fieldSpec: FieldSpec,
  packMetrics: PackMetrics,
  ctx: CanvasRenderingContext2D,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _options: RenderOptions
): void {
  const code = token.value;

  // Line breaks
  if (code === 'line') {
    state.newLineSpacing = state.textSize * 0.35;
    // Will be handled by finishLine
    return;
  }

  if (code === 'lns' || code === 'linenospace') {
    // New line without extra spacing - handled by finishLine
    return;
  }

  // Text styling
  if (code === 'i') {
    if (state.style.font === 'gillsans' || state.style.font === 'neosans') {
      state.style.fontExtension = 'italic';
    } else if (state.style.font === 'mplantin') {
      state.style.fontExtension = 'i';
      state.style.fontStyle = state.style.fontStyle.replace('italic ', '');
    } else {
      state.style.fontExtension = '';
      if (!state.style.fontStyle.includes('italic')) {
        state.style.fontStyle += 'italic ';
      }
    }
    state.style.italic = true;
    applyFontStyle(ctx, state.style);
    return;
  }

  if (code === '/i') {
    state.style.fontExtension = '';
    state.style.fontStyle = state.style.fontStyle.replace('italic ', '');
    state.style.italic = false;
    applyFontStyle(ctx, state.style);
    return;
  }

  if (code === 'bold') {
    if (state.style.font === 'gillsans') {
      state.style.fontExtension = 'bold';
    } else {
      if (!state.style.fontStyle.includes('bold')) {
        state.style.fontStyle += 'bold ';
      }
    }
    state.style.bold = true;
    applyFontStyle(ctx, state.style);
    return;
  }

  if (code === '/bold') {
    if (state.style.font === 'gillsans') {
      state.style.fontExtension = '';
    } else {
      state.style.fontStyle = state.style.fontStyle.replace('bold ', '');
    }
    state.style.bold = false;
    applyFontStyle(ctx, state.style);
    return;
  }

  // Alignment
  if (code === 'left') {
    state.style.align = 'left';
    return;
  }
  if (code === 'center') {
    state.style.align = 'center';
    return;
  }
  if (code === 'right') {
    state.style.align = 'right';
    return;
  }

  // Font changes
  if (code.startsWith('fontcolor')) {
    state.style.color = code.replace('fontcolor', '');
    ctx.fillStyle = state.style.color;
    return;
  }

  if (code === '/fontcolor') {
    state.style.color = 'black';
    ctx.fillStyle = 'black';
    return;
  }

  if (code.startsWith('fontsize')) {
    if (code.endsWith('pt')) {
      state.textSize = (parseInt(code.replace('fontsize', '').replace('pt', '')) * 600) / 72 || 0;
    } else {
      state.textSize += parseInt(code.replace('fontsize', '')) || 0;
    }
    state.style.size = state.textSize;
    applyFontStyle(ctx, state.style);
    return;
  }

  if (code.startsWith('font') || state.savedFont) {
    const newFont = state.savedFont || code.replace('font', '');
    state.style.font = newFont;
    state.style.fontExtension = '';
    state.style.fontStyle = '';
    state.savedFont = null;
    applyFontStyle(ctx, state.style);
    return;
  }

  // Position adjustments
  if (code.startsWith('upinline')) {
    state.lineY -= parseInt(code.replace('upinline', '')) || 0;
    return;
  }

  if (code.startsWith('up') && code !== 'up') {
    state.currentY -= parseInt(code.replace('up', '')) || 0;
    return;
  }

  if (code.startsWith('down')) {
    state.currentY += parseInt(code.replace('down', '')) || 0;
    return;
  }

  if (code.startsWith('left')) {
    state.currentX -= parseInt(code.replace('left', '')) || 0;
    return;
  }

  if (code.startsWith('right')) {
    state.currentX += parseInt(code.replace('right', '')) || 0;
    return;
  }

  // Shadows
  if (code.startsWith('shadow')) {
    if (code.includes('color')) {
      state.style.shadowColor = code.replace('shadowcolor', '');
      ctx.shadowColor = state.style.shadowColor;
    } else if (code.includes('blur')) {
      state.style.shadowBlur = parseInt(code.replace('shadowblur', '')) || 0;
      ctx.shadowBlur = state.style.shadowBlur;
    } else if (code.includes('shadowx')) {
      state.style.shadowOffsetX = parseInt(code.replace('shadowx', '')) || 0;
      ctx.shadowOffsetX = state.style.shadowOffsetX;
    } else if (code.includes('shadowy')) {
      state.style.shadowOffsetY = parseInt(code.replace('shadowy', '')) || 0;
      ctx.shadowOffsetY = state.style.shadowOffsetY;
    } else {
      const offset = parseInt(code.replace('shadow', '')) || 0;
      state.style.shadowOffsetX = offset;
      state.style.shadowOffsetY = offset;
      ctx.shadowOffsetX = offset;
      ctx.shadowOffsetY = offset;
    }
    return;
  }

  if (code === '/shadow') {
    state.style.shadowColor = 'black';
    state.style.shadowOffsetX = 0;
    state.style.shadowOffsetY = 0;
    state.style.shadowBlur = 0;
    ctx.shadowColor = 'black';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    return;
  }

  // Outlines
  if (code.startsWith('outlinecolor')) {
    state.style.outlineColor = code.replace('outlinecolor', '');
    ctx.strokeStyle = state.style.outlineColor;
    return;
  }

  if (code === '/outlinecolor') {
    state.style.outlineColor = 'black';
    ctx.strokeStyle = 'black';
    return;
  }

  if (code.startsWith('outline')) {
    state.style.outlineWidth = parseInt(code.replace('outline', ''));
    ctx.lineWidth = state.style.outlineWidth;
    return;
  }

  if (code === '/outline') {
    state.style.outlineWidth = 0;
    ctx.lineWidth = 0;
    return;
  }

  // Kerning
  if (code.startsWith('kerning')) {
    state.style.kerning = parseInt(code.replace('kerning', ''));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ctx as any).letterSpacing = `${state.style.kerning}px`;
    applyFontStyle(ctx, state.style);
    return;
  }

  if (code === '/kerning') {
    state.style.kerning = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ctx as any).letterSpacing = '0px';
    applyFontStyle(ctx, state.style);
    return;
  }

  // Anchors
  if (code === 'savex') {
    state.savedTextXPosition = state.currentX;
    return;
  }

  if (code === 'loadx') {
    if (state.savedTextXPosition > state.currentX) {
      state.currentX = state.savedTextXPosition;
    }
    return;
  }

  if (code === 'savex2') {
    state.savedTextXPosition2 = state.currentX;
    return;
  }

  if (code === 'loadx2') {
    if (state.savedTextXPosition2 > state.currentX) {
      state.currentX = state.savedTextXPosition2;
    }
    return;
  }

  // Special positioning
  if (code.startsWith('ptshift')) {
    const parts = code.replace('ptshift', '').split(',');
    state.ptShift = [
      packMetrics.scaleWidth(parseFloat(parts[0])),
      packMetrics.scaleHeight(parseFloat(parts[1])),
    ];
    return;
  }

  if (code.startsWith('permashift')) {
    const parts = code.replace('permashift', '').split(',');
    state.permaShift = [parseFloat(parts[0]), parseFloat(parts[1])];
    return;
  }

  // Roll boxes (AFR dice rolling cards)
  if (code.startsWith('rollcolor')) {
    state.savedRollColor = code.replace('rollcolor', '') || 'black';
    return;
  }

  if (code.startsWith('roll')) {
    state.drawToPrePTCanvas = true;
    if (state.savedRollYPosition === null) {
      state.savedRollYPosition = state.currentY;
    } else {
      state.savedRollYPosition = -1;
    }
    state.savedFont = state.style.font;
    state.style.font = 'belerenb';
    applyFontStyle(ctx, state.style);
    // The roll text will be rendered as bold
    return;
  }

  // Indent
  if (code === 'indent') {
    state.startingCurrentX += state.currentX;
    state.currentY -= 10;
    return;
  }

  if (code === '/indent') {
    state.startingCurrentX = 0;
    return;
  }

  // Mana color
  if (code === 'manacolordefault') {
    state.manaSymbolColor = null;
    return;
  }

  if (code.startsWith('manacolor')) {
    state.manaSymbolColor = code.replace('manacolor', '') || 'white';
    return;
  }

  if (code === '/manacolor') {
    state.manaSymbolColor = null;
    return;
  }

  // Arc text
  if (code.startsWith('arcradius')) {
    state.arcRadius = parseInt(code.replace('arcradius', '')) || 0;
    return;
  }

  if (code.startsWith('arcstart')) {
    state.arcStart = parseFloat(code.replace('arcstart', '')) || 0;
    return;
  }

  // Rotation
  if (code.startsWith('rotate')) {
    state.rotation = parseInt(code.replace('rotate', '')) % 360;
    return;
  }

  // Misc
  if (code === 'fixtextalign') {
    state.style.align = state.realTextAlign;
    return;
  }

  // Note: {bullet} is handled in tokenizer preprocessing
  // If we get here, it means it wasn't preprocessed
  if (code === 'bullet' || code === '•') {
    // This should not happen in normal flow
    return;
  }
}

/**
 * Process a symbol token and create a SymbolGlyph
 */
function processSymbol(
  token: Token,
  state: LayoutState,
  fieldSpec: FieldSpec,
  packMetrics: PackMetrics,
  atlas: SymbolAtlas,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _options: RenderOptions
): SymbolGlyph | null {
  const code = token.value.replace(/\//g, '');

  // Try to find symbol with optional prefix
  // IMPORTANT: If manaPrefix is specified, try PREFIXED version FIRST, then fallback to unprefixed
  let symbol: ReturnType<typeof atlas.getSymbol>;
  
  if (fieldSpec.manaPrefix) {
    // Try prefixed version first when manaPrefix is specified
    const prefixedCode = fieldSpec.manaPrefix + code;
    symbol = atlas.getSymbol(prefixedCode);
    
    // Fallback to unprefixed if prefixed not found
    if (!symbol) {
      symbol = atlas.getSymbol(code);
    }
  } else {
    // No prefix specified, just look up the code directly
    symbol = atlas.getSymbol(code);
  }

  if (!symbol) {
    return null;
  }

  // Determine symbol color
  let symbolColor = state.manaSymbolColor;
  if (symbol.matchColor && !symbolColor && state.style.color !== 'black') {
    symbolColor = state.style.color;
  }

  // Calculate text box width for bar sizing
  const textWidth = packMetrics.scaleWidth(fieldSpec.width);

  // Special handling for bar symbol (flavor text divider)
  if (code === 'bar' || code === 'whitebar') {
    const barWidth = textWidth * 0.96; // 96% of text box width
    const barHeight = packMetrics.scaleHeight(0.031); // Thin line
    const barX = (textWidth - barWidth) / 2; // Centered relative to text box
    const barY = state.textSize * 0; // Align with text baseline

    // Update current position to account for bar (move past it)
    state.currentX = 0; // Reset to start of line

    return {
      type: 'symbol',
      symbol: symbol,
      x: barX,
      y: barY,
      width: barWidth,
      height: barHeight,
      color: symbolColor || undefined,
      hasOutline: false,
      outlineWidth: state.style.outlineWidth,
      outlineColor: state.style.outlineColor,
      shadowColor: state.style.shadowColor,
      shadowOffsetX: state.style.shadowOffsetX,
      shadowOffsetY: state.style.shadowOffsetY,
      shadowBlur: state.style.shadowBlur,
    };
  }

  // Calculate symbol dimensions (regular mana symbols)
  const manaSymbolSpacing = state.textSize * 0.08 + packMetrics.scaleWidth(fieldSpec.manaSpacing || 0);
  let manaSymbolWidth = symbol.width * state.textSize * 0.78;
  let manaSymbolHeight = symbol.height * state.textSize * 0.78;
  let manaSymbolX = state.currentX + manaSymbolSpacing;
  let manaSymbolY = state.textSize * 0.34 - manaSymbolHeight / 2;

  // Special placement modes
  if (fieldSpec.manaPlacement) {
    // Absolute positioning for manaPlacement - symbols rendered outside line system
    manaSymbolX = packMetrics.scaleWidth(fieldSpec.manaPlacement.x[state.manaPlacementCounter] || 0);
    manaSymbolY = packMetrics.scaleHeight(fieldSpec.manaPlacement.y[state.manaPlacementCounter] || 0);
    state.manaPlacementCounter++;
  } else if (fieldSpec.manaLayout) {
    const layoutOption = 0;

    if (fieldSpec.manaLayout[layoutOption]) {
      const layout = fieldSpec.manaLayout[layoutOption];
      const pos = layout.pos[state.manaPlacementCounter] || [0, 0];
      manaSymbolX = packMetrics.scaleWidth(pos[0]);
      manaSymbolY = 0;
      state.currentY = packMetrics.scaleHeight(pos[1]);
      manaSymbolWidth *= layout.size;
      manaSymbolHeight *= layout.size;
      state.manaPlacementCounter++;
    }
  }

  // Image scale adjustment
  if (fieldSpec.manaImageScale) {
    state.currentX -= (fieldSpec.manaImageScale - 1) * manaSymbolWidth;
    manaSymbolX -= ((fieldSpec.manaImageScale - 1) / 2) * manaSymbolWidth;
    manaSymbolY -= ((fieldSpec.manaImageScale - 1) / 2) * manaSymbolHeight;
    manaSymbolWidth *= fieldSpec.manaImageScale;
    manaSymbolHeight *= fieldSpec.manaImageScale;
  }

  // Get back image if available
  const backImage = getRandomBackImage(symbol, atlas);

  const glyph: SymbolGlyph = {
    type: 'symbol',
    symbol,
    x: manaSymbolX,
    y: manaSymbolY,
    width: manaSymbolWidth,
    height: manaSymbolHeight,
    color: symbolColor ?? undefined,
    hasOutline: state.style.outlineWidth > 0,
    backImage: backImage ?? undefined,
    radius: state.arcRadius > 0 ? state.arcRadius : undefined,
    arcStart: state.arcRadius > 0 ? state.arcStart : undefined,
    currentX: state.arcRadius > 0 ? state.currentX : undefined,
    outlineWidth: state.style.outlineWidth,
    outlineColor: state.style.outlineColor,
    shadowColor: state.style.shadowColor,
    shadowOffsetX: state.style.shadowOffsetX,
    shadowOffsetY: state.style.shadowOffsetY,
    shadowBlur: state.style.shadowBlur,
  };

  return glyph;
}

/**
 * Finish a line and add it to the lines array
 */
function finishLine(
  glyphs: Glyph[],
  state: LayoutState,
  lines: Line[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _textWidth: number,
  defaultLineSpacing: number
): void {
  if (glyphs.length === 0) return;

  // Calculate line width
  let lineWidth = 0;
  for (const glyph of glyphs) {
    if (glyph.type === 'text') {
      lineWidth = Math.max(lineWidth, glyph.x + glyph.width);
    } else if (glyph.type === 'symbol') {
      lineWidth = Math.max(lineWidth, glyph.x + glyph.width);
    } else if (glyph.type === 'space') {
      lineWidth += glyph.width;
    }
  }

  // Track widest line
  if (lineWidth > state.widestLineWidth) {
    state.widestLineWidth = lineWidth;
  }

  // Add line
  lines.push({
    glyphs,
    y: state.currentY,
    width: lineWidth,
    align: state.style.align,
  });

  // Move to next line
  state.currentX = state.startingCurrentX;
  state.currentY += state.textSize + state.newLineSpacing;
  // Reset to default line spacing after using it
  state.newLineSpacing = defaultLineSpacing;
  state.lineY = 0;
}
