/**
 * LabeledInput Component
 *
 * A reusable Field + Input combination with standardized styling.
 * Handles text, number, and color inputs with consistent appearance.
 *
 * @example
 * ```tsx
 * <LabeledInput
 *   label="X Position"
 *   type="number"
 *   value={artX}
 *   onChange={(val) => updateArt({ artX: Number(val) })}
 *   step={0.01}
 * />
 * ```
 */

import { Box, Input } from '@chakra-ui/react';
import { Field } from './field';
import { OVERLAY_DARK_30 } from '../../constants';

export interface LabeledInputProps {
  /** Label text displayed above the input */
  label: string;

  /** Current value of the input */
  value: string | number;

  /** Callback when value changes - receives string value */
  onChange: (value: string) => void;

  /** Input type - text, number, or color */
  type?: 'text' | 'number' | 'color';

  /** Placeholder text */
  placeholder?: string;

  /** Step value for number inputs */
  step?: number;

  /** Minimum value for number inputs */
  min?: number;

  /** Maximum value for number inputs */
  max?: number;

  /** Disable the input */
  disabled?: boolean;

  /** Background color (default: OVERLAY_DARK_30) */
  bg?: string;

  /** Flex sizing for parent flex container */
  flex?: number | string;

  /** Helper text displayed below the input */
  helperText?: string;

  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /** Width of the input field */
  width?: string | number;

  /** onKeyDown event handler */
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * LabeledInput - Field + Input combination
 *
 * Reduces duplication of Field + Input patterns across tabs.
 * Provides consistent styling and behavior for form inputs.
 */
export const LabeledInput = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  step,
  min,
  max,
  disabled,
  bg = OVERLAY_DARK_30,
  flex,
  helperText,
  size = 'md',
  width,
  onKeyDown,
}: LabeledInputProps) => {
  const containerProps = flex !== undefined ? { flex } : {};

  return (
    <Box {...containerProps}>
      <Field label={label} helperText={helperText}>
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          step={step}
          min={min}
          max={max}
          disabled={disabled}
          bg={bg}
          size={size}
          width={width}
          onKeyDown={onKeyDown}
        />
      </Field>
    </Box>
  );
};
