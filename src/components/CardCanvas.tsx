/**
 * CardCanvas Component
 * Main canvas display for card preview
 * Now uses CanvasProvider to eliminate prop drilling in rendering hooks
 */

import { Box } from '@chakra-ui/react';
import { useCardStore } from '../store/cardStore';
import { useEffect, useRef } from 'react';
import { useStationManager } from '../hooks/useStationManager';
import { PerformanceProfiler } from './PerformanceProfiler';
import { CanvasProvider } from '../contexts/CanvasProvider';
import { useCanvasManager } from '../hooks/canvas/useCanvasManager';
import { CardCanvasRenderer } from './CardCanvasRenderer';

export const CardCanvas = () => {
  const showTransparencies = useCardStore((state) => state.showTransparencies);
  const setPreviewCanvasRef = useCardStore((state) => state.setPreviewCanvasRef);
  const previewRef = useRef<HTMLCanvasElement>(null);

  // Initialize canvas manager (provides refs for context)
  const { canvasRefs, contextRefs, canvasesReady } = useCanvasManager();

  useStationManager();

  // CARD SIZE CONFIGURATION:
  // Height: 800px (modify this value to change card height)
  // Width: Calculated as height / 1.4 (aspect ratio 1.4:1 height to width; this is the aspect ratio of MTG Cards.)
  // Formula: width = height / 1.4
  const HEIGHT = 800;
  const ASPECT_RATIO = 1.4;

  // Set canvas ref in store when available
  useEffect(() => {
    if (previewRef.current) {
      setPreviewCanvasRef(previewRef.current);
    }
    return () => {
      setPreviewCanvasRef(null);
    };
  }, [previewRef, setPreviewCanvasRef]);

  // Checkerboard pattern background style for showing transparencies
  const getCanvasStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      height: `${HEIGHT}px`,
      width: `${HEIGHT / ASPECT_RATIO}px`,
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      border: '2px solid rgba(255, 255, 255, 0.15)',
      objectFit: 'contain',
    };

    if (showTransparencies) {
      // Checkerboard pattern using CSS background
      return {
        ...baseStyle,
        backgroundImage: `
          linear-gradient(45deg, #808080 25%, transparent 25%),
          linear-gradient(-45deg, #808080 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #808080 75%),
          linear-gradient(-45deg, transparent 75%, #808080 75%)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
        backgroundColor: '#404040',
      };
    }

    return {
      ...baseStyle,
      backgroundColor: 'transparent',
    };
  };

  return (
    <PerformanceProfiler id="CardCanvas">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={8}
      >
        {/* Wrap rendering logic with CanvasProvider to eliminate prop drilling */}
        <CanvasProvider value={{ canvasRefs, contextRefs, canvasesReady }}>
          <CardCanvasRenderer previewRef={previewRef} />
        </CanvasProvider>

        <canvas
          ref={previewRef}
          style={getCanvasStyle()}
        />
      </Box>
    </PerformanceProfiler>
  );
};
