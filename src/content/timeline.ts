/**
 * Zeitleiste der biblischen Geschichte.
 *
 * `year` ist negativ für Jahre vor Christus. Viele Daten sind Näherungen oder
 * in der Forschung umstritten – wo das der Fall ist, sagt `certainty` es
 * ausdrücklich, statt eine Genauigkeit vorzutäuschen, die es nicht gibt.
 *
 * Vier Arten von Einträgen stehen nebeneinander, weil sie einander erst
 * verständlich machen:
 *
 * - **biblisch** – wovon die Bibel erzählt
 * - **welt** – was gleichzeitig anderswo geschah
 * - **fund** – was sich außerhalb der Bibel nachweisen lässt
 * - **text** – wann die Bücher selbst entstanden
 *
 * Gerade der Abstand zwischen erzählter Zeit und Entstehungszeit ist
 * aufschlussreich: Der Feuerofen spielt im 6. Jahrhundert v. Chr., das Buch
 * Daniel entstand rund 400 Jahre später.
 */

export type Certainty = 'gesichert' | 'ungefähr' | 'umstritten';

export type EventKind = 'biblisch' | 'welt' | 'fund' | 'text';

export const KIND_LABEL: Record<EventKind, string> = {
  biblisch: 'Biblisch',
  welt: 'Weltgeschichte',
  fund: 'Fund',
  text: 'Entstehung',
};

export const KIND_HINT: Record<EventKind, string> = {
  biblisch: 'Wovon die Bibel erzählt',
  welt: 'Was gleichzeitig anderswo geschah',
  fund: 'Was sich außerhalb der Bibel nachweisen lässt',
  text: 'Wann die Bücher aufgeschrieben wurden',
};

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
  kind: EventKind;
  label: string;
  description: string;
  certainty: Certainty;
  ref?: { book: string; chapter: number; verse?: number };
}

export const EPOCHS: Epoch[] = [
  {
    id: 'vorgeschichte',
    label: 'Vor den Erzvätern',
    from: -3100,
    to: -1900,
    summary:
      'Schrift, Städte und Großreiche gibt es lange, bevor die biblische Erzählung einsetzt.',
  },
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
    summary:
      'Verschleppung nach Babylon – und die Zeit, in der große Teile der Bibel Gestalt annahmen.',
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
    to: 140,
    summary:
      'Ausbreitung im Mittelmeerraum, Entstehung der neutestamentlichen Schriften und die Trennung von der Synagoge.',
  },
];

