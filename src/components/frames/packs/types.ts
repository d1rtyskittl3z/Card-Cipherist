/**
 * Frame Pack Template Types
 * Defines the structure for frame pack data
 */

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
}

export interface Mask {
  src: string;
  name: string;
  bounds?: Bounds;
  ogBounds?: Bounds;
}

export interface StretchConfig {
  name: string;
  targets: number[];
  change: [number, number];
}

export interface FrameItem {
  name: string;
  src: string;
  masks?: Mask[];
  bounds?: Bounds;
  ogBounds?: Bounds;
  noDefaultMask?: boolean;
  opacity?: number; // Frame opacity (0-100, defaults to 100)
  complementary?: number | number[] | string | string[]; // Auto-add frame(s) at these indices or by name when no masks are selected
  erase?: boolean; // Use 'destination-out' compositing mode (removes pixels instead of drawing)
  preserveAlpha?: boolean; // Preserve alpha channel when applying color adjustments
  stretch?: StretchConfig[];
}

export interface TextConfig {
  name: string;
  text: string;
  x?: number;
  y?: number; // Optional when manaPlacement is used
  width?: number; // Optional when manaPlacement is used
  height?: number; // Optional when manaPlacement is used
  size: number;
  font?: string;
  oneLine?: boolean;
  align?: 'left' | 'center' | 'right';
  color?: string; // Text color (e.g., 'white', '#FFFFFF', 'rgb(255,255,255)')
  shadowX?: number;
  shadowY?: number;
  outlineWidth?: number; // Text outline/stroke width for better contrast
  outlineColor?: string; // Text outline color (defaults to auto-opposite of text color)
  manaCost?: boolean;
  manaSpacing?: number;
  manaPrefix?: string; // Alternative mana symbol directory (e.g., 'oilslick' → /img/manaSymbols/oilslick/oilslickw.svg)
  manaSymbolColor?: string; // Color override for mana symbols (e.g., '#24150E', 'white')
  manaPlacement?: { x: number[]; y: number[] }; // Manual positioning for each mana symbol (manaCost only, max 6 symbols)
  manaLayout?: Array<{ max: number; size: number; pos: Array<[number, number]> }>; // Dynamic mana positioning based on symbol count
  noVerticalCenter?: boolean; // When used with manaPlacement, don't center align (used for custom layouts)
  vertical?: 'top' | 'center' | 'bottom' | boolean;
  horizontal?: 'left' | 'center' | 'right';
  shadowColor?: string;
  conditionalColor?: string; // Color adjustments based on frame/mask selections (e.g., '(Back):white' or 'Frame1,Frame2:black')
  rotation?: number;
  allCaps?: boolean; // Render text in all uppercase
  kerning?: number; // Letter spacing adjustment
  lineSpacing?: number; // Line spacing adjustment (fractional multiplier of text size)
  italics?: boolean; // Render text in italic style
  bold?: boolean; // Render text in bold style
  fontStyle?: string; // CSS font-style prefix (e.g., 'bold', 'italic', 'italic bold')
  arcRadius?: number; // Curved text arc radius (fractional, e.g., 2 for cartoony title)
  arcStart?: number; // Arc starting position for curved text
  manaImageScale?: number; // Scale multiplier for mana symbol images in text (e.g., 10/7 for cartoony)
}

export interface SagaPackConfig {
  x: number;
  width: number;
  defaultAbilities?: number[];
  defaultCount?: number;
}

export interface PlaneswalkerPackConfig {
  x: number;
  width: number;
  defaultAbilities: [string, string, string, string];
  defaultAbilityAdjust?: [number, number, number, number];
  defaultHeights?: [number, number, number, number];
  invert?: boolean;
}

export interface ClassPackConfig {
  x: number;
  width: number;
  defaultHeights?: [number, number, number, number];
}

export interface QRCodePackConfig {
  x: number;
  y: number;
  size: number;
  fgColor: string;
  bgColor: string;
  bgAlpha: number;
}

export interface FramePackTemplate {
  id: string;
  label: string;
  version?: string; // Optional for addon-only packs
  notice?: string;
  canvasDimensions?: [number, number, number, number]; // Optional canvas dimensions [width, height, marginX, marginY] for special layouts (e.g., landscape packs)
  landscape?: boolean; // Optional flag for landscape orientation (rotated 90 degrees)
  artBounds?: Bounds; // Optional for addon-only packs
  artBounds2?: Bounds; // Specifically for the three packs that need a second slot for art
  setSymbolBounds?: Bounds & {
    vertical?: 'top' | 'center' | 'bottom';
    horizontal?: 'left' | 'center' | 'right';
    outlineWidth?: number; // Stroke width around set symbol
    outlineColor?: string; // Stroke color around set symbol
  }; // Optional for addon-only packs
  watermarkBounds?: Bounds; // Optional for addon-only packs
  saga?: SagaPackConfig; // Optional Saga configuration (lore counter placement)
  planeswalker?: PlaneswalkerPackConfig; // Optional Planeswalker configuration (loyalty layout defaults)
  class?: ClassPackConfig; // Optional Class configuration (level layout defaults)
  qrCode?: QRCodePackConfig; // Optional QR code configuration for deck cover packs
  replacementMasks?: Record<string, string>; // Optional position mask overrides (e.g., 'Right Half': '/img/custom/mask.png')
  collectorInfoScale?: number; // Optional scale multiplier for standard collector info text (default: 1.0)
  collectorInfoOffsets?: Record<string, { x: number; y: number }>; // Optional position offsets for standard collector info fields (normalized coordinates)
  frames: FrameItem[];
  text?: {
    [key: string]: TextConfig;
  }; // Optional for addon-only packs (but can include special fields like nickname)
  loadBottomInfo?: {
    [key: string]: TextConfig;
  }; // Optional original collector info configuration for legacy packs (Unhinged, 8th Edition, etc.)
  brush?: string; // Optional custom brush image path for \uFFEE symbol in loadBottomInfo (e.g., '/img/manaSymbols/brush.svg')
  brushWhite?: string; // Optional white/inverted brush for use when text color is white (e.g., '/img/manaSymbols/brushWhite.svg')
  brushScale?: number; // Optional scale multiplier for brush size (default 1.0, e.g., 1.5 = 50% larger)
}

/**
 * Helper to get thumbnail path from frame/mask source
 */
export function getThumbnailPath(src: string): string {
  return src.replace('.png', 'Thumb.png').replace('.svg', 'Thumb.png');
}
