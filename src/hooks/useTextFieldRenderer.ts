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
import { useUIStore } from '../store/uiStore';

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

  // Error handling from UI store
  const setTextRenderError = useUIStore((state) => state.setTextRenderError);
  const clearTextRenderError = useUIStore((state) => state.clearTextRenderError);

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
  const hasNicknameOverlay = useMemo(() => {
    const includesNickname = (value?: string | null) => {
      if (typeof value !== 'string') {
        return false;
      }
      const normalized = value.toLowerCase().replace(/[^a-z0-9]/g, '');
      return normalized.includes('nickname');
    };

    const imageIncludesNickname = (image?: HTMLImageElement | null) =>
      includesNickname(image?.src ?? undefined);

    const logSwapReason = (reason: string, extra?: Record<string, unknown>) => {
      if (import.meta.env.PROD) {
        return;
      }
      console.log('[useTextFieldRenderer] Nickname/title swap active:', reason, {
        packId: pack?.id,
        packLabel: pack?.label,
        cardVersion: card.version,
        ...extra,
      });
    };

    const metadataValues = [pack?.id, pack?.label, pack?.version, card.version];
    const metadataMatches = metadataValues.filter((value) => includesNickname(value));
    if (metadataMatches.length > 0) {
      logSwapReason('metadata match', { metadataMatches });
      return true;
    }

    const packNicknameKeys = Object.entries(pack?.text ?? {}).filter(([key, config]) =>
      includesNickname(key) || includesNickname(config?.name)
    );
    if (packNicknameKeys.length > 0) {
      logSwapReason('pack text definition includes nickname', {
        textKeys: packNicknameKeys.map(([key]) => key),
      });
      return true;
    }

    const cardNicknameKeys = Object.entries(card.text ?? {}).filter(([key, config]) =>
      includesNickname(key) || includesNickname(config?.name)
    );
    if (cardNicknameKeys.length > 0) {
      logSwapReason('card text definition includes nickname', {
        textKeys: cardNicknameKeys.map(([key]) => key),
      });
      return true;
    }

    for (const frame of card.frames) {
      if (!frame) {
        continue;
      }

      if (
        includesNickname(frame.name) ||
        includesNickname(frame.src) ||
        imageIncludesNickname(frame.image) ||
        includesNickname((frame as { label?: string })?.label)
      ) {
        logSwapReason('frame match', { frameName: frame.name, frameSrc: frame.src });
        return true;
      }

      if (
        frame.masks?.some((mask) => {
          if (includesNickname(mask.name) || includesNickname(mask.src)) {
            logSwapReason('mask match', { maskName: mask.name, maskSrc: mask.src, frameName: frame.name });
            return true;
          }
          if (imageIncludesNickname(mask.image as HTMLImageElement | undefined)) {
            logSwapReason('mask image match', { maskName: mask.name, frameName: frame.name });
            return true;
          }
          return false;
        })
      ) {
        return true;
      }
    }

    return false;
  }, [card.frames, card.text, card.version, pack?.id, pack?.label, pack?.version, pack?.text]);

  const shouldSwapTitleNickname = useMemo(() => {
    if (!hasNicknameOverlay) {
      return false;
    }
    const titleField = card.text?.title;
    const nicknameField = card.text?.nickname;
    if (!titleField || !nicknameField) {
      return false;
    }

    const packDefinesDedicatedLayout = Boolean(pack?.text?.title && pack?.text?.nickname);
    return !packDefinesDedicatedLayout;
  }, [hasNicknameOverlay, card.text, pack?.text]);

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

      const nicknameText = (card.text?.nickname?.text ?? '').trim();
      const hideUpperBanner = hasNicknameOverlay && nicknameText.length === 0;
      const upperFieldKey = shouldSwapTitleNickname ? 'title' : 'nickname';

      if (hideUpperBanner && fieldKey === upperFieldKey) {
        return;
      }

      // Nickname overlays blank the upper banner until actual nickname text is present.
      // The lower crown should always render the main Title text so players can keep
      // editing the true card name without it jumping between slots.
      const positionFieldKey = fieldKey;
      const contentFieldKey = fieldKey;

      let resolvedContentFieldKey = contentFieldKey;
      if (shouldSwapTitleNickname && (fieldKey === 'title' || fieldKey === 'nickname')) {
        resolvedContentFieldKey = fieldKey === 'title' ? 'nickname' : 'title';
      }

      // Get position/layout from pack OR card (nickname field added dynamically to card)
      const packPositionSpec = pack?.text?.[positionFieldKey];
      const cardPositionSpec = card.text?.[positionFieldKey];
      const positionSpec = packPositionSpec || cardPositionSpec;

      // Get text content from card
      const cardContentData = card.text?.[resolvedContentFieldKey];

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
      const result = renderField(
        ctx,
        fieldSpec as { name: string; text: string; y: number; width: number; height: number; size: number; [key: string]: unknown },
        packMetrics,
        symbolAtlas,
        tempCanvasesRef.current,
        renderOptions
      );

      // Handle render errors
      if (!result.success) {
        setTextRenderError(fieldKey, result.error);
      } else {
        clearTextRenderError(fieldKey);
      }
    },
  [symbolAtlas, pack, card, packMetrics, hasNicknameOverlay, shouldSwapTitleNickname, setTextRenderError, clearTextRenderError]
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

    // Render standard fields in order – nickname sits between title and type when defined
    const standardFields = ['mana', 'title', 'nickname', 'type', 'rules', 'pt'];

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
