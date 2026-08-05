# Entgegen – Bibel lesen und verstehen

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
npm run build:single   # erzeugt dist-single/entgegen.html
```

Das Ergebnis ist **eine HTML-Datei von rund 2 MB**, die den vollständigen
Bibeltext enthält. Sie läuft per Doppelklick im Browser – ohne Server, ohne
Installation und ohne Netzverbindung – und lässt sich weitergeben oder auf
einen USB-Stick legen.

Damit die Datei klein bleibt, wird der Text gzip-komprimiert und
base64-kodiert eingebettet (3,9 MB → 1,7 MB); die App entpackt ihn beim Start
über `DecompressionStream`. In diesem Modus übernimmt der Hash die Navigation,
weil es keinen Server gibt, der Pfade auf die App zurückführen könnte.

Zusätzlich entsteht `dist-single/entgegen-fragment.html` – dieselbe App ohne
eigenes `<html>`-Grundgerüst, zum Einbetten in fremde Seiten.

---

## Was funktioniert

| Bereich | Umgesetzt |
|---|---|
| **Bibeltext** | Alle 66 Bücher, 1.189 Kapitel, 31.102 Verse |
| **Bibliothek** | Bücher nach Kanon-Gruppen, farblich codiert, mit Lesefortschritt |
| **Schnellsprung** | Erkennt `Joh 3,16`, `1. Mose 1`, `Psalm 23,1-6`, `1kor 13`, auch lateinische Namen (`Genesis`, `Apokalypse`) |
| **Leseansicht** | Buchähnliches Layout, anklickbare Verse, Blättern per Pfeiltasten, Schriftgröße stufenlos |
| **Vers-Panel** | Fünf Tabs: historischer Kontext, Auslegungen, Querverweise, Rückfragen, eigene Notizen – dazu „Im Vers erwähnt“ mit Sachwissen zu allem, was im Vers vorkommt |
| **Rückfragen am Vers** | Fragen zu einer Stelle stellen und Antworten bekommen, die auf dem Bestand der App fußen – Kontext, Auslegungen, Verweise, oder was die Stelle mit dem eigenen Leben zu tun hat. Standardmäßig aus; siehe [Rückfragen am Vers](#rückfragen-am-vers) |
| **Volltextsuche** | Alle 31.102 Verse, Mehrwortsuche, Phrasensuche in `"…"`, Filter nach Testament und Buch, Treffer hervorgehoben |
| **Lesepläne** | Vier Durchlese-Pläne (365 / 90 / 30 / 60 Tage) und 13 kuratierte Themenstudien, nach Sachgebiet gruppiert, mit Tagesfortschritt |
| **Lexikon** | 124 Einträge in sieben Kategorien – Personen, Orte, Begriffe, Maße & Geld, Ämter, Bräuche, Natur & Stoffe |
| **Konkordanz** | Alle Vorkommen eines Wortes in biblischer Reihenfolge, mit der Verteilung über die 66 Bücher; zählt ganze Wörter |
| **Synopse** | 156 Abschnitte der Evangelien nebeneinander – bis zu vier Fassungen im Wortlaut, mit Hinweis auf den Unterschied |
| **Zeitleiste** | 10 Epochen und 97 Einträge auf maßstabsgetreuer Achse – biblische Ereignisse, Weltgeschichte, außerbiblische Funde und die Entstehung der Bücher, einzeln filterbar |
| **Karte** | 188 Orte und Landschaften von Rom bis Susa, nach Epoche filterbar, 9 Wege (Abraham, Auszug, Exil, Wege Jesu, die sieben Gemeinden, drei Missionsreisen, die Fahrt nach Rom), sechs Ausschnitte, freies Ziehen und Vergrößern, Maßstabsbalken, Ortssuche und zu jedem Ort Hintergrund und Bibelstellen |
| **Merkverse** | Auswendiglernen mit wachsenden Abständen; je Stufe verschwinden mehr Wörter |
| **Offline** | Service Worker; gelesene Kapitel bleiben gespeichert, auf Wunsch die ganze Bibel (≈ 4 MB) |
| **Persönliches** | Notizen, Markierungen in vier Farben, gelesene Kapitel, Export des Journals als Markdown |
| **Darstellung** | Hell, Sepia und Dunkel; responsiv vom Handy bis Desktop; Tastaturbedienung |
| **Vers des Tages** | 50 kuratierte Verse mit kurzem Einordnungsimpuls |

### Inhaltlicher Bestand

- **Steckbriefe zu allen 66 Büchern** – Verfasser, Zeit, Anlass, Kernaussage.
  Damit hat jeder Vers von Beginn an eine historische Einordnung.
- **Vertiefte Artikel zu 275 Schlüsselabschnitten** mit 920 einzeln
  ausgewiesenen Auslegungen aus 207 Traditionen, zusammen **2.212 Verse**.
  **Jedes der 66 Bücher hat mindestens einen Artikel**, und nur noch vier
  haben genau einen – Philemon, 2. und 3. Johannes und Judas, allesamt
  einkapitelige Briefe, bei denen ein Artikel angemessen ist (anfangs waren
  es 52 Bücher). 95 Artikel bieten vier oder mehr Auslegungen – von der Schöpfung über die Bindung Isaaks,
  den Durchzug durchs Meer, David und Goliat, Nathans Gleichnis, den
  aaronitischen Segen und Naamans Heilung bis zu Sämann, Zinsgroschen,
  Emmaus, Kornelius, dem Abendmahl in Korinth und dem Brief nach Laodizea.
  Umstrittene Stellen wie Jesaja 7,14, „Du bist Petrus“, Römer 13 oder
  1. Timotheus 2 werden ausdrücklich als umstritten dargestellt.
  Abgedeckt sind inzwischen auch die klassischen **Schlüsselverse**, nach
  denen am häufigsten gesucht wird – von 1. Mose 15,6 über Psalm 23, 46,
  91, 103 und 139, Jesaja 40,31, 41,10 und 43,1 bis zu Johannes 11,25,
  Römer 8,1, 1. Korinther 13, Galater 5,22, Philipper 4,13 und 1. Petrus
  5,7. Jede Überschrift, die ein Bibelwort zitiert, gibt es im Wortlaut
  der Lutherbibel von 1912 wieder; das Prüfskript setzt das durch.
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

- **188 Orte und Landschaften auf der Karte**, jeder mit Bibelstellen und
  128 davon mit einem Hintergrundtext: warum Jerusalem ohne Fluss und ohne
  Handelsstraße Hauptstadt wurde, warum das Wasser von Laodizea lauwarm
  ankam, warum Tyrus heute eine Halbinsel ist, warum in Lystra ausgerechnet
  „Zeus und Hermes“ gerufen wird. Dazu **9 Wege** – Abrahams Route, der
  Auszug, der Weg ins Exil, die Wege Jesu, die Ringstraße der sieben
  Gemeinden, die drei Missionsreisen und die Fahrt nach Rom –, jeweils mit
  Etappenlängen in Kilometern.

  Die Karte lässt sich ziehen und vergrößern, hat sechs voreingestellte
  Ausschnitte und einen Maßstabsbalken. Was auf dem Bildschirm keinen Platz
  hat, wird ausgeblendet statt übereinandergestapelt: Namen weichen den
  wichtigeren, Punkte, die aufeinanderlägen, erscheinen erst beim
  Hineinzoomen. Der Smoke-Test misst das nach – in keinem Ausschnitt
  überdeckt ein Name oder ein Punkt einen anderen.

**Die Module greifen ineinander.** Jeder Bereich ist mit den anderen
verbunden, statt für sich zu stehen:

- Beim Lesen stehen unter dem Kapitel die **Orte, die darin vorkommen** –
  abgeglichen mit den Schreibweisen der Lutherbibel von 1912 („Beth-El“,
  „Askalon“, „Beer-Seba“). Das erreicht **695 der 1189 Kapitel**, also
  deutlich mehr als die 250 Kapitel mit einem Artikel.
- Beim Lesen eines Evangeliums stehen darunter die **Parallelstellen** in den
  anderen dreien, mit einem Klick zum Vergleich im Wortlaut. Die Synopse
  umfasst **156 Abschnitte** in sechs Erzählstufen, davon 97 in mehreren
  Evangelien, mit Anmerkungen zu dem, was der Vergleich zeigt.
- **Zeitleiste und Karte sind in beide Richtungen verbunden:** 81 der 97
  Ereignisse tragen einen Ort, jedes verlinkt auf die Karte. Umgekehrt lässt
  sich die Karte auf eine Epoche einschränken – dann bleiben nur die Orte
  übrig, an denen in dieser Zeit etwas geschah. Jede Ortstafel zeigt
  außerdem, was dort geschah und welche Wege darüber führten.
- Aus dem Vers-Panel und aus dem Lexikon führt zu jedem Stichwort ein Weg in
  die **Konkordanz**.

**Mindesttiefe je Artikel:** ausführlicher historischer Kontext und
mindestens drei Auslegungen aus verschiedenen Traditionen. Jeder Kartenort
braucht mindestens eine Bibelstelle. Zwei Artikel dürfen sich nicht
überschneiden – sonst stünden sie im Vers-Panel doppelt. Das Prüfskript setzt
alles drei durch, damit es beim Weiterschreiben nicht verlorengeht.

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
brand/                     Logo-Vorlage, aus der die Bilder erzeugt werden
scripts/
  books.mjs                Kanonische Buchliste mit Gruppen und Abkürzungen
  build-bible-data.mjs     Rohdaten → kompaktes App-Format
  build-map-data.mjs       Natural-Earth-Küstenlinien zuschneiden
  build-singlefile.mjs     Alles in eine einzelne HTML-Datei bündeln
  build-brand.py           Icon und Schriftzug aus der Logo-Vorlage schneiden
  fake-model.mjs           Attrappe der Sprachmodell-Schnittstelle für den Test
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
    synopsis.ts              Perikopen der Evangelien mit ihren Parallelen
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
    placeText.ts           Ortsnamen im Kapiteltext erkennen
    chat.ts                Rückfragen am Vers: Anfrage und redaktionelle Haltung
    chatContext.ts         Stellt zusammen, was die App zu einer Stelle weiß
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

## Rückfragen am Vers

Im Vers-Panel steht unter **Fragen** ein Gespräch zur aufgeschlagenen Stelle:
Wie hängt der Vers mit dem Kapitel zusammen? Was ist daran umstritten? Welche
Stellen gehören dazu? Was hat das mit meinem Leben zu tun?

Der Unterschied zu einem allgemeinen Chatfenster liegt in der Grundlage. Mit
jeder Frage geht mit, was die App zu genau dieser Stelle hinterlegt hat: der
Wortlaut mit sechs Versen Umgebung, der Buchsteckbrief, der Artikel samt
Ereignis- und Entstehungszeit, die Auslegungen **mit Angabe ihrer Tradition**,
die Querverweise, die Lexikoneinträge des Verses, die Orte des Kapitels und die
Parallelen in den Evangelien. Für Johannes 3,16 sind das rund 3.900 Zeichen
geprüftes Material.

Die redaktionelle Haltung der App ist in die Anweisungen übersetzt: Auslegungen
stehen nebeneinander, keine wird zur richtigen erklärt; erfundene Stellenangaben
sind untersagt; Zitate folgen dem Wortlaut der Lutherbibel von 1912; bei
persönlichen Fragen ist das Modell Gesprächspartner und ausdrücklich weder
Seelsorger noch Therapeut, und bei einer akuten Krise nennt es zuerst die
Telefonseelsorge.

### Warum ein eigener Zugang nötig ist

Die App liegt als statische Seite auf GitHub Pages. Es gibt keinen Server, der
einen Schlüssel geheim halten könnte – ein mitgelieferter Schlüssel stünde für
jeden lesbar im Auslieferungspaket. Daher zwei Wege, einzustellen unter
**Ich → Rückfragen am Vers**:

| Weg | Wie es läuft | Wofür |
|---|---|---|
| **Eigener Schlüssel** | Der Schlüssel liegt in diesem Browser, die Anfrage geht direkt an Anthropic | Schnell eingerichtet. Aber: Jedes Skript auf dieser Seite könnte den Schlüssel lesen – nimm einen mit Ausgabenlimit und nicht auf fremden Geräten |
| **Eigener Server** | Die Anfrage geht an einen selbst betriebenen Server, der den Schlüssel hält | Aufwendiger, dafür bleibt der Schlüssel geheim. Der Server muss `/v1/messages` anbieten und CORS erlauben |

Voreingestellt ist **Claude Opus 5**; Sonnet 5 und Haiku 4.5 stehen als
schnellere und günstigere Alternativen zur Wahl. Die Kosten trägt, wem der
Schlüssel gehört.

### Was das für den Rest der App bedeutet

Nichts – solange der Zugang nicht eingerichtet ist. Das SDK wiegt rund 175 KB
und wird deshalb erst beim ersten Gebrauch nachgeladen und ausdrücklich **nicht**
in den Offline-Vorabruf aufgenommen (`globIgnores` in `vite.config.ts`). Der
Vorab-Cache wächst durch diese Funktion um 15 KB, nicht um 190.

In der Einzeldatei-Fassung sind die Rückfragen abgeschaltet: Sie ist eine Datei
zum Verschicken, die ohne Server und ohne Netz läuft – beides braucht die
Rückfrage.

### Getestet wird gegen eine Attrappe

`scripts/fake-model.mjs` antwortet im Format der Anthropic-Schnittstelle. Den
echten Dienst zu rufen wäre teuer, langsam, von einem Schlüssel abhängig und in
der Antwort nicht vorhersagbar – während alles, was hier am eigenen Code hängt,
mit der Attrappe vollständig prüfbar ist: dass die Funktion ohne Einrichtung
wirklich aus ist, dass der zusammengestellte Kontext ankommt, dass die Antwort
schon während des Empfangs erscheint und dass ein abgelehnter Schlüssel als
verständlicher Satz ankommt.

```bash
node scripts/fake-model.mjs &   # Attrappe auf Port 4319
node scripts/smoke-test.mjs     # ohne sie werden diese Prüfungen übersprungen
```

---

## Name und Marke

Die App heißt **Entgegen**. Der Name meint die Bewegung, um die es geht: Ein
Text aus einer fremden Zeit kommt einem entgegen, sobald man weiß, woher er
kommt – wann er spielt, wann er aufgeschrieben wurde, wie er gelesen worden
ist.

Das Zeichen zeigt einen gewundenen Weg unter einem Kreuz; das geschwungene Ɛ
und der Weg sind dieselbe Linie. Aus der gelieferten Vorlage
(`brand/entgegen-original.png`) erzeugt `scripts/build-brand.py` alles, was
Browser und Betriebssysteme brauchen:

| Datei | Wozu |
|---|---|
| `public/icon-512.png`, `icon-192.png` | App-Icon, freigestellte Ecken |
| `public/icon-maskable.png` | Android, das beliebige Formen ausschneidet – Teal-Fläche mit 20 % Sicherheitsrand |
| `public/apple-touch-icon.png` | Startbildschirm unter iOS |
| `public/favicon-32.png`, `favicon-48.png` | Browserkachel. Eine nachgezeichnete SVG-Fassung wäre schärfer, sähe aber anders aus als das Zeichen überall sonst – bei dieser Größe ist ohnehin jedes Icon unscharf |
| `public/schriftzug.png`, `schriftzug-dunkel.png` | Schriftzug, freigestellt; die zweite Fassung mit aufgehelltem Teal für das dunkle Erscheinungsbild |
| `public/vorschau.png` | Vorschaubild für geteilte Links |

Die Leitfarbe der App ist das Teal des Icons (`#164c58`), im dunklen
Erscheinungsbild aufgehellt zu `#7fbccb`.

