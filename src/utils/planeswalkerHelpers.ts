import type { Card, PlaneswalkerInfo, TextObject } from '../types/card.types';
import { loadImage, scaleHeight, scaleWidth, scaleX, scaleY } from './canvasHelpers';

export const PLANESWALKER_ABILITY_KEYS = ['ability0', 'ability1', 'ability2', 'ability3'] as const;
export type PlaneswalkerAbilityKey = (typeof PLANESWALKER_ABILITY_KEYS)[number];

const DEFAULT_X = 0.1167;
const DEFAULT_WIDTH = 0.8094;
const TRANSFORM_FRONT_WIDTH = 0.8334;

export const computePlaneswalkerHeights = (card: Card): number[] =>
  PLANESWALKER_ABILITY_KEYS.map((key) => card.text?.[key]?.height ?? 0);

export const computePlaneswalkerCount = (heights: number[]): number => heights.filter((value) => value > 0).length;

export const applyPlaneswalkerLayout = (
  card: Card,
  heights: number[],
  baseY?: number
): Record<string, TextObject> => {
  const text = card.text ? { ...card.text } : {};
  const firstAbility = card.text?.ability0;
  if (!firstAbility) {
    return text;
  }

  const startY = typeof baseY === 'number' ? baseY : firstAbility.y ?? 0;
  let currentY = startY;

  PLANESWALKER_ABILITY_KEYS.forEach((key, index) => {
    const field = card.text?.[key];
    if (!field) {
      return;
    }

    const nextHeight = Number.isFinite(heights[index]) ? Number(heights[index]) : field.height ?? 0;
    const clampedHeight = Math.max(0, nextHeight);
    const roundedHeight = Number(clampedHeight.toFixed(4));
    const roundedY = Number(currentY.toFixed(4));

    text[key] = {
      ...field,
      y: roundedY,
      height: roundedHeight,
    };

    currentY += clampedHeight;
  });

  return text;
};

export const adjustPlaneswalkerTextBounds = (
  text: Record<string, TextObject>,
  info: PlaneswalkerInfo | null | undefined,
  index: number,
  hasCost: boolean
): Record<string, TextObject> => {
  const key = PLANESWALKER_ABILITY_KEYS[index];
  const field = text[key];
  if (!field) {
    return text;
  }

  const original = info?.originalAbilityBounds?.[index] ?? { x: field.x, width: field.width };
  const baseX = original.x ?? field.x ?? 0;
  const baseWidth = original.width ?? field.width ?? 0;

  const FIRST_ABILITY_SHIFT = 0.01;

  if (!hasCost) {
    return {
      ...text,
      [key]: {
        ...field,
        x: Number((baseX - 0.044).toFixed(4)),
        width: Number((baseWidth + 0.044).toFixed(4)),
      },
    };
  }

  const xOffset = index === 0 ? FIRST_ABILITY_SHIFT : 0;
  const widthAdjustment = index === 0 ? -FIRST_ABILITY_SHIFT : 0;

  const updatedField: TextObject = {
    ...field,
    x: Number((baseX + xOffset).toFixed(4)),
    width: Number((baseWidth + widthAdjustment).toFixed(4)),
  };

  return {
    ...text,
    [key]: updatedField,
  };
};

interface PlaneswalkerAssets {
  plusIcon: HTMLImageElement;
  minusIcon: HTMLImageElement;
  neutralIcon: HTMLImageElement;
  oddTransition: HTMLImageElement;
  evenTransition: HTMLImageElement;
  textMask: HTMLImageElement;
  lightColor: string;
  darkColor: string;
}

const PLANESWALKER_ASSET_CACHE: Record<string, Promise<PlaneswalkerAssets>> = {};

const getVersionKey = (version?: string | null): 'regular' | 'tall' | 'transformFront' | 'sdcc15' => {
  if (!version) {
    return 'regular';
  }
  const lower = version.toLowerCase();
  if (lower.includes('sdcc15')) {
    return 'sdcc15';
  }
  if (lower.includes('transformfront')) {
    return 'transformFront';
  }
  if (lower.includes('tall') || lower.includes('compleated')) {
    return 'tall';
  }
  return 'regular';
};

const getIconPath = (versionKey: ReturnType<typeof getVersionKey>, name: string): string => {
  if (versionKey === 'sdcc15') {
    return `/img/frames/planeswalker/sdcc15/${name}.svg`;
  }
  return `/img/frames/planeswalker/${name}.png`;
};

