/**
 * AutoFrame Builder Functions
 *
 * Frame builder functions that construct frame objects for the automatic
 * frame generation system. The unified builder handles all frame types
 * with type-specific wrapper functions for convenience.
 *
 * Ported from legacy autoFrame.js (PR173) lines 895-1190.
 *
 * @module utils/autoFrame/builders
 */

import type {
  AutoFrameStyle,
  AutoFrameResult,
  LetterTransformResult,
} from '../../types/autoFrame.types';
import { RIGHT_HALF_MASK_PATH } from '../../types/autoFrame.types';
import { getFrameLetterConfig } from './config';

// ============================================================================
// UNIFIED FRAME BUILDER
// ============================================================================

/**
 * Unified frame builder that creates frame objects for any frame type.
 *
 * This is the core function that all frame-specific builders delegate to.
 * It handles special frame elements (Crown, PT, Stamp, etc.) and main frame
 * construction with proper mask application.
 *
 * @param frameType - The frame type identifier (e.g., 'M15', 'UB', 'Borderless')
 * @param letter - Color letter(s) (W, U, B, R, G, M, A, L, C, V, or combinations)
 * @param mask - The mask type to apply ('Crown', 'PT', 'Stamp', etc.) or false for none
 * @param maskToRightHalf - Whether to mask to the right half (for multicolor cards)
 * @param style - Frame style variant ('regular', 'Nyx', 'snow', 'ub', etc.)
 * @param extraParam - Additional parameter (varies by frame type, e.g., universesBeyond flag, short flag)
 * @returns Frame object with name, src, masks, and bounds, or null if mask doesn't exist
 *
 * @example
 * // Create a basic white frame
 * makeFrameByLetterUnified('M15', 'W', false, false, 'regular');
 *
 * // Create a legendary crown for blue
 * makeFrameByLetterUnified('M15', 'U', 'Crown', false, 'regular');
 *
 * // Create a multicolor right-half frame
 * makeFrameByLetterUnified('M15', 'R', 'Pinline', true, 'regular');
 */
