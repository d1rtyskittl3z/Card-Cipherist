/**
 * Card Conjurer - TypeScript Type Definitions
 * Port from creator-23.js vanilla JavaScript
 *
 * This file defines the core data structures for Card Conjurer.
 * Coordinates use normalized 0-1 range (relative to card dimensions).
 */
import type { StretchConfig } from '../components/frames/packs/types';
// Reserved for future typed coordinate API migration
// Removed in Phase 8 - coordinate types defined in coordinates.ts when needed
// type _NormalizedCoord = import('./coordinates').NormalizedCoord;

/**
 * Frame color override configuration
 * Controls how frame colors are determined (auto from card colors or manual override)
 */
export interface FrameColorOverride {
  /** Color determination mode: 'auto' uses card colors, 'manual' uses custom color */
  mode: 'auto' | 'manual';
  /** Color value (hex or CSS color string) */
  color: string;
  /** Source of the color: preset from frame pack or custom user selection */
  source?: 'preset' | 'custom';
}

/**
 * Normalized coordinate bounds
 * All coordinates are in 0-1 range (relative to card dimensions)
 * Values outside 0-1 are allowed for frames/masks that extend beyond card edges
 */
export interface CardBounds {
  /** X position (0-1, or beyond for margins) */
  x: number;
  /** Y position (0-1, or beyond for margins) */
  y: number;
  /** Width (0-1, or beyond for margins) */
  width: number;
  /** Height (0-1, or beyond for margins) */
  height: number;
  /** Optional rotation in degrees (used for portrait/tapped layouts) */
  rotation?: number;
}

/**
 * Frame mask definition
 * Masks are used to create complex frame shapes by compositing multiple images
 */
export interface Mask {
  /** Display name of the mask */
  name: string;
  /** Image source path (relative to public/) */
  src: string;
  /** Loaded image element */
  image: HTMLImageElement;
  /** Current bounds (normalized coordinates, may be transformed) */
  bounds?: CardBounds;
  /** Original bounds before any transformations */
  ogBounds?: CardBounds;
}

/**
 * Frame layer definition
 * Frames are composited together to create the final card appearance
 * Multiple frames with masks enable complex multi-color designs
 */
export interface Frame {
  /** Display name of the frame */
  name: string;
  /** Image source path (relative to public/) */
  src: string;
  /** Loaded image element (null if not yet loaded) */
  image: HTMLImageElement | null;
  /** Masks applied to this frame for advanced compositing */
  masks: Mask[];
  /** Current bounds (normalized coordinates, may be transformed) */
  bounds?: CardBounds;
  /** Original bounds before any transformations */
  ogBounds?: CardBounds;
  /** Frame opacity (0-1) */
  opacity: number;
  /** Canvas composite operation (e.g., 'multiply', 'screen') */
  mode?: GlobalCompositeOperation;
  /** If true, frame erases underlying layers */
  erase?: boolean;
  /** If true, preserves alpha channel during compositing */
  preserveAlpha?: boolean;
  /** Stretch configurations for Neo Basics and similar features */
  stretch?: StretchConfig[];
  /** Per-frame color overrides keyed by identifier */
  colorOverrides?: Record<string, FrameColorOverride>;
  /** Color overlay tint (hex or CSS color) */
  colorOverlay?: string;
  /** Whether color overlay is enabled */
  colorOverlayCheck?: boolean;
  /** HSL hue adjustment (-180 to 180) */
  hslHue?: number;
  /** HSL saturation adjustment (-100 to 100) */
  hslSaturation?: number;
  /** HSL lightness adjustment (-100 to 100) */
  hslLightness?: number;
  /** Frame visibility toggle */
  visible?: boolean;
  /** If true, frame is locked from editing */
  locked?: boolean;
  /** X position override (normalized) */
  x?: number;
  /** Y position override (normalized) */
  y?: number;
  /** Width override (normalized) */
  width?: number;
  /** Height override (normalized) */
  height?: number;
  /** Scale override */
  scale?: number;

