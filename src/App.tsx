/**
 * Main App Component
 * Card Conjurer - Modernized Edition
 */

import { CardCreatorLayout } from './components/CardCreatorLayout';
import { PerformanceProfiler } from './components/PerformanceProfiler';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary name="App">
      <PerformanceProfiler id="App">
        <CardCreatorLayout />
      </PerformanceProfiler>
    </ErrorBoundary>
  );
}

export default App;
