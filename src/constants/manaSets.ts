/**
 * Built-in Mana Symbol Set Definitions
 *
 * Defines the available alternative mana symbol packs that can be applied
 * globally to all text fields. Each set has a display name and a prefix
 * that maps to symbols in public/img/manaSymbols/{prefix}/.
 *
 * @module constants/manaSets
 */

/**
 * Built-in mana symbol set definition
 */
export interface ManaSetDefinition {
  /** Display name shown in UI dropdown */
  name: string;
  /** Prefix used for symbol lookup (e.g., 'm21' → 'm21w', 'm21u', etc.) */
  prefix: string;
  /** Optional description of the set */
  description?: string;
}

/**
 * All available built-in mana symbol sets.
 *
 * These sets have their symbols pre-loaded in the SymbolAtlas via
 * PACK_PREFIX_CONFIGS in symbols.ts.
 */
export const BUILT_IN_MANA_SETS: readonly ManaSetDefinition[] = [
  { name: 'Breaking News', prefix: 'breakingNews', description: 'Newspaper-style symbols' },
  { name: 'Cartoony', prefix: 'c', description: 'Sheepwave cartoony style with larger sizing' },
  { name: 'FAB', prefix: 'fab', description: 'Flesh and Blood style' },
  { name: 'Future', prefix: 'future', description: 'Future Sight style' },
  { name: 'M21', prefix: 'm21', description: 'Core Set 2021 style' },
  { name: 'M21 Dark', prefix: 'dm21', description: 'Dark variant of M21 style' },
  { name: 'Mystical Archive JP', prefix: 'majp', description: 'Japanese Mystical Archive style' },
  { name: 'Neon', prefix: 'neon', description: 'Neon Dynasty style' },
  { name: 'Oil Slick', prefix: 'oilslick', description: 'Phyrexian oil slick style' },
  { name: 'Old', prefix: 'old', description: 'Pre-modern frame style' },
  { name: 'Outline', prefix: 'outline', description: 'Outlined symbols' },
  { name: 'Outline Alt', prefix: 'outlineAlt', description: 'Alternative outlined symbols' },
  { name: 'Wanted', prefix: 'wanted', description: 'Western wanted poster style' },
  { name: 'Pixel', prefix: 'pixel', description: 'TMNT Pixel style' },
] as const;

/**
 * Standard symbols list that should be recognized for custom uploads.
 * These are the base symbol names (without prefix) that users can provide.
 */
export const STANDARD_SYMBOL_NAMES = [
  // Basic mana colors
  'w', 'u', 'b', 'r', 'g', 'c',
  // Colorless/generic (will also match numbers like '1', '2', etc.)
  'cc', 's', 'x', 't',
  // Hybrid two-color
  'wu', 'wb', 'ub', 'ur', 'br', 'bg', 'rg', 'rw', 'gw', 'gu',
  // Phyrexian
  'wp', 'up', 'bp', 'rp', 'gp', 'cp',
  // Numeric (0-20)
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
  // Special
  'y', 'z', 'q', 'e', 'chaos', 'pw', 'energy', 'acorn', 'halfwhite',
  'half', 'tap', 'untap', 'snow', 'inf',
] as const;

/**
 * Get a mana set definition by prefix
 */
export function getManaSetByPrefix(prefix: string): ManaSetDefinition | undefined {
  return BUILT_IN_MANA_SETS.find(set => set.prefix === prefix);
}

/**
 * Get a mana set definition by name
 */
export function getManaSetByName(name: string): ManaSetDefinition | undefined {
  return BUILT_IN_MANA_SETS.find(set => set.name === name);
}

/**
 * Extract a symbol name from a filename.
 * Matches against STANDARD_SYMBOL_NAMES to find valid symbols.
 *
 * Files can be named like:
 * - "w.png" → "w"
 * - "mana_wu.svg" → "wu"
 * - "symbol-10.png" → "10"
 * - "my_custom_tap.png" → "tap"
 *
 * @param filename - The filename to extract a symbol from
 * @returns The matched symbol name, or null if no match
 */
export function extractSymbolNameFromFilename(filename: string): string | null {
  // Remove file extension
  const nameWithoutExt = filename.replace(/\.[^.]+$/, '').toLowerCase();

  // Sort symbols by length (descending) to match longer symbols first
  // This ensures "10" matches before "1", "wu" before "w", etc.
  const sortedSymbols = [...STANDARD_SYMBOL_NAMES].sort((a, b) => b.length - a.length);

  // Check if filename ends with a symbol name (with optional separator)
  for (const symbol of sortedSymbols) {
    // Match exact filename or ending with separator + symbol
    const patterns = [
      new RegExp(`^${symbol}$`),           // Exact match: "w"
      new RegExp(`[_\\-\\s]${symbol}$`),   // Separator + symbol: "mana_w", "symbol-10"
      new RegExp(`^${symbol}[_\\-\\s]`),   // Symbol + separator at start: "w_custom"
    ];

    for (const pattern of patterns) {
      if (pattern.test(nameWithoutExt)) {
        return symbol;
      }
    }
  }

  // Also check if the whole name (without extension) is a valid symbol
  if ((STANDARD_SYMBOL_NAMES as readonly string[]).includes(nameWithoutExt)) {
    return nameWithoutExt;
  }

  return null;
}

/**
 * Process a list of files and extract symbol mappings.
 * Returns a map of symbol names to data URLs.
 *
 * @param files - FileList from file input
 * @returns Promise resolving to a map of symbol name → data URL
 */
export async function processCustomManaFiles(
  files: FileList
): Promise<{ symbols: Record<string, string>; unmatched: string[] }> {
  const symbols: Record<string, string> = {};
  const unmatched: string[] = [];

  const filePromises: Promise<void>[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // Only process image files
    if (!file.type.startsWith('image/')) {
      continue;
    }

    const symbolName = extractSymbolNameFromFilename(file.name);

    if (symbolName) {
      // Read file as data URL
      const promise = new Promise<void>((resolve) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (typeof reader.result === 'string') {
            symbols[symbolName] = reader.result;
          }
          resolve();
        };

        reader.onerror = () => {
          console.warn(`Failed to read file: ${file.name}`);
          resolve();
        };

        reader.readAsDataURL(file);
      });

      filePromises.push(promise);
    } else {
      unmatched.push(file.name);
    }
  }

  await Promise.all(filePromises);

  return { symbols, unmatched };
}
