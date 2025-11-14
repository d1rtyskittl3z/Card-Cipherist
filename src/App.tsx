/**
 * Main App Component
 * Card Conjurer - Modernized Edition
 */

import { CardCreatorLayout } from './components/CardCreatorLayout';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <CardCreatorLayout />
    </ErrorBoundary>
  );
}

export default App;
