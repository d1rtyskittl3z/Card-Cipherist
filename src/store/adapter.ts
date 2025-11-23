/**
 * Store Adapter - Backward Compatibility Layer
 * Provides the old cardStore API using the new split stores
 * This allows gradual migration of components
 */

import { useMemo } from 'react';
import { useFrameStore } from './frameStore';
import { useUIStore } from './uiStore';
import { useMediaStore } from './mediaStore';
import { useCardStore } from './cardStore';
import type { Frame } from '../types/card.types';

/**
 * Adapter hook that provides the old combined store API
 * Components can use this during migration period
 */
export const useCardStoreAdapter = () => {
  // Subscribe to all stores
  const cardState = useCardStore();
  const frameState = useFrameStore();
  const uiState = useUIStore();
  const mediaState = useMediaStore();

  // Combine state for components that expect the old structure
  const combinedState = useMemo(
    () => ({
      // Card data (from cardStore)
      card: {
        ...cardState.card,
        // Override with frame data from frameStore
        frames: frameState.frames,
        // Override with media data from mediaStore
        artSource: mediaState.artSource,
        artX: mediaState.artX,
        artY: mediaState.artY,
        artZoom: mediaState.artZoom,
        artRotate: mediaState.artRotate,
        setSymbolSource: mediaState.setSymbolSource,
        setSymbolX: mediaState.setSymbolX,
        setSymbolY: mediaState.setSymbolY,
        setSymbolZoom: mediaState.setSymbolZoom,
        setSymbolRotate: mediaState.setSymbolRotate,
        watermarkSource: mediaState.watermarkSource,
        watermarkX: mediaState.watermarkX,
        watermarkY: mediaState.watermarkY,
        watermarkZoom: mediaState.watermarkZoom,
        watermarkLeft: mediaState.watermarkLeft,
        watermarkRight: mediaState.watermarkRight,
        watermarkOpacity: mediaState.watermarkOpacity,
        // Margins calculated from frames (derived state)
        marginX: frameState.margins.marginX,
        marginY: frameState.margins.marginY,
      },

      // Frame state (from frameStore)
      selectedFrameIndex: frameState.selectedFrameIndex,
      selectedMaskIndex: frameState.selectedMaskIndex,
      availableFrames: frameState.availableFrames,
      loadedPack: frameState.loadedPack,
      isFrameEditorOpen: frameState.isFrameEditorOpen,
      editingFrameIndex: frameState.editingFrameIndex,

      // UI state (from uiStore)
      currentTab: uiState.currentTab,
      showGuidelines: uiState.showGuidelines,
      showTransparencies: uiState.showTransparencies,
      showSerialNumbers: uiState.showSerialNumbers,
      showArtBoundsDebug: uiState.showArtBoundsDebug,
      customArtBounds: uiState.customArtBounds,
      autoFitArt: uiState.autoFitArt,
      selectedTextIndex: uiState.selectedTextIndex,
      hasShownSagaTab: uiState.hasShownSagaTab,
      hasShownPlaneswalkerTab: uiState.hasShownPlaneswalkerTab,
      hasShownKamigawaTab: uiState.hasShownKamigawaTab,
      hasShownStationsTab: uiState.hasShownStationsTab,

      // Media state (from mediaStore)
      setCode: mediaState.setCode,
      rarity: mediaState.rarity,
      artImage: mediaState.artImage,
      setSymbolImage: mediaState.setSymbolImage,
      watermarkImage: mediaState.watermarkImage,
      manaSymbolImages: mediaState.manaSymbolImages,

      // Collector info (from cardStore)
      collectorSetCode: cardState.collectorSetCode,
      collectorLanguage: cardState.collectorLanguage,
      collectorArtist: cardState.collectorArtist,
      collectorRarity: cardState.collectorRarity,
      collectorDigits: cardState.collectorDigits,

      // Special features (from cardStore)
      neoBasicsTitleHeight: cardState.neoBasicsTitleHeight,
      neoBasicsElements: cardState.neoBasicsElements,
      neoBasicsColorOverrides: cardState.neoBasicsColorOverrides,

      // Canvas ref (from cardStore)
      previewCanvasRef: cardState.previewCanvasRef,
    }),
    [cardState, frameState, uiState, mediaState]
  );

  // Provide actions with delegation to appropriate stores
  const actions = useMemo(
    () => ({
      // Card actions
      updateCard: cardState.updateCard,
      resetCard: cardState.resetCard,

      // Frame actions
      addFrame: (frame: Frame) => {
        frameState.addFrame(frame);
        // Update margins in cardStore (using derived state)
        const margins = frameState.margins;
        cardState.updateCard(margins);
      },
      removeFrame: (index: number) => {
        frameState.removeFrame(index);
        // Update margins in cardStore (using derived state)
        const margins = frameState.margins;
        cardState.updateCard(margins);
      },
      updateFrame: frameState.updateFrame,
      reorderFrames: frameState.reorderFrames,
      setSelectedFrameIndex: frameState.setSelectedFrameIndex,
      toggleFrameVisibility: frameState.toggleFrameVisibility,
      setAvailableFrames: frameState.setAvailableFrames,
      setLoadedPack: frameState.setLoadedPack,
      openFrameEditor: frameState.openFrameEditor,
      closeFrameEditor: frameState.closeFrameEditor,

      // Text actions
      updateText: cardState.updateText,
      setText: cardState.setText,
      setSelectedTextIndex: uiState.setSelectedTextIndex,

      // Art actions
      updateArt: (updates: Parameters<typeof mediaState.updateArt>[0]) => {
        mediaState.updateArt(updates);
        // Sync with cardStore if needed
        cardState.updateCard({
          artSource: updates.artSource,
          artX: updates.artX,
          artY: updates.artY,
          artZoom: updates.artZoom,
          artRotate: updates.artRotate,
        });
      },
      setArtImage: mediaState.setArtImage,

      // Set symbol actions
      updateSetSymbol: (updates: Parameters<typeof mediaState.updateSetSymbol>[0]) => {
        mediaState.updateSetSymbol(updates);
        cardState.updateCard({
          setSymbolSource: updates.setSymbolSource,
          setSymbolX: updates.setSymbolX,
          setSymbolY: updates.setSymbolY,
          setSymbolZoom: updates.setSymbolZoom,
          setSymbolRotate: updates.setSymbolRotate,
        });
      },
      setSetSymbolImage: mediaState.setSetSymbolImage,
      setSetCode: mediaState.setSetCode,
      setRarity: mediaState.setRarity,

      // Watermark actions
      updateWatermark: (updates: Parameters<typeof mediaState.updateWatermark>[0]) => {
        mediaState.updateWatermark(updates);
        cardState.updateCard({
          watermarkSource: updates.watermarkSource,
          watermarkX: updates.watermarkX,
          watermarkY: updates.watermarkY,
          watermarkZoom: updates.watermarkZoom,
          watermarkLeft: updates.watermarkLeft,
          watermarkRight: updates.watermarkRight,
          watermarkOpacity: updates.watermarkOpacity,
        });
      },
      setWatermarkImage: mediaState.setWatermarkImage,

      // Mana symbol actions
      setManaSymbolImages: mediaState.setManaSymbolImages,

      // UI actions
      setCurrentTab: uiState.setCurrentTab,
      setShowGuidelines: uiState.setShowGuidelines,
      setShowTransparencies: uiState.setShowTransparencies,
      setShowSerialNumbers: uiState.setShowSerialNumbers,
      setShowArtBoundsDebug: uiState.setShowArtBoundsDebug,
      setCustomArtBounds: uiState.setCustomArtBounds,
      setAutoFitArt: uiState.setAutoFitArt,
      setHasShownSagaTab: uiState.setHasShownSagaTab,
      setHasShownPlaneswalkerTab: uiState.setHasShownPlaneswalkerTab,
      setHasShownKamigawaTab: uiState.setHasShownKamigawaTab,
      setHasShownStationsTab: uiState.setHasShownStationsTab,

      // Collector info actions
      setCollectorSetCode: cardState.setCollectorSetCode,
      setCollectorLanguage: cardState.setCollectorLanguage,
      setCollectorArtist: cardState.setCollectorArtist,
      setCollectorRarity: cardState.setCollectorRarity,
      setCollectorDigits: cardState.setCollectorDigits,

      // Special feature actions
      initializeNeoBasicsControls: cardState.initializeNeoBasicsControls,
      setNeoBasicsTitleHeight: cardState.setNeoBasicsTitleHeight,
      setNeoBasicsColorOverride: cardState.setNeoBasicsColorOverride,
      resetNeoBasicsColors: cardState.resetNeoBasicsColors,
      applyNeoBasicsAdjustments: cardState.applyNeoBasicsAdjustments,
      setSagaInfo: cardState.setSagaInfo,
      resetSagaInfo: cardState.resetSagaInfo,
      setPlaneswalkerInfo: cardState.setPlaneswalkerInfo,
      resetPlaneswalkerInfo: cardState.resetPlaneswalkerInfo,
      initializeStation: cardState.initializeStation,
      updateStationState: cardState.updateStationState,
      resetStationSettings: cardState.resetStationSettings,

      // Canvas actions
      setPreviewCanvasRef: cardState.setPreviewCanvasRef,
    }),
    [cardState, frameState, uiState, mediaState]
  );

  return {
    ...combinedState,
    ...actions,
  };
};

/**
 * Selector hook for fine-grained subscriptions
 * Usage: const artX = useCardStoreSelector(state => state.card.artX)
 */
export const useCardStoreSelector = <T,>(selector: (state: ReturnType<typeof useCardStoreAdapter>) => T): T => {
  const state = useCardStoreAdapter();
  return selector(state);
};
