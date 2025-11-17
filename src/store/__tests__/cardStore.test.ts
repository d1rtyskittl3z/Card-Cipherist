/**
 * Card Store Test Suite
 *
 * Tests core card store functionality including:
 * - Card dimension management
 * - Text field management
 * - Card reset functionality
 * - State persistence behavior
 *
 * Note: Frame management is tested in frameStore.test.ts
 * Note: Media management is tested in mediaStore.test.ts
 */

import { useCardStore } from '../cardStore';
import type { TextObject } from '../../types/card.types';

describe('cardStore', () => {
  beforeEach(() => {
    // Reset cardStore to initial state
    useCardStore.getState().resetCard();

    // Also reset collector info fields (not reset by resetCard)
    useCardStore.getState().setCollectorSetCode('MTG');
    useCardStore.getState().setCollectorLanguage('EN');
    useCardStore.getState().setCollectorArtist('');
    useCardStore.getState().setCollectorRarity('P');
    useCardStore.getState().setCollectorDigits('2025');
  });

  describe('Card Dimension Management', () => {
    describe('updateCard', () => {
      it('should update card width', () => {
        useCardStore.getState().updateCard({ width: 3000 });

        const { card } = useCardStore.getState();
        expect(card.width).toBe(3000);
      });

      it('should update card height', () => {
        useCardStore.getState().updateCard({ height: 4000 });

        const { card } = useCardStore.getState();
        expect(card.height).toBe(4000);
      });

      it('should update both dimensions simultaneously', () => {
        useCardStore.getState().updateCard({ width: 3000, height: 4000 });

        const { card } = useCardStore.getState();
        expect(card.width).toBe(3000);
        expect(card.height).toBe(4000);
      });

      it('should preserve other properties when updating dimensions', () => {
        useCardStore.getState().updateCard({ artX: 0.5, artY: 0.3 });
        useCardStore.getState().updateCard({ width: 3000 });

        const { card } = useCardStore.getState();
        expect(card.width).toBe(3000);
        expect(card.artX).toBe(0.5); // Preserved
        expect(card.artY).toBe(0.3); // Preserved
      });
    });

    describe('margins', () => {
      it('should have zero margins by default', () => {
        const { card } = useCardStore.getState();
        expect(card.marginX).toBe(0);
        expect(card.marginY).toBe(0);
      });

      it('should update margins via updateCard', () => {
        useCardStore.getState().updateCard({ marginX: 0.1, marginY: 0.15 });

        const { card } = useCardStore.getState();
        expect(card.marginX).toBe(0.1);
        expect(card.marginY).toBe(0.15);
      });
    });
  });

  describe('Text Management', () => {
    describe('updateText', () => {
      it('should update text content', () => {
        useCardStore.getState().updateText('title', { text: 'Lightning Bolt' });

        const { card } = useCardStore.getState();
        expect(card.text.title?.text).toBe('Lightning Bolt');
      });

      it('should update text color', () => {
        useCardStore.getState().updateText('title', { color: '#ff0000' });

        const { card } = useCardStore.getState();
        expect(card.text.title?.color).toBe('#ff0000');
      });

      it('should update text size', () => {
        useCardStore.getState().updateText('title', { size: 60 });

        const { card } = useCardStore.getState();
        expect(card.text.title?.size).toBe(60);
      });

      it('should update multiple text properties at once', () => {
        useCardStore.getState().updateText('title', {
          text: 'Counterspell',
          color: '#0000ff',
          size: 55,
        });

        const { card } = useCardStore.getState();
        expect(card.text.title?.text).toBe('Counterspell');
        expect(card.text.title?.color).toBe('#0000ff');
        expect(card.text.title?.size).toBe(55);
      });

      it('should create new text field if it does not exist', () => {
        useCardStore.getState().updateText('newField', {
          text: 'New Text',
          color: '#ffffff',
        });

        const { card } = useCardStore.getState();
        expect(card.text.newField).toBeDefined();
        expect(card.text.newField?.text).toBe('New Text');
        expect(card.text.newField?.color).toBe('#ffffff');
      });

      it('should preserve other text fields when updating one', () => {
        useCardStore.getState().updateText('title', { text: 'Title Text' });
        useCardStore.getState().updateText('rules', { text: 'Rules Text' });

        const { card } = useCardStore.getState();
        expect(card.text.title?.text).toBe('Title Text');
        expect(card.text.rules?.text).toBe('Rules Text');
      });

      it('should update text position', () => {
        useCardStore.getState().updateText('title', { x: 0.5, y: 0.3 });

        const { card } = useCardStore.getState();
        expect(card.text.title?.x).toBe(0.5);
        expect(card.text.title?.y).toBe(0.3);
      });

      it('should update text alignment', () => {
        useCardStore.getState().updateText('title', { align: 'center' });

        const { card } = useCardStore.getState();
        expect(card.text.title?.align).toBe('center');
      });
    });

    describe('setText', () => {
      it('should replace entire text object', () => {
        const newText: { [key: string]: TextObject } = {
          title: {
            name: 'title',
            text: 'New Title',
            x: 0.1,
            y: 0.1,
            width: 0.8,
            height: 0.1,
            size: 50,
            font: 'Beleren',
            color: '#000',
            align: 'center',
          },
          rules: {
            name: 'rules',
            text: 'New Rules',
            x: 0.1,
            y: 0.5,
            width: 0.8,
            height: 0.3,
            size: 30,
            font: 'MPlantin',
            color: '#000',
            align: 'left',
          },
        };

        useCardStore.getState().setText(newText);

        const { card } = useCardStore.getState();
        expect(card.text).toEqual(newText);
      });

      it('should clear existing text when setting new text object', () => {
        useCardStore.getState().updateText('oldField', { text: 'Old' });
        useCardStore.getState().setText({
          newField: {
            name: 'newField',
            text: 'New',
            x: 0,
            y: 0,
            width: 1,
            height: 1,
            size: 40,
            font: 'Arial',
            color: '#fff',
            align: 'center',
          },
        });

        const { card } = useCardStore.getState();
        expect(card.text.oldField).toBeUndefined();
        expect(card.text.newField).toBeDefined();
      });
    });

    describe('setSelectedTextIndex', () => {
      it('should set selected text index', () => {
        useCardStore.getState().setSelectedTextIndex(5);

        const { selectedTextIndex } = useCardStore.getState();
        expect(selectedTextIndex).toBe(5);
      });

      it('should change text index', () => {
        useCardStore.getState().setSelectedTextIndex(2);
        expect(useCardStore.getState().selectedTextIndex).toBe(2);

        useCardStore.getState().setSelectedTextIndex(7);
        expect(useCardStore.getState().selectedTextIndex).toBe(7);
      });
    });
  });

  describe('Card Reset', () => {
    describe('resetCard', () => {
      it('should reset card to default dimensions', () => {
        useCardStore.getState().updateCard({ width: 3000, height: 4000 });
        useCardStore.getState().resetCard();

        const { card } = useCardStore.getState();
        expect(card.width).toBe(2010); // BASE_WIDTH
        expect(card.height).toBe(2814); // BASE_HEIGHT
      });

      it('should reset margins to zero', () => {
        useCardStore.getState().updateCard({ marginX: 0.2, marginY: 0.3 });
        useCardStore.getState().resetCard();

        const { card } = useCardStore.getState();
        expect(card.marginX).toBe(0);
        expect(card.marginY).toBe(0);
      });

      it('should clear frames', () => {
        useCardStore.getState().addFrame({
          name: 'Test Frame',
          src: '/test.png',
          image: null,
          masks: [],
          opacity: 1,
          visible: true,
        });
        useCardStore.getState().resetCard();

        const { card } = useCardStore.getState();
        expect(card.frames).toHaveLength(0);
      });

      it('should clear text fields', () => {
        useCardStore.getState().updateText('title', { text: 'Title' });
        useCardStore.getState().resetCard();

        const { card } = useCardStore.getState();
        expect(Object.keys(card.text)).toHaveLength(0);
      });

      it('should reset art to default state', () => {
        useCardStore.getState().updateCard({
          artX: 0.5,
          artY: 0.5,
          artZoom: 2.0,
          artRotate: 90,
        });
        useCardStore.getState().resetCard();

        const { card } = useCardStore.getState();
        expect(card.artX).toBe(0);
        expect(card.artY).toBe(0);
        expect(card.artZoom).toBe(1);
        expect(card.artRotate).toBe(0);
        expect(card.artSource).toBe('/img/blank.png');
      });

      it('should reset selected indices', () => {
        useCardStore.getState().setSelectedFrameIndex(5);
        useCardStore.getState().setSelectedTextIndex(3);
        useCardStore.getState().resetCard();

        const state = useCardStore.getState();
        expect(state.selectedFrameIndex).toBe(0);
        expect(state.selectedTextIndex).toBe(0);
      });
    });
  });

  describe('Collector Info Management', () => {
    describe('setCollectorSetCode', () => {
      it('should set collector set code', () => {
        useCardStore.getState().setCollectorSetCode('BRO');

        const { collectorSetCode } = useCardStore.getState();
        expect(collectorSetCode).toBe('BRO');
      });
    });

    describe('setCollectorLanguage', () => {
      it('should set collector language', () => {
        useCardStore.getState().setCollectorLanguage('JP');

        const { collectorLanguage } = useCardStore.getState();
        expect(collectorLanguage).toBe('JP');
      });
    });

    describe('setCollectorArtist', () => {
      it('should set collector artist', () => {
        useCardStore.getState().setCollectorArtist('John Avon');

        const { collectorArtist } = useCardStore.getState();
        expect(collectorArtist).toBe('John Avon');
      });
    });

    describe('setCollectorRarity', () => {
      it('should set collector rarity', () => {
        useCardStore.getState().setCollectorRarity('M');

        const { collectorRarity } = useCardStore.getState();
        expect(collectorRarity).toBe('M');
      });
    });

    describe('setCollectorDigits', () => {
      it('should set collector digits', () => {
        useCardStore.getState().setCollectorDigits('123');

        const { collectorDigits } = useCardStore.getState();
        expect(collectorDigits).toBe('123');
      });
    });
  });

  describe('State Consistency', () => {
    it('should not affect text when updating dimensions', () => {
      useCardStore.getState().updateText('title', { text: 'Title' });
      useCardStore.getState().updateCard({ width: 3000 });

      const { card } = useCardStore.getState();
      expect(card.width).toBe(3000);
      expect(card.text.title?.text).toBe('Title');
    });

    it('should not affect dimensions when updating text', () => {
      useCardStore.getState().updateCard({ width: 3000, height: 4000 });
      useCardStore.getState().updateText('title', { text: 'Title' });

      const { card } = useCardStore.getState();
      expect(card.width).toBe(3000);
      expect(card.height).toBe(4000);
    });

    it('should maintain independent state for different text fields', () => {
      useCardStore.getState().updateText('title', { text: 'Title', size: 50 });
      useCardStore.getState().updateText('rules', { text: 'Rules', size: 30 });

      const { card } = useCardStore.getState();
      expect(card.text.title?.text).toBe('Title');
      expect(card.text.title?.size).toBe(50);
      expect(card.text.rules?.text).toBe('Rules');
      expect(card.text.rules?.size).toBe(30);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty updateCard calls', () => {
      const initialCard = useCardStore.getState().card;
      useCardStore.getState().updateCard({});

      const { card } = useCardStore.getState();
      expect(card).toEqual(initialCard);
    });

    it('should handle updating non-existent text field', () => {
      useCardStore.getState().updateText('nonexistent', { text: 'Test' });

      const { card } = useCardStore.getState();
      expect(card.text.nonexistent).toBeDefined();
      expect(card.text.nonexistent?.text).toBe('Test');
    });

    it('should handle zero dimensions', () => {
      useCardStore.getState().updateCard({ width: 0, height: 0 });

      const { card } = useCardStore.getState();
      expect(card.width).toBe(0);
      expect(card.height).toBe(0);
    });

    it('should handle negative margins', () => {
      useCardStore.getState().updateCard({ marginX: -0.1, marginY: -0.2 });

      const { card } = useCardStore.getState();
      expect(card.marginX).toBe(-0.1);
      expect(card.marginY).toBe(-0.2);
    });

    it('should handle empty text content', () => {
      useCardStore.getState().updateText('title', { text: '' });

      const { card } = useCardStore.getState();
      expect(card.text.title?.text).toBe('');
    });
  });

  describe('Initial State', () => {
    it('should have correct default card dimensions', () => {
      const { card } = useCardStore.getState();
      expect(card.width).toBe(2010);
      expect(card.height).toBe(2814);
    });

    it('should have zero margins by default', () => {
      const { card } = useCardStore.getState();
      expect(card.marginX).toBe(0);
      expect(card.marginY).toBe(0);
    });

    it('should have empty frames array', () => {
      const { card } = useCardStore.getState();
      expect(card.frames).toEqual([]);
    });

    it('should have empty text object', () => {
      const { card } = useCardStore.getState();
      expect(card.text).toEqual({});
    });

    it('should have default art state', () => {
      const { card } = useCardStore.getState();
      expect(card.artSource).toBe('/img/blank.png');
      expect(card.artX).toBe(0);
      expect(card.artY).toBe(0);
      expect(card.artZoom).toBe(1);
      expect(card.artRotate).toBe(0);
    });

    it('should have default collector info', () => {
      const state = useCardStore.getState();
      expect(state.collectorSetCode).toBe('MTG');
      expect(state.collectorLanguage).toBe('EN');
      expect(state.collectorArtist).toBe('');
      expect(state.collectorRarity).toBe('P');
      expect(state.collectorDigits).toBe('2025');
    });

    it('should have selected indices at 0', () => {
      const state = useCardStore.getState();
      expect(state.selectedFrameIndex).toBe(0);
      expect(state.selectedTextIndex).toBe(0);
    });
  });
});
