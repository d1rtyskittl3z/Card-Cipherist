/**
 * AutoFrame Color Detection Test Suite
 *
 * Tests for color detection from card properties.
 */

import { describe, it, expect } from 'vitest';
import {
  detectLandColors,
  detectSpellColors,
  detectCardColors,
  getCardFrameProperties,
  detectSecondaryColors,
} from '../colorDetection';
import type { ManaColor } from '../../../types/autoFrame.types';

describe('colorDetection', () => {
  describe('detectSpellColors', () => {
    it('should detect single color from mana cost', () => {
      expect(detectSpellColors('{W}')).toEqual(['W']);
      expect(detectSpellColors('{U}')).toEqual(['U']);
      expect(detectSpellColors('{B}')).toEqual(['B']);
      expect(detectSpellColors('{R}')).toEqual(['R']);
      expect(detectSpellColors('{G}')).toEqual(['G']);
    });

    it('should detect single color with generic mana', () => {
      expect(detectSpellColors('{1}{W}')).toEqual(['W']);
      expect(detectSpellColors('{2}{U}')).toEqual(['U']);
      expect(detectSpellColors('{3}{B}{B}')).toEqual(['B']);
    });

    it('should detect two colors from mana cost', () => {
      expect(detectSpellColors('{W}{U}')).toEqual(['W', 'U']);
      expect(detectSpellColors('{B}{R}')).toEqual(['B', 'R']);
      expect(detectSpellColors('{2}{G}{W}')).toEqual(['W', 'G']);
    });

    it('should detect three colors from mana cost', () => {
      expect(detectSpellColors('{W}{U}{B}')).toEqual(['W', 'U', 'B']);
      expect(detectSpellColors('{1}{R}{G}{W}')).toEqual(['W', 'R', 'G']);
    });

    it('should detect all five colors', () => {
      expect(detectSpellColors('{W}{U}{B}{R}{G}')).toEqual(['W', 'U', 'B', 'R', 'G']);
    });

    it('should return empty array for colorless mana cost', () => {
      expect(detectSpellColors('{3}')).toEqual([]);
      expect(detectSpellColors('{X}')).toEqual([]);
      expect(detectSpellColors('{C}')).toEqual([]);
    });

    it('should handle hybrid mana costs', () => {
      expect(detectSpellColors('{W/U}')).toEqual(['W', 'U']);
      expect(detectSpellColors('{2/W}')).toEqual(['W']);
      expect(detectSpellColors('{R/G}{R/G}')).toEqual(['R', 'G']);
    });

    it('should be case-insensitive', () => {
      expect(detectSpellColors('{w}')).toEqual(['W']);
      expect(detectSpellColors('{u}{b}')).toEqual(['U', 'B']);
    });

    it('should not duplicate colors', () => {
      expect(detectSpellColors('{W}{W}{W}')).toEqual(['W']);
      expect(detectSpellColors('{U}{U}{B}{B}')).toEqual(['U', 'B']);
    });
  });

  describe('detectLandColors', () => {
    it('should detect colors from basic mana abilities', () => {
      expect(detectLandColors('{T}: Add {W}.', 'Land')).toEqual(['W']);
      expect(detectLandColors('{T}: Add {U}.', 'Land')).toEqual(['U']);
      expect(detectLandColors('{T}: Add {B}.', 'Land')).toEqual(['B']);
      expect(detectLandColors('{T}: Add {R}.', 'Land')).toEqual(['R']);
      expect(detectLandColors('{T}: Add {G}.', 'Land')).toEqual(['G']);
    });

    it('should detect multiple colors from dual land abilities', () => {
      expect(detectLandColors('{T}: Add {W} or {U}.', 'Land')).toEqual(['W', 'U']);
      expect(detectLandColors('{T}: Add {B} or {R}.', 'Land')).toEqual(['B', 'R']);
    });

    it('should detect colors from triome abilities', () => {
      const colors = detectLandColors('{T}: Add {W}, {U}, or {B}.', 'Land');
      expect(colors).toContain('W');
      expect(colors).toContain('U');
      expect(colors).toContain('B');
    });

    it('should detect colors from basic land types in type line', () => {
      expect(detectLandColors('', 'Basic Land - Plains')).toEqual(['W']);
      expect(detectLandColors('', 'Basic Land - Island')).toEqual(['U']);
      expect(detectLandColors('', 'Basic Land - Swamp')).toEqual(['B']);
      expect(detectLandColors('', 'Basic Land - Mountain')).toEqual(['R']);
      expect(detectLandColors('', 'Basic Land - Forest')).toEqual(['G']);
    });

    it('should detect colors from dual land type line', () => {
      const colors = detectLandColors('', 'Land - Plains Island');
      expect(colors).toContain('W');
      expect(colors).toContain('U');
    });

    it('should detect colors from shock land type line and ability', () => {
      const colors = detectLandColors(
        '{T}: Add {W} or {U}.',
        'Land - Plains Island'
      );
      expect(colors).toContain('W');
      expect(colors).toContain('U');
    });

    it('should return all colors for "any color" lands', () => {
      const colors = detectLandColors('{T}: Add one mana of any color.', 'Land');
      expect(colors).toEqual(['W', 'U', 'B', 'R', 'G']);
    });

    it('should return empty array for colorless lands', () => {
      expect(detectLandColors('{T}: Add {C}.', 'Land')).toEqual([]);
    });

    it('should strip flavor text before detection', () => {
      const colors = detectLandColors(
        '{T}: Add {W}.\n{flavor}The plains stretch endlessly.',
        'Land'
      );
      expect(colors).toEqual(['W']);
    });

    it('should strip old flavor text before detection', () => {
      const colors = detectLandColors(
        '{T}: Add {R}.\n{oldflavor}Fire burns bright.',
        'Land'
      );
      expect(colors).toEqual(['R']);
    });

    it('should detect colors from rules text with lowercase add', () => {
      expect(detectLandColors(', add {G}', 'Land')).toEqual(['G']);
    });
  });

  describe('detectCardColors', () => {
    it('should detect colors for non-land spells', () => {
      const result = detectCardColors('Creature - Human', '{1}{W}', '');

      expect(result.colors).toEqual(['W']);
      expect(result.isMulticolor).toBe(false);
      expect(result.isColorless).toBe(false);
      expect(result.isLand).toBe(false);
    });

    it('should detect colors for multicolor spells', () => {
      const result = detectCardColors('Creature - Sphinx', '{2}{W}{U}', '');

      expect(result.colors).toEqual(['W', 'U']);
      expect(result.isMulticolor).toBe(true);
      expect(result.isLand).toBe(false);
    });

    it('should detect colors for lands using rules text', () => {
      const result = detectCardColors(
        'Basic Land - Plains',
        '',
        '{T}: Add {W}.'
      );

      expect(result.colors).toEqual(['W']);
      expect(result.isLand).toBe(true);
    });

    it('should handle colorless artifacts', () => {
      const result = detectCardColors('Artifact', '{3}', '');

      expect(result.colors).toEqual([]);
      expect(result.isColorless).toBe(false); // Artifacts aren't considered colorless
    });

    it('should handle colorless non-artifact cards', () => {
      const result = detectCardColors('Creature - Eldrazi', '{8}', '');

      expect(result.colors).toEqual([]);
      expect(result.isColorless).toBe(true);
    });

    it('should handle 5-color spells', () => {
      const result = detectCardColors('Creature', '{W}{U}{B}{R}{G}', '');

      expect(result.colors).toEqual(['W', 'U', 'B', 'R', 'G']);
      expect(result.isMulticolor).toBe(true);
    });
  });

  describe('getCardFrameProperties', () => {
    describe('monocolor cards', () => {
      it('should return correct properties for white creature', () => {
        const props = getCardFrameProperties(['W'], '{1}{W}', 'Creature - Human', '2/2');

        expect(props.frame).toBe('W');
        expect(props.pinline).toBe('W');
        expect(props.rules).toBe('W');
        expect(props.typeTitle).toBe('W');
        expect(props.pt).toBe('W');
        expect(props.frameRight).toBeUndefined();
        expect(props.pinlineRight).toBeUndefined();
        expect(props.rulesRight).toBeUndefined();
      });

      it('should return correct properties for blue instant', () => {
        const props = getCardFrameProperties(['U'], '{U}', 'Instant', '');

        expect(props.frame).toBe('U');
        expect(props.pinline).toBe('U');
        expect(props.rules).toBe('U');
        expect(props.typeTitle).toBe('U');
        expect(props.pt).toBeNull();
      });
    });

    describe('multicolor cards', () => {
      it('should return correct properties for 2-color non-hybrid', () => {
        const props = getCardFrameProperties(['W', 'U'], '{W}{U}', 'Creature - Sphinx', '4/4');

        expect(props.frame).toBe('M');
        expect(props.pinline).toBe('W');
        expect(props.pinlineRight).toBe('U');
        expect(props.rules).toBe('W');
        expect(props.rulesRight).toBe('U');
        expect(props.typeTitle).toBe('M');
        expect(props.pt).toBe('M');
      });

      it('should return correct properties for 2-color hybrid', () => {
        const props = getCardFrameProperties(['W', 'U'], '{W/U}{W/U}', 'Creature - Spirit', '2/2');

        expect(props.frame).toBe('W');
        expect(props.frameRight).toBe('U');
        expect(props.pinline).toBe('W');
        expect(props.pinlineRight).toBe('U');
        expect(props.typeTitle).toBe('L'); // Hybrid uses land-style title bar
      });

      it('should return correct properties for 3+ color', () => {
        const props = getCardFrameProperties(
          ['W', 'U', 'B'],
          '{W}{U}{B}',
          'Creature - Zombie',
          '3/3'
        );

        expect(props.frame).toBe('M');
        expect(props.pinline).toBe('M');
        expect(props.rules).toBe('M');
        expect(props.typeTitle).toBe('M');
      });
    });

    describe('artifact cards', () => {
      it('should return artifact properties for colorless artifact', () => {
        const props = getCardFrameProperties([], '{3}', 'Artifact', '');

        expect(props.frame).toBe('A');
        expect(props.pinline).toBe('A');
        expect(props.rules).toBe('A');
        expect(props.typeTitle).toBe('A');
      });

      it('should return artifact frame for artifact creature', () => {
        const props = getCardFrameProperties([], '{4}', 'Artifact Creature - Golem', '4/4');

        expect(props.frame).toBe('A');
        expect(props.pt).toBe('A');
      });

      it('should return colored properties for colored artifact', () => {
        const props = getCardFrameProperties(['U'], '{2}{U}', 'Artifact Creature', '2/2');

        // Artifacts use artifact frame, but pinline/rules use the color
        expect(props.frame).toBe('A');
        expect(props.pinline).toBe('U');
      });
    });

    describe('land cards', () => {
      it('should return land properties for colorless land', () => {
        const props = getCardFrameProperties([], '', 'Land', '');

        expect(props.frame).toBe('L');
        expect(props.pinline).toBe('L');
        expect(props.rules).toBe('L');
        expect(props.typeTitle).toBe('L');
      });

      it('should return correct properties for monocolor land', () => {
        const props = getCardFrameProperties(['W'], '', 'Basic Land - Plains', '');

        expect(props.frame).toBe('L');
        expect(props.pinline).toBe('WL');
        expect(props.rules).toBe('WL');
        expect(props.typeTitle).toBe('WL');
      });

      it('should return correct properties for dual land', () => {
        const props = getCardFrameProperties(['W', 'U'], '', 'Land - Plains Island', '');

        expect(props.frame).toBe('L');
        expect(props.pinline).toBe('WL');
        expect(props.pinlineRight).toBe('UL');
        expect(props.rules).toBe('WL');
        expect(props.rulesRight).toBe('UL');
        expect(props.typeTitle).toBe('L');
      });

      it('should return multicolor land properties for 3+ color land', () => {
        const props = getCardFrameProperties(
          ['W', 'U', 'B'],
          '',
          'Land',
          ''
        );

        expect(props.rules).toBe('ML');
        expect(props.typeTitle).toBe('M');
      });
    });

    describe('vehicle cards', () => {
      it('should return vehicle properties', () => {
        const props = getCardFrameProperties([], '{4}', 'Artifact - Vehicle', '4/4');

        expect(props.frame).toBe('V');
        expect(props.pt).toBe('V');
      });

      it('should handle colored vehicle', () => {
        const props = getCardFrameProperties(['U'], '{2}{U}', 'Artifact - Vehicle', '3/3');

        // Vehicles always use vehicle frame
        expect(props.frame).toBe('V');
        expect(props.pt).toBe('V');
      });
    });

    describe('style variants', () => {
      it('should handle Borderless style', () => {
        const props = getCardFrameProperties([], '{3}', 'Creature', '', 'Borderless');

        expect(props.frame).toBe('L');
        expect(props.rules).toBe('C');
        expect(props.typeTitle).toBe('C');
      });

      it('should handle Etched style', () => {
        const props = getCardFrameProperties(['W', 'U'], '{W/U}', 'Creature', '2/2', 'Etched');

        expect(props.frame).toBe('W');
        expect(props.frameRight).toBe('U');
      });

      it('should handle Seventh style', () => {
        const props = getCardFrameProperties(['W'], '{W}', 'Creature', '1/1', 'Seventh');

        expect(props.rules).toBe('W');
      });

      it('should handle Seventh style for land', () => {
        const props = getCardFrameProperties([], '', 'Land', '', 'Seventh');

        expect(props.rules).toBe('L');
        expect(props.frame).toBe('L');
      });

      it('should handle Phyrexian style', () => {
        const props = getCardFrameProperties(['B'], '{2}{B}', 'Creature', '3/3', 'Phyrexian');

        expect(props.frame).toBe('B');
        expect(props.pinline).toBe('B');
      });
    });
  });

  describe('detectSecondaryColors', () => {
    it('should detect single color', () => {
      expect(detectSecondaryColors('{G}')).toEqual(['G']);
      expect(detectSecondaryColors('{W}')).toEqual(['W']);
    });

    it('should detect multiple colors', () => {
      expect(detectSecondaryColors('{W}{U}')).toEqual(['W', 'U']);
      // Colors are returned in WUBRG order
      expect(detectSecondaryColors('{R}{G}{B}')).toEqual(['B', 'R', 'G']);
    });

    it('should return second color only for hybrid mana', () => {
      // Second color in WUBRG order (not slash order)
      // {G/W} has colors G and W, in WUBRG order: W, G - second is G
      expect(detectSecondaryColors('{G/W}')).toEqual(['G']);
      // {U/R} has colors U and R, in WUBRG order: U, R - second is R
      expect(detectSecondaryColors('{U/R}')).toEqual(['R']);
    });

    it('should handle hybrid with only one color detected', () => {
      expect(detectSecondaryColors('{2/W}')).toEqual(['W']);
    });

    it('should return empty array for colorless', () => {
      expect(detectSecondaryColors('{3}')).toEqual([]);
      expect(detectSecondaryColors('')).toEqual([]);
    });

    it('should be case-insensitive', () => {
      expect(detectSecondaryColors('{g}')).toEqual(['G']);
      expect(detectSecondaryColors('{w/u}')).toEqual(['U']);
    });
  });

  describe('color ordering', () => {
    it('should properly order two-color pairs', () => {
      // The getCardFrameProperties should normalize color order
      // Testing a few specific pairs that should be reversed

      // Azorius (W/U) - U comes before W in the reorder
      const azorius = getCardFrameProperties(['U', 'W'] as ManaColor[], '{W}{U}', 'Creature', '2/2');
      expect(azorius.pinline).toBe('W');
      expect(azorius.pinlineRight).toBe('U');

      // Dimir (U/B) - B comes before U
      const dimir = getCardFrameProperties(['B', 'U'] as ManaColor[], '{U}{B}', 'Creature', '2/2');
      expect(dimir.pinline).toBe('U');
      expect(dimir.pinlineRight).toBe('B');
    });
  });
});
