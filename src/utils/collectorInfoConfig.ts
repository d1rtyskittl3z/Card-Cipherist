/**
 * Collector Information Configuration
 * Text template configurations for different collector info display styles
 */

import type { Card } from '../types/card.types';

/**
 * Text box configuration for collector information
 * Based on the original Card Conjurer JavaScript templates
 */
export interface CollectorTextConfig {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  size: number;
  font: string;
  color: string;
  oneLine: boolean;
  align?: 'left' | 'center' | 'right';
  outlineWidth?: number;
}

/**
 * Complete collector info layout configuration
 */
export interface CollectorInfoLayout {
  midLeft?: CollectorTextConfig;
  topLeft?: CollectorTextConfig;
  note?: CollectorTextConfig;
  rarity?: CollectorTextConfig;
  bottomLeft?: CollectorTextConfig;
  middleRight?: CollectorTextConfig;
  bottomRight?: CollectorTextConfig;
}

/**
 * Star-mode X overrides (used when Toggle Star/Dot is ON).
 * Adjust these values manually to fine-tune alignment while using the star.
 */
export const STAR_X_DEFAULT = {
  rarityX: 0.198, // default style rarity X when star is ON
  noteX: 0.2355,   // default style note X when star is ON
};

export const STAR_X_NEW = {
  noteX: 0.198, // new style note X when star is ON
};

/**
 * Special formatting codes used in text templates:
 *
 * Placeholders (replaced with user input):
 * - {elemidinfo-set} → Set Code input
 * - {elemidinfo-language} → Language input
 * - {elemidinfo-artist} → Artist input
 * - {elemidinfo-rarity} → Rarity input
 * - {elemidinfo-number} → Year input
 * - {elemidinfo-note} → Note input
 *
 * Position/cursor control:
 * - {savex} → Save current X position for later restoration
 * - {savex2} → Save current X position to second slot
 * - {loadx} → Restore X position from first save
 * - {loadx2} → Restore X position from second save
 *
 * Font control:
 * - {fontbelerenbsc} → Switch to Beleren Small Caps font
 * - {fontgothammedium} → Switch to Gotham Medium font
 * - {fontsize[value]} → Set font size dynamically
 *
 * Positioning:
 * - {upinline[value]} → Move text up by value (vertical offset)
 * - {kerning[value]} → Adjust letter spacing/kerning
 *
 * Special characters:
 * - \uFFEE → Artist brush symbol (replaced with artistbrush.svg)
 * - \u2022 → Bullet point (•)
 */

/**
 * Note: The original font size and upinline codes were designed for very fine-grained
 * control but don't work well with our current implementation.
 * The artist brush symbol will render at the base font size instead.
 */

/**
 * Get collector info configuration based on selected style
 */