const getAbilityLinePath = (
  versionKey: ReturnType<typeof getVersionKey>,
  invert: boolean,
  parity: 'odd' | 'even'
): string => {
  if (invert) {
    return `/img/frames/planeswalker/abilityLine${parity === 'odd' ? 'Odd' : 'Even'}Darkened.png`;
  }
  if (versionKey === 'sdcc15') {
    return `/img/frames/planeswalker/sdcc15/abilityLine${parity === 'odd' ? 'Odd' : 'Even'}.svg`;
  }
  return `/img/frames/planeswalker/abilityLine${parity === 'odd' ? 'Odd' : 'Even'}.png`;
};

const getTextMaskPath = (versionKey: ReturnType<typeof getVersionKey>): string => {
  switch (versionKey) {
    case 'tall':
      return '/img/frames/planeswalker/tall/planeswalkerTallMaskRules.png';
    case 'transformFront':
      return '/img/frames/planeswalker/transform/textFront.svg';
    default:
      return '/img/frames/planeswalker/text.svg';
  }
};

const getDefaultWidth = (version?: string | null): number =>
  getVersionKey(version) === 'transformFront' ? TRANSFORM_FRONT_WIDTH : DEFAULT_WIDTH;

const loadPlaneswalkerAssets = async (version: string, invert: boolean): Promise<PlaneswalkerAssets> => {
  const versionKey = getVersionKey(version);

  const [plusIcon, minusIcon, neutralIcon, oddTransition, evenTransition, textMask] = await Promise.all([
    loadImage(getIconPath(versionKey, 'planeswalkerPlus')),
    loadImage(getIconPath(versionKey, 'planeswalkerMinus')),
    loadImage(getIconPath(versionKey, 'planeswalkerNeutral')),
    loadImage(getAbilityLinePath(versionKey, invert, 'odd')),
    loadImage(getAbilityLinePath(versionKey, invert, 'even')),
    loadImage(getTextMaskPath(versionKey)),
  ]);

  const colors = invert
    ? { lightColor: 'black', darkColor: '#5b5b5b' }
    : { lightColor: 'white', darkColor: '#a4a4a4' };

  return {
    plusIcon,
    minusIcon,
    neutralIcon,
    oddTransition,
    evenTransition,
    textMask,
    ...colors,
  };
};

export const ensurePlaneswalkerAssets = async (
  version: string,
  invert: boolean
): Promise<PlaneswalkerAssets> => {
  const key = `${getVersionKey(version)}-${invert ? 'invert' : 'normal'}`;
  if (!PLANESWALKER_ASSET_CACHE[key]) {
    PLANESWALKER_ASSET_CACHE[key] = loadPlaneswalkerAssets(version, invert);
  }
  return PLANESWALKER_ASSET_CACHE[key];
};

interface DrawPlaneswalkerLayerOptions {
  card: Card;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  assets: PlaneswalkerAssets;
}

const shouldSkipBackgroundFill = (version?: string | null): boolean => {
  if (!version) {
    return false;
  }
  const lower = version.toLowerCase();
  return lower.includes('sdcc15') || lower.includes('seventh');
};

const PLANESWALKER_ICON_LAYOUT: number[][][] = [
  [[0.7467], [0.6953, 0.822], [0.6639, 0.7467, 0.8362], [0.6505, 0.72, 0.7905, 0.861]],
  [[0.72], [0.6391, 0.801], [0.5986, 0.72, 0.8415], [0.5986, 0.6796, 0.7605, 0.8415]],
];

const getLayoutIndex = (version?: string | null): number => (getVersionKey(version) === 'tall' ? 1 : 0);

