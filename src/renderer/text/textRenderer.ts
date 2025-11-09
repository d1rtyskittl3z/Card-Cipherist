/**
 * Main Text Renderer
 * Orchestrates tokenization, layout, and drawing
 */

import type {
  FieldSpec,
  PackMetrics,
  RenderOptions,
  TextCanvasRefs,
} from './types';
import type { SymbolAtlas } from './symbols';
import { preprocessFieldText, tokenize } from './tokenizer';
import { layoutText } from './layout';
import { drawLayout } from './draw';

const CANVAS_MARGIN = 300;

/**
 * Render a text field to canvas
 *
 * This is the main entry point for text rendering. It:
 * 1. Preprocesses the field text (handle {cardname}, reminder text, etc.)
 * 2. Tokenizes the text into structured tokens
 * 3. Computes layout (with shrink-to-fit if needed)
 * 4. Draws the final result to the target canvas
 *
 * @param ctx - Target canvas context (usually text canvas)
 * @param fieldSpec - Field specification (text, position, style)
 * @param packMetrics - Scaling helpers from pack/card
 * @param atlas - Symbol atlas for mana icons
 * @param tempCanvases - Temporary canvases for rendering
 * @param options - Render options (hide reminder text, etc.)
 */
export function renderField(
  ctx: CanvasRenderingContext2D,
  fieldSpec: FieldSpec,
  packMetrics: PackMetrics,
  atlas: SymbolAtlas,
  tempCanvases: TextCanvasRefs,
  options: RenderOptions = {}
): void {
  // Calculate dimensions
  const textWidth = packMetrics.scaleWidth(fieldSpec.width);
  const textHeight = packMetrics.scaleHeight(fieldSpec.height);
  const startingTextSize = packMetrics.scaleHeight(fieldSpec.size);

  // Size temp canvases
  const arcRadius = packMetrics.scaleHeight(fieldSpec.arcRadius || 0);
  const canvasMargin = arcRadius > 0 ? CANVAS_MARGIN + arcRadius : CANVAS_MARGIN;

  // When manaPlacement is active the field width/height can be 0, but symbols use
  // absolute card coordinates. Ensure the temp canvases are large enough so those
  // symbols are not clipped off the canvas bounds.
  const usesManaPlacement = !!(fieldSpec.manaPlacement && fieldSpec.manaPlacement.x?.length);
  const effectiveTextWidth = usesManaPlacement ? packMetrics.cardWidth : textWidth;
  const effectiveTextHeight = usesManaPlacement ? packMetrics.cardHeight : textHeight;

  tempCanvases.paragraph.width = effectiveTextWidth + 2 * canvasMargin;
  tempCanvases.paragraph.height = Math.max(effectiveTextHeight, startingTextSize) + 2 * canvasMargin;
  tempCanvases.line.width = effectiveTextWidth + 2 * canvasMargin;
  tempCanvases.line.height = startingTextSize + 2 * canvasMargin;

  // Preprocess text
  const processedText = preprocessFieldText(fieldSpec.text, {
    cardName: options.cardName,
    cardNickname: options.cardNickname,
    hideReminderText: options.hideReminderText,
    italicizeReminderText: options.italicizeReminderText,
    allCaps: fieldSpec.allCaps,
    showsFlavorBar: options.showsFlavorBar,
    version: options.version,
  });

  // Tokenize
  const tokens = tokenize(processedText, {
    filterSpaces: fieldSpec.manaCost,
    vertical: !!fieldSpec.vertical,  // Convert string | boolean to boolean
    manaCost: fieldSpec.manaCost,
    startingTextSize,
  });

  // Layout with shrink-to-fit loop
  let currentTextSize = startingTextSize;
  let layout = layoutText(
    tokens,
    { ...fieldSpec, size: currentTextSize / packMetrics.cardHeight },
    packMetrics,
    atlas,
    tempCanvases.line,
    options
  );

  // Shrink-to-fit loop for bounded text
  const bounded = usesManaPlacement ? false : (fieldSpec.bounded ?? true);
  if (!usesManaPlacement) {
    while (
      layout.overflow &&
      !fieldSpec.oneLine &&
      currentTextSize > 1 &&
      bounded &&
      arcRadius === 0
    ) {
      currentTextSize -= 1;
      layout = layoutText(
        tokens,
        { ...fieldSpec, size: currentTextSize / packMetrics.cardHeight },
        packMetrics,
        atlas,
        tempCanvases.line,
        options
      );
    }
  }

  // Single-line shrink-to-fit
  if (!usesManaPlacement) {
    while (fieldSpec.oneLine && layout.overflow && currentTextSize > 1) {
      currentTextSize -= 1;
      layout = layoutText(
        tokens,
        { ...fieldSpec, size: currentTextSize / packMetrics.cardHeight },
        packMetrics,
        atlas,
        tempCanvases.line,
        options
      );
    }
  }

  // Draw final layout
  drawLayout(ctx, layout, fieldSpec, packMetrics, tempCanvases, {
    // Note: ptShift, permaShift, rotation are handled within layout
    // and stored in the layout result if needed
  });
}

/**
 * Initialize temp canvases for text rendering
 *
 * Creates the three temporary canvases used during rendering:
 * - paragraph: Accumulates lines of text
 * - line: Renders individual lines
 * - prePT: For special rendering (roll boxes, PT overlays)
 *
 * @param cardWidth - Card width in pixels
 * @param cardHeight - Card height in pixels
 * @returns Canvas references object
 */
export function createTempCanvases(
  cardWidth: number,
  cardHeight: number
): TextCanvasRefs {
  const paragraph = document.createElement('canvas');
  const line = document.createElement('canvas');
  const prePT = document.createElement('canvas');

  // Initial sizing (will be resized per field)
  paragraph.width = cardWidth + 2 * CANVAS_MARGIN;
  paragraph.height = cardHeight + 2 * CANVAS_MARGIN;
  line.width = cardWidth + 2 * CANVAS_MARGIN;
  line.height = 200; // Will resize based on text size
  prePT.width = cardWidth + 2 * CANVAS_MARGIN;
  prePT.height = cardHeight + 2 * CANVAS_MARGIN;

  return { paragraph, line, prePT };
}

/**
 * Render multiple fields to a canvas
 *
 * Convenience method for rendering common card fields.
 *
 * @param ctx - Target canvas context
 * @param fields - Map of field name to FieldSpec
 * @param packMetrics - Scaling helpers
 * @param atlas - Symbol atlas
 * @param tempCanvases - Temp canvases
 * @param options - Render options
 */
export function renderFields(
  ctx: CanvasRenderingContext2D,
  fields: { [key: string]: FieldSpec },
  packMetrics: PackMetrics,
  atlas: SymbolAtlas,
  tempCanvases: TextCanvasRefs,
  options: RenderOptions = {}
): void {
  // Clear target canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Render each field
  for (const fieldSpec of Object.values(fields)) {
    if (fieldSpec.text) {
      renderField(ctx, fieldSpec, packMetrics, atlas, tempCanvases, options);
    }
  }
}
