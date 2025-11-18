/**
 * useDebounce Hooks
 *
 * Custom debounce hooks for user input handling.
 * Delays expensive operations until user stops interacting.
 *
 * Benefits:
 * - Reduces unnecessary re-renders during rapid input
 * - Prevents laggy UI during typing/dragging
 * - Batches state updates for better performance
 */

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Debounce a value - returns the value after delay has passed without changes
 *
 * Use this for:
 * - Text input fields
 * - Number input fields
 * - Any input where you want to delay expensive operations
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 *
 * @example
 * ```typescript
 * const [searchQuery, setSearchQuery] = useState('');
 * const debouncedQuery = useDebounce(searchQuery, 500);
 *
 * useEffect(() => {
 *   // Only runs 500ms after user stops typing
 *   performExpensiveSearch(debouncedQuery);
 * }, [debouncedQuery]);
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up the timeout to update debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes before delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Debounce a callback function - delays execution until delay has passed without calls
 *
 * Use this for:
 * - Slider onChange handlers
 * - Color picker onChange handlers
 * - Any callback where you want to delay state updates
 *
 * @param callback - The function to debounce
 * @param delay - Delay in milliseconds (default: 150ms)
 *
 * @example
 * ```typescript
 * const updateArt = useMediaStore((state) => state.updateArt);
 * const debouncedUpdate = useDebouncedCallback(
 *   (val: number) => updateArt({ artX: val }),
 *   150
 * );
 *
 * // In render:
 * <LabeledInput
 *   label="X Position"
 *   type="number"
 *   value={artX}
 *   onChange={debouncedUpdate}
 * />
 * ```
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number = 150
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Create debounced function
  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

/**
 * Debounce a callback with immediate execution option
 *
 * Use this when you want:
 * - Immediate visual feedback (update local state)
 * - Delayed expensive operation (update store/trigger re-render)
 *
 * @param callback - The function to debounce
 * @param delay - Delay in milliseconds (default: 150ms)
 * @param immediate - Execute immediately on first call (default: false)
 *
 * @example
 * ```typescript
 * const [localValue, setLocalValue] = useState(artX);
 * const updateStore = useDebouncedCallbackImmediate(
 *   (val: number) => updateArt({ artX: val }),
 *   150,
 *   false
 * );
 *
 * const handleChange = (val: number) => {
 *   setLocalValue(val); // Immediate UI update
 *   updateStore(val);   // Debounced store update
 * };
 * ```
 */
export function useDebouncedCallbackImmediate<T extends (
  ...args: unknown[]
) => unknown>(
  callback: T,
  delay: number = 150,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Create debounced function with immediate option
  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      const callNow = immediate && !timeoutRef.current;

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Execute immediately if immediate mode and no pending timeout
      if (callNow) {
        callbackRef.current(...args);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        if (!callNow) {
          callbackRef.current(...args);
        }
        timeoutRef.current = null;
      }, delay);
    },
    [delay, immediate]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}
