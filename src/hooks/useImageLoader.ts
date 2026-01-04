/**
 * Custom Hook: Image Loader
 * Handles image loading with crossOrigin support and error handling
 */

import { useState, useCallback } from 'react';
import { useCardStore } from '../store/cardStore';
import { useFrameStore } from '../store/frameStore';
import { useMediaStore } from '../store/mediaStore';
import { useUIStore } from '../store/uiStore';
import { calculateAutoFitArt, calculateAutoFitWatermark } from '../utils/canvasHelpers';
import { loadAndCropSVG } from '../utils/svgCropper';

export const useImageLoader = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Card store - for card dimensions
  const card = useCardStore((state) => state.card);

  // Frame store - for loaded pack
  const loadedPackFromFrameStore = useFrameStore((state) => state.loadedPack);

  // TEMPORARY: Fallback to cardStore for loaded pack during migration
  const loadedPackFromCardStore = useCardStore((state) => state.loadedPack);
  const loadedPack = loadedPackFromFrameStore || loadedPackFromCardStore;

  // UI store - for auto-fit setting
  const autoFitArt = useUIStore((state) => state.autoFitArt);

  // Media store - for images and media actions
  const setArtImage = useMediaStore((state) => state.setArtImage);
  const setArtImageLoading = useMediaStore((state) => state.setArtImageLoading);
  const setArtImageError = useMediaStore((state) => state.setArtImageError);
  const setArtImage2 = useMediaStore((state) => state.setArtImage2);
  const setArtImageLoading2 = useMediaStore((state) => state.setArtImageLoading2);
  const setArtImageError2 = useMediaStore((state) => state.setArtImageError2);
  const setSetSymbolImage = useMediaStore((state) => state.setSetSymbolImage);
  const setSetSymbolImageLoading = useMediaStore((state) => state.setSetSymbolImageLoading);
  const setSetSymbolImageError = useMediaStore((state) => state.setSetSymbolImageError);
  const setWatermarkImage = useMediaStore((state) => state.setWatermarkImage);
  const setWatermarkImageLoading = useMediaStore((state) => state.setWatermarkImageLoading);
  const setWatermarkImageError = useMediaStore((state) => state.setWatermarkImageError);
  const updateArt = useMediaStore((state) => state.updateArt);
  const updateArt2 = useMediaStore((state) => state.updateArt2);
  const updateSetSymbol = useMediaStore((state) => state.updateSetSymbol);
  const updateWatermark = useMediaStore((state) => state.updateWatermark);

  /**
   * Load image with crossOrigin support
   */
  const loadImage = useCallback(
    (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
      });
    },
    []
  );

  /**
   * Check if URL is external (not local)
   */
  const isExternalUrl = useCallback((url: string): boolean => {
    return url.startsWith('http://') || url.startsWith('https://');
  }, []);

  /**
   * Wrap external URL with CORS proxy
   */
  const proxifyUrl = useCallback((url: string): string => {
    if (isExternalUrl(url) && !url.includes('corsproxy.io')) {
      return `https://corsproxy.io/?url=${encodeURIComponent(url)}`;
    }
    return url;
  }, [isExternalUrl]);

  /**
   * Load art image
   * @param src - Image source URL
   * @param artSlot - Which art slot to load into ('art1' or 'art2')
   */
  const loadArt = useCallback(
    async (src: string, artSlot: 'art1' | 'art2' = 'art1'): Promise<HTMLImageElement> => {
      setLoading(true);
      setError(null);

      // Select the appropriate setters based on art slot
      const setImageLoading = artSlot === 'art1' ? setArtImageLoading : setArtImageLoading2;
      const setImageError = artSlot === 'art1' ? setArtImageError : setArtImageError2;
      const setImage = artSlot === 'art1' ? setArtImage : setArtImage2;
      const updateArtFn = artSlot === 'art1' ? updateArt : updateArt2;
      const artBounds = artSlot === 'art1' ? loadedPack?.artBounds : loadedPack?.artBounds2;

      setImageLoading(true);
      setImageError(null);
      try {
        // Use CORS proxy for external URLs
        const proxiedSrc = proxifyUrl(src);
        const img = await loadImage(proxiedSrc);
        setImage(img);

        // Apply auto-fit if enabled and artBounds are available
        if (autoFitArt && artBounds) {
          const { artX: newX, artY: newY, artZoom: newZoom, artRotate: newRotate } =
            calculateAutoFitArt(img, artBounds, card);

          if (artSlot === 'art1') {
            updateArtFn({ artSource: src, artX: newX, artY: newY, artZoom: newZoom, artRotate: newRotate });
          } else {
            updateArtFn({ artSource2: src, artX2: newX, artY2: newY, artZoom2: newZoom, artRotate2: newRotate });
          }
        } else {
          if (artSlot === 'art1') {
            updateArtFn({ artSource: src });
          } else {
            updateArtFn({ artSource2: src });
          }
        }

        setImageLoading(false);
        return img;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to load art';
        setError(errorMsg);
        setImageError(errorMsg);
        setImageLoading(false);
        // Fallback to blank image
        const blank = await loadImage('/img/blank.png');
        setImage(blank);
        if (artSlot === 'art1') {
          updateArtFn({ artSource: '/img/blank.png' });
        } else {
          updateArtFn({ artSource2: '/img/blank.png' });
        }
        return blank;
      } finally {
        setLoading(false);
      }
    },
    [loadImage, setArtImage, setArtImageLoading, setArtImageError, setArtImage2, setArtImageLoading2, setArtImageError2, updateArt, updateArt2, autoFitArt, loadedPack, card, proxifyUrl]
  );

  /**
   * Load set symbol image
   */
  const loadSetSymbol = useCallback(
    async (src: string) => {
      setLoading(true);
      setError(null);
      setSetSymbolImageLoading(true);
      setSetSymbolImageError(null);
      try {
        // Use CORS proxy for external URLs
        const proxiedSrc = proxifyUrl(src);
        const img = await loadImage(proxiedSrc);
        setSetSymbolImage(img);
        updateSetSymbol({ setSymbolSource: src });
        setSetSymbolImageLoading(false);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to load set symbol';
        setError(errorMsg);
        setSetSymbolImageError(errorMsg);
        setSetSymbolImageLoading(false);
        // Fallback to blank image
        const blank = await loadImage('/img/blank.png');
        setSetSymbolImage(blank);
        updateSetSymbol({ setSymbolSource: '/img/blank.png' });
      } finally {
        setLoading(false);
      }
    },
    [loadImage, setSetSymbolImage, setSetSymbolImageLoading, setSetSymbolImageError, updateSetSymbol, proxifyUrl]
  );

  /**
   * Load watermark image
   */
  const loadWatermark = useCallback(
    async (src: string) => {
      setLoading(true);
      setError(null);
      setWatermarkImageLoading(true);
      setWatermarkImageError(null);
      try {
        // Use CORS proxy for external URLs
        const proxiedSrc = proxifyUrl(src);
        const img = await loadImage(proxiedSrc);
        setWatermarkImage(img);

        // Apply auto-fit if watermarkBounds are available
        if (loadedPack?.watermarkBounds) {
          const { watermarkX, watermarkY, watermarkZoom } = calculateAutoFitWatermark(
            img,
            loadedPack.watermarkBounds,
            card
          );
          updateWatermark({
            watermarkSource: src,
            watermarkX,
            watermarkY,
            watermarkZoom,
          });
        } else {
          updateWatermark({ watermarkSource: src });
        }
        setWatermarkImageLoading(false);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to load watermark';
        setError(errorMsg);
        setWatermarkImageError(errorMsg);
        setWatermarkImageLoading(false);
        // Fallback to blank image
        const blank = await loadImage('/img/blank.png');
        setWatermarkImage(blank);
        updateWatermark({ watermarkSource: '/img/blank.png' });
      } finally {
        setLoading(false);
      }
    },
    [loadImage, setWatermarkImage, setWatermarkImageLoading, setWatermarkImageError, updateWatermark, proxifyUrl, loadedPack, card]
  );

  /**
   * Load Keyrune watermark with SVG cropping and auto-fit
   * Port from creator-23.js getSetSymbolWatermark function
   */
  const loadWatermarkFromKeyrune = useCallback(
    async (urlOrSetCode: string) => {
      setLoading(true);
      setError(null);
      setWatermarkImageLoading(true);
      setWatermarkImageError(null);
      try {
        // Crop SVG to bounding box
        const croppedDataUrl = await loadAndCropSVG(urlOrSetCode);

        // Load the cropped SVG as an image
        const img = await loadImage(croppedDataUrl);
        setWatermarkImage(img);

        // Apply auto-fit if watermarkBounds are available
        if (loadedPack?.watermarkBounds) {
          const { watermarkX, watermarkY, watermarkZoom } = calculateAutoFitWatermark(
            img,
            loadedPack.watermarkBounds,
            card
          );
          updateWatermark({
            watermarkSource: croppedDataUrl,
            watermarkX,
            watermarkY,
            watermarkZoom,
          });
        } else {
          updateWatermark({ watermarkSource: croppedDataUrl });
        }
        setWatermarkImageLoading(false);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to load Keyrune watermark';
        setError(errorMsg);
        setWatermarkImageError(errorMsg);
        setWatermarkImageLoading(false);
        // Fallback to blank image
        const blank = await loadImage('/img/blank.png');
        setWatermarkImage(blank);
        updateWatermark({ watermarkSource: '/img/blank.png' });
      } finally {
        setLoading(false);
      }
    },
    [loadImage, setWatermarkImage, setWatermarkImageLoading, setWatermarkImageError, updateWatermark, loadedPack, card]
  );

  /**
   * Load image from File object (drag-drop or file input)
   * @param file - File object
   * @param type - Type of media to load
   * @param artSlot - Which art slot to load into (only for 'art' type)
   */
  const loadFromFile = useCallback(
    async (file: File, type: 'art' | 'setSymbol' | 'watermark', artSlot: 'art1' | 'art2' = 'art1') => {
      setLoading(true);
      setError(null);
      try {
        const reader = new FileReader();
        const dataUrl = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        switch (type) {
          case 'art':
            await loadArt(dataUrl, artSlot);
            break;
          case 'setSymbol':
            await loadSetSymbol(dataUrl);
            break;
          case 'watermark':
            await loadWatermark(dataUrl);
            break;
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load file');
      } finally {
        setLoading(false);
      }
    },
    [loadArt, loadSetSymbol, loadWatermark]
  );

  /**
   * Load image from clipboard
   * @param type - Type of media to load
   * @param artSlot - Which art slot to load into (only for 'art' type)
   */
  const loadFromClipboard = useCallback(
    async (type: 'art' | 'setSymbol' | 'watermark', artSlot: 'art1' | 'art2' = 'art1') => {
      setLoading(true);
      setError(null);
      try {
        // Check if clipboard API is supported
        if (!navigator.clipboard || !navigator.clipboard.read) {
          throw new Error('Clipboard API not supported in this browser. Try using Chrome, Edge, or another modern browser.');
        }

        const clipboardItems = await navigator.clipboard.read();

        if (!clipboardItems || clipboardItems.length === 0) {
          throw new Error('Clipboard is empty. Copy an image first.');
        }

        for (const item of clipboardItems) {
          for (const mimeType of item.types) {
            if (mimeType.startsWith('image/')) {
              const blob = await item.getType(mimeType);
              const file = new File([blob], 'clipboard.png', { type: mimeType });
              await loadFromFile(file, type, artSlot);
              return;
            }
          }
        }
        throw new Error('No image found in clipboard. Make sure you copied an image (not a URL or text).');
      } catch (err) {
        // Handle permission denied errors
        if (err instanceof Error && err.name === 'NotAllowedError') {
          setError('Permission denied. Please allow clipboard access in your browser settings.');
        } else {
          setError(err instanceof Error ? err.message : 'Failed to load from clipboard');
        }
      } finally {
        setLoading(false);
      }
    },
    [loadFromFile]
  );

  return {
    loading,
    error,
    loadArt,
    loadSetSymbol,
    loadWatermark,
    loadWatermarkFromKeyrune,
    loadFromFile,
    loadFromClipboard,
  };
};
