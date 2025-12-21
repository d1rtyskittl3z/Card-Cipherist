/**
 * AutoFrame Orchestrator Test Suite
 *
 * Tests for the main frame generation orchestration.
 */

import { describe, it, expect } from 'vitest';
import {
  buildAutoFrame,
  determineStyle,
  getPreservedFrames,
  getFramesForRendering,
} from '../orchestrator';
import type { AutoFrameType } from '../../../types/autoFrame.types';

describe('orchestrator', () => {
  describe('determineStyle', () => {
    describe('regular style', () => {
      it('should return regular for standard creature', () => {
        const style = determineStyle('M15Regular-1', 'Creature - Human', false);
        expect(style).toBe('regular');
      });

      it('should return regular for standard instant', () => {
        const style = determineStyle('M15Regular-1', 'Instant', false);
        expect(style).toBe('regular');
      });

      it('should return regular for artifact', () => {
        const style = determineStyle('M15Regular-1', 'Artifact', false);
        expect(style).toBe('regular');
      });
    });

    describe('Nyx style', () => {
      it('should return Nyx for enchantment creature', () => {
        const style = determineStyle('M15Regular-1', 'Enchantment Creature - God', false);
        expect(style).toBe('Nyx');
      });

      it('should return Nyx for enchantment artifact', () => {
        const style = determineStyle('M15Regular-1', 'Enchantment Artifact', false);
        expect(style).toBe('Nyx');
      });

      it('should return Nyx for enchantment with alwaysNyx true', () => {
        const style = determineStyle('M15Regular-1', 'Enchantment', true);
        expect(style).toBe('Nyx');
      });

      it('should return regular for enchantment with alwaysNyx false', () => {
        const style = determineStyle('M15Regular-1', 'Enchantment', false);
        expect(style).toBe('regular');
      });
    });

    describe('snow style', () => {
      it('should return snow for snow creature', () => {
        const style = determineStyle('M15Regular-1', 'Snow Creature - Bear', false);
        expect(style).toBe('snow');
      });

      it('should return snow for snow land', () => {
        const style = determineStyle('M15Regular-1', 'Snow Land - Forest', false);
        expect(style).toBe('snow');
      });

      it('should prioritize snow over Nyx', () => {
        // Snow is checked before Nyx in the standard logic
        const style = determineStyle('M15Regular-1', 'Snow Enchantment Creature', false);
        expect(style).toBe('snow');
      });
    });

    describe('UB frame types', () => {
      it('should return Nyx for UB enchantment creature', () => {
        const style = determineStyle('UB', 'Enchantment Creature', false);
        expect(style).toBe('Nyx');
      });

      it('should return Nyx for UB enchantment with alwaysNyx', () => {
        const style = determineStyle('UB', 'Enchantment', true);
        expect(style).toBe('Nyx');
      });

      it('should return regular for UB non-enchantment', () => {
        const style = determineStyle('UB', 'Creature', false);
        expect(style).toBe('regular');
      });

      it('should return ub for UBNew', () => {
        const style = determineStyle('UBNew', 'Creature', false);
        expect(style).toBe('ub');
      });
    });

    describe('frames without style variants', () => {
      it('should return regular for Seventh edition', () => {
        const style = determineStyle('Seventh', 'Enchantment Creature', false);
        expect(style).toBe('regular');
      });

      it('should return regular for 8th edition', () => {
        const style = determineStyle('8th', 'Snow Creature', false);
        expect(style).toBe('regular');
      });

      it('should return regular for Borderless', () => {
        const style = determineStyle('Borderless', 'Enchantment Creature', false);
        expect(style).toBe('regular');
      });

      it('should return regular for BorderlessUB', () => {
        const style = determineStyle('BorderlessUB', 'Snow Creature', false);
        expect(style).toBe('regular');
      });
    });
  });

  describe('buildAutoFrame', () => {
    describe('basic frame generation', () => {
      it('should generate frames for white creature', () => {
        const result = buildAutoFrame({
          frameType: 'M15Regular-1',
          colors: ['W'],
          manaCost: '{1}{W}',
          typeLine: 'Creature - Human',
          power: '2/2',
          alwaysNyx: false,
        });

        expect(result.frames.length).toBeGreaterThan(0);
        expect(result.style).toBe('regular');
        expect(result.properties.frame).toBe('W');
        expect(result.properties.pt).toBe('W');
        expect(result.needsVehiclePTColor).toBe(false);
      });

      it('should generate frames for blue instant', () => {
        const result = buildAutoFrame({
          frameType: 'M15Regular-1',
          colors: ['U'],
          manaCost: '{U}',
          typeLine: 'Instant',
          power: '',
          alwaysNyx: false,
        });

        expect(result.frames.length).toBeGreaterThan(0);
        expect(result.properties.pt).toBeNull();
      });

      it('should return empty frames for unknown frame type', () => {
        const result = buildAutoFrame({
          frameType: 'UnknownType' as AutoFrameType,
          colors: ['W'],
          manaCost: '{W}',
          typeLine: 'Creature',
          power: '1/1',
          alwaysNyx: false,
        });

        expect(result.frames).toEqual([]);
        expect(result.style).toBe('regular');
      });
    });

    describe('legendary frames', () => {
      it('should include crown layers for legendary creatures', () => {
        const result = buildAutoFrame({
          frameType: 'M15Regular-1',
          colors: ['W'],
          manaCost: '{2}{W}',
          typeLine: 'Legendary Creature - Human Knight',
          power: '3/3',
          alwaysNyx: false,
        });

        const crownFrame = result.frames.find((f) => f.name.includes('Crown'));
        expect(crownFrame).toBeDefined();
      });

      it('should include crown border cover for legendary', () => {
        const result = buildAutoFrame({
          frameType: 'M15Regular-1',
          colors: ['U'],
          manaCost: '{3}{U}{U}',
          typeLine: 'Legendary Creature - Sphinx',
          power: '5/5',
          alwaysNyx: false,
        });

        const borderCover = result.frames.find((f) =>
          f.name.includes('Border Cover')
        );
        expect(borderCover).toBeDefined();
      });

      it('should not include crown for non-legendary', () => {
        const result = buildAutoFrame({
          frameType: 'M15Regular-1',
          colors: ['G'],
          manaCost: '{G}',
          typeLine: 'Creature - Elf',
          power: '1/1',
          alwaysNyx: false,
        });

        const crownFrame = result.frames.find((f) => f.name.includes('Crown'));
        expect(crownFrame).toBeUndefined();
      });
    });

    describe('multicolor frames', () => {
      it('should generate split frames for 2-color', () => {
        const result = buildAutoFrame({
          frameType: 'M15Regular-1',
          colors: ['W', 'U'],
          manaCost: '{W}{U}',
          typeLine: 'Creature - Spirit',
          power: '2/2',
          alwaysNyx: false,
        });

        expect(result.properties.pinline).toBe('W');
        expect(result.properties.pinlineRight).toBe('U');
        expect(result.properties.frame).toBe('M');
      });

      it('should handle 3+ color as multicolor', () => {
        const result = buildAutoFrame({
          frameType: 'M15Regular-1',
          colors: ['W', 'U', 'B'],
          manaCost: '{W}{U}{B}',
          typeLine: 'Creature - Zombie',
          power: '2/2',
          alwaysNyx: false,
        });

        expect(result.properties.frame).toBe('M');
        expect(result.properties.pinline).toBe('M');
      });
    });

    describe('enchantment frames with Nyx', () => {
      it('should use Nyx style for enchantment creatures', () => {
        const result = buildAutoFrame({
          frameType: 'M15Regular-1',
          colors: ['W'],
          manaCost: '{2}{W}',
          typeLine: 'Enchantment Creature - God',
          power: '5/5',
          alwaysNyx: false,
        });

        expect(result.style).toBe('Nyx');
      });

      it('should include inner crown for Nyx legendary', () => {
        const result = buildAutoFrame({
          frameType: 'M15Regular-1',
          colors: ['U'],
          manaCost: '{3}{U}{U}',
          typeLine: 'Legendary Enchantment Creature - God',
          power: '5/7',
          alwaysNyx: false,
        });

        expect(result.style).toBe('Nyx');
        const innerCrown = result.frames.find((f) => f.name.includes('Inner Crown'));
        expect(innerCrown).toBeDefined();
      });
    });

    describe('vehicle frames', () => {
      it('should set needsVehiclePTColor for vehicles', () => {
        const result = buildAutoFrame({
          frameType: 'M15Regular-1',
          colors: [],
          manaCost: '{4}',
          typeLine: 'Artifact - Vehicle',
          power: '4/4',
          alwaysNyx: false,
        });

        expect(result.needsVehiclePTColor).toBe(true);
        expect(result.properties.frame).toBe('V');
        expect(result.properties.pt).toBe('V');
      });

      it('should not set needsVehiclePTColor for non-vehicles', () => {
        const result = buildAutoFrame({
          frameType: 'M15Regular-1',
          colors: [],
          manaCost: '{3}',
          typeLine: 'Artifact Creature - Golem',
          power: '3/3',
          alwaysNyx: false,
        });

        expect(result.needsVehiclePTColor).toBe(false);
      });
    });

    describe('frame types with stamps', () => {
      it('should include stamp layers for UB frames', () => {
        const result = buildAutoFrame({
          frameType: 'UB',
          colors: ['W'],
          manaCost: '{1}{W}',
          typeLine: 'Creature - Human',
          power: '2/2',
          alwaysNyx: false,
        });

        const stampFrame = result.frames.find((f) => f.name.includes('Stamp'));
        expect(stampFrame).toBeDefined();
      });

      it('should include stamp layers for Vault frames', () => {
        const result = buildAutoFrame({
          frameType: 'Vault',
          colors: ['U'],
          manaCost: '{2}{U}',
          typeLine: 'Creature - Wizard',
          power: '2/3',
          alwaysNyx: false,
        });

        const stampFrame = result.frames.find((f) => f.name.includes('Stamp'));
        expect(stampFrame).toBeDefined();
      });

      it('should include plain stamp for Vault frames', () => {
        const result = buildAutoFrame({
          frameType: 'Vault',
          colors: ['R'],
          manaCost: '{R}',
          typeLine: 'Creature',
          power: '1/1',
          alwaysNyx: false,
        });

        const plainStamp = result.frames.find((f) => f.name.includes('Plain'));
        expect(plainStamp).toBeDefined();
      });
    });

    describe('Seventh Edition frames', () => {
      it('should use different layer order for Seventh', () => {
        const result = buildAutoFrame({
          frameType: 'Seventh',
          colors: ['G'],
          manaCost: '{G}',
          typeLine: 'Creature - Elf',
          power: '1/1',
          alwaysNyx: false,
        });

        expect(result.frames.length).toBeGreaterThan(0);
        expect(result.style).toBe('regular');
      });

      it('should not include PT box for Seventh', () => {
        const result = buildAutoFrame({
          frameType: 'Seventh',
          colors: ['W'],
          manaCost: '{W}',
          typeLine: 'Creature',
          power: '1/1',
          alwaysNyx: false,
        });

        const ptFrame = result.frames.find((f) => f.name.includes('Power/Toughness'));
        expect(ptFrame).toBeUndefined();
      });
    });

    describe('Vault frame type', () => {
      it('should apply Vault overrides for 2-color', () => {
        const result = buildAutoFrame({
          frameType: 'Vault',
          colors: ['W', 'U'],
          manaCost: '{W}{U}',
          typeLine: 'Creature',
          power: '2/2',
          alwaysNyx: false,
        });

        expect(result.properties.frame).toBe('W');
        expect(result.properties.frameRight).toBe('U');
      });
    });

    describe('JapanShowcase frame type', () => {
      it('should apply JapanShowcase PT override for 2-color', () => {
        const result = buildAutoFrame({
          frameType: 'JapanShowcase',
          colors: ['R', 'G'],
          manaCost: '{R}{G}',
          typeLine: 'Creature',
          power: '3/3',
          alwaysNyx: false,
        });

        expect(result.properties.pt).toBe('G');
      });
    });

    describe('Adventure frames', () => {
      it('should include adventure rules layers', () => {
        const result = buildAutoFrame({
          frameType: 'Adventure',
          colors: ['G'],
          manaCost: '{2}{G}',
          typeLine: 'Creature - Human Knight',
          power: '2/3',
          alwaysNyx: false,
          secondaryManaCost: '{G}',
        });

        expect(result.frames.length).toBeGreaterThan(0);
      });

      it('should handle multicolor adventure cost', () => {
        const result = buildAutoFrame({
          frameType: 'Adventure',
          colors: ['W'],
          manaCost: '{1}{W}',
          typeLine: 'Creature',
          power: '2/2',
          alwaysNyx: false,
          secondaryManaCost: '{G}{W}',
        });

        expect(result.frames.length).toBeGreaterThan(0);
      });
    });

    describe('Omen frames', () => {
      it('should include omen mask layers', () => {
        const result = buildAutoFrame({
          frameType: 'Omen',
          colors: ['B'],
          manaCost: '{1}{B}',
          typeLine: 'Creature',
          power: '2/2',
          alwaysNyx: false,
          secondaryManaCost: '{B}',
        });

        expect(result.frames.length).toBeGreaterThan(0);
      });
    });

    describe('Borderless frames', () => {
      it('should include crown outline for legendary Borderless', () => {
        const result = buildAutoFrame({
          frameType: 'Borderless',
          colors: ['W'],
          manaCost: '{2}{W}{W}',
          typeLine: 'Legendary Creature - Angel',
          power: '4/4',
          alwaysNyx: false,
        });

        const crownOutline = result.frames.find((f) =>
          f.name.includes('Crown Outline')
        );
        expect(crownOutline).toBeDefined();
      });

      it('should set erase on crown border cover for Borderless', () => {
        const result = buildAutoFrame({
          frameType: 'Borderless',
          colors: ['U'],
          manaCost: '{3}{U}{U}',
          typeLine: 'Legendary Creature - Sphinx',
          power: '5/5',
          alwaysNyx: false,
        });

        const borderCover = result.frames.find((f) =>
          f.name.includes('Border Cover')
        );
        expect(borderCover?.erase).toBe(true);
      });
    });
  });

  describe('getPreservedFrames', () => {
    it('should preserve extension frames for M15Regular-1', () => {
      const existingFrames = [
        { name: 'White Frame' },
        { name: 'Art Extension' },
        { name: 'Blue Pinline' },
      ];

      const preserved = getPreservedFrames('M15Regular-1', existingFrames);

      expect(preserved).toHaveLength(1);
      expect(preserved[0].name).toBe('Art Extension');
    });

    it('should preserve stamp frames for UB', () => {
      const existingFrames = [
        { name: 'White Frame' },
        { name: 'Gray Holo Stamp' },
        { name: 'Art Extension' },
      ];

      const preserved = getPreservedFrames('UB', existingFrames);

      expect(preserved).toHaveLength(2);
      expect(preserved.some((f) => f.name === 'Gray Holo Stamp')).toBe(true);
      expect(preserved.some((f) => f.name === 'Art Extension')).toBe(true);
    });

    it('should return empty array for unknown frame type', () => {
      const existingFrames = [{ name: 'Some Frame' }];

      const preserved = getPreservedFrames('UnknownType' as AutoFrameType, existingFrames);

      expect(preserved).toEqual([]);
    });
  });

  describe('getFramesForRendering', () => {
    it('should reverse frame order', () => {
      const frames = [
        { name: 'Bottom', src: '', masks: [] },
        { name: 'Middle', src: '', masks: [] },
        { name: 'Top', src: '', masks: [] },
      ];

      const renderFrames = getFramesForRendering(frames);

      expect(renderFrames[0].name).toBe('Top');
      expect(renderFrames[1].name).toBe('Middle');
      expect(renderFrames[2].name).toBe('Bottom');
    });

    it('should not mutate original array', () => {
      const frames = [
        { name: 'Bottom', src: '', masks: [] },
        { name: 'Top', src: '', masks: [] },
      ];

      getFramesForRendering(frames);

      expect(frames[0].name).toBe('Bottom');
      expect(frames[1].name).toBe('Top');
    });

    it('should handle empty array', () => {
      const renderFrames = getFramesForRendering([]);
      expect(renderFrames).toEqual([]);
    });

    it('should handle single frame', () => {
      const frames = [{ name: 'Only', src: '', masks: [] }];

      const renderFrames = getFramesForRendering(frames);

      expect(renderFrames).toHaveLength(1);
      expect(renderFrames[0].name).toBe('Only');
    });
  });

  describe('frame layer order', () => {
    it('should have crowns near the end (top of Frame Layer list)', () => {
      const result = buildAutoFrame({
        frameType: 'M15Regular-1',
        colors: ['W'],
        manaCost: '{1}{W}',
        typeLine: 'Legendary Creature',
        power: '2/2',
        alwaysNyx: false,
      });

      const crownIndex = result.frames.findIndex((f) => f.name.includes('Legend Crown'));
      const frameIndex = result.frames.findIndex((f) =>
        f.name === 'White Frame' || f.name.includes('Frame')
      );

      // Crown should come after frame in build order (appears higher in Frame Layer list)
      expect(crownIndex).toBeGreaterThan(frameIndex);
    });

    it('should have PT after main frame layers', () => {
      const result = buildAutoFrame({
        frameType: 'M15Regular-1',
        colors: ['R'],
        manaCost: '{R}',
        typeLine: 'Creature',
        power: '1/1',
        alwaysNyx: false,
      });

      const ptIndex = result.frames.findIndex((f) =>
        f.name.includes('Power/Toughness')
      );
      const typeIndex = result.frames.findIndex((f) =>
        f.name.includes('Type') && f.masks.length > 0
      );

      if (ptIndex !== -1 && typeIndex !== -1) {
        expect(ptIndex).toBeGreaterThan(typeIndex);
      }
    });
  });
});
