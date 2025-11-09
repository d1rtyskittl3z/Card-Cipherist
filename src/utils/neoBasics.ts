import type { Card, FrameColorOverride } from '../types/card.types';
import type { StretchConfig } from '../components/frames/packs/types';
import { scaleWidth, scaleHeight } from './canvasHelpers';

export const NEO_BASICS_FRAME_PREFIX = '/img/frames/neo/basics/';
export const NEO_BASICS_MIN_TITLE_HEIGHT = 330;
export const NEO_BASICS_MAX_TITLE_HEIGHT = 1000;
export const NEO_BASICS_BASE_TITLE_HEIGHT = 500 / 2100;

export const DEFAULT_COLOR_OVERRIDE: FrameColorOverride = {
  mode: 'auto',
  color: '#ffffff',
  source: undefined,
};

const PATH_SPLIT_REGEX = /(?=[clmz])/gi;
const FILL_REGEX = /fill:\s*(#[0-9a-fA-F]{3,6}|%23[0-9a-fA-F]{3,6})/i;

export type NeoBasicsChange = [number, number];

export const clampNeoBasicsTitleHeight = (height: number): number => {
  if (Number.isNaN(height)) {
    return NEO_BASICS_MIN_TITLE_HEIGHT;
  }
  return Math.min(NEO_BASICS_MAX_TITLE_HEIGHT, Math.max(NEO_BASICS_MIN_TITLE_HEIGHT, height));
};

export const computeNeoBasicsChange = (height: number): NeoBasicsChange => [
  0,
  (height - NEO_BASICS_MIN_TITLE_HEIGHT) / 2100,
];

export const cloneNeoBasicsOverrides = (
  overrides: Record<string, FrameColorOverride | undefined>,
  elementNames: string[],
): Record<string, FrameColorOverride> => {
  const result: Record<string, FrameColorOverride> = {};
  elementNames.forEach((name) => {
    const source = overrides[name];
    result[name] = source ? { ...source } : { ...DEFAULT_COLOR_OVERRIDE };
  });
  return result;
};

const normalizeHexColor = (color: string): string => {
  if (!color) {
    return '#ffffff';
  }
  if (color.startsWith('%23')) {
    return `#${color.slice(3)}`;
  }
  return color.startsWith('#') ? color : `#${color}`;
};

const transformPathData = (
  pathData: string,
  stretchEntry: StretchConfig,
  card: Card,
): string => {
  const commands = pathData.split(PATH_SPLIT_REGEX).filter(Boolean);
  if (commands.length === 0) {
    return pathData;
  }

  const [normDeltaX = 0, normDeltaY = 0] = stretchEntry.change ?? [0, 0];
  const baseDeltaX = scaleWidth(card, normDeltaX);
  const baseDeltaY = scaleHeight(card, normDeltaY);

  let newData = '';

  commands.forEach((command, index) => {
    const commandType = command.charAt(0);
    const payload = command.slice(1);

    const affectsSegment =
      stretchEntry.targets.includes(index) || stretchEntry.targets.includes(-index);

    if (!affectsSegment) {
      newData += command;
      return;
    }

    let sign = 1;
    if (index !== 0 && stretchEntry.targets.includes(-index)) {
      sign = -1;
    }

    const deltaX = baseDeltaX * sign;
    const deltaY = baseDeltaY * sign;

    if ((commandType === 'C' || commandType === 'c') && payload.trim().length > 0) {
      const pairs = payload.trim().split(/\s+/);
      const transformedPairs = pairs.map((pair) => {
        const [xStr, yStr] = pair.split(',');
        if (xStr === undefined || yStr === undefined) {
          return pair;
        }
        const x = Number.parseFloat(xStr);
        const y = Number.parseFloat(yStr);
        if (Number.isNaN(x) || Number.isNaN(y)) {
          return pair;
        }
        const newX = x + deltaX;
        const newY = y + deltaY;
        return `${newX},${newY}`;
      });
      newData += `${commandType}${transformedPairs.join(' ')}`;
    } else if (payload.trim().length > 0) {
      const coords = payload.trim().split(/[, ]+/);
      const [xStr, yStr] = coords;
      if (xStr === undefined || yStr === undefined) {
        newData += command;
        return;
      }
      const x = Number.parseFloat(xStr);
      const y = Number.parseFloat(yStr);
      if (Number.isNaN(x) || Number.isNaN(y)) {
        newData += command;
        return;
      }
      const newX = x + deltaX;
      const newY = y + deltaY;
      newData += `${commandType}${newX},${newY}`;
    } else {
      newData += command;
    }
  });

  return newData;
};

const applyColorOverrideToElement = (element: Element, color: string) => {
  const normalizedColor = normalizeHexColor(color);
  const existingStyle = element.getAttribute('style') ?? '';

  if (existingStyle.match(FILL_REGEX)) {
    const updatedStyle = existingStyle.replace(FILL_REGEX, `fill:${normalizedColor}`);
    element.setAttribute('style', updatedStyle);
  } else if (existingStyle.length > 0) {
    element.setAttribute('style', `${existingStyle};fill:${normalizedColor}`);
  } else {
    element.setAttribute('style', `fill:${normalizedColor}`);
  }
};

const transformSvgWithStretch = (
  svgText: string,
  stretch: StretchConfig[],
  card: Card,
  colorOverrides?: Record<string, FrameColorOverride>,
): string => {
  if (typeof DOMParser === 'undefined' || typeof XMLSerializer === 'undefined') {
    return svgText;
  }

  const parser = new DOMParser();
  const document = parser.parseFromString(svgText, 'image/svg+xml');

  stretch.forEach((stretchEntry) => {
    const element = document.getElementById(stretchEntry.name);
    if (!element) {
      return;
    }

    const pathData = element.getAttribute('d');
    if (pathData) {
      const updatedPath = transformPathData(pathData, stretchEntry, card);
      element.setAttribute('d', updatedPath);
    }

    const override = colorOverrides?.[stretchEntry.name];
    if (override?.mode === 'manual' && override.color) {
      applyColorOverrideToElement(element, override.color);
    }
  });

  const serializer = new XMLSerializer();
  return serializer.serializeToString(document);
};

export const generateStretchedFrameImage = async (
  options: {
    src: string;
    card: Card;
    stretch: StretchConfig[];
    colorOverrides?: Record<string, FrameColorOverride>;
  },
): Promise<HTMLImageElement> => {
  const response = await fetch(options.src);
  if (!response.ok) {
    throw new Error(`Failed to load SVG source: ${options.src}`);
  }

  const rawSvg = await response.text();
  const transformedSvg = transformSvgWithStretch(
    rawSvg,
    options.stretch,
    options.card,
    options.colorOverrides,
  );

  const blob = new Blob([transformedSvg], { type: 'image/svg+xml' });
  const objectUrl = URL.createObjectURL(blob);
  const image = new Image();
  image.crossOrigin = 'anonymous';
  const loadPromise = new Promise<void>((resolve, reject) => {
    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve();
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error(`Failed to load stretched SVG image for ${options.src}`));
    };
  });
  image.src = objectUrl;
  await loadPromise;
  return image;
};
