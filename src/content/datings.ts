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
  /* ------------------------------------ Nachgezogene Artikel: Tora und
   * Geschichtsbücher */
  '3mo 19,9': {
    events: 'Wüstenzeit, im Text am Sinai angesiedelt',
    written: 'Heiligkeitsgesetz, meist 6./5. Jh. v. Chr.',
    epoch: 'exil',
  },
  '4mo 14,1': {
    events: 'Wüstenzeit, meist im 13. Jh. v. Chr. verortet',
    written: 'Ältere Erzählung mit priesterlicher Bearbeitung, 6./5. Jh. v. Chr.',
    epoch: 'exodus',
  },
  '5mo 30,15': {
    events: 'Im Text: letzte Rede des Mose vor dem Jordan',
    written: 'Grundform 7. Jh. v. Chr., Endgestalt nach dem Exil',
    epoch: 'koenige',
  },
  'jos 1,1': {
    events: 'Im Text: Beginn der Landnahme',
    written: 'Deuteronomistisches Geschichtswerk, 6. Jh. v. Chr.',
    epoch: 'exodus',
  },
  'jos 6,12': {
    events: 'Im Text: Beginn der Landnahme; archäologisch umstritten',
    written: 'Deuteronomistisches Geschichtswerk, 6. Jh. v. Chr.',
    epoch: 'exodus',
  },
  'ri 4,1': {
    events: 'etwa 12./11. Jh. v. Chr.',
    written: 'Das Lied in Kapitel 5 sehr alt, die Prosafassung jünger',
    epoch: 'richter',
  },
  'ri 16,23': {
    events: 'etwa 12./11. Jh. v. Chr.',
    written: 'Ältere Erzählstoffe, im Richterbuch 6. Jh. v. Chr. gerahmt',
    epoch: 'richter',
  },
  'rut 4,13': {
    events: 'Im Text: Richterzeit',
    written: 'Umstritten; viele setzen die Perserzeit an, 5./4. Jh. v. Chr.',
    epoch: 'perser',
  },
  '1sam 3,1': {
    events: 'etwa 1050 v. Chr.',
    written: 'Samuelüberlieferung, im 6. Jh. v. Chr. zusammengefügt',
    epoch: 'richter',
  },
  '1sam 8,1': {
    events: 'etwa 1030 v. Chr.',
    written: 'Königskritische Schicht wohl nach 587 v. Chr.',
    epoch: 'koenige',
  },
  '2sam 7,1': {
    events: 'etwa 1000 v. Chr.',
    written: 'Mehrfach überarbeitet, Endgestalt nach dem Exil',
    epoch: 'koenige',
  },
  '2sam 11,1': {
    events: 'etwa 990 v. Chr.',
    written: 'Thronfolgeerzählung, teils sehr alt',
    epoch: 'koenige',
  },
  '1koe 3,16': {
    events: 'etwa 960 v. Chr.',
    written: 'Höfische Weisheitsüberlieferung, im 6. Jh. v. Chr. gerahmt',
    epoch: 'koenige',
  },
  '1koe 21,1': {
    events: 'etwa 860 v. Chr.',
    written: 'Prophetische Überlieferung, 8./7. Jh. v. Chr.',
    epoch: 'koenige',
  },
  '2koe 17,5': {
    events: '722 v. Chr.',
    written: 'Deuteronomistische Deutung nach 587 v. Chr.',
    epoch: 'koenige',
  },
  '2koe 22,8': {
    events: '622 v. Chr.',
    written: 'Deuteronomistisches Geschichtswerk, 6. Jh. v. Chr.',
    epoch: 'koenige',
  },
  '2koe 25,1': {
    events: '587 v. Chr.',
    written: 'Kurz nach den Ereignissen, im Exil abgeschlossen',
    epoch: 'exil',
  },
  '2chr 36,15': {
    events: '587 bis 538 v. Chr.',
    written: 'Perserzeit, 4. Jh. v. Chr.',
    epoch: 'perser',
  },
  'esr 1,1': {
    events: '538 v. Chr.',
    written: 'Perserzeit, 4. Jh. v. Chr.',
    epoch: 'perser',
  },
  'neh 2,11': {
    events: 'etwa 445 v. Chr.',
    written: 'Nehemia-Denkschrift, kurz nach den Ereignissen',
    epoch: 'perser',
  },
  /* ------------------------ Nachgezogene Artikel: Weisheit und Propheten */
  'hi 38,1': {
    events: 'Die Rahmenerzählung nennt keine Zeit',
    written: 'Umstritten; meist 6.–4. Jh. v. Chr., Gottesreden womöglich später',
    epoch: 'exil',
  },
  'spr 8,22': {
    events: 'Vor der Schöpfung – keine erzählte Zeit',
    written: 'Jüngere Schicht der Sprüche, Perserzeit',
    epoch: 'perser',
  },
  'pred 12,1': {
    events: 'Keine erzählte Zeit',
    written: 'Hellenistische Zeit, 3. Jh. v. Chr.',
    epoch: 'hellenismus',
  },
  'hes 1,4': {
    events: '593 v. Chr., im babylonischen Exil',
    written: 'Kurz danach, mit späterer Schulüberarbeitung',
    epoch: 'exil',
  },
  'hes 18,1': {
    events: 'Zwischen 593 und 571 v. Chr.',
    written: 'Exilszeit',
    epoch: 'exil',
  },
  'hes 34,1': {
    events: 'Nach 587 v. Chr.',
    written: 'Exilszeit',
    epoch: 'exil',
  },
  'dan 7,9': {
    events: 'Im Text: babylonische Zeit, gemeint ist das 2. Jh. v. Chr.',
    written: 'um 165 v. Chr.',
    epoch: 'hellenismus',
  },
  'dan 9,1': {
    events: 'Im Text: 539 v. Chr., gemeint ist das 2. Jh. v. Chr.',
    written: 'um 165 v. Chr.',
    epoch: 'hellenismus',
  },
  'hos 1,2': {
    events: 'etwa 750–725 v. Chr., kurz vor dem Untergang des Nordreichs',
    written: 'Sammlung im 8. Jh. v. Chr., judäische Bearbeitung später',
    epoch: 'koenige',
  },
  'joel 1,1': {
    events: 'Nicht sicher datierbar',
    written: 'Meist Perserzeit, 5./4. Jh. v. Chr.',
    epoch: 'perser',
  },
  'am 7,10': {
    events: 'etwa 760 v. Chr.',
    written: 'Sammlung kurz danach, spätere Ergänzungen',
    epoch: 'koenige',
  },
  'jona 1,1': {
    events: 'Im Text: 8. Jh. v. Chr.; das Buch erzählt eine Lehrgeschichte',
    written: 'Meist nachexilisch, 5./4. Jh. v. Chr.',
    epoch: 'perser',
  },
  'jona 3,1': {
    events: 'Im Text: 8. Jh. v. Chr.',
    written: 'Meist nachexilisch, 5./4. Jh. v. Chr.',
    epoch: 'perser',
  },
  'mi 5,1': {
    events: 'Assyrische Bedrohung, spätes 8. Jh. v. Chr.',
    written: '8. Jh. v. Chr., Umfang der späteren Bearbeitung umstritten',
    epoch: 'koenige',
  },
  'nah 3,1': {
    events: 'Der Fall Ninives 612 v. Chr.',
    written: 'Kurz vor oder nach 612 v. Chr.',
    epoch: 'koenige',
  },
  'hab 3,17': {
    events: 'Aufstieg Babylons, um 605 v. Chr.',
    written: 'Kapitel 3 möglicherweise später angefügt',
    epoch: 'koenige',
  },
  'hag 2,1': {
    events: '520 v. Chr., auf den Tag datiert',
    written: 'Kurz nach den Ereignissen',
    epoch: 'perser',
  },
  'sach 4,1': {
    events: '520/519 v. Chr.',
    written: 'Kurz nach den Ereignissen',
    epoch: 'perser',
  },
  'mal 3,8': {
    events: 'Perserzeit, 5. Jh. v. Chr.',
    written: '5. Jh. v. Chr.',
    epoch: 'perser',
  },
  /* --------------------------- Nachgezogene Artikel: Briefe und Restliches */
  '1chr 16,8': {
    events: 'Im Text: Überführung der Lade, um 1000 v. Chr.',
    written: 'Chronik, Perserzeit, 4. Jh. v. Chr.',
    epoch: 'perser',
  },
  'est 9,20': {
    events: 'Im Text: Perserzeit unter Ahasveros',
    written: 'Hellenistische Zeit, 3./2. Jh. v. Chr.',
    epoch: 'hellenismus',
  },
  'hld 2,8': {
    events: 'Keine erzählte Zeit',
    written: 'Umstritten; Sprache weist auf nachexilische Zeit',
    epoch: 'perser',
  },
  'klgl 5,15': {
    events: 'Nach 587 v. Chr.',
    written: 'Kurz nach der Zerstörung Jerusalems',
    epoch: 'exil',
  },
  'obd 1,17': {
    events: 'Nach 587 v. Chr.',
    written: '6. Jh. v. Chr.',
    epoch: 'exil',
  },
  'zef 1,14': {
    events: 'Spätes 7. Jh. v. Chr., vor der Reform Josias',
    written: '7. Jh. v. Chr., spätere Ergänzungen',
    epoch: 'koenige',
  },
  '2kor 4,7': {
    written: 'etwa 55/56 n. Chr., aus dem Konflikt mit Korinth',
    epoch: 'urkirche',
  },
  '2kor 5,17': {
    written: 'etwa 55/56 n. Chr.',
    epoch: 'urkirche',
  },
  'gal 2,11': {
    events: 'Der Vorfall in Antiochia, um 48/49 n. Chr.',
    written: 'etwa 48–55 n. Chr.; die Datierung hängt am Adressatenkreis',
    epoch: 'urkirche',
  },
  'gal 5,1': {
    written: 'etwa 48–55 n. Chr.',
    epoch: 'urkirche',
  },
  'phil 4,4': {
    events: 'Aus der Gefangenschaft geschrieben',
    written: 'etwa 55–62 n. Chr., Ort der Haft umstritten',
    epoch: 'urkirche',
  },
  'kol 3,12': {
    written: 'etwa 60–80 n. Chr.; Verfasserschaft umstritten',
    epoch: 'urkirche',
  },
  '1thess 5,1': {
    written: 'um 50 n. Chr. – wohl die älteste erhaltene christliche Schrift',
    epoch: 'urkirche',
  },
  '2thess 2,1': {
    written: 'um 50 n. Chr. oder deutlich später; Verfasserschaft umstritten',
    epoch: 'urkirche',
  },
  '1tim 6,6': {
    written: 'Spätes 1. oder frühes 2. Jh. n. Chr.',
    epoch: 'urkirche',
  },
  '2tim 4,6': {
    written: 'Spätes 1. oder frühes 2. Jh. n. Chr.',
    epoch: 'urkirche',
  },
  'tit 2,11': {
    written: 'Spätes 1. oder frühes 2. Jh. n. Chr.',
    epoch: 'urkirche',
  },
  'hebr 4,12': {
    written: 'Vor 100 n. Chr.; Verfasser unbekannt',
    epoch: 'urkirche',
  },
  'hebr 12,1': {
    written: 'Vor 100 n. Chr.',
    epoch: 'urkirche',
  },
  'jak 1,2': {
    written: 'Umstritten, zwischen 50 und 100 n. Chr.',
    epoch: 'urkirche',
  },
  'jak 5,13': {
    written: 'Umstritten, zwischen 50 und 100 n. Chr.',
    epoch: 'urkirche',
  },
  '1petr 2,1': {
    written: 'etwa 70–95 n. Chr., an Gemeinden in Kleinasien',
    epoch: 'urkirche',
  },
  '2petr 1,16': {
    written: 'Wohl die späteste Schrift des Neuen Testaments, 2. Jh. n. Chr.',
    epoch: 'urkirche',
  },
  '1joh 1,5': {
    written: 'um 100 n. Chr., aus einer Gemeindespaltung',
    epoch: 'urkirche',
  },

  /* ------------------------- Schlüsselverse, Nachtrag */
  '1mo 2,24': {
    events: 'Urgeschichte',
    written: 'Ältere Erzählschicht, meist 10.–8. Jh. v. Chr. angesetzt',
    epoch: 'koenige',
  },
  '1mo 12,1': {
    events: 'Nicht datierbar; die Erzählung setzt die frühe Bronzezeit voraus',
    written: 'Endgestalt in der Exilszeit, 6. Jh. v. Chr.',
    epoch: 'erzvaeter',
  },
  '1mo 15,6': {
    events: 'Nicht datierbar',
    written: 'Vermutlich exilische Bearbeitung älterer Überlieferung',
    epoch: 'erzvaeter',
  },
  '1mo 28,15': {
    events: 'Nicht datierbar',
    written: 'Ältere Erzählung, in der Königszeit gesammelt',
    epoch: 'erzvaeter',
  },
  '2mo 33,14': {
    events: 'Wüstenzeit, meist im 13. Jh. v. Chr. verortet',
    written: 'Ältere Erzählschicht mit späterer Bearbeitung',
    epoch: 'exodus',
  },
  '5mo 31,6': {
    events: 'Im Text: letzte Tage des Mose',
    written: 'Grundform 7. Jh. v. Chr., Endgestalt nach dem Exil',
    epoch: 'koenige',
  },
  '1sam 16,7': {
    events: 'etwa 1020 v. Chr.',
    written: 'Samuelüberlieferung, im 6. Jh. v. Chr. zusammengefügt',
    epoch: 'koenige',
  },
  '1koe 8,27': {
    events: 'Im Text: Tempelweihe um 950 v. Chr.',
    written: 'Deuteronomistisch, 6. Jh. v. Chr.',
    epoch: 'koenige',
  },
  '1koe 19,11': {
    events: 'etwa 860 v. Chr.',
    written: 'Prophetische Überlieferung, 8./7. Jh. v. Chr.',
    epoch: 'koenige',
  },
  '2koe 6,16': {
    events: 'etwa 840 v. Chr.',
    written: 'Prophetische Überlieferung, 8. Jh. v. Chr.',
    epoch: 'koenige',
  },
  'ps 8,3': {
    written: 'Sammlung des Psalters, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  'ps 16,11': {
    written: 'Sammlung des Psalters, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  'ps 19,1': {
    written: 'Sammlung des Psalters, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  'ps 27,1': {
    written: 'Sammlung des Psalters, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  'ps 32,8': {
    written: 'Sammlung des Psalters, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  'ps 34,8': {
    written: 'Sammlung des Psalters, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  'ps 37,4': {
    written: 'Sammlung des Psalters, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  'ps 42,1': {
    written: 'Sammlung des Psalters, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  'ps 46,1': {
    written: 'Sammlung des Psalters, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  'ps 46,10': {
    written: 'Sammlung des Psalters, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  'ps 55,22': {
    written: 'Sammlung des Psalters, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  'ps 62,1': {
    written: 'Sammlung des Psalters, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  'ps 73,25': {
    written: 'Sammlung des Psalters, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  'ps 90,12': {
    written: 'Sammlung des Psalters, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  'ps 91,1': {
    written: 'Sammlung des Psalters, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  'ps 103,1': {
    written: 'Sammlung des Psalters, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  'ps 118,22': {
    written: 'Sammlung des Psalters, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  'ps 119,105': {
    written: 'Sammlung des Psalters, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  'ps 127,1': {
    written: 'Sammlung des Psalters, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  '2chr 20,15': {
    events: 'Im Text: 9. Jh. v. Chr.',
    written: 'Chronik, Perserzeit, 4. Jh. v. Chr.',
    epoch: 'perser',
  },
  'hi 1,20': {
    events: 'Keine erzählte Zeit',
    written: 'Umstritten; meist 6.–4. Jh. v. Chr.',
    epoch: 'exil',
  },
  'hi 42,1': {
    events: 'Keine erzählte Zeit',
    written: 'Umstritten; meist 6.–4. Jh. v. Chr.',
    epoch: 'exil',
  },
  'spr 4,23': {
    written: 'Sammlung der Sprüche, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  'spr 16,9': {
    written: 'Sammlung der Sprüche, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  'spr 18,10': {
    written: 'Sammlung der Sprüche, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  'spr 22,6': {
    written: 'Sammlung der Sprüche, Endgestalt nachexilisch',
    epoch: 'koenige',
  },
  'pred 12,13': {
    events: 'Keine erzählte Zeit',
    written: 'Hellenistische Zeit, 3. Jh. v. Chr.',
    epoch: 'hellenismus',
  },
  'jes 1,18': {
    written: '8. Jh. v. Chr., mit späteren Bearbeitungen',
    epoch: 'koenige',
  },
  'jes 9,6': {
    written: '8. Jh. v. Chr., mit späteren Bearbeitungen',
    epoch: 'koenige',
  },
  'jes 26,3': {
    written: '8. Jh. v. Chr., mit späteren Bearbeitungen',
    epoch: 'koenige',
  },
  'jes 40,31': {
    written: 'Zweiter Teil des Jesajabuchs, Exilszeit',
    epoch: 'exil',
  },
  'jes 41,10': {
    written: 'Zweiter Teil des Jesajabuchs, Exilszeit',
    epoch: 'exil',
  },
  'jes 43,1': {
    written: 'Zweiter Teil des Jesajabuchs, Exilszeit',
    epoch: 'exil',
  },
  'jes 55,8': {
    written: 'Zweiter Teil des Jesajabuchs, Exilszeit',
    epoch: 'exil',
  },
  'jes 58,6': {
    written: 'Dritter Teil, frühe Perserzeit',
    epoch: 'perser',
  },
  'jes 61,1': {
    written: 'Dritter Teil, frühe Perserzeit',
    epoch: 'perser',
  },
  'jer 17,7': {
    events: 'Späte Königszeit, 7./6. Jh. v. Chr.',
    written: 'Jeremiaüberlieferung, im Exil gesammelt',
    epoch: 'koenige',
  },
  'jer 31,3': {
    events: 'Späte Königszeit oder Exil',
    written: 'Trostbüchlein, im Exil gesammelt',
    epoch: 'exil',
  },
  'hes 36,26': {
    events: 'Nach 587 v. Chr.',
    written: 'Exilszeit',
    epoch: 'exil',
  },
  'hos 6,6': {
    events: 'etwa 750–725 v. Chr.',
    written: '8. Jh. v. Chr., judäische Bearbeitung später',
    epoch: 'koenige',
  },
  'joel 2,12': {
    events: 'Nicht sicher datierbar',
    written: 'Meist Perserzeit, 5./4. Jh. v. Chr.',
    epoch: 'perser',
  },
  'mt 5,14': {
    events: 'Wirken Jesu, um 28–30 n. Chr.',
    written: 'Evangelium nach Matthäus, meist 80–90 n. Chr., wohl in Syrien',
    epoch: 'roemer',
  },
  'mt 6,33': {
    events: 'Wirken Jesu, um 28–30 n. Chr.',
    written: 'Evangelium nach Matthäus, meist 80–90 n. Chr., wohl in Syrien',
    epoch: 'roemer',
  },
  'mt 7,7': {
    events: 'Wirken Jesu, um 28–30 n. Chr.',
    written: 'Evangelium nach Matthäus, meist 80–90 n. Chr., wohl in Syrien',
    epoch: 'roemer',
  },
  'mt 7,12': {
    events: 'Wirken Jesu, um 28–30 n. Chr.',
    written: 'Evangelium nach Matthäus, meist 80–90 n. Chr., wohl in Syrien',
    epoch: 'roemer',
  },
  'mt 11,28': {
    events: 'Wirken Jesu, um 28–30 n. Chr.',
    written: 'Evangelium nach Matthäus, meist 80–90 n. Chr., wohl in Syrien',
    epoch: 'roemer',
  },
  'mt 19,26': {
    events: 'Wirken Jesu, um 28–30 n. Chr.',
    written: 'Evangelium nach Matthäus, meist 80–90 n. Chr., wohl in Syrien',
    epoch: 'roemer',
  },
  'mt 22,37': {
    events: 'Wirken Jesu, um 28–30 n. Chr.',
    written: 'Evangelium nach Matthäus, meist 80–90 n. Chr., wohl in Syrien',
    epoch: 'roemer',
  },
  'mk 10,45': {
    events: 'Wirken Jesu, um 28–30 n. Chr.',
    written: 'Evangelium nach Markus, meist um 70 n. Chr.',
    epoch: 'roemer',
  },
  'mk 16,15': {
    events: 'Nach Ostern erzählt; der Text selbst entstand später',
    written: 'Längerer Markusschluss, meist 2. Jh. n. Chr.',
    epoch: 'urkirche',
  },
  'lk 1,37': {
    events: 'Vorgeschichte der Geburt Jesu, um 6–4 v. Chr.',
    written: 'Evangelium nach Lukas, meist 80–90 n. Chr.',
    epoch: 'roemer',
  },
  'lk 6,31': {
    events: 'Wirken Jesu, um 28–30 n. Chr.',
    written: 'Evangelium nach Lukas, meist 80–90 n. Chr.',
    epoch: 'roemer',
  },
  'lk 6,38': {
    events: 'Wirken Jesu, um 28–30 n. Chr.',
    written: 'Evangelium nach Lukas, meist 80–90 n. Chr.',
    epoch: 'roemer',
  },
  'lk 9,23': {
    events: 'Wirken Jesu, um 28–30 n. Chr.',
    written: 'Evangelium nach Lukas, meist 80–90 n. Chr.',
    epoch: 'roemer',
  },
  'lk 19,10': {
    events: 'Wirken Jesu, um 28–30 n. Chr.',
    written: 'Evangelium nach Lukas, meist 80–90 n. Chr.',
    epoch: 'roemer',
  },
  'joh 10,10': {
    events: 'Wirken Jesu, um 28–30 n. Chr.',
    written: 'Evangelium nach Johannes, meist 90–110 n. Chr.',
    epoch: 'roemer',
  },
  'joh 11,25': {
    events: 'Wirken Jesu, um 28–30 n. Chr.',
    written: 'Evangelium nach Johannes, meist 90–110 n. Chr.',
    epoch: 'roemer',
  },
  'joh 13,34': {
    events: 'Wirken Jesu, um 28–30 n. Chr.',
    written: 'Evangelium nach Johannes, meist 90–110 n. Chr.',
    epoch: 'roemer',
  },
  'joh 14,27': {
    events: 'Wirken Jesu, um 28–30 n. Chr.',
    written: 'Evangelium nach Johannes, meist 90–110 n. Chr.',
    epoch: 'roemer',
  },
  'joh 15,5': {
    events: 'Wirken Jesu, um 28–30 n. Chr.',
    written: 'Evangelium nach Johannes, meist 90–110 n. Chr.',
    epoch: 'roemer',
  },
  'joh 16,33': {
    events: 'Wirken Jesu, um 28–30 n. Chr.',
    written: 'Evangelium nach Johannes, meist 90–110 n. Chr.',
    epoch: 'roemer',
  },
  'apg 1,8': {
    events: 'Nach Ostern, um 30 n. Chr.',
    written: 'Apostelgeschichte, meist 80–90 n. Chr.',
    epoch: 'urkirche',
  },
  'apg 2,38': {
    events: 'Pfingsten, um 30 n. Chr.',
    written: 'Apostelgeschichte, meist 80–90 n. Chr.',
    epoch: 'urkirche',
  },
  'apg 4,12': {
    events: 'Frühe Zeit der Jerusalemer Gemeinde, um 30–33 n. Chr.',
    written: 'Apostelgeschichte, meist 80–90 n. Chr.',
    epoch: 'urkirche',
  },
  'apg 16,31': {
    events: 'Zweite Missionsreise, um 50 n. Chr.',
    written: 'Apostelgeschichte, meist 80–90 n. Chr.',
    epoch: 'urkirche',
  },
  'roem 1,16': {
    events: 'Abgefasst um 56 n. Chr.',
    written: 'Römerbrief, um 56 n. Chr. in Korinth diktiert',
    epoch: 'urkirche',
  },
  'roem 3,23': {
    events: 'Abgefasst um 56 n. Chr.',
    written: 'Römerbrief, um 56 n. Chr. in Korinth diktiert',
    epoch: 'urkirche',
  },
  'roem 5,8': {
    events: 'Abgefasst um 56 n. Chr.',
    written: 'Römerbrief, um 56 n. Chr. in Korinth diktiert',
    epoch: 'urkirche',
  },
  'roem 6,23': {
    events: 'Abgefasst um 56 n. Chr.',
    written: 'Römerbrief, um 56 n. Chr. in Korinth diktiert',
    epoch: 'urkirche',
  },
  'roem 8,1': {
    events: 'Abgefasst um 56 n. Chr.',
    written: 'Römerbrief, um 56 n. Chr. in Korinth diktiert',
    epoch: 'urkirche',
  },
  'roem 10,9': {
    events: 'Abgefasst um 56 n. Chr.',
    written: 'Römerbrief, um 56 n. Chr. in Korinth diktiert',
    epoch: 'urkirche',
  },
  'roem 12,1': {
    events: 'Abgefasst um 56 n. Chr.',
    written: 'Römerbrief, um 56 n. Chr. in Korinth diktiert',
    epoch: 'urkirche',
  },
  'roem 12,2': {
    events: 'Abgefasst um 56 n. Chr.',
    written: 'Römerbrief, um 56 n. Chr. in Korinth diktiert',
    epoch: 'urkirche',
  },
  '1kor 1,18': {
    events: 'Abgefasst um 54/55 n. Chr.',
    written: 'Erster Korintherbrief, um 54/55 n. Chr. in Ephesus',
    epoch: 'urkirche',
  },
  '1kor 10,13': {
    events: 'Abgefasst um 54/55 n. Chr.',
    written: 'Erster Korintherbrief, um 54/55 n. Chr. in Ephesus',
    epoch: 'urkirche',
  },
  '1kor 15,58': {
    events: 'Abgefasst um 54/55 n. Chr.',
    written: 'Erster Korintherbrief, um 54/55 n. Chr. in Ephesus',
    epoch: 'urkirche',
  },
  '2kor 4,16': {
    events: 'Abgefasst um 55/56 n. Chr.',
    written: 'Zweiter Korintherbrief, um 55/56 n. Chr.',
    epoch: 'urkirche',
  },
  '2kor 5,7': {
    events: 'Abgefasst um 55/56 n. Chr.',
    written: 'Zweiter Korintherbrief, um 55/56 n. Chr.',
    epoch: 'urkirche',
  },
  'gal 5,22': {
    events: 'Abgefasst um 50–55 n. Chr.',
    written: 'Galaterbrief, meist 50–55 n. Chr.',
    epoch: 'urkirche',
  },
  'eph 3,20': {
    written: 'Epheserbrief, Verfasserschaft umstritten, meist 80–100 n. Chr.',
    epoch: 'urkirche',
  },
  'phil 1,6': {
    events: 'Aus der Haft, um 55–62 n. Chr.',
    written: 'Philipperbrief, meist 55–62 n. Chr.',
    epoch: 'urkirche',
  },
  'phil 2,3': {
    events: 'Aus der Haft, um 55–62 n. Chr.',
    written: 'Philipperbrief, meist 55–62 n. Chr.',
    epoch: 'urkirche',
  },
  'phil 4,10': {
    events: 'Aus der Haft, um 55–62 n. Chr.',
    written: 'Philipperbrief, meist 55–62 n. Chr.',
    epoch: 'urkirche',
  },
  'kol 3,23': {
    written: 'Kolosserbrief, Verfasserschaft umstritten, um 60 oder 70–80 n. Chr.',
    epoch: 'urkirche',
  },
  '2tim 1,7': {
    written: 'Zweiter Timotheusbrief, Verfasserschaft umstritten, meist 100–130 n. Chr.',
    epoch: 'urkirche',
  },
  'hebr 13,5': {
    written: 'Hebräerbrief, Verfasser unbekannt, meist 60–90 n. Chr.',
    epoch: 'urkirche',
  },
  '1petr 5,7': {
    written: 'Erster Petrusbrief, Verfasserschaft umstritten, meist 80–100 n. Chr.',
    epoch: 'urkirche',
  },
  '1joh 3,1': {
    written: 'Erster Johannesbrief, meist um 100 n. Chr.',
    epoch: 'urkirche',
  },
  'jak 4,7': {
    written: 'Jakobusbrief, meist 80–100 n. Chr.',
    epoch: 'urkirche',
  },
  '1mo 2,4': {
    events: 'Urgeschichte, außerhalb der historischen Zeitrechnung erzählt',
    written: 'Ältere Erzählschicht, nach verbreiteter Annahme vorexilisch, in der vorliegenden Gestalt nachexilisch gerahmt',
    epoch: 'vorgeschichte',
  },
  '1mo 4,3': {
    events: 'Urgeschichte, außerhalb der historischen Zeitrechnung erzählt',
    written: 'Alte Erzählüberlieferung, schriftlich gefasst wohl in der Königszeit',
    epoch: 'vorgeschichte',
  },
  '1mo 9,8': {
    events: 'Urgeschichte, außerhalb der historischen Zeitrechnung erzählt',
    written: 'Priesterliche Schicht, meist ins 6. Jahrhundert v. Chr. gesetzt',
    epoch: 'vorgeschichte',
  },
  '1mo 18,22': {
    events: 'Erzelternzeit, im Rahmen der Erzählung in die Mittlere Bronzezeit gestellt',
    written: 'Wohl späterer Einschub in die ältere Abrahamüberlieferung, exilisch-nachexilisch',
    epoch: 'erzvaeter',
  },
  '1mo 32,22': {
    events: 'Erzelternzeit, im Rahmen der Erzählung in die Mittlere Bronzezeit gestellt',
    written: 'Alte Jakobüberlieferung aus dem Ostjordanland, schriftlich in der Königszeit',
    epoch: 'erzvaeter',
  },
  '2mo 16,11': {
    events: 'Wüstenzeit nach dem Auszug, üblicherweise ins 13. Jahrhundert v. Chr. gesetzt',
    written: 'Priesterliche und ältere Überlieferung, zusammengefügt in exilisch-nachexilischer Zeit',
    epoch: 'exodus',
  },
  '2mo 32,1': {
    events: 'Wüstenzeit am Gottesberg, im Rahmen der Erzählung 13. Jahrhundert v. Chr.',
    written: 'Mit Blick auf den Kult des Nordreichs geformt, in vorliegender Gestalt nachexilisch',
    epoch: 'exodus',
  },
  '2mo 34,4': {
    events: 'Bundeserneuerung am Gottesberg nach dem Bruch',
    written: 'Alte Kultformel, in den Zusammenhang der Sinaierzählung eingebaut',
    epoch: 'exodus',
  },
  '3mo 25,8': {
    events: 'Als Sinaigesetzgebung erzählt',
    written: 'Heiligkeitsgesetz, überwiegend in die Exils- und frühe Perserzeit gesetzt',
    epoch: 'exodus',
  },
  '4mo 22,21': {
    events: 'Aufenthalt in den Ebenen Moabs vor dem Einzug ins Westjordanland',
    written: 'Ältere Überlieferung, die Episode mit der Eselin gilt vielen als eigener Einschub',
    epoch: 'exodus',
  },
  '5mo 8,1': {
    events: 'Als Abschiedsrede des Mose im Ostjordanland erzählt',
    written: 'Kernbestand des Deuteronomiums, meist ins 7. Jahrhundert v. Chr. gesetzt',
    epoch: 'exodus',
  },
  '5mo 15,7': {
    events: 'Als Sozialgesetzgebung der Moserede erzählt',
    written: 'Deuteronomisches Gesetz, Kernbestand im 7. Jahrhundert v. Chr.',
    epoch: 'exodus',
  },
  'jos 2,8': {
    events: 'Landnahmeerzählung, im Rahmen der Bibel um 1200 v. Chr.',
    written: 'Deuteronomistische Bearbeitung älterer Ortsüberlieferung, 7.–6. Jahrhundert v. Chr.',
    epoch: 'exodus',
  },
  'ri 7,2': {
    events: 'Richterzeit, gewöhnlich ins 12.–11. Jahrhundert v. Chr. gesetzt',
    written: 'Deuteronomistisches Richterbuch, älterer Erzählkern',
    epoch: 'richter',
  },
  '1sam 1,9': {
    events: 'Späte Richterzeit am Heiligtum von Silo, 11. Jahrhundert v. Chr.',
    written: 'Ältere Samuelüberlieferung, deuteronomistisch gerahmt',
    epoch: 'richter',
  },
  '1sam 15,17': {
    events: 'Frühe Königszeit, um 1000 v. Chr.',
    written: 'Deuteronomistische Samuelbücher, ältere Überlieferungen verarbeitet',
    epoch: 'koenige',
  },
  '2sam 6,12': {
    events: 'Frühe Königszeit, um 1000 v. Chr.',
    written: 'Ältere Ladeerzählung, in die Daviderzählung eingearbeitet',
    epoch: 'koenige',
  },
  '1koe 17,8': {
    events: 'Königszeit im Nordreich unter Ahab, 9. Jahrhundert v. Chr.',
    written: 'Nordisraelitischer Prophetenzyklus, in das Königsbuch aufgenommen',
    epoch: 'koenige',
  },
  '2koe 2,9': {
    events: 'Königszeit im Nordreich, 9. Jahrhundert v. Chr.',
    written: 'Übergang zwischen Elia- und Elisazyklus, Nordreichüberlieferung',
    epoch: 'koenige',
  },
  'neh 5,1': {
    events: 'Persische Zeit in Jerusalem, um 445 v. Chr.',
    written: 'Nehemia-Bericht, ältester Bestandteil des Buches',
    epoch: 'perser',
  },
  'hi 28,12': {
    events: 'Ohne historischen Ort, in der Zeit der Erzväter angesiedelt',
    written: 'Selbständiges Weisheitsgedicht, in das Hiobbuch eingefügt',
    epoch: 'exil',
  },
  'ps 24,1': {
    events: 'Kultischer Gebrauch am Tempel in Jerusalem',
    written: 'Vorexilischer Kern, im Psalter der Königszeit zugeordnet',
    epoch: 'koenige',
  },
  'ps 130,1': {
    events: 'Ohne benanntes Ereignis, für den Gebrauch der Pilger bestimmt',
    written: 'Wallfahrtspsalter, überwiegend nachexilisch zusammengestellt',
    epoch: 'exil',
  },
  'spr 31,10': {
    events: 'Ohne historischen Anlass, Weisheitsdichtung',
    written: 'Schlussgedicht des Sprüchebuchs, nachexilische Endgestalt',
    epoch: 'perser',
  },
  'jes 2,1': {
    events: 'Assyrische Bedrohung Judas, 8. Jahrhundert v. Chr.',
    written: 'Umstritten: vorexilischer Kern oder nachexilische Voranstellung',
    epoch: 'koenige',
  },
  'jes 11,1': {
    events: 'Assyrische Zeit, Bedrohung des davidischen Königtums',
    written: 'Jesajaüberlieferung, Zuordnung zwischen 8. und 6. Jahrhundert umstritten',
    epoch: 'koenige',
  },
  'jes 45,1': {
    events: 'Aufstieg des Kyros und Fall Babylons, um 539 v. Chr.',
    written: 'Späte Exilszeit, dem sogenannten zweiten Jesaja zugeordnet',
    epoch: 'exil',
  },
  'jer 18,1': {
    events: 'Letzte Jahrzehnte des Königreichs Juda, um 600 v. Chr.',
    written: 'Jeremiaüberlieferung mit deuteronomistischer Bearbeitung',
    epoch: 'koenige',
  },
  'jer 32,6': {
    events: 'Belagerung Jerusalems durch Babylon, 588/587 v. Chr.',
    written: 'Jeremiaüberlieferung, Baruchbericht zugerechnet',
    epoch: 'exil',
  },
  'hes 47,1': {
    events: 'Vision im babylonischen Exil nach 586 v. Chr.',
    written: 'Tempelentwurf Hesekiels, Exilszeit oder kurz danach',
    epoch: 'exil',
  },
  'dan 6,10': {
    events: 'Als Hofgeschichte der frühen Perserzeit erzählt',
    written: 'Endgestalt in der Verfolgung unter Antiochus IV., um 165 v. Chr.',
    epoch: 'perser',
  },
  'am 8,4': {
    events: 'Nordreich unter Jerobeam II., um 760 v. Chr.',
    written: 'Amosüberlieferung, später zusammengestellt und ergänzt',
    epoch: 'koenige',
  },
  'sach 8,3': {
    events: 'Frühe Perserzeit, Wiederaufbau des Tempels um 520 v. Chr.',
    written: 'Erster Teil des Sacharjabuchs, zeitnah zum Geschehen',
    epoch: 'perser',
  },
  'mi 7,18': {
    events: 'Assyrische Zeit als Rahmen des Buches, 8. Jahrhundert v. Chr.',
    written: 'Buchschluss, sprachlich vielfach der nachexilischen Zeit zugeordnet',
    epoch: 'koenige',
  },
  'hab 1,1': {
    events: 'Aufstieg Babylons, Juda unter Jojakim, um 605 v. Chr.',
    written: 'Späte Königszeit, kurz vor dem babylonischen Zugriff',
    epoch: 'koenige',
  },
  'jer 7,1': {
    events: 'Beginn der Regierung Jojakims, um 609/608 v. Chr.',
    written: 'Jeremiaüberlieferung, deuteronomistisch geprägte Prosarede',
    epoch: 'koenige',
  },
  'mt 4,1': {
    events: 'Beginn des öffentlichen Wirkens Jesu, um 28 n. Chr.',
    written: 'Matthäusevangelium, um 80–90 n. Chr., nach älterer Spruchüberlieferung',
    epoch: 'roemer',
  },
  'mt 18,21': {
    events: 'Unterweisung im Kreis der Jünger',
    written: 'Matthäusevangelium, um 80–90 n. Chr., Sondergut',
    epoch: 'roemer',
  },
  'mt 20,1': {
    events: 'Lehre Jesu auf dem Weg nach Jerusalem',
    written: 'Matthäusevangelium, um 80–90 n. Chr., Sondergut',
    epoch: 'roemer',
  },
  'mt 26,36': {
    events: 'Nacht vor der Kreuzigung, um 30 n. Chr.',
    written: 'Matthäusevangelium, um 80–90 n. Chr., nach Markus',
    epoch: 'roemer',
  },
  'mk 5,25': {
    events: 'Wirken Jesu in Galiläa, um 28–30 n. Chr.',
    written: 'Markusevangelium, um 70 n. Chr.',
    epoch: 'roemer',
  },
  'mk 12,41': {
    events: 'Letzte Tage im Tempel vor der Passion, um 30 n. Chr.',
    written: 'Markusevangelium, um 70 n. Chr.',
    epoch: 'roemer',
  },
  'lk 4,16': {
    events: 'Beginn des Wirkens Jesu in Galiläa, um 28 n. Chr.',
    written: 'Lukasevangelium, um 80–90 n. Chr.',
    epoch: 'roemer',
  },
  'lk 12,13': {
    events: 'Lehre Jesu auf dem Weg nach Jerusalem',
    written: 'Lukasevangelium, um 80–90 n. Chr., Sondergut',
    epoch: 'roemer',
  },
  'lk 18,9': {
    events: 'Lehre Jesu auf dem Weg nach Jerusalem',
    written: 'Lukasevangelium, um 80–90 n. Chr., Sondergut',
    epoch: 'roemer',
  },
  'joh 9,1': {
    events: 'Wirken Jesu in Jerusalem',
    written: 'Johannesevangelium, um 90–100 n. Chr.',
    epoch: 'roemer',
  },
  'joh 17,20': {
    events: 'Abschiedsreden am Abend vor der Passion',
    written: 'Johannesevangelium, um 90–100 n. Chr.',
    epoch: 'roemer',
  },
  'apg 9,1': {
    events: 'Wenige Jahre nach der Kreuzigung, etwa 33–36 n. Chr.',
    written: 'Apostelgeschichte, um 80–90 n. Chr.',
    epoch: 'urkirche',
  },
  '4mo 13,25': {
    events: 'Wüstenzeit, Aufenthalt in Kades',
    written: 'Ältere Überlieferung mit priesterlicher Bearbeitung',
    epoch: 'exodus',
  },
  '5mo 24,10': {
    events: 'Als Sozialgesetzgebung der Moserede erzählt',
    written: 'Deuteronomisches Gesetz, Kernbestand im 7. Jahrhundert v. Chr.',
    epoch: 'exodus',
  },
  'jer 20,7': {
    events: 'Späte Königszeit in Jerusalem, um 600 v. Chr.',
    written: 'Jeremiaüberlieferung, Konfessionen im ersten Buchteil',
    epoch: 'koenige',
  },
  'offb 5,1': {
    events: 'Vision auf Patmos, Gemeinden in der Provinz Asia',
    written: 'Offenbarung des Johannes, überwiegend um 95 n. Chr. gesetzt',
    epoch: 'roemer',
  },
  'hebr 1,1': {
    events: 'Ohne benannten Anlass; Adressaten unbekannt',
    written: 'Vor 95 n. Chr., da Clemens von Rom den Brief bereits kennt',
    epoch: 'roemer',
  },
  'hi 2,11': {
    events: 'Ohne historischen Ort, in der Zeit der Erzväter angesiedelt',
    written: 'Rahmenerzählung älter, Redegänge meist exilisch-nachexilisch',
    epoch: 'exil',
  },
  'spr 6,6': {
    events: 'Ohne historischen Anlass, Weisheitsdichtung',
    written: 'Sammlung der Sprüche, Kernbestand in der Königszeit',
    epoch: 'koenige',
  },
  '3mo 11,1': {
    events: 'Als Sinaigesetzgebung erzählt',
    written: 'Priesterschrift, überwiegend in die Exils- und frühe Perserzeit gesetzt',
    epoch: 'exodus',
  },
  'hes 33,1': {
    events: 'Babylonisches Exil, um den Fall Jerusalems 587 v. Chr.',
    written: 'Hesekielbuch, Übergang vom Gerichts- zum Heilsteil',
    epoch: 'exil',
  },
  'roem 7,14': {
    events: 'Paulus schreibt aus Korinth an die Gemeinde in Rom',
    written: 'Römerbrief, um 56–58 n. Chr.',
    epoch: 'urkirche',
  },
  '2joh 1,1': {
    events: 'Gemeinden Kleinasiens nach einer Spaltung',
    written: 'Johanneische Schule, um 100 n. Chr.',
    epoch: 'urkirche',
  },
  '2joh 1,12': {
    events: 'Gemeinden Kleinasiens, Briefverkehr über Boten',
    written: 'Johanneische Schule, um 100 n. Chr.',
    epoch: 'urkirche',
  },
  '3joh 1,1': {
    events: 'Gemeinden Kleinasiens, Netz aus Häusern und Boten',
    written: 'Johanneische Schule, um 100 n. Chr.',
    epoch: 'urkirche',
  },
  '3joh 1,13': {
    events: 'Gemeinden Kleinasiens, Streit um Aufnahme und Ausschluss',
    written: 'Johanneische Schule, um 100 n. Chr.',
    epoch: 'urkirche',
  },
  'phlm 1,1': {
    events: 'Paulus in Haft, Onesimus auf dem Weg zurück nach Kolossä',
    written: 'Um 55–61 n. Chr., je nach angenommenem Haftort',
    epoch: 'urkirche',
  },
  'phlm 1,22': {
    events: 'Paulus in Haft, Rückkehr des Onesimus nach Kolossä',
    written: 'Um 55–61 n. Chr., je nach angenommenem Haftort',
    epoch: 'urkirche',
  },
  'jud 1,1': {
    events: 'Gemeinden mit wandernden Lehrern, Ort unbekannt',
    written: 'Überwiegend ans Ende des 1. Jahrhunderts gesetzt',
    epoch: 'urkirche',
  },
  'tit 1,1': {
    events: 'Kreta, um 60–65 n. Chr. angenommen',
    written: 'zwischen 63 und 100 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'tit 1,10': {
    events: 'Kreta, um 60–65 n. Chr. angenommen',
    written: 'zwischen 63 und 100 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'tit 2,1': {
    events: 'Kreta, um 60–65 n. Chr. angenommen',
    written: 'zwischen 63 und 100 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'tit 3,1': {
    events: 'Kreta, um 60–65 n. Chr. angenommen',
    written: 'zwischen 63 und 100 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'tit 3,9': {
    events: 'Kreta und Nikopolis, um 60–65 n. Chr. angenommen',
    written: 'zwischen 63 und 100 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  '2thess 1,1': {
    events: 'Thessalonich, um 50–51 n. Chr.',
    written: 'um 51 n. Chr. oder gegen Ende des 1. Jahrhunderts',
    epoch: 'urkirche',
  },
  '2thess 1,5': {
    events: 'Thessalonich, um 50–51 n. Chr.',
    written: 'um 51 n. Chr. oder gegen Ende des 1. Jahrhunderts',
    epoch: 'urkirche',
  },
  '2thess 2,13': {
    events: 'Thessalonich, um 50–51 n. Chr.',
    written: 'um 51 n. Chr. oder gegen Ende des 1. Jahrhunderts',
    epoch: 'urkirche',
  },
  '2thess 3,1': {
    events: 'Thessalonich, um 50–51 n. Chr.',
    written: 'um 51 n. Chr. oder gegen Ende des 1. Jahrhunderts',
    epoch: 'urkirche',
  },
  '2thess 3,14': {
    events: 'Thessalonich, um 50–51 n. Chr.',
    written: 'um 51 n. Chr. oder gegen Ende des 1. Jahrhunderts',
    epoch: 'urkirche',
  },
  '2petr 1,1': {
    events: 'unbestimmt, angenommener Ort Rom',
    written: 'zwischen 100 und 150 n. Chr.',
    epoch: 'urkirche',
  },
  '2petr 1,12': {
    events: 'unbestimmt, angenommener Ort Rom',
    written: 'zwischen 100 und 150 n. Chr.',
    epoch: 'urkirche',
  },
  '2petr 2,1': {
    events: 'unbestimmt, angenommener Ort Rom',
    written: 'zwischen 100 und 150 n. Chr.',
    epoch: 'urkirche',
  },
  '2petr 2,12': {
    events: 'unbestimmt, angenommener Ort Rom',
    written: 'zwischen 100 und 150 n. Chr.',
    epoch: 'urkirche',
  },
  '2petr 3,1': {
    events: 'unbestimmt, angenommener Ort Rom',
    written: 'zwischen 100 und 150 n. Chr.',
    epoch: 'urkirche',
  },
  '2petr 3,16': {
    events: 'unbestimmt, angenommener Ort Rom',
    written: 'zwischen 100 und 150 n. Chr.',
    epoch: 'urkirche',
  },
  '1thess 1,1': {
    events: 'Thessalonich, um 49–50 n. Chr.',
    written: 'um 50 n. Chr. in Korinth',
    epoch: 'urkirche',
  },
  '1thess 2,1': {
    events: 'Thessalonich, um 49–50 n. Chr.',
    written: 'um 50 n. Chr. in Korinth',
    epoch: 'urkirche',
  },
  '1thess 2,13': {
    events: 'Thessalonich, um 49–50 n. Chr.',
    written: 'um 50 n. Chr. in Korinth',
    epoch: 'urkirche',
  },
  '1thess 3,1': {
    events: 'Thessalonich, um 49–50 n. Chr.',
    written: 'um 50 n. Chr. in Korinth',
    epoch: 'urkirche',
  },
  '1thess 4,1': {
    events: 'Thessalonich, um 49–50 n. Chr.',
    written: 'um 50 n. Chr. in Korinth',
    epoch: 'urkirche',
  },
  '1thess 5,12': {
    events: 'Thessalonich, um 49–50 n. Chr.',
    written: 'um 50 n. Chr. in Korinth',
    epoch: 'urkirche',
  },
  '1thess 5,23': {
    events: 'Thessalonich, um 49–50 n. Chr.',
    written: 'um 50 n. Chr. in Korinth',
    epoch: 'urkirche',
  },
  '1joh 1,1': {
    events: 'Kleinasien, Ende des 1. Jahrhunderts',
    written: 'um 100 n. Chr.',
    epoch: 'urkirche',
  },
  '1joh 2,1': {
    events: 'Kleinasien, Ende des 1. Jahrhunderts',
    written: 'um 100 n. Chr.',
    epoch: 'urkirche',
  },
  '1joh 2,12': {
    events: 'Kleinasien, Ende des 1. Jahrhunderts',
    written: 'um 100 n. Chr.',
    epoch: 'urkirche',
  },
  '1joh 2,18': {
    events: 'Kleinasien, Ende des 1. Jahrhunderts',
    written: 'um 100 n. Chr.',
    epoch: 'urkirche',
  },
  '1joh 3,2': {
    events: 'Kleinasien, Ende des 1. Jahrhunderts',
    written: 'um 100 n. Chr.',
    epoch: 'urkirche',
  },
  '1joh 3,11': {
    events: 'Kleinasien, Ende des 1. Jahrhunderts',
    written: 'um 100 n. Chr.',
    epoch: 'urkirche',
  },
  '1joh 4,1': {
    events: 'Kleinasien, Ende des 1. Jahrhunderts',
    written: 'um 100 n. Chr.',
    epoch: 'urkirche',
  },
  '1joh 5,1': {
    events: 'Kleinasien, Ende des 1. Jahrhunderts',
    written: 'um 100 n. Chr.',
    epoch: 'urkirche',
  },
  '1joh 5,13': {
    events: 'Kleinasien, Ende des 1. Jahrhunderts',
    written: 'um 100 n. Chr.',
    epoch: 'urkirche',
  },
  'jak 1,1': {
    events: 'Judenchristliche Gemeinden der Diaspora',
    written: 'zwischen 50 und 100 n. Chr.',
    epoch: 'urkirche',
  },
  'jak 1,9': {
    events: 'Judenchristliche Gemeinden der Diaspora',
    written: 'zwischen 50 und 100 n. Chr.',
    epoch: 'urkirche',
  },
  'jak 1,19': {
    events: 'Judenchristliche Gemeinden der Diaspora',
    written: 'zwischen 50 und 100 n. Chr.',
    epoch: 'urkirche',
  },
  'jak 2,1': {
    events: 'Judenchristliche Gemeinden der Diaspora',
    written: 'zwischen 50 und 100 n. Chr.',
    epoch: 'urkirche',
  },
  'jak 3,1': {
    events: 'Judenchristliche Gemeinden der Diaspora',
    written: 'zwischen 50 und 100 n. Chr.',
    epoch: 'urkirche',
  },
  'jak 3,13': {
    events: 'Judenchristliche Gemeinden der Diaspora',
    written: 'zwischen 50 und 100 n. Chr.',
    epoch: 'urkirche',
  },
  'jak 4,1': {
    events: 'Judenchristliche Gemeinden der Diaspora',
    written: 'zwischen 50 und 100 n. Chr.',
    epoch: 'urkirche',
  },
  'jak 4,9': {
    events: 'Judenchristliche Gemeinden der Diaspora',
    written: 'zwischen 50 und 100 n. Chr.',
    epoch: 'urkirche',
  },
  'jak 5,1': {
    events: 'Judenchristliche Gemeinden der Diaspora',
    written: 'zwischen 50 und 100 n. Chr.',
    epoch: 'urkirche',
  },
  'jak 5,17': {
    events: 'Judenchristliche Gemeinden der Diaspora',
    written: 'zwischen 50 und 100 n. Chr.',
    epoch: 'urkirche',
  },
  '2tim 1,1': {
    events: 'Rom, angenommene zweite Gefangenschaft, um 64–67 n. Chr.',
    written: 'zwischen 65 und 110 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  '2tim 1,8': {
    events: 'Rom, angenommene zweite Gefangenschaft, um 64–67 n. Chr.',
    written: 'zwischen 65 und 110 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  '2tim 2,1': {
    events: 'Rom, angenommene zweite Gefangenschaft, um 64–67 n. Chr.',
    written: 'zwischen 65 und 110 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  '2tim 2,14': {
    events: 'Rom, angenommene zweite Gefangenschaft, um 64–67 n. Chr.',
    written: 'zwischen 65 und 110 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  '2tim 3,1': {
    events: 'Rom, angenommene zweite Gefangenschaft, um 64–67 n. Chr.',
    written: 'zwischen 65 und 110 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  '2tim 4,1': {
    events: 'Rom, angenommene zweite Gefangenschaft, um 64–67 n. Chr.',
    written: 'zwischen 65 und 110 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  '2tim 4,9': {
    events: 'Rom, angenommene zweite Gefangenschaft, um 64–67 n. Chr.',
    written: 'zwischen 65 und 110 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'kol 1,1': {
    events: 'Kolossä im Lykostal, um 60 n. Chr.',
    written: 'zwischen 60 und 80 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'kol 1,21': {
    events: 'Kolossä im Lykostal, um 60 n. Chr.',
    written: 'zwischen 60 und 80 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'kol 2,1': {
    events: 'Kolossä im Lykostal, um 60 n. Chr.',
    written: 'zwischen 60 und 80 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'kol 2,16': {
    events: 'Kolossä im Lykostal, um 60 n. Chr.',
    written: 'zwischen 60 und 80 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'kol 3,1': {
    events: 'Kolossä im Lykostal, um 60 n. Chr.',
    written: 'zwischen 60 und 80 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'kol 3,18': {
    events: 'Kolossä im Lykostal, um 60 n. Chr.',
    written: 'zwischen 60 und 80 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'kol 4,1': {
    events: 'Kolossä im Lykostal, um 60 n. Chr.',
    written: 'zwischen 60 und 80 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'phil 1,1': {
    events: 'Philippi in Makedonien; Abfassung in Gefangenschaft',
    written: 'um 55–62 n. Chr.',
    epoch: 'urkirche',
  },
  'phil 1,7': {
    events: 'Philippi in Makedonien; Abfassung in Gefangenschaft',
    written: 'um 55–62 n. Chr.',
    epoch: 'urkirche',
  },
  'phil 1,21': {
    events: 'Philippi in Makedonien; Abfassung in Gefangenschaft',
    written: 'um 55–62 n. Chr.',
    epoch: 'urkirche',
  },
  'phil 2,1': {
    events: 'Philippi in Makedonien; Abfassung in Gefangenschaft',
    written: 'um 55–62 n. Chr.',
    epoch: 'urkirche',
  },
  'phil 2,12': {
    events: 'Philippi in Makedonien; Abfassung in Gefangenschaft',
    written: 'um 55–62 n. Chr.',
    epoch: 'urkirche',
  },
  'phil 3,1': {
    events: 'Philippi in Makedonien; Abfassung in Gefangenschaft',
    written: 'um 55–62 n. Chr.',
    epoch: 'urkirche',
  },
  'phil 3,12': {
    events: 'Philippi in Makedonien; Abfassung in Gefangenschaft',
    written: 'um 55–62 n. Chr.',
    epoch: 'urkirche',
  },
  'phil 4,1': {
    events: 'Philippi in Makedonien; Abfassung in Gefangenschaft',
    written: 'um 55–62 n. Chr.',
    epoch: 'urkirche',
  },
  'phil 4,14': {
    events: 'Philippi in Makedonien; Abfassung in Gefangenschaft',
    written: 'um 55–62 n. Chr.',
    epoch: 'urkirche',
  },
  '1tim 1,1': {
    events: 'Ephesus, angenommene Lage nach 62 n. Chr.',
    written: 'zwischen 63 und 110 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  '1tim 1,12': {
    events: 'Ephesus, angenommene Lage nach 62 n. Chr.',
    written: 'zwischen 63 und 110 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  '1tim 2,1': {
    events: 'Ephesus, angenommene Lage nach 62 n. Chr.',
    written: 'zwischen 63 und 110 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  '1tim 3,1': {
    events: 'Ephesus, angenommene Lage nach 62 n. Chr.',
    written: 'zwischen 63 und 110 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  '1tim 4,1': {
    events: 'Ephesus, angenommene Lage nach 62 n. Chr.',
    written: 'zwischen 63 und 110 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  '1tim 5,1': {
    events: 'Ephesus, angenommene Lage nach 62 n. Chr.',
    written: 'zwischen 63 und 110 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  '1tim 5,17': {
    events: 'Ephesus, angenommene Lage nach 62 n. Chr.',
    written: 'zwischen 63 und 110 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  '1tim 6,1': {
    events: 'Ephesus, angenommene Lage nach 62 n. Chr.',
    written: 'zwischen 63 und 110 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  '1tim 6,13': {
    events: 'Ephesus, angenommene Lage nach 62 n. Chr.',
    written: 'zwischen 63 und 110 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  '1petr 1,1': {
    events: 'Gemeinden in Nord- und Innerkleinasien',
    written: 'zwischen 65 und 95 n. Chr.',
    epoch: 'urkirche',
  },
  '1petr 1,13': {
    events: 'Gemeinden in Nord- und Innerkleinasien',
    written: 'zwischen 65 und 95 n. Chr.',
    epoch: 'urkirche',
  },
  '1petr 2,11': {
    events: 'Gemeinden in Nord- und Innerkleinasien',
    written: 'zwischen 65 und 95 n. Chr.',
    epoch: 'urkirche',
  },
  '1petr 2,18': {
    events: 'Gemeinden in Nord- und Innerkleinasien',
    written: 'zwischen 65 und 95 n. Chr.',
    epoch: 'urkirche',
  },
  '1petr 3,1': {
    events: 'Gemeinden in Nord- und Innerkleinasien',
    written: 'zwischen 65 und 95 n. Chr.',
    epoch: 'urkirche',
  },
  '1petr 3,8': {
    events: 'Gemeinden in Nord- und Innerkleinasien',
    written: 'zwischen 65 und 95 n. Chr.',
    epoch: 'urkirche',
  },
  '1petr 3,18': {
    events: 'Gemeinden in Nord- und Innerkleinasien',
    written: 'zwischen 65 und 95 n. Chr.',
    epoch: 'urkirche',
  },
  '1petr 4,1': {
    events: 'Gemeinden in Nord- und Innerkleinasien',
    written: 'zwischen 65 und 95 n. Chr.',
    epoch: 'urkirche',
  },
  '1petr 4,12': {
    events: 'Gemeinden in Nord- und Innerkleinasien',
    written: 'zwischen 65 und 95 n. Chr.',
    epoch: 'urkirche',
  },
  '1petr 5,1': {
    events: 'Gemeinden in Nord- und Innerkleinasien',
    written: 'zwischen 65 und 95 n. Chr.',
    epoch: 'urkirche',
  },
  '1petr 5,8': {
    events: 'Gemeinden in Nord- und Innerkleinasien',
    written: 'zwischen 65 und 95 n. Chr.',
    epoch: 'urkirche',
  },
  'gal 1,1': {
    events: 'Gemeinden in Galatien',
    written: 'zwischen 48 und 56 n. Chr.',
    epoch: 'urkirche',
  },
  'gal 1,11': {
    events: 'Gemeinden in Galatien',
    written: 'zwischen 48 und 56 n. Chr.',
    epoch: 'urkirche',
  },
  'gal 2,1': {
    events: 'Gemeinden in Galatien',
    written: 'zwischen 48 und 56 n. Chr.',
    epoch: 'urkirche',
  },
  'gal 3,1': {
    events: 'Gemeinden in Galatien',
    written: 'zwischen 48 und 56 n. Chr.',
    epoch: 'urkirche',
  },
  'gal 3,15': {
    events: 'Gemeinden in Galatien',
    written: 'zwischen 48 und 56 n. Chr.',
    epoch: 'urkirche',
  },
  'gal 4,1': {
    events: 'Gemeinden in Galatien',
    written: 'zwischen 48 und 56 n. Chr.',
    epoch: 'urkirche',
  },
  'gal 4,12': {
    events: 'Gemeinden in Galatien',
    written: 'zwischen 48 und 56 n. Chr.',
    epoch: 'urkirche',
  },
  'gal 4,21': {
    events: 'Gemeinden in Galatien',
    written: 'zwischen 48 und 56 n. Chr.',
    epoch: 'urkirche',
  },
  'gal 5,7': {
    events: 'Gemeinden in Galatien',
    written: 'zwischen 48 und 56 n. Chr.',
    epoch: 'urkirche',
  },
  'gal 5,16': {
    events: 'Gemeinden in Galatien',
    written: 'zwischen 48 und 56 n. Chr.',
    epoch: 'urkirche',
  },
  'gal 5,24': {
    events: 'Gemeinden in Galatien',
    written: 'zwischen 48 und 56 n. Chr.',
    epoch: 'urkirche',
  },
  'gal 6,1': {
    events: 'Gemeinden in Galatien',
    written: 'zwischen 48 und 56 n. Chr.',
    epoch: 'urkirche',
  },
  'gal 6,11': {
    events: 'Gemeinden in Galatien',
    written: 'zwischen 48 und 56 n. Chr.',
    epoch: 'urkirche',
  },
  'eph 1,1': {
    events: 'Kleinasien, angenommener Empfängerkreis um Ephesus',
    written: 'zwischen 60 und 90 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'eph 1,15': {
    events: 'Kleinasien, angenommener Empfängerkreis um Ephesus',
    written: 'zwischen 60 und 90 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'eph 2,1': {
    events: 'Kleinasien, angenommener Empfängerkreis um Ephesus',
    written: 'zwischen 60 und 90 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'eph 2,11': {
    events: 'Kleinasien, angenommener Empfängerkreis um Ephesus',
    written: 'zwischen 60 und 90 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'eph 3,1': {
    events: 'Kleinasien, angenommener Empfängerkreis um Ephesus',
    written: 'zwischen 60 und 90 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'eph 3,14': {
    events: 'Kleinasien, angenommener Empfängerkreis um Ephesus',
    written: 'zwischen 60 und 90 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'eph 4,1': {
    events: 'Kleinasien, angenommener Empfängerkreis um Ephesus',
    written: 'zwischen 60 und 90 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'eph 4,17': {
    events: 'Kleinasien, angenommener Empfängerkreis um Ephesus',
    written: 'zwischen 60 und 90 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'eph 5,1': {
    events: 'Kleinasien, angenommener Empfängerkreis um Ephesus',
    written: 'zwischen 60 und 90 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'eph 5,15': {
    events: 'Kleinasien, angenommener Empfängerkreis um Ephesus',
    written: 'zwischen 60 und 90 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'eph 5,22': {
    events: 'Kleinasien, angenommener Empfängerkreis um Ephesus',
    written: 'zwischen 60 und 90 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'eph 6,1': {
    events: 'Kleinasien, angenommener Empfängerkreis um Ephesus',
    written: 'zwischen 60 und 90 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'eph 6,19': {
    events: 'Kleinasien, angenommener Empfängerkreis um Ephesus',
    written: 'zwischen 60 und 90 n. Chr., je nach Verfasserfrage',
    epoch: 'urkirche',
  },
  'hebr 1,5': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 2,1': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 2,10': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 3,1': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 3,12': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 4,1': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 5,1': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 5,11': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 6,1': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 6,13': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 7,1': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 7,11': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 8,1': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 9,1': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 9,11': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 10,1': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 10,19': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 11,4': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 11,17': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 11,32': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 12,4': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 12,18': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 13,1': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 13,7': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  'hebr 13,17': {
    events: 'Empfängerkreis umstritten, am ehesten Rom oder Kleinasien',
    written: 'zwischen 60 und 90 n. Chr., vor der Erwähnung bei Clemens um 96',
    epoch: 'urkirche',
  },
  '2kor 1,1': {
    events: 'Korinth und Mazedonien, nach einem gescheiterten Besuch',
    written: 'um 55 oder 56 n. Chr., aus Mazedonien',
    epoch: 'urkirche',
  },
  '2kor 1,12': {
    events: 'Korinth und Mazedonien, nach einem gescheiterten Besuch',
    written: 'um 55 oder 56 n. Chr., aus Mazedonien',
    epoch: 'urkirche',
  },
  '2kor 2,1': {
    events: 'Korinth und Mazedonien, nach einem gescheiterten Besuch',
    written: 'um 55 oder 56 n. Chr., aus Mazedonien',
    epoch: 'urkirche',
  },
  '2kor 2,12': {
    events: 'Korinth und Mazedonien, nach einem gescheiterten Besuch',
    written: 'um 55 oder 56 n. Chr., aus Mazedonien',
    epoch: 'urkirche',
  },
  '2kor 3,1': {
    events: 'Korinth und Mazedonien, nach einem gescheiterten Besuch',
    written: 'um 55 oder 56 n. Chr., aus Mazedonien',
    epoch: 'urkirche',
  },
  '2kor 3,12': {
    events: 'Korinth und Mazedonien, nach einem gescheiterten Besuch',
    written: 'um 55 oder 56 n. Chr., aus Mazedonien',
    epoch: 'urkirche',
  },
  '2kor 4,1': {
    events: 'Korinth und Mazedonien, nach einem gescheiterten Besuch',
    written: 'um 55 oder 56 n. Chr., aus Mazedonien',
    epoch: 'urkirche',
  },
  '2kor 4,13': {
    events: 'Korinth und Mazedonien, nach einem gescheiterten Besuch',
    written: 'um 55 oder 56 n. Chr., aus Mazedonien',
    epoch: 'urkirche',
  },
  '2kor 5,1': {
    events: 'Korinth und Mazedonien, nach einem gescheiterten Besuch',
    written: 'um 55 oder 56 n. Chr., aus Mazedonien',
    epoch: 'urkirche',
  },
  '2kor 5,8': {
    events: 'Korinth und Mazedonien, nach einem gescheiterten Besuch',
    written: 'um 55 oder 56 n. Chr., aus Mazedonien',
    epoch: 'urkirche',
  },
};

/** Der Schlüssel, unter dem ein Artikel seine Datierung findet. */
export function datingKey(book: string, chapter: number, from: number): string {
  return `${book} ${chapter},${from}`;
}
