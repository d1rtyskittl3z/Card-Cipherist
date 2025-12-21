/**
 * AutoFrame Color Detection
 *
 * Functions for detecting card colors from card properties and determining
 * frame properties (pinline colors, PT, rules box colors, etc.).
 *
 * Ported from legacy autoFrame.js (PR173) and creator_PR155.js.
 *
 * @module utils/autoFrame/colorDetection
 */

import type {
  ManaColor,
  CardFrameProperties,
  ColorDetectionResult,
} from '../../types/autoFrame.types';
import { MANA_COLORS } from '../../types/autoFrame.types';

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Two-color pairs in standard MTG color order (enemy and allied).
 * Used to determine correct color ordering for hybrid/split frames.
 * Colors should be arranged in WUBRG order when listed.
 */
const REVERSED_COLOR_PAIRS: [ManaColor, ManaColor][] = [
  ['U', 'W'], // Azorius
  ['B', 'W'], // Orzhov
  ['R', 'B'], // Rakdos
  ['G', 'B'], // Golgari
  ['B', 'U'], // Dimir
  ['R', 'U'], // Izzet
  ['G', 'R'], // Gruul
  ['W', 'R'], // Boros
  ['W', 'G'], // Selesnya
  ['U', 'G'], // Simic
];

/**
 * Basic land types and their corresponding colors.
 */
