import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useImageLoader } from '../useImageLoader';

describe('useImageLoader', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useImageLoader());
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  // Note: Full image loading tests require more complex mocking
  // This is a placeholder for the testing pattern
});
