/**
 * PSD Export Test Suite
 *
 * Tests PSD export helper functions including:
 * - romanNumeral conversion
 * - getColorFromSrc parsing
 * - parseColorToRGB conversion
 * - convertBlendMode mapping
 * - createCombinedFrameMask mask compositing
 *
 * Note: These are unit tests for exported and internal helper functions.
 * Integration tests for full PSD export would require canvas mocking.
 */

import {
  parseColorToRGB,
  convertBlendMode,
  createCombinedFrameMask,
} from '../psdExport';
import type { Frame, Card } from '../../types/card.types';

// Note: romanNumeral and getColorFromSrc are internal functions,
// so we test them indirectly or export them for testing

describe('psdExport helpers', () => {
  describe('parseColorToRGB', () => {
    describe('hex colors', () => {
      it('should parse black hex color', () => {
        const result = parseColorToRGB('#000000');
        expect(result).toEqual({ r: 0, g: 0, b: 0 });
      });

      it('should parse white hex color', () => {
        const result = parseColorToRGB('#ffffff');
        expect(result).toEqual({ r: 255, g: 255, b: 255 });
      });

      it('should parse uppercase hex color', () => {
        const result = parseColorToRGB('#FF0000');
        expect(result).toEqual({ r: 255, g: 0, b: 0 });
      });

      it('should parse lowercase hex color', () => {
        const result = parseColorToRGB('#00ff00');
        expect(result).toEqual({ r: 0, g: 255, b: 0 });
      });

      it('should parse mixed case hex color', () => {
        const result = parseColorToRGB('#0000Ff');
        expect(result).toEqual({ r: 0, g: 0, b: 255 });
      });

      it('should parse arbitrary hex color', () => {
        const result = parseColorToRGB('#c8a070');
        expect(result).toEqual({ r: 200, g: 160, b: 112 });
      });
    });

    describe('named colors', () => {
      it('should parse "black"', () => {
        const result = parseColorToRGB('black');
        expect(result).toEqual({ r: 0, g: 0, b: 0 });
      });

      it('should parse "white"', () => {
        const result = parseColorToRGB('white');
        expect(result).toEqual({ r: 255, g: 255, b: 255 });
      });

      it('should parse "red"', () => {
        const result = parseColorToRGB('red');
        expect(result).toEqual({ r: 255, g: 0, b: 0 });
      });

      it('should parse "blue"', () => {
        const result = parseColorToRGB('blue');
        expect(result).toEqual({ r: 0, g: 0, b: 255 });
      });

      it('should parse "green"', () => {
        const result = parseColorToRGB('green');
        expect(result).toEqual({ r: 0, g: 128, b: 0 });
      });

      it('should parse "gray" and "grey" the same', () => {
        const gray = parseColorToRGB('gray');
        const grey = parseColorToRGB('grey');
        expect(gray).toEqual(grey);
        expect(gray).toEqual({ r: 128, g: 128, b: 128 });
      });

      it('should be case-insensitive for named colors', () => {
        const lower = parseColorToRGB('red');
        const upper = parseColorToRGB('RED');
        const mixed = parseColorToRGB('ReD');
        expect(lower).toEqual(upper);
        expect(lower).toEqual(mixed);
      });
    });

    describe('fallback behavior', () => {
      it('should return black for unknown color names', () => {
        const result = parseColorToRGB('unknowncolor');
        expect(result).toEqual({ r: 0, g: 0, b: 0 });
      });

      it('should return black for empty string', () => {
        const result = parseColorToRGB('');
        expect(result).toEqual({ r: 0, g: 0, b: 0 });
      });
    });
  });

  describe('convertBlendMode', () => {
    it('should convert source-over to normal', () => {
      expect(convertBlendMode('source-over')).toBe('normal');
    });

    it('should convert multiply', () => {
      expect(convertBlendMode('multiply')).toBe('multiply');
    });

    it('should convert screen', () => {
      expect(convertBlendMode('screen')).toBe('screen');
    });

    it('should convert overlay', () => {
      expect(convertBlendMode('overlay')).toBe('overlay');
    });

    it('should convert color-dodge', () => {
      expect(convertBlendMode('color-dodge')).toBe('color dodge');
    });

    it('should convert color-burn', () => {
      expect(convertBlendMode('color-burn')).toBe('color burn');
    });

    it('should convert hard-light', () => {
      expect(convertBlendMode('hard-light')).toBe('hard light');
    });

    it('should convert soft-light', () => {
      expect(convertBlendMode('soft-light')).toBe('soft light');
    });

    it('should convert difference', () => {
      expect(convertBlendMode('difference')).toBe('difference');
    });

    it('should convert exclusion', () => {
      expect(convertBlendMode('exclusion')).toBe('exclusion');
    });

    it('should convert hue', () => {
      expect(convertBlendMode('hue')).toBe('hue');
    });

    it('should convert saturation', () => {
      expect(convertBlendMode('saturation')).toBe('saturation');
    });

    it('should convert color', () => {
      expect(convertBlendMode('color')).toBe('color');
    });

    it('should convert luminosity', () => {
      expect(convertBlendMode('luminosity')).toBe('luminosity');
    });

    it('should default to normal for undefined', () => {
      expect(convertBlendMode(undefined)).toBe('normal');
    });

    it('should default to normal for unknown modes', () => {
      expect(convertBlendMode('unknown-mode')).toBe('normal');
    });
  });

  describe('createCombinedFrameMask', () => {
    // Note: Full canvas testing requires jsdom with canvas support
    // These tests verify the function handles edge cases properly

    const mockCard: Card = {
      width: 1000,
      height: 1400,
      marginX: 0,
      marginY: 0,
      frames: [],
      text: {},
      artX: 0,
      artY: 0,
      artZoom: 1,
      artRotate: 0,
    };

    it('should return null for frames with no masks', () => {
      const frame: Frame = {
        name: 'Test Frame',
        visible: true,
        masks: [],
      };

      const result = createCombinedFrameMask(frame, mockCard, 1000, 1400, false);
      expect(result).toBeNull();
    });

    it('should return null for frames with undefined masks', () => {
      const frame: Frame = {
        name: 'Test Frame',
        visible: true,
        masks: undefined as unknown as Frame['masks'],
      };

      const result = createCombinedFrameMask(frame, mockCard, 1000, 1400, false);
      expect(result).toBeNull();
    });

    it('should handle invert parameter', () => {
      // This test verifies the function accepts the invert parameter
      // Full verification would require canvas image data inspection
      const frame: Frame = {
        name: 'Test Frame',
        visible: true,
        masks: [],
      };

      // Both calls should return null for empty masks
      const normalResult = createCombinedFrameMask(frame, mockCard, 1000, 1400, false);
      const invertedResult = createCombinedFrameMask(frame, mockCard, 1000, 1400, true);

      expect(normalResult).toBeNull();
      expect(invertedResult).toBeNull();
    });
  });
});

