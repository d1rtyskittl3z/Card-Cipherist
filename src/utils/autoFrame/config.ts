/**
 * AutoFrame Configuration
 *
 * Frame type and letter configurations for the automatic frame generation system.
 * Ported from legacy autoFrame.js (PR173).
 *
 * @module utils/autoFrame/config
 */

import type {
  AutoFrameType,
  AutoFrameStyle,
  FrameTypeConfig,
  FrameLetterConfig,
  LetterTransformResult,
} from '../../types/autoFrame.types';
import {
  STANDARD_FRAME_NAMES,
  EXTENDED_FRAME_NAMES,
} from '../../types/autoFrame.types';

// ============================================================================
// FRAME TYPE CONFIGURATIONS
// ============================================================================

/**
 * Frame type configuration registry.
 * Maps frame type identifiers to their build configurations.
 *
 * Note: makeFrameFunction is set to a placeholder initially.
 * The actual builder functions are assigned by the builders module
 * to avoid circular dependencies.
 */
const frameTypeConfigs: Record<AutoFrameType, Omit<FrameTypeConfig, 'makeFrameFunction'> & { builderType: string }> = {
  'M15Regular-1': {
    group: 'Standard-3',
    builderType: 'M15',
    supportsCrown: true,
    supportsPT: true,
    supportsStamp: false,
    filterFrames: (frame) => frame.name.includes('Extension'),
  },

  'M15RegularNew': {
    group: 'Accurate',
    builderType: 'M15New',
    supportsCrown: true,
    supportsPT: true,
    supportsStamp: false,
    filterFrames: (frame) => frame.name.includes('Extension'),
  },

  'M15Eighth': {
    group: 'Custom',
    builderType: 'M15Eighth',
    supportsCrown: true,
    supportsPT: true,
    supportsStamp: false,
    filterFrames: (frame) => frame.name.includes('Extension'),
  },

  'UB': {
    group: 'Showcase-5',
    builderType: 'UB',
    supportsCrown: true,
    supportsPT: true,
    supportsStamp: true,
    filterFrames: (frame) =>
      frame.name.includes('Extension') ||
      frame.name.includes('Gray Holo Stamp') ||
      frame.name.includes('Gold Holo Stamp'),
  },

  'UBNew': {
    group: 'Accurate',
    builderType: 'M15New', // Uses M15New with 'ub' style
    supportsCrown: true,
    supportsPT: true,
    supportsStamp: true,
    filterFrames: (frame) =>
      frame.name.includes('Extension') ||
      frame.name.includes('Gray Holo Stamp') ||
      frame.name.includes('Gold Holo Stamp'),
  },

  'Circuit': {
    group: 'Custom',
    builderType: 'Circuit',
    supportsCrown: true,
    supportsPT: true,
    supportsStamp: false,
    filterFrames: (frame) => frame.name.includes('Extension'),
  },

  'Etched': {
    group: 'Showcase-5',
    builderType: 'Etched',
    supportsCrown: true,
    supportsPT: true,
    supportsStamp: true,
    filterFrames: (frame) => frame.name.includes('Extension'),
  },

  'Praetors': {
    group: 'Showcase-5',
    builderType: 'Phyrexian',
    supportsCrown: true,
    supportsPT: true,
    supportsStamp: false,
    filterFrames: (frame) => frame.name.includes('Extension'),
  },

  'Seventh': {
    group: 'Misc-2',
    builderType: 'SeventhEdition',
    supportsCrown: false,
    supportsPT: false,
    supportsStamp: false,
    filterFrames: (frame) =>
      frame.name.includes('Extension') || frame.name.includes('DCI Star'),
  },

  'M15BoxTopper': {
    group: 'Showcase-5',
    builderType: 'ExtendedArt',
    supportsCrown: true,
    supportsPT: true,
    supportsStamp: false,
    filterFrames: (frame) => frame.name.includes('Extension'),
  },

  'M15ExtendedArtShort': {
    group: 'Showcase-5',
    builderType: 'ExtendedArtShort',
    supportsCrown: true,
    supportsPT: true,
    supportsStamp: false,
    filterFrames: (frame) => frame.name.includes('Extension'),
  },

  '8th': {
    group: 'Misc-2',
    builderType: '8thEdition',
    supportsCrown: false,
    supportsPT: true,
    supportsStamp: false,
    filterFrames: (frame) => frame.name.includes('Extension'),
  },

  'Borderless': {
    group: 'Showcase-5',
    builderType: 'Borderless',
    supportsCrown: true,
    supportsPT: true,
    supportsStamp: false,
    filterFrames: (frame) => frame.name.includes('Extension'),
  },

  'BorderlessUB': {
    group: 'Showcase-5',
    builderType: 'BorderlessUB',
    supportsCrown: true,
    supportsPT: true,
    supportsStamp: false,
    filterFrames: (frame) =>
      frame.name.includes('Extension') ||
      frame.name.includes('Gray Holo Stamp') ||
      frame.name.includes('Gold Holo Stamp'),
  },

  'M15EighthUB': {
    group: 'Custom',
    builderType: 'M15EighthUB',
    supportsCrown: true,
    supportsPT: true,
    supportsStamp: true,
    filterFrames: (frame) =>
      frame.name.includes('Extension') ||
      frame.name.includes('Gray Holo Stamp') ||
      frame.name.includes('Gold Holo Stamp'),
  },

  'FullArtNew': {
    group: 'Accurate',
    builderType: 'M15New', // Uses M15New with 'fullart' style
    supportsCrown: true,
    supportsPT: true,
    supportsStamp: false,
    filterFrames: (frame) => frame.name.includes('Extension'),
  },

  'JapanShowcase': {
    group: 'Showcase-5',
    builderType: 'JapanShowcase',
    supportsCrown: false,
    supportsPT: true,
    supportsStamp: true,
    filterFrames: (frame) => frame.name.includes('Extension'),
  },

  'Vault': {
    group: 'Showcase-5',
    builderType: 'Vault',
    supportsCrown: true,
    supportsPT: true,
    supportsStamp: true,
    filterFrames: (frame) => frame.name.includes('Extension'),
  },

  'Adventure': {
    group: 'Showcase-5',
    builderType: 'Adventure',
    supportsCrown: true,
    supportsPT: true,
    supportsStamp: false,
    filterFrames: (frame) => frame.name.includes('Extension'),
  },

  'Omen': {
    group: 'Showcase-5',
    builderType: 'Omen',
    supportsCrown: true,
    supportsPT: true,
    supportsStamp: false,
    filterFrames: (frame) => frame.name.includes('Extension'),
  },
};

