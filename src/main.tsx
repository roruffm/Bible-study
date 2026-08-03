import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import { isSingleFile } from './lib/bibleData';
import { applySettings } from './lib/storage';
import './styles/global.css';

applySettings();

// Als Einzeldatei gibt es keinen Server, der Pfade auf die App zurückführen
// könnte – dort übernimmt der Hash die Navigation. Ein Service Worker wäre
// dann ebenfalls sinnlos, weil bereits alles in der Seite steckt.
const singleFile = isSingleFile();
const Router = singleFile ? HashRouter : BrowserRouter;

// Auf GitHub Pages liegt die App unter „/<repository>/“; ohne diesen Präfix
// würde der Router alle Adressen ins Leere zeigen lassen.
const basename = singleFile ? undefined : import.meta.env.BASE_URL;

if (!singleFile) {
  registerSW({ immediate: true });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router basename={basename}>
      <App />
    </Router>
  </StrictMode>,
);
