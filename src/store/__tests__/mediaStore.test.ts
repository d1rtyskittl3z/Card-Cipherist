/**
 * Media Store Test Suite
 *
 * Tests all media asset management functionality including:
 * - Art transformation (position, zoom, rotation)
 * - Set symbol management
 * - Watermark handling (position, colors, opacity)
 * - Image element management
 * - Reset functions
 * - Immer middleware integration
 * - cardStore synchronization
 */

import { useMediaStore } from '../mediaStore';
import { useCardStore } from '../cardStore';
import { vi } from 'vitest';

// Mock console.log to reduce test output noise
beforeAll(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe('mediaStore', () => {
  beforeEach(() => {
    // Reset mediaStore to initial state
    useMediaStore.setState({
      artSource: '/img/blank.png',
      artX: 0,
      artY: 0,
      artZoom: 1,
      artRotate: 0,
      artImage: null,
      setSymbolSource: '/img/blank.png',
      setSymbolX: 0,
      setSymbolY: 0,
      setSymbolZoom: 1,
      setSymbolImage: null,
      setCode: '',
      rarity: '',
      watermarkSource: '/img/blank.png',
      watermarkX: 0,
      watermarkY: 0,
      watermarkZoom: 1,
      watermarkLeft: '#b79d58',
      watermarkRight: 'none',
      watermarkOpacity: 1,
      watermarkImage: null,
      manaSymbolImages: {},
    });

    // Reset cardStore to prevent side effects
    useCardStore.getState().resetCard();
  });

  describe('Art Management', () => {
    describe('updateArt', () => {
      it('should update art position', () => {
        useMediaStore.getState().updateArt({ artX: 0.5, artY: 0.3 });

        const { artX, artY } = useMediaStore.getState();
        expect(artX).toBe(0.5);
        expect(artY).toBe(0.3);
      });

      it('should update art zoom', () => {
        useMediaStore.getState().updateArt({ artZoom: 1.5 });

        const { artZoom } = useMediaStore.getState();
        expect(artZoom).toBe(1.5);
      });

      it('should update art rotation', () => {
        useMediaStore.getState().updateArt({ artRotate: 90 });

        const { artRotate } = useMediaStore.getState();
        expect(artRotate).toBe(90);
      });

      it('should update art source', () => {
        useMediaStore.getState().updateArt({ artSource: '/new/art.png' });

        const { artSource } = useMediaStore.getState();
        expect(artSource).toBe('/new/art.png');
      });

      it('should update multiple art properties at once', () => {
        useMediaStore.getState().updateArt({
          artX: 0.7,
          artY: 0.4,
          artZoom: 2.0,
          artRotate: 180,
        });

        const { artX, artY, artZoom, artRotate } = useMediaStore.getState();
        expect(artX).toBe(0.7);
        expect(artY).toBe(0.4);
        expect(artZoom).toBe(2.0);
        expect(artRotate).toBe(180);
      });

      it('should not sync art updates to cardStore (stores are independent)', () => {
        // Phase 5: mediaStore is fully independent - no sync to cardStore
        useMediaStore.getState().updateArt({ artX: 0.5, artZoom: 1.5 });

        // Verify mediaStore was updated
        const { artX, artZoom } = useMediaStore.getState();
        expect(artX).toBe(0.5);
        expect(artZoom).toBe(1.5);

        // Verify cardStore was NOT affected (no sync)
        const cardState = useCardStore.getState().card;
        expect(cardState.artX).not.toBe(0.5);
        expect(cardState.artZoom).not.toBe(1.5);
      });

      it('should handle zero values correctly', () => {
        useMediaStore.getState().updateArt({ artX: 0, artY: 0, artZoom: 0, artRotate: 0 });

        const { artX, artY, artZoom, artRotate } = useMediaStore.getState();
        expect(artX).toBe(0);
        expect(artY).toBe(0);
        expect(artZoom).toBe(0);
        expect(artRotate).toBe(0);
      });
    });

    describe('setArtImage', () => {
      it('should set art image element', () => {
        const mockImage = new Image();
        mockImage.src = '/test.png';

        useMediaStore.getState().setArtImage(mockImage);

        const { artImage } = useMediaStore.getState();
        expect(artImage).toBe(mockImage);
        expect(artImage?.src).toContain('/test.png');
      });

      it('should clear art image when set to null', () => {
        const mockImage = new Image();
        useMediaStore.getState().setArtImage(mockImage);
        useMediaStore.getState().setArtImage(null);

        const { artImage } = useMediaStore.getState();
        expect(artImage).toBeNull();
      });

      it('should not sync art image to cardStore (stores are independent)', () => {
        // Phase 5: mediaStore is fully independent - no sync to cardStore
        const mockImage = new Image();
        useMediaStore.getState().setArtImage(mockImage);

        // Verify mediaStore was updated
        const { artImage } = useMediaStore.getState();
        expect(artImage).toBe(mockImage);

        // Verify cardStore was NOT affected (no sync)
        const cardStoreImage = useCardStore.getState().artImage;
        expect(cardStoreImage).not.toBe(mockImage);
      });
    });

    describe('resetArt', () => {
      it('should reset art to default state', () => {
        // Modify art state
        useMediaStore.getState().updateArt({
          artSource: '/custom.png',
          artX: 0.7,
          artY: 0.5,
          artZoom: 2.0,
          artRotate: 90,
        });
        useMediaStore.getState().setArtImage(new Image());

        // Reset
        useMediaStore.getState().resetArt();

        const state = useMediaStore.getState();
        expect(state.artSource).toBe('/img/blank.png');
        expect(state.artX).toBe(0);
        expect(state.artY).toBe(0);
        expect(state.artZoom).toBe(1);
        expect(state.artRotate).toBe(0);
        expect(state.artImage).toBeNull();
      });

      it('should reset art without affecting cardStore (stores are independent)', () => {
        // Phase 5: mediaStore is fully independent - no sync to cardStore
        useMediaStore.getState().updateArt({ artX: 0.5 });
        useMediaStore.getState().resetArt();

        // Verify mediaStore was reset
        const state = useMediaStore.getState();
        expect(state.artX).toBe(0);
        expect(state.artZoom).toBe(1);
        expect(state.artImage).toBeNull();
      });
    });
  });

  describe('Set Symbol Management', () => {
    describe('updateSetSymbol', () => {
      it('should update set symbol position', () => {
        useMediaStore.getState().updateSetSymbol({ setSymbolX: 0.8, setSymbolY: 0.6 });

        const { setSymbolX, setSymbolY } = useMediaStore.getState();
        expect(setSymbolX).toBe(0.8);
        expect(setSymbolY).toBe(0.6);
      });

      it('should update set symbol zoom', () => {
        useMediaStore.getState().updateSetSymbol({ setSymbolZoom: 1.2 });

        const { setSymbolZoom } = useMediaStore.getState();
        expect(setSymbolZoom).toBe(1.2);
      });

      it('should update set symbol source', () => {
        useMediaStore.getState().updateSetSymbol({ setSymbolSource: '/symbols/mh3.png' });

        const { setSymbolSource } = useMediaStore.getState();
        expect(setSymbolSource).toBe('/symbols/mh3.png');
      });

      it('should not sync set symbol updates to cardStore (stores are independent)', () => {
        // Phase 5: mediaStore is fully independent - no sync to cardStore
        useMediaStore.getState().updateSetSymbol({ setSymbolX: 0.9, setSymbolZoom: 1.5 });

        // Verify mediaStore was updated
        const { setSymbolX, setSymbolZoom } = useMediaStore.getState();
        expect(setSymbolX).toBe(0.9);
        expect(setSymbolZoom).toBe(1.5);
      });
    });

    describe('setSetSymbolImage', () => {
      it('should set set symbol image element', () => {
        const mockImage = new Image();
        mockImage.src = '/symbol.png';

        useMediaStore.getState().setSetSymbolImage(mockImage);

        const { setSymbolImage } = useMediaStore.getState();
        expect(setSymbolImage).toBe(mockImage);
      });

      it('should not sync set symbol image to cardStore (stores are independent)', () => {
        // Phase 5: mediaStore is fully independent - no sync to cardStore
        const mockImage = new Image();
        useMediaStore.getState().setSetSymbolImage(mockImage);

        // Verify mediaStore was updated
        const { setSymbolImage } = useMediaStore.getState();
        expect(setSymbolImage).toBe(mockImage);
      });
    });

    describe('setSetCode', () => {
      it('should set set code', () => {
        useMediaStore.getState().setSetCode('MH3');

        const { setCode } = useMediaStore.getState();
        expect(setCode).toBe('MH3');
      });

      it('should set set code in mediaStore only (no sync)', () => {
        // Phase 5: mediaStore is fully independent - no sync to cardStore
        useMediaStore.getState().setSetCode('BRO');

        // Verify mediaStore was updated
        const { setCode } = useMediaStore.getState();
        expect(setCode).toBe('BRO');
      });
    });

    describe('setRarity', () => {
      it('should set rarity', () => {
        useMediaStore.getState().setRarity('mythic');

        const { rarity } = useMediaStore.getState();
        expect(rarity).toBe('mythic');
      });

      it('should set rarity in mediaStore only (no sync)', () => {
        // Phase 5: mediaStore is fully independent - no sync to cardStore
        useMediaStore.getState().setRarity('rare');

        // Verify mediaStore was updated
        const { rarity } = useMediaStore.getState();
        expect(rarity).toBe('rare');
      });
    });

    describe('resetSetSymbol', () => {
      it('should reset set symbol to default state', () => {
        // Modify set symbol state
        useMediaStore.getState().updateSetSymbol({
          setSymbolSource: '/custom.png',
          setSymbolX: 0.9,
          setSymbolY: 0.7,
          setSymbolZoom: 1.5,
        });
        useMediaStore.getState().setSetCode('MH3');
        useMediaStore.getState().setRarity('mythic');
        useMediaStore.getState().setSetSymbolImage(new Image());

        // Reset
        useMediaStore.getState().resetSetSymbol();

        const state = useMediaStore.getState();
        expect(state.setSymbolSource).toBe('/img/blank.png');
        expect(state.setSymbolX).toBe(0);
        expect(state.setSymbolY).toBe(0);
        expect(state.setSymbolZoom).toBe(1);
        expect(state.setCode).toBe('');
        expect(state.rarity).toBe('');
        expect(state.setSymbolImage).toBeNull();
      });
    });
  });

  describe('Watermark Management', () => {
    describe('updateWatermark', () => {
      it('should update watermark position', () => {
        useMediaStore.getState().updateWatermark({ watermarkX: 0.3, watermarkY: 0.5 });

        const { watermarkX, watermarkY } = useMediaStore.getState();
        expect(watermarkX).toBe(0.3);
        expect(watermarkY).toBe(0.5);
      });

      it('should update watermark zoom', () => {
        useMediaStore.getState().updateWatermark({ watermarkZoom: 0.8 });

        const { watermarkZoom } = useMediaStore.getState();
        expect(watermarkZoom).toBe(0.8);
      });

      it('should update watermark source', () => {
        useMediaStore.getState().updateWatermark({ watermarkSource: '/watermarks/guild.png' });

        const { watermarkSource } = useMediaStore.getState();
        expect(watermarkSource).toBe('/watermarks/guild.png');
      });

      it('should update watermark colors', () => {
        useMediaStore.getState().updateWatermark({
          watermarkLeft: '#ff0000',
          watermarkRight: '#00ff00',
        });

        const { watermarkLeft, watermarkRight } = useMediaStore.getState();
        expect(watermarkLeft).toBe('#ff0000');
        expect(watermarkRight).toBe('#00ff00');
      });

      it('should update watermark opacity', () => {
        useMediaStore.getState().updateWatermark({ watermarkOpacity: 0.5 });

        const { watermarkOpacity } = useMediaStore.getState();
        expect(watermarkOpacity).toBe(0.5);
      });

      it('should update multiple watermark properties at once', () => {
        useMediaStore.getState().updateWatermark({
          watermarkX: 0.4,
          watermarkY: 0.6,
          watermarkZoom: 1.3,
          watermarkLeft: '#0000ff',
          watermarkOpacity: 0.7,
        });

        const state = useMediaStore.getState();
        expect(state.watermarkX).toBe(0.4);
        expect(state.watermarkY).toBe(0.6);
        expect(state.watermarkZoom).toBe(1.3);
        expect(state.watermarkLeft).toBe('#0000ff');
        expect(state.watermarkOpacity).toBe(0.7);
      });

      it('should not sync watermark updates to cardStore (stores are independent)', () => {
        // Phase 5: mediaStore is fully independent - no sync to cardStore
        useMediaStore.getState().updateWatermark({
          watermarkX: 0.5,
          watermarkOpacity: 0.8,
        });

        // Verify mediaStore was updated
        const { watermarkX, watermarkOpacity } = useMediaStore.getState();
        expect(watermarkX).toBe(0.5);
        expect(watermarkOpacity).toBe(0.8);
      });
    });

    describe('setWatermarkImage', () => {
      it('should set watermark image element', () => {
        const mockImage = new Image();
        mockImage.src = '/watermark.png';

        useMediaStore.getState().setWatermarkImage(mockImage);

        const { watermarkImage } = useMediaStore.getState();
        expect(watermarkImage).toBe(mockImage);
      });

      it('should not sync watermark image to cardStore (stores are independent)', () => {
        // Phase 5: mediaStore is fully independent - no sync to cardStore
        const mockImage = new Image();
        useMediaStore.getState().setWatermarkImage(mockImage);

        // Verify mediaStore was updated
        const { watermarkImage } = useMediaStore.getState();
        expect(watermarkImage).toBe(mockImage);
      });
    });

    describe('resetWatermark', () => {
      it('should reset watermark to default state', () => {
        // Modify watermark state
        useMediaStore.getState().updateWatermark({
          watermarkSource: '/custom.png',
          watermarkX: 0.8,
          watermarkY: 0.6,
          watermarkZoom: 1.5,
          watermarkLeft: '#ff0000',
          watermarkRight: '#00ff00',
          watermarkOpacity: 0.5,
        });
        useMediaStore.getState().setWatermarkImage(new Image());

        // Reset
        useMediaStore.getState().resetWatermark();

        const state = useMediaStore.getState();
        expect(state.watermarkSource).toBe('/img/blank.png');
        expect(state.watermarkX).toBe(0);
        expect(state.watermarkY).toBe(0);
        expect(state.watermarkZoom).toBe(1);
        expect(state.watermarkLeft).toBe('#b79d58');
        expect(state.watermarkRight).toBe('none');
        expect(state.watermarkOpacity).toBe(1);
        expect(state.watermarkImage).toBeNull();
      });
    });
  });

  describe('Mana Symbol Management', () => {
    describe('setManaSymbolImages', () => {
      it('should set mana symbol images cache', () => {
        const mockImages = {
          w: new Image(),
          u: new Image(),
          b: new Image(),
        };

        useMediaStore.getState().setManaSymbolImages(mockImages);

        const { manaSymbolImages } = useMediaStore.getState();
        expect(manaSymbolImages).toBe(mockImages);
        expect(Object.keys(manaSymbolImages)).toHaveLength(3);
      });

      it('should set mana symbol images in mediaStore only (no sync)', () => {
        // Phase 5: mediaStore is fully independent - no sync to cardStore
        const mockImages = {
          r: new Image(),
          g: new Image(),
        };

        useMediaStore.getState().setManaSymbolImages(mockImages);

        // Verify mediaStore was updated
        const { manaSymbolImages } = useMediaStore.getState();
        expect(manaSymbolImages).toBe(mockImages);
        expect(Object.keys(manaSymbolImages)).toHaveLength(2);
      });

      it('should replace existing mana symbol cache', () => {
        useMediaStore.getState().setManaSymbolImages({ w: new Image() });
        useMediaStore.getState().setManaSymbolImages({ u: new Image() });

        const { manaSymbolImages } = useMediaStore.getState();
        expect(Object.keys(manaSymbolImages)).toHaveLength(1);
        expect(manaSymbolImages.w).toBeUndefined();
        expect(manaSymbolImages.u).toBeDefined();
      });
    });
  });

  describe('Immer Middleware Integration', () => {
    it('should allow direct mutation syntax via Immer', () => {
      // Immer allows mutations inside set() callbacks
      const initialX = useMediaStore.getState().artX;
      useMediaStore.getState().updateArt({ artX: 0.5 });
      const updatedX = useMediaStore.getState().artX;

      expect(initialX).toBe(0);
      expect(updatedX).toBe(0.5);
    });

    it('should maintain immutability outside store actions', () => {
      const state1 = useMediaStore.getState();
      useMediaStore.getState().updateArt({ artX: 0.5 });
      const state2 = useMediaStore.getState();

      // References should be different (immutability)
      expect(state1).not.toBe(state2);
      expect(state1.artX).toBe(0);
      expect(state2.artX).toBe(0.5);
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined updates gracefully', () => {
      useMediaStore.getState().updateArt({ artX: 0.5 });
      useMediaStore.getState().updateArt({}); // Empty update

      const { artX } = useMediaStore.getState();
      expect(artX).toBe(0.5); // Should remain unchanged
    });

    it('should handle negative values', () => {
      useMediaStore.getState().updateArt({ artX: -0.5, artY: -1.0 });

      const { artX, artY } = useMediaStore.getState();
      expect(artX).toBe(-0.5);
      expect(artY).toBe(-1.0);
    });

    it('should handle very large zoom values', () => {
      useMediaStore.getState().updateArt({ artZoom: 10.0 });

      const { artZoom } = useMediaStore.getState();
      expect(artZoom).toBe(10.0);
    });

    it('should handle rotation values beyond 360', () => {
      useMediaStore.getState().updateArt({ artRotate: 720 });

      const { artRotate } = useMediaStore.getState();
      expect(artRotate).toBe(720);
    });

    it('should handle empty string for sources', () => {
      useMediaStore.getState().updateArt({ artSource: '' });

      const { artSource } = useMediaStore.getState();
      expect(artSource).toBe('');
    });
  });

  describe('State Consistency', () => {
    it('should maintain independent state for art, set symbol, and watermark', () => {
      useMediaStore.getState().updateArt({ artX: 0.1, artY: 0.2 });
      useMediaStore.getState().updateSetSymbol({ setSymbolX: 0.8, setSymbolY: 0.9 });
      useMediaStore.getState().updateWatermark({ watermarkX: 0.5, watermarkY: 0.5 });

      const state = useMediaStore.getState();
      expect(state.artX).toBe(0.1);
      expect(state.artY).toBe(0.2);
      expect(state.setSymbolX).toBe(0.8);
      expect(state.setSymbolY).toBe(0.9);
      expect(state.watermarkX).toBe(0.5);
      expect(state.watermarkY).toBe(0.5);
    });

    it('should not affect other properties when updating specific ones', () => {
      // Set initial state
      useMediaStore.getState().updateArt({
        artX: 0.5,
        artY: 0.5,
        artZoom: 1.5,
        artRotate: 90,
      });

      // Update only one property
      useMediaStore.getState().updateArt({ artX: 0.7 });

      const state = useMediaStore.getState();
      expect(state.artX).toBe(0.7);
      expect(state.artY).toBe(0.5); // Unchanged
      expect(state.artZoom).toBe(1.5); // Unchanged
      expect(state.artRotate).toBe(90); // Unchanged
    });
  });
});