/**
 * Get the configuration for a specific frame type.
 *
 * @param frameType - The frame type identifier
 * @returns Configuration object or undefined if not found
 */
export function getFrameTypeConfig(frameType: AutoFrameType): typeof frameTypeConfigs[AutoFrameType] | undefined {
  return frameTypeConfigs[frameType];
}

/**
 * Get all supported frame types.
 *
 * @returns Array of all frame type identifiers
 */
export function getSupportedFrameTypes(): AutoFrameType[] {
  return Object.keys(frameTypeConfigs) as AutoFrameType[];
}

// ============================================================================
// FRAME LETTER CONFIGURATIONS
// ============================================================================

/**
 * M15 standard frame letter configuration.
 */
const m15LetterConfig: FrameLetterConfig = {
  frameNames: STANDARD_FRAME_NAMES,
  basePath: '/img/frames/m15/',
  bounds: {
    crownBorderCover: { height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277 },
    crown: { height: 0.1667, width: 0.9454, x: 0.0274, y: 0.0191 },
    innerCrown: { height: 0.0239, width: 0.672, x: 0.164, y: 0.0239 },
    pt: { height: 0.0733, width: 0.188, x: 0.7573, y: 0.8848 },
  },
  pathBuilder: (letter, mask, style) => {
    if (mask === 'Crown') return `crowns/m15Crown${letter}.png`;
    if (mask === 'Inner Crown') return `innerCrowns/m15InnerCrown${letter}${style}.png`;
    if (mask === 'PT') return `regular/m15PT${letter}.png`;

    // Main frame
    let path = `${String(style).toLowerCase()}/m15Frame${letter}.png`;
    if (style === 'snow') {
      path = path.replace(`m15Frame${letter}`, letter.toLowerCase());
    } else if (letter.includes('L') && letter.length > 1) {
      path = path.replace(`m15Frame${letter}`, `l${letter[0].toLowerCase()}`);
    }
    if (style === 'Nyx') {
      path = path.replace('.png', 'Nyx.png');
    }
    return path;
  },
  maskPath: (mask) => `regular/m15Mask${mask}.png`,
  letterTransform: (letter, _mask, style): string | LetterTransformResult => {
    // Strip land indicator 'L' for all masks and main frame
    if (letter.includes('L') && letter.length > 1) {
      return letter[0];
    }
    if (letter === 'L' && style === 'Nyx') {
      return { letter, style: 'regular' };
    }
    return letter;
  },
};

/**
 * M15 New (Accurate) frame letter configuration.
 */
