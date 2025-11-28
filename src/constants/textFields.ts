/**
 * Text Field Constants
 *
 * Defines all text field identifiers used throughout the card rendering system.
 * These constants ensure type safety when working with card.text keys.
 *
 * @module constants/textFields
 */

/**
 * Standard text field identifiers
 * These are common across most card types
 */
export const TEXT_FIELDS = {
  // Core fields
  MANA: 'mana',
  TITLE: 'title',
  TYPE: 'type',
  RULES: 'rules',
  PT: 'pt',

  // Optional fields
  NICKNAME: 'nickname',
  FLAVOR: 'flavor',

  // Saga-specific fields
  SAGA_CHAPTER_0: 'ability0',
  SAGA_CHAPTER_1: 'ability1',
  SAGA_CHAPTER_2: 'ability2',
  SAGA_CHAPTER_3: 'ability3',

  // Planeswalker-specific fields
  PW_LOYALTY: 'loyalty',
  PW_ABILITY_0: 'ability0',
  PW_ABILITY_1: 'ability1',
  PW_ABILITY_2: 'ability2',
  PW_ABILITY_3: 'ability3',

  // Station-specific fields (reuses ability keys)
  STATION_ABILITY_1: 'ability1',
  STATION_ABILITY_2: 'ability2',
} as const;

/**
 * Type representing any valid text field key
 * Extracted from the TEXT_FIELDS constant for type safety
 */
export type TextFieldKey = typeof TEXT_FIELDS[keyof typeof TEXT_FIELDS];

/**
 * Array of Saga ability field keys
 * Used for iteration in Saga rendering logic
 */
export const SAGA_ABILITY_KEYS = [
  TEXT_FIELDS.SAGA_CHAPTER_0,
  TEXT_FIELDS.SAGA_CHAPTER_1,
  TEXT_FIELDS.SAGA_CHAPTER_2,
  TEXT_FIELDS.SAGA_CHAPTER_3,
] as const;

/**
 * Array of Planeswalker ability field keys
 * Used for iteration in Planeswalker rendering logic
 */
export const PLANESWALKER_ABILITY_KEYS = [
  TEXT_FIELDS.PW_ABILITY_0,
  TEXT_FIELDS.PW_ABILITY_1,
  TEXT_FIELDS.PW_ABILITY_2,
  TEXT_FIELDS.PW_ABILITY_3,
] as const;

/**
 * Array of Station ability field keys
 * Used for iteration in Station rendering logic
 */
export const STATION_ABILITY_KEYS = [
  TEXT_FIELDS.STATION_ABILITY_1,
  TEXT_FIELDS.STATION_ABILITY_2,
] as const;

/**
 * Class level text field keys
 * Each level has: a (cost), b (name), c (text)
 * Level 0 only has c (text)
 */
export const CLASS_LEVEL_KEYS = [
  'level0c',
  'level1a', 'level1b', 'level1c',
  'level2a', 'level2b', 'level2c',
  'level3a', 'level3b', 'level3c',
] as const;
