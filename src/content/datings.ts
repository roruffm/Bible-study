/**
 * Zeitliche Einordnung der Artikel.
 *
 * Zwei Angaben, die beim Bibellesen oft verwechselt werden:
 *
 * - **Ereigniszeit** – wann spielt, wovon der Text erzählt?
 * - **Entstehungszeit** – wann wurde er nach heutigem Forschungsstand
 *   aufgeschrieben?
 *
 * Beides fällt in der Bibel regelmäßig weit auseinander: Der Feuerofen spielt
 * im 6. Jahrhundert v. Chr., das Buch Daniel entstand rund 400 Jahre später.
 * Wer das weiß, liest anders.
 *
 * Die Tabelle steht bewusst getrennt von den Artikeln: So lassen sich die
 * Angaben untereinander vergleichen und konsistent halten. Der Schlüssel ist
 * `<buch> <kapitel>,<erster vers>` – dieselbe Kennung wie beim Artikel.
 *
 * Alle Datierungen sind Näherungen. Wo die Forschung uneins ist, sagt der
 * Text es; wo sich nichts datieren lässt, steht das ausdrücklich da.
 */

export interface Dating {
  /** Wann spielt der Text? Leer, wo es keine erzählte Zeit gibt. */
  events?: string;
  /** Wann wurde er aufgeschrieben? */
  written?: string;
  /** Epoche der Zeitleiste – ermöglicht den Sprung dorthin. */
  epoch?: string;
}

