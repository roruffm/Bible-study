/**
 * Zeitleiste der biblischen Geschichte.
 *
 * `year` ist negativ für Jahre vor Christus. Viele Daten sind Näherungen oder
 * in der Forschung umstritten – wo das der Fall ist, sagt `certainty` es
 * ausdrücklich, statt eine Genauigkeit vorzutäuschen, die es nicht gibt.
 */

export type Certainty = 'gesichert' | 'ungefähr' | 'umstritten';

export interface Epoch {
  id: string;
  label: string;
  /** Beginn und Ende der Epoche als Jahreszahl. */
  from: number;
  to: number;
  summary: string;
}

export interface TimelineEvent {
  year: number;
  /** Zweite Jahreszahl, wenn das Ereignis einen Zeitraum umfasst. */
  until?: number;
  epoch: string;
  label: string;
  description: string;
  certainty: Certainty;
  ref?: { book: string; chapter: number; verse?: number };
}

export const EPOCHS: Epoch[] = [
  {
    id: 'erzvaeter',
    label: 'Erzväter',
    from: -1900,
    to: -1550,
    summary: 'Wanderende Sippen zwischen Mesopotamien, Kanaan und Ägypten.',
  },
  {
    id: 'exodus',
    label: 'Auszug und Landnahme',
    from: -1300,
    to: -1150,
    summary: 'Befreiung aus Ägypten, Wüstenzeit und das Fußfassen in Kanaan.',
  },
  {
    id: 'richter',
    label: 'Richterzeit',
    from: -1150,
    to: -1030,
    summary: 'Lose verbundene Stämme ohne zentrale Herrschaft.',
  },
  {
    id: 'koenige',
    label: 'Königszeit',
    from: -1030,
    to: -587,
    summary: 'Vereintes Königreich, Teilung und der Weg beider Reiche in den Untergang.',
  },
  {
    id: 'exil',
    label: 'Babylonisches Exil',
    from: -587,
    to: -538,
    summary: 'Verschleppung nach Babylon – und die Zeit, in der große Teile der Bibel Gestalt annahmen.',
  },
  {
    id: 'perser',
    label: 'Perserzeit',
    from: -538,
    to: -333,
    summary: 'Rückkehr, Wiederaufbau von Tempel und Stadtmauer.',
  },
  {
    id: 'hellenismus',
    label: 'Hellenistische Zeit',
    from: -333,
    to: -63,
    summary: 'Griechische Kultur, Religionsverfolgung und der Aufstand der Makkabäer.',
  },
  {
    id: 'roemer',
    label: 'Römische Zeit',
    from: -63,
    to: 30,
    summary: 'Judäa unter römischer Oberhoheit; Wirken und Hinrichtung Jesu.',
  },
  {
    id: 'urkirche',
    label: 'Frühe Kirche',
    from: 30,
    to: 100,
    summary: 'Ausbreitung im Mittelmeerraum und die Entstehung der neutestamentlichen Schriften.',
  },
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: -1900,
    epoch: 'erzvaeter',
    label: 'Abraham bricht aus Ur auf',
    description:
      'Die Erzählung setzt mit dem Aufbruch einer Sippe nach Kanaan ein. Eine Datierung ist nicht möglich; die Zeitangabe folgt der überlieferten Abfolge.',
    certainty: 'umstritten',
    ref: { book: '1mo', chapter: 12, verse: 1 },
  },
  {
    year: -1700,
    epoch: 'erzvaeter',
    label: 'Josef in Ägypten',
    description: 'Israels Vorfahren siedeln sich in Ägypten an.',
    certainty: 'umstritten',
    ref: { book: '1mo', chapter: 41 },
  },
  {
    year: -1250,
    epoch: 'exodus',
    label: 'Auszug aus Ägypten',
    description:
      'Meist unter Ramses II. verortet. Außerbiblische Belege für den Auszug fehlen; die Forschung diskutiert Umfang und Verlauf seit langem.',
    certainty: 'umstritten',
    ref: { book: '2mo', chapter: 14 },
  },
  {
    year: -1250,
    epoch: 'exodus',
    label: 'Die Weisung am Sinai',
    description: 'Bundesschluss und Empfang der Zehn Gebote.',
    certainty: 'umstritten',
    ref: { book: '2mo', chapter: 20 },
  },
  {
    year: -1208,
    epoch: 'exodus',
    label: 'Erste außerbiblische Erwähnung Israels',
    description:
      'Die Merenptah-Stele nennt „Israel“ als Größe in Kanaan – der älteste bekannte Beleg für den Namen.',
    certainty: 'gesichert',
  },
  {
    year: -1150,
    until: -1030,
    epoch: 'richter',
    label: 'Zeit der Richter',
    description: 'Regionale Anführer wie Debora, Gideon und Simson.',
    certainty: 'ungefähr',
    ref: { book: 'ri', chapter: 2 },
  },
  {
    year: -1030,
    epoch: 'koenige',
    label: 'Saul wird König',
    description: 'Israel bekommt auf eigenen Wunsch einen König „wie alle Völker“.',
    certainty: 'ungefähr',
    ref: { book: '1sam', chapter: 8 },
  },
  {
    year: -1010,
    until: -970,
    epoch: 'koenige',
    label: 'Herrschaft Davids',
    description: 'Jerusalem wird Hauptstadt. Die Tel-Dan-Inschrift bezeugt später ein „Haus David“.',
    certainty: 'ungefähr',
    ref: { book: '2sam', chapter: 5 },
  },
  {
    year: -970,
    until: -931,
    epoch: 'koenige',
    label: 'Salomo und der erste Tempel',
    description: 'Bau des Tempels in Jerusalem; nach seinem Tod zerbricht das Reich.',
    certainty: 'ungefähr',
    ref: { book: '1koe', chapter: 6 },
  },
  {
    year: -931,
    epoch: 'koenige',
    label: 'Teilung in Nord- und Südreich',
    description: 'Israel im Norden, Juda im Süden – von da an zwei getrennte Wege.',
    certainty: 'ungefähr',
    ref: { book: '1koe', chapter: 12 },
  },
  {
    year: -860,
    epoch: 'koenige',
    label: 'Elia gegen die Baalspropheten',
    description: 'Auseinandersetzung um die alleinige Verehrung des Gottes Israels.',
    certainty: 'ungefähr',
    ref: { book: '1koe', chapter: 18 },
  },
  {
    year: -760,
    epoch: 'koenige',
    label: 'Amos und Hosea treten auf',
    description: 'Die ersten Schriftpropheten klagen soziale Ungerechtigkeit an.',
    certainty: 'ungefähr',
    ref: { book: 'am', chapter: 5, verse: 24 },
  },
  {
    year: -740,
    epoch: 'koenige',
    label: 'Berufung Jesajas',
    description: 'Prophetisches Wirken in Jerusalem unter assyrischer Bedrohung.',
    certainty: 'ungefähr',
    ref: { book: 'jes', chapter: 6 },
  },
  {
    year: -722,
    epoch: 'koenige',
    label: 'Untergang des Nordreichs',
    description: 'Assyrien erobert Samaria und deportiert Teile der Bevölkerung.',
    certainty: 'gesichert',
    ref: { book: '2koe', chapter: 17 },
  },
  {
    year: -701,
    epoch: 'koenige',
    label: 'Sanherib belagert Jerusalem',
    description:
      'Die Stadt hält stand. Der Feldzug ist auch auf assyrischen Tontafeln festgehalten – eine der genauesten Überschneidungen von Bibel und Archäologie.',
    certainty: 'gesichert',
    ref: { book: '2koe', chapter: 19 },
  },
  {
    year: -622,
    epoch: 'koenige',
    label: 'Reform unter König Josia',
    description:
      'Bei Tempelarbeiten wird ein Gesetzbuch gefunden; die Forschung sieht darin den Kern des 5. Buches Mose.',
    certainty: 'gesichert',
    ref: { book: '2koe', chapter: 22 },
  },
  {
    year: -597,
    epoch: 'exil',
    label: 'Erste Deportation nach Babylon',
    description: 'König Jojachin und die Oberschicht werden verschleppt; Hesekiel ist unter ihnen.',
    certainty: 'gesichert',
    ref: { book: '2koe', chapter: 24 },
  },
  {
    year: -587,
    epoch: 'exil',
    label: 'Zerstörung Jerusalems und des Tempels',
    description:
      'Die einschneidendste Katastrophe des Alten Testaments – und der Anstoß, die eigene Geschichte neu zu deuten und aufzuschreiben.',
    certainty: 'gesichert',
    ref: { book: 'klgl', chapter: 1 },
  },
  {
    year: -538,
    epoch: 'perser',
    label: 'Das Edikt des Kyros',
    description: 'Der Perserkönig erlaubt die Heimkehr und den Wiederaufbau des Tempels.',
    certainty: 'gesichert',
    ref: { book: 'esr', chapter: 1 },
  },
  {
    year: -515,
    epoch: 'perser',
    label: 'Der zweite Tempel wird eingeweiht',
    description: 'Bescheidener als der erste – manche Alte weinen beim Anblick der Grundmauern.',
    certainty: 'gesichert',
    ref: { book: 'esr', chapter: 6 },
  },
  {
    year: -445,
    epoch: 'perser',
    label: 'Nehemia baut die Stadtmauer',
    description: 'In 52 Tagen, gegen erheblichen Widerstand der Nachbarn.',
    certainty: 'gesichert',
    ref: { book: 'neh', chapter: 6, verse: 15 },
  },
  {
    year: -333,
    epoch: 'hellenismus',
    label: 'Alexander der Große erobert die Levante',
    description: 'Griechisch wird zur Verkehrssprache – Voraussetzung für die spätere Ausbreitung des Evangeliums.',
    certainty: 'gesichert',
  },
  {
    year: -250,
    epoch: 'hellenismus',
    label: 'Die Septuaginta entsteht',
    description:
      'Die Übersetzung der hebräischen Bibel ins Griechische in Alexandria. Die neutestamentlichen Autoren zitieren meist aus ihr.',
    certainty: 'ungefähr',
  },
  {
    year: -167,
    epoch: 'hellenismus',
    label: 'Religionsverfolgung unter Antiochus IV.',
    description: 'Der Tempel wird entweiht; in dieser Not entsteht das Buch Daniel in seiner Endgestalt.',
    certainty: 'gesichert',
    ref: { book: 'dan', chapter: 11 },
  },
  {
    year: -164,
    epoch: 'hellenismus',
    label: 'Makkabäeraufstand und Tempelweihe',
    description: 'Die Wiedereinweihung wird bis heute als Chanukka gefeiert.',
    certainty: 'gesichert',
  },
  {
    year: -63,
    epoch: 'roemer',
    label: 'Pompeius nimmt Jerusalem ein',
    description: 'Judäa gerät unter römische Oberhoheit.',
    certainty: 'gesichert',
  },
  {
    year: -37,
    until: -4,
    epoch: 'roemer',
    label: 'Herodes der Große',
    description: 'Großbauten wie der erweiterte Tempel und Cäsarea – erkauft mit harter Herrschaft.',
    certainty: 'gesichert',
    ref: { book: 'mt', chapter: 2 },
  },
  {
    year: -5,
    epoch: 'roemer',
    label: 'Geburt Jesu',
    description:
      'Meist zwischen 7 und 4 v. Chr. angesetzt, weil Herodes 4 v. Chr. starb. Die im 6. Jahrhundert eingeführte Jahreszählung rechnete um einige Jahre falsch.',
    certainty: 'umstritten',
    ref: { book: 'lk', chapter: 2 },
  },
  {
    year: 28,
    epoch: 'roemer',
    label: 'Johannes der Täufer tritt auf',
    description: 'Bußpredigt und Taufe am Jordan; auch Josephus berichtet von ihm.',
    certainty: 'ungefähr',
    ref: { book: 'mk', chapter: 1 },
  },
  {
    year: 30,
    epoch: 'roemer',
    label: 'Kreuzigung Jesu',
    description:
      'Unter dem Präfekten Pontius Pilatus, meist auf 30 oder 33 n. Chr. datiert. Die Hinrichtung selbst gilt historisch als gesichert.',
    certainty: 'gesichert',
    ref: { book: 'mk', chapter: 15 },
  },
  {
    year: 30,
    epoch: 'urkirche',
    label: 'Pfingsten in Jerusalem',
    description: 'Die erste Gemeinde entsteht.',
    certainty: 'ungefähr',
    ref: { book: 'apg', chapter: 2 },
  },
  {
    year: 34,
    epoch: 'urkirche',
    label: 'Bekehrung des Paulus',
    description: 'Aus dem Verfolger wird der wirkmächtigste Missionar der jungen Bewegung.',
    certainty: 'ungefähr',
    ref: { book: 'apg', chapter: 9 },
  },
  {
    year: 48,
    epoch: 'urkirche',
    label: 'Das Apostelkonzil',
    description:
      'Entscheidung, dass Nichtjuden nicht beschnitten werden müssen – die folgenreichste Weichenstellung der frühen Kirche.',
    certainty: 'ungefähr',
    ref: { book: 'apg', chapter: 15 },
  },
  {
    year: 50,
    epoch: 'urkirche',
    label: 'Der 1. Thessalonicherbrief',
    description: 'Vermutlich die älteste erhaltene Schrift des Neuen Testaments.',
    certainty: 'ungefähr',
    ref: { book: '1thess', chapter: 1 },
  },
  {
    year: 57,
    epoch: 'urkirche',
    label: 'Der Römerbrief',
    description: 'Die ausführlichste Darlegung des paulinischen Evangeliums, geschrieben in Korinth.',
    certainty: 'ungefähr',
    ref: { book: 'roem', chapter: 1 },
  },
  {
    year: 64,
    epoch: 'urkirche',
    label: 'Brand Roms und Verfolgung unter Nero',
    description: 'Nach Tacitus schiebt Nero die Schuld den Christen zu. Petrus und Paulus sterben vermutlich in dieser Zeit.',
    certainty: 'gesichert',
  },
  {
    year: 70,
    epoch: 'urkirche',
    label: 'Zerstörung des zweiten Tempels',
    description:
      'Rom schlägt den jüdischen Aufstand nieder. Judentum und Christentum gehen danach endgültig getrennte Wege.',
    certainty: 'gesichert',
    ref: { book: 'mk', chapter: 13, verse: 2 },
  },
  {
    year: 70,
    epoch: 'urkirche',
    label: 'Das Markusevangelium',
    description: 'Das älteste der vier Evangelien, Vorlage für Matthäus und Lukas.',
    certainty: 'ungefähr',
    ref: { book: 'mk', chapter: 1 },
  },
  {
    year: 95,
    epoch: 'urkirche',
    label: 'Die Offenbarung des Johannes',
    description: 'Trostschrift für bedrängte Gemeinden in Kleinasien, meist unter Domitian verortet.',
    certainty: 'ungefähr',
    ref: { book: 'offb', chapter: 1 },
  },
];

/** Jahreszahl in lesbarer Form, z. B. „587 v. Chr.“ oder „70 n. Chr.“. */
export function formatYear(year: number): string {
  return year < 0 ? `${Math.abs(year)} v. Chr.` : `${year} n. Chr.`;
}

export function formatSpan(event: TimelineEvent): string {
  if (event.until === undefined) return formatYear(event.year);
  // Innerhalb derselben Zeitrechnung genügt die Angabe am Ende.
  if (event.year < 0 && event.until < 0) {
    return `${Math.abs(event.year)}–${Math.abs(event.until)} v. Chr.`;
  }
  return `${formatYear(event.year)} – ${formatYear(event.until)}`;
}
