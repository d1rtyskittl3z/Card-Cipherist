/**
 * Text and Debug Layers Hook
 * Handles text rendering, guidelines, and debug visualizations
 */

import { useCallback } from 'react';
import { useCanvasContext } from '../../contexts/useCanvasContext';
import { drawGuidelines, drawBottomInfo } from '../../utils/canvasHelpers';
import { useTextFieldRenderer } from '../useTextFieldRenderer';
import type { Card, CardBounds } from '../../types/card.types';
import type { FramePackTemplate } from '../../components/frames/packs/types';

interface UseTextAndDebugLayersProps {
  card: Card;
  loadedPack: FramePackTemplate | null;
  showGuidelines: boolean;
  showArtBoundsDebug: boolean;
  customArtBounds: CardBounds | null;
}

export const useTextAndDebugLayers = ({
  card,
  loadedPack,
  showGuidelines,
  showArtBoundsDebug,
  customArtBounds,
}: UseTextAndDebugLayersProps) => {
  // Get canvas references from context
  const { canvasRefs, contextRefs } = useCanvasContext();
  // Text renderer hook
  const { render: renderTextField, isLoading: isTextRendererLoading } = useTextFieldRenderer(card, loadedPack);

  /**
   * Render text layer using modular text renderer
   */
  const renderTextLayer = useCallback(async () => {
    const textCanvas = canvasRefs.text;
    const textContext = contextRefs.text;
    if (!textCanvas || !textContext || isTextRendererLoading || !loadedPack) return;

    // Clear text canvas
    textContext.clearRect(0, 0, textCanvas.width, textCanvas.height);

    // Render all standard text fields using the new renderer
    const standardFields = ['mana', 'title', 'nickname', 'type', 'rules', 'pt'];

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
  }, [canvasRefs, contextRefs, card, loadedPack, renderTextField, isTextRendererLoading]);

  /**
   * Render guidelines layer
   */
  const renderGuidelines = useCallback(() => {
    const guidelinesContext = contextRefs.guidelines;
    if (!guidelinesContext) return;

    // Always clear the guidelines canvas at the start
    guidelinesContext.clearRect(0, 0, guidelinesContext.canvas.width, guidelinesContext.canvas.height);

    // Draw guidelines if enabled
    if (showGuidelines && loadedPack) {
      drawGuidelines(guidelinesContext, card, loadedPack);
    }
  }, [contextRefs, showGuidelines, loadedPack, card]);

  /**
   * Render art bounds debugging layer
   * NOTE: This renders on the same canvas as guidelines, so it should be called AFTER renderGuidelines
   */
  const renderArtBoundsDebug = useCallback(() => {
    const guidelinesContext = contextRefs.guidelines;

    if (!guidelinesContext || !showArtBoundsDebug) {
      return;
    }

    // Don't clear the canvas - renderGuidelines already cleared it
    // We're adding art bounds on top of guidelines (if any)

    // Use customArtBounds if provided, otherwise use pack artBounds
    const boundsToDisplay = customArtBounds || loadedPack?.artBounds;
    if (!boundsToDisplay) return;

    // Calculate pixel coordinates from normalized bounds
    const x = (boundsToDisplay.x + card.marginX) * card.width;
    const y = (boundsToDisplay.y + card.marginY) * card.height;
    const width = boundsToDisplay.width * card.width;
    const height = boundsToDisplay.height * card.height;

    // Draw the bounds rectangle
    guidelinesContext.save();
    guidelinesContext.strokeStyle = '#00ff00'; // Green
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
    const label = customArtBounds ? 'Custom Art Bounds' : 'Art Bounds';
    guidelinesContext.fillText(label, x + 5, y - 10);

    guidelinesContext.restore();
  }, [contextRefs, showArtBoundsDebug, customArtBounds, loadedPack, card]);

  /**
   * Render bottom info layer (collector information)
   */
  const renderBottomInfo = useCallback(async () => {
    const bottomInfoCanvas = canvasRefs.bottomInfo;
    const bottomInfoContext = contextRefs.bottomInfo;

    if (!bottomInfoCanvas || !bottomInfoContext) return;

    await drawBottomInfo(bottomInfoCanvas, bottomInfoContext, card);
  }, [canvasRefs, contextRefs, card]);

  return {
    renderTextLayer,
    renderGuidelines,
    renderArtBoundsDebug,
    renderBottomInfo,
  };
};