const m15NewLetterConfig: FrameLetterConfig = {
  frameNames: EXTENDED_FRAME_NAMES,
  basePath: '/img/frames/m15/',
  bounds: {
    crownBorderCover: { x: 0, y: 0, width: 1, height: 137 / 2814 },
    crown: { x: 44 / 2010, y: 53 / 2814, width: 1922 / 2010, height: 493 / 2814 },
    innerCrown: { x: 329 / 2010, y: 70 / 2814, width: 1353 / 2010, height: 64 / 2814 },
    pt: { height: 0.0733, width: 0.188, x: 0.7573, y: 0.8848 },
    stamp: { x: 857 / 2015, y: 2534 / 2814, width: 299 / 2015, height: 137 / 2814 },
  },
  pathBuilder: (letter, mask, style) => {
    if (mask === 'Crown') {
      const framePath = style === 'ub' ? 'ub/' : '';
      return `${framePath}crowns/new/${letter.toLowerCase()}.png`;
    }
    if (mask === 'Inner Crown') return `innerCrowns/new/${String(style).toLowerCase()}/${letter.toLowerCase()}.png`;
    if (mask === 'Stamp' && style === 'ub') return `new/ub/stamp/${letter.toLowerCase()}.png`;
    if (mask === 'PT') {
      if (style === 'ub') return `ub/pt/${letter.toLowerCase()}.png`;
      return `regular/m15PT${letter}.png`;
    }

    // Main frame
    const stylePath = style !== 'regular' ? `${String(style).toLowerCase()}/` : '';
    return `new/${stylePath}${letter.toLowerCase()}.png`;
  },
  maskPath: (mask) => `new/${mask.toLowerCase()}.png`,
  letterTransform: (letter, mask, style): string | LetterTransformResult => {
    let transformedLetter = letter;
    let transformedStyle = style;

    if (style === 'ubnyx') {
      transformedLetter += 'E';
      if (mask === 'Inner Crown') transformedStyle = 'nyx';
      else transformedStyle = 'ub';
    }

    if (transformedLetter.length === 2) {
      transformedLetter = transformedLetter.split('').reverse().join('');
    }

    if (
      (mask === 'Crown' || mask === 'PT' || (typeof mask === 'string' && mask.includes('Stamp'))) &&
      (transformedLetter.includes('L') || transformedLetter.includes('E')) &&
      transformedLetter.length > 1
    ) {
      transformedLetter = transformedLetter[1];
    }

    return {
      letter: transformedLetter,
      style: transformedStyle as AutoFrameStyle,
      frameName: transformedLetter.split('').reverse().join(''),
    };
  },
};

/**
 * M15 Eighth frame letter configuration.
 */
const m15EighthLetterConfig: FrameLetterConfig = {
  frameNames: STANDARD_FRAME_NAMES,
  basePath: '/img/frames/',
  bounds: {
    crownBorderCover: { height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277 },
    crown: { height: 0.1667, width: 0.9454, x: 0.0274, y: 0.0191 },
    innerCrown: { height: 0.0239, width: 0.672, x: 0.164, y: 0.0239 },
    pt: { x: 0.7573, y: 1901 / 2100, width: 0.188, height: 0.0733 },
  },
  pathBuilder: (letter, mask, style) => {
    if (mask === 'Crown') return `m15/crowns/m15Crown${letter}.png`;
    if (mask === 'Inner Crown') return `m15/innerCrowns/m15InnerCrown${letter}${style}.png`;
    if (mask === 'PT') return `m15/regular/m15PT${letter}.png`;
    return `custom/m15-eighth/${String(style).toLowerCase()}/${letter.toLowerCase()}.png`;
  },
  maskPath: (mask) => {
    if (mask.toLowerCase() === 'border' || mask.toLowerCase() === 'frame') {
      return `custom/m15-eighth/regular/${mask}.png`;
    }
    return `m15/regular/m15Mask${mask}.png`;
  },
  letterTransform: (letter, _mask, style): string | LetterTransformResult => {
    // Strip land indicator 'L' for all masks and main frame
    if (letter.includes('L') && letter.length > 1) {
      return letter[0];
    }
    if (letter === 'L' && style === 'Nyx') {
      return { letter, style: 'regular' };
    }
    return letter;
  },
};

/**
 * M15 Eighth UB frame letter configuration.
 */
