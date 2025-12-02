/**
 * Mystical Archive JP Horizontal Utilities
 *
 * Helper functions for managing the Horizontal Japanese Mystical Archive frame stretching.
 * Similar to mysticalArchiveJP.ts but handles the horizontal title bar layout
 * with different stretch element names (adjustableHorizontal instead of adjustable).
 */

import type { Card } from '../types/card.types';
import type { StretchConfig } from '../components/frames/packs/types';
import { scaleWidth, scaleHeight } from './canvasHelpers';

export const MYSTICAL_ARCHIVE_JP_HORIZONTAL_FRAME_PREFIX = '/img/frames/mysticalArchive/jp/horizontal/';

// Title bar width constants (in pixels, based on original 270px default)
export const MYSTICAL_ARCHIVE_JP_HORIZONTAL_MIN_TITLE_WIDTH = 100;
export const MYSTICAL_ARCHIVE_JP_HORIZONTAL_MAX_TITLE_WIDTH = 1000;
export const MYSTICAL_ARCHIVE_JP_HORIZONTAL_DEFAULT_TITLE_WIDTH = 270;

// Type bar width constants (in pixels, based on original 430px default)
export const MYSTICAL_ARCHIVE_JP_HORIZONTAL_MIN_TYPE_WIDTH = 150;
export const MYSTICAL_ARCHIVE_JP_HORIZONTAL_MAX_TYPE_WIDTH = 1000;
export const MYSTICAL_ARCHIVE_JP_HORIZONTAL_DEFAULT_TYPE_WIDTH = 430;

// Base values for text configuration (normalized)
export const MYSTICAL_ARCHIVE_JP_HORIZONTAL_BASE_TITLE_WIDTH = 270 / 1500;
export const MYSTICAL_ARCHIVE_JP_HORIZONTAL_BASE_TYPE_WIDTH = 430 / 1500;

const PATH_SPLIT_REGEX = /(?=[clmz])/gi;

export type MysticalArchiveJPHorizontalChange = [number, number];

export const clampMysticalArchiveHorizontalTitleWidth = (width: number): number => {
  if (Number.isNaN(width)) {
    return MYSTICAL_ARCHIVE_JP_HORIZONTAL_DEFAULT_TITLE_WIDTH;
  }
  return Math.min(
    MYSTICAL_ARCHIVE_JP_HORIZONTAL_MAX_TITLE_WIDTH,
    Math.max(MYSTICAL_ARCHIVE_JP_HORIZONTAL_MIN_TITLE_WIDTH, width),
  );
};

export const clampMysticalArchiveHorizontalTypeWidth = (width: number): number => {
  if (Number.isNaN(width)) {
    return MYSTICAL_ARCHIVE_JP_HORIZONTAL_DEFAULT_TYPE_WIDTH;
  }
  return Math.min(
    MYSTICAL_ARCHIVE_JP_HORIZONTAL_MAX_TYPE_WIDTH,
    Math.max(MYSTICAL_ARCHIVE_JP_HORIZONTAL_MIN_TYPE_WIDTH, width),
  );
};

/**
 * Compute the change value for the title bar (adjustableHorizontal) stretch entry.
 * The change is applied horizontally (x-axis).
 */
export const computeMysticalArchiveHorizontalTitleChange = (width: number): MysticalArchiveJPHorizontalChange => [
  (width - MYSTICAL_ARCHIVE_JP_HORIZONTAL_DEFAULT_TITLE_WIDTH) / 1500,
  0,
];

/**
 * Compute the change value for the type bar stretch entries (typePinline, type).
 * The change is applied horizontally (x-axis).
 */
export const computeMysticalArchiveHorizontalTypeChange = (width: number): MysticalArchiveJPHorizontalChange => [
  (width - MYSTICAL_ARCHIVE_JP_HORIZONTAL_DEFAULT_TYPE_WIDTH) / 1260,
  0,
];

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

const transformSvgWithStretch = (
  svgText: string,
  stretch: StretchConfig[],
  card: Card,
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
  });

  const serializer = new XMLSerializer();
  return serializer.serializeToString(document);
};

export const generateMysticalArchiveHorizontalStretchedImage = async (options: {
  src: string;
  card: Card;
  stretch: StretchConfig[];
}): Promise<HTMLImageElement> => {
  const response = await fetch(options.src);
  if (!response.ok) {
    throw new Error(`Failed to load SVG source: ${options.src}`);
  }

  const rawSvg = await response.text();
  const transformedSvg = transformSvgWithStretch(rawSvg, options.stretch, options.card);

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
