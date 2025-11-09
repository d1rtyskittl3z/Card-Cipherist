/**
 * Text Field Renderer Hook
 * React hook for rendering text fields to canvas
 */

import { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import type { Card } from '../types/card.types';
import type { FramePackTemplate } from '../components/frames/packs/types';
import type { PackMetrics, RenderOptions, TextCanvasRefs } from '../renderer/text/types';
import { SymbolAtlas, createStandardManaAtlas } from '../renderer/text/symbols';
import { renderField, createTempCanvases } from '../renderer/text/textRenderer';

/**
 * Hook for rendering text fields
 *
 * Manages symbol atlas loading and provides a render function
 * that can be called to render any text field to a canvas.
 *
 * @param card - Current card state
 * @param pack - Loaded frame pack (for text configs)
 * @returns Render function and loading state
 */
export function useTextFieldRenderer(card: Card, pack: FramePackTemplate | null) {
  const [symbolAtlas, setSymbolAtlas] = useState<SymbolAtlas | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const tempCanvasesRef = useRef<TextCanvasRefs | null>(null);

  // Initialize symbol atlas on mount
  useEffect(() => {
    let cancelled = false;

    const loadAtlas = async () => {
      try {
        const atlas = await createStandardManaAtlas();
        if (!cancelled) {
          setSymbolAtlas(atlas);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load symbol atlas:', error);
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadAtlas();

    return () => {
      cancelled = true;
    };
  }, []);

  // Create temp canvases when card dimensions change
  useEffect(() => {
    tempCanvasesRef.current = createTempCanvases(card.width, card.height);
  }, [card.width, card.height]);

  // Create pack metrics - memoized to avoid recreating on every render
  const packMetrics: PackMetrics = useMemo(() => ({
    cardWidth: card.width,
    cardHeight: card.height,
    marginX: card.marginX || 0,
    marginY: card.marginY || 0,
    scaleX: (n: number) => Math.round((n + (card.marginX || 0)) * card.width),
    scaleY: (n: number) => Math.round((n + (card.marginY || 0)) * card.height),
    scaleWidth: (n: number) => Math.round(n * card.width),
    scaleHeight: (n: number) => Math.round(n * card.height),
  }), [card.width, card.height, card.marginX, card.marginY]);

  // Determine whether we need to swap title/nickname content when rendering
  const shouldSwapTitleNickname = useMemo(() => {
    let hasNicknameLayer = false;
    let hasFullNicknameFrame = false;

    for (const frame of card.frames) {
      const src = frame.src?.toLowerCase() ?? '';
      const name = frame.name?.toLowerCase() ?? '';

      if (src.includes('nickname') || name.includes('nickname')) {
        hasNicknameLayer = true;

        // Full-frame nickname templates (PromoNickname/M15Nickname) already position title/nickname correctly
        if (name.includes('frame') || src.includes('frame')) {
          hasFullNicknameFrame = true;
        }
      }
    }

    const packId = pack?.id?.toLowerCase() ?? '';
    const packExplicitlyEnablesSwap = packId === 'm15nickname-2' || packId === 'm15smoothnickname';
    const packExplicitlyDisablesSwap = packId === 'm15nickname' || packId === 'promonickname';

    if (packExplicitlyDisablesSwap || hasFullNicknameFrame) {
      return false;
    }

    if (packExplicitlyEnablesSwap) {
      return true;
    }

    // Fallback: swap when nickname overlays are present without a full nickname frame on the card
    return hasNicknameLayer;
  }, [card.frames, pack?.id]);

  // Create render function
  const render = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      fieldKey: string,
      options: RenderOptions = {}
    ) => {
      if (!symbolAtlas || !tempCanvasesRef.current) {
        return;
      }

      // Special handling: Swap title/nickname CONTENT when nickname pack frames are present
      // Desired result: Title tab text → render at nickname position (crown area)
      //                 Nickname tab text → render at title position (top)
      // Visual result: No indication of swap, just content appears in swapped locations
      const positionFieldKey = fieldKey; // Field to use for getting position/layout (never swapped)
      let contentFieldKey = fieldKey;    // Field to use for getting text content

  if (shouldSwapTitleNickname && (fieldKey === 'title' || fieldKey === 'nickname')) {
        // Swap ONLY the content, NOT the position
        // When rendering "title" position: use nickname tab's text content
        // When rendering "nickname" position: use title tab's text content
        contentFieldKey = fieldKey === 'title' ? 'nickname' : 'title';
      }

      // Get position/layout from pack OR card (nickname field added dynamically to card)
      const packPositionSpec = pack?.text?.[positionFieldKey];
      const cardPositionSpec = card.text?.[positionFieldKey];
      const positionSpec = packPositionSpec || cardPositionSpec;

      // Get text content from card
      const cardContentData = card.text?.[contentFieldKey];

      // If we have no position spec, skip this field
      if (!positionSpec) {
        return;
      }

      // Merge position properties with ONLY the text content (not position properties)
      // Position spec provides: name, x, y, width, height, size, font, etc.
      // Content data provides ONLY: text (we don't want to override position)
      const fieldSpec = {
        ...positionSpec,
        text: cardContentData?.text || '',
        // Override bounds if they exist in card.text (user-edited bounds)
        ...(cardPositionSpec?.x !== undefined && { x: cardPositionSpec.x }),
        ...(cardPositionSpec?.y !== undefined && { y: cardPositionSpec.y }),
        ...(cardPositionSpec?.width !== undefined && { width: cardPositionSpec.width }),
        ...(cardPositionSpec?.height !== undefined && { height: cardPositionSpec.height }),
        // Apply font size adjustment if present
        ...(cardPositionSpec?.fontSizeAdjustment !== undefined && { 
          fontSize: String(cardPositionSpec.fontSizeAdjustment) 
        }),
      };

      // Validate required fields exist
      // NOTE: For manaPlacement fields, width/height/y can be 0, so check for undefined/null instead
      if (!fieldSpec.name || fieldSpec.y === undefined || fieldSpec.y === null || 
          fieldSpec.width === undefined || fieldSpec.width === null || 
          fieldSpec.height === undefined || fieldSpec.height === null || 
          !fieldSpec.size) {
        return;
      }

      // Merge default options
      const renderOptions: RenderOptions = {
        cardName: card.text?.title?.text,
        frames: card.frames,
        version: pack?.version,
        showsFlavorBar: card.showsFlavorBar,
        hideBottomInfoBorder: card.hideBottomInfoBorder,
        ...options,
      };

      // Render the field - TypeScript is satisfied because we validated required fields above
      renderField(
        ctx,
        fieldSpec as { name: string; text: string; y: number; width: number; height: number; size: number; [key: string]: unknown },
        packMetrics,
        symbolAtlas,
        tempCanvasesRef.current,
        renderOptions
      );
    },
  [symbolAtlas, pack, card, packMetrics, shouldSwapTitleNickname]
  );

  return {
    render,
    isLoading,
    symbolAtlas,
  };
}

/**
 * Hook for rendering all text fields at once
 *
 * Renders all standard fields (title, type, mana, rules, pt) to a canvas.
 * Useful for the main text canvas in the card preview.
 *
 * @param card - Current card state
 * @param pack - Loaded frame pack
 * @param ctx - Canvas context to render to
 * @param options - Render options
 */
export function useTextRenderer(
  card: Card,
  pack: FramePackTemplate | null,
  ctx: CanvasRenderingContext2D | null,
  options: RenderOptions = {}
) {
  const { render, isLoading } = useTextFieldRenderer(card, pack);

  useEffect(() => {
    if (!ctx || !pack || isLoading) {
      return;
    }

    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Render standard fields in order
    const standardFields = ['mana', 'title', 'type', 'rules', 'pt'];

    for (const fieldKey of standardFields) {
      if (card.text?.[fieldKey] || pack?.text?.[fieldKey]) {
        render(ctx, fieldKey, options);
      }
    }

    // Render bottom info fields if present
    if (card.bottomInfo) {
      for (const key of Object.keys(card.bottomInfo)) {
        render(ctx, key, options);
      }
    }
  }, [card, pack, ctx, render, isLoading, options]);

  return { isLoading };
}
