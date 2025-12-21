/**
 * AutoFrame Type Definitions
 *
 * Types for the automatic frame generation system.
 * Based on legacy autoFrame.js from PR173.
 *
 * The AutoFrame system automatically selects and layers appropriate frame
 * components based on card properties (colors, types, legendary status, etc.).
 *
 * @module types/autoFrame.types
 */

// ============================================================================
// Color and Style Types
// ============================================================================

/**
 * Single-character color letters used by the frame system.
 * - W = White
 * - U = Blue
 * - B = Black
 * - R = Red
 * - G = Green
 * - M = Multicolored
 * - A = Artifact
 * - L = Land
 * - C = Colorless
 * - V = Vehicle
 */
export type ColorLetter = 'W' | 'U' | 'B' | 'R' | 'G' | 'M' | 'A' | 'L' | 'C' | 'V';

/**
 * Extended color letters that include land and enchantment variants.
 * Used by frame types that have special variants for lands/enchantments.
 * - WL = White Land, UL = Blue Land, etc.
 * - WE = White Enchantment, UE = Blue Enchantment, etc.
 */
export type ExtendedColorLetter =
  | ColorLetter
  | 'WL' | 'UL' | 'BL' | 'RL' | 'GL' | 'ML'
  | 'WE' | 'UE' | 'BE' | 'RE' | 'GE' | 'ME' | 'AE';

/**
 * Frame style variants.
 * - regular: Standard frame style
 * - Nyx: Enchantment creature/artifact style with starfield
 * - snow: Snow permanent style
 * - ub: Universes Beyond style
 * - ubnyx: Universes Beyond + Nyx combined
 * - fullart: Full art style
 */
export type AutoFrameStyle = 'regular' | 'Nyx' | 'snow' | 'ub' | 'ubnyx' | 'fullart';

/**
 * Supported frame types that can be auto-generated.
 * Each type corresponds to a specific frame pack and builder configuration.
 */
export type AutoFrameType =
  | 'M15Regular-1'
  | 'M15RegularNew'
  | 'M15Eighth'
  | 'UB'
  | 'UBNew'
  | 'Circuit'
  | 'Etched'
  | 'Praetors'
  | 'Seventh'
  | 'M15BoxTopper'
  | 'M15ExtendedArtShort'
  | '8th'
  | 'Borderless'
  | 'BorderlessUB'
  | 'M15EighthUB'
  | 'FullArtNew'
  | 'JapanShowcase'
  | 'Vault'
  | 'Adventure'
  | 'Omen';

// ============================================================================
// Frame Name Mappings
// ============================================================================

/**
 * Standard color letter to display name mapping.
 * Used for generating human-readable frame layer names.
 */
export type StandardFrameNames = Record<string, string>;

/**
 * Extended color letter to display name mapping.
 * Includes enchantment variants for Nyx-style frames.
 */
export type ExtendedFrameNames = Record<string, string>;

// ============================================================================
// Bounds Definitions
// ============================================================================

/**
 * Normalized bounds for frame elements (0-1 coordinate space).
 * Values may exceed 0-1 for elements that extend beyond card edges.
 */
export interface FrameElementBounds {
  /** X position (normalized 0-1) */
  x: number;
  /** Y position (normalized 0-1) */
  y: number;
  /** Width (normalized 0-1) */
  width: number;
  /** Height (normalized 0-1) */
  height: number;
}

/**
 * Bounds configuration for different frame element types.
 * Each frame type may have different bounds for its elements.
 */
export interface FrameBoundsConfig {
  /** Crown bounds for legendary frames */
  crown?: FrameElementBounds;
  /** Border cover layer under crowns (hides frame border) */
  crownBorderCover?: FrameElementBounds;
  /** Crown outline for floating crown styles (Borderless, Extended Art) */
  crownOutline?: FrameElementBounds;
  /** Inner crown bounds (Nyx starfield pattern inside crown) */
  innerCrown?: FrameElementBounds;
  /** Power/Toughness box bounds */
  pt?: FrameElementBounds;
  /** Holo stamp bounds */
  stamp?: FrameElementBounds;
  /** Plain holo stamp bounds (used by Vault frames) */
  plainStamp?: FrameElementBounds;
}

// ============================================================================
// Function Types
// ============================================================================

/**
 * Result of letter transformation.
 * Letter transforms can modify the letter, style, or provide a display name.
 */
export interface LetterTransformResult {
  /** Transformed letter (may be modified from input) */
  letter: string;
  /** Optionally modified style */
  style?: AutoFrameStyle | string;
  /** Display name for the frame (may differ from letter) */
  frameName?: string;
}

