/**
 * Performance Helper Functions
 * Convenience functions for common performance profiling tasks
 */

import { perfMonitor } from './performance';
import { FRAME_BUDGET_MS } from '../constants';

/**
 * Print a quick performance summary
 */
export const printPerfSummary = () => {
  console.group('⚡ Quick Performance Summary');

  const report = perfMonitor.getReport();

  // Canvas rendering metrics
  const canvasMetrics = Object.entries(report.metrics)
    .filter(([name]) => name.startsWith('canvas:'))
    .sort(([, a], [, b]) => b.averageDuration - a.averageDuration);

  if (canvasMetrics.length > 0) {
    console.log('\n🎨 Canvas Operations (slowest first):');
    canvasMetrics.forEach(([name, metrics]) => {
      console.log(`  ${name}: ${metrics.averageDuration.toFixed(2)}ms (${metrics.count}x)`);
    });
  }

  // Component render metrics
  const componentMetrics = Object.entries(report.metrics)
    .filter(([name]) => name.startsWith('profiler:') || name.startsWith('render:'))
    .sort(([, a], [, b]) => b.count - a.count);

  if (componentMetrics.length > 0) {
    console.log('\n⚛️ Component Renders (most frequent first):');
    componentMetrics.forEach(([name, metrics]) => {
      console.log(`  ${name}: ${metrics.count}x renders, ${metrics.averageDuration.toFixed(2)}ms avg`);
    });
  }

  // Store operations
  const storeMetrics = Object.entries(report.metrics)
    .filter(([name]) => name.startsWith('store:'))
    .sort(([, a], [, b]) => b.count - a.count);

  if (storeMetrics.length > 0) {
    console.log('\n📦 Store Operations (most frequent first):');
    storeMetrics.forEach(([name, metrics]) => {
      console.log(`  ${name}: ${metrics.count}x calls, ${metrics.averageDuration.toFixed(2)}ms avg`);
    });
  }

  // Memory
  if (report.memoryUsage) {
    console.log('\n💾 Memory:');
    console.log(`  Used: ${(report.memoryUsage.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Total: ${(report.memoryUsage.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
  }

  console.groupEnd();
};

/**
 * Start monitoring a user interaction scenario
 */
export const startScenario = (name: string) => {
  console.log(`🎬 Starting scenario: ${name}`);
  perfMonitor.clear();
  perfMonitor.startMetric(`scenario:${name}`);
};

/**
 * End monitoring a user interaction scenario
 */
export const endScenario = (name: string) => {
  perfMonitor.endMetric(`scenario:${name}`);
  console.log(`🏁 Scenario complete: ${name}`);
  printPerfSummary();
};

/**
 * Export performance data as JSON for analysis
 */
export const exportPerfData = () => {
  const report = perfMonitor.getReport();
  const json = JSON.stringify(report, null, 2);

  // Copy to clipboard if available
  if (navigator.clipboard) {
    navigator.clipboard.writeText(json);
    console.log('📋 Performance data copied to clipboard');
  } else {
    console.log('📊 Performance data:');
    console.log(json);
  }

  return report;
};

/**
 * Check if any metrics exceed performance budget
 */
export const checkPerformanceBudget = () => {
  const report = perfMonitor.getReport();

  const budgets = {
    'canvas:fullRender': FRAME_BUDGET_MS, // 60fps
    'canvas:renderFrameLayer': 5,
    'canvas:renderTextLayer': 5,
    'canvas:compositeAllLayers': 3,
  };

  console.group('💰 Performance Budget Check');

  let allPassing = true;

  Object.entries(budgets).forEach(([metric, budget]) => {
    const data = report.metrics[metric];
    if (data) {
      const passing = data.averageDuration <= budget;
      const status = passing ? '✅' : '❌';
      console.log(
        `${status} ${metric}: ${data.averageDuration.toFixed(2)}ms (budget: ${budget}ms)`
      );
      if (!passing) allPassing = false;
    }
  });

  if (allPassing) {
    console.log('\n🎉 All metrics within budget!');
  } else {
    console.log('\n⚠️ Some metrics exceed budget - optimization needed');
  }

  console.groupEnd();

  return allPassing;
};

/**
 * Track re-render frequency for a component
 */
export const trackRerenders = (componentName: string, threshold = 10) => {
  const metrics = perfMonitor.getAggregatedMetrics(`profiler:${componentName}:update`);

  if (metrics) {
    console.log(`🔄 ${componentName} Re-renders:`);
    console.log(`  Total: ${metrics.count}`);
    console.log(`  Avg duration: ${metrics.averageDuration.toFixed(2)}ms`);

    if (metrics.count > threshold) {
      console.warn(`  ⚠️ High re-render count (threshold: ${threshold})`);
    }
  } else {
    console.log(`No re-render data for ${componentName}`);
  }
};

// Performance helpers interface for global window object
interface PerfHelpers {
  summary: typeof printPerfSummary;
  report: () => void;
  start: typeof startScenario;
  end: typeof endScenario;
  export: typeof exportPerfData;
  budget: typeof checkPerformanceBudget;
  rerenders: typeof trackRerenders;
  clear: () => void;
}

declare global {
  interface Window {
    __perf?: PerfHelpers;
  }
}

// Make helpers available globally in dev mode
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  window.__perf = {
    summary: printPerfSummary,
    report: () => perfMonitor.printReport(),
    start: startScenario,
    end: endScenario,
    export: exportPerfData,
    budget: checkPerformanceBudget,
    rerenders: trackRerenders,
    clear: () => perfMonitor.clear(),
  };

  console.log(
    '⚡ Performance helpers available:\n' +
      '  __perf.summary()     - Quick summary\n' +
      '  __perf.report()      - Full report\n' +
      '  __perf.start(name)   - Start scenario\n' +
      '  __perf.end(name)     - End scenario\n' +
      '  __perf.export()      - Export JSON\n' +
      '  __perf.budget()      - Check budget\n' +
      '  __perf.rerenders(c)  - Check component\n' +
      '  __perf.clear()       - Clear metrics'
  );
}