export function makeFrameByLetterUnified(
  frameType: string,
  letter: string,
  mask: string | boolean = false,
  maskToRightHalf: boolean = false,
  style: AutoFrameStyle | string = 'regular',
  extraParam: unknown = false
): AutoFrameResult | null {
  const config = getFrameLetterConfig(frameType);
  if (!config) {
    console.error('Unknown frame type for makeFrameByLetter:', frameType);
    return null;
  }

  // Normalize letter to uppercase
  let normalizedLetter = letter.toUpperCase();
  let currentStyle = style;
  let originalFrameName: string | undefined;

  // Apply letter transformation (handles stripping land/enchantment indicators, style changes, etc.)
  if (config.letterTransform) {
    const transformResult = config.letterTransform(normalizedLetter, mask, currentStyle);
    if (typeof transformResult === 'object') {
      const result = transformResult as LetterTransformResult;
      normalizedLetter = result.letter ?? normalizedLetter;
      currentStyle = result.style ?? currentStyle;
      originalFrameName = result.frameName;
    } else {
      normalizedLetter = transformResult;
    }
  }

  // Get human-readable frame name for display
  const frameNameKey = originalFrameName ?? normalizedLetter;
  const frameName = config.frameNames[frameNameKey] ?? frameNameKey;

  // ----------------------------------------------------------------
  // SPECIAL FRAME ELEMENT HANDLERS
  // ----------------------------------------------------------------

  // Crown Border Cover: Black layer that covers the border under legendary crowns
  if (mask === 'Crown Border Cover') {
    return {
      name: 'Legend Crown Border Cover',
      src: '/img/black.png',
      masks: [],
      bounds: config.bounds.crownBorderCover ?? {
        height: 0.0177,
        width: 0.9214,
        x: 0.0394,
        y: 0.0277,
      },
    };
  }

  // Crown Outline: Special case for ExtendedArt frames
  if (frameType === 'ExtendedArt') {
    if (mask === 'Legend Crown Outline' || mask === 'Crown Outline') {
      const frame: AutoFrameResult = {
        name: 'Legend Crown Outline',
        src: '/img/frames/m15/crowns/m15CrownFloatingOutline.png',
        masks: [],
        bounds: config.bounds.crownOutline,
      };
      if (maskToRightHalf) {
        frame.masks.push({ src: RIGHT_HALF_MASK_PATH, name: 'Right Half' });
      }
      return frame;
    }
  }

  // Legendary Crown
  if (mask === 'Crown') {
    const pathResult = config.pathBuilder(normalizedLetter, mask, currentStyle, extraParam);
    const frame: AutoFrameResult = {
      name: `${frameName} Legend Crown`,
      src: config.basePath + (pathResult ?? ''),
      masks: [],
      bounds: config.bounds.crown,
    };
    if (maskToRightHalf) {
      frame.masks.push({ src: RIGHT_HALF_MASK_PATH, name: 'Right Half' });
    }
    return frame;
  }

  // Inner Crown: The inner Nyx starfield pattern inside legendary crowns
  if (mask === 'Inner Crown') {
    const pathResult = config.pathBuilder(normalizedLetter, mask, currentStyle, extraParam);
    const frame: AutoFrameResult = {
      name: `${frameName} ${mask} (${currentStyle})`,
      src: config.basePath + (pathResult ?? ''),
      masks: [],
      bounds: config.bounds.innerCrown,
    };
    if (maskToRightHalf) {
      frame.masks.push({ src: RIGHT_HALF_MASK_PATH, name: 'Right Half' });
    }
    return frame;
  }

  // Holo Stamp
  if (mask === 'Stamp') {
    let stampLetter = normalizedLetter;

    // Special handling for M15EighthUB multicolor stamps
    // Multicolor stamps use 'm' as base and add color pinlines separately
    if (frameType === 'M15EighthUB') {
      // Check if this is a multicolor stamp (letter length > 1)
      // extraParam contains the full pinline for right-half stamps
      const fullPinline = (extraParam as string) || normalizedLetter;
      if (fullPinline && fullPinline.length > 1) {
        stampLetter = 'm'; // Force lowercase 'm' for multicolor base stamp
      }
    }

    const pathResult = config.pathBuilder(stampLetter, mask, currentStyle, extraParam);
    const frame: AutoFrameResult = {
      name: `${frameName} Holo Stamp`,
      src: config.basePath + (pathResult ?? ''),
      masks: [],
      bounds: config.bounds.stamp,
    };

    if (maskToRightHalf) {
      frame.masks.push({ src: RIGHT_HALF_MASK_PATH, name: 'Right Half' });
    }
    return frame;
  }

  // Plain Stamp: Base holo stamp for Vault frames
  if (mask === 'Plain Stamp') {
    const pathResult = config.pathBuilder(normalizedLetter, mask, currentStyle, extraParam);
    return {
      name: 'Plain Holo Stamp',
      src: config.basePath + (pathResult ?? ''),
      masks: [],
      bounds: config.bounds.plainStamp,
    };
  }

  // Stamp Pinline: Color overlay mask for M15EighthUB multicolor stamps
  // This applies a color tint through a pinline mask onto the base multicolor stamp
  if (mask === 'Stamp Pinline') {
    const frame: AutoFrameResult = {
      name: `${frameName} Stamp`,
      src: config.basePath + `custom/m15-eighth/ub/stamp/${normalizedLetter.toLowerCase()}.png`,
      masks: [
        {
          src: config.basePath + 'custom/m15-eighth/ub/stamp/pinline.png',
          name: 'Pinline',
        },
      ],
      bounds: config.bounds.stamp,
    };
    if (maskToRightHalf) {
      frame.masks.push({ src: RIGHT_HALF_MASK_PATH, name: 'Right Half' });
    }
    return frame;
  }

  // Power/Toughness Box: The P/T box for creatures
  if (mask === 'PT') {
    const pathResult = config.pathBuilder(normalizedLetter, mask, currentStyle, extraParam);
    return {
      name: `${frameName} Power/Toughness`,
      src: config.basePath + (pathResult ?? ''),
      masks: [],
      bounds: config.bounds.pt,
    };
  }

  // Omen Mask: Special overlay mask for Omen frame type - applies to colored base frame
  if (mask === 'Omen' || mask === 'Omen (Right Half)') {
    const maskPathResult = config.maskPath(mask);
    if (!maskPathResult) return null;

    const pathResult = config.pathBuilder(normalizedLetter, false, currentStyle, extraParam);
    return {
      name: `${frameName} Frame`,
      src: config.basePath + (pathResult ?? ''),
      masks: [
        {
          src: config.basePath + maskPathResult,
          name: mask,
        },
      ],
      bounds: { x: 0, y: 0, width: 1, height: 1 },
    };
  }

  // ----------------------------------------------------------------
  // MAIN FRAME CONSTRUCTION
  // ----------------------------------------------------------------

  // Build the main frame object (doesn't pass mask for path, only applies mask layer)
  const pathResult = config.pathBuilder(normalizedLetter, false, currentStyle, extraParam);
  
  // Build layer name: "Frame Name" or "Frame Name - Mask Name" to match manual frame addition
  const layerNameParts = [`${frameName} Frame`];

  // Apply masks to the frame (Title, Type, Rules, Frame, Border, Pinline, etc.)
  const masks: Array<{ src: string; name: string }> = [];
  
  if (mask && typeof mask === 'string') {
    const maskPathResult = config.maskPath(mask, extraParam, normalizedLetter);

    // Only add mask if maskPath returns a valid path (not null)
    // Some frame types don't have certain masks (e.g., Etched has no separate Pinline)
    if (maskPathResult) {
      masks.push({
        src: config.basePath + maskPathResult,
        name: mask,
      });
      
      // Add mask name to layer name for display
      layerNameParts.push(mask);

      // Add right-half mask for multicolor cards (splits frame vertically)
      if (maskToRightHalf) {
        masks.push({
          src: RIGHT_HALF_MASK_PATH,
          name: 'Right Half',
        });
        layerNameParts.push('Right Half');
      }
    } else {
      // If mask was requested but doesn't exist, return null (don't add a frame)
      return null;
    }
  }

  const frame: AutoFrameResult = {
    name: layerNameParts.join(' - '),
    src: config.basePath + (pathResult ?? ''),
    masks,
  };

  return frame;
}

