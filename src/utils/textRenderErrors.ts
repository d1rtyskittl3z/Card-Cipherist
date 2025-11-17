/**
 * Text Render Error Handling Utilities
 *
 * Provides utilities for handling and displaying text rendering errors
 * in the UI. Works in conjunction with the Result<T> pattern from the
 * text renderer.
 */

import { useUIStore } from '../store/uiStore';
import type { Result } from './errors';

/**
 * Hook for managing text render errors
 *
 * Provides functions to set, clear, and check errors for text fields.
 * Errors are stored in the UI store and can be displayed in the UI.
 *
 * @example
 * ```typescript
 * const { setError, clearError, hasError, getError } = useTextRenderErrors();
 *
 * const result = renderField(...);
 * if (!result.success) {
 *   setError('title', result.error);
 * } else {
 *   clearError('title');
 * }
 *
 * if (hasError('title')) {
 *   console.log(getError('title'));
 * }
 * ```
 */
export function useTextRenderErrors() {
  const textRenderErrors = useUIStore((state) => state.textRenderErrors);
  const setTextRenderError = useUIStore((state) => state.setTextRenderError);
  const clearTextRenderError = useUIStore((state) => state.clearTextRenderError);
  const clearAllTextRenderErrors = useUIStore((state) => state.clearAllTextRenderErrors);

  return {
    /**
     * Set an error for a text field
     */
    setError: (fieldName: string, error: string) => {
      setTextRenderError(fieldName, error);
    },

    /**
     * Clear an error for a text field
     */
    clearError: (fieldName: string) => {
      clearTextRenderError(fieldName);
    },

    /**
     * Clear all text render errors
     */
    clearAllErrors: () => {
      clearAllTextRenderErrors();
    },

    /**
     * Check if a field has an error
     */
    hasError: (fieldName: string): boolean => {
      return fieldName in textRenderErrors;
    },

    /**
     * Get the error message for a field
     */
    getError: (fieldName: string): string | undefined => {
      return textRenderErrors[fieldName];
    },

    /**
     * Get all errors
     */
    getAllErrors: (): Record<string, string> => {
      return textRenderErrors;
    },

    /**
     * Check if any field has errors
     */
    hasAnyErrors: (): boolean => {
      return Object.keys(textRenderErrors).length > 0;
    },
  };
}

/**
 * Handle a Result from text rendering
 *
 * Automatically sets or clears errors based on the Result.
 * This is a convenience function for common error handling.
 *
 * @param fieldName - Name of the field being rendered
 * @param result - Result from renderField()
 * @param onError - Optional callback when an error occurs
 *
 * @example
 * ```typescript
 * const result = renderField(...);
 * handleTextRenderResult('title', result, (error) => {
 *   console.error('Failed to render title:', error);
 * });
 * ```
 */
export function handleTextRenderResult(
  fieldName: string,
  result: Result<void>,
  onError?: (error: string) => void
): void {
  const { setError, clearError } = useTextRenderErrors();

  if (!result.success) {
    setError(fieldName, result.error);
    onError?.(result.error);
  } else {
    clearError(fieldName);
  }
}

/**
 * Format error message for display to users
 *
 * Converts technical error messages into user-friendly messages
 *
 * @param fieldName - Name of the field that failed to render
 * @param error - Raw error message
 * @returns User-friendly error message
 */
export function formatTextRenderError(fieldName: string, error: string): string {
  // Common error patterns and user-friendly messages
  const errorPatterns: Array<{ pattern: RegExp; message: (match: RegExpMatchArray) => string }> = [
    {
      pattern: /font.*not.*found|font.*failed/i,
      message: () => `Font loading failed for ${fieldName}. The text may not display correctly.`,
    },
    {
      pattern: /symbol.*not.*found/i,
      message: () => `Mana symbol not found in ${fieldName}. Check your mana symbol syntax.`,
    },
    {
      pattern: /canvas.*context/i,
      message: () => `Canvas rendering failed for ${fieldName}. Please try refreshing the page.`,
    },
    {
      pattern: /undefined|null/i,
      message: () => `Missing data for ${fieldName}. Please check your text configuration.`,
    },
  ];

  // Try to match known error patterns
  for (const { pattern, message } of errorPatterns) {
    const match = error.match(pattern);
    if (match) {
      return message(match);
    }
  }

  // Fallback to raw error message
  return `Failed to render ${fieldName}: ${error}`;
}

/**
 * Get error severity level
 *
 * Determines how critical a text render error is
 *
 * @param error - Error message
 * @returns Severity level: 'warning' | 'error' | 'critical'
 */
export function getTextRenderErrorSeverity(error: string): 'warning' | 'error' | 'critical' {
  // Critical errors that prevent rendering entirely
  if (error.match(/canvas.*context|undefined.*context/i)) {
    return 'critical';
  }

  // Errors that affect appearance but don't prevent rendering
  if (error.match(/font|symbol|image/i)) {
    return 'warning';
  }

  // Default to error level
  return 'error';
}