/**
 * Letter transformation function type.
 * Transforms color letters based on context (mask type, style, etc.).
 *
 * @param letter - The color letter to transform
 * @param mask - The mask type being applied (or false for main frame)
 * @param style - The current frame style
 * @returns Transformed letter string or full transform result object
 *
 * @example
 * // Strip land indicator 'L' for crown masks
 * letterTransform('WL', 'Crown', 'regular') // Returns 'W'
 *
 * // Convert to enchantment variant for Nyx style
 * letterTransform('W', false, 'Nyx') // Returns { letter: 'WE', style: 'ub' }
 */
export type LetterTransformFunction = (
  letter: string,
  mask?: string | boolean,
  style?: AutoFrameStyle | string
) => string | LetterTransformResult;

/**
 * Path builder function type.
 * Builds asset paths for frame elements based on letter, mask, and style.
 *
 * @param letter - The color letter
 * @param mask - The mask type (e.g., 'Crown', 'PT', 'Stamp') or false for main frame
 * @param style - The frame style variant
 * @param extraParam - Additional parameter (varies by frame type)
 * @returns Path string or null if element doesn't exist
 *
 * @example
 * pathBuilder('W', 'Crown', 'regular') // Returns 'crowns/m15CrownW.png'
 * pathBuilder('M', false, 'Nyx') // Returns 'nyx/m.png'
 */
export type PathBuilderFunction = (
  letter: string,
  mask: string | boolean,
  style: AutoFrameStyle | string,
  extraParam?: unknown
) => string | null;

/**
 * Mask path builder function type.
 * Builds paths for mask assets (position masks like Title, Type, Rules, etc.).
 *
 * @param mask - The mask name (e.g., 'Title', 'Type', 'Rules', 'Pinline')
 * @param extraParam - Additional parameter (varies by frame type)
 * @param letter - Optional letter for letter-specific masks
 * @returns Path string or null if mask doesn't exist
 *
 * @example
 * maskPath('Title') // Returns 'regular/m15MaskTitle.png'
 * maskPath('Pinline') // Returns null (for frames without separate pinline mask)
 */
export type MaskPathFunction = (
  mask: string,
  extraParam?: unknown,
  letter?: string
) => string | null;

// ============================================================================
// Configuration Interfaces
// ============================================================================

/**
 * Configuration for a frame type (defines how to build frames of this type).
 * Each supported AutoFrameType has a corresponding FrameTypeConfig.
 */
export interface FrameTypeConfig {
  /** Frame group ID in the UI (e.g., 'Standard-3', 'Showcase-5') */
  group: string;

  /** Builder function for this frame type */
  makeFrameFunction: FrameBuilderFunction;

  /** Whether this frame type supports legendary crowns */
  supportsCrown: boolean;

  /** Whether this frame type supports power/toughness boxes */
  supportsPT: boolean;

  /** Whether this frame type supports holo stamps */
  supportsStamp: boolean;

  /**
   * Filter function to determine which frames should be preserved during auto-build.
   * Typically preserves Extension frames and existing stamps.
   *
   * @param frame - Frame object with at least a name property
   * @returns true if frame should be preserved, false if it should be replaced
   */
  filterFrames: (frame: { name: string }) => boolean;
}

/**
 * Letter-based configuration for frame variants.
 * Defines paths, bounds, and transformations for each color letter variant.
 */
export interface FrameLetterConfig {
  /** Mapping of color letters to display names */
  frameNames: Record<string, string>;

  /** Base path for frame assets (relative to public/img/frames/) */
  basePath: string;

  /** Bounds for frame elements (crown, PT, stamp, etc.) */
  bounds: FrameBoundsConfig;

  /** Function to build paths for frame assets */
  pathBuilder: PathBuilderFunction;

  /** Function to build paths for mask assets */
  maskPath: MaskPathFunction;

  /** Optional letter transformation function */
  letterTransform?: LetterTransformFunction;
}

// ============================================================================
// Frame Builder Types
// ============================================================================

/**
 * Mask definition for a frame created by the builder.
 */
export interface AutoFrameMask {
  /** Image source path */
  src: string;
  /** Display name of the mask */
  name: string;
}

/**
 * Frame object created by builder functions.
 * This is the output format before conversion to the full Frame type.
 */
