/**
 * Synopse der Evangelien.
 *
 * Matthäus, Markus und Lukas erzählen weithin dasselbe – und weichen doch an
 * genau den Stellen voneinander ab, an denen es interessant wird. Wer die
 * Fassungen nebeneinanderlegt, sieht mehr als in jeder einzelnen: dass Lukas
 * vier Seligpreisungen hat und Matthäus neun, dass Markus die Versuchung in
 * zwei Versen abhandelt, dass Johannes die Tempelreinigung an den Anfang
 * stellt statt ans Ende.
 *
 * Diese Datei benennt nur, welche Abschnitte einander entsprechen. Sie
 * bewertet nicht, welche Fassung die ursprüngliche ist – darüber ist sich die
 * Forschung uneins, und die Zuordnung selbst ist davon unabhängig.
 *
 * Die Abschnittsgrenzen folgen der gängigen Einteilung der Synopsen; sie sind
 * ein Vorschlag, keine Eigenschaft des Textes. `scripts/check-references.mjs`
 * prüft, dass jeder angegebene Bereich wirklich existiert.
 */

export interface SynopsisPassage {
  chapter: number;
  from: number;
  to: number;
}

export interface Pericope {
  id: string;
  title: string;
  /** Grobe Gliederung des Erzählverlaufs. */
  section: string;
  mt?: SynopsisPassage;
  mk?: SynopsisPassage;
  lk?: SynopsisPassage;
  joh?: SynopsisPassage;
  /** Was der Vergleich zeigt – nur da, wo es etwas zu sehen gibt. */
  note?: string;
}

export const SYNOPSIS_SECTIONS = [
  'Vorgeschichte',
  'Anfänge',
  'Wirken in Galiläa',
  'Auf dem Weg nach Jerusalem',
  'In Jerusalem',
  'Leiden und Ostern',
];

