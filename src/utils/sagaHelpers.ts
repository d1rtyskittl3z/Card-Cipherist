import type { Card, TextObject } from '../types/card.types';
import { scaleHeight, scaleWidth, scaleX, scaleY } from './canvasHelpers';

const SAGA_DIVIDER_SRC = '/img/frames/saga/sagaDivider.png';
const SAGA_CHAPTER_SRC = '/img/frames/saga/sagaChapter.png';

export const SAGA_ABILITY_KEYS = ['ability0', 'ability1', 'ability2', 'ability3'] as const;

interface SagaAssets {
  divider: HTMLImageElement;
  chapter: HTMLImageElement;
}

const roundNormalized = (value: number): number => Number(value.toFixed(4));

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });

let sagaAssetsPromise: Promise<SagaAssets> | null = null;

const ensureSagaAssets = async (): Promise<SagaAssets> => {
  if (!sagaAssetsPromise) {
    sagaAssetsPromise = Promise.all([loadImage(SAGA_DIVIDER_SRC), loadImage(SAGA_CHAPTER_SRC)]).then(
      ([divider, chapter]) => ({ divider, chapter })
    );
  }

  return sagaAssetsPromise;
};

export const romanNumeral = (input: number): string => {
  if (input <= 0 || Number.isNaN(input)) return `${input}`;

  const romanMap: Array<{ value: number; numeral: string }> = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' },
  ];

  let remaining = Math.floor(input);
  let result = '';

  for (const { value, numeral } of romanMap) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }

  return result;
};

export const calculateSagaAbilityHeights = (card: Card, sagaCount?: number): number[] => {
  const heights = [0, 0, 0, 0];

  const typeField = card.text?.type;
  const ability0 = card.text?.ability0;
  if (!typeField || !ability0) {
    return heights;
  }

  const totalSections = Math.min(
    sagaCount ?? card.saga?.count ?? 0,
    SAGA_ABILITY_KEYS.length
  );

  if (totalSections <= 0) {
    return heights;
  }

  const maxHeight = Math.max(typeField.y - ability0.y, 0);
  if (maxHeight <= 0) {
    return heights;
  }

  const minHeight = maxHeight * 0.15;
  let availableHeight = maxHeight - minHeight * totalSections;
  if (availableHeight < 0) {
    availableHeight = 0;
  }

  const wordCounts = SAGA_ABILITY_KEYS.slice(0, totalSections).map((key) => {
    const text = card.text?.[key]?.text ?? '';
    const sanitized = text.replace(/\([^)]*\)/g, '').trim();
    if (!sanitized) {
      return 1;
    }
    return sanitized.split(/\s+/).filter(Boolean).length || 1;
  });

  const totalWords = wordCounts.reduce((sum, count) => sum + count, 0) || 1;

  for (let i = 0; i < totalSections; i++) {
    const ratio = wordCounts[i] / totalWords;
    const height = roundNormalized(minHeight + ratio * availableHeight);
    heights[i] = height;
  }

  // Ensure the total height does not exceed the allowed space (after rounding)
  const sumHeights = heights.slice(0, totalSections).reduce((sum, h) => sum + h, 0);
  const overflow = sumHeights - maxHeight;
  if (overflow > 0 && heights[totalSections - 1] > overflow) {
    heights[totalSections - 1] = roundNormalized(heights[totalSections - 1] - overflow);
  }

  return heights;
};

export const applySagaHeights = (card: Card, heights: number[]): Record<string, TextObject> => {
  const currentText: Record<string, TextObject> = card.text ? { ...card.text } : {};
  const ability0 = currentText[SAGA_ABILITY_KEYS[0]];
  if (!ability0) {
    return currentText;
  }

  const normalizedHeights = SAGA_ABILITY_KEYS.map((_, index) =>
    roundNormalized(Math.max(0, heights[index] ?? currentText[SAGA_ABILITY_KEYS[index]]?.height ?? 0))
  );

  let runningY = ability0.y;

  SAGA_ABILITY_KEYS.forEach((key, index) => {
    const ability = currentText[key];
    if (!ability) {
      return;
    }

    const height = normalizedHeights[index];

    currentText[key] = {
      ...ability,
      y: roundNormalized(runningY),
      height,
    };

    runningY += height;
  });

  return currentText;
};

export const drawSagaLayer = async (
  context: CanvasRenderingContext2D,
  card: Card
): Promise<void> => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  if (!card.version?.toLowerCase().includes('saga')) {
    return;
  }

  const sagaInfo = card.saga;
  if (!sagaInfo) {
    return;
  }

  const assets = await ensureSagaAssets();
  const { divider, chapter } = assets;

  context.save();
  context.font = `normal normal 550 ${scaleHeight(card, 0.0324)}px plantinsemibold`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = '#0f0f0f';

  let sagaCount = 1;

  SAGA_ABILITY_KEYS.forEach((key, index) => {
    const ability = card.text?.[key];
    if (!ability || ability.height <= 0) {
      return;
    }

    const x = scaleX(card, sagaInfo.x);
    const y = scaleY(card, ability.y);
    const width = scaleWidth(card, sagaInfo.width);
    const height = scaleHeight(card, ability.height);

    const dividerHeight = scaleHeight(card, 0.0029);
    if (divider.complete) {
      context.drawImage(divider, x, y - dividerHeight / 2, width, dividerHeight);
    }

    const chapterCount = Math.max(0, Math.floor(sagaInfo.abilities?.[index] ?? 0));
    if (chapterCount <= 0) {
      return;
    }

    const numeralX = x - scaleWidth(card, 0.0614);
    const numeralWidth = scaleWidth(card, 0.0787);
    const numeralHeight = scaleHeight(card, 0.0629);
    const numeralBaseY = y + (height - numeralHeight) / 2;
    const numeralCenterX = numeralX + numeralWidth / 2;
    const offsetStep = scaleHeight(card, 0.0358) * 2;
    const centerOffset = (chapterCount - 1) / 2;

    for (let i = 0; i < chapterCount; i++) {
      const positionOffset = (i - centerOffset) * offsetStep;
      const drawY = numeralBaseY + positionOffset;

      if (chapter.complete) {
        context.drawImage(chapter, numeralX, drawY, numeralWidth, numeralHeight);
      }

      const numeralText = romanNumeral(sagaCount + i);
      const numeralCenterY = drawY + numeralHeight / 2;

      // Draw text in the exact center of the hexagon using middle alignment.
      context.fillText(numeralText, numeralCenterX, numeralCenterY);
    }

    sagaCount += chapterCount;
  });

  context.restore();
};
