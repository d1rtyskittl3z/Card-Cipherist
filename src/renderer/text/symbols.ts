/**
 * Symbol Atlas
 * Manages mana symbols and other inline icons
 */

import type { SymbolInfo } from './types';

/**
 * Symbol Atlas - manages all inline symbols (mana, icons, etc.)
 */
export class SymbolAtlas {
  private symbols = new Map<string, SymbolInfo>();

  /**
   * Get a symbol by key
   * Supports reversed keys for hybrid mana (e.g., 'wu' or 'uw')
   */
  getSymbol(key: string): SymbolInfo | undefined {
    const cleaned = key.replace(/\//g, '');

    // Try direct lookup
    if (this.symbols.has(cleaned)) {
      return this.symbols.get(cleaned);
    }

    // Try reversed (for hybrid mana)
    const reversed = cleaned.split('').reverse().join('');
    if (this.symbols.has(reversed)) {
      return this.symbols.get(reversed);
    }

    return undefined;
  }

  /**
   * Register a symbol
   */
  registerSymbol(symbol: SymbolInfo): void {
    this.symbols.set(symbol.name, symbol);
  }

  /**
   * Check if a symbol exists
   */
  hasSymbol(key: string): boolean {
    return this.getSymbol(key) !== undefined;
  }

  /**
   * Get all symbol keys
   */
  getSymbolKeys(): string[] {
    return Array.from(this.symbols.keys());
  }

  /**
   * Clear all symbols
   */
  clear(): void {
    this.symbols.clear();
  }
}

/**
 * Load a single mana symbol
 */
export function loadManaSymbol(
  name: string,
  path: string,
  options: {
    matchColor?: boolean;
    width?: number;
    height?: number;
    back?: string;
    backs?: number;
  } = {}
): Promise<SymbolInfo> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';

    image.onload = () => {
      resolve({
        name,
        path,
        image,
        width: options.width ?? 1,
        height: options.height ?? 1,
        matchColor: options.matchColor ?? false,
        back: options.back,
        backs: options.backs,
      });
    };

    image.onerror = () => {
      reject(new Error(`Failed to load mana symbol: ${path}`));
    };

    // Construct full path
    let fullPath = `/img/manaSymbols/${path}`;
    
    // Special case: dm21 symbols load from m21/dark subdirectory
    if (path.startsWith('dm21/dm21')) {
      fullPath = `/img/manaSymbols/m21/dark/${path.split('/')[1]}`;
    }
    
    if (!fullPath.includes('.png') && !fullPath.includes('.svg')) {
      fullPath += '.svg';
    }

    image.src = fullPath;
  });
}

/**
 * Load multiple mana symbols
 */
export async function loadManaSymbols(
  paths: (string | [string, string, number])[],
  options: {
    matchColor?: boolean;
    width?: number;
    height?: number;
  } = {}
): Promise<SymbolInfo[]> {
  const promises = paths.map(async (item) => {
    if (typeof item === 'string') {
      // Simple path
      const name = extractSymbolName(item);
      return loadManaSymbol(name, item, options);
    } else {
      // Path with back variants: [path, backPattern, backCount]
      const [path, back, backs] = item;
      const name = extractSymbolName(path);

      // Load main symbol
      const main = await loadManaSymbol(name, path, { ...options, back, backs });

      // Load back variants
      const backPromises: Promise<SymbolInfo>[] = [];
      for (let i = 0; i < backs; i++) {
        const backName = `back${i}${back}`;
        const backPath = path.replace(name, backName);
        backPromises.push(loadManaSymbol(backName, backPath, options));
      }

      const backSymbols = await Promise.all(backPromises);
      return [main, ...backSymbols];
    }
  });

  const results = await Promise.all(promises);
  return results.flat();
}

const DEFAULT_PREFIX_CODES = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'w',
  'u',
  'b',
  'r',
  'g',
  'c',
  'x',
];

const DEFAULT_PREFIX_EXTENSIONS = ['.svg', '.png'];

interface PrefixConfig {
  codes?: string[];
  options?: {
    matchColor?: boolean;
    width?: number;
    height?: number;
  };
  extension?: string;
  extensions?: string[];
}

const PACK_PREFIX_CONFIGS: Record<string, PrefixConfig> = {
  wanted: {},
  m21: {},
  neon: {},
  oilslick: {
    codes: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', 'w', 'u', 'b', 'r', 'g', 'c', 'x', 'p', 'wp', 'up', 'bp', 'rp', 'gp', ],
    extensions: ['.png', '.svg'],
  },
  dm21: {
    codes: ['w', 'u', 'b', 'r', 'g', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'x'],
    extensions: ['.png', '.svg'], // PNG first since dm21 files are PNG
  },
};

