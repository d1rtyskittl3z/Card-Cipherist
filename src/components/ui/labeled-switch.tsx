/**
 * LabeledSwitch Component
 *
 * A reusable Switch with consistent Box wrapper and styling.
 * Simplifies the common pattern of wrapping Switch in a Box with margin.
 *
 * @example
 * ```tsx
 * <LabeledSwitch
 *   label="Auto Fit Art"
 *   checked={autoFitArt}
 *   onCheckedChange={setAutoFitArt}
 * />
 * ```
 */

import { Box, Text } from '@chakra-ui/react';
import { Switch } from './switch';

export interface LabeledSwitchProps {
  /** Label text displayed next to the switch */
  label: string;

  /** Current checked state */
  checked: boolean;

  /** Callback when checked state changes - receives boolean value */
  onCheckedChange: (checked: boolean) => void;

  /** Color palette (default: 'blue') */
  colorPalette?: 'blue' | 'green' | 'purple' | 'red' | 'gray';

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Disable the switch */
  disabled?: boolean;

  /** Bottom margin (default: 4) */
  mb?: number | string;

  /** Label font size */
  labelSize?: 'xs' | 'sm' | 'md' | 'lg';

  /** Helper text displayed below the label */
  helperText?: string;
}

/**
 * LabeledSwitch - Switch with Box wrapper
 *
 * Reduces duplication of Box + Switch patterns across tabs.
 * Provides consistent spacing and styling for toggle switches.
 */
export const LabeledSwitch = ({
  label,
  checked,
  onCheckedChange,
  colorPalette = 'blue',
  size = 'md',
  disabled,
  mb = 4,
  labelSize = 'sm',
  helperText,
}: LabeledSwitchProps) => {
  return (
    <Box mb={mb}>
      <Switch
        checked={checked}
        onCheckedChange={(e) => onCheckedChange(e.checked)}
        colorPalette={colorPalette}
        size={size}
        disabled={disabled}
      >
        <Text fontSize={labelSize}>{label}</Text>
      </Switch>
      {helperText && (
        <Text fontSize="xs" color="gray.500" mt={1} ml={12}>
          {helperText}
        </Text>
      )}
    </Box>
  );
};