// ============================================================================
// WRAPPER FUNCTIONS
// ============================================================================
// These wrapper functions maintain compatibility with existing code that calls
// frame-specific builders. They all delegate to makeFrameByLetterUnified.

/**
 * Creates an M15 frame element.
 *
 * @param letter - Color letter(s) (W, U, B, R, G, M, A, L, C, V)
 * @param mask - Mask type or false for main frame
 * @param maskToRightHalf - Whether to mask to right half
 * @param style - Frame style ('regular', 'Nyx', 'snow')
 * @returns Frame object or null
 */
export function makeM15FrameByLetter(
  letter: string,
  mask: string | boolean = false,
  maskToRightHalf: boolean = false,
  style: AutoFrameStyle | string = 'regular'
): AutoFrameResult | null {
  return makeFrameByLetterUnified('M15', letter, mask, maskToRightHalf, style);
}

/**
 * Creates an M15 New (Accurate) frame element.
 *
 * @param letter - Color letter(s)
 * @param mask - Mask type or false for main frame
 * @param maskToRightHalf - Whether to mask to right half
 * @param style - Frame style ('regular', 'Nyx', 'snow', 'ub', 'ubnyx')
 * @returns Frame object or null
 */
export function makeM15NewFrameByLetter(
  letter: string,
  mask: string | boolean = false,
  maskToRightHalf: boolean = false,
  style: AutoFrameStyle | string = 'regular'
): AutoFrameResult | null {
  return makeFrameByLetterUnified('M15New', letter, mask, maskToRightHalf, style);
}

/**
 * Creates an M15 Eighth frame element.
 *
 * @param letter - Color letter(s)
 * @param mask - Mask type or false for main frame
 * @param maskToRightHalf - Whether to mask to right half
 * @param style - Frame style
 * @returns Frame object or null
 */
export function makeM15EighthFrameByLetter(
  letter: string,
  mask: string | boolean = false,
  maskToRightHalf: boolean = false,
  style: AutoFrameStyle | string = 'regular'
): AutoFrameResult | null {
  return makeFrameByLetterUnified('M15Eighth', letter, mask, maskToRightHalf, style);
}

