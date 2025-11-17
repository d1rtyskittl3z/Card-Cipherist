/**
 * Error Boundary Component
 * Catches React rendering errors and provides user-friendly fallback UI
 */

import { Component, ReactNode, ErrorInfo } from 'react';
import { Box, Button, Heading, Text, VStack, Code } from '@chakra-ui/react';
import { createError, ErrorType, logError, type AppError } from '../utils/errors';

interface Props {
  children: ReactNode;
  /**
   * Optional custom fallback renderer
   * Receives the error and a reset function
   */
  fallback?: (error: AppError, reset: () => void) => ReactNode;
  /**
   * Optional error handler callback
   */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /**
   * Optional name for this boundary (for logging)
   */
  name?: string;
}

interface State {
  hasError: boolean;
  error: AppError | null;
}

/**
 * Error Boundary
 * 
 * Catches React errors during rendering, lifecycle methods, and constructors.
 * Does NOT catch:
 * - Event handlers (use try/catch)
 * - Async code (use try/catch or .catch())
 * - Server-side rendering
 * - Errors in the error boundary itself
 * 
 * Usage:
 * ```tsx
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 * 
 * With custom fallback:
 * ```tsx
 * <ErrorBoundary fallback={(error, reset) => <CustomError error={error} onReset={reset} />}>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error: createError(
        ErrorType.UNKNOWN_ERROR,
        error.message || 'An unexpected error occurred',
        error,
        true
      ),
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error
    const boundaryName = this.props.name || 'ErrorBoundary';
    logError(error, boundaryName);

    // Log component stack
    if (import.meta.env.DEV) {
      console.error('Component stack:', errorInfo.componentStack);
    }

    // Call optional error handler
    this.props.onError?.(error, errorInfo);
  }

  /**
   * Reset the error boundary state
   * Allows users to recover from errors
   */
  reset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  /**
   * Default fallback UI
   */
  renderDefaultFallback(error: AppError): ReactNode {
    return (
      <Box
        p={8}
        bg="red.50"
        borderRadius="md"
        border="2px solid"
        borderColor="red.300"
        maxW="800px"
        mx="auto"
        mt={8}
      >
        <VStack align="stretch" gap={4}>
          <Heading size="lg" color="red.700">
            ⚠️ Something went wrong
          </Heading>

          <Text color="red.700" fontSize="md">
            {error.message}
          </Text>

          {import.meta.env.DEV && error.details ? (
            <Box>
              <Text fontWeight="bold" mb={2} color="red.700">
                Error Details (dev only):
              </Text>
              <Code
                display="block"
                whiteSpace="pre-wrap"
                p={4}
                borderRadius="md"
                bg="red.100"
                color="red.900"
                fontSize="sm"
                maxH="300px"
                overflowY="auto"
              >
                {error.details instanceof Error
                  ? error.details.stack || error.details.message
                  : JSON.stringify(error.details, null, 2)}
              </Code>
            </Box>
          ) : null}

          <Box>
            <Button
              colorPalette="red"
              onClick={this.reset}
              size="md"
              variant="solid"
            >
              Try Again
            </Button>
            <Text fontSize="sm" color="red.600" mt={2}>
              Click to reset the component
            </Text>
          </Box>

          {error.recoverable && (
            <Text fontSize="sm" color="red.600" fontStyle="italic">
              This error should be recoverable. If the problem persists, try refreshing the page.
            </Text>
          )}
        </VStack>
      </Box>
    );
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.reset);
      }

      // Otherwise use default fallback
      return this.renderDefaultFallback(this.state.error);
    }

    return this.props.children;
  }
}

/**
 * Lightweight error boundary for specific components
 * Shows a minimal inline error message
 */
export class InlineErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error: createError(
        ErrorType.UNKNOWN_ERROR,
        error.message || 'Component error',
        error,
        true
      ),
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const boundaryName = this.props.name || 'InlineErrorBoundary';
    logError(error, boundaryName);
    this.props.onError?.(error, errorInfo);
  }

  reset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.reset);
      }

      return (
        <Box
          p={3}
          bg="red.50"
          borderRadius="md"
          border="1px solid"
          borderColor="red.200"
        >
          <Text color="red.700" fontSize="sm" mb={2}>
            {this.state.error.message}
          </Text>
          <Button
            size="xs"
            colorPalette="red"
            variant="outline"
            onClick={this.reset}
          >
            Retry
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
