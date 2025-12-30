/**
 * Dungeon Tab Component
 * Controls room layout and wall color for AFR-style Dungeon cards
 */

import { memo, useCallback, useState, useEffect } from 'react';
import { Box, Button, Grid, Heading, HStack, IconButton, Input, Text, VStack } from '@chakra-ui/react';
import { Field } from '../ui/field';
import { LabeledInput, LabeledSelect } from '../ui';
import { useCardStore } from '../../store/cardStore';
import { useDungeonInfo, useIsDungeonCard } from '../../store/selectors';
import { toaster } from '../ui/toaster-instance';
import { DUNGEON_MAX_ROOMS } from '../../types/card.types';
import type { DungeonRoom, DungeonWallColor } from '../../types/card.types';
import { OVERLAY_DARK_30 } from '../../constants';

/**
 * DoorwayInput - A controlled input that allows typing commas and decimals
 * without immediately parsing and losing characters during typing
 */
interface DoorwayInputProps {
  value: number[];
  onChange: (doors: number[]) => void;
}

const DoorwayInput = ({ value, onChange }: DoorwayInputProps) => {
  // Local state for the raw text value
  const [localValue, setLocalValue] = useState(value.join(', '));

  // Sync local value when external value changes (e.g., from reset)
  useEffect(() => {
    setLocalValue(value.join(', '));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const handleBlur = () => {
    // Parse the string and update the store on blur
    const doors = localValue
      .split(',')
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n));
    onChange(doors);
    // Update local value to cleaned version
    setLocalValue(doors.join(', '));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Parse and update on Enter key
      const doors = localValue
        .split(',')
        .map((s) => parseFloat(s.trim()))
        .filter((n) => !isNaN(n));
      onChange(doors);
      setLocalValue(doors.join(', '));
    }
  };

  return (
    <Field label="Doorway Positions (comma-separated)">
      <Input
        type="text"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder="e.g., 3, 7.5"
        bg={OVERLAY_DARK_30}
      />
    </Field>
  );
};

const WALL_COLOR_ITEMS = [
  { value: 'W', label: 'White' },
  { value: 'U', label: 'Blue' },
  { value: 'B', label: 'Black' },
  { value: 'R', label: 'Red' },
  { value: 'G', label: 'Green' },
  { value: 'C', label: 'Colorless' },
];

