/**
 * AutoFrame Orchestrator
 *
 * Main orchestration logic that builds complete frames by layering
 * multiple frame elements (crowns, stamps, PT boxes, pinlines, etc.)
 * in the correct order. Handles special cases for different frame types.
 *
 * Ported from legacy autoFrame.js (PR173) Section 5.
 *
 * @module utils/autoFrame/orchestrator
 */

import type {
  AutoFrameType,
  AutoFrameStyle,
  AutoFrameResult,
  CardFrameProperties,
  ManaColor,
} from '../../types/autoFrame.types';
import { getFrameTypeConfig } from './config';
import { getBuilder } from './builders';
import {
  getCardFrameProperties,
  detectSecondaryColors,
  type FramePropertyStyle,
} from './colorDetection';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Input parameters for the auto frame orchestrator.
 */
export interface AutoFrameInput {
  /** The frame type to generate */
  frameType: AutoFrameType;
  /** Detected colors from the card */
  colors: ManaColor[];
  /** The card's mana cost string */
  manaCost: string;
  /** The card's type line */
  typeLine: string;
  /** Power/toughness string (empty if not a creature) */
  power: string;
  /** Whether "Always Nyx" option is enabled */
  alwaysNyx: boolean;
  /** Secondary mana cost (for Adventure/Omen cards) */
  secondaryManaCost?: string;
}

/**
 * Result of auto frame generation.
 */
export interface AutoFrameOutput {
  /** Generated frame layers in render order (bottom to top) */
  frames: AutoFrameResult[];
  /** The style that was determined */
  style: AutoFrameStyle | string;
  /** The computed frame properties */
  properties: CardFrameProperties;
  /** Whether vehicle PT text color adjustment is needed */
  needsVehiclePTColor: boolean;
}

// ============================================================================
// STYLE DETERMINATION
// ============================================================================

/**
 * Determines the frame style based on card type and frame type.
 *
 * @param frameType - The frame type identifier
 * @param typeLine - The card's type line
 * @param alwaysNyx - Whether "Always Nyx" option is enabled
 * @returns The determined style ('regular', 'Nyx', 'snow', etc.)
 */
export function determineStyle(
  frameType: AutoFrameType,
  typeLine: string,
  alwaysNyx: boolean
): AutoFrameStyle | string {
  const lowerType = typeLine.toLowerCase();
  const isEnchantmentCreature = lowerType.includes('enchantment creature');
  const isEnchantmentArtifact = lowerType.includes('enchantment artifact');
  const isEnchantment = lowerType.includes('enchantment');
  const isSnow = lowerType.includes('snow');

  // Universes Beyond frames have special Nyx handling
  if (frameType === 'UB' || frameType === 'UBNew') {
    if (isEnchantmentCreature || isEnchantmentArtifact || (alwaysNyx && isEnchantment)) {
      return frameType === 'UBNew' ? 'ubnyx' : 'Nyx';
    }
    return frameType === 'UBNew' ? 'ub' : 'regular';
  }

  // Frames that don't support style variants
  if (
    frameType === 'Seventh' ||
    frameType === '8th' ||
    frameType === 'Borderless' ||
    frameType === 'BorderlessUB'
  ) {
    return 'regular';
  }

  // Standard frames can be snow or Nyx
  if (isSnow) {
    return 'snow';
  }

  if (isEnchantmentCreature || isEnchantmentArtifact || (alwaysNyx && isEnchantment)) {
    return 'Nyx';
  }

  return 'regular';
}

/**
 * Maps frame types to their property style for getCardFrameProperties.
 */
function getPropertyStyle(frameType: AutoFrameType): FramePropertyStyle {
  switch (frameType) {
    case 'Borderless':
    case 'BorderlessUB':
      return 'Borderless';
    case 'Etched':
      return 'Etched';
    case 'Seventh':
      return 'Seventh';
    case 'Praetors':
      return 'Phyrexian';
    default:
      return 'default';
  }
}

// ============================================================================
// SPECIAL FRAME TYPE HANDLERS
// ============================================================================

/**
 * Applies Vault-specific property overrides for two-color cards.
 * Vault uses split colors instead of multicolor for 2-color cards.
 */
function applyVaultOverrides(
  properties: CardFrameProperties,
  colors: ManaColor[]
): CardFrameProperties {
  if (colors.length === 2) {
    return {
      ...properties,
      frame: colors[0],
      frameRight: colors[1],
      rules: colors[0],
      rulesRight: colors[1],
    };
  }
  return properties;
}

