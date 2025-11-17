/**
 * Canvas Error Boundary Component
 * Catches and handles canvas rendering errors gracefully
 */

import { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Text, VStack, Button } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error boundary specifically designed for canvas rendering errors.
 * Prevents canvas crashes from breaking the entire application.
 */
export class CanvasErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error details to console for debugging
    console.error('Canvas rendering error caught by boundary:', error);
    console.error('Error component stack:', errorInfo.componentStack);

    // Update state with error info
    this.setState({
      errorInfo,
    });
  }

  handleReset = (): void => {
    // Reset error state and reload the page
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="800px"
          w="571px"
          bg="gray.800"
          borderRadius="12px"
          border="2px solid"
          borderColor="red.500"
          p={6}
        >
          <VStack gap={4} textAlign="center" maxW="400px">
            <Text fontSize="2xl" fontWeight="bold" color="red.400">
              Canvas Render Error
            </Text>

            <Text fontSize="md" color="gray.300">
              Unable to render the card preview. This may be due to invalid frame data, corrupted images, or a rendering issue.
            </Text>

            {this.state.error && (
              <Box
                w="100%"
                p={3}
                bg="gray.900"
                borderRadius="md"
                border="1px solid"
                borderColor="gray.700"
              >
                <Text fontSize="xs" color="gray.400" fontFamily="mono" wordBreak="break-word">
                  {this.state.error.message}
                </Text>
              </Box>
            )}

            <Button
              size="md"
              colorPalette="red"
              onClick={this.handleReset}
              mt={2}
            >
              Reload Canvas
            </Button>

            <Text fontSize="xs" color="gray.500" mt={2}>
              If this error persists, try selecting a different frame pack or resetting your card data.
            </Text>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}