export const DATINGS: Record<string, Dating> = {
  /* --------------------------------------------------------- Urgeschichte */
  '1mo 1,1': {
    events: 'Urgeschichte – kein datierbares Ereignis',
    written: 'Priesterliche Fassung, 6./5. Jh. v. Chr.',
    epoch: 'exil',
  },
  '1mo 3,1': {
    events: 'Urgeschichte',
    written: 'Ältere Erzählschicht, meist 10.–8. Jh. v. Chr. angesetzt',
    epoch: 'koenige',
  },
  '1mo 11,1': {
    events: 'Urgeschichte',
    written: 'Vor dem Hintergrund der babylonischen Stufentürme, 6. Jh. v. Chr.',
    epoch: 'exil',
  },

  /* ------------------------------------------------------------ Erzväter */
  '1mo 22,1': {
    events: 'Erzväterzeit; historisch nicht datierbar',
    written: 'Endgestalt exilisch oder danach',
    epoch: 'erzvaeter',
  },
  '1mo 50,15': {
    events: 'Erzväterzeit, Ägypten des 2. Jahrtausends v. Chr.',
    written: 'Josefsnovelle, wohl späte Königszeit',
    epoch: 'erzvaeter',
  },

  /* -------------------------------------------------- Auszug und Wüstenzeit */
  '2mo 3,13': {
    events: 'Meist im 13. Jh. v. Chr. verortet',
    written: 'Mehrere Schichten, Endgestalt exilisch',
    epoch: 'exodus',
  },
  '2mo 12,1': {
    events: 'Vorabend des Auszugs',
    written: 'Priesterliche Festordnung, 6./5. Jh. v. Chr.',
    epoch: 'exodus',
  },
  '2mo 14,1': {
    events: 'Meist im 13. Jh. v. Chr. verortet',
    written: 'Das Lied in Kap. 15 gilt als sehr alt, die Prosa als jünger',
    epoch: 'exodus',
  },
  '2mo 20,1': {
    events: 'Sinai, 13. Jh. v. Chr.',
    written: 'Kern 8.–7. Jh., Endgestalt 6. Jh. v. Chr.',
    epoch: 'exodus',
  },
  '3mo 16,1': {
    events: 'Wüstenzeit',
    written: 'Priesterschrift, 6./5. Jh. v. Chr.',
    epoch: 'exil',
  },
  '4mo 6,22': {
    events: 'Wüstenzeit',
    written: 'Auf Silberamuletten des 7. Jh. v. Chr. belegt – ältester bezeugter Bibeltext',
    epoch: 'koenige',
  },
  '5mo 6,4': {
    events: 'Vor dem Einzug ins Land',
    written: '7. Jh. v. Chr., im Umfeld der Reform Josias',
    epoch: 'koenige',
  },

  /* ------------------------------------------- Landnahme und Richterzeit */
  'jos 24,14': {
    events: 'um 1200 v. Chr.',
    written: 'Deuteronomistisches Geschichtswerk, 7.–6. Jh. v. Chr.',
    epoch: 'richter',
  },
  'ri 6,11': {
    events: '12./11. Jh. v. Chr.',
    written: 'Deuteronomistisch gerahmte ältere Erzählungen',
    epoch: 'richter',
  },
  'rut 1,6': {
    events: 'Richterzeit',
    written: 'Wahrscheinlich nachexilisch, 5./4. Jh. v. Chr.',
    epoch: 'richter',
  },

  /* --------------------------------------------------------- Königszeit */
  '1sam 17,1': {
    events: 'um 1010 v. Chr.',
    written: 'Königszeit, später mehrfach bearbeitet',
    epoch: 'koenige',
  },
  '2sam 12,1': {
    events: 'um 990 v. Chr.',
    written: 'Thronfolgeerzählung, Königszeit',
    epoch: 'koenige',
  },
  '1chr 29,10': {
    events: 'um 970 v. Chr.',
    written: 'Der Chronist, 4. Jh. v. Chr.',
    epoch: 'perser',
  },
  '2chr 7,12': {
    events: 'um 950 v. Chr.',
    written: 'Der Chronist, 4. Jh. v. Chr.',
    epoch: 'perser',
  },
  '1koe 18,20': {
    events: 'um 860 v. Chr., unter Ahab',
    written: 'Elia-Erzählungen, später ins Geschichtswerk aufgenommen',
    epoch: 'koenige',
  },
  '2koe 5,1': {
    events: '9. Jh. v. Chr.',
    written: 'Elisa-Zyklus, später gesammelt',
    epoch: 'koenige',
  },

  /* -------------------------------------------- Exil, Rückkehr, Perserzeit */
  'esr 3,10': {
    events: 'um 536 v. Chr.',
    written: 'Nachexilisch, 4. Jh. v. Chr.',
    epoch: 'perser',
  },
  'neh 8,1': {
    events: 'um 444 v. Chr.',
    written: 'Nehemia-Denkschrift, redaktionell bearbeitet',
    epoch: 'perser',
  },
  'est 4,10': {
    events: 'Perserreich, 5. Jh. v. Chr.',
    written: 'Hellenistische Zeit',
    epoch: 'perser',
  },

  /* ------------------------------------------------- Weisheit und Psalmen */
  'hi 19,23': {
    events: 'Bewusst ohne Zeitangabe erzählt',
    written: '6.–4. Jh. v. Chr.',
    epoch: 'exil',
  },
  'ps 1,1': {
    written: 'Als Einleitung dem Psalter vorangestellt, nachexilisch',
    epoch: 'perser',
  },
  'ps 22,1': {
    written: 'Königszeit, im Exil weitergetragen',
    epoch: 'koenige',
  },
  'ps 23,1': {
    written: 'Königszeit',
    epoch: 'koenige',
  },
  'ps 51,1': {
    events: 'Die Überschrift bezieht ihn auf David, um 990 v. Chr.',
    written: 'Die Schlussverse setzen den Wiederaufbau Jerusalems voraus',
    epoch: 'exil',
  },
  'ps 121,1': {
    written: 'Wallfahrtspsalmen, nachexilisch gesammelt',
    epoch: 'perser',
  },
  'ps 137,1': {
    events: 'Babylonisches Exil, nach 587 v. Chr.',
    written: 'Während oder kurz nach dem Exil',
    epoch: 'exil',
  },
  'ps 139,1': {
    written: 'Später Psalm, sprachlich aramäisch beeinflusst',
    epoch: 'perser',
  },
  'spr 3,5': {
    written: 'Über Jahrhunderte gewachsen, Endgestalt nachexilisch',
    epoch: 'perser',
  },
  'pred 3,1': {
    written: '3. Jh. v. Chr.',
    epoch: 'hellenismus',
  },
  'hld 8,5': {
    written: 'Wahrscheinlich nachexilisch',
    epoch: 'perser',
  },
  'klgl 3,19': {
    events: 'Nach der Zerstörung Jerusalems 587 v. Chr.',
    written: 'Kurz danach',
    epoch: 'exil',
  },

  /* -------------------------------------------------------- Prophetenbücher */
  'jes 6,1': {
    events: '740 v. Chr., im Todesjahr des Königs Usija',
    written: '8. Jh. v. Chr., später gerahmt',
    epoch: 'koenige',
  },
  'jes 7,10': {
    events: '734 v. Chr., im syrisch-efraimitischen Krieg',
    written: '8. Jh. v. Chr.',
    epoch: 'koenige',
  },
  'jes 40,1': {
    events: 'Babylonisches Exil',
    written: 'um 545–539 v. Chr., kurz vor der Rückkehr',
    epoch: 'exil',
  },
  'jes 53,1': {
    events: 'Babylonisches Exil',
    written: 'um 545–539 v. Chr.',
    epoch: 'exil',
  },
  'jer 1,4': {
    events: '627 v. Chr.',
    written: 'Aufgezeichnet durch Baruch, 6. Jh. v. Chr.',
    epoch: 'koenige',
  },
  'jer 29,11': {
    events: 'um 594 v. Chr., Brief an die Verschleppten',
    written: '6. Jh. v. Chr.',
    epoch: 'exil',
  },
  'jer 31,31': {
    events: 'Um die Zerstörung Jerusalems, 587 v. Chr.',
    written: '6. Jh. v. Chr., später ergänzt',
    epoch: 'exil',
  },
  'hes 37,1': {
    events: 'um 585 v. Chr., unter den Verschleppten in Babylonien',
    written: '6. Jh. v. Chr.',
    epoch: 'exil',
  },
  'dan 3,1': {
    events: 'Erzählt im 6. Jh. v. Chr.',
    written: 'um 165 v. Chr., in der Verfolgung unter Antiochus IV.',
    epoch: 'hellenismus',
  },
  'hos 11,1': {
    events: '8. Jh. v. Chr., im Nordreich',
    written: '8. Jh., nach 722 in Juda weitergetragen',
    epoch: 'koenige',
  },
  'joel 2,28': {
    written: 'Wahrscheinlich 4. Jh. v. Chr.',
    epoch: 'perser',
  },
  'am 5,18': {
    events: 'um 760 v. Chr., im Nordreich',
    written: '8. Jh. v. Chr., später ergänzt',
    epoch: 'koenige',
  },
  'obd 1,10': {
    events: 'Nach dem Fall Jerusalems 587 v. Chr.',
    written: '6. Jh. v. Chr.',
    epoch: 'exil',
  },
  'jona 4,1': {
    events: 'Erzählt im 8. Jh. v. Chr.',
    written: 'Nachexilisch, 5./4. Jh. v. Chr.',
    epoch: 'perser',
  },
  'mi 6,8': {
    events: '8. Jh. v. Chr.',
    written: '8. Jh., später fortgeschrieben',
    epoch: 'koenige',
  },
  'nah 1,1': {
    events: 'Kurz vor dem Fall Ninives 612 v. Chr.',
    written: '7. Jh. v. Chr.',
    epoch: 'koenige',
  },
  'hab 2,1': {
    events: 'um 600 v. Chr., beim Aufstieg Babylons',
    written: 'um 600 v. Chr.',
    epoch: 'koenige',
  },
  'zef 3,14': {
    events: '7. Jh. v. Chr., unter Josia',
    written: '7. Jh.; der Schlussteil gilt vielen als später',
    epoch: 'koenige',
  },
  'hag 1,2': {
    events: '520 v. Chr. – auf den Monat genau datiert',
    written: 'Kurz danach',
    epoch: 'perser',
  },
  'sach 9,9': {
    written: 'Kapitel 9–14 gelten als jünger als 1–8, 4./3. Jh. v. Chr.',
    epoch: 'perser',
  },
  'mal 3,1': {
    events: '5. Jh. v. Chr., am zweiten Tempel',
    written: '5. Jh. v. Chr.',
    epoch: 'perser',
  },

  /* ------------------------------------------------------------ Evangelien */
  'mt 2,1': {
    events: 'um 6–4 v. Chr., vor dem Tod des Herodes',
    written: 'um 80–90 n. Chr.',
    epoch: 'roemer',
  },
  'mt 5,3': {
    events: 'um 28–30 n. Chr., in Galiläa',
    written: 'um 80–90 n. Chr.',
    epoch: 'roemer',
  },
  'mt 6,9': {
    events: 'um 28–30 n. Chr.',
    written: 'um 80–90 n. Chr.; Lukas überliefert eine kürzere Fassung',
    epoch: 'roemer',
  },
  'mt 13,1': {
    events: 'um 28–30 n. Chr.',
    written: 'um 80–90 n. Chr.',
    epoch: 'roemer',
  },
  'mt 16,13': {
    events: 'um 29 n. Chr., bei Cäsarea Philippi',
    written: 'um 80–90 n. Chr.',
    epoch: 'roemer',
  },
  'mt 22,15': {
    events: 'Karwoche, um 30 n. Chr.',
    written: 'um 80–90 n. Chr.',
    epoch: 'roemer',
  },
  'mt 25,31': {
    events: 'Karwoche, um 30 n. Chr.',
    written: 'um 80–90 n. Chr.',
    epoch: 'roemer',
  },
  'mt 28,16': {
    events: 'Nach Ostern, um 30 n. Chr.',
    written: 'um 80–90 n. Chr.',
    epoch: 'urkirche',
  },
  'mk 2,1': {
    events: 'um 28 n. Chr., in Kapernaum',
    written: 'um 70 n. Chr.',
    epoch: 'roemer',
  },
  'mk 4,35': {
    events: 'um 28 n. Chr., am See Genezareth',
    written: 'um 70 n. Chr.',
    epoch: 'roemer',
  },
  'mk 7,24': {
    events: 'um 29 n. Chr., im Gebiet von Tyrus',
    written: 'um 70 n. Chr.',
    epoch: 'roemer',
  },
  'mk 8,27': {
    events: 'um 29 n. Chr.',
    written: 'um 70 n. Chr. – das älteste Evangelium',
    epoch: 'roemer',
  },
  'lk 1,46': {
    events: 'Vor der Geburt Jesu',
    written: 'um 80–90 n. Chr.',
    epoch: 'roemer',
  },
  'lk 2,1': {
    events: 'um 6–4 v. Chr.; die Volkszählung des Quirinius ist für 6 n. Chr. bezeugt',
    written: 'um 80–90 n. Chr.',
    epoch: 'roemer',
  },
  'lk 10,25': {
    events: 'um 28–30 n. Chr.',
    written: 'um 80–90 n. Chr.',
    epoch: 'roemer',
  },
  'lk 15,11': {
    events: 'um 28–30 n. Chr.',
    written: 'um 80–90 n. Chr.',
    epoch: 'roemer',
  },
  'lk 16,19': {
    events: 'um 28–30 n. Chr.',
    written: 'um 80–90 n. Chr.',
    epoch: 'roemer',
  },
  'lk 23,32': {
    events: 'um 30 n. Chr., unter Pontius Pilatus',
    written: 'um 80–90 n. Chr.',
    epoch: 'roemer',
  },
  'lk 24,13': {
    events: 'Ostern, um 30 n. Chr.',
    written: 'um 80–90 n. Chr.',
    epoch: 'urkirche',
  },
  'joh 1,1': {
    written: 'um 90–100 n. Chr.; der Prolog gilt vielen als älterer Hymnus',
    epoch: 'urkirche',
  },
  'joh 3,16': {
    events: 'um 28–30 n. Chr., nächtliches Gespräch in Jerusalem',
    written: 'um 90–100 n. Chr.',
    epoch: 'roemer',
  },
  'joh 4,1': {
    events: 'um 28–30 n. Chr., in Samarien',
    written: 'um 90–100 n. Chr.',
    epoch: 'roemer',
  },
  'joh 8,1': {
    events: 'Zeitlich nicht sicher einzuordnen',
    written: 'Fehlt in den ältesten Handschriften; erst später eingefügt',
    epoch: 'urkirche',
  },
  'joh 13,1': {
    events: 'Vorabend des Passa, um 30 n. Chr.',
    written: 'um 90–100 n. Chr.',
    epoch: 'roemer',
  },
  'joh 14,6': {
    events: 'Abschiedsreden, um 30 n. Chr.',
    written: 'um 90–100 n. Chr.',
    epoch: 'roemer',
  },
  'joh 20,24': {
    events: 'Ostern, um 30 n. Chr.',
    written: 'um 90–100 n. Chr.',
    epoch: 'urkirche',
  },

  /* ------------------------------------------------------- Frühe Kirche */
  'apg 2,1': {
    events: 'um 30 n. Chr., am Wochenfest in Jerusalem',
    written: 'um 80–90 n. Chr.',
    epoch: 'urkirche',
  },
  'apg 10,1': {
    events: 'um 38–40 n. Chr., in Cäsarea',
    written: 'um 80–90 n. Chr.',
    epoch: 'urkirche',
  },
  'apg 17,16': {
    events: 'um 50 n. Chr., auf der zweiten Missionsreise',
    written: 'um 80–90 n. Chr.',
    epoch: 'urkirche',
  },

  /* ------------------------------------------------------------- Briefe */
  '1thess 4,13': {
    written: 'um 50–51 n. Chr. – vermutlich die älteste Schrift des Neuen Testaments',
    epoch: 'urkirche',
  },
  '2thess 3,6': {
    written: '1. Jh. n. Chr.; die Verfasserschaft ist umstritten',
    epoch: 'urkirche',
  },
  'gal 3,26': {
    written: 'um 50–55 n. Chr.',
    epoch: 'urkirche',
  },
  '1kor 11,17': {
    written: 'um 54–55 n. Chr., aus Ephesus',
    epoch: 'urkirche',
  },
  '1kor 13,1': {
    written: 'um 54–55 n. Chr.',
    epoch: 'urkirche',
  },
  '1kor 15,1': {
    events: 'Die zitierte Bekenntnisformel stammt aus den 30er Jahren',
    written: 'um 54–55 n. Chr.',
    epoch: 'urkirche',
  },
  '2kor 12,1': {
    written: 'um 55–56 n. Chr.',
    epoch: 'urkirche',
  },
  'roem 8,28': {
    written: 'um 56–58 n. Chr., aus Korinth',
    epoch: 'urkirche',
  },
  'roem 13,1': {
    written: 'um 56–58 n. Chr. – wenige Jahre vor der Verfolgung unter Nero',
    epoch: 'urkirche',
  },
  'phlm 1,8': {
    written: 'um 60 n. Chr., aus der Haft',
    epoch: 'urkirche',
  },
  'phil 2,5': {
    events: 'Der zitierte Hymnus ist älter als der Brief',
    written: 'um 55–62 n. Chr., aus der Haft',
    epoch: 'urkirche',
  },
  'kol 1,15': {
    events: 'Der zitierte Hymnus ist älter als der Brief',
    written: 'um 60–80 n. Chr.',
    epoch: 'urkirche',
  },
  'eph 2,8': {
    written: 'um 60–90 n. Chr.; die Verfasserschaft ist umstritten',
    epoch: 'urkirche',
  },
  'eph 6,10': {
    written: 'um 60–90 n. Chr.',
    epoch: 'urkirche',
  },
  '1tim 2,8': {
    written: 'Spätes 1. oder frühes 2. Jh. n. Chr.; überwiegend als nachpaulinisch eingeordnet',
    epoch: 'urkirche',
  },
  '2tim 3,14': {
    written: 'Spätes 1. oder frühes 2. Jh. n. Chr.',
    epoch: 'urkirche',
  },
  'tit 3,3': {
    written: 'Spätes 1. oder frühes 2. Jh. n. Chr.',
    epoch: 'urkirche',
  },
  'hebr 11,1': {
    written: 'Vor 100 n. Chr.; der Verfasser ist unbekannt',
    epoch: 'urkirche',
  },
  'jak 2,14': {
    written: '1. Jh. n. Chr.',
    epoch: 'urkirche',
  },
  '1petr 3,13': {
    written: 'um 60–90 n. Chr.',
    epoch: 'urkirche',
  },
  '2petr 3,8': {
    written: 'Spätes 1. oder frühes 2. Jh. n. Chr. – vermutlich die jüngste Schrift des Neuen Testaments',
    epoch: 'urkirche',
  },
  '1joh 4,7': {
    written: 'um 90–110 n. Chr.',
    epoch: 'urkirche',
  },
  '2joh 1,4': {
    written: 'um 90–110 n. Chr.',
    epoch: 'urkirche',
  },
  '3joh 1,5': {
    written: 'um 90–110 n. Chr.',
    epoch: 'urkirche',
  },
  'jud 1,17': {
    written: '1. Jh. n. Chr.',
    epoch: 'urkirche',
  },
  'offb 3,14': {
    events: 'um 95 n. Chr., an eine Gemeinde in Kleinasien',
    written: 'um 95 n. Chr., meist unter Domitian verortet',
    epoch: 'urkirche',
  },
  'offb 21,1': {
    written: 'um 95 n. Chr.',
    epoch: 'urkirche',
  },
};

/** Der Schlüssel, unter dem ein Artikel seine Datierung findet. */
export function datingKey(book: string, chapter: number, from: number): string {
  return `${book} ${chapter},${from}`;
}
