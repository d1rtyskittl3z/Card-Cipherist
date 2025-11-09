/**
 * Text Renderer Type Definitions
 * Modern TypeScript types for the text rendering system
 */

/**
 * Token types for parsed text
 */
export type TokenType =
  | 'TEXT'           // Regular text content
  | 'SYMBOL'         // Mana symbol or icon
  | 'COMMAND'        // Formatting command
  | 'SPACE'          // Whitespace
  | 'NEWLINE';       // Line break

export interface Token {
  type: TokenType;
  value: string;
  raw?: string;      // Original token including braces
}

/**
 * Text style state (mutable during layout)
 */
export interface TextStyle {
  font: string;
  fontExtension: string;      // 'i', 'italic', 'bold', etc.
  fontStyle: string;          // CSS font-style modifiers
  size: number;               // In pixels
  color: string;
  italic: boolean;
  bold: boolean;
  align: 'left' | 'center' | 'right';
  kerning: number;            // Letter spacing in pixels

  // Shadow
  shadowColor: string;
  shadowOffsetX: number;
  shadowOffsetY: number;
  shadowBlur: number;

  // Outline
  outlineWidth: number;
  outlineColor: string;
  lineCap: CanvasLineCap;
  lineJoin: CanvasLineJoin;
}

/**
 * Field specification (input to renderer)
 */
export interface FieldSpec {
  name: string;
  text: string;

  // Position (fractional 0-1)
  x?: number;  // Optional for centered text (defaults to 0)
  y: number;
  width: number;
  height: number;

  // Typography
  size: number;               // Base size (fractional)
  font?: string;
  fontStyle?: string;
  fontSize?: string;          // Additive adjustment
  color?: string;
  align?: 'left' | 'center' | 'right';
  justify?: 'left' | 'center' | 'right';

  // Constraints
  oneLine?: boolean;
  bounded?: boolean;
  noVerticalCenter?: boolean;

  // Special modes
  manaCost?: boolean;
  vertical?: 'top' | 'center' | 'bottom' | boolean;  // Legacy support for boolean
  horizontal?: 'left' | 'center' | 'right';
  allCaps?: boolean;

  // Mana-specific
  manaSpacing?: number;       // Fractional
  manaPrefix?: string;
  manaImageScale?: number;
  manaPlacement?: {
    x: number[];
    y: number[];
  };
  manaLayout?: Array<{
    max: number;
    size: number;
    pos: Array<[number, number]>;
  }>;

  // Shadow
  shadow?: string;
  shadowX?: number;           // Fractional
  shadowY?: number;           // Fractional
  shadowBlur?: number;        // Fractional

  // Outline
  outlineWidth?: number;      // Fractional
  outlineColor?: string;
  lineCap?: CanvasLineCap;
  lineJoin?: CanvasLineJoin;

  // Arc text (curved)
  arcRadius?: number;         // Fractional
  arcStart?: number;

  // Rotation
  rotation?: number;

  // Spacing
  lineSpacing?: number;
  kerning?: number;           // Fractional

  // Color conditions
  conditionalColor?: string;

  // Mana symbol color
  manaSymbolColor?: string;
}

/**
 * Scaling helpers injected from card/pack
 */
export interface PackMetrics {
  cardWidth: number;
  cardHeight: number;
  marginX: number;
  marginY: number;
  scaleX: (n: number) => number;
  scaleY: (n: number) => number;
  scaleWidth: (n: number) => number;
  scaleHeight: (n: number) => number;
}

/**
 * Symbol atlas entry
 */
export interface SymbolInfo {
  name: string;
  path: string;
  image: HTMLImageElement;
  width: number;             // Size multiplier
  height: number;            // Size multiplier
  matchColor: boolean;       // Should match text color
  back?: string;             // Randomized back image pattern
  backs?: number;            // Number of back variants
}

/**
 * Render options
 */
export interface RenderOptions {
  hideReminderText?: boolean;
  italicizeReminderText?: boolean;
  hideBottomInfoBorder?: boolean;
  cardName?: string;
  cardNickname?: string;
  frames?: Array<{ name: string }>;
  version?: string;
  showsFlavorBar?: boolean;
}

/**
 * Layout result (output of layout pass)
 */
export interface LayoutResult {
  lines: Line[];
  overflow: boolean;
  finalTextSize: number;
  widestLineWidth: number;
  totalHeight: number;
  verticalAdjust: number;
  horizontalAdjust: number;
  absoluteSymbols?: SymbolGlyph[];  // Symbols with absolute positioning (e.g. manaPlacement)
}

/**
 * A single line of text
 */
export interface Line {
  glyphs: Glyph[];
  y: number;                 // Relative to field top
  width: number;
  align: 'left' | 'center' | 'right';
}

/**
 * Base glyph type
 */
export type Glyph = TextGlyph | SymbolGlyph | SpaceGlyph | CommandGlyph;

/**
 * Text glyph (rendered character)
 */
export interface TextGlyph {
  type: 'text';
  text: string;
  x: number;                 // Relative to line start
  y: number;                 // Baseline offset within line
  width: number;
  style: TextStyle;
}

/**
 * Symbol glyph (mana icon, etc.)
 */
export interface SymbolGlyph {
  type: 'symbol';
  symbol: SymbolInfo;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;            // Override color
  hasOutline: boolean;
  backImage?: HTMLImageElement;

  // Arc support
  radius?: number;
  arcStart?: number;
  currentX?: number;

  // Effects
  outlineWidth: number;
  outlineColor: string;
  shadowColor: string;
  shadowOffsetX: number;
  shadowOffsetY: number;
  shadowBlur: number;
}

/**
 * Space glyph (for alignment)
 */
export interface SpaceGlyph {
  type: 'space';
  width: number;
}

/**
 * Command glyph (layout-only, not rendered)
 */
export interface CommandGlyph {
  type: 'command';
  command: string;
  params?: string[];
}

/**
 * Kerning table (font-specific)
 */
export interface KerningTable {
  [pair: string]: number;    // e.g., "AV" -> -0.05
}

/**
 * Font metrics
 */
export interface FontMetrics {
  baseline: number;          // Ratio of baseline to font size
  lineHeight: number;        // Default line height multiplier
  kerning?: KerningTable;
}

/**
 * Layout state (internal, mutable during layout)
 */
export interface LayoutState {
  currentX: number;
  currentY: number;
  lineY: number;
  startingCurrentX: number;
  textSize: number;
  newLineSpacing: number;
  widestLineWidth: number;

  // Style stack
  style: TextStyle;

  // Command state
  savedTextXPosition: number;
  savedTextXPosition2: number;
  savedRollYPosition: number | null;
  savedRollColor: string;
  savedFont: string | null;

  // Shifts
  ptShift: [number, number];
  permaShift: [number, number];

  // Flags
  fillJustify: boolean;
  justifyWidth: number;
  realTextAlign: 'left' | 'center' | 'right';

  // Mana
  manaPlacementCounter: number;
  manaSymbolColor: string | null;

  // Arc
  arcRadius: number;
  arcStart: number;

  // Rotation
  rotation: number;

  // Target
  drawToPrePTCanvas: boolean;
}

/**
 * Canvas references for text rendering
 */
export interface TextCanvasRefs {
  paragraph: HTMLCanvasElement;
  line: HTMLCanvasElement;
  prePT: HTMLCanvasElement;
}

/**
 * Token handler plugin (extensible)
 */
export interface TokenHandler {
  pattern: RegExp;
  handle: (match: string, state: LayoutState, options: RenderOptions) => void | string;
}