const m15EighthUBLetterConfig: FrameLetterConfig = {
  frameNames: EXTENDED_FRAME_NAMES,
  basePath: '/img/frames/',
  bounds: {
    crownBorderCover: { height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277 },
    crown: { height: 0.1667, width: 0.9454, x: 0.0274, y: 0.0191 },
    innerCrown: { height: 0.0239, width: 0.672, x: 0.164, y: 0.0239 },
    pt: { height: 0.0733, width: 0.188, x: 0.7573, y: 1901 / 2100 },
    stamp: { x: 0.4254, y: 0.9005, width: 0.1494, height: 0.0486 },
  },
  pathBuilder: (letter, mask, style) => {
    if (mask === 'Crown') return `m15/ub/crowns/m15Crown${letter}.png`;
    if (mask === 'Inner Crown') return `m15/innerCrowns/m15InnerCrown${letter}${style}UB.png`;
    if (mask === 'PT') return `m15/ub/pt/${letter}.png`;
    if (mask === 'Stamp') {
      // For multicolor stamps, always use 'm' as base
      if (letter.length > 1) {
        return 'custom/m15-eighth/ub/stamp/m.png';
      }
      return `custom/m15-eighth/ub/stamp/${letter.toLowerCase()}.png`;
    }
    return `custom/m15-eighth/ub/${letter.toLowerCase()}.png`;
  },
  maskPath: (mask) => {
    if (mask.toLowerCase() === 'border' || mask.toLowerCase() === 'frame') {
      return `custom/m15-eighth/regular/${mask}.png`;
    }
    return `m15/regular/m15Mask${mask}.png`;
  },
  letterTransform: (letter, _mask, style): string => {
    let transformedLetter = letter;
    if (style === 'Nyx') transformedLetter += 'E';
    // Strip land indicator 'L' or enchantment indicator 'E' for all masks and main frame
    if ((transformedLetter.includes('L') || transformedLetter.includes('E')) && transformedLetter.length > 1) {
      return transformedLetter[0];
    }
    return transformedLetter;
  },
};

/**
 * Borderless frame letter configuration.
 */
const borderlessLetterConfig: FrameLetterConfig = {
  frameNames: STANDARD_FRAME_NAMES,
  basePath: '/img/frames/',
  bounds: {
    crownBorderCover: { height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277 },
    crown: { height: 0.1024, width: 0.9387, x: 0.0307, y: 0.0191 },
    pt: { height: 140 / 2100, width: 274 / 1500, x: 1146 / 1500, y: 1861 / 2100 },
    stamp: { height: 0.0486, width: 0.1494, x: 0.4254, y: 0.9005 },
  },
  pathBuilder: (letter, mask, _style, universesBeyond) => {
    if (mask === 'Crown') {
      if (universesBeyond) {
        return `m15/ub/crowns/floating/${letter.toLowerCase()}.png`;
      }
      return `m15/crowns/m15Crown${letter}Floating.png`;
    }
    if (mask === 'PT') return `m15/borderless/pt/${letter.toLowerCase()}.png`;
    if (mask === 'Stamp' && universesBeyond) return `m15/ub/regular/stamp/${letter.toLowerCase()}.png`;
    return `m15/borderless/m15GenericShowcaseFrame${letter}.png`;
  },
  maskPath: (mask) => `m15/regular/m15Mask${mask}.png`,
  letterTransform: (letter): string => {
    // Strip land indicator 'L' from all masks and main frame for Borderless
    if (letter.includes('L') && letter.length > 1) {
      return letter[0];
    }
    return letter;
  },
};

/**
 * 8th Edition frame letter configuration.
 */
const eighthEditionLetterConfig: FrameLetterConfig = {
  frameNames: STANDARD_FRAME_NAMES,
  basePath: '/img/frames/8th/',
  bounds: {
    pt: { x: 1461 / 2010, y: 2481 / 2814, width: 414 / 2010, height: 218 / 2814 },
  },
  pathBuilder: (letter, mask, style) => {
    if (mask === 'PT') return `pt/${letter.toLowerCase()}.png`;
    // Handle Nyx style
    if (style === 'Nyx') return `nyx/${letter.toLowerCase()}.png`;
    // Handle land frames (keep WL, UL, etc. format)
    if (letter.length > 1 && letter.includes('L')) {
      return `${letter.toLowerCase()}.png`;
    }
    return `${letter.toLowerCase()}.png`;
  },
  maskPath: (mask) => {
    // 8th Edition masks are .png files, not .svg
    return `${mask.toLowerCase()}.png`;
  },
  letterTransform: (letter, mask, style): string => {
    if (mask === 'PT' && letter.includes('L') && letter.length > 1) {
      return letter[0];
    }
    // For Nyx frames, strip the 'L' for land frames
    if (style === 'Nyx' && letter.includes('L') && letter.length > 1) {
      return letter[0];
    }
    return letter;
  },
};

/**
 * Extended Art frame letter configuration.
 */
