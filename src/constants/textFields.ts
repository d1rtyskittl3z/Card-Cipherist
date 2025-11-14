/**
 * Standard text field identifiers
 * Used throughout the application for card text rendering
 */
export const TEXT_FIELDS = {
  MANA: 'mana',
  TITLE: 'title',
  TYPE: 'type',
  RULES: 'rules',
  PT: 'pt',
  NICKNAME: 'nickname',
  FLAVOR: 'flavor',
} as const;

export type TextFieldKey = typeof TEXT_FIELDS[keyof typeof TEXT_FIELDS];

/**
 * Array of standard text fields for iteration
 */
export const STANDARD_TEXT_FIELDS = [
  TEXT_FIELDS.MANA,
  TEXT_FIELDS.TITLE,
  TEXT_FIELDS.TYPE,
  TEXT_FIELDS.RULES,
  TEXT_FIELDS.PT,
] as const;
