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

import { DATINGS, datingKey, type Dating } from './datings';

export type { Dating };

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
  /**
   * Zeitliche Einordnung. Sie steht nicht hier im Artikel, sondern in
   * `datings.ts`, und wird von `commentaryFor` angehängt.
   */
  dating?: Dating;
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
    historicalLong:
      'Der Aufbau ist streng: vier Strophen zu je sechs Versen über Wissen, Gegenwart, Werden und schließlich die Bitte um Prüfung. Die Bildwelt greift die damals bekannten Grenzen der Welt auf – Himmel, Totenreich, der Osten des Sonnenaufgangs, das Meer im Westen. „Im Verborgenen gebildet, gewirkt unten in der Erde“ ist eine ungewöhnliche Wendung: Der Mutterleib wird mit dem Erdinneren verglichen, dem Ort, aus dem nach 1. Mose 2 der Mensch geformt wurde. Der Schluss dreht die Richtung um: Nachdem der Beter zwanzig Verse lang beschrieben hat, wie durchschaut er ist, bittet er ausdrücklich darum, geprüft zu werden.',
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
    historicalLong:
      'Das hebräische Wort für „Herz“ meint nicht das Gefühl, sondern den Ort des Nachdenkens und Entscheidens – näher an „Verstand“ als an „Empfindung“. Wörtlich steht da: „Stütze dich nicht auf deine eigene Einsicht.“ Gemeint ist also nicht der Verzicht aufs Denken, sondern auf dessen Verabsolutierung. Auffällig ist die Fortsetzung wenige Verse später: Wer weise ist, soll sich nicht für weise halten. Die Sprüche misstrauen der Selbstsicherheit durchgehend – nicht der Klugheit.',
    interpretations: [
      {
        tradition: 'Weisheitliche Auslegung',
        text: 'Sprichwörter sind Erfahrungsregeln, keine Versprechen. Das Buch Hiob und der Prediger stehen bewusst als Korrektiv daneben.',
      },
      {
        tradition: 'Frömmigkeitstradition',
        text: 'Der Vers gehört zu den meistzitierten Bibelworten bei Lebensentscheidungen und wird als Zusage der Wegführung verstanden.',
      },
      {
        tradition: 'Sprachliche Beobachtung',
        text: 'Das mit „Wege“ übersetzte Wort meint im Hebräischen das ganz konkrete Unterwegssein. Gemeint ist keine geheime Führung, sondern ein gangbarer Weg.',
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
    historicalLong:
      'Die Steigerung davor ist bewusst absurd: erst Kälber, dann tausend Widder, dann zehntausend Bäche Öl – und schließlich der eigene erstgeborene Sohn. Damit ist genau die Praxis benannt, die in der Umwelt Israels vorkam und die die Propheten scharf ablehnten. Die Antwort verlangt dagegen nichts, was man abliefern könnte. Die drei Forderungen sind unterschiedlich gebaut: Recht wird „getan“, Güte wird „geliebt“, und mit Gott geht man „demütig“ – Handlung, Haltung und Beziehung.',
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
    historicalLong:
      'Ausgelöst wird er durch eine praktische Frage des Thomas: „Wie können wir den Weg wissen?“ Die Antwort verschiebt die Ebene – gefragt war nach einer Route, geantwortet wird mit einer Person. Das johanneische Evangelium entstand in einer Gemeinde, die sich gerade schmerzhaft von der Synagoge trennte; viele seiner scharfen Abgrenzungen sind aus dieser Lage heraus formuliert. Wer sie heute liest, muss diesen Entstehungszusammenhang mitbedenken, gerade weil solche Sätze historisch zur Abwertung anderer benutzt wurden.',
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
      // Achtung: Der Datensatz folgt der englischen Zählung. Die Ausgießung
      // des Geistes steht hier in Joel 2,28 (Luther-Zählung: 3,1).
      { book: 'joel', chapter: 2, verse: 28 },
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
    historicalLong:
      'Das griechische Wort für „Werk“ in Vers 10 ist poiema – davon kommt „Poesie“. Der Mensch erscheint als Gedicht Gottes, nicht als dessen Werkzeug. Grammatisch ist umstritten, worauf sich „das“ in „das nicht aus euch“ bezieht: auf den Glauben, auf die Rettung oder auf den ganzen Vorgang. Die griechische Form spricht eher für Letzteres. Der unmittelbare Zusammenhang zielt zudem nicht auf den Einzelnen, sondern auf die Gemeinde: Wenige Verse später geht es um die niedergerissene Trennmauer zwischen Juden und Nichtjuden.',
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
    historicalLong:
      'Bemerkenswert ist der Schluss des Kapitels: Nach der langen Aufzählung heißt es, dass sie alle das Verheißene gerade **nicht** erlangt haben. Glaube wird hier also nicht am Erfolg gemessen. Die Beispielreihe wird zunehmend dunkler – am Ende stehen Menschen, die zersägt, gesteinigt und in Fellen umhergetrieben wurden. Der Verfasser ist unbekannt; schon Origenes schrieb im 3. Jahrhundert, das wisse „Gott allein“.',
    interpretations: [
      {
        tradition: 'Klassische Auslegung',
        text: 'Glaube ist keine Meinung über unsichere Dinge, sondern belastbares Vertrauen, das Handeln trägt – im Text mit Bildern von Wanderschaft und Ausdauer beschrieben.',
      },
      {
        tradition: 'Sprachliche Beobachtung',
        text: 'Die griechischen Begriffe (hypostasis, elenchos) stammen aus der Rechts- und Wirtschaftssprache und bedeuten so viel wie „Grundlage“ und „Nachweis“ – Glaube als tragfähiger Boden.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Der Kapitelschluss hält fest, dass keiner der Genannten das Verheißene erlebt hat. Glaube wird hier ausdrücklich nicht am Eintreffen gemessen.',
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
    historicalLong:
      'Der Satz „Gott ist Liebe“ steht zweimal – und beide Male nicht als Definition am Anfang, sondern als Schlussfolgerung aus dem, was Gott getan hat. Das griechische agape war vor dem Neuen Testament ein eher farbloses Wort; erst hier bekommt es sein Gewicht. Der Umkehrschluss wird ausdrücklich abgewehrt: Nicht „Liebe ist Gott“, sondern Gott zeigt sich als der, der zuerst liebt. Der Brief argumentiert dabei bewusst greifbar: Der unsichtbare Gott und der sichtbare Bruder lassen sich nicht gegeneinander ausspielen.',
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

  /* ------------------------------------------------- Psalmen (Ausbau) */

  {
    book: 'ps',
    chapter: 1,
    from: 1,
    to: 6,
    title: 'Das Tor zum Psalter',
    historicalShort:
      'Psalm 1 ist kein Gebet, sondern eine Einleitung: Er stellt dem ganzen Buch zwei Wege gegenüber. Das Bild vom Baum am Wasserlauf stammt aus einer Region, in der Wasser über Leben und Tod entscheidet.',
    historicalLong:
      'Die Endredaktion des Psalters hat diesen Text bewusst vorangestellt: Wer die 150 Psalmen betet, soll sie als „Weisung“ (Tora) lesen. Der Baum steht nicht am Fluss zufällig, sondern ist „gepflanzt“ – ein Passiv, das auf Gott als Handelnden verweist. Die Gegenüberstellung von Gerechten und Gottlosen ist typisch für die Weisheitsliteratur.',
    interpretations: [
      {
        tradition: 'Weisheitliche Auslegung',
        text: 'Die beiden Wege sind kein Urteil über Personen, sondern eine Einladung: Es macht einen Unterschied, woran man sich ausrichtet.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Das Tun-Ergehen-Schema dieses Psalms wird innerhalb der Bibel selbst hinterfragt – Hiob und Psalm 73 widersprechen der Erfahrung nach offen.',
      },
      {
        tradition: 'Christliche Tradition',
        text: 'Die Alte Kirche las den „Mann“ von Vers 1 auch auf Christus hin, der die Weisung vollkommen erfüllt.',
      },
    ],
    crossRefs: [
      { book: 'jer', chapter: 17, verse: 8, note: 'Fast wörtlich dasselbe Bild' },
      { book: 'ps', chapter: 73, verse: 3, note: 'Der Widerspruch zur Erfahrung' },
    ],
  },
  {
    book: 'ps',
    chapter: 22,
    from: 1,
    to: 31,
    title: '„Mein Gott, warum hast du mich verlassen?“',
    historicalShort:
      'Ein Klagepsalm, der mit dem schärfsten Vorwurf der Bibel beginnt und in einem Loblied endet. Diese Bewegung von der Klage zum Dank ist die häufigste Form im Psalter.',
    historicalLong:
      'Die Bilder – durchgrabene Hände und Füße, verteilte Kleider, das Los über das Gewand – sind Metaphern für äußerste Erniedrigung, wie sie in altorientalischer Klagedichtung verbreitet waren. Die Evangelien greifen sie in den Passionsberichten auf. Der Umschlag in Vers 22 erfolgt ohne Erklärung: Der Beter hat offenbar eine Zusage empfangen, die der Text nicht wiedergibt.',
    interpretations: [
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der Psalm gilt als Gebet eines schwer leidenden Einzelnen, in dem sich das ganze Volk wiederfinden kann. Im Judentum wird er auch mit Ester und der Purim-Erzählung verbunden.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Jesu Ruf am Kreuz zitiert den ersten Vers. Wer den ganzen Psalm mithört, hört darin nicht nur Verzweiflung, sondern ein Gebet, das auf Rettung zuläuft.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Entscheidend ist, dass der Vorwurf selbst als Gebet gilt: Die Bibel erlaubt es, Gott sein Schweigen vorzuhalten.',
      },
    ],
    crossRefs: [
      { book: 'mk', chapter: 15, verse: 34 },
      { book: 'joh', chapter: 19, verse: 24 },
    ],
  },
  {
    book: 'ps',
    chapter: 51,
    from: 1,
    to: 19,
    title: 'Das Bußgebet nach schwerer Schuld',
    historicalShort:
      'Die Überschrift verbindet den Psalm mit Davids Vergehen an Batseba und dem Mord an Uria. Bemerkenswert ist, dass der Beter keine Wiedergutmachung anbietet, sondern allein um Neuschöpfung bittet.',
    historicalLong:
      'Das hebräische Wort für „schaffe“ in Vers 10 ist dasselbe wie in 1. Mose 1 – es wird in der Bibel ausschließlich für Gottes Handeln verwendet. Am Ende steht ein überraschender Satz: Opfer will Gott nicht, sondern „ein zerschlagenes Herz“. Die Verse 18–19, die den Tempelkult wieder aufwerten, gelten vielen Fachleuten als spätere Ergänzung aus der Zeit des Wiederaufbaus.',
    interpretations: [
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Einer der sieben Bußpsalmen und ein Kerntext Luthers: Der Mensch kann seine Schuld nicht selbst beheben, er kann nur um Erneuerung bitten.',
      },
      {
        tradition: 'Prophetische Linie',
        text: 'Die Ablehnung des Opfers steht in einer Reihe mit Amos, Hosea und Micha: Haltung geht dem Ritus voraus.',
      },
      {
        tradition: 'Historische Einordnung',
        text: 'Die Zuschreibung an David in der Überschrift stammt aus späterer Zeit; sie deutet den Psalm, statt seine Entstehung zu dokumentieren.',
      },
    ],
    crossRefs: [{ book: '2sam', chapter: 12, verse: 13, note: 'Die Szene mit Nathan' }],
  },
  {
    book: 'ps',
    chapter: 121,
    from: 1,
    to: 8,
    title: 'Ein Lied für unterwegs',
    historicalShort:
      'Einer der fünfzehn Wallfahrtspsalmen, gesungen auf dem Weg hinauf nach Jerusalem. Die Berge im ersten Vers sind keine romantische Kulisse, sondern der gefährliche Teil der Reise.',
    historicalLong:
      'Auf den Höhen standen fremde Heiligtümer – die Frage „Woher kommt mir Hilfe?“ ist deshalb eine echte Alternative: von den Höhenkulten oder vom Schöpfer? Die Antwort fällt eindeutig aus. Der Psalm ist als Wechselrede gebaut: Ein Einzelner fragt, eine andere Stimme antwortet ihm zusprechend.',
    interpretations: [
      {
        tradition: 'Liturgische Tradition',
        text: 'Als Segenswort bei Reisen, Aussendungen und Bestattungen weit verbreitet.',
      },
      {
        tradition: 'Exegetische Beobachtung',
        text: 'Das hebräische Wort für „behüten“ steht sechsmal – der Psalm sagt in kurzer Form immer wieder dasselbe zu.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die Zusage „kein Übel wird dir begegnen“ hat sich für viele nicht bewahrheitet. Ausgelegt wird sie deshalb meist als Zusage von Begleitung, nicht von Unversehrtheit.',
      },
    ],
  },
  {
    book: 'ps',
    chapter: 137,
    from: 1,
    to: 9,
    title: 'An den Wassern Babels – und der Schlussvers',
    historicalShort:
      'Der Psalm stammt aus der Exilszeit und beschreibt die Demütigung, den Siegern zur Unterhaltung vorsingen zu sollen. Er endet mit einem Fluch über die Kinder der Feinde – einem der verstörendsten Sätze der Bibel.',
    historicalLong:
      'Der letzte Vers greift eine grausame Kriegspraxis der Zeit auf, die Israel selbst erlitten hatte. In vielen Gesangbüchern und Leseordnungen wird der Psalm gekürzt. Die Frage, ob man solche Verse auslassen darf, gehört zu den offenen Streitpunkten der Liturgiegeschichte.',
    interpretations: [
      {
        tradition: 'Verteidigende Lesart',
        text: 'Der Fluch wird ausgesprochen, nicht ausgeführt: Der Beter übergibt seine Rachegedanken an Gott, statt selbst zu handeln. Das Aussprechen vor Gott ist die Alternative zur Tat.',
      },
      {
        tradition: 'Kritische Lesart',
        text: 'Andere halten die Verharmlosung für unredlich: Der Vers bleibt ein Gewaltwunsch und darf als solcher benannt und zurückgewiesen werden.',
      },
      {
        tradition: 'Liturgische Praxis',
        text: 'Die meisten Kirchen lassen Vers 9 im Gottesdienst aus. Im Studium wird er bewusst gelesen, weil er zeigt, wie ungeschönt die Bibel Traumatisierung abbildet.',
      },
    ],
  },

  /* --------------------------------------------- Evangelien (Ausbau) */

  {
    book: 'lk',
    chapter: 1,
    from: 46,
    to: 55,
    title: 'Das Magnificat – Marias Lied',
    historicalShort:
      'Das Lied einer jungen Frau aus einem unbedeutenden Dorf ist politisch: Es besingt einen Gott, der Mächtige vom Thron stürzt und Hungernde sättigt. Sprachlich ist es dem Lied der Hanna aus 1. Samuel 2 nachgebildet.',
    historicalLong:
      'Die Verben stehen im Perfekt – die Umwälzung wird besungen, als sei sie schon geschehen. Das Lied wurde deshalb in verschiedenen Epochen als so brisant empfunden, dass sein öffentlicher Vortrag zeitweise eingeschränkt wurde, etwa während der britischen Kolonialherrschaft in Indien und unter der Militärdiktatur in Argentinien.',
    interpretations: [
      {
        tradition: 'Liturgische Tradition',
        text: 'Das Magnificat gehört seit dem frühen Mittelalter zum täglichen Abendgebet der Kirche.',
      },
      {
        tradition: 'Befreiungstheologie',
        text: 'Gelesen als Programm: Gottes Zuwendung zu den Armen ist keine innere Haltung, sondern verändert Verhältnisse.',
      },
      {
        tradition: 'Marianische Frömmigkeit',
        text: 'In der katholischen und orthodoxen Tradition gilt Maria hier als Urbild des Glaubens – als die, die Gottes Handeln zustimmt.',
      },
    ],
    crossRefs: [{ book: '1sam', chapter: 2, verse: 1, note: 'Das Vorbild: Hannas Lied' }],
  },
  {
    book: 'lk',
    chapter: 2,
    from: 1,
    to: 20,
    title: 'Die Weihnachtsgeschichte',
    historicalShort:
      'Lukas datiert die Geburt durch eine Volkszählung unter Kaiser Augustus. Die Hirten sind kein romantisches Beiwerk: Ihr Beruf galt als unrein, ihr Zeugnis vor Gericht als wertlos.',
    historicalLong:
      'Die historische Einordnung wirft Fragen auf: Die von Quirinius durchgeführte Zählung ist für das Jahr 6 n. Chr. bezeugt, während Herodes der Große 4 v. Chr. starb. Die Forschung diskutiert das seit langem ohne abschließendes Ergebnis. Lukas geht es erkennbar um eine Gegenüberstellung: Augustus trug die Titel „Retter“ und „Bringer des Friedens“ – genau diese Worte sprechen die Engel über einem Kind in einer Futterkrippe aus. Von einem Stall ist im Text übrigens nie die Rede.',
    interpretations: [
      {
        tradition: 'Politische Lesart',
        text: 'Die Erzählung stellt dem römischen Friedensversprechen einen anderen Frieden entgegen – und beginnt ihn ganz unten.',
      },
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Kindheitsgeschichten bei Lukas und Matthäus unterscheiden sich stark. Sie werden als theologische Deutungen der Herkunft Jesu gelesen, nicht als Protokoll.',
      },
      {
        tradition: 'Kirchliche Verkündigung',
        text: 'Im Zentrum steht die Menschwerdung: Gott kommt nicht in die Zentren der Macht, sondern an ihren Rand.',
      },
    ],
  },
  {
    book: 'mk',
    chapter: 4,
    from: 35,
    to: 41,
    title: 'Der Sturm auf dem See',
    historicalShort:
      'Der See Gennesaret liegt rund 210 Meter unter dem Meeresspiegel; Fallwinde von den Golanhöhen erzeugen dort in kurzer Zeit hohe Wellen. Mehrere Jünger waren Fischer und kannten die Gefahr genau.',
    historicalLong:
      'Im Alten Testament ist das tobende Meer Bild der Chaosmacht, die allein Gott bändigt. Wenn Jesus den Wind „bedroht“ – dasselbe Wort wie bei Dämonenaustreibungen – nimmt Markus diese Linie auf. Die Frage der Jünger am Schluss, „Wer ist dieser?“, bleibt unbeantwortet und trägt das ganze Evangelium bis zum Bekenntnis unter dem Kreuz.',
    interpretations: [
      {
        tradition: 'Christologische Auslegung',
        text: 'Die Szene ordnet Jesus dem zu, was das Alte Testament allein Gott zuschreibt: Herrschaft über das Chaos.',
      },
      {
        tradition: 'Auslegung auf die Gemeinde hin',
        text: 'Das Boot wurde früh als Bild der Kirche in Bedrängnis gelesen – der scheinbar schlafende Gott ist eine Grunderfahrung des Glaubens.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Vorwurf der Jünger („Fragst du nichts danach?“) wird im Text nicht getadelt, sondern ernst genommen.',
      },
    ],
    crossRefs: [{ book: 'ps', chapter: 107, verse: 29 }],
  },
  {
    book: 'mt',
    chapter: 25,
    from: 31,
    to: 46,
    title: 'Das Weltgericht: „Was ihr getan habt einem unter diesen Geringsten“',
    historicalShort:
      'Die letzte große Rede bei Matthäus endet nicht mit einer Glaubensprüfung, sondern mit einer Liste konkreter Taten: Essen, Trinken, Kleidung, Besuch im Gefängnis. Beide Gruppen sind gleichermaßen überrascht.',
    historicalLong:
      'Umstritten ist, wer „diese meine geringsten Brüder“ sind. Traditionell werden alle Notleidenden verstanden; ein Teil der neueren Exegese liest die Wendung enger als Bezeichnung für die umherziehenden Boten der Gemeinde. Die weite Deutung prägt seit der Alten Kirche die christliche Armenfürsorge und ist bis heute die verbreitetste.',
    interpretations: [
      {
        tradition: 'Kirchliche Hauptlinie',
        text: 'Christus begegnet in den Bedürftigen selbst. Der Text begründet Diakonie und Caritas als Kern des Glaubens, nicht als Zusatz.',
      },
      {
        tradition: 'Engere exegetische Lesart',
        text: 'Bezogen auf die Aufnahme der Missionare, die in Armut unterwegs waren – die Völker werden danach beurteilt, wie sie den Boten begegnet sind.',
      },
      {
        tradition: 'Reformatorische Rückfrage',
        text: 'Der Text scheint Werken das Urteil zu überlassen. Die Antwort lautet meist: Die Handelnden wissen gerade nicht, dass sie Christus begegnen – es ist keine Leistung, die man verrechnen kann.',
      },
    ],
    crossRefs: [{ book: 'jak', chapter: 2, verse: 15 }],
  },
  {
    book: 'joh',
    chapter: 8,
    from: 1,
    to: 11,
    title: 'Die Frau, die beim Ehebruch ertappt wurde',
    historicalShort:
      'Die Szene ist eine Falle: Stimmt Jesus der Steinigung zu, gerät er in Konflikt mit dem römischen Recht, das Todesurteile den Statthaltern vorbehielt; lehnt er ab, stellt er sich gegen die Tora. Auffällig ist, dass der beteiligte Mann nicht vorgeführt wird.',
    historicalLong:
      'Der Abschnitt fehlt in den ältesten Handschriften des Johannesevangeliums und taucht in einigen Textzeugen an anderer Stelle auf, teils bei Lukas. Fachleute gehen deshalb überwiegend davon aus, dass er ursprünglich nicht zu diesem Evangelium gehörte – zugleich wird er meist als sehr alte, wahrscheinlich authentische Überlieferung eingeschätzt. Viele Bibelausgaben markieren ihn deshalb, drucken ihn aber ab.',
    interpretations: [
      {
        tradition: 'Ethische Auslegung',
        text: 'Der Satz vom ersten Stein entzieht der Selbstgerechtigkeit den Boden, ohne die Tat gutzuheißen – der Schluss enthält beides: „So verdamme ich dich auch nicht“ und „sündige hinfort nicht mehr“.',
      },
      {
        tradition: 'Textkritische Einordnung',
        text: 'Die unsichere Überlieferung wird offen benannt. Sie ändert nichts an der Wirkungsgeschichte: Kaum ein Text hat das christliche Verständnis von Barmherzigkeit stärker geprägt.',
      },
      {
        tradition: 'Feministische Auslegung',
        text: 'Hervorgehoben wird die Asymmetrie: Nur die Frau wird öffentlich vorgeführt, obwohl die Tora beide Beteiligten nennt.',
      },
    ],
  },
  {
    book: 'joh',
    chapter: 20,
    from: 24,
    to: 29,
    title: 'Thomas – der Zweifel als Teil des Glaubens',
    historicalShort:
      'Thomas verlangt nichts anderes, als die übrigen Jünger bereits erlebt hatten: den Auferstandenen zu sehen. Der Text erzählt nicht, dass er die Wunden tatsächlich berührt.',
    historicalLong:
      'Die Wunden bleiben – das ist die stille Pointe der Szene. Der Auferstandene ist nicht der Unversehrte, sondern der Gezeichnete. Das Bekenntnis „Mein Herr und mein Gott“ war zugleich politisch heikel: Nach Sueton ließ sich Kaiser Domitian, unter dem das Evangelium vermutlich entstand, als „dominus et deus“ anreden. Wer den Satz zu Jesus sagte, sprach ihn einem anderen ab. Das Evangelium endet unmittelbar danach mit der Bemerkung, all dies sei geschrieben, damit die Lesenden glauben – Thomas steht also stellvertretend für sie.',
    interpretations: [
      {
        tradition: 'Klassische Auslegung',
        text: 'Das Bekenntnis „Mein Herr und mein Gott“ ist der Höhepunkt des Evangeliums – die deutlichste Aussage über Jesus im ganzen Buch.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Beiname „der Ungläubige“ ist eine spätere Zuschreibung. Der Text zeigt einen, der ernst nimmt, was er glauben soll – und dem seine Frage nicht vorgeworfen wird.',
      },
      {
        tradition: 'Auslegung auf die Leser hin',
        text: 'Der Schlusssatz richtet sich an spätere Generationen, die nicht mehr sehen können – und damit ausdrücklich an die Lesenden.',
      },
    ],
  },
  {
    book: 'mt',
    chapter: 28,
    from: 16,
    to: 20,
    title: 'Der Missionsbefehl',
    historicalShort:
      'Die letzten Verse des Matthäusevangeliums enthalten einen bemerkenswerten Nebensatz: „Etliche aber zweifelten.“ Der Auftrag ergeht an eine Gruppe, die sich ihrer Sache nicht einig ist.',
    historicalLong:
      'Die dreigliedrige Taufformel gehört zu den frühesten Belegen dieser Form; in der Apostelgeschichte wird dagegen „auf den Namen Jesu“ getauft. Das Verb „macht zu Jüngern“ ist der einzige Imperativ im Satz – „gehen“, „taufen“ und „lehren“ sind ihm sprachlich untergeordnet.',
    interpretations: [
      {
        tradition: 'Missionsgeschichtliche Wirkung',
        text: 'Der Text begründete die weltweite Missionsbewegung. Seine Wirkungsgeschichte ist zwiespältig: Er wurde auch zur Rechtfertigung kolonialer Gewalt herangezogen.',
      },
      {
        tradition: 'Neuere Missionstheologie',
        text: 'Betont wird „lehren, alles zu halten“ – Mission als Einladung zu einer Lebensform, nicht als Übernahme fremder Kulturen.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der letzte Satz ist keine Aufgabe, sondern eine Zusage: „Ich bin bei euch alle Tage.“ Das Evangelium endet mit einer Anwesenheit, nicht mit einem Abschied.',
      },
    ],
    crossRefs: [{ book: 'apg', chapter: 1, verse: 8 }],
  },

  /* ------------------------------------------ Altes Testament (Ausbau) */

  {
    book: '1mo',
    chapter: 22,
    from: 1,
    to: 19,
    title: 'Die Bindung Isaaks',
    historicalShort:
      'Der Text gehört zu den verstörendsten der Bibel. Kinderopfer waren in der Umwelt Israels bezeugt; die Erzählung endet damit, dass genau das abgewehrt wird.',
    historicalLong:
      'Auffällig ist die Kargheit: kein Wort über Abrahams Gefühle, kein Wort über Saras Reaktion, und nach der Szene gehen Vater und Sohn getrennte Wege – von einer gemeinsamen Rückkehr ist nicht die Rede. Das Wort „Moria“ wird später mit dem Tempelberg gleichgesetzt. Im Judentum heißt der Abschnitt „Akeda“ (Bindung), nicht „Opferung“; der Akzent liegt dort auf Isaak, nicht auf Abraham.',
    interpretations: [
      {
        tradition: 'Religionsgeschichtliche Lesart',
        text: 'Die Erzählung wird als Absage an das Kinderopfer verstanden: Was in der Umwelt gefordert wurde, lehnt dieser Gott ausdrücklich ab.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der Blick richtet sich auf Isaak als Erwachsenen, der einwilligt. Die Akeda gilt als Inbegriff der Bereitschaft, für den Glauben alles zu geben, und wird an Neujahr gelesen.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Früh wurde die Szene auf den Kreuzestod bezogen: der einzige Sohn, das Holz, der Berg. Die Parallele ist eine spätere Deutung, nicht der ursprüngliche Sinn.',
      },
      {
        tradition: 'Philosophischer Einspruch',
        text: 'Kant lehnte den Gehorsam Abrahams ausdrücklich ab, Kierkegaard machte ihn zum Kernfall des Glaubens jenseits der Vernunft. Der Text bleibt in der Ethik ein offener Streitpunkt.',
      },
    ],
    crossRefs: [
      { book: 'jer', chapter: 7, verse: 31, note: 'Gott verabscheut Kinderopfer' },
      { book: 'hebr', chapter: 11, verse: 17 },
    ],
  },
  {
    book: '2mo',
    chapter: 14,
    from: 1,
    to: 31,
    title: 'Der Durchzug durch das Meer',
    historicalShort:
      'Das hebräische „jam suf“ heißt wörtlich „Schilfmeer“, nicht „Rotes Meer“ – die verbreitete Übersetzung geht auf die griechische Bibel zurück. Gemeint ist vermutlich ein flaches Sumpfgebiet im östlichen Nildelta.',
    historicalLong:
      'Der Text enthält zwei ineinandergeschobene Darstellungen: In der einen treibt ein Ostwind das Wasser zurück, in der anderen stehen die Fluten wie Mauern. Die Forschung sieht darin verschiedene Überlieferungsstränge. Das Lied in Kapitel 15 gilt sprachlich als einer der ältesten Texte der Bibel überhaupt.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Außerägyptische Belege fehlen. Als Kern wird eine Rettungserfahrung einer kleinen Gruppe angenommen, die zur Gründungserzählung des ganzen Volkes wurde.',
      },
      {
        tradition: 'Jüdische Tradition',
        text: 'Der Durchzug wird jedes Jahr beim Passa vergegenwärtigt: Jeder soll sich so verstehen, als wäre er selbst aus Ägypten gezogen.',
      },
      {
        tradition: 'Befreiungstheologie',
        text: 'Der Exodus gilt als Grundmuster: Gott ergreift Partei gegen ein Unterdrückungssystem – ein Text, der in vielen Freiheitsbewegungen zitiert wurde.',
      },
    ],
    crossRefs: [{ book: 'jes', chapter: 43, verse: 16 }],
  },
  {
    book: '1sam',
    chapter: 17,
    from: 1,
    to: 54,
    title: 'David und Goliat',
    historicalShort:
      'Die Szene ist als Zweikampf zwischen Vorkämpfern erzählt – eine im Alten Orient bezeugte Form, die eine Feldschlacht ersetzen konnte. Die Schleuder war keine Kinderwaffe, sondern eine Fernwaffe mit erheblicher Durchschlagskraft.',
    historicalLong:
      'Goliats Ausrüstung wird auffallend genau beschrieben und entspricht eher griechischer als philistäischer Bewaffnung. Seine Größe von „sechs Ellen und einer Handbreit“ ergäbe rund 2,90 m; die griechische Überlieferung nennt vier Ellen, also etwa 2 m. In 2. Samuel 21,19 wird der Sieg über Goliat einem gewissen Elhanan zugeschrieben – ein bekanntes Rätsel der Textüberlieferung.',
    interpretations: [
      {
        tradition: 'Erzählerische Lesart',
        text: 'Die Pointe liegt im Verzicht auf die Rüstung: David gewinnt gerade nicht mit den Mitteln des Stärkeren.',
      },
      {
        tradition: 'Historische Einordnung',
        text: 'Die Erzählung ist literarisch geformt und will keine Schlachtbeschreibung sein. Die abweichende Notiz in 2. Samuel zeigt, dass verschiedene Überlieferungen nebeneinander bestanden.',
      },
      {
        tradition: 'Wirkungsgeschichte',
        text: 'Kaum ein biblisches Bild wurde häufiger politisch beansprucht – von beiden Seiten eines Konflikts zugleich.',
      },
    ],
    crossRefs: [{ book: '2sam', chapter: 21, verse: 19, note: 'Die abweichende Notiz' }],
  },
  {
    book: '2sam',
    chapter: 12,
    from: 1,
    to: 15,
    title: 'Nathan stellt den König',
    historicalShort:
      'Ein Prophet klagt den amtierenden König des Mordes an – im Alten Orient beispiellos. Nathan geht dabei über eine Erzählung vor: David spricht das Urteil, bevor er merkt, dass er selbst gemeint ist.',
    historicalLong:
      'Das Gleichnis arbeitet mit einem juristischen Kunstgriff: David wird als oberster Richter angerufen und fällt sein Urteil unbefangen – vierfacher Ersatz, wie ihn 2. Mose 22 für ein gestohlenes Schaf vorsieht. Erst dann fällt der Satz „Du bist der Mann“. In den Königsinschriften Ägyptens und Mesopotamiens gibt es nichts Vergleichbares: Herrscher wurden dort verherrlicht, nicht angeklagt. Dass Israel diese Erzählung über seinen größten König bewahrt hat, ist selbst bemerkenswert.',
    interpretations: [
      {
        tradition: 'Politische Lesart',
        text: 'Der Text hält fest, dass auch der König dem Recht unterworfen bleibt – eine der frühesten Formulierungen dieses Gedankens.',
      },
      {
        tradition: 'Literarische Beobachtung',
        text: 'Das Gleichnis wirkt, weil es die Abwehr umgeht: Wer über einen Fremden urteilt, urteilt unbefangen. „Du bist der Mann“ ist der Umschlagpunkt.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Dass das Kind für Davids Schuld stirbt, widerspricht dem später ausdrücklich formulierten Grundsatz, dass niemand für die Schuld eines anderen haftet.',
      },
    ],
    crossRefs: [
      { book: 'ps', chapter: 51, verse: 1 },
      { book: 'hes', chapter: 18, verse: 20, note: 'Niemand haftet für fremde Schuld' },
    ],
  },
  {
    book: '1koe',
    chapter: 18,
    from: 20,
    to: 46,
    title: 'Elia auf dem Karmel',
    historicalShort:
      'Der Karmel liegt an der Grenze zum phönizischen Gebiet – ein umstrittener Ort zwischen zwei Kulten. Baal galt als Wettergott, der Regen gibt; deshalb ist die Dürre der eigentliche Streitpunkt.',
    historicalLong:
      'Elias Spott über den schlafenden oder verreisten Baal greift Züge auf, die in ugaritischen Texten tatsächlich von Baal erzählt werden. Die Tötung der Baalspropheten am Ende gehört zu den Stellen, die in der Auslegung durchgehend als schwierig gelten und heute meist ausdrücklich nicht als Vorbild verstanden werden.',
    interpretations: [
      {
        tradition: 'Religionsgeschichtliche Einordnung',
        text: 'Die Erzählung spiegelt einen realen Kulturkampf im Nordreich unter Ahab und der phönizischen Königin Isebel.',
      },
      {
        tradition: 'Theologische Auslegung',
        text: 'Die Frage „Wie lange hinkt ihr auf beiden Seiten?“ zielt nicht auf Religionswechsel, sondern auf Eindeutigkeit.',
      },
      {
        tradition: 'Kritische Lesart',
        text: 'Der Triumph endet unmittelbar im Zusammenbruch: Kapitel 19 zeigt Elia am Ende seiner Kraft. Die Erzählung selbst relativiert den Sieg.',
      },
    ],
    crossRefs: [{ book: '1koe', chapter: 19, verse: 12, note: 'Das stille, sanfte Sausen' }],
  },
  {
    book: 'jes',
    chapter: 6,
    from: 1,
    to: 13,
    title: 'Die Berufung im Tempel',
    historicalShort:
      'Die Vision wird genau datiert: im Todesjahr des Königs Usija, um 740 v. Chr. Während der irdische Thron leer wird, sieht der Prophet den himmlischen besetzt.',
    historicalLong:
      'Die Serafim sind wörtlich „die Brennenden“ – geflügelte Wesen, wie sie auch auf altorientalischen Siegeln erscheinen. Der Auftrag ist verstörend formuliert: Der Prophet soll reden, damit das Volk gerade nicht versteht. Die Forschung sieht darin eine rückblickende Deutung des ausgebliebenen Erfolgs, nicht eine Absicht von Anfang an.',
    interpretations: [
      {
        tradition: 'Klassische Auslegung',
        text: 'Das Dreimalheilig wurde in die Liturgie übernommen und ist bis heute Teil des Abendmahlsgebets.',
      },
      {
        tradition: 'Exegetische Einordnung',
        text: 'Der „Verstockungsauftrag“ ist eine im Rückblick formulierte Erfahrung: Prophetie blieb folgenlos, und der Text ringt darum, was das über Gott aussagt.',
      },
      {
        tradition: 'Spirituelle Lesart',
        text: 'Auf das Erschrecken folgt die Reinigung, erst dann der Auftrag – die Reihenfolge gilt als Grundmuster jeder Berufung.',
      },
    ],
    crossRefs: [{ book: 'mt', chapter: 13, verse: 14 }],
  },
  {
    book: 'jer',
    chapter: 31,
    from: 31,
    to: 34,
    title: 'Der neue Bund',
    historicalShort:
      'Die einzige Stelle im Alten Testament, an der ausdrücklich von einem „neuen Bund“ die Rede ist – formuliert in der Katastrophe, als der alte Bund gescheitert schien.',
    historicalLong:
      'Neu ist nicht der Inhalt: Es bleibt dieselbe Weisung. Neu ist der Ort – sie soll „ins Herz geschrieben“ werden, statt auf Tafeln zu stehen. Damit entfällt auch die Belehrung von außen: „Einer wird den andern nicht mehr lehren.“ Das Neue Testament trägt seinen Namen nach diesem Text; die lateinische Übersetzung von „Bund“ lautet testamentum.',
    interpretations: [
      {
        tradition: 'Jüdische Auslegung',
        text: 'Es handelt sich um eine Erneuerung des Bundes mit Israel, nicht um seine Ersetzung – der Text spricht ausdrücklich vom „Haus Israel und Haus Juda“.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Die Verheißung wird auf das Abendmahl und das Wirken des Geistes bezogen. Der Hebräerbrief zitiert die Stelle in voller Länge.',
      },
      {
        tradition: 'Ökumenische Klarstellung',
        text: 'Die früher verbreitete Folgerung, der Bund mit Israel sei aufgekündigt, wird von den großen Kirchen heute ausdrücklich zurückgewiesen.',
      },
    ],
    crossRefs: [
      { book: 'hebr', chapter: 8, verse: 8 },
      { book: 'lk', chapter: 22, verse: 20 },
    ],
  },
  {
    book: 'hes',
    chapter: 37,
    from: 1,
    to: 14,
    title: 'Das Feld der Totengebeine',
    historicalShort:
      'Die Vision gilt einer Gemeinschaft im Exil, die sich selbst für erledigt hielt – der Text sagt es ausdrücklich: „Unsere Hoffnung ist verloren.“ Das Bild eines Schlachtfelds mit unbestatteten Toten war die äußerste Vorstellung von Endgültigkeit.',
    historicalLong:
      'Das hebräische Wort ruach bedeutet zugleich Wind, Atem und Geist – der Text spielt in wenigen Versen alle drei Bedeutungen durch. Die Deutung liefert der Text selbst mit: Gemeint ist die Heimkehr des Volkes, noch nicht die Auferstehung Einzelner.',
    interpretations: [
      {
        tradition: 'Exegetische Einordnung',
        text: 'Ursprünglich ein Bild für die Wiederherstellung Israels. Der Glaube an eine persönliche Auferstehung entsteht erst später, etwa im Buch Daniel.',
      },
      {
        tradition: 'Jüdische Tradition',
        text: 'Der Abschnitt wird am Sabbat des Passafestes gelesen – als Text der Befreiung.',
      },
      {
        tradition: 'Christliche Rezeption',
        text: 'Seit der Alten Kirche wird die Vision auf die Auferstehung der Toten und auf das Wirken des Geistes bezogen.',
      },
    ],
    crossRefs: [{ book: 'dan', chapter: 12, verse: 2 }],
  },
  {
    book: 'dan',
    chapter: 3,
    from: 1,
    to: 30,
    title: 'Der Feuerofen',
    historicalShort:
      'Die Erzählung spielt im babylonischen Exil, entstand aber vermutlich in der Verfolgung unter Antiochus IV. um 165 v. Chr. Sie richtet sich an Menschen, die vor genau dieser Wahl standen.',
    historicalLong:
      'Der Kernsatz steht in Vers 18: „Und wenn er es nicht tut …“ – die drei bleiben standhaft, auch für den Fall, dass keine Rettung kommt. Damit unterscheidet sich der Text von einer bloßen Wundererzählung: Er begründet Treue nicht mit ihrer Aussicht auf Erfolg.',
    interpretations: [
      {
        tradition: 'Historische Einordnung',
        text: 'Widerstandsliteratur: Erzählungen aus ferner Zeit sprechen verschlüsselt über die eigene Gegenwart – eine in Verfolgungssituationen häufige Form.',
      },
      {
        tradition: 'Ethische Auslegung',
        text: 'Der Text gilt als klassische Begründung für Gehorsamsverweigerung gegenüber staatlicher Macht und wurde im 20. Jahrhundert vielfach so gelesen.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Der Lobgesang der drei Männer im Feuerofen steht in der griechischen Fassung des Buches und gehört bis heute zum Stundengebet.',
      },
    ],
  },
  {
    book: 'jona',
    chapter: 4,
    from: 1,
    to: 11,
    title: 'Der Streit um den Rizinus',
    historicalShort:
      'Das Buch endet nicht mit der Umkehr Ninives, sondern mit dem Zorn des Propheten darüber. Jona begründet seine Flucht rückblickend damit, dass er Gottes Erbarmen befürchtet habe.',
    historicalLong:
      'Der Schlusssatz ist eine Frage, die unbeantwortet bleibt – und er nennt ausdrücklich auch das Vieh der Stadt. Die Erzählung arbeitet durchweg mit Übertreibung: eine Stadt von drei Tagesreisen, Tiere in Bußgewändern, ein Prophet, der die kürzeste Predigt der Bibel hält und damit den größten Erfolg hat.',
    interpretations: [
      {
        tradition: 'Literarische Einordnung',
        text: 'Das Buch wird überwiegend als Lehrerzählung gelesen, nicht als Bericht – erkennbar an Ironie, Übertreibung und der offenen Schlussfrage.',
      },
      {
        tradition: 'Jüdische Tradition',
        text: 'Jona wird am Nachmittag des Versöhnungstags gelesen: als Text über Umkehr, die selbst den Feinden offensteht.',
      },
      {
        tradition: 'Auslegung auf die Gemeinde hin',
        text: 'Die Frage am Ende richtet sich an die Lesenden: Gönnen wir Gottes Erbarmen auch denen, die wir nicht dafür vorgesehen haben?',
      },
    ],
  },

  /* ----------------------------------------- Neues Testament (Ausbau) */

  {
    book: 'mt',
    chapter: 13,
    from: 1,
    to: 23,
    title: 'Der Sämann',
    historicalShort:
      'In der damaligen Landwirtschaft wurde vor dem Pflügen gesät – dass Körner auf den Weg und ins Gestrüpp fallen, war deshalb kein Missgeschick, sondern Teil des Verfahrens.',
    historicalLong:
      'Der Ertrag von dreißig-, sechzig- und hundertfach lag weit über dem Üblichen; realistisch waren etwa fünf- bis zehnfache Ernten. Die Deutung, die der Text mitliefert, gilt vielen Fachleuten als spätere Auslegung der Gemeinde – das Gleichnis selbst wirkt zunächst offen und ohne Zuordnung.',
    interpretations: [
      {
        tradition: 'Traditionelle Auslegung',
        text: 'Der Same ist das Wort, die Böden sind die Hörenden – so deutet es der Text selbst und so wird er meist gepredigt.',
      },
      {
        tradition: 'Neuere Gleichnisforschung',
        text: 'Der Akzent liegt auf dem Ertrag, nicht auf den Böden: Trotz aller Verluste kommt eine unerhörte Ernte zustande. Das Gleichnis wäre dann Ermutigung, keine Selbstprüfung.',
      },
      {
        tradition: 'Landwirtschaftliche Beobachtung',
        text: 'Wer das Verfahren kennt, hört die Erzählung anders: Der Sämann ist nicht nachlässig, sondern arbeitet, wie man damals arbeitete.',
      },
    ],
    crossRefs: [{ book: 'mk', chapter: 4, verse: 3 }],
  },
  {
    book: 'mk',
    chapter: 8,
    from: 27,
    to: 38,
    title: 'Das Bekenntnis – und der Widerspruch',
    historicalShort:
      'Die Szene spielt bei Cäsarea Philippi, einem Ort mit einem Heiligtum für den Gott Pan und einem Tempel für den Kaiser. Ausgerechnet dort fällt die Frage, wer Jesus sei.',
    historicalLong:
      'Der Abschnitt ist die Mitte des Markusevangeliums: Von hier an geht der Weg nach Jerusalem. Petrus hat mit seinem Bekenntnis recht und versteht doch nichts – kaum ausgesprochen, weist er die Leidensankündigung zurück und wird schärfer zurechtgewiesen als jeder Gegner im ganzen Buch. „Kreuz auf sich nehmen“ war keine Metapher: Verurteilte trugen den Querbalken selbst zum Hinrichtungsort.',
    interpretations: [
      {
        tradition: 'Markinische Theologie',
        text: 'Wer Jesus „Messias“ nennt, ohne das Kreuz mitzudenken, hat ihn nach Markus gerade nicht verstanden. Deshalb das auffällige Schweigegebot.',
      },
      {
        tradition: 'Nachfolge-Ethik',
        text: 'Die Aufforderung richtet sich ausdrücklich an „das Volk samt den Jüngern“ – nicht an eine Elite.',
      },
      {
        tradition: 'Seelsorgliche Warnung',
        text: 'Der Satz vom Kreuztragen wurde historisch oft missbraucht, um Menschen zum Erdulden von Unrecht anzuhalten. Der Zusammenhang meint freiwillige Nachfolge, nicht auferlegtes Leiden.',
      },
    ],
    crossRefs: [{ book: 'mk', chapter: 15, verse: 39, note: 'Das Bekenntnis unter dem Kreuz' }],
  },
  {
    book: 'lk',
    chapter: 24,
    from: 13,
    to: 35,
    title: 'Die Emmausjünger',
    historicalShort:
      'Zwei Enttäuschte verlassen Jerusalem. Die Lage von Emmaus ist unsicher – schon die alten Handschriften nennen unterschiedliche Entfernungen, meist rund 60 Stadien, also etwa elf Kilometer.',
    historicalLong:
      'Die Erzählung ist sorgfältig gebaut: Zuerst wird der Schrift nachgegangen, dann wird das Brot gebrochen – erst dann werden die Augen geöffnet, und im selben Moment verschwindet er. Viele sehen darin den Ablauf des frühen Gottesdienstes gespiegelt: Wort und Mahl. Einer der beiden heißt Kleopas, der andere bleibt namenlos.',
    interpretations: [
      {
        tradition: 'Liturgische Auslegung',
        text: 'Der Text gilt als Urbild des Gottesdienstes: Der Auferstandene wird in der Schriftauslegung und im Brotbrechen erkannt.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Er geht mit, ohne sich zu erkennen zu geben, und lässt sich die enttäuschte Version der Geschichte erzählen, bevor er etwas sagt.',
      },
      {
        tradition: 'Literarische Beobachtung',
        text: 'Dass der zweite Jünger namenlos bleibt, wird oft als bewusste Lücke gelesen – ein Platz für die Lesenden.',
      },
    ],
  },
  {
    book: 'joh',
    chapter: 4,
    from: 1,
    to: 30,
    title: 'Die Frau am Jakobsbrunnen',
    historicalShort:
      'Gleich drei Grenzen werden überschritten: Jesus spricht als Mann eine Frau öffentlich an, als Jude eine Samaritanerin, und als Lehrer eine Person mit zweifelhaftem Ruf. Das längste Gespräch des Johannesevangeliums führt er mit ihr.',
    historicalLong:
      'Juden und Samaritaner stritten seit Jahrhunderten darüber, wo Gott anzubeten sei – auf dem Garizim oder in Jerusalem. Genau diese Frage stellt die Frau, und die Antwort verschiebt sie: weder hier noch dort. Die fünf Männer werden im Text nicht bewertet; sie können auf Verwitwung oder Verstoßung zurückgehen, worüber eine Frau damals nicht selbst entschied. Am Ende wird sie zur ersten Verkündigerin außerhalb Israels.',
    interpretations: [
      {
        tradition: 'Klassische Auslegung',
        text: 'Der Text zeigt, dass die Zuwendung Jesu keine Vorbedingungen kennt – religiöse Zugehörigkeit und Lebensführung stehen nicht davor.',
      },
      {
        tradition: 'Feministische Auslegung',
        text: 'Die verbreitete Darstellung als „Sünderin“ trägt der Text nicht. Betont wird stattdessen ihre Rolle als theologische Gesprächspartnerin und Botin.',
      },
      {
        tradition: 'Missionstheologische Lesart',
        text: 'Der Abschnitt gilt als Vorwegnahme der späteren Öffnung zu den Samaritanern in Apostelgeschichte 8.',
      },
    ],
    crossRefs: [{ book: 'apg', chapter: 8, verse: 5 }],
  },
  {
    book: 'apg',
    chapter: 17,
    from: 16,
    to: 34,
    title: 'Die Rede auf dem Areopag',
    historicalShort:
      'Paulus spricht vor dem Rat auf dem Areopag in Athen. Sein Anknüpfungspunkt ist ein Altar mit der Aufschrift „dem unbekannten Gott“ – solche Altäre sind für die Antike tatsächlich bezeugt.',
    historicalLong:
      'Die Rede zitiert keine Bibelstelle, sondern griechische Dichter. Sie ist damit der Versuch, das Evangelium ganz in der Sprache der Zuhörer zu sagen. Bei der Auferstehung bricht die Zustimmung ab: Für griechisches Denken war die Unsterblichkeit der Seele vorstellbar, die Auferstehung des Leibes nicht. Der Ertrag fällt entsprechend gering aus – nur wenige schließen sich an.',
    interpretations: [
      {
        tradition: 'Missionstheologische Auslegung',
        text: 'Ein Vorbild dafür, an vorhandenen Fragen anzuknüpfen statt eine fremde Begrifflichkeit vorauszusetzen.',
      },
      {
        tradition: 'Kritische Einordnung',
        text: 'Manche sehen die Rede als Beispiel für die Grenzen der Anpassung: Wo sie zum Kern kommt, endet die Zustimmung ohnehin.',
      },
      {
        tradition: 'Historische Beobachtung',
        text: 'Der Aufbau folgt der antiken Redekunst genau; Lukas gestaltet die Rede erkennbar literarisch.',
      },
    ],
  },
  {
    book: '1kor',
    chapter: 15,
    from: 1,
    to: 11,
    title: 'Das älteste Bekenntnis',
    historicalShort:
      'Paulus zitiert hier eine Formel, die er selbst übernommen hat – vermutlich innerhalb weniger Jahre nach den Ereignissen entstanden. Es ist damit die früheste erhaltene Zusammenfassung des christlichen Glaubens.',
    historicalLong:
      'Die Aufzählung der Zeugen ist bemerkenswert: über fünfhundert auf einmal, „von denen die meisten noch leben“ – eine Einladung zur Nachfrage. Auffällig ist zugleich, dass die Frauen am Grab, die alle vier Evangelien nennen, in dieser Liste fehlen; ihr Zeugnis galt vor Gericht nichts. Paulus setzt sich selbst ans Ende, als „unzeitige Geburt“.',
    interpretations: [
      {
        tradition: 'Historische Forschung',
        text: 'Das hohe Alter der Formel gilt als gesichert und ist ein zentrales Argument in der Diskussion über die Entstehung des Osterglaubens.',
      },
      {
        tradition: 'Dogmatische Auslegung',
        text: 'Die vier Glieder – gestorben, begraben, auferweckt, erschienen – bilden die Grundstruktur, die später in die Glaubensbekenntnisse einging.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Das Fehlen der Frauen wird als Hinweis auf die gesellschaftlichen Verhältnisse gelesen, nicht als Bestreitung ihres Zeugnisses.',
      },
    ],
    crossRefs: [{ book: 'mk', chapter: 16, verse: 1 }],
  },
  {
    book: '2kor',
    chapter: 12,
    from: 1,
    to: 10,
    title: 'Der Pfahl im Fleisch',
    historicalShort:
      'Paulus spricht über eine dauerhafte Belastung, die er dreimal vergeblich loszuwerden versuchte. Was gemeint ist, sagt er nicht – Vermutungen reichen von einer Augenkrankheit über Epilepsie bis zu Anfeindungen durch Gegner.',
    historicalLong:
      'Der Abschnitt steht in einer Auseinandersetzung mit Gegnern, die sich auf Erfahrungen und Erfolge beriefen. Paulus antwortet mit einer „Narrenrede“: Er zählt auf, worauf er sich berufen könnte, und stellt dann ausgerechnet seine Schwäche in die Mitte. Dass er von der Entrückung in der dritten Person spricht, gehört zu dieser Zurückhaltung.',
    interpretations: [
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Ein Kerntext der Theologie des Kreuzes: Gott handelt nicht am Erfolg vorbei, sondern durch das Schwache hindurch.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Das Gebet wird nicht erhört, wie es gemeint war – und der Text macht daraus keinen Mangel an Glauben.',
      },
      {
        tradition: 'Kritische Warnung',
        text: 'Der Satz darf nicht dazu dienen, Leiden zu verklären oder Betroffene von Hilfe abzuhalten. Paulus beschreibt seine eigene Erfahrung, er stellt keine Regel auf.',
      },
    ],
  },
  {
    book: 'eph',
    chapter: 6,
    from: 10,
    to: 20,
    title: 'Die Waffenrüstung',
    historicalShort:
      'Das Bild ist der Ausrüstung des römischen Legionärs entnommen – für die Lesenden also der Anblick der Besatzungsmacht. Genau diese Bilder werden umgedeutet.',
    historicalLong:
      'Auffällig ist, wofür die Stücke stehen: Wahrheit, Gerechtigkeit, Bereitschaft zum Frieden, Glaube, Rettung, Gottes Wort. Die einzige Angriffswaffe ist das Wort. Der Text sagt zudem ausdrücklich, dass der Kampf nicht „gegen Fleisch und Blut“ geht – also nicht gegen Menschen.',
    interpretations: [
      {
        tradition: 'Klassische Auslegung',
        text: 'Eine Zusammenfassung christlicher Existenz: standhalten, nicht erobern. Alle Stücke sind auf Verteidigung angelegt.',
      },
      {
        tradition: 'Kritische Wirkungsgeschichte',
        text: 'Die Bildsprache wurde vielfach militaristisch missbraucht, bis hin zu Kreuzzugsrhetorik – gegen die ausdrückliche Aussage des Textes selbst.',
      },
      {
        tradition: 'Friedenskirchliche Lesart',
        text: 'Gerade die Umdeutung der Waffen gilt als gewaltkritisch: Die Rüstung des Legionärs wird zum Bild für das genaue Gegenteil seines Handwerks.',
      },
    ],
  },

  /* ---------------------------------------- Tora und Geschichtsbücher */

  {
    book: '1mo',
    chapter: 11,
    from: 1,
    to: 9,
    title: 'Der Turmbau zu Babel',
    historicalShort:
      'Beschrieben wird eine Zikkurat, wie sie in Mesopotamien tatsächlich gebaut wurden – aus gebrannten Ziegeln und Erdpech, weil dort der Baustein fehlte. Der Text kennt die Bautechnik genau.',
    historicalLong:
      'Der Name „Babel“ bedeutet auf Akkadisch „Tor Gottes“; die Erzählung deutet ihn stattdessen vom hebräischen Wort für „verwirren“ her – ein Wortspiel, das die Selbstdarstellung der Großmacht ins Gegenteil verkehrt. Auffällig ist auch, was nicht dasteht: von Hochmut ist ausdrücklich nicht die Rede, wohl aber von der Furcht, „zerstreut zu werden“. Kritisiert wird also eher die erzwungene Einheit als der Ehrgeiz.',
    interpretations: [
      {
        tradition: 'Klassische Auslegung',
        text: 'Der Turm gilt als Bild menschlicher Selbstüberhebung, die Sprachverwirrung als Strafe dafür.',
      },
      {
        tradition: 'Neuere Exegese',
        text: 'Gelesen als Kritik am Imperium: Eine Sprache, ein Ort, ein Projekt – die Vielfalt der Völker ist dann nicht Strafe, sondern Rückkehr zum Schöpfungsauftrag, die Erde zu erfüllen.',
      },
      {
        tradition: 'Neutestamentliche Aufnahme',
        text: 'Pfingsten wird seit der Alten Kirche als Gegenbild gelesen: Die Sprachen bleiben verschieden, und trotzdem versteht jeder.',
      },
    ],
    crossRefs: [
      { book: '1mo', chapter: 1, verse: 28 },
      { book: 'apg', chapter: 2, verse: 6 },
    ],
  },
  {
    book: '1mo',
    chapter: 50,
    from: 15,
    to: 26,
    title: 'Josef und seine Brüder – der Schluss',
    historicalShort:
      'Nach dem Tod des Vaters fürchten die Brüder die Rache. Josefs Antwort gehört zu den frühesten Aussagen darüber, wie Gott durch menschliche Bosheit hindurch handeln kann, ohne sie gutzuheißen.',
    historicalLong:
      'Der Schlüsselsatz lautet: „Ihr gedachtet es böse mit mir zu machen, aber Gott gedachte es gut zu machen.“ Die Bosheit wird beim Namen genannt und nicht umgedeutet – die Erzählung leugnet das Unrecht nicht, sie ordnet es ein. Bemerkenswert ist auch, was fehlt: Josef spricht keine Vergebung aus, er weint und sagt zu, für sie zu sorgen.',
    interpretations: [
      {
        tradition: 'Theologische Auslegung',
        text: 'Ein Grundtext zur Frage nach Gottes Wirken in der Geschichte: kein Eingreifen von außen, sondern ein Weg durch menschliches Handeln hindurch.',
      },
      {
        tradition: 'Seelsorgliche Warnung',
        text: 'Der Satz taugt nicht als Trost von außen. Josef sagt ihn über die eigene Geschichte – niemand darf ihn einem anderen über dessen Leid sprechen.',
      },
      {
        tradition: 'Literarische Beobachtung',
        text: 'Die Josefsgeschichte kommt fast ohne Wunder aus. Gott wird selten genannt und wirkt doch durchgehend im Hintergrund.',
      },
    ],
  },
  {
    book: '2mo',
    chapter: 12,
    from: 1,
    to: 14,
    title: 'Die Einsetzung des Passa',
    historicalShort:
      'Die Anweisungen sind auf Aufbruch hin formuliert: im Stehen essen, die Lenden gegürtet, Stab in der Hand. Das Fest wird eingesetzt, bevor die Rettung geschehen ist.',
    historicalLong:
      'Religionsgeschichtlich vermutet die Forschung zwei ältere Feste im Hintergrund – ein Hirtenfest mit dem Erstlingslamm und ein Bauernfest mit ungesäuertem Brot –, die hier zu einem Fest der Befreiung verbunden werden. Der Text richtet sich ausdrücklich an kommende Generationen: „Ihr sollt diesen Tag haben zum Gedächtnis.“ Erinnerung ist damit selbst ein Gebot.',
    interpretations: [
      {
        tradition: 'Jüdische Tradition',
        text: 'Bei der Pessach-Feier soll sich jeder so verstehen, als sei er selbst aus Ägypten gezogen. Erinnerung ist keine Rückschau, sondern Vergegenwärtigung.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Das letzte Mahl Jesu fällt in diese Festzeit. Paulus nennt Christus „unser Passalamm“, und die Abendmahlsworte greifen die Gedächtnisformel auf.',
      },
      {
        tradition: 'Religionsgeschichtliche Einordnung',
        text: 'Die Verbindung zweier älterer Feste erklärt, warum die Vorschriften zu Lamm und zu ungesäuertem Brot im Text nebeneinanderstehen.',
      },
    ],
    crossRefs: [
      { book: '1kor', chapter: 5, verse: 7 },
      { book: 'lk', chapter: 22, verse: 19 },
    ],
  },
  {
    book: '3mo',
    chapter: 16,
    from: 1,
    to: 22,
    title: 'Der Versöhnungstag',
    historicalShort:
      'Der einzige Tag im Jahr, an dem der Hohepriester das Allerheiligste betrat – und der einzige Fastentag, den die Tora vorschreibt. Zwei Böcke werden ausgelost: einer für das Opfer, einer für die Wüste.',
    historicalLong:
      'Der zweite Bock wird nicht getötet, sondern mit den Verfehlungen des Volkes beladen fortgeschickt. Von ihm stammt das Wort „Sündenbock“. Das hebräische „Asasel“ ist unklar – es kann einen Ort, einen Dämon oder eine Wendung für „vollständige Entfernung“ bezeichnen. Bemerkenswert ist die Vorstellung dahinter: Schuld wird nicht nur vergeben, sie wird weggetragen.',
    interpretations: [
      {
        tradition: 'Jüdische Tradition',
        text: 'Jom Kippur ist bis heute der höchste Feiertag. Nach dem Ende des Tempels traten Umkehr, Gebet und Wohltätigkeit an die Stelle der Opfer.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Der Hebräerbrief liest den Tag als Vorbild: Christus geht ein für allemal in das Heiligtum – ein Bild, das die ganze Deutung des Kreuzes prägt.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die Vorstellung, Schuld auf einen Unschuldigen zu übertragen, ist ethisch umstritten. Die Ritualforschung betont, dass es hier nicht um Bestrafung geht, sondern um symbolische Entfernung.',
      },
    ],
    crossRefs: [{ book: 'hebr', chapter: 9, verse: 11 }],
  },
  {
    book: '4mo',
    chapter: 6,
    from: 22,
    to: 27,
    title: 'Der aaronitische Segen',
    historicalShort:
      'Der wohl älteste erhaltene Bibeltext überhaupt: Zwei kleine Silberrollen aus Ketef Hinnom bei Jerusalem tragen diese Worte und werden auf das 7. Jahrhundert v. Chr. datiert – rund 400 Jahre älter als die ältesten bekannten Bibelhandschriften.',
    historicalLong:
      'Der Segen ist kunstvoll gebaut: drei Zeilen von wachsender Länge, in denen der Gottesname dreimal vorkommt. Er wird nicht über das Volk als Ganzes gesprochen, sondern in der Einzahl – „dich“, „dir“. Das Bild vom leuchtenden Angesicht meint Zuwendung; das Abwenden des Angesichts ist in der Bibel das Zeichen für Distanz.',
    interpretations: [
      {
        tradition: 'Liturgische Praxis',
        text: 'Der Segen beschließt bis heute jüdische und christliche Gottesdienste – einer der wenigen Texte, die beide Traditionen gleichlautend verwenden.',
      },
      {
        tradition: 'Archäologische Bedeutung',
        text: 'Die Amulette von Ketef Hinnom zeigen, dass der Text als Schutzwort am Körper getragen wurde, lange bevor es eine Bibel als Buch gab.',
      },
      {
        tradition: 'Theologische Auslegung',
        text: '„Frieden“ meint hier schalom: nicht die Abwesenheit von Streit, sondern Unversehrtheit im umfassenden Sinn.',
      },
    ],
  },
  {
    book: 'jos',
    chapter: 24,
    from: 14,
    to: 28,
    title: 'Der Landtag zu Sichem',
    historicalShort:
      'Die Szene ist wie ein Vertragsabschluss aufgebaut: Vorgeschichte, Forderung, Zeugen, schriftliche Niederlegung. Josua weist die Zusage des Volkes zunächst zurück – „Ihr könnt dem HERRN nicht dienen.“',
    historicalLong:
      'Der Aufbau entspricht genau den hethitischen Vasallenverträgen des 2. Jahrtausends: Vorgeschichte der Wohltaten, Forderung der Treue, Zeugen, Niederschrift und Aufbewahrung am Heiligtum. Als Zeuge dient hier ein Stein – „er hat alle Worte gehört“. Auffällig ist, dass Josua von Göttern spricht, die „jenseits des Stroms“ und in Ägypten verehrt wurden: Der Text setzt voraus, dass die Versammelten sehr unterschiedliche Herkunft hatten. Sichem war zudem ein alter Heiligtumsort, an dem schon Abraham und Jakob Altäre errichtet hatten.',
    interpretations: [
      {
        tradition: 'Historische Einordnung',
        text: 'Die Forschung sieht hier die Erinnerung an einen Zusammenschluss verschiedener Gruppen zu einem Bund – nicht die Bekehrung eines bereits bestehenden Volkes.',
      },
      {
        tradition: 'Theologische Auslegung',
        text: 'Der Text stellt die Entscheidung als frei dar und nimmt sie zugleich ernst: Josua warnt vor einem Versprechen, das leicht gegeben ist.',
      },
      {
        tradition: 'Wirkungsgeschichte',
        text: '„Ich aber und mein Haus wollen dem HERRN dienen“ gehört zu den meistzitierten Sätzen bei Hauseinweihungen – meist ohne den skeptischen Einwand, der unmittelbar folgt.',
      },
    ],
  },
  {
    book: 'ri',
    chapter: 6,
    from: 11,
    to: 24,
    title: 'Die Berufung Gideons',
    historicalShort:
      'Gideon drischt Weizen in einer Kelter – einem engen, in den Fels gehauenen Trog –, um ihn vor den Midianitern zu verbergen. Dort wird er als „streitbarer Held“ angesprochen, was zur Szene in denkbar scharfem Kontrast steht.',
    historicalLong:
      'Die Erzählung folgt dem Muster biblischer Berufungen: Anrede, Einwand, Zusage, Zeichen. Gideons Einwand ist der ausführlichste – er verweist auf die Schwäche seiner Sippe und seine eigene Stellung als Jüngster. Auch danach fordert er noch zweimal ein Zeichen mit dem Wollvlies. Die Erzählung schildert Zweifel nicht als Mangel, sondern als Teil des Weges.',
    interpretations: [
      {
        tradition: 'Literarische Beobachtung',
        text: 'Die Ironie ist gewollt: Der „Held“ versteckt sich. Das Buch der Richter erzählt seine Anführer durchweg ambivalent.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Die Zusage gilt vor der Leistung: Gideon wird genannt, was er noch nicht ist.',
      },
      {
        tradition: 'Kritische Einordnung',
        text: 'Die Fortsetzung ist ernüchternd – Gideon lehnt zwar das Königtum ab, lässt sich aber ein Kultbild anfertigen, das dem Volk zur Falle wird.',
      },
    ],
  },
  {
    book: 'rut',
    chapter: 1,
    from: 6,
    to: 22,
    title: 'Rut und Noomi',
    historicalShort:
      'Zwei Witwen ohne Versorgung – in einer Gesellschaft ohne rechtliche Absicherung für Frauen die denkbar schlechteste Lage. Ruts Treuebekenntnis kommt von einer Moabiterin, also aus einem Volk, dem die Tora die Aufnahme in die Gemeinde ausdrücklich verwehrt.',
    historicalLong:
      'Noomi ändert ihren Namen in „Mara“ – die Bittere – und klagt Gott offen an. Diese Bitterkeit bleibt im Buch stehen und wird nicht widerlegt. Die Erzählung endet damit, dass die Ausländerin Rut zur Urgroßmutter Davids wird; das Buch schließt mit einem Stammbaum, der genau darauf hinausläuft.',
    interpretations: [
      {
        tradition: 'Historische Einordnung',
        text: 'Die Entstehung wird meist nachexilisch angesetzt – in einer Zeit, in der Ehen mit Ausländerinnen aufgelöst werden sollten. Das Buch wäre dann ein bewusster Widerspruch.',
      },
      {
        tradition: 'Jüdische Tradition',
        text: 'Rut wird am Wochenfest gelesen und gilt als Vorbild der Proselytin, die sich aus freiem Entschluss anschließt.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Ruts Worte sind als Trauspruch verbreitet – ursprünglich gelten sie der Schwiegermutter, nicht einem Ehepartner.',
      },
    ],
    crossRefs: [
      { book: '5mo', chapter: 23, verse: 3, note: 'Das Verbot für Moabiter' },
      { book: 'mt', chapter: 1, verse: 5, note: 'Rut im Stammbaum Jesu' },
    ],
  },
  {
    book: '2koe',
    chapter: 5,
    from: 1,
    to: 19,
    title: 'Die Heilung Naamans',
    historicalShort:
      'Ein syrischer Heerführer – also ein Feind – wird geheilt, und der entscheidende Hinweis kommt von einer verschleppten israelitischen Sklavin. Die Erzählung dreht alle Rangordnungen um.',
    historicalLong:
      'Naaman erwartet ein Ritual mit Gestus und Anrufung; stattdessen soll er im trüben Jordan baden, den er den Flüssen von Damaskus für unterlegen hält. Der Prophet kommt nicht einmal heraus. Am Ende bittet Naaman um zwei Maultierlasten Erde – er will auf israelitischem Boden opfern, obwohl er in Syrien lebt, und fragt zugleich, ob er weiter im Tempel des Rimmon dienen darf. Elisa antwortet mit „Zieh hin in Frieden“, ohne die Frage zu entscheiden.',
    interpretations: [
      {
        tradition: 'Erzählerische Lesart',
        text: 'Die Pointe liegt in der Enttäuschung: Die Heilung geschieht ohne Aufwand, gerade dadurch wird sie zur Zumutung.',
      },
      {
        tradition: 'Neutestamentliche Aufnahme',
        text: 'Jesus nennt Naaman in seiner Antrittspredigt in Nazareth – als Beispiel dafür, dass Gottes Zuwendung über die eigenen Grenzen hinausgeht. Die Zuhörer reagieren mit Wut.',
      },
      {
        tradition: 'Theologische Beobachtung',
        text: 'Die offene Antwort am Schluss ist bemerkenswert: Der Text lässt eine Frage stehen, die er auch hätte entscheiden können.',
      },
    ],
    crossRefs: [{ book: 'lk', chapter: 4, verse: 27 }],
  },
  {
    book: 'neh',
    chapter: 8,
    from: 1,
    to: 12,
    title: 'Die Verlesung der Tora',
    historicalShort:
      'Ein Schlüsselmoment der Religionsgeschichte: Vor versammeltem Volk wird ein Buch verlesen und ausgelegt. Ausdrücklich genannt sind „Männer und Frauen und alle, die es verstehen konnten“.',
    historicalLong:
      'Der Text erwähnt, dass die Leviten den Sinn erklärten – nach verbreiteter Auffassung, weil das Hebräische für viele nach dem Exil nicht mehr Alltagssprache war und ins Aramäische übertragen werden musste. Damit ist hier zum ersten Mal beschrieben, was später Synagoge und Predigt ausmacht: Lesung, Übersetzung, Auslegung. Die Reaktion ist Weinen – und wird ausdrücklich in Feiern umgewandelt.',
    interpretations: [
      {
        tradition: 'Religionsgeschichtliche Einordnung',
        text: 'Der Übergang von einer Tempel- zu einer Buchreligion wird hier greifbar. Das Judentum überlebte die Zerstörung des Tempels, weil dieser Weg schon vorbereitet war.',
      },
      {
        tradition: 'Homiletische Auslegung',
        text: 'Der Vers „sie legten den Sinn aus, dass man das Gelesene verstand“ gilt als älteste Beschreibung dessen, was Predigt leisten soll.',
      },
      {
        tradition: 'Seelsorgliche Beobachtung',
        text: 'Nicht Erschrecken bleibt das letzte Wort: „Die Freude am HERRN ist eure Stärke.“',
      },
    ],
  },
  {
    book: 'est',
    chapter: 4,
    from: 10,
    to: 17,
    title: '„Komme ich um, so komme ich um“',
    historicalShort:
      'Ester riskiert ihr Leben, weil ungebetenes Erscheinen vor dem König mit dem Tod bedroht war. Das Buch nennt Gott an keiner Stelle – auch hier nicht, wo Mordechai von Rettung „von einem anderen Ort her“ spricht.',
    historicalLong:
      'Die Regel, dass ungeladenes Erscheinen den Tod bedeuten konnte, ist auch bei griechischen Geschichtsschreibern für den Perserhof bezeugt. Dass Gott im ganzen Buch nicht vorkommt, war schon in der Antike ein Problem: Die griechische Fassung fügt daher lange Gebete ein, die im hebräischen Text fehlen. In Qumran ist Ester als einziges Buch der hebräischen Bibel nicht gefunden worden. Auch Luther äußerte sich abschätzig darüber – der Kanon hat es dennoch behalten.',
    interpretations: [
      {
        tradition: 'Literarische Beobachtung',
        text: 'Das Fehlen des Gottesnamens ist kunstvoll: Die Rettung geschieht durch Mut, Klugheit und Zufälle – und der Text überlässt es den Lesenden, wer dahintersteht.',
      },
      {
        tradition: 'Jüdische Tradition',
        text: 'Ester wird an Purim gelesen, unter lautem Lärm bei jeder Nennung Hamans. Das Buch gehört zu den fröhlichsten und zugleich bedrängendsten der Bibel.',
      },
      {
        tradition: 'Ethische Lesart',
        text: 'Mordechais Satz „Wer weiß, ob du nicht um dieser Zeit willen dahin gekommen bist“ wird als Frage nach Verantwortung in der eigenen Stellung gelesen.',
      },
    ],
  },

  /* --------------------------------------------- Weisheit und Klage */

  {
    book: 'hi',
    chapter: 19,
    from: 23,
    to: 29,
    title: '„Ich weiß, dass mein Erlöser lebt“',
    historicalShort:
      'Der Satz steht mitten in einer Anklage gegen Gott, nicht in einer Glaubensrede. Das hebräische Wort go’el meint den Löser – den Verwandten, der verpflichtet ist, für einen Entrechteten einzutreten.',
    historicalLong:
      'Der hebräische Text dieser Verse gilt als einer der am schwierigsten zu übersetzenden der ganzen Bibel; die Fassungen weichen erheblich voneinander ab. Ob Hiob von einer Rehabilitierung zu Lebzeiten spricht oder von etwas darüber hinaus, ist offen. Er verlangt zuvor ausdrücklich, dass seine Worte „in Fels gehauen“ werden – er rechnet damit, nicht mehr da zu sein, wenn er recht bekommt.',
    interpretations: [
      {
        tradition: 'Christliche Tradition',
        text: 'Seit der Alten Kirche auf die Auferstehung und auf Christus bezogen; Händels „Messias“ hat diese Lesart populär gemacht.',
      },
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Ein Auferstehungsglaube ist für die Entstehungszeit des Buches nicht vorauszusetzen. Wahrscheinlicher fordert Hiob einen Anwalt, der seine Sache vertritt – notfalls gegen Gott.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Entscheidend ist die Bewegung: Hiob klagt Gott an und hofft zugleich auf Gott. Beides steht unaufgelöst nebeneinander.',
      },
    ],
  },
  {
    book: 'pred',
    chapter: 3,
    from: 1,
    to: 15,
    title: 'Alles hat seine Zeit',
    historicalShort:
      'Vierzehn Gegensatzpaare beschreiben das ganze Leben – ohne Wertung, welche Seite die bessere sei. Der Text tröstet nicht, er ordnet ein.',
    historicalLong:
      'Der berühmte Katalog mündet in eine unbequeme Feststellung: Gott hat „die Ewigkeit in ihr Herz gelegt“, aber der Mensch kann das Werk Gottes nicht durchschauen. Kohelet zieht daraus keine Resignation, sondern eine schlichte Folgerung – essen, trinken und im Tun Gutes sehen. Das Wort, das Luther mit „eitel“ übersetzt, heißt wörtlich „Hauch“ und meint eher Flüchtigkeit als Nichtigkeit.',
    interpretations: [
      {
        tradition: 'Weisheitliche Auslegung',
        text: 'Der Text setzt der Machbarkeitsvorstellung Grenzen: Vieles hat seine Zeit, und die lässt sich nicht herbeireden.',
      },
      {
        tradition: 'Kanonische Einordnung',
        text: 'Kohelet steht bewusst als Korrektiv neben den Sprüchen. Dass beide in derselben Bibel stehen, gehört zu ihren offen ausgehaltenen Spannungen.',
      },
      {
        tradition: 'Rezeption',
        text: 'Als Lied von Pete Seeger und den Byrds wurde der Abschnitt zu einem der weltweit bekanntesten Bibeltexte des 20. Jahrhunderts.',
      },
    ],
  },
  {
    book: 'klgl',
    chapter: 3,
    from: 19,
    to: 33,
    title: '„Alle Morgen neu“',
    historicalShort:
      'Der Trostabschnitt steht genau in der Mitte des Buches – und in der Mitte des mittleren, kunstvoll alphabetisch gebauten Gedichts. Ringsum steht nichts als Klage über die zerstörte Stadt.',
    historicalLong:
      'Die Klagelieder sind Akrosticha: Jede Strophe beginnt mit dem nächsten Buchstaben des Alphabets. Diese strenge Form ist selbst eine Aussage – wo alles zusammenbricht, hält wenigstens die Sprache eine Ordnung. Bemerkenswert ist, dass der Trost nicht am Ende steht: Nach ihm geht die Klage weiter, und das Buch schließt mit einer offenen Frage.',
    interpretations: [
      {
        tradition: 'Liturgische Rezeption',
        text: 'Die Verse wurden zu einem der bekanntesten Morgenlieder und stehen in vielen Gesangbüchern.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Trost ersetzt die Klage nicht, er steht in ihr. Wer das Buch als Ganzes liest, hört ihn anders als isoliert.',
      },
      {
        tradition: 'Jüdische Tradition',
        text: 'Die Klagelieder werden am 9. Aw gelesen, dem Gedenktag der Tempelzerstörungen.',
      },
    ],
  },

  /* ------------------------------------------------------- Propheten */

  {
    book: 'jes',
    chapter: 7,
    from: 10,
    to: 17,
    title: 'Das Immanuel-Zeichen',
    historicalShort:
      'Die Szene spielt 734 v. Chr. während einer akuten Kriegsgefahr. Das Zeichen ist an eine Frist gebunden: Bevor das Kind zwischen Gut und Böse unterscheiden kann, werden die bedrohenden Könige verschwunden sein.',
    historicalLong:
      'Das hebräische Wort alma bedeutet „junge Frau“; ob sie unverheiratet ist, sagt das Wort nicht. Die griechische Übersetzung des 3. Jahrhunderts v. Chr. gibt es mit parthenos wieder, was „Jungfrau“ heißen kann – und Matthäus zitiert diese griechische Fassung. Der Streit darüber gehört zu den ältesten zwischen Judentum und Christentum und wird bis heute geführt.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Auslegung',
        text: 'Im ursprünglichen Zusammenhang geht es um ein Kind der eigenen Zeit, das eine politische Frist markiert – nicht um eine Geburt Jahrhunderte später.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der Text spricht von einer jungen Frau; eine Jungfrauengeburt liest das Judentum hier nicht.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Matthäus liest die Stelle im Licht der Erfahrung mit Jesus. Die Kirchen halten an dieser Deutung fest, ohne den ursprünglichen Sinn zu bestreiten – beides kann nebeneinander stehen.',
      },
    ],
    crossRefs: [{ book: 'mt', chapter: 1, verse: 23 }],
  },
  {
    book: 'jes',
    chapter: 40,
    from: 1,
    to: 11,
    title: '„Tröstet, tröstet mein Volk“',
    historicalShort:
      'Mit diesem Kapitel beginnt das Trostbuch: Der Ton wechselt schlagartig vom Gericht zum Zuspruch. Adressaten sind Menschen im babylonischen Exil, rund 150 Jahre nach dem historischen Jesaja.',
    historicalLong:
      'Der Auftrag ergeht in der Mehrzahl an eine ungenannte Gruppe – vor einem himmlischen Rat, dessen Stimmen der Prophet hört. Das Bild vom Weg durch die Wüste greift die Prozessionsstraßen auf, die babylonische Könige für ihre Götterbilder anlegen ließen; hier zieht Gott nicht ein, sondern heraus, seinem Volk voran. Der Abschnitt endet mit dem Bild des Hirten, der Lämmer im Arm trägt.',
    interpretations: [
      {
        tradition: 'Exegetische Einordnung',
        text: 'Der klare Bruch in Sprache und Situation ist der Hauptgrund für die Annahme mehrerer Verfasserschichten im Jesajabuch.',
      },
      {
        tradition: 'Neutestamentliche Aufnahme',
        text: 'Alle vier Evangelien beziehen den Ruf in der Wüste auf Johannes den Täufer – mit einer verschobenen Satztrennung gegenüber dem hebräischen Text.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Der Abschnitt eröffnet Händels „Messias“ und gehört zu den Grundtexten der Adventszeit.',
      },
    ],
    crossRefs: [{ book: 'mk', chapter: 1, verse: 3 }],
  },
  {
    book: 'jer',
    chapter: 1,
    from: 4,
    to: 10,
    title: 'Die Berufung Jeremias',
    historicalShort:
      'Jeremia wehrt sich mit dem Hinweis auf seine Jugend – ein Einwand, der in biblischen Berufungen wiederkehrt. Der Auftrag lautet, „auszureißen und einzureißen“, aber auch „zu bauen und zu pflanzen“.',
    historicalLong:
      'Die Berufung fällt ins Jahr 627 v. Chr., kurz vor der Reform Josias und rund vierzig Jahre vor der Zerstörung Jerusalems – Jeremia wird die ganze Katastrophe miterleben. Das hebräische Wort na’ar, das Luther mit „zu jung“ wiedergibt, kann Kind bis junger Mann bedeuten. Die Berührung des Mundes erinnert an die Berufung Jesajas, wo eine glühende Kohle die Lippen reinigt; hier genügt die Hand. Bemerkenswert ist die Reihenfolge der sechs Verben: Vier zerstören, zwei bauen – und die aufbauenden stehen am Ende.',
    interpretations: [
      {
        tradition: 'Theologische Auslegung',
        text: 'Die Zusage „Ehe ich dich im Mutterleibe bildete, kannte ich dich“ betont, dass die Berufung dem eigenen Können vorausgeht.',
      },
      {
        tradition: 'Literarische Beobachtung',
        text: 'Die vier Verben des Abrisses stehen gegen zwei des Aufbaus – ein Verhältnis, das dem Buch entspricht und doch nicht das letzte Wort behält.',
      },
      {
        tradition: 'Ethische Rezeption',
        text: 'Der Vers wird in Debatten über den Lebensschutz herangezogen. Exegetisch geht es um die Berufung dieses einen Propheten, nicht um eine allgemeine Aussage.',
      },
    ],
  },
  {
    book: 'hos',
    chapter: 11,
    from: 1,
    to: 11,
    title: '„Wie kann ich dich preisgeben?“',
    historicalShort:
      'Gott spricht hier nicht als Richter, sondern als Elternteil: Er hat gehen gelehrt, auf den Arm genommen, die Wange gestreichelt. Dann bricht das angekündigte Gericht mitten im Satz ab.',
    historicalLong:
      'Der Text zeigt einen inneren Widerstreit – „mein Herz ist anderen Sinnes“ – und begründet den Umschwung ausdrücklich damit, dass Gott „nicht ein Mensch“ ist. Menschliche Konsequenz führte zum Untergang; gerade Gottes Anderssein bricht die Logik der Vergeltung. Für die Auslegungsgeschichte ist das eine der bemerkenswertesten Stellen des Alten Testaments.',
    interpretations: [
      {
        tradition: 'Prophetische Theologie',
        text: 'Gott wird als leidend und ringend dargestellt. Diese Rede von Gottes „Pathos“ hat besonders Abraham Joshua Heschel herausgearbeitet.',
      },
      {
        tradition: 'Dogmatische Rückfrage',
        text: 'Ob Gott „umdenken“ kann, ist ein alter Streitpunkt. Die Tradition liest solche Stellen meist als Bildrede, andere nehmen sie beim Wort.',
      },
      {
        tradition: 'Neutestamentliche Aufnahme',
        text: 'Matthäus zitiert „Aus Ägypten habe ich meinen Sohn gerufen“ und bezieht es auf Jesus – im Ursprung meint der Satz Israel.',
      },
    ],
    crossRefs: [{ book: 'mt', chapter: 2, verse: 15 }],
  },
  {
    book: 'am',
    chapter: 5,
    from: 18,
    to: 27,
    title: '„Es ströme das Recht wie Wasser“',
    historicalShort:
      'Amos kehrt eine Erwartung um: Der „Tag des HERRN“ galt als Tag des Sieges – er sagt Finsternis an. Danach folgt die schärfste Absage an den Gottesdienst, die die Bibel kennt.',
    historicalLong:
      '„Ich hasse eure Feste“ ist keine Ablehnung des Kults an sich, sondern seiner Verwendung: In derselben Rede stehen die Anklagen wegen Bestechung, Getreidewucher und der Unterdrückung der Armen im Tor. Das Bild vom immerfließenden Bach ist bewusst gewählt – in einer Region, in der die meisten Wasserläufe im Sommer trockenfallen, meint es Verlässlichkeit.',
    interpretations: [
      {
        tradition: 'Prophetische Tradition',
        text: 'Recht und Gottesdienst lassen sich nicht trennen. Diese Linie zieht sich von Amos über Jesaja 58 bis Matthäus 25 durch.',
      },
      {
        tradition: 'Wirkungsgeschichte',
        text: 'Martin Luther King zitierte den Vers in seiner Rede „I Have a Dream“ und machte ihn zu einer Losung der Bürgerrechtsbewegung.',
      },
      {
        tradition: 'Kritische Einordnung',
        text: 'Amos verkündet zunächst kein Heil. Die tröstlichen Schlussverse des Buches gelten vielen Fachleuten als spätere Ergänzung.',
      },
    ],
    crossRefs: [{ book: 'jes', chapter: 58, verse: 6 }],
  },
  {
    book: 'sach',
    chapter: 9,
    from: 9,
    to: 12,
    title: 'Der König auf dem Esel',
    historicalShort:
      'Der erwartete König kommt nicht auf einem Streitross, sondern auf einem Lasttier – und der Text sagt ausdrücklich, dass Streitwagen und Bogen vernichtet werden. Die Ankündigung ist entwaffnend gemeint.',
    historicalLong:
      'Der König wird „gerecht und ein Helfer“ genannt – die hebräische Form ist passiv und meint eher „dem geholfen wurde“ als „der hilft“. Er ist also selbst ein Empfangender. Der hebräische Parallelismus nennt „einen Esel“ und „ein Füllen der Eselin“; gemeint ist ein Tier, nicht zwei. Matthäus hat die Doppelung wörtlich genommen und schildert entsprechend zwei Tiere – ein bekanntes Beispiel dafür, wie ein Zitat die Erzählung formen kann. Die angekündigte Herrschaft reicht „von einem Meer zum andern“, wird aber ausdrücklich ohne Waffen ausgeübt.',
    interpretations: [
      {
        tradition: 'Alttestamentliche Auslegung',
        text: 'Der Esel war das Reittier des Friedens und auch früherer Herrscher. Die Pointe liegt im Kontrast zur Militärmacht der Großreiche.',
      },
      {
        tradition: 'Neutestamentliche Aufnahme',
        text: 'Alle Evangelien erzählen den Einzug in Jerusalem im Licht dieser Stelle; Matthäus zitiert sie ausdrücklich.',
      },
      {
        tradition: 'Politische Lesart',
        text: 'Die Szene wird als bewusste Gegeninszenierung zum römischen Triumphzug gelesen, der zur selben Zeit von der anderen Seite in die Stadt zog.',
      },
    ],
    crossRefs: [{ book: 'mt', chapter: 21, verse: 5 }],
  },

  /* ---------------------------------------------- Evangelien (weiter) */

  {
    book: 'mt',
    chapter: 2,
    from: 1,
    to: 12,
    title: 'Die Weisen aus dem Morgenland',
    historicalShort:
      'Der Text spricht von „Weisen“ – Magiern, also Sterndeutern, vermutlich aus dem persischen Raum. Weder ihre Zahl noch ihr Königtum steht im Text; beides sind spätere Zuschreibungen, die Zahl drei folgt aus den drei Gaben.',
    historicalLong:
      'Astronomisch wird das Gestirn unterschiedlich erklärt: als Zusammentreffen von Jupiter und Saturn im Jahr 7 v. Chr., als Komet oder als Nova. Erzählerisch ist die Pointe eine andere: Ausgerechnet Fremde mit einer religiös verdächtigen Profession finden das Kind, während die Schriftgelehrten in Jerusalem die richtige Stelle nennen können und trotzdem sitzen bleiben.',
    interpretations: [
      {
        tradition: 'Matthäische Theologie',
        text: 'Von Anfang an kommen Nichtjuden zu Jesus. Das Evangelium, das am stärksten jüdisch geprägt ist, beginnt mit dieser Öffnung.',
      },
      {
        tradition: 'Politische Lesart',
        text: 'Die Erzählung stellt zwei Könige gegeneinander: Herodes in seinem Palast und ein Kind in Bethlehem. Der anschließende Kindermord ist historisch nicht belegt, entspricht aber dem überlieferten Bild des Herrschers.',
      },
      {
        tradition: 'Volksfrömmigkeit',
        text: 'Aus den Weisen wurden im Mittelalter drei Könige mit Namen und Reliquien. Die Wirkungsgeschichte ist reich, entfernt sich aber weit vom Text.',
      },
    ],
    crossRefs: [{ book: 'mi', chapter: 5, verse: 1 }],
  },
  {
    book: 'mt',
    chapter: 16,
    from: 13,
    to: 20,
    title: '„Du bist Petrus“',
    historicalShort:
      'Das Wortspiel funktioniert im Griechischen wie im Aramäischen: petros/petra beziehungsweise kefa heißt „Fels“. Der Satz gehört zu den folgenreichsten der Kirchengeschichte.',
    historicalLong:
      'Umstritten ist, worauf sich „dieser Fels“ bezieht: auf die Person des Petrus, auf sein Bekenntnis oder auf Christus selbst. Alle drei Deutungen sind alt und lassen sich am Text vertreten. „Schlüssel“ und „binden und lösen“ sind rabbinische Wendungen für die Vollmacht, verbindlich auszulegen und über Zugehörigkeit zu entscheiden. Nur wenige Verse später wird derselbe Petrus „Satan“ genannt.',
    interpretations: [
      {
        tradition: 'Katholische Auslegung',
        text: 'Die Zusage gilt Petrus persönlich und geht auf seine Nachfolger über – die Grundlage des päpstlichen Primats.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Der Fels ist das Bekenntnis, nicht die Person. Die Schlüsselgewalt kommt der ganzen Gemeinde zu.',
      },
      {
        tradition: 'Orthodoxe Auslegung',
        text: 'Petrus steht stellvertretend für alle Apostel; ein Vorrang der Ehre wird anerkannt, ein Vorrang der Jurisdiktion nicht.',
      },
      {
        tradition: 'Exegetische Beobachtung',
        text: 'Der unmittelbare Zusammenhang dämpft jede Überhöhung: Auf die Zusage folgt der schärfste Tadel des ganzen Evangeliums.',
      },
    ],
    crossRefs: [{ book: 'mt', chapter: 16, verse: 23 }],
  },
  {
    book: 'mt',
    chapter: 22,
    from: 15,
    to: 22,
    title: 'Der Zinsgroschen',
    historicalShort:
      'Die Frage ist eine Falle: Ein Ja hätte Jesus bei der Bevölkerung erledigt, ein Nein wäre Aufruhr gewesen. Die Kopfsteuer war Zeichen der Unterwerfung und musste in römischer Münze gezahlt werden.',
    historicalLong:
      'Der Denar trug das Bild des Kaisers und die Aufschrift „Tiberius Caesar, Sohn des vergöttlichten Augustus“ – für fromme Juden ein doppelter Anstoß. Dass die Fragesteller die Münze sofort zur Hand haben, entlarvt sie beiläufig. Die Antwort entscheidet nichts, sondern gibt die Frage zurück: Was trägt Gottes Bild? Nach 1. Mose 1 der Mensch.',
    interpretations: [
      {
        tradition: 'Klassische Auslegung',
        text: 'Der Satz begründete die Unterscheidung zweier Bereiche und wurde zur Grundlage der Zwei-Reiche-Lehre.',
      },
      {
        tradition: 'Politische Lesart',
        text: 'Keine Aufteilung, sondern eine Rangordnung: Wenn dem Menschen Gottes Bild eingeprägt ist, hat der Kaiser nur Anspruch auf sein Metall.',
      },
      {
        tradition: 'Wirkungsgeschichtliche Warnung',
        text: 'Der Vers wurde vielfach zur Rechtfertigung bedingungsloser Staatstreue benutzt – eine Verwendung, die der Zusammenhang nicht deckt.',
      },
    ],
    crossRefs: [{ book: '1mo', chapter: 1, verse: 27 }],
  },
  {
    book: 'mk',
    chapter: 2,
    from: 1,
    to: 12,
    title: 'Der Gelähmte durch das Dach',
    historicalShort:
      'Die Dächer waren flach, aus Balken, Zweigen und Lehm – über eine Außentreppe zugänglich und mit Werkzeug tatsächlich zu öffnen. Der Text sagt wörtlich, dass sie es „aufgruben“.',
    historicalLong:
      'Der Anstoß liegt nicht in der Heilung, sondern im Satz „Dir sind deine Sünden vergeben“. Die Passivform vermeidet den Gottesnamen; genau das wird als Anmaßung verstanden. Bemerkenswert ist, dass der Text vom Glauben der Freunde spricht, nicht von dem des Kranken – Glaube erscheint hier als etwas, das andere für einen aufbringen können.',
    interpretations: [
      {
        tradition: 'Markinische Theologie',
        text: 'Die erste von fünf Streitgesprächen: Von hier an wächst der Konflikt, der zum Kreuz führt.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Die vier Träger tun das Nötige, ohne zu fragen, ob es sich gehört. Der Text erzählt Solidarität als Form des Glaubens.',
      },
      {
        tradition: 'Historische Beobachtung',
        text: 'Krankheit wurde vielfach mit Schuld verbunden. Die Reihenfolge – erst Vergebung, dann Heilung – nimmt diese Verknüpfung auf und löst sie zugleich.',
      },
    ],
  },
  {
    book: 'mk',
    chapter: 7,
    from: 24,
    to: 30,
    title: 'Die syrophönizische Frau',
    historicalShort:
      'Die einzige Stelle in den Evangelien, an der jemand ein Streitgespräch mit Jesus gewinnt – und es ist eine Frau, eine Nichtjüdin, aus der wohlhabenden Küstenregion.',
    historicalLong:
      'Die Abweisung ist hart: „Es ist nicht fein, dass man den Kindern das Brot nehme und werfe es vor die Hunde.“ Die Frau widerspricht nicht, sondern nimmt das Bild auf und dreht es um. Der Text stellt nicht dar, dass Jesus sie prüfen wollte – er lässt die Härte stehen und erzählt, dass ihre Antwort ihn umstimmt.',
    interpretations: [
      {
        tradition: 'Klassische Auslegung',
        text: 'Die Abweisung gilt als Prüfung ihres Glaubens, den Jesus ausdrücklich lobt.',
      },
      {
        tradition: 'Neuere Exegese',
        text: 'Der Text wird beim Wort genommen: Jesus ändert seine Haltung. Das passt zu Markus, der ihn menschlicher zeichnet als die anderen Evangelien.',
      },
      {
        tradition: 'Feministische und postkoloniale Auslegung',
        text: 'Hervorgehoben wird, dass eine mehrfach benachteiligte Frau die Grenze verschiebt – und dass die frühe Kirche diese für sie unbequeme Erzählung bewahrt hat.',
      },
    ],
  },
  {
    book: 'lk',
    chapter: 16,
    from: 19,
    to: 31,
    title: 'Der reiche Mann und der arme Lazarus',
    historicalShort:
      'Der Arme hat einen Namen, der Reiche nicht – im Erzählen der Antike eine bewusste Umkehrung. Lazarus bedeutet „Gott hilft“.',
    historicalLong:
      'Das Motiv der Umkehrung der Verhältnisse nach dem Tod ist auch aus ägyptischen und rabbinischen Erzählungen bekannt; Jesus greift eine bekannte Form auf. Die Pointe liegt aber nicht in der Jenseitsschilderung, sondern im Schlusssatz: Wer auf Mose und die Propheten nicht hört, wird sich auch durch einen Auferstandenen nicht überzeugen lassen. Vorgeworfen wird dem Reichen nichts Kriminelles – nur, dass er den Armen vor seiner Tür täglich übersah.',
    interpretations: [
      {
        tradition: 'Sozialethische Auslegung',
        text: 'Die Erzählung richtet sich gegen die Gleichgültigkeit, nicht gegen den Reichtum als solchen. Das Versäumnis ist ein Unterlassen.',
      },
      {
        tradition: 'Warnung vor Überdehnung',
        text: 'Die Schilderung von Abrahams Schoß und der Kluft ist Erzählmittel, keine Lehre über den Zustand der Toten. Sie so zu lesen, überfordert den Text.',
      },
      {
        tradition: 'Lukanische Theologie',
        text: 'Der Abschnitt gehört zu den Umkehrungstexten des Evangeliums – wie schon im Magnificat: Hungrige werden gesättigt, Reiche gehen leer aus.',
      },
    ],
    crossRefs: [{ book: 'lk', chapter: 1, verse: 53 }],
  },
  {
    book: 'lk',
    chapter: 23,
    from: 32,
    to: 43,
    title: 'Der Verbrecher am Kreuz',
    historicalShort:
      'Nur Lukas erzählt, dass einer der Mitgekreuzigten Zuspruch erhält. Das Wort „Paradies“ ist persischen Ursprungs und bezeichnet einen umfriedeten Garten.',
    historicalLong:
      'Auffällig ist die Bitte: „Gedenke an mich, wenn du in dein Reich kommst“ – sie rechnet mit einer fernen Zukunft. Die Antwort verschiebt den Zeitpunkt auf „heute“, ein Schlüsselwort des Lukasevangeliums. Der Mann bringt keine Leistung mit, nicht einmal Zeit; er wird angenommen, wie er ist.',
    interpretations: [
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Ein Kronzeuge für die Rechtfertigung allein aus Gnade: Hier ist keine Frist mehr für gute Werke.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Text wird traditionell bei Sterbenden gelesen. Er verspricht Nähe, nicht Erklärung.',
      },
      {
        tradition: 'Exegetische Beobachtung',
        text: 'Das Bittgebet richtet sich an einen Sterbenden. Genau darin liegt die Zumutung der Szene: Vertrauen ohne jedes sichtbare Anzeichen.',
      },
    ],
  },
  {
    book: 'joh',
    chapter: 13,
    from: 1,
    to: 17,
    title: 'Die Fußwaschung',
    historicalShort:
      'Fußwaschung war die Aufgabe von Sklaven – und zwar nichtjüdischen, weil sie einem jüdischen Sklaven nicht zugemutet werden durfte. Jesus übernimmt eine Tätigkeit, die als entwürdigend galt.',
    historicalLong:
      'Johannes erzählt kein Abendmahl; an dessen Stelle steht diese Szene. Der Widerstand des Petrus ist verständlich: Die Umkehrung der Rollen war schwerer zu ertragen als ein Dienst. Am Ende steht kein Gefühl, sondern ein Auftrag – „so sollt auch ihr einander die Füße waschen“.',
    interpretations: [
      {
        tradition: 'Johanneische Theologie',
        text: 'Die Szene deutet das Kreuz im Voraus: Erniedrigung als Ausdruck der Liebe „bis ans Ende“.',
      },
      {
        tradition: 'Liturgische Praxis',
        text: 'In vielen Kirchen wird die Fußwaschung am Gründonnerstag vollzogen – in manchen Traditionen als eigene Handlung neben Taufe und Abendmahl.',
      },
      {
        tradition: 'Ethische Auslegung',
        text: 'Der Text formuliert ein Leitungsverständnis: Wer vorangeht, tut die Arbeit, die sonst niemand tun will.',
      },
    ],
  },

  /* ---------------------------------------- Frühe Kirche und Briefe */

  {
    book: 'apg',
    chapter: 10,
    from: 1,
    to: 33,
    title: 'Kornelius – die entscheidende Wende',
    historicalShort:
      'Ein römischer Offizier wird ohne vorherigen Übertritt zum Judentum aufgenommen. Damit fällt die Schwelle, an der sich entschied, ob die junge Bewegung eine innerjüdische Gruppe bleibt.',
    historicalLong:
      'Die Erzählung nimmt sich auffällig viel Raum – die Vision wird gleich mehrfach wiederholt. Petrus muss selbst überzeugt werden: Seine Antwort auf die Aufforderung, Unreines zu essen, ist ein glattes Nein. Die Wende formuliert er erst, nachdem er den Geist bei den Anwesenden wirken sieht: „Nun erfahre ich mit der Wahrheit, dass Gott die Person nicht ansieht.“ Kornelius wird als „gottesfürchtig“ bezeichnet – ein feststehender Ausdruck für Nichtjuden im Umfeld der Synagoge.',
    interpretations: [
      {
        tradition: 'Lukanische Theologie',
        text: 'Nicht Menschen öffnen die Tür, sondern Gott geht voraus. Die Kirche kommt hinterher und erkennt an, was schon geschehen ist.',
      },
      {
        tradition: 'Kirchengeschichtliche Einordnung',
        text: 'Ohne diese Weichenstellung wäre das Christentum vermutlich eine jüdische Sondergruppe geblieben.',
      },
      {
        tradition: 'Gegenwärtige Rezeption',
        text: 'Der Abschnitt wird in Debatten über Zugehörigkeit häufig herangezogen: Er zeigt eine Kirche, die ihre eigenen Grenzen korrigieren musste.',
      },
    ],
    crossRefs: [{ book: 'apg', chapter: 15, verse: 7 }],
  },
  {
    book: 'roem',
    chapter: 13,
    from: 1,
    to: 7,
    title: 'Die Frage nach der Obrigkeit',
    historicalShort:
      'Paulus schreibt an Christen in der Hauptstadt, wenige Jahre bevor Nero sie verfolgen ließ. Der Abschnitt gehört zu den folgenreichsten und am schwersten belasteten Texten der Bibel.',
    historicalLong:
      'Der Zusammenhang wird oft übersehen: Unmittelbar davor steht das Verbot der Vergeltung, unmittelbar danach das Gebot der Liebe als „Erfüllung des Gesetzes“. Anlass war vermutlich eine konkrete Lage – Steuerunruhen in Rom und die Rückkehr zuvor vertriebener Judenchristen. Der Text nennt zudem eine Bedingung: Die Obrigkeit ist „Gottes Dienerin, dir zugut“. Was gilt, wenn sie das Gegenteil tut, sagt er nicht.',
    interpretations: [
      {
        tradition: 'Traditionelle Auslegung',
        text: 'Staatliche Ordnung ist von Gott gewollt; Christen sollen sich einfügen und ihre Pflichten erfüllen.',
      },
      {
        tradition: 'Kritische Wirkungsgeschichte',
        text: 'Der Text wurde zur Rechtfertigung von Gehorsam gegenüber Unrechtsregimen benutzt, auch im Nationalsozialismus. Die Barmer Theologische Erklärung von 1934 widersprach dieser Verwendung ausdrücklich.',
      },
      {
        tradition: 'Widerstandstheologie',
        text: 'Verwiesen wird auf Apostelgeschichte 5: „Man muss Gott mehr gehorchen als den Menschen.“ Beide Aussagen stehen im Neuen Testament nebeneinander und begrenzen einander.',
      },
    ],
    crossRefs: [
      { book: 'apg', chapter: 5, verse: 29 },
      { book: 'offb', chapter: 13, verse: 7, note: 'Der Staat als Bedrohung' },
    ],
  },
  {
    book: '1kor',
    chapter: 11,
    from: 17,
    to: 34,
    title: 'Das Abendmahl in Korinth',
    historicalShort:
      'Der älteste Bericht über das letzte Mahl steht nicht in einem Evangelium, sondern hier – geschrieben, weil in Korinth die Wohlhabenden aßen, bevor die Armen von der Arbeit kamen.',
    historicalLong:
      'Gemeindeversammlungen fanden in Privathäusern statt. Der Speiseraum bot wenigen Platz, der Innenhof den übrigen – die soziale Trennung war baulich vorgegeben. Paulus nennt das Verhalten so scharf, dass er sagt, ihre Zusammenkunft sei „nicht zum Besseren, sondern zum Ärgeren“. Das „unwürdige“ Essen meint im Zusammenhang genau dies: die Missachtung der Ärmeren, nicht eine innere Unwürdigkeit des Einzelnen.',
    interpretations: [
      {
        tradition: 'Exegetische Klarstellung',
        text: 'Die verbreitete Angst vor „unwürdigem“ Empfang trifft nicht, was Paulus meint. Er spricht über soziales Verhalten in der Gemeinde.',
      },
      {
        tradition: 'Konfessionelle Unterschiede',
        text: 'Über das Verständnis von „Das ist mein Leib“ trennten sich die Kirchen jahrhundertelang. Die Lima-Erklärung von 1982 und spätere Gespräche haben viele Gegensätze entschärft.',
      },
      {
        tradition: 'Sozialgeschichtliche Lesart',
        text: 'Das Abendmahl ist von Anfang an eine soziale Probe: Wer daran teilnimmt, ohne die Bedürftigen zu sehen, verfehlt es.',
      },
    ],
    crossRefs: [{ book: 'lk', chapter: 22, verse: 19 }],
  },
  {
    book: 'kol',
    chapter: 1,
    from: 15,
    to: 20,
    title: 'Der Christushymnus des Kolosserbriefs',
    historicalShort:
      'Ein weiterer früher Hymnus, den der Brief zitiert. Er ordnet Christus nicht in die Welt ein, sondern die Welt in ihn – einschließlich der Mächte, vor denen die Angesprochenen sich fürchteten.',
    historicalLong:
      'Der Text nennt ausdrücklich „Throne, Herrschaften, Fürstentümer, Obrigkeiten“ – Bezeichnungen für Mächte, die man als eigenständige Größen fürchtete. Sie werden nicht bestritten, sondern eingeordnet. Der Schluss ist bemerkenswert weit gefasst: versöhnt wird „alles“, was auf Erden und im Himmel ist.',
    interpretations: [
      {
        tradition: 'Dogmatische Auslegung',
        text: 'Einer der Grundtexte für die Aussage, dass Christus an der Schöpfung beteiligt ist – aufgenommen im Bekenntnis von Nizäa.',
      },
      {
        tradition: 'Schöpfungstheologische Lesart',
        text: 'Die Versöhnung gilt nicht nur Menschen. Der Text wird deshalb häufig in ökologischen Zusammenhängen herangezogen.',
      },
      {
        tradition: 'Diskussion um die Reichweite',
        text: 'Ob „alles“ eine Allversöhnung meint, ist seit Origenes strittig. Die Kirchen haben diese Lehre mehrheitlich nicht übernommen, die Frage bleibt aber offen diskutiert.',
      },
    ],
    crossRefs: [{ book: 'joh', chapter: 1, verse: 3 }],
  },
  {
    book: 'phlm',
    chapter: 1,
    from: 8,
    to: 21,
    title: 'Ein Brief, der ein Machtverhältnis aushebelt',
    historicalShort:
      'Der kürzeste Paulusbrief betrifft einen einzigen Menschen: Onesimus, einen Sklaven, der zu seinem Besitzer zurückkehrt. Nach römischem Recht drohten ihm Brandmarkung oder Tod.',
    historicalLong:
      'Paulus könnte befehlen und sagt das ausdrücklich – tut es aber nicht. Stattdessen bittet er, bietet an, für den Schaden aufzukommen, und erinnert Philemon beiläufig daran, dass dieser ihm „sich selbst schuldig“ sei. Der Name Onesimus bedeutet „der Nützliche“; damit spielt der Brief mehrfach. Was Philemon tun soll, wird nie ausgesprochen: nur, dass er Onesimus „nicht mehr als einen Knecht, sondern mehr als einen Knecht, als einen lieben Bruder“ aufnehmen möge.',
    interpretations: [
      {
        tradition: 'Historische Einordnung',
        text: 'Paulus fordert die Abschaffung der Sklaverei nicht. Er unterläuft sie im Einzelfall, indem er das Verhältnis neu bestimmt.',
      },
      {
        tradition: 'Wirkungsgeschichte',
        text: 'Der Brief wurde in der Sklavereidebatte des 19. Jahrhunderts von beiden Seiten zitiert – als Beleg für Rückführungspflicht und als Argument für die Befreiung.',
      },
      {
        tradition: 'Rhetorische Beobachtung',
        text: 'Der Verzicht auf den Befehl ist selbst das Argument: Ein erzwungenes Entgegenkommen wäre wertlos.',
      },
    ],
    crossRefs: [{ book: 'gal', chapter: 3, verse: 28 }],
  },
  {
    book: 'offb',
    chapter: 3,
    from: 14,
    to: 22,
    title: 'Der Brief nach Laodizea',
    historicalShort:
      'Laodizea hatte kein eigenes gutes Wasser: Von Hierapolis kam heißes Thermalwasser, von Kolossä kaltes Quellwasser – beides erreichte die Stadt lauwarm. Das Bild ist also ortskundig gewählt.',
    historicalLong:
      'Die Stadt war für drei Dinge bekannt: Bankwesen, schwarze Wolltextilien und eine Augensalbe. Genau darauf zielt der Text – Gold, weiße Kleider und Augensalbe werden angeboten. Nach einem Erdbeben im Jahr 60 n. Chr. lehnte Laodizea römische Hilfsgelder ab und baute aus eigener Kraft wieder auf; „ich bin reich und bedarf nichts“ trifft ein reales Selbstbild.',
    interpretations: [
      {
        tradition: 'Historische Auslegung',
        text: 'Nicht Halbherzigkeit ist gemeint, wie meist gepredigt wird, sondern Nutzlosigkeit: Heiß und kalt sind beide brauchbar, lauwarm ist es nicht.',
      },
      {
        tradition: 'Ekklesiologische Lesart',
        text: 'Der Tadel gilt einer Gemeinde, der es zu gut geht. Von Verfolgung ist als einziger der sieben Gemeinden bei ihr nicht die Rede.',
      },
      {
        tradition: 'Seelsorgliche Beobachtung',
        text: 'Der schärfste der sieben Briefe endet mit dem freundlichsten Bild der Offenbarung: „Siehe, ich stehe vor der Tür und klopfe an.“',
      },
    ],
  },

  /* -------------------------------------------------------------------
   * Damit jedes der 66 Bücher wenigstens einen Artikel hat: kürzere
   * Einordnungen zu je einem Schlüsselabschnitt der bislang nicht
   * abgedeckten Bücher.
   * ----------------------------------------------------------------- */

  {
    book: '1chr',
    chapter: 29,
    from: 10,
    to: 20,
    title: 'Davids Gebet vor dem Tempelbau',
    historicalShort:
      'Der Chronist lässt David beten, bevor sein Sohn den Tempel baut. Der Kernsatz nimmt jedem Stifterstolz die Grundlage: „Von dir ist alles gekommen, und von deiner Hand haben wir dir gegeben.“',
    historicalLong:
      'Das Gebet steht am Ende einer langen Aufzählung von Spenden – Gold, Silber, Erz, Edelsteine – und dreht deren Wirkung um: Statt die Geber zu ehren, stellt es fest, dass sie nur zurückgeben. Der Satz „wir sind Fremdlinge und Gäste vor dir“ nimmt eine Wendung aus 3. Mose 25 auf, wo sie das Eigentumsrecht am Land begrenzt. Der Schlussteil des Gebets ist in die christliche Liturgie eingegangen: Die Doxologie „Dein ist das Reich und die Kraft und die Herrlichkeit“, die später an das Vaterunser angefügt wurde, stammt sprachlich aus diesem Text.',
    interpretations: [
      {
        tradition: 'Theologische Auslegung',
        text: 'Geben ist hier keine Leistung, sondern Rückgabe – ein Gedanke, der die Kollektentheologie bis heute prägt.',
      },
      {
        tradition: 'Historische Einordnung',
        text: 'Die Chronik schreibt nach dem Exil und zeichnet David bewusst als frommen Stifter, ohne die dunklen Kapitel aus 2. Samuel zu wiederholen.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Der Schluss des Gebets ist in die christliche Liturgie eingegangen: Die an das Vaterunser angefügte Doxologie stammt sprachlich von hier.',
      },
    ],
  },
  {
    book: '2chr',
    chapter: 7,
    from: 12,
    to: 22,
    title: '„Wenn mein Volk sich demütigt“',
    historicalShort:
      'Die Zusage ergeht nach der Tempelweihe und nennt ausdrücklich Bedingungen: sich demütigen, beten, Gottes Angesicht suchen, von bösen Wegen umkehren. Erst dann folgt die Verheißung der Heilung des Landes.',
    historicalLong:
      'Der Chronist schreibt für Leser, die das Exil hinter sich haben und wissen, dass es anders kam. Deshalb steht im selben Abschnitt auch die Kehrseite: Wird der Bund verlassen, wird der Tempel „zum Sprichwort und Spott unter allen Völkern“. Das hebräische „mein Volk, über das mein Name genannt ist“ bezeichnet Israel als Gottes Eigentum – die Formel wurde bei Eroberungen für unterworfene Städte verwendet. Sie meint Zugehörigkeit, nicht Auserwähltheit im Sinne eines Vorrechts.',
    interpretations: [
      {
        tradition: 'Exegetische Einordnung',
        text: 'Die Zusage gilt einem konkreten Volk in einem konkreten Bund. Die Übertragung auf beliebige Nationen ist eine spätere Anwendung, kein Textsinn.',
      },
      {
        tradition: 'Kritische Wirkungsgeschichte',
        text: 'Der Vers wird häufig politisch beansprucht. Auffällig ist, dass die geforderte Umkehr dabei meist bei anderen gesucht wird, nicht bei den Zitierenden.',
      },
      {
        tradition: 'Theologische Auslegung',
        text: 'Die vier Bedingungen richten sich nach innen, nicht nach außen: sich demütigen, beten, suchen, umkehren. Keine davon betrifft das Verhalten anderer.',
      },
    ],
  },
  {
    book: 'esr',
    chapter: 3,
    from: 10,
    to: 13,
    title: 'Weinen und Jubeln bei der Grundsteinlegung',
    historicalShort:
      'Bei der Grundsteinlegung des zweiten Tempels jubeln die Jüngeren, während die Alten weinen – sie hatten den ersten Tempel noch gesehen. Der Text sagt, man konnte beides nicht mehr voneinander unterscheiden.',
    historicalLong:
      'Rechnerisch wäre jemand, der 587 v. Chr. den ersten Tempel als Kind sah, bei der Grundsteinlegung um 536 rund sechzig Jahre alt gewesen – die Szene ist also gut vorstellbar. Der zweite Tempel blieb tatsächlich deutlich hinter dem ersten zurück; Haggai spricht wenige Jahrzehnte später ausdrücklich davon, dass er in den Augen der Alten „wie nichts“ sei. Erst Herodes ließ ihn Jahrhunderte später zu dem Prachtbau erweitern, den das Neue Testament voraussetzt.',
    interpretations: [
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Ein seltenes Bild dafür, dass Neuanfang und Trauer gleichzeitig sein können – ohne dass eines das andere aufhebt.',
      },
      {
        tradition: 'Historische Einordnung',
        text: 'Der zweite Tempel blieb hinter dem ersten deutlich zurück. Die Enttäuschung darüber zieht sich durch mehrere nachexilische Schriften.',
      },
      {
        tradition: 'Theologische Auslegung',
        text: 'Die Erzählung wertet nicht: Weder wird das Weinen getadelt noch der Jubel gebremst. Beides gehört zum selben Tag.',
      },
    ],
    crossRefs: [{ book: 'hag', chapter: 2, verse: 3 }],
  },
  {
    book: 'hld',
    chapter: 8,
    from: 5,
    to: 7,
    title: '„Liebe ist stark wie der Tod“',
    historicalShort:
      'Der Höhepunkt des Buches – und die einzige Stelle, an der es fast lehrhaft wird. Gott kommt im Hohenlied sonst nicht vor; hier klingt sein Name möglicherweise in der Wendung „eine Flamme des HERRN“ an.',
    historicalLong:
      'Die Bildwelt ist juristisch und existenziell zugleich: Siegel, Eifer, Scheol, Wasser, Kaufpreis. Der Schlusssatz – wer alles Gut seines Hauses für Liebe gäbe, würde nur verachtet – schließt jede Verrechnung aus. Dass ein Buch weltlicher Liebeslyrik in den Kanon kam, war schon in der Antike umstritten; Rabbi Akiba nannte es dennoch „das Allerheiligste“ unter den Schriften.',
    interpretations: [
      {
        tradition: 'Wörtliche Auslegung',
        text: 'Heute überwiegend als Feier menschlicher Liebe gelesen – körperlich, gegenseitig und ohne moralischen Beiton.',
      },
      {
        tradition: 'Allegorische Tradition',
        text: 'Jahrhundertelang als Bild für die Liebe zwischen Gott und Volk beziehungsweise Christus und Kirche verstanden. Diese Deutung sicherte dem Buch seinen Platz im Kanon.',
      },
      {
        tradition: 'Sprachliche Beobachtung',
        text: 'Das mit „Eifer“ übersetzte Wort meint die Unbedingtheit der Liebe, nicht Eifersucht im heutigen Sinn – es steht sonst für Gottes leidenschaftliche Zuwendung.',
      },
    ],
  },
  {
    book: 'joel',
    chapter: 2,
    from: 28,
    to: 32,
    title: 'Der Geist über alle',
    historicalShort:
      'Die Aufzählung ist bewusst umfassend: Söhne und Töchter, Alte und Junge, Knechte und Mägde. Prophetie wird damit gerade nicht auf eine Gruppe beschränkt.',
    historicalLong:
      'Bis dahin galt Prophetie als Sache Einzelner, die eigens berufen wurden. Hier wird sie auf „alles Fleisch“ ausgeweitet – ein Ausdruck, der sonst die gesamte Menschheit oder alle Lebewesen bezeichnet. Die Nennung von Knechten und Mägden ist der schärfste Punkt: Sklaven hatten weder Rechtsstellung noch Stimme. Der Abschnitt steht unmittelbar nach der Zusage, dass die Ernte wieder ertragreich sein wird – erst die materielle Wende, dann die geistliche.',
    interpretations: [
      {
        tradition: 'Neutestamentliche Aufnahme',
        text: 'Petrus zitiert den Abschnitt in seiner Pfingstpredigt als Deutung dessen, was gerade geschieht.',
      },
      {
        tradition: 'Sozialgeschichtliche Lesart',
        text: 'Dass ausdrücklich Sklavinnen und Sklaven genannt werden, war in der Antike bemerkenswert und wird bis heute in Debatten über Ämter angeführt.',
      },
      {
        tradition: 'Hinweis zur Zählung',
        text: 'In der gedruckten Lutherbibel steht dieser Abschnitt als Joel 3,1-5 – die Kapiteleinteilung weicht hier von der international üblichen ab.',
      },
    ],
    crossRefs: [{ book: 'apg', chapter: 2, verse: 17 }],
  },
  {
    book: 'obd',
    chapter: 1,
    from: 10,
    to: 15,
    title: 'Der Vorwurf an Edom',
    historicalShort:
      'Das kürzeste Buch des Alten Testaments klagt ein einziges Vergehen an: Edom hat beim Fall Jerusalems zugesehen, sich mitgefreut und Fliehende ausgeliefert. Nicht die Tat, das Danebenstehen steht im Zentrum.',
    historicalLong:
      'Der Vorwurf ist in einer Reihe von acht Verboten formuliert, die alle mit „du sollst nicht“ beginnen: nicht zusehen, nicht dich freuen, nicht großtun, nicht in das Tor ziehen, nicht die Fliehenden ausliefern. Die Steigerung führt vom Blick über die Schadenfreude bis zur Beihilfe – der Text beschreibt, wie Gleichgültigkeit in Mittäterschaft übergeht. Edom lag in einem Bergland südöstlich des Toten Meeres; die Felsenstadt Petra entstand später in dieser Region. Der Spott über die vermeintlich uneinnehmbare Höhe zielt genau darauf.',
    interpretations: [
      {
        tradition: 'Ethische Auslegung',
        text: 'Der Text formuliert früh, was später „unterlassene Hilfeleistung“ heißen wird: Zusehen ist eine Form der Beteiligung.',
      },
      {
        tradition: 'Historische Einordnung',
        text: 'Edom galt als Brudervolk – es leitete sich von Esau her. Genau das macht den Vorwurf so scharf.',
      },
      {
        tradition: 'Prophetische Linie',
        text: 'Der Schluss weitet den Blick: Aus dem Gericht über ein Volk wird der „Tag des HERRN über alle Heiden“. Das Einzelne steht für ein größeres Muster.',
      },
    ],
  },
  {
    book: 'nah',
    chapter: 1,
    from: 1,
    to: 8,
    title: 'Zuflucht und Zorn',
    historicalShort:
      'Das Buch kündigt den Fall Ninives an, der Hauptstadt einer Macht, die für ihre Grausamkeit berüchtigt war. Mitten in den Zornesbildern steht der Satz: „Der HERR ist gütig und eine Feste zur Zeit der Not.“',
    historicalLong:
      'Der Anfang des Buches ist ein teilweise erhaltenes Akrostichon: Die Verse beginnen der Reihe nach mit den Buchstaben des Alphabets. Assyrien hatte seine Kriegsführung selbst dokumentiert – Reliefs und Inschriften zeigen Massendeportationen, Pfählungen und Häutungen als Mittel der Abschreckung. Ninive fiel 612 v. Chr. an eine Koalition aus Babyloniern und Medern und wurde nie wieder aufgebaut; die Ruinen liegen heute am Rand von Mossul. Der Text spricht also von einer Macht, deren Ende tatsächlich eintrat.',
    interpretations: [
      {
        tradition: 'Theologische Auslegung',
        text: 'Zorn richtet sich hier gegen Gewaltherrschaft, nicht gegen ein Volk an sich. Für die Unterdrückten ist dieselbe Aussage Trost.',
      },
      {
        tradition: 'Kanonische Beobachtung',
        text: 'Nahum steht in auffälliger Spannung zu Jona: Dort wird Ninive verschont, hier vernichtet. Die Bibel lässt beide Bücher nebeneinander stehen.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die Gewaltbilder des Buches sind schwer erträglich. Ausgelegt wird es heute meist als Stimme der Opfer, nicht als Programm.',
      },
    ],
    crossRefs: [{ book: 'jona', chapter: 3, verse: 10 }],
  },
  {
    book: 'hab',
    chapter: 2,
    from: 1,
    to: 5,
    title: '„Der Gerechte wird aus Glauben leben“',
    historicalShort:
      'Habakuk stellt sich ausdrücklich auf die Warte und wartet auf Antwort. Was er bekommt, ist keine Erklärung, sondern ein Auftrag: die Vision aufzuschreiben, damit sie lesbar bleibt, bis sie eintrifft.',
    historicalLong:
      'Das hebräische Wort emuna meint eher Treue und Verlässlichkeit als Fürwahrhalten. Paulus zitiert den Satz nach der griechischen Fassung und macht ihn zum Kernsatz seiner Rechtfertigungslehre; über Römer 1,17 wurde er zum Auslöser von Luthers reformatorischer Wende. Damit trägt ein halber Vers aus einem der kürzesten Prophetenbücher eine der größten Wirkungsgeschichten der Bibel.',
    interpretations: [
      {
        tradition: 'Alttestamentliche Auslegung',
        text: 'Gemeint ist: Wer treu bleibt, wird die Krise überstehen – eine Aussage über Durchhalten, nicht über Rechtfertigung.',
      },
      {
        tradition: 'Paulinische Aufnahme',
        text: 'Paulus liest „aus Glauben“ als Gegenbegriff zu „aus Werken des Gesetzes“ und begründet damit seine Theologie.',
      },
      {
        tradition: 'Reformatorische Wirkung',
        text: 'Luther beschrieb das Verstehen dieses Satzes rückblickend als den Moment, in dem sich ihm die Schrift öffnete.',
      },
    ],
    crossRefs: [{ book: 'roem', chapter: 1, verse: 17 }],
  },
  {
    book: 'zef',
    chapter: 3,
    from: 14,
    to: 20,
    title: 'Gott jubelt über sein Volk',
    historicalShort:
      'Nach zwei Kapiteln voller Gerichtsankündigung endet das Buch mit einem der zärtlichsten Bilder der Bibel: Gott „wird über dir mit Freuden fröhlich sein“ und „vor Liebe stillschweigen“.',
    historicalLong:
      'Das hebräische Verb für Gottes Freude beschreibt ein lautes Jubeln, wie es sonst von Menschen bei einem Fest gesagt wird – die Rollen kehren sich um. Zefanja wirkte im 7. Jahrhundert unter König Josia; der Buchanfang führt seine Herkunft ungewöhnlich weit zurück, bis zu einem Hiskia, möglicherweise dem König. Die Wendung „vor Liebe stillschweigen“ ist sprachlich schwierig: Manche Handschriften und Übersetzungen lesen statt „schweigen“ ein ähnlich geschriebenes Wort für „erneuern“.',
    interpretations: [
      {
        tradition: 'Theologische Auslegung',
        text: 'Selten wird Gott als der dargestellt, der sich freut. Die Umkehrung der Blickrichtung – nicht wir über ihn, sondern er über uns – ist die Pointe.',
      },
      {
        tradition: 'Textkritische Beobachtung',
        text: 'Die Wendung „er wird schweigen in seiner Liebe“ ist schwierig; manche Übersetzungen lesen stattdessen „er wird dich erneuern“.',
      },
      {
        tradition: 'Kanonische Beobachtung',
        text: 'Mehrere Prophetenbücher enden mit Heilsworten nach langen Gerichtsreden. Ob diese Schlüsse ursprünglich sind, ist umstritten – ihre Stellung im Kanon ist es nicht.',
      },
    ],
  },
  {
    book: 'hag',
    chapter: 1,
    from: 2,
    to: 11,
    title: '„Ist es euch Zeit, in getäfelten Häusern zu wohnen?“',
    historicalShort:
      'Der Wiederaufbau des Tempels stockt seit Jahren, während die eigenen Häuser fertig sind. Haggai deutet Missernten und Teuerung als Folge falscher Prioritäten – seine ganze Wirksamkeit umfasst nur wenige Monate im Jahr 520 v. Chr.',
    historicalLong:
      'Kein anderes Prophetenbuch ist so genau datiert: Jede Rede trägt Tag, Monat und Regierungsjahr des Perserkönigs Darius – die erste fällt auf den 29. August 520 v. Chr. Das Wort für „getäfelt“ bezeichnet eine Verkleidung mit Holzpaneelen, damals ein Zeichen von Wohlstand. Das Bild vom „durchlöcherten Beutel“, in dem der Lohn verschwindet, beschreibt eine Erfahrung der Nachkriegswirtschaft. Haggai hatte Erfolg: Der Bau wurde wieder aufgenommen und 515 v. Chr. vollendet.',
    interpretations: [
      {
        tradition: 'Prophetische Auslegung',
        text: 'Der Vorwurf zielt nicht auf Wohlstand, sondern auf das Liegenlassen des Gemeinsamen. „Beschaut euer Tun“ ist die zentrale Aufforderung.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die direkte Verknüpfung von Ernteausfall und Ungehorsam entspricht dem Tun-Ergehen-Denken, dem Hiob und Kohelet widersprechen.',
      },
      {
        tradition: 'Historische Beobachtung',
        text: 'Haggai hatte messbaren Erfolg: Der Bau wurde binnen Wochen wieder aufgenommen und fünf Jahre später vollendet. Wenige Prophetenbücher berichten von so unmittelbarer Wirkung.',
      },
    ],
  },
  {
    book: 'mal',
    chapter: 3,
    from: 1,
    to: 7,
    title: 'Der Bote, der den Weg bereitet',
    historicalShort:
      'Der Name des Buches bedeutet selbst „mein Bote“. Angekündigt wird ein Vorläufer – und ein Läuterungsvorgang, der mit dem Bild des Silberschmelzers beschrieben wird.',
    historicalLong:
      'Ob „Maleachi“ ein Eigenname ist oder nur die Amtsbezeichnung aus Vers 1, ist seit der Antike umstritten. Das Buch ist ganz in Rede und Gegenrede gebaut: Auf jede Aussage Gottes folgt ein Einwand des Volkes – „Womit denn?“ –, den der Prophet beantwortet. Der Läuterungsvorgang zielt ausdrücklich zuerst auf die Priester, nicht auf das Volk. Als letztes Buch des christlichen Alten Testaments endet es mit der Ankündigung Elias; in der hebräischen Bibel steht es an anderer Stelle, dort schließen die Chronikbücher den Kanon.',
    interpretations: [
      {
        tradition: 'Neutestamentliche Aufnahme',
        text: 'Markus eröffnet sein Evangelium mit einem Mischzitat aus Maleachi 3 und Jesaja 40 und bezieht es auf Johannes den Täufer.',
      },
      {
        tradition: 'Jüdische Tradition',
        text: 'Die Ankündigung Elias am Ende des Buches prägt bis heute die Pessach-Feier, bei der ein Becher für ihn bereitsteht.',
      },
      {
        tradition: 'Bildliche Beobachtung',
        text: 'Der Silberschmelzer erhitzt, bis er sein Spiegelbild in der Oberfläche sieht – ein Bild, das die Läuterung als Ziel und nicht als Strafe versteht.',
      },
    ],
    crossRefs: [{ book: 'mk', chapter: 1, verse: 2 }],
  },
  {
    book: '1thess',
    chapter: 4,
    from: 13,
    to: 18,
    title: 'Trauer, aber nicht ohne Hoffnung',
    historicalShort:
      'Die junge Gemeinde war beunruhigt: Was ist mit denen, die vor der erwarteten Wiederkunft gestorben sind? Paulus verbietet die Trauer nicht – er nimmt ihr die Aussichtslosigkeit.',
    historicalLong:
      'Der Text gehört zum ältesten erhaltenen christlichen Schrifttum. Die Bildsprache – Posaune, Wolken, Entgegenkommen – stammt aus dem Zeremoniell eines Herrscherbesuchs: Die Bürger gingen dem Ankommenden vor die Stadt entgegen und geleiteten ihn herein. Von einem Fortgeholtwerden von der Erde ist im Bild gerade nicht die Rede.',
    interpretations: [
      {
        tradition: 'Klassische Auslegung',
        text: 'Der Abschnitt ist Trostwort, nicht Fahrplan. Sein Ziel steht im letzten Satz: „So tröstet euch nun mit diesen Worten.“',
      },
      {
        tradition: 'Dispensationalistische Lesart',
        text: 'In Teilen evangelikaler Theologie wird hier eine Entrückung vor einer Trübsalszeit gelesen – eine Vorstellung, die erst im 19. Jahrhundert entstand und von den meisten Kirchen nicht geteilt wird.',
      },
      {
        tradition: 'Seelsorgliche Praxis',
        text: 'Einer der meistgelesenen Texte bei Bestattungen, gerade weil er die Trauer ausdrücklich zulässt.',
      },
    ],
  },
  {
    book: '2thess',
    chapter: 3,
    from: 6,
    to: 13,
    title: '„Wer nicht arbeiten will, soll auch nicht essen“',
    historicalShort:
      'Der Satz richtet sich gegen Gemeindeglieder, die wegen der erwarteten Wiederkunft die Arbeit niedergelegt hatten und sich von anderen versorgen ließen – nicht gegen Menschen, die keine Arbeit finden.',
    historicalLong:
      'Das griechische Wort für die Betreffenden bedeutet wörtlich „ungeordnet“ und stammt aus der Militärsprache: jemand, der aus der Reihe tritt. Paulus verweist auf sein eigenes Beispiel – er habe Tag und Nacht gearbeitet, um niemandem zur Last zu fallen. Als Zeltmacher übte er ein Handwerk aus, was in der griechischen Oberschicht als unter der Würde eines Lehrers galt. Der Abschnitt schließt mit der Mahnung, den Betreffenden nicht als Feind zu behandeln, sondern als Bruder zurechtzuweisen.',
    interpretations: [
      {
        tradition: 'Exegetische Klarstellung',
        text: 'Der Text spricht von „nicht wollen“, ausdrücklich nicht von „nicht können“. Als Sozialprinzip gelesen, verkehrt er seinen Sinn.',
      },
      {
        tradition: 'Wirkungsgeschichte',
        text: 'Der Satz stand in der Verfassung der Sowjetunion und wird bis heute in Sozialstaatsdebatten zitiert – meist ohne seinen Anlass.',
      },
      {
        tradition: 'Seelsorgliche Beobachtung',
        text: 'Der Abschnitt endet mit der ausdrücklichen Mahnung, die Betreffenden nicht als Feinde zu behandeln. Die Zurechtweisung bleibt innerhalb der Gemeinschaft.',
      },
    ],
  },
  {
    book: '1tim',
    chapter: 2,
    from: 8,
    to: 15,
    title: 'Ein umstrittener Abschnitt über Frauen',
    historicalShort:
      'Der Text untersagt Frauen das Lehren und fordert Unterordnung – und steht damit in Spannung zu anderen Stellen des Neuen Testaments, in denen Frauen leiten, prophetisch reden und als Apostel bezeichnet werden.',
    historicalLong:
      'Das entscheidende griechische Wort authentein kommt im ganzen Neuen Testament nur hier vor; seine Bedeutung reicht von „Autorität ausüben“ bis „sich anmaßen“ und ist deshalb umstritten. Der Schlusssatz über das Gerettetwerden durch Kindergebären gehört zu den schwierigsten des Neuen Testaments; keine der vorgeschlagenen Deutungen hat sich durchgesetzt. Zugleich nennt Paulus in Römer 16 eine Diakonin Phöbe, die Apostelin Junia und mehrere Mitarbeiterinnen.',
    interpretations: [
      {
        tradition: 'Traditionelle Auslegung',
        text: 'Die Anweisung wird als bleibend gültige Ordnung verstanden. Sie prägt bis heute die Praxis mehrerer Kirchen und Gemeindebünde.',
      },
      {
        tradition: 'Historisch-kontextuelle Auslegung',
        text: 'Der Abschnitt reagiert auf eine bestimmte Lage – vermutlich auf Irrlehren in Ephesus. Die Mehrheit der evangelischen Kirchen ordiniert Frauen und beruft sich dabei auf Galater 3,28 und die Mitarbeiterinnen des Paulus.',
      },
      {
        tradition: 'Literarkritische Position',
        text: 'Weil die Pastoralbriefe überwiegend als nachpaulinisch gelten, wird der Text als Zeugnis einer späteren, stärker angepassten Gemeindeordnung gelesen.',
      },
      {
        tradition: 'Redaktioneller Hinweis',
        text: 'Diese Stelle wird in den Kirchen bis heute unterschiedlich beantwortet. Die Darstellung nennt die Positionen, ohne eine davon als die richtige auszuzeichnen.',
      },
    ],
    crossRefs: [
      { book: 'gal', chapter: 3, verse: 28 },
      { book: 'roem', chapter: 16, verse: 7 },
    ],
  },
  {
    book: '2tim',
    chapter: 3,
    from: 14,
    to: 17,
    title: '„Alle Schrift von Gott eingegeben“',
    historicalShort:
      'Als der Satz geschrieben wurde, gab es das Neue Testament noch nicht. „Schrift“ meint hier die Schriften Israels, die Timotheus „von Kind auf“ kennt.',
    historicalLong:
      'Das griechische theopneustos heißt wörtlich „gottgehaucht“ und kommt sonst nirgends vor. Der Satz nennt auch den Zweck: nützlich zur Lehre, zur Zurechtweisung, zur Erziehung – also praktisch, nicht als Aussage über die Beschaffenheit des Textes. Von Irrtumslosigkeit ist nicht die Rede.',
    interpretations: [
      {
        tradition: 'Verbalinspirationslehre',
        text: 'In Teilen evangelikaler Theologie gilt der Vers als Beleg dafür, dass die Bibel in allen Aussagen irrtumsfrei ist.',
      },
      {
        tradition: 'Historisch-kritische Auslegung',
        text: 'Der Vers beschreibt die Wirkung der Schrift, nicht ihre Entstehung. Inspiration wird als Zusage verstanden, dass Gott durch diese Texte redet.',
      },
      {
        tradition: 'Katholische Position',
        text: 'Die Schrift wird zusammen mit der Überlieferung und dem Lehramt gelesen; das Zweite Vatikanum bindet die Inspiration an das, was „um unseres Heiles willen“ aufgezeichnet ist.',
      },
    ],
  },
  {
    book: 'tit',
    chapter: 3,
    from: 3,
    to: 8,
    title: 'Was zuerst kommt',
    historicalShort:
      'Der Abschnitt beschreibt zuerst schonungslos, wie es vorher war – „unverständig, ungehorsam, verführt“ – und stellt dem die erschienene Güte Gottes gegenüber. Erst danach ist von guten Werken die Rede.',
    historicalLong:
      'Das griechische Wort philanthropia, das Luther mit „Leutseligkeit“ übersetzt, heißt wörtlich „Menschenfreundlichkeit“ und war ein geläufiger Herrschertitel: So rühmte man hellenistische Könige und römische Kaiser. Der Brief überträgt den Titel auf Gott. Auffällig ist auch die Formulierung über die Vergangenheit – „auch wir waren einst“ –, die jede Überheblichkeit gegenüber Außenstehenden von vornherein ausschließt. Kreta hatte in der Antike einen schlechten Ruf, den der Brief an anderer Stelle sogar zitiert.',
    interpretations: [
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Die Reihenfolge trägt die Aussage: „nicht um der Werke willen“ steht vor der Aufforderung, gute Werke zu tun.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Der Satz von der erschienenen „Freundlichkeit und Leutseligkeit Gottes“ gehört zu den klassischen Weihnachtstexten.',
      },
      {
        tradition: 'Ethische Auslegung',
        text: 'Die Erinnerung „auch wir waren einst unverständig“ nimmt jeder Überheblichkeit gegenüber Außenstehenden den Boden – das ist der eigentliche Zweck der Aufzählung.',
      },
    ],
  },
  {
    book: '1petr',
    chapter: 3,
    from: 13,
    to: 17,
    title: 'Rechenschaft über die Hoffnung',
    historicalShort:
      'Der Brief richtet sich an Christen, die als Minderheit auffielen und deshalb erklären mussten, warum sie anders lebten. Verlangt wird eine Antwort – „mit Sanftmut und Furcht“.',
    historicalLong:
      'Das griechische Wort apologia stammt aus der Gerichtssprache: die Verteidigungsrede eines Angeklagten. Von einer Missionsoffensive ist also nicht die Rede, sondern von der Fähigkeit, auf Nachfrage Auskunft zu geben. Der Zusatz über die Art und Weise ist Teil des Auftrags, nicht Beiwerk.',
    interpretations: [
      {
        tradition: 'Apologetische Tradition',
        text: 'Der Vers gilt als Grundlage aller theologischen Rechenschaft und gab der Disziplin der Apologetik ihren Namen.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Gefragt ist nach der Hoffnung, nicht nach einem Lehrsystem – und nach der eigenen, nicht nach einer fremden.',
      },
      {
        tradition: 'Ethische Beobachtung',
        text: 'Die geforderte Sanftmut schließt Rechthaberei aus. Wie geantwortet wird, gehört zur Antwort.',
      },
    ],
  },
  {
    book: '2petr',
    chapter: 3,
    from: 8,
    to: 15,
    title: 'Warum es dauert',
    historicalShort:
      'Der Brief antwortet auf Spott: Die erwartete Wiederkunft blieb aus. Die Antwort deutet den Aufschub um – nicht als Säumigkeit, sondern als Geduld, die Zeit zur Umkehr lässt.',
    historicalLong:
      'Der Satz von den tausend Jahren zitiert Psalm 90 und dreht ihn um: Dort geht es um die Vergänglichkeit des Menschen, hier um die Unvergleichbarkeit von Gottes Zeitmaß. Der Brief nimmt zudem Bezug auf die Paulusbriefe und nennt sie in einem Atemzug mit „den andern Schriften“ – ein früher Hinweis darauf, dass christliche Texte selbst als maßgeblich zu gelten begannen. Er räumt dabei freimütig ein, in ihnen sei „etliches schwer zu verstehen“.',
    interpretations: [
      {
        tradition: 'Theologische Auslegung',
        text: '„Tausend Jahre sind vor dem Herrn wie ein Tag“ ist kein Rechenschlüssel für Endzeitkalkulationen, sondern eine Aussage über die Unvergleichbarkeit von Gottes Zeit.',
      },
      {
        tradition: 'Historische Einordnung',
        text: 'Der Brief gilt als eine der spätesten Schriften des Neuen Testaments. Er zeigt, wie die Gemeinden mit der ausbleibenden Naherwartung umgingen.',
      },
      {
        tradition: 'Kanongeschichtliche Beobachtung',
        text: 'Der Brief nennt die Paulusbriefe in einem Atemzug mit „den andern Schriften“ – einer der frühesten Hinweise darauf, dass christliche Texte selbst maßgeblich wurden.',
      },
    ],
  },
  {
    book: '2joh',
    chapter: 1,
    from: 4,
    to: 11,
    title: 'Wahrheit und Gastfreundschaft',
    historicalShort:
      'Der kurze Brief richtet sich an eine Gemeinde, die als „auserwählte Frau“ angesprochen wird. Es geht um Wanderprediger: Wer eine andere Lehre bringt, soll nicht aufgenommen werden.',
    historicalLong:
      'Ob mit der „auserwählten Frau“ eine einzelne Person oder bildlich eine Gemeinde gemeint ist, wird seit der Alten Kirche diskutiert; die Mehrheit versteht es bildlich, weil der Brief durchweg im Plural weiterspricht. Strittig war offenbar, ob Jesus wirklich leiblich gekommen sei – die Gegner werden ausdrücklich so beschrieben. Da Gastfreundschaft in Privathäusern die einzige Grundlage der Wandermission war, kam ihre Verweigerung einem Ausschluss gleich. Mit 13 Versen ist es das zweitkürzeste Buch der Bibel.',
    interpretations: [
      {
        tradition: 'Historische Einordnung',
        text: 'Gastfreundschaft war die Infrastruktur der frühen Mission – wer sie verweigerte, schnitt eine Lehre praktisch ab.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die Anweisung wurde später zur Rechtfertigung von Ausgrenzung benutzt. Der Brief selbst hat eine konkrete Streitlage im Blick, keine allgemeine Regel für den Umgang mit Andersdenkenden.',
      },
      {
        tradition: 'Theologische Einordnung',
        text: 'Strittig war die leibliche Menschwerdung Jesu. Der Brief verteidigt damit keine Nebenfrage, sondern das, was ihm als Kern galt.',
      },
    ],
  },
  {
    book: '3joh',
    chapter: 1,
    from: 5,
    to: 12,
    title: 'Ein Konflikt um Macht in der Gemeinde',
    historicalShort:
      'Diotrephes, „der unter ihnen hochgehalten sein will“, nimmt Reisende nicht auf und schließt sogar aus, wer es tut. Der Brief nennt den Konflikt offen beim Namen – ein seltener Einblick in den Alltag früher Gemeinden.',
    historicalLong:
      'Der Brief ist mit 14 Versen das kürzeste Buch der Bibel und der einzige neutestamentliche Text, der einen innergemeindlichen Machtkonflikt mit Namen schildert. Drei Personen stehen einander gegenüber: Gaius, der aufnimmt; Diotrephes, der ausschließt; Demetrius, für den gebürgt wird. Bemerkenswert ist, dass der „Älteste“ keine Amtsgewalt geltend macht – er kündigt lediglich an, beim nächsten Besuch das Verhalten zur Sprache zu bringen. Feste Leitungsstrukturen gab es offenbar noch nicht.',
    interpretations: [
      {
        tradition: 'Kirchengeschichtliche Einordnung',
        text: 'Der Streit lässt sich als frühe Auseinandersetzung zwischen ortsfester Leitung und wandernden Verkündigern lesen.',
      },
      {
        tradition: 'Ethische Auslegung',
        text: 'Die Gegenüberstellung ist deutlich: Gaius wird für seine Gastfreundschaft gelobt, Diotrephes für sein Geltungsstreben getadelt.',
      },
      {
        tradition: 'Beobachtung zur Leitung',
        text: 'Der Verfasser beruft sich auf kein Amt und droht keine Sanktion an – er kündigt lediglich an, das Verhalten anzusprechen. Feste Strukturen gab es offenbar noch nicht.',
      },
    ],
  },
  {
    book: 'jud',
    chapter: 1,
    from: 17,
    to: 25,
    title: 'Streiten – und barmherzig bleiben',
    historicalShort:
      'Nach scharfen Worten gegen eingedrungene Lehren endet der Brief überraschend milde: „Und erbarmt euch etlicher, die da zweifeln.“ Zweifel erscheint als etwas, dem man mit Erbarmen begegnet.',
    historicalLong:
      'Der Brief zitiert außerbiblische Schriften – das Henochbuch ausdrücklich –, was in der Alten Kirche seine Aufnahme in den Kanon verzögerte. Der abschließende Lobpreis gehört zu den bekanntesten Segensworten und wird bis heute im Gottesdienst verwendet.',
    interpretations: [
      {
        tradition: 'Ethische Auslegung',
        text: 'Der Brief hält beides zusammen: klare Grenzen in der Sache und Barmherzigkeit gegenüber Personen.',
      },
      {
        tradition: 'Kanongeschichtliche Beobachtung',
        text: 'Die Zitate aus dem Henochbuch zeigen, dass die Grenzen der maßgeblichen Schriften im 1. Jahrhundert noch nicht festlagen.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Der abschließende Lobpreis – „dem, der euch behüten kann ohne Fehl“ – gehört bis heute zu den verbreitetsten Segensworten im Gottesdienst.',
      },
    ],
  },

  /* ================================================================
   * Nachgezogen: Bücher, die bisher nur einen Artikel hatten.
   * Schwerpunkt Geschichtsbücher und Propheten – sie tragen die
   * historische Linie und sind ohne Einordnung am schwersten zu lesen.
   * ================================================================ */

  {
    book: '3mo',
    chapter: 19,
    from: 9,
    to: 18,
    title: 'Die Nächstenliebe im Heiligkeitsgesetz',
    historicalShort:
      'Der Satz „Du sollst deinen Nächsten lieben wie dich selbst“ steht nicht im Neuen Testament zuerst, sondern hier – mitten in einer Reihe sehr handfester Sozialvorschriften über Ernte, Lohn und Rechtsprechung.',
    historicalLong:
      'Kapitel 17–26 fasst man als „Heiligkeitsgesetz“ zusammen. Auffällig ist, wie unpathetisch die Liebe hier bestimmt wird: Man lässt die Ränder des Feldes ungeerntet, damit Arme und Fremde etwas finden; man zahlt den Tagelohn noch am selben Abend, weil er davon lebt; man beugt das Recht nicht, weder zugunsten des Armen noch des Mächtigen. Erst am Ende dieser Kette steht der berühmte Satz. Liebe ist hier keine Empfindung, sondern eine Weise, mit Besitz und Macht umzugehen. Neun Verse später wird dieselbe Liebe ausdrücklich auf den Fremden ausgeweitet.',
    interpretations: [
      {
        tradition: 'Jüdische Auslegung',
        text: 'Rabbi Akiba nannte diesen Vers „das große Prinzip der Tora“. Hillel gab dieselbe Sache negativ wieder: Was dir verhasst ist, tu deinem Nächsten nicht an – das sei die ganze Tora, alles andere Auslegung.',
      },
      {
        tradition: 'Neues Testament',
        text: 'Jesus verbindet den Vers mit dem Schma Israel zum Doppelgebot; Paulus nennt ihn die Erfüllung des ganzen Gesetzes. Beide zitieren, sie erfinden nicht.',
      },
      {
        tradition: 'Sozialethische Lesart',
        text: 'Die Reihenfolge des Textes wird ernst genommen: Weil die Liebe am Ende konkreter Anweisungen steht, ist sie an ihnen zu messen – am Lohn, am Erntesaum, am Gerichtsverfahren.',
      },
    ],
    crossRefs: [
      { book: '3mo', chapter: 19, verse: 34, note: 'Dasselbe für den Fremden' },
      { book: 'mk', chapter: 12, verse: 31, note: 'Das Doppelgebot' },
      { book: 'roem', chapter: 13, verse: 9 },
    ],
  },
  {
    book: '4mo',
    chapter: 14,
    from: 1,
    to: 10,
    title: 'Der Aufstand nach dem Kundschafterbericht',
    historicalShort:
      'Zwölf Kundschafter kommen aus dem Land zurück, zehn raten ab. Die Gemeinde will umkehren nach Ägypten – der Wendepunkt, an dem aus einer kurzen Wanderung vierzig Jahre werden.',
    historicalLong:
      'Der Bericht selbst ist unstrittig: Das Land ist fruchtbar. Strittig ist die Bewertung der Risiken. Die Mehrheit beschreibt die Bewohner als Riesen und sich selbst als Heuschrecken – eine Selbsteinschätzung, keine Beobachtung. Erzählerisch ist bemerkenswert, dass die Strafe genau in dem besteht, was das Volk sich selbst wünscht: „Wären wir doch in dieser Wüste gestorben.“ Die Zahl vierzig entspricht der Zahl der Kundschaftertage – ein Jahr für jeden Tag.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Text verbindet ältere Erzählstoffe mit priesterlicher Bearbeitung. Er erklärt rückblickend, warum eine Generation das Land nicht erreichte, und richtet sich an Leser, die selbst zwischen Aufbruch und Rückkehr schwanken – etwa im Exil.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die Sünde der Kundschafter gilt als Musterfall der üblen Nachrede: Nicht die Angst wird getadelt, sondern dass sie das Land schlechtredeten und damit die Gemeinschaft entmutigten.',
      },
      {
        tradition: 'Christliche Predigttradition',
        text: 'Der Hebräerbrief nimmt die Episode als Warnung auf: Die Verheißung war da, das Hören nützte nichts, weil es nicht mit Glauben verbunden war.',
      },
    ],
    crossRefs: [
      { book: '4mo', chapter: 13, verse: 33, note: '„Wir waren wie Heuschrecken“' },
      { book: 'hebr', chapter: 3, verse: 19 },
      { book: 'ps', chapter: 95, verse: 8 },
    ],
  },
  {
    book: '5mo',
    chapter: 30,
    from: 15,
    to: 20,
    title: 'Die Wahl zwischen Leben und Tod',
    historicalShort:
      'Am Ende der Rede des Mose steht keine Drohung, sondern eine Wahl: Leben und Tod werden vorgelegt, und der Text sagt gleich dazu, was zu wählen ist.',
    historicalLong:
      'Die Form entspricht altorientalischen Vasallenverträgen: Vorgeschichte, Bestimmungen, Zeugen, Segen und Fluch. 5. Mose übernimmt dieses Muster – nur steht an der Stelle des Großkönigs Gott, und an der Stelle des unterworfenen Kleinkönigs steht ein ganzes Volk. Dass Himmel und Erde als Zeugen aufgerufen werden, gehört zur Vertragssprache. Entstanden ist das Buch in seiner Grundform wohl im 7. Jahrhundert v. Chr.; die Reform Josias beruft sich auf ein „gefundenes Gesetzbuch“, das die Forschung meist mit einer Vorform des Deuteronomiums gleichsetzt.',
    interpretations: [
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der Vers gilt als klassischer Beleg für die Willensfreiheit: Die Wahl liegt wirklich beim Menschen, sonst wäre die Aufforderung sinnlos.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Luther und Calvin lasen die Stelle im Licht von Römer 7: Der Mensch erkennt das Gute und wählt es doch nicht – gerade darin zeige das Gesetz, dass es Gnade braucht.',
      },
      {
        tradition: 'Bundestheologische Lesart',
        text: 'Segen und Fluch sind keine willkürlichen Belohnungen, sondern die inneren Folgen eines Weges. Der Text beschreibt weniger ein Gericht als eine Richtung.',
      },
    ],
    crossRefs: [
      { book: '5mo', chapter: 11, verse: 26 },
      { book: 'jos', chapter: 24, verse: 15, note: 'Dieselbe Wahl in Sichem' },
      { book: 'jer', chapter: 21, verse: 8 },
    ],
  },
  {
    book: 'jos',
    chapter: 1,
    from: 1,
    to: 9,
    title: '„Sei getrost und unverzagt“',
    historicalShort:
      'Der Amtsantritt Josuas nach dem Tod des Mose. Dreimal wird ihm derselbe Zuspruch gesagt – ein Hinweis darauf, dass die Furcht das eigentliche Thema ist.',
    historicalLong:
      'Die Wiederholung ist kein Stilfehler, sondern Form: Solche Einsetzungsreden folgen einem festen Muster aus Zuspruch, Auftrag und Beistandszusage, das sich auch bei Königseinsetzungen findet. Neu ist der Zusatz, das Gesetzbuch solle „nicht von deinem Munde kommen“ – der Anführer wird an dieselbe Weisung gebunden wie alle anderen. Das Buch Josua gehört nach heutiger Sicht zum deuteronomistischen Geschichtswerk, das die Geschichte Israels rückblickend vom Exil her deutet.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Abschnitt ist die theologische Rahmung des Buches, verfasst deutlich später als die geschilderten Ereignisse. Er will weniger von Landnahme berichten als Leser ermutigen, die ihr Land verloren haben.',
      },
      {
        tradition: 'Klassische kirchliche Auslegung',
        text: 'Der Zuspruch wird auf jede Amtsübernahme und jeden Aufbruch übertragen: Nicht die eigene Stärke trägt, sondern die Zusage der Gegenwart Gottes.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Wer die Landverheißung liest, muss mitlesen, was sie für die Bewohner des Landes bedeutete. Die Rezeptionsgeschichte dieses Kapitels – von der Kolonisierung bis in heutige Konflikte – ist Teil dessen, was der Text ausgelöst hat.',
      },
    ],
    crossRefs: [
      { book: '5mo', chapter: 31, verse: 7 },
      { book: 'jos', chapter: 1, verse: 8, note: 'Die Bindung an die Weisung' },
      { book: 'hebr', chapter: 13, verse: 5 },
    ],
  },
  {
    book: 'jos',
    chapter: 6,
    from: 12,
    to: 21,
    title: 'Der Fall Jerichos',
    historicalShort:
      'Sieben Tage, sieben Priester, sieben Widderhörner – und am siebten Tag sieben Umzüge. Die Erzählung ist als Liturgie gebaut, nicht als Schlachtbericht.',
    historicalLong:
      'Archäologisch ist Jericho der am heftigsten umstrittene Ort des Alten Testaments. Kathleen Kenyon fand in den 1950er Jahren für die üblicherweise angenommene Zeit Josuas keine Stadtmauer und keine nennenswerte Siedlung; ältere Grabungen von John Garstang hatten das Gegenteil behauptet. Die Fundlage lässt beide Deutungen zu: eine spätere Datierung des Ereignisses oder eine literarische Ausgestaltung eines kleineren Vorgangs. Der Bann über die Stadt – die vollständige Vernichtung – gehört zu den Texten, an denen sich die Auslegung bis heute abarbeitet.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Erzählung ist ein Kultätiologie: Sie erklärt einen Ruinenhügel und feiert die Landgabe als Werk Gottes, nicht als militärische Leistung. Die sieben Umzüge lesen sich wie ein Prozessionsritual.',
      },
      {
        tradition: 'Kirchliche Auslegungsgeschichte',
        text: 'Origenes und viele nach ihm lasen die Eroberung durchweg sinnbildlich – als Kampf gegen die eigenen Laster –, gerade weil ihnen die wörtliche Lesart moralisch untragbar erschien.',
      },
      {
        tradition: 'Ethische Rückfrage',
        text: 'Ein erheblicher Teil heutiger Auslegung weigert sich, den Bann zu entschärfen. Der Text bleibe eine Zumutung, und die Aufgabe bestehe darin, das auszuhalten und nicht theologisch zu glätten.',
      },
    ],
    crossRefs: [
      { book: 'jos', chapter: 6, verse: 25, note: 'Rahab wird verschont' },
      { book: 'hebr', chapter: 11, verse: 30 },
      { book: 'jak', chapter: 2, verse: 25 },
    ],
  },
  {
    book: 'ri',
    chapter: 4,
    from: 1,
    to: 16,
    title: 'Debora',
    historicalShort:
      'Eine Prophetin richtet Israel, ein Feldherr will nur mit ihr in die Schlacht ziehen – und der Sieg wird am Ende einer dritten Frau zugeschrieben. Das Kapitel bricht mit den Erwartungen seiner Zeit an mehreren Stellen zugleich.',
    historicalLong:
      'Das Lied in Kapitel 5 gilt sprachlich als einer der ältesten Texte der Bibel überhaupt, möglicherweise 12./11. Jahrhundert v. Chr.; die Prosafassung in Kapitel 4 ist jünger und erzählt dieselbe Sache etwas anders. Militärisch entscheidend ist das Gelände: Siseras eisenbeschlagene Streitwagen waren in der Ebene überlegen und im aufgeweichten Boden am Bach Kischon wertlos. Das Lied nennt genau das – ein Wolkenbruch, der die Wagen im Schlamm festsetzte.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Debora ist die einzige Frau im Richterbuch, die selbst richtet und nicht nur Rettung vermittelt. Dass ein so alter Text sie derart selbstverständlich schildert, gilt als Hinweis darauf, dass die späteren Rollenbilder nicht durchweg gegolten haben.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Debora zählt in der rabbinischen Tradition zu den sieben Prophetinnen Israels. Ihre Sitzung unter der Palme wird als offenes Gericht gedeutet, zugänglich für jeden.',
      },
      {
        tradition: 'Feministische Exegese',
        text: 'Der Abschnitt wird häufig gegen die Annahme angeführt, biblische Führung sei durchgehend männlich gedacht. Zugleich wird gefragt, warum die Wirkungsgeschichte dieser Text so lange übergangen hat.',
      },
    ],
    crossRefs: [
      { book: 'ri', chapter: 5, verse: 21, note: 'Der Bach Kison im Deboralied' },
      { book: 'ri', chapter: 4, verse: 21, note: 'Jael' },
      { book: 'hebr', chapter: 11, verse: 32 },
    ],
  },
  {
    book: 'ri',
    chapter: 16,
    from: 23,
    to: 31,
    title: 'Das Ende Simsons',
    historicalShort:
      'Der stärkste der Richter endet blind, als Belustigung im Tempel des feindlichen Gottes – und reißt im Sterben mehr Menschen mit sich als in seinem ganzen Leben.',
    historicalLong:
      'Die Simsonerzählungen unterscheiden sich von den übrigen Richtergeschichten: Simson führt kein Heer, sondern handelt allein, meist aus persönlichen Motiven. Der Dagon-Tempel in Gaza passt zu ausgegrabenen Philisteranlagen, deren Dach von zwei zentralen Säulen getragen wurde – zwischen ihnen stand ein Blickfang für die Menge auf dem Dach. Das Buch schließt diese Reihe nüchtern ab, ohne den Helden zu verklären.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Erzählung trägt Züge älterer Heldensagen und wurde in das Richterbuch eingebaut, um dessen Grundthese zu stützen: Ohne Ordnung tut jeder, was ihn gut dünkt.',
      },
      {
        tradition: 'Klassische kirchliche Auslegung',
        text: 'Der Hebräerbrief nennt Simson unter den Glaubenszeugen. Die Auslegung hat daran lange Anstoß genommen und betont, dass Gott auch durch zerrissene Menschen handelt.',
      },
      {
        tradition: 'Kritische Lesart',
        text: 'Das letzte Gebet Simsons bittet ausdrücklich um Rache. Viele Ausleger halten fest, dass der Text dies erzählt, ohne es zu billigen – die Rahmung des Buches wertet die ganze Epoche als Verfall.',
      },
    ],
    crossRefs: [
      { book: 'ri', chapter: 21, verse: 25, note: 'Das Fazit des Buches' },
      { book: 'hebr', chapter: 11, verse: 32 },
    ],
  },
  {
    book: 'rut',
    chapter: 4,
    from: 13,
    to: 22,
    title: 'Der Stammbaum am Ende des Buches',
    historicalShort:
      'Die Erzählung endet mit einer Genealogie, die auf David zuläuft. Damit steht am Anfang der Königsfamilie eine Moabiterin – ausgerechnet aus dem Volk, dem 5. Mose 23 den Zugang zur Gemeinde verwehrt.',
    historicalLong:
      'Das Buch spielt „zur Zeit der Richter“, wurde aber vermutlich deutlich später geschrieben. Viele Ausleger sehen darin einen Einspruch gegen die strenge Trennungspolitik unter Esra und Nehemia, die Mischehen auflösen ließ. Der Schluss ist dann kein frommer Anhang, sondern das Argument: Ohne diese Ausländerin gäbe es David nicht. Matthäus nimmt den Faden auf und nennt Rut ausdrücklich im Stammbaum Jesu – eine von vier Frauen dort, die alle nicht in ein glattes Bild passen.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Datierung ist umstritten. Wer das Buch in die Perserzeit setzt, liest es als bewusste Gegenstimme zu Esra 9–10; wer es älter datiert, sieht eher eine Familienerzählung mit davidischem Ausklang.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Rut wird als Musterfall des Übertritts gelesen. Ihr Satz „Dein Volk ist mein Volk“ gilt als Kern der Zugehörigkeit – nicht Abstammung, sondern Bindung.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Boas als „Löser“ wurde früh auf Christus gedeutet. Neuere Auslegung betont daneben die soziale Seite: Das Löserrecht ist eine konkrete Rechtsfigur zum Schutz verarmter Familien.',
      },
    ],
    crossRefs: [
      { book: 'rut', chapter: 1, verse: 16, note: '„Dein Volk ist mein Volk“' },
      { book: 'mt', chapter: 1, verse: 5, note: 'Rut im Stammbaum Jesu' },
      { book: '5mo', chapter: 23, verse: 3 },
    ],
  },
  {
    book: '1sam',
    chapter: 3,
    from: 1,
    to: 14,
    title: 'Die Berufung Samuels',
    historicalShort:
      '„Des HERRN Wort war teuer zu der Zeit“ – der Text beginnt mit einer Mangelanzeige. Was folgt, ist eine Berufung, die ein Kind dreimal missversteht.',
    historicalLong:
      'Silo war vor Jerusalem der zentrale Heiligtumsort; hier stand die Lade. Der alte Priester Eli und seine Söhne verkörpern eine Ordnung, die abläuft – die Botschaft, die Samuel empfängt, richtet sich gegen das eigene Haus seines Lehrers. Bemerkenswert ist die Nüchternheit der Szene: kein Donner, keine Erscheinung, sondern eine Stimme, die für die eines Menschen gehalten wird. Erst Eli erkennt, was geschieht, und weist den Jungen an, wie er antworten soll.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Abschnitt leitet den Übergang von der Richter- zur Königszeit ein und begründet Samuels Autorität. Die Kritik am Priesterhaus Elis bereitet dessen Ablösung vor.',
      },
      {
        tradition: 'Spirituelle Auslegung',
        text: 'Die Szene gilt als klassisches Bild geistlicher Begleitung: Der Ältere erkennt, was dem Jüngeren geschieht, und tritt dann zurück. Elis Rat ist der Wendepunkt, obwohl das Wort gegen ihn ergeht.',
      },
      {
        tradition: 'Kirchliche Predigttradition',
        text: 'Die Antwort „Rede, denn dein Knecht hört“ ist zur Formel für Berufung überhaupt geworden – auch dort, wo der Text von Berufung ins Amt gar nicht spricht.',
      },
    ],
    crossRefs: [
      { book: '1sam', chapter: 2, verse: 12, note: 'Die Söhne Elis' },
      { book: 'jer', chapter: 7, verse: 12, note: 'Silo als Warnung' },
      { book: '1sam', chapter: 3, verse: 19 },
    ],
  },
  {
    book: '1sam',
    chapter: 8,
    from: 1,
    to: 22,
    title: '„Gib uns einen König“',
    historicalShort:
      'Das Volk fordert einen König, „wie ihn alle Völker haben“. Samuel warnt mit einer sehr genauen Liste dessen, was ein Königtum kostet – und Gott lässt es trotzdem zu.',
    historicalLong:
      'Der Text ist eines der schärfsten machtkritischen Stücke der Bibel. Die Aufzählung – Söhne für das Heer, Töchter für den Hof, der Zehnte von Feld und Herde, Zwangsarbeit – entspricht dem, was aus altorientalischen Verwaltungsarchiven über Hofhaltungen bekannt ist. Die Forschung liest hier meist zwei Stimmen: eine königsfreundliche, die Saul als Retter zeigt, und eine königskritische, die im Wunsch nach einem König eine Absage an Gott sieht. Beide stehen unausgeglichen nebeneinander.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die königskritische Schicht dürfte nach dem Zusammenbruch der Monarchie entstanden sein: Wer den Untergang erlebt hat, liest die Anfänge anders.',
      },
      {
        tradition: 'Politische Theologie',
        text: 'Der Abschnitt wird als biblische Grundlage einer Herrschaftskritik gelesen: Macht wird nicht verteufelt, aber nüchtern nach ihren Kosten befragt – und der Preis wird vorher genannt.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Ein Teil der Tradition sieht im Königtum eine erlaubte, aber nicht gebotene Einrichtung: Gott gibt nach, weil das Volk es will, nicht weil es gut wäre.',
      },
    ],
    crossRefs: [
      { book: '5mo', chapter: 17, verse: 14, note: 'Das Königsgesetz' },
      { book: '1sam', chapter: 12, verse: 17 },
      { book: 'hos', chapter: 13, verse: 11 },
    ],
  },
  {
    book: '2sam',
    chapter: 7,
    from: 1,
    to: 17,
    title: 'Die Verheißung an David',
    historicalShort:
      'David will Gott ein Haus bauen. Die Antwort dreht das Wort um: Nicht David baut Gott ein Haus, sondern Gott baut David eines – eine Dynastie.',
    historicalLong:
      'Das Wortspiel mit „Haus“ trägt das ganze Kapitel: Palast, Tempel und Dynastie heißen im Hebräischen gleich. Aus dieser Zusage entwickelt sich die messianische Erwartung: ein Nachkomme Davids, dessen Thron Bestand hat. Als die Dynastie 587 v. Chr. endete, wurde die Verheißung nicht aufgegeben, sondern in die Zukunft verlegt. Das Neue Testament setzt genau hier an, wenn es Jesus als „Sohn Davids“ bezeichnet.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Text ist mehrfach überarbeitet. Die unbedingte Zusage und die Bedingung des Gehorsams stehen in Spannung – ein Hinweis darauf, dass nach dem Exil nachgetragen wurde, was die Katastrophe erklärbar machte.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die Verheißung bleibt offen und wird auf einen künftigen Gesalbten bezogen. Die Erwartung ist irdisch und politisch gedacht: Friede, Recht und Bestand für Israel.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Die Zusage wird auf Jesus bezogen, ausdrücklich schon in der Weihnachtsgeschichte des Lukas. Umstritten bleibt, wie sich das zur bleibenden Erwartung des Judentums verhält.',
      },
    ],
    crossRefs: [
      { book: 'ps', chapter: 89, verse: 4 },
      { book: 'lk', chapter: 1, verse: 32, note: '„Den Thron seines Vaters David“' },
      { book: 'jes', chapter: 9, verse: 7 },
    ],
  },
  {
    book: '2sam',
    chapter: 11,
    from: 1,
    to: 27,
    title: 'David und Batseba',
    historicalShort:
      'Der König bleibt zu Hause, während sein Heer im Feld steht. Was folgt, erzählt die Bibel über ihren größten König ohne jede Beschönigung: Machtmissbrauch, Vertuschung und ein Mord per Befehl.',
    historicalLong:
      'Der erste Satz setzt den Ton: „zur Zeit, wann die Könige pflegen auszuziehen“ – und David zieht nicht aus. Die Erzählung vermeidet jedes Innenleben; sie berichtet nur Handlungen, in immer kürzeren Schritten. Bemerkenswert ist die Rolle Urias: Der Hetiter, also ein Ausländer, verhält sich vorbildlich, während der König Israels alle Regeln bricht. Dass eine Königsgeschichte des Alten Orients ihren Herrscher so darstellt, hat kaum Parallelen – Hofchroniken feierten üblicherweise.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Abschnitt gehört zur sogenannten Thronfolgeerzählung, einem literarisch außergewöhnlich dichten Werk. Es erklärt, warum die Nachfolge so verlief, wie sie verlief – und spart die Schattenseiten nicht aus.',
      },
      {
        tradition: 'Feministische Exegese',
        text: 'Der Text nennt Batsebas Sicht mit keinem Wort. Neuere Auslegung besteht darauf, das Machtgefälle zu benennen: Eine Frau, die der König holen lässt, hat keine freie Wahl. Die verbreitete Rede von einer „Affäre“ verfehle den Vorgang.',
      },
      {
        tradition: 'Kirchliche Bußtradition',
        text: 'Psalm 51 wird traditionell mit dieser Szene verbunden und gehört zu den sieben Bußpsalmen. Die Verbindung ist eine spätere Zuschreibung, hat die Wirkungsgeschichte aber stark geprägt.',
      },
    ],
    crossRefs: [
      { book: '2sam', chapter: 12, verse: 7, note: '„Du bist der Mann!“' },
      { book: 'ps', chapter: 51, verse: 3 },
      { book: '2sam', chapter: 11, verse: 27, note: 'Das Urteil des Erzählers' },
    ],
  },
  {
    book: '1koe',
    chapter: 3,
    from: 16,
    to: 28,
    title: 'Das Urteil Salomos',
    historicalShort:
      'Zwei Prostituierte, ein lebendes und ein totes Kind, kein Zeuge. Salomo löst den Fall nicht durch Beweise, sondern durch eine Probe, die den Beweis erzwingt.',
    historicalLong:
      'Die Erzählung ist die Illustration zu der Bitte, die Salomo im selben Kapitel äußert: um ein „hörendes Herz“, um unterscheiden zu können. Erzählerisch bedeutsam ist, wer hier vor den König tritt: Zwei Frauen ohne Rechtsstand und ohne Fürsprecher bekommen unmittelbaren Zugang zum obersten Gericht. Ähnliche Weisheitserzählungen sind aus Indien und dem hellenistischen Raum bekannt; die biblische Fassung ist die älteste erhaltene.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Text gehört zur Weisheitsüberlieferung am Königshof und dient der Legitimation: Er zeigt, wozu die erbetene Weisheit gut ist, und begründet Salomos Ruf.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Betont wird, dass das Urteil nicht auf Allwissenheit beruht, sondern auf Menschenkenntnis: Die wahre Mutter gibt lieber das Kind auf, als es zu verlieren. Weisheit ist hier Beobachtungsgabe.',
      },
      {
        tradition: 'Rechtsgeschichtliche Lesart',
        text: 'Der Fall wird als Beispiel für Beweisnot gelesen. Das Schwert ist kein Vollstreckungsmittel, sondern ein Verfahren – riskant, aber im Ergebnis gerecht.',
      },
    ],
    crossRefs: [
      { book: '1koe', chapter: 3, verse: 9, note: 'Die Bitte um ein hörendes Herz' },
      { book: 'spr', chapter: 2, verse: 6 },
      { book: 'jak', chapter: 1, verse: 5 },
    ],
  },
  {
    book: '1koe',
    chapter: 21,
    from: 1,
    to: 16,
    title: 'Nabots Weinberg',
    historicalShort:
      'Der König will einen Weinberg kaufen, der Besitzer lehnt ab – und die Königin löst das Problem mit einem inszenierten Prozess. Ein Lehrstück über die Grenzen königlicher Macht.',
    historicalLong:
      'Nabots Weigerung ist keine Sturheit: Erbbesitz galt als unverkäuflich, weil er die Familie über Generationen trug; 3. Mose 25 verbietet den endgültigen Verkauf ausdrücklich. Ahab akzeptiert das zunächst und schmollt. Isebel, aufgewachsen am phönizischen Hof mit absolutem Königtum, versteht die Zurückhaltung nicht – für sie ist der Fall eine Frage der Verfügungsgewalt. Sie hält die Form ein: Fasten, Versammlung, zwei Zeugen, wie das Gesetz sie verlangt. Gerade die korrekte Form macht den Justizmord möglich.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Erzählung stammt aus prophetischen Kreisen und stellt zwei Rechtsauffassungen gegeneinander: israelitisches Erbrecht gegen kanaanäisch-phönizisches Königsrecht.',
      },
      {
        tradition: 'Sozialethische Auslegung',
        text: 'Der Text gilt als früher Beleg dafür, dass Recht und Gesetzestreue auseinanderfallen können. Alle Formvorschriften wurden gewahrt, und das Ergebnis war Mord.',
      },
      {
        tradition: 'Prophetische Tradition',
        text: 'Elias Auftritt im Weinberg – „Hast du getötet und auch geerbt?“ – gilt als Musterfall prophetischer Machtkritik: Der Prophet stellt den König nicht wegen Gottlosigkeit, sondern wegen Unrechts an einem Einzelnen.',
      },
    ],
    crossRefs: [
      { book: '3mo', chapter: 25, verse: 23, note: 'Land gehört nicht auf Dauer' },
      { book: '1koe', chapter: 21, verse: 19, note: 'Elias Wort an Ahab' },
      { book: 'mi', chapter: 2, verse: 2 },
    ],
  },
  {
    book: '2koe',
    chapter: 17,
    from: 5,
    to: 23,
    title: 'Der Untergang des Nordreichs',
    historicalShort:
      '722 v. Chr. fällt Samaria nach dreijähriger Belagerung. Die Oberschicht wird verschleppt, das Nordreich verschwindet als politische Größe – und der Text erklärt ausführlich, warum.',
    historicalLong:
      'Der Vorgang ist von außen gut belegt: Assyrische Annalen nennen die Eroberung Samarias und die Zahl der Deportierten. Assyrien betrieb systematischen Bevölkerungsaustausch, um Aufstände unmöglich zu machen – deshalb wurden zugleich Menschen aus anderen Reichsteilen angesiedelt. Aus dieser Mischbevölkerung entstand später die Gruppe, die im Neuen Testament als Samariter erscheint. Der biblische Text verwendet mehr Raum auf die Deutung als auf den Vorgang: Nicht Assyriens Stärke wird als Ursache genannt, sondern das eigene Verhalten.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der lange Deutungsabschnitt ist deuteronomistisch geprägt und wurde nach 587 v. Chr. geschrieben. Judäische Leser sollten am Beispiel des Nordens verstehen, was ihnen selbst widerfahren war.',
      },
      {
        tradition: 'Historische Einordnung',
        text: 'Die Rede von den „zehn verlorenen Stämmen“ ist eine spätere Zuspitzung. Deportiert wurde die Oberschicht; ein erheblicher Teil der Bevölkerung blieb im Land oder floh nach Juda, dessen Hauptstadt in dieser Zeit stark wuchs.',
      },
      {
        tradition: 'Theologische Rückfrage',
        text: 'Ein Teil der Auslegung wendet sich gegen das Schema Schuld–Strafe: Es erkläre zwar rückblickend, tauge aber nicht als Deutungsmuster für jede Katastrophe. Das Buch Hiob widerspricht ihm ausdrücklich.',
      },
    ],
    crossRefs: [
      { book: '2koe', chapter: 17, verse: 24, note: 'Die Neuansiedlung' },
      { book: 'hos', chapter: 13, verse: 16 },
      { book: 'joh', chapter: 4, verse: 9, note: 'Die Folgen bis ins Neue Testament' },
    ],
  },
  {
    book: '2koe',
    chapter: 22,
    from: 8,
    to: 20,
    title: 'Das gefundene Gesetzbuch',
    historicalShort:
      'Bei Renovierungsarbeiten am Tempel taucht ein Buch auf. Der König zerreißt seine Kleider, als es ihm vorgelesen wird – und leitet die tiefgreifendste Reform der Königszeit ein.',
    historicalLong:
      'Die Forschung setzt das gefundene Buch meist mit einer Vorform des Deuteronomiums gleich: Die Reform Josias – Zentralisierung des Opfers auf Jerusalem, Beseitigung der Höhenheiligtümer – entspricht genau dessen Forderungen. Ob das Buch tatsächlich gefunden oder für diesen Zweck verfasst wurde, ist seit dem 19. Jahrhundert umstritten. Bemerkenswert ist, wer befragt wird: nicht Jeremia, der zu dieser Zeit bereits auftrat, sondern die Prophetin Hulda. Ihr Wort entscheidet über die Echtheit.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Reform von 622 v. Chr. gilt als Schlüsseldatum für die Entstehung der Bibel: Von hier aus wurden ältere Überlieferungen gesammelt, geordnet und gedeutet.',
      },
      {
        tradition: 'Traditionelle Auslegung',
        text: 'Der Bericht wird beim Wort genommen: Ein verschollenes Gesetz kommt wieder ans Licht, und der König handelt daraufhin unverzüglich. Die Reform ist Gehorsam, nicht Konstruktion.',
      },
      {
        tradition: 'Wirkungsgeschichtliche Lesart',
        text: 'Dass eine Prophetin die Echtheit bestätigt, wurde in der Auslegungsgeschichte lange kaum beachtet. Neuere Arbeiten heben Hulda als eine der einflussreichsten Gestalten der Königszeit hervor.',
      },
    ],
    crossRefs: [
      { book: '2koe', chapter: 23, verse: 25, note: 'Das Urteil über Josia' },
      { book: '5mo', chapter: 12, verse: 5, note: 'Die Forderung der Zentralisierung' },
      { book: '2koe', chapter: 23, verse: 29, note: 'Sein früher Tod bei Megiddo' },
    ],
  },
  {
    book: '2koe',
    chapter: 25,
    from: 1,
    to: 21,
    title: 'Der Fall Jerusalems',
    historicalShort:
      '587 v. Chr. endet nach anderthalbjähriger Belagerung das Königreich Juda. Stadt und Tempel brennen, der letzte König wird geblendet, die Oberschicht verschleppt. Kein Ereignis hat das Alte Testament stärker geprägt.',
    historicalLong:
      'Der Bericht ist knapp und ohne Deutung – umso härter. Die babylonische Chronik bestätigt die Ereignisse von außen; die Lachisch-Briefe, Tonscherben mit Meldungen aus den letzten Wochen, geben einen Eindruck vom Zusammenbruch der Verteidigung. Was danach begann, war paradox: Nicht das Ende des Glaubens, sondern seine Umformung. Ohne Tempel und Staat entstanden Sammlung und Verschriftlichung der Überlieferung, Sabbat und Beschneidung wurden zu tragenden Kennzeichen. Ein erheblicher Teil des Alten Testaments hat in dieser Zeit seine Gestalt gefunden.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Das Exil ist der Angelpunkt der alttestamentlichen Literaturgeschichte. Vieles, was zuvor mündlich oder in Einzelstücken vorlag, wurde nun zusammengefügt und im Licht der Katastrophe gedeutet.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der Tag der Zerstellung – der 9. Aw – ist bis heute Fasttag und erinnert an beide Tempelzerstörungen. Die Klagelieder werden an ihm gelesen.',
      },
      {
        tradition: 'Theologische Deutung',
        text: 'Umstritten bleibt, wie weit sich die Katastrophe als Strafe deuten lässt. Die Königsbücher tun es; die Klagelieder halten daneben die reine Klage offen, ohne sie aufzulösen.',
      },
    ],
    crossRefs: [
      { book: 'klgl', chapter: 1, verse: 1 },
      { book: 'ps', chapter: 137, verse: 1 },
      { book: 'jer', chapter: 39, verse: 5, note: 'Derselbe Vorgang bei Jeremia' },
    ],
  },
  {
    book: '2chr',
    chapter: 36,
    from: 15,
    to: 23,
    title: 'Das offene Ende der Chronik',
    historicalShort:
      'Die hebräische Bibel endet nicht mit einem Propheten, sondern hier: mit dem Erlass des Kyros und dem Satz „Wer nun unter euch seines Volkes ist, der ziehe hinauf“. Ein Buchschluss, der eine Tür aufstößt.',
    historicalLong:
      'In der jüdischen Anordnung der Schriften steht die Chronik am Ende – anders als in christlichen Bibeln. Das Buch erzählt dieselbe Geschichte wie die Königsbücher noch einmal, aber mit anderem Interesse: Der Norden fehlt fast ganz, der Tempel steht im Mittelpunkt, und David erscheint vor allem als Organisator des Gottesdienstes. Der Schluss bricht mitten im Satz des Kyros-Erlasses ab; Esra 1 setzt genau dort wieder an. Der Kyros-Zylinder belegt die persische Politik der Kultrückführung, ohne Israel eigens zu nennen.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Chronik entstand in der Perserzeit, rund zwei Jahrhunderte nach den Königsbüchern. Sie schreibt Geschichte für eine Gemeinde, die keinen Staat mehr hat, aber einen Tempel – deshalb die Gewichtung.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Dass die Schriften mit einer Aufforderung zum Aufbruch enden, wird als bewusstes Signal gelesen: Die Sammlung schließt nicht mit einem Punkt, sondern mit einem offenen Weg.',
      },
      {
        tradition: 'Vergleichende Lesart',
        text: 'Der Vergleich mit den Königsbüchern zeigt, wie unterschiedlich dieselben Ereignisse erzählt werden können. Die Bibel selbst überliefert also mehr als eine Geschichtsdarstellung nebeneinander.',
      },
    ],
    crossRefs: [
      { book: 'esr', chapter: 1, verse: 1, note: 'Die Fortsetzung' },
      { book: 'jer', chapter: 25, verse: 12, note: 'Die siebzig Jahre' },
      { book: 'jes', chapter: 45, verse: 1, note: 'Kyros als „Gesalbter“' },
    ],
  },
  {
    book: 'esr',
    chapter: 1,
    from: 1,
    to: 11,
    title: 'Das Edikt des Kyros',
    historicalShort:
      'Ein persischer Großkönig erlaubt den Wiederaufbau eines Tempels in einer Randprovinz – und die Bibel nennt ihn dafür einen von Gott Erweckten.',
    historicalLong:
      'Anders als Assyrien und Babylon setzten die Perser auf lokale Selbstverwaltung und führten verschleppte Kulte in ihre Heimat zurück. Der Kyros-Zylinder, heute im Britischen Museum, beschreibt genau diese Politik – aus persischer Sicht und ohne Israel zu erwähnen. Für Juda war sie die Wende: Die Rückkehr begann, zog sich aber über Generationen hin, und viele blieben in Babylonien. Der zweite Tempel wurde erst 515 v. Chr. eingeweiht und blieb hinter dem ersten weit zurück.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der aramäische Wortlaut des Erlasses in Esra 6 gilt vielen als im Kern echt; die hebräische Fassung hier ist stärker theologisch geformt. Die Rückkehr verlief weniger geschlossen, als die Erzählung nahelegt.',
      },
      {
        tradition: 'Prophetische Deutung',
        text: 'Jesaja nennt Kyros ausdrücklich „meinen Gesalbten“ – der einzige Nichtisraelit, dem dieser Titel gilt. Gott handelt danach auch durch fremde Herrscher, die ihn nicht kennen.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die Rückkehrer trafen auf eine Bevölkerung, die nie weggegangen war. Die Spannungen daraus prägen Esra und Nehemia – und werfen die Frage auf, wer eigentlich „das Volk“ ist.',
      },
    ],
    crossRefs: [
      { book: 'jes', chapter: 45, verse: 1 },
      { book: 'esr', chapter: 6, verse: 3, note: 'Die aramäische Fassung' },
      { book: 'hag', chapter: 2, verse: 3, note: 'Der Vergleich mit dem ersten Tempel' },
    ],
  },
  {
    book: 'neh',
    chapter: 2,
    from: 11,
    to: 20,
    title: 'Die nächtliche Erkundung der Mauer',
    historicalShort:
      'Bevor Nehemia irgendjemandem von seinem Plan erzählt, reitet er nachts allein an der zerstörten Mauer entlang. Erst danach spricht er.',
    historicalLong:
      'Nehemia war Mundschenk am persischen Hof – ein Vertrauensamt in unmittelbarer Nähe des Königs. Sein Bericht ist in der Ich-Form geschrieben und liest sich streckenweise wie ein Rechenschaftsbericht an einen Vorgesetzten. Der Mauerbau war kein frommes Projekt, sondern eine politische Handlung: Eine befestigte Stadt bedeutete Status und Verteidigungsfähigkeit, weshalb Sanballat und die Nachbarn ihn zu verhindern suchten. Nach Nehemia 6 stand die Mauer nach 52 Tagen – eine Zahl, die für Ausbesserung, nicht Neubau spricht.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Nehemia-Denkschrift gilt als eine der zuverlässigsten Quellen der Perserzeit. Sie ist Selbstdarstellung und zugleich detailgenau in Verwaltung, Geografie und Gegnerschaft.',
      },
      {
        tradition: 'Praktische Auslegung',
        text: 'Die Szene wird häufig als Musterfall verantwortlicher Leitung gelesen: erst prüfen, dann reden, dann gemeinsam anfangen – und den Widerstand nüchtern benennen.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Dieselbe Entschlossenheit führt später zur Auflösung von Mischehen. Wer Nehemia als Vorbild liest, muss auch diese Seite in den Blick nehmen – das Buch Rut liest sich wie ein Einspruch dagegen.',
      },
    ],
    crossRefs: [
      { book: 'neh', chapter: 6, verse: 15, note: 'Die Mauer nach 52 Tagen' },
      { book: 'neh', chapter: 13, verse: 23 },
      { book: 'rut', chapter: 4, verse: 17 },
    ],
  },
  {
    book: 'hi',
    chapter: 38,
    from: 1,
    to: 18,
    title: 'Die Gottesrede aus dem Sturm',
    historicalShort:
      'Nach 37 Kapiteln Streit antwortet Gott – und beantwortet keine einzige der gestellten Fragen. Stattdessen fragt er selbst, siebzig Kapitel lang, nach Erde, Meer, Morgenröte und Schnee.',
    historicalLong:
      'Hiobs Freunde hatten das gängige Schema vertreten: Wer leidet, hat gesündigt. Hiob bestreitet das und fordert ein Verfahren. Die Antwort verweigert genau dieses Verfahren – und rehabilitiert Hiob am Ende doch ausdrücklich gegenüber den Freunden. Die Fragen sind nicht spöttisch gemeint, sondern öffnen einen Horizont: Die Welt ist größer als die Buchhaltung von Schuld und Strafe. Das Buch gehört zur altorientalischen Weisheitsliteratur; verwandte Texte aus Mesopotamien behandeln dasselbe Problem, kommen aber zu anderen Schlüssen.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Gottesreden sind möglicherweise später hinzugewachsen. Auffällig ist, dass sie die Anklage nicht widerlegen, sondern den Rahmen wechseln – vom Rechtsstreit zur Schöpfung.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Entscheidend ist, dass Gott überhaupt antwortet. Nicht der Inhalt tröstet, sondern dass die Klage gehört wurde – Hiob hat sein Verfahren also doch bekommen.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Der Abschnitt wird gegen jede Theodizee-Formel gelesen, die Leid erklären will. Die Bibel selbst lässt die Frage offen und verbietet es, sie schnell zu schließen.',
      },
    ],
    crossRefs: [
      { book: 'hi', chapter: 42, verse: 7, note: 'Hiob wird gegen die Freunde bestätigt' },
      { book: 'hi', chapter: 2, verse: 10 },
      { book: 'roem', chapter: 11, verse: 33 },
    ],
  },
  {
    book: 'spr',
    chapter: 8,
    from: 22,
    to: 31,
    title: 'Die Weisheit vor der Schöpfung',
    historicalShort:
      'Die Weisheit tritt hier als Person auf, weiblich, älter als die Welt, und beschreibt sich als spielendes Kind vor Gott, während die Erde entsteht.',
    historicalLong:
      'Das hebräische „chokma“ ist grammatisch weiblich; der Text nutzt das und lässt die Weisheit selbst sprechen. Ein Wort in Vers 30 ist seit der Antike umstritten: Es kann „Werkmeisterin“ oder „Liebling, Kind“ bedeuten – daher die sehr unterschiedlichen Übersetzungen. Die Stelle wurde im 4. Jahrhundert zum Zentrum des arianischen Streits: Wenn die Weisheit „geschaffen“ ist und mit Christus gleichgesetzt wird, wäre auch er geschaffen. Die Auseinandersetzung um das Wort im Nizänischen Bekenntnis hängt unmittelbar an diesem Vers.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Abschnitt gehört zur jüngeren Schicht der Sprüche, wohl aus der Perserzeit. Vergleichbare Personifikationen von Weisheit oder Gerechtigkeit sind aus Ägypten bekannt.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die Weisheit wird häufig mit der Tora gleichgesetzt: Was hier vor der Schöpfung da ist, sei die Weisung, nach der die Welt gebaut wurde.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Kolosser 1 und der Johannesprolog nehmen die Sprache dieses Textes auf. Die Kirche hat ihn auf Christus bezogen und dabei sorgfältig unterschieden zwischen „gezeugt“ und „geschaffen“ – gerade wegen dieses Verses.',
      },
    ],
    crossRefs: [
      { book: 'joh', chapter: 1, verse: 1 },
      { book: 'kol', chapter: 1, verse: 15 },
      { book: 'spr', chapter: 9, verse: 1 },
    ],
  },
  {
    book: 'pred',
    chapter: 12,
    from: 1,
    to: 8,
    title: 'Das Alter in Bildern',
    historicalShort:
      'Das Altwerden wird nicht benannt, sondern gemalt: zitternde Wächter, verstummte Mühlen, die Mandel blüht weiß, die Heuschrecke schleppt sich. Am Ende steht wieder der Satz vom Anfang.',
    historicalLong:
      'Fast jedes Bild lässt sich auf den Körper beziehen – die Wächter als Arme, die Mahlenden als Zähne, die Fenster als Augen. Ob der Text so gemeint ist oder ob er ein verfallendes Haus und ein sterbendes Dorf beschreibt, ist alt umstritten; die Doppeldeutigkeit dürfte beabsichtigt sein. Das Buch stammt aus hellenistischer Zeit; sein Hebräisch enthält persische Lehnwörter. Es wurde nur nach längerem Streit in den Kanon aufgenommen – zu wenig fromm, zu wenig eindeutig.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die abschließenden Verse des Buches gelten vielen als spätere Ergänzung, die den unbequemen Text einfängt. Der ursprüngliche Schluss dürfte bei „alles ist eitel“ gelegen haben.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Das Buch wird am Laubhüttenfest gelesen, dem Freudenfest. Der Kontrast ist gewollt: Gerade wer die Vergänglichkeit kennt, kann den Augenblick annehmen.',
      },
      {
        tradition: 'Kirchliche Auslegung',
        text: 'Das hebräische „hevel“ heißt eigentlich Hauch oder Windstoß. Neuere Übersetzungen ziehen „nichtig“ oder „flüchtig“ dem lutherischen „eitel“ vor – der Text klagt weniger an, als er feststellt.',
      },
    ],
    crossRefs: [
      { book: 'pred', chapter: 1, verse: 2 },
      { book: 'pred', chapter: 9, verse: 7 },
      { book: 'ps', chapter: 90, verse: 12 },
    ],
  },
  {
    book: 'hes',
    chapter: 1,
    from: 4,
    to: 28,
    title: 'Die Vision am Kebar',
    historicalShort:
      'Ein Priester im Exil sieht, was er nach allem Herkommen nicht sehen dürfte: den Thron Gottes – und zwar fernab des Tempels, an einem babylonischen Kanal.',
    historicalLong:
      'Der eigentliche Skandal des Kapitels ist nicht die Bildersprache, sondern der Ort. Gottes Gegenwart galt als an den Tempel in Jerusalem gebunden; hier erscheint sie auf einem fahrbaren Thron über einem Bewässerungskanal in Babylonien. Räder, Flügelwesen und Kristallgewölbe erinnern deutlich an mesopotamische Bildwelten, die Hesekiel im Exil vor Augen hatte. Der Text ringt sichtbar um Sprache: fast jede Aussage wird durch „gleichwie“ und „ähnlich“ abgeschwächt. Am Ende steht nicht „das war Gott“, sondern „das Ansehen der Herrlichkeit des HERRN“.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die vorsichtige Sprache ist Absicht: Sie hält das Bilderverbot durch, indem sie beschreibt, wie etwas aussah, und nicht, was es war.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Das Kapitel begründet die Merkaba-Mystik, die Thronwagen-Tradition. Die Mischna rät davon ab, den Text öffentlich auszulegen – er galt als zu gefährlich für Ungeübte.',
      },
      {
        tradition: 'Wirkungsgeschichte',
        text: 'Die vier Gestalten – Mensch, Löwe, Stier, Adler – wurden früh den vier Evangelisten zugeordnet. Diese Zuordnung prägt die christliche Kunst bis heute.',
      },
    ],
    crossRefs: [
      { book: 'hes', chapter: 10, verse: 18, note: 'Die Herrlichkeit verlässt den Tempel' },
      { book: 'offb', chapter: 4, verse: 6 },
      { book: 'jes', chapter: 6, verse: 1 },
    ],
  },
  {
    book: 'hes',
    chapter: 18,
    from: 1,
    to: 9,
    title: '„Die Väter haben Herlinge gegessen“',
    historicalShort:
      'Ein Sprichwort machte im Exil die Runde: Die Väter haben saure Trauben gegessen, den Kindern werden die Zähne stumpf. Hesekiel verbietet es – jeder haftet für sich.',
    historicalLong:
      'Hinter dem Sprichwort steht die Erfahrung einer Generation, die für die Politik ihrer Vorfahren büßte. Der Einwand ist verständlich und wird vom Text ernst genommen; die Antwort fällt trotzdem eindeutig aus. Das ist ein Bruch mit älteren Vorstellungen kollektiver Haftung, wie sie etwa im Dekalog anklingen. Bemerkenswert ist, dass Jeremia fast wortgleich dasselbe sagt – offenbar eine Debatte, die im Exil quer durch die Prophetie lief.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Abschnitt gilt als Meilenstein auf dem Weg zu individueller Verantwortung. Ob er ältere Vorstellungen wirklich ablöst oder nur für eine bestimmte Situation gilt, wird unterschiedlich beurteilt.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die Möglichkeit der Umkehr steht im Zentrum: Weder verurteilt die Vergangenheit endgültig, noch sichert Vergangenes ab. Entscheidend ist, was einer jetzt tut.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Neuere Auslegung fragt, ob die strenge Individualisierung die Wirklichkeit trifft: Schuldzusammenhänge über Generationen hinweg – ökologisch, politisch, familiär – lassen sich nicht einfach auflösen.',
      },
    ],
    crossRefs: [
      { book: 'jer', chapter: 31, verse: 29, note: 'Dasselbe Sprichwort bei Jeremia' },
      { book: '2mo', chapter: 20, verse: 5 },
      { book: 'hes', chapter: 18, verse: 32, note: '„Ich habe kein Gefallen am Tode“' },
    ],
  },
  {
    book: 'hes',
    chapter: 34,
    from: 1,
    to: 16,
    title: 'Die schlechten Hirten',
    historicalShort:
      'Hirte war im Alten Orient ein Herrschertitel. Hesekiel nimmt ihn beim Wort und rechnet mit den Verantwortlichen ab: Sie haben sich selbst geweidet, nicht die Herde.',
    historicalLong:
      'Der Vorwurf ist im Detail sozialer Art: die Schwachen nicht gestärkt, die Kranken nicht geheilt, das Verirrte nicht gesucht. Die Konsequenz ist eine Amtsenthebung – Gott übernimmt selbst und kündigt an, „einen einzigen Hirten“ einzusetzen. Der Text steht in einer langen Reihe altorientalischer Hirtenmetaphorik; auch Hammurapi nennt sich Hirte seines Volkes. Neu ist die Schärfe, mit der die Metapher gegen die Herrschenden gewendet wird.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Das Kapitel ist Rückblick auf das Versagen der Könige und zugleich Programm für die Zeit nach dem Exil: Führung wird an ihrer Wirkung auf die Schwächsten gemessen.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Johannes 10 nimmt den Text auf – bis in die Wendung vom guten Hirten und den Mietlingen, die fliehen. Das Gleichnis vom verlorenen Schaf steht in derselben Linie.',
      },
      {
        tradition: 'Kirchenkritische Lesart',
        text: 'Der Abschnitt wird regelmäßig gegen kirchliche Amtsträger selbst gewendet. Dass Hirtenkritik in der Bibel steht, gehört zu den unbequemsten Zügen der prophetischen Überlieferung.',
      },
    ],
    crossRefs: [
      { book: 'joh', chapter: 10, verse: 11 },
      { book: 'ps', chapter: 23, verse: 1 },
      { book: 'jer', chapter: 23, verse: 1 },
    ],
  },
  {
    book: 'dan',
    chapter: 7,
    from: 9,
    to: 14,
    title: 'Der Menschensohn vor dem Alten',
    historicalShort:
      'Nach vier Tieren, die aus dem Meer steigen, kommt „einer wie eines Menschen Sohn“ mit den Wolken. Ein Bild, das für das Neue Testament kaum zu überschätzen ist.',
    historicalLong:
      'Die vier Tiere stehen für Weltreiche; das vierte wird meist auf die Diadochenreiche und Antiochus IV. bezogen. Der Gegensatz ist bewusst gebaut: Die Reiche steigen aus dem Chaosmeer und sind Bestien, die neue Herrschaft kommt von oben und sieht aus wie ein Mensch. Der Text selbst deutet die Gestalt kollektiv – als „das Volk der Heiligen des Höchsten“. In der Zwischentestamentlichen Literatur wird daraus zunehmend eine Einzelgestalt. „Menschensohn“ ist im Neuen Testament die Selbstbezeichnung Jesu, und bei der Verhandlung vor dem Hohen Rat zitiert er genau diesen Vers.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Das Buch erhielt seine Endgestalt um 165 v. Chr., während der Verfolgung unter Antiochus IV. Die Visionen deuten die eigene Gegenwart, indem sie sie in die babylonische Zeit zurückverlegen.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die kollektive Deutung – die Gestalt steht für das treue Israel – hat in der Tradition großes Gewicht. Daneben gibt es messianische Deutungen auf eine einzelne Person.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Die Kirche bezieht die Stelle auf Christus und liest sie zusammen mit Matthäus 26. Umstritten bleibt, ob Jesus selbst den Titel in diesem Sinn gebrauchte oder eher zurückhaltend.',
      },
    ],
    crossRefs: [
      { book: 'dan', chapter: 7, verse: 27, note: 'Die Deutung im Text selbst' },
      { book: 'mk', chapter: 14, verse: 62, note: 'Das Zitat vor dem Hohen Rat' },
      { book: 'offb', chapter: 1, verse: 13 },
    ],
  },
  {
    book: 'dan',
    chapter: 9,
    from: 1,
    to: 19,
    title: 'Das Gebet Daniels',
    historicalShort:
      'Daniel liest bei Jeremia von siebzig Jahren – und betet. Das Gebet fällt aus dem Rahmen des Buches: kein Geheimnis, keine Vision, sondern schlichtes Schuldbekenntnis in der Wir-Form.',
    historicalLong:
      'Auffällig ist das durchgehende „wir“: Daniel, den das Buch sonst als tadellos zeichnet, schließt sich ein. Das Gebet ist sprachlich stark an Nehemia 9 und Esra 9 angelehnt und dürfte einer festen liturgischen Form folgen. Die siebzig Jahre Jeremias werden anschließend zu „siebzig Wochen von Jahren“ gedeutet – eine Rechnung, die seit der Antike zu unzähligen Datierungsversuchen geführt hat. Der wahrscheinlichste Bezugspunkt bleibt die Entweihung des Tempels 167 v. Chr.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Deutung der siebzig Wochen zielt auf die Zeit des Antiochus IV. Die Zahlen sind symbolisch und nicht als Kalender gedacht.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Das Gebet gilt als Musterfall des Bußgebets: Es rechtfertigt Gott und klagt nicht an, ohne die Bitte um Erbarmen aufzugeben.',
      },
      {
        tradition: 'Auslegungsgeschichte',
        text: 'Aus den siebzig Wochen wurden über Jahrhunderte Weltenddaten errechnet – bis heute. Die Kirchen haben solche Berechnungen wiederholt zurückgewiesen; der Text selbst nennt keinen Termin.',
      },
    ],
    crossRefs: [
      { book: 'jer', chapter: 25, verse: 11, note: 'Die siebzig Jahre' },
      { book: 'neh', chapter: 9, verse: 6 },
      { book: 'dan', chapter: 9, verse: 24 },
    ],
  },
  {
    book: 'hos',
    chapter: 1,
    from: 2,
    to: 11,
    title: 'Die Ehe als Zeichen',
    historicalShort:
      'Der Prophet soll eine Frau heiraten, die ihm untreu sein wird, und den Kindern Namen geben, die Urteile sind: „Nicht begnadet“ und „Nicht mein Volk“. Sein Leben wird zur Botschaft.',
    historicalLong:
      'Hosea wirkte im Nordreich in den Jahrzehnten vor 722 v. Chr., also unmittelbar vor der Katastrophe. Ob die Ehe historisch war, eine Vision oder ein Gleichnis, ist seit der Antike umstritten; Kirchenväter fanden den wörtlichen Sinn anstößig. Entscheidend ist der Bildbereich: Israels Verhältnis zu Gott wird als Ehe beschrieben, und der Bruch dieses Verhältnisses als Ehebruch. Damit betritt die Bibel ein Sprachfeld, das später Jeremia, Hesekiel und das Neue Testament aufnehmen. Kapitel 1 endet nicht beim Urteil: Die Namen werden am Ende umgekehrt.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Zeichenhandlung ist prophetische Praxis: Auch Jesaja und Hesekiel setzen den eigenen Körper und das eigene Leben als Botschaft ein. Der Text will keine Auskunft über Hoseas Privatleben geben.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die Umkehrung der Namen – aus „Nicht mein Volk“ wird „Kinder des lebendigen Gottes“ – gilt als eigentliches Ziel des Kapitels. Das Urteil ist nicht das letzte Wort.',
      },
      {
        tradition: 'Feministische Exegese',
        text: 'Das Ehebild wird kritisch befragt: Es setzt die untreue Frau mit dem Volk gleich und den strafenden Ehemann mit Gott. Diese Bildlogik hat eine problematische Wirkungsgeschichte, die mitgelesen werden muss.',
      },
    ],
    crossRefs: [
      { book: 'hos', chapter: 2, verse: 14 },
      { book: 'roem', chapter: 9, verse: 25, note: 'Paulus zitiert die Namen' },
      { book: '1petr', chapter: 2, verse: 10 },
    ],
  },
  {
    book: 'joel',
    chapter: 1,
    from: 1,
    to: 12,
    title: 'Die Heuschreckenplage',
    historicalShort:
      'Ein Insektenschwarm frisst ein ganzes Land kahl. Der Prophet beschreibt es in vier Wellen und fordert die Alten auf zu sagen, ob sie so etwas je erlebt haben.',
    historicalLong:
      'Wanderheuschrecken sind im Nahen Osten eine reale Katastrophe: Ein großer Schwarm kann täglich so viel fressen wie eine Großstadt an Nahrung verbraucht. Der Text nennt vier Stadien, wohl Entwicklungsstufen des Insekts. Ob die Plage tatsächlich stattfand oder als Bild für ein einfallendes Heer steht, ist umstritten – Kapitel 2 beschreibt den Schwarm wie eine Armee. Die Datierung des Buches ist unsicher; die meisten setzen die Perserzeit an. Aus dieser Not entwickelt Joel den Aufruf zur Umkehr, und wenige Kapitel später den Satz vom Geist über alle.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Grenze zwischen Naturkatastrophe und Kriegsbild ist im Buch bewusst durchlässig. Beides steht für den „Tag des HERRN“, der hier zuerst als Bedrohung erscheint.',
      },
      {
        tradition: 'Prophetische Tradition',
        text: 'Bemerkenswert ist, dass Joel keine bestimmte Schuld benennt. Die Umkehr wird gefordert, ohne dass eine Anklage vorausgeht – ungewöhnlich für ein Prophetenbuch.',
      },
      {
        tradition: 'Ökologische Lesart',
        text: 'Der Text wird heute häufig als früher Beleg dafür gelesen, dass Naturkatastrophen theologisch nicht bagatellisiert werden. Klage über zerstörte Ernte und Landschaft hat einen eigenen Ort.',
      },
    ],
    crossRefs: [
      { book: 'joel', chapter: 2, verse: 13, note: '„Zerreißt eure Herzen“' },
      { book: 'joel', chapter: 2, verse: 28, note: 'Der Geist über alle' },
      { book: 'am', chapter: 5, verse: 18 },
    ],
  },
  {
    book: 'am',
    chapter: 7,
    from: 10,
    to: 17,
    title: 'Amos wird des Landes verwiesen',
    historicalShort:
      'Der Priester von Bethel meldet den Propheten beim König und weist ihn aus: Er solle woanders sein Brot verdienen. Amos antwortet mit dem Satz, er sei gar kein Prophet.',
    historicalLong:
      'Der Vorwurf des Priesters ist bemerkenswert offen: Bethel sei „ein Heiligtum des Königs und ein Reichstempel“ – Religion als Staatsangelegenheit, ausgesprochen ohne Verlegenheit. Amos entgegnet, er sei weder Prophet noch Prophetenschüler, sondern Viehzüchter und Maulbeerfeigenzüchter. Damit lehnt er den Berufsstand ab: Er lebt nicht davon und ist deshalb nicht erpressbar. Amos stammte aus Tekoa in Juda und ging in das reichere Nordreich hinauf – ein Ausländer, der die Verhältnisse kritisierte.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Szene ist der einzige erzählende Abschnitt im Buch. Sie erklärt, warum die Sammlung endete, und zeigt die institutionelle Seite des Konflikts: Prophetie gegen Tempelbetrieb.',
      },
      {
        tradition: 'Sozialethische Auslegung',
        text: 'Die Kritik des Amos zielt durchweg auf wirtschaftliches Unrecht: verkaufte Arme, gefälschte Waagen, Luxus auf Kosten anderer. Die Ausweisung zeigt, wie schnell solche Kritik als Störung behandelt wird.',
      },
      {
        tradition: 'Kirchliche Rezeption',
        text: 'Der Satz „Ich bin kein Prophet“ wurde vielfach für die Legitimität der Kritik von außen in Anspruch genommen – auch gegen Amtskirchen.',
      },
    ],
    crossRefs: [
      { book: 'am', chapter: 5, verse: 24, note: '„Es ströme das Recht wie Wasser“' },
      { book: 'am', chapter: 2, verse: 6 },
      { book: '1koe', chapter: 12, verse: 29, note: 'Warum Bethel Reichsheiligtum war' },
    ],
  },
  {
    book: 'jona',
    chapter: 1,
    from: 1,
    to: 16,
    title: 'Die Flucht nach Tarsis',
    historicalShort:
      'Der Auftrag lautet Ninive, im Osten. Jona bucht ein Schiff nach Tarsis, so weit im Westen wie damals denkbar. Die Erzählung setzt ihren Helden von Anfang an ins Unrecht – und die heidnischen Seeleute ins Recht.',
    historicalLong:
      'Das Buch ist keine Prophetenschrift wie die anderen: Es enthält fast keine Prophetenworte, dafür eine durchkomponierte Erzählung mit Ironie. Die Seeleute beten, werfen Lose, sträuben sich gegen den Menschenwurf und fürchten am Ende Gott – während der Prophet unter Deck schläft. Diese Umkehrung ist das Verfahren des ganzen Buches. Ninive war zur mutmaßlichen Abfassungszeit längst zerstört; die Wahl gerade dieser Stadt ist deshalb bewusst provozierend gesetzt.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die meisten lesen das Buch als Lehrerzählung aus nachexilischer Zeit, gerichtet gegen eine Frömmigkeit, die Gottes Erbarmen auf die eigene Gruppe beschränkt.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Das Buch wird am Versöhnungstag zur Nachmittagszeit vollständig gelesen. Die Botschaft ist die Umkehr – auch die der Fremden, und die Bereitschaft Gottes, sein Urteil zurückzunehmen.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Matthäus deutet die drei Tage im Fisch auf Ostern. Diese Lesart hat die Wirkungsgeschichte geprägt, überdeckt aber leicht das eigentliche Thema des Buches.',
      },
    ],
    crossRefs: [
      { book: 'jona', chapter: 4, verse: 2, note: 'Der Grund seiner Flucht' },
      { book: 'mt', chapter: 12, verse: 40 },
      { book: '2koe', chapter: 14, verse: 25, note: 'Der historische Jona' },
    ],
  },
  {
    book: 'jona',
    chapter: 3,
    from: 1,
    to: 10,
    title: 'Ninive kehrt um',
    historicalShort:
      'Fünf hebräische Wörter genügen: Die ganze Stadt fastet, vom König bis zum Vieh. Es ist die kürzeste Predigt der Bibel – und die einzige, die vollständig gelingt.',
    historicalLong:
      'Die Erzählung übertreibt sichtbar: eine Stadt von drei Tagereisen, ein König, der Sacktuch anlegt, Tiere im Bußgewand. Die Übertreibung gehört zum Verfahren – sie stellt das Ergebnis in ein grelles Licht. Der entscheidende Satz steht am Ende: „Und Gott reute das Übel.“ Das hebräische Wort meint ein Umdenken, kein Bedauern. Dass Gott ein angekündigtes Gericht zurücknimmt, ist theologisch die Zumutung des Buches – und genau das, was Jona im nächsten Kapitel wütend macht.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Erzählung setzt die Möglichkeit voraus, dass prophetische Ankündigung bedingt ist. Jeremia 18 formuliert dasselbe grundsätzlich: Ein Wort gegen ein Volk gilt, solange das Volk sich nicht ändert.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die Buße Ninives dient als Beispiel dafür, dass Umkehr wirkt und niemandem verwehrt ist. Auf die Aufrichtigkeit kommt es an, nicht auf Herkunft.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Jesus stellt die Niniviten den eigenen Zeitgenossen gegenüber: Sie kehrten auf viel weniger hin um. Der Vergleich ist als Vorwurf gemeint, nicht als Lob des Propheten.',
      },
    ],
    crossRefs: [
      { book: 'jer', chapter: 18, verse: 8 },
      { book: 'lk', chapter: 11, verse: 32 },
      { book: 'jona', chapter: 4, verse: 1, note: 'Jonas Reaktion' },
    ],
  },
  {
    book: 'mi',
    chapter: 5,
    from: 1,
    to: 5,
    title: 'Der Herrscher aus Bethlehem',
    historicalShort:
      'Aus dem kleinsten Ort soll kommen, was das Land nicht aus eigener Kraft schafft. Matthäus zitiert diese Stelle, als die Weisen nach dem König fragen.',
    historicalLong:
      'Der Kontrast trägt den Text: Jerusalem wird belagert, der Richter Israels ins Gesicht geschlagen – und der Blick geht ausgerechnet auf das Dorf, aus dem David kam. Die Erwartung ist nicht neuer Machtaufbau, sondern Rückkehr zu den Anfängen. Achtung bei der Zählung: In der gedruckten Lutherbibel beginnt Kapitel 5 einen Vers früher, sodass der Bethlehem-Vers dort 5,1 heißt und hier 5,2. Der Text selbst ist derselbe.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Stelle stammt vermutlich aus der Zeit der assyrischen Bedrohung im 8. Jahrhundert v. Chr.; manche setzen sie später an. Gemeint ist zunächst ein neuer davidischer König, nicht eine Gestalt am Ende der Zeit.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der Vers gehört zu den messianischen Texten und wird auf einen künftigen Nachkommen Davids bezogen – irdisch gedacht, mit Frieden und Recht als Kennzeichen.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Matthäus zitiert die Stelle im Munde der Schriftgelehrten und weicht dabei vom hebräischen Wortlaut ab – ein Beispiel dafür, wie das Neue Testament die Schrift meist nach der griechischen Fassung zitiert.',
      },
    ],
    crossRefs: [
      { book: 'mt', chapter: 2, verse: 6, note: 'Das Zitat vor Herodes' },
      { book: 'joh', chapter: 7, verse: 42 },
      { book: '1sam', chapter: 16, verse: 1 },
    ],
  },
  {
    book: 'nah',
    chapter: 3,
    from: 1,
    to: 7,
    title: 'Wehe der Blutstadt',
    historicalShort:
      'Ein Prophetenbuch, das fast ausschließlich vom Untergang einer einzigen Stadt handelt – und dabei nicht verbirgt, dass es sich darüber freut.',
    historicalLong:
      'Ninive fiel 612 v. Chr. Assyrien hatte über anderthalb Jahrhunderte die Region beherrscht, das Nordreich vernichtet und Juda tributpflichtig gemacht; seine Reliefs zeigen Pfählungen und Deportationen mit einer Offenheit, die als Abschreckung gedacht war. Nahums Sprache ist entsprechend hart. Das Buch ist unter den Propheten das schwerste, weil es keine Umkehr in Aussicht stellt und keine Selbstkritik enthält – anders als Jona, das von derselben Stadt handelt und zum entgegengesetzten Ergebnis kommt.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Das Buch dürfte kurz vor oder nach dem Fall Ninives entstanden sein. Es artikuliert die Erleichterung der Unterworfenen – eine Stimme, die im Kanon sonst kaum vorkommt.',
      },
      {
        tradition: 'Theologische Rückfrage',
        text: 'Viele Ausleger halten fest, dass Nahum und Jona bewusst nebeneinanderstehen. Die Bibel überliefert beide Haltungen gegenüber derselben Stadt und löst die Spannung nicht auf.',
      },
      {
        tradition: 'Befreiungstheologische Lesart',
        text: 'Der Text wird als Stimme der Opfer gelesen: Wer Gewalt erlitten hat, hat ein Recht darauf, das Ende der Gewalt zu benennen. Die Frage bleibt, wo Klage in Rachefantasie übergeht.',
      },
    ],
    crossRefs: [
      { book: 'nah', chapter: 1, verse: 7, note: 'Die andere Seite des Buches' },
      { book: 'jona', chapter: 3, verse: 10 },
      { book: 'zef', chapter: 2, verse: 13 },
    ],
  },
  {
    book: 'hab',
    chapter: 3,
    from: 17,
    to: 19,
    title: '„Dennoch will ich mich freuen“',
    historicalShort:
      'Kein Feigenbaum trägt, kein Weinstock, keine Herde im Stall – und dann folgt ein „dennoch“. Der Schluss des Buches gehört zu den nüchternsten Hoffnungstexten der Bibel.',
    historicalLong:
      'Habakuk beginnt mit einer Anklage gegen Gott: Warum bleibt Gewalt ungestraft? Die Antwort kündigt die Chaldäer an – und macht die Frage nur schlimmer, denn nun handelt Gott durch ein noch gewalttätigeres Volk. Das Buch löst diesen Widerspruch nicht auf. Es endet mit einem Psalm, der ausdrücklich für den Gottesdienst bestimmt ist, samt musikalischer Anweisung. Die Freude, von der er spricht, setzt nicht ein, wenn die Lage sich bessert, sondern während sie schlecht bleibt.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Kapitel 3 ist ein eigenständiger Psalm, der in Qumran teilweise fehlt. Er wurde dem Buch wohl angefügt, um die offenen Fragen liturgisch aufzufangen.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Der Satz „Der Gerechte wird aus Glauben leben“ aus Kapitel 2 wurde für Luther zum Schlüsselvers. Der Schluss in Kapitel 3 zeigt, was damit praktisch gemeint ist.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Text wird häufig gegen einen Optimismus in Anspruch genommen, der die Lage schönredet. Die Aufzählung des Mangels wird vollständig durchgehalten, bevor das „dennoch“ kommt.',
      },
    ],
    crossRefs: [
      { book: 'hab', chapter: 1, verse: 2, note: 'Die Anklage am Anfang' },
      { book: 'hab', chapter: 2, verse: 4 },
      { book: 'roem', chapter: 1, verse: 17 },
    ],
  },
  {
    book: 'hag',
    chapter: 2,
    from: 1,
    to: 9,
    title: 'Der Vergleich mit dem ersten Tempel',
    historicalShort:
      'Die Alten, die den ersten Tempel noch gesehen hatten, weinen beim Anblick des neuen. Haggai nimmt den Vergleich auf, statt ihn zu übergehen – und dreht ihn um.',
    historicalLong:
      'Der zweite Tempel war deutlich kleiner und ärmer ausgestattet als der salomonische; Esra 3 berichtet vom gleichzeitigen Weinen und Jubeln bei der Grundsteinlegung. Haggai wirkte um 520 v. Chr., als der Bau nach Jahren der Stockung wieder aufgenommen wurde. Seine Argumentation ist nicht, der Vergleich sei unfair, sondern die Herrlichkeit dieses Hauses werde die des ersten übertreffen – nicht durch Ausstattung, sondern weil Gott dort gegenwärtig sei. Der Bau wurde 515 v. Chr. abgeschlossen.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Haggais Datierungen sind so genau, dass sie sich auf den Monat umrechnen lassen. Das Buch ist eine der bestdatierten Schriften des Alten Testaments.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die Zusage wird auf die Zukunft bezogen: Der zweite Tempel wurde später von Herodes prachtvoll ausgebaut, was manche als Erfüllung lasen; andere halten die Verheißung offen.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Die Kirche bezieht die Zusage auf das Kommen Christi in den Tempel. Neuere Auslegung betont daneben den seelsorglichen Zug: Der Text nimmt die Enttäuschung ernst, statt sie zu verbieten.',
      },
    ],
    crossRefs: [
      { book: 'esr', chapter: 3, verse: 12, note: 'Weinen und Jubeln' },
      { book: 'sach', chapter: 4, verse: 10, note: '„Wer ist, der geringe Anfänge verachtet?“' },
      { book: 'hag', chapter: 1, verse: 4 },
    ],
  },
  {
    book: 'sach',
    chapter: 4,
    from: 1,
    to: 14,
    title: 'Der Leuchter und die zwei Ölbäume',
    historicalShort:
      'Ein goldener Leuchter, der sich selbst versorgt, und daneben zwei Ölbäume. Der Deutungssatz gehört zu den bekanntesten der Bibel: „Nicht durch Heer oder Kraft, sondern durch meinen Geist.“',
    historicalLong:
      'Die Vision fällt in dieselbe Zeit wie Haggai: der stockende Tempelbau um 520 v. Chr. Der Leuchter mit sieben Lampen erinnert an die Menora im Heiligtum, nur speist er sich hier ohne menschliches Zutun. Die zwei Ölbäume werden als „die zwei Gesalbten“ gedeutet – gemeint sind wohl der Statthalter Serubbabel und der Hohepriester Josua, also weltliche und geistliche Leitung nebeneinander. Der Satz vom Geist ist keine Absage an Arbeit, sondern an die Vorstellung, der Wiederaufbau hänge an militärischer oder politischer Macht, die es nicht mehr gab.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Doppelspitze aus Statthalter und Hohepriester spiegelt die Verhältnisse der frühen Perserzeit: kein König mehr, dafür geteilte Verantwortung unter fremder Oberhoheit.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die Menora als Bild für die stetige Gegenwart Gottes prägt die Auslegung. Der Vers vom Geist wird an Chanukka gelesen.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Der Satz wurde zur Losung vieler Erneuerungsbewegungen. Der Zusammenhang mahnt zur Vorsicht: Er steht in einem Bauprojekt, nicht in einer Absage an Mühe.',
      },
    ],
    crossRefs: [
      { book: 'sach', chapter: 4, verse: 6 },
      { book: 'offb', chapter: 11, verse: 4 },
      { book: 'hag', chapter: 2, verse: 4 },
    ],
  },
  {
    book: 'mal',
    chapter: 3,
    from: 8,
    to: 12,
    title: '„Prüft mich hierin“',
    historicalShort:
      'Der einzige Ort in der Bibel, an dem Gott ausdrücklich zum Test auffordert – und es geht um Geld: um den Zehnten für die Vorratskammer des Tempels.',
    historicalLong:
      'Maleachi wirkt in der Perserzeit, als der Tempel steht, der Alltag aber ernüchternd ist. Der Zehnte war die Grundversorgung der Leviten, die keinen Landbesitz hatten; blieb er aus, brach der Dienst zusammen. Nehemia 13 berichtet von genau dieser Lage. Das ganze Buch ist als Streitgespräch gebaut: Gott sagt etwas, das Volk widerspricht, Gott antwortet. Diese Form – Behauptung, Einwand, Begründung – prägt alle sechs Abschnitte.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Text spiegelt eine konkrete Versorgungskrise am Tempel, keine allgemeine Lehre über Geben. Die Disputationsform gilt als Vorstufe rabbinischer Argumentation.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die Aufforderung zum Prüfen wird als Ausnahme markiert: Sonst gilt, Gott nicht auf die Probe zu stellen. Hier ist es erlaubt, weil es um die Versorgung der Bedürftigen geht.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Der Vers wird verbreitet als Zusage materiellen Wohlstands für Spender gebraucht. Viele Ausleger widersprechen: Es geht um die Verlässlichkeit einer Gemeinschaft gegenüber ihren Bediensteten, nicht um ein Anlagegeschäft.',
      },
    ],
    crossRefs: [
      { book: 'neh', chapter: 13, verse: 10, note: 'Dieselbe Lage bei Nehemia' },
      { book: '4mo', chapter: 18, verse: 21 },
      { book: 'mal', chapter: 3, verse: 1 },
    ],
  },
];

/**
 * Artikel, die den angegebenen Vers abdecken – jeweils ergänzt um die
 * zeitliche Einordnung aus `datings.ts`.
 */
export function commentaryFor(book: string, chapter: number, verse: number): CommentaryEntry[] {
  return COMMENTARY.filter(
    (e) => e.book === book && e.chapter === chapter && verse >= e.from && verse <= e.to,
  ).map((entry) => ({
    ...entry,
    dating: DATINGS[datingKey(entry.book, entry.chapter, entry.from)],
  }));
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
