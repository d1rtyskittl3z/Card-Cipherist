/**
 * Runtime Validation Schemas
 * Zod schemas for validating Card Conjurer data structures
 */

import { z } from 'zod';

/**
 * Schema version for forward compatibility
 */
export const SCHEMA_VERSION = '1.0.0';

/**
 * Normalized coordinate schema (0-1 range, or beyond for margins/masks)
 */
const normalizedCoordSchema = z.number().finite();

/**
 * CardBounds schema - normalized coordinate bounds
 */
export const cardBoundsSchema = z.object({
  x: normalizedCoordSchema,
  y: normalizedCoordSchema,
  width: normalizedCoordSchema,
  height: normalizedCoordSchema,
  rotation: z.number().optional(),
});

/**
 * Frame color override schema
 */
export const frameColorOverrideSchema = z.object({
  mode: z.enum(['auto', 'manual']),
  color: z.string(),
  source: z.enum(['preset', 'custom']).optional(),
});

/**
 * Stretch config schema (for Neo Basics and similar features)
 */
export const stretchConfigSchema = z.object({
  x: normalizedCoordSchema,
  y: normalizedCoordSchema,
  width: normalizedCoordSchema,
  height: normalizedCoordSchema,
  ogBounds: cardBoundsSchema.optional(),
});

/**
 * Mask schema
 */
export const maskSchema = z.object({
  name: z.string(),
  src: z.string(),
  image: z.any(), // HTMLImageElement - can't validate in Zod
  bounds: cardBoundsSchema.optional(),
  ogBounds: cardBoundsSchema.optional(),
});

/**
 * Frame schema
 */
export const frameSchema = z.object({
  name: z.string(),
  src: z.string(),
  image: z.any().nullable(), // HTMLImageElement | null
  masks: z.array(maskSchema).default([]),
  bounds: cardBoundsSchema.optional(),
  ogBounds: cardBoundsSchema.optional(),
  opacity: z.number().min(0).max(100), // App uses 0-100 range, not 0-1
  mode: z.string().optional(), // GlobalCompositeOperation - can't validate specific values
  erase: z.boolean().optional(),
  preserveAlpha: z.boolean().optional(),
  stretch: z.array(stretchConfigSchema).optional(),
  colorOverrides: z.record(z.string(), frameColorOverrideSchema).optional(),
  colorOverlay: z.string().optional(),
  colorOverlayCheck: z.boolean().optional(),
  hslHue: z.number().optional(),
  hslSaturation: z.number().optional(),
  hslLightness: z.number().optional(),
  visible: z.boolean().optional(),
  locked: z.boolean().optional(),
  x: normalizedCoordSchema.optional(),
  y: normalizedCoordSchema.optional(),
  width: normalizedCoordSchema.optional(),
  height: normalizedCoordSchema.optional(),
  scale: z.number().optional(),
  // Original values
  ogOpacity: z.number().optional(),
  ogHslHue: z.number().optional(),
  ogHslSaturation: z.number().optional(),
  ogHslLightness: z.number().optional(),
  ogColorOverlay: z.string().optional(),
  ogColorOverlayCheck: z.boolean().optional(),
  ogVisible: z.boolean().optional(),
  ogX: normalizedCoordSchema.optional(),
  ogY: normalizedCoordSchema.optional(),
  ogWidth: normalizedCoordSchema.optional(),
  ogHeight: normalizedCoordSchema.optional(),
  ogScale: z.number().optional(),
  neoBasicsModified: z.boolean().optional(),
});

/**
 * TextObject schema
 */
export const textObjectSchema = z.object({
  name: z.string(),
  text: z.string(),
  x: normalizedCoordSchema,
  y: normalizedCoordSchema,
  width: normalizedCoordSchema,
  height: normalizedCoordSchema,
  size: z.number().positive(),
  font: z.string(),
  color: z.string(),
  align: z.enum(['left', 'center', 'right']).optional(),
  oneLine: z.boolean().optional(),
  outlineWidth: z.number().optional(),
  outlineColor: z.string().optional(),
  fontSizeAdjustment: z.number().optional(),
  manaPrefix: z.string().optional(),
  manaPlacement: z
    .object({
      x: z.array(z.number()),
      y: z.array(z.number()),
    })
    .optional(),
  noVerticalCenter: z.boolean().optional(),
  manaCost: z.boolean().optional(),
  shadowX: z.number().optional(),
  shadowY: z.number().optional(),
  shadowColor: z.string().optional(),
  manaSpacing: z.number().optional(),
  rotation: z.number().optional(),
});

