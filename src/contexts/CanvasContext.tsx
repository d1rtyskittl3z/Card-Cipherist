/**
 * Canvas Context Provider
 * Provides canvas references to all rendering hooks via React Context
 * Eliminates prop drilling of canvasRefs and contextRefs through multiple hook layers
 */

import { createContext, useContext, type ReactNode } from 'react';
import type { CanvasRefs, CanvasContextRefs } from '../types/card.types';

/**
 * Canvas context value type
 */
interface CanvasContextValue {
  canvasRefs: Partial<CanvasRefs>;
  contextRefs: Partial<CanvasContextRefs>;
  canvasesReady: boolean;
}

/**
 * Canvas context - provides canvas refs to child components/hooks
 */
const CanvasContext = createContext<CanvasContextValue | null>(null);

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

/**
 * Hook to access canvas context
 * Throws an error if used outside of CanvasProvider
 *
 * @returns Canvas references and ready state
 * @throws Error if used outside CanvasProvider
 */
export const useCanvasContext = (): CanvasContextValue => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error('useCanvasContext must be used within CanvasProvider');
  }
  return context;
};
