/**
 * Performance monitoring utilities for tracking and analyzing app performance
 *
 * Features:
 * - Render time tracking
 * - Store update monitoring
 * - Canvas operation profiling
 * - Memory usage tracking
 * - Performance metrics aggregation
 */

import { MAX_METRICS_PER_CATEGORY } from '../constants';

interface PerformanceMetric {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  metadata?: Record<string, unknown>;
}

interface AggregatedMetrics {
  count: number;
  totalDuration: number;
  averageDuration: number;
  minDuration: number;
  maxDuration: number;
  lastDuration: number;
}

interface PerformanceReport {
  metrics: Record<string, AggregatedMetrics>;
  memoryUsage?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric[]> = new Map();
  private activeMetrics: Map<string, PerformanceMetric> = new Map();
  private enabled: boolean = true;
  private maxMetricsPerCategory: number = MAX_METRICS_PER_CATEGORY;

  /**
   * Enable or disable performance monitoring
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  /**
   * Start tracking a performance metric
   */
  startMetric(name: string, metadata?: Record<string, unknown>): void {
    if (!this.enabled) return;

    const metric: PerformanceMetric = {
      name,
      startTime: performance.now(),
      metadata,
    };

    this.activeMetrics.set(name, metric);
  }

  /**
   * End tracking a performance metric
   */
  endMetric(name: string): number | undefined {
    if (!this.enabled) return undefined;

    const metric = this.activeMetrics.get(name);
    if (!metric) {
      // Silently return if no active metric (this can happen when operations are triggered
      // outside the normal render flow, e.g., from mouse events)
      return undefined;
    }

    metric.endTime = performance.now();
    metric.duration = metric.endTime - metric.startTime;

    // Store the completed metric
    const categoryMetrics = this.metrics.get(name) || [];
    categoryMetrics.push(metric);

    // Limit stored metrics to prevent memory bloat
    if (categoryMetrics.length > this.maxMetricsPerCategory) {
      categoryMetrics.shift();
    }

    this.metrics.set(name, categoryMetrics);
    this.activeMetrics.delete(name);

    return metric.duration;
  }

  /**
   * Measure a synchronous function
   */
  measure<T>(name: string, fn: () => T, metadata?: Record<string, unknown>): T {
    this.startMetric(name, metadata);
    try {
      return fn();
    } finally {
      this.endMetric(name);
    }
  }

  /**
   * Measure an asynchronous function
   */
  async measureAsync<T>(
    name: string,
    fn: () => Promise<T>,
    metadata?: Record<string, unknown>
  ): Promise<T> {
    this.startMetric(name, metadata);
    try {
      return await fn();
    } finally {
      this.endMetric(name);
    }
  }

  /**
   * Get aggregated metrics for a specific category
   */
  getAggregatedMetrics(name: string): AggregatedMetrics | undefined {
    const categoryMetrics = this.metrics.get(name);
    if (!categoryMetrics || categoryMetrics.length === 0) {
      return undefined;
    }

    const durations = categoryMetrics
      .map((m) => m.duration)
      .filter((d): d is number => d !== undefined);

    if (durations.length === 0) {
      return undefined;
    }

    return {
      count: durations.length,
      totalDuration: durations.reduce((sum, d) => sum + d, 0),
      averageDuration: durations.reduce((sum, d) => sum + d, 0) / durations.length,
      minDuration: Math.min(...durations),
      maxDuration: Math.max(...durations),
      lastDuration: durations[durations.length - 1],
    };
  }

  /**
   * Get a full performance report
   */
  getReport(): PerformanceReport {
    const report: PerformanceReport = {
      metrics: {},
      timestamp: Date.now(),
    };

    // Aggregate all metrics
    for (const [name] of this.metrics) {
      const aggregated = this.getAggregatedMetrics(name);
      if (aggregated) {
        report.metrics[name] = aggregated;
      }
    }

    // Add memory usage if available
    if ('memory' in performance) {
      const memory = (performance as Performance & {
        memory?: {
          usedJSHeapSize: number;
          totalJSHeapSize: number;
          jsHeapSizeLimit: number;
        };
      }).memory;
      if (memory) {
        report.memoryUsage = {
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
        };
      }
    }

    return report;
  }

