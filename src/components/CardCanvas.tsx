/**
 * CardCanvas Component
 * Main canvas display for card preview
 */

import { Box } from '@chakra-ui/react';
import { useCanvasRender } from '../hooks/useCanvasRender';
import { useCardStore } from '../store/cardStore';
import { useEffect } from 'react';
import { useStationManager } from '../hooks/useStationManager';

export const CardCanvas = () => {
  const { previewRef, render } = useCanvasRender();
  const showTransparencies = useCardStore((state) => state.showTransparencies);
  const setPreviewCanvasRef = useCardStore((state) => state.setPreviewCanvasRef);
  useStationManager();
  // CARD SIZE CONFIGURATION:
  // Height: 800px (modify this value to change card height)
  // Width: Calculated as height / 1.4 (aspect ratio 1.4:1 height to width; this is the aspect ratio of MTG Cards.)
  // Formula: width = height / 1.4
  const HEIGHT = 800;
  const ASPECT_RATIO = 1.4; // 

  useEffect(() => {
    // Initial render
    render();
  }, [render]);

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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={8}
    >
      <canvas
        ref={previewRef}
        style={getCanvasStyle()}
      />
    </Box>
  );
};