const BASIC_LAND_TYPES: Record<string, ManaColor> = {
  plains: 'W',
  island: 'U',
  swamp: 'B',
  mountain: 'R',
  forest: 'G',
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Normalizes colors to uppercase and reorders them according to MTG conventions.
 * Two-color pairs are reordered to match standard enemy/allied pair ordering.
 *
 * @param colors - Array of detected color letters
 * @returns Normalized and properly ordered color array
 */
function normalizeColors(colors: string[]): ManaColor[] {
  const upperColors = colors.map((c) => c.toUpperCase()) as ManaColor[];

  // Check if this is a two-color pair that needs reordering
  if (upperColors.length === 2) {
    const colorsStr = JSON.stringify(upperColors);
    const needsReverse = REVERSED_COLOR_PAIRS.some(
      (pair) => JSON.stringify(pair) === colorsStr
    );
    if (needsReverse) {
      upperColors.reverse();
    }
  }

  return upperColors;
}

/**
 * Checks if a mana cost string indicates a hybrid card.
 * Hybrid mana symbols contain '/' between colors.
 *
 * @param manaCost - The mana cost string (e.g., '{2}{W/U}')
 * @returns true if the mana cost contains hybrid symbols
 */
function isHybridManaCost(manaCost: string): boolean {
  return manaCost.includes('/');
}

// ============================================================================
// COLOR DETECTION FUNCTIONS
// ============================================================================

/**
 * Detects colors from a land card's rules text.
 * Analyzes mana abilities and basic land types to determine what colors
 * the land can produce.
 *
 * @param rulesText - The card's rules text
 * @param typeLine - The card's type line
 * @returns Array of detected color letters in WUBRG order
 *
 * @example
 * detectLandColors('{T}: Add {W} or {U}.', 'Land') // Returns ['W', 'U']
 * detectLandColors('{T}: Add one mana of any color.', 'Land') // Returns ['W', 'U', 'B', 'R', 'G']
 * detectLandColors('{T}: Add {C}.', 'Basic Land - Wastes') // Returns []
 */
export function detectLandColors(rulesText: string, typeLine: string): ManaColor[] {
  const colors: ManaColor[] = [];
  let rules = rulesText;

  // Strip flavor text to avoid false positives
  const flavorIndex = rules.indexOf('{flavor}');
  const oldFlavorIndex = rules.indexOf('{oldflavor}');
  const cutoffIndex =
    flavorIndex !== -1
      ? flavorIndex
      : oldFlavorIndex !== -1
        ? oldFlavorIndex
        : -1;

  if (cutoffIndex !== -1) {
    rules = rules.substring(0, cutoffIndex);
  }

  const lines = rules.split('\n');
  const lowerTypeLine = typeLine.toLowerCase();

  // Look for "Add {mana}" abilities in rules text
  for (const line of lines) {
    let addIndex = line.indexOf('Add');
    let length = 3;

    if (addIndex === -1) {
      addIndex = line.toLowerCase().indexOf(' add');
      length = 4;
    }

    if (addIndex !== -1) {
      const afterAdd = line.substring(addIndex + length).toLowerCase();

      for (const color of MANA_COLORS) {
        if (afterAdd.includes(`{${color.toLowerCase()}}`) && !colors.includes(color)) {
          colors.push(color);
        }
      }
    }
  }

  // Check for basic land types in rules text and type line
  const lowerRules = rules.toLowerCase();
  for (const [landType, color] of Object.entries(BASIC_LAND_TYPES)) {
    if (
      !colors.includes(color) &&
      (lowerRules.includes(landType) || lowerTypeLine.includes(landType))
    ) {
      colors.push(color);
    }
  }

  // Handle fetch lands and search effects
  if (lowerRules.includes('search') && colors.length === 0) {
    // Tutor effects that put cards in hand don't add colors
    const putsInHand = lowerRules.includes('into your hand');
    const isTapped =
      lowerRules.includes('tapped') &&
      !lowerRules.includes('enters the battlefield tapped') &&
      !lowerRules.includes('untap');

    if (!putsInHand && !isTapped) {
      // Fetch lands that search for any type are 5-color
      return [...MANA_COLORS];
    }
  }

  // Lands that produce "any color" are 5-color
  // Only check if we haven't detected specific colors from mana abilities
  if (colors.length === 0) {
    const anyColorPatterns = [
      'any color',
      'any one color',
      'choose a color',
      'any combination of colors',
    ];

    for (const pattern of anyColorPatterns) {
      if (lowerRules.includes(pattern)) {
        return [...MANA_COLORS];
      }
    }
  }

  return colors;
}

/**
 * Detects colors from a spell's mana cost.
 * Extracts unique color symbols from the mana cost string.
 *
 * @param manaCost - The mana cost string (e.g., '{2}{W}{U}')
 * @returns Array of detected color letters in WUBRG order
 *
 * @example
 * detectSpellColors('{2}{W}{U}') // Returns ['W', 'U']
 * detectSpellColors('{3}') // Returns []
 * detectSpellColors('{W/U}{W/U}') // Returns ['W', 'U']
 */
export function detectSpellColors(manaCost: string): ManaColor[] {
  const upperCost = manaCost.toUpperCase();
  const colors: ManaColor[] = [];

  for (const color of MANA_COLORS) {
    if (upperCost.includes(color) && !colors.includes(color)) {
      colors.push(color);
    }
  }

  return colors;
}

/**
 * Detects card colors based on card properties.
 * For lands, analyzes rules text. For non-lands, analyzes mana cost.
 *
 * @param typeLine - The card's type line
 * @param manaCost - The mana cost string
 * @param rulesText - The card's rules text (used for lands)
 * @returns Color detection result with colors and flags
 *
 * @example
 * detectCardColors('Creature - Human', '{1}{W}', '') // { colors: ['W'], isMulticolor: false, ... }
 * detectCardColors('Basic Land - Plains', '', '{T}: Add {W}.') // { colors: ['W'], isLand: true, ... }
 */
export function detectCardColors(
  typeLine: string,
  manaCost: string,
  rulesText: string
): ColorDetectionResult {
  const isLand = typeLine.toLowerCase().includes('land');
  const colors = isLand
    ? detectLandColors(rulesText, typeLine)
    : detectSpellColors(manaCost);

  return {
    colors,
    isMulticolor: colors.length >= 2,
    isColorless: colors.length === 0 && !typeLine.toLowerCase().includes('artifact'),
    isLand,
  };
}

// ============================================================================
// FRAME PROPERTY DETERMINATION
// ============================================================================

/**
 * Frame style variants that affect property determination.
 */
export type FramePropertyStyle =
  | 'default'
  | 'Borderless'
  | 'Etched'
  | 'Phyrexian'
  | 'Seventh';

/**
 * Determines frame properties based on card attributes.
 * Returns which color variants to use for each frame element.
 *
 * @param colors - Array of detected color letters
 * @param manaCost - The mana cost string
 * @param typeLine - The card's type line
 * @param power - Power/toughness string (empty if not a creature)
 * @param style - Frame style variant affecting property determination
 * @returns Frame properties object with color letters for each element
 *
 * @example
 * getCardFrameProperties(['W'], '{1}{W}', 'Creature - Human', '2/2')
 * // Returns { frame: 'W', pinline: 'W', rules: 'W', typeTitle: 'W', pt: 'W', ... }
 *
 * getCardFrameProperties(['W', 'U'], '{W}{U}', 'Creature - Sphinx', '4/4')
 * // Returns { frame: 'M', pinline: 'W', pinlineRight: 'U', rules: 'W', rulesRight: 'U', ... }
 */
export function getCardFrameProperties(
  colors: string[],
  manaCost: string,
  typeLine: string,
  power: string,
  style: FramePropertyStyle = 'default'
): CardFrameProperties {
  // Normalize and reorder colors
  const normalizedColors = normalizeColors(colors);
  const isHybrid = isHybridManaCost(manaCost);
  const lowerTypeLine = typeLine.toLowerCase();
  const isLand = lowerTypeLine.includes('land');
  const isArtifact = lowerTypeLine.includes('artifact');
  const isVehicle = lowerTypeLine.includes('vehicle');

  // ----------------------------------------------------------------
  // RULES BOX COLOR
  // ----------------------------------------------------------------
  let rules: string;
  let rulesRight: string | undefined;

  if (style === 'Seventh') {
    // Seventh Edition special rules handling
    if (isLand) {
      if (normalizedColors.length === 0 || normalizedColors.length > 2) {
        rules = 'L';
      } else {
        rules = normalizedColors[0] + 'L';
      }
    } else if (normalizedColors.length === 1) {
      rules = normalizedColors[0];
    } else if (normalizedColors.length >= 2) {
      rules = 'M';
    } else if (isArtifact) {
      rules = 'A';
    } else {
      rules = 'C';
    }
  } else {
    // Standard rules handling
    if (isLand) {
      if (normalizedColors.length === 0) {
        rules = 'L';
      } else if (normalizedColors.length > 2) {
        rules = 'ML';
      } else {
        rules = normalizedColors[0] + 'L';
      }
    } else if (normalizedColors.length > 2) {
      if (style === 'Etched' && isArtifact) {
        rules = 'A';
      } else {
        rules = 'M';
      }
    } else if (normalizedColors.length !== 0) {
      rules = normalizedColors[0];
    } else if (style === 'Borderless' && !isArtifact) {
      rules = 'C';
    } else {
      rules = 'A';
    }
  }

  // Rules right (for 2-color cards)
  if (normalizedColors.length === 2) {
    if (isLand) {
      rulesRight = normalizedColors[1] + 'L';
    } else if (style !== 'Seventh') {
      rulesRight = normalizedColors[1];
    }
  }

  // ----------------------------------------------------------------
  // PINLINE COLOR
  // ----------------------------------------------------------------
  let pinline = rules;
  let pinlineRight = rulesRight;

  // Seventh Edition lands use plain land pinline
  if (style === 'Seventh' && isLand && normalizedColors.length >= 2) {
    pinline = 'L';
    pinlineRight = undefined;
  }

  // ----------------------------------------------------------------
  // TYPE/TITLE BAR COLOR
  // ----------------------------------------------------------------
  let typeTitle: string;

  if (normalizedColors.length >= 2) {
    if (isHybrid || isLand) {
      typeTitle = normalizedColors.length >= 3 ? 'M' : 'L';
    } else {
      typeTitle = 'M';
    }
  } else if (isLand) {
    if (normalizedColors.length === 0) {
      typeTitle = 'L';
    } else if (style === 'Etched') {
      if (normalizedColors.length > 2) {
        typeTitle = 'M';
      } else if (normalizedColors.length === 1) {
        typeTitle = normalizedColors[0];
      } else {
        typeTitle = 'L';
      }
    } else {
      typeTitle = normalizedColors[0] + 'L';
    }
  } else if (normalizedColors.length === 1) {
    typeTitle = normalizedColors[0];
  } else if (style === 'Borderless' && !isArtifact) {
    typeTitle = 'C';
  } else {
    typeTitle = 'A';
  }

  // ----------------------------------------------------------------
  // POWER/TOUGHNESS BOX COLOR
  // ----------------------------------------------------------------
  let pt: string | null = null;

  if (power) {
    if (isVehicle) {
      pt = 'V';
    } else if (typeTitle === 'L') {
      pt = 'C';
    } else {
      pt = typeTitle;
    }
  }

  // ----------------------------------------------------------------
  // MAIN FRAME COLOR
  // ----------------------------------------------------------------
  let frame: string;
  let frameRight: string | undefined;

  if (style === 'Seventh') {
    frame = isLand ? 'L' : pinline;
  } else if (isLand) {
    if (style === 'Etched') {
      if (normalizedColors.length > 2) {
        frame = 'M';
      } else if (normalizedColors.length > 0) {
        frame = normalizedColors[0];
      } else {
        frame = 'L';
      }
    } else {
      frame = 'L';
    }
  } else if (isVehicle) {
    frame = 'V';
  } else if (isArtifact) {
    frame = 'A';
  } else if (normalizedColors.length > 2) {
    frame = 'M';
  } else if (normalizedColors.length === 2) {
    if (isHybrid || style === 'Etched') {
      frame = normalizedColors[0];
    } else {
      frame = 'M';
    }
  } else if (normalizedColors.length === 1) {
    frame = normalizedColors[0];
  } else {
    frame = 'L';
  }

  // Frame right (for hybrid 2-color cards)
  if (!isVehicle && !isArtifact) {
    if (normalizedColors.length === 2 && (isHybrid || style === 'Etched')) {
      frameRight = normalizedColors[1];
    }
  }

  return {
    frame,
    frameRight,
    pinline,
    pinlineRight,
    rules,
    rulesRight,
    typeTitle,
    pt,
  };
}

// ============================================================================
// SECONDARY MANA COST COLOR DETECTION
// ============================================================================

/**
 * Detects colors from a secondary mana cost (e.g., Adventure cost, Omen cost).
 * Handles hybrid mana by taking the second color only.
 *
 * @param manaCost - The secondary mana cost string
 * @returns Array of detected color letters
 *
 * @example
 * detectSecondaryColors('{G}') // Returns ['G']
 * detectSecondaryColors('{G/W}') // Returns ['W'] (second color of hybrid)
 * detectSecondaryColors('{W}{U}') // Returns ['W', 'U']
 */
export function detectSecondaryColors(manaCost: string): ManaColor[] {
  const upperCost = manaCost.toUpperCase();

  // For hybrid mana (contains /), only use the second color
  if (upperCost.includes('/')) {
    const allColors = MANA_COLORS.filter((c) => upperCost.includes(c));
    // Return just the second color if there are at least 2
    if (allColors.length >= 2) {
      return [allColors[1]];
    } else if (allColors.length === 1) {
      return [allColors[0]];
    }
    return [];
  }

  // For non-hybrid, return all unique colors
  return [...new Set(MANA_COLORS.filter((c) => upperCost.includes(c)))];
}
