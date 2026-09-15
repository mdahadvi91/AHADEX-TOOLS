import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './ErrorBoundary';
import { AppProviders } from './providers';
import { AppRoutes } from './routes';

/**
 * Root Application Component for AHADEX TOOLS
 * Composes core boundaries: Error Safety -> Routing -> State Providers -> Route Matching.
 * Tool-specific implementations remain fully isolated from this file.
 */
export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppProviders>
          <AppRoutes />
        </AppProviders>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
