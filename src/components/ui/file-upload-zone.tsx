/**
 * FileUploadZone Component
 * Reusable drag-and-drop file upload zone with click-to-upload functionality
 * Phase 4 - Tier 3
 */

import { Box } from '@chakra-ui/react';
import { useRef, type ReactNode } from 'react';

export interface FileUploadZoneProps {
  /** Label text displayed in the upload zone */
  label: string;
  /** Helper text displayed below the label (e.g., "Accepts PNG, JPG, SVG") */
  helperText?: string;
  /** Callback when file is selected/dropped */
  onFileSelect: (file: File) => void;
  /** Accept attribute for the file input (e.g., "image/png,image/jpeg") */
  accept?: string;
  /** Whether the upload zone is disabled */
  disabled?: boolean;
  /** Bottom margin (default: 4) */
  mb?: number | string;
  /** Padding inside the upload zone (default: 6) */
  p?: number | string;
  /** Border color (default: 'gray.600') */
  borderColor?: string;
  /** Hover border color (default: 'gray.500') */
  hoverBorderColor?: string;
  /** Text color (default: 'gray.400') */
  textColor?: string;
  /** Helper text color (default: 'gray.500') */
  helperTextColor?: string;
  /** Flex layout (default: undefined) */
  flex?: number | string;
  /** Custom children to render instead of default label/helper */
  children?: ReactNode;
}

export const FileUploadZone = ({
  label,
  helperText,
  onFileSelect,
  accept,
  disabled = false,
  mb = 4,
  p = 6,
  borderColor = 'gray.600',
  hoverBorderColor = 'gray.500',
  textColor = 'gray.400',
  helperTextColor = 'gray.500',
  flex,
  children,
}: FileUploadZoneProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;

    const file = e.dataTransfer.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
    // Reset input so same file can be uploaded again
    e.target.value = '';
  };

  return (
    <>
      <Box
        border="2px dashed"
        borderColor={disabled ? 'gray.700' : borderColor}
        borderRadius="md"
        p={p}
        textAlign="center"
        color={disabled ? 'gray.600' : textColor}
        cursor={disabled ? 'not-allowed' : 'pointer'}
        opacity={disabled ? 0.5 : 1}
        _hover={disabled ? {} : { borderColor: hoverBorderColor, bg: 'rgba(255, 255, 255, 0.05)' }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        mb={mb}
        flex={flex}
        display={children ? 'flex' : undefined}
        flexDirection={children ? 'column' : undefined}
        justifyContent={children ? 'center' : undefined}
      >
        {children || (
          <>
            {label}
            {helperText && (
              <Box fontSize="xs" mt={1} color={disabled ? 'gray.600' : helperTextColor}>
                {helperText}
              </Box>
            )}
          </>
        )}
      </Box>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
        disabled={disabled}
      />
    </>
  );
};