/**
 * Bottom info schema (collector info)
 */
export const bottomInfoSchema = z.record(z.string(), textObjectSchema);

/**
 * Saga info schema
 */
export const sagaInfoSchema = z.object({
  abilities: z.array(z.number()).default([]),
  count: z.number().int().min(1).max(4),
  x: normalizedCoordSchema,
  width: normalizedCoordSchema,
});

/**
 * Planeswalker ability bounds schema
 */
export const planeswalkerAbilityBoundsSchema = z.object({
  x: normalizedCoordSchema,
  width: normalizedCoordSchema,
});

/**
 * Planeswalker info schema
 */
export const planeswalkerInfoSchema = z.object({
  abilities: z.tuple([z.string(), z.string(), z.string(), z.string()]),
  abilityAdjust: z.tuple([z.number(), z.number(), z.number(), z.number()]),
  count: z.number().int().min(1).max(4),
  x: normalizedCoordSchema,
  width: normalizedCoordSchema,
  invert: z.boolean().optional(),
  baseY: z.number().optional(),
  originalAbilityBounds: z.array(planeswalkerAbilityBoundsSchema).optional(),
  defaultHeights: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  defaultAbilities: z.tuple([z.string(), z.string(), z.string(), z.string()]).optional(),
  defaultAbilityAdjust: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
});

/**
 * Station color mode schema
 */
export const stationColorModeSchema = z.enum([
  'auto',
  'white',
  'blue',
  'black',
  'red',
  'green',
  'multi',
  'colorless',
  'artifact',
  'land',
  'custom',
]);

/**
 * Station square schema
 */
export const stationSquareSchema = z.object({
  width: normalizedCoordSchema,
  height: normalizedCoordSchema,
  x: normalizedCoordSchema,
  y: normalizedCoordSchema,
  enabled: z.boolean(),
  color: z.string(),
  opacity: z.number().min(0).max(1),
});

/**
 * Station badge settings schema
 */
export const stationBadgeSettingsSchema = z.object({
  fontSize: z.number().positive(),
  width: normalizedCoordSchema,
  height: normalizedCoordSchema,
  x: normalizedCoordSchema,
  y: normalizedCoordSchema,
});

/**
 * Station text position schema
 */
export const stationTextPositionSchema = z.object({
  x: normalizedCoordSchema,
  y: normalizedCoordSchema,
});

/**
 * Station text offset schema
 */
export const stationTextOffsetSchema = z.object({
  x: z.number(),
  y: z.number(),
});

/**
 * Station P/T settings schema
 */
export const stationPTSettingsSchema = z.object({
  fontSize: z.number().positive(),
  width: normalizedCoordSchema,
  height: normalizedCoordSchema,
  x: normalizedCoordSchema,
  y: normalizedCoordSchema,
});

/**
 * Station color settings entry schema
 */
export const stationColorSettingsEntrySchema = z.object({
  square1: z.string(),
  square2OpacityOffset: z.number(),
});

/**
 * Station import settings schema
 */
export const stationImportSettingsSchema = z.object({
  singleAbility: z.object({
    yOffset: z.number(),
    height1: z.number(),
  }),
  versionOverrides: z.record(
    z.string(),
    z.object({
      yOffset: z.number().optional(),
      height1: z.number().optional(),
      minDistanceFromBottom: z.number().optional(),
    })
  ),
});

/**
 * Station state schema
 */
