/**
 * Canvas Context Provider
 * Provides canvas references to all rendering hooks via React Context
 * Eliminates prop drilling of canvasRefs and contextRefs through multiple hook layers
 */

import type { ReactNode } from 'react';
import { CanvasContext, type CanvasContextValue } from './canvasContext';

/**
 * Canvas context provider props
 */
interface CanvasProviderProps {
  value: CanvasContextValue;
  children: ReactNode;
}

/**
 * Canvas context provider component
 * Wraps rendering logic to provide canvas references to all child hooks
 */
export const CanvasProvider: React.FC<CanvasProviderProps> = ({ value, children }) => {
  return <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>;
};
