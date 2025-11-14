import { describe, it, expect } from 'vitest';
import { scaleX, scaleY, scaleWidth, scaleHeight } from '../canvasHelpers';
import type { Card } from '../../types/card.types';

describe('canvasHelpers', () => {
  const mockCard: Partial<Card> = {
    width: 2010,
    height: 2814,
    marginX: 0,
    marginY: 0,
  };

  describe('scaleX', () => {
    it('should scale normalized X coordinate to pixels', () => {
      const result = scaleX(mockCard as Card, 0.5);
      expect(result).toBe(1005); // 0.5 * 2010
    });

    it('should handle margin offset', () => {
      const cardWithMargin = { ...mockCard, marginX: 0.1 };
      const result = scaleX(cardWithMargin as Card, 0.5);
      expect(result).toBe(1206); // (0.5 + 0.1) * 2010
    });

    it('should handle zero coordinates', () => {
      const result = scaleX(mockCard as Card, 0);
      expect(result).toBe(0);
    });
  });

  describe('scaleY', () => {
    it('should scale normalized Y coordinate to pixels', () => {
      const result = scaleY(mockCard as Card, 0.5);
      expect(result).toBe(1407); // 0.5 * 2814
    });

    it('should handle margin offset', () => {
      const cardWithMargin = { ...mockCard, marginY: 0.1 };
      const result = scaleY(cardWithMargin as Card, 0.5);
      expect(result).toBe(1688.4); // (0.5 + 0.1) * 2814
    });
  });

  describe('scaleWidth', () => {
    it('should scale normalized width to pixels', () => {
      const result = scaleWidth(mockCard as Card, 0.8);
      expect(result).toBe(1608); // 0.8 * 2010
    });

    it('should not apply margin to width', () => {
      const cardWithMargin = { ...mockCard, marginX: 0.1 };
      const result = scaleWidth(cardWithMargin as Card, 0.8);
      expect(result).toBe(1608); // Still 0.8 * 2010
    });
  });

  describe('scaleHeight', () => {
    it('should scale normalized height to pixels', () => {
      const result = scaleHeight(mockCard as Card, 0.6);
      expect(result).toBe(1688.4); // 0.6 * 2814
    });
  });
});
