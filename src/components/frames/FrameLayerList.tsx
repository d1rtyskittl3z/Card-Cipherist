/**
 * Frame Layer List Component
 * Displays and manages the list of frame layers with drag-and-drop reordering
 */

import { Box, HStack, Image, IconButton } from '@chakra-ui/react';
import { useCardStore } from '../../store/cardStore';
import { getThumbnailPath } from './packs/types';
import { useState } from 'react';

export const FrameLayerList = () => {
  const frames = useCardStore((state) => state.card.frames);
  const removeFrame = useCardStore((state) => state.removeFrame);
  const reorderFrames = useCardStore((state) => state.reorderFrames);
  const toggleFrameVisibility = useCardStore((state) => state.toggleFrameVisibility);
  const openFrameEditor = useCardStore((state) => state.openFrameEditor);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      reorderFrames(draggedIndex, index);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  if (frames.length === 0) {
    return null;
  }

  return (
    <Box>
      {[...frames].reverse().map((frame, reverseIndex) => {
        // Calculate actual index in the original array
        const index = frames.length - 1 - reverseIndex;
        const isDragging = draggedIndex === index;
        const isDragOver = dragOverIndex === index;

        return (
          <Box
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={() => handleDrop(index)}
            onDragEnd={handleDragEnd}
            onDoubleClick={() => openFrameEditor(index)}
            bg={isDragOver ? 'rgba(66, 153, 225, 0.2)' : 'rgba(26, 32, 44, 0.8)'}
            borderRadius="md"
            p={2}
            mb={2}
            opacity={isDragging ? 0.5 : 1}
            cursor="grab"
            _active={{ cursor: 'grabbing' }}
            border="1px solid"
            borderColor={isDragOver ? 'blue.400' : 'gray.700'}
            transition="all 0.2s"
          >
            <HStack justify="space-between" align="center">
              {/* Left side: Frame and Mask thumbnails */}
              <HStack gap={2} flex="1">
                {/* Frame thumbnail */}
                <Box
                  w="48px"
                  h="48px"
                  borderRadius="md"
                  overflow="hidden"
                  border="1px solid"
                  borderColor="gray.600"
                  flexShrink={0}
                >
                  <Image
                    src={getThumbnailPath(frame.src)}
                    alt={frame.name}
                    w="full"
                    h="full"
                    objectFit="cover"
                  />
                </Box>

                {/* Mask thumbnail - show first mask if available */}
                {frame.masks && frame.masks.length > 0 && (
                  <Box
                    w="48px"
                    h="48px"
                    borderRadius="md"
                    overflow="hidden"
                    border="1px solid"
                    borderColor="gray.600"
                    flexShrink={0}
                  >
                    <Image
                      src={getThumbnailPath(frame.masks[0].src)}
                      alt={frame.masks[0].name}
                      w="full"
                      h="full"
                      objectFit="cover"
                    />
                  </Box>
                )}

                {/* Layer name */}
                <Box
                  fontSize="sm"
                  fontWeight="medium"
                  color="gray.200"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {frame.name}
                </Box>
              </HStack>

              {/* Right side: Action buttons */}
              <HStack gap={1} flexShrink={0}>
                {/* Hide/Show button */}
                <IconButton
                  size="sm"
                  variant="ghost"
                  aria-label="Toggle visibility"
                  color={frame.visible !== false ? 'gray.400' : 'gray.600'}
                  _hover={{ color: 'gray.200', bg: 'rgba(255, 255, 255, 0.1)' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFrameVisibility(index);
                  }}
                >
                  {frame.visible !== false ? (
                    // Eye icon (visible)
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    // Eye-slash icon (hidden)
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </IconButton>

                {/* Edit button */}
                <IconButton
                  size="sm"
                  variant="ghost"
                  aria-label="Edit layer"
                  color="gray.400"
                  _hover={{ color: 'gray.200', bg: 'rgba(255, 255, 255, 0.1)' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    openFrameEditor(index);
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </IconButton>

                {/* Delete button */}
                <IconButton
                  size="sm"
                  variant="ghost"
                  aria-label="Delete layer"
                  color="red.400"
                  _hover={{ color: 'red.300', bg: 'rgba(255, 0, 0, 0.1)' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFrame(index);
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </IconButton>
              </HStack>
            </HStack>
          </Box>
        );
      })}
    </Box>
  );
};