export interface AutoFrameResult {
  /** Display name of the frame layer */
  name: string;
  /** Image source path */
  src: string;
  /** Masks applied to this frame */
  masks: AutoFrameMask[];
  /** Bounds for the frame element (normalized coordinates) */
  bounds?: FrameElementBounds;
  /** If true, frame erases underlying layers (destination-out compositing) */
  erase?: boolean;
}

/**
 * Frame builder function type.
 * Creates frame objects for a specific frame type.
 *
 * @param letter - Color letter(s) (W, U, B, R, G, M, A, L, C, V, or combinations like WL, WE)
 * @param mask - Mask type ('Crown', 'PT', 'Stamp', etc.) or false for main frame
 * @param maskToRightHalf - Whether to add right-half mask for multicolor cards
 * @param style - Frame style variant
 * @param extraParam - Additional parameter (varies by frame type)
 * @returns Frame result object or null if the element doesn't exist
 */
export type FrameBuilderFunction = (
  letter: string,
  mask?: string | boolean,
  maskToRightHalf?: boolean,
  style?: AutoFrameStyle | string,
  extraParam?: unknown
) => AutoFrameResult | null;

// ============================================================================
// Card Frame Properties
// ============================================================================

/**
 * Detected frame properties based on card attributes.
 * Used by the orchestrator to determine which frames to build.
 *
 * For multicolor cards, the "Right" variants are used for the second half
 * of split frames (right side of the card).
 */
export interface CardFrameProperties {
  /** Main frame color letter */
  frame: string;
  /** Right-half frame color (for multicolor cards, undefined for monocolor) */
  frameRight?: string;
  /** Pinline color letter (accent lines around text boxes) */
  pinline: string;
  /** Right-half pinline color (for multicolor cards) */
  pinlineRight?: string;
  /** Rules/text box background color letter */
  rules: string;
  /** Right-half rules color (for multicolor cards) */
  rulesRight?: string;
  /** Type/title bar color letter */
  typeTitle: string;
  /** Power/Toughness box color letter (null for non-creatures) */
  pt: string | null;
}

// ============================================================================
// Color Detection Types
// ============================================================================

/**
 * Mana color (subset of ColorLetter for actual mana colors only).
 */
export type ManaColor = 'W' | 'U' | 'B' | 'R' | 'G';

/**
 * Result of color detection from card properties.
 */
export interface ColorDetectionResult {
  /** Detected colors in WUBRG order */
  colors: ManaColor[];
  /** Whether the card is multicolored (2+ colors) */
  isMulticolor: boolean;
  /** Whether the card is colorless (0 colors, not artifact) */
  isColorless: boolean;
  /** Whether the card is a land */
  isLand: boolean;
}

// ============================================================================
// AutoFrame State (for store integration)
// ============================================================================

/**
 * AutoFrame feature state for Zustand store.
 */
export interface AutoFrameState {
  /** Whether auto frame feature is enabled */
  enabled: boolean;
  /** Currently selected frame type (null if none selected) */
  frameType: AutoFrameType | null;
  /** Whether to always use Nyx style for all enchantments (not just creatures/artifacts) */
  alwaysNyx: boolean;
  /** Last detected colors from card properties */
  detectedColors: ManaColor[];
  /** Last computed frame properties (null if not yet computed) */
  frameProperties: CardFrameProperties | null;
}

/**
 * AutoFrame actions for Zustand store.
 */
export interface AutoFrameActions {
  /** Enable or disable auto frame feature */
  setAutoFrameEnabled: (enabled: boolean) => void;
  /** Set the frame type to use for auto generation */
  setAutoFrameType: (type: AutoFrameType | null) => void;
  /** Set whether to always use Nyx style for enchantments */
  setAlwaysNyx: (value: boolean) => void;
  /** Trigger a rebuild of the auto-generated frames */
  triggerAutoFrameRebuild: () => void;
}

// ============================================================================
// Frame Type Information (for UI)
// ============================================================================

/**
 * Information about a frame type for display in UI.
 */
export interface FrameTypeInfo {
  /** Frame type identifier */
  id: AutoFrameType;
  /** Display label for the frame type */
  label: string;
  /** Frame group this type belongs to */
  group: string;
  /** Whether this type supports legendary crowns */
  supportsCrown: boolean;
  /** Whether this type supports PT boxes */
  supportsPT: boolean;
  /** Whether this type supports holo stamps */
  supportsStamp: boolean;
}

// ============================================================================
// Constants
// ============================================================================

/**
 * Standard frame names mapping.
 * Maps color letters to human-readable display names.
 */
