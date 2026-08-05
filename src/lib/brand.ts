/**
 * Woher die Markenbilder kommen.
 *
 * Im Normalfall liegen sie als Dateien unter `public/` und werden über den
 * Basispfad geladen. Die Einzeldatei-Fassung hat aber kein `public/` neben
 * sich: Sie wird verschickt, per Doppelklick geöffnet und läuft ohne Server.
 * Dort würden Icon und Schriftzug still ins Leere zeigen – ohne Fehlermeldung,
 * einfach als leere Kästchen. Deshalb bettet `scripts/build-singlefile.mjs`
 * die drei Bilder als Daten-URIs ein und legt sie unter `__ENTGEGEN_BRAND__`
 * ab; diese Datei ist die einzige Stelle, die davon weiß.
 */

export type BrandAsset = 'icon' | 'schriftzug' | 'schriftzug-dunkel';

declare global {
  interface Window {
    __ENTGEGEN_BRAND__?: Partial<Record<BrandAsset, string>>;
  }
}

const DATEINAMEN: Record<BrandAsset, string> = {
  icon: 'icon-192.png',
  schriftzug: 'schriftzug.png',
  'schriftzug-dunkel': 'schriftzug-dunkel.png',
};

export function brandAsset(name: BrandAsset): string {
  const eingebettet = typeof window === 'undefined' ? undefined : window.__ENTGEGEN_BRAND__?.[name];
  return eingebettet ?? `${import.meta.env.BASE_URL}${DATEINAMEN[name]}`;
}