export const stationStateSchema = z.object({
  abilityCount: z.number().int().min(1).max(2),
  x: normalizedCoordSchema,
  width: normalizedCoordSchema,
  badgeX: normalizedCoordSchema,
  badgeValues: z.tuple([z.string(), z.string(), z.string()]),
  disableFirstAbility: z.boolean(),
  disabledTextX: normalizedCoordSchema,
  disabledTextWidth: normalizedCoordSchema,
  importSettings: stationImportSettingsSchema,
  badgeSettings: stationBadgeSettingsSchema,
  squares: z.object({
    1: stationSquareSchema,
    2: stationSquareSchema,
  }),
  minDistanceFromBottom: z.number(),
  baseTextPositions: z.object({
    ability1: stationTextPositionSchema,
    ability2: stationTextPositionSchema,
  }),
  textOffsets: z.object({
    1: stationTextOffsetSchema,
    2: stationTextOffsetSchema,
  }),
  ptSettings: stationPTSettingsSchema,
  colorModes: z.object({
    1: stationColorModeSchema,
    2: stationColorModeSchema,
  }),
  ptColorMode: stationColorModeSchema,
  badgeColorMode: stationColorModeSchema,
  colorSettings: z.record(z.string(), stationColorSettingsEntrySchema),
  packDefaults: z.object({
    ability: cardBoundsSchema,
  }),
  borderlessXOffset: z.number().optional(),
  badgeVariant: z.string().optional(),
  ptVariant: z.string().optional(),
});

/**
 * Main Card schema
 */
export const cardSchema = z.object({
  // Core dimensions
  width: z.number().positive().int(),
  height: z.number().positive().int(),
  marginX: normalizedCoordSchema,
  marginY: normalizedCoordSchema,

  // Frames
  frames: z.array(frameSchema).default([]),

  // Art
  artSource: z.string(),
  artX: z.number(),
  artY: z.number(),
  artZoom: z.number().positive(),
  artRotate: z.number(),
  artGrayscale: z.boolean().optional(),

  // Set symbol
  setSymbolSource: z.string(),
  setSymbolX: z.number(),
  setSymbolY: z.number(),
  setSymbolZoom: z.number().positive(),
  setSymbolRotate: z.number().default(0),

  // Watermark
  watermarkSource: z.string(),
  watermarkX: z.number(),
  watermarkY: z.number(),
  watermarkZoom: z.number().positive(),
  watermarkLeft: z.string(),
  watermarkRight: z.string(),
  watermarkOpacity: z.number().min(0).max(1),

  // Version and symbols
  version: z.string(),
  manaSymbols: z.array(z.string()).default([]),

  // Text and info
  text: z.record(z.string(), textObjectSchema).optional(),
  bottomInfo: bottomInfoSchema.optional(),

  // Orientation and layout
  landscape: z.boolean().optional(),
  margins: z.boolean().optional(),

  // Bottom info transforms
  bottomInfoTranslate: z.object({ x: z.number(), y: z.number() }).optional(),
  bottomInfoRotate: z.number().optional(),
  bottomInfoZoom: z.number().optional(),
  bottomInfoColor: z.string().optional(),
  hideBottomInfoBorder: z.boolean().optional(),
  showsFlavorBar: z.boolean().optional(),

  // Callbacks
  onload: z.any().nullable().optional(),

  // Bounds
  artBounds: cardBoundsSchema.optional(),
  setSymbolBounds: cardBoundsSchema.optional(),
  watermarkBounds: cardBoundsSchema.optional(),

  // Collector info
  infoYear: z.number().int().optional(),
  showCollectorInfo: z.boolean().optional(),
  collectorInfoStyle: z.enum(['default', 'new', 'artist']).optional(),

  // Serial plate
  serialNumber: z.union([z.string(), z.number()]).optional(),
  serialTotal: z.union([z.string(), z.number()]).optional(),
  serialX: z.number().optional(),
  serialY: z.number().optional(),
  serialScale: z.number().optional(),

  // Special card types
  saga: sagaInfoSchema.nullable().optional(),
  planeswalker: planeswalkerInfoSchema.nullable().optional(),
  station: stationStateSchema.nullable().optional(),
});

/**
 * Card with schema version for versioned import/export
 */
