import { useContext } from 'react';
import { CanvasContext, type CanvasContextValue } from './canvasContext';

/**
 * Hook to access canvas context
 * Throws an error if used outside of CanvasProvider
 */
export const useCanvasContext = (): CanvasContextValue => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error('useCanvasContext must be used within CanvasProvider');
  }
  return context;
};