  /** Original opacity for reset functionality */
  ogOpacity?: number;
  /** Original HSL hue for reset functionality */
  ogHslHue?: number;
  /** Original HSL saturation for reset functionality */
  ogHslSaturation?: number;
  /** Original HSL lightness for reset functionality */
  ogHslLightness?: number;
  /** Original color overlay for reset functionality */
  ogColorOverlay?: string;
  /** Original color overlay check state for reset functionality */
  ogColorOverlayCheck?: boolean;
  /** Original visibility state for reset functionality */
  ogVisible?: boolean;
  /** Original X position for reset functionality */
  ogX?: number;
  /** Original Y position for reset functionality */
  ogY?: number;
  /** Original width for reset functionality */
  ogWidth?: number;
  /** Original height for reset functionality */
  ogHeight?: number;
  /** Original scale for reset functionality */
  ogScale?: number;
  /** Flag indicating Neo Basics frame has been modified */
  neoBasicsModified?: boolean;
}

/**
 * Text field configuration
 * Defines text rendering properties for card text fields
 * All positions use normalized 0-1 coordinates
 */
export interface TextObject {
  /** Unique identifier for this text field */
  name: string;
  /** Text content (supports inline mana symbols like {W}, {2G}) */
  text: string;
  /** X position (normalized 0-1) */
  x: number;
  /** Y position (normalized 0-1) */
  y: number;
  /** Width (normalized 0-1) */
  width: number;
  /** Height (normalized 0-1) */
  height: number;
  /** Base font size in pixels */
  size: number;
  /** Font family name (e.g., 'Beleren', 'MPlantin') */
  font: string;
  /** Text color (hex or CSS color string) */
  color: string;
  /** Text horizontal alignment */
  align?: 'left' | 'center' | 'right';
  /** If true, forces text to single line (no wrapping) */
  oneLine?: boolean;
  /** Text outline width in pixels */
  outlineWidth?: number;
  /** Text outline color (hex or CSS color string) */
  outlineColor?: string;
  /** Font size adjustment factor */
  fontSizeAdjustment?: number;
  /** Prefix for mana symbol references (e.g., '/img/manaSymbols/') */
  manaPrefix?: string;
  /** Custom mana symbol placement coordinates */
  manaPlacement?: { x: number[]; y: number[] };
  /** If true, disables vertical centering of text */
  noVerticalCenter?: boolean;
  /** If true, field contains mana cost notation */
  manaCost?: boolean;
  /** Text shadow X offset in pixels */
  shadowX?: number;
  /** Text shadow Y offset in pixels */
  shadowY?: number;
  /** Text shadow color (hex or CSS color string) */
  shadowColor?: string;
  /** Spacing between mana symbols in pixels */
  manaSpacing?: number;
  /** Rotation applied to the entire text block */
  rotation?: number;
  /** If true, render text in all uppercase */
  allCaps?: boolean;
}

export interface ManaSymbol {
  name: string;
  path: string;
  image: HTMLImageElement;
  width: number;
  height: number;
  matchColor: boolean;
  back?: string;
  backs?: number;
}

export interface BottomInfo {
  [key: string]: TextObject;
}

export interface SagaInfo {
  abilities: number[];
  count: number;
  x: number;
  width: number;
}

export interface PlaneswalkerAbilityBounds {
  x: number;
  width: number;
}

export interface PlaneswalkerInfo {
  abilities: [string, string, string, string];
  abilityAdjust: [number, number, number, number];
  count: number;
  x: number;
  width: number;
  invert?: boolean;
  baseY?: number;
  originalAbilityBounds?: PlaneswalkerAbilityBounds[];
  defaultHeights?: [number, number, number, number];
  defaultAbilities?: [string, string, string, string];
  defaultAbilityAdjust?: [number, number, number, number];
}

export type StationColorMode =
  | 'auto'
  | 'white'
  | 'blue'
  | 'black'
  | 'red'
  | 'green'
  | 'multi'
  | 'colorless'
  | 'artifact'
  | 'land'
  | 'custom';

export interface StationSquare {
  width: number;
  height: number;
  x: number;
  y: number;
  enabled: boolean;
  color: string;
  opacity: number;
}