export const TIMELINE: TimelineEvent[] = [
  /* ------------------------------------------------------- Vorgeschichte */
  {
    year: -3200,
    epoch: 'vorgeschichte',
    kind: 'welt',
    label: 'Die Schrift wird erfunden',
    description:
      'In Mesopotamien und Ägypten entstehen die ersten Schriftsysteme – rund 1300 Jahre bevor die Erzählung von Abraham einsetzt.',
    certainty: 'gesichert',
  },
  {
    year: -2560,
    epoch: 'vorgeschichte',
    kind: 'welt',
    label: 'Die Große Pyramide von Gizeh',
    description:
      'Sie stand bereits über 500 Jahre, als Abraham nach der biblischen Erzählung nach Ägypten zog – und über 1300 Jahre zur Zeit des Auszugs.',
    certainty: 'gesichert',
  },
  {
    year: -2100,
    epoch: 'vorgeschichte',
    kind: 'welt',
    label: 'Blütezeit von Ur',
    description:
      'Die Stadt, aus der Abrahams Familie nach 1. Mose 11 aufbricht, ist damals ein Zentrum mit Zikkurat, Verwaltung und Schulen.',
    certainty: 'gesichert',
    ref: { book: '1mo', chapter: 11, verse: 31 },
  },
  {
    year: -1750,
    epoch: 'vorgeschichte',
    kind: 'welt',
    label: 'Der Kodex Hammurapi',
    description:
      'Babylonische Rechtssammlung mit Bestimmungen, die denen des Bundesbuchs in 2. Mose 21–23 auffallend ähneln – etwa dem Grundsatz „Auge um Auge“.',
    certainty: 'gesichert',
    ref: { book: '2mo', chapter: 21, verse: 24 },
  },

  /* ------------------------------------------------------------ Erzväter */
  {
    year: -1900,
    epoch: 'erzvaeter',
    kind: 'biblisch',
    label: 'Abraham bricht aus Ur auf',
    description:
      'Die Erzählung setzt mit dem Aufbruch einer Sippe nach Kanaan ein. Eine Datierung ist nicht möglich; die Zeitangabe folgt der überlieferten Abfolge.',
    certainty: 'umstritten',
    ref: { book: '1mo', chapter: 12, verse: 1 },
  },
  {
    year: -1700,
    epoch: 'erzvaeter',
    kind: 'biblisch',
    label: 'Josef in Ägypten',
    description: 'Israels Vorfahren siedeln sich in Ägypten an.',
    certainty: 'umstritten',
    ref: { book: '1mo', chapter: 41 },
  },
  {
    year: -1650,
    epoch: 'erzvaeter',
    kind: 'welt',
    label: 'Die Hyksos herrschen in Ägypten',
    description:
      'Eine Dynastie westsemitischer Herkunft regiert das Nildelta. Viele sehen darin den plausibelsten Hintergrund dafür, dass ein Fremder wie Josef bis an die Spitze gelangen konnte.',
    certainty: 'gesichert',
  },
  {
    year: -1600,
    epoch: 'erzvaeter',
    kind: 'welt',
    label: 'Der Ausbruch von Thera',
    description:
      'Eine der schwersten Vulkankatastrophen der Antike verwüstet die Ägäis. Versuche, sie mit den Plagen des Exodus zu verbinden, scheitern an rund 300 Jahren Abstand.',
    certainty: 'gesichert',
  },

  /* ------------------------------------------------- Auszug und Landnahme */
  {
    year: -1274,
    epoch: 'exodus',
    kind: 'welt',
    label: 'Die Schlacht bei Kadesch',
    description:
      'Ramses II. gegen die Hethiter – die größte Streitwagenschlacht der Antike. Derselbe Pharao gilt vielen als Herrscher der Exoduserzählung.',
    certainty: 'gesichert',
  },
  {
    year: -1250,
    epoch: 'exodus',
    kind: 'biblisch',
    label: 'Auszug aus Ägypten',
    description:
      'Meist unter Ramses II. verortet. Außerbiblische Belege für den Auszug fehlen; die Forschung diskutiert Umfang und Verlauf seit langem.',
    certainty: 'umstritten',
    ref: { book: '2mo', chapter: 14 },
  },
  {
    year: -1250,
    epoch: 'exodus',
    kind: 'biblisch',
    label: 'Die Weisung am Sinai',
    description: 'Bundesschluss und Empfang der Zehn Gebote.',
    certainty: 'umstritten',
    ref: { book: '2mo', chapter: 20 },
  },
  {
    year: -1208,
    epoch: 'exodus',
    kind: 'fund',
    label: 'Die Merenptah-Stele nennt „Israel“',
    description:
      'Der älteste bekannte Beleg für den Namen außerhalb der Bibel. Die ägyptische Inschrift bezeichnet Israel als Volksgruppe, nicht als Staat.',
    certainty: 'gesichert',
  },
  {
    year: -1200,
    epoch: 'exodus',
    kind: 'welt',
    label: 'Zusammenbruch der Bronzezeit',
    description:
      'Hethiterreich und mykenische Paläste gehen unter, Ägypten wird geschwächt. In dieses Machtvakuum fällt die Entstehung Israels in Kanaan.',
    certainty: 'gesichert',
  },
  {
    year: -1180,
    epoch: 'exodus',
    kind: 'welt',
    label: 'Die Philister lassen sich an der Küste nieder',
    description:
      'Als Teil der „Seevölker“ siedeln sie in fünf Städten an der südlichen Küste – die Nachbarn und Gegner Israels in Richter- und Samuelbüchern.',
    certainty: 'gesichert',
    ref: { book: 'ri', chapter: 13 },
  },

  /* -------------------------------------------------------- Richterzeit */
  {
    year: -1150,
    until: -1030,
    epoch: 'richter',
    kind: 'biblisch',
    label: 'Zeit der Richter',
    description: 'Regionale Anführer wie Debora, Gideon und Simson.',
    certainty: 'ungefähr',
    ref: { book: 'ri', chapter: 2 },
  },
  {
    year: -1100,
    epoch: 'richter',
    kind: 'welt',
    label: 'Das Eisen setzt sich durch',
    description:
      'Eisengeräte verbreiten sich in der Levante. Die Notiz in 1. Samuel 13, dass die Philister das Schmiedehandwerk kontrollierten, passt in diese Umbruchszeit.',
    certainty: 'gesichert',
    ref: { book: '1sam', chapter: 13, verse: 19 },
  },

  /* --------------------------------------------------------- Königszeit */
  {
    year: -1030,
    epoch: 'koenige',
    kind: 'biblisch',
    label: 'Saul wird König',
    description: 'Israel bekommt auf eigenen Wunsch einen König „wie alle Völker“.',
    certainty: 'ungefähr',
    ref: { book: '1sam', chapter: 8 },
  },
  {
    year: -1010,
    until: -970,
    epoch: 'koenige',
    kind: 'biblisch',
    label: 'Herrschaft Davids',
    description: 'Jerusalem wird Hauptstadt.',
    certainty: 'ungefähr',
    ref: { book: '2sam', chapter: 5 },
  },
  {
    year: -970,
    until: -931,
    epoch: 'koenige',
    kind: 'biblisch',
    label: 'Salomo und der erste Tempel',
    description: 'Bau des Tempels in Jerusalem; nach seinem Tod zerbricht das Reich.',
    certainty: 'ungefähr',
    ref: { book: '1koe', chapter: 6 },
  },
  {
    year: -950,
    epoch: 'koenige',
    kind: 'text',
    label: 'Erste Überlieferungen werden aufgeschrieben',
    description:
      'Mit dem Königtum entsteht eine Verwaltung, die schreiben kann. Ältere Erzählungen und Lieder werden nun festgehalten – der Anfang der schriftlichen Bibel.',
    certainty: 'umstritten',
  },
  {
    year: -931,
    epoch: 'koenige',
    kind: 'biblisch',
    label: 'Teilung in Nord- und Südreich',
    description: 'Israel im Norden, Juda im Süden – von da an zwei getrennte Wege.',
    certainty: 'ungefähr',
    ref: { book: '1koe', chapter: 12 },
  },
  {
    year: -925,
    epoch: 'koenige',
    kind: 'fund',
    label: 'Der Feldzug des Schoschenk',
    description:
      'Der Pharao, den die Bibel Sisak nennt, listet die eroberten Orte auf einer Tempelwand in Karnak auf – eine der frühesten Überschneidungen von Bibel und ägyptischer Quelle.',
    certainty: 'gesichert',
    ref: { book: '1koe', chapter: 14, verse: 25 },
  },
  {
    year: -880,
    epoch: 'koenige',
    kind: 'welt',
    label: 'Assyrien beginnt zu expandieren',
    description:
      'Das neuassyrische Reich wächst zur ersten Großmacht, die dauerhaft in die Levante hineinregiert – der Hintergrund fast aller Prophetenbücher des 8. Jahrhunderts.',
    certainty: 'gesichert',
  },
  {
    year: -860,
    epoch: 'koenige',
    kind: 'biblisch',
    label: 'Elia gegen die Baalspropheten',
    description: 'Auseinandersetzung um die alleinige Verehrung des Gottes Israels.',
    certainty: 'ungefähr',
    ref: { book: '1koe', chapter: 18 },
  },
  {
    year: -853,
    epoch: 'koenige',
    kind: 'fund',
    label: 'Ahab in der Schlacht bei Karkar',
    description:
      'Eine assyrische Inschrift nennt „Ahab, den Israeliten“ mit 2000 Streitwagen – der erste außerbiblische Beleg für einen israelitischen König.',
    certainty: 'gesichert',
  },
  {
    year: -841,
    epoch: 'koenige',
    kind: 'fund',
    label: 'Jehu auf dem Schwarzen Obelisken',
    description:
      'Der Obelisk Salmanassars III. zeigt einen israelitischen König, der sich vor dem Assyrer niederwirft – die einzige zeitgenössische Abbildung einer biblischen Person.',
    certainty: 'gesichert',
    ref: { book: '2koe', chapter: 10 },
  },
  {
    year: -840,
    epoch: 'koenige',
    kind: 'fund',
    label: 'Die Mescha-Stele',
    description:
      'Der moabitische König schildert seine Kriege gegen Israel aus seiner Sicht – und nennt dabei den Gottesnamen JHWH. Ein Gegenstück zu 2. Könige 3.',
    certainty: 'gesichert',
    ref: { book: '2koe', chapter: 3 },
  },
  {
    year: -830,
    epoch: 'koenige',
    kind: 'fund',
    label: 'Die Tel-Dan-Inschrift nennt das „Haus David“',
    description:
      'Der bislang einzige außerbiblische Beleg für eine Dynastie Davids – ein aramäisches Siegesdenkmal, 1993 gefunden.',
    certainty: 'gesichert',
  },
  {
    year: -776,
    epoch: 'koenige',
    kind: 'welt',
    label: 'Die ersten Olympischen Spiele',
    description: 'Traditioneller Beginn der griechischen Zeitrechnung.',
    certainty: 'ungefähr',
  },
  {
    year: -760,
    epoch: 'koenige',
    kind: 'biblisch',
    label: 'Amos und Hosea treten auf',
    description: 'Die ersten Schriftpropheten klagen soziale Ungerechtigkeit an.',
    certainty: 'ungefähr',
    ref: { book: 'am', chapter: 5, verse: 24 },
  },
  {
    year: -750,
    epoch: 'koenige',
    kind: 'text',
    label: 'Die ersten Prophetenbücher entstehen',
    description:
      'Worte von Amos, Hosea, Jesaja und Micha werden gesammelt und aufgeschrieben – der Beginn der prophetischen Literatur.',
    certainty: 'ungefähr',
  },
  {
    year: -753,
    epoch: 'koenige',
    kind: 'welt',
    label: 'Sagenhafte Gründung Roms',
    description:
      'Zur Zeit von Amos und Hosea ist Rom ein Dorf. Bis es Judäa beherrscht, vergehen noch 700 Jahre.',
    certainty: 'umstritten',
  },
  {
    year: -740,
    epoch: 'koenige',
    kind: 'biblisch',
    label: 'Berufung Jesajas',
    description: 'Prophetisches Wirken in Jerusalem unter assyrischer Bedrohung.',
    certainty: 'ungefähr',
    ref: { book: 'jes', chapter: 6 },
  },
  {
    year: -722,
    epoch: 'koenige',
    kind: 'biblisch',
    label: 'Untergang des Nordreichs',
    description: 'Assyrien erobert Samaria und deportiert Teile der Bevölkerung.',
    certainty: 'gesichert',
    ref: { book: '2koe', chapter: 17 },
  },
  {
    year: -701,
    epoch: 'koenige',
    kind: 'biblisch',
    label: 'Sanherib belagert Jerusalem',
    description: 'Die Stadt hält stand – eine der genauesten Überschneidungen von Bibel und Archäologie.',
    certainty: 'gesichert',
    ref: { book: '2koe', chapter: 19 },
  },
  {
    year: -700,
    epoch: 'koenige',
    kind: 'fund',
    label: 'Das Sanherib-Prisma',
    description:
      'Der assyrische König rühmt sich, Hiskia „wie einen Vogel im Käfig“ eingeschlossen zu haben – eine Eroberung Jerusalems meldet er auffälligerweise nicht.',
    certainty: 'gesichert',
  },
  {
    year: -700,
    epoch: 'koenige',
    kind: 'fund',
    label: 'Die Siloah-Inschrift',
    description:
      'Im Fels des Hiskia-Tunnels beschreiben die Arbeiter, wie sich zwei Vortriebe in der Mitte trafen. Der Tunnel ist bis heute begehbar.',
    certainty: 'gesichert',
    ref: { book: '2koe', chapter: 20, verse: 20 },
  },
  {
    year: -671,
    epoch: 'koenige',
    kind: 'welt',
    label: 'Assyrien erobert Ägypten',
    description: 'Die assyrische Macht erreicht ihre größte Ausdehnung – und beginnt kurz darauf zu zerfallen.',
    certainty: 'gesichert',
  },
  {
    year: -650,
    epoch: 'koenige',
    kind: 'fund',
    label: 'Die Silberamulette von Ketef Hinnom',
    description:
      'Zwei winzige Silberrollen mit dem aaronitischen Segen – der älteste bekannte Bibeltext, rund 400 Jahre älter als die Rollen von Qumran.',
    certainty: 'gesichert',
    ref: { book: '4mo', chapter: 6, verse: 24 },
  },
  {
    year: -627,
    epoch: 'koenige',
    kind: 'biblisch',
    label: 'Berufung Jeremias',
    description: 'Sein Wirken umspannt die letzten vierzig Jahre Judas.',
    certainty: 'ungefähr',
    ref: { book: 'jer', chapter: 1 },
  },
  {
    year: -622,
    epoch: 'koenige',
    kind: 'biblisch',
    label: 'Reform unter König Josia',
    description:
      'Bei Tempelarbeiten wird ein Gesetzbuch gefunden; die Forschung sieht darin den Kern des 5. Buches Mose.',
    certainty: 'gesichert',
    ref: { book: '2koe', chapter: 22 },
  },
  {
    year: -622,
    epoch: 'koenige',
    kind: 'text',
    label: 'Die Urfassung des 5. Buches Mose',
    description:
      'Das bei der Reform gefundene Buch gilt als Kern des Deuteronomiums – der erste Bibeltext, dessen Entstehung sich einigermaßen datieren lässt.',
    certainty: 'ungefähr',
    ref: { book: '5mo', chapter: 12 },
  },
  {
    year: -612,
    epoch: 'koenige',
    kind: 'welt',
    label: 'Ninive fällt',
    description:
      'Babylonier und Meder zerstören die assyrische Hauptstadt. Das Buch Nahum feiert dieses Ende.',
    certainty: 'gesichert',
    ref: { book: 'nah', chapter: 3 },
  },
  {
    year: -605,
    epoch: 'koenige',
    kind: 'welt',
    label: 'Die Schlacht bei Karkemisch',
    description:
      'Babylon schlägt Ägypten und übernimmt die Vorherrschaft über die Levante. Von da an ist Judas Untergang absehbar.',
    certainty: 'gesichert',
    ref: { book: 'jer', chapter: 46, verse: 2 },
  },

  /* ---------------------------------------------------------------- Exil */
  {
    year: -597,
    epoch: 'exil',
    kind: 'biblisch',
    label: 'Erste Deportation nach Babylon',
    description: 'König Jojachin und die Oberschicht werden verschleppt; Hesekiel ist unter ihnen.',
    certainty: 'gesichert',
    ref: { book: '2koe', chapter: 24 },
  },
  {
    year: -594,
    epoch: 'exil',
    kind: 'fund',
    label: 'Die Babylonische Chronik',
    description:
      'Eine Keilschrifttafel datiert die Einnahme Jerusalems auf den Tag genau – der 16. März 597 v. Chr.',
    certainty: 'gesichert',
  },
  {
    year: -592,
    epoch: 'exil',
    kind: 'fund',
    label: 'Rationentafeln für König Jojachin',
    description:
      'Babylonische Verwaltungslisten führen Öl- und Getreidezuteilungen für „Jaukin, König von Juda“ und seine Söhne – der verschleppte König lebte am Hof weiter.',
    certainty: 'gesichert',
    ref: { book: '2koe', chapter: 25, verse: 27 },
  },
  {
    year: -587,
    epoch: 'exil',
    kind: 'biblisch',
    label: 'Zerstörung Jerusalems und des Tempels',
    description:
      'Die einschneidendste Katastrophe des Alten Testaments – und der Anstoß, die eigene Geschichte neu zu deuten und aufzuschreiben.',
    certainty: 'gesichert',
    ref: { book: 'klgl', chapter: 1 },
  },
  {
    year: -580,
    epoch: 'exil',
    kind: 'text',
    label: 'Das deuteronomistische Geschichtswerk',
    description:
      'Josua bis 2. Könige werden im Exil zu einer durchgehenden Darstellung verbunden, die den Untergang theologisch deutet.',
    certainty: 'ungefähr',
  },
  {
    year: -550,
    epoch: 'exil',
    kind: 'text',
    label: 'Die Priesterschrift',
    description:
      'Priesterliche Kreise fassen Schöpfung, Bundesschlüsse und Kultordnungen zusammen – von ihnen stammt unter anderem 1. Mose 1.',
    certainty: 'ungefähr',
    ref: { book: '1mo', chapter: 1 },
  },
  {
    year: -545,
    epoch: 'exil',
    kind: 'text',
    label: 'Das Trostbuch Jesajas',
    description:
      'Jesaja 40–55 entsteht im Exil, rund 150 Jahre nach dem Propheten, dessen Namen das Buch trägt.',
    certainty: 'ungefähr',
    ref: { book: 'jes', chapter: 40 },
  },
  {
    year: -539,
    epoch: 'exil',
    kind: 'welt',
    label: 'Kyros erobert Babylon',
    description:
      'Das Perserreich löst Babylon ab. Der Kyros-Zylinder beschreibt seine Politik, verschleppte Gruppen heimkehren zu lassen.',
    certainty: 'gesichert',
    ref: { book: 'jes', chapter: 45, verse: 1 },
  },

  /* ------------------------------------------------------------ Perserzeit */
  {
    year: -538,
    epoch: 'perser',
    kind: 'biblisch',
    label: 'Das Edikt des Kyros',
    description: 'Der Perserkönig erlaubt die Heimkehr und den Wiederaufbau des Tempels.',
    certainty: 'gesichert',
    ref: { book: 'esr', chapter: 1 },
  },
  {
    year: -520,
    epoch: 'perser',
    kind: 'biblisch',
    label: 'Haggai und Sacharja drängen zum Tempelbau',
    description: 'Haggais Reden sind auf den Monat genau datiert – ungewöhnlich für ein Prophetenbuch.',
    certainty: 'gesichert',
    ref: { book: 'hag', chapter: 1 },
  },
  {
    year: -515,
    epoch: 'perser',
    kind: 'biblisch',
    label: 'Der zweite Tempel wird eingeweiht',
    description: 'Bescheidener als der erste – manche Alte weinen beim Anblick der Grundmauern.',
    certainty: 'gesichert',
    ref: { book: 'esr', chapter: 6 },
  },
  {
    year: -490,
    epoch: 'perser',
    kind: 'welt',
    label: 'Die Perserkriege',
    description:
      'Marathon und zehn Jahre später Salamis. Während Juda unter persischer Verwaltung steht, entsteht in Athen die klassische Kultur.',
    certainty: 'gesichert',
  },
  {
    year: -450,
    epoch: 'perser',
    kind: 'text',
    label: 'Die Tora erhält ihre Endgestalt',
    description:
      'Die fünf Bücher Mose werden aus mehreren Überlieferungssträngen zusammengefügt. Diese Fassung liest Esra dem Volk vor.',
    certainty: 'ungefähr',
    ref: { book: 'neh', chapter: 8 },
  },
  {
    year: -445,
    epoch: 'perser',
    kind: 'biblisch',
    label: 'Nehemia baut die Stadtmauer',
    description: 'In 52 Tagen, gegen erheblichen Widerstand der Nachbarn.',
    certainty: 'gesichert',
    ref: { book: 'neh', chapter: 6, verse: 15 },
  },
  {
    year: -399,
    epoch: 'perser',
    kind: 'welt',
    label: 'Der Tod des Sokrates',
    description:
      'Griechische Philosophie prägt eine Begriffswelt, in der Jahrhunderte später das Neue Testament formuliert wird.',
    certainty: 'gesichert',
  },

  /* --------------------------------------------------- Hellenistische Zeit */
  {
    year: -333,
    epoch: 'hellenismus',
    kind: 'welt',
    label: 'Alexander der Große erobert die Levante',
    description:
      'Griechisch wird zur Verkehrssprache – Voraussetzung für die spätere Ausbreitung des Evangeliums.',
    certainty: 'gesichert',
  },
  {
    year: -300,
    epoch: 'hellenismus',
    kind: 'text',
    label: 'Die Chronikbücher entstehen',
    description:
      'Der Chronist erzählt die Königsgeschichte neu – mit dem Tempel im Mittelpunkt und für eine Gemeinde ohne eigenen Staat.',
    certainty: 'ungefähr',
    ref: { book: '1chr', chapter: 29 },
  },
  {
    year: -250,
    epoch: 'hellenismus',
    kind: 'text',
    label: 'Die Septuaginta entsteht',
    description:
      'Die Übersetzung der hebräischen Bibel ins Griechische in Alexandria. Die neutestamentlichen Autoren zitieren meist aus ihr.',
    certainty: 'ungefähr',
  },
  {
    year: -200,
    until: 70,
    epoch: 'hellenismus',
    kind: 'fund',
    label: 'Die Schriftrollen von Qumran entstehen',
    description:
      'Am Toten Meer entsteht eine Bibliothek mit Bibelhandschriften, die 1947 gefunden wurde. Sie ist rund tausend Jahre älter als die bis dahin ältesten bekannten hebräischen Handschriften.',
    certainty: 'gesichert',
  },
  {
    year: -167,
    epoch: 'hellenismus',
    kind: 'welt',
    label: 'Religionsverfolgung unter Antiochus IV.',
    description: 'Der Tempel wird entweiht; jüdische Praxis wird bei Todesstrafe verboten.',
    certainty: 'gesichert',
    ref: { book: 'dan', chapter: 11 },
  },
  {
    year: -165,
    epoch: 'hellenismus',
    kind: 'text',
    label: 'Das Buch Daniel erhält seine Endgestalt',
    description:
      'Erzählt wird vom babylonischen Exil, geschrieben wird in der Verfolgung – rund 400 Jahre nach der erzählten Zeit.',
    certainty: 'ungefähr',
    ref: { book: 'dan', chapter: 3 },
  },
  {
    year: -164,
    epoch: 'hellenismus',
    kind: 'biblisch',
    label: 'Makkabäeraufstand und Tempelweihe',
    description: 'Die Wiedereinweihung wird bis heute als Chanukka gefeiert.',
    certainty: 'gesichert',
  },
  {
    year: -146,
    epoch: 'hellenismus',
    kind: 'welt',
    label: 'Rom zerstört Karthago und Korinth',
    description:
      'Rom wird zur beherrschenden Macht des Mittelmeers. Korinth wird 44 v. Chr. als römische Kolonie neu gegründet – die Stadt der Korintherbriefe.',
    certainty: 'gesichert',
  },

  /* --------------------------------------------------------- Römische Zeit */
  {
    year: -63,
    epoch: 'roemer',
    kind: 'welt',
    label: 'Pompeius nimmt Jerusalem ein',
    description: 'Judäa gerät unter römische Oberhoheit.',
    certainty: 'gesichert',
  },
  {
    year: -44,
    epoch: 'roemer',
    kind: 'welt',
    label: 'Die Ermordung Caesars',
    description: 'Der Bürgerkrieg, der folgt, endet mit der Alleinherrschaft des Augustus.',
    certainty: 'gesichert',
  },
  {
    year: -37,
    until: -4,
    epoch: 'roemer',
    kind: 'biblisch',
    label: 'Herodes der Große',
    description: 'Großbauten wie der erweiterte Tempel und Cäsarea – erkauft mit harter Herrschaft.',
    certainty: 'gesichert',
    ref: { book: 'mt', chapter: 2 },
  },
  {
    year: -27,
    epoch: 'roemer',
    kind: 'welt',
    label: 'Augustus wird Kaiser',
    description:
      'Er trägt die Titel „Retter“ und „Bringer des Friedens“ – dieselben Worte, die die Engel in Lukas 2 über einem Kind in einer Futterkrippe sprechen.',
    certainty: 'gesichert',
    ref: { book: 'lk', chapter: 2, verse: 1 },
  },
  {
    year: -20,
    epoch: 'roemer',
    kind: 'welt',
    label: 'Herodes erweitert den Tempel',
    description:
      'Der Umbau dauert Jahrzehnte und macht den Tempelbezirk zum größten religiösen Areal der antiken Welt. Sechs Jahre nach der Vollendung wird er zerstört.',
    certainty: 'gesichert',
    ref: { book: 'joh', chapter: 2, verse: 20 },
  },
  {
    year: -5,
    epoch: 'roemer',
    kind: 'biblisch',
    label: 'Geburt Jesu',
    description:
      'Meist zwischen 7 und 4 v. Chr. angesetzt, weil Herodes 4 v. Chr. starb. Die im 6. Jahrhundert eingeführte Jahreszählung rechnete um einige Jahre falsch.',
    certainty: 'umstritten',
    ref: { book: 'lk', chapter: 2 },
  },
  {
    year: 26,
    until: 36,
    epoch: 'roemer',
    kind: 'welt',
    label: 'Pontius Pilatus ist Präfekt von Judäa',
    description:
      'Außerbiblisch bezeugt bei Josephus und Philo – beide schildern ihn härter als die Evangelien.',
    certainty: 'gesichert',
    ref: { book: 'joh', chapter: 18 },
  },
  {
    year: 28,
    epoch: 'roemer',
    kind: 'biblisch',
    label: 'Johannes der Täufer tritt auf',
    description: 'Bußpredigt und Taufe am Jordan; auch Josephus berichtet von ihm.',
    certainty: 'ungefähr',
    ref: { book: 'mk', chapter: 1 },
  },
  {
    year: 30,
    epoch: 'roemer',
    kind: 'biblisch',
    label: 'Kreuzigung Jesu',
    description:
      'Unter dem Präfekten Pontius Pilatus, meist auf 30 oder 33 n. Chr. datiert. Die Hinrichtung selbst gilt historisch als gesichert.',
    certainty: 'gesichert',
    ref: { book: 'mk', chapter: 15 },
  },
  {
    year: 30,
    epoch: 'roemer',
    kind: 'fund',
    label: 'Die Pilatus-Inschrift von Cäsarea',
    description:
      'Ein 1961 gefundener Steinblock nennt Pontius Pilatus als „Präfekt von Judäa“ – der einzige zeitgenössische Beleg für ihn.',
    certainty: 'gesichert',
  },

  /* ---------------------------------------------------------- Frühe Kirche */
  {
    year: 30,
    epoch: 'urkirche',
    kind: 'biblisch',
    label: 'Pfingsten in Jerusalem',
    description: 'Die erste Gemeinde entsteht.',
    certainty: 'ungefähr',
    ref: { book: 'apg', chapter: 2 },
  },
  {
    year: 34,
    epoch: 'urkirche',
    kind: 'biblisch',
    label: 'Bekehrung des Paulus',
    description: 'Aus dem Verfolger wird der wirkmächtigste Missionar der jungen Bewegung.',
    certainty: 'ungefähr',
    ref: { book: 'apg', chapter: 9 },
  },
  {
    year: 38,
    epoch: 'urkirche',
    kind: 'biblisch',
    label: 'Kornelius wird aufgenommen',
    description:
      'Ein römischer Offizier gehört dazu, ohne zuvor zum Judentum überzutreten – die folgenreichste Weichenstellung der frühen Gemeinde.',
    certainty: 'ungefähr',
    ref: { book: 'apg', chapter: 10 },
  },
  {
    year: 48,
    epoch: 'urkirche',
    kind: 'biblisch',
    label: 'Das Apostelkonzil',
    description:
      'Entscheidung, dass Nichtjuden nicht beschnitten werden müssen.',
    certainty: 'ungefähr',
    ref: { book: 'apg', chapter: 15 },
  },
  {
    year: 49,
    epoch: 'urkirche',
    kind: 'welt',
    label: 'Claudius weist Juden aus Rom aus',
    description:
      'Sueton nennt als Anlass Unruhen „auf Betreiben eines Chrestus“. Aquila und Priska kommen dadurch nach Korinth.',
    certainty: 'gesichert',
    ref: { book: 'apg', chapter: 18, verse: 2 },
  },
  {
    year: 50,
    epoch: 'urkirche',
    kind: 'text',
    label: 'Der 1. Thessalonicherbrief',
    description: 'Vermutlich die älteste erhaltene Schrift des Neuen Testaments.',
    certainty: 'ungefähr',
    ref: { book: '1thess', chapter: 1 },
  },
  {
    year: 51,
    epoch: 'urkirche',
    kind: 'fund',
    label: 'Die Gallio-Inschrift in Delphi',
    description:
      'Sie datiert die Amtszeit des Prokonsuls Gallio auf 51/52 n. Chr. – der einzige feste Fixpunkt, an dem sich die gesamte Chronologie des Paulus aufhängen lässt.',
    certainty: 'gesichert',
    ref: { book: 'apg', chapter: 18, verse: 12 },
  },
  {
    year: 55,
    epoch: 'urkirche',
    kind: 'text',
    label: 'Die Korintherbriefe',
    description:
      'Sie geben den genauesten Einblick in den Alltag einer frühen Gemeinde – samt ihrer Konflikte.',
    certainty: 'ungefähr',
    ref: { book: '1kor', chapter: 1 },
  },
  {
    year: 57,
    epoch: 'urkirche',
    kind: 'text',
    label: 'Der Römerbrief',
    description: 'Die ausführlichste Darlegung des paulinischen Evangeliums, geschrieben in Korinth.',
    certainty: 'ungefähr',
    ref: { book: 'roem', chapter: 1 },
  },
  {
    year: 60,
    epoch: 'urkirche',
    kind: 'biblisch',
    label: 'Paulus kommt nach Rom',
    description: 'Als Gefangener, nach Schiffbruch vor Malta. Die Apostelgeschichte endet hier.',
    certainty: 'ungefähr',
    ref: { book: 'apg', chapter: 28 },
  },
  {
    year: 64,
    epoch: 'urkirche',
    kind: 'welt',
    label: 'Brand Roms und Verfolgung unter Nero',
    description:
      'Nach Tacitus schiebt Nero die Schuld den Christen zu. Petrus und Paulus sterben vermutlich in dieser Zeit.',
    certainty: 'gesichert',
  },
  {
    year: 66,
    until: 70,
    epoch: 'urkirche',
    kind: 'welt',
    label: 'Der Jüdische Krieg',
    description:
      'Der Aufstand gegen Rom endet mit der Zerstörung Jerusalems. Josephus, der ihn erst mitführte und dann überlief, hat ihn ausführlich beschrieben.',
    certainty: 'gesichert',
  },
  {
    year: 70,
    epoch: 'urkirche',
    kind: 'biblisch',
    label: 'Zerstörung des zweiten Tempels',
    description:
      'Judentum und Christentum gehen danach endgültig getrennte Wege.',
    certainty: 'gesichert',
    ref: { book: 'mk', chapter: 13, verse: 2 },
  },
  {
    year: 70,
    epoch: 'urkirche',
    kind: 'text',
    label: 'Das Markusevangelium',
    description: 'Das älteste der vier Evangelien, Vorlage für Matthäus und Lukas.',
    certainty: 'ungefähr',
    ref: { book: 'mk', chapter: 1 },
  },
  {
    year: 79,
    epoch: 'urkirche',
    kind: 'welt',
    label: 'Der Ausbruch des Vesuv',
    description:
      'Pompeji wird verschüttet und konserviert damit den Alltag einer römischen Stadt zur Zeit der ersten Gemeinden.',
    certainty: 'gesichert',
  },
  {
    year: 85,
    epoch: 'urkirche',
    kind: 'text',
    label: 'Matthäus- und Lukasevangelium',
    description:
      'Beide benutzen Markus und eine gemeinsame Spruchsammlung, die sogenannte Logienquelle, die selbst nicht erhalten ist.',
    certainty: 'ungefähr',
    ref: { book: 'mt', chapter: 1 },
  },
  {
    year: 95,
    epoch: 'urkirche',
    kind: 'text',
    label: 'Die Offenbarung des Johannes',
    description: 'Trostschrift für bedrängte Gemeinden in Kleinasien, meist unter Domitian verortet.',
    certainty: 'ungefähr',
    ref: { book: 'offb', chapter: 1 },
  },
  {
    year: 100,
    epoch: 'urkirche',
    kind: 'text',
    label: 'Das Johannesevangelium',
    description:
      'Es geht eigene Wege: andere Erzählungen, andere Sprache, eine vertiefte Deutung der Person Jesu.',
    certainty: 'ungefähr',
    ref: { book: 'joh', chapter: 1 },
  },
  {
    year: 125,
    epoch: 'urkirche',
    kind: 'fund',
    label: 'Der Papyrus P52',
    description:
      'Ein Schnipsel aus Johannes 18, kaum größer als eine Streichholzschachtel – die älteste erhaltene Handschrift des Neuen Testaments.',
    certainty: 'ungefähr',
    ref: { book: 'joh', chapter: 18 },
  },
  {
    year: 132,
    until: 135,
    epoch: 'urkirche',
    kind: 'welt',
    label: 'Der Bar-Kochba-Aufstand',
    description:
      'Der letzte große jüdische Aufstand gegen Rom scheitert. Jerusalem wird als römische Kolonie neu gegründet, Juden der Zutritt verwehrt.',
    certainty: 'gesichert',
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
  if (event.year > 0 && event.until > 0) {
    return `${event.year}–${event.until} n. Chr.`;
  }
  return `${formatYear(event.year)} – ${formatYear(event.until)}`;
}
