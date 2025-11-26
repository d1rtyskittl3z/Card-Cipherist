/**
 * Layer Renderers Hook
 * Provides functions for rendering individual canvas layers
 */

import { useCallback } from 'react';
import { useCardStore } from '../../store/cardStore';
import { useMediaStore } from '../../store/mediaStore';
import { useCanvasContext } from '../../contexts/useCanvasContext';
import { drawFrameLayers } from '../../utils/canvasHelpers';
import type { Card } from '../../types/card.types';
import type { FramePackTemplate } from '../../components/frames/packs/types';

interface UseLayerRenderersProps {
  blackImage: HTMLImageElement | null;
  rightGradientMask: HTMLImageElement | null;
}

export const useLayerRenderers = ({
  blackImage,
  rightGradientMask,
}: UseLayerRenderersProps) => {
  // Get canvas references from context
  const { canvasRefs, contextRefs, canvasesReady } = useCanvasContext();
  // Get media state with fine-grained selectors
  // Art state (first art)
  const artImage = useMediaStore((state) => state.artImage);
  const artX = useMediaStore((state) => state.artX);
  const artY = useMediaStore((state) => state.artY);
  const artZoom = useMediaStore((state) => state.artZoom);
  const artRotate = useMediaStore((state) => state.artRotate);
  const artGrayscale = useMediaStore((state) => state.artGrayscale);

  // Second art state
  const artImage2 = useMediaStore((state) => state.artImage2);
  const artX2 = useMediaStore((state) => state.artX2);
  const artY2 = useMediaStore((state) => state.artY2);
  const artZoom2 = useMediaStore((state) => state.artZoom2);
  const artRotate2 = useMediaStore((state) => state.artRotate2);
  const artGrayscale2 = useMediaStore((state) => state.artGrayscale2);

  // Set symbol state
  const setSymbolImage = useMediaStore((state) => state.setSymbolImage);
  const setSymbolSource = useMediaStore((state) => state.setSymbolSource);
  const setSymbolX = useMediaStore((state) => state.setSymbolX);
  const setSymbolY = useMediaStore((state) => state.setSymbolY);
  const setSymbolZoom = useMediaStore((state) => state.setSymbolZoom);
  const setSymbolRotate = useMediaStore((state) => state.setSymbolRotate);

  // Watermark state
  const watermarkImage = useMediaStore((state) => state.watermarkImage);
  const watermarkX = useMediaStore((state) => state.watermarkX);
  const watermarkY = useMediaStore((state) => state.watermarkY);
  const watermarkZoom = useMediaStore((state) => state.watermarkZoom);
  const watermarkLeft = useMediaStore((state) => state.watermarkLeft);
  const watermarkRight = useMediaStore((state) => state.watermarkRight);
  const watermarkOpacity = useMediaStore((state) => state.watermarkOpacity);

  /**
   * Render frames layer
   */
  const renderFrameLayer = useCallback(() => {
    if (!canvasesReady) return;

    const frameContext = contextRefs.frame;
    const frameMaskingCanvas = canvasRefs.frameMasking;
    const frameMaskingContext = contextRefs.frameMasking;
    const frameCompositingCanvas = canvasRefs.frameCompositing;
    const frameCompositingContext = contextRefs.frameCompositing;

    if (
      !frameContext ||
      !frameMaskingCanvas ||
      !frameMaskingContext ||
      !frameCompositingCanvas ||
      !frameCompositingContext ||
      !blackImage
    ) {
      return;
    }

    const currentCard = useCardStore.getState().card;

    drawFrameLayers(
      frameContext,
      frameMaskingCanvas,
      frameMaskingContext,
      frameCompositingCanvas,
      frameCompositingContext,
      currentCard.frames,
      currentCard,
      blackImage
    );
  }, [canvasesReady, canvasRefs, contextRefs, blackImage]);

  /**
   * Render art layer with transforms
   * Renders both art1 and art2 if available
   */
  const renderArtLayer = useCallback(() => {
    const artCanvas = canvasRefs.card;
    if (!artCanvas) return;

    const ctx = artCanvas.getContext('2d');
    if (!ctx) return;

    // Render first art image if available
    if (artImage) {
      ctx.save();

      // Apply grayscale filter if enabled
      if (artGrayscale) {
        ctx.filter = 'grayscale(100%)';
      }

      // Apply transformations (read from mediaStore)
      const centerX = artCanvas.width / 2 + artX;
      const centerY = artCanvas.height / 2 + artY;

      ctx.translate(centerX, centerY);
      ctx.rotate((artRotate * Math.PI) / 180);
      ctx.scale(artZoom, artZoom);

      const width = artImage.width;
      const height = artImage.height;

      ctx.drawImage(artImage, -width / 2, -height / 2, width, height);
      ctx.restore();
    }

    // Render second art image if available (for Split/Fuse/Aftermath cards)
    if (artImage2) {
      ctx.save();

      // Apply grayscale filter if enabled
      if (artGrayscale2) {
        ctx.filter = 'grayscale(100%)';
      }

      // Apply transformations (read from mediaStore)
      const centerX2 = artCanvas.width / 2 + artX2;
      const centerY2 = artCanvas.height / 2 + artY2;

      ctx.translate(centerX2, centerY2);
      ctx.rotate((artRotate2 * Math.PI) / 180);
      ctx.scale(artZoom2, artZoom2);

      const width2 = artImage2.width;
      const height2 = artImage2.height;

      ctx.drawImage(artImage2, -width2 / 2, -height2 / 2, width2, height2);
      ctx.restore();
    }
  }, [canvasRefs, artImage, artX, artY, artZoom, artRotate, artGrayscale, artImage2, artX2, artY2, artZoom2, artRotate2, artGrayscale2]);

  /**
   * Render set symbol layer
   */
  const renderSetSymbol = useCallback((card: Card, loadedPack: FramePackTemplate | null) => {
    const canvas = canvasRefs.card;
    if (!canvas || !setSymbolImage || setSymbolSource === '/img/blank.png') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let x: number;
    let y: number;
    let symbolWidth: number;
    let symbolHeight: number;

    if (loadedPack?.setSymbolBounds) {
      const bounds = loadedPack.setSymbolBounds;

      // Calculate symbol dimensions from bounds (relative to card)
      const boundWidth = bounds.width * card.width;
      const boundHeight = bounds.height * card.height;

      // Scale symbol to fit within bounds while maintaining aspect ratio
      const symbolAspect = setSymbolImage.width / setSymbolImage.height;
      const boundAspect = boundWidth / boundHeight;

      if (symbolAspect > boundAspect) {
        // Symbol is wider - fit to width
        symbolWidth = boundWidth * setSymbolZoom;
        symbolHeight = (boundWidth / symbolAspect) * setSymbolZoom;
      } else {
        // Symbol is taller - fit to height
        symbolHeight = boundHeight * setSymbolZoom;
        symbolWidth = (boundHeight * symbolAspect) * setSymbolZoom;
      }

      // Calculate base position from bounds (relative to card dimensions)
      const baseX = (bounds.x + card.marginX) * card.width;
      const baseY = (bounds.y + card.marginY) * card.height;

      // Apply manual offsets (read from mediaStore)
      x = baseX + setSymbolX;
      y = baseY + setSymbolY;

      // Apply alignment
      if (bounds.horizontal === 'center') {
        x -= symbolWidth / 2;
      } else if (bounds.horizontal === 'right') {
        x -= symbolWidth;
      }

      if (bounds.vertical === 'center') {
        y -= symbolHeight / 2;
      } else if (bounds.vertical === 'bottom') {
        y -= symbolHeight;
      }
    } else {
      // Fallback: use manual positioning if no bounds available
      symbolWidth = setSymbolImage.width * setSymbolZoom;
      symbolHeight = setSymbolImage.height * setSymbolZoom;
      x = canvas.width / 2 + setSymbolX;
      y = canvas.height / 2 + setSymbolY;
      x -= symbolWidth / 2;
      y -= symbolHeight / 2;
    }

    const centerX = x + symbolWidth / 2;
    const centerY = y + symbolHeight / 2;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((setSymbolRotate * Math.PI) / 180);
    ctx.drawImage(setSymbolImage, -symbolWidth / 2, -symbolHeight / 2, symbolWidth, symbolHeight);
    ctx.restore();
  }, [
    canvasRefs,
    setSymbolImage,
    setSymbolSource,
    setSymbolX,
    setSymbolY,
    setSymbolZoom,
    setSymbolRotate,
  ]);

  /**
   * Render watermark layer with two-tone gradient support
   */
  const renderWatermark = useCallback(() => {
    const watermarkCanvas = canvasRefs.watermark;
    const watermarkContext = contextRefs.watermark;
    if (!watermarkCanvas || !watermarkContext) return;

    // Reset compositing and alpha
    watermarkContext.globalCompositeOperation = 'source-over';
    watermarkContext.globalAlpha = 1;

    // Always clear the watermark canvas
    watermarkContext.clearRect(0, 0, watermarkCanvas.width, watermarkCanvas.height);

    // Only draw if we have a watermark image and left color is not 'none' (read from mediaStore)
    if (!watermarkImage || watermarkLeft === 'none' || watermarkZoom === 0) return;

    const x = watermarkCanvas.width / 2 + watermarkX;
    const y = watermarkCanvas.height / 2 + watermarkY;
    const width = watermarkImage.width * watermarkZoom;
    const height = watermarkImage.height * watermarkZoom;

    // Draw right half with gradient if specified (read from mediaStore)
    if (watermarkRight !== 'none' && rightGradientMask) {
      // Draw the gradient mask image (transparent left to opaque right)
      watermarkContext.drawImage(
        rightGradientMask,
        0,
        0,
        watermarkCanvas.width,
        watermarkCanvas.height
      );

      // Use source-in to clip the next drawing to the gradient mask shape
      watermarkContext.globalCompositeOperation = 'source-in';

      if (watermarkRight === 'default') {
        // Use actual watermark image for right side
        watermarkContext.drawImage(watermarkImage, x - width / 2, y - height / 2, width, height);
      } else {
        // Fill with solid color for right side
        watermarkContext.fillStyle = watermarkRight;
        watermarkContext.fillRect(0, 0, watermarkCanvas.width, watermarkCanvas.height);
      }

      // Draw left side behind the right gradient
      watermarkContext.globalCompositeOperation = 'destination-over';
    }

    // Draw left side (main watermark) (read from mediaStore)
    if (watermarkLeft === 'default') {
      // Use actual watermark image
      watermarkContext.drawImage(watermarkImage, x - width / 2, y - height / 2, width, height);
    } else {
      // Fill with solid color
      watermarkContext.fillStyle = watermarkLeft;
      watermarkContext.fillRect(0, 0, watermarkCanvas.width, watermarkCanvas.height);
    }

    // Mask to watermark shape using destination-in
    watermarkContext.globalCompositeOperation = 'destination-in';
    watermarkContext.drawImage(watermarkImage, x - width / 2, y - height / 2, width, height);

    // Apply opacity (read from mediaStore)
    watermarkContext.globalAlpha = watermarkOpacity;
    watermarkContext.fillRect(0, 0, watermarkCanvas.width, watermarkCanvas.height);

    // Reset for next drawing operations
    watermarkContext.globalAlpha = 1;
    watermarkContext.globalCompositeOperation = 'source-over';
  }, [
    canvasRefs,
    contextRefs,
    watermarkImage,
    watermarkX,
    watermarkY,
    watermarkZoom,
    watermarkLeft,
    watermarkRight,
    watermarkOpacity,
    rightGradientMask,
  ]);

  return {
    renderFrameLayer,
    renderArtLayer,
    renderSetSymbol,
    renderWatermark,
  };
};