const extendedArtLetterConfig: FrameLetterConfig = {
  frameNames: STANDARD_FRAME_NAMES,
  basePath: '/img/frames/',
  bounds: {
    crownBorderCover: { height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277 },
    crown: { height: 0.1024, width: 0.9387, x: 0.0307, y: 0.0191 },
    crownOutline: { height: 0.1062, width: 0.944, x: 0.028, y: 0.0172 },
    innerCrown: { height: 0.0239, width: 0.672, x: 0.164, y: 0.0239 },
    pt: { height: 0.0733, width: 0.188, x: 0.7573, y: 0.8848 },
  },
  pathBuilder: (letter, mask, style, short) => {
    if (mask === 'Crown') return `m15/crowns/m15Crown${letter}Floating.png`;
    if (mask === 'Crown Outline' || mask === 'Legend Crown Outline') return 'm15/crowns/m15CrownFloatingOutline.png';
    if (mask === 'Inner Crown') return `m15/innerCrowns/m15InnerCrown${letter}${style}.png`;
    if (mask === 'PT') return `m15/regular/m15PT${letter}.png`;

    // Main frame
    if (style !== 'regular') {
      let path = `extended/regular/${String(style).toLowerCase()}/${letter.toLowerCase()}.png`;
      if (short) path = path.replace('/regular/', '/shorter/');
      return path;
    } else if (short) {
      return `m15/boxTopper/short/${letter.toLowerCase()}.png`;
    }
    return `m15/boxTopper/m15BoxTopperFrame${letter}.png`;
  },
  maskPath: (mask, short) => {
    if (mask === 'Title Cutout') {
      return short ? 'extended/shorter/titleCutout.png' : 'm15/boxTopper/m15BoxTopperTitleCutout.png';
    }
    if (short && ['Frame', 'Rules', 'Type', 'Pinline'].includes(mask)) {
      const extension = mask === 'Type' ? '.png' : '.svg';
      return `m15/boxTopper/short/${mask.toLowerCase().replace('rules', 'text')}${extension}`;
    }
    return `m15/regular/m15Mask${mask}.png`;
  },
  letterTransform: (letter): string => {
    // Strip land indicator 'L' for all masks and main frame
    if (letter.includes('L') && letter.length > 1) {
      return letter[0];
    }
    return letter;
  },
};

/**
 * UB (Universes Beyond) frame letter configuration.
 */
const ubLetterConfig: FrameLetterConfig = {
  frameNames: EXTENDED_FRAME_NAMES,
  basePath: '/img/frames/m15/',
  bounds: {
    crownBorderCover: { height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277 },
    crown: { height: 0.1667, width: 0.9454, x: 0.0274, y: 0.0191 },
    innerCrown: { height: 0.0239, width: 0.672, x: 0.164, y: 0.0239 },
    pt: { height: 0.0733, width: 0.188, x: 0.7573, y: 0.8848 },
    stamp: { height: 0.0486, width: 0.1494, x: 0.4254, y: 0.9005 },
  },
  pathBuilder: (letter, mask, style) => {
    if (mask === 'Crown') return `ub/crowns/m15Crown${letter}.png`;
    if (mask === 'Inner Crown') return `innerCrowns/m15InnerCrown${letter}${style}UB.png`;
    if (mask === 'Stamp') return `ub/regular/stamp/${letter.toLowerCase()}.png`;
    if (mask === 'PT') {
      const ptLetter = letter === 'L' ? 'C' : letter;
      return `ub/pt/${ptLetter.toLowerCase()}.png`;
    }
    return `ub/regular/${letter.toLowerCase()}.png`;
  },
  maskPath: (mask) => `regular/m15Mask${mask}.png`,
  letterTransform: (letter, _mask, style): string => {
    let transformedLetter = letter;
    if (transformedLetter === 'C') transformedLetter = 'L';
    if (style === 'Nyx') transformedLetter += 'E';
    // Strip land indicator 'L' or enchantment indicator 'E' for all masks and main frame
    if ((transformedLetter.includes('L') || transformedLetter.includes('E')) && transformedLetter.length > 1) {
      return transformedLetter[0];
    }
    return transformedLetter;
  },
};

/**
 * Circuit frame letter configuration.
 */
const circuitLetterConfig: FrameLetterConfig = {
  frameNames: STANDARD_FRAME_NAMES,
  basePath: '/img/frames/',
  bounds: {
    crownBorderCover: { height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277 },
    crown: { height: 0.1667, width: 0.9454, x: 0.0274, y: 0.0191 },
    pt: { height: 0.0733, width: 0.188, x: 0.7573, y: 0.8848 },
  },
  pathBuilder: (letter, mask) => {
    if (mask === 'Crown') return `m15/ub/crowns/m15Crown${letter}.png`;
    if (mask === 'PT') return `m15/ub/pt/${letter.toLowerCase()}.png`;
    return `custom/circuit/${letter.toLowerCase()}.png`;
  },
  maskPath: (mask) => {
    // Circuit uses M15 regular masks
    return `m15/regular/m15Mask${mask}.png`;
  },
  letterTransform: (letter): string => {
    // Strip land indicator 'L' for all masks and main frame
    if (letter.includes('L') && letter.length > 1) {
      return letter[0];
    }
    return letter;
  },
};

/**
 * Etched frame letter configuration.
 */
