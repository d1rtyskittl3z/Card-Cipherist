/**
 * CardCanvasRenderer Component
 * Internal component that performs canvas rendering using CanvasContext
 * Must be wrapped by CanvasProvider
 */

import { useCallback, useEffect } from 'react';
import { useCardStore } from '../store/cardStore';
import { useImageLoader } from '../hooks/canvas/useImageLoader';
import { useLayerRenderers } from '../hooks/canvas/useLayerRenderers';
import { useSpecialLayers } from '../hooks/canvas/useSpecialLayers';
import { useTextAndDebugLayers } from '../hooks/canvas/useTextAndDebugLayers';
import { useCompositor } from '../hooks/canvas/useCompositor';
import { perfMonitor } from '../utils/performance';
import { useThrottledRender } from '../hooks/useThrottledRender';
import {
  useCardDimensions,
  useFrames,
  useLoadedPack,
  useShowGuidelines,
  useShowArtBoundsDebug,
} from '../store/selectors';

interface CardCanvasRendererProps {
  previewRef: React.RefObject<HTMLCanvasElement>;
}

/**
 * Canvas rendering logic component
 * Uses CanvasContext internally (no prop drilling!)
 */
export const CardCanvasRenderer = ({ previewRef }: CardCanvasRendererProps) => {
  // Get state from stores with fine-grained selectors
  const { width, height, marginX, marginY } = useCardDimensions();
  const frames = useFrames();
  const loadedPack = useLoadedPack();
  const showSerialNumbers = useCardStore((state) => state.showSerialNumbers);
  const customArtBounds = useCardStore((state) => state.customArtBounds);
  const showGuidelines = useShowGuidelines();
  const showArtBoundsDebug = useShowArtBoundsDebug();
  const card = useCardStore((state) => state.card);

  // Load core images
  const { blackImage, rightGradientMask, imagesLoaded } = useImageLoader();

  // Initialize layer renderers (use context internally - no prop drilling!)
  const { renderFrameLayer, renderArtLayer, renderSetSymbol, renderWatermark } = useLayerRenderers({
    blackImage,
    rightGradientMask,
  });

  // Initialize special card type layers (use context internally - no prop drilling!)
  const { renderSaga, renderClass, renderPlaneswalker, renderStation, renderSerial } = useSpecialLayers({
    showSerialNumbers,
  });

  // Initialize text and debug layers (use context internally - no prop drilling!)
  const { renderTextLayer, renderGuidelines, renderArtBoundsDebug: renderArtBounds, renderBottomInfo } =
    useTextAndDebugLayers({
      card,
      loadedPack,
      showGuidelines,
      showArtBoundsDebug,
      customArtBounds,
    });

  // Initialize compositor (use context internally - no prop drilling!)
  const { compositeAllLayers } = useCompositor({
    previewRef,
    renderArtLayer,
    renderSetSymbol,
  });

  /**
   * Main render function - orchestrates all layer rendering
   */
  const render = useCallback(async () => {
    // Wait for images to be ready
    if (!imagesLoaded) return;

    perfMonitor.startMetric('canvas:fullRender');

    // Render all layers in order
    perfMonitor.measure('canvas:renderFrameLayer', () => renderFrameLayer());
    await perfMonitor.measureAsync('canvas:renderSerial', () => renderSerial(card));
    await perfMonitor.measureAsync('canvas:renderStation', () => renderStation(card));
    perfMonitor.measure('canvas:renderWatermark', () => renderWatermark());
    await perfMonitor.measureAsync('canvas:renderSaga', () => renderSaga(card));
    await perfMonitor.measureAsync('canvas:renderClass', () => renderClass(card));
    await perfMonitor.measureAsync('canvas:renderPlaneswalker', () => renderPlaneswalker(card));
    await perfMonitor.measureAsync('canvas:renderTextLayer', () => renderTextLayer());
    await perfMonitor.measureAsync('canvas:renderBottomInfo', () => renderBottomInfo());
    perfMonitor.measure('canvas:renderGuidelines', () => renderGuidelines());
    perfMonitor.measure('canvas:renderArtBoundsDebug', () => renderArtBounds());

    // Composite all layers to preview canvas
    perfMonitor.measure('canvas:compositeAllLayers', () =>
      compositeAllLayers(card, showGuidelines, showArtBoundsDebug, loadedPack)
    );

    perfMonitor.endMetric('canvas:fullRender');
  }, [
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
    renderTextLayer,
    renderBottomInfo,
    renderGuidelines,
    renderArtBounds,
    compositeAllLayers,
  ]);

  /**
   * Trigger render when card state changes
   * Using RAF throttle for smooth 60fps performance
   */
  useThrottledRender(
    () => {
      if (imagesLoaded) {
        render();
      }
    },
    [render, imagesLoaded, width, height, marginX, marginY, frames.length],
    { fps: 60, immediate: false }
  );

  // Initial render
  useEffect(() => {
    render();
  }, [render]);

  return null; // This component doesn't render any DOM
};
