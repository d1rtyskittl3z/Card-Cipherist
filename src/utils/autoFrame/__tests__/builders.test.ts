/**
 * AutoFrame Builders Test Suite
 *
 * Tests for frame builder functions that construct frame objects.
 */

import { describe, it, expect } from 'vitest';
import {
  makeFrameByLetterUnified,
  getBuilder,
  makeM15FrameByLetter,
  makeM15NewFrameByLetter,
  makeM15EighthFrameByLetter,
  makeM15EighthUBFrameByLetter,
  makeBorderlessFrameByLetter,
  make8thEditionFrameByLetter,
  makeExtendedArtFrameByLetter,
  makeUBFrameByLetter,
  makeCircuitFrameByLetter,
  makeEtchedFrameByLetter,
  makePhyrexianFrameByLetter,
  makeSeventhEditionFrameByLetter,
  makeJapanShowcaseFrameByLetter,
  makeVaultFrameByLetter,
  makeAdventureFrameByLetter,
  makeOmenFrameByLetter,
  builderRegistry,
} from '../builders';
import { RIGHT_HALF_MASK_PATH } from '../../../types/autoFrame.types';

describe('builders', () => {
  describe('makeFrameByLetterUnified', () => {
    describe('basic frame generation', () => {
      it('should generate a white M15 frame', () => {
        const frame = makeFrameByLetterUnified('M15', 'W', false, false, 'regular');

        expect(frame).toBeDefined();
        expect(frame?.name).toBe('White Frame');
        expect(frame?.src).toContain('/img/frames/m15/');
        expect(frame?.src).toContain('W.png');
        expect(frame?.masks).toEqual([]);
      });

      it('should generate a blue M15 frame', () => {
        const frame = makeFrameByLetterUnified('M15', 'U', false, false, 'regular');

        expect(frame).toBeDefined();
        expect(frame?.name).toBe('Blue Frame');
      });

      it('should return null for unknown frame type', () => {
        const frame = makeFrameByLetterUnified('UnknownType', 'W', false, false, 'regular');
        expect(frame).toBeNull();
      });

      it('should normalize letter to uppercase', () => {
        const frame = makeFrameByLetterUnified('M15', 'w', false, false, 'regular');

        expect(frame).toBeDefined();
        expect(frame?.name).toBe('White Frame');
      });
    });

    describe('Crown handling', () => {
      it('should generate a legendary crown for white', () => {
        const frame = makeFrameByLetterUnified('M15', 'W', 'Crown', false, 'regular');

        expect(frame).toBeDefined();
        expect(frame?.name).toBe('White Legend Crown');
        expect(frame?.src).toContain('crown');
        expect(frame?.bounds).toBeDefined();
      });

      it('should add right-half mask for multicolor crown', () => {
        const frame = makeFrameByLetterUnified('M15', 'U', 'Crown', true, 'regular');

        expect(frame).toBeDefined();
        expect(frame?.masks).toHaveLength(1);
        expect(frame?.masks[0].src).toBe(RIGHT_HALF_MASK_PATH);
        expect(frame?.masks[0].name).toBe('Right Half');
      });

      it('should generate Crown Border Cover', () => {
        const frame = makeFrameByLetterUnified('M15', 'W', 'Crown Border Cover', false, 'regular');

        expect(frame).toBeDefined();
        expect(frame?.name).toBe('Legend Crown Border Cover');
        expect(frame?.src).toContain('black.png');
        expect(frame?.bounds).toBeDefined();
      });

      it('should generate Inner Crown for Nyx style', () => {
        const frame = makeFrameByLetterUnified('M15', 'W', 'Inner Crown', false, 'Nyx');

        expect(frame).toBeDefined();
        expect(frame?.name).toContain('Inner Crown');
        expect(frame?.name).toContain('Nyx');
        expect(frame?.bounds).toBeDefined();
      });
    });

    describe('PT Box handling', () => {
      it('should generate a PT box for white', () => {
        const frame = makeFrameByLetterUnified('M15', 'W', 'PT', false, 'regular');

        expect(frame).toBeDefined();
        expect(frame?.name).toBe('White Power/Toughness');
        expect(frame?.src).toContain('PT');
        expect(frame?.bounds).toBeDefined();
      });

      it('should generate a vehicle PT box', () => {
        const frame = makeFrameByLetterUnified('M15', 'V', 'PT', false, 'regular');

        expect(frame).toBeDefined();
        expect(frame?.name).toBe('Vehicle Power/Toughness');
      });
    });

    describe('Stamp handling', () => {
      it('should generate a holo stamp for UB frames', () => {
        const frame = makeFrameByLetterUnified('UB', 'W', 'Stamp', false, 'regular');

        expect(frame).toBeDefined();
        expect(frame?.name).toBe('White Holo Stamp');
        expect(frame?.src).toContain('stamp');
        expect(frame?.bounds).toBeDefined();
      });

      it('should add right-half mask for multicolor stamp', () => {
        const frame = makeFrameByLetterUnified('UB', 'U', 'Stamp', true, 'regular');

        expect(frame).toBeDefined();
        expect(frame?.masks).toHaveLength(1);
        expect(frame?.masks[0].src).toBe(RIGHT_HALF_MASK_PATH);
      });

      it('should generate Plain Stamp for Vault frames', () => {
        const frame = makeFrameByLetterUnified('Vault', 'W', 'Plain Stamp', false, 'regular');

        expect(frame).toBeDefined();
        expect(frame?.name).toBe('Plain Holo Stamp');
        expect(frame?.bounds).toBeDefined();
      });

      it('should generate Stamp Pinline for M15EighthUB multicolor', () => {
        const frame = makeFrameByLetterUnified('M15EighthUB', 'W', 'Stamp Pinline', false, 'regular');

        expect(frame).toBeDefined();
        expect(frame?.name).toContain('Stamp');
        expect(frame?.masks).toHaveLength(1);
        expect(frame?.masks[0].name).toBe('Pinline');
      });
    });

    describe('Mask application', () => {
      it('should apply Title mask', () => {
        const frame = makeFrameByLetterUnified('M15', 'W', 'Title', false, 'regular');

        expect(frame).toBeDefined();
        expect(frame?.masks).toHaveLength(1);
        expect(frame?.masks[0].name).toBe('Title');
        expect(frame?.masks[0].src).toContain('Title');
      });

      it('should apply Type mask', () => {
        const frame = makeFrameByLetterUnified('M15', 'U', 'Type', false, 'regular');

        expect(frame).toBeDefined();
        expect(frame?.masks).toHaveLength(1);
        expect(frame?.masks[0].name).toBe('Type');
      });

      it('should apply Rules mask', () => {
        const frame = makeFrameByLetterUnified('M15', 'B', 'Rules', false, 'regular');

        expect(frame).toBeDefined();
        expect(frame?.masks).toHaveLength(1);
        expect(frame?.masks[0].name).toBe('Rules');
      });

      it('should add right-half mask for multicolor frames', () => {
        const frame = makeFrameByLetterUnified('M15', 'R', 'Pinline', true, 'regular');

        expect(frame).toBeDefined();
        expect(frame?.masks).toHaveLength(2);
        expect(frame?.masks[0].name).toBe('Pinline');
        expect(frame?.masks[1].name).toBe('Right Half');
        expect(frame?.masks[1].src).toBe(RIGHT_HALF_MASK_PATH);
      });

      it('should return null for non-existent mask', () => {
        // Etched frames don't have Pinline mask
        const frame = makeFrameByLetterUnified('Etched', 'W', 'Pinline', false, 'regular');
        expect(frame).toBeNull();
      });
    });

    describe('Omen mask handling', () => {
      it('should generate Omen mask frame', () => {
        const frame = makeFrameByLetterUnified('Omen', 'W', 'Omen', false, 'regular');

        expect(frame).toBeDefined();
        expect(frame?.name).toBe('White Frame');
        expect(frame?.masks).toHaveLength(1);
        expect(frame?.masks[0].name).toBe('Omen');
      });

      it('should generate Omen Right Half mask frame', () => {
        const frame = makeFrameByLetterUnified('Omen', 'U', 'Omen (Right Half)', false, 'regular');

        expect(frame).toBeDefined();
        expect(frame?.masks).toHaveLength(1);
        expect(frame?.masks[0].name).toBe('Omen (Right Half)');
      });
    });

    describe('ExtendedArt Crown Outline', () => {
      it('should generate Legend Crown Outline', () => {
        const frame = makeFrameByLetterUnified('ExtendedArt', 'W', 'Legend Crown Outline', false, 'regular');

        expect(frame).toBeDefined();
        expect(frame?.name).toBe('Legend Crown Outline');
        expect(frame?.src).toContain('CrownFloatingOutline');
      });

      it('should generate Crown Outline', () => {
        const frame = makeFrameByLetterUnified('ExtendedArt', 'U', 'Crown Outline', false, 'regular');

        expect(frame).toBeDefined();
        expect(frame?.name).toBe('Legend Crown Outline');
      });

      it('should add right-half mask for multicolor crown outline', () => {
        const frame = makeFrameByLetterUnified('ExtendedArt', 'W', 'Crown Outline', true, 'regular');

        expect(frame).toBeDefined();
        expect(frame?.masks).toHaveLength(1);
        expect(frame?.masks[0].src).toBe(RIGHT_HALF_MASK_PATH);
      });
    });
  });

  describe('Wrapper functions', () => {
    describe('makeM15FrameByLetter', () => {
      it('should create M15 frame', () => {
        const frame = makeM15FrameByLetter('W', false, false, 'regular');
        expect(frame).toBeDefined();
        expect(frame?.name).toBe('White Frame');
      });

      it('should create M15 crown', () => {
        const frame = makeM15FrameByLetter('U', 'Crown', false, 'regular');
        expect(frame?.name).toBe('Blue Legend Crown');
      });
    });

    describe('makeM15NewFrameByLetter', () => {
      it('should create M15 New frame', () => {
        const frame = makeM15NewFrameByLetter('W', false, false, 'regular');
        expect(frame).toBeDefined();
      });

      it('should handle UB style', () => {
        const frame = makeM15NewFrameByLetter('W', false, false, 'ub');
        expect(frame).toBeDefined();
      });
    });

    describe('makeM15EighthFrameByLetter', () => {
      it('should create M15 Eighth frame', () => {
        const frame = makeM15EighthFrameByLetter('W', false, false, 'regular');
        expect(frame).toBeDefined();
      });
    });

    describe('makeM15EighthUBFrameByLetter', () => {
      it('should create M15 Eighth UB frame', () => {
        const frame = makeM15EighthUBFrameByLetter('W', false, false, 'regular');
        expect(frame).toBeDefined();
      });

      it('should handle boolean style parameter', () => {
        const frame = makeM15EighthUBFrameByLetter('W', false, false, false);
        expect(frame).toBeDefined();
      });
    });

    describe('makeBorderlessFrameByLetter', () => {
      it('should create Borderless frame', () => {
        const frame = makeBorderlessFrameByLetter('W', false, false, 'regular', false);
        expect(frame).toBeDefined();
        expect(frame?.src).toContain('borderless');
      });

      it('should create Borderless UB frame with universesBeyond flag', () => {
        const frame = makeBorderlessFrameByLetter('W', 'Crown', false, 'regular', true);
        expect(frame).toBeDefined();
        expect(frame?.src).toContain('ub');
      });
    });

    describe('make8thEditionFrameByLetter', () => {
      it('should create 8th Edition frame', () => {
        const frame = make8thEditionFrameByLetter('W', false, false, 'regular');
        expect(frame).toBeDefined();
        expect(frame?.src).toContain('8th');
      });

      it('should create 8th Edition PT box', () => {
        const frame = make8thEditionFrameByLetter('U', 'PT', false, 'regular');
        expect(frame).toBeDefined();
        expect(frame?.name).toContain('Power/Toughness');
      });
    });

    describe('makeExtendedArtFrameByLetter', () => {
      it('should create Extended Art frame', () => {
        const frame = makeExtendedArtFrameByLetter('W', false, false, 'regular', false);
        expect(frame).toBeDefined();
        expect(frame?.src).toContain('boxTopper');
      });

      it('should create short Extended Art frame', () => {
        const frame = makeExtendedArtFrameByLetter('W', false, false, 'regular', true);
        expect(frame).toBeDefined();
        expect(frame?.src).toContain('short');
      });
    });

    describe('makeUBFrameByLetter', () => {
      it('should create UB frame', () => {
        const frame = makeUBFrameByLetter('W', false, false, 'regular');
        expect(frame).toBeDefined();
        expect(frame?.src).toContain('ub');
      });

      it('should handle boolean style parameter', () => {
        const frame = makeUBFrameByLetter('W', false, false, false);
        expect(frame).toBeDefined();
      });

      it('should create UB stamp', () => {
        const frame = makeUBFrameByLetter('U', 'Stamp', false, 'regular');
        expect(frame).toBeDefined();
        expect(frame?.name).toContain('Holo Stamp');
      });
    });

    describe('makeCircuitFrameByLetter', () => {
      it('should create Circuit frame', () => {
        const frame = makeCircuitFrameByLetter('W', false, false);
        expect(frame).toBeDefined();
        expect(frame?.src).toContain('circuit');
      });
    });

    describe('makeEtchedFrameByLetter', () => {
      it('should create Etched frame', () => {
        const frame = makeEtchedFrameByLetter('W', false, false, 'regular');
        expect(frame).toBeDefined();
        expect(frame?.src).toContain('etched');
      });

      it('should create Etched stamp', () => {
        const frame = makeEtchedFrameByLetter('U', 'Stamp', false, 'regular');
        expect(frame).toBeDefined();
        expect(frame?.name).toContain('Holo Stamp');
      });
    });

    describe('makePhyrexianFrameByLetter', () => {
      it('should create Phyrexian/Praetors frame', () => {
        const frame = makePhyrexianFrameByLetter('W', false, false);
        expect(frame).toBeDefined();
        expect(frame?.src).toContain('praetors');
      });
    });

    describe('makeSeventhEditionFrameByLetter', () => {
      it('should create Seventh Edition frame', () => {
        const frame = makeSeventhEditionFrameByLetter('W', false, false);
        expect(frame).toBeDefined();
        expect(frame?.src).toContain('seventh');
      });
    });

    describe('makeJapanShowcaseFrameByLetter', () => {
      it('should create Japan Showcase frame', () => {
        const frame = makeJapanShowcaseFrameByLetter('W', false, false, 'regular');
        expect(frame).toBeDefined();
        expect(frame?.src).toContain('japanShowcase');
      });

      it('should create Japan Showcase PT box', () => {
        const frame = makeJapanShowcaseFrameByLetter('U', 'PT', false, 'regular');
        expect(frame).toBeDefined();
      });
    });

    describe('makeVaultFrameByLetter', () => {
      it('should create Vault frame', () => {
        const frame = makeVaultFrameByLetter('W', false, false, 'regular');
        expect(frame).toBeDefined();
        expect(frame?.src).toContain('vault');
      });

      it('should create Vault crown', () => {
        const frame = makeVaultFrameByLetter('U', 'Crown', false, 'regular');
        expect(frame).toBeDefined();
        expect(frame?.src).toContain('crown');
      });

      it('should create Vault stamp', () => {
        const frame = makeVaultFrameByLetter('R', 'Stamp', false, 'regular');
        expect(frame).toBeDefined();
        expect(frame?.src).toContain('stamp');
      });
    });

    describe('makeAdventureFrameByLetter', () => {
      it('should create Adventure frame', () => {
        const frame = makeAdventureFrameByLetter('W', false, false, 'regular');
        expect(frame).toBeDefined();
        expect(frame?.src).toContain('adventure');
      });

      it('should create Adventure Nyx frame', () => {
        const frame = makeAdventureFrameByLetter('U', false, false, 'Nyx');
        expect(frame).toBeDefined();
        expect(frame?.src).toContain('nyx');
      });
    });

    describe('makeOmenFrameByLetter', () => {
      it('should create Omen frame', () => {
        const frame = makeOmenFrameByLetter('W', false, false, 'regular');
        expect(frame).toBeDefined();
        expect(frame?.src).toContain('omen');
      });
    });
  });

  describe('builderRegistry', () => {
    it('should have all 17 builder types registered', () => {
      const expectedBuilders = [
        'M15',
        'M15New',
        'M15Eighth',
        'M15EighthUB',
        'Borderless',
        'BorderlessUB',
        '8thEdition',
        'ExtendedArt',
        'ExtendedArtShort',
        'UB',
        'Circuit',
        'Etched',
        'Phyrexian',
        'SeventhEdition',
        'JapanShowcase',
        'Vault',
        'Adventure',
        'Omen',
      ];

      for (const builderType of expectedBuilders) {
        expect(builderRegistry[builderType]).toBeDefined();
        expect(typeof builderRegistry[builderType]).toBe('function');
      }
    });
  });

  describe('getBuilder', () => {
    it('should return builder function for valid type', () => {
      const builder = getBuilder('M15');

      expect(builder).toBeDefined();
      expect(typeof builder).toBe('function');
    });

    it('should return undefined for unknown type', () => {
      const builder = getBuilder('UnknownBuilder');
      expect(builder).toBeUndefined();
    });

    it('should return working builder function', () => {
      const builder = getBuilder('M15');

      const frame = builder!('W', false, false, 'regular');
      expect(frame).toBeDefined();
      expect(frame?.name).toBe('White Frame');
    });

    it('should return working builder for all registered types', () => {
      const builderTypes = Object.keys(builderRegistry);

      for (const type of builderTypes) {
        const builder = getBuilder(type);
        expect(builder).toBeDefined();

        const frame = builder!('W', false, false, 'regular');
        expect(frame).toBeDefined();
        expect(frame?.src).toBeTruthy();
      }
    });
  });

  describe('Letter transformation in builders', () => {
    it('should strip land indicator for crown masks', () => {
      const frame = makeM15FrameByLetter('WL', 'Crown', false, 'regular');
      expect(frame).toBeDefined();
      expect(frame?.name).toBe('White Legend Crown');
    });

    it('should handle multicolor letters', () => {
      const frame = makeM15FrameByLetter('M', false, false, 'regular');
      expect(frame).toBeDefined();
      expect(frame?.name).toBe('Multicolored Frame');
    });

    it('should handle artifact letter', () => {
      const frame = makeM15FrameByLetter('A', false, false, 'regular');
      expect(frame).toBeDefined();
      expect(frame?.name).toBe('Artifact Frame');
    });

    it('should handle colorless letter', () => {
      const frame = makeM15FrameByLetter('C', false, false, 'regular');
      expect(frame).toBeDefined();
      expect(frame?.name).toBe('Colorless Frame');
    });
  });

  describe('Style handling', () => {
    it('should handle regular style', () => {
      const frame = makeM15FrameByLetter('W', false, false, 'regular');
      expect(frame).toBeDefined();
      expect(frame?.src).toContain('regular');
    });

    it('should handle Nyx style', () => {
      const frame = makeM15FrameByLetter('W', false, false, 'Nyx');
      expect(frame).toBeDefined();
      expect(frame?.src).toContain('Nyx');
    });

    it('should handle snow style', () => {
      const frame = makeM15FrameByLetter('W', false, false, 'snow');
      expect(frame).toBeDefined();
      expect(frame?.src).toContain('snow');
    });
  });
});
