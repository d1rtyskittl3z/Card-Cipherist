/**
 * Mystical Archive Horizontal Tab Component
 * Horizontal Japanese Mystical Archive-specific controls for adjustable title bar height and type bar width.
 */

import { memo, useMemo } from 'react';
import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { LabeledInput } from '../ui';
import { useCardStore } from '../../store/cardStore';
import { useCardVersion } from '../../store/selectors';
import {
  MYSTICAL_ARCHIVE_JP_HORIZONTAL_MIN_TITLE_WIDTH,
  MYSTICAL_ARCHIVE_JP_HORIZONTAL_MAX_TITLE_WIDTH,
  MYSTICAL_ARCHIVE_JP_HORIZONTAL_MIN_TYPE_WIDTH,
  MYSTICAL_ARCHIVE_JP_HORIZONTAL_MAX_TYPE_WIDTH,
} from '../../utils/mysticalArchiveJPHorizontal';

const MysticalArchiveHorizontalTabComponent = () => {
  const cardVersion = useCardVersion()?.toLowerCase() ?? '';

  const mysticalArchiveHorizontalTitleWidth = useCardStore((state) => state.mysticalArchiveHorizontalTitleWidth);
  const setMysticalArchiveHorizontalTitleWidth = useCardStore((state) => state.setMysticalArchiveHorizontalTitleWidth);
  const mysticalArchiveHorizontalTypeWidth = useCardStore((state) => state.mysticalArchiveHorizontalTypeWidth);
  const setMysticalArchiveHorizontalTypeWidth = useCardStore((state) => state.setMysticalArchiveHorizontalTypeWidth);
  const resetMysticalArchiveHorizontalSettings = useCardStore((state) => state.resetMysticalArchiveHorizontalSettings);

  const isMysticalArchiveJPHorizontal = useMemo(
    () => cardVersion === 'mysticalarchivejphorizontal',
    [cardVersion],
  );

  if (!isMysticalArchiveJPHorizontal) {
    return (
      <Box p={4} bg="rgba(0, 0, 0, 0.3)" borderRadius="md" color="gray.300">
        Load the Horizontal Japanese Mystical Archive frame version to unlock title bar and type bar controls.
      </Box>
    );
  }

  return (
    <VStack align="stretch" gap={4}>
      <Box p={4} bg="rgba(0, 0, 0, 0.35)" borderRadius="md">
        <Heading size="sm" mb={2}>
          Title Bar Width
        </Heading>
        <Text fontSize="sm" color="gray.300" mb={3}>
          Adjust the horizontal title bar stretch. Increasing the value widens the title area and
          repositions frame elements accordingly.
        </Text>
        <LabeledInput
          label="Title Bar Width (px)"
          type="number"
          min={MYSTICAL_ARCHIVE_JP_HORIZONTAL_MIN_TITLE_WIDTH}
          max={MYSTICAL_ARCHIVE_JP_HORIZONTAL_MAX_TITLE_WIDTH}
          step={5}
          value={mysticalArchiveHorizontalTitleWidth}
          onChange={(val) => {
            const nextValue = Number(val);
            if (!Number.isNaN(nextValue)) {
              setMysticalArchiveHorizontalTitleWidth(nextValue);
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
          min={MYSTICAL_ARCHIVE_JP_HORIZONTAL_MIN_TYPE_WIDTH}
          max={MYSTICAL_ARCHIVE_JP_HORIZONTAL_MAX_TYPE_WIDTH}
          step={5}
          value={mysticalArchiveHorizontalTypeWidth}
          onChange={(val) => {
            const nextValue = Number(val);
            if (!Number.isNaN(nextValue)) {
              setMysticalArchiveHorizontalTypeWidth(nextValue);
            }
          }}
        />
      </Box>

      <HStack justify="flex-end">
        <Button variant="outline" onClick={resetMysticalArchiveHorizontalSettings}>
          Reset to Defaults
        </Button>
      </HStack>
    </VStack>
  );
};

MysticalArchiveHorizontalTabComponent.displayName = 'MysticalArchiveHorizontalTab';
export const MysticalArchiveHorizontalTab = memo(MysticalArchiveHorizontalTabComponent);
