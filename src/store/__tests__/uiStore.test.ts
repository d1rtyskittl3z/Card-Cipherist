/**
 * UI Store Test Suite
 *
 * Tests all UI state management functionality including:
 * - Tab navigation
 * - Visual debugging flags (guidelines, transparencies, art bounds)
 * - Serial number display toggle
 * - Auto-fit art toggle
 * - Text field selection
 * - Special feature tab visibility
 * - Immer middleware integration
 */

import { useUIStore } from '../uiStore';
import type { CardBounds } from '../../types/card.types';

describe('uiStore', () => {
  beforeEach(() => {
    // Reset uiStore to initial state
    useUIStore.setState({
      currentTab: 'scryfall',
      showGuidelines: false,
      showTransparencies: false,
      showArtBoundsDebug: false,
      customArtBounds: null,
      showSerialNumbers: false,
      autoFitArt: false,
      selectedTextIndex: 0,
      hasShownSagaTab: false,
      hasShownPlaneswalkerTab: false,
      hasShownKamigawaTab: false,
      hasShownStationsTab: false,
    });
  });

  describe('Tab Management', () => {
    describe('setCurrentTab', () => {
      it('should set current tab to frame', () => {
        useUIStore.getState().setCurrentTab('frame');

        const { currentTab } = useUIStore.getState();
        expect(currentTab).toBe('frame');
      });

      it('should set current tab to text', () => {
        useUIStore.getState().setCurrentTab('text');

        const { currentTab } = useUIStore.getState();
        expect(currentTab).toBe('text');
      });

      it('should set current tab to art', () => {
        useUIStore.getState().setCurrentTab('art');

        const { currentTab } = useUIStore.getState();
        expect(currentTab).toBe('art');
      });

      it('should switch between tabs', () => {
        useUIStore.getState().setCurrentTab('frame');
        expect(useUIStore.getState().currentTab).toBe('frame');

        useUIStore.getState().setCurrentTab('text');
        expect(useUIStore.getState().currentTab).toBe('text');

        useUIStore.getState().setCurrentTab('scryfall');
        expect(useUIStore.getState().currentTab).toBe('scryfall');
      });

      it('should accept any string as tab name', () => {
        useUIStore.getState().setCurrentTab('custom-tab');

        const { currentTab } = useUIStore.getState();
        expect(currentTab).toBe('custom-tab');
      });
    });
  });

  describe('Visual Debugging Flags', () => {
    describe('setShowGuidelines', () => {
      it('should enable guidelines', () => {
        useUIStore.getState().setShowGuidelines(true);

        const { showGuidelines } = useUIStore.getState();
        expect(showGuidelines).toBe(true);
      });

      it('should disable guidelines', () => {
        useUIStore.getState().setShowGuidelines(true);
        useUIStore.getState().setShowGuidelines(false);

        const { showGuidelines } = useUIStore.getState();
        expect(showGuidelines).toBe(false);
      });

      it('should toggle guidelines multiple times', () => {
        useUIStore.getState().setShowGuidelines(true);
        expect(useUIStore.getState().showGuidelines).toBe(true);

        useUIStore.getState().setShowGuidelines(false);
        expect(useUIStore.getState().showGuidelines).toBe(false);

        useUIStore.getState().setShowGuidelines(true);
        expect(useUIStore.getState().showGuidelines).toBe(true);
      });
    });

    describe('setShowTransparencies', () => {
      it('should enable transparency pattern', () => {
        useUIStore.getState().setShowTransparencies(true);

        const { showTransparencies } = useUIStore.getState();
        expect(showTransparencies).toBe(true);
      });

      it('should disable transparency pattern', () => {
        useUIStore.getState().setShowTransparencies(true);
        useUIStore.getState().setShowTransparencies(false);

        const { showTransparencies } = useUIStore.getState();
        expect(showTransparencies).toBe(false);
      });
    });

    describe('setShowArtBoundsDebug', () => {
      it('should enable art bounds debug overlay', () => {
        useUIStore.getState().setShowArtBoundsDebug(true);

        const { showArtBoundsDebug } = useUIStore.getState();
        expect(showArtBoundsDebug).toBe(true);
      });

      it('should disable art bounds debug overlay', () => {
        useUIStore.getState().setShowArtBoundsDebug(true);
        useUIStore.getState().setShowArtBoundsDebug(false);

        const { showArtBoundsDebug } = useUIStore.getState();
        expect(showArtBoundsDebug).toBe(false);
      });
    });

    describe('setCustomArtBounds', () => {
      it('should set custom art bounds', () => {
        const customBounds: CardBounds = {
          x: 0.1,
          y: 0.2,
          width: 0.8,
          height: 0.6,
        };

        useUIStore.getState().setCustomArtBounds(customBounds);

        const { customArtBounds } = useUIStore.getState();
        expect(customArtBounds).toEqual(customBounds);
      });

      it('should clear custom art bounds with null', () => {
        const customBounds: CardBounds = {
          x: 0.1,
          y: 0.2,
          width: 0.8,
          height: 0.6,
        };

        useUIStore.getState().setCustomArtBounds(customBounds);
        useUIStore.getState().setCustomArtBounds(null);

        const { customArtBounds } = useUIStore.getState();
        expect(customArtBounds).toBeNull();
      });

      it('should replace existing custom art bounds', () => {
        const bounds1: CardBounds = {
          x: 0.1,
          y: 0.1,
          width: 0.5,
          height: 0.5,
        };
        const bounds2: CardBounds = {
          x: 0.2,
          y: 0.3,
          width: 0.7,
          height: 0.8,
        };

        useUIStore.getState().setCustomArtBounds(bounds1);
        useUIStore.getState().setCustomArtBounds(bounds2);

        const { customArtBounds } = useUIStore.getState();
        expect(customArtBounds).toEqual(bounds2);
      });
    });

    it('should allow multiple debugging flags to be enabled simultaneously', () => {
      useUIStore.getState().setShowGuidelines(true);
      useUIStore.getState().setShowTransparencies(true);
      useUIStore.getState().setShowArtBoundsDebug(true);

      const state = useUIStore.getState();
      expect(state.showGuidelines).toBe(true);
      expect(state.showTransparencies).toBe(true);
      expect(state.showArtBoundsDebug).toBe(true);
    });
  });

  describe('Serial Number Toggle', () => {
    describe('setShowSerialNumbers', () => {
      it('should enable serial number display', () => {
        useUIStore.getState().setShowSerialNumbers(true);

        const { showSerialNumbers } = useUIStore.getState();
        expect(showSerialNumbers).toBe(true);
      });

      it('should disable serial number display', () => {
        useUIStore.getState().setShowSerialNumbers(true);
        useUIStore.getState().setShowSerialNumbers(false);

        const { showSerialNumbers } = useUIStore.getState();
        expect(showSerialNumbers).toBe(false);
      });
    });
  });

  describe('Auto-Fit Art Toggle', () => {
    describe('setAutoFitArt', () => {
      it('should enable auto-fit art', () => {
        useUIStore.getState().setAutoFitArt(true);

        const { autoFitArt } = useUIStore.getState();
        expect(autoFitArt).toBe(true);
      });

      it('should disable auto-fit art', () => {
        useUIStore.getState().setAutoFitArt(true);
        useUIStore.getState().setAutoFitArt(false);

        const { autoFitArt } = useUIStore.getState();
        expect(autoFitArt).toBe(false);
      });
    });
  });

  describe('Text Field Selection', () => {
    describe('setSelectedTextIndex', () => {
      it('should set selected text index to 0', () => {
        useUIStore.getState().setSelectedTextIndex(0);

        const { selectedTextIndex } = useUIStore.getState();
        expect(selectedTextIndex).toBe(0);
      });

      it('should set selected text index to 5', () => {
        useUIStore.getState().setSelectedTextIndex(5);

        const { selectedTextIndex } = useUIStore.getState();
        expect(selectedTextIndex).toBe(5);
      });

      it('should change text index', () => {
        useUIStore.getState().setSelectedTextIndex(2);
        expect(useUIStore.getState().selectedTextIndex).toBe(2);

        useUIStore.getState().setSelectedTextIndex(7);
        expect(useUIStore.getState().selectedTextIndex).toBe(7);
      });

      it('should accept negative indices', () => {
        useUIStore.getState().setSelectedTextIndex(-1);

        const { selectedTextIndex } = useUIStore.getState();
        expect(selectedTextIndex).toBe(-1);
      });
    });
  });

  describe('Special Feature Tab Visibility', () => {
    describe('setHasShownSagaTab', () => {
      it('should mark Saga tab as shown', () => {
        useUIStore.getState().setHasShownSagaTab(true);

        const { hasShownSagaTab } = useUIStore.getState();
        expect(hasShownSagaTab).toBe(true);
      });

      it('should mark Saga tab as not shown', () => {
        useUIStore.getState().setHasShownSagaTab(true);
        useUIStore.getState().setHasShownSagaTab(false);

        const { hasShownSagaTab } = useUIStore.getState();
        expect(hasShownSagaTab).toBe(false);
      });
    });

    describe('setHasShownPlaneswalkerTab', () => {
      it('should mark Planeswalker tab as shown', () => {
        useUIStore.getState().setHasShownPlaneswalkerTab(true);

        const { hasShownPlaneswalkerTab } = useUIStore.getState();
        expect(hasShownPlaneswalkerTab).toBe(true);
      });

      it('should mark Planeswalker tab as not shown', () => {
        useUIStore.getState().setHasShownPlaneswalkerTab(true);
        useUIStore.getState().setHasShownPlaneswalkerTab(false);

        const { hasShownPlaneswalkerTab } = useUIStore.getState();
        expect(hasShownPlaneswalkerTab).toBe(false);
      });
    });

    describe('setHasShownKamigawaTab', () => {
      it('should mark Kamigawa tab as shown', () => {
        useUIStore.getState().setHasShownKamigawaTab(true);

        const { hasShownKamigawaTab } = useUIStore.getState();
        expect(hasShownKamigawaTab).toBe(true);
      });

      it('should mark Kamigawa tab as not shown', () => {
        useUIStore.getState().setHasShownKamigawaTab(true);
        useUIStore.getState().setHasShownKamigawaTab(false);

        const { hasShownKamigawaTab } = useUIStore.getState();
        expect(hasShownKamigawaTab).toBe(false);
      });
    });

    describe('setHasShownStationsTab', () => {
      it('should mark Stations tab as shown', () => {
        useUIStore.getState().setHasShownStationsTab(true);

        const { hasShownStationsTab } = useUIStore.getState();
        expect(hasShownStationsTab).toBe(true);
      });

      it('should mark Stations tab as not shown', () => {
        useUIStore.getState().setHasShownStationsTab(true);
        useUIStore.getState().setHasShownStationsTab(false);

        const { hasShownStationsTab } = useUIStore.getState();
        expect(hasShownStationsTab).toBe(false);
      });
    });

    it('should allow multiple special tabs to be shown simultaneously', () => {
      useUIStore.getState().setHasShownSagaTab(true);
      useUIStore.getState().setHasShownPlaneswalkerTab(true);
      useUIStore.getState().setHasShownKamigawaTab(true);
      useUIStore.getState().setHasShownStationsTab(true);

      const state = useUIStore.getState();
      expect(state.hasShownSagaTab).toBe(true);
      expect(state.hasShownPlaneswalkerTab).toBe(true);
      expect(state.hasShownKamigawaTab).toBe(true);
      expect(state.hasShownStationsTab).toBe(true);
    });
  });

  describe('Immer Middleware Integration', () => {
    it('should allow direct mutation syntax via Immer', () => {
      const initialTab = useUIStore.getState().currentTab;
      useUIStore.getState().setCurrentTab('frame');
      const updatedTab = useUIStore.getState().currentTab;

      expect(initialTab).toBe('scryfall');
      expect(updatedTab).toBe('frame');
    });

    it('should maintain immutability outside store actions', () => {
      const state1 = useUIStore.getState();
      useUIStore.getState().setCurrentTab('art');
      const state2 = useUIStore.getState();

      // References should be different (immutability)
      expect(state1).not.toBe(state2);
      expect(state1.currentTab).toBe('scryfall');
      expect(state2.currentTab).toBe('art');
    });
  });

  describe('State Independence', () => {
    it('should not affect other properties when updating tab', () => {
      useUIStore.getState().setShowGuidelines(true);
      useUIStore.getState().setAutoFitArt(true);
      useUIStore.getState().setSelectedTextIndex(5);

      useUIStore.getState().setCurrentTab('frame');

      const state = useUIStore.getState();
      expect(state.currentTab).toBe('frame');
      expect(state.showGuidelines).toBe(true); // Unchanged
      expect(state.autoFitArt).toBe(true); // Unchanged
      expect(state.selectedTextIndex).toBe(5); // Unchanged
    });

    it('should not affect other properties when toggling flags', () => {
      useUIStore.getState().setCurrentTab('text');
      useUIStore.getState().setSelectedTextIndex(3);

      useUIStore.getState().setShowGuidelines(true);
      useUIStore.getState().setShowTransparencies(true);

      const state = useUIStore.getState();
      expect(state.showGuidelines).toBe(true);
      expect(state.showTransparencies).toBe(true);
      expect(state.currentTab).toBe('text'); // Unchanged
      expect(state.selectedTextIndex).toBe(3); // Unchanged
    });
  });

  describe('Initial State', () => {
    it('should have correct default values', () => {
      const state = useUIStore.getState();

      expect(state.currentTab).toBe('scryfall');
      expect(state.showGuidelines).toBe(false);
      expect(state.showTransparencies).toBe(false);
      expect(state.showArtBoundsDebug).toBe(false);
      expect(state.customArtBounds).toBeNull();
      expect(state.showSerialNumbers).toBe(false);
      expect(state.autoFitArt).toBe(false);
      expect(state.selectedTextIndex).toBe(0);
      expect(state.hasShownSagaTab).toBe(false);
      expect(state.hasShownPlaneswalkerTab).toBe(false);
      expect(state.hasShownKamigawaTab).toBe(false);
      expect(state.hasShownStationsTab).toBe(false);
    });
  });
});