/**
 * Creates an M15 Eighth UB frame element.
 *
 * @param letter - Color letter(s)
 * @param mask - Mask type or false for main frame
 * @param maskToRightHalf - Whether to mask to right half
 * @param style - Frame style (not typically used, defaults to false for UB)
 * @param extraParam - Extra parameter for stamp handling
 * @returns Frame object or null
 */
export function makeM15EighthUBFrameByLetter(
  letter: string,
  mask: string | boolean = false,
  maskToRightHalf: boolean = false,
  style: AutoFrameStyle | string | boolean = false,
  extraParam: unknown = false
): AutoFrameResult | null {
  const normalizedStyle = typeof style === 'boolean' ? 'regular' : style;
  return makeFrameByLetterUnified('M15EighthUB', letter, mask, maskToRightHalf, normalizedStyle, extraParam);
}

/**
 * Creates a Borderless frame element.
 *
 * @param letter - Color letter(s)
 * @param mask - Mask type or false for main frame
 * @param maskToRightHalf - Whether to mask to right half
 * @param style - Frame style
 * @param universesBeyond - Whether to use Universes Beyond variant crowns/stamps
 * @returns Frame object or null
 */
export function makeBorderlessFrameByLetter(
  letter: string,
  mask: string | boolean = false,
  maskToRightHalf: boolean = false,
  style: AutoFrameStyle | string = 'regular',
  universesBeyond: boolean = false
): AutoFrameResult | null {
  const frameType = universesBeyond ? 'BorderlessUB' : 'Borderless';
  return makeFrameByLetterUnified(frameType, letter, mask, maskToRightHalf, style, universesBeyond);
}

/**
 * Creates an 8th Edition frame element.
 *
 * @param letter - Color letter(s)
 * @param mask - Mask type or false for main frame
 * @param maskToRightHalf - Whether to mask to right half
 * @param style - Frame style
 * @returns Frame object or null
 */
export function make8thEditionFrameByLetter(
  letter: string,
  mask: string | boolean = false,
  maskToRightHalf: boolean = false,
  style: AutoFrameStyle | string = 'regular'
): AutoFrameResult | null {
  return makeFrameByLetterUnified('8thEdition', letter, mask, maskToRightHalf, style);
}

/**
 * Creates an Extended Art frame element.
 *
 * @param letter - Color letter(s)
 * @param mask - Mask type or false for main frame
 * @param maskToRightHalf - Whether to mask to right half
 * @param style - Frame style
 * @param short - Whether to use the short variant (Box Topper vs Extended Art Short)
 * @returns Frame object or null
 */
export function makeExtendedArtFrameByLetter(
  letter: string,
  mask: string | boolean = false,
  maskToRightHalf: boolean = false,
  style: AutoFrameStyle | string = 'regular',
  short: boolean = false
): AutoFrameResult | null {
  return makeFrameByLetterUnified('ExtendedArt', letter, mask, maskToRightHalf, style, short);
}

/**
 * Creates a Universes Beyond (UB) frame element.
 *
 * @param letter - Color letter(s)
 * @param mask - Mask type or false for main frame
 * @param maskToRightHalf - Whether to mask to right half
 * @param style - Frame style (not typically used, defaults to false)
 * @returns Frame object or null
 */
export function makeUBFrameByLetter(
  letter: string,
  mask: string | boolean = false,
  maskToRightHalf: boolean = false,
  style: AutoFrameStyle | string | boolean = false
): AutoFrameResult | null {
  const normalizedStyle = typeof style === 'boolean' ? 'regular' : style;
  return makeFrameByLetterUnified('UB', letter, mask, maskToRightHalf, normalizedStyle);
}

/**
 * Creates a Circuit frame element.
 *
 * @param letter - Color letter(s)
 * @param mask - Mask type or false for main frame
 * @param maskToRightHalf - Whether to mask to right half
 * @returns Frame object or null
 */
export function makeCircuitFrameByLetter(
  letter: string,
  mask: string | boolean = false,
  maskToRightHalf: boolean = false
): AutoFrameResult | null {
  return makeFrameByLetterUnified('Circuit', letter, mask, maskToRightHalf, 'regular');
}

