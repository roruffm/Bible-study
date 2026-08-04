# Lumina – Bibel lesen und verstehen

Interaktive Bibelstudium-Anwendung: vollständiger Bibeltext, jeder Vers
anklickbar, mit **historischem Kontext** und **verbreiteten Auslegungen** auf
Abruf – dazu Notizen, Markierungen, Volltextsuche und Lesefortschritt.

📄 Das ausführliche Konzept (Vision, Funktionsumfang, UI/UX, Roadmap) steht in
**[KONZEPT.md](KONZEPT.md)**. Dieses README beschreibt den **umgesetzten
Stand (Phase 1 bis 3 der Roadmap)**.

---

## Die App aufrufen

Bei jedem Push auf den Standard-Branch baut
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) die App und
stellt sie über **GitHub Pages** bereit:

> **https://roruffm.github.io/Bible-study/**

### Einmalig: Pages einschalten

GitHub Pages muss **einmal von Hand** aktiviert werden – das Token eines
Workflows darf eine Pages-Seite nicht selbst anlegen und scheitert sonst mit
`Resource not accessible by integration`:

> **Settings → Pages → Build and deployment → Source: „GitHub Actions“**

Danach genügt ein beliebiger Push (oder *Actions → Webseite veröffentlichen →
Run workflow*), und die Seite ist nach ein bis zwei Minuten online. Ab dann
läuft alles automatisch.

### Wie der Workflow arbeitet

Weil eine Projektseite unter `/<repository>/` liegt und nicht unter `/`, setzt
der Workflow den Basispfad über die Umgebungsvariable `BASE_PATH`; lokal
bleibt es bei `/`. Der Router bekommt denselben Pfad als `basename`, Icon und
Manifest werden über `%BASE_URL%` aufgelöst.

GitHub Pages leitet unbekannte Pfade nicht auf die App um – deshalb wird
`index.html` zusätzlich als `404.html` abgelegt, damit auch ein direkt
aufgerufener Link wie `/bibel/joh/3` in der App landet.

