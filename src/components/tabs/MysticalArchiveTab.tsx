/**
 * Mystical Archive Tab Component
 * Japanese Mystical Archive-specific controls for adjustable title bar height and type bar width.
 */

import { memo, useMemo } from 'react';
import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { LabeledInput } from '../ui';
import { useCardStore } from '../../store/cardStore';
import { useCardVersion } from '../../store/selectors';
import {
  MYSTICAL_ARCHIVE_JP_MIN_TITLE_HEIGHT,
  MYSTICAL_ARCHIVE_JP_MAX_TITLE_HEIGHT,
  MYSTICAL_ARCHIVE_JP_MIN_TYPE_WIDTH,
  MYSTICAL_ARCHIVE_JP_MAX_TYPE_WIDTH,
} from '../../utils/mysticalArchiveJP';

const MysticalArchiveTabComponent = () => {
  const cardVersion = useCardVersion()?.toLowerCase() ?? '';

  const mysticalArchiveTitleHeight = useCardStore((state) => state.mysticalArchiveTitleHeight);
  const setMysticalArchiveTitleHeight = useCardStore((state) => state.setMysticalArchiveTitleHeight);
  const mysticalArchiveTypeWidth = useCardStore((state) => state.mysticalArchiveTypeWidth);
  const setMysticalArchiveTypeWidth = useCardStore((state) => state.setMysticalArchiveTypeWidth);
  const resetMysticalArchiveSettings = useCardStore((state) => state.resetMysticalArchiveSettings);

  const isMysticalArchiveJP = useMemo(
    () => cardVersion === 'mysticalarchivejp',
    [cardVersion],
  );

  if (!isMysticalArchiveJP) {
    return (
      <Box p={4} bg="rgba(0, 0, 0, 0.3)" borderRadius="md" color="gray.300">
        Load the Japanese Mystical Archive frame version to unlock title bar and type bar controls.
      </Box>
    );
  }

  return (
    <VStack align="stretch" gap={4}>
      <Box p={4} bg="rgba(0, 0, 0, 0.35)" borderRadius="md">
        <Heading size="sm" mb={2}>
          Title Bar Height
        </Heading>
        <Text fontSize="sm" color="gray.300" mb={3}>
          Adjust the vertical title bar stretch. Increasing the value extends the title area and
          repositions frame elements accordingly.
        </Text>
        <LabeledInput
          label="Title Bar Height (px)"
          type="number"
          min={MYSTICAL_ARCHIVE_JP_MIN_TITLE_HEIGHT}
          max={MYSTICAL_ARCHIVE_JP_MAX_TITLE_HEIGHT}
          step={5}
          value={mysticalArchiveTitleHeight}
          onChange={(val) => {
            const nextValue = Number(val);
            if (!Number.isNaN(nextValue)) {
              setMysticalArchiveTitleHeight(nextValue);
            }
          }}
        />
      </Box>

      <Box p={4} bg="rgba(0, 0, 0, 0.35)" borderRadius="md">
        <Heading size="sm" mb={2}>
          Type Bar Width
        </Heading>
        <Text fontSize="sm" color="gray.300" mb={3}>
          Adjust the horizontal width of the type bar. Increasing the value widens the type line
          area.
        </Text>
        <LabeledInput
          label="Type Bar Width (px)"
          type="number"
          min={MYSTICAL_ARCHIVE_JP_MIN_TYPE_WIDTH}
          max={MYSTICAL_ARCHIVE_JP_MAX_TYPE_WIDTH}
          step={5}
          value={mysticalArchiveTypeWidth}
          onChange={(val) => {
            const nextValue = Number(val);
            if (!Number.isNaN(nextValue)) {
              setMysticalArchiveTypeWidth(nextValue);
            }
          }}
        />
      </Box>

      <HStack justify="flex-end">
        <Button variant="outline" onClick={resetMysticalArchiveSettings}>
          Reset to Defaults
        </Button>
      </HStack>
    </VStack>
  );
};

MysticalArchiveTabComponent.displayName = 'MysticalArchiveTab';
export const MysticalArchiveTab = memo(MysticalArchiveTabComponent);
