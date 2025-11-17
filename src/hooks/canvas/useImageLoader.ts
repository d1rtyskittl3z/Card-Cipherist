/**
 * Image Loader Hook
 * Manages loading of core images used across canvas layers
 */

import { useEffect, useRef, useState } from 'react';
import { tryAsync, createError, ErrorType, logError } from '../../utils/errors';
import { IMAGE_LOAD_TIMEOUT_MS } from '../../constants';

export const useImageLoader = () => {
  const blackImageRef = useRef<HTMLImageElement | null>(null);
  const blankImageRef = useRef<HTMLImageElement | null>(null);
  const rightGradientMaskRef = useRef<HTMLImageElement | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  /**
   * Helper to load a single image with error handling
   */
  const loadImage = async (src: string): Promise<HTMLImageElement> => {
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.src = src;

    return new Promise((resolve, reject) => {
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));

      // Timeout after configured duration
      setTimeout(() => {
        reject(new Error(`Timeout loading image: ${src}`));
      }, IMAGE_LOAD_TIMEOUT_MS);
    });
  };

  /**
   * Load core images on mount
   */
  useEffect(() => {
    const loadCoreImages = async () => {
      const result = await tryAsync(async () => {
        // Load all images with error handling
        const [blackImg, blankImg, rightGradientImg] = await Promise.all([
          loadImage('/img/black.png'),
          loadImage('/img/blank.png'),
          loadImage('/img/frames/maskRightHalf.png'),
        ]);

        blackImageRef.current = blackImg;
        blankImageRef.current = blankImg;
        rightGradientMaskRef.current = rightGradientImg;
      }, ErrorType.IMAGE_LOAD_ERROR);

      if (result.success) {
        setImagesLoaded(true);
      } else {
        logError(
          createError(
            ErrorType.IMAGE_LOAD_ERROR,
            'Failed to load core images',
            result.error,
            false
          ),
          'useImageLoader'
        );
        setImagesLoaded(false);
        
        // In dev mode, show more details
        if (import.meta.env.DEV) {
          console.error('Core image loading failed. Please check that the following files exist:');
          console.error('- /img/black.png');
          console.error('- /img/blank.png');
          console.error('- /img/frames/maskRightHalf.png');
        }
      }
    };

    loadCoreImages();
  }, []);

  return {
    blackImage: blackImageRef.current,
    blankImage: blankImageRef.current,
    rightGradientMask: rightGradientMaskRef.current,
    imagesLoaded,
  };
};
