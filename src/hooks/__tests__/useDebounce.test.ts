/**
 * useDebounce Hooks Test Suite
 *
 * Tests all three debounce hook variants:
 * 1. useDebounce - Debounces a value
 * 2. useDebouncedCallback - Debounces a callback function
 * 3. useDebouncedCallbackImmediate - Debounces with immediate option
 *
 * Coverage:
 * - Value debouncing with different delays
 * - Callback debouncing with argument passing
 * - Immediate execution mode
 * - Cleanup on unmount
 * - Rapid value changes (stress test)
 */

import { renderHook, act, waitFor } from '@testing-library/react';
import {
  useDebounce,
  useDebouncedCallback,
  useDebouncedCallbackImmediate,
} from '../useDebounce';

// Mock timers for precise control
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.clearAllTimers();
});

describe('useDebounce', () => {
  describe('Basic Functionality', () => {
    it('should return initial value immediately', () => {
      const { result } = renderHook(() => useDebounce('initial', 300));
      expect(result.current).toBe('initial');
    });

    it('should debounce value changes with default delay', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 'initial' } }
      );

      // Initial value
      expect(result.current).toBe('initial');

      // Update value
      rerender({ value: 'updated' });

      // Value should not update immediately
      expect(result.current).toBe('initial');

      // Fast-forward time by 300ms
      act(() => {
        vi.advanceTimersByTime(300);
      });

      // Value should now be updated
      expect(result.current).toBe('updated');
    });

    it('should debounce value changes with custom delay', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 500),
        { initialProps: { value: 'initial' } }
      );

      rerender({ value: 'updated' });
      expect(result.current).toBe('initial');

      // Fast-forward by 499ms - not enough
      act(() => {
        vi.advanceTimersByTime(499);
      });
      expect(result.current).toBe('initial');

      // Fast-forward by 1ms more - total 500ms
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(result.current).toBe('updated');
    });

    it('should work with different value types', () => {
      // Number
      const { result: numberResult, rerender: numberRerender } = renderHook(
        ({ value }) => useDebounce(value, 100),
        { initialProps: { value: 0 } }
      );

      numberRerender({ value: 42 });
      act(() => vi.advanceTimersByTime(100));
      expect(numberResult.current).toBe(42);

      // Boolean
      const { result: boolResult, rerender: boolRerender } = renderHook(
        ({ value }) => useDebounce(value, 100),
        { initialProps: { value: false } }
      );

      boolRerender({ value: true });
      act(() => vi.advanceTimersByTime(100));
      expect(boolResult.current).toBe(true);

      // Object
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const { result: objResult, rerender: objRerender } = renderHook(
        ({ value }) => useDebounce(value, 100),
        { initialProps: { value: obj1 } }
      );

      objRerender({ value: obj2 });
      act(() => vi.advanceTimersByTime(100));
      expect(objResult.current).toBe(obj2);
    });
  });

  describe('Rapid Changes', () => {
    it('should cancel previous timeout on rapid changes', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 'initial' } }
      );

      // Rapid updates
      rerender({ value: 'update1' });
      act(() => vi.advanceTimersByTime(100));
      expect(result.current).toBe('initial'); // No change yet

      rerender({ value: 'update2' });
      act(() => vi.advanceTimersByTime(100));
      expect(result.current).toBe('initial'); // Still no change

      rerender({ value: 'final' });
      act(() => vi.advanceTimersByTime(100));
      expect(result.current).toBe('initial'); // Still no change

      // Now wait full delay from last update
      act(() => vi.advanceTimersByTime(200));
      expect(result.current).toBe('final'); // Only final value applied
    });

    it('should handle many rapid changes efficiently', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 0 } }
      );

      // Simulate 100 rapid updates
      for (let i = 1; i <= 100; i++) {
        rerender({ value: i });
        act(() => vi.advanceTimersByTime(10)); // 10ms between updates
      }

      // Should still be at initial value
      expect(result.current).toBe(0);

      // Wait for debounce delay
      act(() => vi.advanceTimersByTime(300));

      // Should jump to final value, skipping intermediate values
      expect(result.current).toBe(100);
    });
  });

  describe('Cleanup', () => {
    it('should cleanup timeout on unmount', () => {
      const { result, rerender, unmount } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 'initial' } }
      );

      rerender({ value: 'updated' });

      // Unmount before timeout completes
      unmount();

      // Advance timers - should not throw error
      act(() => {
        vi.advanceTimersByTime(300);
      });

      // No assertion needed - just ensuring no errors thrown
    });

    it('should handle multiple mount/unmount cycles', () => {
      for (let i = 0; i < 5; i++) {
        const { unmount } = renderHook(() => useDebounce('value', 300));
        unmount();
      }

      // Should not leak timers or throw errors
      expect(vi.getTimerCount()).toBe(0);
    });
  });
});