  /**
   * Print a formatted report to console
   */
  printReport(): void {
    const report = this.getReport();

    console.group('📊 Performance Report');
    console.log(`Timestamp: ${new Date(report.timestamp).toISOString()}`);
    console.log('');

    // Sort metrics by average duration (slowest first)
    const sortedMetrics = Object.entries(report.metrics).sort(
      ([, a], [, b]) => b.averageDuration - a.averageDuration
    );

    console.table(
      sortedMetrics.reduce((acc, [name, metrics]) => {
        acc[name] = {
          Count: metrics.count,
          'Avg (ms)': metrics.averageDuration.toFixed(2),
          'Min (ms)': metrics.minDuration.toFixed(2),
          'Max (ms)': metrics.maxDuration.toFixed(2),
          'Last (ms)': metrics.lastDuration.toFixed(2),
          'Total (ms)': metrics.totalDuration.toFixed(2),
        };
        return acc;
      }, {} as Record<string, { Count: number; 'Avg (ms)': string; 'Min (ms)': string; 'Max (ms)': string; 'Last (ms)': string; 'Total (ms)': string }>)
    );

    if (report.memoryUsage) {
      console.log('');
      console.log('💾 Memory Usage:');
      console.table({
        'Used Heap': `${(report.memoryUsage.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        'Total Heap': `${(report.memoryUsage.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        'Heap Limit': `${(report.memoryUsage.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`,
      });
    }

    console.groupEnd();
  }

  /**
   * Clear all stored metrics
   */
  clear(): void {
    this.metrics.clear();
    this.activeMetrics.clear();
  }

  /**
   * Get raw metrics for a category (for detailed analysis)
   */
  getRawMetrics(name: string): PerformanceMetric[] {
    return this.metrics.get(name) || [];
  }

  /**
   * Get all metric categories
   */
  getCategories(): string[] {
    return Array.from(this.metrics.keys());
  }
}

// Singleton instance
export const perfMonitor = new PerformanceMonitor();

// Export types
export type { PerformanceMetric, AggregatedMetrics, PerformanceReport };

// Helper hooks for React components
export const usePerfMonitor = () => {
  return {
    startMetric: (name: string, metadata?: Record<string, unknown>) =>
      perfMonitor.startMetric(name, metadata),
    endMetric: (name: string) => perfMonitor.endMetric(name),
    measure: <T,>(name: string, fn: () => T, metadata?: Record<string, unknown>) =>
      perfMonitor.measure(name, fn, metadata),
    measureAsync: <T,>(name: string, fn: () => Promise<T>, metadata?: Record<string, unknown>) =>
      perfMonitor.measureAsync(name, fn, metadata),
  };
};

// Utility function to track component render times
export const trackComponentRender = (componentName: string) => {
  perfMonitor.startMetric(`render:${componentName}`);
  return () => perfMonitor.endMetric(`render:${componentName}`);
};

// Utility function to track store updates
export const trackStoreUpdate = (storeName: string, action: string) => {
  const metricName = `store:${storeName}:${action}`;
  perfMonitor.startMetric(metricName);
  return () => perfMonitor.endMetric(metricName);
};

// Utility function to track canvas operations
export const trackCanvasOperation = (operation: string) => {
  const metricName = `canvas:${operation}`;
  perfMonitor.startMetric(metricName);
  return () => perfMonitor.endMetric(metricName);
};

// Extend window interface for global perfMonitor
declare global {
  interface Window {
    __perfMonitor?: PerformanceMonitor;
  }
}

// Make perfMonitor available globally in development
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  window.__perfMonitor = perfMonitor;
  console.log(
    '🔍 Performance monitor available globally as __perfMonitor\n' +
      'Try: __perfMonitor.printReport()'
  );
}
