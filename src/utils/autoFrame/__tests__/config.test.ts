/**
 * AutoFrame Config Test Suite
 *
 * Tests for frame type and letter configurations.
 */

import { describe, it, expect } from 'vitest';
import {
  getFrameTypeConfig,
  getSupportedFrameTypes,
  getFrameLetterConfig,
  getLetterConfigKeys,
} from '../config';
import { AUTO_FRAME_TYPES } from '../../../types/autoFrame.types';
import type { AutoFrameType } from '../../../types/autoFrame.types';

describe('config', () => {
  describe('getFrameTypeConfig', () => {
    it('should return valid config for M15Regular-1', () => {
      const config = getFrameTypeConfig('M15Regular-1');

      expect(config).toBeDefined();
      expect(config?.group).toBe('Standard-3');
      expect(config?.builderType).toBe('M15');
      expect(config?.supportsCrown).toBe(true);
      expect(config?.supportsPT).toBe(true);
      expect(config?.supportsStamp).toBe(false);
      expect(typeof config?.filterFrames).toBe('function');
    });

    it('should return valid config for UB frame type', () => {
      const config = getFrameTypeConfig('UB');

      expect(config).toBeDefined();
      expect(config?.group).toBe('Showcase-5');
      expect(config?.builderType).toBe('UB');
      expect(config?.supportsCrown).toBe(true);
      expect(config?.supportsPT).toBe(true);
      expect(config?.supportsStamp).toBe(true);
    });

    it('should return valid config for Borderless frame type', () => {
      const config = getFrameTypeConfig('Borderless');

      expect(config).toBeDefined();
      expect(config?.group).toBe('Showcase-5');
      expect(config?.builderType).toBe('Borderless');
      expect(config?.supportsCrown).toBe(true);
      expect(config?.supportsPT).toBe(true);
    });

    it('should return valid config for Seventh edition frame type', () => {
      const config = getFrameTypeConfig('Seventh');

      expect(config).toBeDefined();
      expect(config?.group).toBe('Misc-2');
      expect(config?.builderType).toBe('SeventhEdition');
      expect(config?.supportsCrown).toBe(false);
      expect(config?.supportsPT).toBe(false);
      expect(config?.supportsStamp).toBe(false);
    });

    it('should return valid config for Vault frame type', () => {
      const config = getFrameTypeConfig('Vault');

      expect(config).toBeDefined();
      expect(config?.group).toBe('Showcase-5');
      expect(config?.builderType).toBe('Vault');
      expect(config?.supportsCrown).toBe(true);
      expect(config?.supportsPT).toBe(true);
      expect(config?.supportsStamp).toBe(true);
    });

    it('should return undefined for unknown frame type', () => {
      const config = getFrameTypeConfig('UnknownType' as AutoFrameType);
      expect(config).toBeUndefined();
    });

    it('should have filterFrames function that works correctly', () => {
      const config = getFrameTypeConfig('M15Regular-1');

      expect(config?.filterFrames({ name: 'Art Extension' })).toBe(true);
      expect(config?.filterFrames({ name: 'Extension Layer' })).toBe(true);
      expect(config?.filterFrames({ name: 'White Frame' })).toBe(false);
    });

    it('should return config for all AUTO_FRAME_TYPES', () => {
      for (const frameTypeInfo of AUTO_FRAME_TYPES) {
        const config = getFrameTypeConfig(frameTypeInfo.id);
        expect(config).toBeDefined();
        expect(config?.group).toBeTruthy();
        expect(config?.builderType).toBeTruthy();
      }
    });
  });

  describe('getSupportedFrameTypes', () => {
    it('should return array of all supported frame types', () => {
      const types = getSupportedFrameTypes();

      expect(Array.isArray(types)).toBe(true);
      expect(types.length).toBeGreaterThan(0);
      expect(types).toContain('M15Regular-1');
      expect(types).toContain('UB');
      expect(types).toContain('Borderless');
      expect(types).toContain('Vault');
    });

    it('should match AUTO_FRAME_TYPES entries', () => {
      const types = getSupportedFrameTypes();

      for (const frameTypeInfo of AUTO_FRAME_TYPES) {
        expect(types).toContain(frameTypeInfo.id);
      }
    });
  });

  describe('getFrameLetterConfig', () => {
    it('should return valid config for M15 builder type', () => {
      const config = getFrameLetterConfig('M15');

      expect(config).toBeDefined();
      expect(config?.basePath).toBe('/img/frames/m15/');
      expect(config?.frameNames).toBeDefined();
      expect(config?.frameNames['W']).toBe('White');
      expect(config?.bounds).toBeDefined();
      expect(typeof config?.pathBuilder).toBe('function');
      expect(typeof config?.maskPath).toBe('function');
    });

    it('should return valid config for UB builder type', () => {
      const config = getFrameLetterConfig('UB');

      expect(config).toBeDefined();
      expect(config?.basePath).toBe('/img/frames/m15/');
      expect(config?.bounds.stamp).toBeDefined();
    });

    it('should return valid config for Borderless builder type', () => {
      const config = getFrameLetterConfig('Borderless');

      expect(config).toBeDefined();
      expect(config?.basePath).toBe('/img/frames/');
      expect(config?.bounds.crown).toBeDefined();
      expect(config?.bounds.pt).toBeDefined();
    });

    it('should return valid config for SeventhEdition builder type', () => {
      const config = getFrameLetterConfig('SeventhEdition');

      expect(config).toBeDefined();
      expect(config?.basePath).toBe('/img/frames/seventh/');
    });

    it('should return valid config for Vault builder type', () => {
      const config = getFrameLetterConfig('Vault');

      expect(config).toBeDefined();
      expect(config?.basePath).toBe('/img/frames/vault/');
      expect(config?.bounds.plainStamp).toBeDefined();
    });

    it('should return valid config for Etched builder type', () => {
      const config = getFrameLetterConfig('Etched');

      expect(config).toBeDefined();
      expect(config?.basePath).toBe('/img/frames/etched/');
      expect(config?.bounds.stamp).toBeDefined();
    });

    it('should return valid config for Phyrexian builder type', () => {
      const config = getFrameLetterConfig('Phyrexian');

      expect(config).toBeDefined();
      expect(config?.basePath).toBe('/img/frames/m15/praetors/');
    });

    it('should return undefined for unknown builder type', () => {
      const config = getFrameLetterConfig('UnknownBuilder');
      expect(config).toBeUndefined();
    });

    it('should look up letter config via frame type config', () => {
      // 'M15Regular-1' has builderType 'M15'
      const config = getFrameLetterConfig('M15Regular-1');
      const m15Config = getFrameLetterConfig('M15');

      expect(config).toBeDefined();
      expect(config).toBe(m15Config);
    });
  });

  describe('getLetterConfigKeys', () => {
    it('should return array of all letter config keys', () => {
      const keys = getLetterConfigKeys();

      expect(Array.isArray(keys)).toBe(true);
      expect(keys.length).toBeGreaterThan(0);
      expect(keys).toContain('M15');
      expect(keys).toContain('UB');
      expect(keys).toContain('Borderless');
      expect(keys).toContain('Vault');
      expect(keys).toContain('Etched');
      expect(keys).toContain('Phyrexian');
      expect(keys).toContain('SeventhEdition');
    });
  });

  describe('FrameLetterConfig.pathBuilder', () => {
    it('should build correct paths for M15 frame elements', () => {
      const config = getFrameLetterConfig('M15');
      expect(config).toBeDefined();

      // Crown
      expect(config?.pathBuilder('W', 'Crown', 'regular')).toBe('crowns/m15CrownW.png');
      expect(config?.pathBuilder('U', 'Crown', 'regular')).toBe('crowns/m15CrownU.png');

      // Inner Crown
      expect(config?.pathBuilder('W', 'Inner Crown', 'Nyx')).toBe('innerCrowns/m15InnerCrownWNyx.png');

      // PT Box
      expect(config?.pathBuilder('R', 'PT', 'regular')).toBe('regular/m15PTR.png');

      // Main frame
      expect(config?.pathBuilder('G', false, 'regular')).toBe('regular/m15FrameG.png');
    });

    it('should build correct paths for Vault frame elements', () => {
      const config = getFrameLetterConfig('Vault');
      expect(config).toBeDefined();

      // Crown
      expect(config?.pathBuilder('w', 'Crown', 'regular')).toBe('crown/w.png');

      // PT Box
      expect(config?.pathBuilder('u', 'PT', 'regular')).toBe('pt/u.png');

      // Stamp
      expect(config?.pathBuilder('r', 'Stamp', 'regular')).toBe('stamp/r.png');

      // Plain Stamp
      expect(config?.pathBuilder('plain', 'Plain Stamp', 'regular')).toBe('../m15/holoStamps/stamp.png');

      // Main frame
      expect(config?.pathBuilder('g', false, 'regular')).toBe('g.png');
    });

    it('should build correct paths for Etched frame elements', () => {
      const config = getFrameLetterConfig('Etched');
      expect(config).toBeDefined();

      // Crown
      expect(config?.pathBuilder('W', 'Crown', 'regular')).toBe('regular/crowns/W.png');

      // PT
      expect(config?.pathBuilder('U', 'PT', 'regular')).toBe('regular/pt/U.png');

      // Stamp
      expect(config?.pathBuilder('B', 'Stamp', 'regular')).toBe('regular/holo/b.png');

      // Main frame
      expect(config?.pathBuilder('R', false, 'regular')).toBe('regular/r.png');
    });
  });

  describe('FrameLetterConfig.maskPath', () => {
    it('should build correct mask paths for M15 frames', () => {
      const config = getFrameLetterConfig('M15');
      expect(config).toBeDefined();

      expect(config?.maskPath('Title')).toBe('regular/m15MaskTitle.png');
      expect(config?.maskPath('Type')).toBe('regular/m15MaskType.png');
      expect(config?.maskPath('Rules')).toBe('regular/m15MaskRules.png');
      expect(config?.maskPath('Pinline')).toBe('regular/m15MaskPinline.png');
    });

    it('should return null for Etched Pinline mask', () => {
      const config = getFrameLetterConfig('Etched');
      expect(config).toBeDefined();

      // Etched frames don't have separate Pinline masks
      expect(config?.maskPath('Pinline')).toBeNull();
    });

    it('should build correct mask paths for Vault frames', () => {
      const config = getFrameLetterConfig('Vault');
      expect(config).toBeDefined();

      expect(config?.maskPath('Pinline')).toBe('masks/maskPinlines.png');
      expect(config?.maskPath('Title')).toBe('masks/maskTitle.png');
      expect(config?.maskPath('Rules')).toBe('masks/maskRules.png');
    });
  });

  describe('FrameLetterConfig.letterTransform', () => {
    it('should strip land indicator L for M15 frames', () => {
      const config = getFrameLetterConfig('M15');
      expect(config?.letterTransform).toBeDefined();

      expect(config?.letterTransform!('WL', 'Crown', 'regular')).toBe('W');
      expect(config?.letterTransform!('UL', 'PT', 'regular')).toBe('U');
      expect(config?.letterTransform!('BL', false, 'regular')).toBe('B');
    });

    it('should handle L letter for land frames with Nyx style', () => {
      const config = getFrameLetterConfig('M15');
      expect(config?.letterTransform).toBeDefined();

      const result = config?.letterTransform!('L', false, 'Nyx');
      expect(result).toEqual({ letter: 'L', style: 'regular' });
    });

    it('should transform letters for UB frames', () => {
      const config = getFrameLetterConfig('UB');
      expect(config?.letterTransform).toBeDefined();

      // C should become L
      expect(config?.letterTransform!('C', false, 'regular')).toBe('L');

      // With Nyx, should add E but then strip it
      expect(config?.letterTransform!('W', false, 'Nyx')).toBe('W');
    });

    it('should handle vehicle letter transformation for SeventhEdition', () => {
      const config = getFrameLetterConfig('SeventhEdition');
      expect(config?.letterTransform).toBeDefined();

      expect(config?.letterTransform!('V', false, 'regular')).toBe('A');
      expect(config?.letterTransform!('ML', false, 'regular')).toBe('L');
    });
  });

  describe('FrameLetterConfig.frameNames', () => {
    it('should have standard color names for M15', () => {
      const config = getFrameLetterConfig('M15');

      expect(config?.frameNames['W']).toBe('White');
      expect(config?.frameNames['U']).toBe('Blue');
      expect(config?.frameNames['B']).toBe('Black');
      expect(config?.frameNames['R']).toBe('Red');
      expect(config?.frameNames['G']).toBe('Green');
      expect(config?.frameNames['M']).toBe('Multicolored');
      expect(config?.frameNames['A']).toBe('Artifact');
      expect(config?.frameNames['L']).toBe('Land');
      expect(config?.frameNames['C']).toBe('Colorless');
      expect(config?.frameNames['V']).toBe('Vehicle');
    });

    it('should have land color names for M15', () => {
      const config = getFrameLetterConfig('M15');

      expect(config?.frameNames['WL']).toBe('White Land');
      expect(config?.frameNames['UL']).toBe('Blue Land');
      expect(config?.frameNames['BL']).toBe('Black Land');
      expect(config?.frameNames['RL']).toBe('Red Land');
      expect(config?.frameNames['GL']).toBe('Green Land');
    });

    it('should have enchantment names for UB frames', () => {
      const config = getFrameLetterConfig('UB');

      expect(config?.frameNames['WE']).toBe('White Enchantment');
      expect(config?.frameNames['UE']).toBe('Blue Enchantment');
      expect(config?.frameNames['BE']).toBe('Black Enchantment');
      expect(config?.frameNames['RE']).toBe('Red Enchantment');
      expect(config?.frameNames['GE']).toBe('Green Enchantment');
    });
  });

  describe('FrameLetterConfig.bounds', () => {
    it('should have proper crown bounds for M15', () => {
      const config = getFrameLetterConfig('M15');

      expect(config?.bounds.crown).toBeDefined();
      expect(config?.bounds.crown!.x).toBeGreaterThanOrEqual(0);
      expect(config?.bounds.crown!.y).toBeGreaterThanOrEqual(0);
      expect(config?.bounds.crown!.width).toBeGreaterThan(0);
      expect(config?.bounds.crown!.height).toBeGreaterThan(0);
    });

    it('should have PT bounds for most frame types', () => {
      const typesWithPT = ['M15', 'UB', 'Borderless', 'Etched', 'Vault'];

      for (const type of typesWithPT) {
        const config = getFrameLetterConfig(type);
        expect(config?.bounds.pt).toBeDefined();
        expect(config?.bounds.pt!.width).toBeGreaterThan(0);
      }
    });

    it('should have stamp bounds for stamp-supporting types', () => {
      const typesWithStamp = ['UB', 'M15EighthUB', 'Etched', 'Vault'];

      for (const type of typesWithStamp) {
        const config = getFrameLetterConfig(type);
        expect(config?.bounds.stamp).toBeDefined();
        expect(config?.bounds.stamp!.width).toBeGreaterThan(0);
      }
    });

    it('should have plainStamp bounds for Vault', () => {
      const config = getFrameLetterConfig('Vault');

      expect(config?.bounds.plainStamp).toBeDefined();
      expect(config?.bounds.plainStamp!.x).toBeGreaterThanOrEqual(0);
      expect(config?.bounds.plainStamp!.width).toBeGreaterThan(0);
    });
  });
});
