# Konzept: Interaktive Bibelstudium-Anwendung „Entgegen"

> Eine moderne, interaktive Anwendung zum Studium der Bibel in der Übersetzung
> **Hoffnung für Alle (HFA)** – mit historischem Kontext, Auslegungshilfen und
> Werkzeugen, die aus dem Lesen ein echtes Verstehen machen.

---

## 1. Vision & Zielsetzung

Viele Menschen möchten die Bibel nicht nur lesen, sondern **verstehen**: Was
bedeutete ein Text damals? Wie wird er heute ausgelegt? Wie hängen die Bücher
zusammen? Bestehende Bibel-Apps bieten meist entweder nur den reinen Text oder
überfrachten den Nutzer mit theologischem Fachmaterial.

**Entgegen** schließt diese Lücke:

- **Vollständiger Bibeltext** – alle 66 Bücher der Hoffnung für Alle, jeder
  Vers einzeln auswählbar und abrufbar.
- **Kontext auf Abruf** – historische Hintergründe und gängige Interpretationen
  erscheinen nur, wenn der Nutzer sie sehen will. Der Text bleibt im Zentrum.
- **Studienwerkzeuge mit Mehrwert** – Notizen, Querverweise, Lesepläne,
  Themenstudien und mehr, ansprechend und übersichtlich gestaltet.

**Zielgruppen:**

| Zielgruppe | Bedürfnis |
|---|---|
| Einsteiger | Verständliche Sprache (HFA), Orientierung, geführte Lesepläne |
| Regelmäßige Leser | Lesefortschritt, Notizen, Markierungen, tägliche Impulse |
| Vertiefte Studierende | Historischer Kontext, Auslegungsvergleich, Querverweise, Wortstudien |
| Gruppen / Hauskreise | Geteilte Notizen, gemeinsame Lesepläne, Diskussionsfragen |

---

## 2. Kernfunktionen (Muss-Anforderungen)

### 2.1 Vollständiger Bibeltext (Hoffnung für Alle)

- Alle **66 Bücher** (39 AT, 27 NT), gegliedert nach Buch → Kapitel → Vers.
- **Navigation auf drei Wegen:**
  1. **Bibliothek-Ansicht:** Bücher gruppiert nach Kanon-Abschnitten
     (Tora/Pentateuch, Geschichtsbücher, Poesie & Weisheit, Propheten,
     Evangelien, Apostelgeschichte, Briefe, Offenbarung) – farblich codiert.
  2. **Schnellsprung:** Eingabefeld mit intelligentem Parser
     (`Joh 3,16`, `1. Mose 1`, `Psalm 23,1-6` werden direkt erkannt).
  3. **Volltextsuche:** Suche über den gesamten Bibeltext mit Filterung nach
     Testament, Buchgruppe oder Einzelbuch.
- **Leseansicht:** Kapitel als fortlaufender, gut lesbarer Text; jeder Vers ist
  antippbar/anklickbar und öffnet das **Vers-Panel** (siehe 2.2).
