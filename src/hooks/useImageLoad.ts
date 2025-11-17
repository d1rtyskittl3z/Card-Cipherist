/**
 * Reusable Image Loading Hook
 * Handles async image loading with loading and error states
 */

import { useState, useEffect } from 'react';

/**
 * Result of image loading operation
 */
export interface ImageLoadResult {
  /** Loaded image element (null if not loaded or error) */
  image: HTMLImageElement | null;
  /** Whether the image is currently loading */
  isLoading: boolean;
  /** Error if load failed (null if no error) */
  error: Error | null;
}

/**
 * Hook to load an image with loading and error states
 *
 * @param src - Image source URL (null to clear)
 * @returns Image load result with image, loading, and error states
 *
 * @example
 * ```typescript
 * const { image, isLoading, error } = useImageLoad('/path/to/image.png');
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <Text>Error: {error.message}</Text>;
 * if (image) return <canvas>...</canvas>;
 * ```
 */
export const useImageLoad = (src: string | null): ImageLoadResult => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Clear state if no source provided
    if (!src) {
      setImage(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    // Start loading
    setIsLoading(true);
    setError(null);

    // Create image element
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Required for canvas export

    // Handle successful load
    img.onload = () => {
      setImage(img);
      setIsLoading(false);
    };

    // Handle load error
    img.onerror = () => {
      setError(new Error(`Failed to load image: ${src}`));
      setIsLoading(false);
      setImage(null);
    };

    // Start loading
    img.src = src;

    // Cleanup on unmount or src change
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { image, isLoading, error };
};
