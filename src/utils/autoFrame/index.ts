/**
 * AutoFrame Module
 *
 * Automatic frame generation system for MTG-style cards.
 * Detects card properties (colors, types, legendary status) and
 * automatically selects and layers appropriate frame components.
 *
 * @module utils/autoFrame
 */

// Configuration exports
export {
  getFrameTypeConfig,
  getFrameLetterConfig,
  getSupportedFrameTypes,
  getLetterConfigKeys,
  frameTypeConfigs,
  letterConfigRegistry,
} from './config';

// Re-export types for convenience
export type {
  AutoFrameType,
  AutoFrameStyle,
  ColorLetter,
  ExtendedColorLetter,
  ManaColor,
  FrameTypeConfig,
  FrameLetterConfig,
  FrameElementBounds,
  FrameBoundsConfig,
  LetterTransformResult,
  LetterTransformFunction,
  PathBuilderFunction,
  MaskPathFunction,
  FrameBuilderFunction,
  AutoFrameMask,
  AutoFrameResult,
  CardFrameProperties,
  ColorDetectionResult,
  AutoFrameState,
  AutoFrameActions,
  FrameTypeInfo,
} from '../../types/autoFrame.types';

export {
  STANDARD_FRAME_NAMES,
  EXTENDED_FRAME_NAMES,
  AUTO_FRAME_TYPES,
  MANA_COLORS,
  RIGHT_HALF_MASK_PATH,
} from '../../types/autoFrame.types';

// Builder function exports
export {
  // Core unified builder
  makeFrameByLetterUnified,
  // Frame-specific wrapper builders
  makeM15FrameByLetter,
  makeM15NewFrameByLetter,
  makeM15EighthFrameByLetter,
  makeM15EighthUBFrameByLetter,
  makeBorderlessFrameByLetter,
  make8thEditionFrameByLetter,
  makeExtendedArtFrameByLetter,
  makeUBFrameByLetter,
  makeCircuitFrameByLetter,
  makeEtchedFrameByLetter,
  makePhyrexianFrameByLetter,
  makeSeventhEditionFrameByLetter,
  makeJapanShowcaseFrameByLetter,
  makeVaultFrameByLetter,
  makeAdventureFrameByLetter,
  makeOmenFrameByLetter,
  // Builder registry
  builderRegistry,
  getBuilder,
} from './builders';

// Color detection exports
export {
  detectLandColors,
  detectSpellColors,
  detectCardColors,
  detectSecondaryColors,
  getCardFrameProperties,
} from './colorDetection';

export type { FramePropertyStyle } from './colorDetection';

// Orchestrator exports
export {
  buildAutoFrame,
  determineStyle,
  getPreservedFrames,
  getFramesForRendering,
} from './orchestrator';

export type { AutoFrameInput, AutoFrameOutput } from './orchestrator';
