/**
 * Compositor Hook
 * Handles final composition of all canvas layers to the preview canvas
 */

import { useCallback } from 'react';
import { useCanvasContext } from '../../contexts/useCanvasContext';
import { shouldUseStationLayers } from '../../utils/stationHelpers';
import type { Card } from '../../types/card.types';
import type { FramePackTemplate } from '../../components/frames/packs/types';

interface UseCompositorProps {
  previewRef: React.RefObject<HTMLCanvasElement>;
  renderArtLayer: () => void;
  renderSetSymbol: (card: Card, loadedPack: FramePackTemplate | null) => void;
}

export const useCompositor = ({
  previewRef,
  renderArtLayer,
  renderSetSymbol,
}: UseCompositorProps) => {
  // Get canvas references from context
  const { canvasRefs } = useCanvasContext();
  /**
   * Composite all layers to final preview canvas
   */
  const compositeAllLayers = useCallback((card: Card, showGuidelines: boolean, showArtBoundsDebug: boolean, loadedPack: FramePackTemplate | null) => {
    const cardCanvas = canvasRefs.card;
    const cardContext = cardCanvas?.getContext('2d');
    const frameCanvas = canvasRefs.frame;
    const planeswalkerPreCanvas = canvasRefs.planeswalkerPre;
    const planeswalkerPostCanvas = canvasRefs.planeswalkerPost;
    const stationPreCanvas = canvasRefs.stationPre;
    const stationPostCanvas = canvasRefs.stationPost;
    const dungeonCanvas = canvasRefs.dungeon;
    const watermarkCanvas = canvasRefs.watermark;
    const sagaCanvas = canvasRefs.saga;
    const classCanvas = canvasRefs.class;
    const textCanvas = canvasRefs.text;
    const bottomInfoCanvas = canvasRefs.bottomInfo;
    const guidelinesCanvas = canvasRefs.guidelines;
    const qrCodeCanvas = canvasRefs.qrCode;
    const previewCanvas = previewRef.current;

    if (!cardCanvas || !cardContext || !previewCanvas) return;

    // Clear card canvas
    cardContext.clearRect(0, 0, cardCanvas.width, cardCanvas.height);

    // Draw art layer (reads from mediaStore)
    renderArtLayer();

    // Draw planeswalker pre-layer (decorations before frame)
    if (planeswalkerPreCanvas && card.version?.toLowerCase().includes('planeswalker')) {
      cardContext.drawImage(planeswalkerPreCanvas, 0, 0);
    }

    // Draw frame layer
    if (frameCanvas) {
      cardContext.drawImage(frameCanvas, 0, 0);
    }

    // Draw dungeon layer (walls and rooms)
    if (dungeonCanvas && card.version?.toLowerCase().includes('dungeon')) {
      cardContext.drawImage(dungeonCanvas, 0, 0);
    }

    // Draw station pre-layer (ability squares before text)
    if (stationPreCanvas && shouldUseStationLayers(card)) {
      cardContext.drawImage(stationPreCanvas, 0, 0);
    }

    // Draw set symbol (after frames, before text)
    renderSetSymbol(card, loadedPack);

    // Draw station post-layer (badges and PT after set symbol)
    if (stationPostCanvas && shouldUseStationLayers(card)) {
      cardContext.drawImage(stationPostCanvas, 0, 0);
    }

    // Draw watermark
    if (watermarkCanvas) {
      cardContext.drawImage(watermarkCanvas, 0, 0);
    }

    // Draw QR code (for deck cover cards)
    if (qrCodeCanvas && loadedPack?.qrCode) {
      cardContext.drawImage(qrCodeCanvas, 0, 0);
    }

    // Draw saga layer (chapter markers)
    if (sagaCanvas && card.version?.toLowerCase().includes('saga')) {
      cardContext.drawImage(sagaCanvas, 0, 0);
    }

    // Draw class layer (level headers)
    if (classCanvas && card.version?.toLowerCase().includes('class')) {
      cardContext.drawImage(classCanvas, 0, 0);
    }

    // Draw text
    if (textCanvas) {
      cardContext.drawImage(textCanvas, 0, 0);
    }

    // Draw planeswalker post-layer (decorations after text)
    if (planeswalkerPostCanvas && card.version?.toLowerCase().includes('planeswalker')) {
      cardContext.drawImage(planeswalkerPostCanvas, 0, 0);
    }

    // Draw bottom info (collector information or original bottomInfo from pack)
    if (bottomInfoCanvas && (card.showCollectorInfo || (card.bottomInfo && Object.keys(card.bottomInfo).length > 0))) {
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
      // Handle landscape orientation (rotate 90 degrees for display)
      if (card.landscape) {
        // For landscape, swap width and height for preview canvas
        if (previewCanvas.width !== cardCanvas.height || previewCanvas.height !== cardCanvas.width) {
          previewCanvas.width = cardCanvas.height;
          previewCanvas.height = cardCanvas.width;
        }
        previewContext.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        
        // Save context state
        previewContext.save();
        
        // Rotate 90 degrees counter-clockwise
        // Move origin to center, rotate, then translate back
        previewContext.translate(0, previewCanvas.height);
        previewContext.rotate(-Math.PI / 2);
        
        // Draw the card canvas
        previewContext.drawImage(cardCanvas, 0, 0);
        
        // Restore context state
        previewContext.restore();
      } else {
        // Standard portrait orientation
        if (previewCanvas.width !== cardCanvas.width || previewCanvas.height !== cardCanvas.height) {
          previewCanvas.width = cardCanvas.width;
          previewCanvas.height = cardCanvas.height;
        }
        // Always clear before drawing to prevent stale content from showing through
        previewContext.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        previewContext.drawImage(cardCanvas, 0, 0);
      }
    }
  }, [canvasRefs, previewRef, renderArtLayer, renderSetSymbol]);

  return {
    compositeAllLayers,
  };
};
