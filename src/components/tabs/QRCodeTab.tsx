/**
 * QR Code Tab Component
 * Controls for QR code generation on deck cover cards
 */

import { memo, useRef, useCallback, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { QRCodeCanvas } from 'qrcode.react';
import { useCardStore } from '../../store/cardStore';
import { useMediaStore } from '../../store/mediaStore';
import { useQRCodeUrl, useIsQRCodeCard, useCardWidth } from '../../store/selectors';
import { useLoadedPack } from '../../store/selectors';
import { LabeledInput } from '../ui';

const QRCodeTabComponent = () => {
  const qrCodeUrl = useQRCodeUrl();
  const isQRCodeCard = useIsQRCodeCard();
  const loadedPack = useLoadedPack();
  const cardWidth = useCardWidth();
  const setQRCodeUrl = useCardStore((state) => state.setQRCodeUrl);
  const setQRCodeSourceCanvas = useMediaStore((state) => state.setQRCodeSourceCanvas);
  
  // Ref to the container div that holds the QRCodeCanvas
  const qrContainerRef = useRef<HTMLDivElement>(null);
  
  // Get QR code config from pack or use defaults - memoized to prevent unnecessary re-renders
  const qrConfig = useMemo(() => loadedPack?.qrCode ?? {
    x: 0.36,
    y: 0.73,
    size: 0.20,
    fgColor: '#fff',
    bgColor: '#000',
    bgAlpha: 0,
  }, [loadedPack?.qrCode]);

  // Calculate the actual render size for the QR code based on card dimensions
  // Generate at full resolution to avoid blurriness when drawn to the card canvas
  const qrRenderSize = useMemo(() => {
    const targetSize = Math.round(qrConfig.size * cardWidth);
    // Ensure minimum size of 128 for preview, but use actual card size for rendering
    return Math.max(targetSize, 128);
  }, [qrConfig.size, cardWidth]);

  // Update the source canvas in mediaStore when QR code changes
  // This allows the render pipeline to draw the QR code to the offscreen canvas
  useEffect(() => {
    // Small delay to ensure QRCodeCanvas has rendered
    const timeout = setTimeout(() => {
      if (qrCodeUrl && qrContainerRef.current) {
        // Find the canvas element inside the container
        const canvas = qrContainerRef.current.querySelector('canvas');
        if (canvas) {
          setQRCodeSourceCanvas(canvas);
        } else {
          setQRCodeSourceCanvas(null);
        }
      } else {
        setQRCodeSourceCanvas(null);
      }
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [qrCodeUrl, setQRCodeSourceCanvas, qrConfig, qrRenderSize]);

  // Handle URL change
  const handleUrlChange = useCallback((value: string) => {
    setQRCodeUrl(value);
  }, [setQRCodeUrl]);

  // Reset QR code URL and clear the source canvas
  const handleReset = useCallback(() => {
    setQRCodeUrl('');
    setQRCodeSourceCanvas(null);
  }, [setQRCodeUrl, setQRCodeSourceCanvas]);

  if (!isQRCodeCard) {
    return (
      <Box p={4} bg="rgba(0, 0, 0, 0.3)" borderRadius="md" color="gray.300">
        Load a Deck Cover frame version to access the QR Code controls.
      </Box>
    );
  }

  return (
    <VStack align="stretch" gap={6}>
      <Box p={4} bg="rgba(0, 0, 0, 0.35)" borderRadius="md">
        <Heading size="sm" mb={2}>
          QR Code Controls
        </Heading>
        <Text fontSize="sm" color="gray.300">
          Generate a QR code to display on your deck cover. The QR code will link to any URL you provide.
        </Text>
      </Box>

      <Box p={4} bg="rgba(0, 0, 0, 0.25)" borderRadius="md">
        <Heading size="sm" mb={4}>
          QR Code URL
        </Heading>
        <SimpleGrid columns={1} gap={4}>
          <LabeledInput
            label="Enter the URL for your QR code"
            value={qrCodeUrl}
            onChange={handleUrlChange}
            placeholder="https://example.com/decklist"
          />
        </SimpleGrid>
        
        {qrCodeUrl && (
          <Box mt={4} p={4} bg="rgba(255, 255, 255, 0.1)" borderRadius="md">
            <Text fontSize="sm" color="gray.300" mb={2}>
              QR Code Preview:
            </Text>
            <Box 
              display="flex" 
              justifyContent="center" 
              ref={qrContainerRef}
              css={{
                '& canvas': {
                  // Scale down for preview display while keeping full resolution
                  width: '128px !important',
                  height: '128px !important',
                }
              }}
            >
              <QRCodeCanvas
                value={qrCodeUrl}
                size={qrRenderSize}
                bgColor={qrConfig.bgAlpha === 0 ? 'transparent' : qrConfig.bgColor}
                fgColor={qrConfig.fgColor}
                level="M"
                includeMargin={false}
              />
            </Box>
          </Box>
        )}
      </Box>

      <Box textAlign="center">
        <Button
          colorPalette="gray"
          variant="outline"
          onClick={handleReset}
        >
          Clear QR Code
        </Button>
      </Box>
    </VStack>
  );
};

QRCodeTabComponent.displayName = 'QRCodeTab';
export const QRCodeTab = memo(QRCodeTabComponent);