**Beim Umbenennen mitgezogen:** Der Speicherschlüssel im Browser hing am alten
Namen. Wer die App vorher benutzt hat, hätte Notizen, Markierungen, Merkverse
und Lesefortschritt verloren – die Daten lägen noch da, nur läse sie niemand
mehr. `src/lib/storage.ts` zieht sie deshalb beim ersten Start einmalig um und
lässt die alten Einträge liegen.

---

## Datenschutz

Notizen, Markierungen und Lesefortschritt liegen ausschließlich im
`localStorage` des Browsers. Die App braucht **kein Konto** und sendet keine
Nutzungsdaten. Das ist bewusst gewählt: Lesegewohnheiten in religiösen Texten
sind nach Art. 9 DSGVO besonders schutzwürdig.

**Eine Ausnahme, und nur eine:** Die [Rückfragen am Vers](#rückfragen-am-vers)
schicken die Frage und das Material zur Stelle an einen Sprachmodell-Dienst.
Deshalb sind sie **ausgeschaltet voreingestellt** und lassen sich nur mit einem
eigenen Zugang einschalten. Ohne diesen Schritt verlässt weiterhin nichts das
Gerät – auch das SDK dafür wird dann nie geladen.

---

## Tests

Der Smoke-Test fährt die gebaute App in Chromium durch – Schnellsprung,
Vers-Panel, Notizen, Suche, Lesepläne, Lexikon, Zeitleiste, Karte, Merkverse,
Themenwechsel, mobile Ansicht, die Markenbilder, die Rückfragen am Vers, den
Umzug der Speicherdaten aus der Zeit vor der Umbenennung und den echten
Offline-Betrieb mit abgeschalteter Verbindung (106 Prüfungen):

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
des Tages, die Karte und die Synopse – zurzeit 2528 Angaben. Für die Synopse
kommen zwei Prüfungen dazu, die sich am fertigen Vergleich sofort rächen
würden: Kein Abschnitt darf mitten im Satz beginnen, und jedes Zitat in einer
Anmerkung muss im Wortlaut der Lutherbibel von 1912 wirklich so stehen.
Dasselbe gilt für jedes Bibelwort, das als Artikelüberschrift dient: Es muss
wörtlich im Versbereich des Artikels vorkommen, nicht bloß sinngemäß. Es meldet zugleich, wie weit
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
und darf dabei keine einzige Netzanfrage stellen (12 Prüfungen):

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
