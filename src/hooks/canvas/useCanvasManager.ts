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

  // Store setters for canvas refs (for PSD export access)
  const setBottomInfoCanvasRef = useCardStore((state) => state.setBottomInfoCanvasRef);
  const setPlaneswalkerPreCanvasRef = useCardStore((state) => state.setPlaneswalkerPreCanvasRef);
  const setPlaneswalkerPostCanvasRef = useCardStore((state) => state.setPlaneswalkerPostCanvasRef);
  const setSagaCanvasRef = useCardStore((state) => state.setSagaCanvasRef);
  const setClassCanvasRef = useCardStore((state) => state.setClassCanvasRef);
  const setDungeonCanvasRef = useCardStore((state) => state.setDungeonCanvasRef);
  const setDungeonFXCanvasRef = useCardStore((state) => state.setDungeonFXCanvasRef);
  const setStationPreCanvasRef = useCardStore((state) => state.setStationPreCanvasRef);
  const setStationPostCanvasRef = useCardStore((state) => state.setStationPostCanvasRef);

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
      'class',
      'planeswalkerPre',
      'planeswalkerPost',
      'stationPre',
      'stationPost',
      'dungeon',
      'dungeonFX',
      'text',
      'paragraph',
      'line',
      'watermark',
      'bottomInfo',
      'guidelines',
      'prePT',
      'qrCode',
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

  // Set bottomInfo canvas ref in store for PSD export access
  useEffect(() => {
    if (canvasesReady && canvasRefs.current.bottomInfo) {
      setBottomInfoCanvasRef(canvasRefs.current.bottomInfo);
    }
    return () => {
      setBottomInfoCanvasRef(null);
    };
  }, [canvasesReady, setBottomInfoCanvasRef]);

  // Set special card type canvas refs in store for PSD export access
  useEffect(() => {
    if (canvasesReady) {
      if (canvasRefs.current.planeswalkerPre) {
        setPlaneswalkerPreCanvasRef(canvasRefs.current.planeswalkerPre);
      }
      if (canvasRefs.current.planeswalkerPost) {
        setPlaneswalkerPostCanvasRef(canvasRefs.current.planeswalkerPost);
      }
      if (canvasRefs.current.saga) {
        setSagaCanvasRef(canvasRefs.current.saga);
      }
      if (canvasRefs.current.class) {
        setClassCanvasRef(canvasRefs.current.class);
      }
      if (canvasRefs.current.dungeon) {
        setDungeonCanvasRef(canvasRefs.current.dungeon);
      }
      if (canvasRefs.current.dungeonFX) {
        setDungeonFXCanvasRef(canvasRefs.current.dungeonFX);
      }
      if (canvasRefs.current.stationPre) {
        setStationPreCanvasRef(canvasRefs.current.stationPre);
      }
      if (canvasRefs.current.stationPost) {
        setStationPostCanvasRef(canvasRefs.current.stationPost);
      }
    }
    return () => {
      setPlaneswalkerPreCanvasRef(null);
      setPlaneswalkerPostCanvasRef(null);
      setSagaCanvasRef(null);
      setClassCanvasRef(null);
      setDungeonCanvasRef(null);
      setDungeonFXCanvasRef(null);
      setStationPreCanvasRef(null);
      setStationPostCanvasRef(null);
    };
  }, [
    canvasesReady,
    setPlaneswalkerPreCanvasRef,
    setPlaneswalkerPostCanvasRef,
    setSagaCanvasRef,
    setClassCanvasRef,
    setDungeonCanvasRef,
    setDungeonFXCanvasRef,
    setStationPreCanvasRef,
    setStationPostCanvasRef,
  ]);

  return {
    canvasRefs: canvasRefs.current,
    contextRefs: contextRefs.current,
    canvasesReady,
  };
};
