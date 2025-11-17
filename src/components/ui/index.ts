/**
 * UI Components Barrel Export
 *
 * Re-exports all UI components for easy importing.
 * Phase 4 reusable components added to reduce tab duplication.
 */

// Phase 4 - Tier 1 Components
export { LabeledInput } from './labeled-input';
export type { LabeledInputProps } from './labeled-input';

export { LabeledSelect } from './labeled-select';
export type { LabeledSelectProps, SelectOption, SelectOptgroup } from './labeled-select';

export { ControlGrid } from './control-grid';
export type { ControlGridProps } from './control-grid';

export { ActionButtonGroup } from './action-button-group';
export type { ActionButtonGroupProps } from './action-button-group';

// Phase 4 - Tier 2 Components
export { LabeledSwitch } from './labeled-switch';
export type { LabeledSwitchProps } from './labeled-switch';

// Phase 4 - Tier 3 Components
export { FileUploadZone } from './file-upload-zone';
export type { FileUploadZoneProps } from './file-upload-zone';

// Toaster instance (non-component export)
export { toaster } from './toaster-instance';

// Color mode hooks (non-component exports)
export { useColorMode, useColorModeValue } from './use-color-mode';
export type { ColorMode, UseColorModeReturn } from './use-color-mode';