const etchedLetterConfig: FrameLetterConfig = {
  frameNames: STANDARD_FRAME_NAMES,
  basePath: '/img/frames/etched/',
  bounds: {
    crownBorderCover: { height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277 },
    crown: { x: 0.0307, y: 0.0191, width: 0.9387, height: 0.092 },
    pt: { height: 0.0733, width: 0.188, x: 0.7573, y: 0.8848 },
    stamp: { x: 0.42, y: 0.9062, width: 0.16, height: 0.0453 },
  },
  pathBuilder: (letter, mask) => {
    if (mask === 'Crown') return `regular/crowns/${letter}.png`;
    if (mask === 'PT') return `regular/pt/${letter}.png`;
    if (mask === 'Stamp') return `regular/holo/${letter.toLowerCase()}.png`;
    return `regular/${letter.toLowerCase()}.png`;
  },
  maskPath: (mask) => {
    // Etched frames don't have separate Pinline masks - it's baked into the frame
    if (mask === 'Pinline') return null;
    return `regular/${mask.toLowerCase()}.svg`;
  },
  letterTransform: (letter): string => {
    // Strip land indicator 'L' for all masks and main frame
    if (letter.includes('L') && letter.length > 1) {
      return letter[0];
    }
    return letter;
  },
};

/**
 * Phyrexian/Praetors frame letter configuration.
 */
const phyrexianLetterConfig: FrameLetterConfig = {
  frameNames: STANDARD_FRAME_NAMES,
  basePath: '/img/frames/m15/praetors/',
  bounds: {
    crownBorderCover: { height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277 },
    crown: { x: 0, y: 0, width: 1, height: 0.0476 },
    pt: { x: 0.746, y: 0.8858, width: 0.212, height: 0.0772 },
  },
  pathBuilder: (letter, mask) => {
    if (mask === 'Crown') return `${letter.toLowerCase()}Crown.png`;
    if (mask === 'PT') return `${letter.toLowerCase()}pt.png`;
    return `${letter.toLowerCase()}.png`;
  },
  maskPath: (mask) => {
    // Praetors have a special pinline.png instead of pinline.svg
    if (mask === 'Pinline') return 'pinline.png';
    // Rules Text mask is text.svg instead of rules.svg
    if (mask === 'Rules') return 'text.svg';
    // Frame and Border are in praetors folder
    if (mask === 'Frame' || mask === 'Border') return `${mask.toLowerCase()}.${mask === 'Border' ? 'png' : 'svg'}`;
    // Title and Type use M15 regular masks
    if (mask === 'Title' || mask === 'Type') return `../regular/m15Mask${mask}.png`;
    return `${mask.toLowerCase()}.svg`;
  },
  letterTransform: (letter): string => {
    // Strip land indicator 'L' for all masks and main frame
    if (letter.includes('L') && letter.length > 1) {
      return letter[0];
    }
    return letter;
  },
};

/**
 * Seventh Edition frame letter configuration.
 */
const seventhEditionLetterConfig: FrameLetterConfig = {
  frameNames: {
    ...STANDARD_FRAME_NAMES,
    ML: 'Multicolored Land', // Override
  },
  basePath: '/img/frames/seventh/',
  bounds: {},
  pathBuilder: (letter) => {
    return `regular/${letter.toLowerCase()}.png`;
  },
  maskPath: (mask) => {
    if (mask === 'Textbox Pinline') return 'regular/trim.svg';
    return `regular/${mask.toLowerCase()}.svg`;
  },
  letterTransform: (letter): string => {
    if (letter === 'V') return 'A';
    if (letter === 'ML') return 'L';
    return letter;
  },
};

/**
 * Japan Showcase frame letter configuration.
 */
const japanShowcaseLetterConfig: FrameLetterConfig = {
  frameNames: {
    ...STANDARD_FRAME_NAMES,
    bAlt: 'Black (Alt)', // Special alternate black variant
  },
  basePath: '/img/frames/m15/japanShowcase/',
  bounds: {
    crownBorderCover: { height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277 },
    crown: { height: 0.1667, width: 0.9454, x: 0.0274, y: 0.0191 },
    pt: { x: 0.7771, y: 0.8876, width: 0.172, height: 0.0593 },
    stamp: { x: 877 / 2010, y: 2537 / 2814, width: 0.1264, height: 0.0452 },
  },
  pathBuilder: (letter, mask) => {
    const colorLetter = letter === 'bAlt' ? 'bAlt' : letter.toLowerCase();
    if (mask === 'PT') return `pt/${colorLetter}.png`;
    if (mask === 'Stamp') return `stamp/${colorLetter}.png`;
    // Main frame - handle special case for land
    if (letter === 'L') return 'Land.png';
    return `${colorLetter}.png`;
  },
  maskPath: (mask) => {
    // Map mask names to Japan Showcase mask files
    const maskMap: Record<string, string> = {
      'Pinline': 'mask/MaskPinline.png',
      'Title': 'mask/MaskTitle.png',
      'Type': 'mask/MaskType.png',
      'Rules': 'mask/MaskBottom.png', // Rules uses the bottom mask
      'Border Pinline': 'mask/MaskBottomPinline.png',
      'Border': 'mask/MaskBottom.png',
      'Frame': 'border.png', // Frame uses the border.png
      'PT Box Pinline': 'mask/MaskPtBoxPinline.png',
    };
    return maskMap[mask] || `mask/Mask${mask}.png`;
  },
  letterTransform: (letter, mask): string => {
    // Strip land indicator 'L' for all masks except main frame
    if (letter.includes('L') && letter.length > 1 && mask) {
      return letter[0];
    }
    // For vehicles, use artifact
    if (letter === 'V') return 'A';
    return letter;
  },
};

