import React from 'react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

import { Main } from './components/Main';
import { ErrorProvider } from './context/ErrorContext/ErrorContext';

function App() {
  return (
    <ErrorProvider>
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
    </ErrorProvider>
  );
}

export default App;