describe('useDebouncedCallback', () => {
  describe('Basic Functionality', () => {
    it('should debounce callback execution', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useDebouncedCallback(callback, 150));

      // Call debounced function
      act(() => {
        result.current('test');
      });

      // Callback should not execute immediately
      expect(callback).not.toHaveBeenCalled();

      // Fast-forward timers
      act(() => {
        vi.advanceTimersByTime(150);
      });

      // Callback should now be called
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('test');
    });

    it('should use default delay of 150ms', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useDebouncedCallback(callback));

      act(() => result.current());

      act(() => vi.advanceTimersByTime(149));
      expect(callback).not.toHaveBeenCalled();

      act(() => vi.advanceTimersByTime(1));
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should pass multiple arguments correctly', () => {
      const callback = vi.fn();
      const { result } = renderHook(() =>
        useDebouncedCallback(callback, 100)
      );

      act(() => {
        result.current('arg1', 42, { key: 'value' }, true);
      });

      act(() => vi.advanceTimersByTime(100));

      expect(callback).toHaveBeenCalledWith('arg1', 42, { key: 'value' }, true);
    });

    it('should update callback ref when callback changes', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      const { result, rerender } = renderHook(
        ({ cb }) => useDebouncedCallback(cb, 100),
        { initialProps: { cb: callback1 } }
      );

      // Call with first callback
      act(() => result.current('test'));

      // Change callback before timeout
      rerender({ cb: callback2 });

      // Fast-forward
      act(() => vi.advanceTimersByTime(100));

      // New callback should be called, not old one
      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).toHaveBeenCalledWith('test');
    });
  });

  describe('Rapid Calls', () => {
    it('should cancel previous timeout on rapid calls', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useDebouncedCallback(callback, 150));

      // Rapid calls
      act(() => {
        result.current('call1');
      });
      act(() => vi.advanceTimersByTime(50));

      act(() => {
        result.current('call2');
      });
      act(() => vi.advanceTimersByTime(50));

      act(() => {
        result.current('call3');
      });

      // Wait for final timeout
      act(() => vi.advanceTimersByTime(150));

      // Should only execute once with final arguments
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('call3');
    });

    it('should handle slider-like rapid updates', () => {
      const updateStore = vi.fn();
      const { result } = renderHook(() =>
        useDebouncedCallback(updateStore, 150)
      );

      // Simulate slider dragging (50 updates over 500ms)
      for (let i = 0; i <= 50; i++) {
        act(() => {
          result.current(i);
          vi.advanceTimersByTime(10);
        });
      }

      // Should not have called yet (each call resets timer)
      expect(updateStore).not.toHaveBeenCalled();

      // Wait for final debounce
      act(() => vi.advanceTimersByTime(150));

      // Should only call once with final value
      expect(updateStore).toHaveBeenCalledTimes(1);
      expect(updateStore).toHaveBeenCalledWith(50);
    });
  });

  describe('Cleanup', () => {
    it('should cleanup timeout on unmount', () => {
      const callback = vi.fn();
      const { result, unmount } = renderHook(() =>
        useDebouncedCallback(callback, 150)
      );

      act(() => result.current('test'));

      // Unmount before timeout
      unmount();

      // Advance timers
      act(() => vi.advanceTimersByTime(150));

      // Callback should not be called after unmount
      expect(callback).not.toHaveBeenCalled();
    });
  });
});

