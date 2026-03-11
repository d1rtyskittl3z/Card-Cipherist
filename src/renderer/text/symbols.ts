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
    yOffset?: number;
    spacing?: number;
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
        yOffset: options.yOffset,
        spacing: options.spacing,
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
 * Load a single mana symbol from a data URL
 * Used for custom uploaded symbols
 */
export function loadManaSymbolFromDataUrl(
  name: string,
  dataUrl: string,
  options: {
    matchColor?: boolean;
    width?: number;
    height?: number;
    yOffset?: number;
    spacing?: number;
  } = {}
): Promise<SymbolInfo> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    // No crossOrigin needed for data URLs

    image.onload = () => {
      resolve({
        name,
        path: dataUrl,
        image,
        width: options.width ?? 1,
        height: options.height ?? 1,
        yOffset: options.yOffset,
        spacing: options.spacing,
        matchColor: options.matchColor ?? false,
      });
    };

    image.onerror = () => {
      reject(new Error(`Failed to load custom mana symbol: ${name}`));
    };

    image.src = dataUrl;
  });
}

/**
 * Register custom mana symbols from data URLs into an atlas
 * Uses 'custom' as the prefix for all custom symbols
 *
 * @param atlas - The symbol atlas to register symbols into
 * @param symbols - Map of symbol names to data URLs
 * @returns Promise that resolves when all symbols are registered
 */
export async function registerCustomManaSymbols(
  atlas: SymbolAtlas,
  symbols: Record<string, string>
): Promise<void> {
  const loadPromises: Promise<void>[] = [];

  for (const [symbolName, dataUrl] of Object.entries(symbols)) {
    // Create the prefixed name for custom symbols
    const fullName = `custom${symbolName}`;

    // Skip if already registered
    if (atlas.hasSymbol(fullName)) {
      continue;
    }

    const loadPromise = loadManaSymbolFromDataUrl(fullName, dataUrl, {
      width: 1,
      height: 1,
    })
      .then((symbol) => {
        atlas.registerSymbol(symbol);
      })
      .catch((error) => {
        console.warn(`Failed to load custom symbol '${symbolName}':`, error);
      });

    loadPromises.push(loadPromise);
  }

  await Promise.all(loadPromises);
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
    yOffset?: number;
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
    yOffset?: number;
    spacing?: number;
  };
  extension?: string;
  extensions?: string[];
  folder?: string;  // Folder name if different from prefix (e.g., 'cartoony' for 'c' prefix)
}

const PACK_PREFIX_CONFIGS: Record<string, PrefixConfig> = {
  wanted: {},
  m21: {},
  neon: {},
  breakingNews: {},
  outlineAlt: {},
  outline: {},
  majp:{},
  old: {},
  fab: {},
  future: {},
  // Cartoony is loaded separately via loadCartoonySymbols() because it needs back images
  oilslick: {
    codes: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', 'w', 'u', 'b', 'r', 'g', 'c', 'x', 'p', 'wp', 'up', 'bp', 'rp', 'gp', ],
    extensions: ['.png', '.svg'],
  },
  dm21: {
    codes: ['w', 'u', 'b', 'r', 'g', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'x'],
    extensions: ['.png', '.svg'], // PNG first since dm21 files are PNG
  },
  pixel: {
    codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'b', 'c', 'g', 'r', 't', 'u', 'w', 'x'],
    extensions: ['.svg'],
  },
};

async function loadPrefixedManaSymbols(
  prefix: string,
  config: PrefixConfig = {}
): Promise<SymbolInfo[]> {
  const codes = config.codes ?? DEFAULT_PREFIX_CODES;
  const options = config.options ?? {};
  // Use folder if specified, otherwise default to prefix
  const folder = config.folder ?? prefix;
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
      // Use folder for path, but prefix for symbol name
      const pathWithExt = `${folder}/${name}${ext}`;
      try {
        const symbol = await loadManaSymbol(name, pathWithExt, options);
        symbols.push(symbol);
        loaded = true;
        break;
      } catch (_error) {
        // Skip missing assets and try next extension
      }
    }

    if (!loaded) {
      const basePath = `${folder}/${name}`;
      try {
        const symbol = await loadManaSymbol(name, basePath, options);
        symbols.push(symbol);
      } catch (_error) {
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
    { width: 1.2, height: 1.2, yOffset: 0.03 }
  );
  hybridSymbols.forEach(s => atlas.registerSymbol(s));

  // Bars
  const barSymbols = await loadManaSymbols(['bar.png', 'whitebar.png']);
  barSymbols.forEach(s => atlas.registerSymbol(s));

  // Double-X symbols
  const doubleXSymbols = await loadManaSymbols(
    ['xxbgw', 'xxbrg', 'xxgub', 'xxgwu', 'xxrgw', 'xxrwu', 'xxubr', 'xxurg', 'xxwbr', 'xxwub'],
    { width: 1.2, height: 1.2, yOffset: 0.03 }
  );
  doubleXSymbols.forEach(s => atlas.registerSymbol(s));

  // Chaos
  const chaosSymbols = await loadManaSymbols(
    ['chaos'],
    { matchColor: true, width: 1.2, height: 1 }
  );
  chaosSymbols.forEach(s => atlas.registerSymbol(s));

  // Planechase (large chaos symbol — same image as {chaos} but 1.8× taller)
  const planeSymbol = await loadManaSymbol('planechase', 'chaos.svg', { matchColor: true, width: 1.8, height: 1.8 });
  atlas.registerSymbol(planeSymbol);

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

  // Load cartoony symbols with back variants
  const cartoonySymbols = await loadCartoonySymbols();
  cartoonySymbols.forEach((symbol) => atlas.registerSymbol(symbol));

  return atlas;
}

