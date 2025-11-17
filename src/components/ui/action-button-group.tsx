/**
 * ActionButtonGroup Component
 *
 * A reusable layout wrapper for groups of action buttons.
 * Supports HStack, Grid, or SimpleGrid layouts.
 *
 * @example
 * ```tsx
 * // HStack layout
 * <ActionButtonGroup layout="hstack" gap={3} justify="flex-end">
 *   <Button onClick={handleReset}>Reset</Button>
 *   <Button onClick={handleSave}>Save</Button>
 * </ActionButtonGroup>
 *
 * // Grid layout
 * <ActionButtonGroup layout="grid" columns={2} gap={3}>
 *   <Button onClick={handleResetPosition}>Reset Position</Button>
 *   <Button onClick={handleResetZoom}>Reset Zoom</Button>
 * </ActionButtonGroup>
 *
 * // Responsive SimpleGrid
 * <ActionButtonGroup layout="simple-grid" columns={{ base: 1, md: 3 }} gap={2}>
 *   <Button>Action 1</Button>
 *   <Button>Action 2</Button>
 *   <Button>Action 3</Button>
 * </ActionButtonGroup>
 * ```
 */

import { HStack, Grid, SimpleGrid } from '@chakra-ui/react';

export interface ActionButtonGroupProps {
  /** Layout type - hstack, grid, or simple-grid */
  layout?: 'hstack' | 'grid' | 'simple-grid';

  /**
   * Number of columns (for grid/simple-grid layouts)
   * - Number: Fixed column count
   * - Object: Responsive columns (simple-grid only)
   */
  columns?: number | { base?: number; md?: number; lg?: number; xl?: number };

  /** Gap between buttons (default: 3) */
  gap?: number;

  /** Justification for HStack layout */
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';

  /** Child button elements */
  children: React.ReactNode;

  /** Additional styles to apply */
  [key: string]: unknown;
}

/**
 * ActionButtonGroup - Layout wrapper for action buttons
 *
 * Reduces duplication of button group layouts across tabs.
 * Automatically chooses the appropriate container based on layout prop.
 */
export const ActionButtonGroup = ({
  layout = 'hstack',
  columns = 2,
  gap = 3,
  justify = 'flex-start',
  children,
  ...rest
}: ActionButtonGroupProps) => {
  if (layout === 'hstack') {
    return (
      <HStack gap={gap} justify={justify} {...rest}>
        {children}
      </HStack>
    );
  }

  if (layout === 'simple-grid' || typeof columns === 'object') {
    return (
      <SimpleGrid columns={columns} gap={gap} {...rest}>
        {children}
      </SimpleGrid>
    );
  }

  // Grid layout
  return (
    <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={gap} {...rest}>
      {children}
    </Grid>
  );
};
