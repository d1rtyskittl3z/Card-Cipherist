/**
 * Custom Hook: Canvas Rendering
 * Orchestrates the card rendering pipeline using focused sub-hooks
 */

import { useRef, useCallback } from 'react';
import { useCardStore } from '../store/cardStore';
import { useMediaStore } from '../store/mediaStore';
import { useCanvasManager } from './canvas/useCanvasManager';
import { useImageLoader } from './canvas/useImageLoader';
import { useLayerRenderers } from './canvas/useLayerRenderers';
import { useSpecialLayers } from './canvas/useSpecialLayers';
import { useTextAndDebugLayers } from './canvas/useTextAndDebugLayers';
import { useCompositor } from './canvas/useCompositor';
import { perfMonitor } from '../utils/performance';
import { useThrottledRender } from './useThrottledRender';
import {
  useCardDimensions,
  useFrames,
  useLoadedPack,
  useShowGuidelines,
  useShowArtBoundsDebug,
  useQRCodeUrl,
} from '../store/selectors';

export const useCanvasRender = () => {
  // Get state from stores with fine-grained selectors
  // Only subscribe to the specific properties we need for rendering
  const { width, height, marginX, marginY } = useCardDimensions();
  const frames = useFrames();
  const loadedPack = useLoadedPack();
  const showSerialNumbers = useCardStore((state) => state.showSerialNumbers);
  const customArtBounds = useCardStore((state) => state.customArtBounds);
  const showGuidelines = useShowGuidelines();
  const showArtBoundsDebug = useShowArtBoundsDebug();
  const qrCodeUrl = useQRCodeUrl();
  const qrCodeSourceCanvas = useMediaStore((state) => state.qrCodeSourceCanvas);
  
  // We still need the full card object for some render functions
  // This is acceptable since the render functions need comprehensive card data
  const card = useCardStore((state) => state.card);

  // Preview canvas ref
  const previewRef = useRef<HTMLCanvasElement>(null);

  // Initialize canvas manager
  const { canvasRefs, contextRefs, canvasesReady } = useCanvasManager();

  // Load core images
  const { blackImage, rightGradientMask, imagesLoaded } = useImageLoader();

  // Initialize layer renderers
  const { renderFrameLayer, renderArtLayer, renderSetSymbol, renderWatermark } = useLayerRenderers({
    blackImage,
    rightGradientMask,
  });

  // Initialize special card type layers
  const { renderSaga, renderClass, renderPlaneswalker, renderStation, renderSerial, renderQRCode } = useSpecialLayers({
    showSerialNumbers,
  });

  // Initialize text and debug layers
  const { renderTextLayer, renderGuidelines, renderArtBoundsDebug, renderBottomInfo } =
    useTextAndDebugLayers({
      card,
      loadedPack,
      showGuidelines,
      showArtBoundsDebug,
      customArtBounds,
    });

  // Initialize compositor
  const { compositeAllLayers } = useCompositor({
    previewRef,
    renderArtLayer,
    renderSetSymbol,
  });
  /**
   * Main render function - orchestrates all layer rendering
   */
  const render = useCallback(async () => {
    // Wait for canvases and images to be ready
    if (!canvasesReady || !imagesLoaded) return;

    perfMonitor.startMetric('canvas:fullRender');

    // Render all layers in order
    perfMonitor.measure('canvas:renderFrameLayer', () => renderFrameLayer());
    await perfMonitor.measureAsync('canvas:renderSerial', () => renderSerial(card));
    await perfMonitor.measureAsync('canvas:renderStation', () => renderStation(card));
    perfMonitor.measure('canvas:renderWatermark', () => renderWatermark());
    perfMonitor.measure('canvas:renderQRCode', () => renderQRCode(card, qrCodeSourceCanvas, loadedPack?.qrCode));
    await perfMonitor.measureAsync('canvas:renderSaga', () => renderSaga(card));
    await perfMonitor.measureAsync('canvas:renderClass', () => renderClass(card));
    await perfMonitor.measureAsync('canvas:renderPlaneswalker', () => renderPlaneswalker(card));
    await perfMonitor.measureAsync('canvas:renderTextLayer', () => renderTextLayer());
    await perfMonitor.measureAsync('canvas:renderBottomInfo', () => renderBottomInfo());
    perfMonitor.measure('canvas:renderGuidelines', () => renderGuidelines());
    perfMonitor.measure('canvas:renderArtBoundsDebug', () => renderArtBoundsDebug());

    // Composite all layers to preview canvas
    perfMonitor.measure('canvas:compositeAllLayers', () =>
      compositeAllLayers(card, showGuidelines, showArtBoundsDebug, loadedPack)
    );

    perfMonitor.endMetric('canvas:fullRender');
  }, [
    canvasesReady,
    imagesLoaded,
    card,
    showGuidelines,
    showArtBoundsDebug,
    loadedPack,
    renderFrameLayer,
    renderSerial,
    renderStation,
    renderWatermark,
    renderSaga,
    renderClass,
    renderPlaneswalker,
    renderQRCode,
    qrCodeSourceCanvas,
    renderTextLayer,
    renderBottomInfo,
    renderGuidelines,
    renderArtBoundsDebug,
    compositeAllLayers,
  ]);

  /**
   * Trigger render when card state changes
   * Using RAF throttle for smooth 60fps performance (was 100ms debounce = ~10fps)
   */
  useThrottledRender(
    () => {
      if (canvasesReady && imagesLoaded) {
        render();
      }
    },
    [render, canvasesReady, imagesLoaded, width, height, marginX, marginY, frames.length, card.version, card.class, card.saga, card.planeswalker, card.station, qrCodeUrl, qrCodeSourceCanvas],
    { fps: 60, immediate: false }
  );

  return {
    previewRef,
    canvasRefs,
    contextRefs,
    render,
  };
};
