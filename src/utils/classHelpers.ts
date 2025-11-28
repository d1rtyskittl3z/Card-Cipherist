/**
 * Class Card Helpers
 * Utilities for managing D&D Class card layouts and rendering
 */

import type { Card, TextObject, ClassInfo } from '../types/card.types';
import { scaleHeight, scaleWidth, scaleX, scaleY } from './canvasHelpers';

const CLASS_HEADER_SRC = '/img/frames/class/header.png';

/**
 * Round normalized coordinates to 4 decimal places
 */
const roundNormalized = (value: number): number => Number(value.toFixed(4));

/**
 * Load an image with crossOrigin set
 */
const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });

/**
 * Cached header image promise
 */
let classHeaderPromise: Promise<HTMLImageElement> | null = null;

/**
 * Ensure the class header image is loaded
 */
const ensureClassHeader = async (): Promise<HTMLImageElement> => {
  if (!classHeaderPromise) {
    classHeaderPromise = loadImage(CLASS_HEADER_SRC);
  }
  return classHeaderPromise;
};

/**
 * Apply class level layout to text fields
 * Updates Y positions and heights based on level configuration
 * 
 * @param card - Current card state
 * @param heights - Array of 4 heights (in pixels) for each level
 * @returns Updated text object with calculated positions
 */
export const applyClassLayout = (
  card: Card,
  heights: number[]
): Record<string, TextObject> => {
  const currentText: Record<string, TextObject> = card.text ? { ...card.text } : {};
  
  // Normalize heights to 0-1 range
  const normalizedHeights = heights.map((h) => roundNormalized(h / card.height));
  
  // Starting Y position for first level (from level0c)
  const level0c = currentText.level0c;
  if (!level0c) {
    return currentText;
  }
  
  const headerHeight = 0.0481; // Height of class header divider
  const costNameOffset = 0.0361; // Offset for cost/name row above text
  
  // Start from level0c's Y position
  let lastY = level0c.y;
  
  // Process all 4 levels
  for (let i = 0; i < 4; i++) {
    const height = normalizedHeights[i] || 0;
    const textKey = `level${i}c` as const;
    const textField = currentText[textKey];
    
    if (i === 0) {
      // Level 0 only has a text field, no cost/name
      if (textField) {
        currentText[textKey] = {
          ...textField,
          height: height || 1, // Default to 1 if no height (like original: height || (i === 0 ? 1 : 0))
        };
      }
    } else {
      // Levels 1-3 have cost, name, and text fields
      const costKey = `level${i}a` as const;
      const nameKey = `level${i}b` as const;
      
      if (height > 0) {
        // Position cost and name fields above the text box
        if (currentText[costKey]) {
          currentText[costKey] = {
            ...currentText[costKey],
            y: roundNormalized(lastY - costNameOffset),
          };
        }
        
        if (currentText[nameKey]) {
          currentText[nameKey] = {
            ...currentText[nameKey],
            y: roundNormalized(lastY - costNameOffset),
          };
        }
        
        if (textField) {
          currentText[textKey] = {
            ...textField,
            y: roundNormalized(lastY),
            height,
          };
        }
      } else {
        // Hide fields when height is 0 (put off-screen at y=2)
        if (currentText[costKey]) {
          currentText[costKey] = { ...currentText[costKey], y: 2 };
        }
        if (currentText[nameKey]) {
          currentText[nameKey] = { ...currentText[nameKey], y: 2 };
        }
        if (textField) {
          currentText[textKey] = { ...textField, y: 2, height: 0 };
        }
      }
    }
    
    // Move to next level position: current height + header spacing
    // This happens for ALL levels, including level 0
    lastY = roundNormalized(lastY + height + headerHeight);
  }
  
  return currentText;
};

/**
 * Calculate the number of active class levels
 * 
 * @param heights - Array of level heights
 * @returns Number of levels with non-zero heights
 */
export const calculateClassCount = (heights: number[]): number => {
  return heights.filter((h) => h > 0).length;
};

/**
 * Draw class level headers to the class canvas
 * Headers appear between each level with text
 * 
 * @param context - Canvas context for the class layer
 * @param card - Current card state
 */
export const drawClassLayer = async (
  context: CanvasRenderingContext2D,
  card: Card
): Promise<void> => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  
  // Only render for class versions
  const version = card.version?.toLowerCase();
  if (!version?.includes('class') || !card.class) {
    return;
  }
  
  const classInfo = card.class;
  
  // Load the header image
  const header = await ensureClassHeader();
  
  const headerHeight = 0.0481; // Height of class header divider
  
  // Count active levels (levels with height > 0, starting from level 1)
  let classCount = 0;
  for (let i = 1; i < 4; i++) {
    if (classInfo.levelHeights[i] > 0) {
      classCount++;
    }
  }
  
  // Draw headers for each active level
  let drawnCount = 0;
  for (let i = 1; i < 4 && drawnCount < classCount; i++) {
    const levelHeight = classInfo.levelHeights[i];
    if (levelHeight <= 0) {
      continue;
    }
    
    drawnCount++;
    const textKey = `level${i}c` as const;
    const textField = card.text?.[textKey];
    
    if (!textField || textField.y >= 2) {
      continue;
    }
    
    const x = scaleX(card, classInfo.x);
    const y = scaleY(card, textField.y);
    const width = scaleWidth(card, classInfo.width);
    const height = scaleHeight(card, headerHeight);
    
    // Draw header above the text box (same as original: y - scaleHeight(0.0481))
    context.drawImage(header, x, y - height, width, height);
  }
};

/**
 * Check if a card version is a class card
 * 
 * @param version - Card version string
 * @returns True if this is a class card version
 */
export const isClassVersion = (version: string): boolean => {
  return version?.toLowerCase().includes('class') ?? false;
};

/**
 * Get default class info for a card version
 * 
 * @param version - Card version string
 * @returns Default ClassInfo configuration
 */
export const getDefaultClassInfo = (version?: string): ClassInfo => {
  // Check if this is the StoneCutter Deluxe variant
  if (version === 'classStoneCutterDeluxe') {
    return {
      levelHeights: [0, 0, 0, 0],
      count: 1, // Only level 0 by default
      x: 0.5240,
      width: 0.400,
    };
  }
  
  // Standard class frame
  return {
    levelHeights: [0, 0, 0, 0],
    count: 1, // Only level 0 by default
    x: 0.5014,
    width: 0.422,
  };
};
