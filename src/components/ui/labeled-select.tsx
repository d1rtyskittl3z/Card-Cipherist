/**
 * LabeledSelect Component
 *
 * A reusable Field + NativeSelect combination with standardized styling.
 * Supports simple items array or optgroups for categorized options.
 *
 * @example
 * ```tsx
 * // Simple items
 * <LabeledSelect
 *   label="Symbol Source"
 *   value={selectedSource}
 *   onChange={setSelectedSource}
 *   items={symbolSources}
 * />
 *
 * // With optgroups
 * <LabeledSelect
 *   label="Watermark"
 *   value={watermarkPath}
 *   onChange={setWatermarkPath}
 *   optgroups={[
 *     { label: 'General', options: [{ label: 'Planeswalker', value: '/img/pw.svg' }] },
 *     { label: 'Colors', options: [{ label: 'White', value: '/img/w.svg' }] }
 *   ]}
 * />
 * ```
 */

import { Box } from '@chakra-ui/react';
import { Field } from './field';
import { NativeSelectRoot, NativeSelectField } from './native-select';

export interface SelectOption {
  /** Display text for the option */
  label: string;

  /** Value of the option */
  value: string;
}

export interface SelectOptgroup {
  /** Label for the optgroup */
  label: string;

  /** Options within this group */
  options: SelectOption[];
}

export interface LabeledSelectProps {
  /** Label text displayed above the select */
  label: string;

  /** Current selected value */
  value: string;

  /** Callback when selection changes - receives string value */
  onChange: (value: string) => void;

  /** Simple array of options (mutually exclusive with optgroups) */
  items?: SelectOption[];

  /** Grouped options (mutually exclusive with items) */
  optgroups?: SelectOptgroup[];

  /** Disable the select */
  disabled?: boolean;

  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /** Placeholder option (value will be empty string) */
  placeholder?: string;

  /** Custom children (for advanced rendering - overrides items/optgroups) */
  children?: React.ReactNode;

  /** Flex sizing for parent flex container */
  flex?: number | string;

  /** Helper text displayed below the select */
  helperText?: string;
}

/**
 * LabeledSelect - Field + NativeSelect combination
 *
 * Reduces duplication of Field + NativeSelect patterns across tabs.
 * Provides consistent styling and behavior for dropdown selects.
 */
export const LabeledSelect = ({
  label,
  value,
  onChange,
  items,
  optgroups,
  disabled,
  size = 'sm',
  placeholder,
  children,
  flex,
  helperText,
}: LabeledSelectProps) => {
  const containerProps = flex !== undefined ? { flex } : {};

  // Render function for optgroups
  const renderOptgroups = () => {
    if (!optgroups) return null;

    return optgroups.map((group) => (
      <optgroup key={group.label} label={group.label}>
        {group.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </optgroup>
    ));
  };

  // Render function for simple items
  const renderItems = () => {
    if (!items) return null;

    return items.map((item) => (
      <option key={item.value} value={item.value}>
        {item.label}
      </option>
    ));
  };

  return (
    <Box {...containerProps}>
      <Field label={label} helperText={helperText}>
        <NativeSelectRoot size={size} disabled={disabled}>
          <NativeSelectField
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {children || renderOptgroups() || renderItems()}
          </NativeSelectField>
        </NativeSelectRoot>
      </Field>
    </Box>
  );
};
