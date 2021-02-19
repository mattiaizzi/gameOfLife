import React from 'react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

import { Main } from './components/Main';
import { ErrorProvider } from './context/ErrorContext/ErrorContext';
import { ModalProvider } from './context/ModalContext/ModalContext';

function App() {
  return (
    <ModalProvider>
      <ErrorProvider>
        <ErrorBoundary>
          <Main />
        </ErrorBoundary>
      </ErrorProvider>
    </ModalProvider>
  );
}

export default App;
