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
        globPatterns: ['**/*.{js,css,html,svg,webmanifest,png}'],
        // Das Vorschaubild holen sich nur Crawler beim Teilen eines Links –
        // es gehört nicht in die Installation. Die Markenbilder schon: Icon
        // und Schriftzug erscheinen in der App selbst und fehlten sonst,
        // sobald die Verbindung weg ist. Zusammen sind sie rund 90 KB.
        //
        // Das SDK für die Rückfragen bleibt ebenfalls draußen: Es wiegt rund
        // 185 KB, ist ausgeschaltet voreingestellt, und ohne Verbindung nützt
        // es ohnehin nichts. Wer die Rückfragen nie einschaltet, lädt es nie.
        globIgnores: ['**/vorschau.png', '**/sprachmodell-*.js'],
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
              cacheName: 'entgegen-bibeltext',
              // 66 Bücher je Übersetzung, dazu die beiden Verzeichnisse und
              // die Kartengrundlage – mit Luxus nach oben, damit nichts
              // verdrängt wird, was jemand offline behalten will.
              expiration: { maxEntries: 200 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        /*
         * Das SDK für die Rückfragen bekommt einen festen Dateinamen, damit der
         * Service Worker es am Muster erkennt und aus dem Vorab-Cache
         * heraushalten kann – sonst lüde jede Installation 175 KB für eine
         * Funktion mit, die ausgeschaltet voreingestellt ist.
         *
         * Bewusst nur umbenannt und nicht über `manualChunks` verschoben: Ein
         * eigener Chunk zog die geteilten Hilfsfunktionen mit sich, der
         * Hauptcode importierte sie daraufhin statisch – und die App startete
         * nicht mehr, sobald das SDK fehlte.
         */
        chunkFileNames(chunk) {
          const vomSdk = chunk.moduleIds.some((id) => id.includes('@anthropic-ai'));
          return vomSdk ? 'assets/sprachmodell-[hash].js' : 'assets/[name]-[hash].js';
        },
      },
    },
  },
  server: { host: '127.0.0.1', port: 5173 },
  preview: { host: '127.0.0.1', port: 4173 },
});
