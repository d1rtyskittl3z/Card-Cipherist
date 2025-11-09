/**
 * Field Component
 * Wrapper for form inputs with label
 */

import { Box } from '@chakra-ui/react';
import * as React from 'react';

interface FieldProps {
  label: string;
  children: React.ReactNode;
  helperText?: string;
  errorText?: string;
  required?: boolean;
}

export const Field = ({ label, children, helperText, errorText, required }: FieldProps) => {
  return (
    <Box>
      <Box as="label" display="block" fontWeight="medium" mb={2} fontSize="sm">
        {label}
        {required && (
          <Box as="span" color="red.500" ml={1}>
            *
          </Box>
        )}
      </Box>
      {children}
      {helperText && (
        <Box mt={1} fontSize="xs" color="gray.400">
          {helperText}
        </Box>
      )}
      {errorText && (
        <Box mt={1} fontSize="xs" color="red.400">
          {errorText}
        </Box>
      )}
    </Box>
  );
};
