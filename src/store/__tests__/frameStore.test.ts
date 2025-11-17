import { useFrameStore } from '../frameStore';
import type { Frame } from '../../types/card.types';

describe('frameStore', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useFrameStore.setState({
      frames: [],
      selectedFrameIndex: 0,
      availableFrames: [],
      loadedPack: null,
      isFrameEditorOpen: false,
      editingFrameIndex: null,
      selectedMaskIndex: 0,
    });
  });

  describe('addFrame', () => {
    it('should add frame to frames array', () => {
      const mockFrame: Frame = {
        name: 'Test Frame',
        src: '/test.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
      };

      useFrameStore.getState().addFrame(mockFrame);

      const frames = useFrameStore.getState().frames;
      expect(frames).toHaveLength(1);
      expect(frames[0].name).toBe('Test Frame');
      expect(frames[0].src).toBe('/test.png');
    });

    it('should append frame to end of existing frames', () => {
      const frame1: Frame = {
        name: 'Frame 1',
        src: '/1.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
      };
      const frame2: Frame = {
        name: 'Frame 2',
        src: '/2.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
      };

      useFrameStore.getState().addFrame(frame1);
      useFrameStore.getState().addFrame(frame2);

      const frames = useFrameStore.getState().frames;
      expect(frames).toHaveLength(2);
      expect(frames[0].name).toBe('Frame 1');
      expect(frames[1].name).toBe('Frame 2');
    });
  });

  describe('removeFrame', () => {
    it('should remove frame at specified index', () => {
      const frame1: Frame = {
        name: 'Frame 1',
        src: '/1.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
      };
      const frame2: Frame = {
        name: 'Frame 2',
        src: '/2.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
      };

      useFrameStore.getState().addFrame(frame1);
      useFrameStore.getState().addFrame(frame2);
      useFrameStore.getState().removeFrame(0);

      const frames = useFrameStore.getState().frames;
      expect(frames).toHaveLength(1);
      expect(frames[0].name).toBe('Frame 2');
    });

    it('should adjust selectedFrameIndex when removing last frame', () => {
      useFrameStore.setState({ selectedFrameIndex: 2 });

      const frame1: Frame = {
        name: 'Frame 1',
        src: '/1.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
      };
      const frame2: Frame = {
        name: 'Frame 2',
        src: '/2.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
      };

      useFrameStore.getState().addFrame(frame1);
      useFrameStore.getState().addFrame(frame2);
      useFrameStore.getState().removeFrame(1);

      expect(useFrameStore.getState().selectedFrameIndex).toBe(0);
    });

    it('should handle removing only frame', () => {
      const frame1: Frame = {
        name: 'Frame 1',
        src: '/1.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
      };

      useFrameStore.getState().addFrame(frame1);
      useFrameStore.getState().removeFrame(0);

      const frames = useFrameStore.getState().frames;
      expect(frames).toHaveLength(0);
      expect(useFrameStore.getState().selectedFrameIndex).toBe(0);
    });
  });

  describe('updateFrame', () => {
    it('should update frame properties at specified index', () => {
      const frame: Frame = {
        name: 'Original Name',
        src: '/test.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
      };

      useFrameStore.getState().addFrame(frame);
      useFrameStore.getState().updateFrame(0, {
        name: 'Updated Name',
        opacity: 0.5,
      });

      const frames = useFrameStore.getState().frames;
      expect(frames[0].name).toBe('Updated Name');
      expect(frames[0].opacity).toBe(0.5);
      expect(frames[0].src).toBe('/test.png'); // Unchanged properties preserved
    });

    it('should not affect other frames', () => {
      const frame1: Frame = {
        name: 'Frame 1',
        src: '/1.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
      };
      const frame2: Frame = {
        name: 'Frame 2',
        src: '/2.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
      };

      useFrameStore.getState().addFrame(frame1);
      useFrameStore.getState().addFrame(frame2);
      useFrameStore.getState().updateFrame(0, { opacity: 0.7 });

      const frames = useFrameStore.getState().frames;
      expect(frames[0].opacity).toBe(0.7);
      expect(frames[1].opacity).toBe(1); // Unchanged
    });
  });

  describe('reorderFrames', () => {
    it('should move frame from oldIndex to newIndex', () => {
      const frame1: Frame = {
        name: 'Frame 1',
        src: '/1.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
      };
      const frame2: Frame = {
        name: 'Frame 2',
        src: '/2.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
      };
      const frame3: Frame = {
        name: 'Frame 3',
        src: '/3.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
      };

      useFrameStore.getState().addFrame(frame1);
      useFrameStore.getState().addFrame(frame2);
      useFrameStore.getState().addFrame(frame3);

      useFrameStore.getState().reorderFrames(0, 2); // Move Frame 1 to end

      const frames = useFrameStore.getState().frames;
      expect(frames[0].name).toBe('Frame 2');
      expect(frames[1].name).toBe('Frame 3');
      expect(frames[2].name).toBe('Frame 1');
    });

    it('should maintain array length', () => {
      const frame1: Frame = {
        name: 'Frame 1',
        src: '/1.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
      };
      const frame2: Frame = {
        name: 'Frame 2',
        src: '/2.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
      };

      useFrameStore.getState().addFrame(frame1);
      useFrameStore.getState().addFrame(frame2);
      useFrameStore.getState().reorderFrames(1, 0);

      expect(useFrameStore.getState().frames).toHaveLength(2);
    });
  });

  describe('setFrames', () => {
    it('should replace all frames', () => {
      const initialFrame: Frame = {
        name: 'Initial',
        src: '/initial.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
      };

      useFrameStore.getState().addFrame(initialFrame);

      const newFrames: Frame[] = [
        {
          name: 'New Frame 1',
          src: '/new1.png',
          image: null,
          masks: [],
          opacity: 1,
          visible: true,
        },
        {
          name: 'New Frame 2',
          src: '/new2.png',
          image: null,
          masks: [],
          opacity: 1,
          visible: true,
        },
      ];

      useFrameStore.getState().setFrames(newFrames);

      const frames = useFrameStore.getState().frames;
      expect(frames).toHaveLength(2);
      expect(frames[0].name).toBe('New Frame 1');
      expect(frames[1].name).toBe('New Frame 2');
    });
  });

  describe('toggleFrameVisibility', () => {
    it('should toggle visible property from true to false', () => {
      const frame: Frame = {
        name: 'Test Frame',
        src: '/test.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
      };

      useFrameStore.getState().addFrame(frame);
      useFrameStore.getState().toggleFrameVisibility(0);

      expect(useFrameStore.getState().frames[0].visible).toBe(false);
    });

    it('should toggle visible property from false to true', () => {
      const frame: Frame = {
        name: 'Test Frame',
        src: '/test.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: false,
      };

      useFrameStore.getState().addFrame(frame);
      useFrameStore.getState().toggleFrameVisibility(0);

      expect(useFrameStore.getState().frames[0].visible).toBe(true);
    });
  });

  describe('calculateRequiredMargins', () => {
    it('should return zero margins for frames within [0, 1]', () => {
      const frame: Frame = {
        name: 'Normal Frame',
        src: '/test.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
        bounds: { x: 0.1, y: 0.1, width: 0.8, height: 0.8 },
      };

      useFrameStore.getState().addFrame(frame);

      const margins = useFrameStore.getState().calculateRequiredMargins();
      expect(margins.marginX).toBe(0);
      expect(margins.marginY).toBe(0);
    });

    it('should calculate margins for frames extending left/top', () => {
      const frame: Frame = {
        name: 'Extended Frame',
        src: '/test.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
        bounds: { x: -0.15, y: -0.2, width: 0.8, height: 0.8 },
      };

      useFrameStore.getState().addFrame(frame);

      const margins = useFrameStore.getState().calculateRequiredMargins();
      expect(margins.marginX).toBe(0.15);
      expect(margins.marginY).toBe(0.2);
    });

    it('should calculate margins for frames extending right/bottom', () => {
      const frame: Frame = {
        name: 'Extended Frame',
        src: '/test.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
        bounds: { x: 0.5, y: 0.5, width: 0.7, height: 0.8 },
      };

      useFrameStore.getState().addFrame(frame);

      const margins = useFrameStore.getState().calculateRequiredMargins();
      expect(margins.marginX).toBeCloseTo(0.2, 10); // 0.5 + 0.7 - 1 = 0.2
      expect(margins.marginY).toBeCloseTo(0.3, 10); // 0.5 + 0.8 - 1 = 0.3
    });

    it('should calculate margins for mask bounds', () => {
      const frame: Frame = {
        name: 'Frame with Mask',
        src: '/test.png',
        image: null,
        opacity: 1,
        visible: true,
        bounds: { x: 0, y: 0, width: 1, height: 1 },
        masks: [
          {
            name: 'Extended Mask',
            src: '/mask.png',
            image: null,
            bounds: { x: -0.1, y: 0, width: 1.2, height: 1 },
          },
        ],
      };

      useFrameStore.getState().addFrame(frame);

      const margins = useFrameStore.getState().calculateRequiredMargins();
      expect(margins.marginX).toBeGreaterThan(0);
      expect(margins.marginX).toBeCloseTo(0.1, 10); // max(abs(-0.1), (-0.1 + 1.2 - 1)) = max(0.1, 0.1) = 0.1
    });

    it('should calculate maximum margins across multiple frames', () => {
      const frame1: Frame = {
        name: 'Frame 1',
        src: '/1.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
        bounds: { x: -0.1, y: 0, width: 1, height: 1 },
      };

      const frame2: Frame = {
        name: 'Frame 2',
        src: '/2.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
        bounds: { x: 0, y: -0.3, width: 1, height: 1 },
      };

      useFrameStore.getState().addFrame(frame1);
      useFrameStore.getState().addFrame(frame2);

      const margins = useFrameStore.getState().calculateRequiredMargins();
      expect(margins.marginX).toBe(0.1); // max from frame1
      expect(margins.marginY).toBe(0.3); // max from frame2
    });

    it('should handle frames without bounds', () => {
      const frame: Frame = {
        name: 'No Bounds Frame',
        src: '/test.png',
        image: null,
        masks: [],
        opacity: 1,
        visible: true,
      };

      useFrameStore.getState().addFrame(frame);

      const margins = useFrameStore.getState().calculateRequiredMargins();
      expect(margins.marginX).toBe(0);
      expect(margins.marginY).toBe(0);
    });
  });

  describe('setSelectedFrameIndex', () => {
    it('should update selectedFrameIndex', () => {
      useFrameStore.getState().setSelectedFrameIndex(5);
      expect(useFrameStore.getState().selectedFrameIndex).toBe(5);
    });
  });

  describe('setSelectedMaskIndex', () => {
    it('should update selectedMaskIndex', () => {
      useFrameStore.getState().setSelectedMaskIndex(3);
      expect(useFrameStore.getState().selectedMaskIndex).toBe(3);
    });
  });

  describe('Frame Editor', () => {
    it('should open frame editor', () => {
      useFrameStore.getState().openFrameEditor(2);

      expect(useFrameStore.getState().isFrameEditorOpen).toBe(true);
      expect(useFrameStore.getState().editingFrameIndex).toBe(2);
    });

    it('should close frame editor', () => {
      useFrameStore.getState().openFrameEditor(2);
      useFrameStore.getState().closeFrameEditor();

      expect(useFrameStore.getState().isFrameEditorOpen).toBe(false);
      expect(useFrameStore.getState().editingFrameIndex).toBeNull();
    });
  });

  describe('setLoadedPack', () => {
    it('should set loaded pack', () => {
      const mockPack = {
        id: 'test-pack',
        label: 'Test Pack',
        version: '1.0',
        artBounds: { x: 0, y: 0, width: 1, height: 1 },
        frames: [],
        text: {},
      };

      useFrameStore.getState().setLoadedPack(mockPack);

      expect(useFrameStore.getState().loadedPack).toEqual(mockPack);
    });

    it('should clear loaded pack with null', () => {
      const mockPack = {
        id: 'test-pack',
        label: 'Test Pack',
        version: '1.0',
        artBounds: { x: 0, y: 0, width: 1, height: 1 },
        frames: [],
        text: {},
      };

      useFrameStore.getState().setLoadedPack(mockPack);
      useFrameStore.getState().setLoadedPack(null);

      expect(useFrameStore.getState().loadedPack).toBeNull();
    });
  });

  describe('setAvailableFrames', () => {
    it('should set available frames', () => {
      const availableFrames = [
        {
          name: 'Frame A',
          src: '/a.png',
          thumbnail: '/a-thumb.png',
        },
        {
          name: 'Frame B',
          src: '/b.png',
          thumbnail: '/b-thumb.png',
        },
      ];

      useFrameStore.getState().setAvailableFrames(availableFrames);

      expect(useFrameStore.getState().availableFrames).toEqual(availableFrames);
    });
  });
});
