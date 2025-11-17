/**
 * Error Handling Utilities
 * Common error types and utilities for Card Cipherist
 */

/**
 * Result type for operations that can fail
 * Inspired by Rust's Result<T, E> pattern
 */
export type Result<T, E = string> =
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Creates a successful result
 */
export function Ok<T>(data: T): Result<T, never> {
  return { success: true, data };
}

/**
 * Creates a failed result
 */
export function Err<E = string>(error: E): Result<never, E> {
  return { success: false, error };
}

/**
 * Custom error types for better error handling
 */
export enum ErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  IMAGE_LOAD_ERROR = 'IMAGE_LOAD_ERROR',
  CANVAS_ERROR = 'CANVAS_ERROR',
  TEXT_RENDER_ERROR = 'TEXT_RENDER_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  FRAME_PACK_ERROR = 'FRAME_PACK_ERROR',
  SYMBOL_ERROR = 'SYMBOL_ERROR',
  FONT_ERROR = 'FONT_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * Structured error interface
 */
export interface AppError {
  type: ErrorType;
  message: string;
  details?: unknown;
  recoverable: boolean;
  timestamp: number;
}

/**
 * Creates a structured app error
 */
export function createError(
  type: ErrorType,
  message: string,
  details?: unknown,
  recoverable = true
): AppError {
  return {
    type,
    message,
    details,
    recoverable,
    timestamp: Date.now(),
  };
}

/**
 * Formats an error for display to users
 */
export function formatErrorForUser(error: AppError | Error | string): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return error.message;
}

/**
 * Logs an error with context (dev mode only)
 */
export function logError(error: AppError | Error, context?: string): void {
  if (import.meta.env.DEV) {
    const prefix = context ? `[${context}]` : '';
    console.error(`${prefix} Error:`, error);
    
    if ('details' in error && error.details) {
      console.error('Details:', error.details);
    }
  }
}

/**
 * Wraps a function with error handling
 * Returns a Result type instead of throwing
 */
export function trySync<T>(fn: () => T, errorType: ErrorType = ErrorType.UNKNOWN_ERROR): Result<T> {
  try {
    const result = fn();
    return Ok(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logError(createError(errorType, message, err));
    return Err(message);
  }
}

/**
 * Wraps an async function with error handling
 * Returns a Result type instead of throwing
 */
export async function tryAsync<T>(
  fn: () => Promise<T>,
  errorType: ErrorType = ErrorType.UNKNOWN_ERROR
): Promise<Result<T>> {
  try {
    const result = await fn();
    return Ok(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logError(createError(errorType, message, err));
    return Err(message);
  }
}

/**
 * Retry an async operation with exponential backoff
 */
export async function retryAsync<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    initialDelay?: number;
    maxDelay?: number;
    backoffMultiplier?: number;
    shouldRetry?: (error: unknown) => boolean;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    backoffMultiplier = 2,
    shouldRetry = () => true,
  } = options;

  let lastError: unknown;
  let delay = initialDelay;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Don't retry if we've exhausted attempts or error is not retryable
      if (attempt === maxRetries || !shouldRetry(error)) {
        break;
      }

      // Wait before retrying with exponential backoff
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay = Math.min(delay * backoffMultiplier, maxDelay);
    }
  }

  throw lastError;
}

/**
 * Checks if an error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError) {
    // Fetch network errors are typically TypeErrors
    return error.message.includes('fetch') || error.message.includes('network');
  }
  return false;
}

/**
 * Checks if an HTTP response indicates a rate limit
 */
export function isRateLimitError(status: number): boolean {
  return status === 429;
}

/**
 * Checks if an HTTP response indicates a not found error
 */
export function isNotFoundError(status: number): boolean {
  return status === 404;
}

/**
 * Parses validation error messages from Zod
 */
export function parseValidationError(error: unknown): string[] {
  if (!error || typeof error !== 'object') {
    return ['Unknown validation error'];
  }

  // Zod error format
  if ('issues' in error && Array.isArray(error.issues)) {
    return error.issues.map((issue: { path: (string | number)[]; message: string }) => {
      const path = issue.path.join('.');
      return path ? `${path}: ${issue.message}` : issue.message;
    });
  }

  return ['Unknown validation error'];
}
