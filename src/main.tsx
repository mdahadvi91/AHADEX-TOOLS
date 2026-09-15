import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './styles/globals.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Fatal: #root element not found in DOM');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