- Abschnittsüberschriften der HFA werden übernommen, sind aber ausblendbar
  (für „reines" Lesen).

### 2.2 Vers-Panel: Kontext & Interpretation auf Abruf

Beim Antippen eines Verses öffnet sich ein seitliches Panel (Desktop) bzw. ein
Bottom-Sheet (Mobil) mit Tabs:

| Tab | Inhalt |
|---|---|
| **📜 Historischer Kontext** | Zeitliche Einordnung, Autor & Adressaten, kulturelle und geografische Hintergründe, relevante archäologische Erkenntnisse. |
| **💡 Interpretationen** | Häufige Auslegungen des Verses – bewusst **plural**: verschiedene verbreitete Deutungstraditionen werden nebeneinander und fair dargestellt, ohne eine als „die richtige" zu bevorzugen. |
| **🔗 Querverweise** | Parallelstellen und thematisch verwandte Verse mit Vorschau, direkt ansteuerbar. |
| **📝 Eigene Notizen** | Persönliche Gedanken zum Vers, Markierungen, Tags. |

Wichtige Prinzipien:

- **Kontext ist optional:** Wer nur lesen will, wird nicht gestört.
- **Transparenz:** Jede Ausführung nennt ihre Quelle/Tradition
  („In der evangelischen Auslegung …", „Historisch-kritische Forschung sieht …").
- **Abgestufte Tiefe:** Kurzfassung (2–3 Sätze) zuerst, „Mehr erfahren"
  klappt die ausführliche Version auf.

---

## 3. Eigene Ideen für maximalen Mehrwert

### 3.1 Studien- und Verständniswerkzeuge

1. **Interaktive Zeitleiste:** Alle Bücher und zentrale Ereignisse auf einer
   zoombaren Zeitachse – vom Auszug aus Ägypten bis zur frühen Kirche. Klick
   auf ein Ereignis springt zur Bibelstelle.
2. **Karten-Modul:** Historische Karten (Reisen des Paulus, Reich Davids,
   Exil-Routen). Ortsnamen im Bibeltext sind verlinkt und zeigen den Ort auf
   der Karte. *Umgesetzt* mit 188 Orten und Landschaften, 9 Wegen, sechs
   Ausschnitten, freiem Ziehen und Vergrößern, Maßstabsbalken und Ortssuche;
   jeder Ort trägt Bibelstellen und meist einen Hintergrundtext. Namen und
   Punkte werden zur Laufzeit überschneidungsfrei verteilt – was keinen Platz
   findet, erscheint beim Hineinzoomen.
2b. **Verzahnung der Module:** Die Karte weiß, welche Orte im gelesenen
   Kapitel stehen; die Zeitleiste weiß, wo ihre Ereignisse spielen; aus jedem
   Stichwort führt ein Weg in die Konkordanz; und wer ein Evangelium liest,
   sieht die Parallelen in den anderen. *Umgesetzt.*
3. **Personen- & Begriffslexikon:** Namen (Abraham, Pilatus …) und
   Schlüsselbegriffe (Bund, Gnade, Passah …) sind im Text dezent markiert;
   Antippen zeigt eine Kurzerklärung mit allen Vorkommen.
4. **Themenstudien („Rote Fäden"):** Kuratierte Pfade durch die Bibel zu Themen
   wie *Hoffnung*, *Vergebung*, *Gerechtigkeit*, *Angst* – je 10–20 Stellen mit
   verbindenden Erklärungen. Ideal für thematisches Studieren.
5. **Übersetzungsvergleich (Ausbaustufe):** HFA-Vers neben Luther 2017 /
   Elberfelder / Basisbibel anzeigen, um Formulierungen zu vergleichen –
   besonders wertvoll, da die HFA eine kommunikative Übertragung ist.
6. **Buch-Steckbriefe:** Jedes Buch startet mit einer kompakten Einführung:
   Autor, Entstehungszeit, Anlass, Aufbau, Kernaussage – plus grafische
   Kapitel-Gliederung als Einstiegshilfe.

### 3.2 Persönliches Studium

7. **Lesepläne:** „Bibel in einem Jahr", „NT in 90 Tagen", „Psalmen & Sprüche",
   thematische Kurzpläne (7–30 Tage) – mit Fortschrittsanzeige und optionaler
   täglicher Erinnerung.
8. **Notizen, Markierungen & Tags:** Verse in mehreren Farben markieren, mit
   eigenen Tags versehen („Trost", „Predigt-Idee") und im persönlichen
   **Studien-Journal** durchsuchen und exportieren (PDF/Markdown).
9. **Vers-Memorisation:** Lernkarten-Modus mit gestuftem Ausblenden von Wörtern
   und Wiederholung nach dem Spaced-Repetition-Prinzip – Lieblingsverse
   dauerhaft auswendig lernen.
10. **Lese-Streak & sanfte Motivation:** Fortschritt und Kontinuität werden
    sichtbar gemacht (gelesene Bücher als „gefüllte" Bibliothek), bewusst ohne
    aufdringliche Gamification.

### 3.3 Gemeinschaft & geführtes Verstehen

11. **Gruppenmodus für Hauskreise:** Gemeinsamer Leseplan, geteilte Notizen und
    vorbereitete **Diskussionsfragen** zu jedem Abschnitt – die App als
    Werkzeug für das Studium in Gemeinschaft.
12. **Vers des Tages mit Impuls:** Täglicher Vers mit kurzem Kontext-Impuls,
    als Startbildschirm-Widget und optionale Push-Benachrichtigung.
13. **„Frag den Text"-Assistent (Ausbaustufe):** Ein KI-gestützter Assistent
    beantwortet Verständnisfragen zum gerade gelesenen Abschnitt („Wer war
    Melchisedek?", „Warum zieht Paulus nach Mazedonien?") – mit klarer
    Kennzeichnung als KI-Antwort und Verweis auf die zugrunde liegenden
    Kontextartikel.

### 3.4 Zugänglichkeit & Komfort

14. **Offline-Modus:** Kompletter Bibeltext und Kontextartikel lokal verfügbar
    (PWA/App) – studieren ohne Internet.
15. **Vorlesefunktion:** Kapitel als Audio (Text-to-Speech oder eingesprochene
    Aufnahmen) – für unterwegs und für Menschen mit Seheinschränkung.
16. **Lese-Komfort:** Hell-/Dunkel-/Sepia-Modus, Schriftgröße und
    Zeilenabstand einstellbar, Fokus-Modus (nur Text, keine UI-Elemente).
17. **Barrierefreiheit:** Screenreader-Unterstützung (ARIA), vollständige
    Tastaturnavigation, ausreichende Kontraste (WCAG 2.1 AA).

---

## 4. Gestaltung & Benutzererlebnis (UI/UX)

### 4.1 Designprinzipien

- **Der Text ist der Star:** Ruhiges, buchähnliches Layout; großzügiger
  Weißraum; hochwertige Serifenschrift für den Bibeltext, klare Sans-Serif für
  die Bedienoberfläche.
- **Progressive Tiefe:** Oberfläche wirkt einfach; Tiefe (Kontext, Auslegung,
  Werkzeuge) erschließt sich schrittweise auf Abruf – niemals alles auf einmal.
- **Warme, ruhige Farbwelt:** z. B. Creme/Elfenbein als Grundton, ein tiefes
  Blau als Primärfarbe, dezente Akzentfarben für die Kanon-Gruppen.
- **Konsistente Navigation:** Maximal drei Interaktionen bis zu jedem Vers.

### 4.2 Hauptbereiche der App

```
┌────────────────────────────────────────────────────────┐
│  🏠 Heute   📖 Bibel   🔍 Suche   🧭 Studium   👤 Ich   │
└────────────────────────────────────────────────────────┘
```

| Bereich | Inhalt |
|---|---|
| **Heute** | Vers des Tages, aktueller Leseplan-Abschnitt, zuletzt gelesen |
| **Bibel** | Bibliothek → Buch → Kapitel → Leseansicht mit Vers-Panel |
| **Suche** | Volltext-, Personen-, Orts- und Themensuche |
| **Studium** | Lesepläne, Themenpfade, Zeitleiste, Karten, Lexikon, Gruppen |
| **Ich** | Notizen-Journal, Markierungen, Merkverse, Fortschritt, Einstellungen |

### 4.3 Leseansicht (Kern-Screen, schematisch)

```
┌──────────────────────────────────────────────┐
│ ← Johannes 3            Aa  🔖  ⋯            │
├──────────────────────────────────────────────┤
│        Jesus und Nikodemus                   │
│                                              │
│  ¹⁶ Denn Gott hat die Menschen so sehr       │
│  geliebt, dass er seinen einzigen Sohn       │
│  für sie hergab. …               [markiert]  │
│                                              │
│  ┌─ Vers 16 ────────────────────────────┐    │
│  │ 📜 Kontext | 💡 Auslegung | 🔗 | 📝  │    │
│  │ Nikodemus war Mitglied des Hohen     │    │
│  │ Rates. Das nächtliche Gespräch …     │    │
│  │                    [Mehr erfahren ▾] │    │
│  └──────────────────────────────────────┘    │
│                                              │
│        ◀ Kapitel 2      Kapitel 4 ▶          │
└──────────────────────────────────────────────┘
```

---

## 5. Technische Architektur (Vorschlag)

### 5.1 Überblick

> **Stand der Umsetzung:** Phase 1 ist gebaut – siehe
> [README.md](README.md) für Installation und Funktionsumfang. Beim MVP
> wurde bewusst von diesem Entwurf abgewichen: Statt Next.js kommt ein
> **Vite-basiertes React-Frontend ohne Backend** zum Einsatz, weil Phase 1
> keinen Server benötigt (der Bibeltext liegt statisch vor, persönliche
> Daten bleiben lokal). Das hält den MVP schlank und offline-tauglich. Der
> Wechsel zu Next.js bleibt für Phase 3/4 offen, sobald Konten,
> Gruppenfunktionen und serverseitiges Rendern für Suchmaschinen dazukommen.

- **Frontend:** **React als Progressive Web App** – eine Codebasis
  für Web, Mobil (installierbar) und Desktop; später optional native Apps via
  Capacitor.
- **Backend:** in Phase 1 nicht erforderlich. Ab Phase 3/4 Node.js und
  **PostgreSQL** für Konten, geteilte Notizen und Gruppen.
- **Bibeltext-Zugriff:** Der HFA-Text wird **per lizenzierter API** bezogen
  (z. B. [API.Bible](https://scripture.api.bible/) der American Bible Society,
  die die HFA im Katalog führt) und zur Performance lokal gecacht. Siehe 5.3.
- **Inhalte (Kontext/Auslegung):** Eigenes, redaktionell gepflegtes
  Content-Repository (Markdown/CMS wie Payload oder Strapi) – versioniert,
  reviewbar, mehrsprachig erweiterbar.
- **Offline:** Service Worker + IndexedDB für Bibeltext, Artikel und Notizen;
  Synchronisation bei Wiederverbindung.
- **Suche:** Vorberechneter Volltextindex (z. B. Meilisearch oder SQLite FTS5
  clientseitig für Offline-Suche).

### 5.2 Datenmodell (Kern-Entitäten)

```
Book        (id, kanonNr, name, gruppe, testament, steckbrief)
Chapter     (id, bookId, nummer)
Verse       (id, chapterId, nummer, text, ueberschrift?)
ContextNote (id, verseRange, typ: "historisch" | "auslegung",
             tradition?, kurztext, langtext, quellen[])
CrossRef    (verseId, targetVerseId, beziehungstyp)
Person/Ort/Begriff (id, name, kurzbeschreibung, vorkommen[])
User        (id, einstellungen, streak)
Note        (id, userId, verseRange, text, farbe, tags[])
ReadingPlan (id, titel, tage[]) + PlanProgress (userId, planId, tag)
Group       (id, name, mitglieder[], planId, geteilteNotizen[])
```

### 5.3 Lizenz & Recht (kritisch, früh klären!)

- Die **Hoffnung für Alle ist urheberrechtlich geschützt** (© Biblica Inc.,
  herausgegeben von Fontis). Der Text darf **nicht** einfach eingebettet
  werden – es braucht eine **Lizenzvereinbarung** mit Biblica/Fontis oder die
  Nutzung über eine lizenzierte Schnittstelle wie API.Bible.
- Fallback-Strategie: Entwicklung startet mit einer **gemeinfreien Übersetzung**
  (z. B. Luther 1912) als Platzhalter; die HFA wird nach Lizenzklärung
  aktiviert. Die Architektur ist von Beginn an **übersetzungs-agnostisch**
  (Übersetzung = austauschbare Datenquelle), was zugleich den späteren
  Übersetzungsvergleich (Idee 5) ermöglicht.
- Kontext- und Auslegungsinhalte: eigene Redaktion oder lizenzierte Quellen;
  bei KI-Unterstützung redaktionelle Prüfung vor Veröffentlichung.
- **Datenschutz:** DSGVO-konform; Notizen und Lesedaten sind sensibel
  (religiöse Überzeugung, Art. 9 DSGVO) → Datensparsamkeit,
  EU-Hosting, optionale Ende-zu-Ende-Verschlüsselung für Notizen,
  vollständige Nutzung auch ohne Konto (lokal) möglich.

---

## 6. Qualität der Inhalte: Redaktionsprinzipien

1. **Ausgewogenheit:** Interpretations-Artikel stellen verbreitete Deutungen
   verschiedener Traditionen dar (z. B. evangelisch, katholisch, freikirchlich,
   historisch-kritisch) – beschreibend, nicht wertend.
2. **Quellenangaben:** Jeder Kontextartikel nennt seine Grundlagen
   (Kommentare, Lexika, Forschung).
3. **Verständlichkeit:** Zielniveau „interessierter Laie" – Fachbegriffe werden
   beim ersten Auftreten erklärt (verlinkt ins Begriffslexikon).
4. **Review-Prozess:** Vier-Augen-Prinzip; theologisch geschulte Reviewer;
   Feedback-Button an jedem Artikel („War das hilfreich? / Fehler melden").
5. **Priorisierung der Erstellung:** Zuerst die meistgelesenen Bücher
   (Evangelien, Psalmen, Römer, 1. Mose), dann sukzessive der Rest –
   die App zeigt transparent an, wo Inhalte noch entstehen.

---

## 7. Roadmap

| Phase | Umfang | Ergebnis |
|---|---|---|
| **1 – MVP** ✅ **umgesetzt** | Bibeltext komplett (Platzhalter-Übersetzung, HFA nach Lizenz), Navigation, Schnellsprung, Volltextsuche, Leseansicht, Hell/Sepia/Dunkel-Modus, Vers des Tages | Nutzbare Lese-App |
| **2 – Studium** ✅ **umgesetzt** | Vers-Panel mit Kontext & Interpretationen (Start: Evangelien + Psalmen), Querverweise, Notizen & Markierungen, Buch-Steckbriefe, Offline-Modus | Echte Studien-App |
| **3 – Vertiefung** ✅ **umgesetzt** | Lesepläne, Themenpfade, Lexikon, Zeitleiste, Karten, Memorisation, Journal-Export | Umfassendes Studienwerkzeug |
| **4 – Gemeinschaft & KI** | Gruppenmodus, Diskussionsfragen, „Frag den Text"-Assistent, Übersetzungsvergleich, Audio | Vollausbau |

**Erfolgskriterien:** Wiederkehrende Nutzung (7-Tage-Retention),
abgeschlossene Leseplan-Tage, Nutzung des Vers-Panels (Kontextaufrufe pro
Sitzung), Feedback-Bewertungen der Artikel.

---

## 8. Zusammenfassung

Entgegen verbindet den **vollständigen, leicht verständlichen HFA-Bibeltext**
mit **Kontextwissen auf Abruf** und **persönlichen Studienwerkzeugen** – in
einer ruhigen, buchähnlichen Oberfläche, die den Text ins Zentrum stellt.
Der größte Mehrwert entsteht durch die Kombination: lesen, verstehen
(Kontext & Auslegung), vertiefen (Notizen, Pläne, Themenpfade) und teilen
(Gruppenmodus) – alles an einem Ort, offline-fähig, barrierefrei und
datenschutzfreundlich.
