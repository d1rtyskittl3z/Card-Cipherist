/**
 * Error Boundary Component
 * Catches React errors and prevents full app crashes
 */
import { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
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
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minH="100vh"
          bg="gray.900"
          color="white"
          p={8}
        >
          <VStack gap={4} maxW="600px">
            <Heading size="xl" color="red.400">
              Something went wrong
            </Heading>
            <Text fontSize="lg" textAlign="center">
              An unexpected error occurred. This has been logged and we'll work on fixing it.
            </Text>
            {this.state.error && (
              <Box
                bg="gray.800"
                p={4}
                borderRadius="md"
                w="100%"
                fontFamily="mono"
                fontSize="sm"
                maxH="200px"
                overflowY="auto"
              >
                <Text color="red.300">{this.state.error.message}</Text>
                {this.state.error.stack && (
                  <Text color="gray.500" mt={2} fontSize="xs">
                    {this.state.error.stack}
                  </Text>
                )}
              </Box>
            )}
            <Button onClick={this.handleReset} colorScheme="blue" size="lg">
              Try Again
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}