export const versionedCardSchema = z.object({
  schemaVersion: z.string(),
  card: cardSchema,
});

/**
 * Validation result type
 */
export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: z.ZodError;
  errorMessage?: string;
}

/**
 * Validates card data with detailed error reporting
 * @param data - Unknown data to validate
 * @returns Validation result with parsed card or error details
 */
export function validateCard(data: unknown): ValidationResult<z.infer<typeof cardSchema>> {
  try {
    const result = cardSchema.safeParse(data);

    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    }

    // Format error messages for user display
    const errorMessage = result.error.issues
      .map((err: z.ZodIssue) => {
        const path = err.path.join('.');
        return `${path}: ${err.message}`;
      })
      .join('\n');

    return {
      success: false,
      error: result.error,
      errorMessage,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: error instanceof Error ? error.message : 'Unknown validation error',
    };
  }
}

/**
 * Validates versioned card data
 * @param data - Unknown data to validate
 * @returns Validation result with parsed versioned card or error details
 */
export function validateVersionedCard(
  data: unknown
): ValidationResult<z.infer<typeof versionedCardSchema>> {
  try {
    const result = versionedCardSchema.safeParse(data);

    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    }

    const errorMessage = result.error.issues
      .map((err: z.ZodIssue) => {
        const path = err.path.join('.');
        return `${path}: ${err.message}`;
      })
      .join('\n');

    return {
      success: false,
      error: result.error,
      errorMessage,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: error instanceof Error ? error.message : 'Unknown validation error',
    };
  }
}

/**
 * Checks if data has a schema version field
 * @param data - Data to check
 * @returns True if data appears to be versioned
 */
export function hasSchemaVersion(data: unknown): data is { schemaVersion: string } {
  return (
    typeof data === 'object' &&
    data !== null &&
    'schemaVersion' in data &&
    typeof (data as { schemaVersion: unknown }).schemaVersion === 'string'
  );
}

/**
 * Frame Pack Validation Schemas
 */

/**
 * Frame pack bounds schema (same as cardBounds but we may want different validation later)
 */
export const framePackBoundsSchema = z.object({
  x: normalizedCoordSchema,
  y: normalizedCoordSchema,
  width: normalizedCoordSchema,
  height: normalizedCoordSchema,
  rotation: z.number().optional(),
});

/**
 * Frame pack mask schema
 */
export const framePackMaskSchema = z.object({
  src: z.string().min(1, 'Mask src cannot be empty'),
  name: z.string().min(1, 'Mask name cannot be empty'),
  bounds: framePackBoundsSchema.optional(),
  ogBounds: framePackBoundsSchema.optional(),
});

/**
 * Stretch config schema
 * Note: targets can contain negative integers as flags for inverted transformations
 */
export const framePackStretchConfigSchema = z.object({
  name: z.string(),
  targets: z.array(z.number().int()),
  change: z.tuple([z.number(), z.number()]),
});

/**
 * Frame item schema
 */
export const framePackFrameItemSchema = z.object({
  name: z.string().min(1, 'Frame name cannot be empty'),
  src: z.string().min(1, 'Frame src cannot be empty'),
  masks: z.array(framePackMaskSchema).optional(),
  bounds: framePackBoundsSchema.optional(),
  ogBounds: framePackBoundsSchema.optional(),
  noDefaultMask: z.boolean().optional(),
  complementary: z.union([
    z.number().int().nonnegative(),
    z.array(z.number().int().nonnegative()),
    z.string().min(1),
    z.array(z.string().min(1))
  ]).optional(),
  erase: z.boolean().optional(),
  preserveAlpha: z.boolean().optional(),
  stretch: z.array(framePackStretchConfigSchema).optional(),
});

/**
 * Text config schema for frame packs
 */
