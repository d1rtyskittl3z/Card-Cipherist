/**
 * ControlGrid Component
 *
 * A reusable Grid/SimpleGrid wrapper for organizing form controls.
 * Supports fixed column count or responsive columns with breakpoints.
 *
 * @example
 * ```tsx
 * // Fixed 2-column grid
 * <ControlGrid columns={2} gap={3}>
 *   <LabeledInput label="X" value={x} onChange={setX} />
 *   <LabeledInput label="Y" value={y} onChange={setY} />
 * </ControlGrid>
 *
 * // Responsive columns
 * <ControlGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
 *   <LabeledInput label="Width" value={w} onChange={setW} />
 *   <LabeledInput label="Height" value={h} onChange={setH} />
 *   <LabeledInput label="Depth" value={d} onChange={setD} />
 * </ControlGrid>
 * ```
 */

import { Grid, SimpleGrid } from '@chakra-ui/react';

export interface ControlGridProps {
  /**
   * Number of columns or responsive breakpoint object
   * - Number: Fixed column count (uses Grid with templateColumns)
   * - Object: Responsive columns (uses SimpleGrid)
   */
  columns?: number | { base?: number; md?: number; lg?: number; xl?: number };

  /** Gap between grid items (default: 3) */
  gap?: number;

  /** Child elements to render in grid */
  children: React.ReactNode;

  /** Additional styles to apply */
  [key: string]: unknown;
}

/**
 * ControlGrid - Grid layout wrapper for form controls
 *
 * Reduces duplication of Grid/SimpleGrid patterns across tabs.
 * Automatically chooses between Grid and SimpleGrid based on columns prop.
 */
export const ControlGrid = ({
  columns = 2,
  gap = 3,
  children,
  ...rest
}: ControlGridProps) => {
  // Use SimpleGrid for responsive columns, Grid for fixed columns
  if (typeof columns === 'object') {
    return (
      <SimpleGrid columns={columns} gap={gap} {...rest}>
        {children}
      </SimpleGrid>
    );
  }

  return (
    <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={gap} {...rest}>
      {children}
    </Grid>
  );
};