/**
 * Vault frame letter configuration.
 */
const vaultLetterConfig: FrameLetterConfig = {
  frameNames: STANDARD_FRAME_NAMES,
  basePath: '/img/frames/vault/',
  bounds: {
    crown: { x: -88 / 2010, y: -80 / 2814, width: 2187 / 2010, height: 2975 / 2814 },
    crownBorderCover: { height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277 },
    pt: { x: 0, y: 0, width: 1, height: 1 },
    stamp: { x: 835 / 2010, y: 2507 / 2814, width: 341 / 2010, height: 151 / 2814 },
    plainStamp: { x: 917 / 2010, y: 2563 / 2814, width: 0.0894, height: 0.032 },
  },
  pathBuilder: (letter, mask) => {
    const colorLetter = letter.toLowerCase();
    if (mask === 'Crown') return `crown/${colorLetter}.png`;
    if (mask === 'PT') return `pt/${colorLetter}.png`;
    if (mask === 'Stamp') return `stamp/${colorLetter}.png`;
    if (mask === 'Plain Stamp') return '../m15/holoStamps/stamp.png';
    return `${colorLetter}.png`;
  },
  maskPath: (mask) => {
    // Map mask names to Vault mask files
    const maskMap: Record<string, string> = {
      'Pinline': 'masks/maskPinlines.png',
      'Title': 'masks/maskTitle.png',
      'Type': 'masks/maskType.png',
      'Rules': 'masks/maskRules.png',
      'Text Boxes': 'masks/maskTextBoxes.png',
      'Frame': 'masks/maskFrame.png',
      'Borderless': 'masks/maskBorderless.png',
      'Bottom Frame': 'masks/maskBottomFrame.png',
      'Bottom Frame No Border': 'masks/maskBottomFrameNoBorder.png',
      'No Border': 'masks/maskNoBorder.png',
      'Border': 'masks/maskBorder.png',
    };
    return maskMap[mask] || `masks/mask${mask}.png`;
  },
  letterTransform: (letter, mask): string => {
    // Strip land indicator 'L' for all masks except main frame
    if (letter.includes('L') && letter.length > 1 && mask) {
      return letter[0];
    }
    // For vehicles, use artifact
    if (letter === 'V') return 'A';
    return letter;
  },
};

/**
 * Adventure frame letter configuration.
 */
const adventureLetterConfig: FrameLetterConfig = {
  frameNames: STANDARD_FRAME_NAMES,
  basePath: '/img/frames/adventure/',
  bounds: {
    crownBorderCover: { height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277 },
    crown: { height: 0.1667, width: 0.9454, x: 0.0274, y: 0.0191 },
    pt: { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 },
  },
  pathBuilder: (letter, mask, style) => {
    const colorLetter = letter.toLowerCase();
    if (mask === 'Crown') return `../m15/crowns/m15Crown${letter}.png`; // Use M15 crowns
    if (mask === 'PT') return `../m15/regular/m15PT${letter}.png`; // Use M15 PT boxes
    // Handle Nyx style
    if (style === 'Nyx') return `nyx/${colorLetter}.png`;
    // Main frame
    return `regular/${colorLetter}.png`;
  },
  maskPath: (mask) => {
    // Map mask names to Adventure mask files
    const maskMap: Record<string, string | null> = {
      'Pinline': 'regular/pinline.svg',
      'Title': '../m15/regular/m15MaskTitle.png',
      'Type': '../m15/regular/m15MaskType.png',
      'Rules': 'regular/book.svg',
      'Rules (Left)': 'regular/bookLeft.png',
      'Rules (Left, Multicolor)': 'regular/bookLeftMulticolor.png',
      'Rules (Right)': 'regular/bookRight.png',
      'Rules (Right, Multicolor)': 'regular/bookRightMulticolor.png',
      'Frame': 'regular/maskFrame.png',
      'Border': '../m15/regular/m15MaskBorder.png',
    };
    return maskMap[mask] || null;
  },
  letterTransform: (letter, mask): string => {
    // Strip land indicator 'L' for all masks except main frame
    if (letter.includes('L') && letter.length > 1 && mask) {
      return letter[0];
    }
    // For vehicles, use artifact
    if (letter === 'V') return 'A';
    return letter;
  },
};

