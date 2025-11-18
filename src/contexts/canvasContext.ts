import { createContext } from 'react';
import type { CanvasRefs, CanvasContextRefs } from '../types/card.types';

export interface CanvasContextValue {
  canvasRefs: Partial<CanvasRefs>;
  contextRefs: Partial<CanvasContextRefs>;
  canvasesReady: boolean;
}

export const CanvasContext = createContext<CanvasContextValue | null>(null);
