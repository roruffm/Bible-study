import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

/**
 * Auf GitHub Pages liegt eine Projektseite nicht unter „/“, sondern unter
 * „/<repository>/“. Der Basispfad kommt deshalb aus der Umgebung – lokal
 * bleibt es bei „/“, der Veröffentlichungs-Workflow setzt BASE_PATH.
 */
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Das Manifest liegt bereits als statische Datei unter public/.
      manifest: false,
      workbox: {
        // App-Shell vorab speichern – der Bibeltext bleibt bewusst außen vor,
        // damit die Installation klein bleibt. Er wandert beim Lesen in den
        // Laufzeit-Cache oder auf einen Schlag über „Offline verfügbar machen“.
        globPatterns: ['**/*.{js,css,html,svg,webmanifest}'],
        navigateFallback: `${base}index.html`,
        // Datendateien dürfen nicht durch die App-Seite ersetzt werden.
        navigateFallbackDenylist: [/\/(bibel|karten)\/.*\.json$/],
        runtimeCaching: [
          {
            // Bewusst ohne führenden Basispfad geprüft, damit dieselbe Regel
            // unter „/“ wie unter „/Bible-study/“ greift.
            urlPattern: ({ url }) =>
              url.pathname.includes('/bibel/') || url.pathname.includes('/karten/'),
            // Schrifttext ändert sich nicht – einmal geladen, immer verfügbar.
            handler: 'CacheFirst',
            options: {
              cacheName: 'lumina-bibeltext',
              expiration: { maxEntries: 120 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  server: { host: '127.0.0.1', port: 5173 },
  preview: { host: '127.0.0.1', port: 4173 },
});
