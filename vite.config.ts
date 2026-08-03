import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
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
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/bibel\/.*\.json$/],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/bibel/'),
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
