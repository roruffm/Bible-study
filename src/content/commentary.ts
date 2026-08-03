/**
 * Artikel zu historischem Kontext und verbreiteten Auslegungen.
 *
 * Redaktionsprinzip: Auslegungen werden **beschreibend nebeneinander**
 * dargestellt, jeweils mit Angabe der Tradition oder Denkrichtung. Die App
 * entscheidet nicht, welche Deutung „die richtige“ ist – sie macht sichtbar,
 * dass ein Text verschieden gelesen wird, und benennt, woher eine Lesart kommt.
 *
 * Diese Sammlung ist der redaktionelle Anfangsbestand (Phase 2 des Konzepts):
 * Sie deckt zentrale Stellen ab und wächst schrittweise. Wo kein Artikel
 * vorliegt, zeigt die App den Steckbrief des jeweiligen Buches.
 */

export interface Interpretation {
  /** Tradition oder Denkrichtung, aus der die Deutung stammt. */
  tradition: string;
  text: string;
}

export interface CrossReference {
  book: string;
  chapter: number;
  verse: number;
  note?: string;
}

export interface CommentaryEntry {
  book: string;
  chapter: number;
  /** Abgedeckter Versbereich (einschließlich). */
  from: number;
  to: number;
  title: string;
  /** Zwei bis drei Sätze für die Kurzansicht. */
  historicalShort: string;
  /** Ausführliche Fassung hinter „Mehr erfahren“. */
  historicalLong?: string;
  interpretations: Interpretation[];
  crossRefs?: CrossReference[];
  /** Grundlagen des Artikels. */
  sources?: string[];
}