/**
 * Load all cartoony mana symbols with their back image variants
 * Cartoony symbols have splash backgrounds (back images) that render behind the main symbol
 */
async function loadCartoonySymbols(): Promise<SymbolInfo[]> {
  const symbols: SymbolInfo[] = [];

  // Single color symbols with their back mappings
  // Format: [code, backKey, backCount]
  const singleColorSymbols: [string, string, number][] = [
    ['w', 'cw', 4], ['u', 'cu', 4], ['b', 'cb', 4], ['r', 'cr', 4], ['g', 'cg', 4],
  ];

  // Colorless/generic symbols - all use 'cc' back with 15 variants
  const colorlessSymbols: [string, string, number][] = [
    ['0', 'cc', 15], ['1', 'cc', 15], ['2', 'cc', 15], ['3', 'cc', 15], ['4', 'cc', 15],
    ['5', 'cc', 15], ['6', 'cc', 15], ['7', 'cc', 15], ['8', 'cc', 15], ['9', 'cc', 15],
    ['10', 'cc', 15], ['11', 'cc', 15], ['12', 'cc', 15], ['13', 'cc', 15], ['14', 'cc', 15],
    ['15', 'cc', 15], ['16', 'cc', 15], ['17', 'cc', 15], ['18', 'cc', 15], ['19', 'cc', 15],
    ['c', 'cc', 15], ['t', 'cc', 15], ['x', 'cc', 15], ['y', 'cc', 15], ['z', 'cc', 15],
    ['snow', 'cc', 15], ['inf', 'cc', 15], ['untap', 'cc', 15],
  ];

  // Symbols without backs
  const noBackSymbols = ['e', 'flavor'];

  // Hybrid symbols with their back mappings
  const hybridSymbols: [string, string, number][] = [
    ['wu', 'cwu', 2], ['wb', 'cwb', 2], ['ub', 'cub', 2], ['ur', 'cur', 2], ['br', 'cbr', 2],
    ['bg', 'cbg', 2], ['rg', 'crg', 2], ['rw', 'crw', 2], ['gw', 'cgw', 2], ['gu', 'cgu', 2],
  ];

  // Phyrexian symbols
  const phyrexianSymbols: [string, string, number][] = [
    ['pw', 'cw', 4], ['pu', 'cu', 4], ['pb', 'cb', 4], ['pr', 'cr', 4], ['pg', 'cg', 4],
    ['pc', 'cc', 15],
  ];

  // Cartoony pack calls loadManaSymbols WITHOUT size params, so defaults are [1, 1]
  // The manaSymbolsCartoony.js file uses [1.55, 1.55] but pack overrides that
  const singleOptions = { width: 1, height: 1, yOffset: -0.45 };
  const hybridOptions = { width: 1.3, height: 1.3, yOffset: 0.03, spacing: -0.50 };

  // Track which back sets we've already loaded to avoid duplicates
  const loadedBacks = new Set<string>();

  // Helper to load a symbol with its backs
  const loadWithBacks = async (
    code: string,
    back: string,
    backs: number,
    options: typeof singleOptions
  ): Promise<SymbolInfo[]> => {
    const result: SymbolInfo[] = [];
    const name = `c${code}`;
    const path = `cartoony/${name}.png`;

    try {
      // Load main symbol with back info
      const mainSymbol = await loadManaSymbol(name, path, { ...options, back, backs });
      result.push(mainSymbol);

      // Load back variants if not already loaded
      if (!loadedBacks.has(back)) {
        loadedBacks.add(back);
        for (let i = 0; i < backs; i++) {
          const backName = `back${i}${back}`;
          const backPath = `cartoony/${backName}.png`;
          try {
            const backSymbol = await loadManaSymbol(backName, backPath, {});
            result.push(backSymbol);
          } catch (_e) {
            // Back image might not exist, skip silently
          }
        }
      }
    } catch (_e) {
      // Symbol might not exist, skip silently
    }

    return result;
  };

  // Load single color symbols
  for (const [code, back, backs] of singleColorSymbols) {
    const loaded = await loadWithBacks(code, back, backs, singleOptions);
    symbols.push(...loaded);
  }

  // Load colorless symbols
  for (const [code, back, backs] of colorlessSymbols) {
    const loaded = await loadWithBacks(code, back, backs, singleOptions);
    symbols.push(...loaded);
  }

  // Load symbols without backs
  for (const code of noBackSymbols) {
    const name = `c${code}`;
    const path = `cartoony/${name}.png`;
    try {
      const symbol = await loadManaSymbol(name, path, singleOptions);
      symbols.push(symbol);
    } catch (_e) {
      // Skip missing symbols
    }
  }

  // Load hybrid symbols
  for (const [code, back, backs] of hybridSymbols) {
    const loaded = await loadWithBacks(code, back, backs, hybridOptions);
    symbols.push(...loaded);
  }

  // Load phyrexian symbols
  for (const [code, back, backs] of phyrexianSymbols) {
    const loaded = await loadWithBacks(code, back, backs, hybridOptions);
    symbols.push(...loaded);
  }

  return symbols;
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
