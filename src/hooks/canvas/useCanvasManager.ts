/**
 * Canvas Manager Hook
 * Manages canvas initialization, refs, and resizing
 */

import { useRef, useCallback, useState, useEffect } from 'react';
import { useCardStore } from '../../store/cardStore';
import { initializeCanvas } from '../../utils/canvasHelpers';
import type { CanvasRefs, CanvasContextRefs } from '../../types/card.types';

export const useCanvasManager = () => {
  // Canvas references
  const canvasRefs = useRef<Partial<CanvasRefs>>({});
  const contextRefs = useRef<Partial<CanvasContextRefs>>({});
  const [canvasesReady, setCanvasesReady] = useState(false);

  /**
   * Initialize all canvases
   */
  const initializeCanvases = useCallback(() => {
    setCanvasesReady(false);

    // Get current card state directly from store to avoid stale closure
    const currentCard = useCardStore.getState().card;
    const width = Math.round(currentCard.width * (1 + 2 * currentCard.marginX));
    const height = Math.round(currentCard.height * (1 + 2 * currentCard.marginY));

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
   * Initialize canvases on mount and subscribe to margin/dimension changes
   */
  useEffect(() => {
    // Initial setup
    initializeCanvases();

    // Subscribe to store changes and reinitialize when margins or dimensions change
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

  return {
    canvasRefs: canvasRefs.current,
    contextRefs: contextRefs.current,
    canvasesReady,
  };
};
