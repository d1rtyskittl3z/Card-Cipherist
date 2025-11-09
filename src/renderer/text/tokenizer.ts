/**
 * Text Tokenizer
 * Parses raw text into tokens (text, symbols, commands)
 */

import type { Token } from './types';

/**
 * Split delimiter for tokenization
 * Using a unique string unlikely to appear in user text
 */
const SPLIT_STRING = '6GJt7eL8';

/**
 * Tokenize raw text into structured tokens
 *
 * Handles:
 * - Inline commands: {font...}, {fontsize...}, {color...}, etc.
 * - Mana symbols: {w}, {u}, {b}, {r}, {g}, {2}, {wu}, etc.
 * - Special replacements: {cardname}, ~, //, ///
 * - Spaces and line breaks
 *
 * @param rawText - Raw input text with inline codes
 * @param options - Tokenization options
 * @returns Array of tokens
 */
export function tokenize(
  rawText: string,
  options: {
    filterSpaces?: boolean;    // Remove spaces (for mana costs)
    vertical?: boolean;         // Vertical text layout
    manaCost?: boolean;         // Is this a mana cost field
    startingTextSize?: number;  // For vertical spacing calculations
  } = {}
): Token[] {
  // Pre-process text (legacy replacements)
  let text = rawText;

  // Replace shortcuts
  text = text.replace(/ - /g, ' — ');  // Em dash spacing
  text = text.replace(/\n/g, '{line}'); // Newlines to {line}
  text = text.replace(/{-}/g, '\u2014'); // {-} to em dash

  // Replace divider shortcuts
  text = text.replace(/\/\/\//g, '{flavor}');
  text = text.replace(/\/\//g, '{lns}');

  // Split on braces, spaces, and prepare for parsing
  // Insert split markers around { }, and spaces
  text = text
    .replace(/{/g, SPLIT_STRING + '{')
    .replace(/}/g, '}' + SPLIT_STRING)
    .replace(/ /g, SPLIT_STRING + ' ' + SPLIT_STRING);

  // Split and filter empty
  const splitText = text.split(SPLIT_STRING).filter(item => item);

  // For vertical text, split each character
  if (options.vertical) {
    return processVerticalText(splitText, options);
  }

  // Parse tokens
  const tokens: Token[] = [];

  for (const item of splitText) {
    if (item.startsWith('{') && item.endsWith('}')) {
      // Command or symbol token
      const code = item.slice(1, -1).toLowerCase();

      // Determine if it's a symbol or command
      if (isSymbolCode(code)) {
        tokens.push({
          type: 'SYMBOL',
          value: code,
          raw: item,
        });
      } else {
        tokens.push({
          type: 'COMMAND',
          value: code,
          raw: item,
        });
      }
    } else if (item === ' ') {
      // Space token
      if (!options.filterSpaces) {
        tokens.push({
          type: 'SPACE',
          value: ' ',
        });
      }
    } else if (item) {
      // Text token
      tokens.push({
        type: 'TEXT',
        value: item,
      });
    }
  }

  // Add end marker
  tokens.push({ type: 'TEXT', value: '' });

  return tokens;
}

/**
 * Process vertical text (each character on its own line)
 */
function processVerticalText(
  splitText: string[],
  options: {
    manaCost?: boolean;
    startingTextSize?: number;
  }
): Token[] {
  const tokens: Token[] = [];
  const textSize = options.startingTextSize || 38;

  for (let index = 0; index < splitText.length; index++) {
    const item = splitText[index];

    if (item.startsWith('{') && item.endsWith('}')) {
      // Commands stay as-is
      const code = item.slice(1, -1).toLowerCase();
      if (isSymbolCode(code)) {
        tokens.push({ type: 'SYMBOL', value: code, raw: item });
      } else {
        tokens.push({ type: 'COMMAND', value: code, raw: item });
      }
      tokens.push({ type: 'COMMAND', value: 'lns' });
    } else if (item === ' ') {
      // Space becomes a vertical offset
      tokens.push({
        type: 'COMMAND',
        value: `down${Math.round(textSize * 0.01)}`,
      });
    } else {
      // Split each character
      for (const char of item) {
        if (char === '\u2019') {
          // Special handling for right single quote
          tokens.push({ type: 'COMMAND', value: `right${Math.round(textSize * 0.6)}` });
          tokens.push({ type: 'TEXT', value: '\u2019' });
          tokens.push({ type: 'COMMAND', value: 'lns' });
          tokens.push({ type: 'COMMAND', value: `up${Math.round(textSize * 0.75)}` });
        } else if (options.manaCost && index === splitText.length - 1) {
          // Last character in mana cost doesn't get line break
          tokens.push({ type: 'TEXT', value: char });
        } else {
          tokens.push({ type: 'TEXT', value: char });
          tokens.push({ type: 'COMMAND', value: 'lns' });
        }
      }
    }
  }

  tokens.push({ type: 'TEXT', value: '' });
  return tokens;
}

/**
 * Check if a code represents a mana symbol
 * This includes all mana symbols, loyalty abilities, and special icons
 */
function isSymbolCode(code: string): boolean {
  const cleaned = code.replace(/\//g, '');

  // Generic mana (0-20)
  if (/^[0-9]{1,2}$/.test(cleaned) && parseInt(cleaned) >= 0 && parseInt(cleaned) <= 20) {
    return true;
  }

  // Single color symbols
  if (['w', 'u', 'b', 'r', 'g', 'c', 'x', 'y', 'z', 's', 'e', 'a', 'p'].includes(cleaned)) {
    return true;
  }

  // Tap symbols
  if (['t', 'untap', 'oldtap', 'originaltap'].includes(cleaned)) {
    return true;
  }

  // Hybrid mana (2-letter combos)
  const hybridPatterns = [
    'wu', 'wb', 'ub', 'ur', 'br', 'bg', 'rg', 'rw', 'gw', 'gu',
    '2w', '2u', '2b', '2r', '2g',
    'wp', 'up', 'bp', 'rp', 'gp',
    'wup', 'wbp', 'ubp', 'urp', 'brp', 'bgp', 'rgp', 'rwp', 'gwp', 'gup',
    'cw', 'cu', 'cb', 'cr', 'cg',
  ];
  if (hybridPatterns.includes(cleaned)) {
    return true;
  }

  // Purple mana variants
  if (cleaned.includes('purple')) {
    return true;
  }

  // Special symbols
  if (['h', 'chaos', 'planeswalker', 'tk', 'inf', 'alchemy'].includes(cleaned)) {
    return true;
  }

  // Loyalty symbols (+1, -1, etc.)
  if (/^[+-][0-9]$/.test(cleaned)) {
    return true;
  }

  // Bar symbols
  if (cleaned === 'bar' || cleaned === 'whitebar') {
    return true;
  }

  // Double-X symbols (xxbrg, etc.)
  if (cleaned.startsWith('xx')) {
    return true;
  }

  // Bloomburrow pawprint
  if (cleaned === 'p') {
    return true;
  }

  // Pack-prefixed symbols (wanted, m21, oilslick, dm21, etc.)
  // These include prefix + color/number (e.g., wantedw, m21r, dm21r)
  const prefixPatterns = ['wanted', 'm21', 'oilslick', 'dm21'];
  for (const prefix of prefixPatterns) {
    if (cleaned.startsWith(prefix)) {
      return true;
    }
  }

  return false;
}

/**
 * Pre-process field text before tokenization
 * Handles special replacements like {cardname}, reminder text, etc.
 */
export function preprocessFieldText(
  rawText: string,
  options: {
    cardName?: string;
    cardNickname?: string;
    hideReminderText?: boolean;
    italicizeReminderText?: boolean;
    allCaps?: boolean;
    showsFlavorBar?: boolean;
    version?: string;
    artistValue?: string;
  } = {}
): string {
  let text = rawText;

  // Handle reminder text
  if (options.hideReminderText) {
    text = removeReminderText(text);
  } else if (options.italicizeReminderText) {
    text = italicizeReminderText(text);
  }

  // All caps
  if (options.allCaps) {
    text = text.toUpperCase();
  }

  // Card name replacement
  const cardName = options.cardNickname || options.cardName || 'unnamed';
  text = text.replace(/{cardname}/ig, cardName);
  text = text.replace(/~/g, cardName);

  // Bullet point replacement
  text = text.replace(/{bullet}/ig, '•');

  // Artist field handling (remove if empty)
  if (!options.artistValue) {
    text = text.replace('\uFFEE{savex2}{elemidinfo-artist}', '');
  }

  // Flavor bar variants by version
  if (options.version === 'pokemon') {
    text = text.replace(/{flavor}/g, '{oldflavor}{fontsize-20}{fontgillsansbolditalic}');
  } else if (options.version === 'dossier') {
    text = text.replace(/{flavor}(.*)/g, (match) => {
      return '{/indent}{lns}{bar}{lns}{fixtextalign}' + match.replace(/{flavor}/g, '').toUpperCase();
    });
  } else if (options.showsFlavorBar !== false) {
    // Default: flavor bar + italics
    text = text.replace(/{flavor}/g, '{lns}{bar}{lns}{i}');
  } else {
    text = text.replace(/{flavor}/g, '{oldflavor}');
  }

  // Divider: just the bar without italics
  text = text.replace(/{divider}/g, '{lns}{bar}{lns}');

  // Old flavor: italics with double line break (no bar) - matches {flavor} spacing
  text = text.replace(/{oldflavor}/g, '{lns}{lns}{i}');

  // Font-specific replacements
  if (text.includes('saloongirl')) {
    text = text.replace(/\*/g, '{fontbelerenbsc}*{fontsaloongirl}');
  }

  return text;
}

/**
 * Remove reminder text (text in parentheses with italics)
 */
function removeReminderText(text: string): string {
  const flavorIndex = text.indexOf('{flavor}');
  if (flavorIndex >= 0) {
    const rulesText = text.substring(0, flavorIndex);
    const flavorText = text.substring(flavorIndex);
    return rulesText.replace(/ ?{i}\([^)]+\){\/i}/g, '') + flavorText;
  }
  return text.replace(/ ?{i}\([^)]+\){\/i}/g, '');
}

/**
 * Italicize reminder text (text in parentheses)
 */
function italicizeReminderText(text: string): string {
  const flavorIndex = text.indexOf('{flavor}');
  if (flavorIndex >= 0) {
    const rulesText = text.substring(0, flavorIndex);
    const flavorText = text.substring(flavorIndex);
    return rulesText.replace(/\(([^)]+)\)/g, '{i}($1){/i}') + flavorText;
  }
  return text.replace(/\(([^)]+)\)/g, '{i}($1){/i}');
}