/**
 * Creates an Etched frame element.
 *
 * @param letter - Color letter(s)
 * @param mask - Mask type or false for main frame
 * @param maskToRightHalf - Whether to mask to right half
 * @param style - Frame style
 * @returns Frame object or null
 */
export function makeEtchedFrameByLetter(
  letter: string,
  mask: string | boolean = false,
  maskToRightHalf: boolean = false,
  style: AutoFrameStyle | string = 'regular'
): AutoFrameResult | null {
  return makeFrameByLetterUnified('Etched', letter, mask, maskToRightHalf, style);
}

/**
 * Creates a Phyrexian/Praetors frame element.
 *
 * @param letter - Color letter(s)
 * @param mask - Mask type or false for main frame
 * @param maskToRightHalf - Whether to mask to right half
 * @returns Frame object or null
 */
export function makePhyrexianFrameByLetter(
  letter: string,
  mask: string | boolean = false,
  maskToRightHalf: boolean = false
): AutoFrameResult | null {
  return makeFrameByLetterUnified('Phyrexian', letter, mask, maskToRightHalf, 'regular');
}

/**
 * Creates a 7th Edition frame element.
 *
 * @param letter - Color letter(s)
 * @param mask - Mask type or false for main frame
 * @param maskToRightHalf - Whether to mask to right half
 * @returns Frame object or null
 */
export function makeSeventhEditionFrameByLetter(
  letter: string,
  mask: string | boolean = false,
  maskToRightHalf: boolean = false
): AutoFrameResult | null {
  return makeFrameByLetterUnified('SeventhEdition', letter, mask, maskToRightHalf, 'regular');
}

/**
 * Creates a Japan Showcase frame element.
 *
 * @param letter - Color letter(s)
 * @param mask - Mask type or false for main frame
 * @param maskToRightHalf - Whether to mask to right half
 * @param style - Frame style
 * @returns Frame object or null
 */
export function makeJapanShowcaseFrameByLetter(
  letter: string,
  mask: string | boolean = false,
  maskToRightHalf: boolean = false,
  style: AutoFrameStyle | string = 'regular'
): AutoFrameResult | null {
  return makeFrameByLetterUnified('JapanShowcase', letter, mask, maskToRightHalf, style);
}

/**
 * Creates a Vault frame element.
 *
 * @param letter - Color letter(s)
 * @param mask - Mask type or false for main frame
 * @param maskToRightHalf - Whether to mask to right half
 * @param style - Frame style
 * @returns Frame object or null
 */
export function makeVaultFrameByLetter(
  letter: string,
  mask: string | boolean = false,
  maskToRightHalf: boolean = false,
  style: AutoFrameStyle | string = 'regular'
): AutoFrameResult | null {
  return makeFrameByLetterUnified('Vault', letter, mask, maskToRightHalf, style);
}

/**
 * Creates an Adventure frame element.
 *
 * @param letter - Color letter(s)
 * @param mask - Mask type or false for main frame
 * @param maskToRightHalf - Whether to mask to right half
 * @param style - Frame style
 * @returns Frame object or null
 */
export function makeAdventureFrameByLetter(
  letter: string,
  mask: string | boolean = false,
  maskToRightHalf: boolean = false,
  style: AutoFrameStyle | string = 'regular'
): AutoFrameResult | null {
  return makeFrameByLetterUnified('Adventure', letter, mask, maskToRightHalf, style);
}

/**
 * Creates an Omen frame element.
 *
 * @param letter - Color letter(s)
 * @param mask - Mask type or false for main frame
 * @param maskToRightHalf - Whether to mask to right half
 * @param style - Frame style
 * @returns Frame object or null
 */
export function makeOmenFrameByLetter(
  letter: string,
  mask: string | boolean = false,
  maskToRightHalf: boolean = false,
  style: AutoFrameStyle | string = 'regular'
): AutoFrameResult | null {
  return makeFrameByLetterUnified('Omen', letter, mask, maskToRightHalf, style);
}

// ============================================================================
// BUILDER REGISTRY
// ============================================================================

/**
 * Generic frame builder function type for the registry.
 * This is the signature used when calling builders through the registry.
 */