describe('useDebouncedCallbackImmediate', () => {
  describe('Immediate Mode Disabled', () => {
    it('should behave like regular debounce when immediate is false', () => {
      const callback = vi.fn();
      const { result } = renderHook(() =>
        useDebouncedCallbackImmediate(callback, 150, false)
      );

      act(() => result.current('test'));

      // Should not execute immediately
      expect(callback).not.toHaveBeenCalled();

      act(() => vi.advanceTimersByTime(150));

      // Should execute after delay
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('test');
    });

    it('should use default immediate value of false', () => {
      const callback = vi.fn();
      const { result } = renderHook(() =>
        useDebouncedCallbackImmediate(callback, 150)
      );

      act(() => result.current('test'));

      expect(callback).not.toHaveBeenCalled();

      act(() => vi.advanceTimersByTime(150));

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('Immediate Mode Enabled', () => {
    it('should execute immediately on first call', () => {
      const callback = vi.fn();
      const { result } = renderHook(() =>
        useDebouncedCallbackImmediate(callback, 150, true)
      );

      act(() => result.current('first'));

      // Should execute immediately
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('first');

      // Fast-forward - should not execute again
      act(() => vi.advanceTimersByTime(150));

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not execute immediately on subsequent rapid calls', () => {
      const callback = vi.fn();
      const { result } = renderHook(() =>
        useDebouncedCallbackImmediate(callback, 150, true)
      );

      // First call - executes immediately
      act(() => result.current('first'));
      expect(callback).toHaveBeenCalledTimes(1);

      // Rapid subsequent calls - should not execute
      act(() => {
        result.current('second');
        vi.advanceTimersByTime(50);
      });

      act(() => {
        result.current('third');
        vi.advanceTimersByTime(50);
      });

      expect(callback).toHaveBeenCalledTimes(1);

      // Wait for final timeout
      act(() => vi.advanceTimersByTime(150));

      // Should execute with final arguments
      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenNthCalledWith(1, 'first');
      expect(callback).toHaveBeenNthCalledWith(2, 'third');
    });

    it('should execute immediately again after timeout completes', () => {
      const callback = vi.fn();
      const { result } = renderHook(() =>
        useDebouncedCallbackImmediate(callback, 150, true)
      );

      // First call
      act(() => result.current('first'));
      expect(callback).toHaveBeenCalledTimes(1);

      // Wait for timeout to complete
      act(() => vi.advanceTimersByTime(150));

      // Second call after timeout - should execute immediately
      act(() => result.current('second'));
      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenNthCalledWith(2, 'second');
    });
  });

  describe('Cleanup', () => {
    it('should cleanup timeout on unmount with immediate mode', () => {
      const callback = vi.fn();
      const { result, unmount } = renderHook(() =>
        useDebouncedCallbackImmediate(callback, 150, true)
      );

      act(() => result.current('first'));
      expect(callback).toHaveBeenCalledTimes(1);

      act(() => result.current('second'));

      // Unmount before timeout
      unmount();

      act(() => vi.advanceTimersByTime(150));

      // Should still be 1 (second call prevented by unmount)
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('Callback Ref Updates', () => {
    it('should use latest callback in immediate mode', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      const { result, rerender } = renderHook(
        ({ cb }) => useDebouncedCallbackImmediate(cb, 150, true),
        { initialProps: { cb: callback1 } }
      );

      // First call with callback1 - executes immediately
      act(() => result.current('test'));
      expect(callback1).toHaveBeenCalledWith('test');

      // Change callback
      rerender({ cb: callback2 });

      // Wait for timeout
      act(() => vi.advanceTimersByTime(150));

      // Second call should use new callback and execute immediately
      act(() => result.current('test2'));
      expect(callback2).toHaveBeenCalledWith('test2');
      expect(callback1).toHaveBeenCalledTimes(1); // Still only called once
    });
  });
});

describe('Edge Cases', () => {
  it('should handle zero delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 0),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'updated' });

    act(() => vi.advanceTimersByTime(0));

    expect(result.current).toBe('updated');
  });

  it('should handle very large delay', () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, 10000)
    );

    act(() => result.current('test'));

    act(() => vi.advanceTimersByTime(9999));
    expect(callback).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(1));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should handle null/undefined values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 100),
      { initialProps: { value: null as string | null } }
    );

    expect(result.current).toBeNull();

    rerender({ value: undefined as any });
    act(() => vi.advanceTimersByTime(100));

    expect(result.current).toBeUndefined();

    rerender({ value: 'value' });
    act(() => vi.advanceTimersByTime(100));

    expect(result.current).toBe('value');
  });
});