export const STANDARD_FRAME_NAMES: StandardFrameNames = {
  W: 'White',
  U: 'Blue',
  B: 'Black',
  R: 'Red',
  G: 'Green',
  M: 'Multicolored',
  A: 'Artifact',
  L: 'Land',
  C: 'Colorless',
  V: 'Vehicle',
  WL: 'White Land',
  UL: 'Blue Land',
  BL: 'Black Land',
  RL: 'Red Land',
  GL: 'Green Land',
  ML: 'Multicolored Land',
};

/**
 * Extended frame names mapping.
 * Includes enchantment variants for Nyx-style frames.
 */
export const EXTENDED_FRAME_NAMES: ExtendedFrameNames = {
  ...STANDARD_FRAME_NAMES,
  WE: 'White Enchantment',
  UE: 'Blue Enchantment',
  BE: 'Black Enchantment',
  RE: 'Red Enchantment',
  GE: 'Green Enchantment',
  ME: 'Multicolored Enchantment',
  AE: 'Artifact Enchantment',
};

/**
 * List of all supported auto frame types with metadata.
 */
export const AUTO_FRAME_TYPES: FrameTypeInfo[] = [
  { id: 'M15Regular-1', label: 'Regular', group: 'Standard-3', supportsCrown: true, supportsPT: true, supportsStamp: false },
  { id: 'M15RegularNew', label: 'Regular (Accurate)', group: 'Accurate', supportsCrown: true, supportsPT: true, supportsStamp: false },
  { id: 'M15Eighth', label: 'M15 Eighth', group: 'Custom', supportsCrown: true, supportsPT: true, supportsStamp: false },
  { id: 'UB', label: 'Universes Beyond', group: 'Showcase-5', supportsCrown: true, supportsPT: true, supportsStamp: true },
  { id: 'UBNew', label: 'Universes Beyond (Accurate)', group: 'Accurate', supportsCrown: true, supportsPT: true, supportsStamp: true },
  { id: 'Circuit', label: 'Circuit', group: 'Custom', supportsCrown: true, supportsPT: true, supportsStamp: false },
  { id: 'Etched', label: 'Etched', group: 'Showcase-5', supportsCrown: true, supportsPT: true, supportsStamp: true },
  { id: 'Praetors', label: 'Phyrexian', group: 'Showcase-5', supportsCrown: true, supportsPT: true, supportsStamp: false },
  { id: 'Seventh', label: '7th Edition', group: 'Misc-2', supportsCrown: false, supportsPT: false, supportsStamp: false },
  { id: 'M15BoxTopper', label: 'Extended Art', group: 'Showcase-5', supportsCrown: true, supportsPT: true, supportsStamp: false },
  { id: 'M15ExtendedArtShort', label: 'Extended Art (Shorter Textbox)', group: 'Showcase-5', supportsCrown: true, supportsPT: true, supportsStamp: false },
  { id: '8th', label: '8th Edition', group: 'Misc-2', supportsCrown: false, supportsPT: true, supportsStamp: false },
  { id: 'Borderless', label: 'Borderless (Alt)', group: 'Showcase-5', supportsCrown: true, supportsPT: true, supportsStamp: false },
  { id: 'BorderlessUB', label: 'Borderless (Alt) (UB)', group: 'Showcase-5', supportsCrown: true, supportsPT: true, supportsStamp: false },
  { id: 'M15EighthUB', label: 'M15 Eighth Universes Beyond', group: 'Custom', supportsCrown: true, supportsPT: true, supportsStamp: true },
  { id: 'FullArtNew', label: 'Full Art (Accurate)', group: 'Accurate', supportsCrown: true, supportsPT: true, supportsStamp: false },
  { id: 'JapanShowcase', label: 'Japan Showcase', group: 'Showcase-5', supportsCrown: false, supportsPT: true, supportsStamp: true },
  { id: 'Vault', label: 'Vault (BIG)', group: 'Showcase-5', supportsCrown: true, supportsPT: true, supportsStamp: true },
  { id: 'Adventure', label: 'Adventure', group: 'Showcase-5', supportsCrown: true, supportsPT: true, supportsStamp: false },
  { id: 'Omen', label: 'Omen', group: 'Showcase-5', supportsCrown: true, supportsPT: true, supportsStamp: false },
];

/**
 * Mana colors in WUBRG order (standard MTG color order).
 */
export const MANA_COLORS: ManaColor[] = ['W', 'U', 'B', 'R', 'G'];

/**
 * Right-half mask path used for multicolor card frames.
 */
export const RIGHT_HALF_MASK_PATH = '/img/frames/maskRightHalf.png';
