# Lumina – Bibel lesen und verstehen

Interaktive Bibelstudium-Anwendung: vollständiger Bibeltext, jeder Vers
anklickbar, mit **historischem Kontext** und **verbreiteten Auslegungen** auf
Abruf – dazu Notizen, Markierungen, Volltextsuche und Lesefortschritt.

📄 Das ausführliche Konzept (Vision, Funktionsumfang, UI/UX, Roadmap) steht in
**[KONZEPT.md](KONZEPT.md)**. Dieses README beschreibt den **umgesetzten
Stand (Phase 1 und 2 der Roadmap)**.

---

## Schnellstart

```bash
npm install
npm run dev      # Entwicklungsserver auf http://127.0.0.1:5173
npm run build    # Produktionsbuild nach dist/
npm run preview  # Produktionsbuild lokal ausliefern
```

Der Bibeltext liegt bereits aufbereitet unter `public/bibel/` – ein separater
Datenimport ist für den Start nicht nötig.

### Als einzelne Datei

```bash
npm run build:single   # erzeugt dist-single/lumina.html
```

Das Ergebnis ist **eine HTML-Datei von rund 2 MB**, die den vollständigen
Bibeltext enthält. Sie läuft per Doppelklick im Browser – ohne Server, ohne
Installation und ohne Netzverbindung – und lässt sich weitergeben oder auf
einen USB-Stick legen.

Damit die Datei klein bleibt, wird der Text gzip-komprimiert und
base64-kodiert eingebettet (3,9 MB → 1,7 MB); die App entpackt ihn beim Start
über `DecompressionStream`. In diesem Modus übernimmt der Hash die Navigation,
weil es keinen Server gibt, der Pfade auf die App zurückführen könnte.

Zusätzlich entsteht `dist-single/lumina-fragment.html` – dieselbe App ohne
eigenes `<html>`-Grundgerüst, zum Einbetten in fremde Seiten.

---

## Was funktioniert

| Bereich | Umgesetzt |
|---|---|
| **Bibeltext** | Alle 66 Bücher, 1.189 Kapitel, 31.102 Verse |
| **Bibliothek** | Bücher nach Kanon-Gruppen, farblich codiert, mit Lesefortschritt |
| **Schnellsprung** | Erkennt `Joh 3,16`, `1. Mose 1`, `Psalm 23,1-6`, `1kor 13`, auch lateinische Namen (`Genesis`, `Apokalypse`) |
| **Leseansicht** | Buchähnliches Layout, anklickbare Verse, Blättern per Pfeiltasten, Schriftgröße stufenlos |
| **Vers-Panel** | Vier Tabs: historischer Kontext, Auslegungen, Querverweise, eigene Notizen |
| **Volltextsuche** | Alle 31.102 Verse, Mehrwortsuche, Phrasensuche in `"…"`, Filter nach Testament und Buch, Treffer hervorgehoben |
| **Lesepläne** | Vier Durchlese-Pläne (365 / 90 / 30 / 60 Tage) und drei kuratierte Themenpläne, mit Tagesfortschritt |
| **Offline** | Service Worker; gelesene Kapitel bleiben gespeichert, auf Wunsch die ganze Bibel (≈ 4 MB) |
| **Persönliches** | Notizen, Markierungen in vier Farben, gelesene Kapitel, Export des Journals als Markdown |
| **Darstellung** | Hell, Sepia und Dunkel; responsiv vom Handy bis Desktop; Tastaturbedienung |
| **Vers des Tages** | 50 kuratierte Verse mit kurzem Einordnungsimpuls |

### Inhaltlicher Bestand

- **Steckbriefe zu allen 66 Büchern** – Verfasser, Zeit, Anlass, Kernaussage.
  Damit hat jeder Vers von Beginn an eine historische Einordnung.
- **Vertiefte Artikel zu 40 Schlüsselabschnitten** mit 119 einzeln
  ausgewiesenen Auslegungen – Schöpfung, Zehn Gebote, Schma Israel, Psalm 1,
  22, 23, 51, 121, 137, Jesaja 53, Seligpreisungen, Vaterunser, Magnificat,
  Weihnachtsgeschichte, Sturmstillung, barmherziger Samariter, verlorener
  Sohn, Johannesprolog, Römer 8, 1. Korinther 13, Offenbarung 21 und weitere,
  jeweils mit historischem Kontext und Querverweisen.
- **Sieben Lesepläne**, davon drei kuratierte Themenwege („Hoffnung, wenn es
  dunkel wird“, „Wer ist Jesus?“, „Vergebung“) mit Tagesüberschrift und
  einordnendem Impuls.

**Redaktionsprinzip:** Auslegungen stehen **beschreibend nebeneinander**,
jeweils mit Angabe der Tradition (reformatorisch, katholisch, orthodox,
jüdisch, historisch-kritisch, befreiungstheologisch …). Die App entscheidet
nicht, welche Deutung richtig ist – sie zeigt, dass ein Text verschieden
gelesen wird, und benennt, woher eine Lesart kommt.

---

## Textgrundlage und Lizenz

Die Anwendung nutzt derzeit die **Lutherbibel 1912** – eine gemeinfreie
Übersetzung.

