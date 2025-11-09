/**
 * Frame Layer Editor Component
 * Drawer for editing frame layer properties
 */

import { Box, Drawer, Heading, HStack, VStack, Input, Button, Checkbox, Portal, CloseButton } from '@chakra-ui/react';
import { Field } from './ui/field';
import { Slider } from './ui/slider';
import { useCardStore } from '../store/cardStore';
import { useMemo } from 'react';

interface FrameLayerEditorProps {
  isOpen: boolean;
  onClose: () => void;
  frameIndex: number | null;
}

export const FrameLayerEditor = ({ isOpen, onClose, frameIndex }: FrameLayerEditorProps) => {
  const frames = useCardStore((state) => state.card.frames);
  const updateFrame = useCardStore((state) => state.updateFrame);

  const frame = frameIndex !== null ? frames[frameIndex] : null;

  // Calculate if frame is at default state
  const isAtDefaultState = useMemo(() => {
    if (!frame) return true;
    return (
      (frame.x ?? frame.ogX ?? 0) === (frame.ogX ?? 0) &&
      (frame.y ?? frame.ogY ?? 0) === (frame.ogY ?? 0) &&
      (frame.width ?? frame.ogWidth) === frame.ogWidth &&
      (frame.height ?? frame.ogHeight) === frame.ogHeight &&
      (frame.scale ?? frame.ogScale ?? 1) === (frame.ogScale ?? 1) &&
      (frame.opacity ?? frame.ogOpacity ?? 100) === (frame.ogOpacity ?? 100) &&
      (frame.hslHue ?? frame.ogHslHue ?? 0) === (frame.ogHslHue ?? 0) &&
      (frame.hslSaturation ?? frame.ogHslSaturation ?? 0) === (frame.ogHslSaturation ?? 0) &&
      (frame.hslLightness ?? frame.ogHslLightness ?? 0) === (frame.ogHslLightness ?? 0) &&
      (frame.colorOverlay ?? frame.ogColorOverlay ?? '#000000') === (frame.ogColorOverlay ?? '#000000') &&
      (frame.colorOverlayCheck ?? frame.ogColorOverlayCheck ?? false) === (frame.ogColorOverlayCheck ?? false) &&
      (frame.visible ?? frame.ogVisible ?? true) === (frame.ogVisible ?? true) &&
      !frame.locked
    );
  }, [frame]);

  const handleReset = () => {
    if (frameIndex === null || !frame) return;
    updateFrame(frameIndex, {
      x: frame.ogX ?? 0,
      y: frame.ogY ?? 0,
      width: frame.ogWidth,
      height: frame.ogHeight,
      scale: frame.ogScale ?? 1,
      opacity: frame.ogOpacity ?? 100,
      hslHue: frame.ogHslHue ?? 0,
      hslSaturation: frame.ogHslSaturation ?? 0,
      hslLightness: frame.ogHslLightness ?? 0,
      colorOverlay: frame.ogColorOverlay ?? '#000000',
      colorOverlayCheck: frame.ogColorOverlayCheck ?? false,
      visible: frame.ogVisible ?? true,
      locked: false,
    });
  };

  if (!frame || frameIndex === null) {
    return null;
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()} placement="end" size="lg">
      <Portal>
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header borderBottomWidth="1px">
              <HStack justify="space-between" w="full">
                <Heading size="md">Frame Layer Editor</Heading>
                <HStack gap={4}>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleReset}
                    disabled={isAtDefaultState}
                    mr={10}
                  >
                    Reset Layer
                  </Button>
                  <Drawer.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Drawer.CloseTrigger>
                </HStack>
              </HStack>
            </Drawer.Header>

          <Drawer.Body>
            <VStack align="stretch" gap={6} py={4}>
              {/* Two-column layout */}
              <HStack align="flex-start" gap={6}>
                {/* Left Column */}
                <VStack align="stretch" flex={1} gap={4}>
                  {/* X and Y */}
                  <HStack gap={3}>
                    <Box flex={1}>
                      <Field label="X">
                        <Input
                          type="number"
                          value={frame.x ?? 0}
                          step={0.01}
                          onChange={(e) => updateFrame(frameIndex, { x: Number(e.target.value) })}
                        />
                      </Field>
                    </Box>
                    <Box flex={1}>
                      <Field label="Y">
                        <Input
                          type="number"
                          value={frame.y ?? 0}
                          step={0.01}
                          onChange={(e) => updateFrame(frameIndex, { y: Number(e.target.value) })}
                        />
                      </Field>
                    </Box>
                  </HStack>

                  {/* Opacity Slider */}
                  <Field label="Opacity">
                    <HStack gap={3}>
                      <Slider
                        flex={1}
                        value={[frame.opacity ?? 100]}
                        onValueChange={(e: { value: number[] }) => updateFrame(frameIndex, { opacity: e.value[0] })}
                        min={0}
                        max={100}
                        step={1}
                      />
                      <Box minW="50px" textAlign="right" fontSize="sm">
                        {frame.opacity ?? 100}%
                      </Box>
                    </HStack>
                  </Field>

                  {/* Hue Slider */}
                  <Field label="Hue">
                    <HStack gap={3}>
                      <Slider
                        flex={1}
                        value={[frame.hslHue ?? 0]}
                        onValueChange={(e: { value: number[] }) => updateFrame(frameIndex, { hslHue: e.value[0] })}
                        min={-180}
                        max={180}
                        step={1}
                      />
                      <Box minW="50px" textAlign="right" fontSize="sm">
                        {frame.hslHue ?? 0}°
                      </Box>
                    </HStack>
                  </Field>

                  {/* Saturation Slider */}
                  <Field label="Saturation">
                    <HStack gap={3}>
                      <Slider
                        flex={1}
                        value={[frame.hslSaturation ?? 0]}
                        onValueChange={(e: { value: number[] }) => updateFrame(frameIndex, { hslSaturation: e.value[0] })}
                        min={-100}
                        max={100}
                        step={1}
                      />
                      <Box minW="50px" textAlign="right" fontSize="sm">
                        {frame.hslSaturation ?? 0}%
                      </Box>
                    </HStack>
                  </Field>

                  {/* Lightness Slider */}
                  <Field label="Lightness">
                    <HStack gap={3}>
                      <Slider
                        flex={1}
                        value={[frame.hslLightness ?? 0]}
                        onValueChange={(e: { value: number[] }) => updateFrame(frameIndex, { hslLightness: e.value[0] })}
                        min={-100}
                        max={100}
                        step={1}
                      />
                      <Box minW="50px" textAlign="right" fontSize="sm">
                        {frame.hslLightness ?? 0}%
                      </Box>
                    </HStack>
                  </Field>
                </VStack>

                {/* Right Column */}
                <VStack align="stretch" flex={1} gap={4}>
                  {/* Width and Height */}
                  <HStack gap={3}>
                    <Box flex={1}>
                      <Field label="Width">
                        <Input
                          type="number"
                          value={frame.width ?? frame.bounds?.width ?? 1}
                          min={0}
                          step={0.01}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateFrame(frameIndex, { width: val === '' ? undefined : Number(val) });
                          }}
                        />
                      </Field>
                    </Box>
                    <Box flex={1}>
                      <Field label="Height">
                        <Input
                          type="number"
                          value={frame.height ?? frame.bounds?.height ?? 1}
                          min={0}
                          step={0.01}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateFrame(frameIndex, { height: val === '' ? undefined : Number(val) });
                          }}
                        />
                      </Field>
                    </Box>
                  </HStack>

                  {/* Scale */}
                  <Field label="Scale (%)">
                    <Input
                      type="number"
                      value={((frame.scale ?? 1) * 100).toFixed(1)}
                      min={5}
                      step={0.5}
                      onChange={(e) => {
                        const percent = Math.max(5, Number(e.target.value));
                        updateFrame(frameIndex, { scale: percent / 100 });
                      }}
                    />
                  </Field>

                  {/* Erase Card - Disabled for now */}
                  <Checkbox.Root disabled>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>Erase Card (Coming soon)</Checkbox.Label>
                  </Checkbox.Root>

                  {/* Preserve Alpha - Disabled for now */}
                  <Checkbox.Root disabled>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>Preserve Alpha (Coming soon)</Checkbox.Label>
                  </Checkbox.Root>

                  {/* Color Overlay */}
                  <HStack gap={3} align="flex-end">
                    <Box flex={1}>
                      <Field label="Color Overlay">
                        <Checkbox.Root
                          checked={frame.colorOverlayCheck ?? false}
                          onCheckedChange={(e) => updateFrame(frameIndex, { colorOverlayCheck: e.checked === true })}
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control />
                          <Checkbox.Label>Enable</Checkbox.Label>
                        </Checkbox.Root>
                      </Field>
                    </Box>
                    <Input
                      type="color"
                      value={frame.colorOverlay ?? '#000000'}
                      onChange={(e) => updateFrame(frameIndex, { colorOverlay: e.target.value })}
                      disabled={!frame.colorOverlayCheck}
                      w="60px"
                      h="40px"
                      p={1}
                    />
                  </HStack>
                </VStack>
              </HStack>

              {/* Applied Masks Display */}
              <Field label="Applied Masks">
                <Box
                  bg="rgba(0, 0, 0, 0.3)"
                  borderRadius="md"
                  p={3}
                  minH="60px"
                >
                  {frame.masks && frame.masks.length > 0 ? (
                    <VStack align="stretch" gap={2}>
                      {frame.masks.map((mask, idx) => (
                        <Box
                          key={idx}
                          fontSize="sm"
                          color="gray.300"
                          bg="rgba(255, 255, 255, 0.05)"
                          p={2}
                          borderRadius="sm"
                        >
                          {mask.name}
                        </Box>
                      ))}
                    </VStack>
                  ) : (
                    <Box fontSize="sm" color="gray.500" textAlign="center">
                      No masks applied
                    </Box>
                  )}
                </Box>
              </Field>

              {/* Locked Checkbox */}
              <Checkbox.Root
                checked={frame.locked ?? false}
                onCheckedChange={(e) => updateFrame(frameIndex, { locked: e.checked === true })}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>Locked</Checkbox.Label>
              </Checkbox.Root>
            </VStack>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