async function loadPrefixedManaSymbols(
  prefix: string,
  config: PrefixConfig = {}
): Promise<SymbolInfo[]> {
  const codes = config.codes ?? DEFAULT_PREFIX_CODES;
  const options = config.options ?? {};
  const extensionCandidates = [
    ...(config.extensions ?? []),
    ...(config.extension ? [config.extension] : []),
    ...DEFAULT_PREFIX_EXTENSIONS,
  ];
  const normalizedExtensions = Array.from(
    new Set(
      extensionCandidates.map((ext) =>
        ext.startsWith('.') ? ext : `.${ext}`
      )
    )
  );
  const symbols: SymbolInfo[] = [];

  for (const code of codes) {
    const name = `${prefix}${code}`;
    let loaded = false;

    for (const ext of normalizedExtensions) {
      const pathWithExt = `${prefix}/${name}${ext}`;
      try {
        const symbol = await loadManaSymbol(name, pathWithExt, options);
        symbols.push(symbol);
        loaded = true;
        break;
      } catch (error) {
        // Skip missing assets and try next extension
      }
    }

    if (!loaded) {
      const basePath = `${prefix}/${name}`;
      try {
        const symbol = await loadManaSymbol(name, basePath, options);
        symbols.push(symbol);
      } catch (error) {
        // Skip missing assets silently; packs can opt-in by adjusting codes list
      }
    }
  }

  return symbols;
}

/**
 * Extract symbol name from path
 */
function extractSymbolName(path: string): string {
  let name = path.split('.')[0];
  if (name.includes('/')) {
    name = name.split('/').pop()!;
  }
  return name;
}

/**
 * Create and populate a standard mana symbol atlas
 */
export async function createStandardManaAtlas(): Promise<SymbolAtlas> {
  const atlas = new SymbolAtlas();

  // Generic mana (0-20)
  const genericSymbols = await loadManaSymbols(
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
  );
  genericSymbols.forEach(s => atlas.registerSymbol(s));

  // Basic colors and variables
  const basicSymbols = await loadManaSymbols(
    ['w', 'u', 'b', 'r', 'g', 'c', 'x', 'y', 'z', 't', 'untap', 's', 'oldtap', 'originaltap', 'purple', 'inf', 'alchemy']
  );
  basicSymbols.forEach(s => atlas.registerSymbol(s));

  // Matchable symbols (energy, acorn, phyrexian)
  const matchableSymbols = await loadManaSymbols(
    ['e', 'a', 'p'],
    { matchColor: true }
  );
  matchableSymbols.forEach(s => atlas.registerSymbol(s));

  // Hybrid mana
  const hybridSymbols = await loadManaSymbols(
    [
      'wu', 'wb', 'ub', 'ur', 'br', 'bg', 'rg', 'rw', 'gw', 'gu',
      '2w', '2u', '2b', '2r', '2g',
      'wp', 'up', 'bp', 'rp', 'gp', 'h',
      'wup', 'wbp', 'ubp', 'urp', 'brp', 'bgp', 'rgp', 'rwp', 'gwp', 'gup',
      'purplew', 'purpleu', 'purpleb', 'purpler', 'purpleg',
      '2purple', 'purplep',
      'cw', 'cu', 'cb', 'cr', 'cg',
    ],
    { width: 1.2, height: 1.2 }
  );
  hybridSymbols.forEach(s => atlas.registerSymbol(s));

  // Bars
  const barSymbols = await loadManaSymbols(['bar.png', 'whitebar.png']);
  barSymbols.forEach(s => atlas.registerSymbol(s));

  // Double-X symbols
  const doubleXSymbols = await loadManaSymbols(
    ['xxbgw', 'xxbrg', 'xxgub', 'xxgwu', 'xxrgw', 'xxrwu', 'xxubr', 'xxurg', 'xxwbr', 'xxwub'],
    { width: 1.2, height: 1.2 }
  );
  doubleXSymbols.forEach(s => atlas.registerSymbol(s));

  // Chaos
  const chaosSymbols = await loadManaSymbols(
    ['chaos'],
    { matchColor: true, width: 1.2, height: 1 }
  );
  chaosSymbols.forEach(s => atlas.registerSymbol(s));

  // Token
  const tokenSymbols = await loadManaSymbols(
    ['tk'],
    { matchColor: true, width: 0.8, height: 1 }
  );
  tokenSymbols.forEach(s => atlas.registerSymbol(s));

  // Planeswalker
  const planeswalkerSymbols = await loadManaSymbols(
    ['planeswalker'],
    { matchColor: true, width: 0.6, height: 1.2 }
  );
  planeswalkerSymbols.forEach(s => atlas.registerSymbol(s));

  // Loyalty
  const loyaltySymbols = await loadManaSymbols(
    ['+1', '+2', '+3', '+4', '+5', '+6', '+7', '+8', '+9', '-1', '-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9', '+0'],
    { matchColor: true, width: 1.6, height: 1 }
  );
  loyaltySymbols.forEach(s => atlas.registerSymbol(s));

  // Pack-specific prefixed mana symbols
  for (const [prefix, config] of Object.entries(PACK_PREFIX_CONFIGS)) {
    const prefixedSymbols = await loadPrefixedManaSymbols(prefix, config);
    prefixedSymbols.forEach((symbol) => {
      atlas.registerSymbol(symbol);
    });
  }

  return atlas;
}

/**
 * Get a random back image for a symbol with variants
 */
export function getRandomBackImage(
  symbol: SymbolInfo,
  atlas: SymbolAtlas
): HTMLImageElement | null {
  if (!symbol.backs || !symbol.back) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * symbol.backs);
  const backName = `back${randomIndex}${symbol.back}`;
  const backSymbol = atlas.getSymbol(backName);

  return backSymbol?.image ?? null;
}
