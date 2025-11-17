import { Profiler, ProfilerOnRenderCallback, ReactNode } from 'react';
import { perfMonitor } from '../utils/performance';

interface PerformanceProfilerProps {
  id: string;
  children: ReactNode;
  enabled?: boolean;
}

/**
 * Wrapper component that uses React Profiler to track render performance
 *
 * Usage:
 * <PerformanceProfiler id="CardCanvas">
 *   <CardCanvas />
 * </PerformanceProfiler>
 */
export const PerformanceProfiler = ({ id, children, enabled = true }: PerformanceProfilerProps) => {
  const onRender: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  ) => {
    if (!enabled) return;

    // Record the render in our performance monitor
    const metricName = `profiler:${id}:${phase}`;

    // Simulate a metric with the actual duration
    perfMonitor.startMetric(metricName, {
      phase,
      baseDuration,
      startTime,
      commitTime,
    });

    // Manually set the duration since we're tracking a completed event
    const metrics = perfMonitor.getRawMetrics(metricName);
    if (metrics.length > 0) {
      const lastMetric = metrics[metrics.length - 1];
      lastMetric.duration = actualDuration;
      lastMetric.endTime = lastMetric.startTime + actualDuration;
    }
  };

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <Profiler id={id} onRender={onRender}>
      {children}
    </Profiler>
  );
};

export default PerformanceProfiler;
