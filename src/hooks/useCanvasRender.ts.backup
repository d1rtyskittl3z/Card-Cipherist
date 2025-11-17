/**
 * Custom Hook: Canvas Rendering
 * Manages the card rendering pipeline
 */

import { useEffect, useRef, useCallback, useState } from 'react';
import { useCardStore } from '../store/cardStore';
import {
  initializeCanvas,
  drawFrameLayers,
  drawGuidelines,
  drawBottomInfo,
  scaleHeight,
  scaleX,
  scaleY,
} from '../utils/canvasHelpers';
import { drawSerialPlate } from '../utils/drawSerialPlate';
import type { CanvasRefs, CanvasContextRefs } from '../types/card.types';
import { useTextFieldRenderer } from './useTextFieldRenderer';
import { drawSagaLayer } from '../utils/sagaHelpers';
import { drawPlaneswalkerPreLayer, drawPlaneswalkerPostLayer, ensurePlaneswalkerAssets, } from '../utils/planeswalkerHelpers';
import { getStationImage, shouldUseStationLayers } from '../utils/stationHelpers';

export const useCanvasRender = () => {
  const card = useCardStore((state) => state.card);
  const frames = useCardStore((state) => state.card.frames);
  const artImage = useCardStore((state) => state.artImage);
  const setSymbolImage = useCardStore((state) => state.setSymbolImage);
  const watermarkImage = useCardStore((state) => state.watermarkImage);
  const showGuidelines = useCardStore((state) => state.showGuidelines);
  const loadedPack = useCardStore((state) => state.loadedPack);
  const showSerialNumbers = useCardStore((s) => s.showSerialNumbers);
  const showArtBoundsDebug = useCardStore((state) => state.showArtBoundsDebug);
  const customArtBounds = useCardStore((state) => state.customArtBounds);

  // New text renderer hook
  const { render: renderTextField, isLoading: isTextRendererLoading } = useTextFieldRenderer(card, loadedPack);

  // Canvas references
  const canvasRefs = useRef<Partial<CanvasRefs>>({});
  const contextRefs = useRef<Partial<CanvasContextRefs>>({});
  const previewRef = useRef<HTMLCanvasElement>(null);
  const [canvasesReady, setCanvasesReady] = useState(false);

  // Core images for masking
  const blackImageRef = useRef<HTMLImageElement | null>(null);
  const blankImageRef = useRef<HTMLImageElement | null>(null);
  const rightGradientMaskRef = useRef<HTMLImageElement | null>(null);

  /**
   * Initialize all canvases
   */
  const initializeCanvases = useCallback(() => {
    setCanvasesReady(false);

    // Get current card state directly from store to avoid stale closure
    const currentCard = useCardStore.getState().card;
    const width = Math.round(currentCard.width * (1 + 2 * currentCard.marginX));
    const height = Math.round(currentCard.height * (1 + 2 * currentCard.marginY));

    // console.log(`Initializing canvases: ${width}x${height}, Margins: ${currentCard.marginX}, ${currentCard.marginY}`);

    const canvasNames = [
      'card',
      'frame',
      'frameMasking',
      'frameCompositing',
      'saga',
      'planeswalkerPre',
      'planeswalkerPost',
      'stationPre',
      'stationPost',
      'text',
      'paragraph',
      'line',
      'watermark',
      'bottomInfo',
      'guidelines',
      'prePT',
    ] as const;

    canvasNames.forEach((name) => {
      const existingCanvas = canvasRefs.current[name];

      // If canvas exists and needs resizing, just resize it (content will be redrawn)
      if (existingCanvas && (existingCanvas.width !== width || existingCanvas.height !== height)) {
        existingCanvas.width = width;
        existingCanvas.height = height;
      } else if (!existingCanvas) {
        // Create new canvas if it doesn't exist
        const { canvas, context } = initializeCanvas(width, height);
        canvasRefs.current[name] = canvas as HTMLCanvasElement;
        contextRefs.current[name] = context as CanvasRenderingContext2D;
      }
    });

    setCanvasesReady(true);
  }, []);

  /**
   * Load core images
   */
  useEffect(() => {
    const loadCoreImages = async () => {
      const blackImg = document.createElement('img');
      blackImg.crossOrigin = 'anonymous';
      blackImg.src = '/img/black.png';
      await new Promise((resolve) => {
        blackImg.onload = resolve;
      });
      blackImageRef.current = blackImg;

      const blankImg = document.createElement('img');
      blankImg.crossOrigin = 'anonymous';
      blankImg.src = '/img/blank.png';
      await new Promise((resolve) => {
        blankImg.onload = resolve;
      });
      blankImageRef.current = blankImg;

      const rightGradientImg = document.createElement('img');
      rightGradientImg.crossOrigin = 'anonymous';
      rightGradientImg.src = '/img/frames/maskRightHalf.png';
      await new Promise((resolve) => {
        rightGradientImg.onload = resolve;
      });
      rightGradientMaskRef.current = rightGradientImg;
    };

    loadCoreImages();
  }, []);

  /**
   * Initialize canvases on mount and subscribe to margin changes
   */
  useEffect(() => {
    // Initial setup
    initializeCanvases();

    // Subscribe to store changes and reinitialize when margins change
    let prevMarginX = useCardStore.getState().card.marginX;
    let prevMarginY = useCardStore.getState().card.marginY;
    let prevWidth = useCardStore.getState().card.width;
    let prevHeight = useCardStore.getState().card.height;

    const unsubscribe = useCardStore.subscribe((state) => {
      const currentMarginX = state.card.marginX;
      const currentMarginY = state.card.marginY;
      const currentWidth = state.card.width;
      const currentHeight = state.card.height;

      if (
        currentMarginX !== prevMarginX ||
        currentMarginY !== prevMarginY ||
        currentWidth !== prevWidth ||
        currentHeight !== prevHeight
      ) {
        prevMarginX = currentMarginX;
        prevMarginY = currentMarginY;
        prevWidth = currentWidth;
        prevHeight = currentHeight;
        initializeCanvases();
      }
    });

    return () => unsubscribe();
  }, [initializeCanvases]);

  /**
   * Draw frames layer
   */
  const drawFrames = useCallback(() => {
    // Don't render if canvases are being reinitialized
    if (!canvasesReady) return;

    const frameContext = contextRefs.current.frame;
    const frameMaskingCanvas = canvasRefs.current.frameMasking;
    const frameMaskingContext = contextRefs.current.frameMasking;
    const frameCompositingCanvas = canvasRefs.current.frameCompositing;
    const frameCompositingContext = contextRefs.current.frameCompositing;
    const blackImage = blackImageRef.current;

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

    // Get the latest card and frames from the store to avoid stale closure
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
  }, [canvasesReady]);

  /**
   * Draw art layer
   */
  const drawArt = useCallback(() => {
    const artCanvas = canvasRefs.current.card;
    if (!artCanvas || !artImage) return;

    const ctx = artCanvas.getContext('2d');
    if (!ctx) return;

    ctx.save();

    // Apply grayscale filter if enabled
    if (card.artGrayscale) {
      ctx.filter = 'grayscale(100%)';
    }

    // Apply transformations
    const centerX = artCanvas.width / 2 + card.artX;
    const centerY = artCanvas.height / 2 + card.artY;

    ctx.translate(centerX, centerY);
    ctx.rotate((card.artRotate * Math.PI) / 180);
    ctx.scale(card.artZoom, card.artZoom);

    const width = artImage.width;
    const height = artImage.height;

    ctx.drawImage(artImage, -width / 2, -height / 2, width, height);
    ctx.restore();
  }, [artImage, card.artX, card.artY, card.artZoom, card.artRotate, card.artGrayscale]);

  /**
   * Draw set symbol layer
   */
  const drawSetSymbol = useCallback(() => {
    const canvas = canvasRefs.current.card;
    if (!canvas || !setSymbolImage || card.setSymbolSource === '/img/blank.png') return;

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
        symbolWidth = boundWidth * card.setSymbolZoom;
        symbolHeight = (boundWidth / symbolAspect) * card.setSymbolZoom;
      } else {
        // Symbol is taller - fit to height
        symbolHeight = boundHeight * card.setSymbolZoom;
        symbolWidth = (boundHeight * symbolAspect) * card.setSymbolZoom;
      }

      // Calculate base position from bounds (relative to card dimensions)
      const baseX = (bounds.x + card.marginX) * card.width;
      const baseY = (bounds.y + card.marginY) * card.height;

      // Apply manual offsets
      x = baseX + card.setSymbolX;
      y = baseY + card.setSymbolY;

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
      symbolWidth = setSymbolImage.width * card.setSymbolZoom;
      symbolHeight = setSymbolImage.height * card.setSymbolZoom;
      x = canvas.width / 2 + card.setSymbolX;
      y = canvas.height / 2 + card.setSymbolY;
      x -= symbolWidth / 2;
      y -= symbolHeight / 2;
    }

    ctx.drawImage(setSymbolImage, x, y, symbolWidth, symbolHeight);
  }, [setSymbolImage, card.setSymbolSource, card.setSymbolX, card.setSymbolY, card.setSymbolZoom, card.marginX, card.marginY, card.width, card.height, loadedPack]);

  /**
   * Draw watermark layer with two-tone gradient support
   * Port from creator-23.js watermarkEdited function
   */
  const drawWatermark = useCallback(() => {
    const watermarkCanvas = canvasRefs.current.watermark;
    const watermarkContext = contextRefs.current.watermark;
    if (!watermarkCanvas || !watermarkContext) return;

    // Reset compositing and alpha
    watermarkContext.globalCompositeOperation = 'source-over';
    watermarkContext.globalAlpha = 1;

    // Always clear the watermark canvas
    watermarkContext.clearRect(0, 0, watermarkCanvas.width, watermarkCanvas.height);

    // Only draw if we have a watermark image and left color is not 'none'
    if (!watermarkImage || card.watermarkLeft === 'none' || card.watermarkZoom === 0) return;

    const x = watermarkCanvas.width / 2 + card.watermarkX;
    const y = watermarkCanvas.height / 2 + card.watermarkY;
    const width = watermarkImage.width * card.watermarkZoom;
    const height = watermarkImage.height * card.watermarkZoom;

    // Draw right half with gradient if specified (matches original creator-23.js implementation)
    if (card.watermarkRight !== 'none' && rightGradientMaskRef.current) {
      // Draw the gradient mask image (transparent left to opaque right)
      watermarkContext.drawImage(
        rightGradientMaskRef.current,
        0,
        0,
        watermarkCanvas.width,
        watermarkCanvas.height
      );

      // Use source-in to clip the next drawing to the gradient mask shape
      watermarkContext.globalCompositeOperation = 'source-in';

      if (card.watermarkRight === 'default') {
        // Use actual watermark image for right side
        watermarkContext.drawImage(watermarkImage, x - width / 2, y - height / 2, width, height);
      } else {
        // Fill with solid color for right side
        watermarkContext.fillStyle = card.watermarkRight;
        watermarkContext.fillRect(0, 0, watermarkCanvas.width, watermarkCanvas.height);
      }

      // Draw left side behind the right gradient
      watermarkContext.globalCompositeOperation = 'destination-over';
    }

    // Draw left side (main watermark)
    if (card.watermarkLeft === 'default') {
      // Use actual watermark image
      watermarkContext.drawImage(watermarkImage, x - width / 2, y - height / 2, width, height);
    } else {
      // Fill with solid color
      watermarkContext.fillStyle = card.watermarkLeft;
      watermarkContext.fillRect(0, 0, watermarkCanvas.width, watermarkCanvas.height);
    }

    // Mask to watermark shape using destination-in
    watermarkContext.globalCompositeOperation = 'destination-in';
    watermarkContext.drawImage(watermarkImage, x - width / 2, y - height / 2, width, height);

    // Apply opacity
    watermarkContext.globalAlpha = card.watermarkOpacity;
    watermarkContext.fillRect(0, 0, watermarkCanvas.width, watermarkCanvas.height);

    // Reset for next drawing operations
    watermarkContext.globalAlpha = 1;
    watermarkContext.globalCompositeOperation = 'source-over';
  }, [
    watermarkImage,
    card.watermarkX,
    card.watermarkY,
    card.watermarkZoom,
    card.watermarkOpacity,
    card.watermarkLeft,
    card.watermarkRight,
  ]);

  /**
   * Draw saga overlay layer (chapter markers and dividers)
   */
  const drawSaga = useCallback(async () => {
    const sagaCanvas = canvasRefs.current.saga;
    const sagaContext = contextRefs.current.saga;
    if (!sagaCanvas || !sagaContext) return;

    // Always clear the saga canvas before drawing
    sagaContext.clearRect(0, 0, sagaCanvas.width, sagaCanvas.height);

    if (!card.version?.toLowerCase().includes('saga') || !card.saga) {
      return;
    }

    try {
      await drawSagaLayer(sagaContext, card);
    } catch (error) {
      console.error('Failed to render saga layer:', error);
    }
  }, [card]);

  /**
   * Draw planeswalker helper layers (pre/post frame decorations)
   */
  const drawPlaneswalker = useCallback(async () => {
    const planeswalkerPreCanvas = canvasRefs.current.planeswalkerPre;
    const planeswalkerPostCanvas = canvasRefs.current.planeswalkerPost;
    const planeswalkerPreContext = contextRefs.current.planeswalkerPre;
    const planeswalkerPostContext = contextRefs.current.planeswalkerPost;
    if (!planeswalkerPreCanvas || !planeswalkerPostCanvas || !planeswalkerPreContext || !planeswalkerPostContext) {
      return;
    }

    planeswalkerPreContext.clearRect(0, 0, planeswalkerPreCanvas.width, planeswalkerPreCanvas.height);
    planeswalkerPostContext.clearRect(0, 0, planeswalkerPostCanvas.width, planeswalkerPostCanvas.height);

    if (!card.version?.toLowerCase().includes('planeswalker') || !card.planeswalker) {
      return;
    }

    try {
      const assets = await ensurePlaneswalkerAssets(card.version, card.planeswalker.invert === true);
      await drawPlaneswalkerPreLayer({
        card,
        context: planeswalkerPreContext,
        canvas: planeswalkerPreCanvas,
        assets,
      });

      await drawPlaneswalkerPostLayer({
        card,
        context: planeswalkerPostContext,
        canvas: planeswalkerPostCanvas,
        assets,
      });
    } catch (error) {
      console.error('Failed to render planeswalker helper layers:', error);
    }
  }, [card]);

  const drawStationLayers = useCallback(async () => {
    const stationPreCanvas = canvasRefs.current.stationPre;
    const stationPostCanvas = canvasRefs.current.stationPost;
    const stationPreContext = contextRefs.current.stationPre;
    const stationPostContext = contextRefs.current.stationPost;

    if (!stationPreCanvas || !stationPostCanvas || !stationPreContext || !stationPostContext) {
      return;
    }

    stationPreContext.clearRect(0, 0, stationPreCanvas.width, stationPreCanvas.height);
    stationPostContext.clearRect(0, 0, stationPostCanvas.width, stationPostCanvas.height);

    if (!shouldUseStationLayers(card) || !card.station) {
      return;
    }

    const station = card.station;

    const drawSquare = (index: 1 | 2) => {
      const square = station.squares[index];
      const abilityKey = `ability${index}` as const;
      if (!square.enabled || !card.text?.[abilityKey]) {
        return;
      }
      if (index === 1 && station.disableFirstAbility) {
        return;
      }

      const base = station.baseTextPositions[abilityKey];
      const squareX = scaleX(card, base.x) + (square.x - 214);
      const squareY = scaleY(card, base.y) + square.y;

      stationPreContext.save();
      stationPreContext.globalAlpha = square.opacity;
      stationPreContext.fillStyle = square.color;
      stationPreContext.fillRect(squareX, squareY, square.width, square.height);
      stationPreContext.restore();
    };

    drawSquare(1);
    drawSquare(2);

    stationPostContext.save();
    stationPostContext.globalCompositeOperation = 'source-over';
    stationPostContext.globalAlpha = 1;
    stationPostContext.fillStyle = 'white';
    stationPostContext.textAlign = 'center';
    stationPostContext.textBaseline = 'middle';

    let badgeImage: HTMLImageElement | null = null;
    let ptImage: HTMLImageElement | null = null;

    try {
      badgeImage = await getStationImage('badge', station.badgeVariant);
    } catch (error) {
      console.error('Failed to load station badge image:', error);
    }

    try {
      ptImage = await getStationImage('pt', station.ptVariant);
    } catch (error) {
      console.error('Failed to load station PT image:', error);
    }

    const badgeHasValue = (value: string | undefined): boolean => {
      if (!value) {
        return false;
      }
      const trimmed = value.trim();
      return trimmed.length > 0 && /\d/.test(trimmed);
    };

    const drawElement = (
      type: 'badge' | 'pt',
      index: 1 | 2,
      image: HTMLImageElement | null,
      settings: { width: number; height: number; x?: number; y?: number },
      hasValue: boolean
    ) => {
      if (!hasValue || !image) {
        return;
      }

      const abilityKey = `ability${index}` as const;
      const square = station.squares[index];
      const base = station.baseTextPositions[abilityKey];

      const squareX = scaleX(card, base.x) + (square.x - 214);
      const squareY = scaleY(card, base.y) + square.y;

      const elementWidth = settings.width;
      const elementHeight = settings.height;

      let elementX: number;
      if (type === 'pt') {
        elementX = squareX + square.width + ((settings.x ?? 0) - 266);
      } else {
        elementX = squareX + (settings.x ?? -81);
      }

      const elementY = squareY + square.height / 2 + (settings.y ?? 0);

      stationPostContext.drawImage(image, elementX, elementY - elementHeight / 2, elementWidth, elementHeight);

      const textValue = type === 'pt' ? card.text?.pt?.text ?? '' : station.badgeValues[index] ?? '';
      if (!textValue.trim()) {
        return;
      }

      const fontSize = type === 'pt' ? station.ptSettings.fontSize : station.badgeSettings.fontSize;
      stationPostContext.font = `${scaleHeight(card, fontSize)}px belerenbsc`;

      const textXOffset = 3;
      const textYOffset = type === 'pt' ? 7 : 5;
      stationPostContext.fillText(
        textValue,
        elementX + elementWidth / 2 + textXOffset,
        elementY + textYOffset
      );
    };

    if (badgeImage) {
      drawElement('badge', 1, badgeImage, station.badgeSettings, badgeHasValue(station.badgeValues[1]));
      drawElement('badge', 2, badgeImage, station.badgeSettings, badgeHasValue(station.badgeValues[2]));
    }

    const hasPt = Boolean(card.text?.pt?.text?.trim());
    if (ptImage && hasPt) {
      drawElement('pt', 2, ptImage, station.ptSettings, true);
    }

    stationPostContext.restore();
  }, [card]);

  /**
   * Draw text layer - using new modular text renderer
   */
  const drawTextLayer = useCallback(async () => {
    const textCanvas = canvasRefs.current.text;
    const textContext = contextRefs.current.text;
    if (!textCanvas || !textContext || isTextRendererLoading || !loadedPack) return;

    // Clear text canvas
    textContext.clearRect(0, 0, textCanvas.width, textCanvas.height);

    // Render all standard text fields using the new renderer
    const standardFields = ['mana', 'title', 'type', 'rules', 'pt'];

    for (const fieldKey of standardFields) {
      // Check if field exists in card text or pack text config
      if (card.text?.[fieldKey] || loadedPack?.text?.[fieldKey]) {
        renderTextField(textContext, fieldKey);
      }
    }

    // Render any additional custom fields (like nickname)
    if (card.text) {
      for (const fieldKey of Object.keys(card.text)) {
        if (!standardFields.includes(fieldKey)) {
          renderTextField(textContext, fieldKey);
        }
      }
    }
  }, [card, loadedPack, renderTextField, isTextRendererLoading]);

  /**
   * Draw guidelines layer
   */
  const drawGuidelinesLayer = useCallback(() => {
    const guidelinesContext = contextRefs.current.guidelines;
    if (!guidelinesContext) return;

    if (showGuidelines && loadedPack) {
      drawGuidelines(guidelinesContext, card, loadedPack);
    } else {
      // Clear guidelines if disabled
      guidelinesContext.clearRect(0, 0, guidelinesContext.canvas.width, guidelinesContext.canvas.height);
    }
  }, [showGuidelines, loadedPack, card]);

  /**
   * Draw art bounds debugging layer
   */
  const drawArtBoundsDebug = useCallback(() => {
    const guidelinesContext = contextRefs.current.guidelines;
    if (!guidelinesContext || !showArtBoundsDebug) return;

    // Get the art bounds to visualize (custom bounds or pack bounds)
    const bounds = customArtBounds ?? loadedPack?.artBounds;
    if (!bounds) return;

    // Calculate pixel coordinates from normalized bounds
    const x = (bounds.x + card.marginX) * card.width;
    const y = (bounds.y + card.marginY) * card.height;
    const width = bounds.width * card.width;
    const height = bounds.height * card.height;

    // Draw the bounds rectangle
    guidelinesContext.save();
    guidelinesContext.strokeStyle = '#00ff00'; // Green color for art bounds
    guidelinesContext.lineWidth = 3;
    guidelinesContext.setLineDash([10, 5]); // Dashed line
    guidelinesContext.strokeRect(x, y, width, height);

    // Draw corner handles
    const handleSize = 10;
    guidelinesContext.fillStyle = '#00ff00';
    // Top-left
    guidelinesContext.fillRect(x - handleSize / 2, y - handleSize / 2, handleSize, handleSize);
    // Top-right
    guidelinesContext.fillRect(x + width - handleSize / 2, y - handleSize / 2, handleSize, handleSize);
    // Bottom-left
    guidelinesContext.fillRect(x - handleSize / 2, y + height - handleSize / 2, handleSize, handleSize);
    // Bottom-right
    guidelinesContext.fillRect(x + width - handleSize / 2, y + height - handleSize / 2, handleSize, handleSize);

    // Draw label
    guidelinesContext.fillStyle = '#00ff00';
    guidelinesContext.font = '16px sans-serif';
    guidelinesContext.fillText('Art Bounds', x + 5, y - 10);

    guidelinesContext.restore();
  }, [showArtBoundsDebug, customArtBounds, loadedPack, card.marginX, card.marginY, card.width, card.height]);

  /**
   * Draw bottom info layer (collector information)
   */
  const drawBottomInfoLayer = useCallback(async () => {
    const bottomInfoCanvas = canvasRefs.current.bottomInfo;
    const bottomInfoContext = contextRefs.current.bottomInfo;

    if (!bottomInfoCanvas || !bottomInfoContext) return;

    await drawBottomInfo(bottomInfoCanvas, bottomInfoContext, card);
  }, [card]);

  /**
   * Composite all layers to final card
   */
  const drawCard = useCallback(() => {
    const cardCanvas = canvasRefs.current.card;
    const cardContext = contextRefs.current.card;
    const frameCanvas = canvasRefs.current.frame;
  const planeswalkerPreCanvas = canvasRefs.current.planeswalkerPre;
  const planeswalkerPostCanvas = canvasRefs.current.planeswalkerPost;
  const stationPreCanvas = canvasRefs.current.stationPre;
  const stationPostCanvas = canvasRefs.current.stationPost;
    const watermarkCanvas = canvasRefs.current.watermark;
  const sagaCanvas = canvasRefs.current.saga;
    const textCanvas = canvasRefs.current.text;
    const bottomInfoCanvas = canvasRefs.current.bottomInfo;
    const guidelinesCanvas = canvasRefs.current.guidelines;
    const previewCanvas = previewRef.current;

    if (!cardCanvas || !cardContext || !previewCanvas) return;

    // Clear card canvas
    cardContext.clearRect(0, 0, cardCanvas.width, cardCanvas.height);

    // Draw art layer
    drawArt();

    if (planeswalkerPreCanvas && card.version?.toLowerCase().includes('planeswalker')) {
      cardContext.drawImage(planeswalkerPreCanvas, 0, 0);
    }

    // Draw frame layer
    if (frameCanvas) {
      cardContext.drawImage(frameCanvas, 0, 0);
    }

    if (stationPreCanvas && shouldUseStationLayers(card)) {
      cardContext.drawImage(stationPreCanvas, 0, 0);
    }

    // Draw set symbol (after frames, before text)
    drawSetSymbol();

    if (stationPostCanvas && shouldUseStationLayers(card)) {
      cardContext.drawImage(stationPostCanvas, 0, 0);
    }

    // Draw watermark
    if (watermarkCanvas) {
      cardContext.drawImage(watermarkCanvas, 0, 0);
    }

    if (sagaCanvas && card.version?.toLowerCase().includes('saga')) {
      cardContext.drawImage(sagaCanvas, 0, 0);
    }

    // Draw text
    if (textCanvas) {
      cardContext.drawImage(textCanvas, 0, 0);
    }

    if (planeswalkerPostCanvas && card.version?.toLowerCase().includes('planeswalker')) {
      cardContext.drawImage(planeswalkerPostCanvas, 0, 0);
    }

    // Draw bottom info (collector information)
    if (bottomInfoCanvas && card.showCollectorInfo) {
      cardContext.drawImage(bottomInfoCanvas, 0, 0);
    }

    // Draw guidelines (on top of everything)
    if (guidelinesCanvas && showGuidelines) {
      cardContext.drawImage(guidelinesCanvas, 0, 0);
    }

    // Draw art bounds debug visualization (on top of guidelines)
    if (guidelinesCanvas && showArtBoundsDebug) {
      cardContext.drawImage(guidelinesCanvas, 0, 0);
    }

    // Copy to preview canvas (visible to user)
    const previewContext = previewCanvas.getContext('2d');
    if (previewContext) {
      // Resize if dimensions changed
      if (previewCanvas.width !== cardCanvas.width || previewCanvas.height !== cardCanvas.height) {
        previewCanvas.width = cardCanvas.width;
        previewCanvas.height = cardCanvas.height;
      }
      // Always clear before drawing to prevent stale content from showing through
      previewContext.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
      previewContext.drawImage(cardCanvas, 0, 0);
    }
  }, [drawArt, drawSetSymbol, showGuidelines, showArtBoundsDebug, card]);

  // Draw serial plate on the frame canvas (same layer) after frames are drawn
  const drawSerial = useCallback(async () => {
    if (!showSerialNumbers) return
    const frameCanvas = canvasRefs.current.frame
    const frameContext = contextRefs.current.frame
    if (!frameCanvas || !frameContext) return
    try {
      await drawSerialPlate({
        ctx: frameContext,
        serialSrc: '/img/frames/serial.png',
        serialNumber: card.serialNumber,
        serialTotal: card.serialTotal,
        serialX: card.serialX,
        serialY: card.serialY,
        serialScale: card.serialScale,
        scaleX: (n) => n * frameCanvas.width, // normalized to pixels
        scaleY: (n) => n * frameCanvas.height,
        writeText: (spec, ctx) => {
          // Minimal text writer with basic kerning token support
          ctx.save()
          // Extract optional kerning token at start e.g., {kerning3}
          let kerning = 0
          let text = spec.text || ''
          const m = text.match(/^\{kerning(\d+)\}/)
          if (m) {
            kerning = parseInt(m[1], 10) || 0
            text = text.replace(/^\{kerning\d+\}/, '')
          }

          const xPx = (n: number) => n * frameCanvas.width
          const yPx = (n: number) => n * frameCanvas.height
          const pxX = xPx(spec.x)
          const pxY = yPx(spec.y)
          const pxW = Math.max(1, Math.round(xPx(spec.x + spec.width) - pxX))
          const pxH = Math.max(1, Math.round(yPx(spec.y + spec.height) - pxY))

          // spec.size is normalized against 2010 height in our usage; approximate with canvas height
          const fontPx = Math.max(1, Math.round(yPx(spec.size)))
          ctx.font = `${fontPx}px ${spec.font}`
          ctx.fillStyle = spec.color
          ctx.textBaseline = 'middle'
          const centerY = pxY + pxH / 2

          // Compute starting X based on alignment
          let startX = pxX
          const measureWidth = (s: string) => ctx.measureText(s).width
          const textWidth = measureWidth(text)
          if (spec.align === 'center') {
            startX = pxX + pxW / 2 - textWidth / 2
          } else if (spec.align === 'right') {
            startX = pxX + pxW - textWidth
          }

          if (kerning > 0) {
            let cx = startX
            for (const ch of text) {
              ctx.fillText(ch, cx, centerY)
              cx += measureWidth(ch) + kerning
            }
          } else {
            ctx.fillText(text, startX, centerY)
          }
          ctx.restore()
        }
      })
    } catch (e) {
      // swallow to avoid breaking render pipeline
    }
  }, [showSerialNumbers, card.serialNumber, card.serialTotal, card.serialX, card.serialY, card.serialScale])

  /**
   * Main render function - called when card state changes
   */
  const render = useCallback(async () => {
    // const currentCard = useCardStore.getState().card;
    // console.log(`Render called: ${currentCard.frames.length} frames in store`);
  drawFrames();
  await drawSerial();
  await drawStationLayers();
  // drawSetSymbol(); // Now called inside drawCard()
  drawWatermark();
  await drawSaga();
  await drawPlaneswalker();
    await drawTextLayer();
    await drawBottomInfoLayer();
    drawGuidelinesLayer();
    drawArtBoundsDebug();
    drawCard();
  }, [
    drawFrames,
    drawSerial,
  drawStationLayers,
    drawWatermark,
    drawSaga,
    drawPlaneswalker,
    drawTextLayer,
    drawBottomInfoLayer,
    drawGuidelinesLayer,
    drawArtBoundsDebug,
    drawCard,
  ]);

  /**
   * Trigger render when card state changes
   */
  useEffect(() => {
    // Only render if canvases are ready
    if (!canvasesReady) return;

    // Debounce rendering for performance
    const timeoutId = setTimeout(() => {
      render();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [render, card, frames, canvasesReady]);

  return {
    previewRef,
    canvasRefs: canvasRefs.current,
    contextRefs: contextRefs.current,
    render,
  };
};
