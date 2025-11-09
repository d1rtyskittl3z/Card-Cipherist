/**
 * useCanvasDrag Hook
 * Handles canvas drag-to-move and shift/ctrl drag-to-zoom/rotate functionality
 */

import { useEffect, useRef } from 'react';

interface UseCanvasDragOptions {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  enabled: boolean;
  mode: 'setSymbol' | 'art';
  onPositionChange: (x: number, y: number) => void;
  onZoomChange: (zoom: number) => void;
  onRotateChange?: (rotation: number) => void;
  getCurrentPosition: () => { x: number; y: number; zoom: number; rotation?: number };
}

export const useCanvasDrag = ({
  canvasRef,
  enabled,
  mode,
  onPositionChange,
  onZoomChange,
  onRotateChange,
  getCurrentPosition,
}: UseCanvasDragOptions) => {
  const isDragging = useRef(false);
  const isSelected = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !enabled) return;

    const handleMouseDown = (e: MouseEvent) => {
      // Click on canvas to select
      isSelected.current = true;
      isDragging.current = true;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !isSelected.current) return;

      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;

      const current = getCurrentPosition();

      // Shift key: Zoom (vertical movement only)
      if (e.shiftKey) {
        const zoomDelta = -deltaY * 0.01; // negative because up = zoom in
        const newZoom = Math.max(0.1, Math.min(5, current.zoom + zoomDelta));
        onZoomChange(newZoom);
      }
      // Ctrl key (art mode only): Rotate
      else if (e.ctrlKey && mode === 'art' && onRotateChange && current.rotation !== undefined) {
        const rotateDelta = deltaY * 0.5; // 0.5 degrees per pixel
        const newRotation = current.rotation + rotateDelta;
        onRotateChange(newRotation);
      }
      // Default: Move position
      else {
        const newX = current.x + deltaX;
        const newY = current.y + deltaY;
        onPositionChange(newX, newY);
      }

      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleMouseLeave = () => {
      isDragging.current = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled, mode, canvasRef, onPositionChange, onZoomChange, onRotateChange, getCurrentPosition]);

  // Reset selection when disabled
  useEffect(() => {
    if (!enabled) {
      isSelected.current = false;
      isDragging.current = false;
    }
  }, [enabled]);
};
