/**
 * Special Layers Hook
 * Handles rendering for special card types: Saga, Planeswalker, Stations, Serial
 */

import { useCallback } from 'react';
import { useCanvasContext } from '../../contexts/useCanvasContext';
import { drawSagaLayer } from '../../utils/sagaHelpers';
import { drawClassLayer } from '../../utils/classHelpers';
import {
  drawPlaneswalkerPreLayer,
  drawPlaneswalkerPostLayer,
  ensurePlaneswalkerAssets,
} from '../../utils/planeswalkerHelpers';
import { getStationImage, shouldUseStationLayers } from '../../utils/stationHelpers';
import { drawSerialPlate } from '../../utils/drawSerialPlate';
import { scaleX, scaleY, scaleHeight } from '../../utils/canvasHelpers';
import type { Card } from '../../types/card.types';

interface UseSpecialLayersProps {
  showSerialNumbers: boolean;
}

export const useSpecialLayers = ({
  showSerialNumbers,
}: UseSpecialLayersProps) => {
  // Get canvas references from context
  const { canvasRefs, contextRefs } = useCanvasContext();
  /**
   * Render saga overlay layer (chapter markers and dividers)
   */
  const renderSaga = useCallback(async (card: Card) => {
    const sagaCanvas = canvasRefs.saga;
    const sagaContext = contextRefs.saga;
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
  }, [canvasRefs, contextRefs]);

  /**
   * Render class overlay layer (level headers)
   */
  const renderClass = useCallback(async (card: Card) => {
    const classCanvas = canvasRefs.class;
    const classContext = contextRefs.class;
    if (!classCanvas || !classContext) {
      return;
    }

    // Always clear the class canvas before drawing
    classContext.clearRect(0, 0, classCanvas.width, classCanvas.height);

    if (!card.version?.toLowerCase().includes('class') || !card.class) {
      return;
    }

    try {
      await drawClassLayer(classContext, card);
    } catch (error) {
      console.error('Failed to render class layer:', error);
    }
  }, [canvasRefs, contextRefs]);

  /**
   * Render planeswalker helper layers (pre/post frame decorations)
   */
  const renderPlaneswalker = useCallback(async (card: Card) => {
    const planeswalkerPreCanvas = canvasRefs.planeswalkerPre;
    const planeswalkerPostCanvas = canvasRefs.planeswalkerPost;
    const planeswalkerPreContext = contextRefs.planeswalkerPre;
    const planeswalkerPostContext = contextRefs.planeswalkerPost;
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
  }, [canvasRefs, contextRefs]);

  /**
   * Render station card layers (ability squares, badges, PT box)
   */
  const renderStation = useCallback(async (card: Card) => {
    const stationPreCanvas = canvasRefs.stationPre;
    const stationPostCanvas = canvasRefs.stationPost;
    const stationPreContext = contextRefs.stationPre;
    const stationPostContext = contextRefs.stationPost;

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
  }, [canvasRefs, contextRefs]);

  /**
   * Render serial number plate on the frame canvas
   */
  const renderSerial = useCallback(async (card: Card) => {
    if (!showSerialNumbers) return;
    const frameCanvas = canvasRefs.frame;
    const frameContext = contextRefs.frame;
    if (!frameCanvas || !frameContext) return;
    try {
      await drawSerialPlate({
        ctx: frameContext,
        serialSrc: '/img/frames/serial.png',
        serialNumber: card.serialNumber,
        serialTotal: card.serialTotal,
        serialX: card.serialX,
        serialY: card.serialY,
        serialScale: card.serialScale,
        scaleX: (n) => n * frameCanvas.width,
        scaleY: (n) => n * frameCanvas.height,
        writeText: (spec, ctx) => {
          ctx.save();
          let kerning = 0;
          let text = spec.text || '';
          const m = text.match(/^\{kerning(\d+)\}/);
          if (m) {
            kerning = parseInt(m[1], 10) || 0;
            text = text.replace(/^\{kerning\d+\}/, '');
          }

          const xPx = (n: number) => n * frameCanvas.width;
          const yPx = (n: number) => n * frameCanvas.height;
          const pxX = xPx(spec.x);
          const pxY = yPx(spec.y);
          const pxW = Math.max(1, Math.round(xPx(spec.x + spec.width) - pxX));
          const pxH = Math.max(1, Math.round(yPx(spec.y + spec.height) - pxY));

          const fontPx = Math.max(1, Math.round(yPx(spec.size)));
          ctx.font = `${fontPx}px ${spec.font}`;
          ctx.fillStyle = spec.color;
          ctx.textBaseline = 'middle';
          const centerY = pxY + pxH / 2;

          let startX = pxX;
          const measureWidth = (s: string) => ctx.measureText(s).width;
          const textWidth = measureWidth(text);
          if (spec.align === 'center') {
            startX = pxX + pxW / 2 - textWidth / 2;
          } else if (spec.align === 'right') {
            startX = pxX + pxW - textWidth;
          }

          if (kerning > 0) {
            let cx = startX;
            for (const ch of text) {
              ctx.fillText(ch, cx, centerY);
              cx += measureWidth(ch) + kerning;
            }
          } else {
            ctx.fillText(text, startX, centerY);
          }
          ctx.restore();
        },
      });
    } catch (_error) {
      // swallow to avoid breaking render pipeline
    }
  }, [canvasRefs, contextRefs, showSerialNumbers]);

  return {
    renderSaga,
    renderClass,
    renderPlaneswalker,
    renderStation,
    renderSerial,
  };
};