export const framePackTextConfigSchema = z.object({
  name: z.string().min(1, 'Text field name cannot be empty'),
  text: z.string(),
  x: normalizedCoordSchema.optional(),
  y: normalizedCoordSchema.optional(),
  width: normalizedCoordSchema.optional(),
  height: normalizedCoordSchema.optional(),
  size: z.number().positive('Text size must be positive'),
  font: z.string().optional(),
  oneLine: z.boolean().optional(),
  align: z.enum(['left', 'center', 'right']).optional(),
  color: z.string().optional(),
  shadowX: z.number().optional(),
  shadowY: z.number().optional(),
  outlineWidth: z.number().optional(),
  outlineColor: z.string().optional(),
  manaCost: z.boolean().optional(),
  manaSpacing: z.number().optional(),
  manaPrefix: z.string().optional(),
  manaPlacement: z.object({
    x: z.array(z.number()),
    y: z.array(z.number()),
  }).optional(),
  noVerticalCenter: z.boolean().optional(),
  vertical: z.union([z.enum(['top', 'center', 'bottom']), z.boolean()]).optional(),
  horizontal: z.enum(['left', 'center', 'right']).optional(),
  shadowColor: z.string().optional(),
  conditionalColor: z.string().optional(),
  rotation: z.number().optional(),
  allCaps: z.boolean().optional(),
});

/**
 * Saga pack config schema
 */
export const sagaPackConfigSchema = z.object({
  x: normalizedCoordSchema,
  width: normalizedCoordSchema,
  defaultAbilities: z.array(z.number().int().min(1).max(4)).optional(),
  defaultCount: z.number().int().min(1).max(4).optional(),
});

/**
 * Planeswalker pack config schema
 */
export const planeswalkerPackConfigSchema = z.object({
  x: normalizedCoordSchema,
  width: normalizedCoordSchema,
  defaultAbilities: z.tuple([z.string(), z.string(), z.string(), z.string()]),
  defaultAbilityAdjust: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  defaultHeights: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  invert: z.boolean().optional(),
});

/**
 * Set symbol bounds schema (extends framePackBoundsSchema)
 */
export const setSymbolBoundsSchema = framePackBoundsSchema.extend({
  vertical: z.enum(['top', 'center', 'bottom']).optional(),
  horizontal: z.enum(['left', 'center', 'right']).optional(),
  outlineWidth: z.number().optional(),
  outlineColor: z.string().optional(),
});

/**
 * Frame pack template schema
 */
export const framePackTemplateSchema = z.object({
  id: z.string().min(1, 'Frame pack ID cannot be empty'),
  label: z.string().min(1, 'Frame pack label cannot be empty'),
  version: z.string().optional(),
  notice: z.string().optional(),
  artBounds: framePackBoundsSchema.optional(),
  setSymbolBounds: setSymbolBoundsSchema.optional(),
  watermarkBounds: framePackBoundsSchema.optional(),
  saga: sagaPackConfigSchema.optional(),
  planeswalker: planeswalkerPackConfigSchema.optional(),
  replacementMasks: z.record(z.string(), z.string()).optional(),
  frames: z.array(framePackFrameItemSchema).min(1, 'Frame pack must have at least one frame'),
  text: z.record(z.string(), framePackTextConfigSchema).optional(),
});

/**
 * Validates a frame pack template
 */
export function validateFramePack(
  data: unknown
): ValidationResult<z.infer<typeof framePackTemplateSchema>> {
  try {
    const result = framePackTemplateSchema.safeParse(data);

    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    }

    const errorMessage = result.error.issues
      .map((err: z.ZodIssue) => {
        const path = err.path.join('.');
        return `${path}: ${err.message}`;
      })
      .join('\n');

    return {
      success: false,
      error: result.error,
      errorMessage,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: error instanceof Error ? error.message : 'Unknown validation error',
    };
  }
}

/**
 * Type exports for TypeScript consumers
 */
export type CardData = z.infer<typeof cardSchema>;
export type VersionedCardData = z.infer<typeof versionedCardSchema>;
export type FrameData = z.infer<typeof frameSchema>;
export type TextObjectData = z.infer<typeof textObjectSchema>;
export type CardBoundsData = z.infer<typeof cardBoundsSchema>;
export type FramePackTemplateData = z.infer<typeof framePackTemplateSchema>;