/**
 * Applies Japan Showcase-specific property overrides.
 * PT boxes use the second color for 2-color cards.
 */
function applyJapanShowcaseOverrides(
  properties: CardFrameProperties,
  colors: ManaColor[]
): CardFrameProperties {
  if (colors.length === 2 && properties.pt) {
    return {
      ...properties,
      pt: colors[1],
    };
  }
  return properties;
}

// ============================================================================
// FRAME LAYER BUILDERS
// ============================================================================

/**
 * Builds legendary crown layers.
 */
function buildCrownLayers(
  frameType: AutoFrameType,
  properties: CardFrameProperties,
  style: AutoFrameStyle | string,
  builderType: string
): AutoFrameResult[] {
  const frames: AutoFrameResult[] = [];
  const builder = getBuilder(builderType);
  if (!builder) return frames;

  // Add inner Nyx starfield crowns for enchantments
  if (style === 'Nyx') {
    if (properties.pinlineRight) {
      const innerCrownRight = builder(properties.pinlineRight, 'Inner Crown', true, style);
      if (innerCrownRight) frames.push(innerCrownRight);
    }
    const innerCrown = builder(properties.pinline, 'Inner Crown', false, style);
    if (innerCrown) frames.push(innerCrown);
  }

  // Add main legendary crowns (multicolor gets split left/right)
  if (properties.pinlineRight) {
    const crownRight = builder(properties.pinlineRight, 'Crown', true, style);
    if (crownRight) frames.push(crownRight);
  }
  const crown = builder(properties.pinline, 'Crown', false, style);
  if (crown) frames.push(crown);

  // Borderless and Extended Art frames need a special crown outline layer
  const needsCrownOutline =
    frameType === 'Borderless' ||
    frameType === 'BorderlessUB' ||
    frameType === 'M15BoxTopper' ||
    frameType === 'M15ExtendedArtShort';

  if (needsCrownOutline) {
    frames.push({
      name: 'Legend Crown Outline',
      src: '/img/frames/m15/crowns/m15CrownFloatingOutline.png',
      masks: [],
      bounds: { x: 0.028, y: 0.0172, width: 0.944, height: 0.1062 },
    });
  }

  // Crown border cover hides the border under the crown (not used for Vault)
  if (frameType !== 'Vault') {
    const crownBorderCover = builder(properties.pinline, 'Crown Border Cover', false, style);
    if (crownBorderCover) {
      // Borderless uses erase blend mode to cut through layers below
      if (frameType === 'Borderless' || frameType === 'BorderlessUB') {
        crownBorderCover.erase = true;
      }
      frames.push(crownBorderCover);
    }
  }

  return frames;
}

/**
 * Builds holo stamp layers for M15EighthUB frame type.
 */
function buildM15EighthUBStampLayers(
  properties: CardFrameProperties,
  style: AutoFrameStyle | string,
  typeLine: string,
  builderType: string
): AutoFrameResult[] {
  const frames: AutoFrameResult[] = [];
  const builder = getBuilder(builderType);
  if (!builder) return frames;

  const isLand = typeLine.toLowerCase().includes('land');
  const isMulticolor = !!properties.pinlineRight;

  if (isLand || isMulticolor) {
    // Add colored stamp pinlines (masks that tint the base stamp)
    if (isMulticolor && properties.pinlineRight) {
      // Right half of multicolor stamp (strip land indicator 'L')
      const rightColor = properties.pinlineRight.replace(/L/gi, '');
      const stampPinlineRight = builder(rightColor, 'Stamp Pinline', true, style);
      if (stampPinlineRight) frames.push(stampPinlineRight);
    }

    // Left half (or full stamp for monocolor lands) - strip land indicator
    const leftColor = properties.pinline.replace(/L/gi, '');
    const stampPinline = builder(leftColor, 'Stamp Pinline', false, style);
    if (stampPinline) frames.push(stampPinline);

    // Add the base stamp (land='l', multicolor='m' calculated from pinline combo)
    const baseStampLetter = isLand ? 'l' : properties.pinline + (properties.pinlineRight ?? '');
    const stamp = builder(baseStampLetter, 'Stamp', false, style);
    if (stamp) frames.push(stamp);
  } else {
    // Single color non-land: use standard colored stamp
    const stamp = builder(properties.pinline, 'Stamp', false, style);
    if (stamp) frames.push(stamp);
  }

  return frames;
}