Die im Konzept gewünschte Übersetzung **Hoffnung für Alle ist
urheberrechtlich geschützt** (© Biblica Inc., herausgegeben von Fontis) und
darf nicht ohne Vereinbarung eingebettet werden. Nötig ist eine Lizenz von
Biblica/Fontis oder die Anbindung über eine lizenzierte Schnittstelle wie
[API.Bible](https://scripture.api.bible/).

Die Architektur ist deshalb von Anfang an **übersetzungs-agnostisch**: Eine
Übersetzung ist nur ein Datensatz unter `public/bibel/<id>/`. Sobald die
Lizenz vorliegt, wird die HFA als weiterer Datensatz ergänzt und in
`src/lib/bibleData.ts` aktiviert – ohne Änderung an der Oberfläche. Derselbe
Mechanismus ermöglicht später den Übersetzungsvergleich (Konzept, Idee 5).

Rohdaten der Lutherbibel 1912: [wldeh/bible-api](https://github.com/wldeh/bible-api).

---

## Aufbau des Projekts

```
public/bibel/luther1912/   Bibeltext: index.json + eine Datei je Buch
scripts/
  books.mjs                Kanonische Buchliste mit Gruppen und Abkürzungen
  build-bible-data.mjs     Rohdaten → kompaktes App-Format
  build-singlefile.mjs     Alles in eine einzelne HTML-Datei bündeln
  smoke-test.mjs           Browser-Test gegen den Vorschau-Server
  test-singlefile.mjs      Prüft die Einzeldatei ohne Server und ohne Netz
src/
  content/                 Redaktionelle Inhalte
    bookProfiles.ts          Steckbriefe aller 66 Bücher
    commentary.ts            Kontext- und Auslegungsartikel
    readingPlans.ts          Lese- und Themenpläne
    verseOfDay.ts            Kuratierte Verse für den Tagesimpuls
  lib/
    bibleData.ts           Laden und Zwischenspeichern der Bücher
    reference.ts           Parser für Stellenangaben
    search.ts              Volltextindex und Suche
    storage.ts             Notizen, Markierungen, Pläne, Einstellungen (lokal)
    offline.ts             Stand und Steuerung des Offline-Speichers
  pages/                   Heute, Bibliothek, Buch, Leseansicht, Suche,
                           Studium, Plan, Ich
```

### Ein Hinweis für Weiterentwicklung

Alle Lesefunktionen in `lib/storage.ts` sind **memoisiert** und geben bei
unverändertem Speicher dasselbe Objekt zurück. Das ist keine Optimierung,
sondern Bedingung: `usePersisted` baut auf `useSyncExternalStore` auf, und
React bricht mit „Maximum update depth exceeded“ ab, sobald ein Selektor bei
jedem Aufruf einen neuen Wert liefert. Fallwerte wie `?? []` gehören deshalb
in die Speicherschicht, nicht in den Selektor.

### Lesepläne

Durchlese-Pläne werden zur Laufzeit aus dem Bibel-Index berechnet – 365 Tage
müssen nicht von Hand gepflegt werden und bleiben automatisch korrekt.
Themenpläne sind in `content/readingPlans.ts` kuratiert und tragen zu jedem
Tag eine Überschrift und einen einordnenden Satz.

### Datenformat

Pro Buch eine Datei, Versnummern sind implizit über den Array-Index abgebildet
(spart rund ein Drittel der Dateigröße):

```json
{ "id": "joh", "name": "Johannes", "abbr": "Joh",
  "chapters": [ ["Im Anfang war das Wort…", "…"], … ] }
```

Eine andere Quelle lässt sich so einbinden:

```bash
node scripts/build-bible-data.mjs <quellverzeichnis> <übersetzungs-id>
```

---

## Datenschutz

Notizen, Markierungen und Lesefortschritt liegen ausschließlich im
`localStorage` des Browsers. Die App braucht **kein Konto** und sendet keine
Nutzungsdaten. Das ist bewusst gewählt: Lesegewohnheiten in religiösen Texten
sind nach Art. 9 DSGVO besonders schutzwürdig.

---

## Tests

Der Smoke-Test fährt die gebaute App in Chromium durch – Schnellsprung,
Vers-Panel, Notizen, Suche, Lesepläne, Themenwechsel, mobile Ansicht und den
echten Offline-Betrieb mit abgeschalteter Verbindung (31 Prüfungen):

```bash
npm install --no-save playwright
npm run build
npm run preview &            # Vorschau auf Port 4173
node scripts/smoke-test.mjs  # legt Screenshots in smoke-shots/ ab
```

Die Einzeldatei wird gesondert geprüft – sie wird als lokale Datei geöffnet
und darf dabei keine einzige Netzanfrage stellen (9 Prüfungen):

```bash
npm run build:single
node scripts/test-singlefile.mjs
```

---

## Nächste Schritte (Phase 3 laut Konzept)

- Personen- und Begriffslexikon, verlinkt aus dem Bibeltext heraus
- Interaktive Zeitleiste und Kartenmodul (Paulusreisen, Exil-Routen)
- Vers-Memorisation mit gestuftem Ausblenden und Wiederholung
- Weiterer redaktioneller Ausbau der Kontextartikel, Buch für Buch
- Vorlesefunktion und Erinnerungen für den Leseplan