export const getCollectorInfoConfig = (
  card: Card,
  style: 'default' | 'new' | 'artist',
  starMode: boolean = false,
  enableAdditionalFields: boolean = false,
  middleRight: string = '',
  bottomLeft: string = '',
  bottomRight: string = ''
): CollectorInfoLayout => {
  const baseColor = card.bottomInfoColor || 'white';

  // Check if Power/Toughness frame is present
  const hasPowerToughness = card.frames.some(frame =>
    frame.name.includes('Power') || frame.name.includes('Toughness')
  );

  switch (style) {
    case 'default': {
      const rarityXPos = starMode ? STAR_X_DEFAULT.rarityX : 0.193;
      const noteXPos = starMode ? STAR_X_DEFAULT.noteX : 0.230;
      const config: CollectorInfoLayout = {
        // Number at left
        topLeft: {
          text: '{elemidinfo-number}',
          x: 0.0647,
          y: 0.9377,
          width: 0.8707,
          height: 0.0171,
          size: 0.0171,
          font: 'gothammedium',
          color: baseColor,
          oneLine: true,
          outlineWidth: 0.003,
        },
        // Rarity anchored at a fixed X
        rarity: {
          text: '{elemidinfo-rarity}',
          x: rarityXPos,
          y: 0.9377,
          width: 0.05,
          height: 0.0171,
          size: 0.0171,
          font: 'gothammedium',
          color: baseColor,
          oneLine: true,
          outlineWidth: 0.003,
        },
        // Note anchored at a fixed X (approx 52% across the box)
        note: {
          text: '{elemidinfo-note}',
          x: noteXPos,
          y: 0.9377,
          width: 0.35,
          height: 0.0171,
          size: 0.0171,
          font: 'gothammedium',
          color: baseColor,
          oneLine: true,
          outlineWidth: 0.003,
        },
        midLeft: {
          text: `{fontgothammedium}{elemidinfo-set} \u2022 {elemidinfo-language}  \uFFEE {fontbelerenbsc}{elemidinfo-artist}`,
          x: 0.0647,
          y: 0.9548,
          width: 0.8707,
          height: 0.0171,
          size: 0.0171,
          font: 'gothammedium',
          color: baseColor,
          oneLine: true,
          outlineWidth: 0.003,
        },
      };

      // Add additional fields if enabled
      if (enableAdditionalFields) {
        // If P/T frame is present, shift middleRight to align left with bottomRight
        const middleRightAlign: 'left' | 'right' = hasPowerToughness ? 'left' : 'right';

        config.middleRight = {
          text: middleRight,
          x: 0.5354,
          y: 0.9377,
          width: 0.4,
          height: 0.0167,
          oneLine: true,
          font: 'gothammedium',
          size: 0.0171,
          color: baseColor,
          align: middleRightAlign,
          outlineWidth: 0.003,
        };
        config.bottomRight = {
          text: bottomRight,
          x: 0.5354,
          y: 0.9548,
          width: 0.4,
          height: 0.0143,
          oneLine: true,
          font: 'gothammedium',
          size: 0.0171,
          color: baseColor,
          align: middleRightAlign,
          outlineWidth: 0.003,
        };
        config.bottomLeft = {
          text: bottomLeft,
          x: 0.0647,
          y: 0.9719,
          width: 0.8707,
          height: 0.0143,
          oneLine: true,
          font: 'gothammedium',
          size: 0.0171,
          color: baseColor,
          outlineWidth: 0.003,
        };
      }

      return config;
    }
    case 'new': {
      const noteXPos = starMode ? STAR_X_NEW.noteX : 0.1925;
      const config: CollectorInfoLayout = {
        // Keep rarity and number together on the left
        topLeft: {
          text: '{elemidinfo-rarity} {elemidinfo-number}',
          x: 0.0647,
          y: 0.9377,
          width: 0.8707,
          height: 0.0171,
          size: 0.0171,
          font: 'gothammedium',
          color: baseColor,
          oneLine: true,
          outlineWidth: 0.003,
        },
        // Anchor Note at a fixed X so it doesn't shift
        note: {
          text: '{elemidinfo-note}',
          x: noteXPos,
          y: 0.9377,
          width: 0.35,
          height: 0.0171,
          size: 0.0171,
          font: 'gothammedium',
          color: baseColor,
          oneLine: true,
          outlineWidth: 0.003,
        },
        midLeft: {
          text: `{fontgothammedium}{elemidinfo-set} \u2022 {elemidinfo-language}  \uFFEE {fontbelerenbsc}{elemidinfo-artist}`,
          x: 0.0647,
          y: 0.9548,
          width: 0.8707,
          height: 0.0171,
          size: 0.0171,
          font: 'gothammedium',
          color: baseColor,
          oneLine: true,
          outlineWidth: 0.003,
        },
      };

      // Add additional fields if enabled
      if (enableAdditionalFields) {
        // If P/T frame is present, shift middleRight to align left with bottomRight
        const middleRightAlign: 'left' | 'right' = hasPowerToughness ? 'left' : 'right';

        config.middleRight = {
          text: middleRight,
          x: 0.5354,
          y: 0.9377,
          width: 0.4,
          height: 0.0167,
          oneLine: true,
          font: 'gothammedium',
          size: 0.0171,
          color: baseColor,
          align: middleRightAlign,
          outlineWidth: 0.003,
        };
        config.bottomRight = {
          text: bottomRight,
          x: 0.5354,
          y: 0.9548,
          width: 0.4,
          height: 0.0143,
          oneLine: true,
          font: 'gothammedium',
          size: 0.0171,
          color: baseColor,
          align: middleRightAlign,
          outlineWidth: 0.003,
        };
        config.bottomLeft = {
          text: bottomLeft,
          x: 0.0647,
          y: 0.9719,
          width: 0.8707,
          height: 0.0143,
          oneLine: true,
          font: 'gothammedium',
          size: 0.0171,
          color: baseColor,
          outlineWidth: 0.003,
        };
      }

      return config;
    }

    case 'artist':
      return {
        midLeft: {
          text: `\uFFEE {fontbelerenbsc}{elemidinfo-artist}`,
          x: 0.0647,
          y: 0.9548,
          width: 0.8707,
          height: 0.0171,
          size: 0.021,
          font: 'gothammedium',
          color: baseColor,
          oneLine: true,
          outlineWidth: 0.003,
        },
      };

    default:
      return {};
  }
};

/**
 * Replace placeholder tokens with actual values from card data
 */
export const replaceCollectorTokens = (
  text: string,
  values: {
    set?: string;
    language?: string;
    artist?: string;
    rarity?: string;
    number?: string;
    note?: string;
    digits?: string;
  }
): string => {
  return text
    .replace('{elemidinfo-number}', values.number || '')
    .replace('{elemidinfo-set}', values.set || '')
    .replace('{elemidinfo-language}', values.language || '')
    .replace('{elemidinfo-artist}', values.artist || '')
    .replace('{elemidinfo-rarity}', values.rarity || '')
    .replace('{elemidinfo-note}', values.note || '');
};