export interface StationBadgeSettings {
  fontSize: number;
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface StationTextPosition {
  x: number;
  y: number;
}

export interface StationTextOffset {
  x: number;
  y: number;
}

export interface StationPTSettings {
  fontSize: number;
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface StationColorSettingsEntry {
  square1: string;
  square2OpacityOffset: number;
}

export interface StationImportSettings {
  singleAbility: {
    yOffset: number;
    height1: number;
  };
  versionOverrides: Record<
    string,
    {
      yOffset?: number;
      height1?: number;
      minDistanceFromBottom?: number;
    }
  >;
}

export interface StationState {
  abilityCount: number;
  x: number;
  width: number;
  badgeX: number;
  badgeValues: [string, string, string];
  disableFirstAbility: boolean;
  disabledTextX: number;
  disabledTextWidth: number;
  importSettings: StationImportSettings;
  badgeSettings: StationBadgeSettings;
  squares: Record<1 | 2, StationSquare>;
  minDistanceFromBottom: number;
  baseTextPositions: {
    ability1: StationTextPosition;
    ability2: StationTextPosition;
  };
  textOffsets: Record<1 | 2, StationTextOffset>;
  ptSettings: StationPTSettings;
  colorModes: Record<1 | 2, StationColorMode>;
  ptColorMode: StationColorMode;
  badgeColorMode: StationColorMode;
  colorSettings: Record<string, StationColorSettingsEntry>;
  packDefaults: {
    ability: CardBounds;
  };
  borderlessXOffset?: number;
  badgeVariant?: string;
  ptVariant?: string;
}

/**
 * Main Card data structure
 * Contains all state for a single MTG card design
 *
 * IMPORTANT: marginX and marginY are auto-calculated via calculateRequiredMargins()
 * and should NEVER be set directly. They are derived from frame/mask bounds that
 * extend beyond the [0, 1] normalized coordinate space.
 */
export interface Card {
  /** Card width in pixels (default: 1500 for standard, 2814 for high-res) */
  width: number;
  /** Card height in pixels (default: 2100 for standard, 2010 for high-res) */
  height: number;
  /** Auto-calculated X margin (NEVER set directly, use calculateRequiredMargins) */
  marginX: number;
  /** Auto-calculated Y margin (NEVER set directly, use calculateRequiredMargins) */
  marginY: number;
  /** Frame layers (composited in order) */
  frames: Frame[];

  /** Art image source path or data URL */
  artSource: string;
  /** Art X offset from canvas center in pixels */
  artX: number;
  /** Art Y offset from canvas center in pixels */
  artY: number;
  /** Art zoom factor (1.0 = 100%) */
  artZoom: number;
  /** Art rotation in degrees */
  artRotate: number;
  /** If true, renders art in grayscale */
  artGrayscale?: boolean;

  /** Set symbol image source path */
  setSymbolSource: string;
  /** Set symbol X offset from canvas center in pixels */
  setSymbolX: number;
  /** Set symbol Y offset from canvas center in pixels */
  setSymbolY: number;
  /** Set symbol zoom factor (1.0 = 100%) */
  setSymbolZoom: number;
  /** Set symbol rotation in degrees */
  setSymbolRotate: number;

  /** Watermark image source path */
  watermarkSource: string;
  /** Watermark X offset from canvas center in pixels */
  watermarkX: number;
  /** Watermark Y offset from canvas center in pixels */
  watermarkY: number;
  /** Watermark zoom factor (1.0 = 100%) */
  watermarkZoom: number;
  /** Left watermark color for two-tone gradient */
  watermarkLeft: string;
  /** Right watermark color for two-tone gradient */
  watermarkRight: string;
  /** Watermark opacity (0-1) */
  watermarkOpacity: number;

  /** Frame pack version identifier (e.g., 'm15Regular', 'sagaNyx') */
  version: string;
  /** Array of mana symbol identifiers used in text (e.g., ['w', '2g']) */
  manaSymbols: string[];
  /** Text fields keyed by field name (must match loadedPack.text keys) */
  text?: { [key: string]: TextObject };
  /** Bottom info fields (collector number, artist, etc.) */
  bottomInfo?: BottomInfo;

  /** If true, card is rendered in landscape orientation */
  landscape?: boolean;
  /** If true, margins are enabled (usually auto-calculated) */
  margins?: boolean;

