/**
 * Canvas-specific Error Boundary
 * Handles canvas rendering errors gracefully
 */
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Text, VStack, Button } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class CanvasErrorBoundary extends Component<Props, State> {
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
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Canvas rendering error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
    // Optionally trigger a canvas re-render
    window.location.reload();
  };

  render() {
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
        >
          <VStack gap={3} p={6} textAlign="center">
            <Text fontSize="lg" fontWeight="bold" color="red.400">
              Canvas Render Error
            </Text>
            <Text fontSize="sm" color="gray.300">
              Unable to render the card preview.
            </Text>
            {this.state.error && (
              <Text fontSize="xs" color="gray.500" fontFamily="mono">
                {this.state.error.message}
              </Text>
            )}
            <Button size="sm" onClick={this.handleReset} colorScheme="red">
              Reload Canvas
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}
