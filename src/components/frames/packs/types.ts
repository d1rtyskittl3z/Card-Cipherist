/**
 * Frame Pack Template Types
 * Defines the structure for frame pack data
 */

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
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
  complementary?: number | number[]; // Auto-add frame(s) at these indices when no masks are selected
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
  manaPlacement?: { x: number[]; y: number[] }; // Manual positioning for each mana symbol (manaCost only, max 6 symbols)
  noVerticalCenter?: boolean; // When used with manaPlacement, don't center align (used for custom layouts)
  vertical?: 'top' | 'center' | 'bottom' | boolean;
  horizontal?: 'left' | 'center' | 'right';
  shadowColor?: string;
  conditionalColor?: string; // Color adjustments based on frame/mask selections (e.g., '(Back):white' or 'Frame1,Frame2:black')
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

export interface FramePackTemplate {
  id: string;
  label: string;
  version?: string; // Optional for addon-only packs
  notice?: string;
  artBounds?: Bounds; // Optional for addon-only packs
  setSymbolBounds?: Bounds & {
    vertical?: 'top' | 'center' | 'bottom';
    horizontal?: 'left' | 'center' | 'right';
    outlineWidth?: number; // Stroke width around set symbol
    outlineColor?: string; // Stroke color around set symbol
  }; // Optional for addon-only packs
  watermarkBounds?: Bounds; // Optional for addon-only packs
  saga?: SagaPackConfig; // Optional Saga configuration (lore counter placement)
  planeswalker?: PlaneswalkerPackConfig; // Optional Planeswalker configuration (loyalty layout defaults)
  frames: FrameItem[];
  text?: {
    [key: string]: TextConfig;
  }; // Optional for addon-only packs (but can include special fields like nickname)
}

/**
 * Helper to get thumbnail path from frame/mask source
 */
export function getThumbnailPath(src: string): string {
  return src.replace('.png', 'Thumb.png').replace('.svg', 'Thumb.png');
}
