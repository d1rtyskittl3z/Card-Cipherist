import { describe, it, expect, beforeEach } from 'vitest';
import { useCardStore } from '../cardStore';
import type { Frame } from '../../types/card.types';

describe('cardStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useCardStore.setState({
      card: {
        width: 2010,
        height: 2814,
        marginX: 0,
        marginY: 0,
        frames: [],
        artSource: '/img/blank.png',
        artX: 0,
        artY: 0,
        artZoom: 1,
        artRotate: 0,
        setSymbolSource: '/img/blank.png',
        setSymbolX: 0,
        setSymbolY: 0,
        setSymbolZoom: 1,
        watermarkSource: '/img/blank.png',
        watermarkX: 0,
        watermarkY: 0,
        watermarkZoom: 1,
        watermarkLeft: '#b79d58',
        watermarkRight: 'none',
        watermarkOpacity: 0.4,
        version: '',
        manaSymbols: [],
        text: {},
        bottomInfo: {},
        landscape: false,
        margins: false,
        bottomInfoTranslate: { x: 0, y: 0 },
        bottomInfoRotate: 0,
        bottomInfoZoom: 1,
        bottomInfoColor: 'white',
        hideBottomInfoBorder: false,
        showsFlavorBar: true,
        onload: null,
        infoYear: new Date().getFullYear(),
        showCollectorInfo: false,
        collectorInfoStyle: 'default',
        saga: null,
      },
    });
  });

  describe('addFrame', () => {
    it('should add a frame to the card', () => {
      const mockFrame: Frame = {
        name: 'Test Frame',
        src: '/test.png',
        image: null,
        masks: [],
        opacity: 1,
      };

      useCardStore.getState().addFrame(mockFrame);

      const frames = useCardStore.getState().card.frames;
      expect(frames).toHaveLength(1);
      expect(frames[0].name).toBe('Test Frame');
    });

    it('should calculate margins when frame has bounds', () => {
      const mockFrame: Frame = {
        name: 'Test Frame',
        src: '/test.png',
        image: null,
        masks: [],
        opacity: 1,
        bounds: {
          x: -0.1,
          y: -0.1,
          width: 1.2,
          height: 1.2,
        },
      };

      useCardStore.getState().addFrame(mockFrame);

      const { marginX, marginY } = useCardStore.getState().card;
      expect(marginX).toBeGreaterThan(0);
      expect(marginY).toBeGreaterThan(0);
    });
  });

  describe('removeFrame', () => {
    it('should remove a frame at the specified index', () => {
      const frame1: Frame = {
        name: 'Frame 1',
        src: '/test1.png',
        image: null,
        masks: [],
        opacity: 1,
      };
      const frame2: Frame = {
        name: 'Frame 2',
        src: '/test2.png',
        image: null,
        masks: [],
        opacity: 1,
      };

      useCardStore.getState().addFrame(frame1);
      useCardStore.getState().addFrame(frame2);
      useCardStore.getState().removeFrame(0);

      const frames = useCardStore.getState().card.frames;
      expect(frames).toHaveLength(1);
      expect(frames[0].name).toBe('Frame 2');
    });
  });

  describe('updateText', () => {
    it('should update text field', () => {
      useCardStore.getState().updateText('title', { text: 'Test Card' });

      const text = useCardStore.getState().card.text?.title;
      expect(text?.text).toBe('Test Card');
    });

    it('should merge updates with existing text', () => {
      useCardStore.getState().updateText('title', { text: 'Test', color: 'red' });
      useCardStore.getState().updateText('title', { text: 'Updated' });

      const text = useCardStore.getState().card.text?.title;
      expect(text?.text).toBe('Updated');
      expect(text?.color).toBe('red');
    });
  });
});