type BuilderFunction = (
  letter: string,
  mask?: string | boolean,
  maskToRightHalf?: boolean,
  style?: AutoFrameStyle | string,
  extraParam?: unknown
) => AutoFrameResult | null;

/**
 * Registry mapping builder type names to their builder functions.
 * Used by the orchestrator to look up the correct builder for a frame type.
 */
export const builderRegistry: Record<string, BuilderFunction> = {
  M15: (letter, mask, maskToRightHalf, style, _extraParam) =>
    makeM15FrameByLetter(letter, mask, maskToRightHalf ?? false, style ?? 'regular'),
  M15New: (letter, mask, maskToRightHalf, style, _extraParam) =>
    makeM15NewFrameByLetter(letter, mask, maskToRightHalf ?? false, style ?? 'regular'),
  M15Eighth: (letter, mask, maskToRightHalf, style, _extraParam) =>
    makeM15EighthFrameByLetter(letter, mask, maskToRightHalf ?? false, style ?? 'regular'),
  M15EighthUB: (letter, mask, maskToRightHalf, style, extraParam) =>
    makeM15EighthUBFrameByLetter(letter, mask, maskToRightHalf ?? false, style ?? 'regular', extraParam),
  Borderless: (letter, mask, maskToRightHalf, style, extraParam) =>
    makeBorderlessFrameByLetter(letter, mask, maskToRightHalf ?? false, style ?? 'regular', extraParam === true),
  BorderlessUB: (letter, mask, maskToRightHalf, style, _extraParam) =>
    makeBorderlessFrameByLetter(letter, mask, maskToRightHalf ?? false, style ?? 'regular', true),
  '8thEdition': (letter, mask, maskToRightHalf, style, _extraParam) =>
    make8thEditionFrameByLetter(letter, mask, maskToRightHalf ?? false, style ?? 'regular'),
  ExtendedArt: (letter, mask, maskToRightHalf, style, extraParam) =>
    makeExtendedArtFrameByLetter(letter, mask, maskToRightHalf ?? false, style ?? 'regular', extraParam === true),
  ExtendedArtShort: (letter, mask, maskToRightHalf, style, _extraParam) =>
    makeExtendedArtFrameByLetter(letter, mask, maskToRightHalf ?? false, style ?? 'regular', true),
  UB: (letter, mask, maskToRightHalf, style, _extraParam) =>
    makeUBFrameByLetter(letter, mask, maskToRightHalf ?? false, style ?? 'regular'),
  Circuit: (letter, mask, maskToRightHalf, _style, _extraParam) =>
    makeCircuitFrameByLetter(letter, mask, maskToRightHalf ?? false),
  Etched: (letter, mask, maskToRightHalf, style, _extraParam) =>
    makeEtchedFrameByLetter(letter, mask, maskToRightHalf ?? false, style ?? 'regular'),
  Phyrexian: (letter, mask, maskToRightHalf, _style, _extraParam) =>
    makePhyrexianFrameByLetter(letter, mask, maskToRightHalf ?? false),
  SeventhEdition: (letter, mask, maskToRightHalf, _style, _extraParam) =>
    makeSeventhEditionFrameByLetter(letter, mask, maskToRightHalf ?? false),
  JapanShowcase: (letter, mask, maskToRightHalf, style, _extraParam) =>
    makeJapanShowcaseFrameByLetter(letter, mask, maskToRightHalf ?? false, style ?? 'regular'),
  Vault: (letter, mask, maskToRightHalf, style, _extraParam) =>
    makeVaultFrameByLetter(letter, mask, maskToRightHalf ?? false, style ?? 'regular'),
  Adventure: (letter, mask, maskToRightHalf, style, _extraParam) =>
    makeAdventureFrameByLetter(letter, mask, maskToRightHalf ?? false, style ?? 'regular'),
  Omen: (letter, mask, maskToRightHalf, style, _extraParam) =>
    makeOmenFrameByLetter(letter, mask, maskToRightHalf ?? false, style ?? 'regular'),
};

/**
 * Get a builder function by builder type name.
 *
 * @param builderType - The builder type name (e.g., 'M15', 'UB', 'Borderless')
 * @returns The builder function or undefined if not found
 */
export function getBuilder(builderType: string): BuilderFunction | undefined {
  return builderRegistry[builderType];
}
