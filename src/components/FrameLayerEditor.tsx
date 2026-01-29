/**
 * Frame Layer Editor Component
 * Drawer for editing frame layer properties
 */

import { Box, Drawer, Heading, HStack, VStack, Input, Button, Checkbox, Portal, CloseButton } from '@chakra-ui/react';
import { Field } from './ui/field';
import { Slider } from './ui/slider';
import { NativeSelectRoot, NativeSelectField } from './ui/native-select';
import { useCardStore } from '../store/cardStore';
import { useMemo, useState } from 'react';
import { COLOR_BLACK, DEFAULT_OPACITY } from '../constants';
import { createMaskObject, getUnappliedMasks, addMaskToList } from '../utils/maskHelpers';
import type { Mask } from '../types/card.types';

interface FrameLayerEditorProps {
  isOpen: boolean;
  onClose: () => void;
  frameIndex: number | null;
}

export const FrameLayerEditor = ({ isOpen, onClose, frameIndex }: FrameLayerEditorProps) => {
  const frames = useCardStore((state) => state.card.frames);
  const updateFrame = useCardStore((state) => state.updateFrame);
  const [selectedMaskToApply, setSelectedMaskToApply] = useState<string>('');
  const [selectedMaskToRemove, setSelectedMaskToRemove] = useState<string>('');

  const frame = frameIndex !== null ? frames[frameIndex] : null;

  // Get unapplied masks for the dropdown
  const unappliedMasks = useMemo(() => {
    if (!frame) return [];
    return getUnappliedMasks(frame.masks, frame.availableMasks || []);
  }, [frame]);

  // Handle applying a mask to the frame
  const handleApplyMask = () => {
    if (!frame || frameIndex === null || !selectedMaskToApply) return;

    try {
      const maskData = JSON.parse(selectedMaskToApply);
      const newMask = createMaskObject(maskData.name, maskData.src, maskData.noThumb);
      
      // Add mask to the frame
      const updatedMasks = [...frame.masks, newMask];
      updateFrame(frameIndex, { masks: updatedMasks });

      // Update frame label to include the new mask
      updateFrameLabel(frameIndex, updatedMasks);
      
      // Reset selection
      setSelectedMaskToApply('');
    } catch (e) {
      console.error('Error applying mask:', e);
    }
  };

  // Handle removing a mask from the frame
  const handleRemoveMask = () => {
    if (!frame || frameIndex === null || !selectedMaskToRemove) return;

    const removedMask = frame.masks.find((m) => m.name === selectedMaskToRemove);
    if (!removedMask) return;

    // Filter out the removed mask
    const updatedMasks = frame.masks.filter((m) => m.name !== selectedMaskToRemove);
    
    // If it's an uploaded mask (has noThumb property), add it back to availableMasks
    if (removedMask.noThumb) {
      const updatedAvailableMasks = frame.availableMasks ? [...frame.availableMasks] : [];
      addMaskToList(updatedAvailableMasks, { name: removedMask.name, src: removedMask.src });
      updateFrame(frameIndex, { masks: updatedMasks, availableMasks: updatedAvailableMasks });
    } else {
      updateFrame(frameIndex, { masks: updatedMasks });
    }

    // Update frame label
    updateFrameLabel(frameIndex, updatedMasks);
    
    // Reset selection
    setSelectedMaskToRemove('');
  };

  // Update the frame's visible label in the frame list
  const updateFrameLabel = (index: number, masks: Mask[]) => {
    const targetFrame = frames[index];
    if (!targetFrame) return;

    // Build label: Frame Name + (optional Erase) + Mask Names
    const labelParts = [targetFrame.name.split(' - ')[0]]; // Get base frame name without existing masks
    
    if (targetFrame.erase) {
      labelParts.push('Erase Card');
    }
    
    masks.forEach((mask) => labelParts.push(mask.name));
    
    const newLabel = labelParts.join(' - ');
    updateFrame(index, { name: newLabel });
  };

  // Calculate if frame is at default state
  const isAtDefaultState = useMemo(() => {
    if (!frame) return true;
    return (
      (frame.x ?? frame.ogX ?? 0) === (frame.ogX ?? 0) &&
      (frame.y ?? frame.ogY ?? 0) === (frame.ogY ?? 0) &&
      (frame.width ?? frame.ogWidth) === frame.ogWidth &&
      (frame.height ?? frame.ogHeight) === frame.ogHeight &&
      (frame.scale ?? frame.ogScale ?? 1) === (frame.ogScale ?? 1) &&
      (frame.opacity ?? frame.ogOpacity ?? DEFAULT_OPACITY) === (frame.ogOpacity ?? DEFAULT_OPACITY) &&
      (frame.hslHue ?? frame.ogHslHue ?? 0) === (frame.ogHslHue ?? 0) &&
      (frame.hslSaturation ?? frame.ogHslSaturation ?? 0) === (frame.ogHslSaturation ?? 0) &&
      (frame.hslLightness ?? frame.ogHslLightness ?? 0) === (frame.ogHslLightness ?? 0) &&
      (frame.colorOverlay ?? frame.ogColorOverlay ?? COLOR_BLACK) === (frame.ogColorOverlay ?? COLOR_BLACK) &&
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
      opacity: frame.ogOpacity ?? DEFAULT_OPACITY,
      hslHue: frame.ogHslHue ?? 0,
      hslSaturation: frame.ogHslSaturation ?? 0,
      hslLightness: frame.ogHslLightness ?? 0,
      colorOverlay: frame.ogColorOverlay ?? COLOR_BLACK,
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
                        value={[frame.opacity ?? DEFAULT_OPACITY]}
                        onValueChange={(e: { value: number[] }) => updateFrame(frameIndex, { opacity: e.value[0] })}
                        min={0}
                        max={DEFAULT_OPACITY}
                        step={1}
                      />
                      <Box minW="50px" textAlign="right" fontSize="sm">
                        {frame.opacity ?? DEFAULT_OPACITY}%
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

                  {/* Erase Card */}
                  <Checkbox.Root
                    checked={frame.erase ?? false}
                    onCheckedChange={(e) => {
                      const eraseValue = e.checked === true;
                      updateFrame(frameIndex, { erase: eraseValue });
                      updateFrameLabel(frameIndex, frame.masks);
                    }}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>Erase Card</Checkbox.Label>
                  </Checkbox.Root>

                  {/* Preserve Alpha */}
                  <Checkbox.Root
                    checked={frame.preserveAlpha ?? false}
                    onCheckedChange={(e) => {
                      updateFrame(frameIndex, { preserveAlpha: e.checked === true });
                    }}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>Preserve Alpha</Checkbox.Label>
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
                      value={frame.colorOverlay ?? COLOR_BLACK}
                      onChange={(e) => updateFrame(frameIndex, { colorOverlay: e.target.value })}
                      disabled={!frame.colorOverlayCheck}
                      w="60px"
                      h="40px"
                      p={1}
                    />
                  </HStack>
                </VStack>
              </HStack>

              {/* Mask Management Section */}
              <VStack align="stretch" gap={4}>
                {/* Select and Remove Masks */}
                <Field label="Select and remove masks">
                  <HStack gap={2}>
                    <NativeSelectRoot flex={1}>
                      <NativeSelectField
                        value={selectedMaskToRemove}
                        onChange={(e) => setSelectedMaskToRemove(e.target.value)}
                        disabled={!frame.masks || frame.masks.length === 0}
                      >
                        <option value="">None Selected</option>
                        {frame.masks?.map((mask, idx) => (
                          <option key={idx} value={mask.name}>
                            {mask.name}
                          </option>
                        ))}
                      </NativeSelectField>
                    </NativeSelectRoot>
                    <Button
                      size="sm"
                      colorPalette="red"
                      variant="outline"
                      onClick={handleRemoveMask}
                      disabled={!selectedMaskToRemove}
                    >
                      Remove
                    </Button>
                  </HStack>
                </Field>

                {/* Select and Apply Available Masks */}
                <Field label="Select and apply available masks">
                  <HStack gap={2}>
                    <NativeSelectRoot flex={1}>
                      <NativeSelectField
                        value={selectedMaskToApply}
                        onChange={(e) => setSelectedMaskToApply(e.target.value)}
                        disabled={unappliedMasks.length === 0}
                      >
                        <option value="">Select a mask to apply</option>
                        {unappliedMasks.map((mask, idx) => (
                          <option key={idx} value={JSON.stringify(mask)}>
                            {mask.name}
                          </option>
                        ))}
                      </NativeSelectField>
                    </NativeSelectRoot>
                    <Button
                      size="sm"
                      colorPalette="green"
                      variant="outline"
                      onClick={handleApplyMask}
                      disabled={!selectedMaskToApply}
                    >
                      Apply
                    </Button>
                  </HStack>
                </Field>
              </VStack>

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