export const SYNOPSIS: Pericope[] = [
  /* ------------------------------------------------------ Vorgeschichte */
  {
    id: 'stammbaum',
    title: 'Der Stammbaum Jesu',
    section: 'Vorgeschichte',
    mt: { chapter: 1, from: 1, to: 17 },
    lk: { chapter: 3, from: 23, to: 38 },
    note: 'Die beiden Stammbäume stimmen bis David überein und gehen danach getrennte Wege. Matthäus beginnt bei Abraham und zählt vorwärts, Lukas führt rückwärts bis zu Adam. Erklärungsversuche gibt es seit dem 3. Jahrhundert; keiner hat sich durchgesetzt.',
  },
  {
    id: 'ankuendigung',
    title: 'Die Ankündigung der Geburt',
    section: 'Vorgeschichte',
    mt: { chapter: 1, from: 18, to: 25 },
    lk: { chapter: 1, from: 26, to: 38 },
    note: 'Bei Matthäus erfährt Josef davon, bei Lukas Maria. Beide Evangelien erzählen dieselbe Sache aus entgegengesetzter Perspektive.',
  },
  {
    id: 'geburt',
    title: 'Die Geburt Jesu',
    section: 'Vorgeschichte',
    lk: { chapter: 2, from: 1, to: 20 },
    note: 'Krippe, Hirten und Schätzung stehen nur bei Lukas. Markus und Johannes erzählen von der Geburt überhaupt nichts.',
  },
  {
    id: 'weise',
    title: 'Die Weisen aus dem Morgenland',
    section: 'Vorgeschichte',
    mt: { chapter: 2, from: 1, to: 12 },
    note: 'Sondergut des Matthäus. Ihre Zahl nennt der Text nicht – „drei“ wurde aus den drei Gaben erschlossen.',
  },
  {
    id: 'flucht',
    title: 'Flucht nach Ägypten und Kindermord',
    section: 'Vorgeschichte',
    mt: { chapter: 2, from: 13, to: 23 },
    note: 'Nur bei Matthäus. Lukas lässt die Familie stattdessen ruhig nach Nazareth zurückkehren.',
  },
  {
    id: 'prolog',
    title: 'Der Prolog: Im Anfang war das Wort',
    section: 'Vorgeschichte',
    joh: { chapter: 1, from: 1, to: 18 },
    note: 'Johannes setzt nicht bei der Geburt an, sondern vor dem Anfang der Welt.',
  },

  /* ------------------------------------------------------------ Anfänge */
  {
    id: 'taeufer',
    title: 'Johannes der Täufer tritt auf',
    section: 'Anfänge',
    mt: { chapter: 3, from: 1, to: 12 },
    mk: { chapter: 1, from: 1, to: 8 },
    lk: { chapter: 3, from: 1, to: 18 },
    joh: { chapter: 1, from: 19, to: 28 },
    note: 'Der einzige Punkt, an dem alle vier Evangelien gleich einsetzen. Lukas datiert ihn als einziger mit Regierungsjahren.',
  },
  {
    id: 'taufe',
    title: 'Die Taufe Jesu',
    section: 'Anfänge',
    mt: { chapter: 3, from: 13, to: 17 },
    mk: { chapter: 1, from: 9, to: 11 },
    lk: { chapter: 3, from: 21, to: 22 },
    note: 'Bei Markus sieht nur Jesus den Himmel offen, bei Matthäus wehrt Johannes zuerst ab. Lukas erwähnt die Taufe fast nebenbei im Nebensatz.',
  },
  {
    id: 'versuchung',
    title: 'Die Versuchung in der Wüste',
    section: 'Anfänge',
    mt: { chapter: 4, from: 1, to: 11 },
    mk: { chapter: 1, from: 12, to: 13 },
    lk: { chapter: 4, from: 1, to: 13 },
    note: 'Markus braucht zwei Verse, Matthäus und Lukas erzählen drei Versuchungen – in unterschiedlicher Reihenfolge. Bei Matthäus steht der Tempel in der Mitte, bei Lukas am Ende.',
  },
  {
    id: 'nazareth',
    title: 'Die Ablehnung in Nazareth',
    section: 'Anfänge',
    mt: { chapter: 13, from: 54, to: 58 },
    mk: { chapter: 6, from: 1, to: 6 },
    lk: { chapter: 4, from: 16, to: 30 },
    note: 'Lukas zieht die Szene an den Anfang und macht sie zum Programm des ganzen Evangeliums – samt Mordversuch, den die anderen nicht kennen.',
  },
  {
    id: 'erste-juenger',
    title: 'Die Berufung der ersten Jünger',
    section: 'Anfänge',
    mt: { chapter: 4, from: 18, to: 22 },
    mk: { chapter: 1, from: 16, to: 20 },
    lk: { chapter: 5, from: 1, to: 11 },
    joh: { chapter: 1, from: 35, to: 51 },
    note: 'Bei Lukas geht der Fischzug voraus, bei Johannes kommen die ersten Jünger aus dem Kreis des Täufers.',
  },

  /* -------------------------------------------------- Wirken in Galiläa */
  {
    id: 'kapernaum-besessener',
    title: 'Der Besessene in der Synagoge',
    section: 'Wirken in Galiläa',
    mk: { chapter: 1, from: 21, to: 28 },
    lk: { chapter: 4, from: 31, to: 37 },
  },
  {
    id: 'schwiegermutter',
    title: 'Die Schwiegermutter des Petrus',
    section: 'Wirken in Galiläa',
    mt: { chapter: 8, from: 14, to: 17 },
    mk: { chapter: 1, from: 29, to: 34 },
    lk: { chapter: 4, from: 38, to: 41 },
  },
  {
    id: 'aussaetziger',
    title: 'Die Heilung des Aussätzigen',
    section: 'Wirken in Galiläa',
    mt: { chapter: 8, from: 1, to: 4 },
    mk: { chapter: 1, from: 40, to: 45 },
    lk: { chapter: 5, from: 12, to: 16 },
  },
  {
    id: 'gelaehmter',
    title: 'Der Gelähmte durch das Dach',
    section: 'Wirken in Galiläa',
    mt: { chapter: 9, from: 1, to: 8 },
    mk: { chapter: 2, from: 1, to: 12 },
    lk: { chapter: 5, from: 17, to: 26 },
    note: 'Markus lässt die vier Träger das Dach abdecken, Lukas die Ziegel abräumen – er schreibt für Leser, die Häuser mit Ziegeldach kennen.',
  },
  {
    id: 'zoellner',
    title: 'Die Berufung des Zöllners',
    section: 'Wirken in Galiläa',
    mt: { chapter: 9, from: 9, to: 13 },
    mk: { chapter: 2, from: 13, to: 17 },
    lk: { chapter: 5, from: 27, to: 32 },
    note: 'Markus und Lukas nennen ihn Levi, Matthäus nennt ihn Matthäus.',
  },
  {
    id: 'fasten',
    title: 'Die Frage nach dem Fasten',
    section: 'Wirken in Galiläa',
    mt: { chapter: 9, from: 14, to: 17 },
    mk: { chapter: 2, from: 18, to: 22 },
    lk: { chapter: 5, from: 33, to: 39 },
  },
  {
    id: 'aehrenraufen',
    title: 'Ährenraufen am Sabbat',
    section: 'Wirken in Galiläa',
    mt: { chapter: 12, from: 1, to: 8 },
    mk: { chapter: 2, from: 23, to: 28 },
    lk: { chapter: 6, from: 1, to: 5 },
    note: 'Nur Markus hat den Satz „Der Sabbat ist um des Menschen willen gemacht“. Matthäus und Lukas lassen ihn weg.',
  },
  {
    id: 'verdorrte-hand',
    title: 'Die verdorrte Hand',
    section: 'Wirken in Galiläa',
    mt: { chapter: 12, from: 9, to: 14 },
    mk: { chapter: 3, from: 1, to: 6 },
    lk: { chapter: 6, from: 6, to: 11 },
  },
  {
    id: 'zwoelf',
    title: 'Die Berufung der Zwölf',
    section: 'Wirken in Galiläa',
    mt: { chapter: 10, from: 1, to: 4 },
    mk: { chapter: 3, from: 13, to: 19 },
    lk: { chapter: 6, from: 12, to: 16 },
    note: 'Die drei Namenslisten stimmen nicht vollständig überein – an der zehnten Stelle steht bei Lukas Judas, der Sohn des Jakobus, bei den anderen Thaddäus.',
  },
  {
    id: 'seligpreisungen',
    title: 'Die Seligpreisungen',
    section: 'Wirken in Galiläa',
    mt: { chapter: 5, from: 1, to: 12 },
    lk: { chapter: 6, from: 20, to: 26 },
    note: 'Matthäus zählt neun und spricht von den „geistlich Armen“, Lukas vier – und stellt ihnen vier Weherufe gegenüber. Bei ihm sind schlicht die Armen gemeint.',
  },
  {
    id: 'feindesliebe',
    title: 'Feindesliebe',
    section: 'Wirken in Galiläa',
    mt: { chapter: 5, from: 43, to: 48 },
    lk: { chapter: 6, from: 27, to: 36 },
    note: 'Matthäus schließt mit „seid vollkommen“, Lukas mit „seid barmherzig“ – dieselbe Rede, zwei Zielpunkte.',
  },
  {
    id: 'richten',
    title: 'Vom Richten und vom Splitter',
    section: 'Wirken in Galiläa',
    mt: { chapter: 7, from: 1, to: 5 },
    lk: { chapter: 6, from: 37, to: 42 },
  },
  {
    id: 'vaterunser',
    title: 'Das Vaterunser',
    section: 'Wirken in Galiläa',
    mt: { chapter: 6, from: 9, to: 13 },
    lk: { chapter: 11, from: 1, to: 4 },
    note: 'Die lukanische Fassung ist deutlich kürzer. Der abschließende Lobspruch fehlt in den ältesten Handschriften beider Evangelien und wurde später ergänzt.',
  },
  {
    id: 'haus-fels',
    title: 'Das Haus auf dem Felsen',
    section: 'Wirken in Galiläa',
    mt: { chapter: 7, from: 24, to: 27 },
    lk: { chapter: 6, from: 47, to: 49 },
  },
  {
    id: 'hauptmann',
    title: 'Der Hauptmann von Kapernaum',
    section: 'Wirken in Galiläa',
    mt: { chapter: 8, from: 5, to: 13 },
    lk: { chapter: 7, from: 1, to: 10 },
    joh: { chapter: 4, from: 46, to: 54 },
    note: 'Bei Lukas schickt der Hauptmann Boten, bei Matthäus kommt er selbst. Ob die Erzählung bei Johannes dieselbe ist, wird unterschiedlich beurteilt.',
  },
  {
    id: 'taeufer-anfrage',
    title: 'Die Anfrage des Täufers',
    section: 'Wirken in Galiläa',
    mt: { chapter: 11, from: 2, to: 19 },
    lk: { chapter: 7, from: 18, to: 35 },
    note: '„Bist du, der da kommen soll?“ – der Zweifel des Täufers steht in beiden Fassungen nahezu wörtlich gleich.',
  },
  {
    id: 'saemann',
    title: 'Das Gleichnis vom Sämann',
    section: 'Wirken in Galiläa',
    mt: { chapter: 13, from: 1, to: 9 },
    mk: { chapter: 4, from: 1, to: 9 },
    lk: { chapter: 8, from: 4, to: 8 },
  },
  {
    id: 'saemann-deutung',
    title: 'Die Deutung des Sämanns',
    section: 'Wirken in Galiläa',
    mt: { chapter: 13, from: 18, to: 23 },
    mk: { chapter: 4, from: 13, to: 20 },
    lk: { chapter: 8, from: 11, to: 15 },
  },
  {
    id: 'senfkorn',
    title: 'Das Senfkorn',
    section: 'Wirken in Galiläa',
    mt: { chapter: 13, from: 31, to: 32 },
    mk: { chapter: 4, from: 30, to: 32 },
    lk: { chapter: 13, from: 18, to: 19 },
  },
  {
    id: 'sturmstillung',
    title: 'Die Stillung des Sturms',
    section: 'Wirken in Galiläa',
    mt: { chapter: 8, from: 23, to: 27 },
    mk: { chapter: 4, from: 35, to: 41 },
    lk: { chapter: 8, from: 22, to: 25 },
    note: 'Nur Markus überliefert den Vorwurf der Jünger: „Fragst du nichts danach, dass wir verderben?“',
  },
  {
    id: 'gadara',
    title: 'Der Besessene und die Schweineherde',
    section: 'Wirken in Galiläa',
    mt: { chapter: 8, from: 28, to: 34 },
    mk: { chapter: 5, from: 1, to: 20 },
    lk: { chapter: 8, from: 26, to: 39 },
    note: 'Matthäus hat zwei Besessene, Markus und Lukas einen. Schon die Handschriften schwanken zwischen Gadarenern, Gerasenern und Gergesenern.',
  },
  {
    id: 'jairus',
    title: 'Jairus und die blutflüssige Frau',
    section: 'Wirken in Galiläa',
    mt: { chapter: 9, from: 18, to: 26 },
    mk: { chapter: 5, from: 21, to: 43 },
    lk: { chapter: 8, from: 40, to: 56 },
    note: 'Eine Erzählung in der anderen. Markus braucht dafür 23 Verse, Matthäus neun.',
  },
  {
    id: 'aussendung',
    title: 'Die Aussendung der Zwölf',
    section: 'Wirken in Galiläa',
    mt: { chapter: 10, from: 5, to: 15 },
    mk: { chapter: 6, from: 7, to: 13 },
    lk: { chapter: 9, from: 1, to: 6 },
    note: 'Ob ein Stab mitgenommen werden darf, sagen Markus und die beiden anderen genau entgegengesetzt.',
  },
  {
    id: 'taeufer-tod',
    title: 'Der Tod des Täufers',
    section: 'Wirken in Galiläa',
    mt: { chapter: 14, from: 1, to: 12 },
    mk: { chapter: 6, from: 14, to: 29 },
    lk: { chapter: 9, from: 7, to: 9 },
    note: 'Josephus berichtet dieselbe Hinrichtung, nennt aber einen politischen Grund: Antipas habe den Zulauf gefürchtet.',
  },
  {
    id: 'speisung-5000',
    title: 'Die Speisung der Fünftausend',
    section: 'Wirken in Galiläa',
    mt: { chapter: 14, from: 13, to: 21 },
    mk: { chapter: 6, from: 30, to: 44 },
    lk: { chapter: 9, from: 10, to: 17 },
    joh: { chapter: 6, from: 1, to: 15 },
    note: 'Das einzige Wunder, das alle vier Evangelien erzählen.',
  },
  {
    id: 'seewandel',
    title: 'Der Gang auf dem Wasser',
    section: 'Wirken in Galiläa',
    mt: { chapter: 14, from: 22, to: 33 },
    mk: { chapter: 6, from: 45, to: 52 },
    joh: { chapter: 6, from: 16, to: 21 },
    note: 'Dass auch Petrus aussteigt und einsinkt, steht nur bei Matthäus.',
  },
  {
    id: 'syrophoenizierin',
    title: 'Die syrophönizische Frau',
    section: 'Wirken in Galiläa',
    mt: { chapter: 15, from: 21, to: 28 },
    mk: { chapter: 7, from: 24, to: 30 },
    note: 'Die einzige Erzählung, in der jemand Jesus im Wortwechsel umstimmt.',
  },
  {
    id: 'speisung-4000',
    title: 'Die Speisung der Viertausend',
    section: 'Wirken in Galiläa',
    mt: { chapter: 15, from: 32, to: 39 },
    mk: { chapter: 8, from: 1, to: 10 },
    note: 'Eine zweite Speisung, diesmal in nichtjüdischem Gebiet. Lukas lässt diesen ganzen Abschnitt aus.',
  },
  {
    id: 'bekenntnis',
    title: 'Das Bekenntnis des Petrus',
    section: 'Wirken in Galiläa',
    mt: { chapter: 16, from: 13, to: 20 },
    mk: { chapter: 8, from: 27, to: 30 },
    lk: { chapter: 9, from: 18, to: 21 },
    joh: { chapter: 6, from: 66, to: 71 },
    note: 'Das Wort „Du bist Petrus, und auf diesen Felsen …“ steht nur bei Matthäus – und ist einer der meistumstrittenen Sätze der Kirchengeschichte.',
  },
  {
    id: 'leidensankuendigung',
    title: 'Die erste Leidensankündigung',
    section: 'Wirken in Galiläa',
    mt: { chapter: 16, from: 21, to: 23 },
    mk: { chapter: 8, from: 31, to: 33 },
    lk: { chapter: 9, from: 22, to: 22 },
    note: 'Den scharfen Zurechtweisung des Petrus lässt Lukas weg.',
  },
  {
    id: 'nachfolge',
    title: 'Nachfolge und Kreuz',
    section: 'Wirken in Galiläa',
    mt: { chapter: 16, from: 24, to: 28 },
    mk: { chapter: 8, from: 34, to: 38 },
    lk: { chapter: 9, from: 23, to: 27 },
    note: 'Nur Lukas fügt „täglich“ hinzu – aus dem einmaligen Kreuz wird ein Alltagsweg.',
  },
  {
    id: 'verklaerung',
    title: 'Die Verklärung',
    section: 'Wirken in Galiläa',
    mt: { chapter: 17, from: 1, to: 9 },
    mk: { chapter: 9, from: 2, to: 10 },
    lk: { chapter: 9, from: 28, to: 36 },
    note: 'Nur Lukas sagt, worüber Mose und Elia mit Jesus sprechen: über seinen Ausgang in Jerusalem.',
  },
  {
    id: 'rangstreit',
    title: 'Der Streit um den Rang',
    section: 'Wirken in Galiläa',
    mt: { chapter: 18, from: 1, to: 5 },
    mk: { chapter: 9, from: 33, to: 37 },
    lk: { chapter: 9, from: 46, to: 48 },
  },

  /* ------------------------------------- Auf dem Weg nach Jerusalem */
  {
    id: 'barmherziger-samariter',
    title: 'Der barmherzige Samariter',
    section: 'Auf dem Weg nach Jerusalem',
    lk: { chapter: 10, from: 25, to: 37 },
    note: 'Sondergut des Lukas – und eines der bekanntesten Gleichnisse überhaupt.',
  },
  {
    id: 'marta-maria',
    title: 'Marta und Maria',
    section: 'Auf dem Weg nach Jerusalem',
    lk: { chapter: 10, from: 38, to: 42 },
  },
  {
    id: 'verlorenes-schaf',
    title: 'Das verlorene Schaf',
    section: 'Auf dem Weg nach Jerusalem',
    mt: { chapter: 18, from: 12, to: 14 },
    lk: { chapter: 15, from: 1, to: 7 },
    note: 'Bei Matthäus richtet sich das Gleichnis an die Gemeinde, bei Lukas an die Kritiker, die ihm den Umgang mit Zöllnern vorwerfen.',
  },
  {
    id: 'verlorener-sohn',
    title: 'Der verlorene Sohn',
    section: 'Auf dem Weg nach Jerusalem',
    lk: { chapter: 15, from: 11, to: 32 },
    note: 'Sondergut des Lukas. Das Gleichnis endet offen – ob der ältere Sohn hineingeht, wird nicht erzählt.',
  },
  {
    id: 'ehescheidung',
    title: 'Die Frage nach der Ehescheidung',
    section: 'Auf dem Weg nach Jerusalem',
    mt: { chapter: 19, from: 1, to: 12 },
    mk: { chapter: 10, from: 1, to: 12 },
    note: 'Matthäus fügt eine Ausnahme ein, die bei Markus fehlt. An diesem Unterschied hängt ein Großteil der kirchlichen Ehepraxis.',
  },
  {
    id: 'kindersegnung',
    title: 'Die Segnung der Kinder',
    section: 'Auf dem Weg nach Jerusalem',
    mt: { chapter: 19, from: 13, to: 15 },
    mk: { chapter: 10, from: 13, to: 16 },
    lk: { chapter: 18, from: 15, to: 17 },
  },
  {
    id: 'reicher-juengling',
    title: 'Der reiche Jüngling',
    section: 'Auf dem Weg nach Jerusalem',
    mt: { chapter: 19, from: 16, to: 30 },
    mk: { chapter: 10, from: 17, to: 31 },
    lk: { chapter: 18, from: 18, to: 30 },
    note: 'Nur Markus erwähnt, dass Jesus ihn ansah und liebgewann.',
  },
  {
    id: 'zebedaeus',
    title: 'Die Bitte der Zebedäussöhne',
    section: 'Auf dem Weg nach Jerusalem',
    mt: { chapter: 20, from: 20, to: 28 },
    mk: { chapter: 10, from: 35, to: 45 },
    note: 'Bei Markus bitten die Brüder selbst, bei Matthäus ihre Mutter.',
  },
  {
    id: 'bartimaeus',
    title: 'Der blinde Bettler bei Jericho',
    section: 'Auf dem Weg nach Jerusalem',
    mt: { chapter: 20, from: 29, to: 34 },
    mk: { chapter: 10, from: 46, to: 52 },
    lk: { chapter: 18, from: 35, to: 43 },
    note: 'Markus nennt ihn Bartimäus, Matthäus hat zwei Blinde, und bei Lukas geschieht es vor der Stadt statt danach.',
  },
  {
    id: 'zachaeus',
    title: 'Zachäus',
    section: 'Auf dem Weg nach Jerusalem',
    lk: { chapter: 19, from: 1, to: 10 },
  },

  /* ------------------------------------------------------ In Jerusalem */
  {
    id: 'einzug',
    title: 'Der Einzug in Jerusalem',
    section: 'In Jerusalem',
    mt: { chapter: 21, from: 1, to: 11 },
    mk: { chapter: 11, from: 1, to: 11 },
    lk: { chapter: 19, from: 28, to: 40 },
    joh: { chapter: 12, from: 12, to: 19 },
    note: 'Matthäus liest das Zitat aus Sacharja so, dass zwei Tiere gebraucht werden; die anderen kennen nur den Esel.',
  },
  {
    id: 'tempelreinigung',
    title: 'Die Tempelreinigung',
    section: 'In Jerusalem',
    mt: { chapter: 21, from: 12, to: 17 },
    mk: { chapter: 11, from: 15, to: 19 },
    lk: { chapter: 19, from: 45, to: 48 },
    joh: { chapter: 2, from: 13, to: 22 },
    note: 'Johannes stellt die Szene an den Anfang des Wirkens Jesu, die drei anderen ans Ende. Ob es zwei Ereignisse waren oder eine Umstellung, ist offen.',
  },
  {
    id: 'vollmachtsfrage',
    title: 'Die Frage nach der Vollmacht',
    section: 'In Jerusalem',
    mt: { chapter: 21, from: 23, to: 27 },
    mk: { chapter: 11, from: 27, to: 33 },
    lk: { chapter: 20, from: 1, to: 8 },
  },
  {
    id: 'weingaertner',
    title: 'Die bösen Weingärtner',
    section: 'In Jerusalem',
    mt: { chapter: 21, from: 33, to: 46 },
    mk: { chapter: 12, from: 1, to: 12 },
    lk: { chapter: 20, from: 9, to: 19 },
  },
  {
    id: 'zinsgroschen',
    title: 'Der Zinsgroschen',
    section: 'In Jerusalem',
    mt: { chapter: 22, from: 15, to: 22 },
    mk: { chapter: 12, from: 13, to: 17 },
    lk: { chapter: 20, from: 20, to: 26 },
    note: 'Die Fangfrage funktioniert nur, weil das Zahlen der Kopfsteuer politisch hoch umstritten war.',
  },
  {
    id: 'auferstehungsfrage',
    title: 'Die Frage der Sadduzäer',
    section: 'In Jerusalem',
    mt: { chapter: 22, from: 23, to: 33 },
    mk: { chapter: 12, from: 18, to: 27 },
    lk: { chapter: 20, from: 27, to: 40 },
  },
  {
    id: 'groesstes-gebot',
    title: 'Das größte Gebot',
    section: 'In Jerusalem',
    mt: { chapter: 22, from: 34, to: 40 },
    mk: { chapter: 12, from: 28, to: 34 },
    lk: { chapter: 10, from: 25, to: 28 },
    note: 'Bei Lukas gibt der Fragende die Antwort selbst – und daran hängt dann das Gleichnis vom Samariter.',
  },
  {
    id: 'scherflein',
    title: 'Das Scherflein der Witwe',
    section: 'In Jerusalem',
    mk: { chapter: 12, from: 41, to: 44 },
    lk: { chapter: 21, from: 1, to: 4 },
  },
  {
    id: 'endzeitrede',
    title: 'Die Rede über das Ende',
    section: 'In Jerusalem',
    mt: { chapter: 24, from: 1, to: 14 },
    mk: { chapter: 13, from: 1, to: 13 },
    lk: { chapter: 21, from: 5, to: 19 },
    note: 'Lukas beschreibt die Belagerung Jerusalems konkreter als die anderen – für viele ein Hinweis darauf, dass er nach 70 n. Chr. schrieb.',
  },

  /* ------------------------------------------------- Leiden und Ostern */
  {
    id: 'salbung',
    title: 'Die Salbung in Betanien',
    section: 'Leiden und Ostern',
    mt: { chapter: 26, from: 6, to: 13 },
    mk: { chapter: 14, from: 3, to: 9 },
    joh: { chapter: 12, from: 1, to: 8 },
    note: 'Bei Johannes ist die Frau Maria, die Schwester des Lazarus, und der Einwand kommt von Judas.',
  },
  {
    id: 'verrat',
    title: 'Der Verrat des Judas',
    section: 'Leiden und Ostern',
    mt: { chapter: 26, from: 14, to: 16 },
    mk: { chapter: 14, from: 10, to: 11 },
    lk: { chapter: 22, from: 3, to: 6 },
    note: 'Die dreißig Silberlinge nennt nur Matthäus.',
  },
  {
    id: 'abendmahl',
    title: 'Das letzte Mahl',
    section: 'Leiden und Ostern',
    mt: { chapter: 26, from: 26, to: 29 },
    mk: { chapter: 14, from: 22, to: 25 },
    lk: { chapter: 22, from: 14, to: 20 },
    note: 'Johannes erzählt an dieser Stelle stattdessen die Fußwaschung – und datiert das Mahl einen Tag früher.',
  },
  {
    id: 'verleugnung-ankuendigung',
    title: 'Die Ankündigung der Verleugnung',
    section: 'Leiden und Ostern',
    mt: { chapter: 26, from: 31, to: 35 },
    mk: { chapter: 14, from: 27, to: 31 },
    lk: { chapter: 22, from: 31, to: 34 },
    joh: { chapter: 13, from: 36, to: 38 },
    note: 'Markus lässt den Hahn zweimal krähen, die anderen einmal.',
  },
  {
    id: 'getsemani',
    title: 'Getsemani',
    section: 'Leiden und Ostern',
    mt: { chapter: 26, from: 36, to: 46 },
    mk: { chapter: 14, from: 32, to: 42 },
    lk: { chapter: 22, from: 39, to: 46 },
    note: 'Den Blutschweiß haben nur einige Handschriften des Lukas; in anderen fehlt er ganz.',
  },
  {
    id: 'verhaftung',
    title: 'Die Verhaftung',
    section: 'Leiden und Ostern',
    mt: { chapter: 26, from: 47, to: 56 },
    mk: { chapter: 14, from: 43, to: 52 },
    lk: { chapter: 22, from: 47, to: 53 },
    joh: { chapter: 18, from: 1, to: 12 },
    note: 'Nur Markus erwähnt den jungen Mann, der nackt entkommt. Nur Johannes nennt den Namen des verletzten Knechts.',
  },
  {
    id: 'hoher-rat',
    title: 'Vor dem Hohen Rat',
    section: 'Leiden und Ostern',
    mt: { chapter: 26, from: 57, to: 68 },
    mk: { chapter: 14, from: 53, to: 65 },
    lk: { chapter: 22, from: 54, to: 71 },
    joh: { chapter: 18, from: 19, to: 24 },
    note: 'Lukas verlegt die Verhandlung auf den Morgen – ein nächtlicher Prozess wäre nach späterem jüdischem Recht unzulässig gewesen.',
  },
  {
    id: 'verleugnung',
    title: 'Die Verleugnung des Petrus',
    section: 'Leiden und Ostern',
    mt: { chapter: 26, from: 69, to: 75 },
    mk: { chapter: 14, from: 66, to: 72 },
    lk: { chapter: 22, from: 55, to: 62 },
    joh: { chapter: 18, from: 15, to: 27 },
    note: 'Nur Lukas erzählt, dass Jesus sich dabei umwendet und Petrus ansieht.',
  },
  {
    id: 'pilatus',
    title: 'Vor Pilatus',
    section: 'Leiden und Ostern',
    mt: { chapter: 27, from: 11, to: 26 },
    mk: { chapter: 15, from: 1, to: 15 },
    lk: { chapter: 23, from: 1, to: 25 },
    joh: { chapter: 18, from: 28, to: 40 },
    note: 'Nur Lukas schickt Jesus zwischendurch zu Herodes Antipas. Das Händewaschen und der Ruf des Volkes stehen nur bei Matthäus – ein Vers mit verheerender Wirkungsgeschichte.',
  },
  {
    id: 'kreuzigung',
    title: 'Die Kreuzigung',
    section: 'Leiden und Ostern',
    mt: { chapter: 27, from: 32, to: 44 },
    mk: { chapter: 15, from: 21, to: 32 },
    lk: { chapter: 23, from: 26, to: 43 },
    joh: { chapter: 19, from: 17, to: 27 },
    note: 'Bei Markus und Matthäus spotten beide Mitgekreuzigte, bei Lukas verteidigt einer ihn.',
  },
  {
    id: 'tod',
    title: 'Der Tod Jesu',
    section: 'Leiden und Ostern',
    mt: { chapter: 27, from: 45, to: 56 },
    mk: { chapter: 15, from: 33, to: 41 },
    lk: { chapter: 23, from: 44, to: 49 },
    joh: { chapter: 19, from: 28, to: 37 },
    note: 'Die letzten Worte lauten in jedem Evangelium anders: der Schrei der Gottverlassenheit bei Markus und Matthäus, ein Gebet bei Lukas, „Es ist vollbracht“ bei Johannes.',
  },
  {
    id: 'begraebnis',
    title: 'Das Begräbnis',
    section: 'Leiden und Ostern',
    mt: { chapter: 27, from: 57, to: 61 },
    mk: { chapter: 15, from: 42, to: 47 },
    lk: { chapter: 23, from: 50, to: 56 },
    joh: { chapter: 19, from: 38, to: 42 },
  },
  {
    id: 'leeres-grab',
    title: 'Das leere Grab',
    section: 'Leiden und Ostern',
    mt: { chapter: 28, from: 1, to: 10 },
    mk: { chapter: 16, from: 1, to: 8 },
    lk: { chapter: 24, from: 1, to: 12 },
    joh: { chapter: 20, from: 1, to: 10 },
    note: 'Die Zahl der Frauen, die Zahl der Gestalten am Grab und die Reihenfolge der Ereignisse gehen in allen vier Fassungen auseinander. Markus endet in den ältesten Handschriften mit dem Schweigen der Frauen.',
  },
  {
    id: 'auftrag',
    title: 'Der Auftrag an die Jünger',
    section: 'Leiden und Ostern',
    mt: { chapter: 28, from: 16, to: 20 },
    mk: { chapter: 16, from: 14, to: 18 },
    lk: { chapter: 24, from: 44, to: 49 },
    note: 'Der Schluss des Markus ab Vers 9 fehlt in den ältesten Handschriften; er wurde später ergänzt.',
  },
];

export const GOSPELS = [
  { key: 'mt', id: 'mt', label: 'Matthäus', abbr: 'Mt' },
  { key: 'mk', id: 'mk', label: 'Markus', abbr: 'Mk' },
  { key: 'lk', id: 'lk', label: 'Lukas', abbr: 'Lk' },
  { key: 'joh', id: 'joh', label: 'Johannes', abbr: 'Joh' },
] as const;

export type GospelKey = (typeof GOSPELS)[number]['key'];

/** Die Perikopen, die einen Abschnitt dieses Kapitels enthalten. */
export function pericopesForChapter(bookId: string, chapter: number): Pericope[] {
  const key = GOSPELS.find((g) => g.id === bookId)?.key;
  if (!key) return [];
  return SYNOPSIS.filter((p) => p[key]?.chapter === chapter);
}

export function findPericope(id: string): Pericope | undefined {
  return SYNOPSIS.find((p) => p.id === id);
}
