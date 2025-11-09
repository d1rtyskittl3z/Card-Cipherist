/**
 * Custom Hook: Image Loader
 * Handles image loading with crossOrigin support and error handling
 */

import { useState, useCallback } from 'react';
import { useCardStore } from '../store/cardStore';
import { calculateAutoFitArt, calculateAutoFitWatermark } from '../utils/canvasHelpers';
import { loadAndCropSVG } from '../utils/svgCropper';

export const useImageLoader = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const card = useCardStore((state) => state.card);
  const loadedPack = useCardStore((state) => state.loadedPack);
  const autoFitArt = useCardStore((state) => state.autoFitArt);
  const setArtImage = useCardStore((state) => state.setArtImage);
  const setSetSymbolImage = useCardStore((state) => state.setSetSymbolImage);
  const setWatermarkImage = useCardStore((state) => state.setWatermarkImage);
  const updateArt = useCardStore((state) => state.updateArt);
  const updateSetSymbol = useCardStore((state) => state.updateSetSymbol);
  const updateWatermark = useCardStore((state) => state.updateWatermark);

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
   */
  const loadArt = useCallback(
    async (src: string): Promise<HTMLImageElement> => {
      setLoading(true);
      setError(null);
      try {
        // Use CORS proxy for external URLs
        const proxiedSrc = proxifyUrl(src);
        const img = await loadImage(proxiedSrc);
        setArtImage(img);
        
        // Apply auto-fit if enabled and artBounds are available
        if (autoFitArt && loadedPack?.artBounds) {
          const { artX, artY, artZoom } = calculateAutoFitArt(img, loadedPack.artBounds, card);
          updateArt({ artSource: src, artX, artY, artZoom, artRotate: 0 });
        } else {
          updateArt({ artSource: src });
        }
        
        return img;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load art');
        // Fallback to blank image
        const blank = await loadImage('/img/blank.png');
        setArtImage(blank);
        updateArt({ artSource: '/img/blank.png' });
        return blank;
      } finally {
        setLoading(false);
      }
    },
    [loadImage, setArtImage, updateArt, autoFitArt, loadedPack, card, proxifyUrl]
  );

  /**
   * Load set symbol image
   */
  const loadSetSymbol = useCallback(
    async (src: string) => {
      setLoading(true);
      setError(null);
      try {
        // Use CORS proxy for external URLs
        const proxiedSrc = proxifyUrl(src);
        const img = await loadImage(proxiedSrc);
        setSetSymbolImage(img);
        updateSetSymbol({ setSymbolSource: src });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load set symbol');
        // Fallback to blank image
        const blank = await loadImage('/img/blank.png');
        setSetSymbolImage(blank);
        updateSetSymbol({ setSymbolSource: '/img/blank.png' });
      } finally {
        setLoading(false);
      }
    },
    [loadImage, setSetSymbolImage, updateSetSymbol, proxifyUrl]
  );

  /**
   * Load watermark image
   */
  const loadWatermark = useCallback(
    async (src: string) => {
      setLoading(true);
      setError(null);
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
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load watermark');
        // Fallback to blank image
        const blank = await loadImage('/img/blank.png');
        setWatermarkImage(blank);
        updateWatermark({ watermarkSource: '/img/blank.png' });
      } finally {
        setLoading(false);
      }
    },
    [loadImage, setWatermarkImage, updateWatermark, proxifyUrl, loadedPack, card]
  );

  /**
   * Load Keyrune watermark with SVG cropping and auto-fit
   * Port from creator-23.js getSetSymbolWatermark function
   */
  const loadWatermarkFromKeyrune = useCallback(
    async (urlOrSetCode: string) => {
      setLoading(true);
      setError(null);
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
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load Keyrune watermark');
        // Fallback to blank image
        const blank = await loadImage('/img/blank.png');
        setWatermarkImage(blank);
        updateWatermark({ watermarkSource: '/img/blank.png' });
      } finally {
        setLoading(false);
      }
    },
    [loadImage, setWatermarkImage, updateWatermark, loadedPack, card]
  );

  /**
   * Load image from File object (drag-drop or file input)
   */
  const loadFromFile = useCallback(
    async (file: File, type: 'art' | 'setSymbol' | 'watermark') => {
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
            await loadArt(dataUrl);
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
   */
  const loadFromClipboard = useCallback(
    async (type: 'art' | 'setSymbol' | 'watermark') => {
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
              await loadFromFile(file, type);
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