/**
 * Builds holo stamp layers for Vault frame type.
 */
function buildVaultStampLayers(
  properties: CardFrameProperties,
  style: AutoFrameStyle | string,
  builderType: string
): AutoFrameResult[] {
  const frames: AutoFrameResult[] = [];
  const builder = getBuilder(builderType);
  if (!builder) return frames;

  // Add colored stamp overlays first (bottom of stack)
  if (properties.pinlineRight) {
    const stampRight = builder(properties.pinlineRight, 'Stamp', true, style);
    if (stampRight) frames.push(stampRight);
  }
  const stamp = builder(properties.pinline, 'Stamp', false, style);
  if (stamp) frames.push(stamp);

  // Plain holo stamp on top of the stack
  const plainStamp = builder('plain', 'Plain Stamp', false, style);
  if (plainStamp) frames.push(plainStamp);

  return frames;
}

/**
 * Builds standard holo stamp layers.
 */
function buildStandardStampLayers(
  properties: CardFrameProperties,
  style: AutoFrameStyle | string,
  builderType: string
): AutoFrameResult[] {
  const frames: AutoFrameResult[] = [];
  const builder = getBuilder(builderType);
  if (!builder) return frames;

  if (properties.pinlineRight) {
    const stampRight = builder(properties.pinlineRight, 'Stamp', true, style);
    if (stampRight) frames.push(stampRight);
  }
  const stamp = builder(properties.pinline, 'Stamp', false, style);
  if (stamp) frames.push(stamp);

  return frames;
}

/**
 * Builds holo stamp layers for Etched frame type.
 * Uses Land Holo Stamp instead of Artifact.
 */
function buildEtchedStampLayers(
  properties: CardFrameProperties,
  style: AutoFrameStyle | string,
  builderType: string
): AutoFrameResult[] {
  const frames: AutoFrameResult[] = [];
  const builder = getBuilder(builderType);
  if (!builder) return frames;

  // Etched uses 'L' (Land) stamp instead of 'A' (Artifact)
  const stampColor = properties.pinline === 'A' ? 'L' : properties.pinline;
  const stampColorRight = properties.pinlineRight === 'A' ? 'L' : properties.pinlineRight;

  if (stampColorRight) {
    const stampRight = builder(stampColorRight, 'Stamp', true, style);
    if (stampRight) frames.push(stampRight);
  }
  const stamp = builder(stampColor, 'Stamp', false, style);
  if (stamp) frames.push(stamp);

  return frames;
}

/**
 * Builds Adventure-specific rules layers.
 */
function buildAdventureRulesLayers(
  secondaryManaCost: string | undefined,
  style: AutoFrameStyle | string,
  builderType: string
): AutoFrameResult[] {
  const frames: AutoFrameResult[] = [];
  const builder = getBuilder(builderType);
  if (!builder || !secondaryManaCost) return frames;

  const adventureColors = detectSecondaryColors(secondaryManaCost);

  if (adventureColors.length === 1) {
    // Single color adventure: use Rules (Left) with that color
    const rulesLeft = builder(adventureColors[0], 'Rules (Left)', false, style);
    if (rulesLeft) frames.push(rulesLeft);
  } else if (adventureColors.length >= 2) {
    // Multicolor adventure: multicolor mask first, then base color on top
    const rulesLeftMulti = builder(adventureColors[1], 'Rules (Left, Multicolor)', false, style);
    if (rulesLeftMulti) frames.push(rulesLeftMulti);
    const rulesLeft = builder(adventureColors[0], 'Rules (Left)', false, style);
    if (rulesLeft) frames.push(rulesLeft);
  }

  return frames;
}

/**
 * Builds Omen-specific mask layers.
 */
function buildOmenMaskLayers(
  secondaryManaCost: string | undefined,
  style: AutoFrameStyle | string,
  builderType: string
): AutoFrameResult[] {
  const frames: AutoFrameResult[] = [];
  const builder = getBuilder(builderType);
  if (!builder) return frames;

  let omenColors: ManaColor[] = [];

  if (secondaryManaCost) {
    omenColors = detectSecondaryColors(secondaryManaCost);
  }

  // If no colors detected, default to artifact
  if (omenColors.length === 0) {
    omenColors = ['W']; // Default to a color, 'A' isn't in ManaColor
  }

  if (omenColors.length === 1) {
    // Single color omen: use Omen mask with that color
    const omen = builder(omenColors[0], 'Omen', false, style);
    if (omen) frames.push(omen);
  } else if (omenColors.length >= 2) {
    // Multicolor omen: right half first, then base color on top
    const omenRight = builder(omenColors[1], 'Omen (Right Half)', false, style);
    if (omenRight) frames.push(omenRight);
    const omen = builder(omenColors[0], 'Omen', false, style);
    if (omen) frames.push(omen);
  }

  return frames;
}

