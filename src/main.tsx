import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import { applySettings } from './lib/storage';
import './styles/global.css';

applySettings();

// Der Service Worker macht App-Shell und gelesene Kapitel offline verfügbar.
// Im Entwicklungsmodus ist er abgeschaltet, damit Änderungen sofort greifen.
registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