Ohne Hosting geht es auch: siehe [Als einzelne Datei](#als-einzelne-datei).

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
| **Vers-Panel** | Vier Tabs: historischer Kontext, Auslegungen, Querverweise, eigene Notizen – dazu „Im Vers erwähnt“ mit Sachwissen zu allem, was im Vers vorkommt |
| **Volltextsuche** | Alle 31.102 Verse, Mehrwortsuche, Phrasensuche in `"…"`, Filter nach Testament und Buch, Treffer hervorgehoben |
| **Lesepläne** | Vier Durchlese-Pläne (365 / 90 / 30 / 60 Tage) und 13 kuratierte Themenstudien, nach Sachgebiet gruppiert, mit Tagesfortschritt |
| **Lexikon** | 124 Einträge in sieben Kategorien – Personen, Orte, Begriffe, Maße & Geld, Ämter, Bräuche, Natur & Stoffe |
| **Zeitleiste** | 10 Epochen und 97 Einträge auf maßstabsgetreuer Achse – biblische Ereignisse, Weltgeschichte, außerbiblische Funde und die Entstehung der Bücher, einzeln filterbar |
| **Karte** | 99 Orte und Landschaften von Rom bis Susa, 9 Wege (Abraham, Auszug, Exil, Wege Jesu, die sieben Gemeinden, drei Missionsreisen, die Fahrt nach Rom), sechs Ausschnitte, Ortssuche und zu jedem Ort Hintergrund und Bibelstellen |
| **Merkverse** | Auswendiglernen mit wachsenden Abständen; je Stufe verschwinden mehr Wörter |
| **Offline** | Service Worker; gelesene Kapitel bleiben gespeichert, auf Wunsch die ganze Bibel (≈ 4 MB) |
| **Persönliches** | Notizen, Markierungen in vier Farben, gelesene Kapitel, Export des Journals als Markdown |
| **Darstellung** | Hell, Sepia und Dunkel; responsiv vom Handy bis Desktop; Tastaturbedienung |
| **Vers des Tages** | 50 kuratierte Verse mit kurzem Einordnungsimpuls |

### Inhaltlicher Bestand

- **Steckbriefe zu allen 66 Büchern** – Verfasser, Zeit, Anlass, Kernaussage.
  Damit hat jeder Vers von Beginn an eine historische Einordnung.
- **Vertiefte Artikel zu 113 Schlüsselabschnitten** mit 343 einzeln
  ausgewiesenen Auslegungen, zusammen **1.346 Verse**. **Jedes der 66 Bücher
  hat mindestens einen Artikel** – von der Schöpfung über die Bindung Isaaks,
  den Durchzug durchs Meer, David und Goliat, Nathans Gleichnis, den
  aaronitischen Segen und Naamans Heilung bis zu Sämann, Zinsgroschen,
  Emmaus, Kornelius, dem Abendmahl in Korinth und dem Brief nach Laodizea.
  Umstrittene Stellen wie Jesaja 7,14, „Du bist Petrus“, Römer 13 oder
  1. Timotheus 2 werden ausdrücklich als umstritten dargestellt.
- **Zeitleiste mit 97 Einträgen in vier Kategorien**, die einander erst
  verständlich machen: was die Bibel erzählt (33), was gleichzeitig anderswo
  geschah (32), was sich außerhalb der Bibel nachweisen lässt (15) und wann
  die Bücher selbst entstanden (17). So steht die Große Pyramide neben
  Abraham, die Tel-Dan-Inschrift neben David und die Entstehung des
  Danielbuchs 400 Jahre nach der Zeit, von der es erzählt.
- **Zeitliche Einordnung zu jedem Artikel** – getrennt nach **Ereigniszeit**
  („wann spielt das?“) und **Entstehungszeit** („wann wurde es
  aufgeschrieben?“). Beides fällt regelmäßig weit auseinander: Der Feuerofen
  spielt im 6. Jahrhundert v. Chr., das Buch Daniel entstand rund 400 Jahre
  später. Jede Angabe verlinkt auf die passende Epoche der Zeitleiste.

- **Sachwissen zur Lebenswelt der Bibel:** Maße, Gewichte und Geld, Ämter und
  Gruppen, Bräuche und Feste, Pflanzen und Stoffe. Weil diese Begriffe
  hundertfach vorkommen, erreichen sie **rund 31 % aller 31.102 Verse** –
  auch dort, wo es keinen eigenen Artikel gibt. Beispiele: ein Groschen ist
  ein Tageslohn, eine Elle rund 45 cm, ein Zentner etwa 34 kg Silber, und
  „Ostern“ meint bei Luther im Neuen Testament immer das Passafest.
- **13 kuratierte Themenstudien** mit Tagesüberschrift und einordnendem
  Impuls, gruppiert nach Sachgebiet:
  - *Zum Anfangen:* Die Bibel kennenlernen (14 Tage)
  - *Lebensfragen:* Hoffnung wenn es dunkel wird · Angst und Vertrauen ·
    Zweifel und Ringen mit Gott · Abschied, Trauer und Trost · Vergebung
  - *Glauben verstehen:* Wer ist Jesus? · Beten lernen · Der Heilige Geist
  - *Leben in der Welt:* Gerechtigkeit: Gott und die Armen · Geld, Besitz und
    Genug · Schöpfung und Verantwortung · Weisheit für den Alltag

- **99 Orte und Landschaften auf der Karte**, jeder mit Bibelstellen und
  fast alle mit einem Hintergrundtext: warum Jerusalem ohne Fluss und ohne
  Handelsstraße Hauptstadt wurde, warum das Wasser von Laodizea lauwarm
  ankam, warum Tyrus heute eine Halbinsel ist. Dazu **9 Wege** – Abrahams
  Route, der Auszug, der Weg ins Exil, die Wege Jesu, die Ringstraße der
  sieben Gemeinden, die drei Missionsreisen und die Fahrt nach Rom – und
  sechs Ausschnitte vom Gesamtbild bis nach Israel hinein.

**Mindesttiefe je Artikel:** ausführlicher historischer Kontext und
mindestens drei Auslegungen aus verschiedenen Traditionen. Jeder Kartenort
braucht mindestens eine Bibelstelle. Das Prüfskript setzt beides durch, damit
es beim Weiterschreiben nicht verlorengeht.

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

Die Küstenlinien des Kartenmoduls stammen aus
[Natural Earth](https://www.naturalearthdata.com/) (gemeinfrei) und liegen
zugeschnitten und vereinfacht unter `public/karten/` bei. Neu erzeugen lassen
sie sich mit `node scripts/build-map-data.mjs` – aus knapp 3 MB Weltdaten
werden dabei 19 KB für den Ausschnitt der biblischen Welt.

---

## Aufbau des Projekts

```
public/bibel/luther1912/   Bibeltext: index.json + eine Datei je Buch
scripts/
  books.mjs                Kanonische Buchliste mit Gruppen und Abkürzungen
  build-bible-data.mjs     Rohdaten → kompaktes App-Format
  build-map-data.mjs       Natural-Earth-Küstenlinien zuschneiden
  build-singlefile.mjs     Alles in eine einzelne HTML-Datei bündeln
  check-references.mjs     Alle Stellenangaben gegen den Bibeltext prüfen
  smoke-test.mjs           Browser-Test gegen den Vorschau-Server
  test-singlefile.mjs      Prüft die Einzeldatei ohne Server und ohne Netz
src/
  content/                 Redaktionelle Inhalte
    bookProfiles.ts          Steckbriefe aller 66 Bücher
    commentary.ts            Kontext- und Auslegungsartikel
    datings.ts               Ereignis- und Entstehungszeit je Artikel
    lexicon.ts               Personen, Orte, Begriffe
    realia.ts                Maße, Geld, Ämter, Bräuche, Naturkunde
    timeline.ts              Epochen und Ereignisse
    journeys.ts              Reiserouten für die Karte
    places.ts                Orte, Landschaften und Kartenausschnitte
    readingPlans.ts          Lese- und Themenpläne
    verseOfDay.ts            Kuratierte Verse für den Tagesimpuls
  lib/
    bibleData.ts           Laden und Zwischenspeichern der Bücher
    reference.ts           Parser für Stellenangaben
    search.ts              Volltextindex und Suche
    storage.ts             Notizen, Markierungen, Pläne, Einstellungen (lokal)
    offline.ts             Stand und Steuerung des Offline-Speichers
    mapData.ts             Küstenlinien laden
    mapLabels.ts           Beschriftungen überschneidungsfrei verteilen
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
Vers-Panel, Notizen, Suche, Lesepläne, Lexikon, Zeitleiste, Karte, Merkverse,
Themenwechsel, mobile Ansicht und den echten Offline-Betrieb mit
abgeschalteter Verbindung (71 Prüfungen):

```bash
npm install --no-save playwright
npm run build
npm run preview &            # Vorschau auf Port 4173
node scripts/smoke-test.mjs  # legt Screenshots in smoke-shots/ ab
```

Die redaktionellen Inhalte enthalten mehrere hundert Stellenangaben. Ein
eigenes Skript vergleicht **jede** davon mit den tatsächlichen Kapitel- und
Verszahlen, damit kein Verweis auf ein leeres Kapitel oder den falschen Vers
zeigt:

```bash
node scripts/check-references.mjs
```

Geprüft werden Artikel, Querverweise, Lesepläne, Lexikon, Zeitleiste, Vers
des Tages und die Karte – zurzeit 864 Angaben. Es meldet zugleich, wie weit
die Inhalte reichen: wie viele Abschnitte und Verse abgedeckt sind, ob ein
Buch noch ganz ohne Artikel dasteht und wie viele Orte einen Hintergrundtext
haben. Für die Karte prüft es außerdem, dass jeder Ort im Kartenausschnitt
liegt, keine Kennung doppelt vergeben ist und jeder Lexikonverweis trifft.

> **Achtung bei der Verszählung:** Der Datenbestand folgt der international
> üblichen Zählung, die gedruckte Lutherbibel weicht an rund 355 Stellen
> davon ab. Psalmen zählen die Überschrift als Vers 1 (Psalm 51,10 statt
> 51,12), und die Geistausgießung steht in Joel 2,28 statt 3,1. Wo eine
> abweichende Luther-Angabe existiert, weist das Vers-Panel darauf hin.

Die Einzeldatei wird gesondert geprüft – sie wird als lokale Datei geöffnet
und darf dabei keine einzige Netzanfrage stellen (11 Prüfungen):

```bash
npm run build:single
node scripts/test-singlefile.mjs
```

---

## Nächste Schritte (Phase 4 laut Konzept)

- Gruppenmodus für Hauskreise: geteilte Notizen und Diskussionsfragen
- Übersetzungsvergleich, sobald eine zweite Übersetzung lizenziert ist
- Vorlesefunktion und Erinnerungen für den Leseplan
- Weiterer redaktioneller Ausbau der Kontextartikel und des Lexikons
