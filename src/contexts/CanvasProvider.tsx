/**
 * Canvas Context Provider
 * Wraps rendering logic to provide canvas references to all child hooks.
 */

import type { ReactNode } from 'react';
import { CanvasContext, type CanvasContextValue } from './canvasContext';

interface CanvasProviderProps {
  value: CanvasContextValue;
  children: ReactNode;
}

export const CanvasProvider: React.FC<CanvasProviderProps> = ({ value, children }) => {
  return <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>;
};