const DungeonTabComponent = () => {
  const dungeonInfo = useDungeonInfo();
  const isDungeonCard = useIsDungeonCard();

  const handleWallColorChange = useCallback((value: string) => {
    const store = useCardStore.getState();
    store.setDungeonWallColor(value as DungeonWallColor);
  }, []);

  const handleAddRoom = useCallback(() => {
    const store = useCardStore.getState();
    const currentRooms = store.card.dungeon?.rooms ?? [];

    if (currentRooms.length >= DUNGEON_MAX_ROOMS) {
      toaster.create({
        title: 'Maximum Rooms Reached',
        description: `Dungeons can have a maximum of ${DUNGEON_MAX_ROOMS} rooms at the moment.`,
        type: 'warning',
        duration: 3000,
      });
      return;
    }

    // Add a default new room
    const newRoom: DungeonRoom = {
      x: 0,
      y: 0,
      width: 4,
      height: 3,
      doors: [],
    };

    store.addDungeonRoom(newRoom);
  }, []);

  const handleRemoveRoom = useCallback((index: number) => {
    const store = useCardStore.getState();
    store.removeDungeonRoom(index);
  }, []);

  const handleRoomChange = useCallback((index: number, field: keyof DungeonRoom, value: number | number[]) => {
    const store = useCardStore.getState();
    store.updateDungeonRoom(index, { [field]: value });
  }, []);

  const handleDoorsChange = useCallback((index: number, doors: number[]) => {
    const store = useCardStore.getState();
    store.updateDungeonRoom(index, { doors });
  }, []);

  const handleReset = useCallback(() => {
    const store = useCardStore.getState();
    store.resetDungeonInfo();
  }, []);

  if (!isDungeonCard) {
    return (
      <Box p={4} bg="rgba(0, 0, 0, 0.3)" borderRadius="md" color="gray.300">
        Load a Dungeon frame pack to access room layout controls.
      </Box>
    );
  }

  const rooms = dungeonInfo?.rooms ?? [];
  const wallColor = dungeonInfo?.wallColor ?? 'B';

  return (
    <VStack align="stretch" gap={4}>
      <Box p={4} bg="rgba(0, 0, 0, 0.35)" borderRadius="md">
        <Heading size="sm" mb={2}>
          Dungeon Layout
        </Heading>
        <Text fontSize="sm" color="gray.300">
          Configure the room positions, sizes, and doorway placements for your dungeon. Each room is
          positioned on a 16-cell wide grid. Doorway positions are relative to the room&apos;s left edge.
        </Text>
      </Box>

      <LabeledSelect
        label="Wall Color"
        value={wallColor}
        onChange={handleWallColorChange}
        items={WALL_COLOR_ITEMS}
      />

      <Box>
        <HStack justify="space-between" mb={3}>
          <Heading size="sm">Rooms ({rooms.length}/{DUNGEON_MAX_ROOMS})</Heading>
          <Button
            size="sm"
            colorPalette="blue"
            onClick={handleAddRoom}
            disabled={rooms.length >= DUNGEON_MAX_ROOMS}
          >
            Add Room
          </Button>
        </HStack>

        <VStack align="stretch" gap={3}>
          {rooms.map((room, index) => (
            <Box key={index} p={4} bg="rgba(0, 0, 0, 0.25)" borderRadius="md">
              <HStack justify="space-between" mb={3}>
                <Heading size="sm">Room {index + 1}</Heading>
                <IconButton
                  aria-label="Remove room"
                  size="sm"
                  variant="ghost"
                  colorPalette="red"
                  onClick={() => handleRemoveRoom(index)}
                >
                  <Text>X</Text>
                </IconButton>
              </HStack>

              <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                <LabeledInput
                  label="X Position"
                  type="number"
                  min={0}
                  max={15}
                  step={1}
                  value={room.x}
                  onChange={(val) => handleRoomChange(index, 'x', Number(val))}
                />
                <LabeledInput
                  label="Y Position"
                  type="number"
                  min={0}
                  max={18}
                  step={1}
                  value={room.y}
                  onChange={(val) => handleRoomChange(index, 'y', Number(val))}
                />
                <LabeledInput
                  label="Width (cells)"
                  type="number"
                  min={2}
                  max={16}
                  step={1}
                  value={room.width}
                  onChange={(val) => handleRoomChange(index, 'width', Number(val))}
                />
                <LabeledInput
                  label="Height (cells)"
                  type="number"
                  min={2}
                  max={19}
                  step={1}
                  value={room.height}
                  onChange={(val) => handleRoomChange(index, 'height', Number(val))}
                />
              </Grid>

              <Box mt={3}>
                <DoorwayInput
                  value={room.doors}
                  onChange={(doors) => handleDoorsChange(index, doors)}
                />
                <Text fontSize="xs" color="gray.400" mt={1}>
                  Enter door positions relative to room left edge. Example: 3, 7.5
                </Text>
              </Box>
            </Box>
          ))}
        </VStack>

        {rooms.length === 0 && (
          <Box p={4} bg="rgba(0, 0, 0, 0.2)" borderRadius="md" textAlign="center" color="gray.400">
            No rooms defined. Click &quot;Add Room&quot; to create a room.
          </Box>
        )}
      </Box>

      <HStack gap={3}>
        <Button flex={1} variant="outline" onClick={handleReset}>
          Reset to Default Layout
        </Button>
      </HStack>
    </VStack>
  );
};

DungeonTabComponent.displayName = 'DungeonTab';
export const DungeonTab = memo(DungeonTabComponent);