/**
 * Builds Seventh Edition frame layers (different layer order).
 */
function buildSeventhEditionLayers(
  properties: CardFrameProperties,
  builderType: string
): AutoFrameResult[] {
  const frames: AutoFrameResult[] = [];
  const builder = getBuilder(builderType);
  if (!builder) return frames;

  if (properties.rulesRight) {
    const rulesRight = builder(properties.rulesRight, 'Rules', true);
    if (rulesRight) frames.push(rulesRight);
  }
  const rules = builder(properties.rules, 'Rules', false);
  if (rules) frames.push(rules);

  const frame = builder(properties.frame, 'Frame', false);
  if (frame) frames.push(frame);

  const textboxPinline = builder(properties.pinline, 'Textbox Pinline', false);
  if (textboxPinline) frames.push(textboxPinline);

  const border = builder(properties.frame, 'Border', false);
  if (border) frames.push(border);

  return frames;
}

/**
 * Builds standard modern frame layers (Title then Type for Frame Layer list order).
 */
function buildStandardFrameLayers(
  properties: CardFrameProperties,
  style: AutoFrameStyle | string,
  builderType: string
): AutoFrameResult[] {
  const frames: AutoFrameResult[] = [];
  const builder = getBuilder(builderType);
  if (!builder) return frames;

  // Title first (lower in Frame Layer list), then Type (higher in list)
  const title = builder(properties.typeTitle, 'Title', false, style);
  if (title) frames.push(title);
  const type = builder(properties.typeTitle, 'Type', false, style);
  if (type) frames.push(type);

  return frames;
}

/**
 * Builds border, frame, and rules layers (in that order for Frame Layer list display).
 * Border at bottom of list, Rules above Frame, etc.
 */
function buildRulesFrameBorderLayers(
  properties: CardFrameProperties,
  style: AutoFrameStyle | string,
  builderType: string
): AutoFrameResult[] {
  const frames: AutoFrameResult[] = [];
  const builder = getBuilder(builderType);
  if (!builder) return frames;

  // Border (bottom of Frame Layer list)
  const border = builder(properties.frame, 'Border', false, style);
  if (border) frames.push(border);

  // Frame
  if (properties.frameRight) {
    const frameRight = builder(properties.frameRight, 'Frame', true, style);
    if (frameRight) frames.push(frameRight);
  }
  const frame = builder(properties.frame, 'Frame', false, style);
  if (frame) frames.push(frame);

  // Rules (above Frame in list)
  if (properties.pinlineRight && properties.rulesRight) {
    const rulesRight = builder(properties.rulesRight, 'Rules', true, style);
    if (rulesRight) frames.push(rulesRight);
  }
  const rules = builder(properties.rules, 'Rules', false, style);
  if (rules) frames.push(rules);

  return frames;
}

// ============================================================================
// MAIN ORCHESTRATOR
// ============================================================================

/**
 * Builds a complete set of frame layers for a card.
 *
 * This is the main entry point for auto frame generation. It determines
 * the appropriate style, computes frame properties, and layers all frame
 * elements in the correct order.
 *
 * @param input - The auto frame input parameters
 * @returns The generated frames and metadata
 *
 * @example
 * const result = buildAutoFrame({
 *   frameType: 'M15Regular-1',
 *   colors: ['W', 'U'],
 *   manaCost: '{W}{U}',
 *   typeLine: 'Legendary Creature - Human',
 *   power: '2/2',
 *   alwaysNyx: false,
 * });
 * // result.frames contains all frame layers in render order
 */