  /** Bottom info translation offset */
  bottomInfoTranslate?: { x: number; y: number };
  /** Bottom info rotation in degrees */
  bottomInfoRotate?: number;
  /** Bottom info zoom factor */
  bottomInfoZoom?: number;
  /** Bottom info text color override */
  bottomInfoColor?: string;
  /** If true, hides bottom info border */
  hideBottomInfoBorder?: boolean;
  /** If true, shows flavor text divider bar */
  showsFlavorBar?: boolean;

  /** Callback executed after card loads (not persisted) */
  onload?: (() => void) | null;

  /** Art bounds in normalized coordinates (from frame pack) */
  artBounds?: CardBounds;
  /** Set symbol bounds in normalized coordinates (from frame pack) */
  setSymbolBounds?: CardBounds;
  /** Watermark bounds in normalized coordinates (from frame pack) */
  watermarkBounds?: CardBounds;

  /** Copyright year for collector info */
  infoYear?: number;
  /** If true, shows collector info at bottom */
  showCollectorInfo?: boolean;
  /** Collector info style variant */
  collectorInfoStyle?: 'default' | 'new' | 'artist';

  /** Serial number (e.g., 123 in "123 / 456") */
  serialNumber?: string | number;
  /** Serial total (e.g., 456 in "123 / 456") */
  serialTotal?: string | number;
  /** Serial plate X position in pixels */
  serialX?: number;
  /** Serial plate Y position in pixels */
  serialY?: number;
  /** Serial plate scale factor */
  serialScale?: number;

  /** Saga-specific state (null for non-saga cards) */
  saga?: SagaInfo | null;
  /** Planeswalker-specific state (null for non-planeswalker cards) */
  planeswalker?: PlaneswalkerInfo | null;
  /** Station-specific state (null for non-station cards) */
  station?: StationState | null;
}

export interface FrameOption {
  name: string;
  src: string;
  noThumb?: boolean;
  onload?: () => void;
  complementary?: FrameOption[];
}

export interface ScryfallCard {
  name: string;
  mana_cost?: string;
  type_line?: string;
  oracle_text?: string;
  power?: string;
  toughness?: string;
  loyalty?: string;
  flavor_text?: string;
  artist?: string;
  set: string;
  collector_number?: string;
  rarity?: string;
  image_uris?: {
    art_crop?: string;
    large?: string;
  };
  card_faces?: Array<{
    name: string;
    image_uris?: {
      art_crop?: string;
    };
  }>;
}

export interface CanvasRefs {
  card: HTMLCanvasElement;
  frame: HTMLCanvasElement;
  frameMasking: HTMLCanvasElement;
  frameCompositing: HTMLCanvasElement;
  saga: HTMLCanvasElement;
  planeswalkerPre: HTMLCanvasElement;
  planeswalkerPost: HTMLCanvasElement;
  stationPre: HTMLCanvasElement;
  stationPost: HTMLCanvasElement;
  text: HTMLCanvasElement;
  paragraph: HTMLCanvasElement;
  line: HTMLCanvasElement;
  watermark: HTMLCanvasElement;
  bottomInfo: HTMLCanvasElement;
  guidelines: HTMLCanvasElement;
  prePT: HTMLCanvasElement;
  preview: HTMLCanvasElement;
}

export interface CanvasContextRefs {
  card: CanvasRenderingContext2D;
  frame: CanvasRenderingContext2D;
  frameMasking: CanvasRenderingContext2D;
  frameCompositing: CanvasRenderingContext2D;
  saga: CanvasRenderingContext2D;
  planeswalkerPre: CanvasRenderingContext2D;
  planeswalkerPost: CanvasRenderingContext2D;
  stationPre: CanvasRenderingContext2D;
  stationPost: CanvasRenderingContext2D;
  text: CanvasRenderingContext2D;
  paragraph: CanvasRenderingContext2D;
  line: CanvasRenderingContext2D;
  watermark: CanvasRenderingContext2D;
  bottomInfo: CanvasRenderingContext2D;
  guidelines: CanvasRenderingContext2D;
  prePT: CanvasRenderingContext2D;
  preview: CanvasRenderingContext2D;
}