/**
 * Omen frame letter configuration.
 */
const omenLetterConfig: FrameLetterConfig = {
  frameNames: STANDARD_FRAME_NAMES,
  basePath: '/img/frames/omen/',
  bounds: {
    crownBorderCover: { height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277 },
    crown: { height: 0.1667, width: 0.9454, x: 0.0274, y: 0.0191 },
    pt: { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 },
  },
  pathBuilder: (letter, mask, style) => {
    const colorLetter = letter.toLowerCase();
    if (mask === 'Crown') return `../m15/crowns/m15Crown${letter}.png`; // Use M15 crowns
    if (mask === 'PT') return `../m15/regular/m15PT${letter}.png`; // Use M15 PT boxes
    // Handle special Omen masks - these are separate colored overlays
    if (mask === 'Omen' || mask === 'Omen (Right Half)') {
      // Return null to use maskPath instead
      return null;
    }
    // Handle Nyx (enchantment) style
    if (style === 'nyx') return `nyx/${colorLetter}.png`;
    // Main frame
    return `regular/${colorLetter}.png`;
  },
  maskPath: (mask) => {
    // Map mask names to Omen mask files
    const maskMap: Record<string, string | null> = {
      'Pinline': 'regular/pinline.png',
      'Title': '../m15/regular/m15MaskTitle.png',
      'Type': '../m15/regular/m15MaskType.png',
      'Rules': 'regular/rules.png',
      'Frame': 'regular/maskFrame.png',
      'Rules (Right Half)': 'regular/rulesRight.png',
      'Omen': 'regular/omen.png',
      'Omen (Right Half)': 'regular/omenRight.png',
      'Border': '../m15/regular/m15MaskBorder.png',
    };
    return maskMap[mask] || null;
  },
  letterTransform: (letter, mask): string => {
    // Strip land indicator 'L' for all masks except main frame
    if (letter.includes('L') && letter.length > 1 && mask) {
      return letter[0];
    }
    // For vehicles, use artifact
    if (letter === 'V') return 'A';
    return letter;
  },
};

// ============================================================================
// LETTER CONFIG REGISTRY
// ============================================================================

/**
 * Mapping of builder types to their letter configurations.
 */
const letterConfigRegistry: Record<string, FrameLetterConfig> = {
  'M15': m15LetterConfig,
  'M15New': m15NewLetterConfig,
  'M15Eighth': m15EighthLetterConfig,
  'M15EighthUB': m15EighthUBLetterConfig,
  'Borderless': borderlessLetterConfig,
  'BorderlessUB': borderlessLetterConfig, // Uses same config with different extraParam
  '8thEdition': eighthEditionLetterConfig,
  'ExtendedArt': extendedArtLetterConfig,
  'ExtendedArtShort': extendedArtLetterConfig, // Uses same config with short=true
  'UB': ubLetterConfig,
  'Circuit': circuitLetterConfig,
  'Etched': etchedLetterConfig,
  'Phyrexian': phyrexianLetterConfig,
  'SeventhEdition': seventhEditionLetterConfig,
  'JapanShowcase': japanShowcaseLetterConfig,
  'Vault': vaultLetterConfig,
  'Adventure': adventureLetterConfig,
  'Omen': omenLetterConfig,
};

/**
 * Get the letter-based configuration for a frame type.
 *
 * @param frameType - The frame type identifier or builder type
 * @returns Letter configuration or undefined if not found
 */
export function getFrameLetterConfig(frameType: string): FrameLetterConfig | undefined {
  // First check if it's a builder type directly
  if (letterConfigRegistry[frameType]) {
    return letterConfigRegistry[frameType];
  }

  // Otherwise, look up the builder type from frame type config
  const typeConfig = getFrameTypeConfig(frameType as AutoFrameType);
  if (typeConfig) {
    return letterConfigRegistry[typeConfig.builderType];
  }

  return undefined;
}

/**
 * Get all letter configuration keys.
 *
 * @returns Array of all letter configuration keys
 */
export function getLetterConfigKeys(): string[] {
  return Object.keys(letterConfigRegistry);
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  frameTypeConfigs,
  letterConfigRegistry,
  // Individual configs for direct access if needed
  m15LetterConfig,
  m15NewLetterConfig,
  m15EighthLetterConfig,
  m15EighthUBLetterConfig,
  borderlessLetterConfig,
  eighthEditionLetterConfig,
  extendedArtLetterConfig,
  ubLetterConfig,
  circuitLetterConfig,
  etchedLetterConfig,
  phyrexianLetterConfig,
  seventhEditionLetterConfig,
  japanShowcaseLetterConfig,
  vaultLetterConfig,
  adventureLetterConfig,
  omenLetterConfig,
};