export function buildAutoFrame(input: AutoFrameInput): AutoFrameOutput {
  const { frameType, colors, manaCost, typeLine, power, alwaysNyx, secondaryManaCost } = input;

  // Get frame type configuration
  const config = getFrameTypeConfig(frameType);
  if (!config) {
    console.error('Unknown frame type:', frameType);
    return {
      frames: [],
      style: 'regular',
      properties: {
        frame: 'C',
        pinline: 'C',
        rules: 'C',
        typeTitle: 'C',
        pt: null,
      },
      needsVehiclePTColor: false,
    };
  }

  const builderType = config.builderType;

  // Determine style (regular, Nyx, snow)
  const style = determineStyle(frameType, typeLine, alwaysNyx);

  // Get frame properties
  const propertyStyle = getPropertyStyle(frameType);
  let properties = getCardFrameProperties(colors, manaCost, typeLine, power, propertyStyle);

  // Apply frame-type-specific property overrides
  if (frameType === 'Vault') {
    properties = applyVaultOverrides(properties, colors);
  } else if (frameType === 'JapanShowcase') {
    properties = applyJapanShowcaseOverrides(properties, colors);
  }

  const frames: AutoFrameResult[] = [];
  const lowerTypeLine = typeLine.toLowerCase();
  const isLegendary = lowerTypeLine.includes('legendary');

  // ----------------------------------------------------------------
  // BUILD FRAME LAYERS
  // Order: Border, Frame, Rules, Title, Type, Pinline, Crown, PT, Stamp
  // (Last pushed = top of Frame Layer list)
  // ----------------------------------------------------------------

  // MAIN FRAME LAYERS
  if (frameType === 'Seventh') {
    // Seventh Edition has a different layer order
    frames.push(...buildSeventhEditionLayers(properties, builderType));
  } else {
    // First add: Rules, Frame, Border (bottom of list)
    frames.push(...buildRulesFrameBorderLayers(properties, style, builderType));

    // Adventure special handling
    if (frameType === 'Adventure') {
      frames.push(...buildAdventureRulesLayers(secondaryManaCost, style, builderType));
    }

    // Omen special handling
    if (frameType === 'Omen') {
      frames.push(...buildOmenMaskLayers(secondaryManaCost, style, builderType));
    }

    // Then add: Type, Title (above Rules/Frame/Border)
    frames.push(...buildStandardFrameLayers(properties, style, builderType));
  }

  // PINLINES (above Type/Title)
  const builder = getBuilder(builderType);
  if (builder) {
    if (properties.pinlineRight) {
      const pinlineRight = builder(properties.pinlineRight, 'Pinline', true, style);
      if (pinlineRight) frames.push(pinlineRight);
    }
    const pinline = builder(properties.pinline, 'Pinline', false, style);
    if (pinline) frames.push(pinline);
  }

  // LEGENDARY CROWNS (above Pinlines)
  if (config.supportsCrown && isLegendary) {
    frames.push(...buildCrownLayers(frameType, properties, style, builderType));
  }

  // POWER/TOUGHNESS BOX (above Crowns)
  if (config.supportsPT && properties.pt) {
    const ptBuilder = getBuilder(builderType);
    if (ptBuilder) {
      const pt = ptBuilder(properties.pt, 'PT', false, style);
      if (pt) frames.push(pt);
    }
  }

  // HOLO STAMPS (added last so they appear at the top of Frame Layer list)
  if (config.supportsStamp) {
    if (frameType === 'M15EighthUB') {
      frames.push(...buildM15EighthUBStampLayers(properties, style, typeLine, builderType));
    } else if (frameType === 'Vault') {
      frames.push(...buildVaultStampLayers(properties, style, builderType));
    } else if (frameType === 'Etched') {
      frames.push(...buildEtchedStampLayers(properties, style, builderType));
    } else {
      frames.push(...buildStandardStampLayers(properties, style, builderType));
    }
  }

  // Check if vehicle PT text color adjustment is needed
  const isVehicle = lowerTypeLine.includes('vehicle');
  const needsVehiclePTColor = isVehicle && !!power;

  return {
    frames,
    style,
    properties,
    needsVehiclePTColor,
  };
}

/**
 * Filters frames to preserve (extensions, stamps, etc.) based on frame type config.
 *
 * @param frameType - The frame type identifier
 * @param existingFrames - The current frames array
 * @returns Frames that should be preserved during rebuild
 */
export function getPreservedFrames(
  frameType: AutoFrameType,
  existingFrames: Array<{ name: string }>
): Array<{ name: string }> {
  const config = getFrameTypeConfig(frameType);
  if (!config) return [];

  return existingFrames.filter(config.filterFrames);
}

/**
 * Reverses frame order for rendering (frames are built bottom-to-top but rendered top-to-bottom).
 *
 * @param frames - The frames array
 * @returns Reversed frames array for rendering
 */
export function getFramesForRendering(frames: AutoFrameResult[]): AutoFrameResult[] {
  return [...frames].reverse();
}