export const COMMENTARY: CommentaryEntry[] = [
  {
    book: '1mo',
    chapter: 1,
    from: 1,
    to: 31,
    title: 'Der erste Schöpfungsbericht',
    historicalShort:
      'Der Text ist als feierlicher Sieben-Tage-Rhythmus komponiert und stammt vermutlich aus priesterlichen Kreisen der Exilszeit. Er entstand in einer Umwelt, in der babylonische Schöpfungsmythen wie das Enuma Elisch die Welt aus einem Götterkampf hervorgehen ließen.',
    historicalLong:
      'Israel formuliert hier bewusst einen Gegenentwurf: Es gibt keinen Kampf zwischen Göttern, Sonne und Mond sind keine Gottheiten, sondern werden nüchtern „Lichter“ genannt. Auffällig ist auch die Würde des Menschen: Während in Mesopotamien nur der König als Bild der Gottheit galt, wird hier der Mensch als solcher – „männlich und weiblich“ – zum Bild Gottes erklärt. Für Menschen im babylonischen Exil, die ihren Tempel und ihre Eigenstaatlichkeit verloren hatten, war das eine Kampfansage gegen die Weltdeutung der Siegermacht.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Text ist keine naturkundliche Beschreibung, sondern ein liturgisch geformtes Bekenntnis. Seine Aussage liegt auf der Ebene des „Wer“ und „Wozu“, nicht des „Wie“.',
      },
      {
        tradition: 'Klassische kirchliche Auslegung',
        text: 'Von Augustinus bis in die Gegenwart wird betont, dass die Tage nicht zwingend als 24-Stunden-Einheiten zu verstehen sind. Entscheidend ist die Aussage, dass Gott alles aus freiem Willen und gut geschaffen hat.',
      },
      {
        tradition: 'Kreationistische Lesart',
        text: 'In Teilen evangelikaler Kreise werden die sechs Tage als reale, aufeinanderfolgende Tage verstanden. Diese Position ist innerhalb der Christenheit eine Minderheitsmeinung und wird von den meisten Kirchen nicht geteilt.',
      },
    ],
    crossRefs: [
      { book: 'joh', chapter: 1, verse: 1, note: 'Nimmt „Im Anfang“ auf' },
      { book: 'ps', chapter: 8, verse: 5, note: 'Die Würde des Menschen' },
      { book: 'kol', chapter: 1, verse: 16 },
    ],
    sources: ['Westermann, Genesis (BK)', 'Zenger u. a., Einleitung in das Alte Testament'],
  },
  {
    book: '1mo',
    chapter: 3,
    from: 1,
    to: 24,
    title: 'Der Bruch im Garten',
    historicalShort:
      'Die Erzählung gehört zur älteren Schicht der Urgeschichte. Sie erklärt nicht den Ursprung des Bösen, sondern beschreibt eine Grunderfahrung: Der Mensch will sein wie Gott und verliert dabei Vertrauen, Nähe und Unbefangenheit.',
    historicalLong:
      'Die Schlange ist im Text ausdrücklich ein Geschöpf, kein Gegengott – die Gleichsetzung mit dem Teufel entsteht erst in späterer jüdischer und christlicher Auslegung. Auffällig ist die psychologische Genauigkeit: Zuerst wird das Gebot verzerrt wiedergegeben, dann wird Misstrauen gesät, am Ende folgt gegenseitige Schuldzuweisung. Das Bild vom Feigenblatt und die Frage „Wo bist du?“ gehören zu den dichtesten Szenen der Bibel.',
    interpretations: [
      {
        tradition: 'Westliche Tradition seit Augustinus',
        text: 'Der Text wird als „Sündenfall“ gelesen, der eine bleibende Verkehrung der menschlichen Natur begründet (Erbsünde). Diese Deutung prägt katholische und reformatorische Theologie gleichermaßen.',
      },
      {
        tradition: 'Ostkirchliche Tradition',
        text: 'Die Orthodoxie spricht zurückhaltender von „Urschuld“: Der Mensch erbt Sterblichkeit und Anfälligkeit, nicht persönliche Schuld.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Im Judentum gilt der Text nicht als Fall in eine verdorbene Natur. Der Mensch bleibt frei, sich für das Gute zu entscheiden; die Erzählung beschreibt das Erwachsenwerden mit seiner Last der Verantwortung.',
      },
    ],
    crossRefs: [
      { book: 'roem', chapter: 5, verse: 12 },
      { book: 'offb', chapter: 22, verse: 2, note: 'Der Baum des Lebens kehrt wieder' },
    ],
  },
  {
    book: '2mo',
    chapter: 3,
    from: 13,
    to: 15,
    title: 'Der Gottesname am brennenden Dornbusch',
    historicalShort:
      'Mose fragt nach dem Namen – in der Antike die Frage nach Wesen und Verfügbarkeit einer Gottheit. Die Antwort „Ich bin, der ich bin“ (hebräisch ehje ascher ehje) ist bewusst offen und entzieht sich dem Zugriff.',
    historicalLong:
      'Aus dieser Wurzel wird der Eigenname JHWH abgeleitet, das Tetragramm. Aus Ehrfurcht wird er im Judentum nicht ausgesprochen, sondern beim Lesen durch „Adonai“ (Herr) ersetzt; die Lutherbibel gibt ihn mit „HERR“ in Großbuchstaben wieder. Die Form lässt sich auch zukünftig übersetzen: „Ich werde da sein, als der ich da sein werde“ – eine Zusage der Mitgegenwart auf dem Weg, nicht eine Definition des Wesens.',
    interpretations: [
      {
        tradition: 'Philosophische Tradition',
        text: 'Seit der griechischen Übersetzung („Ich bin der Seiende“) wurde der Satz als Aussage über Gottes Sein gelesen: Gott ist der, der aus sich selbst existiert.',
      },
      {
        tradition: 'Neuere alttestamentliche Exegese',
        text: 'Der Akzent liegt weniger auf Metaphysik als auf Beziehung: Gott sagt seine wirksame Gegenwart zu – „Ich werde für euch da sein“ – gerade dort, wo Menschen unterdrückt werden.',
      },
      {
        tradition: 'Johanneische Auslegung',
        text: 'Die „Ich bin“-Worte Jesu im Johannesevangelium werden traditionell als bewusste Anspielung auf diese Stelle verstanden.',
      },
    ],
    crossRefs: [
      { book: 'joh', chapter: 8, verse: 58 },
      { book: 'offb', chapter: 1, verse: 8 },
    ],
  },
  {
    book: '2mo',
    chapter: 20,
    from: 1,
    to: 17,
    title: 'Die Zehn Gebote',
    historicalShort:
      'Die Gebote stehen literarisch nicht am Anfang, sondern nach der Befreiung: Erst rettet Gott, dann ordnet er das Zusammenleben. Formal erinnern sie an altorientalische Vertragstexte zwischen einem Großkönig und seinen Vasallen.',
    historicalLong:
      'Der Vorspruch „Ich bin der HERR, dein Gott, der ich dich aus Ägypten geführt habe“ ist entscheidend: Die Gebote sind Konsequenz der Befreiung, nicht deren Bedingung. Die Zählung unterscheidet sich zwischen den Konfessionen – die katholische und lutherische Tradition zählt anders als die reformierte, orthodoxe und jüdische; die Gesamtzahl bleibt zehn. Mehrere Gebote schützen konkret die Schwächeren: Der Sabbat gilt ausdrücklich auch für Sklaven, Fremde und Tiere.',
    interpretations: [
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Luther fasst die Gebote positiv: Nicht töten heißt auch, dem Nächsten in Lebensgefahr beizustehen. Zugleich zeigen die Gebote dem Menschen, wie weit er von ihnen entfernt ist.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die „Zehn Worte“ sind Überschrift und Zusammenfassung der Tora, nicht ihr Ersatz. Sie werden als Gabe verstanden, die Freiheit ermöglicht, nicht als Last.',
      },
      {
        tradition: 'Katholische Soziallehre',
        text: 'Die zweite Tafel wird als Grundlage einer Ethik des Gemeinwohls gelesen: Schutz von Leben, Ehe, Eigentum und Ruf sind Bedingungen einer menschenwürdigen Gesellschaft.',
      },
    ],
    crossRefs: [
      { book: '5mo', chapter: 5, verse: 6, note: 'Zweite Fassung' },
      { book: 'mt', chapter: 22, verse: 37, note: 'Zusammenfassung durch Jesus' },
    ],
  },
  {
    book: '5mo',
    chapter: 6,
    from: 4,
    to: 9,
    title: 'Das Schma Israel – „Höre, Israel“',
    historicalShort:
      'Dieser Text ist bis heute das zentrale Bekenntnis des Judentums, gesprochen morgens und abends. Er entstand in einer Zeit, in der die Verehrung mehrerer Gottheiten selbstverständlich war.',
    historicalLong:
      'Der hebräische Satz lässt zwei Übersetzungen zu: „Der HERR ist unser Gott, der HERR allein“ oder „… der HERR ist einer“. Die erste Fassung ist ein Treuebekenntnis (nur dieser eine gilt), die zweite eine Aussage über Gottes Einheit. Die Anweisungen, die Worte an Türpfosten und an die Hand zu binden, wurden wörtlich umgesetzt: Mesusa und Tefillin gehen auf diese Verse zurück.',
    interpretations: [
      {
        tradition: 'Jüdische Tradition',
        text: 'Das Schma ist Bekenntnis und Verpflichtung zugleich. Es wird traditionell auch als letztes Wort eines Sterbenden gesprochen.',
      },
      {
        tradition: 'Neutestamentliche Aufnahme',
        text: 'Jesus zitiert diese Verse als das größte Gebot und verbindet sie mit dem Gebot der Nächstenliebe aus 3. Mose 19,18.',
      },
      {
        tradition: 'Religionsgeschichtliche Einordnung',
        text: 'Die Forschung sieht hier einen Schritt von der ausschließlichen Verehrung eines Gottes (Monolatrie) hin zum Bekenntnis, dass es nur einen Gott gibt.',
      },
    ],
    crossRefs: [
      { book: 'mk', chapter: 12, verse: 29 },
      { book: '3mo', chapter: 19, verse: 18 },
    ],
  },
  {
    book: 'ps',
    chapter: 23,
    from: 1,
    to: 6,
    title: 'Der gute Hirte',
    historicalShort:
      'Das Bild vom Hirten war im Alten Orient ein politischer Titel: Könige nannten sich Hirten ihres Volkes. Der Psalm überträgt diesen Herrschertitel auf Gott – und verbindet ihn mit persönlicher Fürsorge.',
    historicalLong:
      'Der Psalm wechselt in der Mitte das Bild: Aus dem Hirten auf der Weide wird der Gastgeber, der einen Tisch deckt – „im Angesicht meiner Feinde“. Das Salben des Kopfes mit Öl und der überfließende Becher gehören zur Gastfreundschaft; wer in einem Zelt aufgenommen wurde, stand unter dem Schutz des Gastgebers. Das „finstere Tal“ meint wörtlich einen Ort tiefer Dunkelheit; die Übersetzung „Tal der Todesschatten“ ist möglich, aber deutend.',
    interpretations: [
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der Psalm wird als Vertrauenslied gelesen, oft im Zusammenhang mit dem Auszug aus Ägypten: Gott führt durch die Wüste zu Wasser und Ruhe.',
      },
      {
        tradition: 'Christliche Tradition',
        text: 'Seit der Alten Kirche wird der Psalm auf Christus als den guten Hirten bezogen (Johannes 10) und in Taufe und Abendmahl hineingelesen; deshalb gehört er bis heute zur Bestattungsliturgie.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Betont wird, dass der Psalm die Dunkelheit nicht überspringt: Er verspricht keinen Weg um das Tal herum, sondern Begleitung hindurch.',
      },
    ],
    crossRefs: [
      { book: 'joh', chapter: 10, verse: 11 },
      { book: 'hes', chapter: 34, verse: 11 },
    ],
  },
  {
    book: 'ps',
    chapter: 139,
    from: 1,
    to: 18,
    title: 'Von Gott durchschaut und gehalten',
    historicalShort:
      'Ein später Psalm, sprachlich mit aramäischen Einflüssen. Er beschreibt Gottes Allwissenheit nicht als Überwachung, sondern als Geborgenheit: Es gibt keinen Ort ohne Gott.',
    interpretations: [
      {
        tradition: 'Spirituelle Tradition',
        text: 'Der Psalm gilt als Grundtext christlicher Mystik: Selbstkenntnis und Gotteserkenntnis gehören zusammen.',
      },
      {
        tradition: 'Ethische Rezeption',
        text: 'Die Verse über die Bildung im Mutterleib werden in Debatten über den Lebensschutz herangezogen. Exegetisch ist zu beachten, dass der Psalm poetisch von Gottes Zuwendung spricht und keine Aussage zu modernen bioethischen Fragen treffen will.',
      },
      {
        tradition: 'Literarische Beobachtung',
        text: 'Die zunächst überlesenen Verse 19–22 mit ihrer Feindbitte gehören zum Psalm dazu; sie zeigen, dass auch Zorn vor Gott ausgesprochen werden darf.',
      },
    ],
  },
  {
    book: 'spr',
    chapter: 3,
    from: 5,
    to: 6,
    title: 'Vertrauen statt eigener Berechnung',
    historicalShort:
      'Der Spruch stammt aus dem Weisheitsunterricht, in dem junge Männer auf Verantwortung vorbereitet wurden. Er stellt nicht Vernunft gegen Glauben, sondern warnt davor, sich allein auf die eigene Einschätzung zu verlassen.',
    interpretations: [
      {
        tradition: 'Weisheitliche Auslegung',
        text: 'Sprichwörter sind Erfahrungsregeln, keine Versprechen. Das Buch Hiob und der Prediger stehen bewusst als Korrektiv daneben.',
      },
      {
        tradition: 'Frömmigkeitstradition',
        text: 'Der Vers gehört zu den meistzitierten Bibelworten bei Lebensentscheidungen und wird als Zusage der Wegführung verstanden.',
      },
    ],
    crossRefs: [{ book: 'hi', chapter: 28, verse: 28 }],
  },
  {
    book: 'jes',
    chapter: 53,
    from: 1,
    to: 12,
    title: 'Der leidende Gottesknecht',
    historicalShort:
      'Der Text ist das vierte der sogenannten Gottesknechtslieder und stammt aus dem Trostbuch für die Exilierten in Babylon. Er beschreibt eine Gestalt, die stellvertretend leidet – ein im Alten Orient ungewöhnlicher Gedanke.',
    historicalLong:
      'Wer der „Knecht“ ist, sagt der Text nicht ausdrücklich. Im Buch selbst wird die Bezeichnung an anderen Stellen ausdrücklich auf Israel bezogen. Zugleich erscheint der Knecht hier als Einzelner, der für „viele“ eintritt. Die Frage nach seiner Identität ist eine der meistdiskutierten der Bibelauslegung überhaupt.',
    interpretations: [
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der Knecht wird überwiegend kollektiv gedeutet: Israel selbst leidet unter den Völkern und trägt stellvertretend. Daneben gibt es Deutungen auf einzelne Propheten.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Seit dem Neuen Testament wird der Text auf Jesus bezogen; Apostelgeschichte 8 schildert genau diese Lesart. Er prägt die christliche Deutung des Kreuzes als stellvertretendes Leiden.',
      },
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Betont wird, dass der Text in seiner Entstehungszeit zunächst innerhalb der Exilserfahrung verstanden werden muss; die christliche Lesart ist eine spätere, legitime Rezeption, aber nicht der ursprüngliche Sinn.',
      },
    ],
    crossRefs: [
      { book: 'apg', chapter: 8, verse: 32 },
      { book: '1petr', chapter: 2, verse: 24 },
    ],
  },
  {
    book: 'jer',
    chapter: 29,
    from: 11,
    to: 11,
    title: '„Ich weiß wohl, was ich für Gedanken über euch habe“',
    historicalShort:
      'Der Vers steht in einem Brief an die nach Babylon Verschleppten. Unmittelbar davor sagt Gott ihnen an, dass das Exil siebzig Jahre dauern wird – die Zusage gilt also einer Generation, die die Heimkehr selbst nicht mehr erleben wird.',
    historicalLong:
      'Der Brief widerspricht Propheten, die eine schnelle Rückkehr versprachen. Stattdessen lautet die Anweisung: Häuser bauen, Gärten anlegen, heiraten – und für die Stadt beten, in der man gefangen ist. Der Trost ist also gerade kein Versprechen, dass sich die Lage bald bessert, sondern dass Gott auch die lange Fremde nicht als Endpunkt versteht.',
    interpretations: [
      {
        tradition: 'Verbreitete Frömmigkeitspraxis',
        text: 'Der Vers wird häufig als persönliche Zusage für Lebenspläne zitiert – auf Konfirmationskarten und in Krisenzeiten.',
      },
      {
        tradition: 'Exegetischer Einwand',
        text: 'Fachleute weisen darauf hin, dass die Zusage ursprünglich einem Kollektiv gilt und ausdrücklich Leiden einschließt. Als Versprechen auf individuellen Erfolg gelesen, verkehrt sie ihren Sinn.',
      },
      {
        tradition: 'Seelsorgliche Vermittlung',
        text: 'Beide Ebenen lassen sich verbinden: Der Vers trägt gerade dann, wenn er nicht schnelle Lösungen verspricht, sondern langen Atem im Unfertigen ermöglicht.',
      },
    ],
    crossRefs: [{ book: 'jer', chapter: 29, verse: 7, note: 'Betet für die Stadt' }],
  },
  {
    book: 'mi',
    chapter: 6,
    from: 8,
    to: 8,
    title: 'Was Gott vom Menschen erwartet',
    historicalShort:
      'Der Vers steht am Ende einer Gerichtsrede, die wie ein Prozess aufgebaut ist. Auf die Frage, mit welchen Opfern man Gott gnädig stimmen könne, folgt eine überraschend schlichte Antwort.',
    interpretations: [
      {
        tradition: 'Prophetische Tradition',
        text: 'Kult ersetzt keine Gerechtigkeit. Amos, Hosea und Jesaja argumentieren ähnlich – nicht gegen den Gottesdienst, sondern gegen seine Verwendung als Ablenkung.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der Talmud sieht in diesem Vers eine Zusammenfassung der gesamten Tora auf drei Grundsätze.',
      },
      {
        tradition: 'Moderne Sozialethik',
        text: 'Der Vers gilt als Kurzformel christlicher und jüdischer Sozialethik: Gerechtigkeit als Struktur, Güte als Haltung, Demut als Verhältnis zu Gott.',
      },
    ],
  },
  {
    book: 'mt',
    chapter: 5,
    from: 3,
    to: 12,
    title: 'Die Seligpreisungen',
    historicalShort:
      'Die Bergpredigt beginnt nicht mit Forderungen, sondern mit Zusagen. Die Angesprochenen sind Menschen ohne Status: Arme, Trauernde, Gewaltlose – in einer Gesellschaft, in der Ehre und Ansehen alles bedeuteten.',
    historicalLong:
      'Matthäus formuliert „arm im Geist“, Lukas in seiner Parallelfassung schlicht „ihr Armen“. Die Forschung sieht darin zwei Akzente derselben Überlieferung: die wirtschaftliche Notlage und die innere Haltung dessen, der nichts vorzuweisen hat. Der Aufbau erinnert an die Sinai-Szene: Wie Mose auf den Berg stieg, lehrt Jesus hier auf einem Berg – Matthäus zeichnet ihn bewusst in diese Linie.',
    interpretations: [
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Die Bergpredigt zeigt vor allem, wie weit der Mensch von Gottes Willen entfernt ist, und treibt ihn zur Gnade. Sie ist nicht in erster Linie ein Programm.',
      },
      {
        tradition: 'Täuferische und friedenskirchliche Tradition',
        text: 'Mennoniten und Quäker lesen die Bergpredigt als konkrete Lebensform, die hier und jetzt praktiziert werden kann – einschließlich der Gewaltfreiheit.',
      },
      {
        tradition: 'Katholische Tradition',
        text: 'Die Seligpreisungen werden als Weg der Nachfolge verstanden, der auf das Reich Gottes ausgerichtet ist und in der Spiritualität der Orden konkrete Gestalt annimmt.',
      },
      {
        tradition: 'Befreiungstheologie',
        text: 'Betont wird die materielle Dimension: Gott ergreift Partei für die tatsächlich Armen, nicht nur für eine innere Haltung.',
      },
    ],
    crossRefs: [
      { book: 'lk', chapter: 6, verse: 20, note: 'Parallelfassung in der Feldrede' },
      { book: 'jes', chapter: 61, verse: 1 },
    ],
  },
  {
    book: 'mt',
    chapter: 6,
    from: 9,
    to: 13,
    title: 'Das Vaterunser',
    historicalShort:
      'Das Gebet ist ganz aus jüdischer Gebetssprache geformt; zu fast jeder Bitte gibt es Parallelen in zeitgenössischen jüdischen Gebeten. Neu ist die Dichte und die vertraute Anrede Gottes als Vater.',
    historicalLong:
      'Lukas überliefert eine kürzere Fassung, was für hohe Alterswertigkeit spricht. Die Bitte um das „tägliche Brot“ enthält ein griechisches Wort (epiousios), das sonst kaum belegt ist; es kann „für den kommenden Tag“ oder „zum Leben notwendig“ bedeuten. Der abschließende Lobpreis („Denn dein ist das Reich…“) fehlt in den ältesten Handschriften und wurde früh aus dem gottesdienstlichen Gebrauch ergänzt.',
    interpretations: [
      {
        tradition: 'Alte Kirche',
        text: 'Das Vaterunser galt als Zusammenfassung des ganzen Evangeliums und wurde den Taufbewerbern feierlich übergeben.',
      },
      {
        tradition: 'Diskussion um die sechste Bitte',
        text: '„Führe uns nicht in Versuchung“ wird unterschiedlich verstanden: als Bitte, in der Prüfung nicht zu fallen, oder – so die 2017 in mehreren Ländern eingeführte katholische Fassung – als „Lass uns nicht in Versuchung geraten“. Die evangelischen Kirchen im deutschsprachigen Raum behielten den überlieferten Wortlaut bei.',
      },
      {
        tradition: 'Sozialethische Lesart',
        text: 'Die Brotbitte steht im Plural: Es wird nicht um mein, sondern um unser Brot gebeten – ein Gebet, das Verantwortung füreinander einschließt.',
      },
    ],
    crossRefs: [{ book: 'lk', chapter: 11, verse: 2, note: 'Kürzere Fassung' }],
  },
  {
    book: 'lk',
    chapter: 10,
    from: 25,
    to: 37,
    title: 'Der barmherzige Samariter',
    historicalShort:
      'Die Straße von Jerusalem nach Jericho fällt auf 27 Kilometern rund 1000 Höhenmeter ab und war für Überfälle berüchtigt. Entscheidend für die Sprengkraft der Erzählung ist, dass Samaritaner und Juden verfeindet waren.',
    historicalLong:
      'Priester und Levit hätten sich durch die Berührung eines möglicherweise Toten kultisch verunreinigt und ihren Dienst nicht antreten können – ihr Verhalten ist im Rahmen der Reinheitsvorschriften nachvollziehbar. Genau dadurch wird die Frage geschärft. Die Pointe liegt in der Umkehrung der Ausgangsfrage: Der Gesetzeslehrer fragt „Wer ist mein Nächster?“ (wen muss ich einbeziehen?), Jesus fragt zurück, wer sich als Nächster erwiesen hat. Zwei Denare entsprachen etwa zwei Tageslöhnen.',
    interpretations: [
      {
        tradition: 'Ethische Auslegung',
        text: 'Die verbreitetste Lesart: Nächstenliebe kennt keine Gruppengrenzen und zeigt sich in konkretem, kostspieligem Handeln.',
      },
      {
        tradition: 'Allegorische Tradition',
        text: 'Kirchenväter wie Origenes und Augustinus deuteten die Figuren symbolisch – der Samariter als Christus, die Herberge als Kirche. Diese Lesart wird heute meist als spätere Übertragung eingeordnet.',
      },
      {
        tradition: 'Sozialgeschichtliche Lesart',
        text: 'Betont wird die Provokation: Der Held ist ausgerechnet ein Angehöriger der verachteten Gruppe. Die Erzählung richtet sich damit auch gegen religiös begründete Verachtung.',
      },
    ],
    crossRefs: [{ book: '3mo', chapter: 19, verse: 18 }],
  },
  {
    book: 'lk',
    chapter: 15,
    from: 11,
    to: 32,
    title: 'Der verlorene Sohn',
    historicalShort:
      'Der jüngere Sohn fordert sein Erbe zu Lebzeiten des Vaters ein – eine schwere Ehrverletzung, die dem Wunsch nach dessen Tod nahekam. Für die Zuhörer war schon dieser Einstieg ein Skandal.',
    historicalLong:
      'Dass ein älterer Mann läuft und dabei sein Gewand rafft, galt als würdelos – der Vater nimmt diese Blamage öffentlich auf sich. Ring, Gewand und Schuhe sind Zeichen der Wiedereinsetzung als Sohn, nicht als Knecht. Die Erzählung endet bewusst offen: Ob der ältere Bruder hineingeht, bleibt unbeantwortet. Sie steht als dritte von drei Gleichnissen über Verlorenes, erzählt als Antwort auf den Vorwurf, Jesus esse mit Zöllnern und Sündern.',
    interpretations: [
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Ein Kerntext für die Rechtfertigung allein aus Gnade: Der Vater läuft, bevor die vorbereitete Beichte gesprochen ist.',
      },
      {
        tradition: 'Neuere Auslegung',
        text: 'Der Schwerpunkt liegt oft auf dem älteren Bruder. Die offene Frage richtet sich an die Frommen: Können sie die Freude über die Rückkehr teilen?',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Häufig wird das Gleichnis „Vom barmherzigen Vater“ genannt, weil nicht die Verfehlung, sondern die zuvorkommende Liebe im Mittelpunkt steht.',
      },
    ],
    crossRefs: [{ book: 'lk', chapter: 15, verse: 1, note: 'Anlass der drei Gleichnisse' }],
  },
  {
    book: 'joh',
    chapter: 1,
    from: 1,
    to: 18,
    title: 'Der Prolog: Das Wort wurde Mensch',
    historicalShort:
      'Der Prolog nimmt mit „Im Anfang“ bewusst 1. Mose 1 auf. Der Begriff „Logos“ (Wort) verband jüdische Weisheitstradition mit griechischer Philosophie und war für beide Lesergruppen anschlussfähig.',
    historicalLong:
      'In der jüdischen Tradition war die Weisheit bei Gott, als er die Welt schuf (Sprüche 8). In der stoischen Philosophie bezeichnete der Logos die vernünftige Ordnung des Kosmos. Johannes verbindet beides und sagt dann etwas, das für beide Traditionen unerhört war: Dieser Logos wurde Fleisch. Das griechische Wort für „wohnte unter uns“ meint wörtlich „zeltete“ und erinnert an das Zelt der Begegnung in der Wüste.',
    interpretations: [
      {
        tradition: 'Altkirchliche Dogmatik',
        text: 'Der Prolog wurde zur Grundlage der Christologie von Nicäa und Chalcedon: wahrer Gott und wahrer Mensch.',
      },
      {
        tradition: 'Religionsgeschichtliche Forschung',
        text: 'Untersucht werden die Wurzeln des Logos-Begriffs bei Philo von Alexandrien und in der Weisheitsliteratur; der Prolog gilt als möglicherweise vorangestellter Hymnus.',
      },
      {
        tradition: 'Spirituelle Auslegung',
        text: 'Betont wird die Bewegung Gottes zum Menschen hin: Gott bleibt nicht fern, sondern nimmt Wohnung im Alltäglichen.',
      },
    ],
    crossRefs: [
      { book: '1mo', chapter: 1, verse: 1 },
      { book: 'spr', chapter: 8, verse: 22 },
    ],
  },
  {
    book: 'joh',
    chapter: 3,
    from: 16,
    to: 16,
    title: 'Der meistzitierte Vers der Bibel',
    historicalShort:
      'Der Vers gehört zum nächtlichen Gespräch mit Nikodemus, einem Mitglied des Hohen Rates. Dass er bei Nacht kommt, ist bei Johannes doppeldeutig: Es schützt seinen Ruf und steht zugleich für das Nicht-Verstehen.',
    historicalLong:
      'Ob der Vers noch Jesu Rede ist oder bereits Kommentar des Evangelisten, ist offen – die antiken Handschriften kennen keine Anführungszeichen. „Welt“ (kosmos) meint bei Johannes sonst meist die von Gott abgewandte Menschheit; gerade ihr gilt hier die Liebe. Unmittelbar davor steht der Verweis auf die eherne Schlange in der Wüste (4. Mose 21): Ein Zeichen des Todes wird zum Zeichen der Rettung.',
    interpretations: [
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Der Vers gilt als „Evangelium im Kleinen“ (Luther): Gottes Liebe geht der menschlichen Entscheidung voraus, das Vertrauen empfängt sie.',
      },
      {
        tradition: 'Katholische Auslegung',
        text: 'Der Glaube wird als Beginn eines Weges verstanden, der sich in den Sakramenten und in der Liebe entfaltet.',
      },
      {
        tradition: 'Debatte um die Reichweite',
        text: 'Umstritten bleibt, wie exklusiv der Vers zu lesen ist. Manche betonen die Notwendigkeit ausdrücklichen Glaubens, andere die Weite von „die Welt“ und die Hoffnung, dass Gottes Wille zur Rettung niemanden von vornherein ausschließt.',
      },
    ],
    crossRefs: [
      { book: '4mo', chapter: 21, verse: 9 },
      { book: 'roem', chapter: 5, verse: 8 },
      { book: '1joh', chapter: 4, verse: 9 },
    ],
  },
  {
    book: 'joh',
    chapter: 14,
    from: 6,
    to: 6,
    title: '„Ich bin der Weg, die Wahrheit und das Leben“',
    historicalShort:
      'Der Satz fällt in den Abschiedsreden, unmittelbar nach der Ankündigung des Weggehens. Er ist zunächst Trostwort an verunsicherte Jünger, nicht eine Aussage über andere Religionen.',
    interpretations: [
      {
        tradition: 'Traditionelle Auslegung',
        text: 'Der Vers wird als Bekenntnis zur Einzigartigkeit Christi verstanden: In ihm ist der Zugang zu Gott eröffnet.',
      },
      {
        tradition: 'Dialogorientierte Theologie',
        text: 'Betont wird die Gesprächssituation: Der Satz ist Zuspruch an die eigene Gemeinde, nicht ein Urteil über Andersglaubende. Wie Gott mit ihnen handelt, bleibt seine Sache.',
      },
      {
        tradition: 'Exklusivistische Position',
        text: 'In Teilen evangelikaler Theologie wird der Vers als klare Aussage verstanden, dass Rettung ausschließlich über den ausdrücklichen Glauben an Christus erfolgt.',
      },
    ],
  },
  {
    book: 'apg',
    chapter: 2,
    from: 1,
    to: 13,
    title: 'Pfingsten: Sprachenwunder statt Sprachverwirrung',
    historicalShort:
      'Das Wochenfest (Schawuot) war eines der drei Wallfahrtsfeste; Jerusalem war voller Pilger aus dem ganzen Mittelmeerraum. Im Judentum wurde an diesem Fest zunehmend auch der Bundesschluss am Sinai gefeiert.',
    historicalLong:
      'Die Völkerliste in Apostelgeschichte 2 bildet die bekannte Welt ab. Lukas zeichnet damit bewusst eine Gegenszene zum Turmbau von Babel: Dort wurde die Sprache verwirrt, hier versteht jeder in seiner eigenen Sprache. Bemerkenswert ist, dass nicht alle ein Wunder sehen – manche halten die Gruppe für betrunken.',
    interpretations: [
      {
        tradition: 'Kirchengeschichtliche Deutung',
        text: 'Pfingsten gilt als „Geburtstag der Kirche“: aus einer Gruppe wird eine Bewegung, die Sprach- und Kulturgrenzen überschreitet.',
      },
      {
        tradition: 'Pfingstlich-charismatische Auslegung',
        text: 'Das Ereignis wird als Vorbild für die bleibende Ausrüstung mit dem Geist verstanden, einschließlich der Geistesgaben in der Gegenwart.',
      },
      {
        tradition: 'Missionstheologische Lesart',
        text: 'Der Geist übersetzt: Das Evangelium bindet sich nicht an eine heilige Sprache, sondern kommt in der Muttersprache der Menschen an – eine Grundlage für Bibelübersetzung überhaupt.',
      },
    ],
    crossRefs: [
      { book: '1mo', chapter: 11, verse: 7, note: 'Babel als Kontrast' },
      { book: 'joel', chapter: 3, verse: 1 },
    ],
  },
  {
    book: 'roem',
    chapter: 8,
    from: 28,
    to: 39,
    title: '„Denen, die Gott lieben, dienen alle Dinge zum Besten“',
    historicalShort:
      'Paulus schreibt an eine Gemeinde in der Hauptstadt des Reiches, in der Christen eine kleine, gesellschaftlich unsichere Minderheit waren. Der Abschnitt endet mit einer Aufzählung realer Bedrohungen: Trübsal, Verfolgung, Hunger, Schwert.',
    historicalLong:
      'Der berühmte Vers 28 ist sprachlich mehrdeutig. Möglich ist auch die Übersetzung „bei denen, die Gott lieben, wirkt Gott alles zum Guten“ – dann ist Gott das handelnde Subjekt, nicht „alle Dinge“. Diese Lesart vermeidet den Eindruck, jedes Ereignis sei an sich gut.',
    interpretations: [
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Der Text spricht vom Halten Gottes, nicht von einem Ausbleiben des Leids. Nichts kann trennen – das Leid wird nicht schöngeredet, sondern eingeordnet.',
      },
      {
        tradition: 'Seelsorgliche Warnung',
        text: 'Der Vers wird häufig unpassend verwendet, um Trauernden schnellen Trost zuzusprechen. Der Zusammenhang legt das Gegenteil nahe: Paulus benennt das Leid ausdrücklich.',
      },
      {
        tradition: 'Diskussion um Vorherbestimmung',
        text: 'Die Verse 29–30 sind zentral für die Lehre von der Erwählung. Reformierte Theologie liest sie als doppelte Prädestination, lutherische und katholische Auslegung betonen dagegen Gottes universalen Heilswillen.',
      },
    ],
  },
  {
    book: '1kor',
    chapter: 13,
    from: 1,
    to: 13,
    title: 'Das Hohelied der Liebe',
    historicalShort:
      'Der Text ist kein Hochzeitsgedicht, sondern steht mitten in einer Auseinandersetzung über Geistesgaben. In Korinth stritt man darüber, welche Fähigkeiten – besonders die Zungenrede – den höheren Rang haben.',
    historicalLong:
      'Paulus unterbricht die Sachdiskussion mit einem kunstvoll gebauten Zwischenstück und stellt die Rangfrage auf den Kopf: Nicht die spektakulärste Gabe zählt, sondern die Liebe, ohne die alles andere wertlos ist. Das griechische Wort agape meint nicht Gefühl, sondern zugewandtes Handeln. Der „Spiegel“ in Vers 12 war ein poliertes Metallstück – das Bild blieb notwendig unscharf.',
    interpretations: [
      {
        tradition: 'Exegetische Einordnung',
        text: 'Der Abschnitt ist Gemeindeethik: Er beschreibt, wie unterschiedlich Begabte zusammenleben, ohne einander abzuwerten.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Als Trautext ist der Text seit Jahrhunderten beliebt; die Übertragung auf die Ehe ist eine legitime Anwendung, nicht der ursprüngliche Zusammenhang.',
      },
      {
        tradition: 'Spirituelle Tradition',
        text: 'Die Eigenschaftsliste wird als Beschreibung der Liebe Gottes selbst gelesen – und damit als Maßstab, an dem sich menschliche Liebe orientiert.',
      },
    ],
    crossRefs: [{ book: '1kor', chapter: 12, verse: 31, note: 'Der Weg, der alles übertrifft' }],
  },
  {
    book: 'gal',
    chapter: 3,
    from: 26,
    to: 29,
    title: '„Hier ist nicht Jude noch Grieche“',
    historicalShort:
      'Der Satz stammt vermutlich aus einer frühen Taufformel. Er benennt die drei grundlegenden Trennungen der antiken Gesellschaft: Ethnie, Rechtsstatus und Geschlecht.',
    historicalLong:
      'Griechische Männer dankten in einem verbreiteten Spruch dafür, weder als Barbar noch als Sklave noch als Frau geboren zu sein. Paulus kehrt genau diese Dreiteilung um. Anlass des Briefes war die Forderung, nichtjüdische Christen müssten beschnitten werden – also die Frage, ob Zugehörigkeit von Herkunft und Ritus abhängt.',
    interpretations: [
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Vor Gott zählt keine Vorleistung. Der Vers wurde zum Kernargument gegen die Bedingung religiöser Zusatzleistungen.',
      },
      {
        tradition: 'Sozialgeschichtliche und feministische Auslegung',
        text: 'Der Vers gilt als Ausgangspunkt für die Gleichstellung in der Kirche – etwa in Debatten über Sklaverei im 19. Jahrhundert und über die Ordination von Frauen.',
      },
      {
        tradition: 'Einschränkende Position',
        text: 'Teile der Auslegung sehen die Aussage auf den Heilsstand bezogen und leiten daraus keine Aufhebung unterschiedlicher Rollen in Gemeinde und Familie ab. Diese Frage ist innerhalb der Kirchen bis heute umstritten.',
      },
    ],
    crossRefs: [{ book: 'kol', chapter: 3, verse: 11 }],
  },
  {
    book: 'eph',
    chapter: 2,
    from: 8,
    to: 10,
    title: 'Aus Gnade – und zu guten Werken',
    historicalShort:
      'Der Abschnitt fasst zusammen, was der Brief zuvor entfaltet: Zugehörigkeit zu Gott ist Geschenk. Unmittelbar danach folgt jedoch der Hinweis, dass Menschen „zu guten Werken geschaffen“ sind.',
    interpretations: [
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Ein Hauptbeleg für die Rechtfertigung allein aus Gnade durch den Glauben. Werke folgen aus der Rettung, sie begründen sie nicht.',
      },
      {
        tradition: 'Katholische Auslegung',
        text: 'Auch hier gilt die Gnade als Anfang und Grund. Betont wird die Fortsetzung in Vers 10: Der Glaube verwirklicht sich in der Liebe.',
      },
      {
        tradition: 'Ökumenische Verständigung',
        text: 'Die Gemeinsame Erklärung zur Rechtfertigungslehre (1999) hält fest, dass der jahrhundertealte Gegensatz in dieser Frage die Kirchen nicht länger trennen muss.',
      },
    ],
    crossRefs: [{ book: 'jak', chapter: 2, verse: 17, note: 'Der scheinbare Gegensatz' }],
  },
  {
    book: 'phil',
    chapter: 2,
    from: 5,
    to: 11,
    title: 'Der Christushymnus',
    historicalShort:
      'Der Abschnitt gilt als vorpaulinisches Lied, das Paulus zitiert – damit einer der ältesten christlichen Texte überhaupt, vermutlich älter als jedes Evangelium.',
    historicalLong:
      'Der Aufbau beschreibt eine Bewegung nach unten und wieder nach oben: Entäußerung bis zum Kreuz, dann Erhöhung. Die Kreuzigung war die Hinrichtungsart für Sklaven und Aufrührer; dass ein Loblied ausgerechnet diesen Tod besingt, war kulturell ungeheuerlich. Die Schlusszeile überträgt eine Aussage aus Jesaja 45, die dort ausdrücklich Gott gilt, auf Christus.',
    interpretations: [
      {
        tradition: 'Dogmatische Auslegung',
        text: 'Der Hymnus ist ein zentraler Text für die Zwei-Naturen-Lehre und für die Frage, was „Entäußerung“ (Kenosis) bedeutet.',
      },
      {
        tradition: 'Ethische Auslegung',
        text: 'Paulus zitiert das Lied nicht als Lehrstück, sondern als Begründung einer Haltung: Der Rahmen ist ein Aufruf, nicht auf den eigenen Vorteil zu sehen.',
      },
      {
        tradition: 'Politische Lesart',
        text: 'Das Bekenntnis „Jesus Christus ist der Herr“ stand in bewusster Spannung zur Formel „Caesar ist Herr“ und war damit auch eine politische Aussage.',
      },
    ],
    crossRefs: [{ book: 'jes', chapter: 45, verse: 23 }],
  },
  {
    book: 'hebr',
    chapter: 11,
    from: 1,
    to: 3,
    title: 'Was Glaube ist',
    historicalShort:
      'Der Satz leitet eine lange Reihe von Beispielen ein – von Abel bis zu namenlosen Verfolgten. Adressiert sind Menschen, die müde geworden sind und über einen Rückzug nachdenken.',
    interpretations: [
      {
        tradition: 'Klassische Auslegung',
        text: 'Glaube ist keine Meinung über unsichere Dinge, sondern belastbares Vertrauen, das Handeln trägt – im Text mit Bildern von Wanderschaft und Ausdauer beschrieben.',
      },
      {
        tradition: 'Sprachliche Beobachtung',
        text: 'Die griechischen Begriffe (hypostasis, elenchos) stammen aus der Rechts- und Wirtschaftssprache und bedeuten so viel wie „Grundlage“ und „Nachweis“ – Glaube als tragfähiger Boden.',
      },
    ],
  },
  {
    book: 'jak',
    chapter: 2,
    from: 14,
    to: 26,
    title: 'Glaube ohne Taten',
    historicalShort:
      'Der Abschnitt reagiert auf konkrete Missstände: In den Gemeinden wurden Wohlhabende bevorzugt, während Bedürftige mit frommen Worten abgespeist wurden.',
    historicalLong:
      'Der scheinbare Widerspruch zu Paulus löst sich weitgehend auf, wenn man die Begriffe vergleicht. Paulus wendet sich gegen „Werke des Gesetzes“ als Bedingung der Zugehörigkeit; Jakobus meint mit „Werken“ die praktische Nächstenliebe als Folge des Glaubens. Luther hielt den Brief dennoch für minderwertig und nannte ihn eine „stroherne Epistel“ – ein Urteil, dem die spätere lutherische Theologie überwiegend nicht gefolgt ist.',
    interpretations: [
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Die Taten sind Frucht, nicht Wurzel. Ein Glaube, der folgenlos bleibt, war nie lebendiger Glaube.',
      },
      {
        tradition: 'Katholische Auslegung',
        text: 'Der Text belegt, dass Glaube und Liebe zusammengehören und der Mensch in der Gnade tatsächlich mitwirkt.',
      },
      {
        tradition: 'Sozialethische Lesart',
        text: 'Das Beispiel ist bewusst materiell: Wer einem Frierenden „geht hin in Frieden“ sagt, ohne Kleidung zu geben, verspottet ihn.',
      },
    ],
    crossRefs: [{ book: 'eph', chapter: 2, verse: 8 }],
  },
  {
    book: '1joh',
    chapter: 4,
    from: 7,
    to: 21,
    title: '„Gott ist Liebe“',
    historicalShort:
      'Der Brief entsteht nach einer Spaltung: Eine Gruppe hat die Gemeinde verlassen. Vor diesem Hintergrund wird die Liebe zum Geschwister zum entscheidenden Prüfstein für die Echtheit des Glaubens.',
    interpretations: [
      {
        tradition: 'Dogmatische Auslegung',
        text: 'Der Satz ist keine Definition Gottes als Gefühl, sondern die Aussage, dass Gottes Wesen sich in seiner Zuwendung zeigt – sichtbar in der Sendung des Sohnes.',
      },
      {
        tradition: 'Ethische Auslegung',
        text: 'Der Text lässt keine Trennung zwischen Gottesliebe und Nächstenliebe zu: Wer den sichtbaren Bruder nicht liebt, kann den unsichtbaren Gott nicht lieben.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: '„Furcht ist nicht in der Liebe“ wird als Befreiung von einer Frömmigkeit gelesen, die von Angst vor Strafe lebt.',
      },
    ],
  },
  {
    book: 'offb',
    chapter: 21,
    from: 1,
    to: 8,
    title: 'Ein neuer Himmel und eine neue Erde',
    historicalShort:
      'Das Buch endet nicht mit einer Weltflucht, sondern mit einer Stadt, die auf die Erde herabkommt. Für bedrängte Gemeinden unter dem Druck des Kaiserkults war das eine Gegenvision zur ewigen Roma.',
    historicalLong:
      'Die Sprache ist bewusst aus dem Alten Testament gespeist, besonders aus Jesaja 65. Auffällig ist die Richtung: Nicht die Menschen steigen auf, sondern Gott zieht ein – „die Hütte Gottes bei den Menschen“. Dass „das Meer nicht mehr ist“, meint nicht das Verschwinden von Ozeanen, sondern das Ende der Chaosmacht, die im Alten Orient für Bedrohung stand.',
    interpretations: [
      {
        tradition: 'Kirchliche Hauptlinie',
        text: 'Die Bilder sind keine Zeittafel, sondern Trost- und Protestliteratur: Sie halten fest, dass Gewaltherrschaft nicht das letzte Wort behält.',
      },
      {
        tradition: 'Dispensationalistische Auslegung',
        text: 'In Teilen evangelikaler Theologie werden die Kapitel als Abfolge künftiger Ereignisse gelesen. Die meisten Kirchen teilen diese Lesart nicht.',
      },
      {
        tradition: 'Schöpfungstheologische Lesart',
        text: 'Betont wird, dass die Erde erneuert und nicht ersetzt wird – ein Argument gegen die Gleichgültigkeit gegenüber der Schöpfung.',
      },
    ],
    crossRefs: [
      { book: 'jes', chapter: 65, verse: 17 },
      { book: '1mo', chapter: 2, verse: 9 },
    ],
  },
];

/** Artikel, die den angegebenen Vers abdecken. */
export function commentaryFor(book: string, chapter: number, verse: number): CommentaryEntry[] {
  return COMMENTARY.filter(
    (e) => e.book === book && e.chapter === chapter && verse >= e.from && verse <= e.to,
  );
}

/** Verse eines Kapitels, zu denen ein Artikel vorliegt. */
export function annotatedVerses(book: string, chapter: number): Set<number> {
  const result = new Set<number>();
  for (const entry of COMMENTARY) {
    if (entry.book !== book || entry.chapter !== chapter) continue;
    for (let v = entry.from; v <= entry.to; v++) result.add(v);
  }
  return result;
}