export const drawPlaneswalkerPreLayer = async ({
  card,
  context,
  canvas,
  assets,
}: DrawPlaneswalkerLayerOptions): Promise<void> => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (!card.version?.toLowerCase().includes('planeswalker')) {
    return;
  }

  if (!card.planeswalker || shouldSkipBackgroundFill(card.version)) {
    return;
  }

  const abilitySegments = PLANESWALKER_ABILITY_KEYS.map((key) => {
    const field = card.text?.[key];
    if (!field) {
      return null;
    }
    const height = field.height ?? 0;
    if (height <= 0) {
      return null;
    }
    return {
      y: field.y ?? 0,
      height,
    };
  }).filter((segment): segment is { y: number; height: number } => segment !== null);

  if (!abilitySegments.length) {
    return;
  }

  const info = card.planeswalker;
  const baseX = typeof info.x === 'number' ? info.x : DEFAULT_X;
  const baseWidth = typeof info.width === 'number' ? info.width : getDefaultWidth(card.version);
  const pxX = scaleX(card, baseX);
  const pxWidth = scaleWidth(card, baseWidth);
  const transitionHeight = scaleHeight(card, 0.0048);

  abilitySegments.forEach((segment, index) => {
    const yPx = scaleY(card, segment.y);
    const heightPx = scaleHeight(card, segment.height);

    let drawY = yPx;
    let drawHeight = heightPx;
    if (index === 0) {
      drawY -= scaleHeight(card, 0.1);
      drawHeight += scaleHeight(card, 0.1);
    } else if (index === abilitySegments.length - 1) {
      drawHeight += scaleHeight(card, 0.5);
    }

    const isEven = index % 2 === 0;
    context.fillStyle = isEven ? assets.lightColor : assets.darkColor;
    context.globalAlpha = isEven ? 0.608 : 0.706;
    context.fillRect(pxX, drawY + transitionHeight, pxWidth, Math.max(0, drawHeight - 2 * transitionHeight));
    context.globalAlpha = 1;

    const transitionImage = isEven ? assets.oddTransition : assets.evenTransition;
    context.drawImage(transitionImage, pxX, drawY + drawHeight - transitionHeight, pxWidth, 2 * transitionHeight);
  });

  context.globalCompositeOperation = 'destination-in';
  context.drawImage(assets.textMask, scaleX(card, 0), scaleY(card, 0), scaleWidth(card, 1), scaleHeight(card, 1));
  context.globalCompositeOperation = 'source-over';
  context.globalAlpha = 1;
};

export const drawPlaneswalkerPostLayer = async ({
  card,
  context,
  canvas,
  assets,
}: DrawPlaneswalkerLayerOptions): Promise<void> => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (!card.version?.toLowerCase().includes('planeswalker') || !card.planeswalker) {
    return;
  }

  const heights = computePlaneswalkerHeights(card);
  const derivedCount = computePlaneswalkerCount(heights);
  const configuredCount = typeof card.planeswalker.count === 'number' ? card.planeswalker.count : derivedCount;
  const activeCount = Math.min(Math.max(configuredCount, derivedCount), PLANESWALKER_ABILITY_KEYS.length);
  if (activeCount <= 0) {
    return;
  }

  const layoutRow = PLANESWALKER_ICON_LAYOUT[getLayoutIndex(card.version)][activeCount - 1] ?? [];

  context.globalCompositeOperation = 'source-over';
  context.fillStyle = 'white';
  context.textAlign = 'center';
  context.font = `${scaleHeight(card, 0.0286)}px belerenbsc`;

  for (let i = 0; i < activeCount; i += 1) {
    const abilityValue = card.planeswalker.abilities?.[i] ?? '';
    if (!abilityValue) {
      continue;
    }

    const placementBase = layoutRow[i] ?? 0.65;
    const placement = placementBase + (card.planeswalker.abilityAdjust?.[i] ?? 0);
    const placementY = scaleY(card, placement);

    if (abilityValue.includes('+')) {
      context.drawImage(assets.plusIcon, scaleX(card, 0.0294), placementY - scaleHeight(card, 0.0258), scaleWidth(card, 0.14), scaleHeight(card, 0.0724));
      context.fillText(abilityValue, scaleX(card, 0.1027), placementY + scaleHeight(card, 0.0172));
    } else if (abilityValue.includes('-')) {
      context.drawImage(assets.minusIcon, scaleX(card, 0.028), placementY - scaleHeight(card, 0.0153), scaleWidth(card, 0.1414), scaleHeight(card, 0.0705));
      context.fillText(abilityValue, scaleX(card, 0.1027), placementY + scaleHeight(card, 0.0181));
    } else {
      context.drawImage(assets.neutralIcon, scaleX(card, 0.028), placementY - scaleHeight(card, 0.0153), scaleWidth(card, 0.1414), scaleHeight(card, 0.061));
      context.fillText(abilityValue, scaleX(card, 0.1027), placementY + scaleHeight(card, 0.0191));
    }
  }

  context.globalAlpha = 1;
  context.globalCompositeOperation = 'source-over';
};