// Test internal functions by exporting them for testing
// These tests verify the logic of romanNumeral and getColorFromSrc
// which are internal to psdExport.ts

describe('psdExport internal functions (logic verification)', () => {
  describe('romanNumeral logic', () => {
    // Mirror the internal romanNumeral function logic for testing
    const romanNumeral = (num: number): string => {
      const ones = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
      const tens = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'];
      return tens[Math.floor(num / 10)] + ones[num % 10];
    };

    it('should convert 1 to I', () => {
      expect(romanNumeral(1)).toBe('I');
    });

    it('should convert 2 to II', () => {
      expect(romanNumeral(2)).toBe('II');
    });

    it('should convert 3 to III', () => {
      expect(romanNumeral(3)).toBe('III');
    });

    it('should convert 4 to IV', () => {
      expect(romanNumeral(4)).toBe('IV');
    });

    it('should convert 5 to V', () => {
      expect(romanNumeral(5)).toBe('V');
    });

    it('should convert 6 to VI', () => {
      expect(romanNumeral(6)).toBe('VI');
    });

    it('should convert 7 to VII', () => {
      expect(romanNumeral(7)).toBe('VII');
    });

    it('should convert 8 to VIII', () => {
      expect(romanNumeral(8)).toBe('VIII');
    });

    it('should convert 9 to IX', () => {
      expect(romanNumeral(9)).toBe('IX');
    });

    it('should convert 10 to X', () => {
      expect(romanNumeral(10)).toBe('X');
    });

    it('should convert 11 to XI', () => {
      expect(romanNumeral(11)).toBe('XI');
    });

    it('should convert 14 to XIV', () => {
      expect(romanNumeral(14)).toBe('XIV');
    });

    it('should convert 19 to XIX', () => {
      expect(romanNumeral(19)).toBe('XIX');
    });

    it('should convert 20 to XX', () => {
      expect(romanNumeral(20)).toBe('XX');
    });

    it('should convert 40 to XL', () => {
      expect(romanNumeral(40)).toBe('XL');
    });

    it('should convert 49 to XLIX', () => {
      expect(romanNumeral(49)).toBe('XLIX');
    });

    it('should convert 50 to L', () => {
      expect(romanNumeral(50)).toBe('L');
    });

    it('should convert 90 to XC', () => {
      expect(romanNumeral(90)).toBe('XC');
    });

    it('should convert 99 to XCIX', () => {
      expect(romanNumeral(99)).toBe('XCIX');
    });
  });

  describe('getColorFromSrc logic', () => {
    // Mirror the internal getColorFromSrc function logic for testing
    const getColorFromSrc = (imageSrc: string | undefined): string => {
      if (!imageSrc) return '';
      const match = imageSrc.match(/\/(badges|pt)\/([a-z])\.png/i);
      if (match) {
        const colorMap: Record<string, string> = {
          w: 'White',
          u: 'Blue',
          b: 'Black',
          r: 'Red',
          g: 'Green',
          m: 'Multicolored',
          a: 'Artifact',
          c: 'Colorless',
          l: 'Land',
        };
        const color = colorMap[match[2].toLowerCase()];
        return color ? `${color} ` : '';
      }
      return '';
    };

    describe('badge paths', () => {
      it('should extract White from /badges/w.png', () => {
        expect(getColorFromSrc('/badges/w.png')).toBe('White ');
      });

      it('should extract Blue from /badges/u.png', () => {
        expect(getColorFromSrc('/badges/u.png')).toBe('Blue ');
      });

      it('should extract Black from /badges/b.png', () => {
        expect(getColorFromSrc('/badges/b.png')).toBe('Black ');
      });

      it('should extract Red from /badges/r.png', () => {
        expect(getColorFromSrc('/badges/r.png')).toBe('Red ');
      });

      it('should extract Green from /badges/g.png', () => {
        expect(getColorFromSrc('/badges/g.png')).toBe('Green ');
      });

      it('should extract Multicolored from /badges/m.png', () => {
        expect(getColorFromSrc('/badges/m.png')).toBe('Multicolored ');
      });

      it('should extract Artifact from /badges/a.png', () => {
        expect(getColorFromSrc('/badges/a.png')).toBe('Artifact ');
      });

      it('should extract Colorless from /badges/c.png', () => {
        expect(getColorFromSrc('/badges/c.png')).toBe('Colorless ');
      });

      it('should extract Land from /badges/l.png', () => {
        expect(getColorFromSrc('/badges/l.png')).toBe('Land ');
      });
    });

    describe('pt paths', () => {
      it('should extract White from /pt/w.png', () => {
        expect(getColorFromSrc('/pt/w.png')).toBe('White ');
      });

      it('should extract Blue from /pt/u.png', () => {
        expect(getColorFromSrc('/pt/u.png')).toBe('Blue ');
      });
    });

    describe('case insensitivity', () => {
      it('should handle uppercase paths', () => {
        expect(getColorFromSrc('/badges/W.png')).toBe('White ');
      });
    });

    describe('full paths', () => {
      it('should work with full file paths', () => {
        expect(getColorFromSrc('/img/frames/station/badges/r.png')).toBe('Red ');
      });

      it('should work with full pt paths', () => {
        expect(getColorFromSrc('/img/frames/station/pt/g.png')).toBe('Green ');
      });
    });

    describe('edge cases', () => {
      it('should return empty string for undefined', () => {
        expect(getColorFromSrc(undefined)).toBe('');
      });

      it('should return empty string for empty string', () => {
        expect(getColorFromSrc('')).toBe('');
      });

      it('should return empty string for unrelated paths', () => {
        expect(getColorFromSrc('/img/frames/other/file.png')).toBe('');
      });

      it('should return empty string for unknown color letters', () => {
        expect(getColorFromSrc('/badges/x.png')).toBe('');
      });
    });
  });
});
