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

/**
 * Ein Wort des Urtextes, an dem die Übersetzung an eine Grenze kommt.
 *
 * Nicht als Sprachunterricht gedacht, sondern als Hinweis darauf, dass an
 * dieser Stelle eine Entscheidung getroffen wurde: „Wort“ für *logos*, „Liebe“
 * für gleich drei verschiedene griechische Wörter. Wer das weiß, liest die
 * Übersetzung anders – auch ohne ein Wort Hebräisch zu können.
 */
export interface TermNote {
  /** Das Wort in Umschrift, mit Sprache: „hebr. chesed“, „griech. logos“. */
  word: string;
  /** Wie Luther übersetzt – der Anhaltspunkt im deutschen Text. */
  rendered?: string;
  /** Was das Wort trägt und was in der Übersetzung verloren geht. */
  note: string;
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
  /**
   * Ausführliche Fassung hinter „Mehr erfahren“.
   *
   * Leerzeilen trennen Absätze. Die Anzeige setzt sie auch als Absätze – ein
   * langer Block ohne Gliederung wird sonst nicht gelesen, sondern überflogen.
   */
  historicalLong?: string;
  /**
   * Was der Text in der Geschichte angerichtet und bewirkt hat.
   *
   * Ausdrücklich auch dort, wo es unangenehm wird: Stellen, mit denen Sklaverei,
   * Judenfeindschaft oder Gewalt begründet wurden, gehören zur Auslegungs-
   * geschichte dieser Texte und werden hier nicht übergangen.
   */
  reception?: string;
  /** Wörter des Urtextes, die die Übersetzung nicht mitträgt. */
  terms?: TermNote[];
  interpretations: Interpretation[];
  crossRefs?: CrossReference[];
  /**
   * Grundlagen des Artikels.
   *
   * Wo nichts steht, zeigt die App die Standardliteratur zum Buch aus dem
   * Steckbrief – besser eine ehrliche Angabe zur Buchebene als gar keine.
   */
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
      'Israel formuliert hier bewusst einen Gegenentwurf: Es gibt keinen Kampf zwischen Göttern, Sonne und Mond sind keine Gottheiten, sondern werden nüchtern „Lichter“ genannt. Auffällig ist auch die Würde des Menschen: Während in Mesopotamien nur der König als Bild der Gottheit galt, wird hier der Mensch als solcher – „männlich und weiblich“ – zum Bild Gottes erklärt. Für Menschen im babylonischen Exil, die ihren Tempel und ihre Eigenstaatlichkeit verloren hatten, war das eine Kampfansage gegen die Weltdeutung der Siegermacht.\n\nDer Aufbau ist streng: Die ersten drei Tage schaffen Räume – Licht und Finsternis, Himmelsgewölbe und Wasser, Land und Meer –, die zweiten drei füllen sie mit Gestirnen, Fischen, Vögeln und Landtieren. Tag eins gehört zu Tag vier, Tag zwei zu Tag fünf, Tag drei zu Tag sechs. Der siebte Tag steht außerhalb dieser Ordnung und hat als einziger kein Werk: Er ist das Ziel, nicht der Rest. Der wiederkehrende Satz „und Gott sah, daß es gut war“ ist dabei kein ästhetisches Urteil, sondern eine Feststellung über die Brauchbarkeit der Welt – sie taugt zum Leben.',
    reception:
      'Der Auftrag, sich die Erde untertan zu machen, ist über Jahrhunderte als Freibrief gelesen worden. Der Historiker Lynn White machte 1967 genau diesen Vers für die ökologische Krise mitverantwortlich – eine These, die heftig widersprochen wurde, aber die Debatte bis heute prägt. Die Gegenlesart weist darauf hin, dass das hebräische Wort für „herrschen“ in derselben Bibel den Hirten meint, der für die Herde einsteht, und dass der Mensch im zweiten Schöpfungsbericht den Garten „bebauen und bewahren“ soll.\n\nDie andere Wirkung geht in die entgegengesetzte Richtung: Dass jeder Mensch Gottes Bild ist, wurde in den Abolitionismus, in die Erklärung der Menschenrechte und in die Bürgerrechtsbewegung hinein zitiert. Beide Wirkungen gehen von demselben Kapitel aus.',
    terms: [
      {
        word: 'hebr. bara',
        rendered: 'schuf',
        note: 'Ein Verb, das im Alten Testament ausschließlich Gott als Subjekt hat. Kein Mensch „schafft“ in diesem Sinn. Über das Wie sagt es nichts – die Vorstellung einer Erschaffung aus dem Nichts ist eine spätere Zuspitzung.',
      },
      {
        word: 'hebr. tohu wabohu',
        rendered: 'wüst und leer',
        note: 'Ein Reimpaar für das Ungeformte, nicht für das Nichts. Der Text setzt nicht bei einer Leere an, sondern bei einem Zustand ohne Ordnung, den Gott gliedert.',
      },
      {
        word: 'hebr. zelem',
        rendered: 'Bild',
        note: 'Dasselbe Wort steht sonst für die Statue eines Königs, die in einer Provinz seine Gegenwart vertritt. Auf den Menschen angewandt heißt es: Er steht in der Welt an Gottes Stelle – eine Ansage, die im Alten Orient nur für Könige galt.',
      },
    ],
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
      {
        tradition: 'Ostkirchliche Auslegung',
        text: 'Die orthodoxe Theologie liest den Bericht von seinem Ziel her: Der siebte Tag, an dem Gott ruht, ist nicht Abschluss, sondern Ausblick – die Schöpfung ist auf ein Fest hin angelegt, nicht auf Betrieb.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Raschi liest den ersten Satz nicht als Zeitangabe, sondern als Überschrift: „Als Gott anfing, Himmel und Erde zu schaffen …“ Die Frage, was vorher war, wird damit gar nicht erst gestellt – der Text beginnt bei der Ordnung, nicht beim Ursprung.',
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
      'Die Schlange ist im Text ausdrücklich ein Geschöpf, kein Gegengott – die Gleichsetzung mit dem Teufel entsteht erst in späterer jüdischer und christlicher Auslegung. Auffällig ist die psychologische Genauigkeit: Zuerst wird das Gebot verzerrt wiedergegeben, dann wird Misstrauen gesät, am Ende folgt gegenseitige Schuldzuweisung. Das Bild vom Feigenblatt und die Frage „Wo bist du?“ gehören zu den dichtesten Szenen der Bibel.\n\nBemerkenswert ist außerdem, was der Text nicht sagt. Von einem Apfel ist keine Rede – die Frucht bleibt namenlos; das Wort „Sünde“ kommt im ganzen Kapitel nicht vor, „Fall“ ebenso wenig. Und der Satz der Schlange trifft zu: Die Augen werden tatsächlich aufgetan, und die beiden sterben nicht an diesem Tag. Was sie gewinnen, ist Erkenntnis; was sie verlieren, ist die Selbstverständlichkeit. Die Erzählung endet auch nicht mit einer Verfluchung des Menschen: Verflucht werden ausdrücklich die Schlange und der Acker, nicht Adam und nicht Eva.',
    reception:
      'Kaum ein Kapitel hat mehr Schaden angerichtet. Aus der Reihenfolge von Verführung und Strafe wurde über Jahrhunderte die Behauptung abgeleitet, die Frau sei die Tür zur Sünde – ein Satz, der von Kirchenvätern bis in Hexenprozesse hinein wirkte. Auch der Satz „er soll dein Herr sein“ wurde als Anordnung gelesen statt als Beschreibung eines beschädigten Zustands.\n\nDaneben steht eine Auslegungslinie, die den Text als Erklärung der Mühsal las: Warum Ackerbau schwer ist, warum Geburten gefährlich sind, warum Menschen sterben. Und in der Kunst wurde aus der namenlosen Frucht der Apfel – vermutlich, weil das lateinische *malum* sowohl „Apfel“ als auch „das Böse“ heißt.',
    terms: [
      {
        word: 'hebr. arum',
        rendered: 'listiger',
        note: 'Klingt fast gleich wie das Wort für „nackt“ im Vers davor. Der Erzähler spielt mit dem Anklang: Wer klug werden will, endet nackt.',
      },
      {
        word: 'hebr. tow wara',
        rendered: 'gut und böse',
        note: 'Ein Ausdruck für die Gesamtheit – so wie „Himmel und Erde“ alles meint. „Wissen, was gut und böse ist“ heißt daher weniger moralische Einsicht als das Beanspruchen einer Übersicht, die dem Menschen nicht zusteht.',
      },
    ],
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
      {
        tradition: 'Feministische Exegese',
        text: 'Die Auslegungsgeschichte hat die Frau über Jahrhunderte als Urheberin des Bruchs beschrieben. Der Text selbst sagt, der Mann sei „bei ihr“ gewesen und habe wortlos mitgegessen; das Urteil trifft beide.',
      },
      {
        tradition: 'Religionsgeschichtliche Einordnung',
        text: 'Die Erzählung teilt Motive mit älteren Texten der Umwelt: Im Gilgamesch-Epos verliert der Mensch die Unsterblichkeit an eine Schlange, und die Verwandlung des Wildmanns Enkidu zum Menschen geht ebenfalls über eine Erkenntnis, nach der es kein Zurück gibt. Israel erzählt das Motiv um – nicht Götterlaune, sondern eine Entscheidung des Menschen steht am Anfang.',
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
      'Aus dieser Wurzel wird der Eigenname JHWH abgeleitet, das Tetragramm. Aus Ehrfurcht wird er im Judentum nicht ausgesprochen, sondern beim Lesen durch „Adonai“ (Herr) ersetzt; die Lutherbibel gibt ihn mit „HERR“ in Großbuchstaben wieder. Die Form lässt sich auch zukünftig übersetzen: „Ich werde da sein, als der ich da sein werde“ – eine Zusage der Mitgegenwart auf dem Weg, nicht eine Definition des Wesens.\n\nDie Antwort ist zugleich eine Verweigerung. Im Alten Orient gab ein Name Zugriff: Wer den Namen einer Gottheit kannte, konnte sie beschwören und in Formeln binden. Gott nennt einen Namen, der aus einem Verb besteht und nichts festlegt – und schiebt in Vers 15 nach, was stattdessen gilt: der Gott Abrahams, Isaaks und Jakobs. Statt einer Auskunft über sein Wesen bekommt Mose eine Geschichte, an der sich Gott erkennen lässt. Die Szene selbst ist entsprechend gebaut: Mose fragt viermal zurück, und keine Antwort beruhigt ihn.',
    reception:
      'Die griechische Übersetzung machte aus dem Satz eine Aussage über das Sein selbst: „Ich bin der Seiende.“ Von dort führt eine lange Linie über Augustinus und Thomas von Aquin zur Bestimmung Gottes als das Sein schlechthin – eine Deutung, die viel philosophische Kraft entfaltet hat und der neuere Exegeten entgegenhalten, dass der hebräische Text vom Dasein für jemanden spricht, nicht vom Sein an sich.\n\nMartin Buber und Franz Rosenzweig übersetzten deshalb bewusst gegen die Tradition: „Ich werde dasein, als der ich dasein werde“ – und trafen damit im 20. Jahrhundert einen Ton, der auch in christlichen Gesangbüchern nachhallt.',
    terms: [
      {
        word: 'hebr. JHWH',
        rendered: 'HERR',
        note: 'Die vier Buchstaben des Gottesnamens werden im Judentum nicht ausgesprochen; gelesen wird stattdessen „Adonaj“, Herr. Luther folgt dieser Ehrfurcht und setzt überall dort, wo im Hebräischen der Name steht, das Wort HERR in Großbuchstaben – eine Schreibweise, die durch die ganze Bibel geht.',
      },
      {
        word: 'hebr. ehje ascher ehje',
        rendered: 'ICH WERDE SEIN, DER ICH SEIN WERDE',
        note: 'Zwei Formen desselben Verbs „sein“, verbunden durch ein Relativpronomen. Das Hebräische kennt keine Zeitformen im deutschen Sinn; deshalb sind Gegenwart und Zukunft beide möglich, und keine Übersetzung kann beides zugleich sagen.',
      },
    ],
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
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der Midrasch versteht die Doppelung als Zusage an Bedrängte: Ich werde bei ihnen sein in dieser Not, und ich werde bei ihnen sein in der nächsten. Der Name ist damit keine Definition, sondern ein Versprechen für die Zukunft.',
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
      'Der Vorspruch „Ich bin der HERR, dein Gott, der ich dich aus Ägypten geführt habe“ ist entscheidend: Die Gebote sind Konsequenz der Befreiung, nicht deren Bedingung. Die Zählung unterscheidet sich zwischen den Konfessionen – die katholische und lutherische Tradition zählt anders als die reformierte, orthodoxe und jüdische; die Gesamtzahl bleibt zehn. Mehrere Gebote schützen konkret die Schwächeren: Der Sabbat gilt ausdrücklich auch für Sklaven, Fremde und Tiere.\n\nDie zehn Worte stehen zweimal in der Bibel, und die beiden Fassungen sind nicht gleich. In 5. Mose 5 wird das Sabbatgebot mit der Befreiung aus Ägypten begründet – damit auch Knecht und Magd ruhen –, hier in 2. Mose mit der Schöpfung, an der Gott am siebten Tag ruhte. Auch das letzte Gebot ist umgestellt: Dort steht die Frau des Nächsten voran und getrennt vom Haus, hier gehört sie in die Aufzählung des Besitzes. Wer die beiden Fassungen nebeneinanderlegt, sieht der Bibel beim Auslegen ihrer selbst zu.',
    reception:
      'Die Gebote stehen bis heute in Gerichtssälen, Schulen und Verfassungsdebatten – und ihre öffentliche Aufstellung ist in den USA mehrfach vor dem Supreme Court gelandet. Zugleich sind sie im Recht nie einfach übernommen worden: Kein moderner Staat verbietet Bilder oder verlangt die Sabbatruhe.\n\nDas Bilderverbot hat eine eigene, blutige Geschichte: Im byzantinischen Bilderstreit des 8. und 9. Jahrhunderts und noch einmal in der Reformationszeit wurden Kirchen geplündert und Kunstwerke zerstört; in Zürich und Wittenberg wurde erbittert darüber gestritten, ob Luther oder Karlstadt recht behielt. Die Ostkirche entschied den Streit 843 zugunsten der Ikonen – mit dem Argument, dass Gott in Christus selbst ein Bild geworden sei.',
    terms: [
      {
        word: 'hebr. dabar',
        rendered: 'Worte',
        note: 'Der hebräische Text spricht nicht von zehn Geboten, sondern von den „zehn Worten“. Daher der griechische Name Dekalog. Das Wort lässt offen, ob es sich um Befehle, Zusagen oder Grundsätze handelt.',
      },
      {
        word: 'hebr. razach',
        rendered: 'töten',
        note: 'Meint das widerrechtliche Töten eines Menschen, nicht jede Tötung; für Krieg, Todesstrafe und Schlachten stehen andere Verben. Neuere Übersetzungen sagen deshalb „morden“. Ob damit auch die Todesstrafe gedeckt ist, wird seit Jahrhunderten gestritten.',
      },
    ],
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
      {
        tradition: 'Rechtsgeschichtliche Einordnung',
        text: 'Verglichen mit dem Kodex Hammurapi fällt auf, was fehlt: keine Strafandrohung, keine Fallunterscheidung, kein Verfahren. Die zehn Worte sind kein Gesetzbuch, sondern eine Grundordnung, die erst in den folgenden Kapiteln in einzelne Rechtssätze übersetzt wird.',
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
      'Der hebräische Satz lässt zwei Übersetzungen zu: „Der HERR ist unser Gott, der HERR allein“ oder „… der HERR ist einer“. Die erste Fassung ist ein Treuebekenntnis (nur dieser eine gilt), die zweite eine Aussage über Gottes Einheit. Die Anweisungen, die Worte an Türpfosten und an die Hand zu binden, wurden wörtlich umgesetzt: Mesusa und Tefillin gehen auf diese Verse zurück.\n\nIm Gottesdienst der Synagoge ist das Schma nicht auf diese sechs Verse beschränkt: Dazu gehören zwei weitere Abschnitte, 5. Mose 11 und 4. Mose 15, und gesprochen wird es zweimal täglich. Auffällig ist die Reihenfolge in Vers 5 – Herz, Seele, Vermögen. Das letzte Wort meint das, was einer hat, und die rabbinische Auslegung hat darüber gestritten, ob damit Besitz oder Kraft gemeint ist. Ebenso auffällig: Was weitergegeben werden soll, sind nicht Lehrsätze, sondern Sätze, die im Alltag fallen – beim Sitzen, Gehen, Hinlegen, Aufstehen.',
    reception:
      'Das Schma ist das Gebet, mit dem gläubige Jüdinnen und Juden den Tag beginnen und beschließen – und mit dem viele in den Tod gegangen sind. Rabbi Akiba soll es unter der Folter der Römer gesprochen haben; in den Ghettos und Lagern des 20. Jahrhunderts wurde es wieder zum letzten Satz.\n\nDie Anweisungen der Verse 8 und 9 sind wörtlich genommen worden und im Judentum bis heute sichtbar: Tefillin an Arm und Stirn, die Mesusa am Türpfosten. Im Christentum blieb der Vers dagegen fast unsichtbar – bis auf die Stelle, an der Jesus ihn zitiert und damit das ganze Gesetz zusammenfasst.',
    terms: [
      {
        word: 'hebr. schema',
        rendered: 'Höre',
        note: 'Der Imperativ, der dem Gebet seinen Namen gibt. Im Hebräischen schließt Hören das Befolgen ein – wer hört, ohne zu tun, hat nicht gehört.',
      },
      {
        word: 'hebr. lewaw',
        rendered: 'Herzen',
        note: 'Nicht der Sitz der Gefühle, sondern der des Denkens, Planens und Entscheidens. „Von ganzem Herzen lieben“ meint deshalb zuerst eine Ausrichtung des Willens, nicht eine Stimmung.',
      },
    ],
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
      {
        tradition: 'Ostkirchliche Auslegung',
        text: 'Die orthodoxe Tradition betont, dass das Hören vor dem Bekennen steht. Der Glaube beginnt nicht mit einer Aussage über Gott, sondern mit einer Haltung des Empfangens.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Luther legte das Gewicht auf das erste Gebot und las das Schma als dessen Auslegung: Woran ein Mensch sein Herz hängt, das ist sein Gott. Die Frage lautet damit nicht, ob jemand einen Gott hat, sondern welchen.',
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
      'Der Psalm wechselt in der Mitte das Bild: Aus dem Hirten auf der Weide wird der Gastgeber, der einen Tisch deckt – „im Angesicht meiner Feinde“. Das Salben des Kopfes mit Öl und der überfließende Becher gehören zur Gastfreundschaft; wer in einem Zelt aufgenommen wurde, stand unter dem Schutz des Gastgebers. Das „finstere Tal“ meint wörtlich einen Ort tiefer Dunkelheit; die Übersetzung „Tal der Todesschatten“ ist möglich, aber deutend.\n\nDer Psalm wechselt auch die Anrede, und zwar an der dunkelsten Stelle. Bis Vers 3 wird über Gott geredet – „er weidet mich“, „er führet mich“; ab Vers 4, im finsteren Tal, wird er angesprochen: „du bist bei mir“. Genau dort, wo es finster wird, wird aus dem Reden über Gott ein Reden mit ihm. Und die Feinde verschwinden nicht: Der Tisch wird vor ihren Augen gedeckt. Der Psalm verspricht keine feindfreie Welt, sondern einen gedeckten Tisch mitten darin.',
    reception:
      'Dieser Psalm ist der Text, der in Deutschland am häufigsten am Grab gesprochen wird – und er ist zugleich der, den auch Menschen ohne Kirchenbindung noch auswendig können. Vertont wurde er hundertfach, von Schütz und Bach bis zu Popsongs; das schottische Gesangbuchlied „The Lord’s my Shepherd“ und Bourgeois’ „Der Herr ist mein getreuer Hirt“ gehören zum Kernbestand des evangelischen Singens.\n\nSeine Bildsprache stammt aus dem Alten Orient, wo „Hirte“ ein Königstitel war – in Ägypten wie in Mesopotamien. Dass dieser Titel hier nicht dem König Israels, sondern Gott gilt, ist eine leise politische Aussage.',
    terms: [
      {
        word: 'hebr. zalmawet',
        rendered: 'finstern Tal',
        note: 'Wörtlich etwa „Todesschatten“ – ein Wort für tiefste Dunkelheit. Luther übersetzte hier zurückhaltend; andere Übersetzungen sagen „Tal des Todesschattens“ oder „finsterste Schlucht“.',
      },
      {
        word: 'hebr. nefesch',
        rendered: 'Seele',
        note: 'Nicht die unsterbliche Seele der griechischen Philosophie, sondern die Kehle, der Atem, das Leben selbst. „Er erquicket meine Seele“ heißt: Er bringt mich wieder zu Atem.',
      },
    ],
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
      {
        tradition: 'Kritische Rückfrage',
        text: 'Wer den Psalm am Sterbebett hört, hört ihn anders als jemand, dem gerade Unrecht geschieht. Ausleger warnen deshalb davor, ihn zum Beruhigungsmittel zu machen: Er wurde von Menschen gebetet, die sehr genau wussten, dass Stecken und Stab auch schlagen können.',
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
      'Der Aufbau ist streng: vier Strophen zu je sechs Versen über Wissen, Gegenwart, Werden und schließlich die Bitte um Prüfung. Die Bildwelt greift die damals bekannten Grenzen der Welt auf – Himmel, Totenreich, der Osten des Sonnenaufgangs, das Meer im Westen. „Im Verborgenen gebildet, gewirkt unten in der Erde“ ist eine ungewöhnliche Wendung: Der Mutterleib wird mit dem Erdinneren verglichen, dem Ort, aus dem nach 1. Mose 2 der Mensch geformt wurde. Der Schluss dreht die Richtung um: Nachdem der Beter zwanzig Verse lang beschrieben hat, wie durchschaut er ist, bittet er ausdrücklich darum, geprüft zu werden.\n\nSelten mitgelesen werden die Verse 19 bis 22. Dort bittet der Beter Gott, die „Blutgierigen“ zu töten, und erklärt, er hasse sie „mit rechtem Ernst“. Viele Ausgaben lassen sie in Gottesdiensten weg, und wer nur die berühmten Verse kennt, hält den Psalm für eine Meditation. Mit den Hassversen gelesen wird er zu etwas anderem: zur Verteidigungsrede eines Angeklagten, der sich auf Gottes Allwissen beruft, weil es ihn entlastet. Die Bitte am Schluss – „erforsche mich“ – ist dann kein frommer Nachsatz, sondern der Antrag, den der ganze Psalm stellt.',
    reception:
      'Die Verse 13 bis 16 gehören zu den meistzitierten Stellen in der Debatte um Schwangerschaftsabbruch, in Deutschland wie in den USA. Ausleger weisen darauf hin, dass der Psalm keine Aussage über den Status des Embryos treffen will, sondern über Gottes Zuwendung zu diesem einen Beter; wer ihn zum Argument macht, macht aus einem Gebet einen Rechtssatz. Dass er in dieser Rolle wirkt, lässt sich davon unabhängig nicht bestreiten.\n\nEine andere Wirkung ist stiller: In der Seelsorge bei Menschen mit Behinderung und in der Trauerbegleitung nach Fehlgeburten ist gerade Vers 16 – „alle Tage waren auf dein Buch geschrieben“ – zu einem der meistgesprochenen Sätze geworden.',
    terms: [
      {
        word: 'hebr. kiljotai',
        rendered: 'Nieren',
        note: 'Im hebräischen Menschenbild sitzt im Innern der Organe das Innerste der Person – Nieren und Herz stehen für das, was niemand sieht. Gemeint ist nicht Anatomie, sondern das verborgene Selbst.',
      },
      {
        word: 'hebr. golem',
        rendered: 'unbereitet',
        note: 'Das einzige Vorkommen des Wortes in der Bibel: das noch Ungeformte, der Rohling. Aus ihm wurde in der jüdischen Überlieferung später der Golem, die vom Menschen geformte Gestalt ohne Sprache.',
      },
    ],
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
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Die Verse über das Gewordensein werden Menschen zugesprochen, die an ihrem Dasein zweifeln. Ihre Kraft liegt darin, dass sie nicht bewerten, sondern feststellen.',
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
      'Das hebräische Wort für „Herz“ meint nicht das Gefühl, sondern den Ort des Nachdenkens und Entscheidens – näher an „Verstand“ als an „Empfindung“. Wörtlich steht da: „Stütze dich nicht auf deine eigene Einsicht.“ Gemeint ist also nicht der Verzicht aufs Denken, sondern auf dessen Verabsolutierung. Auffällig ist die Fortsetzung wenige Verse später: Wer weise ist, soll sich nicht für weise halten. Die Sprüche misstrauen der Selbstsicherheit durchgehend – nicht der Klugheit.\n\nDie beiden Verse stehen in einer Lehrrede, die ein Vater an seinen Sohn richtet; der Rahmen ist Ausbildung, nicht Mystik. Und die Weisheitsliteratur ist international: Große Teile von Sprüche 22 bis 24 haben eine erkennbare Vorlage in der ägyptischen Lehre des Amenemope, und die Bücher Israels verhandeln dieselben Fragen wie die Schulen von Ägypten und Mesopotamien. Was in Kapitel 3 folgt, ist entsprechend handfest: Gib den Zehnten, schlage niemandem eine Wohltat ab, streite nicht ohne Grund. Von Weltflucht ist an keiner Stelle die Rede.',
    reception:
      'Der Vers gehört zu den meistverschenkten Konfirmations- und Taufsprüchen im deutschen Sprachraum und steht auf unzähligen Postkarten. In der Ratgeberliteratur wird er gern als Gegensatz zu Planung und Fachwissen gelesen – ein Gebrauch, der in evangelikalen Kreisen bis zur Ablehnung ärztlicher Behandlung führen kann. Ausleger halten dagegen, dass in demselben Buch der Rat der Vielen empfohlen und Faulheit gerügt wird.',
    terms: [
      {
        word: 'hebr. batach',
        rendered: 'verlaß dich',
        note: 'Sein Gewicht auf etwas legen, sich anlehnen. Das Wort beschreibt keine Gefühlslage, sondern worauf jemand sein Leben stützt.',
      },
      {
        word: 'hebr. jaschar',
        rendered: 'recht führen',
        note: 'Wörtlich: gerade machen, ebnen. Das Bild ist nicht „er sagt dir, wo es langgeht“, sondern „er räumt den Weg frei“ – von Hindernissen, nicht von Entscheidungen.',
      },
    ],
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
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die rabbinische Tradition liest den Vers zusammen mit dem Studium: Vertrauen und Lernen sind keine Gegensätze. Wer Tora lernt, verlässt sich gerade nicht auf seinen eigenen Einfall, sondern stellt ihn in ein Gespräch, das seit Generationen läuft.',
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
      'Wer der „Knecht“ ist, sagt der Text nicht ausdrücklich. Im Buch selbst wird die Bezeichnung an anderen Stellen ausdrücklich auf Israel bezogen. Zugleich erscheint der Knecht hier als Einzelner, der für „viele“ eintritt. Die Frage nach seiner Identität ist eine der meistdiskutierten der Bibelauslegung überhaupt.\n\nDer Text ist kunstvoll gebaut: fünf Strophen zu je drei Versen, mit dem Zentrum in Vers 5. Auffällig ist der Wechsel der Sprecher – gerahmt von Gottesreden am Anfang und Ende redet in der Mitte ein „Wir“, das seinen eigenen Irrtum eingesteht: „Wir aber hielten ihn für den, der von Gott geschlagen wäre.“ Erzählt wird damit nicht nur ein Leiden, sondern eine Umkehr im Urteil über dieses Leiden. Wer so spricht, spricht im Rückblick – und gibt zu, sich getäuscht zu haben.',
    reception:
      'Kein Kapitel des Alten Testaments ist im christlich-jüdischen Verhältnis so belastet. Seit der Alten Kirche wurde es als Beweis gelesen, dass Jesus der Messias sei, und in den mittelalterlichen Zwangsdisputationen mussten jüdische Gelehrte sich dazu verhören lassen – in Paris 1240, in Barcelona 1263, in Tortosa 1413. Wer die christliche Deutung nicht teilte, galt als verstockt.\n\nHeute betonen kirchliche Erklärungen, dass die christliche Lesart eine nachträgliche Aneignung ist und die jüdische Auslegung – die den Knecht auf Israel bezieht – dem Text mindestens ebenso nahesteht. In der Musik ist das Kapitel durch Händels *Messiah* präsent geblieben: „He was despised“ und „Surely he hath borne our griefs“ stammen aus diesen Versen.',
    terms: [
      {
        word: 'hebr. ebed',
        note: 'Knecht, Diener – aber auch ein Ehrentitel: Mose, David und die Propheten heißen so. In den vier „Gottesknechtsliedern“ Jesajas bleibt bewusst offen, wer gemeint ist.',
      },
      {
        word: 'hebr. ascham',
        note: 'Der Fachbegriff für das Schuldopfer aus dem Opferrecht. Dass er in Vers 10 auf einen Menschen angewandt wird, ist im Alten Testament einmalig – und die Grundlage aller späteren Deutungen auf ein stellvertretendes Leiden.',
      },
    ],
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
      {
        tradition: 'Ostkirchliche Auslegung',
        text: 'Die orthodoxe Theologie liest das Lied weniger als Rechtsvorgang – Strafe wird übernommen – denn als Mitleiden: Gott geht in das menschliche Elend hinein und heilt es von innen. Der Vers „durch seine Wunden sind wir geheilt“ steht dann für Heilung, nicht für Bezahlung.',
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
      'Der Brief widerspricht Propheten, die eine schnelle Rückkehr versprachen. Stattdessen lautet die Anweisung: Häuser bauen, Gärten anlegen, heiraten – und für die Stadt beten, in der man gefangen ist. Der Trost ist also gerade kein Versprechen, dass sich die Lage bald bessert, sondern dass Gott auch die lange Fremde nicht als Endpunkt versteht.\n\nDer Brief hat einen Gegenspieler. Ein Kapitel vorher tritt der Prophet Hananja auf und kündigt an, das Joch Babels werde binnen zwei Jahren zerbrochen – Jeremia widerspricht ihm öffentlich und nennt siebzig Jahre. Der Trostvers steht also mitten in einem Streit darüber, wie lange es dauert, und er gehört der unbequemeren Seite. Der Brief nennt sogar seine Überbringer mit Namen und ihre diplomatische Mission; er ist als Dokument gezeichnet, nicht als Spruch. Und er endet nicht mit Vers 11: Es folgen scharfe Worte über Propheten, die den Menschen sagen, was sie hören wollen.',
    reception:
      'Der Vers ist heute wohl der meistverschenkte Bibelvers auf Karten, Tassen und Abschlussfeiern, im englischen Sprachraum noch stärker als im deutschen. In der Wohlstandsverkündigung wird er zur Zusage persönlichen Erfolgs, was den Brief auf den Kopf stellt: Gesagt ist er Menschen, deren Stadt zerstört und deren Land verloren war.\n\nDaneben hat er eine ganz andere Wirkung entfaltet: Die Aufforderung, das Wohl der fremden Stadt zu suchen, gilt als eine der frühesten Grundlagen für ein Leben in der Diaspora – und wird in Debatten über Migration und Integration bis heute zitiert.',
    terms: [
      {
        word: 'hebr. schalom',
        rendered: 'Friedens',
        note: 'Weit mehr als Abwesenheit von Krieg: Unversehrtheit, Auskommen, tragfähige Verhältnisse. Dasselbe Wort steht in Vers 7 für das, was die Verbannten der fremden Stadt suchen sollen – ihr eigenes Wohl hängt an deren Wohl.',
      },
      {
        word: 'hebr. acharit',
        rendered: 'Ende',
        note: 'Das Spätere, der Ausgang einer Sache. Gemeint ist nicht das Weltende, sondern wie es einmal ausgehen wird – Zukunft im Sinn von: es geht weiter.',
      },
    ],
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
      {
        tradition: 'Jüdische Auslegung',
        text: 'Im Judentum ist der Brief zum Grundtext des Lebens in der Fremde geworden: Man betet für das Wohl des Landes, in dem man wohnt, auch wenn man nicht dorthin gehört. Der Talmud leitet daraus die Pflicht ab, für die Regierung zu beten – nicht aus Zustimmung, sondern weil das eigene Leben an ihrer Ordnung hängt.',
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
      'Die Steigerung davor ist bewusst absurd: erst Kälber, dann tausend Widder, dann zehntausend Bäche Öl – und schließlich der eigene erstgeborene Sohn. Damit ist genau die Praxis benannt, die in der Umwelt Israels vorkam und die die Propheten scharf ablehnten. Die Antwort verlangt dagegen nichts, was man abliefern könnte. Die drei Forderungen sind unterschiedlich gebaut: Recht wird „getan“, Güte wird „geliebt“, und mit Gott geht man „demütig“ – Handlung, Haltung und Beziehung.\n\nDer ganze Abschnitt ist als Gerichtsverhandlung angelegt. In Vers 1 werden die Berge und die Grundfesten der Erde als Geschworene aufgerufen, dann trägt Gott seine Klage vor – und die Klage besteht aus Wohltaten: Auszug, Mose, Bileam, der Weg von Sittim nach Gilgal. Erst danach kommt die Rückfrage des Angeklagten, womit er denn kommen solle. Vers 8 ist die Antwort des Gerichts, und sie fällt aus dem Rahmen jedes Prozesses: Es wird nichts gefordert, was sich abliefern ließe.',
    reception:
      'Der Vers gilt vielen als Kurzfassung prophetischer Ethik und steht in den Grundlagentexten kirchlicher Entwicklungsarbeit ebenso wie in Reden der amerikanischen Bürgerrechtsbewegung. Im Judentum zählt er zu den Sätzen, in denen die 613 Gebote der Tora zusammengefasst werden – der Talmud nennt Micha als den, der sie auf drei brachte.',
    terms: [
      {
        word: 'hebr. mischpat',
        note: 'Recht im Sinn von: dem anderen zukommen lassen, was ihm zusteht. Luther übersetzt hier „Gottes Wort halten“; neuere Übersetzungen sagen „Recht tun“, was dem Hebräischen näher kommt.',
      },
      {
        word: 'hebr. chesed',
        rendered: 'Liebe',
        note: 'Eines der schwersten Wörter des Alten Testaments: Güte, Treue, Solidarität – die Zuwendung, zu der man nicht verpflichtet ist und die man trotzdem hält. Keine deutsche Entsprechung deckt es ganz ab.',
      },
      {
        word: 'hebr. haznea',
        rendered: 'demütig sein',
        note: 'Ein seltenes Wort, das eher „aufmerksam, besonnen mitgehen“ meint als Selbsterniedrigung. Der Ton ist nicht Unterwerfung, sondern Umsicht.',
      },
    ],
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
      {
        tradition: 'Rabbinische Tradition',
        text: 'Der Talmud erzählt, alle 613 Gebote seien nach und nach zusammengefasst worden – bei Micha auf drei. Der Vers gilt als kürzeste Fassung dessen, worum es geht.',
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
      'Matthäus formuliert „arm im Geist“, Lukas in seiner Parallelfassung schlicht „ihr Armen“. Die Forschung sieht darin zwei Akzente derselben Überlieferung: die wirtschaftliche Notlage und die innere Haltung dessen, der nichts vorzuweisen hat. Der Aufbau erinnert an die Sinai-Szene: Wie Mose auf den Berg stieg, lehrt Jesus hier auf einem Berg – Matthäus zeichnet ihn bewusst in diese Linie.\n\nDer Aufbau ist gerechnet: acht Seligpreisungen in der dritten Person, eingerahmt von derselben Begründung – „denn ihr ist das Himmelreich“ steht bei der ersten und bei der achten. Die neunte, längere spricht die Hörer dann unmittelbar an und wechselt zu „ihr“. Die ersten vier gelten Menschen in Not, die zweiten vier Menschen, die etwas tun; in der Mitte steht der Hunger nach Gerechtigkeit, der beides verbindet. Und alle Zusagen stehen im Futur, bis auf die erste und die letzte – die stehen in der Gegenwart.',
    reception:
      'Die Bergpredigt ist der Text, an dem sich seit Tertullian entscheidet, wie Christen zu Gewalt, Eid und Besitz stehen. Franz von Assisi, die Täufer, die Quäker, Tolstoi, Gandhi, Martin Luther King, Dietrich Bonhoeffer – die Linie derer, die sie wörtlich nehmen wollten, zieht sich durch die ganze Geschichte und stand meist quer zu den Kirchen ihrer Zeit.\n\nDie Gegenbewegung ist ebenso alt: die Deutung als unerfüllbare Forderung, die den Menschen zur Einsicht in seine Ohnmacht treibt; die Zweiteilung in Gebote für alle und Räte für Mönche; die Beschränkung auf das persönliche Verhalten, die dem Staat sein Schwert lässt. Keine dieser Lesarten ist ohne Folgen geblieben.',
    terms: [
      {
        word: 'griech. makarios',
        rendered: 'Selig',
        note: 'Kein frommes Wort, sondern die übliche Anrede an Beneidenswerte: „Glücklich zu preisen ist, wer …“ Die Wendung ist aus Weisheitstexten und Grabinschriften bekannt. Was daran anstößig ist, sind nicht die Worte, sondern wer damit gemeint wird.',
      },
      {
        word: 'griech. ptochos',
        rendered: 'arm',
        note: 'Nicht der einfache Mann, sondern der Bettler – wer nichts hat und darauf angewiesen ist, dass ihm gegeben wird. Der Zusatz „im Geist“ überträgt dieses völlige Angewiesensein auf das Verhältnis zu Gott.',
      },
      {
        word: 'griech. praeis',
        rendered: 'Sanftmütigen',
        note: 'Beschreibt kein weiches Gemüt, sondern verzichtete Gewalt: Wer Macht hätte, sie aber nicht einsetzt. Dasselbe Wort gebraucht Matthäus für den König, der auf einem Esel einzieht.',
      },
    ],
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
      {
        tradition: 'Jüdische Einordnung',
        text: 'Seligpreisungen sind eine bekannte jüdische Gattung; sie finden sich in den Psalmen und in Texten aus Qumran. Neuere Forschung liest die Bergpredigt deshalb nicht als Absetzung vom Judentum, sondern als Beitrag innerhalb einer laufenden Debatte darüber, wie die Tora zu halten sei.',
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
      'Lukas überliefert eine kürzere Fassung, was für hohe Alterswertigkeit spricht. Die Bitte um das „tägliche Brot“ enthält ein griechisches Wort (epiousios), das sonst kaum belegt ist; es kann „für den kommenden Tag“ oder „zum Leben notwendig“ bedeuten. Der abschließende Lobpreis („Denn dein ist das Reich…“) fehlt in den ältesten Handschriften und wurde früh aus dem gottesdienstlichen Gebrauch ergänzt.\n\nDas Gebet fällt durch das auf, was es nicht enthält: keinen Dank, kein Lob der eigenen Frömmigkeit, keine Bitte für sich allein – jede Zeile steht im Plural, auch wenn einer allein betet. Und es hat eine Reihenfolge: erst drei Bitten um das, was Gott angeht, dann drei um das, was die Betenden angeht. Nur an einer Stelle bringen die Betenden etwas ein, und es ist die unbequemste: „wie wir unseren Schuldigern vergeben“. Matthäus greift genau diese Zeile im Vers danach noch einmal auf und lässt sonst alles unkommentiert.',
    reception:
      'Das Vaterunser ist der einzige Text, den fast alle Konfessionen gemeinsam sprechen – und die Stelle, an der die Unterschiede trotzdem hörbar werden: am Schlusssatz, an „Schuld“ gegen „Schulden“, an der Bitte um Bewahrung vor Versuchung. Ökumenische Gottesdienste einigen sich meist auf die Fassung von 1971.\n\nDie fünfte Bitte hat eine praktische Wirkungsgeschichte: Sie band das Vergebenwollen an das Vergebenbekommen und wurde in der Bußpraxis der Alten Kirche wie in heutiger Versöhnungsarbeit zur Nagelprobe. Dass sie im Gottesdienst wöchentlich gesprochen wird, hat schon Augustinus als tägliche Reinigung gedeutet.',
    terms: [
      {
        word: 'aram. abba',
        rendered: 'Vater',
        note: 'Die Anrede, die Jesus nach Markus 14,36 gebraucht und die Paulus zweimal unübersetzt stehen lässt. Lange galt sie als Kindersprache – „Papa“; die neuere Forschung hält das für überzogen: Auch erwachsene Söhne redeten so.',
      },
      {
        word: 'griech. epiousios',
        rendered: 'täglich',
        note: 'Ein Wort, das außerhalb des Vaterunsers so gut wie nicht belegt ist. Es kann „für den heutigen Tag“, „für morgen“ oder „zum Dasein nötig“ heißen. Hieronymus übersetzte es an einer Stelle mit „überwesentlich“ – daraus wurde eine Deutung auf das Abendmahlsbrot.',
      },
      {
        word: 'griech. peirasmos',
        rendered: 'Versuchung',
        note: 'Erprobung, Prüfung – auch die große Prüfung am Ende der Zeit. Der Streit, ob Gott überhaupt in Versuchung führen kann, hängt an diesem Wort; Papst Franziskus ließ die italienische Fassung 2018 deshalb ändern.',
      },
    ],
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
      {
        tradition: 'Jüdische Einordnung',
        text: 'Fast jede Bitte hat eine Entsprechung im jüdischen Gebet: die Heiligung des Namens und das Kommen des Reiches im Kaddisch, die Bitte um Brot und Vergebung im Achtzehnbittengebet. Das Vaterunser ist danach kein neues Gebet, sondern eine knappe, zugespitzte Zusammenfassung dessen, was Juden damals beteten.',
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
      'Priester und Levit hätten sich durch die Berührung eines möglicherweise Toten kultisch verunreinigt und ihren Dienst nicht antreten können – ihr Verhalten ist im Rahmen der Reinheitsvorschriften nachvollziehbar. Genau dadurch wird die Frage geschärft. Die Pointe liegt in der Umkehrung der Ausgangsfrage: Der Gesetzeslehrer fragt „Wer ist mein Nächster?“ (wen muss ich einbeziehen?), Jesus fragt zurück, wer sich als Nächster erwiesen hat. Zwei Denare entsprachen etwa zwei Tageslöhnen.\n\nDie Route ist genau gewählt. Die Straße von Jerusalem hinab nach Jericho fällt auf 27 Kilometern um rund tausend Höhenmeter durch unübersichtliches Gelände und war für Überfälle berüchtigt. Ebenso genau gewählt ist die Person: Samaritaner galten als Abtrünnige, die Feindschaft war gegenseitig, und Lukas erzählt zwei Kapitel vorher, wie ein samaritanisches Dorf Jesus die Aufnahme verweigert. Am Ende kann der Gesetzeslehrer das Wort nicht einmal aussprechen – auf die Frage, wer der Nächste war, antwortet er: „der die Barmherzigkeit an ihm tat“.',
    reception:
      'Aus dem Gleichnis ist ein Rechtsbegriff geworden: Die „Samariter-Gesetze“ vieler Länder regeln, wer zur Hilfe verpflichtet ist und wer dabei vor Haftung geschützt wird. Krankenhäuser, Hilfsdienste und die Telefonseelsorge in mehreren Ländern tragen den Namen.\n\nWeniger bekannt ist die Kehrseite: Dass ausgerechnet ein Samariter der Vorbildliche ist, war für die ersten Hörer eine Provokation – Samaritaner galten als Abtrünnige, und die Feindschaft war gegenseitig. In der christlichen Predigt wurde daraus über Jahrhunderte oft das Gegenteil: eine Erzählung über versagende jüdische Amtsträger. Diese Zuspitzung hat antijüdische Klischees gestützt und wird in neueren Auslegungen ausdrücklich zurückgewiesen.',
    terms: [
      {
        word: 'griech. plesion',
        rendered: 'Nächster',
        note: 'Wörtlich „der Nahe“. Der Gesetzeslehrer fragt nach dem Umfang dieser Gruppe; die Erzählung antwortet nicht mit einer Grenze, sondern mit einer Bewegung – man wird zum Nächsten.',
      },
      {
        word: 'griech. esplanchnisthe',
        rendered: 'jammerte ihn sein',
        note: 'Von *splanchna*, den Eingeweiden: Es traf ihn körperlich. Lukas gebraucht dasselbe Wort für den Vater des verlorenen Sohnes – und sonst fast nur für Jesus selbst.',
      },
    ],
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
      {
        tradition: 'Ostkirchliche Auslegung',
        text: 'In der orthodoxen Tradition wird die Geschichte oft auf Christus gelesen: Er ist der Fremde, der zu den Verwundeten kommt und sie in die Herberge – die Kirche – bringt. Diese Deutung nimmt der Erzählung nichts von ihrer ethischen Spitze, stellt sie aber in einen zweiten Rahmen.',
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
      'Dass ein älterer Mann läuft und dabei sein Gewand rafft, galt als würdelos – der Vater nimmt diese Blamage öffentlich auf sich. Ring, Gewand und Schuhe sind Zeichen der Wiedereinsetzung als Sohn, nicht als Knecht. Die Erzählung endet bewusst offen: Ob der ältere Bruder hineingeht, bleibt unbeantwortet. Sie steht als dritte von drei Gleichnissen über Verlorenes, erzählt als Antwort auf den Vorwurf, Jesus esse mit Zöllnern und Sündern.\n\nDie Forderung des jüngeren Sohnes ist schärfer, als sie klingt: Das Erbe zu Lebzeiten zu verlangen kam einem Todeswunsch nahe, und es zu verkaufen entzog der Familie Land, das Generationen ernähren sollte. In der Fremde landet er dann bei den Schweinen – für jüdische Ohren die letzte Stufe. Wie ernst seine Umkehr gemeint ist, lässt die Erzählung offen: „Er kam zu sich“ heißt wörtlich nur, dass er zur Besinnung kommt, und seine Rede hat er sich vorher zurechtgelegt. Der Vater lässt ihn den einstudierten Satz nicht einmal zu Ende sprechen.',
    reception:
      'Rembrandts Gemälde in der Eremitage hat die Rezeption geprägt wie kaum ein Bild sonst; Henri Nouwens Buch darüber ist zu einem der meistgelesenen geistlichen Titel des 20. Jahrhunderts geworden. In der Beichtpraxis der katholischen Kirche ist das Gleichnis der zentrale Bezugstext.\n\nAuslegungsgeschichtlich problematisch ist die Rolle des älteren Bruders: Er wurde über Jahrhunderte mit dem Judentum gleichgesetzt, der jüngere mit den Heidenchristen – eine Deutung, die den Text gegen die Absicht seiner Pointe wendet, denn der Vater bekräftigt gegenüber dem Älteren ausdrücklich dessen bleibendes Recht.',
    terms: [
      {
        word: 'griech. ousia',
        rendered: 'Gut',
        note: 'Vermögen, Habe – wörtlich das „Wesen“. Der Sohn verlangt sein Erbe zu Lebzeiten des Vaters, was in der antiken Welt einem Todeswunsch nahekam.',
      },
      {
        word: 'griech. eis heauton de elthon',
        rendered: 'schlug er in sich',
        note: 'Wörtlich „er kam zu sich“. Ob das schon Reue heißt oder nur nüchterne Berechnung – er hat ja Hunger –, ist absichtlich offen gehalten; der Vater fragt auch nicht danach.',
      },
    ],
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
      {
        tradition: 'Sozialgeschichtliche Lesart',
        text: 'Das Erbe zu Lebzeiten zu fordern und in der Fremde zu verbrauchen bedeutete für die Familie einen realen Verlust an Land und Ansehen. Dass der Vater dem Zurückkehrenden entgegenläuft, war für einen Hausherrn ein Bruch mit der Würde seines Standes – die Geschichte erzählt nicht nur von Vergebung, sondern von einem, der sich für sie öffentlich blamiert.',
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
      'In der jüdischen Tradition war die Weisheit bei Gott, als er die Welt schuf (Sprüche 8). In der stoischen Philosophie bezeichnete der Logos die vernünftige Ordnung des Kosmos. Johannes verbindet beides und sagt dann etwas, das für beide Traditionen unerhört war: Dieser Logos wurde Fleisch. Das griechische Wort für „wohnte unter uns“ meint wörtlich „zeltete“ und erinnert an das Zelt der Begegnung in der Wüste.\n\nDer Prolog ist wahrscheinlich ein älteres Lied, das der Evangelist übernommen und durch Prosaabschnitte über Johannes den Täufer unterbrochen hat – Vers 6 bis 8 und Vers 15 fallen aus dem Rhythmus. Der Bogen führt von der Ewigkeit über die Schöpfung und die Ablehnung bis zu dem Satz, auf den alles zuläuft: „Das Wort ward Fleisch.“ Für griechisch gebildete Ohren war genau das die Zumutung. Dass es ein göttliches Vernunftprinzip gibt, war Allgemeinbildung; dass dieses Prinzip ein Mensch aus Nazareth mit Schweiß, Durst und Todesangst sein soll, war es nicht.',
    reception:
      'Der Prolog war der Schlüsseltext der christologischen Konzilien: In Nizäa 325 und Chalcedon 451 wurde mit seinen Sätzen gerungen, und die Formeln über die Gottheit Christi sind ohne ihn nicht zu verstehen. Bis zur Liturgiereform wurde er in der katholischen Messe am Ende jedes Gottesdienstes gelesen, das „Letzte Evangelium“.\n\nAn Vers 1 hängt bis heute ein Übersetzungsstreit: Weil im Griechischen vor dem zweiten „Gott“ der Artikel fehlt, übersetzen die Zeugen Jehovas „ein Gott“. Die große Mehrheit der Gräzisten hält das für unhaltbar – das Fehlen des Artikels markiert hier das Prädikat, nicht eine Abstufung.',
    terms: [
      {
        word: 'griech. logos',
        rendered: 'Wort',
        note: 'Wort, Rede, Sinn, Vernunft, Ordnung – alles zugleich. Die Stoa nannte so das Prinzip, das die Welt zusammenhält; die jüdische Weisheitsliteratur sprach ähnlich von der Weisheit, die vor der Schöpfung war. Der Prolog nimmt beide Linien auf.',
      },
      {
        word: 'griech. eskenosen',
        rendered: 'wohnte unter uns',
        note: 'Wörtlich „zeltete“. Das Wort ruft die Wüstenzeit auf, in der Gott im Zelt mitzog – nichts Festes, nichts Gemauertes.',
      },
      {
        word: 'griech. katelaben',
        rendered: 'begriffen',
        note: 'Kann „erfassen, verstehen“ heißen und „ergreifen, überwältigen“. Luthers Übersetzung wählt das Verstehen; ebenso richtig wäre: Die Finsternis hat es nicht überwältigt. Die Doppeldeutigkeit ist im Griechischen wohl beabsichtigt.',
      },
    ],
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
      {
        tradition: 'Jüdische Einordnung',
        text: 'Die jüdische Tradition kennt das Motiv eines Wortes, das bei Gott ist, aus den Targumen, wo das aramäische *Memra* als Umschreibung für Gottes Wirken steht, und aus der Weisheitsliteratur. Neuere Forschung liest den Prolog deshalb weniger als Anleihe bei griechischer Philosophie denn als Zuspitzung innerjüdischer Sprache.',
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
      'Ob der Vers noch Jesu Rede ist oder bereits Kommentar des Evangelisten, ist offen – die antiken Handschriften kennen keine Anführungszeichen. „Welt“ (kosmos) meint bei Johannes sonst meist die von Gott abgewandte Menschheit; gerade ihr gilt hier die Liebe. Unmittelbar davor steht der Verweis auf die eherne Schlange in der Wüste (4. Mose 21): Ein Zeichen des Todes wird zum Zeichen der Rettung.\n\nAm Anfang des Verses hängt eine Übersetzungsfrage, die den Ton verändert. Luthers „Also hat Gott die Welt geliebt“ gibt das griechische *houtos* mit „auf diese Weise“ wieder – der Satz beschreibt dann, wie Gott liebt, nicht wie sehr. Die vertraute Steigerungslesart „so sehr“ ist erst in späteren Übersetzungen gewachsen und macht aus einer Beschreibung ein Ausrufezeichen. Auch das Verb ist bemerkenswert: Es steht in der Vergangenheit und meint einen einmaligen Vorgang, nicht eine Haltung – der Satz zeigt auf ein Ereignis.',
    reception:
      'Kein Vers ist häufiger auf Plakaten in Stadien, auf Aufklebern und in Werbespots erschienen; „John 3:16“ genügt in den USA als Erkennungszeichen. Diese Verselbständigung ist selbst ein Thema geworden: Der Vers wird meist ohne Vers 17 zitiert, der ausdrücklich sagt, dass der Sohn nicht zum Richten gesandt ist.\n\nDie Rede vom Vater, der den Sohn „gibt“, ist zudem theologisch scharf befragt worden. Feministische und befreiungstheologische Ausleger haben darauf hingewiesen, dass eine Deutung, in der ein Vater seinen Sohn opfert, in der Seelsorge an Gewaltbetroffenen Schaden anrichten kann – und dass der Text selbst das Geben nicht als Tötung, sondern als Hingabe beschreibt.',
    terms: [
      {
        word: 'griech. kosmos',
        rendered: 'Welt',
        note: 'Bei Johannes fast immer die Welt, sofern sie sich Gott verweigert. Dass gerade sie geliebt wird, ist die Spitze des Satzes.',
      },
      {
        word: 'griech. monogenes',
        rendered: 'eingeborenen',
        note: 'Einziggeboren, einzig in seiner Art. Luthers „eingeboren“ ist heute missverständlich; gemeint ist nicht ein Zeugungsvorgang, sondern Unvertretbarkeit.',
      },
      {
        word: 'griech. aionios',
        rendered: 'ewige',
        note: 'Weniger „unendlich lang“ als „zum kommenden Äon gehörig“. Ewiges Leben ist bei Johannes keine Verlängerung, sondern eine Qualität, die schon jetzt beginnt.',
      },
    ],
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
      {
        tradition: 'Ostkirchliche Auslegung',
        text: 'Die orthodoxe Theologie liest den Vers von der Menschwerdung her, nicht vom Kreuz: Gott gibt den Sohn in die Welt hinein, damit menschliches Leben an göttlichem teilhat. Das Ziel ist weniger die Tilgung einer Schuld als die Heilung der Sterblichkeit.',
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
    title: '„Ich bin der Weg und die Wahrheit und das Leben“',
    historicalShort:
      'Der Satz fällt in den Abschiedsreden, unmittelbar nach der Ankündigung des Weggehens. Er ist zunächst Trostwort an verunsicherte Jünger, nicht eine Aussage über andere Religionen.',
    historicalLong:
      'Ausgelöst wird er durch eine praktische Frage des Thomas: „Wie können wir den Weg wissen?“ Die Antwort verschiebt die Ebene – gefragt war nach einer Route, geantwortet wird mit einer Person. Das johanneische Evangelium entstand in einer Gemeinde, die sich gerade schmerzhaft von der Synagoge trennte; viele seiner scharfen Abgrenzungen sind aus dieser Lage heraus formuliert. Wer sie heute liest, muss diesen Entstehungszusammenhang mitbedenken, gerade weil solche Sätze historisch zur Abwertung anderer benutzt wurden.\n\nDer Satz gehört zu einer Reihe: Siebenmal sagt Jesus im Johannesevangelium „Ich bin“ mit einem Bild dahinter – Brot, Licht, Tür, Hirte, Auferstehung, Weg, Weinstock. Alle sieben stehen in Zusammenhängen, in denen jemand nicht weiterweiß. Hier ist der Zusammenhang Abschied: Es ist der letzte Abend, die Jünger begreifen nicht, wovon die Rede ist, und unmittelbar danach fragt Philippus, ob Jesus ihnen nicht einfach den Vater zeigen könne. Die Antwort ist an Verzweifelte gerichtet, nicht an Andersgläubige.',
    reception:
      'Der Vers ist der meistzitierte Beleg für den Absolutheitsanspruch des Christentums – und stand deshalb im Zentrum aller Streitigkeiten um Mission und Religionsdialog. Das Zweite Vatikanische Konzil formulierte 1965 in *Nostra aetate*, dass die Kirche nicht ablehnt, „was in diesen Religionen wahr und heilig ist“; die evangelischen Kirchen ringen in ihren Dialogpapieren seit den 1970er Jahren um dieselbe Frage.\n\nBesonders belastet ist der Gebrauch gegenüber dem Judentum. Kirchliche Erklärungen nach 1945 – von der Rheinischen Synode 1980 bis zu römischen Dokumenten – halten fest, dass Gottes Bund mit Israel nicht gekündigt ist, und lehnen eine Judenmission ab. Wie das mit diesem Vers zusammengeht, ist theologisch nicht abschließend geklärt und wird offen ausgetragen.',
    terms: [
      {
        word: 'griech. hodos',
        rendered: 'Weg',
        note: 'Die frühe Gemeinde hieß in der Apostelgeschichte einfach „der Weg“, bevor der Name „Christen“ aufkam. Das Wort meint keine Lehre, sondern eine Lebensrichtung.',
      },
      {
        word: 'griech. aletheia',
        rendered: 'Wahrheit',
        note: 'Bei Johannes nicht die Richtigkeit eines Satzes, sondern das, was sich als tragfähig erweist – näher am hebräischen *emet*, der Verlässlichkeit, als am griechischen Begriff der Erkenntnis.',
      },
    ],
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
      {
        tradition: 'Exegetische Beobachtung',
        text: 'Der Satz ist an Jünger gerichtet, die bleiben sollen, nicht an Außenstehende, über die geurteilt wird. Manche Ausleger schließen daraus, dass er die Zugehörigkeit der Gemeinde bestimmt und nicht die Grenzen des Heils – andere halten dagegen, dass „niemand kommt zum Vater denn durch mich“ eine Aussage über alle sei.',
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
      'Die Völkerliste in Apostelgeschichte 2 bildet die bekannte Welt ab. Lukas zeichnet damit bewusst eine Gegenszene zum Turmbau von Babel: Dort wurde die Sprache verwirrt, hier versteht jeder in seiner eigenen Sprache. Bemerkenswert ist, dass nicht alle ein Wunder sehen – manche halten die Gruppe für betrunken.\n\nDas Fest, an dem das geschieht, ist kein christliches: Schawuot, das Wochenfest, fiel fünfzig Tage nach Passa, war ursprünglich ein Erntefest und wurde im Judentum zunehmend als Fest der Tora-Gabe am Sinai begangen. Damit wird die Szene lesbar: Am Sinai gab Gott sein Gebot unter Feuer und Donner, hier gibt er seinen Geist unter Feuer und Sturm. Die rabbinische Überlieferung erzählte sogar, die Stimme vom Sinai habe sich in siebzig Sprachen geteilt, damit alle Völker sie hören konnten – dieselbe Zahl, die die Völkerliste der Genesis nennt.',
    reception:
      'Aus der Frage, was in Jerusalem geschah, ist im 20. Jahrhundert eine weltweite Bewegung geworden: Die Erweckung in der Azusa Street in Los Angeles ab 1906 machte die Geisterfahrung zum Kern einer eigenen Frömmigkeit. Pfingstlich-charismatische Kirchen gehören heute zu den am schnellsten wachsenden christlichen Gruppen überhaupt, mit Schwerpunkten in Lateinamerika, Afrika und Asien.\n\nDie Gegenlesart hat ebenfalls Geschichte gemacht: Die Völkerliste in den Versen 9 bis 11 nennt Menschen aus dem ganzen bekannten Erdkreis, und jeder hört in seiner eigenen Sprache. Daraus wurde ein Argument gegen die eine Kirchensprache – und in der Missionsgeschichte das Motiv, die Bibel in jede Sprache zu übersetzen, statt eine heilige Sprache durchzusetzen.',
    terms: [
      {
        word: 'griech. pentekoste',
        rendered: 'Pfingsten',
        note: 'Schlicht „der fünfzigste“ – der fünfzigste Tag nach Passa. Das deutsche Wort ist eine Verschleifung des griechischen.',
      },
      {
        word: 'griech. glossais',
        rendered: 'Zungen',
        note: 'Dasselbe Wort für „Sprache“ und für das Körperteil. Lukas erzählt eindeutig von verstehbaren Fremdsprachen; das Zungenreden, das Paulus in Korinth beschreibt und das ohne Auslegung unverständlich bleibt, ist etwas anderes.',
      },
    ],
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
      {
        tradition: 'Kritische Einordnung',
        text: 'Historisch lässt sich hinter der Szene wenig sichern. Paulus, der früheste Zeuge, kennt eine Geistausgießung als Erfahrung der Gemeinden, erwähnt aber kein Pfingstereignis in Jerusalem. Lukas erzählt hier weniger ein datierbares Ereignis als den Anfang der Kirche in Bildern, die den Sinai zitieren.',
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
    title: '„Denen, die Gott lieben, alle Dinge zum Besten dienen“',
    historicalShort:
      'Paulus schreibt an eine Gemeinde in der Hauptstadt des Reiches, in der Christen eine kleine, gesellschaftlich unsichere Minderheit waren. Der Abschnitt endet mit einer Aufzählung realer Bedrohungen: Trübsal, Verfolgung, Hunger, Schwert.',
    historicalLong:
      'Der berühmte Vers 28 ist sprachlich mehrdeutig. Möglich ist auch die Übersetzung „bei denen, die Gott lieben, wirkt Gott alles zum Guten“ – dann ist Gott das handelnde Subjekt, nicht „alle Dinge“. Diese Lesart vermeidet den Eindruck, jedes Ereignis sei an sich gut.\n\nWichtig ist, worauf der Satz folgt. Zwei Verse vorher steht, dass wir nicht wissen, was wir beten sollen, und dass der Geist mit „unaussprechlichem Seufzen“ für uns eintritt – der berühmte Vers steht also nicht am Ende einer Erfolgsbilanz, sondern nach dem Eingeständnis der Ratlosigkeit. Und er ist nicht der Schluss: Was folgt, ist eine Reihe von Fragen ohne Antwort – wer will verdammen, wer will scheiden? –, und die Aufzählung dessen, was nicht trennen kann, nennt ausdrücklich Trübsal, Verfolgung, Hunger und Schwert. Paulus rechnet damit, dass all das eintritt.',
    reception:
      'Der Vers ist ein Trostwort ersten Ranges – und ein Satz, mit dem viel Schaden angerichtet wurde. In der Seelsorge gilt es als Grundregel, ihn Trauernden nicht ungefragt zuzusprechen: Wer eben ein Kind verloren hat, hört „alles dient zum Besten“ als Verharmlosung. Dass er im Text gerade nicht erklärt, wozu ein Leid gut sei, sondern nur, wer daran festhält, wird beim Zitieren oft überhört.\n\nDie Verse 29 und 30 wurden zur Grundlage der Prädestinationslehre. Augustinus, Calvin und die Synode von Dordrecht 1619 leiteten daraus eine doppelte Vorherbestimmung ab; die lutherische Tradition wehrte sich dagegen, und die *Konkordienformel* von 1577 lehnte eine Erwählung zur Verdammnis ausdrücklich ab.',
    terms: [
      {
        word: 'griech. synergei',
        rendered: 'dienen',
        note: 'Wörtlich „wirkt mit“. Kein Automatismus, sondern ein Zusammenwirken – und die Frage, wer dabei wirkt, hängt an der Textüberlieferung.',
      },
      {
        word: 'griech. proegno',
        rendered: 'zuvor ersehen',
        note: 'Vorher erkennen. Ob damit ein Vorherwissen oder ein vorgängiges Erwählen gemeint ist, ist der Kern des Streits um die Prädestination – im Hebräischen schließt „erkennen“ eine Zuwendung ein, nicht nur eine Information.',
      },
    ],
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
      {
        tradition: 'Ostkirchliche Auslegung',
        text: 'Die orthodoxe Theologie liest das Vorherwissen nicht als Vorherbestimmen: Gott sieht, wer sich ihm öffnet, ohne es zu erzwingen. Freiheit und Gnade stehen dabei nicht in Konkurrenz – ein Ansatz, der die westliche Zuspitzung des Streits gar nicht erst mitmacht.',
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
      'Paulus unterbricht die Sachdiskussion mit einem kunstvoll gebauten Zwischenstück und stellt die Rangfrage auf den Kopf: Nicht die spektakulärste Gabe zählt, sondern die Liebe, ohne die alles andere wertlos ist. Das griechische Wort agape meint nicht Gefühl, sondern zugewandtes Handeln. Der „Spiegel“ in Vers 12 war ein poliertes Metallstück – das Bild blieb notwendig unscharf.\n\nDas Kapitel ist kein Einschub und keine Hochzeitsrede, sondern der Mittelteil einer Auseinandersetzung. In Korinth stritt man darüber, welche Geistesgaben mehr gelten; Kapitel 12 und 14 handeln von Zungenrede, Prophetie und Ordnung im Gottesdienst. Genau dazwischen setzt Paulus diesen Text – und alle Gaben, um die gestritten wird, tauchen in den ersten drei Versen wieder auf, jeweils entwertet. Die Liebe wird dabei nicht definiert, sondern in fünfzehn Verben beschrieben, von denen kein einziges ein Gefühl benennt. Es sind lauter Handlungen und Unterlassungen.',
    reception:
      'Kaum ein Text wird häufiger bei Trauungen gelesen – obwohl er nicht von Paaren handelt, sondern von einer zerstrittenen Gemeinde. Ausleger sehen darin keinen Fehler: Die Beschreibung trifft, was in jeder dauerhaften Beziehung gebraucht wird. Der Umzug in die Hochzeitsliturgie hat den Text allerdings weichgezeichnet; im Original ist er eine Zurechtweisung.\n\nMartin Luther King zitierte das Kapitel regelmäßig und verband es mit dem griechischen Wortfeld: Agape sei die Liebe, die man auch dem Gegner schuldet, weil sie keine Sympathie voraussetzt. Diese Auslegung ist in die Sprache der Bürgerrechtsbewegung eingegangen.',
    terms: [
      {
        word: 'griech. agape',
        rendered: 'Liebe',
        note: 'Das Griechische hat mehrere Wörter für Liebe: *eros* für das Begehren, *philia* für die Freundschaft, *agape* für die zugewandte, entscheidungsfähige Liebe. Paulus gebraucht durchgehend das letzte – deshalb ist der Text auch dort anwendbar, wo keine Zuneigung im Spiel ist.',
      },
      {
        word: 'griech. en ainigmati',
        rendered: 'dunkeln Wort',
        note: 'Wörtlich „in einem Rätsel“ – daher unser Fremdwort Enigma. Das Bild vom Spiegel meint kein modernes Glas, sondern poliertes Metall: Man sieht etwas, aber verzerrt.',
      },
    ],
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
      {
        tradition: 'Kritische Rückfrage',
        text: '„Sie verträgt alles, sie duldet alles“ ist Menschen in Gewaltbeziehungen als Aufforderung zum Aushalten vorgehalten worden. Seelsorgliche Literatur widerspricht hier deutlich: Der Text beschreibt, was Liebe tut, und begründet keine Pflicht, Misshandlung zu ertragen – „sie freut sich nicht der Ungerechtigkeit“ steht im selben Abschnitt.',
      },
    ],
    crossRefs: [{ book: '1kor', chapter: 12, verse: 31, note: 'Der Weg, der alles übertrifft' }],
  },
  {
    book: 'gal',
    chapter: 3,
    from: 26,
    to: 29,
    title: '„Hier ist kein Jude noch Grieche“',
    historicalShort:
      'Der Satz stammt vermutlich aus einer frühen Taufformel. Er benennt die drei grundlegenden Trennungen der antiken Gesellschaft: Ethnie, Rechtsstatus und Geschlecht.',
    historicalLong:
      'Griechische Männer dankten in einem verbreiteten Spruch dafür, weder als Barbar noch als Sklave noch als Frau geboren zu sein. Paulus kehrt genau diese Dreiteilung um. Anlass des Briefes war die Forderung, nichtjüdische Christen müssten beschnitten werden – also die Frage, ob Zugehörigkeit von Herkunft und Ritus abhängt.\n\nDer Satz ist wahrscheinlich älter als der Brief: Aufbau und Rhythmus deuten auf eine Taufformel hin, die Paulus zitiert – dieselben drei Paare tauchen in abgewandelter Form in 1. Korinther 12 und Kolosser 3 auf. Die drei Gegensätze sind nicht beliebig gewählt; sie benennen die Grundunterscheidungen der antiken Gesellschaft: Herkunft, Rechtsstand, Geschlecht. Und die Formulierung wechselt beim dritten Paar auffällig: Statt „kein Mann noch Weib“ steht im Griechischen „nicht männlich und weiblich“ – exakt die Worte, mit denen die griechische Übersetzung von Genesis 1,27 die Erschaffung des Menschen beschreibt.',
    reception:
      'Der Vers gehört zu den meistzitierten der Bibel in Debatten um Gleichheit – und seine Wirkungsgeschichte ist zwiespältig. Abolitionisten führten ihn gegen die Sklaverei ins Feld, während ihre Gegner mit den Haustafeln der Briefe antworteten; in Südafrika stand er im Zentrum der kirchlichen Auseinandersetzung um die Apartheid, und die Bekenntniserklärung von Belhar 1986 baut auf ihm auf.\n\nIn der Frauenordination und in der Diskussion um Homosexualität wird er ebenso angeführt. Der Einwand lautet jeweils, der Vers rede vom Heil und nicht von Ämtern oder Ordnungen. Wo die Grenze zwischen beidem verläuft, ist bis heute konfessionell umstritten.',
    terms: [
      {
        word: 'griech. eneduasthe',
        rendered: 'angezogen',
        note: 'Ein Kleidungswort: Christus wie ein Gewand anlegen. In der Alten Kirche wurden Täuflinge nach dem Untertauchen in ein weißes Gewand gekleidet – das Bild war sichtbar.',
      },
      {
        word: 'griech. heis',
        rendered: 'einer',
        note: 'Männliche Form des Zahlworts, nicht „eines“. Paulus schreibt nicht, dass alle gleich seien, sondern dass sie zusammen eine einzige Person bilden – ein Bild, das er anderswo mit dem Leib entfaltet.',
      },
    ],
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
      {
        tradition: 'Ökumenische Verständigung',
        text: 'Viele Kirchen haben sich darauf verständigt, dass der Vers eine Wirklichkeit beschreibt, die in der Gemeinde sichtbar werden soll, ohne dass daraus unmittelbar eine Kirchenordnung folgt. Der Streit verläuft dann nicht mehr um den Vers selbst, sondern um die Frage, was „sichtbar werden“ konkret verlangt.',
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
      'Das griechische Wort für „Werk“ in Vers 10 ist poiema – davon kommt „Poesie“. Der Mensch erscheint als Gedicht Gottes, nicht als dessen Werkzeug. Grammatisch ist umstritten, worauf sich „das“ in „das nicht aus euch“ bezieht: auf den Glauben, auf die Rettung oder auf den ganzen Vorgang. Die griechische Form spricht eher für Letzteres. Der unmittelbare Zusammenhang zielt zudem nicht auf den Einzelnen, sondern auf die Gemeinde: Wenige Verse später geht es um die niedergerissene Trennmauer zwischen Juden und Nichtjuden.\n\nDer Abschnitt endet nicht bei Vers 9, sondern bei Vers 10 – und dort stehen die Werke wieder da, nur an anderer Stelle: nicht als Weg zum Heil, sondern als das, wozu Gerettete geschaffen sind. Griechisch heißt es sogar, Gott habe sie „zuvor bereitet, dass wir darin wandeln sollen“; die guten Werke warten schon. Wer nur die Verse 8 und 9 zitiert, macht aus einer Umstellung eine Streichung. Der Brief selbst zieht daraus keine Lehre, sondern eine Ordnung: erst empfangen, dann tun.',
    reception:
      'Diese Verse gehören zum Kernbestand der Reformation und stehen in Luthers Vorreden ebenso wie in unzähligen Gesangbuchliedern. Der Streit, den sie auslösten, wurde 1999 in der *Gemeinsamen Erklärung zur Rechtfertigungslehre* zwischen dem Lutherischen Weltbund und der katholischen Kirche zumindest teilweise beigelegt: Beide Seiten erklärten, dass der Mensch allein aus Gnade angenommen wird und die gegenseitigen Lehrverurteilungen des 16. Jahrhunderts den heutigen Partner nicht mehr treffen.\n\nDie Kehrseite ist ein Missbrauch, den schon Bonhoeffer benannt hat: „billige Gnade“ – Vergebung als Prinzip, das nichts kostet und nichts ändert. Die Verse 8 bis 10 zusammen zu lesen ist die exegetische Antwort darauf.',
    terms: [
      {
        word: 'griech. charis',
        rendered: 'Gnade',
        note: 'In der antiken Gesellschaft der Fachbegriff für die Zuwendung eines Höhergestellten, die eine Gegenleistung erwartete. Paulus gebraucht das Wort und streicht die Erwartung – das war der eigentliche Bruch mit der Konvention.',
      },
      {
        word: 'griech. poiema',
        rendered: 'Werk',
        note: 'Das Gemachte, das Gebilde – daher unser Wort Poem. Dieselbe Wurzel wie in den „guten Werken“ zwei Zeilen später: Wir sind Gottes Werk, damit Werke folgen.',
      },
    ],
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
      {
        tradition: 'Historische Einordnung',
        text: 'Die neuere Paulusforschung liest die Gegenüberstellung von Glaube und Werken weniger als Streit um menschliche Leistung als um Zugehörigkeit: Strittig war in den Gemeinden, ob Nichtjuden Beschneidung und Speisegebote übernehmen mussten. Ob der Epheserbrief diese Frontstellung noch teilt oder sie bereits grundsätzlich versteht, ist umstritten.',
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
      'Der Aufbau beschreibt eine Bewegung nach unten und wieder nach oben: Entäußerung bis zum Kreuz, dann Erhöhung. Die Kreuzigung war die Hinrichtungsart für Sklaven und Aufrührer; dass ein Loblied ausgerechnet diesen Tod besingt, war kulturell ungeheuerlich. Die Schlusszeile überträgt eine Aussage aus Jesaja 45, die dort ausdrücklich Gott gilt, auf Christus.\n\nDer tiefste Punkt der Bewegung ist mit drei Worten markiert: „ja zum Tode am Kreuz“. Viele Forscher halten gerade diese drei Worte für einen Zusatz des Paulus zu einem übernommenen Lied – sie sprengen das Versmaß. Der Rahmen ist dabei nicht Dogmatik, sondern Streitschlichtung: In Philippi lag die Gemeinde über Kreuz, zwei Frauen werden in Kapitel 4 mit Namen zur Einigung aufgefordert. Der Hymnus steht als Argument in diesem Konflikt, eingeleitet mit „ein jeglicher sei gesinnt“ – gesungene Theologie mit einem sehr praktischen Zweck.',
    reception:
      'Der Hymnus lieferte den christologischen Konzilien ihre Sprache, und der Karfreitag lebt bis heute von seinen Bildern. Bemerkenswerter ist seine politische Wirkung: Die Schlussverse übertragen auf Christus, was in den Städten des Reiches dem Kaiser galt – dass sich ihm jedes Knie beuge und jede Zunge ihn als *Kyrios* bekenne. In Philippi, einer römischen Veteranenkolonie, war das keine fromme Floskel.\n\nDie Aufforderung zur Erniedrigung hat auch Schaden gestiftet: Sie wurde Untergebenen, Frauen und Kolonisierten als Pflicht zum Aushalten gepredigt. Feministische Theologie hat dagegen eingewandt, dass Selbstentleerung nur predigen kann, wer etwas zu entleeren hat – dem Machtlosen ist mit dem Ruf zur Demut nicht geholfen.',
    terms: [
      {
        word: 'griech. morphe',
        rendered: 'Gestalt',
        note: 'Nicht die äußere Erscheinung, sondern die Erscheinungsweise, in der etwas erkennbar wird, was es ist. Dasselbe Wort steht für die göttliche und für die Knechtsgestalt – die Parallele ist beabsichtigt.',
      },
      {
        word: 'griech. harpagmos',
        rendered: 'Raub',
        note: 'Ein seltenes Wort, an dem viel hängt: Etwas, das man an sich reißt – oder etwas, das man festhält, weil man es schon hat. Je nachdem heißt der Satz, Christus habe nicht nach Gottgleichheit gegriffen, oder er habe an ihr nicht festgehalten.',
      },
      {
        word: 'griech. ekenosen',
        rendered: 'entäußerte sich',
        note: 'Wörtlich „er leerte sich aus“. Von diesem Wort hat die Kenosis-Theologie ihren Namen – die Frage, worauf Gott bei der Menschwerdung verzichtet hat, wird seit dem 19. Jahrhundert intensiv verhandelt.',
      },
    ],
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
      {
        tradition: 'Religionsgeschichtliche Forschung',
        text: 'Form, Rhythmus und ungewöhnliche Vokabeln sprechen dafür, dass Paulus hier ein bereits vorhandenes Lied der Gemeinden zitiert. Damit wäre der Text älter als der Brief und einer der frühesten Belege dafür, wie in den ersten Jahrzehnten von Christus gesungen wurde – gesungene Theologie vor geschriebener.',
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
      'Bemerkenswert ist der Schluss des Kapitels: Nach der langen Aufzählung heißt es, dass sie alle das Verheißene gerade **nicht** erlangt haben. Glaube wird hier also nicht am Erfolg gemessen. Die Beispielreihe wird zunehmend dunkler – am Ende stehen Menschen, die zersägt, gesteinigt und in Fellen umhergetrieben wurden. Der Verfasser ist unbekannt; schon Origenes schrieb im 3. Jahrhundert, das wisse „Gott allein“.\n\nWas auf den Satz folgt, sind keine Glaubenssätze, sondern Lebensläufe – Abel, Henoch, Noah, Abraham, Sara, Mose, Rahab –, und die Auswahl ist bemerkenswert weit: Rahab war eine Prostituierte, Sara hat im Erzählzusammenhang gelacht. Der Verfasser fasst sie alle unter ein einziges Wort: Sie waren „Fremdlinge und Gäste auf Erden“ und haben eine Heimat gesucht, die sie nicht erreicht haben. Auch die Reihenfolge ist bemerkenswert – der Katalog endet nicht mit dem Größten, sondern mit Namenlosen, die in Höhlen und Löchern der Erde umherirrten.',
    reception:
      'Kapitel 11 ist zum Musterkatalog des Glaubens geworden und prägt Predigt und Frömmigkeit bis heute – von mittelalterlichen Heiligenreihen bis zu modernen Vorbildersammlungen. Auffällig ist, wen es aufnimmt: Rahab, eine Prostituierte, und Sara, die im Erzählzusammenhang gelacht hat. Der Katalog ist deutlich weiter als die Frömmigkeit, die sich auf ihn beruft.\n\nIn der Auseinandersetzung mit dem Atheismus ist der Vers oft als Beleg dafür zitiert worden, Glaube sei Fürwahrhalten ohne Grund. Ausleger halten dagegen, dass *elenchos* ein Beweiswort ist und der Verfasser gerade nicht zum blinden Vertrauen aufruft, sondern auf eine Erfahrungsgeschichte verweist.',
    terms: [
      {
        word: 'griech. hypostasis',
        rendered: 'Zuversicht',
        note: 'Das Wort schwankt zwischen „feste Grundlage“ und „Zuversicht“ – dasselbe, das in der Trinitätslehre „Person“ meint. Luther wählt die innere Seite; man kann ebenso übersetzen: Glaube ist der Grundbestand dessen, was man hofft.',
      },
      {
        word: 'griech. elenchos',
        rendered: 'Nichtzweifeln',
        note: 'Eigentlich ein Beweis oder Nachweis – ein Wort aus dem Gerichtssaal. Die Spannung des Satzes liegt gerade darin, dass etwas Unsichtbares als erwiesen gilt.',
      },
    ],
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
      {
        tradition: 'Jüdische Einordnung',
        text: 'Der Katalog folgt einer bekannten Form: Auch das Buch Jesus Sirach lobt „berühmte Männer“ in einer langen Reihe. Der Hebräerbrief übernimmt diese Gattung und deutet sie um – nicht ihre Taten machen die Aufgezählten groß, sondern dass sie sich auf Unsichtbares verlassen haben.',
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
      'Der scheinbare Widerspruch zu Paulus löst sich weitgehend auf, wenn man die Begriffe vergleicht. Paulus wendet sich gegen „Werke des Gesetzes“ als Bedingung der Zugehörigkeit; Jakobus meint mit „Werken“ die praktische Nächstenliebe als Folge des Glaubens. Luther hielt den Brief dennoch für minderwertig und nannte ihn eine „stroherne Epistel“ – ein Urteil, dem die spätere lutherische Theologie überwiegend nicht gefolgt ist.\n\nPaulus und Jakobus berufen sich auf denselben Vers – 1. Mose 15,6, „Abraham glaubte Gott“ – und ziehen entgegengesetzte Schlüsse. Der Unterschied liegt darin, welche Szene sie jeweils vor Augen haben: Paulus die Zusage an den kinderlosen Abram, Jakobus die Bindung Isaaks auf dem Berg. Jakobus stellt daneben ein zweites Beispiel, das in der Auslegung meist übergangen wird: Rahab, eine Prostituierte aus Jericho, die Kundschafter versteckt. Beide Beispiele sind Handlungen unter Risiko, nicht Beweise der Frömmigkeit.',
    reception:
      'Luther nannte den Jakobusbrief 1522 in seiner Vorrede eine „stroherne Epistel“ und stellte ihn im Anhang seines Neuen Testaments hinter die anderen Schriften – eine Wertung, die er später zurückhaltender formulierte, die aber in der lutherischen Tradition nachwirkte. Das Konzil von Trient antwortete 1546 mit der ausdrücklichen Bekräftigung des Briefes als vollgültiger Schrift.\n\nDie *Gemeinsame Erklärung zur Rechtfertigungslehre* von 1999 hat den Streit entschärft, ohne ihn aufzulösen: Beide Seiten halten fest, dass der Glaube die Werke wirkt und die Werke ihn nicht ersetzen. In der Diakonie und in der christlichen Sozialarbeit ist Jakobus 2 der meistzitierte Begründungstext geblieben.',
    terms: [
      {
        word: 'griech. erga',
        rendered: 'Werke',
        note: 'Taten, Handlungen. Dass Paulus und Jakobus dasselbe Wort gebrauchen, aber Verschiedenes darunter fassen, ist der Kern des Streits – und der Grund, warum er sich exegetisch weitgehend auflöst.',
      },
      {
        word: 'griech. nekra',
        rendered: 'tot',
        note: 'Nicht „schwach“ oder „unvollständig“: Ein toter Glaube ist kein geringerer Glaube, sondern gar keiner mehr. Das Bild ist medizinisch, nicht moralisch.',
      },
    ],
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
      {
        tradition: 'Historische Einordnung',
        text: 'Manche Ausleger lesen den Abschnitt als Reaktion nicht auf Paulus selbst, sondern auf eine verkürzte Paulus-Auslegung, die in einigen Gemeinden umlief: Wenn der Glaube genügt, sei das Handeln gleichgültig. Der Brief widerspricht dann nicht Paulus, sondern denen, die ihn missverstanden.',
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
      'Der Satz „Gott ist Liebe“ steht zweimal – und beide Male nicht als Definition am Anfang, sondern als Schlussfolgerung aus dem, was Gott getan hat. Das griechische agape war vor dem Neuen Testament ein eher farbloses Wort; erst hier bekommt es sein Gewicht. Der Umkehrschluss wird ausdrücklich abgewehrt: Nicht „Liebe ist Gott“, sondern Gott zeigt sich als der, der zuerst liebt. Der Brief argumentiert dabei bewusst greifbar: Der unsichtbare Gott und der sichtbare Bruder lassen sich nicht gegeneinander ausspielen.\n\nDer Brief zieht eine Grenze, die selten mitzitiert wird: Wer behauptet, Gott zu lieben, und seinen Bruder hasst, heißt in Vers 20 schlicht ein Lügner. Das Wort ist hart, und es steht in einem Schreiben, aus dem Menschen weggegangen sind – Kapitel 2 spricht von solchen, die „von uns ausgegangen“ sind. Ebenso bemerkenswert ist Vers 18: „Furcht ist nicht in der Liebe.“ Der Satz richtet sich gegen eine Frömmigkeit, die vom Angstmachen lebt, und ist in der Seelsorge oft der wichtigere des ganzen Abschnitts.',
    reception:
      'Der Satz „Gott ist Liebe“ ist wohl die meistzitierte Kurzformel des Christentums und steht über Kirchentüren, in Traureden und auf Grabsteinen. Benedikt XVI. machte ihn 2005 zum Titel seiner ersten Enzyklika *Deus caritas est* und verband darin die griechischen Wörter *eros* und *agape* ausdrücklich miteinander.\n\nDie Verkürzung liegt nahe: Der Satz lässt sich so lesen, als sei Liebe ein anderes Wort für Gott – und damit alles gemeint, was Menschen so nennen. Der Brief selbst geht den umgekehrten Weg; er bestimmt, was Liebe ist, von einem bestimmten Ereignis her, nicht von der Erfahrung.',
    terms: [
      {
        word: 'griech. hilasmos',
        rendered: 'Versöhnung',
        note: 'Im griechischen Alten Testament das Wort für die Sühnehandlung am Versöhnungstag. Ob es eine Besänftigung Gottes meint oder die Beseitigung dessen, was trennt, ist eine der ältesten Streitfragen der Auslegung – der Brief selbst betont, dass die Bewegung von Gott ausgeht.',
      },
      {
        word: 'griech. teteleiomene',
        rendered: 'völlig',
        note: 'Zum Ziel gebracht, vollendet. Die Liebe Gottes kommt nach diesem Brief nicht in einem Gefühl an ihr Ziel, sondern darin, dass Menschen einander lieben.',
      },
    ],
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
      {
        tradition: 'Historische Einordnung',
        text: 'Der Brief entsteht in einer Gemeinde, aus der Menschen weggegangen sind – Kapitel 2 spricht von solchen, die „von uns ausgegangen“ sind. Der Ruf zur gegenseitigen Liebe ist deshalb zunächst nach innen gerichtet: Er soll eine Gruppe zusammenhalten, die gerade auseinanderfällt. Ob und wie weit er darüber hinausreicht, ist eine Frage der Auslegung, nicht des Wortlauts.',
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
      'Die Sprache ist bewusst aus dem Alten Testament gespeist, besonders aus Jesaja 65. Auffällig ist die Richtung: Nicht die Menschen steigen auf, sondern Gott zieht ein – „die Hütte Gottes bei den Menschen“. Dass „das Meer nicht mehr ist“, meint nicht das Verschwinden von Ozeanen, sondern das Ende der Chaosmacht, die im Alten Orient für Bedrohung stand.\n\nDie Stadt, die dann beschrieben wird, hat eine auffällige Leerstelle: „einen Tempel sah ich nicht darin“ – in einem Buch, das im Tempelbild denkt, ist das eine Ansage. Ebenso die Tore: Sie stehen offen und werden nie geschlossen, obwohl eine antike Stadt sich gerade durch ihre Mauern definierte. Und die Maße sind absichtlich unmöglich: Länge, Breite und Höhe sind gleich, zwölftausend Stadien – ein Würfel von rund 2200 Kilometern Kantenlänge. Wer hier eine Bauzeichnung sucht, verfehlt die Gattung.',
    reception:
      'Die Deutung dieses Kapitels trennt bis heute christliche Strömungen. Die kirchliche Hauptlinie seit Augustinus liest es als Bild für die vollendete Gemeinschaft mit Gott, nicht als Fahrplan. Der Dispensationalismus des 19. Jahrhunderts – über die Scofield-Bibel weit verbreitet – ordnete es dagegen in eine feste Abfolge künftiger Ereignisse ein, mit erheblichen politischen Folgen bis in die Nahostpolitik hinein.\n\nDaneben steht eine schöpfungstheologische Wirkung: Weil der Text von einer neuen Erde spricht und nicht von deren Abschaffung, ist er in den letzten Jahrzehnten zu einem Kerntext kirchlicher Umweltarbeit geworden. Wer die Erde für Ausschussware hält, so das Argument, liest hier gegen den Wortlaut.',
    terms: [
      {
        word: 'griech. kainos',
        rendered: 'neuen',
        note: 'Das Griechische unterscheidet zwei Arten von Neuheit: *neos* meint zeitlich neu, gerade entstanden; *kainos*, das hier steht, meint neu in der Art – erneuert, verwandelt. Der Text spricht eher von Verwandlung als von Ersatz.',
      },
      {
        word: 'griech. skene',
        rendered: 'Hütte',
        note: 'Zelt. Dasselbe Wort steht im Johannesprolog für das „Wohnen“ des Wortes unter uns und im griechischen Alten Testament für das Begegnungszelt der Wüstenzeit.',
      },
    ],
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
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Vers 4 – dass Gott alle Tränen abwischt – ist einer der meistgesprochenen Sätze an Gräbern. Bemerkenswert ist, dass er die Tränen nicht für unnötig erklärt: Erst werden sie da sein, dann werden sie abgewischt. Der Trost bestreitet den Schmerz nicht, sondern setzt ihn voraus.',
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
      'Die Bilder – durchgrabene Hände und Füße, verteilte Kleider, das Los über das Gewand – sind Metaphern für äußerste Erniedrigung, wie sie in altorientalischer Klagedichtung verbreitet waren. Die Evangelien greifen sie in den Passionsberichten auf. Der Umschlag in Vers 22 erfolgt ohne Erklärung: Der Beter hat offenbar eine Zusage empfangen, die der Text nicht wiedergibt.\n\nSelten mitzitiert wird die zweite Hälfte. Bis Vers 21 ist der Psalm eine Klage, die nichts auslässt; ab Vers 22 wird er zum Danklied, und der Schluss weitet sich immer weiter: erst die Brüder, dann die Gemeinde, dann „aller Welt Enden“, schließlich ein Volk, „das noch geboren werden soll“. Der letzte Satz lautet, dass er es getan hat – im Hebräischen ein einziges Wort. Damit endet der Psalm der Gottverlassenheit mit einer vollendeten Tatsache.',
    reception:
      'Die Passionsberichte sind mit diesem Psalm durchsetzt: das Verteilen der Kleider, das Kopfschütteln der Umstehenden, der Spottsatz „Er hat auf Gott vertraut, der helfe ihm nun“. Die Evangelisten erzählen die Kreuzigung in seinen Worten – ob als Erinnerung an tatsächlich Gesagtes oder als Deutung des Geschehens, ist umstritten.\n\nVers 17 hat eine eigene, belastete Geschichte: Der hebräische Text ist an dieser Stelle unklar, die griechische Übersetzung las „sie haben meine Hände und Füße durchgraben“. Über Jahrhunderte wurde daraus im christlich-jüdischen Streitgespräch der Vorwurf, die Juden hätten ihren eigenen Text gefälscht – ein Vorwurf, den die Textforschung nicht bestätigt.',
    terms: [
      {
        word: 'hebr. eli eli lama asawtani',
        rendered: 'Mein Gott, mein Gott, warum hast du mich verlassen',
        note: 'Diesen Anfang zitiert Jesus am Kreuz – bei Markus allerdings in aramäischer Form. Wer einen Psalm mit seinem ersten Vers anführt, ruft im Judentum das ganze Lied auf; deshalb ist strittig, ob der Ruf nur Verzweiflung ausdrückt oder auch schon den Schluss meint.',
      },
    ],
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
      {
        tradition: 'Liturgische Rezeption',
        text: 'In der Karfreitagsliturgie vieler Kirchen wird der Psalm ganz gelesen oder gesungen, oft ohne Antwort und ohne Segen. Dass die Klage im Gottesdienst stehen bleiben darf, ohne sofort aufgelöst zu werden, gilt als eine ihrer wichtigsten Funktionen.',
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
      'Das hebräische Wort für „schaffe“ in Vers 10 ist dasselbe wie in 1. Mose 1 – es wird in der Bibel ausschließlich für Gottes Handeln verwendet. Am Ende steht ein überraschender Satz: Opfer will Gott nicht, sondern „ein zerschlagenes Herz“. Die Verse 18–19, die den Tempelkult wieder aufwerten, gelten vielen Fachleuten als spätere Ergänzung aus der Zeit des Wiederaufbaus.\n\nDer Psalm hat für die Schuld drei verschiedene Wörter und wechselt zwischen ihnen: Übertretung als Bruch eines Verhältnisses, Verfehlung als Zielverfehlung, Verkehrtheit als etwas, das krumm gewachsen ist. Dieselbe Dreiheit steht in der Gnadenformel von 2. Mose 34, auf die der Anfang des Psalms anspielt – der Beter zitiert also die Zusage, auf die er sich beruft. Bemerkenswert ist auch die Bitte um Reinigung „mit Ysop“: Ysop gehörte zum Ritual bei Aussatz und zur Totenreinigung. Der Beter vergleicht seine Lage mit dem, was einen Menschen ganz aus der Gemeinschaft nimmt.',
    reception:
      'Psalm 51 ist der bekannteste der sieben Bußpsalmen und stand im Zentrum der mittelalterlichen Bußpraxis. Sein lateinischer Anfang *Miserere mei, Deus* wurde zum Namen einer ganzen Gattung; Allegris Vertonung in der Sixtinischen Kapelle durfte lange nicht abgeschrieben werden. Luther legte den Psalm 1532 in einer eigenen Vorlesung aus und fand darin seine Lehre vom Menschen wieder.\n\nHistorisch ist die Zuschreibung an David wahrscheinlich später hinzugefügt; als Deutung hat sie den Text jedoch geprägt – er wurde zum Gebet der Mächtigen, die sich schuldig gemacht haben, und in dieser Rolle im Mittelalter Königen und Bischöfen bei der öffentlichen Buße aufgetragen.',
    terms: [
      {
        word: 'hebr. bara',
        rendered: 'Schaffe',
        note: 'Dasselbe Verb wie im ersten Satz der Bibel, und es hat nur Gott als Subjekt. Der Beter bittet um etwas, das er selbst nicht herstellen kann.',
      },
      {
        word: 'hebr. ruach',
        rendered: 'Geist',
        note: 'Atem, Wind, Geist – dasselbe Wort für alles drei. In diesen Versen dreimal, jedes Mal anders gefüllt: der neue, der heilige und der freudige Geist.',
      },
    ],
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
      {
        tradition: 'Kritische Rückfrage',
        text: 'Der Satz „an dir allein habe ich gesündigt“ ist Auslegern immer wieder aufgestoßen: Wenn der Psalm von Davids Tat an Batseba und an Uria handelt, sind es gerade nicht nur Gott, an dem gesündigt wurde. Wer den Vers zitiert, um Verantwortung gegenüber Menschen zu übergehen, wendet ihn gegen seine eigene Überschrift.',
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
      'Die Verben stehen im Perfekt – die Umwälzung wird besungen, als sei sie schon geschehen. Das Lied wurde deshalb in verschiedenen Epochen als so brisant empfunden, dass sein öffentlicher Vortrag zeitweise eingeschränkt wurde, etwa während der britischen Kolonialherrschaft in Indien und unter der Militärdiktatur in Argentinien.\n\nDas Lied ist fast durchgehend aus dem Alten Testament zusammengesetzt: Hannas Lied, Psalm 113, Habakuk, Hiob. Eine junge Frau aus Galiläa singt in Sätzen, die ihr Volk seit Jahrhunderten kennt – und ordnet sich damit in eine Reihe von Menschen ein, denen zugesagt wurde, was unmöglich schien. Auffällig ist der Bruch in der Mitte: Bis Vers 50 geht es um sie selbst, danach um Mächtige und Hungrige. Was ihr geschieht, ist in diesem Lied kein Einzelfall, sondern ein Beispiel.',
    reception:
      'Das Magnificat wird in der katholischen Kirche täglich zur Vesper gesungen und gehört in der anglikanischen Tradition zum Evensong; Bach vertonte es 1723 als eines seiner ersten Leipziger Werke. Es ist damit einer der meistgesungenen Texte der Christenheit.\n\nZugleich ist es der einzige biblische Lobgesang, dessen öffentlicher Vortrag mehrfach untersagt wurde. Dietrich Bonhoeffer nannte es in einer Adventspredigt 1933 das „leidenschaftlichste, wildeste, ja revolutionärste Adventslied, das je gesungen worden ist“ – und traf damit genau das, was Zensoren an ihm störte.',
    terms: [
      {
        word: 'griech. tapeinosis',
        rendered: 'Niedrigkeit',
        note: 'Niedrigkeit im Sinn von: gedrückte Lage, geringer Stand. Nicht Demut als Tugend, sondern Machtlosigkeit als Zustand – dasselbe Wortfeld, aus dem gleich darauf die „Niedrigen“ kommen, die erhöht werden.',
      },
      {
        word: 'griech. megalynei',
        rendered: 'erhebt',
        note: 'Wörtlich „macht groß“. Die lateinische Übersetzung *magnificat* hat dem Lied seinen Namen gegeben.',
      },
    ],
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
      {
        tradition: 'Exegetische Beobachtung',
        text: 'Einige alte lateinische Handschriften schreiben das Lied nicht Maria zu, sondern Elisabeth. Die große Mehrheit der Textzeugen nennt Maria, und die Zuschreibung an Elisabeth gilt als sekundär – bemerkenswert ist sie trotzdem: Sie zeigt, dass schon früh gefragt wurde, wer hier eigentlich spricht.',
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
      'Die historische Einordnung wirft Fragen auf: Die von Quirinius durchgeführte Zählung ist für das Jahr 6 n. Chr. bezeugt, während Herodes der Große 4 v. Chr. starb. Die Forschung diskutiert das seit langem ohne abschließendes Ergebnis. Lukas geht es erkennbar um eine Gegenüberstellung: Augustus trug die Titel „Retter“ und „Bringer des Friedens“ – genau diese Worte sprechen die Engel über einem Kind in einer Futterkrippe aus. Von einem Stall ist im Text übrigens nie die Rede.\n\nVon einem Stall steht nichts im Text, und auch nicht von einem Gasthaus. Das griechische Wort in Vers 7 bezeichnet den Gästeraum eines Hauses – dasselbe Wort steht später für den Raum, in dem das letzte Mahl gehalten wird. Häuser in der Gegend hatten oft einen tiefer gelegenen Bereich, in dem nachts das Vieh stand, mit Futterkrippen an der Schwelle. Die Szene spielt dann nicht draußen vor verschlossener Tür, sondern drinnen in einem überfüllten Haus. Ochs und Esel stammen nicht aus Lukas, sondern aus Jesaja 1,3.',
    reception:
      'Das Weihnachtsevangelium ist der meistgehörte Bibeltext des deutschen Sprachraums – und Luthers Übersetzung hat den Wortlaut so tief eingeprägt, dass neuere Fassungen an Weihnachten selten durchdringen. Die Krippe als Andachtsbild geht auf Franz von Assisi zurück, der 1223 in Greccio eine lebende Szene aufbauen ließ.\n\nAuch der Termin ist gewachsen, nicht überliefert: Der 25. Dezember taucht erstmals im 4. Jahrhundert in Rom auf, das Datum der Geburt nennt kein Evangelium. Ob dabei ein römisches Sonnenfest überschrieben wurde oder eine ältere Berechnung ausschlaggebend war, ist unter Historikern strittig. Die Ostkirchen feiern nach dem julianischen Kalender dreizehn Tage später, die armenische Kirche am 6. Januar.',
    terms: [
      {
        word: 'griech. katalyma',
        rendered: 'Herberge',
        note: 'Der Gästeraum eines Hauses, nicht ein Gasthof – für den hat Lukas im Gleichnis vom Samariter ein anderes Wort. Die Vorstellung des abweisenden Wirtes hat keine Grundlage im Text.',
      },
      {
        word: 'griech. soter',
        rendered: 'Heiland',
        note: 'Retter. Der Titel gehörte im römischen Osten zur Ehrung des Kaisers; die Inschrift von Priene nennt Augustus mit fast denselben Worten wie hier die Engel das Kind.',
      },
    ],
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
      {
        tradition: 'Sozialgeschichtliche Lesart',
        text: 'Die Hirten kommen nicht als Idylle vor. Ihr Beruf hielt sie von Sabbat und Tempel fern, ihr Zeugnis galt vor Gericht als unzuverlässig, und sie standen im Ruf, fremdes Weideland zu nutzen. Dass die Nachricht zuerst ihnen gilt, ist derselbe Zug, der Lukas durch sein ganzes Evangelium bestimmt.',
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
      'Im Alten Testament ist das tobende Meer Bild der Chaosmacht, die allein Gott bändigt. Wenn Jesus den Wind „bedroht“ – dasselbe Wort wie bei Dämonenaustreibungen – nimmt Markus diese Linie auf. Die Frage der Jünger am Schluss, „Wer ist dieser?“, bleibt unbeantwortet und trägt das ganze Evangelium bis zum Bekenntnis unter dem Kreuz.\n\nMarkus erzählt zwei Ängste, und die zweite ist größer. Im Sturm haben die Jünger Angst um ihr Leben; nachdem der Sturm sich gelegt hat, „fürchteten sie sich sehr“. Nicht das Unwetter erschreckt sie am Ende, sondern der, der neben ihnen im Boot sitzt. Auffällig ist auch der Vorwurf, den sie erheben: nicht „hilf uns“, sondern „fragst du nichts danach, dass wir verderben?“ Sie werfen ihm Gleichgültigkeit vor. Der Text lässt diesen Vorwurf stehen, ohne ihn zu entschuldigen.',
    reception:
      'Das Schiff in der Not ist zum ältesten Bild für die Kirche geworden: Schon in den Katakomben steht es, und der Kirchenraum heißt bis heute Schiff. In der Reformationszeit und in den Kirchenkämpfen des 20. Jahrhunderts wurde die Szene regelmäßig auf die eigene Lage gedeutet – die Gemeinde im Sturm, mit einem scheinbar schlafenden Gott.\n\nIn der Seelsorge ist der Vorwurf der Jünger wichtiger geworden als das Wunder. Dass ausgerechnet die Frage „kümmert es dich nicht?“ unwidersprochen in einem Evangelium steht, gilt vielen als Erlaubnis, Gott dasselbe zu fragen.',
    terms: [
      {
        word: 'griech. epetimesen',
        rendered: 'bedrohte',
        note: 'Anfahren, zurechtweisen, bedrohen – dasselbe Verb gebraucht Markus, wenn Jesus Dämonen austreibt. Der Sturm wird also nicht beruhigt, sondern angeherrscht.',
      },
      {
        word: 'griech. pephimoso',
        rendered: 'verstumme',
        note: 'Wörtlich „sei geknebelt“ – ein Wort aus dem Umgang mit Tieren, mit dem an anderer Stelle unreine Geister zum Schweigen gebracht werden.',
      },
    ],
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
    title: 'Das Weltgericht: „Einem unter diesen meinen geringsten Brüdern“',
    historicalShort:
      'Die letzte große Rede bei Matthäus endet nicht mit einer Glaubensprüfung, sondern mit einer Liste konkreter Taten: Essen, Trinken, Kleidung, Besuch im Gefängnis. Beide Gruppen sind gleichermaßen überrascht.',
    historicalLong:
      'Umstritten ist, wer „diese meine geringsten Brüder“ sind. Traditionell werden alle Notleidenden verstanden; ein Teil der neueren Exegese liest die Wendung enger als Bezeichnung für die umherziehenden Boten der Gemeinde. Die weite Deutung prägt seit der Alten Kirche die christliche Armenfürsorge und ist bis heute die verbreitetste.\n\nBemerkenswert ist, was in beiden Urteilen nicht vorkommt: keine Frage nach Glauben, keine nach Bekenntnis, keine nach Zugehörigkeit. Gefragt wird nach sechs Handlungen, und fünf davon stehen bereits in Jesaja 58; die sechste – der Besuch im Gefängnis – kommt hinzu. Ebenso bemerkenswert ist die doppelte Überraschung: Beide Gruppen wissen nicht, dass sie es getan oder gelassen haben. Der Text kennt kein Verdienstbewusstsein, weder im Guten noch im Bösen.',
    reception:
      'Kaum ein Text hat die christliche Sozialgeschichte stärker geprägt. Die sieben Werke der Barmherzigkeit, an denen sich mittelalterliche Hospitäler, Bruderschaften und Bildprogramme orientierten, sind aus diesen sechs Handlungen abgeleitet; die siebte – das Begraben der Toten – kam aus dem Buch Tobit hinzu. Von Basilius über Elisabeth von Thüringen bis zu den Kranken- und Flüchtlingshilfen der Gegenwart läuft eine durchgehende Linie.\n\nDie Verse 41 bis 46 haben eine andere Wirkung entfaltet: Das „ewige Feuer“ gehört zu den Belegstellen der Höllenpredigt und hat Bildwelten von Giotto bis zu barocken Kanzelbildern geprägt. In der Theologie wird seit der Alten Kirche darüber gestritten, ob das Gericht endgültig ist; Origenes vertrat eine Wiederherstellung aller, was später verurteilt wurde.',
    terms: [
      {
        word: 'griech. ethne',
        rendered: 'Völker',
        note: 'Völker, Heiden, Nichtjuden. Wer gerichtet wird, hängt an diesem Wort: alle Menschen – oder die Völker, denen die Boten begegnet sind. Der Streit um die „geringsten Brüder“ hängt mit dieser Entscheidung zusammen.',
      },
      {
        word: 'griech. elachistoi',
        rendered: 'geringsten',
        note: 'Superlativ zu „klein“. Matthäus gebraucht das verwandte Wort „diese Kleinen“ mehrfach für die Glieder der Gemeinde – ein Argument für die engere Deutung, das der weiten dennoch nicht den Boden entzieht.',
      },
    ],
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
      {
        tradition: 'Jüdische Einordnung',
        text: 'Die Vorstellung, dass Gott sich mit den Armen gleichsetzt, ist nicht neu: Sprüche 19,17 sagt, wer sich des Armen erbarmt, leihe dem HERRN. Die rabbinische Literatur führt diesen Gedanken breit aus. Matthäus 25 spitzt eine vorhandene Linie zu, statt eine neue zu eröffnen.',
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
      'Der Abschnitt fehlt in den ältesten Handschriften des Johannesevangeliums und taucht in einigen Textzeugen an anderer Stelle auf, teils bei Lukas. Fachleute gehen deshalb überwiegend davon aus, dass er ursprünglich nicht zu diesem Evangelium gehörte – zugleich wird er meist als sehr alte, wahrscheinlich authentische Überlieferung eingeschätzt. Viele Bibelausgaben markieren ihn deshalb, drucken ihn aber ab.\n\nWas Jesus auf die Erde schreibt, sagt der Text nicht – und das ist einer der bekanntesten Leerstellen der Bibel. Vorschläge gab es viele: die Sünden der Ankläger, ein Gesetzeszitat, gar nichts Bestimmtes. Auffällig ist etwas anderes: Nach dem Gesetz mussten bei einer Steinigung die Zeugen den ersten Stein werfen, und beim Ehebruch waren beide Beteiligten zu bestrafen. Der Mann fehlt. Die Szene wendet das Recht nicht ab, sie hält es den Anklägern vor.',
    reception:
      'Der Satz vom ersten Stein ist in die Alltagssprache eingegangen, meist als Aufforderung, nicht zu urteilen. In der Alten Kirche galt der Abschnitt dagegen als heikel: Augustinus vermutete, er sei aus manchen Handschriften entfernt worden, weil man fürchtete, er ermuntere zum Ehebruch. Die Bußpraxis mancher Gemeinden sah tatsächlich keine Vergebung für Ehebruch vor.\n\nHeute wird der Text vor allem gegen Ehrenmorde und gegen Steinigungsurteile angeführt, die es in einzelnen Rechtsordnungen bis in die Gegenwart gibt. In der feministischen Auslegung steht die Beobachtung im Vordergrund, dass die Frau im ganzen Abschnitt bis zum vorletzten Vers kein Wort sagt und niemand sie fragt.',
    terms: [
      {
        word: 'griech. anamartetos',
        rendered: 'ohne Sünde',
        note: 'Ein sehr seltenes Wort, das hier zum einzigen Mal im Neuen Testament steht. Es kann „ohne Sünde überhaupt“ heißen und „ohne Schuld in dieser Sache“ – die zweite Lesart macht den Satz zu einer Frage an die Zeugen, nicht an die Menschheit.',
      },
      {
        word: 'griech. katakrino',
        rendered: 'verdamme',
        note: 'Ein juristisches Wort: verurteilen, das Urteil sprechen. Jesus spricht damit kein Freispruch über die Tat, sondern lehnt es ab, Richter zu sein – der Satz danach setzt die Tat als Tat voraus.',
      },
    ],
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
      {
        tradition: 'Rechtsgeschichtliche Beobachtung',
        text: 'Zur Zeit Jesu wurde die Todesstrafe für Ehebruch in Judäa faktisch nicht mehr vollstreckt; Kapitalurteile lagen beim römischen Statthalter. Die Frage der Ankläger ist deshalb nicht die eines Gerichts, sondern die einer Falle – und beide Antwortmöglichkeiten hätten Jesus geschadet.',
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
      'Die Wunden bleiben – das ist die stille Pointe der Szene. Der Auferstandene ist nicht der Unversehrte, sondern der Gezeichnete. Das Bekenntnis „Mein Herr und mein Gott“ war zugleich politisch heikel: Nach Sueton ließ sich Kaiser Domitian, unter dem das Evangelium vermutlich entstand, als „dominus et deus“ anreden. Wer den Satz zu Jesus sagte, sprach ihn einem anderen ab. Das Evangelium endet unmittelbar danach mit der Bemerkung, all dies sei geschrieben, damit die Lesenden glauben – Thomas steht also stellvertretend für sie.\n\nThomas bekommt einen schlechten Ruf, den der Text nicht hergibt. Er verlangt genau das, was die anderen bereits bekommen haben – Vers 20 sagt, Jesus habe ihnen Hände und Seite gezeigt, bevor sie sich freuten. Und dass er die Wunden berührt hätte, steht nirgends: Auf die Aufforderung folgt unmittelbar sein Bekenntnis. Bemerkenswert ist auch, dass er den weitesten Satz des ganzen Evangeliums spricht. Kein anderer nennt Jesus so direkt „mein Gott“.',
    reception:
      'Caravaggios Gemälde von 1602, auf dem Thomas den Finger in die Wunde legt, hat die Vorstellung endgültig geprägt – obwohl der Text diese Berührung nicht erzählt. Der „ungläubige Thomas“ ist als Redewendung geblieben, und mit ihm ein Zweifelsverdikt, das die Szene selbst nicht ausspricht.\n\nIn der Seelsorge und in der Predigt hat sich die Deutung weitgehend gedreht: Thomas gilt heute meist als der, der stellvertretend für alle späteren Leser fragt – und dessen Frage beantwortet wird, statt abgewiesen zu werden. Der Thomaschristentum Indiens führt sich zudem auf ihn zurück; die Thomas-Christen in Kerala berufen sich auf eine Mission des Apostels im 1. Jahrhundert.',
    terms: [
      {
        word: 'griech. apistos',
        rendered: 'ungläubig',
        note: 'Wörtlich „ohne Vertrauen“, nicht „zweifelnd“. Der Gegensatz im Satz ist nicht Wissen gegen Zweifel, sondern Misstrauen gegen Vertrauen.',
      },
      {
        word: 'griech. Didymos',
        note: 'Der Beiname des Thomas, den Johannes dreimal nennt: „Zwilling“ – dasselbe bedeutet der aramäische Name Toma. Wessen Zwilling er war, sagt kein Evangelium.',
      },
    ],
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
      {
        tradition: 'Historische Einordnung',
        text: 'Unter dem Namen des Thomas ist im 2. Jahrhundert ein Spruchevangelium überliefert, das 1945 in Nag Hammadi vollständig gefunden wurde. Es gehört nicht zum Kanon und stammt nicht von ihm, zeigt aber, dass die Gestalt in Teilen der frühen Christenheit besonderes Gewicht hatte.',
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
      'Die dreigliedrige Taufformel gehört zu den frühesten Belegen dieser Form; in der Apostelgeschichte wird dagegen „auf den Namen Jesu“ getauft. Das Verb „macht zu Jüngern“ ist der einzige Imperativ im Satz – „gehen“, „taufen“ und „lehren“ sind ihm sprachlich untergeordnet.\n\nDer Schluss nimmt den Anfang auf. Das Evangelium begann mit dem Namen Immanuel, „Gott mit uns“, und es endet mit „ich bin bei euch alle Tage“ – der Bogen ist über 28 Kapitel gespannt. Auffällig ist auch, dass Matthäus keine Himmelfahrt erzählt: Der Auferstandene geht nicht weg, sondern bleibt. Und der Ort ist ein Berg in Galiläa, nicht der Tempel in Jerusalem – dort, wo die Erzählung begonnen hatte, wo „das Volk im Finstern“ saß und wo die Bergpredigt gehalten wurde.',
    reception:
      'Aus diesen fünf Versen ist der Begriff „Missionsbefehl“ geworden, und mit ihm eine Geschichte, die Licht und Schatten hat. Sie trägt Bibelübersetzungen in über tausend Sprachen, Schulen und Krankenhäuser – und sie war zugleich das Begleitwort der europäischen Kolonisierung. Wo Mission und Landnahme zusammenfielen, wurde der Auftrag zur Rechtfertigung von Zwangstaufen und Kulturzerstörung.\n\nSeit der Weltmissionskonferenz von Edinburgh 1910 und stärker seit den 1960er Jahren haben die Kirchen das aufgearbeitet. Heutige Missionserklärungen betonen Dialog, Zeugnis ohne Zwang und die Absage an jede Verbindung von Verkündigung mit Macht; mehrere Kirchen haben sich bei indigenen Gemeinschaften ausdrücklich entschuldigt.',
    terms: [
      {
        word: 'griech. edistasan',
        rendered: 'zweifelten',
        note: 'Schwanken, unschlüssig sein – nicht theoretischer Zweifel. Matthäus gebraucht dasselbe Wort nur noch einmal: bei Petrus, der auf dem Wasser einbricht.',
      },
      {
        word: 'griech. matheteusate',
        note: 'Der einzige Befehlsform im Satz: „macht zu Schülern“. Luther gibt sie mit „lehret“ wieder; „gehen“, „taufen“ und „lehren“ sind ihr im Griechischen sprachlich untergeordnet.',
      },
    ],
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
      {
        tradition: 'Textgeschichtliche Beobachtung',
        text: 'Die dreigliedrige Taufformel steht im Neuen Testament nur hier; die Apostelgeschichte kennt durchgehend die Taufe „auf den Namen Jesu“. Ein Teil der Forschung sieht darin eine liturgische Fassung der Gemeinde, die in den Text eingegangen ist – ein früher Beleg dafür, wie Gottesdienst und Evangelienschreibung ineinandergriffen.',
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
      'Auffällig ist die Kargheit: kein Wort über Abrahams Gefühle, kein Wort über Saras Reaktion, und nach der Szene gehen Vater und Sohn getrennte Wege – von einer gemeinsamen Rückkehr ist nicht die Rede. Das Wort „Moria“ wird später mit dem Tempelberg gleichgesetzt. Im Judentum heißt der Abschnitt „Akeda“ (Bindung), nicht „Opferung“; der Akzent liegt dort auf Isaak, nicht auf Abraham.\n\nDer Erzähler nimmt dem Leser die Spannung im ersten Satz: Gott „versuchte“ Abraham – der Ausgang ist von Anfang an klar, für alle außer für Abraham. Auffällig ist auch die Sprache der Nähe, die der Text ausgerechnet hier häuft: „deinen einzigen Sohn, den du lieb hast“. Es ist die erste Stelle der Bibel, an der das Wort „lieben“ vorkommt. Und dreimal sagt Abraham dasselbe: „Hier bin ich“ – zu Gott, zu Isaak, zum Engel. Die Erzählung besteht aus lauter Auslassungen: Sara kommt nicht vor, Isaaks Alter bleibt offen, und was Abraham denkt, wird nie gesagt.',
    reception:
      'Im Judentum heißt der Abschnitt die Akeda, die „Bindung“, und wurde in den Verfolgungen des Mittelalters zum Text der Märtyrer: In den Klageliedern auf die Pogrome der Kreuzzugszeit gehen Eltern und Kinder gemeinsam in den Tod und rufen dabei Isaak an. Im Christentum wurde die Szene früh als Vorabbild der Kreuzigung gelesen – Isaak trägt das Holz wie Jesus den Balken.\n\nDie Kehrseite ist die Rechtfertigung von Gehorsam gegen jede Einsicht. Immanuel Kant hat dagegen den schärfsten Einwand formuliert: Abraham hätte antworten müssen, dass er sich sicher sei, kein Unrecht zu tun, aber nicht sicher sein könne, dass die Stimme Gott sei. Wer eine Stimme zum Töten hört, so Kant, muss sie deshalb zurückweisen.',
    terms: [
      {
        word: 'hebr. nissa',
        rendered: 'versuchte',
        note: 'Prüfen, erproben – dasselbe Wort wie beim Erproben einer Rüstung. Es geht nicht um Verführung zum Bösen, sondern darum, ob etwas trägt.',
      },
      {
        word: 'hebr. hinneni',
        rendered: 'Hier bin ich',
        note: 'Kein Ortshinweis, sondern eine Bereitschaftserklärung: „Ich höre, ich bin da.“ Dieselbe Antwort geben Mose am Dornbusch, Samuel im Tempel und Jesaja bei seiner Berufung.',
      },
    ],
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
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Manche lesen den Text nicht als Vorbild, sondern als Erfahrungsbericht: Es gibt Wege, auf denen ein Mensch verliert, woran sein Leben hängt, und keine Erklärung bekommt. Dass der Text darüber schweigt, was Abraham dabei empfindet, wird dann nicht als Lücke gelesen, sondern als Respekt.',
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
      'Der Text enthält zwei ineinandergeschobene Darstellungen: In der einen treibt ein Ostwind das Wasser zurück, in der anderen stehen die Fluten wie Mauern. Die Forschung sieht darin verschiedene Überlieferungsstränge. Das Lied in Kapitel 15 gilt sprachlich als einer der ältesten Texte der Bibel überhaupt.\n\nAuch der Ort ist unsicher. Das hebräische *jam suf* heißt „Schilfmeer“, nicht „Rotes Meer“; die Gleichsetzung stammt aus der griechischen Übersetzung und ist über Luther in den deutschen Sprachgebrauch gekommen. Gemeint ist eher einer der Sumpfseen östlich des Nildeltas. Bemerkenswert ist zudem der Satz in Vers 14: „Der HERR wird für euch streiten, und ihr werdet still sein.“ Die Erzählung schildert eine Befreiung, in der die Befreiten nichts tun – ein Zug, der die spätere Deutung des Auszugs entscheidend geprägt hat.',
    reception:
      'Kein alttestamentlicher Text hat mehr Befreiungsbewegungen getragen. In den Spirituals der versklavten Afroamerikaner ist der Auszug das Grundmotiv – „Go down, Moses“ –, und Martin Luther King griff es in seinen Reden auf. Die lateinamerikanische Befreiungstheologie machte den Exodus zum Schlüssel des ganzen Alten Testaments, ebenso Bewegungen in Südafrika und Osteuropa.\n\nDie Kehrseite steht im selben Kapitel: Die Rettung der einen ist der Untergang der anderen. Der Midrasch erzählt, die Engel hätten singen wollen, als die Ägypter ertranken, und Gott habe sie zurechtgewiesen: Meine Geschöpfe ertrinken, und ihr singt? Beim Sederabend werden deshalb Tropfen Wein aus dem Becher genommen – die Freude ist gemindert.',
    terms: [
      {
        word: 'hebr. jam suf',
        rendered: 'Meer',
        note: 'Schilfmeer. Erst die griechische Bibel machte daraus die *erythra thalassa*, das Rote Meer – eine Gleichsetzung, die Luther übernahm und die die Vorstellung bis heute prägt.',
      },
      {
        word: 'hebr. jeschua',
        rendered: 'Heil',
        note: 'Rettung, Befreiung – etwas, das geschieht, nicht ein Zustand nach dem Tod. Aus derselben Wurzel kommt der Name Jesus.',
      },
    ],
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
      {
        tradition: 'Befreiungstheologie',
        text: 'Der Text wird in Basisgemeinden Lateinamerikas als Beleg gelesen, dass Übermacht nicht das letzte Wort hat. Kritisch angemerkt wird zugleich, wie oft mächtige Staaten sich selbst in der Rolle Davids sehen.',
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
      {
        tradition: 'Machtkritische Lesart',
        text: 'Die Erzählung gilt als Musterfall dafür, wie Kritik an Mächtigen funktionieren kann: Nathan erzählt einen Fall, lässt den König selbst urteilen und dreht das Urteil dann um. Erst danach fällt der Name.',
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
      {
        tradition: 'Kritische Rückfrage',
        text: 'Das Kapitel endet mit der Tötung der Baalspropheten. Ein erheblicher Teil heutiger Auslegung weigert sich, diesen Schluss zu übergehen, und hält fest, dass der Text ihn erzählt, ohne ihn zu rechtfertigen.',
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
      'Die Serafim sind wörtlich „die Brennenden“ – geflügelte Wesen, wie sie auch auf altorientalischen Siegeln erscheinen. Der Auftrag ist verstörend formuliert: Der Prophet soll reden, damit das Volk gerade nicht versteht. Die Forschung sieht darin eine rückblickende Deutung des ausgebliebenen Erfolgs, nicht eine Absicht von Anfang an.\n\nDie Berufung ist genau datiert: im Todesjahr des Königs Usia, etwa 740 vor Christus. Das ist kein Beiwerk – der irdische König stirbt, und der Prophet sieht den wirklichen König auf dem Thron. Bemerkenswert ist auch die Reihenfolge: Zwischen der Vision und der Sendung steht das Eingeständnis „ich bin unreiner Lippen“, und erst danach kommt die Kohle vom Altar. Nicht Eignung führt zum Auftrag, sondern der Auftrag ergeht an einen, der sich für ungeeignet hält. Und auf Jesajas Frage „Wie lange?“ kommt eine Antwort, die niemand hören will: bis die Städte verwüstet sind.',
    reception:
      'Der Ruf der Seraphim ist als Sanctus in jede christliche Abendmahlsliturgie eingegangen – „Heilig, heilig, heilig“ wird in Ost und West seit dem 4. Jahrhundert gesungen, und im Judentum steht die Keduscha an entsprechender Stelle im Gebet. Es ist damit einer der wenigen Sätze, die Synagoge und Kirche gemeinsam singen.\n\nDer Verstockungsauftrag hat eine belastete Nachgeschichte: Er wird im Neuen Testament mehrfach zitiert, um die Ablehnung Jesu durch Teile Israels zu erklären, und wurde in der christlichen Auslegung zur Begründung einer angeblichen Blindheit der Juden. Neuere Auslegung liest ihn zurück in seinen Zusammenhang – als Selbstdeutung eines gescheiterten Propheten, nicht als Urteil über ein Volk.',
    terms: [
      {
        word: 'hebr. qadosch',
        rendered: 'Heilig',
        note: 'Nicht „moralisch gut“, sondern „abgesondert, anders“. Die dreifache Wiederholung ist im Hebräischen die stärkste Form der Steigerung – der einzige Ort im Alten Testament, an dem ein Wort dreimal gesetzt wird.',
      },
      {
        word: 'hebr. seraphim',
        rendered: 'Seraphim',
        note: 'Von der Wurzel „brennen“ – die Brennenden. Dasselbe Wort bezeichnet anderswo Schlangen; die geflügelten Uräusschlangen der ägyptischen Königsikonographie sind der wahrscheinliche Hintergrund.',
      },
    ],
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
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Zwischen Vision und Sendung steht das Eingeständnis „ich bin unreiner Lippen“. Erst danach kommt die Kohle vom Altar. Wer den Text auf Berufung hin liest, findet hier die Reihenfolge: nicht Eignung, dann Auftrag, sondern Auftrag an einen, der sich für ungeeignet hält.',
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
      'Neu ist nicht der Inhalt: Es bleibt dieselbe Weisung. Neu ist der Ort – sie soll „ins Herz geschrieben“ werden, statt auf Tafeln zu stehen. Damit entfällt auch die Belehrung von außen: „Einer wird den andern nicht mehr lehren.“ Das Neue Testament trägt seinen Namen nach diesem Text; die lateinische Übersetzung von „Bund“ lautet testamentum.\n\nDie Begründung steht am Schluss, und sie ist nicht das, was man erwartet: Nicht menschliche Besserung trägt den neuen Bund, sondern Vergebung – „denn ich will ihnen ihre Missetat vergeben und ihrer Sünden nimmermehr gedenken“. Der Abschnitt gehört zum sogenannten Trostbüchlein der Kapitel 30 bis 33, das in einer Lage entstand, in der von Bund, Tempel und Königtum kaum etwas übrig war. Und die Adresse ist ausdrücklich genannt: „das Haus Israel und das Haus Juda“ – die beiden Reiche, die seit zweihundert Jahren getrennt waren.',
    reception:
      'Die griechische Übersetzung dieses Verses hat der zweiten Hälfte der christlichen Bibel ihren Namen gegeben: *diatheke kaine*, Neues Testament. Der Hebräerbrief zitiert den Abschnitt in voller Länge und folgert, der erste Bund sei damit veraltet – der Satz, aus dem über Jahrhunderte die Enterbungslehre wurde, nach der die Kirche an Israels Stelle getreten sei.\n\nDiese Lehre haben die Kirchen im 20. Jahrhundert weithin widerrufen. Die Rheinische Synode formulierte 1980, Gottes Bund mit seinem Volk sei nie gekündigt worden; römische Dokumente sprechen seither vom „nie widerrufenen Bund“. Dass gerade dieser Vers die Namensgebung trägt, macht die Korrektur nicht leichter.',
    terms: [
      {
        word: 'hebr. berit chadascha',
        rendered: 'Bund',
        note: 'Der einzige Ort im Alten Testament, an dem von einem „neuen Bund“ die Rede ist. Das hebräische Wort für neu meint erneuert, wiederhergestellt – nicht: an die Stelle eines anderen tretend.',
      },
      {
        word: 'hebr. jada',
        rendered: 'kennen',
        note: 'Erkennen im Sinn eines Verhältnisses, nicht einer Information. Dasselbe Verb steht für das eheliche Erkennen. „Sie sollen mich alle kennen“ heißt: unmittelbar, ohne Vermittlung.',
      },
    ],
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
      {
        tradition: 'Kritische Rückfrage',
        text: 'Der Bund wird ausdrücklich „mit dem Hause Israel und mit dem Hause Juda“ geschlossen, nicht mit einem anderen Volk. Wer den Text auf die Kirche bezieht, muss diesen Adressaten mitlesen – oder erklären, warum er ihn ersetzt. Die neuere Auslegung hält das für den Prüfstein jeder Deutung dieses Kapitels.',
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
      'Das hebräische Wort ruach bedeutet zugleich Wind, Atem und Geist – der Text spielt in wenigen Versen alle drei Bedeutungen durch. Die Deutung liefert der Text selbst mit: Gemeint ist die Heimkehr des Volkes, noch nicht die Auferstehung Einzelner.\n\nDer Aufbau geht in zwei Gängen. Erst kommen Adern, Fleisch und Haut, aber kein Odem – ein Feld voller vollständiger, aber toter Körper; erst der zweite Auftrag bringt den Wind. Das ist dieselbe Reihenfolge wie in 1. Mose 2, wo Gott den Menschen aus Erde formt und ihm dann Atem einbläst. Auffällig ist außerdem, dass der Prophet zweimal selbst reden muss: Nicht Gott spricht die Gebeine an, sondern Hesekiel auf seinen Befehl hin. Und auf die Frage, ob diese Gebeine wieder lebendig werden, antwortet er weder ja noch nein, sondern: „Herr HERR, das weißt du wohl.“',
    reception:
      'Das Bild ist zum Inbegriff der Hoffnung gegen den Augenschein geworden. In den Spirituals – „Dem Bones“ – wurde daraus ein Lied, das die Anatomie durchbuchstabiert; nach 1945 und in der Erinnerung an die Schoah ist die Vision zu einem der meistzitierten Texte überhaupt geworden, und Wandbilder in der Synagoge von Dura Europos zeigen sie schon im 3. Jahrhundert.\n\nDie Auslegung auf die leibliche Auferstehung der Toten ist erst später gewachsen; im Judentum ist der Text ein Hauptbeleg dafür geworden, im Christentum steht er in der Osternacht. Der Text selbst gibt beides nicht her – und schließt es auch nicht aus.',
    terms: [
      {
        word: 'hebr. ruach',
        rendered: 'Odem',
        note: 'Wind, Atem, Geist – dasselbe Wort. In diesem Kapitel steht es zehnmal und wechselt dabei die Bedeutung; im Deutschen braucht es dafür drei verschiedene Wörter, was den Zusammenhang zerreißt.',
      },
      {
        word: 'hebr. ben adam',
        rendered: 'Menschenkind',
        note: 'Die Anrede, mit der Gott den Propheten über neunzigmal anspricht: „Sohn Adams“, also schlicht: Mensch. Sie betont den Abstand zwischen dem Redenden und dem Angeredeten.',
      },
    ],
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
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der Text wird am Sabbat der Zwischentage von Pessach gelesen. Die Deutung bleibt dort, wo der Text selbst sie ansiedelt: bei der Rückkehr des Volkes, nicht bei der Auferstehung Einzelner.',
      },
      {
        tradition: 'Politische Lesart',
        text: 'Die Deutung im Text spricht von Rückkehr ins eigene Land und von der Wiedervereinigung der getrennten Reiche. Im Streit um den Staat Israel wird das Kapitel deshalb von religiös-zionistischer Seite als Erfüllung gelesen; andere Ausleger halten dagegen, dass eine prophetische Zusage keine Landkarte ist und der Text keine politische Ordnung legitimiert.',
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
      {
        tradition: 'Befreiungstheologie',
        text: 'Die Antwort der drei – Gott könne retten, aber auch wenn er es nicht tut, bleibe es beim Nein – wird als Grundmuster gewaltlosen Widerstands gelesen: Der Gehorsam hängt nicht am Ausgang.',
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
      'Der Ertrag von dreißig-, sechzig- und hundertfach lag weit über dem Üblichen; realistisch waren etwa fünf- bis zehnfache Ernten. Die Deutung, die der Text mitliefert, gilt vielen Fachleuten als spätere Auslegung der Gemeinde – das Gleichnis selbst wirkt zunächst offen und ohne Zuordnung.\n\nDas Gleichnis steht am Anfang eines ganzen Kapitels aus Gleichnissen, und Matthäus rahmt es doppelt: Zwischen Erzählung und Deutung stehen die Verse über das Reden in Gleichnissen und das Zitat aus Jesaja 6. Auffällig ist die Zählung: drei erfolglose Böden, ein guter – aber dessen Ertrag ist so hoch, dass er alles andere aufwiegt. Und im Griechischen ist der letzte Satz eine Aufforderung, keine Feststellung: „Wer Ohren hat zu hören, der höre.“ Damit gibt der Text die Deutung an die Zuhörer zurück, bevor er selbst eine liefert.',
    reception:
      'Der Sämann gehört zu den ersten Gleichnissen, die in der Kunst dargestellt wurden, und ist über Jahrhunderte als Selbstprüfung gepredigt worden: Welcher Boden bist du? Die neuere Gleichnisforschung seit Adolf Jülicher hat dieser Allegorese widersprochen – ein Gleichnis habe einen Vergleichspunkt, nicht ein Wörterbuch von Entsprechungen.\n\nDie mitgelieferte Deutung in den Versen 18 bis 23 gilt vielen Fachleuten selbst als frühe Auslegung der Gemeinde: Ihr Wortschatz ist der der späteren Missionssprache. Damit steht im Text ein bemerkenswerter Fall – eine Auslegung, die in die Bibel hineingewachsen ist und dort neben dem Ausgelegten steht.',
    terms: [
      {
        word: 'griech. parabole',
        rendered: 'Gleichnisse',
        note: 'Wörtlich „das Danebengeworfene“ – etwas, das man neben eine Sache legt, um sie zu erklären. Das hebräische *maschal* dahinter ist weiter: Es umfasst Sprichwort, Rätsel und Spottlied.',
      },
      {
        word: 'griech. skandalizetai',
        rendered: 'ärgert',
        note: 'Von *skandalon*, dem Stellholz einer Falle: zu Fall kommen, straucheln. In der Deutung des Gleichnisses geht es also nicht um Verärgerung, sondern um Menschen, die unter Druck den Halt verlieren.',
      },
    ],
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
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Wer das Gleichnis als Prüfung liest, kommt bei sich selbst schlecht weg – wenige halten sich für guten Boden. Manche lesen es deshalb vom Sämann her: Er sät verschwenderisch, auf Weg, Fels und Dornen, ohne vorher zu sortieren. Der Ertrag ist dann keine Leistung des Bodens, sondern eine Folge dessen, dass überhaupt gesät wurde.',
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
      'Der Abschnitt ist die Mitte des Markusevangeliums: Von hier an geht der Weg nach Jerusalem. Petrus hat mit seinem Bekenntnis recht und versteht doch nichts – kaum ausgesprochen, weist er die Leidensankündigung zurück und wird schärfer zurechtgewiesen als jeder Gegner im ganzen Buch. „Kreuz auf sich nehmen“ war keine Metapher: Verurteilte trugen den Querbalken selbst zum Hinrichtungsort.\n\nUnmittelbar vor der Szene steht eine ungewöhnliche Heilung: Ein Blinder wird geheilt, aber erst beim zweiten Anlauf – zunächst sieht er Menschen „wie Bäume umhergehen“. Markus setzt sie mit Absicht hierhin. Petrus sieht ebenfalls halb: Er erkennt den Christus und erkennt nicht, wohin dessen Weg führt. Auffällig ist auch das Schweigegebot: Sooft in diesem Evangelium jemand die Wahrheit über Jesus ausspricht, wird ihm der Mund verboten – bis unter dem Kreuz ein römischer Hauptmann sie ausspricht und niemand ihn mehr zurückhält.',
    reception:
      'Das „Kreuz auf sich nehmen“ ist zur Redewendung für alles geworden, was jemand zu tragen hat – Krankheit, ein schwieriger Mensch, eine Last. Der Ursprung ist konkreter: Verurteilte trugen den Querbalken selbst zum Hinrichtungsort, und wer das Bild hörte, sah einen Zug zum Galgen.\n\nSeelsorgliche Literatur warnt seit Jahrzehnten vor der übertragenen Verwendung. Wo Menschen in Gewaltbeziehungen geraten sind, ist ihnen der Satz als Aufforderung zum Ausharren gesagt worden; die Selbstverleugnung, von der der Text spricht, meint eine Entscheidung, nicht ein Erleiden.',
    terms: [
      {
        word: 'griech. christos',
        note: 'Die griechische Übersetzung von „Messias“, dem Gesalbten. Kein Eigenname, sondern ein Titel mit politischem Klang: erwartet wurde ein König, der die Fremdherrschaft beendet.',
      },
      {
        word: 'griech. psyche',
        rendered: 'Leben',
        note: 'Leben, Seele, Selbst – dasselbe Wort steht in Vers 35 zweimal für „Leben“ und in Vers 36 für „Seele“. Der Wortlaut spricht nicht von einem Jenseitsschicksal, sondern davon, was einer aus sich macht.',
      },
    ],
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
      {
        tradition: 'Historische Einordnung',
        text: 'Caesarea Philippi lag am Rand des jüdischen Siedlungsgebiets, an einer Quelle mit einem Pan-Heiligtum und einem Tempel für Augustus, den Herodes hatte errichten lassen. Dass die Frage nach dem Messias ausgerechnet dort gestellt wird – vor der Kulisse römischer und griechischer Verehrung –, gehört zur Komposition des Markus.',
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
      'Die Erzählung ist sorgfältig gebaut: Zuerst wird der Schrift nachgegangen, dann wird das Brot gebrochen – erst dann werden die Augen geöffnet, und im selben Moment verschwindet er. Viele sehen darin den Ablauf des frühen Gottesdienstes gespiegelt: Wort und Mahl. Einer der beiden heißt Kleopas, der andere bleibt namenlos.\n\nDie Erzählung ist eine Umkehrung des Ostermorgens: Zwei gehen von Jerusalem weg, nicht hin, und sie gehen am selben Tag. Auffällig ist, was sie nicht erkennen und was sie doch spüren – „brannte nicht unser Herz“ sagen sie hinterher über eine Stunde, in der sie nichts begriffen. Und der Text hält die Reihenfolge fest: Erst als das Brot gebrochen ist, werden die Augen geöffnet, und im selben Augenblick verschwindet er. Erkennen und Festhalten schließen sich hier aus.',
    reception:
      'Die Emmauserzählung gilt vielen Liturgikern als Bauplan des Gottesdienstes: Weg, Klage, Schriftauslegung, Mahl, Aufbruch. Sie ist deshalb in den liturgischen Reformen des 20. Jahrhunderts, katholisch wie evangelisch, als Begründungstext für die Gleichgewichtung von Wort und Mahl herangezogen worden.\n\nIn der Kunst ist die Szene vor allem als Mahl dargestellt worden – Rembrandt hat sie mehrfach gemalt, Caravaggio zweimal. Auffällig ist, wie oft dabei der Moment des Verschwindens gewählt wird und nicht der des Erkennens.',
    terms: [
      {
        word: 'griech. diermeneusen',
        rendered: 'legte ihnen alle Schriften aus',
        note: 'Auslegen, übersetzen, verständlich machen – daher unser Wort Hermeneutik. Lukas beschreibt die Szene als Schriftauslegung, nicht als Offenbarung neuer Inhalte.',
      },
      {
        word: 'griech. klasei tou artou',
        rendered: 'brach',
        note: 'Das Brotbrechen ist in der Apostelgeschichte der stehende Ausdruck für die Zusammenkunft der Gemeinde. Wer den Bericht damals hörte, hörte darin die eigene Feier.',
      },
    ],
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
      {
        tradition: 'Begleitung von Trauernden',
        text: 'Der Fremde fragt zuerst und lässt die beiden ihre Enttäuschung ausreden – „wir aber hofften“. Erst danach redet er selbst. In der Trauerbegleitung wird diese Reihenfolge oft als Muster genannt: nicht die Deutung zuerst, sondern die Frage, und Zeit für die Antwort.',
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
      'Juden und Samaritaner stritten seit Jahrhunderten darüber, wo Gott anzubeten sei – auf dem Garizim oder in Jerusalem. Genau diese Frage stellt die Frau, und die Antwort verschiebt sie: weder hier noch dort. Die fünf Männer werden im Text nicht bewertet; sie können auf Verwitwung oder Verstoßung zurückgehen, worüber eine Frau damals nicht selbst entschied. Am Ende wird sie zur ersten Verkündigerin außerhalb Israels.\n\nDas Gespräch ist das längste, das im Neuen Testament überliefert ist – und es wird mit einer Frau geführt, deren Namen niemand kennt. Auffällig ist der Aufbau: Sie beginnt bei Wasser, wechselt zu Vorfahren, dann zum Streit über den richtigen Berg, und Jesus geht auf jede Verschiebung ein, ohne das Thema zu wechseln. Am Ende geht sie in die Stadt und lässt den Krug stehen, um den es die ganze Zeit ging. Ihre Botschaft ist dabei keine Lehre, sondern eine Frage: „Ist er nicht der Christus?“',
    reception:
      'In den Ostkirchen trägt die Frau einen Namen: Photine, die Leuchtende, und sie wird als Märtyrerin und Apostelgleiche verehrt. Die westliche Auslegung hat sie dagegen jahrhundertelang auf die fünf Männer reduziert und zur Sünderin gemacht – eine Deutung, die der Text nicht stützt, weil er ihr Verhalten an keiner Stelle bewertet.\n\nDie Verse 21 bis 24 haben eine eigene Geschichte: Der Satz, dass Gott im Geist und in der Wahrheit angebetet wird, wurde von der Reformation gegen Wallfahrtsorte und Reliquien angeführt und im 19. Jahrhundert gegen die Bindung an Kirchengebäude überhaupt. Der Zusammenhang ist enger – gestritten wurde über zwei bestimmte Berge.',
    terms: [
      {
        word: 'griech. hydor zon',
        rendered: 'lebendiges Wasser',
        note: 'Im gewöhnlichen Sprachgebrauch fließendes Quellwasser im Gegensatz zum stehenden Zisternenwasser. Das Missverständnis der Frau ist deshalb naheliegend – sie hört zuerst die Alltagsbedeutung.',
      },
      {
        word: 'griech. ego eimi',
        rendered: 'Ich bin\'s',
        note: 'Wörtlich „ich bin“ – dieselbe Formel wie in der Antwort Gottes am Dornbusch. Johannes gebraucht sie mehrfach doppeldeutig; hier ist es das erste Mal im Evangelium, dass sich Jesus so zu erkennen gibt, und er tut es gegenüber einer Samaritanerin.',
      },
    ],
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
      {
        tradition: 'Historische Einordnung',
        text: 'Die Samaritaner sind keine Sekte, sondern eine eigenständige Gemeinschaft mit eigener Tora und dem Heiligtum auf dem Garizim; die Trennung von Jerusalem reicht in die persische Zeit zurück. Etwa achthundert Angehörige leben bis heute in Israel und im Westjordanland und feiern auf dem Garizim das Passa.',
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
      'Die Rede zitiert keine Bibelstelle, sondern griechische Dichter. Sie ist damit der Versuch, das Evangelium ganz in der Sprache der Zuhörer zu sagen. Bei der Auferstehung bricht die Zustimmung ab: Für griechisches Denken war die Unsterblichkeit der Seele vorstellbar, die Auferstehung des Leibes nicht. Der Ertrag fällt entsprechend gering aus – nur wenige schließen sich an.\n\nDer Areopag war zu dieser Zeit kein Gerichtshof für Kapitalverbrechen mehr, aber weiterhin ein Rat mit Aufsicht über Religion und Lehre in der Stadt. Ob Paulus dort angeklagt wurde oder nur angehört, lässt Lukas offen – das Verb kann beides heißen. Auffällig ist der Einstieg: Was in Vers 16 als Ärgernis beschrieben wird, „voller Götzenbilder“, verwandelt Paulus in der Anrede in ein Kompliment. Und der Altar für den unbekannten Gott, an den er anknüpft, war in Athen kein Bekenntnis zur Offenheit, sondern eine Vorsichtsmaßnahme: Man wollte keine Gottheit übergehen.',
    reception:
      'Die Areopagrede ist der Musterfall für jede Debatte über Anknüpfung: Darf man das Evangelium in fremder Sprache sagen, mit fremden Begriffen, ohne die Bibel zu zitieren? Karl Barth hielt das für einen Irrweg und sah in dem mageren Ertrag den Beweis; Paul Tillich und die katholische Missionstheologie sahen darin das Vorbild einer Verkündigung, die ernst nimmt, was Menschen schon glauben.\n\nDie zitierten Dichter sind identifizierbar: „In ihm leben, weben und sind wir“ geht wohl auf Epimenides zurück, „wir sind seines Geschlechts“ auf Arat von Soloi. Ein Prediger, der heidnische Dichtung zitiert und keine Schriftstelle, war in der Alten Kirche selbst begründungsbedürftig.',
    terms: [
      {
        word: 'griech. deisidaimonesterous',
        rendered: 'die Götter fürchtet',
        note: 'Ein bewusst doppeldeutiges Wort: „sehr gottesfürchtig“ und „abergläubisch“. Wer wohlwollend hörte, hörte Lob; wer misstrauisch war, hörte Spott. Luther entscheidet sich für die freundliche Lesart.',
      },
      {
        word: 'griech. anastasis',
        rendered: 'Auferstehung',
        note: 'Aufstehen, Auferstehung. In Vers 18 verstehen die Athener das Wort offenbar als Namen einer Gottheit neben Jesus – ein Missverständnis, das Lukas beiläufig festhält.',
      },
    ],
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
      {
        tradition: 'Literarische Beobachtung',
        text: 'Die Rede ist nach den Regeln antiker Rhetorik gebaut: freundliche Anrede, Anknüpfung, Beweisführung, Aufruf. Ein Teil der Forschung hält sie deshalb für eine Komposition des Lukas, wie sie bei antiken Geschichtsschreibern üblich war – Reden gaben wieder, was zur Lage passte, nicht unbedingt, was gesagt wurde.',
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
      'Die Aufzählung der Zeugen ist bemerkenswert: über fünfhundert auf einmal, „von denen die meisten noch leben“ – eine Einladung zur Nachfrage. Auffällig ist zugleich, dass die Frauen am Grab, die alle vier Evangelien nennen, in dieser Liste fehlen; ihr Zeugnis galt vor Gericht nichts. Paulus setzt sich selbst ans Ende, als „unzeitige Geburt“.\n\nDie Formel ist an ihrem Aufbau erkennbar: viermal „dass“, parallel gebaut, mit zwei Ereignissen – gestorben, begraben – und zwei Bestätigungen – auferstanden, gesehen worden. Zweimal steht „nach der Schrift“, ohne dass eine Stelle genannt wird. Und sie enthält Wörter, die Paulus sonst nicht gebraucht, sowie den aramäischen Namen Kephas statt Petrus. Genau daran erkennt die Forschung, dass er hier zitiert: Der Text ist älter als der Brief und führt näher an die ersten Jahre heran als jeder andere.',
    reception:
      'Weil Paulus schreibt, viele der fünfhundert lebten noch, ist der Abschnitt in der Apologetik zum Beweisstück geworden: Man könne ja nachfragen. Historiker halten dagegen, dass eine solche Aufforderung an Leser in Korinth praktisch nicht einlösbar war und dass die Formel ein Bekenntnis ist, kein Protokoll.\n\nUnbestritten ist ihr Alter. Die meisten Forscher datieren sie in die 30er Jahre, also in die ersten Jahre nach dem Tod Jesu – auch solche, die die Auferstehung nicht für ein historisches Ereignis halten. Damit ist sicher, dass die Überzeugung nicht über Jahrzehnte gewachsen ist, sondern von Anfang an dastand. Wie sie entstand, bleibt die eigentliche Streitfrage.',
    terms: [
      {
        word: 'griech. paredoka / parelabon',
        rendered: 'empfangen',
        note: 'Beides Fachwörter für die Weitergabe von Überliefertem; sie entsprechen den hebräischen Ausdrücken der rabbinischen Lehrkette. Paulus sagt damit ausdrücklich, dass er nicht der Urheber ist.',
      },
      {
        word: 'griech. ophthe',
        rendered: 'gesehen worden',
        note: 'Eine Passivform: „er wurde gesehen“ oder „er ließ sich sehen“. Dasselbe Wort gebraucht die griechische Bibel für Gotteserscheinungen. Ob damit ein Sehen mit Augen gemeint ist oder ein Widerfahrnis, wird seit Jahrhunderten diskutiert.',
      },
    ],
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
      {
        tradition: 'Feministische Exegese',
        text: 'In der Zeugenliste fehlen die Frauen, die in allen vier Evangelien zuerst am Grab stehen. Ihr Zeugnis galt vor Gericht nichts, und eine Bekenntnisformel, die überzeugen sollte, ließ es weg. Dass die Evangelien es dennoch überliefern, gilt umgekehrt als Argument für dessen Alter.',
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
      'Der Abschnitt steht in einer Auseinandersetzung mit Gegnern, die sich auf Erfahrungen und Erfolge beriefen. Paulus antwortet mit einer „Narrenrede“: Er zählt auf, worauf er sich berufen könnte, und stellt dann ausgerechnet seine Schwäche in die Mitte. Dass er von der Entrückung in der dritten Person spricht, gehört zu dieser Zurückhaltung.\n\nDie Antwort, die Paulus zitiert, steht im Perfekt: „er hat zu mir gesagt“ – ein für allemal, nicht als Trost von Fall zu Fall. Und sie beantwortet die Bitte nicht, sondern verschiebt sie: Der Pfahl bleibt. Auffällig ist auch die Zuschreibung – der Pfahl heißt „des Satans Engel“ und ist zugleich „gegeben“, also von Gott zugelassen. Der Text löst diese Spannung nicht auf. Was aus einem Menschen wird, der dreimal vergeblich bittet, erzählt er in einem einzigen Satz: „darum bin ich gutes Muts in Schwachheiten“.',
    reception:
      'Der Satz von der Kraft, die in den Schwachen mächtig ist, gehört zu den meistgesprochenen in der Krankenseelsorge und bei Beerdigungen. Er hat auch eine schädliche Verwendung: Wo Leiden als Mittel der Erziehung ausgegeben wird, bekommen Kranke die Verantwortung für ihren Zustand zugewiesen. Der Text selbst sagt weder, wozu der Pfahl gut ist, noch dass Paulus ihn behalten wollte – er hat dreimal um sein Ende gebeten.\n\nWorum es sich handelte, ist seit der Alten Kirche geraten worden: Augenleiden, Malaria, Epilepsie, Anfechtungen, Gegner. Luther las den Pfahl als geistliche Anfechtung, moderne Ausleger meist als körperliches Leiden. Der Text lässt es offen, und diese Offenheit ist wohl der Grund, warum sich so viele darin wiederfinden.',
    terms: [
      {
        word: 'griech. skolops',
        rendered: 'Pfahl',
        note: 'Ein spitzer Pfahl oder ein Splitter, der in der Haut steckt. Luthers „Pfahl ins Fleisch“ betont das Große, die Bedeutung „Dorn“ das Kleine und Dauerhafte – beides ist möglich, und die Wahl färbt die ganze Auslegung.',
      },
      {
        word: 'griech. arkei',
        rendered: 'genügen',
        note: 'Ausreichen, hinreichen. Das Wort ist nüchtern: Es verspricht keine Fülle, sondern dass es reicht. Der Satz ist keine Zusage von Kraft, sondern von Genügen.',
      },
    ],
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
      {
        tradition: 'Rhetorische Beobachtung',
        text: 'Die Kapitel 10 bis 13 sind als „Narrenrede“ gebaut: Paulus übernimmt die Sprache seiner Gegner, zählt Herkunft und Leistungen auf – und kippt die Liste in eine Aufzählung von Schlägen, Schiffbrüchen und Ängsten. Die antike Rhetorik kannte diese Figur; sie funktioniert nur, wenn der Leser merkt, dass sie gespielt ist.',
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
      'Der Name „Babel“ bedeutet auf Akkadisch „Tor Gottes“; die Erzählung deutet ihn stattdessen vom hebräischen Wort für „verwirren“ her – ein Wortspiel, das die Selbstdarstellung der Großmacht ins Gegenteil verkehrt. Auffällig ist auch, was nicht dasteht: von Hochmut ist ausdrücklich nicht die Rede, wohl aber von der Furcht, „zerstreut zu werden“. Kritisiert wird also eher die erzwungene Einheit als der Ehrgeiz.\n\nDer Erzähler spielt mit Sprache, wie er sie zum Thema macht. „Wohlauf, laßt uns bauen“ sagen die Menschen – „Wohlauf, laßt uns herniederfahren“ sagt Gott, in derselben Wendung. Auch die Bauweise ist genau beobachtet: Ziegel statt Stein und Erdharz statt Kalk beschreiben Mesopotamien; im steinreichen Palästina baute man anders. Gemeint ist eine Zikkurat, ein Stufentempel, wie er in Babylon stand. Und der Turm bleibt am Ende nicht zerstört, sondern unfertig – die Erzählung berichtet kein Strafgericht, sondern einen Abbruch.',
    reception:
      'Der Turm ist zum Bild für menschliche Selbstüberhebung geworden – bei Bruegel ebenso wie in der Rede von babylonischer Sprachverwirrung. In der Auslegungsgeschichte wurde daraus oft eine Warnung vor Technik und Größe überhaupt; der Text selbst nennt aber kein Bauwerk als Sünde, sondern die Absicht dahinter.\n\nEine zweite Wirkung ist politisch: Weil die Erzählung ein imperiales Zentrum zeigt, das alle gleichmachen will, ist sie in der Ökumene zum Text gegen sprachliche und kulturelle Vereinheitlichung geworden. Pfingsten gilt dabei nicht als Rücknahme der Vielfalt, sondern als deren Verständlichwerden.',
    terms: [
      {
        word: 'hebr. schem',
        rendered: 'Namen',
        note: 'Name, Ruf, Denkmal. „Sich einen Namen machen“ heißt: dem Vergessen entgehen. Genau das verspricht Gott ein Kapitel später Abraham – ohne Turm.',
      },
      {
        word: 'hebr. balal',
        rendered: 'verwirrt',
        note: 'Vermischen, durcheinanderbringen. Der Gleichklang zu „Babel“ ist ein Wortspiel des Erzählers, keine sprachwissenschaftliche Ableitung.',
      },
    ],
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
      {
        tradition: 'Sozialgeschichtliche Lesart',
        text: 'Zikkurats wurden mit Fronarbeit gebaut. Wer die Erzählung von den Bauleuten her liest statt von den Bauherren, hört weniger eine Warnung vor Hochmut als eine Kritik an einem Reich, das Menschen für seinen Namen verbraucht.',
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
      'Religionsgeschichtlich vermutet die Forschung zwei ältere Feste im Hintergrund – ein Hirtenfest mit dem Erstlingslamm und ein Bauernfest mit ungesäuertem Brot –, die hier zu einem Fest der Befreiung verbunden werden. Der Text richtet sich ausdrücklich an kommende Generationen: „Ihr sollt diesen Tag haben zum Gedächtnis.“ Erinnerung ist damit selbst ein Gebot.\n\nDer Abschnitt ist keine Erzählung, sondern eine Gottesdienstordnung mitten in einer Erzählung – die Anweisungen unterbrechen die Handlung genau an ihrem Höhepunkt. Auffällig ist die Anweisung zur Eile: gegürtet, beschuht, den Stab in der Hand. Gefeiert wird im Stehen, als könnte der Aufbruch jeden Moment kommen. Auffällig ist auch die Größenordnung: Ein Lamm pro Haus, und wenn ein Haushalt zu klein ist, tut er sich mit dem Nachbarn zusammen. Das Fest setzt keine Priester und keinen Tempel voraus, sondern Familien – deshalb hat es das Ende des Tempels überstanden.',
    reception:
      'Der Sederabend ist bis heute der wichtigste häusliche Gottesdienst des Judentums, und seine Grundfrage stammt aus diesem Kapitel: Warum ist diese Nacht anders als alle anderen Nächte? Erinnerung geschieht dort nicht als Bericht, sondern als Wiederholung – jede Generation soll sich verstehen, als sei sie selbst ausgezogen.\n\nDie christliche Deutung auf Jesus als Passalamm hat eine dunkle Kehrseite. Weil Kreuzigung und Passa zeitlich zusammenfielen, wurde die Karwoche über Jahrhunderte zur gefährlichsten Zeit des Jahres für jüdische Gemeinden in Europa; die Ritualmordlegende knüpfte gezielt an das Passafest an. Kirchliche Erklärungen des 20. Jahrhunderts haben diese Verleumdungen ausdrücklich zurückgenommen.',
    terms: [
      {
        word: 'hebr. pesach',
        rendered: 'Passah',
        note: 'Die Ableitung ist unsicher; der Text selbst verbindet sie mit „vorübergehen“. Über das Griechische *pascha* kommt daraus das deutsche Wort „Paschalamm“ und der romanische Name für Ostern.',
      },
      {
        word: 'hebr. mazza',
        note: 'Das ungesäuerte Brot. Weil es ohne Gärung auskommt, ist es in Stunden fertig – der Text deutet es als Brot der Eile, nicht als Fastenspeise.',
      },
    ],
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
      {
        tradition: 'Liturgische Beobachtung',
        text: 'Die Feier des Sederabends durch christliche Gemeinden ist umstritten. Befürworter sehen darin ein Verstehen der eigenen Wurzeln; jüdische Stimmen und viele Kirchen halten dagegen, dass ein fremder Gottesdienst nicht nachgespielt werden sollte – erst recht nicht in einer Deutung, die ihn auf Christus hin auflöst.',
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
      {
        tradition: 'Jüdische Liturgie',
        text: 'Jom Kippur ist bis heute der höchste Feiertag des Judentums. Nach der Tempelzerstörung traten Fasten, Gebet und Umkehr an die Stelle des Opfers – die Deutung des Tages hat sich also grundlegend gewandelt, ohne dass der Tag verlorenging.',
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
      'Der Segen ist kunstvoll gebaut: drei Zeilen von wachsender Länge, in denen der Gottesname dreimal vorkommt. Er wird nicht über das Volk als Ganzes gesprochen, sondern in der Einzahl – „dich“, „dir“. Das Bild vom leuchtenden Angesicht meint Zuwendung; das Abwenden des Angesichts ist in der Bibel das Zeichen für Distanz.\n\nWas der Segen zusagt, steigert sich mit seiner Länge: erst Bewahrung, dann Zuwendung, zuletzt Frieden. Und er endet nicht mit Vers 26: Der Satz danach sagt, wozu das Ganze gut ist – die Priester sollen den Namen Gottes „auf die Kinder Israel legen“, und Gott selbst werde sie segnen. Der Segen ist damit keine Bitte des Priesters, sondern eine Zusage, die durch ihn hindurchgeht. Die beiden Silberröllchen von Ketef Hinnom, auf denen der Wortlaut steht, waren so fein gerollt, dass es Jahre dauerte, sie zu öffnen; getragen wurden sie am Hals.',
    reception:
      'Der aaronitische Segen steht am Ende fast jedes evangelischen und katholischen Gottesdienstes und wird im Judentum von den Nachkommen Aarons in der Synagoge gesprochen. Er ist damit der Text, den die meisten Menschen im deutschen Sprachraum am häufigsten hören, ohne zu wissen, wo er steht.\n\nAus dem Wortlaut leiten viele Kirchen ihre Segenspraxis ab: erhobene Hände, Blick zur Gemeinde, Anrede in der Einzahl. Im Judentum ist der Priestersegen an die Nachkommen Aarons gebunden und wird mit gespreizten Fingern gesprochen – eine Handhaltung, die über einen Schauspieler in einer Fernsehserie zum bekanntesten Gruß des Science-Fiction-Genres wurde.',
    terms: [
      {
        word: 'hebr. panim',
        rendered: 'Angesicht',
        note: 'Gesicht, Zuwendung, Gegenwart. Das Angesicht leuchten lassen heißt: freundlich ansehen; das Angesicht verbergen heißt im Alten Testament das Gegenteil und ist eine der härtesten Aussagen überhaupt.',
      },
      {
        word: 'hebr. schalom',
        rendered: 'Frieden',
        note: 'Das letzte Wort des Segens und sein Ziel: Unversehrtheit, Auskommen, heile Verhältnisse – nicht bloß Ruhe.',
      },
    ],
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
      {
        tradition: 'Archäologische Einordnung',
        text: 'Zwei winzige Silberrollen aus Ketef Hinnom bei Jerusalem tragen diesen Segen und stammen aus dem 7. oder 6. Jahrhundert v. Chr. Es sind die ältesten bekannten Handschriften eines biblischen Textes überhaupt – über vier Jahrhunderte älter als die Rollen von Qumran.',
      },
      {
        tradition: 'Traditionsgeschichtliche Beobachtung',
        text: 'Dass der Wortlaut schon vor dem Exil als Amulett getragen wurde, spricht dafür, dass der Segen älter ist als die priesterliche Schrift, in der er heute steht – und dass er von Anfang an nicht nur im Tempel, sondern im Alltag gebraucht wurde.',
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
      {
        tradition: 'Wirkungsgeschichte',
        text: 'Jesus führt die Geschichte in Nazareth an – und löst damit den Zorn aus, der ihn beinahe das Leben kostet. Dass ein syrischer Feldherr geheilt wurde und kein Israelit, war der anstößige Punkt.',
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
      {
        tradition: 'Wirkungsgeschichte in der Musik',
        text: 'Händel setzt den Vers an den Anfang des dritten Teils des „Messiah“. Die Vertonung hat die Stelle für viele endgültig zum Osterlied gemacht – im Buch Hiob steht sie mitten in der Anklage.',
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
      'Der berühmte Katalog mündet in eine unbequeme Feststellung: Gott hat „die Ewigkeit in ihr Herz gelegt“, aber der Mensch kann das Werk Gottes nicht durchschauen. Kohelet zieht daraus keine Resignation, sondern eine schlichte Folgerung – essen, trinken und im Tun Gutes sehen. Das Wort, das Luther mit „eitel“ übersetzt, heißt wörtlich „Hauch“ und meint eher Flüchtigkeit als Nichtigkeit.\n\nDie vierzehn Gegensatzpaare sind kein Trost, sondern eine Bestandsaufnahme – und sie enthalten Zeiten, die sich niemand wünscht: töten, abbrechen, hassen, Krieg. Auffällig ist, dass der Mensch in dieser Liste nicht handelt: Er kommt in keinem der Verse als Subjekt vor. Die Zeiten sind da; wer in welcher steht, entscheidet er nicht. Genau darin liegt die Zumutung des Abschnitts, und sie erklärt, warum er sich schlecht als Lebensweisheit verwenden lässt – als Aufforderung, den richtigen Augenblick zu treffen, ist er nicht gemeint.',
    reception:
      'Der Abschnitt gehört zu den meistgelesenen Bibeltexten bei Beerdigungen und Jahreswechseln – und ist durch Pete Seegers Lied *Turn! Turn! Turn!*, 1965 von den Byrds an die Spitze der amerikanischen Charts gebracht, zum wohl bekanntesten vertonten Bibeltext des 20. Jahrhunderts geworden. Seeger fügte dem Text nur vier Worte hinzu: „I swear it’s not too late“.\n\nIn der Auslegung wird der Abschnitt gern als Aufforderung zur Gelassenheit gelesen. Kohelet selbst zieht eine nüchternere Folgerung: Weil der Mensch das Ganze nicht überblickt, soll er essen, trinken und bei seiner Arbeit guten Mutes sein – das sei Gottes Gabe.',
    terms: [
      {
        word: 'hebr. et',
        rendered: 'Zeit',
        note: 'Der bestimmte, richtige Zeitpunkt – nicht die verrinnende Zeit. Das Hebräische unterscheidet, wo das Deutsche nur ein Wort hat.',
      },
      {
        word: 'hebr. hebel',
        note: 'Das Leitwort des ganzen Buches, von Luther mit „eitel“ übersetzt: Hauch, Windhauch, Nichtigkeit. Nicht „sinnlos“, sondern flüchtig – etwas, das man nicht festhalten kann.',
      },
    ],
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
      {
        tradition: 'Wirkungsgeschichte in der Musik',
        text: 'Der Text ist als Popsong um die Welt gegangen, seit Pete Seeger ihn 1959 fast wörtlich vertonte. Kaum ein biblischer Abschnitt ist außerhalb der Kirchen so verbreitet.',
      },
      {
        tradition: 'Kanonische Beobachtung',
        text: 'Dass ein so skeptisches Buch überhaupt in die Bibel kam, war umstritten; die rabbinische Überlieferung berichtet von Streit darüber. Erhalten blieb es wohl auch wegen des frommen Schlusses in Kapitel 12, den viele Ausleger für einen späteren Zusatz halten. Die Sammlung hält damit einen Widerspruch aus, statt ihn zu glätten.',
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
      {
        tradition: 'Ostkirchliche Auslegung',
        text: 'Die orthodoxe Tradition liest die Stelle im Zusammenhang der Morgenliturgie: Der Tag beginnt mit der Zusage, dass Erbarmen nicht aufgebraucht werden kann.',
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
    title: '„Mein Herz ist andern Sinnes“',
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
    title: '„Es soll aber das Recht offenbart werden wie Wasser“',
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
        tradition: 'Wirkungsgeschichte im 20. Jahrhundert',
        text: 'Martin Luther King zitierte den Vers in seiner Rede „I Have a Dream“ und machte ihn zu einer Losung der Bürgerrechtsbewegung.',
      },
      {
        tradition: 'Kritische Einordnung',
        text: 'Amos verkündet zunächst kein Heil. Die tröstlichen Schlussverse des Buches gelten vielen Fachleuten als spätere Ergänzung.',
      },
      {
        tradition: 'Wirkungsgeschichte',
        text: 'Martin Luther King zitierte den Vers in seiner Rede am Lincoln Memorial 1963. Er ist über die Bürgerrechtsbewegung zu einem der bekanntesten Prophetenworte überhaupt geworden.',
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
      'Der König wird „gerecht und ein Helfer“ genannt – die hebräische Form ist passiv und meint eher „dem geholfen wurde“ als „der hilft“. Er ist also selbst ein Empfangender. Der hebräische Parallelismus nennt „einen Esel“ und „ein Füllen der Eselin“; gemeint ist ein Tier, nicht zwei. Matthäus hat die Doppelung wörtlich genommen und schildert entsprechend zwei Tiere – ein bekanntes Beispiel dafür, wie ein Zitat die Erzählung formen kann. Die angekündigte Herrschaft reicht „von einem Meer zum andern“, wird aber ausdrücklich ohne Waffen ausgeübt.\n\nDer Einzug ist bewusst gegen das Bild des siegreichen Feldherrn gesetzt. Ein Herrscher zog nach einem Feldzug auf dem Pferd ein; der Esel war das Reittier des Friedens und in älterer Zeit auch das der Fürsten. Der Abschnitt gehört zudem zum zweiten Teil des Sacharjabuchs, der sprachlich deutlich vom ersten abweicht und meist später datiert wird. Wer die Verse für sich liest, sollte wissen, was unmittelbar davor und danach steht: Gerichtsworte über die Nachbarvölker. Der Friedenskönig kommt in einem sehr unfriedlichen Zusammenhang.',
    reception:
      'Alle vier Evangelien erzählen den Einzug in Jerusalem, Matthäus und Johannes zitieren diesen Vers ausdrücklich. Matthäus liest die hebräische Doppelung – „auf einem Esel und auf einem jungen Füllen“ – als zwei Tiere; sie ist im Hebräischen eine übliche Wiederholung desselben Gedankens. An dieser Stelle lässt sich besonders gut beobachten, wie ein Evangelist ein Prophetenwort auslegt.\n\nDer Palmsonntag lebt bis heute von dieser Szene, mit Prozessionen, Palmzweigen und dem Palmesel als Bildwerk. Politisch gelesen ist der Einzug eine Gegendemonstration: Ein wehrloser König reitet in eine Stadt ein, in der zum Fest römische Truppen aufmarschierten.',
    terms: [
      {
        word: 'hebr. ani',
        rendered: 'arm',
        note: 'Elend, gebeugt, ohne Macht. Nicht in erster Linie eine Aussage über Besitz, sondern über Schutzlosigkeit – dasselbe Wort steht für die, deren Recht die Propheten einklagen.',
      },
      {
        word: 'hebr. noscha',
        rendered: 'Helfer',
        note: 'Grammatisch eine passive Form: „einer, dem geholfen wurde“ – nicht der Helfer, sondern der Gerettete. Luther übersetzt aktiv; die meisten neueren Ausgaben folgen der passiven Form.',
      },
    ],
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
      {
        tradition: 'Liturgische Rezeption',
        text: 'Der Vers wird am Palmsonntag gelesen. Das Reittier ist der Punkt: Ein König, der auf einem Esel kommt, kommt nicht als Sieger von einem Feldzug zurück.',
      },
      {
        tradition: 'Kritische Einordnung',
        text: 'Der Abschnitt gehört zum zweiten Teil des Sacharjabuchs, der sprachlich und inhaltlich deutlich vom ersten abweicht und meist später datiert wird. Wer die Verse für sich liest, sollte wissen, dass unmittelbar davor und danach Gerichtsworte über Nachbarvölker stehen – der Friedenskönig steht in einem sehr unfriedlichen Zusammenhang.',
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
      'Umstritten ist, worauf sich „dieser Fels“ bezieht: auf die Person des Petrus, auf sein Bekenntnis oder auf Christus selbst. Alle drei Deutungen sind alt und lassen sich am Text vertreten. „Schlüssel“ und „binden und lösen“ sind rabbinische Wendungen für die Vollmacht, verbindlich auszulegen und über Zugehörigkeit zu entscheiden. Nur wenige Verse später wird derselbe Petrus „Satan“ genannt.\n\nDer Abschnitt hat eine Parallele bei Markus, und der Vergleich ist aufschlussreich: Dort bekennt Petrus ebenfalls, aber die Verse über den Felsen, die Schlüssel und das Binden und Lösen fehlen vollständig. Ein Teil der Forschung sieht darin eine Zufügung des Matthäus, die die Stellung des Petrus in seiner Gemeinde spiegelt; andere halten sie für alte Überlieferung, die Markus nicht aufgenommen hat. Bemerkenswert ist zudem, dass dieselbe Vollmacht zum Binden und Lösen zwei Kapitel später der ganzen Gemeinde zugesprochen wird.',
    reception:
      'Die Verse 18 und 19 stehen in meterhohen Buchstaben unter der Kuppel des Petersdoms und sind der biblische Grund, auf den sich der römische Primat beruft. Das Erste Vatikanische Konzil erklärte 1870 den Jurisdiktionsprimat und die Unfehlbarkeit des Papstes und stützte sich dabei zentral auf diese Stelle.\n\nDie Reformatoren bestritten nicht den Text, sondern die Folgerung: Luther bezog den Felsen auf das Bekenntnis, Calvin auf Christus. Die orthodoxen Kirchen sehen in Petrus einen Ehrenvorrang, aber keine Vollmacht über andere Bischöfe. Der Streit um diesen einen Satz ist bis heute der härteste Punkt in jedem ökumenischen Gespräch über Kirchenleitung.',
    terms: [
      {
        word: 'griech. ekklesia',
        rendered: 'Gemeinde',
        note: 'Versammlung – im griechischen Alten Testament das Wort für die versammelte Gemeinde Israels, im Alltag die Bürgerversammlung einer Stadt. Es steht in den Evangelien nur bei Matthäus, und nur zweimal.',
      },
      {
        word: 'griech. pylai hadou',
        rendered: 'Pforten der Hölle',
        note: 'Die Tore der Unterwelt, nicht ein Ort der Strafe. Tore sind in dieser Bildsprache nichts Angreifendes: Das Bild sagt, dass der Tod die Gemeinde nicht festhalten kann, nicht dass er sie berennt.',
      },
    ],
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
      'Der Denar trug das Bild des Kaisers und die Aufschrift „Tiberius Caesar, Sohn des vergöttlichten Augustus“ – für fromme Juden ein doppelter Anstoß. Dass die Fragesteller die Münze sofort zur Hand haben, entlarvt sie beiläufig. Die Antwort entscheidet nichts, sondern gibt die Frage zurück: Was trägt Gottes Bild? Nach 1. Mose 1 der Mensch.\n\nDie Antwort ist keine Zweireichelehre, sondern eine Gegenfrage mit einer offenen Kante. Was dem Kaiser gehört, ist am Bild zu erkennen; was Gott gehört, bleibt unausgesprochen – und wer 1. Mose 1 im Ohr hat, weiß, welches Wesen Gottes Bild trägt. Auffällig ist auch die Zusammensetzung der Fragesteller: Pharisäer und Herodianer, sonst Gegner, treten hier gemeinsam auf. Die einen lehnten die römische Steuer ab, die anderen lebten von der römischen Ordnung – eine Antwort hätte in jedem Fall die eine Seite gegen Jesus aufgebracht.',
    reception:
      'Aus diesem Vers ist die abendländische Lehre von den zwei Bereichen gewachsen – bei Augustinus, bei Luther in der Unterscheidung der beiden Regimente, im modernen Verhältnis von Kirche und Staat. Er hat Religionsfreiheit begründen helfen und ebenso den Rückzug der Kirchen aus der Politik.\n\nDie Kehrseite ist gut dokumentiert: Im 19. und 20. Jahrhundert diente der Vers regelmäßig dazu, kirchlichen Widerspruch gegen staatliches Unrecht als Grenzüberschreitung abzuweisen. Die Barmer Theologische Erklärung von 1934 setzte dem entgegen, dass es keine Bereiche gebe, in denen Christus nicht Herr sei – ein direkter Widerspruch gegen die verbreitete Auslegung dieses Satzes.',
    terms: [
      {
        word: 'griech. eikon',
        rendered: 'Bild',
        note: 'Bild, Abbild. Dasselbe Wort steht in der griechischen Bibel in 1. Mose 1,27 für den Menschen als Bild Gottes – die Verbindung war für die Hörer greifbar.',
      },
      {
        word: 'griech. apodote',
        rendered: 'gebet',
        note: 'Nicht schlicht „geben“, sondern zurückgeben, erstatten. Die Münze wird dem zurückgegeben, dem sie ohnehin gehört; der Satz spricht von Rückgabe, nicht von Zuteilung.',
      },
    ],
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
      {
        tradition: 'Sozialgeschichtliche Lesart',
        text: 'Die Kopfsteuer betrug einen Denar, also einen Tagelohn, und war seit der Provinzwerdung Judäas 6 nach Christus fällig. Ihre Einführung löste den Aufstand des Judas Galiläus aus. Wer nach ihr fragte, fragte nach einem Konflikt mit Toten – die Frage war nicht theoretisch.',
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
      'Der Anstoß liegt nicht in der Heilung, sondern im Satz „Dir sind deine Sünden vergeben“. Die Passivform vermeidet den Gottesnamen; genau das wird als Anmaßung verstanden. Bemerkenswert ist, dass der Text vom Glauben der Freunde spricht, nicht von dem des Kranken – Glaube erscheint hier als etwas, das andere für einen aufbringen können.\n\nDie Erzählung ist ineinandergeschoben: Eine Heilungsgeschichte wird mitten im Satz von einem Streitgespräch unterbrochen und danach zu Ende erzählt – Markus tut das im ganzen Evangelium, und der Einschub trägt jedes Mal die Pointe. Auffällig ist zudem, dass niemand um Heilung bittet. Vier Männer graben ein Dach auf, und Jesus reagiert auf etwas, das gar nicht gesagt wurde. Was er dann sagt, ist nicht, was alle erwarten.',
    reception:
      'Das Bild der vier Männer, die ein Dach abdecken, ist zum Standardbild für Fürbitte und Begleitung geworden – in Predigten, in der Hospizarbeit, in Selbsthilfegruppen. Auch die Redewendung „nimm dein Bett und geh“ hat den Weg in die Alltagssprache gefunden, meist als Aufforderung, sich nicht länger hängen zu lassen; im Text ist sie das Gegenteil einer Aufforderung, nämlich eine Zusage.\n\nDie Verbindung von Krankheit und Sünde hat dagegen eine schädliche Wirkungsgeschichte. Der Vers ist verwendet worden, um Kranken eine Schuld zuzuschreiben. Auslegern zufolge stellt der Text diesen Zusammenhang gerade nicht her: Er stellt zwei Aussagen nebeneinander und fragt, welche schwerer ist.',
    terms: [
      {
        word: 'griech. apheontai',
        rendered: 'sind dir vergeben',
        note: 'Eine Passivform ohne genannten Urheber – im Judentum eine übliche Weise, den Gottesnamen zu vermeiden. Genau das macht den Satz doppeldeutig: Er kann heißen „Gott vergibt dir“ oder „ich vergebe dir“, und der Streit hängt an dieser Lücke.',
      },
      {
        word: 'griech. paralytikos',
        rendered: 'Gichtbrüchigen',
        note: 'Ein Gelähmter. Luthers „gichtbrüchig“ war im 16. Jahrhundert der Ausdruck für Lähmung; mit der heutigen Gicht hat es nichts zu tun.',
      },
    ],
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
      {
        tradition: 'Archäologische Beobachtung',
        text: 'Häuser in Kapernaum waren aus Basaltbruchstein gebaut, die Dächer aus Balken, Zweigen und gestampftem Lehm – ein Aufbrechen war mit einfachem Werkzeug möglich und in wenigen Stunden zu reparieren. Markus’ Wort „aufgraben“ beschreibt den Vorgang genau; Lukas, der für ein städtisches Publikum schreibt, macht daraus Ziegel.',
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
      'Die Abweisung ist hart: „Es ist nicht fein, dass man den Kindern das Brot nehme und werfe es vor die Hunde.“ Die Frau widerspricht nicht, sondern nimmt das Bild auf und dreht es um. Der Text stellt nicht dar, dass Jesus sie prüfen wollte – er lässt die Härte stehen und erzählt, dass ihre Antwort ihn umstimmt.\n\nDie Frau bekommt gleich drei Zuschreibungen, die sie im Erzählzusammenhang disqualifizieren: Sie ist eine Frau, eine Griechin und aus Syrophönizien – also aus der wohlhabenden Küstenregion, die das Hinterland Galiläa mit Getreide versorgte. Ihr Argument nimmt dabei genau das Bild auf, mit dem sie abgewiesen wurde, und verschiebt es um ein Wort: nicht die Hunde draußen, sondern die Hündlein unter dem Tisch. Sie bestreitet die Rangfolge nicht, sie besteht auf einem Platz darin. Und es ist das einzige Mal in den Evangelien, dass jemand mit einem Wort etwas erreicht, was zuvor abgelehnt wurde.',
    reception:
      'Der Abschnitt gehört zu denen, die in der Predigt lange geglättet wurden: Jesus habe die Frau nur prüfen wollen, sein Ton sei freundlich gemeint gewesen. Der Text sagt davon nichts. Die neuere Auslegung lässt die Härte stehen – und liest die Szene als Lernvorgang, an dessen Ende Jesus seine eigene Zusage weiter fasst als zuvor.\n\nIn der postkolonialen Theologie ist die Frau zu einer Schlüsselfigur geworden: eine Angehörige der wirtschaftlich stärkeren, politisch privilegierten Seite, die dennoch als Bittstellerin auftritt und deren Widerspruch etwas verändert. In feministischen Auslegungen gilt sie als die einzige, die im Neuen Testament eine Diskussion gegen Jesus gewinnt.',
    terms: [
      {
        word: 'griech. kynaria',
        rendered: 'Hündlein',
        note: 'Verkleinerungsform: die Hunde, die im Haus leben, nicht die streunenden. Ob die Verkleinerung die Härte mildert oder ob sie erst durch die Antwort der Frau ins Bild kommt, wird verschieden beurteilt.',
      },
      {
        word: 'griech. logos',
        rendered: 'Wortes',
        note: 'Um dieses Wortes willen – gemeint ist ihre Entgegnung. Nicht Glaube wird hier gelobt wie sonst bei Markus, sondern ein Argument.',
      },
    ],
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
      {
        tradition: 'Vergleichende Beobachtung',
        text: 'Matthäus erzählt dieselbe Szene und verschärft sie zunächst – dort schweigt Jesus erst und sagt dann, er sei nur zu den verlorenen Schafen des Hauses Israel gesandt –, lobt am Ende aber ausdrücklich ihren Glauben. Markus lobt ihr Wort. Der Unterschied zeigt, wie zwei Evangelisten mit demselben schwierigen Stoff verschieden umgehen.',
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
      'Das Motiv der Umkehrung der Verhältnisse nach dem Tod ist auch aus ägyptischen und rabbinischen Erzählungen bekannt; Jesus greift eine bekannte Form auf. Die Pointe liegt aber nicht in der Jenseitsschilderung, sondern im Schlusssatz: Wer auf Mose und die Propheten nicht hört, wird sich auch durch einen Auferstandenen nicht überzeugen lassen. Vorgeworfen wird dem Reichen nichts Kriminelles – nur, dass er den Armen vor seiner Tür täglich übersah.\n\nDie Jenseitsschilderung folgt Vorstellungen, die in der Zeit umliefen, und ist nicht als Landkarte gemeint: Abrahams Schoß, die Kluft, der Blick von einem Bereich in den anderen. Auffällig ist, dass der Reiche auch dort noch redet, als sei Lazarus sein Bedienter – er bittet nicht ihn, sondern Abraham, ihn zu schicken. Der Text erzählt keine Bekehrung, sondern eine Unbelehrbarkeit. Und die Pointe liegt nicht im Jenseits: Sie steht im letzten Satz, der von Mose und den Propheten spricht.',
    reception:
      'Aus dem Namen ist ein Wort geworden: Lazarett und Lazarus-Orden gehen auf ihn zurück, ebenso die mittelalterlichen Leprosenhäuser. Das Bild von Abrahams Schoß hat Grabmäler und Kirchenfenster geprägt und über Bachs Kantaten den Weg in die Musik gefunden.\n\nIn der Sozialgeschichte ist das Gleichnis einer der meistzitierten Texte gegen Gleichgültigkeit. Dem Reichen wird nichts Kriminelles vorgeworfen – er hat nichts geraubt und niemanden betrogen. Ihm wird vorgeworfen, dass er täglich über einen Menschen hinwegsah, der vor seiner Tür lag und dessen Namen er kannte.',
    terms: [
      {
        word: 'griech. hades',
        rendered: 'Hölle',
        note: 'Der Totenbereich der griechischen Vorstellung, in der Bibel Übersetzung des hebräischen Scheol – nicht der Ort endgültiger Strafe, für den das Neue Testament „Gehenna“ sagt. Luthers „Hölle“ deckt beide Wörter ab und verwischt den Unterschied.',
      },
      {
        word: 'griech. Lazaros',
        rendered: 'Lazarus',
        note: 'Griechische Form von Eleasar, „Gott hilft“. Es ist die einzige Gestalt in allen Gleichnissen Jesu, die einen Namen bekommt – und es ist der Arme, nicht der Reiche.',
      },
    ],
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
      {
        tradition: 'Religionsgeschichtliche Einordnung',
        text: 'Die Umkehrung der Verhältnisse nach dem Tod ist aus einem ägyptischen Text über Setne Chamwas und aus rabbinischen Erzählungen bekannt. Jesus greift eine bekannte Gattung auf – und ändert am Schluss die Pointe: Nicht der Blick ins Jenseits soll die Lebenden umstimmen, sondern was sie ohnehin schon lesen können.',
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
      'Auffällig ist die Bitte: „Gedenke an mich, wenn du in dein Reich kommst“ – sie rechnet mit einer fernen Zukunft. Die Antwort verschiebt den Zeitpunkt auf „heute“, ein Schlüsselwort des Lukasevangeliums. Der Mann bringt keine Leistung mit, nicht einmal Zeit; er wird angenommen, wie er ist.\n\nLukas verändert die Szene gegenüber Markus deutlich: Dort verspotten ihn beide Mitgekreuzigten, hier tritt einer dazwischen. Auffällig ist, was dieser sagt – er hält das eigene Urteil für gerecht und Jesu Urteil für ungerecht, spricht also ein juristisches Urteil aus, kein frommes Bekenntnis. Und seine Bitte ist bescheiden: nur „gedenke an mich“. Was er bekommt, ist mehr, als er verlangt hat, und früher: nicht irgendwann, sondern heute.',
    reception:
      'Der Satz gehört zu den am häufigsten gesprochenen Worten am Sterbebett und ist der biblische Kern der katholischen Sterbesakramente wie der evangelischen Aussegnung. Die Reformatoren führten ihn gegen die Lehre vom Fegefeuer an: Zwischen dem Sterben und dem Paradies liegt hier nichts.\n\nDie Kommasetzung ist dabei zum Streitpunkt geworden. Wer liest „Wahrlich, ich sage dir heute: du wirst mit mir im Paradiese sein“, verschiebt das „heute“ zur Redeeinleitung und macht die Zusage zeitlich offen. Die griechischen Handschriften kennen keine Kommas; die große Mehrheit der Ausleger hält die traditionelle Lesart für die naheliegende.',
    terms: [
      {
        word: 'griech. paradeisos',
        rendered: 'Paradiese',
        note: 'Ein persisches Lehnwort für einen umfriedeten Park. Im griechischen Alten Testament steht es für den Garten Eden; in der Zeit Jesu bezeichnete es den Ort der Gerechten nach dem Tod. Im Neuen Testament kommt es nur dreimal vor.',
      },
      {
        word: 'griech. semeron',
        rendered: 'Heute',
        note: 'Ein Schlüsselwort des Lukasevangeliums: „heute ist euch der Heiland geboren“, „heute ist diese Schrift erfüllt“, „heute ist diesem Hause Heil widerfahren“. Es steht immer da, wo etwas nicht mehr aufgeschoben wird.',
      },
    ],
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
      {
        tradition: 'Historische Beobachtung',
        text: 'Das griechische Wort für die beiden Mitgekreuzigten meint bei Markus Räuber im Sinn von Aufständischen; Lukas gebraucht ein neutraleres Wort für Übeltäter. Kreuzigung war die Strafe für Sklaven und politische Aufrührer – wer neben Jesus hing, war mit hoher Wahrscheinlichkeit kein Dieb.',
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
      'Johannes erzählt kein Abendmahl; an dessen Stelle steht diese Szene. Der Widerstand des Petrus ist verständlich: Die Umkehrung der Rollen war schwerer zu ertragen als ein Dienst. Am Ende steht kein Gefühl, sondern ein Auftrag – „so sollt auch ihr einander die Füße waschen“.\n\nZwei Sätze rahmen die Szene und werden selten mitgelesen. Vor der Handlung steht, dass Jesus wusste, dass ihm der Vater alles in die Hände gegeben hatte – und genau daraufhin steht er auf und zieht sich aus. Der Text stellt die Erniedrigung nicht als Verzicht auf Macht dar, sondern als deren Gebrauch. Und mitten in der Szene sitzt Judas mit am Tisch: Ihm werden die Füße gewaschen wie den anderen. Das Wort „bis ans Ende“ in Vers 1 kann beides heißen – bis zum Schluss und bis zum Äußersten.',
    reception:
      'Die Fußwaschung am Gründonnerstag ist in der katholischen und in vielen evangelischen Liturgien fester Bestandteil; Papst Franziskus wusch sie ab 2013 in Gefängnissen und Flüchtlingsunterkünften, auch Frauen und Nichtchristen, und änderte 2016 die Rubrik entsprechend. In Teilen der Täuferbewegung – bei Mennoniten und Amischen – gilt sie als eigene Ordnung neben Taufe und Abendmahl.\n\nDie Zeremonie hat auch eine höfische Geschichte: Englische und habsburgische Monarchen wuschen zu Gründonnerstag Armen die Füße, oft in stark ritualisierter Form. Kritiker sahen darin früh das Gegenteil dessen, was die Szene erzählt – eine Demutsgeste, die Rang bestätigt statt ihn aufzuheben.',
    terms: [
      {
        word: 'griech. eis telos',
        rendered: 'bis ans Ende',
        note: 'Zeitlich „bis zuletzt“ und der Sache nach „bis zum Äußersten“. Johannes lässt beides offen, und beides trifft: Es ist der letzte Abend, und was folgt, geht bis zum Letzten.',
      },
      {
        word: 'griech. hypodeigma',
        rendered: 'Beispiel',
        note: 'Ein Muster zum Nachmachen, nicht ein Bild zum Betrachten. Das Wort gehört in den Bereich von Vorlage und Modell – der Satz danach macht daraus einen Auftrag.',
      },
    ],
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
      {
        tradition: 'Textliche Beobachtung',
        text: 'Johannes berichtet kein Abendmahl mit Brot und Wein, obwohl er das Mahl ausführlich erzählt. Ein Teil der Forschung sieht die Fußwaschung an dessen Stelle gesetzt; andere verweisen auf die Brotrede in Kapitel 6, in der Johannes die Abendmahlssprache bereits untergebracht hat.',
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
      'Die Erzählung nimmt sich auffällig viel Raum – die Vision wird gleich mehrfach wiederholt. Petrus muss selbst überzeugt werden: Seine Antwort auf die Aufforderung, Unreines zu essen, ist ein glattes Nein. Die Wende formuliert er erst, nachdem er den Geist bei den Anwesenden wirken sieht: „Nun erfahre ich mit der Wahrheit, dass Gott die Person nicht ansieht.“ Kornelius wird als „gottesfürchtig“ bezeichnet – ein feststehender Ausdruck für Nichtjuden im Umfeld der Synagoge.\n\nLukas erzählt die Geschichte dreimal – hier, dann in Petrus’ Rechtfertigung vor der Gemeinde in Kapitel 11, dann noch einmal beim Apostelkonzil in Kapitel 15. Kein anderer Vorgang bekommt in der Apostelgeschichte so viel Raum; das ist die Art, wie Lukas Gewicht anzeigt. Auffällig ist die Reihenfolge der Einsicht: Der Geist kommt über die Anwesenden, bevor sie getauft sind, und Petrus zieht daraus die Folgerung – nicht umgekehrt. Die Entscheidung fällt an einer Erfahrung, nicht an einem Argument.',
    reception:
      'Die Kornelius-Erzählung ist der Kerntext für jede kirchliche Debatte über Aufnahme und Grenzen geworden – von den Missionskonferenzen des 19. Jahrhunderts bis zu den Auseinandersetzungen um Rassentrennung. In den amerikanischen Kirchen der Bürgerrechtszeit gehörte der Satz „Gott sieht die Person nicht an“ zu den meistzitierten überhaupt.\n\nIn jüngerer Zeit wird das Kapitel in Debatten über den Umgang mit Homosexualität herangezogen, und zwar von beiden Seiten: Die einen sehen darin das Muster, dass Erfahrung eine überlieferte Ordnung aufbrechen kann; die anderen halten dagegen, dass hier eine Zusage der Schrift selbst eingelöst werde und die Lage nicht vergleichbar sei.',
    terms: [
      {
        word: 'griech. prosopolemptes',
        note: 'Wörtlich „einer, der das Gesicht nimmt“ – eine Übersetzung der hebräischen Wendung für Parteilichkeit im Gericht. Petrus gebraucht das Wort in Vers 34: Gott sieht „die Person nicht an“. Der Satz sagt nicht, dass Gott alle gleich behandelt, sondern dass er nicht nach Ansehen entscheidet.',
      },
      {
        word: 'griech. phoboumenos ton theon',
        note: 'Die „Gottesfürchtigen“ waren eine feste Größe: Nichtjuden, die sich an die Synagoge hielten, ohne beschnitten zu sein. Aus dieser Gruppe kamen viele der ersten Christen außerhalb Judäas.',
      },
    ],
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
      {
        tradition: 'Historische Beobachtung',
        text: 'Cäsarea Maritima war Sitz des römischen Statthalters und eine überwiegend nichtjüdische Hafenstadt. Ein Hauptmann der „italischen Schar“ gehörte zur Besatzungsmacht – die Erzählung spielt also nicht am Rand, sondern im Zentrum der Fremdherrschaft, gegen die ein Teil der Bewegung sich richtete.',
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
      'Der Zusammenhang wird oft übersehen: Unmittelbar davor steht das Verbot der Vergeltung, unmittelbar danach das Gebot der Liebe als „Erfüllung des Gesetzes“. Anlass war vermutlich eine konkrete Lage – Steuerunruhen in Rom und die Rückkehr zuvor vertriebener Judenchristen. Der Text nennt zudem eine Bedingung: Die Obrigkeit ist „Gottes Dienerin, dir zugut“. Was gilt, wenn sie das Gegenteil tut, sagt er nicht.\n\nAuffällig ist, was der Abschnitt nicht sagt. Es fehlt jede Bestimmung, welche Ordnung gemeint ist – kein Wort über Recht, Verfassung oder Herrschaftsform. Es fehlt auch jede Aussage über den Gehorsam gegenüber einer Obrigkeit, die Böses tut; der Text beschreibt die staatliche Gewalt in ihrer Aufgabe und stellt die Rückfrage gar nicht. Und er ist kurz: Sieben Verse in einem Brief von sechzehn Kapiteln, eingebettet in einen Abschnitt über das Zusammenleben in der Gemeinde. Wer daraus eine Staatslehre macht, belastet ihn über seine Tragfähigkeit hinaus.',
    reception:
      'Kein neutestamentlicher Text ist häufiger zur Rechtfertigung von Unrecht benutzt worden. Im Bauernkrieg 1525 führte Luther ihn gegen die Aufständischen ins Feld; im deutschen Luthertum des 19. Jahrhunderts wurde er zur Stütze der Obrigkeitsfrömmigkeit, und nach 1933 beriefen sich die Deutschen Christen auf ihn.\n\nDie Gegenlinie ist ebenso alt. Schon die Apostelgeschichte lässt Petrus sagen, man müsse Gott mehr gehorchen als den Menschen. Die Bekennende Kirche stellte 1934 in Barmen fest, dass der Staat seine Grenze an seinem Auftrag hat; Bonhoeffer, die Widerstandskreise, die südafrikanischen Kirchen im Kampf gegen die Apartheid und die Bürgerrechtsbewegung haben daraus jeweils ihre eigenen Folgerungen gezogen. Der Streit um diesen Abschnitt ist nicht abgeschlossen.',
    terms: [
      {
        word: 'griech. exousia',
        rendered: 'Obrigkeit',
        note: 'Vollmacht, Befugnis – nicht „Staat“ und nicht „Regierung“. Dasselbe Wort steht bei Paulus auch für überirdische Mächte, was manche Ausleger dazu bewogen hat, hier beides mitzuhören.',
      },
      {
        word: 'griech. diakonos',
        rendered: 'Dienerin',
        note: 'Dienerin, Beauftragte – dasselbe Wort, das sonst kirchliche Ämter bezeichnet. Es beschreibt eine Aufgabe, keinen Rang: Wer nicht dient, wozu er beauftragt ist, fällt aus der Beschreibung heraus.',
      },
    ],
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
      {
        tradition: 'Historische Einordnung',
        text: 'Der Brief entstand um 56 nach Christus, in den ruhigen ersten Jahren Neros, und Tacitus berichtet für diese Zeit von Unruhen wegen der Steuerpacht. Vers 6 und 7 sprechen ausdrücklich von Zoll und Steuer – ein Teil der Forschung liest den Abschnitt deshalb als Rat in einer sehr konkreten Lage, nicht als grundsätzliche Erörterung.',
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
      'Gemeindeversammlungen fanden in Privathäusern statt. Der Speiseraum bot wenigen Platz, der Innenhof den übrigen – die soziale Trennung war baulich vorgegeben. Paulus nennt das Verhalten so scharf, dass er sagt, ihre Zusammenkunft sei „nicht zum Besseren, sondern zum Ärgeren“. Das „unwürdige“ Essen meint im Zusammenhang genau dies: die Missachtung der Ärmeren, nicht eine innere Unwürdigkeit des Einzelnen.\n\nDie Überlieferungsformel am Anfang – „ich habe empfangen, was ich euch gegeben habe“ – ist eine Fachwendung für die Weitergabe von Lehrgut, wie sie auch die rabbinische Tradition gebraucht. Paulus schreibt um 55 nach Christus und gibt weiter, was er selbst schon vorgefunden hat; damit liegt diese Fassung des Mahlberichts zeitlich vor allen Evangelien. Auffällig ist der Vergleich mit ihnen: Bei Lukas steht ähnlich wie hier der Auftrag zum Gedächtnis, bei Markus und Matthäus fehlt er.',
    reception:
      'Die Verse 27 bis 29 haben eine folgenschwere Wirkungsgeschichte: Aus dem „unwürdig“ wurde die Frage nach der eigenen Würdigkeit, und daraus im Pietismus und in Teilen des Luthertums eine Beichtpraxis, die viele vom Abendmahl fernhielt. Bis ins 20. Jahrhundert gingen in manchen Gegenden Gemeindeglieder nur wenige Male im Jahr zum Tisch.\n\nDer Abschnitt ist zugleich der Text, an dem die Konfessionen sich trennen. Über die Bedeutung von „das ist mein Leib“ wurde in Marburg 1529 zwischen Luther und Zwingli ergebnislos gestritten; die Leuenberger Konkordie von 1973 hat die Trennung zwischen lutherischen und reformierten Kirchen Europas aufgehoben, die katholisch-evangelische Gastfreundschaft am Tisch ist weiter offen.',
    terms: [
      {
        word: 'griech. anamnesis',
        rendered: 'Gedächtnis',
        note: 'Mehr als Erinnern: das Vergegenwärtigen einer vergangenen Rettung, wie sie beim Passa geschieht. An diesem Wort hängt ein guter Teil der konfessionellen Auseinandersetzung über das Abendmahl.',
      },
      {
        word: 'griech. anaxios',
        rendered: 'unwürdig',
        note: 'Ein Adverb: Es beschreibt die Art des Essens, nicht die Beschaffenheit des Essenden. Im Zusammenhang meint es das Vorwegessen auf Kosten der Ärmeren – nicht einen inneren Zustand.',
      },
    ],
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
      {
        tradition: 'Archäologische Beobachtung',
        text: 'Ausgrabungen römischer Stadthäuser zeigen, wie eng der Speiseraum war: Das *triclinium* fasste etwa neun bis zwölf Personen, der Innenhof deutlich mehr. Wer eingeladen war und wer im Hof stand, entschied sich nach Rang. Die Ordnung, die Paulus angreift, war also nicht Achtlosigkeit, sondern die selbstverständliche Sitzordnung der Zeit.',
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
      'Der Text nennt ausdrücklich „Throne, Herrschaften, Fürstentümer, Obrigkeiten“ – Bezeichnungen für Mächte, die man als eigenständige Größen fürchtete. Sie werden nicht bestritten, sondern eingeordnet. Der Schluss ist bemerkenswert weit gefasst: versöhnt wird „alles“, was auf Erden und im Himmel ist.\n\nDer Hymnus ist in zwei Strophen gebaut, die parallel laufen: Die erste handelt von der Schöpfung, die zweite von der Versöhnung, und beide beginnen mit „er ist“ und enthalten das Wort „Erstgeborener“. Das Wort meint dabei keinen Zeitpunkt, sondern einen Rang – im Alten Testament heißt auch der König „Erstgeborener“, obwohl er es der Geburt nach nicht ist. Auffällig ist zudem, wo die Gemeinde vorkommt: Sie steht nicht am Anfang, sondern in Vers 18 als Leib, dessen Haupt Christus ist – nach der Schöpfung und vor der Versöhnung. Ein Teil der Forschung hält gerade die Worte „nämlich der Gemeinde“ für einen Einschub des Briefschreibers in ein älteres Lied, das ursprünglich vom Kosmos sprach.',
    reception:
      'Der Hymnus hat den christologischen Streitigkeiten ihre Begriffe geliefert und steht bis heute in den Stundengebeten der katholischen und anglikanischen Kirche. Seit den 1980er Jahren ist er zusätzlich zu einem Kerntext der Schöpfungstheologie geworden: Weil er die Versöhnung ausdrücklich auf „alles“ bezieht, wird er in kirchlichen Umwelterklärungen regelmäßig zitiert.\n\nStrittig ist genau diese Reichweite. Die einen lesen daraus eine Wiederbringung aller Dinge, wie sie Origenes vertrat und wie sie später verurteilt wurde; die anderen halten dagegen, der Text spreche von einer Befriedung der Mächte, nicht von einer Erlösung aller Einzelnen. Der Streit ist so alt wie der Text.',
    terms: [
      {
        word: 'griech. eikon',
        rendered: 'Ebenbild',
        note: 'Bild, Abbild – dasselbe Wort, das die griechische Bibel für den Menschen als Bild Gottes gebraucht. Der Hymnus überträgt eine Aussage über den Menschen auf Christus.',
      },
      {
        word: 'griech. prototokos',
        rendered: 'Erstgeborene',
        note: 'Erstgeborener. Im Streit des 4. Jahrhunderts hing an diesem Wort viel: Arius las darin, Christus sei geschaffen; die Gegenseite verwies auf den alttestamentlichen Gebrauch als Rangbezeichnung. Nizäa entschied gegen Arius.',
      },
      {
        word: 'griech. pleroma',
        rendered: 'Fülle',
        note: 'Fülle, Vollmaß. In späteren gnostischen Systemen bezeichnet das Wort die Gesamtheit der himmlischen Wesen; hier steht es für die ganze Gegenwart Gottes an einem einzigen Ort.',
      },
    ],
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
      {
        tradition: 'Politische Lesart',
        text: 'Die genannten Mächte – Throne, Herrschaften, Fürstentümer, Obrigkeiten – bezeichneten für antike Leser sowohl himmlische Größen als auch irdische Herrschaft; beides war nicht getrennt gedacht. Wer den Hymnus in einer römischen Provinzstadt sang, sang von einer Ordnung, die über der bestehenden stand.',
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
      'Paulus könnte befehlen und sagt das ausdrücklich – tut es aber nicht. Stattdessen bittet er, bietet an, für den Schaden aufzukommen, und erinnert Philemon beiläufig daran, dass dieser ihm „sich selbst schuldig“ sei. Der Name Onesimus bedeutet „der Nützliche“; damit spielt der Brief mehrfach. Was Philemon tun soll, wird nie ausgesprochen: nur, dass er Onesimus „nicht mehr als einen Knecht, sondern mehr als einen Knecht, als einen lieben Bruder“ aufnehmen möge.\n\nDer Brief ist nicht privat, obwohl er es zu sein scheint: Die Anrede nennt neben Philemon auch Apphia, Archippus und „die Gemeinde in deinem Hause“. Philemon wird also vor Zeugen gebeten. Auffällig ist auch, wie der Brief endet: mit der Bemerkung, Paulus wisse, dass Philemon „mehr tun“ werde, als gesagt sei – und mit der Bitte, ihm eine Herberge bereitzuhalten, er hoffe zu kommen. Was dieses Mehr ist, wird nie ausgesprochen, und der angekündigte Besuch sorgt dafür, dass die Sache nicht auf sich beruhen kann.',
    reception:
      'Der Brief ist über Jahrhunderte gegen die Abschaffung der Sklaverei angeführt worden: Paulus schicke den Sklaven zurück, also erkenne er das Eigentumsrecht an. In den Sklavenstaaten Nordamerikas war er ein Standardtext der Predigt, und die Fugitive Slave Laws beriefen sich ausdrücklich auf ihn.\n\nDie Gegenlesart hat dieselben Verse: Paulus verlangt, dass Philemon Onesimus „als mich selbst“ aufnimmt und „nicht mehr als einen Knecht“. Abolitionisten argumentierten, dass ein solcher Empfang die Sklaverei praktisch beendet, auch wenn der Brief das Wort nicht sagt. Beide Seiten haben aus dem kürzesten Paulusbrief entgegengesetzte Schlüsse gezogen.',
    terms: [
      {
        word: 'griech. Onesimos',
        rendered: 'Onesimus',
        note: '„Der Nützliche“ – ein verbreiteter Sklavenname. Der Brief spielt zweimal damit: früher unnütz, jetzt nützlich, und in Vers 20 bittet Paulus, Philemon möge ihm „Nutzen schaffen“ – dasselbe Wortfeld.',
      },
      {
        word: 'griech. adelphos agapetos',
        rendered: 'lieben Bruder',
        note: 'Die Anrede unter Gemeindegliedern. Sie auf einen Sklaven anzuwenden, hebt das Rechtsverhältnis nicht auf – aber sie stellt daneben eine zweite Ordnung, in der es nicht gilt.',
      },
    ],
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
      {
        tradition: 'Rechtsgeschichtliche Einordnung',
        text: 'Ob Onesimus überhaupt entlaufen war, ist unsicher. Das römische Recht kannte den Fall, dass ein Sklave einen Freund des Besitzers als Fürsprecher aufsuchte – *amicus domini* –, und das galt nicht als Flucht. Der Brief passt auf beide Lagen, und die Strafandrohungen, die man mitliest, wären im zweiten Fall gar nicht im Spiel.',
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
      'Die Stadt war für drei Dinge bekannt: Bankwesen, schwarze Wolltextilien und eine Augensalbe. Genau darauf zielt der Text – Gold, weiße Kleider und Augensalbe werden angeboten. Nach einem Erdbeben im Jahr 60 n. Chr. lehnte Laodizea römische Hilfsgelder ab und baute aus eigener Kraft wieder auf; „ich bin reich und bedarf nichts“ trifft ein reales Selbstbild.\n\nDer Brief ist der letzte der sieben und der einzige, der kein einziges Lob enthält. Auffällig ist auch, was am Schluss steht: Nach der schärfsten Zurechtweisung des ganzen Buches folgt das Bild vom Klopfen an der Tür – und es ist eine Tür, die nur von innen geöffnet werden kann. Das Mahl, von dem dann die Rede ist, meint die Hauptmahlzeit am Abend, also nicht ein Vorbeikommen, sondern Bleiben. Zurechtweisung und Einladung stehen unmittelbar nebeneinander.',
    reception:
      'Das Bild vom Klopfen an der Tür ist durch William Holman Hunts Gemälde *The Light of the World* von 1853 weltbekannt geworden; Reproduktionen hingen im 19. Jahrhundert in unzähligen Häusern, und die Deutung auf die persönliche Bekehrung stammt weitgehend aus dieser Zeit. Im Text ist der Satz an eine Gemeinde gerichtet, nicht an einen Einzelnen.\n\n„Lauwarm“ ist als Vorwurf in die Alltagssprache eingegangen und wird in Gemeinden regelmäßig für mangelnden Eifer verwendet. Wer die Wasserversorgung von Laodizea kennt, liest anders: Der Vorwurf lautet nicht Halbherzigkeit, sondern Nutzlosigkeit – und er trifft eine Stadt, die sich für unabhängig hielt.',
    terms: [
      {
        word: 'griech. chliaros',
        rendered: 'lau',
        note: 'Lauwarm. Das Bild ist nicht moralisch gemeint: Heißes Wasser heilt, kaltes erfrischt, lauwarmes taugt zu nichts. Die verbreitete Deutung auf halbherzigen Glauben verschiebt den Vergleichspunkt von der Brauchbarkeit auf die Temperatur der Gesinnung.',
      },
      {
        word: 'griech. arche tes ktiseos',
        rendered: 'Anfang der Kreatur',
        note: 'Anfang oder Ursprung der Schöpfung. Das Wort kann „erstes Geschöpf“ und „Ursprung des Geschaffenen“ heißen – im arianischen Streit wurde beides gegeneinander ausgespielt.',
      },
    ],
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
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die sieben Sendschreiben sind an konkrete Städte gerichtet, deren Verhältnisse der Verfasser kennt. Die verbreitete Deutung, sie beschrieben sieben Epochen der Kirchengeschichte mit Laodizea als der letzten, ist im 19. Jahrhundert entstanden und hat im Text keinen Anhalt.',
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
    title: '„So will ich vom Himmel hören und ihre Sünde vergeben“',
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
      'Die Bildwelt ist juristisch und existenziell zugleich: Siegel, Eifer, Scheol, Wasser, Kaufpreis. Der Schlusssatz – wer alles Gut seines Hauses für Liebe gäbe, würde nur verachtet – schließt jede Verrechnung aus. Dass ein Buch weltlicher Liebeslyrik in den Kanon kam, war schon in der Antike umstritten; Rabbi Akiba nannte es dennoch „das Allerheiligste“ unter den Schriften.\n\nDie Verse 6 und 7 sind der einzige Ort im ganzen Hohenlied, an dem Gott vorkommt – und selbst das ist unsicher: „eine Flamme des HERRN“ könnte auch schlicht „eine gewaltige Flamme“ heißen, weil das Hebräische einen Superlativ so bilden kann. Ansonsten schweigt das Buch von Gott, vom Bund, vom Gesetz. Es besteht aus Liebesliedern, die Motive ägyptischer Liebeslyrik aufnehmen, und es lässt die Frau mehr sprechen als den Mann – ein in der Bibel einmaliger Befund.',
    reception:
      'Über anderthalb Jahrtausende wurde das Hohelied fast ausschließlich allegorisch gelesen – im Judentum auf Gott und Israel, im Christentum auf Christus und die Kirche oder die Seele. Bernhard von Clairvaux hielt darüber 86 Predigten und kam bis Kapitel 3. Erst seit dem 18. Jahrhundert setzte sich die Lesart als Liebesdichtung durch, und beide Deutungen stehen heute nebeneinander.\n\nDass ein Buch mit unverstellter Körperlichkeit im Kanon steht, hat die kirchliche Sexualethik immer wieder in Verlegenheit gebracht – und wird in der neueren Auslegung gerade als Korrektiv gelesen: Die Bibel kennt Liebe nicht nur als Pflicht.',
    terms: [
      {
        word: 'hebr. schalhebetja',
        rendered: 'eine Flamme des HERRN',
        note: 'Ein einmaliges Wort. Die Endung *-ja* kann eine Kurzform des Gottesnamens sein oder eine Steigerung markieren. Deshalb übersetzen die einen „Flamme des HERRN“, die anderen „gewaltige Flamme“.',
      },
      {
        word: 'hebr. qina',
        rendered: 'Eifer',
        note: 'Eifersucht, Leidenschaft, Eifer – dasselbe Wort, das im Bilderverbot Gottes „Eifer“ meint. Der Vers stellt die Liebe damit auf eine Stufe mit den stärksten Mächten, die die Bibel kennt.',
      },
    ],
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
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die Wendung „ein Siegel auf dein Herz“ verweist auf den Siegelring, den man am Körper trug. Die rabbinische Tradition liest darin die Unauflöslichkeit einer Bindung, nicht ihre Heftigkeit.',
      },
      {
        tradition: 'Feministische Exegese',
        text: 'Im Hohenlied spricht die Frau zuerst, am häufigsten und am Ende. Sie sucht, begehrt und lädt ein, ohne dass ein Vater, ein Ehemann oder eine Ordnung sie vermittelt. Für viele Auslegerinnen ist das Buch deshalb der Gegentext zu den Rollenbildern, die anderswo im Kanon stehen.',
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
    title: '„Der Gerechte aber wird seines Glaubens leben“',
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
    title: '„Eure Zeit ist da, daß ihr in getäfelten Häusern wohnt“',
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
      'Der Text gehört zum ältesten erhaltenen christlichen Schrifttum. Die Bildsprache – Posaune, Wolken, Entgegenkommen – stammt aus dem Zeremoniell eines Herrscherbesuchs: Die Bürger gingen dem Ankommenden vor die Stadt entgegen und geleiteten ihn herein. Von einem Fortgeholtwerden von der Erde ist im Bild gerade nicht die Rede.\n\nDer Brief ist wahrscheinlich die älteste Schrift des Neuen Testaments, um 50 nach Christus entstanden – älter als jedes Evangelium. Die Sorge, die er beantwortet, war neu: Man hatte damit gerechnet, das Kommende selbst zu erleben, und nun waren Gemeindeglieder gestorben. Paulus verbietet die Trauer nicht; er sagt nur, sie solle nicht sein wie die derer, „die keine Hoffnung haben“. Und er beantwortet die Frage nicht mit einer Zeitangabe: Wenige Verse später steht ausdrücklich, dass der Tag kommt wie ein Dieb in der Nacht.',
    reception:
      'Aus diesen Versen ist im 19. Jahrhundert die Lehre von der Entrückung gewachsen: John Nelson Darby verband sie mit Daniel und der Offenbarung zu einer festen Abfolge künftiger Ereignisse, und die Scofield-Bibel von 1909 machte sie in Nordamerika populär. Die Romanreihe *Left Behind* verkaufte sich ab 1995 über sechzig Millionen Mal.\n\nDie großen Kirchen haben diese Deutung nie übernommen. Ihr Haupteinwand ist sprachlich: Das Wort für „entgegen“ beschreibt in der Antike den Empfang eines Ankommenden vor der Stadt – die Empfangenden bleiben nicht draußen, sondern kehren mit ihm zurück. Damit fällt die Vorstellung eines Fortgeholtwerdens weg.',
    terms: [
      {
        word: 'griech. koimomenon',
        rendered: 'entschlafen sind',
        note: 'Wörtlich: die Schlafenden. Von diesem Wort kommt „Koimeterion“, der Schlafsaal, und daraus unser Wort Friedhof im Englischen und Französischen: *cemetery*, *cimetière*.',
      },
      {
        word: 'griech. apantesis',
        rendered: 'entgegen',
        note: 'Ein Fachwort aus dem Zeremoniell: Wenn ein Herrscher eine Stadt besuchte, zogen die Bürger ihm vor die Tore entgegen und geleiteten ihn hinein. Das Bild beschreibt also ein Einholen, kein Wegbringen.',
      },
    ],
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
      {
        tradition: 'Liturgische Rezeption',
        text: 'Vers 13 gehört zu den am häufigsten gelesenen Texten bei Beerdigungen im deutschen Sprachraum – meist mit der Betonung, dass die Trauer bleiben darf. Dass Paulus sie nicht verbietet, sondern nur von einer bestimmten Art der Trauer abgrenzt, ist dabei der Punkt, an dem die Auslegung sich von einer verbreiteten Vertröstung unterscheidet.',
      },
    ],
  },
  {
    book: '2thess',
    chapter: 3,
    from: 6,
    to: 13,
    title: '„So jemand nicht will arbeiten, der soll auch nicht essen“',
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
      'Das entscheidende griechische Wort authentein kommt im ganzen Neuen Testament nur hier vor; seine Bedeutung reicht von „Autorität ausüben“ bis „sich anmaßen“ und ist deshalb umstritten. Der Schlusssatz über das Gerettetwerden durch Kindergebären gehört zu den schwierigsten des Neuen Testaments; keine der vorgeschlagenen Deutungen hat sich durchgesetzt. Zugleich nennt Paulus in Römer 16 eine Diakonin Phöbe, die Apostelin Junia und mehrere Mitarbeiterinnen.\n\nDer Abschnitt steht in einem Brief, dessen Verfasserschaft zu den umstrittensten Fragen der neutestamentlichen Forschung gehört. Wortschatz, Stil und die vorausgesetzte Gemeindeordnung mit festen Ämtern unterscheiden sich deutlich von den unbestrittenen Paulusbriefen; die Mehrheit der Forschung datiert die Pastoralbriefe deshalb ins späte 1. oder frühe 2. Jahrhundert. Das entscheidet die Sachfrage nicht, verschiebt aber ihren Rahmen: Der Text wäre dann Zeugnis einer Gemeinde, die sich gegenüber ihrer Umwelt ordnet – und nicht das letzte Wort des Apostels, der Junia eine Apostelin nennt.',
    reception:
      'Der Abschnitt ist bis heute das Hauptargument gegen die Ordination von Frauen. Er stand im Zentrum der Auseinandersetzungen, die in den evangelischen Landeskirchen zwischen 1958 und 1991 mit der vollen Gleichstellung endeten, und er prägt die Position der römisch-katholischen und der orthodoxen Kirchen sowie eines Teils der evangelikalen Gemeinden.\n\nAuf der anderen Seite steht der Befund des übrigen Neuen Testaments: Phöbe ist Diakonin, Priska lehrt, Junia heißt Apostelin, und in 1. Korinther 11 wird selbstverständlich vorausgesetzt, dass Frauen im Gottesdienst beten und prophetisch reden. Wie beides zusammengeht, ist die eigentliche Streitfrage – nicht, was hier steht.',
    terms: [
      {
        word: 'griech. authentein',
        rendered: 'des Mannes Herr sei',
        note: 'Ein Wort, das im ganzen Neuen Testament nur hier steht. Außerbiblisch reicht seine Bedeutung von „Vollmacht ausüben“ über „sich anmaßen“ bis zu „eigenmächtig handeln“. Fast alle Deutungen dieses Verses hängen an der Entscheidung, welche Bedeutung gilt.',
      },
      {
        word: 'griech. hesychia',
        rendered: 'Stille',
        note: 'Ruhe, Stille – nicht Schweigen; dafür gäbe es ein anderes Wort. Derselbe Ausdruck wird zwei Kapitel weiter als Haltung aller Gemeindeglieder empfohlen.',
      },
    ],
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
      'Das griechische theopneustos heißt wörtlich „gottgehaucht“ und kommt sonst nirgends vor. Der Satz nennt auch den Zweck: nützlich zur Lehre, zur Zurechtweisung, zur Erziehung – also praktisch, nicht als Aussage über die Beschaffenheit des Textes. Von Irrtumslosigkeit ist nicht die Rede.\n\nDer Satzbau ist im Griechischen mehrdeutig, und die Übersetzungen entscheiden verschieden. Möglich ist „alle Schrift ist von Gott eingegeben und nützlich“ und ebenso „jede von Gott eingegebene Schrift ist auch nützlich“ – im zweiten Fall wäre die Eingegebenheit nicht behauptet, sondern vorausgesetzt. Luther wählt eine dritte Fügung. Auffällig ist zudem der Zusammenhang: Der Abschnitt beginnt damit, bei dem zu bleiben, was Timotheus gelernt hat, und nennt dabei ausdrücklich, von wem er es gelernt hat – nach Kapitel 1 von seiner Großmutter und seiner Mutter.',
    reception:
      'Dieser Vers ist der Ankertext des Streits um die Irrtumslosigkeit der Bibel. Die „Chicago-Erklärung zur Irrtumslosigkeit“ von 1978 stützt sich auf ihn und erklärt die Schrift in allen Aussagen, auch geschichtlichen und naturkundlichen, für ohne Fehler. Ein großer Teil evangelikaler Gemeinden weltweit hat sie übernommen.\n\nDie katholische Position formulierte das Zweite Vatikanische Konzil 1965 in *Dei Verbum* anders: Die Schrift lehre ohne Irrtum die Wahrheit, „die Gott um unseres Heiles willen“ aufgezeichnet haben wollte – eine Einschränkung auf das Heilsnotwendige. Die meisten evangelischen Landeskirchen stehen dieser Fassung näher als der Chicago-Erklärung.',
    terms: [
      {
        word: 'griech. theopneustos',
        rendered: 'von Gott eingegeben',
        note: 'Wörtlich „gottgehaucht“. Ein Wort, das im Neuen Testament nur hier steht und auch sonst kaum belegt ist; über die Art der Eingebung sagt es nichts.',
      },
      {
        word: 'griech. ophelimos',
        rendered: 'nütze',
        note: 'Nützlich, brauchbar. Der Satz nennt vier Zwecke und keine Eigenschaft des Textes – die Aussage liegt auf dem Gebrauch, nicht auf der Beschaffenheit.',
      },
    ],
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
      {
        tradition: 'Kanongeschichtliche Beobachtung',
        text: 'Als der Satz geschrieben wurde, war weder der jüdische noch der christliche Kanon abgeschlossen. Was „alle Schrift“ umfasst, war für den Verfasser also selbst nicht scharf begrenzt – ein Umstand, der jede Verwendung des Verses als Aussage über einen fertigen Bibelbestand erschwert.',
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
      'Die Form entspricht altorientalischen Vasallenverträgen: Vorgeschichte, Bestimmungen, Zeugen, Segen und Fluch. 5. Mose übernimmt dieses Muster – nur steht an der Stelle des Großkönigs Gott, und an der Stelle des unterworfenen Kleinkönigs steht ein ganzes Volk. Dass Himmel und Erde als Zeugen aufgerufen werden, gehört zur Vertragssprache. Entstanden ist das Buch in seiner Grundform wohl im 7. Jahrhundert v. Chr.; die Reform Josias beruft sich auf ein „gefundenes Gesetzbuch“, das die Forschung meist mit einer Vorform des Deuteronomiums gleichsetzt.\n\nDer Text bleibt dabei nicht neutral: Er legt zwei Wege vor und sagt im selben Atemzug, welchen er will – „daß du das Leben erwählest“. Das ist keine Beratung, sondern ein Werben. Auffällig ist auch der Wechsel der Anrede: Über weite Strecken redet das Kapitel ein „Ihr“ an, im entscheidenden Satz ein „Du“. Das Deuteronomium tut das durchgehend, und die Forschung hat daraus lange Schlüsse auf verschiedene Bearbeitungsstufen gezogen; als Wirkung bleibt, dass die Entscheidung am Ende bei jedem Einzelnen landet.',
    reception:
      'Der Satz „wähle das Leben“ ist zu einer Formel weit über die Bibel hinaus geworden – in der Bioethik, in Antikriegsreden, in der Debatte um Sterbehilfe, und in ganz verschiedene Richtungen. Er steht auf Plakaten von Abtreibungsgegnern ebenso wie in Erklärungen für den Klimaschutz.\n\nTheologisch ist er der Kernbeleg gegen eine Vorherbestimmung: Wenn Gott zur Wahl auffordert, muss es etwas zu wählen geben. Erasmus führte ihn 1524 gegen Luther ins Feld; Luther antwortete in *De servo arbitrio*, dass die Aufforderung gerade zeige, was der Mensch nicht könne. Der Streit ist bis heute nicht entschieden.',
    terms: [
      {
        word: 'hebr. bachar',
        rendered: 'erwählest',
        note: 'Wählen, aussuchen. Dasselbe Verb beschreibt sonst, dass Gott Israel erwählt – hier wird es umgedreht und dem Menschen zugemutet.',
      },
      {
        word: 'hebr. chajjim',
        rendered: 'Leben',
        note: 'Steht im Hebräischen in der Mehrzahl: die Lebenszeit, die Lebendigkeit. Gemeint ist nicht das Überleben, sondern ein gelingendes Dasein im Land.',
      },
    ],
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
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die Verknüpfung von Gehorsam und Wohlergehen wird in der Bibel selbst bestritten – Hiob und mehrere Psalmen widersprechen ihr ausdrücklich. Wer den Abschnitt als Regel liest, macht Leid zum Beweis von Schuld; wer ihn als Zuspruch an ein Volk vor einer Entscheidung liest, kommt ohne diese Folgerung aus.',
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
      'Die Wiederholung ist kein Stilfehler, sondern Form: Solche Einsetzungsreden folgen einem festen Muster aus Zuspruch, Auftrag und Beistandszusage, das sich auch bei Königseinsetzungen findet. Neu ist der Zusatz, das Gesetzbuch solle „nicht von deinem Munde kommen“ – der Anführer wird an dieselbe Weisung gebunden wie alle anderen. Das Buch Josua gehört nach heutiger Sicht zum deuteronomistischen Geschichtswerk, das die Geschichte Israels rückblickend vom Exil her deutet.\n\nBemerkenswert ist, worin der Erfolg begründet wird: nicht in Truppenstärke, sondern darin, dass Josua das Gesetzbuch Tag und Nacht bedenkt. Damit beginnt ein Kriegsbuch mit einer Leseanweisung. Das Wort für „betrachten“ meint dabei halblautes Murmeln – so wurde in der Antike gelernt, und dasselbe Wort steht in Psalm 1. Auffällig ist auch der Bezugsrahmen: Der Zuspruch „ich will dich nicht verlassen“ nimmt wörtlich auf, was Mose in 5. Mose 31 gesagt hatte. Josua bekommt keine neue Zusage, sondern die alte noch einmal.',
    reception:
      'Der Vers gehört zu den meistverschenkten Zusprüchen bei Amtseinführungen und Ordinationen. Er hat aber auch eine gefährliche Wirkungsgeschichte: Weil er am Anfang einer Landnahmeerzählung steht, wurde er in Siedlerbewegungen von Nordamerika bis Südafrika als göttliche Rückendeckung für Landnahme gelesen. Die Buren verstanden ihren Zug ins Landesinnere ausdrücklich in diesen Kategorien.\n\nDie Archäologie hat die Erzählung erheblich relativiert: Für die meisten der genannten Städte lässt sich keine Zerstörung in der fraglichen Zeit nachweisen. Das entschärft die historische Frage – die Frage nach der Wirkung solcher Texte bleibt.',
    terms: [
      {
        word: 'hebr. chasak weemaz',
        rendered: 'getrost und freudig',
        note: 'Wörtlich „sei stark und fest“ – ein militärischer Zuruf. Er steht in diesem Kapitel dreimal und rahmt die Einsetzung.',
      },
      {
        word: 'hebr. haga',
        rendered: 'betrachte',
        note: 'Murmeln, halblaut vor sich hinsprechen. Gemeint ist kein stilles Nachdenken, sondern lautes Lesen – so wurde in der Antike gelernt.',
      },
    ],
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
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die rabbinische Tradition legt das Gewicht ganz auf Vers 8: Josua wird nicht als Feldherr, sondern als Toragelehrter gezeichnet. Der Talmud leitet aus diesem Vers die Pflicht zum täglichen Lernen ab – und liest damit ein Kriegsbuch von seinem ersten Kapitel her um.',
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
      'Das Wortspiel mit „Haus“ trägt das ganze Kapitel: Palast, Tempel und Dynastie heißen im Hebräischen gleich. Aus dieser Zusage entwickelt sich die messianische Erwartung: ein Nachkomme Davids, dessen Thron Bestand hat. Als die Dynastie 587 v. Chr. endete, wurde die Verheißung nicht aufgegeben, sondern in die Zukunft verlegt. Das Neue Testament setzt genau hier an, wenn es Jesus als „Sohn Davids“ bezeichnet.\n\nBevor die Zusage kommt, steht eine Zurückweisung: Gott hat nie um einen Tempel gebeten und ist bisher „im Zelt umhergezogen“ – Vers 7 fragt ausdrücklich, ob er je gefordert habe, ihm ein Zedernhaus zu bauen. Auch der Prophet Nathan steht schlecht da: Er stimmt Davids Plan zuerst zu und muss ihn in derselben Nacht widerrufen. Die Forschung sieht im Kapitel mehrere Schichten; die Zusage einer ewigen Dynastie dürfte in ihrer heutigen Form nach dem Ende des Königtums überarbeitet worden sein – als Festhalten an einem Versprechen, dessen Erfüllung nicht mehr zu sehen war.',
    reception:
      'Aus diesem Kapitel wächst die messianische Erwartung. Die Rede vom „Sohn Davids“ in den Evangelien, der Stammbaum bei Matthäus, die Weihnachtserzählung in Bethlehem – alles bezieht sich auf diese Zusage. Im Judentum ist der davidische Messias bis heute eine Hoffnung auf die Zukunft, im Christentum eine Aussage über Jesus; an dieser Stelle trennen sich die Wege.\n\nDie Zusage hat auch politisch gewirkt: Europäische Könige ließen sich mit Verweis auf David salben, und das Gottesgnadentum berief sich auf Vers 14 – „ich will sein Vater sein“. Dass derselbe Vers ausdrücklich Strafe für Missetat vorsieht, wurde dabei regelmäßig überlesen.',
    terms: [
      {
        word: 'hebr. bajit',
        rendered: 'Haus',
        note: 'Haus, Tempel, Dynastie, Familie – alles dasselbe Wort. Das Kapitel lebt von diesem Doppelsinn, den keine Übersetzung mitträgt.',
      },
      {
        word: 'hebr. chesed',
        rendered: 'Barmherzigkeit',
        note: 'Güte und Vertragstreue zugleich. Dass sie David „nicht entwandt“ wird wie Saul, ist der Kern der Zusage: Sie hängt nicht am Wohlverhalten der Nachfolger.',
      },
    ],
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
      {
        tradition: 'Politisch-kritische Lesart',
        text: 'Der Text stützt eine Dynastie und ist damit interessengeleitet: Wer eine Herrschaft für ewig verbürgt erklärt, entzieht sie der Kritik. Ausleger weisen darauf hin, dass die Samuelbücher genau diese Herrschaft an anderer Stelle schonungslos darstellen – die Sammlung hält beides nebeneinander aus.',
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
      'Die vier Tiere stehen für Weltreiche; das vierte wird meist auf die Diadochenreiche und Antiochus IV. bezogen. Der Gegensatz ist bewusst gebaut: Die Reiche steigen aus dem Chaosmeer und sind Bestien, die neue Herrschaft kommt von oben und sieht aus wie ein Mensch. Der Text selbst deutet die Gestalt kollektiv – als „das Volk der Heiligen des Höchsten“. In der Zwischentestamentlichen Literatur wird daraus zunehmend eine Einzelgestalt. „Menschensohn“ ist im Neuen Testament die Selbstbezeichnung Jesu, und bei der Verhandlung vor dem Hohen Rat zitiert er genau diesen Vers.\n\nDas Kapitel ist auf Aramäisch geschrieben, nicht auf Hebräisch – ein Sprachwechsel, der mitten im Buch liegt und dessen Grund umstritten ist. Und es ist eine der frühesten Apokalypsen überhaupt: Die Bildsprache von Thron, Feuerstrom und aufgeschlagenen Büchern hat die Vorstellung vom Jüngsten Gericht bis in die Portale mittelalterlicher Kathedralen geprägt. Die Datierung ist demgegenüber ziemlich sicher: Das vierte Tier mit dem lästernden Horn passt auf Antiochus IV., und die Verfolgung um 165 vor Christus ist der Zeitpunkt, an dem die Vision Trost sein wollte.',
    reception:
      'Die Wendung „Menschensohn“ wird in den Evangelien über achtzigmal gebraucht und ist die einzige Selbstbezeichnung, die Jesus dort durchgehend verwendet. Ob er damit auf diese Vision anspielte, ob er schlicht „ich“ meinte oder ob die Gemeinde ihm den Titel zuwuchs, ist eine der am längsten diskutierten Fragen der neutestamentlichen Forschung.\n\nDas Bild vom Thron mit den Büchern hat die abendländische Vorstellung vom Jüngsten Gericht geprägt – von den Portalen mittelalterlicher Kathedralen bis zu Michelangelos Wand in der Sixtinischen Kapelle. Die Verbindung mit Matthäus 25 und der Offenbarung geschah früh und ist bildlich kaum noch zu trennen.',
    terms: [
      {
        word: 'aram. bar enasch',
        rendered: 'eines Menschen Sohn',
        note: 'Wörtlich „ein Menschensohn“ – im Aramäischen eine normale Umschreibung für „ein Mensch“. Der Vergleich „wie“ ist entscheidend: Die Gestalt sieht aus wie ein Mensch, im Gegensatz zu den Tieren davor.',
      },
      {
        word: 'aram. attiq jomin',
        rendered: 'dem Alten',
        note: 'Der „Hochbetagte“. Die Vorstellung eines greisen Götterkönigs mit weißem Haar hat Vorbilder in kanaanäischen Texten; im Alten Testament ist diese Darstellung Gottes einmalig.',
      },
    ],
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
      {
        tradition: 'Historische Einordnung',
        text: 'Die meisten Ausleger datieren das Kapitel in die Verfolgung unter Antiochus IV. um 165 vor Christus – das vierte Tier mit dem lästernden Horn passt genau auf diesen König. Die Vision wäre dann kein Fahrplan der Weltgeschichte, sondern ein verschlüsselter Trost für Menschen, die gerade um ihr Leben fürchteten.',
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
      { book: 'am', chapter: 5, verse: 24, note: '„Es soll aber das Recht offenbart werden wie Wasser“' },
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
      'Das Buch ist keine Prophetenschrift wie die anderen: Es enthält fast keine Prophetenworte, dafür eine durchkomponierte Erzählung mit Ironie. Die Seeleute beten, werfen Lose, sträuben sich gegen den Menschenwurf und fürchten am Ende Gott – während der Prophet unter Deck schläft. Diese Umkehrung ist das Verfahren des ganzen Buches. Ninive war zur mutmaßlichen Abfassungszeit längst zerstört; die Wahl gerade dieser Stadt ist deshalb bewusst provozierend gesetzt.\n\nDie Richtung ist die erste Pointe: Jona soll nach Osten, er fährt nach Westen – Tarsis liegt vermutlich in Spanien, am anderen Ende der bekannten Welt. Und alles im Kapitel geht abwärts: Er geht hinab nach Japho, hinab ins Schiff, hinab in den untersten Raum, hinab in den Schlaf, schließlich hinab ins Meer; dasselbe hebräische Verb steht fünfmal. Auch die Zahlen sind auffällig rund – drei Tage Wegstrecke, vierzig Tage Frist, hundertzwanzigtausend Einwohner. Das ist die Bauart einer Lehrerzählung, nicht die einer Chronik.',
    reception:
      'Kaum eine biblische Erzählung ist so oft zum Prüfstein gemacht worden: Wer den Fisch für historisch hält, gilt in manchen Kreisen als bibeltreu, wer nicht, als liberal. Die Gattungsfrage ist in der Forschung jedoch weitgehend geklärt – Ironie, Übertreibung und die aufreizend runden Zahlen sprechen für eine Lehrerzählung, nicht für einen Bericht.\n\nIn der christlichen Kunst ist Jona das häufigste alttestamentliche Motiv der frühen Katakomben, weil die drei Tage im Fisch früh auf die Grablegung Jesu gedeutet wurden. Im Judentum wird das ganze Buch am Nachmittag des Versöhnungstags gelesen – als Text über Umkehr, die auch Feinden offensteht.',
    terms: [
      {
        word: 'hebr. jarad',
        rendered: 'hinab',
        note: 'Hinabsteigen. Das Verb strukturiert das ganze Kapitel wie eine Treppe nach unten – Luther gibt es meist mit „hinab“ wieder, sodass die Bewegung auch im Deutschen sichtbar bleibt.',
      },
      {
        word: 'hebr. dag gadol',
        note: 'Ein „großer Fisch“ – von einem Wal steht im Hebräischen nichts. Die griechische Übersetzung sagt *ketos*, Seeungeheuer; die Kunstgeschichte hat daraus den Wal gemacht.',
      },
    ],
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
      {
        tradition: 'Literarische Beobachtung',
        text: 'Ninive war zur Entstehungszeit des Buches längst zerstört; die Hörer wussten das. Die Erzählung spielt also in einer Vergangenheit, deren Ausgang bekannt ist, und stellt trotzdem die Frage, ob Gott dieser Stadt vergeben darf. Das ist die Bauart einer Parabel, nicht die einer Chronik.',
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
    title: '„Aber ich will mich freuen des HERRN“',
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
        text: 'Der Satz „Der Gerechte aber wird seines Glaubens leben“ aus Kapitel 2 wurde für Luther zum Schlüsselvers. Der Schluss in Kapitel 3 zeigt, was damit praktisch gemeint ist.',
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

  /* ================================================================
   * Dritter Ausbau: die Briefe und die letzten dünn besetzten Bücher.
   * ================================================================ */

  {
    book: '1chr',
    chapter: 16,
    from: 8,
    to: 22,
    title: 'Das Danklied bei der Überführung der Lade',
    historicalShort:
      'Die Chronik lässt David bei der Überführung der Lade ein Lied anstimmen, das aus drei Psalmen zusammengesetzt ist – eine Collage, die man im Psalter einzeln nachlesen kann.',
    historicalLong:
      'Der Abschnitt setzt sich aus Psalm 105, 96 und 106 zusammen. Solche Kompositionen sind für die Chronik typisch: Sie erzählt die Geschichte Davids als Gründungsgeschichte des Gottesdienstes und legt ihm dabei Texte in den Mund, die zur Zeit des Verfassers längst im Gebrauch waren. Bemerkenswert ist, was ausgelassen wird: Aus Psalm 106 übernimmt sie den Lobteil, nicht die lange Sündengeschichte.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Auswahl zeigt das Interesse des Chronisten: Er will nicht anklagen, sondern eine Gemeinde ohne Staat um ihren Gottesdienst sammeln.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Der Abschnitt gilt als frühester Beleg dafür, dass Psalmen als Sammlung zitiert und neu zusammengestellt wurden – ein Blick in die Entstehung von Liturgie.',
      },
      {
        tradition: 'Vergleichende Lesart',
        text: 'Der Vergleich mit 2. Samuel 6 lohnt: Dort steht die Überführung der Lade ohne Lied, dafür mit dem Tanz Davids und dem Spott seiner Frau. Die Chronik lässt beides weg.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Teile des Textes wurden in die tägliche Morgenliturgie aufgenommen. Der Vers „Gedenkt seines Bundes ewiglich“ trägt dort das Gedächtnis der Gemeinde.',
      },
    ],
    crossRefs: [
      { book: 'ps', chapter: 105, verse: 1, note: 'Die Vorlage der ersten Verse' },
      { book: 'ps', chapter: 96, verse: 1 },
      { book: '2sam', chapter: 6, verse: 14, note: 'Dieselbe Szene ohne Lied' },
    ],
  },
  {
    book: 'est',
    chapter: 9,
    from: 20,
    to: 28,
    title: 'Die Einsetzung des Purimfestes',
    historicalShort:
      'Am Ende steht die Stiftung eines Festes, das bis heute gefeiert wird – benannt nach dem Los, mit dem der Tag der Vernichtung ausgelost worden war.',
    historicalLong:
      'Ester ist das einzige Buch der hebräischen Bibel, in dem der Gottesname nicht vorkommt – ein Umstand, der seine Aufnahme in den Kanon lange umstritten machte; in Qumran fehlt es. Umso auffälliger ist die Sorgfalt, mit der es die Einsetzung eines Festes begründet. Purim wird mit Vorlesung der Rolle, Geschenken an Freunde und Gaben an die Armen begangen. Die Freude ist ausdrücklich mit Solidarität verkoppelt.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Das Buch dürfte in hellenistischer Zeit entstanden sein und ein bereits bestehendes Fest erzählerisch begründen. Historische Anhaltspunkte für die geschilderten Vorgänge fehlen.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die Estherrolle wird an Purim vollständig vorgelesen. Dass Gott nicht genannt wird, gilt als Aussage für sich: Rettung geschieht durch das Handeln von Menschen, hinter dem sich Gott verbirgt.',
      },
      {
        tradition: 'Christliche Auslegungsgeschichte',
        text: 'Luther bekannte offen, dem Buch mit Widerwillen zu begegnen. Die Kirchen haben es lange vernachlässigt – nach der Schoah wird es neu und anders gelesen.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Kapitel 9 erzählt auch von Gegengewalt mit vielen Toten. Ein Teil der Auslegung besteht darauf, diesen Zug nicht zu übergehen, sondern als Notwehrphantasie einer bedrohten Minderheit zu benennen.',
      },
    ],
    crossRefs: [
      { book: 'est', chapter: 4, verse: 14, note: '„Wer weiß, ob du nicht um dieser Zeit willen …“' },
      { book: 'est', chapter: 3, verse: 7, note: 'Das Los, das dem Fest den Namen gab' },
    ],
  },
  {
    book: 'hld',
    chapter: 2,
    from: 8,
    to: 17,
    title: 'Das Kommen des Geliebten',
    historicalShort:
      'Ein Liebeslied ohne jede Frömmigkeit: zwei Menschen, ein Frühling, Gazellen auf den Bergen. Das Buch nennt Gott an keiner Stelle.',
    historicalLong:
      'Die Sammlung enthält Lieder, die dem ägyptischen Liebeslied nahestehen. Auffällig ist, dass die Frau die meisten Verse spricht und die Initiative ergreift – ungewöhnlich für antike Literatur. Die Aufnahme in den Kanon verdankt sich der allegorischen Deutung: Rabbi Akiba nannte das Buch das „Allerheiligste“ der Schriften und meinte damit die Liebe zwischen Gott und Israel. Die wörtliche Lesart hat sich erst in der Neuzeit wieder durchgesetzt.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Lieder sind zunächst weltliche Liebeslyrik. Ob sie je einen kultischen Ursprung hatten, ist umstritten; der Text selbst gibt dafür nichts her.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Das Lied wird als Zwiegespräch zwischen Gott und Israel gelesen und am Passafest vorgetragen. Die Frühlingsbilder verbinden sich mit dem Auszug aus Ägypten.',
      },
      {
        tradition: 'Christliche Mystik',
        text: 'Bernhard von Clairvaux hielt 86 Predigten über die ersten beiden Kapitel. Die Brautmystik von Origenes bis Teresa von Ávila lebt aus diesem Buch.',
      },
      {
        tradition: 'Neuere Auslegung',
        text: 'Viele Ausleger halten die wörtliche Lesart für einen Gewinn: Dass die Bibel ein Buch über erfüllte Liebe zwischen Menschen enthält, ohne es zu rechtfertigen, sei theologisch bedeutsamer als jede Allegorie.',
      },
    ],
    crossRefs: [
      { book: 'hld', chapter: 8, verse: 6, note: '„Liebe ist stark wie der Tod“' },
      { book: 'hld', chapter: 2, verse: 16, note: '„Mein Freund ist mein, und ich bin sein“' },
    ],
  },
  {
    book: 'klgl',
    chapter: 5,
    from: 15,
    to: 22,
    title: 'Der offene Schluss der Klagelieder',
    historicalShort:
      'Das Buch endet nicht mit Trost, sondern mit einer Frage und einem Konditionalsatz: „es sei denn, dass du uns gar verstoßen hast“. Kein anderes biblisches Buch schließt so.',
    historicalLong:
      'Die ersten vier Kapitel sind alphabetische Akrosticha – jeder Abschnitt beginnt mit dem nächsten Buchstaben. Kapitel 5 bricht diese Form: es hat zwar 22 Verse wie das Alphabet Buchstaben, aber keine Anfangsbuchstaben mehr. Die Ordnung, die die Klage bis dahin gefasst hatte, hält am Ende nicht mehr. In der Synagoge wird der vorletzte Vers nach dem letzten wiederholt, damit die Lesung nicht auf dieser Frage endet – ein liturgischer Umgang mit einem Text, den man so nicht stehen lassen wollte.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Lieder entstanden kurz nach 587 v. Chr., wohl in Jerusalem selbst. Sie gehören zur altorientalischen Gattung der Stadtklage, für die es sumerische Vorläufer gibt.',
      },
      {
        tradition: 'Jüdische Liturgie',
        text: 'Die Klagelieder werden am 9. Aw gelesen, dem Fasttag für beide Tempelzerstörungen. Die Wiederholung des vorletzten Verses ist bis heute Praxis.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Text wird als Erlaubnis gelesen, Klage nicht auflösen zu müssen. Dass die Bibel ein Buch enthält, das ohne Antwort endet, ist selbst eine Aussage.',
      },
      {
        tradition: 'Theologische Rückfrage',
        text: 'In der Mitte des Buches steht „alle Morgen neu“ – einer der bekanntesten Trostverse überhaupt. Dass er nicht am Ende steht, sondern von neuer Klage umschlossen wird, gehört zur Aussage des Ganzen.',
      },
    ],
    crossRefs: [
      { book: 'klgl', chapter: 3, verse: 22, note: '„Alle Morgen neu“ – in der Mitte des Buches' },
      { book: 'ps', chapter: 88, verse: 18, note: 'Ein Psalm, der ebenfalls ohne Trost endet' },
    ],
  },
  {
    book: 'obd',
    chapter: 1,
    from: 17,
    to: 21,
    title: 'Rettung auf dem Berg Zion',
    historicalShort:
      'Das kürzeste Buch des Alten Testaments endet mit einem Satz, der über den Streit mit Edom hinausgeht: „und das Reich wird des HERRN sein“.',
    historicalLong:
      'Obadja umfasst 21 Verse und richtet sich fast vollständig gegen Edom, das sich nach dem Fall Jerusalems am Unglück des Bruderreiches beteiligt haben soll. Der Schluss weitet den Blick: Aus der Abrechnung wird ein Ausblick auf eine Herrschaft, die keinem Volk mehr gehört. Verwandte Formulierungen finden sich in Jeremia 49 – eines der Beispiele dafür, wie prophetische Texte einander aufnehmen.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Das Buch entstand wohl im 6. Jahrhundert v. Chr., kurz nach der Katastrophe. Wie viel vom Verhalten Edoms historisch ist und wie viel Zuschreibung, lässt sich kaum entscheiden.',
      },
      {
        tradition: 'Prophetische Tradition',
        text: 'Die Ankündigung, dass „Retter“ auf den Berg Zion ziehen, wird als Gegenbild zur Ohnmacht gelesen: Das besiegte Volk erhält eine Aufgabe, nicht nur Genugtuung.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Edom gilt als Nachkommenschaft Esaus – die Feindschaft ist also eine Brudergeschichte. Viele Ausleger halten fest, dass gerade das die Härte des Buches erklärt und zugleich fragwürdig macht.',
      },
      {
        tradition: 'Wirkungsgeschichte',
        text: 'In rabbinischer Zeit wurde „Edom“ zum Deckwort für Rom und später für die Christenheit. Ein Text über einen Nachbarn wurde so zum Text über eine Weltmacht.',
      },
    ],
    crossRefs: [
      { book: 'jer', chapter: 49, verse: 14, note: 'Fast wörtlich derselbe Text' },
      { book: 'ps', chapter: 137, verse: 7, note: 'Der Vorwurf gegen Edom' },
    ],
  },
  {
    book: 'zef',
    chapter: 1,
    from: 14,
    to: 18,
    title: 'Der Tag des HERRN',
    historicalShort:
      'Kein anderer Text hat die abendländische Vorstellung vom Gericht so geprägt: Aus „dies irae, dies illa“ wurde die Sequenz der Totenmesse und ein Grundmotiv der europäischen Musik.',
    historicalLong:
      'Zefanja wirkte in der Zeit vor der Reform Josias, im späten 7. Jahrhundert v. Chr. Der „Tag des HERRN“ war in der Volksfrömmigkeit ein Tag des Sieges über die Feinde; die Propheten drehen ihn um – Amos zuerst, Zefanja am schärfsten. Die lateinische Übersetzung der ersten Worte prägte im 13. Jahrhundert die Sequenz „Dies irae“, die bis zur Liturgiereform fester Bestandteil des Requiems war und von Mozart bis Verdi vertont wurde.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Umkehrung des Erwartungsbildes ist die eigentliche prophetische Leistung: Der Tag richtet sich zuerst gegen das eigene Volk, nicht gegen die Nachbarn.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Über das „Dies irae“ ist dieser Text in der Musikgeschichte präsenter als fast jeder andere Prophetenvers – und dabei fast immer ohne seinen Zusammenhang.',
      },
      {
        tradition: 'Theologische Auslegung',
        text: 'Das Buch endet nicht hier: Kapitel 3 spricht davon, dass Gott über sein Volk jubelt. Wer nur den Gerichtsteil liest, verkürzt es um seinen Schluss.',
      },
      {
        tradition: 'Seelsorgliche Warnung',
        text: 'Viele Prediger warnen davor, den Text als Angstmittel zu gebrauchen. Er ist an Verantwortliche gerichtet, nicht an Verängstigte – die Anklage trifft zuerst die Oberschicht.',
      },
    ],
    crossRefs: [
      { book: 'am', chapter: 5, verse: 18, note: 'Dieselbe Umkehrung bei Amos' },
      { book: 'zef', chapter: 3, verse: 17, note: 'Der Schluss des Buches' },
      { book: 'joel', chapter: 2, verse: 11 },
    ],
  },
  {
    book: '2kor',
    chapter: 4,
    from: 7,
    to: 12,
    title: 'Der Schatz in irdenen Gefäßen',
    historicalShort:
      'Tongefäße waren das billigste Behältnis der Antike – Wegwerfware. Paulus wählt genau dieses Bild für sich selbst und die, die mit ihm arbeiten.',
    historicalLong:
      'Der zweite Korintherbrief ist der persönlichste Text des Paulus. Er verteidigt sich gegen Gegner, die offenbar mit Rednergabe und Beglaubigungsschreiben auftraten. Seine Antwort dreht den Maßstab um: Gerade die Schwäche sei der Beweis. Die vier Gegensatzpaare in Vers 8–9 sind rhetorisch sorgfältig gebaut – jedes Mal wird ein Zugeständnis gemacht und sofort begrenzt. Die Bildwelt der Tongefäße passt zur Erfahrung eines Handwerkers, der seinen Lebensunterhalt selbst verdiente.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Abschnitt gehört zur Auseinandersetzung mit den „Überaposteln“ in Korinth. Paulus entwickelt hier eine Theologie der Schwachheit, die im Kapitel 12 ihren Höhepunkt findet.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Luther las hier seine „Theologie des Kreuzes“: Gott handelt nicht an der Macht vorbei, sondern in ihrem Gegenteil.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Text wird häufig in Krankheit und Erschöpfung gelesen. Entscheidend ist die Genauigkeit der Begrenzungen: bedrängt, aber nicht erdrückt – der Text beschönigt nichts.',
      },
      {
        tradition: 'Ostkirchliche Auslegung',
        text: 'Die orthodoxe Tradition liest den Abschnitt zusammen mit der Verklärung: Das irdene Gefäß bleibt, was es ist, und wird zugleich vom ungeschaffenen Licht durchscheinend.',
      },
    ],
    crossRefs: [
      { book: '2kor', chapter: 12, verse: 9, note: '„Meine Kraft ist in den Schwachen mächtig“' },
      { book: '1kor', chapter: 1, verse: 27 },
      { book: '2kor', chapter: 11, verse: 23 },
    ],
  },
  {
    book: '2kor',
    chapter: 5,
    from: 17,
    to: 21,
    title: 'Der Dienst der Versöhnung',
    historicalShort:
      '„Ist jemand in Christo, so ist er eine neue Kreatur“ – und unmittelbar danach folgt kein Rückzug ins Innerliche, sondern ein Auftrag: Botschafter zu sein.',
    historicalLong:
      'Das griechische Wort für Versöhnung stammt aus dem Bereich zerstrittener Parteien, nicht aus dem Opferkult. Auffällig ist die Richtung: Nicht der Mensch versöhnt Gott, sondern Gott versöhnt die Welt mit sich. Der Ausdruck „an Christi Statt“ verwendet die Sprache der Gesandtschaft: Ein Botschafter spricht mit der Vollmacht dessen, der ihn schickt, ohne selbst dessen Rang zu haben. Der Schlussvers gehört zu den dichtesten und am meisten diskutierten Sätzen des Paulus.',
    interpretations: [
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Der letzte Vers gilt als Kern der Rechtfertigungslehre: ein Tausch, bei dem Christus übernimmt, was uns gehört, und wir empfangen, was ihm gehört.',
      },
      {
        tradition: 'Katholische Auslegung',
        text: 'Betont wird der Auftrag: Versöhnung ist nicht nur zugesprochen, sondern wird als Dienst weitergegeben – hier hat das Sakrament der Versöhnung einen seiner biblischen Anker.',
      },
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Paulus greift vermutlich eine vorgeprägte Formel auf. Die Frage, ob die Wendung „zur Sünde gemacht“ ein Sündopfer meint, ist seit der Antike unentschieden.',
      },
      {
        tradition: 'Befreiungstheologie',
        text: 'Die „neue Schöpfung“ wird nicht auf das Innere begrenzt: Versöhnung ohne veränderte Verhältnisse bliebe eine Formel. Der Dienst der Versöhnung schließt die Arbeit an Konflikten ein.',
      },
    ],
    crossRefs: [
      { book: 'roem', chapter: 5, verse: 10 },
      { book: 'kol', chapter: 1, verse: 20 },
      { book: 'gal', chapter: 6, verse: 15 },
    ],
  },
  {
    book: 'gal',
    chapter: 2,
    from: 11,
    to: 21,
    title: 'Der Streit in Antiochia',
    historicalShort:
      'Paulus berichtet, wie er Petrus öffentlich widersprach. Es ist der einzige Text im Neuen Testament, in dem zwei Apostel namentlich und ungeschminkt aneinandergeraten.',
    historicalLong:
      'Der Streitpunkt war die Tischgemeinschaft: In Antiochia aßen Juden- und Heidenchristen zusammen, bis Abgesandte aus Jerusalem kamen und Petrus sich zurückzog. Für Paulus stand damit die Sache selbst auf dem Spiel, nicht eine Frage der Ordnung. Wie der Streit ausging, sagt der Text nicht – ein beredtes Schweigen, das viele so deuten, dass Paulus sich in Antiochia nicht durchsetzte. Die Apostelgeschichte erwähnt den Vorfall überhaupt nicht.\n\nDer Bericht ist Teil einer Beweisführung, nicht ein neutraler Rückblick: Paulus erzählt ihn, um zu zeigen, dass sein Evangelium nicht von Jerusalem abhängt. Deshalb ist er einseitig, und deshalb fehlt der Ausgang. Auffällig ist auch, wie er Petrus’ Verhalten nennt – die anderen hätten mit ihm „geheuchelt“, wörtlich: Theater gespielt. Er wirft ihm nicht eine andere Überzeugung vor, sondern dass er gegen seine eigene handelt. Der Vorwurf trifft dabei nicht nur Petrus, sondern auch Barnabas, mit dem Paulus die erste Missionsreise gemacht hatte.',
    reception:
      'Der Streit zweier Apostel war der Alten Kirche unangenehm. Hieronymus deutete ihn als abgesprochenes Schauspiel zur Belehrung der Gemeinde; Augustinus widersprach ihm scharf – wenn Paulus hier täusche, sei kein Satz der Schrift mehr verlässlich. Der Briefwechsel der beiden gehört zu den frühesten Debatten über die Wahrhaftigkeit biblischer Texte.\n\nIn der Reformation wurde der Abschnitt zum Beleg dafür, dass auch Petrus irren konnte – und damit gegen den päpstlichen Anspruch gewendet. Das Konzil von Trient ging darauf nicht ein; in der heutigen katholischen Auslegung gilt der Vorfall als Beispiel dafür, dass Leitungsverantwortung Widerspruch nicht ausschließt.',
    terms: [
      {
        word: 'griech. hypokrisis',
        rendered: 'heuchelten',
        note: 'Ursprünglich das Spielen einer Rolle auf der Bühne. Der Vorwurf lautet nicht Falschheit im Herzen, sondern ein Verhalten, das die eigene Überzeugung verdeckt.',
      },
      {
        word: 'griech. erga nomou',
        rendered: 'des Gesetzes Werke',
        note: 'In Qumran ist ein hebräischer Ausdruck derselben Bedeutung belegt, und zwar für die Bestimmungen, die eine Gruppe von anderen abgrenzen. Die neuere Paulusforschung liest die Wendung deshalb weniger als „gute Taten“ denn als „Zugehörigkeitsmerkmale“.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Abschnitt zeigt, dass die frühe Kirche keineswegs einig war. Lukas glättet solche Konflikte; der Galaterbrief ist hier die ältere und ungeschminktere Quelle.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Luthers Galaterkommentar von 1535 gehört zu seinen wichtigsten Werken. Für ihn stand hier der Kern des Evangeliums gegen jede Werkgerechtigkeit.',
      },
      {
        tradition: 'Katholische Auslegung',
        text: 'Betont wird, dass Paulus die Autorität des Petrus nicht bestreitet, sondern sein Verhalten. Augustinus und Hieronymus stritten im 4. Jahrhundert ausführlich darüber, ob der Vorfall echt war.',
      },
      {
        tradition: 'Neuere Paulusforschung',
        text: 'Die sogenannte „neue Perspektive“ liest den Konflikt weniger als Streit über Verdienst und Gnade, sondern über die Zugehörigkeit von Nichtjuden zum Gottesvolk – also als Frage von Grenzen, nicht von Leistung.',
      },
    ],
    crossRefs: [
      { book: 'apg', chapter: 15, verse: 1, note: 'Das Apostelkonzil bei Lukas' },
      { book: 'gal', chapter: 2, verse: 16 },
      { book: 'apg', chapter: 10, verse: 28, note: 'Petrus bei Kornelius' },
    ],
  },
  {
    book: 'gal',
    chapter: 5,
    from: 1,
    to: 6,
    title: '„In der Freiheit, zu der uns Christus befreit hat“',
    historicalShort:
      'Der Satz steht nicht am Anfang des Briefes, sondern nach vier Kapiteln Auseinandersetzung – und er ist ein Kampfruf, kein Motto.',
    historicalLong:
      'Der konkrete Streitpunkt war die Beschneidung von Nichtjuden. Gegner in Galatien verlangten sie als Bedingung der vollen Zugehörigkeit; Paulus sieht darin die Aufhebung dessen, was er verkündigt. Der Nachsatz ist wichtig: Freiheit endet für ihn nicht in Beliebigkeit, sondern in der Liebe, „die durch den Glauben tätig ist“. Wenige Verse später steht der Satz, das ganze Gesetz sei erfüllt in dem einen Wort: Du sollst deinen Nächsten lieben wie dich selbst.\n\nDer Satz steht an einer Naht: Bis Kapitel 4 argumentiert Paulus, ab Kapitel 5 fordert er. Und die Forderung ist grammatisch merkwürdig – „bestehet in der Freiheit“ meint stehenbleiben, nicht losgehen. Freiheit erscheint hier nicht als Ziel, das man erreicht, sondern als Ort, von dem man wieder wegkommen kann. Das Bild vom Joch nimmt dabei etwas auf, was in der jüdischen Tradition positiv besetzt war: das „Joch der Tora“ zu tragen galt als Vorrecht. Paulus nennt es hier knechtisch – und macht damit deutlich, wie zugespitzt seine Lage ist.',
    reception:
      'Luther nannte den Galaterbrief seine „Käthe von Bora“, an die er sich vertraut habe, und legte ihn zweimal ausführlich aus; von hier stammt der Ton seiner Freiheitsschrift von 1520. In der Neuzeit ist der Vers weit über die Theologie hinaus zitiert worden – in Bürgerrechtsbewegungen, in Befreiungstheologien, gelegentlich auch als Werbespruch.\n\nDie Zuspitzung hat eine Schattenseite: Weil Paulus die Beschneidung als „knechtisches Joch“ bezeichnet, ist der Vers in der christlichen Auslegung jahrhundertelang als Abwertung des Judentums gelesen worden. Neuere Auslegung betont, dass Paulus als Jude über die Bedingungen für Nichtjuden streitet – nicht über den Wert der Tora für Israel.',
    terms: [
      {
        word: 'griech. eleutheria',
        rendered: 'Freiheit',
        note: 'In der antiken Stadt ein Rechtsbegriff: der Stand des Freien im Unterschied zum Sklaven. Paulus gebraucht ein politisches Wort, kein Gefühlswort – es geht um Rechtsstellung, nicht um Ungebundenheit.',
      },
      {
        word: 'griech. energoumene',
        rendered: 'tätig',
        note: 'Wirksam sein, in Kraft treten. Der Glaube ist nach diesem Satz nichts, was daneben noch Liebe braucht – er wirkt sich als Liebe aus oder er ist keiner.',
      },
    ],
    interpretations: [
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Freiheit ist hier nicht Wahlfreiheit, sondern Freiheit von dem Zwang, sich selbst rechtfertigen zu müssen. Luthers Schrift „Von der Freiheit eines Christenmenschen“ entfaltet genau diesen Satz.',
      },
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Schärfe des Briefes ist ohne die konkrete Gemeindesituation nicht zu verstehen. Paulus schreibt in einem Konflikt, nicht in einer Vorlesung.',
      },
      {
        tradition: 'Politische Lesart',
        text: 'Der Freiheitsbegriff des Textes ist in der Neuzeit vielfach politisch in Anspruch genommen worden – von Bauernkriegen bis zu Bürgerrechtsbewegungen, teils gegen die Absicht der Kirchen.',
      },
      {
        tradition: 'Jüdisch-christliches Gespräch',
        text: 'Neuere Auslegung mahnt, den Text nicht als Absage an die Tora zu lesen. Paulus streitet darüber, was für Nichtjuden gilt – nicht darüber, ob Juden die Tora halten sollen.',
      },
    ],
    crossRefs: [
      { book: 'gal', chapter: 5, verse: 14, note: 'Das ganze Gesetz in einem Wort' },
      { book: 'gal', chapter: 3, verse: 28 },
      { book: '1kor', chapter: 8, verse: 9 },
    ],
  },
  {
    book: 'phil',
    chapter: 4,
    from: 4,
    to: 9,
    title: '„Freuet euch in dem HERRN allewege“',
    historicalShort:
      'Ein Aufruf zur Freude, geschrieben aus dem Gefängnis. Wie ernst die Lage war, zeigt derselbe Brief: Paulus erwägt darin ausdrücklich seinen Tod.',
    historicalLong:
      'Der Philipperbrief entstand in Haft – wo, ist umstritten: Rom, Ephesus und Cäsarea werden vorgeschlagen. Die Gemeinde in Philippi war die erste in Europa und die einzige, von der Paulus Geld annahm. Das Wort für „Güte“ in Vers 5 bezeichnet ein Nachgeben, das über das Geforderte hinausgeht – ein Begriff aus dem Rechtswesen. Der Friede, der „höher ist als alle Vernunft“, wird nicht als Gefühl beschrieben, sondern als Wache, die Herz und Sinne bewahrt.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Brief könnte aus mehreren Schreiben zusammengesetzt sein; der Themenwechsel in Kapitel 3 ist auffällig abrupt. Die Frage ist offen.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Aufruf zur Freude wird gerade dort ernst genommen, wo er nicht selbstverständlich ist. Aus dem Gefängnis geschrieben, ist er keine Aufforderung zur guten Laune.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Der Vers ist der Eingang des Sonntags Gaudete in der Adventszeit – der rosa Sonntag mitten in der Bußzeit hat hier seinen Namen her.',
      },
      {
        tradition: 'Ethische Auslegung',
        text: 'Der Schluss nennt, worauf zu achten ist: was wahrhaftig, ehrbar, gerecht und liebenswert ist. Bemerkenswert ist, dass diese Liste der antiken Tugendlehre entstammt – Paulus grenzt sich nicht ab, sondern nimmt auf.',
      },
    ],
    crossRefs: [
      { book: 'phil', chapter: 1, verse: 21, note: 'Der Brief erwägt den Tod' },
      { book: 'phil', chapter: 2, verse: 5 },
      { book: 'joh', chapter: 14, verse: 27 },
    ],
  },
  {
    book: 'kol',
    chapter: 3,
    from: 12,
    to: 17,
    title: 'Anziehen wie ein Kleid',
    historicalShort:
      'Erbarmen, Freundlichkeit, Demut, Sanftmut, Geduld – und über alles die Liebe. Der Text beschreibt Haltungen wie Kleidungsstücke, die man anlegt.',
    historicalLong:
      'Das Bild vom An- und Ausziehen gehört zur frühchristlichen Taufsprache; in manchen Gemeinden wurde bei der Taufe tatsächlich das Gewand gewechselt. Bemerkenswert ist die Reihenfolge: Zuerst steht die Zusage, erwählt und geliebt zu sein, dann folgt die Aufforderung. Die genannten Eigenschaften sind durchweg soziale Größen – keine lässt sich allein üben. Der Abschnitt schließt mit dem Singen von Psalmen und Liedern, dem frühesten Hinweis auf gottesdienstliche Musik in den Briefen.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Verfasserschaft des Kolosserbriefs ist umstritten; viele halten ihn für nachpaulinisch. Die Tauf- und Katechismussprache spricht für eine Gemeinde, die bereits eine feste Unterweisung kannte.',
      },
      {
        tradition: 'Klassische kirchliche Auslegung',
        text: 'Die Reihe der Tugenden wurde als Gegenstück zur Lasterliste im selben Kapitel gelesen. Beide Listen sind literarisch geformt und finden sich ähnlich in der Popularphilosophie der Zeit.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Dass Haltungen „angezogen“ werden, wird als Entlastung gelesen: Sie müssen nicht empfunden, sondern eingeübt werden – das Gefühl kann folgen.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Unmittelbar danach folgt die sogenannte Haustafel mit Anweisungen an Frauen, Kinder und Sklaven. Wer den schönen Teil liest, muss den anschließenden mitlesen und benennen, was daran zeitgebunden ist.',
      },
    ],
    crossRefs: [
      { book: 'kol', chapter: 3, verse: 18, note: 'Die Haustafel unmittelbar danach' },
      { book: 'gal', chapter: 3, verse: 27 },
      { book: 'eph', chapter: 4, verse: 24 },
    ],
  },
  {
    book: '1thess',
    chapter: 5,
    from: 1,
    to: 11,
    title: 'Wie ein Dieb in der Nacht',
    historicalShort:
      'Auf die Frage nach dem Wann folgt keine Berechnung, sondern eine Absage an jede Berechnung – und stattdessen eine Anweisung für das Jetzt.',
    historicalLong:
      'Der erste Thessalonicherbrief ist mit großer Wahrscheinlichkeit die älteste erhaltene christliche Schrift, geschrieben um 50 n. Chr. Die Gemeinde beunruhigte, dass Mitglieder starben, bevor Christus wiederkam. Paulus antwortet im vorigen Kapitel darauf und wendet sich hier gegen die Terminfrage. Das Bild vom Dieb stammt aus der Jesusüberlieferung; der Ruf „Friede und Sicherheit“ war römische Propagandasprache – pax et securitas findet sich auf Münzen und Inschriften.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Naherwartung ist bei Paulus deutlich greifbar. Wie die frühe Kirche mit ihrem Ausbleiben umging, lässt sich an den späteren Briefen ablesen.',
      },
      {
        tradition: 'Politische Lesart',
        text: 'Der Gegensatz zur kaiserlichen Losung „Friede und Sicherheit“ ist kaum zufällig. Der Text stellt der römischen Ordnung eine andere Erwartung entgegen.',
      },
      {
        tradition: 'Kirchliche Auslegung',
        text: 'Die Absage an Terminrechnungen wurde immer wieder gegen Endzeitbewegungen angeführt – mit wechselndem Erfolg. Der Text selbst zieht aus der Unberechenbarkeit eine ethische, keine spekulative Folge.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Abschnitt endet mit „tröstet euch untereinander“. Das Thema ist nicht Angst, sondern der Umgang einer Gemeinde mit ihren Toten.',
      },
    ],
    crossRefs: [
      { book: '1thess', chapter: 4, verse: 13, note: 'Der unmittelbare Zusammenhang' },
      { book: 'mt', chapter: 24, verse: 43, note: 'Das Bild vom Dieb in der Jesusüberlieferung' },
      { book: '2petr', chapter: 3, verse: 10 },
    ],
  },
  {
    book: '2thess',
    chapter: 2,
    from: 1,
    to: 12,
    title: 'Der Mensch der Sünde',
    historicalShort:
      'Ein Text, der vor voreiligen Endzeitansagen warnt – und dabei selbst ein Endzeitszenario entwirft, das zu den rätselhaftesten des Neuen Testaments gehört.',
    historicalLong:
      'Die Gemeinde hatte offenbar gehört, der Tag des Herrn sei bereits da – möglicherweise aufgrund eines gefälschten Briefes, den der Text ausdrücklich erwähnt. Die Antwort schiebt zwei Ereignisse davor: den Abfall und das Auftreten des „Menschen der Sünde“. Wer oder was ihn zurückhält, bleibt offen; die Auslegung hat darin das römische Reich, den Heiligen Geist, die Verkündigung und vieles andere gesehen. Schon Augustinus schrieb, er wisse nicht, was gemeint sei.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Verfasserschaft ist umstritten. Wer den Brief für nachpaulinisch hält, liest ihn als Korrektur einer überhitzten Naherwartung, die sich auf Paulus berief.',
      },
      {
        tradition: 'Auslegungsgeschichte',
        text: 'Die Gestalt wurde mit Nero, dem Papsttum, Luther, mit Diktatoren des 20. Jahrhunderts und immer wieder mit dem jeweiligen Gegner gleichgesetzt. Die Reihe dieser Zuschreibungen ist selbst eine Warnung.',
      },
      {
        tradition: 'Kirchliche Auslegung',
        text: 'Die Kirchen lehren überwiegend Zurückhaltung: Der Text warnt vor Täuschung und ruft zum Feststehen, er liefert keinen Schlüssel zur Identifikation von Personen.',
      },
      {
        tradition: 'Seelsorgliche Warnung',
        text: 'Der Anlass des Briefes ist ein Gerücht, das Angst gemacht hat. Wer den Abschnitt heute zur Angsterzeugung gebraucht, wendet ihn gegen seine erklärte Absicht.',
      },
    ],
    crossRefs: [
      { book: '2thess', chapter: 2, verse: 2, note: 'Der gefälschte Brief' },
      { book: 'dan', chapter: 11, verse: 36 },
      { book: '1joh', chapter: 2, verse: 18 },
    ],
  },
  {
    book: '1tim',
    chapter: 6,
    from: 6,
    to: 12,
    title: 'Genügsamkeit und Geldliebe',
    historicalShort:
      'Der meistverkürzte Vers der Bibel steht hier: Nicht das Geld ist die Wurzel allen Übels, sondern die Geldgier.',
    historicalLong:
      'Der Text bewegt sich in der Sprache der antiken Popularphilosophie: Die Autarkie – das Sichgenügenlassen – war ein Grundbegriff der Stoa. Auch das Bild, nichts in die Welt gebracht zu haben und nichts hinaustragen zu können, findet sich mehrfach in griechischer und lateinischer Literatur sowie bei Hiob. Die Pastoralbriefe richten sich an Gemeinden mit fester Ordnung und offenbar auch mit wohlhabenden Mitgliedern; die Warnung ist konkret adressiert.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die drei Pastoralbriefe unterscheiden sich in Sprache und Ämterordnung deutlich von den unumstrittenen Paulusbriefen. Die Mehrheit setzt sie ins späte 1. oder frühe 2. Jahrhundert.',
      },
      {
        tradition: 'Klassische kirchliche Auslegung',
        text: 'Der Vers wurde in der Alten Kirche breit gegen den Reichtum von Amtsträgern angeführt – von Basilius bis Johannes Chrysostomus mit erheblicher Schärfe.',
      },
      {
        tradition: 'Wirkungsgeschichte',
        text: 'Die verkürzte Fassung „Geld ist die Wurzel allen Übels“ ist sprichwörtlich geworden und sagt etwas anderes als der Text. Er richtet sich auf eine Haltung, nicht auf eine Sache.',
      },
      {
        tradition: 'Sozialethische Lesart',
        text: 'Wenige Verse später folgt eine Anweisung an die Reichen – nicht, arm zu werden, sondern gern zu geben und mitzuteilen. Der Brief entwirft keine Besitzlosigkeit, sondern eine Verpflichtung des Besitzes.',
      },
    ],
    crossRefs: [
      { book: '1tim', chapter: 6, verse: 17, note: 'Die Anweisung an die Reichen' },
      { book: 'hi', chapter: 1, verse: 21 },
      { book: 'mt', chapter: 6, verse: 24 },
    ],
  },
  {
    book: '2tim',
    chapter: 4,
    from: 6,
    to: 8,
    title: '„Ich habe einen guten Kampf gekämpft“',
    historicalShort:
      'Ein Rückblick am Ende, in der Sprache des Sports und des Opferkults zugleich: ausgegossen wie ein Trankopfer, gelaufen wie ein Wettlauf.',
    historicalLong:
      'Der Text verwendet das Bild des Trankopfers, das über ein Opfer gegossen wurde, und daneben die Wettkampfsprache, die Paulus auch sonst gebraucht – der Siegeskranz war ein Kranz aus Zweigen, nicht aus Gold. Beides zusammen ergibt einen Ton, der zugleich nüchtern und feierlich ist. Ob der historische Paulus diese Zeilen schrieb, ist umstritten; als literarisches Vermächtnis haben sie die christliche Sterbeliturgie tief geprägt.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Wer die Pastoralbriefe für später hält, liest den Abschnitt als bewusst gestaltetes Testament: Eine spätere Generation lässt Paulus sagen, was sie von ihm überliefert wissen will.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Der Text gehört zu den meistgelesenen Abschnitten bei Beerdigungen und in Sterbegebeten – in allen Konfessionen.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Auffällig ist, dass der Rückblick nichts beschönigt: Wenige Verse später steht, alle hätten ihn verlassen. Der Text hält Bilanz und Enttäuschung nebeneinander.',
      },
      {
        tradition: 'Ethische Auslegung',
        text: 'Die Wendung „den Glauben gehalten“ meint im Griechischen ebenso „die Treue bewahrt“. Gemeint ist weniger ein Bekenntnis als ein Durchhalten.',
      },
    ],
    crossRefs: [
      { book: '2tim', chapter: 4, verse: 16, note: '„Alle verließen mich“' },
      { book: '1kor', chapter: 9, verse: 24 },
      { book: 'phil', chapter: 3, verse: 14 },
    ],
  },
  {
    book: 'tit',
    chapter: 2,
    from: 11,
    to: 14,
    title: '„Es ist erschienen die heilsame Gnade“',
    historicalShort:
      'Ein dichter, fast liedhafter Abschnitt, der Gnade und Lebensführung unmittelbar aneinanderbindet – die Gnade „erzieht“.',
    historicalLong:
      'Das griechische Wort für „erscheinen“ ist Epiphaneia – ein Begriff aus dem Herrscherkult, mit dem das Auftreten eines Gottes oder eines Kaisers bezeichnet wurde. Der Text setzt ihn zweimal: für das erste Kommen und für die erwartete Wiederkunft. Auffällig ist das Verb „erziehen“: Gnade wird nicht als Freibrief beschrieben, sondern als etwas, das Gewohnheiten formt. Der Abschnitt steht mitten in einer Haustafel und begründet, warum ihre Anweisungen gelten sollen.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Abschnitt wirkt wie ein zitiertes Bekenntnisstück. Die Übernahme kaiserlicher Sprache ist typisch für die Zeit und keineswegs harmlos.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Der Text wurde gegen die Trennung von Glaube und Lebensführung angeführt: Gnade und Erziehung stehen in einem Satz, nicht in einer Reihenfolge.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Der Abschnitt ist Lesung der Christnacht – die „Erscheinung“ wird dort auf die Geburt bezogen.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die umgebende Haustafel weist Sklaven an, sich zu fügen. Dass ein Text über die Gnade diese Funktion erfüllt, gehört zu den Stellen, an denen die Auslegung Widerspruch anmelden muss.',
      },
    ],
    crossRefs: [
      { book: 'tit', chapter: 2, verse: 9, note: 'Die Anweisung an Sklaven' },
      { book: 'tit', chapter: 3, verse: 4 },
      { book: '1joh', chapter: 3, verse: 2 },
    ],
  },
  {
    book: 'hebr',
    chapter: 4,
    from: 12,
    to: 16,
    title: 'Das Wort wie ein Schwert – und der mitfühlende Hohepriester',
    historicalShort:
      'Zwei Bilder unmittelbar nacheinander: ein Schwert, das bis ins Innerste dringt, und ein Hohepriester, der weiß, wie sich Schwäche anfühlt.',
    historicalLong:
      'Der Hebräerbrief ist kein Brief, sondern eine kunstvoll gebaute Predigt in ausgesuchtem Griechisch; sein Verfasser ist unbekannt. Origenes schrieb bereits im 3. Jahrhundert, wer ihn geschrieben habe, wisse Gott allein. Der Hohepriestergedanke ist sein eigentliches Thema und begegnet so in keinem anderen neutestamentlichen Text. Der zweischneidige Schwertvergleich stammt aus der Weisheitsliteratur; das Wort für „Schwert“ meint das kurze römische Kurzschwert, nicht das Zweihandschwert der Bilder.\n\nDie beiden Bilder stehen nicht zufällig nebeneinander. Erst das Wort, vor dem nichts verborgen bleibt – „bloß und entdeckt“, wörtlich: mit zurückgebogenem Nacken, wie bei einem Opfertier vor dem Schnitt. Dann der, der nicht von außen urteilt, sondern versucht wurde wie alle. Der Abschnitt läuft auf eine Aufforderung zu, die dazu quersteht: „mit Freudigkeit hinzutreten“. Wo man Furcht erwartet, steht Zutrauen.',
    reception:
      'Der Vergleich mit dem zweischneidigen Schwert ist zur stehenden Wendung für die Wirkung der Bibel geworden und ziert Kanzeln, Buchdeckel und Gemeindebriefe. Er hat auch eine unangenehme Verwendung: als Rechtfertigung dafür, Menschen mit Bibelversen zu bedrängen. Der Text spricht vom Wort Gottes, nicht vom Gebrauch, den jemand davon macht.\n\nDer Hohepriestergedanke, der dem Brief seine Eigenart gibt, hat die katholische Messtheologie geprägt und wurde in der Reformation gerade umgekehrt gewendet: Weil Christus der eine Hohepriester ist, brauche es kein Priestertum, das opfert. Derselbe Brief steht damit auf beiden Seiten einer der ältesten Trennlinien.',
    terms: [
      {
        word: 'griech. energes',
        rendered: 'kräftig',
        note: 'Wirksam, tätig – daher unser Wort Energie. Der Satz spricht nicht davon, dass das Wort wahr ist, sondern davon, dass es etwas tut.',
      },
      {
        word: 'griech. parresia',
        rendered: 'Freudigkeit',
        note: 'In der griechischen Stadt das Recht des freien Bürgers, in der Volksversammlung offen zu reden. Übertragen: ohne Scheu sprechen dürfen. Luthers „Freudigkeit“ trifft den Ton, verdeckt aber den politischen Ursprung.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Predigt richtet sich an eine Gemeinde in Ermüdung. Ihr Argumentationsgang setzt gute Kenntnis der griechischen Bibel voraus.',
      },
      {
        tradition: 'Klassische kirchliche Auslegung',
        text: 'Das Nebeneinander ist gewollt: Erst das Wort, das nichts verbirgt, dann der Zugang zum Thron „mit Freudigkeit“. Ohne den zweiten Teil wäre der erste unerträglich.',
      },
      {
        tradition: 'Ostkirchliche Auslegung',
        text: 'Die orthodoxe Tradition betont die Aussage, er sei „versucht allenthalben gleichwie wir“: Mitleiden ist hier kein Zugeständnis, sondern Voraussetzung der Erlösung.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Abschnitt wird häufig gegen ein Gottesbild gelesen, das nur richtet. Das Wort dringt durch – und der, vor den es führt, kennt die Lage von innen.',
      },
      {
        tradition: 'Kanongeschichtliche Beobachtung',
        text: 'Die Aufnahme des Hebräerbriefs in den Kanon war lange strittig, im Westen länger als im Osten – gerade weil sein Verfasser unbekannt ist. Durchgesetzt hat sie sich über die Zuschreibung an Paulus, die heute niemand mehr vertritt; Sprache und Denkweise unterscheiden sich deutlich von seinen Briefen.',
      },
    ],
    crossRefs: [
      { book: 'hebr', chapter: 2, verse: 18 },
      { book: 'eph', chapter: 6, verse: 17 },
      { book: 'jes', chapter: 49, verse: 2 },
    ],
  },
  {
    book: 'hebr',
    chapter: 12,
    from: 1,
    to: 3,
    title: 'Die Wolke der Zeugen',
    historicalShort:
      'Nach dem langen Kapitel über die Glaubenden der Vergangenheit folgt das Bild eines Stadions: Die Zeugen sitzen auf den Rängen, der Lauf ist noch zu laufen.',
    historicalLong:
      'Die Bildsprache ist die des griechischen Wettkampfs, der in der ganzen Mittelmeerwelt vertraut war: das Ablegen jeder Last, das Laufen mit Ausdauer, der Blick nach vorn. Das griechische Wort für „Zeugen“ ist dasselbe, aus dem „Märtyrer“ wurde – hier steht es noch für Zeugen im weiteren Sinn. Die vorangehende Aufzählung in Kapitel 11 endet ausdrücklich nicht mit Erfolgsgeschichten: Sie nennt Gefolterte, Verspottete, Getötete.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Wettkampfmetaphorik durchzieht die frühchristliche Literatur. Sie richtet sich an Gemeinden, deren Ausdauer nachließ, nicht an Anfänger.',
      },
      {
        tradition: 'Katholische Auslegung',
        text: 'Die „Wolke der Zeugen“ gehört zu den biblischen Wurzeln der Heiligenverehrung: Die Gestorbenen sind nicht abwesend, sondern als Gemeinschaft gegenwärtig.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Betont wird der Blick auf Christus als „Anfänger und Vollender“. Die Zeugen bleiben Zuschauer; getragen wird der Lauf von einem anderen.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Das Bild wird oft bei Trauerfeiern gebraucht. Es tröstet weniger mit Wiedersehen als mit Zugehörigkeit: Wer läuft, läuft nicht als Erster und nicht allein.',
      },
    ],
    crossRefs: [
      { book: 'hebr', chapter: 11, verse: 36, note: 'Was die Zeugen erlitten' },
      { book: '1kor', chapter: 9, verse: 24 },
      { book: 'phil', chapter: 3, verse: 13 },
    ],
  },
  {
    book: 'jak',
    chapter: 1,
    from: 2,
    to: 8,
    title: 'Anfechtung und die Bitte um Weisheit',
    historicalShort:
      'Der Brief beginnt ohne Umschweife mit dem Schwierigen – und stellt der Anfechtung nicht Trost gegenüber, sondern eine Bitte: um Weisheit.',
    historicalLong:
      'Der Jakobusbrief steht der jüdischen Weisheitsliteratur so nahe wie kein anderer neutestamentlicher Text; Christus wird nur zweimal genannt. Das griechische Wort für „Anfechtung“ meint Prüfung wie Versuchung zugleich – dieselbe Doppeldeutigkeit wie in der Bitte des Vaterunsers. Der „Zweifler“ wird mit einer Meereswoge verglichen; das Wort für „zwiespältig“ ist im Griechischen vor Jakobus nicht belegt und könnte eine Neubildung sein.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Brief ist eher eine Sammlung von Mahnreden als ein Brief. Verfasser und Datierung sind offen; die Nähe zur Bergpredigt ist auffällig, ohne dass zitiert würde.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Luther nannte den Brief eine „stroherne Epistel“, weil er die Rechtfertigung anders akzentuiere. Die lutherische Auslegung ist ihm darin überwiegend nicht gefolgt.',
      },
      {
        tradition: 'Jüdische Parallelen',
        text: 'Die Verbindung von Prüfung, Geduld und Weisheit findet sich fast wörtlich bei Jesus Sirach. Der Brief steht in einer durchgehenden weisheitlichen Linie.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Bemerkenswert ist, worum gebeten werden soll: nicht um das Ende der Prüfung, sondern um Urteilsfähigkeit in ihr.',
      },
    ],
    crossRefs: [
      { book: 'jak', chapter: 2, verse: 14, note: 'Glaube ohne Taten' },
      { book: 'roem', chapter: 5, verse: 3 },
      { book: '1koe', chapter: 3, verse: 9 },
    ],
  },
  {
    book: 'jak',
    chapter: 5,
    from: 13,
    to: 16,
    title: 'Gebet, Salbung und das Bekennen der Sünden',
    historicalShort:
      'Der Abschnitt beschreibt, was eine Gemeinde tut, wenn jemand krank ist: rufen, beten, salben – und einander die Verfehlungen bekennen.',
    historicalLong:
      'Der Text ist die wichtigste neutestamentliche Grundlage der Krankensalbung. Öl war in der Antike zugleich Heilmittel und rituelles Zeichen; die beiden Bedeutungen lassen sich hier nicht trennen. Auffällig ist die Reihenfolge: Nicht ein Einzelner heilt, sondern die Ältesten werden gerufen. Das gegenseitige Bekennen ist ausdrücklich wechselseitig formuliert, nicht auf ein Amt gerichtet.\n\nDer Abschnitt setzt eine Gemeinde voraus, die etwas tun kann: Sie hat Älteste, sie hat Öl, sie hat einen Ort für das Bekennen. Auffällig ist die Zuordnung von Krankheit und Schuld – sie wird nicht behauptet, sondern im Konjunktiv gestreift: „und so er hat Sünden getan“. Der Text rechnet also mit dem Fall, dass keine Schuld im Spiel ist. Und die Reihenfolge ist wechselseitig: nicht ein Amtsträger nimmt Beichte ab, sondern „bekenne einer dem andern“.',
    reception:
      'Aus diesen Versen ist die Krankensalbung geworden, die das Konzil von Trient 1551 als Sakrament bestätigte. Über Jahrhunderte verschob sich ihr Gebrauch zur „Letzten Ölung“ kurz vor dem Tod; das Zweite Vatikanische Konzil kehrte 1963 zur ursprünglichen Ausrichtung auf Kranke zurück und änderte den Namen. In evangelischen Kirchen ist die Salbung seit den 1990er Jahren wieder verbreiteter geworden.\n\nDie Zusage, das Gebet des Glaubens werde helfen, hat eine gefährliche Kehrseite: In Teilen der Heilungsbewegung wird ausbleibende Genesung dem Glauben des Kranken zugeschrieben. Kirchliche Stellungnahmen und die Seelsorgeliteratur widersprechen dem entschieden – der Text macht niemanden für seine Krankheit verantwortlich.',
    terms: [
      {
        word: 'griech. presbyteroi',
        rendered: 'Ältesten',
        note: 'Die Ältesten – eine Leitungsform, die die Gemeinden von der Synagoge übernahmen. Über das Wort läuft die Wortgeschichte von „Priester“: aus *presbyteros* wurde lateinisch *presbyter* und daraus das deutsche Wort.',
      },
      {
        word: 'griech. sosei',
        rendered: 'helfen',
        note: 'Retten, heilen, gesund machen – im Griechischen dasselbe Wort für alle drei. Ob der Satz körperliche Genesung oder Heil im umfassenden Sinn meint, lässt sich sprachlich nicht entscheiden.',
      },
    ],
    interpretations: [
      {
        tradition: 'Katholische Auslegung',
        text: 'Der Abschnitt begründet das Sakrament der Krankensalbung. Das Konzil von Trient beruft sich ausdrücklich auf ihn; die frühere Bezeichnung „Letzte Ölung“ hat das Zweite Vatikanum bewusst aufgegeben.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Die Reformatoren erkannten hier kein Sakrament, hielten aber am Gebet für Kranke fest. Neuere evangelische Ordnungen kennen die Salbung wieder als Segenshandlung.',
      },
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Text spiegelt eine Gemeinde mit Ältestenamt. Ob Heilung erwartet oder Zuspruch gemeint ist, lässt die Formulierung bewusst offen.',
      },
      {
        tradition: 'Seelsorgliche Warnung',
        text: 'Die Verbindung von Krankheit und Sünde wird häufig missbraucht. Der Text stellt sie nebeneinander, ohne sie ursächlich zu verknüpfen – das Johannesevangelium widerspricht der Verknüpfung ausdrücklich.',
      },
    ],
    crossRefs: [
      { book: 'joh', chapter: 9, verse: 3, note: '„Weder dieser hat gesündigt noch seine Eltern“' },
      { book: 'mk', chapter: 6, verse: 13 },
      { book: 'jak', chapter: 5, verse: 16 },
    ],
  },
  {
    book: '1petr',
    chapter: 2,
    from: 1,
    to: 10,
    title: 'Lebendige Steine',
    historicalShort:
      'Aus dem Bild des Tempels wird eine Gemeinde: keine Mauern, sondern Menschen – und der verworfene Stein wird zum Eckstein.',
    historicalLong:
      'Der Abschnitt reiht mehrere Schriftzitate aneinander, alle über Steine: Jesaja 28, Psalm 118, Jesaja 8. Diese Zusammenstellung war offenbar bereits eine feste Sammlung, denn Paulus verwendet Teile davon ähnlich. Der Höhepunkt überträgt Titel, die im Alten Testament Israel gelten, auf die angeschriebenen Gemeinden in Kleinasien: „auserwähltes Geschlecht, königliches Priestertum“. Das Wort für „Volk“ am Ende stammt aus Hosea – aus „Nicht mein Volk“ wird „Volk Gottes“.\n\nDer Brief geht an Gemeinden in fünf Provinzen Kleinasiens und redet sie an wie Menschen ohne festen Ort: „Fremdlinge und Pilger“. Genau darauf zielt das Bild vom Bau – wer kein Haus hat, wird selbst zu einem. Auffällig ist der Umgang mit dem Stein: In wenigen Versen ist er lebendig, verworfen, auserwählt, Eckstein und Stolperstein zugleich. Das Bild bleibt nicht stehen, es dreht sich; und die Angeredeten sind darin nicht Zuschauer, sondern Baumaterial.',
    reception:
      'Aus Vers 9 ist eine der folgenreichsten Formeln der Reformation geworden: Luther leitete aus dem „königlichen Priestertum“ 1520 ab, dass alle Getauften Priester sind und der geistliche Stand kein höherer ist. Das Zweite Vatikanische Konzil nahm den Gedanken 1964 auf und sprach vom „gemeinsamen Priestertum der Gläubigen“ neben dem Amtspriestertum.\n\nDie Übertragung der Israel-Titel auf die Gemeinde hat zugleich eine dunkle Wirkung: Sie wurde zur Grundlage der Vorstellung, die Kirche sei an Israels Stelle getreten. Der Brief selbst zieht diesen Schluss nicht – er redet Nichtjuden zu, die nach Hosea „nicht mein Volk“ hießen, ohne jemandem etwas abzusprechen.',
    terms: [
      {
        word: 'griech. akrogoniaios',
        rendered: 'Eckstein',
        note: 'Der Stein an der Ecke – ob der Grundstein im Fundament oder der Schlussstein im Bogen, ist umstritten. Beides ergibt einen Sinn: Der eine trägt alles, der andere hält alles zusammen.',
      },
      {
        word: 'griech. basileion hierateuma',
        rendered: 'königliche Priestertum',
        note: 'Ein Zitat aus 2. Mose 19, dort auf ganz Israel bezogen. Dass der Brief es auf seine Leser überträgt, ist der Ursprung dessen, was die Reformation das Priestertum aller Gläubigen nannte.',
      },
    ],
    interpretations: [
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Die Wendung vom „königlichen Priestertum“ wurde zum Kernbeleg für das Priestertum aller Getauften – bei Luther in den reformatorischen Hauptschriften von 1520.',
      },
      {
        tradition: 'Katholische Auslegung',
        text: 'Das Zweite Vatikanum nimmt den Text auf und verbindet das gemeinsame Priestertum aller Gläubigen mit dem Amtspriestertum, ohne beide gleichzusetzen.',
      },
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Brief richtet sich an Gemeinden in einer Minderheitslage. Die Übertragung der Israel-Titel dient der Vergewisserung, nicht der Enteignung.',
      },
      {
        tradition: 'Jüdisch-christliches Gespräch',
        text: 'Genau diese Übertragung wurde später zur Behauptung ausgebaut, die Kirche habe Israel ersetzt. Die Kirchen haben dieser Enterbungslehre seit dem 20. Jahrhundert ausdrücklich widersprochen.',
      },
    ],
    crossRefs: [
      { book: 'ps', chapter: 118, verse: 22, note: 'Der verworfene Stein' },
      { book: 'hos', chapter: 2, verse: 23 },
      { book: '2mo', chapter: 19, verse: 6, note: 'Die Vorlage: „königliches Priestertum“' },
    ],
  },
  {
    book: '2petr',
    chapter: 1,
    from: 16,
    to: 21,
    title: 'Augenzeugen und Prophetenwort',
    historicalShort:
      'Der Verfasser beruft sich auf die Verklärung als Augenzeuge – und stellt dem doch das prophetische Wort als das Festere gegenüber.',
    historicalLong:
      'Der zweite Petrusbrief gilt in der Forschung überwiegend als die späteste Schrift des Neuen Testaments; schon in der Alten Kirche war seine Zugehörigkeit zum Kanon umstritten. Er greift den Judasbrief großflächig auf. Der Abschnitt reagiert auf Spötter, die das Ausbleiben der Wiederkunft anführten. Die Aussage über die Schriftauslegung – „keine Weissagung geschieht aus eigener Auslegung“ – gehört zu den wirkungsreichsten Sätzen der Kirchengeschichte.',
    interpretations: [
      {
        tradition: 'Katholische Auslegung',
        text: 'Der Vers über die Auslegung wird als Beleg dafür angeführt, dass Schrift nicht privat, sondern in der Gemeinschaft der Kirche ausgelegt wird.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Die reformatorische Tradition liest denselben Vers anders: Nicht die eigene Willkür legt aus, sondern die Schrift sich selbst – „sacra scriptura sui ipsius interpres“.',
      },
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Berufung auf die Augenzeugenschaft in einem Text, den die meisten für pseudepigraph halten, ist ein bemerkenswerter Befund. Er sagt etwas über die Autoritätsfragen der zweiten Generation.',
      },
      {
        tradition: 'Ostkirchliche Auslegung',
        text: 'Die Verklärung hat in der orthodoxen Theologie einen zentralen Rang; dieser Abschnitt gehört zu ihren wichtigsten Belegen für die Teilhabe an der göttlichen Natur.',
      },
    ],
    crossRefs: [
      { book: 'mt', chapter: 17, verse: 5, note: 'Die Verklärung' },
      { book: '2petr', chapter: 3, verse: 4, note: 'Die Spötter' },
      { book: '2tim', chapter: 3, verse: 16 },
    ],
  },
  {
    book: '1joh',
    chapter: 1,
    from: 5,
    to: 10,
    title: '„In ihm ist keine Finsternis“',
    historicalShort:
      'Der Brief beginnt seine Argumentation mit einem Satz von großer Klarheit – und zieht daraus sofort eine unbequeme Folgerung über den Umgang mit der eigenen Schuld.',
    historicalLong:
      'Der erste Johannesbrief richtet sich gegen eine Gruppe, die die Gemeinde verlassen hat. Ihre Position lässt sich aus den Sätzen erschließen, die der Brief zitiert und zurückweist: „Wir haben keine Sünde“ und „Wir haben nicht gesündigt“. Vermutlich handelte es sich um eine Frömmigkeit, die sich durch Erkenntnis über die alltägliche Schuld erhaben glaubte. Der Brief antwortet nicht mit Verschärfung, sondern mit dem Angebot des Bekennens – und mit dem Hinweis, dass die Leugnung Gott zum Lügner macht.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Brief spiegelt eine Gemeindespaltung, deren Gegenseite wir nur durch seine Widerlegung kennen. Die Nähe zum Johannesevangelium ist deutlich, das Verhältnis beider Texte umstritten.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Vers 8 und 9 stehen in vielen Gottesdienstordnungen am Beginn – als Grundlage von Sündenbekenntnis und Zuspruch der Vergebung.',
      },
      {
        tradition: 'Klassische kirchliche Auslegung',
        text: 'Augustinus widmete den Johannesbriefen zehn Predigten. Für ihn hängt alles an der Verbindung von Licht und Liebe: Das eine ist ohne das andere nicht zu haben.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Text verlangt keine Selbsterforschung ohne Ende. Er stellt fest, dass Selbsttäuschung mehr schadet als das Eingestandene – und sagt sofort die Vergebung zu.',
      },
    ],
    crossRefs: [
      { book: '1joh', chapter: 4, verse: 8, note: '„Gott ist Liebe“' },
      { book: 'joh', chapter: 8, verse: 12 },
      { book: 'ps', chapter: 32, verse: 5 },
    ],
  },
  {
    book: 'eph',
    chapter: 6,
    from: 10,
    to: 18,
    title: 'Die Waffenrüstung',
    historicalShort:
      'Der Brief endet mit einem militärischen Bild – und dreht es zugleich um: Alle genannten Stücke sind Schutz, die einzige Waffe ist ein Wort.',
    historicalLong:
      'Die Ausrüstung entspricht der eines römischen Legionärs, wie ihn jeder Leser im Alltag sah. Die Zuordnungen stammen aber aus Jesaja, wo Gott selbst diese Rüstung trägt. Bemerkenswert ist die Auswahl: Gürtel, Panzer, Schuhe, Schild, Helm – lauter Verteidigung; das Schwert ist „das Wort Gottes“, und der Abschnitt mündet in das Gebet. Der genannte Gegner ist ausdrücklich nicht „Fleisch und Blut“, also kein Mensch.\n\nAuffällig ist, wie oft in wenigen Versen das Wort „stehen“ fällt: bestehen, widerstehen, das Feld behalten, „so stehet nun“. Angriff kommt in der ganzen Aufzählung nicht vor. Und die Ausrüstung stammt nicht aus dem Kasernenhof, sondern aus Jesaja – dort trägt Gott selbst Panzer und Helm, und was hier verteilt wird, ist geliehen. Das letzte Stück fällt aus dem Bild: Nach dem Schwert folgt kein weiteres Rüstungsteil, sondern das Gebet.',
    reception:
      'Das Bild hat eine zweischneidige Geschichte. Es hat Märtyrer und Widerstandsgruppen getragen – und es hat Kreuzzugspredigt, Missionsheere und militärische Sprache in Gemeinden geliefert; die Heilsarmee führt sie im Namen. Wo aus dem Bild eine Haltung gegenüber Menschen wurde, ist der Text gegen seinen eigenen Wortlaut verwendet worden: Er sagt ausdrücklich, dass der Kampf nicht gegen Fleisch und Blut geht.\n\nIn Teilen der charismatischen Bewegung ist daraus die „geistliche Kampfführung“ geworden, mit Gebeten gegen territoriale Mächte. Die großen Kirchen sind dem nicht gefolgt; sie lesen den Abschnitt zurückhaltender – als Ermutigung zum Standhalten, nicht als Anleitung zur Dämonenbekämpfung.',
    terms: [
      {
        word: 'griech. panoplia',
        rendered: 'Harnisch',
        note: 'Die vollständige Ausrüstung eines Schwerbewaffneten, nicht ein einzelnes Stück. Luthers „Harnisch“ meint im 16. Jahrhundert ebenfalls die ganze Rüstung.',
      },
      {
        word: 'griech. machaira',
        rendered: 'Schwert',
        note: 'Das kurze römische Schwert, wie es die Legion trug – eine Waffe für den Nahkampf, kein Zweihänder. Die Bilder mittelalterlicher Darstellungen sind darin ungenau.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Epheserbrief gilt vielen als nachpaulinisch. Das Bild vom Kampf gegen Mächte spiegelt eine Welt, in der man mit wirksamen überirdischen Kräften rechnete.',
      },
      {
        tradition: 'Klassische kirchliche Auslegung',
        text: 'Die Ausrichtung auf Verteidigung wurde früh betont: Der Text ruft nicht zum Angriff, sondern zum Standhalten – „so werdet ihr bestehen können“.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die Bildsprache ist in der Geschichte wiederholt zur Rechtfertigung realer Gewalt herangezogen worden, bis in Kreuzzugspredigten. Der ausdrückliche Satz, es gehe nicht gegen Menschen, wurde dabei überlesen.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Abschnitt wird in Situationen gelesen, in denen jemand sich ohnmächtig erlebt. Sein Trost liegt darin, dass Standhalten schon als Sieg gilt.',
      },
    ],
    crossRefs: [
      { book: 'jes', chapter: 59, verse: 17, note: 'Gott trägt dieselbe Rüstung' },
      { book: 'roem', chapter: 13, verse: 12 },
      { book: '1thess', chapter: 5, verse: 8 },
    ],
  },
  {
    book: '1mo',
    chapter: 2,
    from: 24,
    to: 25,
    title: '„Ein Fleisch“',
    historicalShort:
      'Der Vers steht am Ende der zweiten Schöpfungserzählung und begründet, warum Menschen Bindungen eingehen – erzählt wird das als Ursprungsgeschichte, nicht als Rechtssatz.',
    historicalLong:
      'Auffällig ist die Richtung: Der Mann verlässt seine Familie, nicht die Frau die ihre. In einer Gesellschaft, in der die Frau in die Sippe des Mannes wechselte, ist das eine bemerkenswerte Umkehrung – vermutlich beschreibt der Satz die Stärke der Bindung, nicht den Wohnort. Das hebräische Wort für „hangen“ meint ein Ankleben, das anderswo für die Bundestreue gebraucht wird. Jesus zitiert den Vers in der Scheidungsfrage und stellt ihn über die Regelung des Mose.',
    interpretations: [
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der Talmud liest den Vers als Begründung der Ehe und zugleich als Erinnerung daran, dass sie eine Neugründung ist: Es entsteht etwas, das vorher nicht da war.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Jesus und Paulus greifen den Vers auf. Der Epheserbrief nennt ihn ein „großes Geheimnis“ und bezieht ihn auf Christus und die Gemeinde – eine Deutung, die den Text weit über das Eheliche hinausführt.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Der Vers ist in Debatten über Ehe und Partnerschaft vielfach als Norm angeführt worden. Ausleger halten dagegen, dass er eine Erzählung abschließt und nicht als Gesetz formuliert ist.',
      },
    ],
    crossRefs: [
      { book: 'mk', chapter: 10, verse: 7, note: 'Jesus zitiert den Vers' },
      { book: 'eph', chapter: 5, verse: 31 },
      { book: '1mo', chapter: 1, verse: 27 },
    ],
  },
  {
    book: '1mo',
    chapter: 12,
    from: 1,
    to: 3,
    title: 'Die Berufung Abrahams',
    historicalShort:
      'Drei Aufforderungen und sieben Zusagen – mit diesen Versen beginnt die Geschichte Israels. Wohin es geht, wird nicht gesagt: „in ein Land, das ich dir zeigen will“.',
    historicalLong:
      'Die Aufforderung steigert sich: Land, Verwandtschaft, Vaterhaus – von außen nach innen, jedes Mal schmerzhafter. Der Segen ist von Anfang an nicht auf eine Gruppe begrenzt: „in dir sollen gesegnet werden alle Geschlechter auf Erden“. Damit steht am Beginn der Erwählungsgeschichte ein Satz, der über sie hinausweist. Die Urgeschichte davor endet im Sprachenwirrwarr von Babel; die Berufung ist die Antwort darauf.\n\nZählt man die Wörter, wird das Gewicht sichtbar: Fünfmal steht in diesen drei Versen eine Form von „segnen“ – gegen die Flüche, die die Kapitel davor bestimmen: über die Schlange, über den Acker, über Kain, über Kanaan. Wohin es gehen soll, sagt Gott nicht; der Angesprochene ist 75 Jahre alt und kinderlos. Von einer Reaktion Abrams berichtet der Text nichts: Er antwortet nicht, er fragt nicht, er geht.',
    reception:
      'Die Ausweitung des Segens auf alle Geschlechter der Erde ist der Grund, warum Judentum, Christentum und Islam sich gemeinsam auf Abraham beziehen – und zugleich der Punkt, an dem sie sich trennen, weil jede Tradition den Anspruch anders erbt. Der Begriff „abrahamitische Religionen“ stammt aus dem 20. Jahrhundert und ist selbst umstritten: Er betont Gemeinsames und verdeckt, dass die drei jeweils Verschiedenes daraus machen.\n\nPaulus liest den Vers als Ankündigung, dass auch Nichtjuden dazugehören; die christliche Auslegung folgte ihm oft in der Zuspitzung, Israel sei damit abgelöst. Kirchliche Erklärungen seit den 1970er Jahren widersprechen dieser Ablösungslehre ausdrücklich.',
    terms: [
      {
        word: 'hebr. barach',
        rendered: 'segnen',
        note: 'Segnen heißt im Alten Testament nicht gut zureden, sondern mit Lebenskraft ausstatten: Nachkommen, Land, Auskommen. Es ist ein handfestes Wort.',
      },
      {
        word: 'hebr. lech lecha',
        rendered: 'Gehe aus',
        note: 'Wörtlich „geh dir“ oder „geh für dich“ – eine im Hebräischen auffällige Doppelung. Die jüdische Auslegung hört darin: Geh zu dir selbst hin. Der Wochenabschnitt der Tora trägt diesen Namen.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Verse gelten als Scharnier zwischen Urgeschichte und Vätererzählungen. Ihre Endgestalt dürfte aus der Exilszeit stammen, als die Frage nach Land und Zukunft neu brannte.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der Midrasch fragt, warum Gott gerade Abraham rief, und antwortet: Der Text sagt es nicht. Die Erwählung bleibt unbegründet – genau darin liege ihre Art.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Der Hebräerbrief nennt den Aufbruch ins Ungewisse das Musterbeispiel des Glaubens. Paulus liest den Segen für alle Völker als Vorausschau auf die Öffnung zu den Heiden.',
      },
      {
        tradition: 'Ostkirchliche Auslegung',
        text: 'Die Väter der Ostkirche lasen den Aufbruch als Bild des geistlichen Weges: Aus dem Vertrauten herausgehen, ohne das Ziel zu kennen, gilt in dieser Tradition als Grundform des Glaubens überhaupt – nicht als einmaliges Ereignis, sondern als lebenslange Bewegung.',
      },
    ],
    crossRefs: [
      { book: 'hebr', chapter: 11, verse: 8, note: 'Der Aufbruch als Glaube' },
      { book: 'gal', chapter: 3, verse: 8 },
      { book: 'apg', chapter: 7, verse: 2 },
    ],
  },
  {
    book: '1mo',
    chapter: 15,
    from: 6,
    to: 6,
    title: '„Das rechnete er ihm zur Gerechtigkeit“',
    historicalShort:
      'Ein einziger Vers, der die Theologiegeschichte des Westens geprägt hat wie kaum ein anderer: Abraham glaubt, und das wird ihm angerechnet.',
    historicalLong:
      'Im Zusammenhang geht es um die Zusage von Nachkommenschaft an einen kinderlosen alten Mann. Das hebräische Wort für „glauben“ hat mit Festigkeit zu tun – es steckt im Wort Amen. „Anrechnen“ stammt aus der Buchführung und wird sonst für priesterliche Anerkennung eines Opfers verwendet. Paulus baut auf diesem Vers seine gesamte Argumentation in Römer 4 auf, und Jakobus zitiert denselben Vers für die entgegengesetzte These.\n\nGrammatisch ist der Satz offener, als seine Wirkungsgeschichte vermuten lässt. Wer wem was anrechnet, steht nicht ausdrücklich da: Meist wird gelesen, dass Gott dem Abram den Glauben als Gerechtigkeit anrechnet – möglich wäre auch, dass Abram Gottes Zusage als Gerechtigkeit anerkennt. Und der Vers steht nicht allein: Unmittelbar danach verlangt Abram ein Zeichen – „woran soll ich merken, dass ich es besitzen werde?“ –, und Gott antwortet mit einem Bundesritual zwischen zerteilten Tieren. Der Glaube, den der Vers lobt, verträgt sich also mit einer Rückfrage.',
    reception:
      'An diesem halben Vers hängt die abendländische Theologiegeschichte. Paulus baut auf ihm seine Argumentation in Römer 4 und Galater 3 auf – gegen die Beschneidung als Bedingung –, Jakobus zitiert ihn in Kapitel 2 mit umgekehrter Stoßrichtung, und Luther fand in ihm die Rechtfertigung allein aus Glauben. Das Konzil von Trient und die Reformatoren stritten darüber, ob „anrechnen“ eine Zusprechung oder eine Verwandlung meint.\n\nIm Judentum ist der Vers nie so zentral gewesen. Dort steht Abraham vor allem für Treue in Prüfungen – und die rabbinische Auslegung hält fest, dass sein Glaube sich in Taten zeigte, was den Streit zwischen Paulus und Jakobus in gewisser Weise vorwegnimmt.',
    terms: [
      {
        word: 'hebr. aman',
        rendered: 'glaubte',
        note: 'Von derselben Wurzel wie „Amen“: fest sein, sich verlassen können. Kein Fürwahrhalten, sondern ein Sich-Festmachen an einem anderen.',
      },
      {
        word: 'hebr. zedaka',
        rendered: 'Gerechtigkeit',
        note: 'Nicht die Fehlerlosigkeit vor einem Gesetz, sondern Gemeinschaftstreue – dem Verhältnis gerecht werden, in dem man steht. Im späteren Judentum bezeichnet dasselbe Wort auch die Almosen.',
      },
    ],
    interpretations: [
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Für Luther war dieser Vers der Schlüssel zur Rechtfertigungslehre: Angerechnet wird, was einer nicht selbst erbringt.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die rabbinische Tradition liest die Stelle im Zusammenhang von Abrahams Treue über viele Prüfungen hinweg. Glauben ist hier weniger ein Fürwahrhalten als eine Lebensrichtung.',
      },
      {
        tradition: 'Neuere Paulusforschung',
        text: 'Diskutiert wird, ob im Hebräischen Gott dem Abraham etwas anrechnet oder Abraham Gott. Die Grammatik lässt beides zu; die Septuaginta hat sich für die erste Lesart entschieden, und ihr folgt Paulus.',
      },
      {
        tradition: 'Ökumenische Verständigung',
        text: 'Die *Gemeinsame Erklärung zur Rechtfertigungslehre* von 1999 hat den alten Streit teilweise beigelegt: Beide Seiten bekennen, dass der Mensch allein aus Gnade angenommen wird und der Glaube dabei nicht ohne Wirkung bleibt. Offen bleibt, wie stark die Erneuerung des Menschen zur Rechtfertigung selbst gehört.',
      },
    ],
    crossRefs: [
      { book: 'roem', chapter: 4, verse: 3, note: 'Paulus zitiert den Vers' },
      { book: 'jak', chapter: 2, verse: 23, note: 'Jakobus zitiert denselben Vers' },
      { book: 'gal', chapter: 3, verse: 6 },
    ],
  },
  {
    book: '1mo',
    chapter: 28,
    from: 15,
    to: 17,
    title: '„Ich bin mit dir“',
    historicalShort:
      'Jakob ist auf der Flucht, nachdem er seinen Bruder betrogen hat. Genau dort, ohne jede Vorbedingung, ergeht die Zusage der Begleitung.',
    historicalLong:
      'Der Ort ist ein Nachtlager mit einem Stein als Kopfkissen – kein Heiligtum, sondern eine Notunterkunft. Die Zusage ergeht nicht an einen Frommen, sondern an einen Betrüger auf der Flucht; der Text kommentiert das nicht. Jakobs Reaktion ist zwiespältig: erst Furcht, dann ein Gelübde, das mit „wenn“ beginnt. Der Ort erhält den Namen Bethel, „Haus Gottes“, und wird später Reichsheiligtum des Nordreichs.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Erzählung erklärt die Heiligkeit von Bethel. Dass ausgerechnet dort später ein Stierbild aufgestellt wurde, macht den Text in den Königsbüchern zwiespältig.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Die Zusage steht vor jeder Besserung. Das wird häufig gegen die Vorstellung angeführt, Begleitung müsse verdient werden.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Das Johannesevangelium nimmt das Bild der Leiter auf und deutet es auf den Menschensohn – der Ort der Verbindung ist dort keine Treppe, sondern eine Person.',
      },
    ],
    crossRefs: [
      { book: 'joh', chapter: 1, verse: 51, note: 'Die Leiter im Johannesevangelium' },
      { book: '1mo', chapter: 35, verse: 1 },
      { book: '1koe', chapter: 12, verse: 29 },
    ],
  },
  {
    book: '2mo',
    chapter: 33,
    from: 14,
    to: 17,
    title: '„Mein Angesicht soll vorangehen“',
    historicalShort:
      'Nach dem Bruch am goldenen Kalb ringt Mose um die Frage, ob Gott weiter mitgeht. Die Antwort ist keine Vergebungsformel, sondern eine Zusage von Gegenwart.',
    historicalLong:
      'Das hebräische Wort für „Angesicht“ meint zugleich Gegenwart und Zuwendung; „vorangehen“ ist ein Wort aus dem Karawanenwesen. Mose argumentiert hart: Ohne diese Gegenwart sei der Zug sinnlos, denn dann unterscheide nichts das Volk von anderen. Unmittelbar danach folgt die Bitte, die Herrlichkeit sehen zu dürfen – und deren Zurückweisung. Der Abschnitt hält Nähe und Unverfügbarkeit ausdrücklich zusammen.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Text gehört zu den Kapiteln, die nach der Kalbepisode die Frage klären, wie ein Weitergehen möglich ist. Er verhandelt das Grundproblem des Bundes nach seinem Bruch.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die Wendung „Angesicht“ wird als Ausdruck der Schechina gelesen, der einwohnenden Gegenwart. Sie zieht mit, sie wartet nicht am Ort.',
      },
      {
        tradition: 'Ostkirchliche Auslegung',
        text: 'Gregor von Nyssa hat die anschließende Verweigerung, das Angesicht zu sehen, zur Grundlage einer ganzen Mystik gemacht: Gott zu erkennen heiße, ihm immer weiter nachzugehen.',
      },
    ],
    crossRefs: [
      { book: '2mo', chapter: 33, verse: 20, note: '„Mein Angesicht kannst du nicht sehen“' },
      { book: '2mo', chapter: 32, verse: 1 },
      { book: '4mo', chapter: 6, verse: 25 },
    ],
  },
  {
    book: '5mo',
    chapter: 31,
    from: 6,
    to: 8,
    title: '„Seid getrost und unverzagt“',
    historicalShort:
      'Die Ermutigung des Mose an das Volk und an Josua vor dem Übergang – ein Satz, der in der Bibel mehrfach fast wörtlich wiederkehrt.',
    historicalLong:
      'Die Formel gehört in die Sprache der Amtseinsetzung und der Kriegsansprache: Zuspruch, Auftrag, Beistandszusage. Sie richtet sich hier zuerst an das ganze Volk und dann an den Nachfolger, was ungewöhnlich ist – Führung wird nicht über die Gemeinschaft gestellt, sondern in sie hineingesprochen. Der Hebräerbrief zitiert den Vers und wendet ihn auf die Genügsamkeit an: Wer weiß, dass er nicht verlassen wird, braucht keinen Vorrat.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Abschnitt gehört zum Rahmen des Deuteronomiums und bereitet den Übergang zum Josuabuch vor. Die Wiederholung derselben Formel bindet beide Bücher zusammen.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Zuspruch wird dreifach gegeben – im Text selbst, weil einmal offenbar nicht reicht. Die Wiederholung wird als Zugeständnis an die Furcht gelesen, nicht als Stilmittel.',
      },
      {
        tradition: 'Neutestamentliche Aufnahme',
        text: 'Der Hebräerbrief zitiert den Vers in einem ganz anderen Zusammenhang: beim Umgang mit Geld. Die Zusage der Gegenwart wird dort zur Begründung von Genügsamkeit.',
      },
    ],
    crossRefs: [
      { book: 'jos', chapter: 1, verse: 9, note: 'Dieselbe Formel an Josua' },
      { book: 'hebr', chapter: 13, verse: 5, note: 'Das Zitat im Hebräerbrief' },
      { book: 'jes', chapter: 41, verse: 10 },
    ],
  },
  {
    book: '1sam',
    chapter: 16,
    from: 7,
    to: 7,
    title: '„Ein Mensch sieht, was vor Augen ist“',
    historicalShort:
      'Samuel soll einen König salben und greift nach dem Größten und Stattlichsten. Der Satz, der ihn korrigiert, ist zu einem der meistzitierten der Bibel geworden.',
    historicalLong:
      'Die Szene steht in bewusstem Gegensatz zur Wahl Sauls, von dem das Buch eigens vermerkt, er sei einen Kopf größer gewesen als alle anderen. Dass am Ende der Jüngste geholt wird, der die Schafe hütet und beim Festmahl gar nicht dabei war, gehört zum Muster vieler biblischer Erzählungen. Der Text spielt zugleich mit einer Ironie: Wenige Verse später wird David selbst als „bräunlich, mit schönen Augen“ beschrieben.\n\nDer Satz ist eine Zurechtweisung, und zwar an den Propheten. Samuel hat gerade Eliab gesehen und gedacht: Das muss er sein – dieselbe Fehleinschätzung, die er bei Saul gemacht hatte. Der Vers korrigiert also nicht irgendjemanden, sondern die Instanz, die es besser wissen sollte. Das Verb „sehen“ durchzieht das ganze Kapitel wie ein Faden: Samuel sieht, Gott sieht, der Mensch sieht. Die Erzählung ist als Lehrstück über Wahrnehmung gebaut, und ihre Pointe liegt darin, dass der Leser zusammen mit Samuel danebengreift.',
    reception:
      'Der Vers ist ein Standardtext gegen Äußerlichkeit – in der Jugendarbeit, in Predigten über Schönheitsideale, in der Diskussion um Diskriminierung. Er hat aber auch eine problematische Verwendung: Als Argument, Ungerechtigkeit sei nicht so wichtig, weil Gott ja das Herz ansehe. Der Erzählzusammenhang gibt das nicht her – es geht um die Auswahl eines Königs, also um eine sehr äußerliche Angelegenheit.',
    terms: [
      {
        word: 'hebr. lebab',
        rendered: 'Herz',
        note: 'Der Ort des Denkens und Entscheidens, nicht des Gefühls. „Auf das Herz sehen“ heißt: sehen, worauf jemand aus ist – nicht, wie warm er empfindet.',
      },
      {
        word: 'hebr. enajim',
        rendered: 'Augen',
        note: 'Wörtlich steht da „der Mensch sieht auf die Augen“ – gemeint ist das, was ins Auge fällt. Luthers „was vor Augen ist“ trifft den Sinn genau.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Erzählung legitimiert die davidische Dynastie gegen die Familie Sauls. Sie stammt aus einem Kreis, dem an dieser Begründung gelegen war.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Vers wird verbreitet gegen Bewertung nach Aussehen und Leistung angeführt. Er sagt nicht, dass Äußeres nichts bedeutet, sondern dass es nicht das Kriterium ist.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die Herzensschau bleibt Gott vorbehalten. Wer den Vers gebraucht, um selbst über die Motive anderer zu urteilen, dreht ihn um.',
      },
      {
        tradition: 'Literarische Beobachtung',
        text: 'Das Verb „sehen“ durchzieht das ganze Kapitel wie ein Faden – Samuel sieht, Gott sieht, der Mensch sieht. Die Erzählung ist als Lehrstück über Wahrnehmung gebaut, und ihre Pointe liegt nicht in einem Satz, sondern darin, dass der Leser zusammen mit Samuel danebengreift.',
      },
    ],
    crossRefs: [
      { book: '1sam', chapter: 9, verse: 2, note: 'Sauls Statur' },
      { book: '1sam', chapter: 16, verse: 12 },
      { book: 'joh', chapter: 7, verse: 24 },
    ],
  },
  {
    book: '1koe',
    chapter: 8,
    from: 27,
    to: 30,
    title: '„Aller Himmel Himmel können dich nicht fassen“',
    historicalShort:
      'Mitten in der Einweihung des Tempels steht die Frage, ob Gott überhaupt in einem Haus wohnen kann – gestellt von dem, der das Haus gebaut hat.',
    historicalLong:
      'Der Satz ist bemerkenswert: Er relativiert das eigene Bauwerk im Augenblick seiner Weihe. Salomo bittet nicht darum, dass Gott im Tempel wohne, sondern dass sein Name dort sei und dass er die Gebete höre, die zu diesem Ort hin gesprochen werden. Diese Unterscheidung zwischen Wohnen und Name ist theologisch bewusst gesetzt und wurde für das Judentum nach der Tempelzerstörung wichtig: Ein zerstörtes Haus bedeutet nicht das Ende der Beziehung. Stephanus zitiert den Gedanken in seiner Rede vor dem Hohen Rat.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Das Gebet trägt deutlich deuteronomistische Züge und dürfte in seiner Endgestalt aus der Exilszeit stammen – geschrieben, als es den Tempel nicht mehr gab.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die Unterscheidung von Ort und Gegenwart hat den Umgang mit der Zerstörung ermöglicht. Gebet nach Jerusalem hin bleibt bis heute Praxis, ohne den Ort zu vergöttern.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Stephanus führt die Stelle gegen eine Überhöhung des Tempels an. Sie gehört zu den biblischen Wurzeln der Kritik an jeder Verabsolutierung heiliger Orte.',
      },
    ],
    crossRefs: [
      { book: 'apg', chapter: 7, verse: 48, note: 'Stephanus zitiert den Gedanken' },
      { book: 'jes', chapter: 66, verse: 1 },
      { book: 'dan', chapter: 6, verse: 10 },
    ],
  },
  {
    book: '1koe',
    chapter: 19,
    from: 11,
    to: 13,
    title: 'Das stille sanfte Sausen',
    historicalShort:
      'Sturm, Erdbeben und Feuer ziehen vorüber – und in keinem davon ist Gott. Danach kommt etwas, das sich kaum übersetzen lässt.',
    historicalLong:
      'Elia ist nach dem Sieg auf dem Karmel geflohen und wünscht sich den Tod. Am Horeb, dem Berg der Weisung, wiederholt sich die Gotteserscheinung des Mose – aber ausdrücklich anders. Der hebräische Ausdruck bedeutet wörtlich etwa „Stimme verschwebenden Schweigens“; Luther übersetzt „ein stilles, sanftes Sausen“. Bemerkenswert ist, was danach geschieht: Gott stellt dieselbe Frage wie zuvor, Elia gibt dieselbe Antwort, und dann bekommt er einen Auftrag – und einen Nachfolger.\n\nVor der Szene liegt ein Zusammenbruch. Elia sitzt unter dem Wacholder und wünscht sich den Tod, und was Gott zuerst schickt, ist kein Wort, sondern Schlaf und Essen – zweimal, mit der Begründung, der Weg sei zu weit für ihn. Erst danach kommt der Berg. Auch die vierzig Tage sind zitiert: Es ist die Zeit, die Mose am selben Ort verbrachte. Die Erzählung stellt Elia damit neben Mose und nimmt ihm im selben Zug jede Größe – der Prophet, der eben noch vierhundert Baalspropheten gegenübertrat, ist am Ende seiner Kräfte.',
    reception:
      'Die „stille sanfte Stimme“ ist zum Grundwort der christlichen Kontemplation geworden, von den Wüstenvätern über die Mystik bis zu Exerzitien und Stilleretreats der Gegenwart. Mendelssohn vertonte die Szene in seinem *Elias* und traf damit den Ton, der bis heute mitschwingt.\n\nDie Auslegung hat dabei oft überhört, was direkt danach kommt: Elia bekommt keinen inneren Frieden, sondern drei politische Aufträge – zwei Könige zu salben und einen Nachfolger zu berufen. Die Stille ist in dieser Erzählung kein Ziel, sondern eine Zwischenstation.',
    terms: [
      {
        word: 'hebr. kol demama dakka',
        rendered: 'stilles, sanftes Sausen',
        note: 'Wörtlich etwa „Stimme verschwebenden Schweigens“ – eine Wendung, die im Hebräischen selbst rätselhaft ist. Übersetzungen reichen von „sanftem Säuseln“ bis zu „Ton verschwebender Stille“; Luthers Fassung hat die deutsche Frömmigkeitssprache geprägt.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Szene korrigiert die Vorstellung, Gott handle vor allem in Naturgewalt. Sie steht in bewusstem Kontrast zur Sinaierzählung, in der Feuer und Beben zur Erscheinung gehören.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Betont wird, dass Elia keine Antwort auf seine Klage bekommt, sondern eine Aufgabe. Der Trost besteht darin, gebraucht zu werden.',
      },
      {
        tradition: 'Spirituelle Auslegung',
        text: 'Der Text ist zum Grundtext der Kontemplation geworden. Kritisch wird angemerkt, dass er nicht Stille an sich empfiehlt, sondern eine bestimmte Erfahrung erzählt.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Vor der Szene liegt ein Zusammenbruch: Elia sitzt unter dem Wacholder und wünscht sich den Tod. Was Gott zuerst schickt, ist kein Wort, sondern Schlaf und Essen, zweimal. Manche lesen das Kapitel deshalb als den nüchternsten Text der Bibel über Erschöpfung – zuerst der Körper, dann die Frage.',
      },
    ],
    crossRefs: [
      { book: '2mo', chapter: 19, verse: 16, note: 'Die Erscheinung am Sinai' },
      { book: '1koe', chapter: 19, verse: 4, note: 'Elias Todeswunsch' },
      { book: 'ps', chapter: 46, verse: 10 },
    ],
  },
  {
    book: '2koe',
    chapter: 6,
    from: 16,
    to: 17,
    title: '„Derer ist mehr, die bei uns sind“',
    historicalShort:
      'Ein Diener sieht am Morgen die Stadt umstellt und gerät in Panik. Elisa betet nicht um Rettung, sondern darum, dass dem anderen die Augen aufgehen.',
    historicalLong:
      'Der Zusammenhang ist eine militärische Lage: Der König von Aram sucht Elisa und lässt Dotan umzingeln. Die Erzählung löst das nicht durch einen Kampf, sondern durch eine veränderte Wahrnehmung – und anschließend durch eine Blendung der Angreifer, die in einem Gastmahl endet, nicht in einer Hinrichtung. Dieser Schluss ist bemerkenswert: Elisa lässt die Gefangenen essen und ziehen, und die Überfälle hören auf.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Elisa-Erzählungen sind Wundergeschichten aus prophetischen Kreisen. Ihr Interesse liegt weniger im Vorgang als in der Frage, wer die Lage bestimmt.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Gebetet wird nicht um Veränderung der Umstände, sondern um offene Augen. Das wird häufig als Modell für Begleitung in Angst gelesen.',
      },
      {
        tradition: 'Ethische Auslegung',
        text: 'Der Ausgang – ein Gastmahl statt einer Hinrichtung – wird gegen jede Deutung angeführt, die den Text als Kriegserzählung liest.',
      },
    ],
    crossRefs: [
      { book: '2koe', chapter: 6, verse: 22, note: 'Das Gastmahl für die Gefangenen' },
      { book: 'ps', chapter: 34, verse: 7 },
      { book: '2chr', chapter: 32, verse: 7 },
    ],
  },
  {
    book: 'ps',
    chapter: 8,
    from: 3,
    to: 5,
    title: '„Was ist der Mensch?“',
    historicalShort:
      'Der Blick in den Nachthimmel führt nicht zur Erhabenheit Gottes allein, sondern zu einer Frage nach der eigenen Bedeutung – und zu einer überraschenden Antwort.',
    historicalLong:
      'Die Frage klingt nach Selbstverkleinerung, die Antwort dreht sie um: Der Mensch ist „wenig niedriger als Gott“ gemacht und mit Herrschaft betraut. Im Alten Orient galt allein der König als Statthalter der Gottheit; hier wird die Würde auf jeden Menschen ausgeweitet. Der Psalm rahmt das mit demselben Vers am Anfang und am Ende – die Würde ist eingefasst vom Lob, nicht selbstverständlich. Der Hebräerbrief zitiert die Stelle und bezieht sie auf Christus.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Psalm demokratisiert eine Königsvorstellung. Die Übersetzung von „Elohim“ in Vers 5 schwankt zwischen „Gott“ und „Engel“ – die Septuaginta wählte das Zweite, und der Hebräerbrief folgt ihr.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die Spannung zwischen Kleinheit und Beauftragung gilt als Grundbestimmung des Menschen: Er ist Staub und trägt Verantwortung.',
      },
      {
        tradition: 'Ökologische Lesart',
        text: 'Das Wort für „Herrschaft“ ist in der Neuzeit als Freibrief zur Ausbeutung gebraucht worden. Neuere Auslegung liest es vom Hirtenbild her: Herrschaft im Sinne von Sorge, nicht von Verbrauch.',
      },
    ],
    crossRefs: [
      { book: 'hebr', chapter: 2, verse: 6, note: 'Das Zitat im Hebräerbrief' },
      { book: '1mo', chapter: 1, verse: 28 },
      { book: 'ps', chapter: 8, verse: 1 },
    ],
  },
  {
    book: 'ps',
    chapter: 16,
    from: 11,
    to: 11,
    title: '„Vor dir ist Freude die Fülle“',
    historicalShort:
      'Der Psalm endet mit einer Zusage, die über den Tod hinausgreift – vorsichtig formuliert und dennoch weitreichend.',
    historicalLong:
      'Der Vers steht am Ende eines Vertrauenslieds, das mit der Bitte um Bewahrung beginnt. Die Wendung, Gott werde die Seele nicht dem Totenreich lassen, ist im Alten Testament ungewöhnlich; die meisten Texte kennen keine Hoffnung über den Tod hinaus. Ob der Psalm die Bewahrung vor dem Sterben oder darüber hinaus meint, ist im Hebräischen offen. Die Pfingstpredigt des Petrus zitiert den Psalm ausführlich und bezieht ihn auf die Auferstehung Jesu.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Psalm dürfte zunächst die Rettung aus Todesgefahr meinen. Die Öffnung auf eine Hoffnung über den Tod hinaus vollzieht sich in der Auslegungsgeschichte, nicht schon im Text.',
      },
      {
        tradition: 'Neutestamentliche Aufnahme',
        text: 'Petrus und Paulus führen den Psalm als Schriftbeweis an. Für sie ist entscheidend, dass David selbst gestorben und begraben ist – also müsse ein anderer gemeint sein.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Der Vers gehört zu den meistgelesenen Texten bei Beerdigungen und in der Osternacht.',
      },
    ],
    crossRefs: [
      { book: 'apg', chapter: 2, verse: 25, note: 'Die Pfingstpredigt zitiert den Psalm' },
      { book: 'ps', chapter: 73, verse: 25 },
      { book: 'joh', chapter: 14, verse: 6 },
    ],
  },
  {
    book: 'ps',
    chapter: 19,
    from: 1,
    to: 4,
    title: '„Die Himmel erzählen“',
    historicalShort:
      'Ein Lob ohne Worte: Der Psalm behauptet, die Schöpfung rede – und fügt hinzu, dass man dabei nichts hört.',
    historicalLong:
      'Der Psalm besteht aus zwei sehr verschiedenen Teilen, die manche für ursprünglich getrennt halten: die Himmel in den ersten Versen, dann das Lob der Weisung Gottes. Der Übergang ist Absicht: Zwei Weisen, Gott zu erkennen, stehen nebeneinander, ohne dass eine die andere ersetzt. Bemerkenswert ist die Sonnenbeschreibung – sie verwendet Bilder aus dem altorientalischen Sonnenkult und macht die Sonne dabei ausdrücklich zum Geschöpf. Paulus greift den ersten Teil in Römer 10 auf.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Zweiteilung ist auffällig. Wahrscheinlich wurde ein älteres Schöpfungslied mit einem Toralied verbunden – die Fuge ist noch sichtbar und theologisch bedeutsam.',
      },
      {
        tradition: 'Klassische kirchliche Auslegung',
        text: 'Der Psalm gilt als biblische Grundlage der Rede von zwei Büchern: Natur und Schrift. Beide sollen gelesen werden, ohne einander zu widersprechen.',
      },
      {
        tradition: 'Wirkungsgeschichte in der Musik',
        text: 'Haydn setzt den Vers in der „Schöpfung“, Beethoven in „Die Himmel rühmen“. Kaum ein Psalm ist so oft vertont worden.',
      },
    ],
    crossRefs: [
      { book: 'roem', chapter: 10, verse: 18, note: 'Paulus zitiert den Psalm' },
      { book: 'ps', chapter: 19, verse: 7 },
      { book: 'ps', chapter: 8, verse: 1 },
    ],
  },
  {
    book: 'ps',
    chapter: 27,
    from: 1,
    to: 3,
    title: '„Der HERR ist mein Licht“',
    historicalShort:
      'Ein Vertrauenslied, das mit einer rhetorischen Frage beginnt und mitten drin in eine Klage umschlägt – im selben Psalm.',
    historicalLong:
      'Die ersten Verse klingen unerschütterlich, ab Vers 7 wird gebeten und geklagt, am Ende steht die Aufforderung, auf den HERRN zu harren. Diese Bewegung ist typisch für den Psalter: Vertrauen wird nicht als Zustand beschrieben, sondern als etwas, das gegen die Umstände festgehalten wird. Das Bild vom Licht ist im Alten Testament selten als Gottesbezeichnung; häufiger steht es für Rettung und Leben. Der Psalm gehört im Judentum zur Zeit der Bußtage vor dem Neujahrsfest.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Zweiteiligkeit hat zu der These geführt, es handle sich um zwei Psalmen. Die Endgestalt setzt beides bewusst nebeneinander.',
      },
      {
        tradition: 'Jüdische Liturgie',
        text: 'Der Psalm wird im Monat Elul und bis zum Ende der Bußzeit täglich gebetet – als Text für eine Zeit der Prüfung.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Dass Zuversicht und Angst in einem Psalm stehen, wird als Erlaubnis gelesen, beides nebeneinander haben zu dürfen.',
      },
    ],
    crossRefs: [
      { book: 'ps', chapter: 27, verse: 7, note: 'Der Umschlag zur Klage' },
      { book: 'ps', chapter: 23, verse: 4 },
      { book: 'joh', chapter: 8, verse: 12 },
    ],
  },
  {
    book: 'ps',
    chapter: 32,
    from: 8,
    to: 9,
    title: '„Ich will dich unterweisen“',
    historicalShort:
      'Mitten im Psalm wechselt die Stimme: Nach dem Bekenntnis der Schuld spricht Gott selbst – und verspricht Begleitung mit den Augen.',
    historicalLong:
      'Der Psalm gehört zu den sieben Bußpsalmen. Nach der Schilderung, wie das Verschweigen der Schuld krank machte, und nach dem Eingeständnis folgt diese Zusage. Das Bild ist genau: nicht ein Zwang wie bei Ross und Maultier, sondern ein Blick. Der letzte Halbvers ist im Hebräischen schwierig und wird sehr unterschiedlich übersetzt. Paulus zitiert den Anfang des Psalms in Römer 4 als Beleg dafür, dass Gerechtigkeit zugerechnet wird.',
    interpretations: [
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Luther zählte den Psalm zu seinen liebsten. Für ihn zeigt er den Weg vom Verschweigen zum Bekennen und die Erleichterung, die daraus folgt.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der Psalm gehört zur Liturgie des Versöhnungstages. Betont wird der Zusammenhang von Aussprechen und Heilwerden.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Die Schilderung der psychosomatischen Folgen des Verschweigens – verdorrte Gebeine, Kraftverlust – wird oft als erstaunlich genaue Beobachtung gelesen.',
      },
    ],
    crossRefs: [
      { book: 'roem', chapter: 4, verse: 7, note: 'Paulus zitiert den Psalmanfang' },
      { book: 'ps', chapter: 51, verse: 3 },
      { book: 'ps', chapter: 32, verse: 3 },
    ],
  },
  {
    book: 'ps',
    chapter: 34,
    from: 8,
    to: 10,
    title: '„Schmecket und sehet“',
    historicalShort:
      'Eine Einladung, die nicht argumentiert, sondern zum Ausprobieren auffordert – mit einem Verb, das sonst dem Essen gehört.',
    historicalLong:
      'Der Psalm ist alphabetisch aufgebaut; jeder Vers beginnt mit dem nächsten Buchstaben. Solche Form dient dem Auswendiglernen und signalisiert Vollständigkeit. Der Vers wurde früh in die Abendmahlsliturgie aufgenommen – schon die Jerusalemer Katechesen des 4. Jahrhunderts nennen ihn als Gesang zur Kommunion. Der erste Petrusbrief zitiert ihn im Zusammenhang mit dem Wachsen im Glauben.',
    interpretations: [
      {
        tradition: 'Liturgische Rezeption',
        text: 'Der Vers ist einer der ältesten Kommuniongesänge der Christenheit und wird bis heute in Ost und West gesungen.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der Psalm gehört zum Sabbatmorgen. Das „Schmecken“ wird als Erfahrungswissen gelesen: Über Gott lässt sich nicht nur reden.',
      },
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Überschrift verbindet den Psalm mit einer Episode aus dem Leben Davids. Solche Zuordnungen sind spätere Zusätze und passen oft nur lose zum Inhalt.',
      },
    ],
    crossRefs: [
      { book: '1petr', chapter: 2, verse: 3, note: 'Das Zitat im ersten Petrusbrief' },
      { book: 'ps', chapter: 34, verse: 1 },
      { book: 'ps', chapter: 119, verse: 103 },
    ],
  },
  {
    book: 'ps',
    chapter: 37,
    from: 4,
    to: 6,
    title: '„Habe deine Lust am HERRN“',
    historicalShort:
      'Ein Weisheitspsalm über die Frage, warum es den Ungerechten gut geht – und der berühmte Vers steht mitten in dieser Auseinandersetzung.',
    historicalLong:
      'Der Psalm ist alphabetisch aufgebaut und gehört zur Weisheitsdichtung. Sein Thema ist das Ärgernis, dass Gewalttätige Erfolg haben; die Antwort besteht in einer Zeitperspektive: Es hat keinen Bestand. Der Vers vom Wünschen des Herzens wird häufig als Zusage gelesen, Gott erfülle Wünsche. Im Zusammenhang steht er anders: Wer seine Freude an Gott hat, dessen Wünsche verändern sich. Die Qumranrolle 4QpPs37 legt den Psalm ausführlich auf die eigene Gemeinschaft aus.',
    interpretations: [
      {
        tradition: 'Weisheitliche Auslegung',
        text: 'Der Psalm gehört in dieselbe Debatte wie Hiob und Psalm 73. Anders als Hiob löst er die Frage mit dem Hinweis auf die Zeit, was viele als zu glatt empfinden.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die verbreitete Lesart als Wunscherfüllungsversprechen wird von den meisten Auslegern zurückgewiesen: Der Vers steht in einem Text über Geduld, nicht über Erfolg.',
      },
      {
        tradition: 'Neutestamentliche Aufnahme',
        text: 'Die Seligpreisung der Sanftmütigen zitiert Vers 11 dieses Psalms fast wörtlich.',
      },
    ],
    crossRefs: [
      { book: 'mt', chapter: 5, verse: 5, note: 'Die Seligpreisung zitiert Vers 11' },
      { book: 'ps', chapter: 73, verse: 3 },
      { book: 'ps', chapter: 37, verse: 11 },
    ],
  },
  {
    book: 'ps',
    chapter: 42,
    from: 1,
    to: 5,
    title: '„Wie der Hirsch schreit“',
    historicalShort:
      'Ein Psalm der Gottesferne, gebetet von jemandem, der die Nähe kennt und sie vermisst – die Erinnerung an Feste macht es schlimmer, nicht besser.',
    historicalLong:
      'Der Psalm gehört mit Psalm 43 zusammen; beide teilen denselben Kehrvers. Der Beter ist offenbar fern vom Heiligtum, im Norden am Hermon. Bemerkenswert ist die Wendung an die eigene Seele: Der Beter redet mit sich selbst und hält sich zur Hoffnung an, ohne dass sich die Lage ändert. Der Vorwurf der anderen – „wo ist nun dein Gott?“ – wird nicht widerlegt.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Einheit von Psalm 42 und 43 gilt als gesichert; die Trennung ist erst später entstanden. Der Kehrvers gliedert das Ganze in drei Teile.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Psalm wird häufig bei Depression und Trauer gelesen. Er beschönigt nichts und gibt der Sehnsucht dennoch Worte – das gilt vielen als seine Stärke.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Der Vers eröffnet in vielen Traditionen die Taufliturgie und die Osternacht; das Bild vom dürstenden Hirsch prägt die frühchristliche Kunst.',
      },
    ],
    crossRefs: [
      { book: 'ps', chapter: 43, verse: 5, note: 'Derselbe Kehrvers' },
      { book: 'ps', chapter: 63, verse: 1 },
      { book: 'joh', chapter: 7, verse: 37 },
    ],
  },
  {
    book: 'ps',
    chapter: 46,
    from: 1,
    to: 3,
    title: '„Gott ist unsre Zuversicht“',
    historicalShort:
      'Der Psalm, aus dem Luthers bekanntestes Lied entstand – und er beginnt mit der Vorstellung, dass die Welt aus den Fugen gerät.',
    historicalLong:
      'Die Bilder sind kosmisch: Berge stürzen ins Meer, das Wasser tobt. Im altorientalischen Denken ist das Meer die Chaosmacht schlechthin. Dagegen steht ein Bild von großer Ruhe: ein Strom, dessen Bäche die Stadt Gottes erfreuen – Jerusalem hatte keinen Fluss, das Bild ist also bewusst gegen die Wirklichkeit gesetzt. Luther dichtete daraus 1529 „Ein feste Burg ist unser Gott“, das Lied wurde zur Hymne der Reformation.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Psalm gehört zu den Zionsliedern, die die Unerschütterlichkeit der Gottesstadt besingen. Nach 587 v. Chr. musste sich diese Zuversicht neu bewähren.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Luthers Lied ist keine Übersetzung, sondern eine freie Umdichtung in einer Zeit persönlicher und politischer Bedrängnis.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die Rede von der uneinnehmbaren Stadt ist historisch widerlegt worden. Ausleger fragen deshalb, ob der Psalm eine Sicherheit verspricht oder eine Haltung inmitten der Unsicherheit beschreibt.',
      },
    ],
    crossRefs: [
      { book: 'ps', chapter: 46, verse: 10, note: '„Seid stille“' },
      { book: 'ps', chapter: 48, verse: 1 },
      { book: 'jes', chapter: 8, verse: 10 },
    ],
  },
  {
    book: 'ps',
    chapter: 46,
    from: 10,
    to: 11,
    title: '„Seid stille und erkennet“',
    historicalShort:
      'Der Satz klingt nach Meditation. Im Zusammenhang ist er ein Machtwort an kriegführende Völker: Lasst ab.',
    historicalLong:
      'Das hebräische Verb bedeutet „lasst nach, lasst die Hände sinken“ – gemeint ist das Einstellen des Kampfes, nicht innere Sammlung. Unmittelbar davor steht die Beschreibung, wie Bogen zerbrochen und Wagen verbrannt werden. Die verbreitete Lesart als Einladung zur Stille ist damit nicht falsch, aber sie verschiebt den Ton erheblich. Beide Deutungen haben eine lange Geschichte nebeneinander.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Anrede richtet sich an die Völker, nicht an den Beter. Der Vers ist ein Abrüstungsbefehl in poetischer Form.',
      },
      {
        tradition: 'Spirituelle Auslegung',
        text: 'Die kontemplative Tradition hat den Vers seit den Wüstenvätern als Ruf in die Stille gelesen. Diese Wirkungsgeschichte ist eigenständig und alt.',
      },
      {
        tradition: 'Politische Lesart',
        text: 'Friedensbewegungen führen den Vers in seiner ursprünglichen Bedeutung an: Der Text beschreibt das Ende von Krieg als Erkenntnisvorgang.',
      },
    ],
    crossRefs: [
      { book: 'ps', chapter: 46, verse: 9, note: 'Der Zusammenhang: zerbrochene Bogen' },
      { book: 'jes', chapter: 2, verse: 4 },
      { book: 'ps', chapter: 76, verse: 3 },
    ],
  },
  {
    book: 'ps',
    chapter: 55,
    from: 22,
    to: 23,
    title: '„Wirf dein Anliegen auf den HERRN“',
    historicalShort:
      'Der Vers steht nicht in einem Trostpsalm, sondern in einer Klage über den Verrat eines vertrauten Freundes.',
    historicalLong:
      'Der Psalm schildert bitter, wie jemand, mit dem der Beter „süße Heimlichkeit“ hatte, sich gegen ihn wandte. Die Wut ist unverstellt, bis hin zum Wunsch, die Feinde möchten lebendig ins Totenreich fahren. Genau dazwischen steht die Aufforderung, die Last abzugeben. Das hebräische Wort meint eher „was dir aufgeladen ist“ als eine innere Sorge. Der erste Petrusbrief nimmt den Vers auf.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Psalm gehört zu den Klagen des Einzelnen. Die Nähe des Feindes – ein Vertrauter – macht ihn zu einem der schmerzhaftesten Texte des Psalters.',
      },
      {
        tradition: 'Neutestamentliche Aufnahme',
        text: 'Der erste Petrusbrief zitiert den Vers und ergänzt die Begründung: „denn er sorgt für euch“.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Dass der Trostvers inmitten von Wut und Rachewünschen steht, wird als Realismus gelesen: Abgeben heißt nicht, vorher fromm werden zu müssen.',
      },
    ],
    crossRefs: [
      { book: '1petr', chapter: 5, verse: 7, note: 'Das Zitat im ersten Petrusbrief' },
      { book: 'ps', chapter: 55, verse: 12 },
      { book: 'mt', chapter: 11, verse: 28 },
    ],
  },
  {
    book: 'ps',
    chapter: 62,
    from: 1,
    to: 2,
    title: '„Meine Seele sei stille zu Gott“',
    historicalShort:
      'Ein Psalm, der dasselbe Wort für „nur“ oder „allein“ sechsmal setzt – eine Konzentrationsübung in Sprache.',
    historicalLong:
      'Das hebräische Wörtchen „ach“ steht am Anfang mehrerer Verse und schränkt jedes Mal ein: allein Gott, nur er, nichts sonst. Zugleich wird nüchtern festgestellt, dass Menschen „ein Hauch“ sind – Hohe wie Niedrige, und beide zusammen wögen weniger als nichts. Der Psalm endet mit einem Doppelsatz über Macht und Güte Gottes, den die rabbinische Auslegung viel diskutiert hat: Eines sei gehört, zweierlei vernommen.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Psalm verbindet Vertrauensaussage und Weisheitsmahnung. Die Warnung vor Gewalt und unrechtem Gut zeigt einen sozialen Hintergrund.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der Schlussvers – einmal gesprochen, zweifach gehört – gilt als Hinweis darauf, dass Macht und Güte bei Gott nicht auseinanderfallen.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Die Stille ist hier kein Rückzug, sondern ein Warten. Das hebräische Wort meint ein Schweigen, das auf Antwort gerichtet ist.',
      },
    ],
    crossRefs: [
      { book: 'ps', chapter: 62, verse: 9, note: 'Menschen sind ein Hauch' },
      { book: 'ps', chapter: 46, verse: 10 },
      { book: 'ps', chapter: 131, verse: 2 },
    ],
  },
  {
    book: 'ps',
    chapter: 73,
    from: 25,
    to: 28,
    title: '„Wenn ich nur dich habe“',
    historicalShort:
      'Der Psalm beginnt mit dem Ärger darüber, dass es den Gottlosen gut geht, und endet mit einem der dichtesten Sätze des Alten Testaments.',
    historicalLong:
      'Der Wendepunkt steht in der Mitte: „bis ich ging in das Heiligtum Gottes und merkte auf ihr Ende“. Was sich dort ändert, ist nicht die Lage, sondern die Perspektive. Der Schluss formuliert eine Gottesbeziehung, die ohne Gegenleistung auskommt – nicht einmal Himmel und Erde werden noch verlangt. Viele Ausleger sehen hier eine der Stellen, an denen sich im Alten Testament eine Hoffnung über den Tod hinaus andeutet.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Psalm gehört zur Weisheitsdichtung und behandelt dasselbe Problem wie Hiob. Seine Lösung ist keine Erklärung, sondern eine veränderte Beziehung.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Der Vers wurde als Ausdruck des Glaubens gelesen, der nichts als Gott selbst begehrt. Bonhoeffer nannte Psalm 73 einen der Texte, die ihn im Gefängnis trugen.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Betont wird der Ort der Wende: das Heiligtum. Die Einsicht kommt nicht durch Nachdenken allein, sondern im Gottesdienst.',
      },
    ],
    crossRefs: [
      { book: 'ps', chapter: 73, verse: 17, note: 'Der Wendepunkt' },
      { book: 'hi', chapter: 19, verse: 25 },
      { book: 'ps', chapter: 16, verse: 11 },
    ],
  },
  {
    book: 'ps',
    chapter: 90,
    from: 12,
    to: 17,
    title: '„Lehre uns bedenken, dass wir sterben müssen“',
    historicalShort:
      'Der einzige Psalm, der Mose zugeschrieben wird – und der nüchternste Text des Psalters über die Länge eines Lebens.',
    historicalLong:
      'Siebzig Jahre, wenn es hoch kommt achtzig, und das Beste daran sei Mühe und Arbeit gewesen: Der Psalm beschönigt nichts. Umso bemerkenswerter ist die Bitte, die daraus folgt – nicht um mehr Zeit, sondern um Einsicht in die begrenzte. Der Schluss bittet darum, dass das Werk der Hände Bestand habe. Isaac Watts dichtete daraus 1719 „O God, our help in ages past“, eines der bekanntesten englischen Kirchenlieder.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Zuschreibung an Mose ist eine spätere Überschrift. Der Psalm dürfte aus nachexilischer Zeit stammen und Gemeindeklage sein.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Der Psalm gehört zu den festen Texten am Jahreswechsel und bei Beerdigungen in fast allen Traditionen.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Die Bitte richtet sich auf Klugheit, nicht auf Trost. Sterblichkeit wird als Bedingung eines vernünftigen Lebens verstanden, nicht als Zumutung.',
      },
    ],
    crossRefs: [
      { book: 'ps', chapter: 90, verse: 10, note: 'Siebzig Jahre' },
      { book: 'pred', chapter: 3, verse: 1 },
      { book: 'jak', chapter: 4, verse: 14 },
    ],
  },
  {
    book: 'ps',
    chapter: 91,
    from: 1,
    to: 4,
    title: '„Unter dem Schirm des Höchsten“',
    historicalShort:
      'Ein Psalm voller Schutzbilder – und zugleich einer der am häufigsten missverstandenen Texte der Bibel.',
    historicalLong:
      'Die Bildfolge ist dicht: Schirm, Schatten, Burg, Fittiche, Schild. Im Alten Orient waren solche Formeln aus Amuletttexten bekannt, und in Qumran fanden sich tatsächlich Psalmen dieser Art als Abwehrtexte. Genau diese Zusagen zitiert der Teufel in der Versuchungsgeschichte – und Jesus weist die Anwendung zurück. Damit steht im Neuen Testament eine ausdrückliche Warnung davor, den Psalm als Garantie zu lesen.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Psalm gehört zu den Vertrauenspsalmen mit stark schützender Bildsprache. Ein liturgischer Gebrauch als Segenswort ist wahrscheinlich.',
      },
      {
        tradition: 'Neutestamentliche Aufnahme',
        text: 'Dass der Versucher den Psalm zitiert, ist eines der schärfsten innerbiblischen Beispiele dafür, dass ein richtiger Text falsch gebraucht werden kann.',
      },
      {
        tradition: 'Seelsorgliche Warnung',
        text: 'Wer den Psalm als Versprechen liest, dass nichts geschehen kann, gerät bei jedem Unglück in eine Krise. Ausleger empfehlen, ihn als Zusage der Gegenwart zu lesen, nicht der Unversehrtheit.',
      },
    ],
    crossRefs: [
      { book: 'mt', chapter: 4, verse: 6, note: 'Der Versucher zitiert den Psalm' },
      { book: 'ps', chapter: 91, verse: 11 },
      { book: 'ps', chapter: 121, verse: 1 },
    ],
  },
  {
    book: 'ps',
    chapter: 103,
    from: 1,
    to: 5,
    title: '„Lobe den HERRN, meine Seele“',
    historicalShort:
      'Der Psalm redet nicht zu Gott, sondern zu sich selbst – und zählt auf, was leicht zu vergessen ist.',
    historicalLong:
      'Die Aufforderung an die eigene Seele rahmt den ganzen Psalm; sie kehrt am Ende wieder. Die Liste ist konkret: Vergebung, Heilung, Erlösung aus der Grube, Krönung mit Gnade. Der Mittelteil enthält die Formel von Gott als barmherzig und gnädig, geduldig und von großer Güte – ein Bekenntnissatz, der aus 2. Mose 34 stammt und im Alten Testament etwa ein Dutzend Mal wiederkehrt. Am Ende steht das Bild vom Menschen als Gras und vom Erbarmen, das von Ewigkeit zu Ewigkeit reicht.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Psalm ist sprachlich jünger und setzt eine ausgebildete Bekenntnistradition voraus. Die Gnadenformel aus 2. Mose 34 ist sein Kern.',
      },
      {
        tradition: 'Jüdische Liturgie',
        text: 'Der Psalm gehört zu den Bußtagen. Die Formel der dreizehn Eigenschaften Gottes, auf die er anspielt, wird an Jom Kippur wiederholt gebetet.',
      },
      {
        tradition: 'Wirkungsgeschichte in der Musik',
        text: 'Paul Gerhardt und Johann Gramann haben den Psalm gedichtet, Mendelssohn und Bach ihn vertont. „Nun lob, mein Seel, den Herren“ folgt ihm Vers für Vers.',
      },
    ],
    crossRefs: [
      { book: '2mo', chapter: 34, verse: 6, note: 'Die Gnadenformel' },
      { book: 'ps', chapter: 103, verse: 15 },
      { book: 'ps', chapter: 103, verse: 22 },
    ],
  },
  {
    book: 'ps',
    chapter: 118,
    from: 22,
    to: 24,
    title: '„Der Stein, den die Bauleute verworfen haben“',
    historicalShort:
      'Ein Bild aus dem Bauhandwerk, das zum meistzitierten Vers des Alten Testaments im Neuen geworden ist.',
    historicalLong:
      'Der Psalm gehört zum Hallel, das an den Wallfahrtsfesten gesungen wurde – Jesus und die Jünger dürften ihn beim letzten Mahl gesungen haben. Der Eckstein ist entweder der Grundstein an der Ecke oder der Schlussstein im Gewölbe; das hebräische Wort lässt beides zu. Der Vers wird im Neuen Testament sechsmal zitiert, unter anderem am Ende des Gleichnisses von den bösen Weingärtnern und in der Verteidigungsrede des Petrus vor dem Hohen Rat.',
    interpretations: [
      {
        tradition: 'Jüdische Auslegung',
        text: 'Im ursprünglichen Zusammenhang steht der Vers für Israel oder den König: verachtet unter den Völkern und dennoch erwählt.',
      },
      {
        tradition: 'Neutestamentliche Aufnahme',
        text: 'Die frühe Kirche las den Vers auf Christus. Die Häufigkeit der Zitate zeigt, wie zentral dieses Deutungsmuster war: Verwerfung und Erhöhung gehören zusammen.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Der folgende Vers – „dies ist der Tag, den der HERR macht“ – ist der Osterruf schlechthin und steht in allen Konfessionen in der Osterliturgie.',
      },
    ],
    crossRefs: [
      { book: 'mk', chapter: 12, verse: 10, note: 'Am Ende der bösen Weingärtner' },
      { book: 'apg', chapter: 4, verse: 11 },
      { book: '1petr', chapter: 2, verse: 7 },
    ],
  },
  {
    book: 'ps',
    chapter: 119,
    from: 105,
    to: 106,
    title: '„Ein Licht auf meinem Wege“',
    historicalShort:
      'Der Vers steht im längsten Kapitel der Bibel – 176 Verse, alphabetisch geordnet, alle über die Weisung Gottes.',
    historicalLong:
      'Psalm 119 ist ein kunstvolles Akrostichon: Je acht Verse beginnen mit demselben Buchstaben, durch das ganze hebräische Alphabet. In fast jedem Vers steht eines von acht Wörtern für die Weisung – Gesetz, Zeugnisse, Befehle, Gebote, Rechte, Wort, Rede, Wege. Das Bild der Leuchte ist genau: Eine antike Öllampe erhellte nicht den Weg, sondern den nächsten Schritt. Der Psalm feiert die Tora nicht als Last, sondern als Freude – ein Zug, der christlichen Lesern oft fremd bleibt.',
    interpretations: [
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der Psalm ist die ausführlichste Liebeserklärung an die Tora in der ganzen Bibel. Ihre Befolgung erscheint als Freiheit, nicht als Zwang.',
      },
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Form dient dem Gedächtnis und signalisiert Vollständigkeit. Der Psalm stammt aus nachexilischer Zeit, als die Schrift zum Mittelpunkt wurde.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die christliche Auslegung hat den Psalm oft auf das „Wort“ im Sinne der Bibel oder Christi umgedeutet. Damit geht verloren, dass hier die Tora gemeint ist.',
      },
    ],
    crossRefs: [
      { book: 'ps', chapter: 1, verse: 2 },
      { book: 'ps', chapter: 19, verse: 7 },
      { book: 'joh', chapter: 8, verse: 12 },
    ],
  },
  {
    book: 'ps',
    chapter: 127,
    from: 1,
    to: 2,
    title: '„Wo der HERR nicht das Haus baut“',
    historicalShort:
      'Ein kurzer Weisheitspsalm gegen die Überschätzung der eigenen Anstrengung – und mit einem überraschenden Satz über den Schlaf.',
    historicalLong:
      'Das Wort „Haus“ meint hier zugleich Gebäude, Familie und Dynastie; der zweite Teil des Psalms handelt von Kindern. Der Vers über das frühe Aufstehen und späte Sitzen beschreibt eine Arbeitshaltung, die schon in der Antike verbreitet war. Der letzte Halbvers ist umstritten: Er kann heißen, Gott gebe den Seinen den Schlaf, oder er gebe ihnen im Schlaf. Beide Übersetzungen sind grammatisch möglich, und beide haben eine lange Auslegungsgeschichte.',
    interpretations: [
      {
        tradition: 'Weisheitliche Auslegung',
        text: 'Der Psalm richtet sich nicht gegen Arbeit, sondern gegen die Sorge, die glaubt, alles hänge an ihr. Die Grenze verläuft zwischen Mühe und Verkrampfung.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der Psalm gehört zu den Wallfahrtsliedern und wird traditionell mit Salomo verbunden – dem Erbauer des Tempels, dessen Bau er relativiert.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Satz über den Schlaf wird häufig gegen die Selbstausbeutung angeführt: Erholung ist im Text kein Zugeständnis, sondern eine Gabe.',
      },
    ],
    crossRefs: [
      { book: 'ps', chapter: 127, verse: 3 },
      { book: 'mt', chapter: 6, verse: 25 },
      { book: 'pred', chapter: 2, verse: 22 },
    ],
  },
  {
    book: '2chr',
    chapter: 20,
    from: 15,
    to: 17,
    title: '„Ihr streitet nicht, sondern Gott“',
    historicalShort:
      'Ein Heer rückt an, der König ruft ein Fasten aus – und die Antwort kommt durch einen Leviten mitten in der Versammlung.',
    historicalLong:
      'Die Chronik erzählt den Feldzug als Gottesdienst: Vorn ziehen die Sänger, nicht die Bewaffneten. Historisch lässt sich der Vorgang nicht überprüfen; die Königsbücher kennen ihn nicht. Für den Chronisten ist er ein Musterfall dafür, wie eine wehrlose Gemeinde in der Perserzeit bestehen kann – ohne Heer, aber mit Gottesdienst. Der Ortsname Berakja, Tal des Lobes, wird eigens erklärt.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Erzählung ist Sondergut der Chronik und dient ihrem Programm: Der Tempeldienst ist die eigentliche Kraft des Volkes.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Satz wird häufig in Überforderung zitiert. Im Text folgt ihm allerdings ein Auftrag: hinabziehen und sich aufstellen – Passivität ist nicht gemeint.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Der Text lässt Feinde einander umbringen. Ausleger halten fest, dass hier eine bedrängte Gemeinde ihre Ohnmacht besingt und keine Kriegslehre entwirft.',
      },
    ],
    crossRefs: [
      { book: '2chr', chapter: 20, verse: 3, note: 'Das Fasten des Königs' },
      { book: '2mo', chapter: 14, verse: 14 },
      { book: 'ps', chapter: 46, verse: 10 },
    ],
  },
  {
    book: 'hi',
    chapter: 1,
    from: 20,
    to: 22,
    title: '„Der Name des HERRN sei gelobt“',
    historicalShort:
      'Nach dem Verlust von Besitz und Kindern steht Hiob auf, zerreißt sein Gewand – und betet.',
    historicalLong:
      'Die Reaktion folgt den Trauerriten der Zeit: Kleider zerreißen, das Haupt scheren, sich zur Erde werfen. Der Satz, den Hiob dabei spricht, ist zur Formel geworden; im Text ist er keine Erklärung, sondern ein Lobpreis mitten im Zusammenbruch. Der Erzähler fügt eigens hinzu, Hiob habe nicht töricht geredet. Wer das Buch weiterliest, findet allerdings ab Kapitel 3 einen ganz anderen Ton: Hiob verflucht den Tag seiner Geburt.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Rahmenerzählung und Dichtung stammen wahrscheinlich aus verschiedenen Händen. Der geduldige Hiob des Prologs und der anklagende der Dialoge stehen unausgeglichen nebeneinander.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Der Vers gehört zu den festen Texten bei Beerdigungen. Kritisch wird angemerkt, dass er Trauernden leicht als Vorschrift zugemutet wird.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Betont wird, dass das Buch die Geduld nicht als letztes Wort stehen lässt. Die Klage, die folgt, wird von Gott am Ende ausdrücklich gerechtfertigt.',
      },
    ],
    crossRefs: [
      { book: 'hi', chapter: 3, verse: 1, note: 'Der Umschlag zur Klage' },
      { book: 'hi', chapter: 42, verse: 7 },
      { book: '1thess', chapter: 5, verse: 18 },
    ],
  },
  {
    book: 'hi',
    chapter: 42,
    from: 1,
    to: 6,
    title: 'Hiobs letzte Antwort',
    historicalShort:
      'Nach den Gottesreden gibt Hiob eine Antwort, die seit jeher unterschiedlich gelesen wird: als Widerruf oder als Ende eines Streits, in dem er recht behalten hat.',
    historicalLong:
      'Der entscheidende Vers ist im Hebräischen mehrdeutig. Er kann heißen „ich widerrufe und tue Buße in Staub und Asche“ oder „ich verwerfe und bereue Staub und Asche“ – also das Trauergewand, in dem er sitzt. Im ersten Fall gibt Hiob nach, im zweiten steht er auf. Unmittelbar danach erklärt Gott ausdrücklich, Hiob habe recht von ihm geredet und seine Freunde nicht. Diese Reihenfolge macht die zweite Lesart für viele wahrscheinlicher.\n\nWas danach kommt, ist so überraschend wie der Vers selbst: Gott erklärt Hiobs Freunde für im Unrecht und Hiob für im Recht – ausgerechnet den, der geklagt und angeklagt hat. Und Hiob muss für sie beten. Der Rahmen schließt mit einer Wiederherstellung: doppelt so viel Vieh, wieder zehn Kinder, und als einzige werden die drei Töchter mit Namen genannt und bekommen Erbteil unter ihren Brüdern – im damaligen Recht ungewöhnlich. Vielen Lesern ist gerade dieser Schluss anstößig, weil sich verlorene Kinder nicht ersetzen lassen.',
    reception:
      'Ein Teil der Forschung hält den erzählenden Rahmen für älter als die Dichtung in der Mitte: Das Volksbuch vom geduldigen Hiob wäre dann von einem Dichter aufgebrochen worden, der ihm einen Anklagenden in den Mund legt. Die Sammlung hat beides nebeneinander stehen lassen, und die Spannung ist bis heute nicht geglättet.\n\nNach 1945 ist Hiob zum Bezugstext der Theodizee-Debatte geworden. Elie Wiesel, Ernst Bloch und Carl Gustav Jung haben ihn je verschieden gelesen – als Anklage, als Aufstand, als Reifungsgeschichte Gottes. Gemeinsam ist ihnen, dass sie den Freunden Hiobs nicht glauben; und darin folgen sie dem Buch, das genau diese Freunde am Ende zurechtweist.',
    terms: [
      {
        word: 'hebr. nicham',
        rendered: 'tue Buße',
        note: 'Das Verb heißt bereuen, aber auch sich trösten lassen und seinen Sinn ändern. Dasselbe Wort steht, wenn Gott sein Vorhaben ändert. Die Bandbreite ist der Grund, warum der Schlussvers so verschieden übersetzt wird.',
      },
      {
        word: 'hebr. raa',
        rendered: 'gesehen',
        note: 'Sehen im Sinn von: unmittelbar begegnen. Der Gegensatz zu „mit den Ohren gehört“ ist der Bogen des ganzen Buches – vom Hörensagen über Gott zur Begegnung mit ihm.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Übersetzungsfrage ist unentschieden und theologisch folgenreich. Sie entscheidet darüber, ob das Buch mit einer Unterwerfung oder mit einer Rehabilitierung endet.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Betont wird der Satz „nun aber hat mein Auge dich gesehen“. Die Wende liegt in der Begegnung, nicht in einer Erklärung.',
      },
      {
        tradition: 'Theologische Rückfrage',
        text: 'Dass Gott den Freunden widerspricht, die ihn verteidigt hatten, gehört zu den überraschendsten Zügen der Bibel: Die fromme Rede wird getadelt, die anklagende gerechtfertigt.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Auffällig ist, was Gott am Ende nicht tut: Er erklärt nichts. Auf die Frage nach dem Warum kommt keine Antwort, sondern eine Gegenrede über Sternbilder, Wildesel und Nilpferde. In der Trauerbegleitung wird das oft als Hinweis gelesen, dass Anwesenheit tragfähiger ist als Erklärung.',
      },
    ],
    crossRefs: [
      { book: 'hi', chapter: 42, verse: 7, note: 'Gott gibt Hiob recht' },
      { book: 'hi', chapter: 38, verse: 1 },
      { book: 'hi', chapter: 19, verse: 25 },
    ],
  },
  {
    book: 'spr',
    chapter: 4,
    from: 23,
    to: 27,
    title: '„Behüte dein Herz“',
    historicalShort:
      'Das Herz ist in der Bibel nicht der Sitz des Gefühls, sondern der Ort der Entscheidungen. Es zu behüten heißt, auf die eigenen Weichenstellungen zu achten.',
    historicalLong:
      'Der Vers steht in einer Reihe von Mahnungen an den „Sohn“ – die Sprüche sind als Unterweisung eines Lehrers an einen Schüler gestaltet. Was folgt, ist eine Aufzählung von Körperteilen: Mund, Augen, Füße. Das Herz kommt zuerst, weil von ihm alles andere abhängt. Der hebräische Ausdruck für „daraus geht das Leben“ meint wörtlich die Quellen des Lebens.',
    interpretations: [
      {
        tradition: 'Weisheitliche Auslegung',
        text: 'Die Sprüche setzen auf Gewöhnung, nicht auf Einsicht allein. Was einer regelmäßig tut, prägt sein Herz – und das Herz prägt dann wieder das Tun.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Das Herz gilt als Ort, an dem der gute und der böse Trieb miteinander ringen. Behüten heißt hier: die Richtung nicht dem Zufall überlassen.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Vers wird häufig als Rat zur Abgrenzung gelesen. Der Zusammenhang legt eher nahe, auf das zu achten, was man selbst hervorbringt.',
      },
    ],
    crossRefs: [
      { book: 'spr', chapter: 4, verse: 20 },
      { book: 'mk', chapter: 7, verse: 21 },
      { book: 'mt', chapter: 6, verse: 21 },
    ],
  },
  {
    book: 'spr',
    chapter: 16,
    from: 9,
    to: 9,
    title: '„Des Menschen Herz erdenkt sich seinen Weg“',
    historicalShort:
      'Ein Vers über Planung und ihre Grenze – und einer, den man leicht als Absage an jede Planung missversteht.',
    historicalLong:
      'Das Sprüchebuch enthält mehrere Verse dieser Bauart: Der Mensch plant, Gott lenkt. Sie stehen nicht im Widerspruch zu den vielen Mahnungen, klug und vorausschauend zu handeln, sondern begrenzen sie. Die Weisheit Israels rechnet mit Regelmäßigkeit und mit ihrer Durchbrechung zugleich. Ähnliche Sprüche finden sich in ägyptischen Weisheitstexten, mit denen Kapitel 22 sogar wörtliche Berührungen aufweist.',
    interpretations: [
      {
        tradition: 'Weisheitliche Auslegung',
        text: 'Die Sprüche mahnen an Dutzenden Stellen zu Fleiß und Voraussicht. Dieser Vers hebt das nicht auf, sondern nimmt der Planung die Endgültigkeit.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Der Vers wurde zur Grundlage der Lehre von der Vorsehung: Gott handelt nicht neben menschlichem Tun, sondern durch es hindurch.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Wer den Vers als Vertröstung gebraucht, verfehlt ihn. Er entlastet vom Zwang zur Kontrolle, nicht von der Verantwortung.',
      },
    ],
    crossRefs: [
      { book: 'spr', chapter: 16, verse: 1 },
      { book: 'jak', chapter: 4, verse: 13 },
      { book: 'spr', chapter: 19, verse: 21 },
    ],
  },
  {
    book: 'spr',
    chapter: 18,
    from: 10,
    to: 12,
    title: '„Ein festes Schloss“',
    historicalShort:
      'Der Name Gottes wird zum Bild einer Fluchtburg – und der nächste Vers stellt ihm ausdrücklich den Reichtum gegenüber.',
    historicalLong:
      'Der „Name“ steht im Alten Testament für die Person selbst, soweit sie sich zu erkennen gibt. Das Bild vom Turm gehört in eine Zeit, in der Städte tatsächlich einen befestigten Kern hatten, in den man sich zurückzog. Der folgende Vers nennt das Gegenstück: „Des Reichen Gut ist ihm eine feste Stadt und wie eine hohe Mauer in seinem Dünkel“ – dieselbe Metapher, einmal tragfähig, einmal Einbildung.',
    interpretations: [
      {
        tradition: 'Weisheitliche Auslegung',
        text: 'Das unmittelbare Nebeneinander beider Verse ist Absicht. Die Sprüche argumentieren gern durch Gegenüberstellung statt durch Erklärung.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der Name Gottes gilt als schützend, gerade weil er nicht ausgesprochen wird. Zuflucht besteht in der Beziehung, nicht in einer Formel.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Der Vers ist gelegentlich fast magisch gebraucht worden. Der Zusammenhang stellt ihn dagegen in eine nüchterne Alternative: Worauf verlässt man sich?',
      },
    ],
    crossRefs: [
      { book: 'spr', chapter: 18, verse: 11, note: 'Der Reichtum als Gegenbild' },
      { book: 'ps', chapter: 18, verse: 2 },
      { book: 'ps', chapter: 61, verse: 3 },
    ],
  },
  {
    book: 'spr',
    chapter: 22,
    from: 6,
    to: 6,
    title: '„Wie man einen Knaben gewöhnt“',
    historicalShort:
      'Einer der meistzitierten Erziehungsverse der Bibel – und einer der am meisten überdehnten.',
    historicalLong:
      'Der hebräische Text ist knapp und kann auch bedeuten: „gemäß seinem Weg“, also entsprechend der Eigenart des Kindes. Die Sprüche formulieren Erfahrungssätze, keine Garantien; im selben Buch steht, dass ein Sohn Schande bringen kann, ohne dass die Erziehung dafür verantwortlich gemacht wird. Kapitel 22 zeigt auffällige Berührungen mit der ägyptischen Lehre des Amenemope, teils bis in die Reihenfolge der Sprüche.',
    interpretations: [
      {
        tradition: 'Weisheitliche Auslegung',
        text: 'Sprichwörter beschreiben Regelmäßigkeiten, keine Gesetze. Wer den Vers als Zusage liest, macht aus einer Beobachtung ein Versprechen.',
      },
      {
        tradition: 'Seelsorgliche Warnung',
        text: 'Eltern, deren Kinder eigene Wege gehen, wird der Vers oft als Vorwurf zugemutet. Ausleger widersprechen dem nachdrücklich.',
      },
      {
        tradition: 'Religionsgeschichtliche Einordnung',
        text: 'Die Nähe zu ägyptischen Weisheitstexten zeigt, dass Israel hier an einer internationalen Bildungstradition teilhatte.',
      },
    ],
    crossRefs: [
      { book: 'spr', chapter: 17, verse: 25 },
      { book: 'spr', chapter: 22, verse: 17 },
      { book: '5mo', chapter: 6, verse: 7 },
    ],
  },
  {
    book: 'pred',
    chapter: 12,
    from: 13,
    to: 14,
    title: 'Die Hauptsumme',
    historicalShort:
      'Der letzte Satz des Buches – und viele halten ihn für einen Nachtrag, der ein unbequemes Buch einfangen sollte.',
    historicalLong:
      'Nach elf Kapiteln über die Flüchtigkeit von allem folgt ein Schluss, der überraschend eindeutig klingt: Gott fürchten und seine Gebote halten. Der Ton unterscheidet sich deutlich vom übrigen Buch, und die Rede vom Gericht über alles Verborgene passt schlecht zu den vorangehenden Kapiteln. Die Aufnahme des Buches in den Kanon war umstritten; dieser Schluss dürfte dabei eine Rolle gespielt haben.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die meisten Ausleger halten die letzten Verse für eine Ergänzung, die dem Buch einen tragbaren Rahmen gibt. Der ursprüngliche Schluss lag wohl bei „alles ist eitel“.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die Schule Hillels setzte sich für die Aufnahme des Buches ein. Der Schlussvers gilt als Brücke, die den Zweifel im Kanon hält, statt ihn auszuschließen.',
      },
      {
        tradition: 'Theologische Auslegung',
        text: 'Manche lesen den Schluss nicht als Korrektur, sondern als Konsequenz: Gerade weil sich nichts festhalten lässt, bleibt das Naheliegende zu tun.',
      },
    ],
    crossRefs: [
      { book: 'pred', chapter: 1, verse: 2 },
      { book: 'pred', chapter: 12, verse: 8 },
      { book: 'mi', chapter: 6, verse: 8 },
    ],
  },
  {
    book: 'jes',
    chapter: 1,
    from: 18,
    to: 20,
    title: '„Wenn eure Sünde gleich blutrot ist“',
    historicalShort:
      'Nach einer scharfen Anklage gegen den Gottesdienst folgt eine Einladung zum Rechtsgespräch – Gott bietet an, die Sache zu verhandeln.',
    historicalLong:
      'Das hebräische Verb meint einen förmlichen Rechtsstreit. Der Zusammenhang ist harsch: Opfer und Feste seien Gott zuwider, solange Hände voller Blut sind; verlangt wird, dem Waisen Recht zu schaffen. Erst danach kommt das Angebot. Die Farbbilder – Scharlach und Purpur gegen Schnee und Wolle – nehmen den teuersten Farbstoff der Antike auf, der als unauswaschbar galt. Der Abschnitt endet nicht offen, sondern mit einer Bedingung: Wollt ihr hören oder nicht.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Kultkritik des Kapitels richtet sich nicht gegen den Gottesdienst als solchen, sondern gegen seine Trennung vom Recht. Dasselbe Muster findet sich bei Amos und Micha.',
      },
      {
        tradition: 'Jüdische Liturgie',
        text: 'Der Abschnitt wird am Sabbat vor dem 9. Aw gelesen. Er steht dort für die Möglichkeit der Umkehr am Rand der Katastrophe.',
      },
      {
        tradition: 'Kirchliche Auslegung',
        text: 'Der Vers gehört zu den klassischen Bußtexten. Betont wird, dass die Zusage an das Rechthandeln gebunden bleibt, das im Kontext gefordert wird.',
      },
    ],
    crossRefs: [
      { book: 'jes', chapter: 1, verse: 11, note: 'Die Kultkritik davor' },
      { book: 'jes', chapter: 1, verse: 17 },
      { book: 'am', chapter: 5, verse: 21 },
    ],
  },
  {
    book: 'jes',
    chapter: 9,
    from: 6,
    to: 7,
    title: '„Uns ist ein Kind geboren“',
    historicalShort:
      'Vier Thronnamen für einen Herrscher, der Frieden ohne Ende bringen soll – gesprochen in einer Zeit assyrischer Bedrohung.',
    historicalLong:
      'Die Reihung der Namen folgt dem Muster ägyptischer Thronnamen, die einem König bei der Krönung verliehen wurden. Gemeint war zunächst wohl ein davidischer König, möglicherweise Hiskia. Der Text steht in der Vergangenheitsform: Das Kind ist geboren – für die Prophetie eine übliche Weise, Künftiges als bereits geschehen anzusagen. Die Verbindung mit Weihnachten geht auf die frühe Kirche zurück; Händel machte den Vers im „Messiah“ weltweit bekannt.\n\nWas in Luthers Fassung wie vier oder fünf Namen aussieht, sind im Hebräischen vier Doppelnamen: Wunder-Rat, Gott-Held, Ewig-Vater, Friede-Fürst. Das Muster ist bekannt – ägyptische Könige bekamen bei der Krönung eine Reihe von Thronnamen, die ihr Programm ankündigten. Der Abschnitt beginnt zudem nicht feierlich, sondern mit zerbrochenen Stiefeln und blutigen Mänteln, die verbrannt werden; angeredet ist ein Land unter assyrischer Bedrohung. Wer den Vers ohne diesen Anfang liest, überhört, dass „Friedefürst“ hier ein Gegenwort zur Kriegsmaschine eines Großreichs ist.',
    reception:
      'Kaum ein Vers ist musikalisch so präsent: Händels *Messiah* macht aus „For unto us a child is born“ eines der bekanntesten Chorstücke überhaupt, und der Vers gehört zur festen Weihnachtslesung fast aller Kirchen. Auffällig ist, dass die Evangelien selbst ihn nirgends auf Jesus beziehen – die Zuordnung entstand in der Alten Kirche.\n\nIm Judentum wird der Abschnitt meist auf Hiskia oder auf eine künftige Zeit des Friedens bezogen. Der Streit darum gehört zu den ältesten zwischen Kirche und Synagoge und wurde in den mittelalterlichen Zwangsdisputationen ebenso verhandelt wie Jesaja 53.',
    terms: [
      {
        word: 'hebr. pele joez',
        rendered: 'Wunderbar, Rat',
        note: 'Im Hebräischen ein Name, nicht zwei: „Wunder-Rat“ oder „Planer von Wunderbarem“. Luthers Komma hat die deutsche Zählung von vier Namen mitgeprägt; die hebräische Gliederung ergibt eher vier Doppelnamen.',
      },
      {
        word: 'hebr. el gibbor',
        rendered: 'Held',
        note: 'Wörtlich „starker Gott“ oder „Gottheld“. Dass ein König so heißen konnte, ist im Alten Orient nicht ungewöhnlich; für die christliche Auslegung wurde es zum Beleg für die Gottheit des Kommenden.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Abschnitt gehört zu den Königsorakeln. Ob er einen bestimmten Herrscher meinte oder von Anfang an über jeden hinauswies, ist umstritten.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die Namen werden als Aussagen über Gott gelesen, der dem Kind den Namen gibt – nicht als Titel des Kindes selbst. Diese Lesart ist grammatisch möglich.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Die Kirche bezieht den Text auf Christus und liest ihn in der Christnacht. Die Wirkungsgeschichte über Händel hinaus ist kaum zu überschätzen.',
      },
      {
        tradition: 'Politische Lesart',
        text: 'Der Abschnitt beginnt mit zerbrochenen Stiefeln und blutigen Mänteln, die verbrannt werden – die Ankündigung gilt einem Land unter assyrischer Bedrohung. Wer den Vers ohne diesen Anfang liest, überhört, dass „Friedefürst“ hier ein Gegenwort zur Kriegsmaschine eines Großreichs ist.',
      },
    ],
    crossRefs: [
      { book: 'jes', chapter: 7, verse: 14 },
      { book: 'lk', chapter: 2, verse: 11 },
      { book: 'jes', chapter: 11, verse: 1 },
    ],
  },
  {
    book: 'jes',
    chapter: 26,
    from: 3,
    to: 4,
    title: '„Du erhältst stets Frieden“',
    historicalShort:
      'Ein Vers über Frieden, der im Hebräischen wörtlich vom „festen Sinn“ spricht – und das Wort für Frieden verdoppelt.',
    historicalLong:
      'Der Text steht in einem Lied, das nach der Rettung der Stadt gesungen wird. Die hebräische Wendung „Schalom Schalom“ ist eine Verstärkung: vollkommener, dauerhafter Frieden. Das Wort für „fester Sinn“ meint eine gestützte, aufgerichtete Haltung. Der Vers verspricht nicht die Abwesenheit von Bedrohung – das Kapitel spricht ausdrücklich von Zorn und Gericht –, sondern eine Standfestigkeit darin.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Kapitel 24 bis 27 gelten als spätere Sammlung, oft „Jesaja-Apokalypse“ genannt. Sie stammen wahrscheinlich aus nachexilischer Zeit.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Vers wird in Angst und Unruhe viel gelesen. Sein Trost liegt in der Bindung, nicht in einer Zusage ruhiger Umstände.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Die Verdopplung des Friedensworts hat zahlreiche Vertonungen und Segensformeln geprägt.',
      },
    ],
    crossRefs: [
      { book: 'jes', chapter: 26, verse: 1 },
      { book: 'phil', chapter: 4, verse: 7 },
      { book: 'joh', chapter: 14, verse: 27 },
    ],
  },
  {
    book: 'jes',
    chapter: 40,
    from: 31,
    to: 31,
    title: '„Die auf den HERRN harren“',
    historicalShort:
      'Das Kapitel endet mit einem Bild, das die übliche Reihenfolge umdreht: erst fliegen, dann laufen, dann gehen.',
    historicalLong:
      'Der Zusammenhang ist der Trost für die Verschleppten in Babylon. Zuvor steht die nüchterne Feststellung, dass auch junge Männer müde werden. Die Steigerung am Ende führt nicht nach oben, sondern nach unten – vom Auffahren mit Flügeln über das Laufen zum Wandeln ohne Ermatten. Viele Ausleger sehen darin die eigentliche Pointe: Das Schwerste ist nicht der Höhenflug, sondern das Weitergehen im Alltag.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Kapitel 40 eröffnet den zweiten Teil des Jesajabuchs, der im Exil entstand. Der Ton wechselt von Anklage zu Trost.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Das hebräische Wort für „harren“ hat mit einem gespannten Seil zu tun. Warten ist hier kein Nichtstun, sondern eine gerichtete Haltung.',
      },
      {
        tradition: 'Wirkungsgeschichte in der Musik',
        text: 'Der Vers ist als Chorsatz und Kirchenlied weit verbreitet, unter anderem in Mendelssohns „Elias“.',
      },
    ],
    crossRefs: [
      { book: 'jes', chapter: 40, verse: 1 },
      { book: 'jes', chapter: 40, verse: 29 },
      { book: 'ps', chapter: 27, verse: 14 },
    ],
  },
  {
    book: 'jes',
    chapter: 41,
    from: 10,
    to: 10,
    title: '„Fürchte dich nicht, ich bin mit dir“',
    historicalShort:
      'Der meistzitierte Zuspruch des Alten Testaments – und im Zusammenhang ein Gerichtsverfahren gegen die Götter der Sieger.',
    historicalLong:
      'Kapitel 41 ist als Prozess gestaltet: Die Völker und ihre Götter werden vorgeladen und aufgefordert, Vergangenes zu erklären oder Künftiges anzusagen. Sie schweigen. In diese Szene hinein ergeht der Zuspruch an Israel. Die Formel „fürchte dich nicht“ stammt aus dem Heilsorakel, das im Alten Orient einem König vor der Schlacht zugesprochen wurde – hier gilt sie einem besiegten, verschleppten Volk.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Übertragung eines Königsorakels auf das ganze Volk ist charakteristisch für den zweiten Teil des Jesajabuchs.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Die Zusage ist dreifach gebaut: Ich bin mit dir, ich stärke dich, ich halte dich. Die Steigerung führt vom Dabeisein zum Festhalten.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der Zuspruch ergeht an „Israel, mein Knecht“. Die Knechtsbezeichnung ist ein Ehrentitel, kein Zeichen der Erniedrigung.',
      },
    ],
    crossRefs: [
      { book: 'jes', chapter: 43, verse: 1 },
      { book: 'jes', chapter: 41, verse: 1 },
      { book: 'jos', chapter: 1, verse: 9 },
    ],
  },
  {
    book: 'jes',
    chapter: 43,
    from: 1,
    to: 3,
    title: '„Ich habe dich bei deinem Namen gerufen“',
    historicalShort:
      'Eine Zusage an ein Volk, das gerade alles verloren hat – und sie beginnt mit dem Wort „nun aber“.',
    historicalLong:
      'Der Vers folgt unmittelbar auf eine harte Anklage am Ende von Kapitel 42: Israel sei ausgeplündert worden und habe es sich nicht zu Herzen genommen. Das „nun aber“ setzt dagegen an. Die Bilder – Wasser, Ströme, Feuer – nehmen den Durchzug durchs Meer und die Wüstenzeit auf. Der Vers verspricht nicht, dass es kein Wasser und kein Feuer gibt, sondern dass sie nicht verschlingen. Das Wort „erlöst“ stammt aus dem Familienrecht: der Löser kauft einen Verwandten aus der Schuldsklaverei frei.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Abschnitt gehört zu den Heilsworten des Exils. Die Erlöser-Terminologie überträgt ein Rechtsverhältnis der Sippe auf das Verhältnis Gottes zum Volk.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Vers ist einer der meistgewählten Tauf- und Konfirmationssprüche. Die Anrede „bei deinem Namen“ wird dabei auf die einzelne Person bezogen, obwohl der Text zum Volk spricht.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die Zusage gilt Israel als Ganzem. Die Auslegung betont, dass Zugehörigkeit hier nicht an Verhalten hängt, sondern an einer Setzung.',
      },
    ],
    crossRefs: [
      { book: 'jes', chapter: 42, verse: 24, note: 'Die Anklage davor' },
      { book: 'jes', chapter: 41, verse: 10 },
      { book: '2mo', chapter: 14, verse: 21 },
    ],
  },
  {
    book: 'jes',
    chapter: 55,
    from: 8,
    to: 9,
    title: '„Meine Gedanken sind nicht eure Gedanken“',
    historicalShort:
      'Ein Satz, der oft als Absage an das Nachdenken gelesen wird – im Zusammenhang geht es um etwas anderes: um die Größe der Vergebung.',
    historicalLong:
      'Unmittelbar davor steht die Aufforderung an den Gottlosen, umzukehren, weil Gott „viel vergibt“. Genau darauf folgt der Satz von den anderen Gedanken. Gemeint ist also nicht die Unbegreiflichkeit Gottes im Allgemeinen, sondern dass sein Erbarmen menschliche Maßstäbe übersteigt. Das Kapitel beginnt mit der Einladung, ohne Geld zu kaufen, und endet mit dem Bild vom Regen, der nicht leer zurückkehrt.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Abschnitt schließt den zweiten Teil des Jesajabuchs ab. Die Einladung richtet sich an alle Dürstenden, nicht nur an Israel.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Der Vers wird häufig gebraucht, um unbequeme Fragen abzuwehren. Der Zusammenhang stützt das nicht – dort begründet er gerade die Zusage, nicht das Schweigen.',
      },
      {
        tradition: 'Ostkirchliche Auslegung',
        text: 'Die orthodoxe Theologie liest die Stelle als Grundlage der apophatischen Rede: Über Gott lässt sich zutreffender sagen, was er nicht ist.',
      },
    ],
    crossRefs: [
      { book: 'jes', chapter: 55, verse: 7, note: 'Der unmittelbare Zusammenhang' },
      { book: 'jes', chapter: 55, verse: 1 },
      { book: 'roem', chapter: 11, verse: 33 },
    ],
  },
  {
    book: 'jes',
    chapter: 58,
    from: 6,
    to: 9,
    title: '„Das ist aber ein Fasten, das ich erwähle“',
    historicalShort:
      'Eine Gemeinde fastet und beschwert sich, dass Gott es nicht bemerkt. Die Antwort definiert das Fasten neu – über Ketten, Brot und Obdach.',
    historicalLong:
      'Der Text stammt aus der Zeit nach der Rückkehr, als der Tempel wieder stand und der Alltag ernüchternd war. Der Vorwurf ist konkret: Am Fasttag werden Arbeiter angetrieben und Streit geführt. Was stattdessen verlangt wird, ist eine Liste sozialer Handlungen: Fesseln lösen, das Joch zerbrechen, Hungrige speisen, Obdachlose aufnehmen, den Nackten kleiden. Erst danach folgt die Zusage, dass das Licht hervorbricht.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Abschnitt gehört zum dritten Teil des Jesajabuchs, entstanden in der frühen Perserzeit. Er verhandelt den Streit um die richtige Frömmigkeit in der wiederhergestellten Gemeinde.',
      },
      {
        tradition: 'Befreiungstheologie',
        text: 'Der Text gehört zu den meistzitierten Belegen dafür, dass Gottesdienst und Gerechtigkeit nicht zu trennen sind. Er verlangt nicht Almosen, sondern das Zerbrechen von Jochen.',
      },
      {
        tradition: 'Jüdische Liturgie',
        text: 'Der Abschnitt wird am Vormittag des Versöhnungstages gelesen – am Tag des strengsten Fastens die schärfste Kritik am Fasten.',
      },
    ],
    crossRefs: [
      { book: 'jes', chapter: 58, verse: 3, note: 'Der Vorwurf der Gemeinde' },
      { book: 'mt', chapter: 25, verse: 35 },
      { book: 'jak', chapter: 1, verse: 27 },
    ],
  },
  {
    book: 'jes',
    chapter: 61,
    from: 1,
    to: 3,
    title: '„Der Geist des Herrn HERRN ist über mir“',
    historicalShort:
      'Der Text, mit dem Jesus in Nazareth sein Wirken eröffnet – und er bricht das Zitat mitten im Satz ab.',
    historicalLong:
      'Der Abschnitt beschreibt eine Beauftragung: Gute Botschaft für Elende, Verbinden zerbrochener Herzen, Freiheit für Gefangene, ein Gnadenjahr des HERRN. Das Gnadenjahr nimmt das Erlassjahr aus 3. Mose 25 auf, in dem Schulden erlassen und Land zurückgegeben wurde. Als Jesus die Stelle in Nazareth vorliest, hört er vor „Tag der Rache unsres Gottes“ auf und setzt sich – die Auslassung ist bei Lukas erkennbar Absicht.\n\nDas Erlassjahr, auf das der Abschnitt anspielt, war ein Rechtsinstitut: Alle fünfzig Jahre sollten Schulden erlassen, Sklaven freigelassen und verkauftes Land an die ursprünglichen Familien zurückgegeben werden. Ob es je vollzogen wurde, ist unter Historikern strittig – als Forderung blieb es stehen, und der Prophet macht daraus die Beschreibung seines Auftrags. Auffällig ist auch, wer hier spricht: ein Gesalbter, der kein König ist. Salbung war Königen und Priestern vorbehalten; hier beansprucht sie ein Prophet für sich.',
    reception:
      'Lukas lässt Jesus seine erste öffentliche Rede mit genau diesem Text halten – und bricht das Zitat mitten im Satz ab, vor dem „Tag der Rache“. Diese Auslassung ist eine der bewusstesten Entscheidungen im Neuen Testament und hat der ganzen lukanischen Theologie ihren Ton gegeben.\n\nIn der Neuzeit wurde der Abschnitt zum Kerntext der Befreiungstheologie und der kirchlichen Sozialarbeit. Die internationale Entschuldungskampagne *Jubilee 2000*, die den ärmsten Ländern Schulden erlassen wollte, benannte sich ausdrücklich nach dem Jobeljahr und erreichte Erlasse in Milliardenhöhe.',
    terms: [
      {
        word: 'hebr. maschach',
        rendered: 'gesalbt',
        note: 'Salben – die Amtseinsetzung von Königen und Priestern. Von diesem Verb kommt das Wort Messias; seine griechische Übersetzung lautet Christus.',
      },
      {
        word: 'hebr. deror',
        rendered: 'Freiheit',
        note: 'Der Fachbegriff für die Freilassung im Jobeljahr, nicht das allgemeine Wort für Freiheit. Er steht auch auf der Freiheitsglocke in Philadelphia – dort in der Fassung von 3. Mose 25,10.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Sprecher ist im Text nicht eindeutig bestimmt: ein Prophet, ein Gesalbter oder die Gemeinde. Die Offenheit hat die Wirkungsgeschichte begünstigt.',
      },
      {
        tradition: 'Befreiungstheologie',
        text: 'Der Abschnitt ist einer der Grundtexte lateinamerikanischer Theologie. Entscheidend ist, dass die Adressaten benannt werden: Arme, Gefangene, Zerbrochene.',
      },
      {
        tradition: 'Christliche Auslegung',
        text: 'Lukas macht die Stelle zum Programm des ganzen Evangeliums. Der Abbruch vor dem Rachetag gilt vielen als bewusste inhaltliche Aussage.',
      },
      {
        tradition: 'Wirtschaftsethische Lesart',
        text: 'Das Jobeljahr ist der Versuch, ein Wirtschaftssystem gegen die Verfestigung von Ungleichheit zu sichern: Land bleibt unveräußerlich, Verschuldung wird befristet. Ob so etwas praktikabel ist, wird in der Ökonomie bezweifelt; als Maßstab hat es Debatten über Schuldenerlass und Erbrecht bis heute geprägt.',
      },
    ],
    crossRefs: [
      { book: 'lk', chapter: 4, verse: 18, note: 'Jesus liest den Text in Nazareth' },
      { book: '3mo', chapter: 25, verse: 10 },
      { book: 'jes', chapter: 58, verse: 6 },
    ],
  },
  {
    book: 'jer',
    chapter: 17,
    from: 7,
    to: 8,
    title: 'Der Baum am Wasser',
    historicalShort:
      'Zwei Bilder stehen einander gegenüber: ein Strauch in der Wüste und ein Baum am Bach – dieselbe Gegenüberstellung wie in Psalm 1.',
    historicalLong:
      'Der Baum wird nicht als unbedrängt beschrieben: Hitze und Dürre kommen, aber die Wurzeln reichen ans Wasser. Das Bild stammt aus der Erfahrung des Nahen Ostens, wo Vegetation ausschließlich an Wasserläufen wächst. Die Nähe zu Psalm 1 ist so eng, dass eine literarische Abhängigkeit in der einen oder anderen Richtung angenommen wird. Unmittelbar danach folgt der berühmte Satz vom Herzen als einem trotzigen und verzagten Ding.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Abschnitt gehört zur Weisheitsüberlieferung im Jeremiabuch. Die Verwandtschaft mit Psalm 1 ist unbestritten, die Richtung der Abhängigkeit offen.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Das Bild verspricht keine Verschonung vor Dürre, sondern Zugang zu Wasser. Diese Unterscheidung wird in der Auslegung meist betont.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der folgende Vers über das unergründliche Herz wird als Warnung vor Selbsttäuschung gelesen – die Zuversicht des Textes ist keine Selbstsicherheit.',
      },
    ],
    crossRefs: [
      { book: 'ps', chapter: 1, verse: 3 },
      { book: 'jer', chapter: 17, verse: 9, note: 'Das trotzige Herz' },
      { book: 'jer', chapter: 29, verse: 11 },
    ],
  },
  {
    book: 'jer',
    chapter: 31,
    from: 3,
    to: 6,
    title: '„Ich habe dich je und je geliebt“',
    historicalShort:
      'Mitten in einem Buch voller Gerichtsworte steht dieses Kapitel – die dichteste Zusage der Zuwendung im ganzen Alten Testament.',
    historicalLong:
      'Kapitel 30 und 31 werden als „Trostbüchlein“ zusammengefasst. Das hebräische Wort für die Liebe ist hier nicht das übliche, sondern eines, das Beständigkeit ausdrückt; die Wendung „je und je“ meint eine Liebe ohne Anfangspunkt. Der Abschnitt spricht ausdrücklich zum Nordreich, das seit anderthalb Jahrhunderten nicht mehr bestand – die Zusage gilt also den längst Abgeschriebenen. Wenige Verse später steht die Ankündigung des neuen Bundes.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Zuordnung der Trostworte an Jeremia selbst ist umstritten. Der Bezug auf das Nordreich spricht für eine eigene, ältere Überlieferung.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Das Kapitel wird am zweiten Tag des Neujahrsfests gelesen. Der Vers von Rahel, die ihre Kinder beweint, und die Zusage der Rückkehr gehören zusammen.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Die Formulierung setzt keine Vorleistung voraus und nennt keinen Grund. Genau das macht sie für viele tragfähig.',
      },
    ],
    crossRefs: [
      { book: 'jer', chapter: 31, verse: 15, note: 'Rahel weint um ihre Kinder' },
      { book: 'jer', chapter: 31, verse: 31, note: 'Der neue Bund' },
      { book: 'hos', chapter: 11, verse: 4 },
    ],
  },
  {
    book: 'hes',
    chapter: 36,
    from: 26,
    to: 28,
    title: '„Ein neues Herz und einen neuen Geist“',
    historicalShort:
      'Nicht Besserung wird verlangt, sondern ein Austausch angekündigt: Stein gegen Fleisch.',
    historicalLong:
      'Der Zusammenhang ist die Frage, wie es nach dem Exil weitergehen kann. Hesekiel sieht keine Möglichkeit, dass das Volk sich aus eigener Kraft ändert; deshalb wird das Herz nicht ermahnt, sondern ersetzt. Der Text begründet das ausdrücklich nicht mit dem Verdienst des Volkes, sondern mit dem Namen Gottes, der unter den Völkern entweiht worden sei. Diese Begründung ist für Hesekiel typisch und für heutige Leser oft befremdlich.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Abschnitt gehört zu den Heilsworten der Exilszeit. Er radikalisiert die Umkehrforderung: Was gefordert wird, kann nur geschenkt werden.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Der Text wurde als alttestamentliche Grundlage der Lehre von der Wiedergeburt gelesen. Der Mensch wird nicht verbessert, sondern neu gemacht.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Betont wird, dass die Zusage dem Volk gilt und mit der Rückkehr ins Land verbunden bleibt. Eine rein innerliche Deutung greift zu kurz.',
      },
    ],
    crossRefs: [
      { book: 'hes', chapter: 11, verse: 19 },
      { book: 'jer', chapter: 31, verse: 33 },
      { book: 'joh', chapter: 3, verse: 3 },
    ],
  },
  {
    book: 'hos',
    chapter: 6,
    from: 6,
    to: 6,
    title: '„Ich habe Lust an der Liebe und nicht am Opfer“',
    historicalShort:
      'Ein Satz, den Jesus zweimal zitiert – beide Male, um eine Kritik an seinem Umgang mit Menschen zurückzuweisen.',
    historicalLong:
      'Das hebräische Wort für „Liebe“ ist Chesed und meint eine verlässliche Zuwendung innerhalb einer Beziehung; es lässt sich schwer mit einem deutschen Wort wiedergeben. Der Satz ist keine Absage an den Opferkult, sondern eine Rangordnung: Was den Opfern erst Sinn gibt, ist die Treue im Verhältnis. Matthäus lässt Jesus den Vers anführen, als ihm die Tischgemeinschaft mit Zöllnern und das Ährenraufen am Sabbat vorgeworfen werden.\n\nDie zweite Hälfte des Verses wird selten mitzitiert: Neben der Güte steht die „Erkenntnis Gottes“, und bei Hosea ist Erkenntnis kein Wissen, sondern ein Verhältnis – dasselbe Verb steht für das Erkennen zwischen Eheleuten. Der Vorwurf lautet also nicht, das Volk wisse zu wenig, sondern es lebe an Gott vorbei. Die Verse davor machen das deutlich: Die Frömmigkeit sei „wie eine Morgenwolke“, die früh vergeht. Hosea schreibt in einem Nordreich, in dem der Kult blühte, während die Rechtsverhältnisse zerfielen.',
    reception:
      'Jesus zitiert den Vers bei Matthäus zweimal, beide Male in einem Streitgespräch – über das Essen mit Zöllnern und über das Ährenraufen am Sabbat. Das ist bemerkenswert, weil er damit eine innerjüdische Argumentationsweise benutzt: Ein Prophetenwort wird gegen eine bestimmte Auslegung der Tora ins Feld geführt, nicht gegen die Tora.\n\nIn der christlichen Auslegungsgeschichte wurde daraus oft ein Gegensatz zwischen prophetischer Innerlichkeit und jüdischem Ritualismus – ein Klischee, das die Forschung längst zurückweist, weil dieselbe Kritik am hohlen Kult im Judentum selbst formuliert wurde und wird.',
    terms: [
      {
        word: 'hebr. chesed',
        rendered: 'Liebe',
        note: 'Güte, Treue, Solidarität – die Zuwendung, zu der niemand verpflichtet ist und die trotzdem gehalten wird. Dasselbe Wort steht bei Micha 6,8.',
      },
      {
        word: 'hebr. daat elohim',
        rendered: 'Erkenntnis Gottes',
        note: 'Kein Wissen über Gott, sondern ein gelebtes Verhältnis zu ihm. Hosea gebraucht dieselbe Wurzel für das Erkennen zwischen Eheleuten.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die prophetische Kultkritik zielt auf die Trennung von Gottesdienst und Lebensführung, nicht auf die Abschaffung des Kults. Dasselbe gilt bei Amos und Micha.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Nach der Tempelzerstörung wurde der Vers zentral: Rabbi Jochanan ben Sakkai soll damit begründet haben, dass Werke der Barmherzigkeit an die Stelle der Opfer treten.',
      },
      {
        tradition: 'Neutestamentliche Aufnahme',
        text: 'Matthäus zitiert den Vers zweimal, jeweils in einem Konflikt über Reinheit und Sabbat. Er wird damit zu einem Auslegungsschlüssel des ganzen Evangeliums.',
      },
      {
        tradition: 'Kanonische Beobachtung',
        text: 'Dieselbe Bibel, die den Opferkult in 3. Mose ausführlich regelt, überliefert Sätze wie diesen. Die Sammlung glättet den Widerspruch nicht. Ausleger sehen darin ein Grundmuster: Ordnung und Kritik der Ordnung stehen nebeneinander, und keine Seite bekommt das letzte Wort.',
      },
    ],
    crossRefs: [
      { book: 'mt', chapter: 9, verse: 13, note: 'Das erste Zitat' },
      { book: 'mt', chapter: 12, verse: 7, note: 'Das zweite Zitat' },
      { book: 'mi', chapter: 6, verse: 8 },
    ],
  },
  {
    book: 'joel',
    chapter: 2,
    from: 12,
    to: 14,
    title: '„Zerreißet eure Herzen und nicht eure Kleider“',
    historicalShort:
      'Der klassische Bußtext – und er wendet sich gegen die sichtbare Form der Buße zugunsten dessen, was nicht zu sehen ist.',
    historicalLong:
      'Das Zerreißen der Kleider war die übliche Trauergeste. Der Prophet stellt sie nicht in Frage, sondern ordnet sie unter. Die Begründung ist eine Zitatformel, die im Alten Testament etwa ein Dutzend Mal begegnet: gnädig, barmherzig, geduldig, von großer Güte. Bemerkenswert ist der Zusatz: „Wer weiß, ob es ihn nicht gereut“ – die Umkehr wird ohne Erfolgsgarantie empfohlen. Der Text ist die Lesung des Aschermittwochs.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Abschnitt greift die Gnadenformel aus 2. Mose 34 auf und verbindet sie mit dem Aufruf zur Umkehr. Die Datierung des Buches ist unsicher.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Der Text eröffnet in der westlichen Kirche die Fastenzeit. Das Aschenkreuz nimmt die Geste auf, die der Vers relativiert.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Das „wer weiß“ wird als Ehrlichkeit gelesen: Umkehr geschieht ohne Anspruch auf ein bestimmtes Ergebnis.',
      },
    ],
    crossRefs: [
      { book: '2mo', chapter: 34, verse: 6, note: 'Die Gnadenformel' },
      { book: 'joel', chapter: 2, verse: 28 },
      { book: 'jona', chapter: 3, verse: 9 },
    ],
  },
  {
    book: 'mt',
    chapter: 5,
    from: 14,
    to: 16,
    title: '„Ihr seid das Licht der Welt“',
    historicalShort:
      'Kein Auftrag, sondern eine Feststellung: Jesus sagt der Jüngerschar, was sie bereits ist.',
    historicalLong:
      'Der Satz steht in der Bergpredigt unmittelbar hinter den Seligpreisungen und dem Salzwort. Angeredet ist eine kleine, gefährdete Gruppe, nicht eine Mehrheitsreligion. Das Bild der Stadt auf dem Berge meint vermutlich Jerusalem, dessen Lage jeder Zuhörer vor Augen hatte; das Licht unter dem Scheffel spielt auf die einfache Öllampe im Einraumhaus an, die man mit einem Getreidemaß löschte. Auffällig ist die Reihenfolge: Erst steht die Zusage, dann die Aufforderung in Vers 16.',
    reception:
      'Die „Stadt auf dem Berge“ ist zu einer politischen Formel geworden. John Winthrop gebrauchte sie 1630 an Bord der Arbella für die Puritanersiedlung in Neuengland; über Kennedy und Reagan wurde daraus ein Kernbild amerikanischen Selbstverständnisses. Im Text ist der Satz keine Zusage an ein Land, sondern eine Feststellung über eine kleine, verfolgte Gruppe.\n\nIn der kirchlichen Auslegung ist der Vers das Standardargument gegen einen Rückzug ins Private: Was verborgen bleibt, erfüllt seine Bestimmung nicht. Der Nachsatz in Vers 16 zieht dabei eine Grenze – das Licht soll leuchten, damit nicht die Leuchtenden, sondern Gott gerühmt wird.',
    terms: [
      {
        word: 'griech. modios',
        rendered: 'Scheffel',
        note: 'Ein Getreidemaß von knapp neun Litern – ein Gefäß, kein Möbelstück. Man stülpte es über die Lampe, um sie zu löschen, ohne Rauch zu machen. Das Bild ist also nicht „verstecken“, sondern „ausmachen“.',
      },
      {
        word: 'griech. kalos',
        rendered: 'guten',
        note: 'Gut im Sinn von: sichtbar gut, ansehnlich, überzeugend. Nicht die moralische Korrektheit ist gemeint, sondern etwas, das anderen auffällt.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Matthäus stellt seiner Gemeinde ein Selbstbild gegen die Erfahrung der Randständigkeit. Die Bildworte stammen wahrscheinlich aus verschiedenen Zusammenhängen und sind hier zu einer Einheit gefügt.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Betont wird die Reihenfolge: Zuerst wird zugesprochen, was die Hörer sind, erst danach folgt der Auftrag. Das Licht ist nicht Leistung, sondern Folge.',
      },
      {
        tradition: 'Katholische Soziallehre',
        text: 'Der Vers gehört zu den Belegstellen für öffentliche Verantwortung von Christen. Sichtbarkeit ist hier keine Frömmigkeitsübung, sondern gesellschaftliche Präsenz.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die Zusage lässt sich zur Selbstüberhöhung wenden. Ausleger verweisen darauf, dass Vers 16 das Ziel klar benennt: Nicht die Leuchtenden werden gepriesen, sondern der Vater im Himmel.',
      },
    ],
    crossRefs: [
      { book: 'mt', chapter: 5, verse: 3, note: 'Die Seligpreisungen davor' },
      { book: 'mt', chapter: 5, verse: 13 },
      { book: 'joh', chapter: 8, verse: 12 },
      { book: 'phil', chapter: 2, verse: 15 },
    ],
  },
  {
    book: 'mt',
    chapter: 6,
    from: 33,
    to: 34,
    title: '„Trachtet am ersten nach dem Reich Gottes“',
    historicalShort:
      'Der Schlusssatz der Rede über das Sorgen: eine Rangfolge, kein Verbot der Vorsorge.',
    historicalLong:
      'Die Bergpredigt spricht hier zu Menschen, für die Essen und Kleidung tatsächlich täglich unsicher waren. Die Beispiele davor stammen aus der Anschauung: Vögel, die nicht säen, Lilien, die nicht spinnen. Der Vers zieht daraus keine Empfehlung zur Untätigkeit, sondern eine Reihenfolge. Das Wort für Sorgen meint im Griechischen ein Zerteiltsein der Gedanken. Vers 34 begrenzt den Horizont bewusst auf den heutigen Tag.',
    reception:
      'Der Vers gehört zu den meistverwendeten Konfirmationssprüchen und steht zugleich im Zentrum eines Streits: In der Wohlstandsverkündigung wird das „zufallen“ als Zusage materiellen Erfolgs gelesen. Der Zusammenhang gibt das nicht her – gesprochen ist er zu Menschen, für die Essen und Kleidung täglich unsicher waren, und der nächste Vers begrenzt den Horizont ausdrücklich auf den heutigen Tag.\n\nIn der Ordensgeschichte hat der Abschnitt eine andere Wirkung entfaltet: Die Bettelorden des 13. Jahrhunderts, Franziskaner wie Dominikaner, beriefen sich auf ihn für den Verzicht auf Besitz. Kirchenrechtlich löste das den Armutsstreit aus, der das 14. Jahrhundert beschäftigte.',
    terms: [
      {
        word: 'griech. merimnate',
        rendered: 'sorgt',
        note: 'Von einer Wurzel, die „teilen“ bedeutet: Die Gedanken sind zerteilt, gehen in mehrere Richtungen zugleich. Gemeint ist nicht Vorsorge, sondern Zerrissenheit.',
      },
      {
        word: 'griech. zeteite',
        rendered: 'Trachtet',
        note: 'Suchen, sich bemühen um – dasselbe Verb wie im „suchet, so werdet ihr finden“. Es beschreibt eine anhaltende Tätigkeit, keine innere Einstellung.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Abschnitt stammt aus der Spruchquelle und spiegelt die Lage wandernder Boten ohne festen Besitz. Für sesshafte Gemeinden musste er neu ausgelegt werden – das geschieht bereits im Text.',
      },
      {
        tradition: 'Monastische Tradition',
        text: 'Die Ordensregeln lasen den Vers als Grundlage der Besitzlosigkeit: Wer für den Unterhalt anderer sorgt, darf für sich selbst weniger planen.',
      },
      {
        tradition: 'Befreiungstheologische Lesart',
        text: 'Die Zusage gilt Menschen, denen das Nötigste fehlt. Sie in Wohlstandsverhältnisse zu übertragen, verkehrt sie in eine Beruhigung derer, die ohnehin genug haben.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Vers wird Sorgenden gern vorgehalten. Ausleger halten dagegen, dass er keine Aufforderung zum Nicht-Fühlen ist, sondern eine Einladung, den Zeitraum zu begrenzen, für den man verantwortlich ist.',
      },
    ],
    crossRefs: [
      { book: 'mt', chapter: 6, verse: 25, note: 'Der Anfang der Rede über das Sorgen' },
      { book: 'lk', chapter: 12, verse: 31 },
      { book: 'ps', chapter: 37, verse: 4 },
      { book: '1petr', chapter: 5, verse: 7 },
    ],
  },
  {
    book: 'mt',
    chapter: 7,
    from: 7,
    to: 8,
    title: '„Bittet, so wird euch gegeben“',
    historicalShort:
      'Drei Verben in Steigerung – und eine Zusage, die in ihrer Schlichtheit seit jeher Rückfragen auslöst.',
    historicalLong:
      'Der Dreiklang bitten, suchen, anklopfen ist kunstvoll gebaut: Jedes Verb wird in Vers 8 mit der Begründung wiederholt. Im Griechischen stehen Befehlsformen der Dauer, also eher anhaltendes Bitten als ein einmaliger Ruf. Unmittelbar danach folgt der Vergleich mit dem Vater, der seinem Kind kein Stein statt Brot gibt. Die Auslegungsgeschichte hat sich vor allem an der Frage abgearbeitet, wie sich der Satz zu unerhörten Gebeten verhält.',
    reception:
      'An diesem Vers arbeitet sich die Gebetslehre seit der Alten Kirche ab, weil er offenkundig nicht so eintrifft, wie er klingt. Augustinus antwortete, Gott gebe entweder das Erbetene oder etwas Besseres; Thomas von Aquin band die Zusage an das, was zum Heil dient; Luther betonte, dass die Zusage der Verheißung gilt, nicht dem Wunsch. Alle drei Antworten sind bis heute im Gebrauch.\n\nIn der Seelsorge gilt der Vers als heikel. Wo er als Erfolgsregel verstanden wird, gerät ein unerhörtes Gebet zum Beweis mangelnden Glaubens – ein Schluss, den der Text nicht zieht und der Menschen in Krankheit und Trauer zusätzlich belastet.',
    terms: [
      {
        word: 'griech. aiteite',
        rendered: 'Bittet',
        note: 'Eine Befehlsform der Dauer: bittet weiter, hört nicht auf zu bitten. Alle drei Verben stehen so – die Zusage gilt einem anhaltenden Bitten, nicht einem einmaligen Ruf.',
      },
      {
        word: 'griech. krouete',
        rendered: 'klopfet an',
        note: 'Anklopfen an eine Tür. In der rabbinischen Literatur ist das Anklopfen ein Bild für das Bemühen um Verständnis der Schrift; Lukas verbindet dieselben Worte mit einer Geschichte über einen aufdringlichen Nachbarn.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Spruch stammt aus der Spruchquelle und findet sich auch bei Lukas, dort mit dem Heiligen Geist als Gabe. Matthäus verallgemeinert zu Gutem.',
      },
      {
        tradition: 'Klassische Auslegung',
        text: 'Augustin und viele nach ihm lasen die Zusage vom Beter her: Das Bitten formt den Bittenden, damit er empfangen kann, was ihm gegeben wird.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Als Zusage genommen, scheitert der Vers an der Erfahrung. Ausleger verweisen auf Gethsemane, wo dieselbe Bitte im Neuen Testament unerfüllt bleibt.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Betont wird die Dauerform: Der Text erlaubt ausdrücklich das wiederholte, hartnäckige Bitten und macht es nicht zum Zeichen mangelnden Glaubens.',
      },
    ],
    crossRefs: [
      { book: 'mt', chapter: 7, verse: 11, note: 'Der Vergleich mit dem Vater' },
      { book: 'lk', chapter: 11, verse: 13 },
      { book: 'mk', chapter: 14, verse: 36 },
      { book: 'jak', chapter: 1, verse: 5 },
    ],
  },
  {
    book: 'mt',
    chapter: 7,
    from: 12,
    to: 12,
    title: 'Die Goldene Regel',
    historicalShort:
      'Ein Satz, den es in vielen Kulturen gibt – hier mit einer Besonderheit in der Richtung.',
    historicalLong:
      'Vergleichbare Sätze finden sich bei Konfuzius, in griechischen Texten und im babylonischen Talmud, wo Hillel sie in der verneinenden Form gibt: Was dir verhasst ist, tue deinem Nächsten nicht. Matthäus formuliert positiv und fordert damit nicht nur Unterlassung, sondern Handeln. Der Zusatz, dies sei das Gesetz und die Propheten, stellt die Regel als Zusammenfassung der ganzen Schrift dar und rahmt zusammen mit Kapitel 5,17 den Hauptteil der Bergpredigt.',
    reception:
      'Die Regel steht in ähnlicher Form in fast allen großen Traditionen: bei Konfuzius, im Mahabharata, bei Hillel, im Buch Tobit, bei Seneca. Das Projekt Weltethos machte sie 1993 zur gemeinsamen Grundlage einer Erklärung, die von Vertretern zahlreicher Religionen unterzeichnet wurde.\n\nPhilosophisch ist sie mehrfach kritisiert worden: Immanuel Kant hielt sie für unzureichend, weil sie voraussetzt, dass die eigenen Wünsche ein tauglicher Maßstab sind – ein Richter, so sein Einwand, müsste danach niemanden verurteilen. Sein kategorischer Imperativ ist der Versuch, die Regel von dieser Schwäche zu befreien.',
    terms: [
      {
        word: 'griech. panta',
        rendered: 'Alles',
        note: 'Der Satz ist positiv gefasst: Alles, was ihr wollt – nicht: was ihr nicht wollt. Die verbreitete Verneinung („Was du nicht willst, das man dir tu …“) stammt aus anderen Überlieferungen, unter anderem aus dem Buch Tobit und von Hillel.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Regel ist älter als das Christentum und weit verbreitet. Neu ist die Verbindung mit dem Anspruch, damit Gesetz und Propheten zusammenzufassen.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Hillel gibt dieselbe Regel als Kern der Tora, ergänzt aber: Der Rest ist Auslegung, geh und lerne. Die verneinende Fassung gilt manchen als vorsichtiger, weil sie eigene Wünsche nicht anderen aufdrängt.',
      },
      {
        tradition: 'Philosophische Rezeption',
        text: 'Kant hat die Regel ausdrücklich für unzureichend gehalten, weil sich aus ihr weder Pflichten gegen sich selbst noch gegen Straftäter ableiten lassen. Der kategorische Imperativ ist als Verschärfung gedacht.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Wer eigene Maßstäbe zum Maß für andere macht, kann übergriffig werden. Ausleger verweisen darauf, dass die Regel in der Bergpredigt neben dem Feindesliebegebot steht, das sie vor Eigennutz schützt.',
      },
    ],
    crossRefs: [
      { book: 'mt', chapter: 5, verse: 17, note: 'Gesetz und Propheten am Anfang der Rede' },
      { book: 'lk', chapter: 6, verse: 31 },
      { book: 'mt', chapter: 22, verse: 39 },
      { book: 'roem', chapter: 13, verse: 10 },
    ],
  },
  {
    book: 'mt',
    chapter: 11,
    from: 28,
    to: 30,
    title: '„Kommet her zu mir alle, die ihr mühselig und beladen seid“',
    historicalShort:
      'Ein Einladungsruf, der in der Sprache der Weisheitsliteratur formuliert ist.',
    historicalLong:
      'Der Ruf steht am Ende eines Kapitels voller Ablehnung: Johannes zweifelt, die Städte hören nicht. Umso auffälliger ist der Wechsel im Ton. Sprachlich lehnt sich der Abschnitt eng an Jesus Sirach an, wo die Weisheit selbst zu ihrem Joch einlädt. Das Joch ist im rabbinischen Sprachgebrauch ein feststehendes Bild für die Tora; das Wort für erquicken meint eine Atempause, nicht dauerhafte Ruhe. Mühselig und beladen bezeichnet keine Seelenlage, sondern die Erschöpfung von Menschen, die körperlich arbeiten und Abgaben tragen.',
    reception:
      'Der Vers steht über unzähligen Kirchenportalen und Krankenhauskapellen und gehört zu den meistgesprochenen Sätzen in der Sterbebegleitung. Bach vertonte ihn mehrfach; Händel gab ihm im *Messiah* als „Come unto Him“ eine der ruhigsten Nummern des Werks.\n\nDie Auslegungsgeschichte hat den Satz oft verinnerlicht – als Ruf an Beladene mit einem schweren Gewissen. Im Zusammenhang bei Matthäus geht es zunächst um etwas Handfesteres: um Menschen, die körperlich arbeiten, Abgaben tragen und deren Erschöpfung nichts mit ihrer Seelenlage zu tun hat.',
    terms: [
      {
        word: 'griech. anapauso',
        rendered: 'erquicken',
        note: 'Eine Pause verschaffen, aufatmen lassen – dasselbe Wort steht für die Rast der Tiere und die Ruhe zwischen zwei Arbeitsgängen. Es verspricht keine dauerhafte Ruhe, sondern Luft zum Atmen.',
      },
      {
        word: 'griech. zygos',
        rendered: 'Joch',
        note: 'Das Joch der Zugtiere und im rabbinischen Sprachgebrauch das Bild für die Tora: „das Joch des Himmelreichs auf sich nehmen“ hieß, die Gebote anzunehmen. Der Ruf lädt also nicht aus einer Ordnung heraus, sondern in eine andere hinein.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Abschnitt ist Sondergut des Matthäus und trägt deutlich weisheitliche Züge. Er stellt Jesus an die Stelle, die in Sirach die Weisheit einnimmt.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Luther las den Vers als Kernstelle des Evangeliums: Eingeladen sind ausdrücklich die Erschöpften, nicht die Tüchtigen.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Das Joch der Tora gilt in der rabbinischen Tradition selbst als leicht und befreiend. Die Gegenüberstellung eines drückenden Gesetzes und einer leichten Gnade wird als spätere christliche Zuspitzung kritisiert.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Angeboten wird nicht Joch-Losigkeit, sondern ein anderes Joch. Ausleger halten fest, dass der Text Belastung nicht abschafft, sondern ihre Art verändert.',
      },
    ],
    crossRefs: [
      { book: 'mt', chapter: 11, verse: 20, note: 'Die Weherufe unmittelbar davor' },
      { book: 'jer', chapter: 6, verse: 16 },
      { book: 'mt', chapter: 23, verse: 4 },
      { book: 'joh', chapter: 7, verse: 37 },
    ],
  },
  {
    book: 'mt',
    chapter: 19,
    from: 26,
    to: 26,
    title: '„Bei Gott sind alle Dinge möglich“',
    historicalShort:
      'Die Antwort auf eine erschrockene Rückfrage – nicht auf eine allgemeine Lebensfrage.',
    historicalLong:
      'Der Satz fällt nach dem Gespräch mit dem reichen jungen Mann und dem Bild vom Kamel und dem Nadelöhr. Die Jünger entsetzen sich und fragen, wer dann selig werden könne – für sie war Reichtum ein Zeichen des Segens, nicht ein Hindernis. Die verbreitete Erklärung, das Nadelöhr sei ein enges Stadttor gewesen, ist erst mittelalterlich und archäologisch nicht belegt; der Vergleich ist bewusst absurd. Der Vers ist also zunächst eine Aussage über Rettung, nicht über die Erfüllbarkeit von Wünschen.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Zusammenhang ist wichtig: Es geht um die Frage, wer gerettet wird, nicht um die Machbarkeit von Vorhaben. Markus und Lukas überliefern die Szene fast gleich.',
      },
      {
        tradition: 'Wirkungsgeschichte',
        text: 'Der Vers ist als Losung für Unmögliches jeder Art in Gebrauch. Ausleger weisen darauf hin, dass er dabei aus seinem Zusammenhang gelöst wird.',
      },
      {
        tradition: 'Katholische Tradition',
        text: 'Die Stelle steht hinter der Unterscheidung von Geboten und evangelischen Räten: Was allen unmöglich scheint, wird als besondere Berufung einzelner verstanden.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Wird der Satz zur Zusage grenzenloser Möglichkeit, entsteht ein Druck auf Menschen, deren Bitten unerfüllt bleiben. Der Text selbst redet von Gottes Freiheit, nicht von einer Garantie.',
      },
    ],
    crossRefs: [
      { book: 'mt', chapter: 19, verse: 21, note: 'Das Gespräch mit dem Reichen' },
      { book: 'mk', chapter: 10, verse: 27 },
      { book: 'lk', chapter: 1, verse: 37 },
      { book: '1mo', chapter: 18, verse: 14 },
    ],
  },
  {
    book: 'mt',
    chapter: 22,
    from: 37,
    to: 40,
    title: 'Das Doppelgebot der Liebe',
    historicalShort:
      'Zwei Sätze aus der Tora, von Jesus zusammengestellt – die Zusammenstellung ist das Neue.',
    historicalLong:
      'Beide Zitate stammen aus dem Alten Testament: die Gottesliebe aus dem täglichen Bekenntnis Israels in 5. Mose 6, die Nächstenliebe aus dem Heiligkeitsgesetz in 3. Mose 19. Beide waren jedem Zuhörer vertraut. Die Frage nach dem vornehmsten Gebot war eine geläufige Schuldebatte. Neu ist, dass die beiden Sätze aneinandergebunden und gemeinsam an die Spitze gestellt werden. Der Nächste meint in 3. Mose zunächst den Volksgenossen; wie weit der Kreis reicht, verhandelt Lukas in der Erzählung vom barmherzigen Samariter.',
    reception:
      'Das Doppelgebot ist der meistzitierte ethische Satz des Christentums und steht in nahezu jedem kirchlichen Grundlagentext. In der Reformationszeit ordnete es die Katechismen: Luthers Einteilung der Zehn Gebote in zwei Tafeln – Gott und Nächster – folgt ihm.\n\nBemerkenswert ist die Wirkungsgeschichte des Zusatzes „wie dich selbst“. In der älteren Auslegung galt Selbstliebe als das, was ohnehin geschieht und als Maßstab dient; seit dem 20. Jahrhundert wird der Satz häufiger als Aufforderung gelesen, sich selbst gut zu behandeln. Beide Lesarten sind vertretbar, und die zweite ist die jüngere.',
    terms: [
      {
        word: 'griech. dianoia',
        rendered: 'Gemüte',
        note: 'Verstand, Denkvermögen. Das hebräische Vorbild in 5. Mose 6,5 nennt Herz, Seele und Vermögen; die griechische Fassung ersetzt das letzte durch den Verstand. Matthäus folgt ihr – die Gottesliebe schließt damit ausdrücklich das Denken ein.',
      },
      {
        word: 'griech. plesion',
        rendered: 'Nächsten',
        note: 'Der Nahe. In 3. Mose 19,18 meint das hebräische Wort zunächst den Volksgenossen; wie weit der Kreis reicht, ist die Frage, die Lukas mit der Erzählung vom Samariter beantwortet.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Verbindung beider Gebote ist auch in jüdischen Texten der Zeit vorbereitet. Matthäus stellt sie in eine Reihe von Streitgesprächen im Tempel kurz vor der Passion.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Das Schema Jisrael ist bis heute das tägliche Bekenntnis. Dass ein Lehrer die Tora auf einen Nenner bringt, ist in der rabbinischen Literatur ein bekanntes Verfahren, kein Bruch mit ihr.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Das Gebot zeigt nach reformatorischem Verständnis zugleich, was zu tun ist, und dass es niemand vollständig tut – es weist damit über sich hinaus.',
      },
      {
        tradition: 'Ethische Rückfrage',
        text: 'Wie sich selbst zu lieben setzt Selbstachtung voraus. Ausleger diskutieren, ob der Vers damit eine Selbstliebe voraussetzt, gebietet oder nur als Maßstab benutzt.',
      },
    ],
    crossRefs: [
      { book: '5mo', chapter: 6, verse: 5, note: 'Das Schema Jisrael' },
      { book: '3mo', chapter: 19, verse: 18 },
      { book: 'lk', chapter: 10, verse: 27 },
      { book: 'roem', chapter: 13, verse: 9 },
    ],
  },
  {
    book: 'mk',
    chapter: 10,
    from: 45,
    to: 45,
    title: '„Nicht gekommen, daß er sich dienen lasse“',
    historicalShort:
      'Der Schlüsselsatz des Markusevangeliums – und einer der meistumstrittenen Sätze über den Tod Jesu.',
    historicalLong:
      'Der Vers beendet die Szene, in der Jakobus und Johannes die Ehrenplätze fordern. Das Wort, das Luther mit Bezahlung übersetzt, heißt im Griechischen Lösegeld und stammt aus der Sprache des Sklavenfreikaufs; wem es gezahlt wird, sagt der Text nicht. Für viele meint im Semitischen die Vielen, also alle, nicht eine Auswahl. Der Satz verbindet zwei Bilder, die sonst getrennt laufen: den dienenden Menschensohn aus Daniel 7 und den leidenden Gottesknecht aus Jesaja 53.',
    reception:
      'Aus dem Wort „Lösegeld“ ist die älteste Deutung des Kreuzes gewachsen: Christus habe den Preis für die an den Teufel Verfallenen gezahlt. Gregor von Nyssa malte das als List aus, mit der der Teufel überlistet werde; Anselm von Canterbury verwarf diese Vorstellung um 1098 und ersetzte sie durch die Satisfaktionslehre – Christus leiste Genugtuung an Gottes Ehre. Abaelard widersprach beidem und sah im Kreuz vor allem eine Liebeserweisung.\n\nDie Debatte ist offen geblieben. Seit dem 20. Jahrhundert wird vor allem gefragt, ob eine Deutung, in der ein Vater den Sohn zur Zahlung schickt, in der Seelsorge tragbar ist. Dass der Text selbst keinen Empfänger nennt, ist dabei das wichtigste Argument gegen jede Zuspitzung.',
    terms: [
      {
        word: 'griech. lytron',
        rendered: 'Bezahlung',
        note: 'Das Lösegeld beim Freikauf eines Sklaven oder Kriegsgefangenen. Wem es gezahlt wird, sagt der Text nicht – an dieser Lücke hängt die gesamte Auseinandersetzung über die Bedeutung des Kreuzestodes.',
      },
      {
        word: 'griech. pollon',
        rendered: 'viele',
        note: 'Im semitischen Sprachgebrauch meint „die Vielen“ die Gesamtheit, nicht eine Teilmenge. Der Satz grenzt also niemanden aus, auch wenn er im Deutschen so klingt.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Ob der Satz auf Jesus selbst zurückgeht oder die Deutung der Gemeinde nach Ostern spiegelt, ist umstritten. Sicher ist, dass Markus mit ihm sein ganzes Buch deutet.',
      },
      {
        tradition: 'Altkirchliche Auslegung',
        text: 'Die Frage, an wen das Lösegeld gezahlt wird, hat die frühe Kirche lange beschäftigt. Origenes dachte an den Teufel, Gregor von Nazianz wies das entschieden zurück.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Anselm von Canterbury und nach ihm die Reformatoren lasen den Vers als Stellvertretung: Christus trägt, was Menschen nicht tragen können.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Theologinnen und Theologen des 20. Jahrhunderts haben gefragt, ob ein Gott, der ein Lösegeld verlangt, nicht Gewalt heiligt. Andere halten dagegen, der Text rede vom Geben Gottes, nicht von seiner Forderung.',
      },
    ],
    crossRefs: [
      { book: 'mk', chapter: 10, verse: 35, note: 'Die Bitte der Zebedäussöhne' },
      { book: 'jes', chapter: 53, verse: 5 },
      { book: 'mt', chapter: 20, verse: 28 },
      { book: 'phil', chapter: 2, verse: 7 },
    ],
  },
  {
    book: 'mk',
    chapter: 16,
    from: 15,
    to: 16,
    title: 'Der Missionsbefehl bei Markus',
    historicalShort:
      'Ein Auftrag in alle Welt – in einem Abschnitt, der in den ältesten Handschriften fehlt.',
    historicalLong:
      'Die Verse gehören zum sogenannten längeren Markusschluss, Kapitel 16,9 bis 20. Er fehlt in den beiden ältesten und wichtigsten Handschriften und ist sprachlich deutlich vom übrigen Evangelium unterschieden; die Forschung hält ihn nahezu einhellig für eine spätere Ergänzung des zweiten Jahrhunderts. Das ursprüngliche Markusevangelium endet wahrscheinlich in Vers 8 mit der Furcht der Frauen. Der Zusatz fasst zusammen, was die anderen Evangelien erzählen, und fügt in Vers 16 eine Verknüpfung von Glaube, Taufe und Rettung hinzu, die so sonst nicht formuliert wird.',
    interpretations: [
      {
        tradition: 'Textkritik',
        text: 'Der längere Schluss fehlt im Codex Sinaiticus und im Codex Vaticanus. Moderne Ausgaben drucken ihn in Klammern oder mit Anmerkung; einige Handschriften bieten einen dritten, kürzeren Schluss.',
      },
      {
        tradition: 'Katholische Tradition',
        text: 'Das Konzil von Trient hat den längeren Schluss ausdrücklich als kanonisch bestätigt. Kanonizität und Ursprünglichkeit sind dabei zwei verschiedene Fragen.',
      },
      {
        tradition: 'Evangelische Auslegung',
        text: 'Weil der Abschnitt sekundär ist, wird ihm meist kein eigenständiges Lehrgewicht zugemessen. Der Missionsauftrag wird aus Matthäus 28 begründet.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Vers 16 wurde jahrhundertelang als Verdammungsdrohung gelesen. Ausleger halten fest, dass ausgerechnet dieser Satz auf einem textkritisch unsicheren Fundament steht.',
      },
    ],
    crossRefs: [
      { book: 'mk', chapter: 16, verse: 8, note: 'Der ältere Schluss mit der Furcht der Frauen' },
      { book: 'mt', chapter: 28, verse: 19 },
      { book: 'apg', chapter: 1, verse: 8 },
      { book: 'roem', chapter: 10, verse: 9 },
    ],
  },
  {
    book: 'lk',
    chapter: 1,
    from: 37,
    to: 37,
    title: '„Bei Gott ist kein Ding unmöglich“',
    historicalShort:
      'Der Schlusssatz des Engels an Maria – ein Zitat aus der Abrahamsgeschichte.',
    historicalLong:
      'Der Satz greift wörtlich auf 1. Mose 18,14 zurück, wo dieselbe Frage nach der Geburt Isaaks gestellt wird. Lukas verbindet damit die Ankündigung an Maria mit der ältesten Verheißungsgeschichte Israels: In beiden Fällen wird ein Kind gegen alle Wahrscheinlichkeit angesagt. Das griechische Wort für Ding heißt zugleich Wort oder Sache; wörtlich steht dort, dass kein Wort Gottes kraftlos sein wird. Die Antwort Marias in Vers 38 folgt unmittelbar.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Lukas gestaltet die Kindheitsgeschichte durchgehend nach alttestamentlichen Vorbildern. Der Rückgriff auf Sara ist bewusst gesetzt und nicht zufällig.',
      },
      {
        tradition: 'Marianische Tradition',
        text: 'In der katholischen und orthodoxen Auslegung steht der Vers für die freie Zustimmung Marias, die auf die Zusage antwortet – nicht für eine Überwältigung.',
      },
      {
        tradition: 'Feministische Exegese',
        text: 'Betont wird, dass Lukas eine junge Frau ohne gesellschaftliche Stellung zur ersten Adressatin der Zusage macht und ihre Antwort abwartet.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Als allgemeiner Grundsatz gelesen, verspricht der Vers mehr, als der Zusammenhang deckt. Er steht in einer bestimmten Ankündigung und nicht als Regel über Gebetserhörungen.',
      },
    ],
    crossRefs: [
      { book: '1mo', chapter: 18, verse: 14, note: 'Die Vorlage bei Sara' },
      { book: 'lk', chapter: 1, verse: 38 },
      { book: 'mt', chapter: 19, verse: 26 },
      { book: 'jer', chapter: 32, verse: 17 },
    ],
  },
  {
    book: 'lk',
    chapter: 6,
    from: 31,
    to: 31,
    title: 'Die Goldene Regel in der Feldrede',
    historicalShort:
      'Derselbe Satz wie bei Matthäus – aber an einer Stelle, die ihn deutlich schärfer macht.',
    historicalLong:
      'Lukas stellt die Regel mitten in den Abschnitt über die Feindesliebe: unmittelbar davor steht das Gebot, dem den Mantel zu lassen, der den Rock nimmt, unmittelbar danach die Frage, was für ein Dank es sei, wenn man nur die liebt, von denen man Gegenliebe erwartet. Damit wird die Regel ausdrücklich aus der Rechnung des Gegenseitigen herausgelöst. Bei Matthäus steht derselbe Satz am Ende der Bergpredigt und fasst Gesetz und Propheten zusammen; die Stellung verändert den Sinn erheblich.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Beide Fassungen stammen aus der Spruchquelle. Der Unterschied liegt nicht im Wortlaut, sondern in der Platzierung – ein gutes Beispiel dafür, wie Zusammenhang Bedeutung erzeugt.',
      },
      {
        tradition: 'Ethische Auslegung',
        text: 'Weil der Zusammenhang die Gegenseitigkeit ausschließt, wird die Regel bei Lukas zur Aufforderung zum Vorschuss: zu handeln, ohne mit Erwiderung zu rechnen.',
      },
      {
        tradition: 'Wirkungsgeschichte',
        text: 'Die Regel gehört zu den wenigen Sätzen, die in nahezu allen Religionen eine Entsprechung haben. Das Weltethos-Projekt hat sie zum gemeinsamen Nenner erklärt – nicht unwidersprochen.',
      },
    ],
    crossRefs: [
      { book: 'lk', chapter: 6, verse: 27, note: 'Das Gebot der Feindesliebe' },
      { book: 'lk', chapter: 6, verse: 35 },
      { book: 'mt', chapter: 7, verse: 12 },
      { book: 'gal', chapter: 6, verse: 10 },
    ],
  },
  {
    book: 'lk',
    chapter: 6,
    from: 38,
    to: 38,
    title: '„Gebt, so wird euch gegeben“',
    historicalShort:
      'Ein Bild aus dem Getreidehandel – und ein Vers mit einer schwierigen Wirkungsgeschichte.',
    historicalLong:
      'Das Maß, das gedrückt, gerüttelt und überfließend in den Schoß gegeben wird, beschreibt genau, was ein redlicher Händler beim Abmessen von Korn tat: Er drückte nach, schüttelte den Behälter und häufte auf, bis es überlief. Der Schoß meint die aufgenommene Falte des Obergewandes, die als Tragebeutel diente. Im Zusammenhang steht der Satz nicht bei Geld, sondern beim Richten und Verurteilen: Es geht darum, mit welchem Maß man anderen begegnet. Der zweite Halbsatz nennt das ausdrücklich.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Vers schließt eine Reihe über das Richten ab. Vom Geben von Geld ist im Zusammenhang nicht die Rede; die Ausweitung ist Sache der Auslegung.',
      },
      {
        tradition: 'Rabbinische Parallele',
        text: 'Das Bild vom Maß, mit dem gemessen wird, ist ein feststehender Grundsatz der rabbinischen Literatur – meist als Warnung, nicht als Versprechen.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'In Teilen der Wohlstandsverkündigung dient der Vers als Zusage finanzieller Rendite auf Spenden. Diese Lesart steht gegen den Zusammenhang und wird von den Kirchen überwiegend zurückgewiesen.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Verstanden als Beschreibung menschlicher Beziehungen ist der Vers eine nüchterne Beobachtung: Wer eng misst, dem wird eng gemessen.',
      },
    ],
    crossRefs: [
      { book: 'lk', chapter: 6, verse: 37, note: 'Der Zusammenhang: nicht richten' },
      { book: 'mk', chapter: 4, verse: 24 },
      { book: 'mt', chapter: 7, verse: 2 },
      { book: '2kor', chapter: 9, verse: 6 },
    ],
  },
  {
    book: 'lk',
    chapter: 9,
    from: 23,
    to: 23,
    title: '„Nehme sein Kreuz auf sich täglich“',
    historicalShort:
      'Lukas fügt ein einziges Wort hinzu – und verändert damit den ganzen Satz.',
    historicalLong:
      'Markus und Matthäus überliefern denselben Ruf ohne das Wort täglich. Bei Markus ist das Kreuz die Hinrichtung, die konkret bevorsteht; der Satz meint dort die Bereitschaft, mit Jesus zu sterben. Lukas schreibt für eine Gemeinde, in der die meisten nicht hingerichtet werden. Sein Zusatz überträgt das Bild auf den Alltag und macht aus dem einmaligen Todesweg eine wiederkehrende Übung. Das Kreuz war für die Erstleser kein Schmuckstück, sondern das Hinrichtungswerkzeug der römischen Besatzung.',
    reception:
      'Aus dem Zusatz „täglich“ hat das Mönchtum seine Grundregel gemacht: Nachfolge als Übung, nicht als einmaliger Entschluss. Von der Regula Benedicti über Thomas von Kempen bis zur ignatianischen Tagesrückschau läuft diese Linie durch die ganze abendländische Frömmigkeit.\n\nSie hat auch eine schädliche Seite. „Sein Kreuz tragen“ ist zur Redewendung für jede Last geworden und wurde Menschen in Gewaltbeziehungen, in Ausbeutung und in Krankheit als Aufforderung zum Ausharren vorgehalten. Seelsorgliche Literatur widerspricht dem heute klar: Der Text spricht von einer Entscheidung, nicht von einem Erleiden.',
    terms: [
      {
        word: 'griech. kath hemeran',
        rendered: 'täglich',
        note: 'Ein Zusatz, den nur Lukas hat; Markus und Matthäus überliefern den Ruf ohne ihn. Aus einem einmaligen Todesweg wird damit eine wiederkehrende Übung.',
      },
      {
        word: 'griech. arnesastho',
        rendered: 'verleugne',
        note: 'Dasselbe Verb, mit dem Lukas die Verleugnung des Petrus beschreibt: „ich kenne ihn nicht“. Gemeint ist nicht Selbstverachtung, sondern das Zurücktreten hinter eine andere Bindung.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Das Wort täglich ist lukanisches Sondergut. Es zeigt, wie das Evangelium in einer Zeit ohne akute Verfolgung neu gefasst wurde.',
      },
      {
        tradition: 'Monastische Tradition',
        text: 'Die Übertragung ins Alltägliche wurde zur Grundlage der Askese: nicht der Märtyrertod, sondern die tägliche Selbstverleugnung.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Das Wort vom Kreuztragen wurde geschichtlich benutzt, um Menschen zum Erdulden von Gewalt und Unrecht anzuhalten. Feministische Theologie hat dem widersprochen: Der Text redet von freiwilliger Nachfolge, nicht von auferlegtem Leid.',
      },
      {
        tradition: 'Wirkungsgeschichte',
        text: 'Die Rede vom eigenen Kreuz, das jeder zu tragen habe, hat sich weit von diesem Vers gelöst und meint heute meist unvermeidliches Schicksal.',
      },
    ],
    crossRefs: [
      { book: 'lk', chapter: 9, verse: 22, note: 'Die Leidensankündigung davor' },
      { book: 'mk', chapter: 8, verse: 34 },
      { book: 'gal', chapter: 2, verse: 20 },
      { book: 'roem', chapter: 12, verse: 1 },
    ],
  },
  {
    book: 'lk',
    chapter: 19,
    from: 10,
    to: 10,
    title: '„Zu suchen und selig zu machen, das verloren ist“',
    historicalShort:
      'Der Schlusssatz der Zachäusgeschichte – und das Programm des Lukasevangeliums in einem Satz.',
    historicalLong:
      'Zachäus ist Oberzöllner in Jericho, also Kollaborateur der römischen Steuerpacht und begütert. Dass Jesus bei ihm einkehrt, löst Murren aus. Der Schlusssatz greift auf Hesekiel 34 zurück, wo Gott selbst ankündigt, das Verlorene zu suchen. Lukas hat denselben Gedanken zuvor in drei Gleichnissen entfaltet: das verlorene Schaf, der verlorene Groschen, der verlorene Sohn. Die Zusage steht dabei nicht am Anfang, sondern nachdem Zachäus die Hälfte seines Vermögens abgegeben hat.',
    reception:
      'Der Vers ist das Leitwort unzähliger Missionswerke und Stadtmissionen geworden und steht über den Eingängen vieler diakonischer Einrichtungen. In der Erweckungsbewegung des 19. Jahrhunderts war er der Standardtext für die Ansprache an Außenstehende.\n\nStrittig ist die Reihenfolge im Text. Zachäus sagt in Vers 8 zu, die Hälfte seines Vermögens zu geben und vierfach zu erstatten – im Griechischen in der Gegenwartsform, was auch heißen kann, dass er es längst tut. Wer so liest, findet keine Bekehrungsgeschichte, sondern die Verteidigung eines Mannes gegen ein Vorurteil.',
    terms: [
      {
        word: 'griech. architelones',
        note: 'Oberzöllner – ein Wort, das sonst nirgends belegt ist. Zachäus stand also nicht an der Schranke, sondern hatte die Steuerpacht eines Bezirks; Jericho lag an einer Zollgrenze und war für Balsamhandel bekannt.',
      },
      {
        word: 'griech. apololos',
        rendered: 'verloren',
        note: 'Das Verlorene – dieselbe Form wie beim verlorenen Schaf, dem verlorenen Groschen und dem verlorenen Sohn zwei Kapitel vorher. Es meint nicht „verdorben“, sondern „abhandengekommen“; verloren ist etwas für den, dem es gehört.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Erzählung ist Sondergut des Lukas. Sein Interesse an Zöllnern, Armen und Frauen prägt das ganze Buch; der Vers formuliert das Programm.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Betont wird die Reihenfolge: Jesus lädt sich ein, bevor Zachäus etwas ändert. Die Umkehr ist Folge der Zuwendung, nicht ihre Bedingung.',
      },
      {
        tradition: 'Katholische Auslegung',
        text: 'Hervorgehoben wird die konkrete Wiedergutmachung: Zachäus erstattet vierfach zurück. Umkehr zeigt sich an nachprüfbaren Folgen.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Wer als verloren gilt, hängt vom Blick der Erzählenden ab. Ausleger warnen davor, den Begriff auf Gruppen anzuwenden, die sich selbst nicht so sehen.',
      },
    ],
    crossRefs: [
      { book: 'lk', chapter: 19, verse: 8, note: 'Die Zusage des Zachäus' },
      { book: 'hes', chapter: 34, verse: 16 },
      { book: 'lk', chapter: 15, verse: 4 },
      { book: 'lk', chapter: 5, verse: 32 },
    ],
  },
  {
    book: 'joh',
    chapter: 10,
    from: 10,
    to: 11,
    title: '„Daß sie das Leben und volle Genüge haben sollen“',
    historicalShort:
      'Ein Vers über Fülle – der in dieser Textausgabe anders numeriert ist, als viele ihn kennen.',
    historicalLong:
      'Die Zählung weicht hier von der gedruckten Lutherbibel ab: Vers 10 enthält nur den Satz über den Dieb, der Zweck des Kommens steht in Vers 11, und das Wort vom guten Hirten beginnt erst in Vers 12. Wer nach Johannes 10,10 sucht, findet den bekannten Satz also einen Vers weiter. Inhaltlich steht der Abschnitt in der Hirtenrede, die auf Hesekiel 34 zurückgreift, wo die Hirten Israels ihrer Herde vorgeworfen werden. Das Wort, das Luther mit volle Genüge übersetzt, meint das Übermaß, den Überschuss.',
    reception:
      'Der Satz vom Leben in Fülle ist zum Leitwort kirchlicher Entwicklungsarbeit geworden: Der Ökumenische Rat der Kirchen und zahlreiche Hilfswerke führen ihn in ihren Grundlagentexten, meist mit der Betonung, dass „Fülle“ Ernährung, Bildung und Gesundheit einschließt und nicht nur eine innere Größe ist.\n\nIn der Wohlstandsverkündigung wird derselbe Vers als Zusage materiellen Überflusses gelesen. Der Zusammenhang steht dem entgegen: Er handelt vom Hirten, der sein Leben lässt, und richtet sich gegen die, die „stehlen, würgen und umbringen“ – der Kontrast ist Ausbeutung, nicht Bescheidenheit.',
    terms: [
      {
        word: 'griech. perisson',
        rendered: 'volle Genüge',
        note: 'Das Übermaß, der Überschuss – dasselbe Wort steht für die zwölf Körbe, die nach der Speisung übrig bleiben. Nicht „genug“, sondern „mehr als nötig“.',
      },
      {
        word: 'griech. zoe',
        rendered: 'Leben',
        note: 'Das Griechische unterscheidet *bios*, die Lebensspanne, von *zoe*, dem Lebendigsein. Johannes gebraucht durchgehend das zweite – es geht nicht um Länge.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Hirtenrede setzt die Auseinandersetzung mit der Synagoge voraus, die das Johannesevangelium durchzieht. Die Diebe sind im Zusammenhang religiöse Führungsfiguren, nicht Kriminelle.',
      },
      {
        tradition: 'Orthodoxe Tradition',
        text: 'Das Übermaß des Lebens wird auf die Teilhabe an Gott bezogen: nicht mehr Lebenszeit, sondern eine andere Qualität des Lebendigseins.',
      },
      {
        tradition: 'Wirkungsgeschichte',
        text: 'Der Vers ist in der neueren Frömmigkeit zum Leitwort für Lebensfülle geworden, oft losgelöst von der Auseinandersetzung, in der er steht.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Wird Fülle als Erfolg oder Gesundheit verstanden, wird der Vers zur Zumutung für Kranke. Im Text folgt unmittelbar der Hirte, der sein Leben lässt – Fülle und Hingabe stehen zusammen.',
      },
    ],
    crossRefs: [
      { book: 'hes', chapter: 34, verse: 2, note: 'Die Anklage gegen die Hirten Israels' },
      { book: 'joh', chapter: 10, verse: 12 },
      { book: 'ps', chapter: 23, verse: 1 },
      { book: 'joh', chapter: 3, verse: 16 },
    ],
  },
  {
    book: 'joh',
    chapter: 11,
    from: 25,
    to: 26,
    title: '„Ich bin die Auferstehung und das Leben“',
    historicalShort:
      'Gesprochen am Grab, im Gespräch mit einer Trauernden – und mit einer Rückfrage am Ende.',
    historicalLong:
      'Martha hat Jesus gerade vorgeworfen, zu spät gekommen zu sein, und bekennt zugleich den Glauben an die Auferstehung am Jüngsten Tage, wie ihn die Pharisäer lehrten. Jesus verschiebt die Aussage aus der Zukunft in die Gegenwart: nicht ein Ereignis am Ende, sondern eine Person jetzt. Der Satz gehört zu den sieben Ich-bin-Worten des Johannesevangeliums. Bemerkenswert ist, dass die Rede in eine Frage mündet, die unbeantwortet im Raum steht, bis Martha in Vers 27 antwortet.',
    reception:
      'Der Vers eröffnet in vielen Kirchen die Trauerfeier und steht am Beginn des anglikanischen Begräbnisritus, der über das Book of Common Prayer die englischsprachige Bestattungssprache geprägt hat. Brahms nahm ihn nicht auf, Bach vertonte ihn mehrfach; in der bildenden Kunst gehört die Auferweckung des Lazarus zu den ältesten Motiven überhaupt und findet sich schon in den römischen Katakomben.\n\nAuffällig ist, wie selten die Fortsetzung mitgelesen wird. Auf die Zusage folgt eine Frage – „Glaubst du das?“ –, und zwei Verse später weint Jesus am Grab. Der Text lässt Zusage, Rückfrage und Trauer nebeneinander stehen.',
    terms: [
      {
        word: 'griech. ego eimi',
        rendered: 'Ich bin',
        note: 'Dieselbe Formel wie in der Antwort Gottes am Dornbusch. Johannes stellt sie siebenmal an den Anfang eines Bildworts; hier ist das Bild kein Gegenstand, sondern ein Ereignis.',
      },
      {
        word: 'griech. anastasis',
        rendered: 'Auferstehung',
        note: 'Wörtlich das Aufstehen. Martha bekennt es als künftiges Ereignis „am Jüngsten Tage“; die Antwort verschiebt es in die Gegenwart, ohne den Jüngsten Tag zu bestreiten.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Johannes gestaltet die Auferweckung des Lazarus als letztes und größtes der Zeichen und zugleich als Auslöser des Todesbeschlusses gegen Jesus.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Der Vers ist einer der meistgelesenen Texte bei Beerdigungen. Gelesen wird er dort meist ohne die Schlussfrage, die den Hörenden eine Antwort abverlangt.',
      },
      {
        tradition: 'Katholische Auslegung',
        text: 'Betont wird die Gegenwart des ewigen Lebens: Es beginnt nicht nach dem Tod, sondern ist in der Taufe bereits angefangen.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Der Satz nimmt der Trauer nichts. Zwei Verse später weint Jesus selbst. Ausleger halten fest, dass der Text Trost und Klage nebeneinander stehen lässt.',
      },
    ],
    crossRefs: [
      { book: 'joh', chapter: 11, verse: 27, note: 'Die Antwort der Martha' },
      { book: 'joh', chapter: 11, verse: 35 },
      { book: '1kor', chapter: 15, verse: 20 },
      { book: 'roem', chapter: 6, verse: 4 },
    ],
  },
  {
    book: 'joh',
    chapter: 13,
    from: 34,
    to: 35,
    title: 'Das neue Gebot',
    historicalShort:
      'Neu ist an diesem Gebot nicht die Liebe – neu ist der Maßstab.',
    historicalLong:
      'Das Gebot der Nächstenliebe steht bereits in 3. Mose 19,18. Der Text nennt das Gebot dennoch neu, weil ein anderer Vergleichspunkt eingeführt wird: nicht wie dich selbst, sondern wie ich euch geliebt habe. Gesprochen wird der Satz beim letzten Mahl, unmittelbar nachdem Jesus den Jüngern die Füße gewaschen hat, und unmittelbar nachdem Judas hinausgegangen ist. Der Kreis, von dem geredet wird, ist ausdrücklich die Gemeinde: einander, nicht alle Menschen.',
    reception:
      'Aus Vers 35 wurde das Erkennungszeichen der frühen Gemeinden; Tertullian überliefert um 200 den Ausruf der Heiden: „Seht, wie sie einander lieben.“ Die Fußwaschung am Gründonnerstag heißt nach dem lateinischen Anfang dieses Verses – *mandatum novum* – bis heute Mandatum; das englische Wort *Maundy Thursday* stammt daher.\n\nDie Einschränkung auf „einander“ ist früh diskutiert worden. Kritiker sahen darin eine Binnenmoral, die den Blick nach außen verstellt; Ausleger halten dagegen, dass Johannes an eine bedrängte, kleine Gemeinschaft schreibt, deren Zusammenhalt ihre Existenzbedingung war – und dass Vers 35 den Blick von außen ausdrücklich einbezieht.',
    terms: [
      {
        word: 'griech. kaine',
        rendered: 'neu',
        note: 'Neu in der Art, nicht neu im Sinn von „gerade entstanden“ – dafür gäbe es ein anderes Wort. Das Gebot ist nicht unbekannt; sein Maßstab ist neu.',
      },
      {
        word: 'griech. allelous',
        rendered: 'untereinander',
        note: 'Einander – ausdrücklich wechselseitig und ausdrücklich im Kreis der Angeredeten. Johannes sagt hier nicht „alle Menschen“; das ist der Punkt, an dem der Vers immer wieder befragt wird.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die johanneische Gemeinde lebte offenbar in scharfer Abgrenzung nach außen. Die Beschränkung auf die gegenseitige Liebe spiegelt diese Lage.',
      },
      {
        tradition: 'Altkirchliche Auslegung',
        text: 'Tertullian überliefert den Spott der Umwelt: Seht, wie sie einander lieben. Die Binnenliebe wurde als äußeres Erkennungszeichen wahrgenommen.',
      },
      {
        tradition: 'Ökumenische Auslegung',
        text: 'Vers 35 macht die Einheit der Christen zu einer Frage der Glaubwürdigkeit nach außen und wird deshalb in ökumenischen Texten häufig zitiert.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Anders als das Gebot der Feindesliebe bei Matthäus bleibt dieses Gebot im eigenen Kreis. Ausleger fragen, ob damit die Binnenmoral gestärkt und die Außenwelt aus dem Blick gerät.',
      },
    ],
    crossRefs: [
      { book: 'joh', chapter: 13, verse: 5, note: 'Die Fußwaschung' },
      { book: '3mo', chapter: 19, verse: 18 },
      { book: 'mt', chapter: 5, verse: 44 },
      { book: '1joh', chapter: 4, verse: 7 },
    ],
  },
  {
    book: 'joh',
    chapter: 14,
    from: 27,
    to: 27,
    title: '„Nicht gebe ich euch, wie die Welt gibt“',
    historicalShort:
      'Ein Abschiedsgruß, der die übliche Grußformel aufnimmt und ihr widerspricht.',
    historicalLong:
      'Friede sei mit euch war und ist der alltägliche Gruß, hebräisch schalom. Der Text nimmt die Formel auf und setzt sie ab: Was hier gegeben wird, gleicht nicht dem, was die Welt gibt. Gemeint ist damit nicht ein innerer Gefühlszustand gegenüber äußerem Frieden; die römische Ordnung der Zeit hieß Pax Romana und war ein durch Waffen gesicherter Frieden. Der Satz steht in den Abschiedsreden, also in einer Situation, in der die Angst der Jünger den ganzen Zusammenhang bestimmt.',
    reception:
      'Der Vers gehört zum festen Bestand des Friedensgrußes in der Liturgie und wurde in der Friedensbewegung der 1980er Jahre zu einem ihrer meistzitierten Sätze – gerade wegen der Absetzung vom Frieden, „wie die Welt gibt“. Die *Pax Romana*, die die ersten Leser kannten, war ein durch Waffen gesicherter Zustand.\n\nIn der Mystik hat der Vers eine andere Linie: Von den Wüstenvätern über Meister Eckhart bis zu heutigen Stilleübungen gilt er als Zusage eines Friedens, der von den Umständen unabhängig ist. Beide Lesarten – die politische und die innerliche – berufen sich auf denselben Satz und stehen bis heute nebeneinander.',
    terms: [
      {
        word: 'griech. eirene',
        rendered: 'Frieden',
        note: 'Übersetzt das hebräische *schalom*, den alltäglichen Gruß – Unversehrtheit, Auskommen, heile Verhältnisse. Der Satz nimmt eine Grußformel auf und setzt sie ab.',
      },
      {
        word: 'griech. tarassestho',
        rendered: 'erschrecke',
        note: 'Aufgewühlt, in Unruhe versetzt werden. Dasselbe Wort steht wenige Kapitel vorher von Jesus selbst am Grab des Lazarus und in Kapitel 12 vor seinem Tod – die Aufforderung verlangt also nichts, was er nicht kennt.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Abschiedsreden richten sich an eine Gemeinde nach der Trennung von der Synagoge. Der Frieden wird ihr gegen ihre reale Bedrängnis zugesprochen.',
      },
      {
        tradition: 'Friedensethische Lesart',
        text: 'Die Absetzung von dem, was die Welt gibt, wird auf den erzwungenen Frieden der Großmächte bezogen: kein Waffenstillstand, sondern eine andere Ordnung.',
      },
      {
        tradition: 'Mystische Tradition',
        text: 'In der Mystik gilt der Vers als Zusage eines Grundes, der unter allen Erschütterungen liegt und von Umständen unabhängig ist.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Satz verbietet die Angst nicht, sondern spricht sie an. Wer Angst hat, wird angeredet – nicht getadelt.',
      },
    ],
    crossRefs: [
      { book: 'joh', chapter: 16, verse: 33, note: 'Dieselbe Zusage am Ende der Abschiedsreden' },
      { book: 'joh', chapter: 20, verse: 19 },
      { book: 'phil', chapter: 4, verse: 7 },
      { book: 'jes', chapter: 26, verse: 3 },
    ],
  },
  {
    book: 'joh',
    chapter: 15,
    from: 5,
    to: 5,
    title: '„Ich bin der Weinstock, ihr seid die Reben“',
    historicalShort:
      'Ein Bild aus dem Weinbau – und zugleich ein politisches Bild aus dem Alten Testament.',
    historicalLong:
      'Der Weinstock ist im Alten Testament ein feststehendes Bild für Israel, meist in der Anklage: Jesaja 5 erzählt vom Weinberg, der schlechte Trauben bringt. Auf den Münzen der Aufständischen war die Weinranke ein nationales Zeichen. Wenn der Text das Bild auf Jesus überträgt, ist das eine gewichtige Aussage. Das Wort bleiben kommt in Kapitel 15 elfmal vor und trägt den ganzen Abschnitt. Der Schlusssatz, ohne mich könnt ihr nichts tun, ist im Griechischen sehr scharf formuliert.',
    reception:
      'Der Weinstock ist eines der ältesten christlichen Bildmotive und findet sich in Katakomben, auf Sarkophagen und in Kirchenfenstern; er hat zugleich eine Vorgeschichte, denn im Alten Testament ist der Weinstock ein Bild für Israel – bei Jesaja 5, Psalm 80, Jeremia 2. Dass Johannes es aufnimmt, ist in der christlich-jüdischen Auslegungsgeschichte nicht unbelastet.\n\nIn der Frömmigkeitsgeschichte hat der Vers zwei entgegengesetzte Wirkungen entfaltet: Für die Mystik ist er der Text vom Einwohnen Gottes im Menschen, für die Aktivisten der Erweckungsbewegungen der Beleg, dass ohne Christus nichts gelingt. Der Satz „ohne mich könnt ihr nichts tun“ steht dabei häufiger auf Plakaten als der Satz vom Bleiben.',
    terms: [
      {
        word: 'griech. meno',
        rendered: 'bleibt',
        note: 'Bleiben, wohnen. Das Verb steht in den Versen 4 bis 10 elfmal und ist das Leitwort des ganzen Abschnitts – nicht Leistung, sondern Verweilen.',
      },
      {
        word: 'griech. klema',
        rendered: 'Reben',
        note: 'Die Rebe, der junge Trieb – nicht die ganze Pflanze. Ein Trieb ohne Stock ist kein schwacher Trieb, sondern gar keiner mehr; darauf zielt der Nachsatz.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Übertragung des Israel-Bildes auf Jesus gehört zur Auseinandersetzung der johanneischen Gemeinde mit der Synagoge. Der scharfe Ton hat einen konkreten Streit als Hintergrund.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Der Vers gilt als Kronzeuge dafür, dass gute Werke aus der Verbindung wachsen und nicht sie herstellen – die Rebe trägt Frucht, sie macht sie nicht.',
      },
      {
        tradition: 'Katholische Tradition',
        text: 'Das Bleiben wird sakramental verstanden: In der Eucharistie wird die Verbindung immer neu vollzogen.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Verse 6 spricht vom Verdorren und Verbrennen unfruchtbarer Reben. In der Geschichte wurde das gegen Andersdenkende gewendet. Ausleger betonen, dass das Bild eine Zusage an Bleibende ist und kein Verfahren gegen andere.',
      },
    ],
    crossRefs: [
      { book: 'jes', chapter: 5, verse: 1, note: 'Das Weinberglied' },
      { book: 'ps', chapter: 80, verse: 8 },
      { book: 'joh', chapter: 15, verse: 12 },
      { book: 'gal', chapter: 5, verse: 22 },
    ],
  },
  {
    book: 'joh',
    chapter: 16,
    from: 33,
    to: 33,
    title: '„Ich habe die Welt überwunden“',
    historicalShort:
      'Der letzte Satz vor dem Abschiedsgebet – ein Perfekt, gesprochen vor der Kreuzigung.',
    historicalLong:
      'Der Satz steht am Ende der Abschiedsreden, unmittelbar vor dem Gebet in Kapitel 17 und der Gefangennahme. Auffällig ist die Zeitform: überwunden ist bereits geschehen, obwohl Verhaftung, Verhör und Hinrichtung noch bevorstehen. Für das Johannesevangelium ist die Erhöhung am Kreuz selbst der Sieg; deshalb kann der Satz vorweggenommen werden. Der erste Teil räumt die Angst ausdrücklich ein: In der Welt habt ihr Angst – das wird nicht bestritten, sondern festgestellt.',
    reception:
      'Der Vers gehört zu den meistgesprochenen Sätzen in Kriegs- und Krisenzeiten und stand in den Feldpostbriefen beider Weltkriege ebenso wie in den Gebeten der Friedensgebete von 1989. Bach setzte ihn in der Kantate BWV 87 an den Anfang und ließ ihn vom Bass als Christuswort singen.\n\nSeine Sprengkraft liegt in der Reihenfolge: Erst wird die Bedrängnis zugegeben, dann folgt der Trost. Die Auslegung hat oft nur die zweite Hälfte zitiert; wer beide liest, findet keinen Satz gegen die Angst, sondern einen daneben.',
    terms: [
      {
        word: 'griech. thlipsis',
        rendered: 'Angst',
        note: 'Wörtlich Druck, Bedrängnis – ein Wort für äußere Not, nicht für ein Gefühl. Luthers „Angst“ hat im 16. Jahrhundert genau diesen Klang von Enge.',
      },
      {
        word: 'griech. nenikeka',
        rendered: 'überwunden',
        note: 'Eine Vollendungsform: „ich habe gesiegt und es steht“. Gesprochen wird der Satz vor der Verhaftung – der Sieg ist also nicht das Ergebnis dessen, was noch kommt, sondern geht ihm voraus.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Johannes deutet das Kreuz durchgehend als Erhöhung und Verherrlichung. Die vollendete Zeitform ist keine Ungenauigkeit, sondern Programm.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Betont wird die Doppelaussage: Angst und Getrostsein stehen im selben Vers nebeneinander, nicht nacheinander.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die Rede vom Überwinden der Welt hat eine Geschichte der Weltverachtung befördert. Welt meint bei Johannes jedoch die Ordnung, die sich Gott verweigert, nicht die Schöpfung.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Vers wird häufig Sterbenden gelesen. Er verlangt keine Angstfreiheit, sondern stellt die Angst in einen Zusammenhang.',
      },
    ],
    crossRefs: [
      { book: 'joh', chapter: 14, verse: 27, note: 'Dieselbe Zusage zu Beginn der Abschiedsreden' },
      { book: 'joh', chapter: 17, verse: 1 },
      { book: '1joh', chapter: 5, verse: 4 },
      { book: 'roem', chapter: 8, verse: 37 },
    ],
  },
  {
    book: 'apg',
    chapter: 1,
    from: 8,
    to: 8,
    title: '„Bis an das Ende der Erde“',
    historicalShort:
      'Der Aufriss des ganzen Buches in einem einzigen Satz.',
    historicalLong:
      'Die Jünger haben eben gefragt, ob nun das Reich für Israel wiederhergestellt werde – eine politische Frage. Die Antwort verschiebt die Erwartung von der Zeit auf den Raum: nicht wann, sondern wohin. Die genannten Stationen sind zugleich der Aufbau der Apostelgeschichte: Jerusalem in den Kapiteln 1 bis 7, Judäa und Samarien in 8 bis 12, das Ende der Erde ab Kapitel 13. Das Buch endet in Rom, also nicht am geographischen Ende – der Auftrag bleibt bewusst offen.',
    reception:
      'Auffällig ist, wie das Buch endet: Paulus predigt in Rom „ungehindert“, und danach bricht die Erzählung ab – ohne Prozess, ohne Tod, ohne Abschluss. Ein Teil der Forschung sieht darin Absicht: Das „Ende der Erde“ sei erreicht, und was danach kommt, betreffe die Leser.\n\nIn der Missionsgeschichte ist der Vers zum Programm geworden, mit den bekannten zwei Seiten: weltweite Übersetzungsarbeit und Bildung auf der einen, die Verquickung mit kolonialer Macht auf der anderen. Missionserklärungen seit den 1960er Jahren betonen deshalb, dass „Zeuge sein“ ein Aussagewort ist und kein Auftrag zur Unterwerfung.',
    terms: [
      {
        word: 'griech. martyres',
        rendered: 'Zeugen',
        note: 'Zeugen vor Gericht. Aus diesem Wort wird im 2. Jahrhundert der Märtyrer – weil das Zeugnis vor Gericht so oft mit dem Tod endete.',
      },
      {
        word: 'griech. dynamis',
        rendered: 'Kraft',
        note: 'Kraft, Vermögen, Fähigkeit – daher unser Wort Dynamik. Der Satz verspricht nicht Mut, sondern Ausstattung: etwas, das die Angeredeten nicht selbst mitbringen.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Vers ist das Gliederungsprinzip des Buches. Dass die Erzählung in Rom abbricht, ist wahrscheinlich Absicht: Die Bewegung ist nicht abgeschlossen.',
      },
      {
        tradition: 'Missionsgeschichtliche Lesart',
        text: 'Der Vers wurde zum Leitwort der neuzeitlichen Mission. Die Nennung Samariens fällt dabei oft weg, obwohl sie im Text der schwierigste Schritt ist – Samarien war verfeindetes Nachbargebiet.',
      },
      {
        tradition: 'Postkoloniale Rückfrage',
        text: 'Der Vers hat auch koloniale Unternehmungen begleitet und legitimiert. Ausleger halten fest, dass der Text von Zeugen redet, die Kraft empfangen, nicht von Herrschaft, die ausgeübt wird.',
      },
      {
        tradition: 'Pfingstlich-charismatische Auslegung',
        text: 'Betont wird die Reihenfolge: Erst die Kraft des Geistes, dann das Zeugnis. Der Auftrag ist nach dieser Lesart nicht aus eigenem Vermögen auszuführen.',
      },
    ],
    crossRefs: [
      { book: 'apg', chapter: 1, verse: 6, note: 'Die Frage nach dem Reich für Israel' },
      { book: 'apg', chapter: 8, verse: 5 },
      { book: 'apg', chapter: 28, verse: 31 },
      { book: 'mt', chapter: 28, verse: 19 },
    ],
  },
  {
    book: 'apg',
    chapter: 2,
    from: 38,
    to: 38,
    title: '„Tut Buße und lasse sich ein jeglicher taufen“',
    historicalShort:
      'Die erste christliche Predigt endet mit einer Frage aus der Menge – und dieser Antwort.',
    historicalLong:
      'Die Zuhörer haben nach der Pfingstpredigt gefragt, was sie tun sollen. Die Antwort nennt drei Schritte, die im Text zusammengehören: Umkehr, Taufe auf den Namen Jesu Christi, Empfang des Geistes. Das griechische Wort für Buße heißt Umdenken, nicht Reue im Sinne von Zerknirschung. Die Taufe auf den Namen Jesu unterscheidet sich in der Formel von der trinitarischen Taufe in Matthäus 28; beide Formen stehen unausgeglichen nebeneinander im Neuen Testament.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Lukas stellt in der Pfingstpredigt ein Muster christlicher Verkündigung auf. Ob die Formel bereits so gebraucht wurde, lässt sich nicht sichern.',
      },
      {
        tradition: 'Katholische Tradition',
        text: 'Der Vers gilt als Beleg für die Taufe zur Vergebung der Sünden und für die Verbindung von Taufe und Geistgabe, die in Taufe und Firmung entfaltet wird.',
      },
      {
        tradition: 'Täuferische Tradition',
        text: 'Die Reihenfolge Umkehr vor Taufe wird als Argument für die Glaubenstaufe gelesen: Wer umkehren soll, muss entscheiden können.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Vers 39 schließt die Kinder ausdrücklich ein. Der Streit um die Kindertaufe lässt sich mit dieser Stelle in beide Richtungen führen und ist mit ihr allein nicht zu entscheiden.',
      },
    ],
    crossRefs: [
      { book: 'apg', chapter: 2, verse: 37, note: 'Die Frage der Zuhörer' },
      { book: 'apg', chapter: 2, verse: 39 },
      { book: 'mt', chapter: 28, verse: 19 },
      { book: 'roem', chapter: 6, verse: 3 },
    ],
  },
  {
    book: 'apg',
    chapter: 4,
    from: 12,
    to: 12,
    title: '„Kein andrer Name unter dem Himmel“',
    historicalShort:
      'Ein Satz vor Gericht gesprochen – und einer der schwierigsten Sätze im Verhältnis zu anderen Religionen.',
    historicalLong:
      'Petrus steht vor dem Hohen Rat und wird verhört, weil er einen Gelähmten geheilt hat. Die Frage lautete, in welchem Namen er das getan habe; der Satz ist die Antwort darauf. Das griechische Wort, das Luther mit selig werden übersetzt, meint zugleich heilen und retten – im Zusammenhang der Heilung ist beides gemeint. Der Text der Lutherausgabe enthält hier den ungewöhnlichen Bindestrich in keinem andern-Heil, eine Eigenheit der Vorlage. Angeredet ist eine innerjüdische Streitlage, nicht das Verhältnis zu anderen Religionen.',
    reception:
      'Der Vers ist neben Johannes 14,6 der meistzitierte Beleg für den Absolutheitsanspruch des Christentums und stand entsprechend im Zentrum aller Debatten über Mission und Religionsdialog. Er wird häufig ohne seine Lage zitiert: Gesprochen ist er in einem Verhör vor dem Hohen Rat, in dem sich zwei Handwerker gegen eine Anklage verteidigen, nicht in einem Vergleich der Religionen.\n\nKirchliche Erklärungen des 20. Jahrhunderts halten daran fest, dass Christen ihr Heil von Christus erwarten, und lehnen zugleich ab, daraus ein Urteil über andere abzuleiten – *Nostra aetate* 1965, die Erklärungen des Ökumenischen Rates seit 1979. Wie beides zusammengeht, ist nicht abschließend geklärt.',
    terms: [
      {
        word: 'griech. sozo',
        rendered: 'selig werden',
        note: 'Retten, heilen, gesund machen. Im Zusammenhang steht das Wort doppeldeutig: Zwei Verse vorher geht es um die Heilung eines Gelähmten, hier um Rettung im weiteren Sinn. Petrus spielt mit dieser Doppeldeutigkeit.',
      },
      {
        word: 'griech. onoma',
        rendered: 'Name',
        note: 'Der Name steht in der Bibel für die Person selbst, nicht für eine Formel. „In keinem andern Namen“ heißt: durch keinen anderen – nicht: durch keine andere Aussprache.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Satz fällt in einem Verhör und ist Verteidigungsrede, nicht Lehrsatz über die Religionen der Welt. Die Zuspitzung erklärt sich aus der Gerichtssituation.',
      },
      {
        tradition: 'Katholische Lehre',
        text: 'Das Zweite Vatikanische Konzil hält an der Einzigkeit Christi fest und erkennt zugleich Wahrheit und Heiliges in anderen Religionen an. Beides steht in Nostra aetate nebeneinander.',
      },
      {
        tradition: 'Evangelikale Auslegung',
        text: 'Der Vers wird als klare Aussage über die Einzigartigkeit des Heils in Christus gelesen und ist eine Grundlage der Missionsbegründung.',
      },
      {
        tradition: 'Religionstheologische Rückfrage',
        text: 'Pluralistische Ansätze lesen den Satz als Bekenntnissprache: Sie sagt, woran die Sprechenden hängen, und trifft keine Aussage über das Schicksal anderer. Diese Deutung ist innerchristlich umstritten.',
      },
    ],
    crossRefs: [
      { book: 'apg', chapter: 4, verse: 7, note: 'Die Frage des Hohen Rates' },
      { book: 'apg', chapter: 3, verse: 6 },
      { book: 'joh', chapter: 14, verse: 6 },
      { book: '1tim', chapter: 2, verse: 5 },
    ],
  },
  {
    book: 'apg',
    chapter: 16,
    from: 31,
    to: 31,
    title: '„Glaube an den HERRN Jesus Christus“',
    historicalShort:
      'Gesagt zu einem Gefängniswärter, der sich gerade töten wollte.',
    historicalLong:
      'Paulus und Silas sitzen in Philippi im Gefängnis, ein Erdbeben öffnet die Türen. Der Wärter will sich das Schwert geben, weil auf Gefangenenflucht die Todesstrafe stand. Seine Frage, was er tun solle, um selig zu werden, meint zunächst wohl ganz handfest die Rettung seines Lebens. Die Antwort schließt das Haus ein: Damit ist der ganze Hausverband gemeint, also Familie, Bedienstete und Sklaven – eine soziale Einheit, nicht eine Kleinfamilie im heutigen Sinn.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Lukas erzählt mehrere Haustaufen. Sie spiegeln, dass die frühe Mission über Hausgemeinschaften lief, deren Oberhaupt für alle entschied.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Der Vers gilt als knappste Fassung der Rechtfertigung allein aus Glauben. Die Bedingung ist der Glaube, nicht eine Leistung.',
      },
      {
        tradition: 'Volkskirchliche Tradition',
        text: 'Die Mitnennung des Hauses wird als Beleg für die Taufe ganzer Familien einschließlich der Kinder angeführt.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Ob der Glaube eines Hausvaters für alle anderen gelten kann, ist theologisch strittig. Ausleger verweisen darauf, dass Vers 32 ausdrücklich sagt, das Wort sei allen im Haus gepredigt worden.',
      },
    ],
    crossRefs: [
      { book: 'apg', chapter: 16, verse: 32, note: 'Allen im Hause wird gepredigt' },
      { book: 'apg', chapter: 16, verse: 14 },
      { book: 'roem', chapter: 10, verse: 9 },
      { book: 'eph', chapter: 2, verse: 8 },
    ],
  },
  {
    book: 'roem',
    chapter: 1,
    from: 16,
    to: 17,
    title: '„Der Gerechte wird seines Glaubens leben“',
    historicalShort:
      'Das Thema des ganzen Römerbriefs – und der Satz, an dem sich Luthers Wende entzündete.',
    historicalLong:
      'Paulus stellt seiner umfangreichsten Schrift diese beiden Verse als Überschrift voran. Das Zitat stammt aus Habakuk 2,4 und lässt sich im Hebräischen wie im Griechischen auf zweierlei Weise auflösen: aus Glauben leben oder als Gerechter aus Treue. Luther berichtet, er habe die Gerechtigkeit Gottes lange als fordernde Gerechtigkeit verstanden, die ihn richtet, und erst später als geschenkte, die gilt. Die Reihenfolge Juden vornehmlich und auch die Griechen ist im Brief keine Nebenbemerkung, sondern wird in den Kapiteln 9 bis 11 ausführlich verhandelt.',
    reception:
      'An diesem Vers hängt der Beginn der Reformation. Luther beschrieb 1545 im Rückblick, wie er den Ausdruck „Gerechtigkeit Gottes“ zunächst als Forderung verstand und ihn hasste – bis er begriff, dass die Gerechtigkeit geschenkt wird. Diese Einsicht, oft „Turmerlebnis“ genannt, ist der Ausgangspunkt seiner Theologie; ob sie sich auf ein einzelnes Ereignis datieren lässt, bezweifelt die Forschung.\n\nDie neuere Paulusforschung hat die Deutung erweitert: Sie liest die „Gerechtigkeit Gottes“ auch als Gottes Bundestreue gegenüber Israel und sieht in Vers 16 die Reihenfolge „die Juden vornehmlich“ nicht als Höflichkeit, sondern als Programm des ganzen Briefes, das in Kapitel 9 bis 11 entfaltet wird.',
    terms: [
      {
        word: 'griech. dikaiosyne theou',
        rendered: 'Gerechtigkeit, die vor Gott gilt',
        note: 'Die Wendung kann heißen: die Gerechtigkeit, die Gott selbst hat, die er fordert, oder die er schenkt. Luthers Übersetzung entscheidet sich für die dritte – und an dieser Entscheidung hängt seine ganze Theologie.',
      },
      {
        word: 'griech. dynamis',
        rendered: 'Kraft',
        note: 'Kraft, wirksame Macht. Das Evangelium ist nach diesem Satz keine Mitteilung über etwas, sondern etwas, das wirkt.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Brief richtet sich an eine Gemeinde aus Juden- und Heidenchristen, deren Verhältnis zueinander gespannt war. Die Doppelnennung in Vers 16 nimmt das auf.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Luther las Gerechtigkeit Gottes als Genitiv der Herkunft: Gerechtigkeit, die von Gott kommt und zugesprochen wird. Aus dieser Umdeutung erwuchs die Rechtfertigungslehre.',
      },
      {
        tradition: 'Katholische Auslegung',
        text: 'Die Gemeinsame Erklärung zur Rechtfertigungslehre von 1999 hält fest, dass Rechtfertigung Zuspruch und Erneuerung zugleich ist – ein jahrhundertealter Streitpunkt gilt damit als beigelegt.',
      },
      {
        tradition: 'Neue Paulusperspektive',
        text: 'Seit den Arbeiten von Sanders, Dunn und Wright wird gefragt, ob Paulus überhaupt vom Heilsweg des Einzelnen redet oder von der Zugehörigkeit der Heiden zum Gottesvolk. Die Debatte ist offen.',
      },
    ],
    crossRefs: [
      { book: 'hab', chapter: 2, verse: 4, note: 'Das Zitat im Zusammenhang' },
      { book: 'roem', chapter: 3, verse: 21 },
      { book: 'gal', chapter: 3, verse: 11 },
      { book: 'roem', chapter: 11, verse: 1 },
    ],
  },
  {
    book: 'roem',
    chapter: 3,
    from: 23,
    to: 24,
    title: '„Allzumal Sünder“ – und ohne Verdienst gerecht',
    historicalShort:
      'Zwei Verse, die zusammengehören und meist getrennt zitiert werden.',
    historicalLong:
      'Vers 23 wird häufig für sich genommen und klingt dann wie ein Urteil. Im Satzbau des Paulus ist er aber nur die erste Hälfte: Der Nebensatz läuft ohne Punkt weiter in die Zusage von Vers 24. Der entscheidende Ausdruck heißt wörtlich geschenkweise, umsonst – dasselbe Wort, das in der Septuaginta für grundlos steht. Der Zusammenhang beginnt in Kapitel 1 mit dem Nachweis, dass Juden wie Heiden gleichermaßen unter der Sünde stehen; das Ziel ist nicht die Beschämung, sondern die Gleichstellung.',
    reception:
      'Der Satz „allzumal Sünder“ gehört zu den bekanntesten Wendungen aus Luthers Übersetzung und ist in die Alltagssprache eingegangen. Theologisch trägt er die Lehre von der Erbsünde mit, obwohl er sie nicht ausspricht – Paulus stellt hier eine Beobachtung fest, keine Herkunftslehre.\n\nDie Wendung „kein Unterschied“ ist in der Wirkungsgeschichte oft überhört worden, obwohl sie im Zusammenhang das Entscheidende sagt: Paulus argumentiert im ganzen Kapitel darauf hin, dass Juden und Nichtjuden auf derselben Grundlage stehen. Der Satz ist zuerst eine Aussage über Gleichheit und erst dann eine über Schuld.',
    terms: [
      {
        word: 'griech. hysterountai',
        rendered: 'mangeln',
        note: 'Zurückbleiben, zu kurz kommen – ein Wort aus dem Wettkampf. Nicht ein Verbrechen ist gemeint, sondern ein Zurückbleiben hinter dem, wozu jemand bestimmt ist.',
      },
      {
        word: 'griech. dorean',
        rendered: 'ohne Verdienst',
        note: 'Geschenkweise, umsonst – dasselbe Wort, mit dem in den Evangelien Heilungen ohne Bezahlung beschrieben werden. Es betont nicht den geringen Wert, sondern das Fehlen einer Gegenleistung.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Abschnitt zielt auf die Aufhebung des Unterschieds zwischen Juden und Heiden. Die Sündenaussage ist ein Argument dafür, nicht das Thema selbst.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Der Vers gilt als Grundlage der Lehre vom Menschen, der sich nicht selbst rechtfertigen kann. Ohne Verdienst ist dabei der Schlüsselbegriff.',
      },
      {
        tradition: 'Ostkirchliche Tradition',
        text: 'Die orthodoxe Theologie liest Sünde stärker als Verfehlung des Ziels und Krankheit denn als Schuldstand vor Gericht. Die Rechtsmetaphorik der westlichen Tradition wird zurückhaltender verwendet.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Losgelöst zitiert, wird Vers 23 zur Anklage. Ausleger halten fest, dass der Satz im Text grammatisch gar nicht endet und ohne Vers 24 unvollständig ist.',
      },
    ],
    crossRefs: [
      { book: 'roem', chapter: 3, verse: 21, note: 'Der Anfang des Abschnitts' },
      { book: 'roem', chapter: 3, verse: 28 },
      { book: 'eph', chapter: 2, verse: 8 },
      { book: 'roem', chapter: 5, verse: 8 },
    ],
  },
  {
    book: 'roem',
    chapter: 5,
    from: 8,
    to: 8,
    title: '„Da wir noch Sünder waren“',
    historicalShort:
      'Die Reihenfolge ist der Inhalt: erst die Zuwendung, dann die Änderung.',
    historicalLong:
      'Paulus argumentiert im Zusammenhang mit einem Gegenbeispiel aus dem Alltag: Für einen Gerechten stirbt kaum jemand, für einen Guten vielleicht. Die Zuwendung Gottes durchbricht diese Rechnung, weil sie den Zeitpunkt umkehrt. Das Wort, das Luther mit preisen wiedergibt, meint erweisen oder beweisen – es geht um einen sichtbaren Nachweis. Der Vers gehört zu den wenigen Stellen, an denen Paulus ausdrücklich von der Liebe Gottes redet; sonst spricht er meist von Gnade.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Kapitel 5 leitet vom Nachweis der allgemeinen Sünde zur Beschreibung des neuen Standes über. Der Vers ist ein Scharnier im Aufbau des Briefes.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Betont wird das Zuvorkommende: Die Liebe gilt, bevor sich etwas ändert. Damit ist jede Vorleistung ausgeschlossen.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Wenn der Tod Christi als Beweis der Liebe gilt, stellt sich die Frage nach dem Gottesbild. Ausleger der letzten Jahrzehnte haben unterschieden zwischen einem Gott, der ein Opfer fordert, und einem, der sich selbst hingibt.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Vers wird oft Menschen gelesen, die meinen, sich Zuwendung erst verdienen zu müssen. Er stellt fest, dass die Reihenfolge umgekehrt ist.',
      },
    ],
    crossRefs: [
      { book: 'roem', chapter: 5, verse: 7, note: 'Der Vergleich davor' },
      { book: 'joh', chapter: 3, verse: 16 },
      { book: '1joh', chapter: 4, verse: 10 },
      { book: 'roem', chapter: 8, verse: 32 },
    ],
  },
  {
    book: 'roem',
    chapter: 6,
    from: 23,
    to: 23,
    title: '„Der Tod ist der Sünde Sold“',
    historicalShort:
      'Ein Bild aus dem Soldatenleben – mit einem bewusst schiefen zweiten Teil.',
    historicalLong:
      'Sold meint den Wehrsold, den römische Legionäre erhielten. Das Bild wäre ausgeglichen, wenn im zweiten Teil ein anderer Lohn stünde. Paulus bricht den Vergleich aber ab: Dem Sold steht nicht ein höherer Sold gegenüber, sondern eine Gabe. Damit wird die Logik von Leistung und Bezahlung nicht überboten, sondern verlassen. Der Zusammenhang in Kapitel 6 handelt vom Bild der Sklaverei: Man dient entweder der Sünde oder der Gerechtigkeit, herrenlos ist nach Paulus niemand.',
    reception:
      'Der Vers ist ein Kernstück der Bekehrungspredigt und gehört zu den vier Versen des „Römerbrief-Weges“, der in evangelikalen Gemeinden weltweit zur Einführung in den Glauben verwendet wird. Er steht auf Traktaten, Anstecknadeln und Straßenschildern.\n\nIn der Auslegung wird häufig übersehen, dass der Gegensatz nicht symmetrisch ist. Paulus schreibt nicht „der Sünde Sold ist der Tod, der Gerechtigkeit Sold ist das Leben“ – die zweite Hälfte wechselt das Wort. Genau darin liegt die Aussage: Auf der einen Seite steht ein Anspruch, auf der anderen keiner.',
    terms: [
      {
        word: 'griech. opsonia',
        rendered: 'Sold',
        note: 'Der Sold eines Soldaten, ausgezahlt in Raten – Geld, auf das man einen Anspruch hat. Das Bild ist genau gewählt: Der Tod ist verdient, das Leben nicht.',
      },
      {
        word: 'griech. charisma',
        rendered: 'Gabe',
        note: 'Geschenk, Gnadengabe – ausdrücklich das Gegenwort zum Sold. Paulus stellt zwei Wörter aus der Wirtschaftssprache gegeneinander: Lohn und Geschenk.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Bruch im Bild ist gewollt und trägt das Argument. Paulus arbeitet häufig mit Vergleichen, die er im entscheidenden Punkt aufkündigt.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Die Gegenüberstellung von Sold und Gabe ist ein Kernbeleg der Gnadenlehre: Was verdient wird, ist der Tod; was gegeben wird, ist unverdient.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Der Vers wird gern zur Drohung verkürzt, indem nur die erste Hälfte zitiert wird. Damit verkehrt sich seine Aussage.',
      },
      {
        tradition: 'Ethische Auslegung',
        text: 'Das Bild der Sklaverei ist heute schwer erträglich. Ausleger weisen darauf hin, dass Paulus es in Vers 19 selbst als Notbehelf bezeichnet, weil er menschlich reden müsse.',
      },
    ],
    crossRefs: [
      { book: 'roem', chapter: 6, verse: 19, note: 'Paulus nennt sein Bild einen Notbehelf' },
      { book: 'roem', chapter: 5, verse: 12 },
      { book: 'joh', chapter: 10, verse: 11 },
      { book: '1mo', chapter: 2, verse: 17 },
    ],
  },
  {
    book: 'roem',
    chapter: 8,
    from: 1,
    to: 2,
    title: '„Nichts Verdammliches“',
    historicalShort:
      'Der Umschlag nach dem dunkelsten Kapitel des Briefes.',
    historicalLong:
      'Kapitel 7 endet mit dem berühmten Zwiespalt: Das Gute, das ich will, tue ich nicht. Kapitel 8 setzt mit dem Freispruch neu an und wird zum hellsten Teil des Römerbriefs. Der Zusatz die nicht nach dem Fleisch wandeln fehlt in den ältesten Handschriften und wurde wahrscheinlich aus Vers 4 nachgetragen; ohne ihn ist der Freispruch unbedingt formuliert. Fleisch meint bei Paulus keine Leiblichkeit und schon gar nicht Sexualität, sondern den auf sich selbst gestellten Menschen.',
    reception:
      'Kapitel 8 gilt vielen als Höhepunkt des Römerbriefs, und sein erster Satz gehört zu den meistgesprochenen Zusagen in der Seelsorge bei Schuldgefühlen und Skrupeln. Luther nannte den Abschnitt in seiner Vorrede das Herzstück des Briefes.\n\nDie Verse über Fleisch und Geist haben eine problematische Nebenwirkung: Über Jahrhunderte wurden sie als Abwertung des Körpers und der Sexualität gelesen, verstärkt durch die Verbindung mit griechischer Philosophie. Die neuere Auslegung betont, dass *sarx* bei Paulus eine Haltung bezeichnet und nicht ein Körperteil – und dass derselbe Brief die Erlösung des Leibes erwartet, nicht die Erlösung vom Leib.',
    terms: [
      {
        word: 'griech. katakrima',
        rendered: 'Verdammliches',
        note: 'Ein juristischer Fachausdruck: das Strafurteil, das nach dem Schuldspruch ergeht. Der Satz sagt nicht, dass keine Schuld da wäre, sondern dass kein Urteil vollstreckt wird.',
      },
      {
        word: 'griech. sarx',
        rendered: 'Fleisch',
        note: 'Bei Paulus nicht der Körper und nicht die Sinnlichkeit, sondern der Mensch, sofern er auf sich selbst gestellt ist. Die Gegenüberstellung von Fleisch und Geist ist keine Abwertung des Leibes – im selben Kapitel wartet die ganze Schöpfung auf Erlösung.',
      },
    ],
    interpretations: [
      {
        tradition: 'Textkritik',
        text: 'Der einschränkende Nachsatz in Vers 1 steht nicht in den ältesten Zeugen. Moderne Ausgaben lassen ihn weg – ein Unterschied, der theologisch erheblich ist.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Der Freispruch gilt vollständig und gegenwärtig, nicht als Aussicht. Luther hat Kapitel 8 als Trostkapitel besonders hoch geschätzt.',
      },
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Ob das Ich in Kapitel 7 Paulus selbst, Adam, Israel unter der Tora oder eine rhetorische Figur meint, ist seit Jahrzehnten umstritten. Von der Antwort hängt ab, wovon Kapitel 8 befreit.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Für Menschen mit ausgeprägten Schuldgefühlen ist die Frage entscheidend, ob der Freispruch Bedingungen hat. Die ältere Textform sagt: keine.',
      },
    ],
    crossRefs: [
      { book: 'roem', chapter: 7, verse: 19, note: 'Der Zwiespalt davor' },
      { book: 'roem', chapter: 8, verse: 38 },
      { book: 'gal', chapter: 5, verse: 1 },
      { book: 'joh', chapter: 3, verse: 18 },
    ],
  },
  {
    book: 'roem',
    chapter: 10,
    from: 9,
    to: 10,
    title: 'Bekennen mit dem Munde, glauben im Herzen',
    historicalShort:
      'Vermutlich eine ältere Taufformel, die Paulus zitiert.',
    historicalLong:
      'Der Doppelsatz wirkt formelhaft und wird meist als Zitat einer bereits geprägten Bekenntnisformel verstanden – möglicherweise aus der Taufe. Der Satz Jesus ist der Herr war politisch nicht harmlos: Kyrios war auch ein Titel des römischen Kaisers. Herz meint im hebräischen Denken nicht das Gefühl, sondern den Ort der Entscheidung. Der Zusammenhang in den Kapiteln 9 bis 11 handelt vom Verhältnis zu Israel und mündet in die Aussage, dass Gott seine Zusagen nicht zurücknimmt.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Formelhafte Kürze und Aufbau sprechen für eine vorpaulinische Tradition. Solche Formeln gehören zu den ältesten fassbaren Texten des Christentums.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Der Vers wird als knappste Bedingung des Heils gelesen: Bekenntnis und Glaube, keine weiteren Bedingungen.',
      },
      {
        tradition: 'Politische Theologie',
        text: 'Das Bekenntnis zum Herrn Jesus stand in Spannung zum Kaiserkult. Diese Dimension wird in der neueren Auslegung stark betont.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Als Formel eines Bekehrungsgebets verwendet, kann der Vers den Eindruck erwecken, ein gesprochener Satz entscheide über das Heil. Der Zusammenhang redet von Zugehörigkeit, nicht von einer Rechtsformel.',
      },
    ],
    crossRefs: [
      { book: 'roem', chapter: 11, verse: 29, note: 'Gott nimmt seine Zusagen nicht zurück' },
      { book: 'phil', chapter: 2, verse: 11 },
      { book: '1kor', chapter: 12, verse: 3 },
      { book: 'apg', chapter: 16, verse: 31 },
    ],
  },
  {
    book: 'roem',
    chapter: 12,
    from: 1,
    to: 1,
    title: '„Euer vernünftiger Gottesdienst“',
    historicalShort:
      'Der Übergang vom Lehrteil zur Ethik – mit einem bewusst verschobenen Opferbegriff.',
    historicalLong:
      'Nach elf Kapiteln Darlegung beginnt hier der ermahnende Teil. Paulus nimmt die Sprache des Tempelopfers auf und verschiebt sie: Das Opfer ist lebendig, nicht geschlachtet, und es besteht aus den Leibern der Angeredeten, also aus ihrem konkreten, alltäglichen Leben. Das Wort, das Luther mit vernünftig übersetzt, heißt im Griechischen logikos und wird heute meist mit wortgemäß oder sachgemäß wiedergegeben; die Deutung ist umstritten. Gottesdienst meint hier nicht die Versammlung, sondern den Dienst insgesamt.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Übertragung der Opfersprache auf das Alltagsleben findet sich auch in zeitgenössischer jüdischer und stoischer Literatur. Paulus greift ein verbreitetes Motiv auf.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Der Vers steht hinter dem Gedanken vom Gottesdienst im Alltag der Welt: Berufsarbeit und Nächstendienst sind Gottesdienst, nicht nur die Feier.',
      },
      {
        tradition: 'Katholische Tradition',
        text: 'Das Zweite Vatikanische Konzil begründet mit diesem Vers das gemeinsame Priestertum aller Getauften.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die Aufforderung, den eigenen Leib hinzugeben, hat in der Auslegungsgeschichte auch Selbstverleugnung bis zur Selbstschädigung befördert. Der Text nennt das Opfer ausdrücklich lebendig.',
      },
    ],
    crossRefs: [
      { book: 'roem', chapter: 12, verse: 2, note: 'Die Fortsetzung' },
      { book: '1petr', chapter: 2, verse: 5 },
      { book: 'hebr', chapter: 13, verse: 15 },
      { book: 'ps', chapter: 51, verse: 17 },
    ],
  },
  {
    book: 'roem',
    chapter: 12,
    from: 2,
    to: 2,
    title: '„Stellet euch nicht dieser Welt gleich“',
    historicalShort:
      'Ein Vers über Nonkonformität – und über die Erneuerung des Denkens.',
    historicalLong:
      'Die beiden griechischen Verben sind bewusst gegeneinander gesetzt: sich einer Form anpassen und umgestaltet werden. Das zweite steht im Passiv – die Veränderung wird nicht selbst gemacht. Sinn meint hier den Verstand, das Urteilsvermögen. Das Ziel ist ausdrücklich das Prüfen: Der Text verlangt kein Befolgen von Regeln, sondern die Fähigkeit, im Einzelfall zu unterscheiden, was gut ist. Diese Verbindung von Nonkonformität und Urteilskraft ist im Neuen Testament ungewöhnlich deutlich.',
    reception:
      'Der Vers gehört zu den meistverwendeten Konfirmations- und Ordinationssprüchen und ist in Bekenntnistexten des Widerstands regelmäßig zitiert worden – von der Bekennenden Kirche bis zu Bürgerrechtsbewegungen. Seine Spitze liegt darin, dass er nicht Gehorsam gegen eine Ordnung fordert, sondern Unterscheidungsvermögen.\n\nDie Wendung „dieser Welt“ ist in der Frömmigkeitsgeschichte oft als Aufforderung zum Rückzug gelesen worden – in Kleidung, Musik, Umgang. Der Zusammenhang zielt woandershin: Was folgt, sind Kapitel über Gaben in der Gemeinde, über Feinde, über Obrigkeit und über den Umgang mit Andersdenkenden. Es geht um Urteilsfähigkeit mitten in der Welt, nicht um Abstand von ihr.',
    terms: [
      {
        word: 'griech. syschematizesthe',
        rendered: 'stellet euch nicht dieser Welt gleich',
        note: 'Von *schema*, der äußeren Erscheinungsform: sich einpassen, dieselbe Gestalt annehmen. Das Gegenwort im selben Satz meint eine Verwandlung von innen – dasselbe Verb, das bei der Verklärung Jesu steht.',
      },
      {
        word: 'griech. dokimazein',
        rendered: 'prüfen',
        note: 'Prüfen im Sinn von: erproben, auf Echtheit untersuchen – ein Wort aus der Münzprüfung. Der Vers verlangt kein Befolgen, sondern ein Urteilsvermögen.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Ethik des Paulus arbeitet mit Urteilsbildung statt mit Kasuistik. Konkrete Weisungen folgen erst danach und werden nicht als Gesetz eingeführt.',
      },
      {
        tradition: 'Täuferische Tradition',
        text: 'Friedenskirchen lesen den Vers als Grundlage der Absonderung von den Ordnungen der Gesellschaft, besonders vom Kriegsdienst.',
      },
      {
        tradition: 'Widerstandsgeschichtliche Rezeption',
        text: 'Im Kirchenkampf des 20. Jahrhunderts wurde der Vers häufig gegen die Gleichschaltung zitiert; das deutsche Wort gleichstellen klang damals unüberhörbar.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Nonkonformität kann zur Pose werden. Ausleger betonen deshalb den zweiten Teil: Maßstab ist nicht die Abweichung, sondern das geprüfte Gute.',
      },
    ],
    crossRefs: [
      { book: 'roem', chapter: 12, verse: 1, note: 'Der Anfang der Ermahnung' },
      { book: 'eph', chapter: 4, verse: 23 },
      { book: 'phil', chapter: 1, verse: 10 },
      { book: '1joh', chapter: 2, verse: 15 },
    ],
  },
  {
    book: '1kor',
    chapter: 1,
    from: 18,
    to: 18,
    title: '„Das Wort vom Kreuz ist eine Torheit“',
    historicalShort:
      'Paulus nennt seine eigene Verkündigung ausdrücklich unvernünftig – und hält daran fest.',
    historicalLong:
      'Die Kreuzigung war die Hinrichtungsart für Sklaven und Aufständische und galt als äußerste Schande; Cicero schreibt, allein das Wort solle vom Leib eines römischen Bürgers ferngehalten werden. Einen Gekreuzigten zu verkünden war deshalb keine Zumutung an den Glauben, sondern an den guten Geschmack. Paulus nimmt diesen Einwand nicht zurück, sondern macht ihn zum Argument. Der Zusammenhang ist der Streit in Korinth um Weisheit, Rednergabe und Parteibildung.',
    reception:
      'Wie ungeheuerlich die Aussage war, zeigt ein Fund vom Palatin in Rom: ein eingeritztes Spottbild aus dem 2. oder 3. Jahrhundert, das einen Gekreuzigten mit Eselskopf zeigt, daneben die Inschrift „Alexamenos betet seinen Gott an“. Es ist die früheste erhaltene Darstellung einer Kreuzigung überhaupt – eine Karikatur.\n\nAus dem Vers ist in der Theologie des 20. Jahrhunderts die Kreuzestheologie geworden, die Luthers Unterscheidung von *theologia crucis* und *theologia gloriae* aufnimmt: Gott ist dort zu suchen, wo man ihn nicht vermutet. Jürgen Moltmanns *Der gekreuzigte Gott* von 1972 hat diese Linie nach Auschwitz neu formuliert.',
    terms: [
      {
        word: 'griech. moria',
        rendered: 'Torheit',
        note: 'Dummheit, Unsinn – daher das Fremdwort Moron. Kein Missverständnis ist gemeint, sondern ein Urteil: Für gebildete Zeitgenossen war ein gekreuzigter Gott lächerlich, und der Text bestreitet das nicht.',
      },
      {
        word: 'griech. logos tou staurou',
        rendered: 'Wort vom Kreuz',
        note: 'Wörtlich „die Rede vom Kreuz“. Nicht das Kreuz selbst ist gemeint, sondern das Sprechen darüber – die Botschaft, die für die einen unsinnig und für die anderen wirksam ist.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Abschnitt richtet sich gegen eine Gemeinde, die religiöse Rede an rhetorischer Brillanz maß. Paulus setzt dem bewusst das Anstößige entgegen.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Luther hat daraus die Unterscheidung von Kreuzestheologie und Herrlichkeitstheologie entwickelt: Gott ist dort zu suchen, wo man ihn nicht vermutet.',
      },
      {
        tradition: 'Orthodoxe Tradition',
        text: 'Stärker als im Westen wird das Kreuz von Ostern her gelesen: Der Gekreuzigte ist bereits der Sieger, das Kreuz selbst wird als Zeichen des Lebens gefeiert.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die Verherrlichung des Anstößigen kann Selbstgenügsamkeit gegenüber vernünftiger Kritik decken. Ausleger halten fest, dass Paulus gegen eine bestimmte Weisheit redet, nicht gegen das Denken.',
      },
    ],
    crossRefs: [
      { book: '1kor', chapter: 1, verse: 22, note: 'Juden fordern Zeichen, Griechen fragen nach Weisheit' },
      { book: '1kor', chapter: 2, verse: 2 },
      { book: 'gal', chapter: 6, verse: 14 },
      { book: 'jes', chapter: 55, verse: 8 },
    ],
  },
  {
    book: '1kor',
    chapter: 10,
    from: 13,
    to: 13,
    title: '„Aber Gott ist getreu“',
    historicalShort:
      'Eine Zusage, die oft als Zumutung gehört wird – und ein Zusammenhang, der sie eingrenzt.',
    historicalLong:
      'Das griechische Wort meint Versuchung und Prüfung zugleich; im Zusammenhang geht es um die Frage, ob Christen an Opfermahlzeiten in heidnischen Tempeln teilnehmen dürfen. Paulus hat zuvor an die Wüstenzeit Israels erinnert und vor Selbstsicherheit gewarnt. Der Vers ist also zunächst Antwort auf eine konkrete Frage nach religiösem Verhalten, nicht eine allgemeine Aussage über Leid. Das Wort für Ende meint wörtlich den Ausgang, den Fluchtweg.',
    reception:
      'Der Vers wird häufig als Zusage gelesen, Gott lege niemandem mehr auf, als er tragen kann – eine Wendung, die in der Seelsorge an Grenzen stößt, weil Menschen an Belastungen tatsächlich zerbrechen. Der Text sagt etwas Engeres: Er spricht von Versuchung, nicht von Leid, und er verspricht einen Ausweg, nicht ein erträgliches Maß.\n\nDer Zusammenhang ist eine Warnung. Paulus hat gerade an die Wüstengeneration erinnert, die trotz aller Zeichen umkam, und sagt im Vers davor: „Wer sich lässt dünken, er stehe, mag wohl zusehen, dass er nicht falle.“ Der Trost steht unmittelbar hinter einer Mahnung, nicht für sich.',
    terms: [
      {
        word: 'griech. peirasmos',
        rendered: 'Versuchung',
        note: 'Versuchung und Prüfung zugleich; dasselbe Wort steht im Vaterunser. Im Zusammenhang geht es um die Gefahr, in der Gemeinde vom Weg abzukommen – nicht um moralische Anfechtung im engeren Sinn.',
      },
      {
        word: 'griech. ekbasis',
        rendered: 'Ende',
        note: 'Wörtlich der Ausgang, der Weg hinaus – ein Wort aus der Geographie für den Ausgang eines Passes. Der Satz verspricht keinen Erlass der Prüfung, sondern einen Ausweg aus ihr.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Zusammenhang ist die Frage des Götzenopferfleischs. Eine Aussage über Krankheit, Trauer oder Gewalt lässt sich daraus nicht unmittelbar ableiten.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Als allgemeiner Satz gelesen, kann der Vers Menschen, die zusammenbrechen, zusätzlich belasten: Ihnen wird unterstellt, es sei ihnen zuzumuten gewesen. Diese Anwendung wird heute verbreitet zurückgewiesen.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Betont wird das Subjekt des Satzes: Gott ist treu. Die Aussage handelt von Gottes Verlässlichkeit, nicht von menschlicher Belastbarkeit.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die verbreitete Redewendung, Gott lege niemandem mehr auf, als er tragen könne, steht so nicht im Text. Der Vers redet von Versuchung, nicht von Lasten.',
      },
    ],
    crossRefs: [
      { book: '1kor', chapter: 10, verse: 12, note: 'Die Warnung vor Selbstsicherheit' },
      { book: '1kor', chapter: 10, verse: 14 },
      { book: 'mt', chapter: 6, verse: 13 },
      { book: 'jak', chapter: 1, verse: 13 },
    ],
  },
  {
    book: '1kor',
    chapter: 15,
    from: 58,
    to: 58,
    title: '„Daß eure Arbeit nicht vergeblich ist“',
    historicalShort:
      'Der Schluss des großen Auferstehungskapitels – und er redet vom Alltag.',
    historicalLong:
      'Kapitel 15 ist die ausführlichste Darlegung des Neuen Testaments zur Auferstehung. Bemerkenswert ist, wohin sie mündet: nicht in Spekulation über den Zustand nach dem Tod, sondern in eine Aufforderung zur Arbeit. Das Wort, das Luther mit Arbeit übersetzt, meint anstrengende Mühe. Damit wird die Auferstehung zum Grund gegenwärtigen Handelns erklärt. Der Zusammenhang setzt bei den Korinthern eine Gruppe voraus, die die Auferstehung der Toten bestritt.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Vers 3 bis 5 zitiert die älteste bekannte christliche Bekenntnisformel. Das Kapitel argumentiert von ihr aus gegen Bestreiter in der Gemeinde.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Die Hoffnung entlastet das Handeln, statt es zu ersetzen. Gerade weil das Ergebnis nicht selbst gesichert werden muss, kann gearbeitet werden.',
      },
      {
        tradition: 'Befreiungstheologische Lesart',
        text: 'Der Vers wird als Zusage an Menschen gelesen, deren Einsatz sichtbar folgenlos bleibt: Der Maßstab des Erfolgs ist nicht der letzte.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Der Satz lässt sich zur Vertröstung wenden. Ausleger betonen, dass er die Vergeblichkeit nicht leugnet, sondern ihr eine Grenze setzt.',
      },
    ],
    crossRefs: [
      { book: '1kor', chapter: 15, verse: 3, note: 'Die alte Bekenntnisformel' },
      { book: '1kor', chapter: 15, verse: 19 },
      { book: 'gal', chapter: 6, verse: 9 },
      { book: 'offb', chapter: 14, verse: 13 },
    ],
  },
  {
    book: '2kor',
    chapter: 4,
    from: 16,
    to: 18,
    title: '„Von Tag zu Tag erneuert“',
    historicalShort:
      'Geschrieben von einem Mann, der im selben Brief seine Auspeitschungen aufzählt.',
    historicalLong:
      'Der Abschnitt gehört zur ausführlichsten Verteidigungsrede des Paulus. Wenige Kapitel später führt er auf, was ihm widerfahren ist: fünfmal neununddreißig Schläge, dreimal Rutenstreiche, Schiffbruch, Steinigung. Vor diesem Hintergrund ist die Rede vom verderbenden äußerlichen Menschen nicht bildlich gemeint. Die Gegenüberstellung von Sichtbarem und Unsichtbarem klingt platonisch, meint bei Paulus aber keine zwei Welten, sondern zwei Zeiten: das Vergehende und das Kommende.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Brief ist wahrscheinlich aus mehreren Schreiben zusammengesetzt. Die Passage gehört zur Auseinandersetzung mit Gegnern, die sich auf Erfolg und Auftreten beriefen.',
      },
      {
        tradition: 'Mystische Tradition',
        text: 'Der innerliche Mensch wurde zum Leitbegriff der Mystik von Augustin bis Eckhart – dort meist stärker räumlich verstanden, als der Text es nahelegt.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die Abwertung des Sichtbaren hat leibfeindliche Wirkungen gehabt. Paulus selbst redet an anderer Stelle von der Auferstehung des Leibes und nicht von seiner Ablösung.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Vers wird in Krankheit und Alter gelesen. Er verharmlost den Verfall nicht, sondern nennt ihn beim Namen und stellt etwas daneben.',
      },
    ],
    crossRefs: [
      { book: '2kor', chapter: 11, verse: 24, note: 'Die Aufzählung des Erlittenen' },
      { book: '2kor', chapter: 12, verse: 9 },
      { book: 'roem', chapter: 8, verse: 18 },
      { book: 'kol', chapter: 3, verse: 2 },
    ],
  },
  {
    book: '2kor',
    chapter: 5,
    from: 7,
    to: 7,
    title: '„Wir wandeln im Glauben, und nicht im Schauen“',
    historicalShort:
      'Ein Halbsatz, eingeschoben in eine Überlegung über Sterben und Auferstehung.',
    historicalLong:
      'Der Satz steht in Klammern innerhalb eines Gedankens über das irdische Haus dieser Hütte und den Bau von Gott. Paulus verhandelt dort, was zwischen Tod und Auferstehung geschieht – eine Frage, auf die das Neue Testament keine einheitliche Antwort gibt. Schauen meint das unmittelbare Sehen, das nach Vers 8 dem Daheimsein bei dem Herrn vorbehalten bleibt. Der Vers formuliert damit einen Zwischenzustand und keine grundsätzliche Geringschätzung der Erfahrung.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Paulus verbindet hier zwei Vorstellungen, die sonst getrennt laufen: die jüdische Auferstehung der Toten und ein Sein bei Christus unmittelbar nach dem Tod. Der Ausgleich bleibt offen.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Glaube wird als Verlass auf ein Wort verstanden, nicht als Fürwahrhalten trotz besseren Wissens. Der Gegenbegriff ist Schauen, nicht Wissen.',
      },
      {
        tradition: 'Mystische Tradition',
        text: 'Die Rede vom Nicht-Schauen wurde in der Dunkelnacht-Mystik aufgenommen: Gerade das Ausbleiben der Erfahrung gehört zum Weg.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Der Vers wird gelegentlich benutzt, um Rückfragen abzuwehren. Im Zusammenhang redet er von einem Zeitverhältnis, nicht von einem Verzicht auf Nachdenken.',
      },
    ],
    crossRefs: [
      { book: '2kor', chapter: 5, verse: 1, note: 'Das irdische Haus dieser Hütte' },
      { book: '2kor', chapter: 5, verse: 8 },
      { book: 'hebr', chapter: 11, verse: 1 },
      { book: '1kor', chapter: 13, verse: 12 },
    ],
  },
  {
    book: 'gal',
    chapter: 5,
    from: 22,
    to: 23,
    title: 'Die Frucht des Geistes',
    historicalShort:
      'Neun Begriffe – und ein Wort in der Einzahl, das oft überlesen wird.',
    historicalLong:
      'Paulus schreibt Frucht, nicht Früchte: Die neun Begriffe sind nicht eine Auswahlliste, sondern Seiten einer Sache. Unmittelbar davor steht eine deutlich längere Liste der Werke des Fleisches; die Gegenüberstellung von Werken und Frucht ist Teil des Arguments, denn Frucht wird nicht gemacht, sondern wächst. Der Zusammenhang ist der Streit, ob Heidenchristen die Beschneidung annehmen müssen. Der Nachsatz, wider solche sei das Gesetz nicht, ist bewusst zurückhaltend formuliert.',
    reception:
      'Die Neunerreihe gehört zum festen Bestand der Katechese und ist in Kirchenfenstern, Gesangbuchliedern und Konfirmandenarbeit tausendfach abgebildet. Die katholische Tradition zählt nach der lateinischen Fassung zwölf Früchte – die Vulgata hat drei Begriffe mehr –, was den Unterschied zwischen den Konfessionen bis in Katechismen hinein sichtbar macht.\n\nDer Nachsatz wird selten mitzitiert: „Wider solche ist das Gesetz nicht.“ Er ist die eigentliche Pointe im Streit des Briefes – wo diese Frucht wächst, ist die Frage nach dem Gesetz erledigt, ohne dass es abgeschafft werden müsste.',
    terms: [
      {
        word: 'griech. karpos',
        rendered: 'Frucht',
        note: 'Einzahl, obwohl neun Eigenschaften folgen – im Unterschied zu den „Werken des Fleisches“ im Plural einige Verse vorher. Gemeint ist eine Frucht mit neun Seiten, nicht eine Auswahlliste.',
      },
      {
        word: 'griech. makrothymia',
        rendered: 'Geduld',
        note: 'Wörtlich „Langmut“: ein langer Atem gegenüber Menschen, die einen reizen. Das Griechische unterscheidet dieses Ausharren gegenüber Personen von der Geduld gegenüber Umständen.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Tugendkataloge dieser Art sind aus der zeitgenössischen Popularphilosophie bekannt. Paulus übernimmt die Form und stellt sie in seinen Gegensatz von Geist und Fleisch.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Die Einzahl ist entscheidend: Ethik ist Folge, nicht Bedingung. Die Frucht wächst aus der Verbindung und wird nicht als Pflichtenkatalog abgearbeitet.',
      },
      {
        tradition: 'Katholische Tradition',
        text: 'Die Vulgata zählt zwölf Früchte; die längere Liste ist in den Katechismus eingegangen. Die Differenz beruht auf einer erweiterten Textform.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Als Prüfliste verwendet, wird die Frucht zum Maßstab, an dem sich Menschen und andere messen. Der Text bietet dafür keine Handhabe – er beschreibt, er kontrolliert nicht.',
      },
    ],
    crossRefs: [
      { book: 'gal', chapter: 5, verse: 19, note: 'Die Werke des Fleisches davor' },
      { book: 'joh', chapter: 15, verse: 5 },
      { book: 'roem', chapter: 8, verse: 4 },
      { book: '1kor', chapter: 13, verse: 4 },
    ],
  },
  {
    book: 'eph',
    chapter: 3,
    from: 20,
    to: 21,
    title: '„Über alles, das wir bitten oder verstehen“',
    historicalShort:
      'Ein Lobpreis am Ende des Lehrteils – mit einer bemerkenswerten Ortsangabe.',
    historicalLong:
      'Die Doxologie schließt die ersten drei Kapitel ab, bevor die Ermahnungen beginnen. Das griechische Wort für überschwenglich ist eine für Paulus typische Häufung von Steigerungen und lässt sich kaum wörtlich übersetzen. Auffällig ist der zweite Teil: Die Ehre wird nicht nur Gott zugesprochen, sondern ausdrücklich in der Gemeinde – der sichtbaren, konkreten Versammlung. Die Verfasserschaft des Epheserbriefs ist umstritten; Sprache und Gedankenführung unterscheiden sich deutlich von den unbestrittenen Paulusbriefen.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Mehrheit der Forschung hält den Brief für nachpaulinisch, geschrieben um 80 bis 100 von einem Schüler. Der feierliche Stil gehört zu den Argumenten.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Die Doxologie gehört zu den meistgebeteten Segensformeln im Gottesdienst und schließt zahlreiche Ordnungen ab.',
      },
      {
        tradition: 'Katholische Auslegung',
        text: 'Die Nennung der Gemeinde als Ort der Ehre Gottes wird ekklesiologisch stark gewichtet: Die Kirche ist nicht Mittel, sondern Ort.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Der Vers verspricht kein Mehr an Erfüllung. Über alles, was wir bitten, kann auch heißen: anders, als wir bitten.',
      },
    ],
    crossRefs: [
      { book: 'eph', chapter: 1, verse: 3, note: 'Der Lobpreis am Briefanfang' },
      { book: 'eph', chapter: 4, verse: 1 },
      { book: 'roem', chapter: 11, verse: 33 },
      { book: 'phil', chapter: 4, verse: 19 },
    ],
  },
  {
    book: 'phil',
    chapter: 1,
    from: 6,
    to: 6,
    title: '„Der in euch angefangen hat das gute Werk“',
    historicalShort:
      'Zuversicht, formuliert aus dem Gefängnis heraus.',
    historicalLong:
      'Der Philipperbrief ist in Haft geschrieben; wo, ist unklar – Rom, Ephesus und Cäsarea werden erwogen. Die Zuversicht bezieht sich nicht auf den Ausgang des Verfahrens, sondern auf die Gemeinde. Das gute Werk meint im Zusammenhang nicht die Frömmigkeit des Einzelnen, sondern die Teilhabe der Gemeinde am Evangelium, von der Vers 5 spricht. Der Tag Jesu Christi ist der erwartete Tag des Gerichts und der Vollendung; Paulus rechnete mit seiner Nähe.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Brief ist an eine Gemeinde gerichtet, die Paulus finanziell unterstützte. Vers 6 nimmt diese Teilhabe auf, nicht die individuelle Frömmigkeit.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Der Vers gilt als Zusage der Beharrlichkeit: Was Gott anfängt, hängt nicht am Durchhaltevermögen des Menschen.',
      },
      {
        tradition: 'Pietistische Tradition',
        text: 'Im Pietismus wurde der Vers stark auf den Einzelnen und seinen Fortschritt bezogen – eine Verengung gegenüber dem Wortlaut, die die Frömmigkeitsgeschichte lange prägte.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Satz entlastet: Er redet von etwas Unfertigem und macht das Unfertigsein nicht zum Vorwurf.',
      },
    ],
    crossRefs: [
      { book: 'phil', chapter: 1, verse: 5, note: 'Die Gemeinschaft am Evangelium' },
      { book: 'phil', chapter: 2, verse: 13 },
      { book: '1thess', chapter: 5, verse: 24 },
      { book: 'roem', chapter: 8, verse: 30 },
    ],
  },
  {
    book: 'phil',
    chapter: 2,
    from: 3,
    to: 4,
    title: '„Durch Demut achte einer den andern höher denn sich selbst“',
    historicalShort:
      'Die Einleitung zum ältesten Christuslied des Neuen Testaments.',
    historicalLong:
      'Die Ermahnung steht unmittelbar vor dem Christushymnus in Vers 5 bis 11, der die Erniedrigung bis zum Kreuzestod besingt. Sie ist damit nicht als allgemeiner Bescheidenheitsappell gemeint, sondern führt auf ein Beispiel zu. Das Wort für eitle Ehre meint leeren Ruhm, das für Demut hatte in der griechischen Umwelt einen abwertenden Klang: Es bezeichnete die Haltung von Untergebenen. Dass sie hier zur Tugend erklärt wird, war eine Umwertung. Vers 4 schränkt ein: nicht nur auf das Seine, sondern auch auf das des anderen.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Hymnus in Vers 6 bis 11 ist wahrscheinlich vorpaulinisch. Paulus zitiert ihn und rahmt ihn ethisch – die Ermahnung ist der Grund des Zitats.',
      },
      {
        tradition: 'Altkirchliche Auslegung',
        text: 'Die Demut wurde zur ersten der Tugenden erklärt und in den Ordensregeln systematisch entfaltet, bei Benedikt in zwölf Stufen.',
      },
      {
        tradition: 'Feministische Exegese',
        text: 'Kritisch angemerkt wird, dass Demutsforderungen geschichtlich vor allem an Untergeordnete gerichtet wurden. Der Text redet zu allen und ausdrücklich auch zu denen, die sich für bedeutend halten.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Vers 4 sagt nicht, man solle das Eigene aus dem Blick verlieren. Das Wörtchen auch wird in der Auslegungsgeschichte häufig übergangen.',
      },
    ],
    crossRefs: [
      { book: 'phil', chapter: 2, verse: 6, note: 'Der Christushymnus' },
      { book: 'roem', chapter: 12, verse: 10 },
      { book: 'mk', chapter: 10, verse: 43 },
      { book: 'gal', chapter: 6, verse: 2 },
    ],
  },
  {
    book: 'phil',
    chapter: 4,
    from: 13,
    to: 13,
    title: '„Ich vermag alles durch den, der mich mächtig macht“',
    historicalShort:
      'Der Zusammenhang macht aus einem Kraftspruch eine Aussage über Genügsamkeit.',
    historicalLong:
      'Der Vers steht am Ende eines Dankes für eine Geldsendung. Die Verse davor nennen ausdrücklich, worum es geht: Paulus schreibt, er habe gelernt, sich genügen zu lassen, und wisse niedrig zu sein wie hoch, satt zu sein wie zu hungern. Das Alles, das er vermag, ist also dieses Wechseln zwischen Fülle und Mangel, nicht die Bewältigung beliebiger Vorhaben. Das Verb, das Luther mit mächtig machen übersetzt, meint stark machen, befähigen.',
    reception:
      'Kaum ein Vers ist häufiger auf Sportartikeln, Tätowierungen und in Interviews nach gewonnenen Spielen zu finden – vor allem in seiner englischen Fassung. Die Verwendung dreht den Sinn um: Aus einem Satz über das Aushalten von Mangel wird eine Zusage der Leistungsfähigkeit.\n\nDer Zusammenhang ist ein Dankesbrief. Paulus schreibt aus der Haft an eine Gemeinde, die ihm Geld geschickt hat, und versichert ihr, er sei auch ohne zurechtgekommen. Der Satz ist eine Aussage über Genügsamkeit – ein Wort, das er im Vers davor ausdrücklich gebraucht.',
    terms: [
      {
        word: 'griech. ischyo',
        rendered: 'vermag',
        note: 'Stark genug sein, imstande sein. Kein Wort für Macht oder Erfolg, sondern für Belastbarkeit – dasselbe Verb steht für die Kraft, etwas auszuhalten.',
      },
      {
        word: 'griech. panta',
        rendered: 'alles',
        note: 'Der Zusammenhang füllt das Wort: Zwei Verse vorher zählt Paulus auf, was er kann – satt sein und hungern, Überfluss haben und Mangel leiden. „Alles“ meint diese Bandbreite, nicht jede beliebige Aufgabe.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Paulus verwendet einen Begriff der stoischen Ethik, die Selbstgenügsamkeit, und deutet ihn um: Nicht aus sich selbst, sondern aus einer Beziehung.',
      },
      {
        tradition: 'Wirkungsgeschichte',
        text: 'Der Vers ist auf Sportkleidung und in Motivationsliteratur zum Erfolgsspruch geworden. Diese Verwendung dreht seine Aussage um – im Text geht es um Mangel.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Betont wird die Passivform: Nicht das eigene Vermögen wird gesteigert, sondern ein anderer macht stark.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Als Leistungsversprechen gelesen, beschämt der Vers alle, die scheitern. Als Aussage über Genügsamkeit gelesen, trägt er gerade dort.',
      },
    ],
    crossRefs: [
      { book: 'phil', chapter: 4, verse: 11, note: 'Sich genügen lassen' },
      { book: 'phil', chapter: 4, verse: 12 },
      { book: '2kor', chapter: 12, verse: 9 },
      { book: '1tim', chapter: 6, verse: 6 },
    ],
  },
  {
    book: 'kol',
    chapter: 3,
    from: 23,
    to: 24,
    title: '„Alles, was ihr tut, das tut von Herzen“',
    historicalShort:
      'Ein oft zitierter Arbeitsvers – der im Text zu Sklaven gesprochen ist.',
    historicalLong:
      'Der Satz steht mitten in der sogenannten Haustafel, die Frauen, Männern, Kindern, Vätern, Sklaven und Herren jeweils Weisungen gibt. Die Anrede unmittelbar davor lautet: Ihr Knechte, seid gehorsam in allen Dingen euren leiblichen Herren. Wer den Vers als Arbeitsethik zitiert, überträgt ihn aus einem Verhältnis von Zwang in ein Verhältnis von Vertrag. Bemerkenswert ist der Nachsatz in Vers 24 und die Fortsetzung in Kapitel 4,1, die auch den Herren einen Herrn im Himmel vor Augen stellt.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Haustafeln übernehmen die Ordnung des antiken Hauses aus der Popularphilosophie. Sie stellen sie unter einen neuen Bezug, ohne sie aufzuheben.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Aus diesem Zusammenhang erwuchs die Vorstellung vom Beruf als Ort des Gottesdienstes. Sie hat die Arbeitsethik in Europa nachhaltig geprägt.',
      },
      {
        tradition: 'Befreiungstheologische Rückfrage',
        text: 'Der Vers gehört zu den Stellen, mit denen Sklaverei jahrhundertelang gerechtfertigt wurde. Diese Wirkungsgeschichte ist nicht nachträglich abzutrennen und muss mitgenannt werden.',
      },
      {
        tradition: 'Katholische Soziallehre',
        text: 'Kapitel 4,1 verpflichtet die Herren zu Recht und Gleichheit. Diese Gegenseitigkeit wird in der Soziallehre als Ansatzpunkt für Arbeitnehmerrechte gelesen.',
      },
    ],
    crossRefs: [
      { book: 'kol', chapter: 3, verse: 22, note: 'Die Anrede an die Sklaven' },
      { book: 'kol', chapter: 4, verse: 1 },
      { book: 'eph', chapter: 6, verse: 5 },
      { book: 'phlm', chapter: 1, verse: 16 },
    ],
  },
  {
    book: '2tim',
    chapter: 1,
    from: 7,
    to: 7,
    title: '„Nicht gegeben den Geist der Furcht“',
    historicalShort:
      'Ein Vers gegen die Angst – geschrieben an einen offenbar zögernden Mitarbeiter.',
    historicalLong:
      'Der Brief redet Timotheus als jungen, gesundheitlich angeschlagenen und offenbar unsicheren Mitarbeiter an. Vers 8 nennt den Anlass unmittelbar: Er soll sich des Zeugnisses nicht schämen. Das Wort, das Luther mit Zucht übersetzt, heißt im Griechischen Besonnenheit oder gesunder Verstand – gemeint ist Selbstbeherrschung, nicht Disziplinierung durch andere. Die drei Begriffe Kraft, Liebe und Besonnenheit stehen bewusst nebeneinander: Kraft allein wäre zu wenig.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Die Pastoralbriefe gelten der Mehrheit der Forschung als nachpaulinisch, meist auf 100 bis 130 datiert. Sie setzen bereits feste Gemeindeämter voraus.',
      },
      {
        tradition: 'Evangelikale Auslegung',
        text: 'Der Vers wird als Zusage gegen Angst im Zeugnisgeben gelesen und gehört zu den meistzitierten Stellen der Pastoralbriefe.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Der Satz sagt nicht, dass Furcht Sünde sei. Er sagt, woher sie nicht kommt – ein Unterschied, der für Menschen mit Angsterkrankungen erheblich ist.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Als Aufforderung gelesen, kann der Vers Angst zusätzlich beschämen. Sprachlich ist er eine Feststellung, keine Anweisung.',
      },
    ],
    crossRefs: [
      { book: '2tim', chapter: 1, verse: 8, note: 'Der Anlass: sich nicht schämen' },
      { book: 'roem', chapter: 8, verse: 15 },
      { book: '1joh', chapter: 4, verse: 18 },
      { book: 'jos', chapter: 1, verse: 9 },
    ],
  },
  {
    book: 'hebr',
    chapter: 13,
    from: 5,
    to: 6,
    title: '„Ich will dich nicht verlassen noch versäumen“',
    historicalShort:
      'Eine Zusage aus dem Alten Testament – zitiert gegen die Geldgier.',
    historicalLong:
      'Der Hebräerbrief zitiert hier eine Zusage, die im Alten Testament mehrfach vorkommt, unter anderem in 5. Mose 31,6 und Josua 1,5. Bemerkenswert ist der Anlass: Der Satz steht nicht bei Trauer oder Verfolgung, sondern als Begründung für ein genügsames Verhältnis zum Besitz. Wer weiß, dass er nicht verlassen wird, muss nicht anhäufen. Vers 6 ergänzt ein Psalmzitat, das die Furcht vor Menschen ausdrücklich benennt. Der Verfasser des Briefes ist unbekannt; die alte Zuschreibung an Paulus gilt heute als unhaltbar.',
    reception:
      'Die Zusage „ich will dich nicht verlassen“ ist ein Zitat und steht so in 5. Mose 31 und Josua 1 – gesagt an Josua vor dem Einzug ins Land. Der Hebräerbrief legt sie einer Gemeinde in den Mund, die Besitz verloren hat, und der Vers danach zitiert Psalm 118. Zwei Sätze, beide aus dem Alten Testament, tragen den Trost.\n\nIn der Frömmigkeitsgeschichte ist der Vers zum Grundtext des Gottvertrauens in wirtschaftlicher Not geworden – in Kriegs- und Nachkriegszeiten, in der Weltwirtschaftskrise, in der Arbeitslosenseelsorge. Der Zusammenhang macht dabei eine Verbindung, die selten mitgesprochen wird: Der Trost gilt denen, die auf Habgier verzichten.',
    terms: [
      {
        word: 'griech. aphilargyros',
        rendered: 'ohne Geiz',
        note: 'Wörtlich „nicht silberliebend“ – Geldgier, nicht Sparsamkeit. Luthers „Geiz“ meint im 16. Jahrhundert genau das: Habsucht, nicht Knauserei.',
      },
      {
        word: 'griech. arkoumenoi',
        rendered: 'laßt euch genügen',
        note: 'Sich genügen lassen, auskommen mit. Dasselbe Wortfeld wie in Philipper 4 – Genügsamkeit ist im Neuen Testament ein eigener Begriff, kein Nebenprodukt der Armut.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Brief zitiert das Alte Testament durchweg nach der griechischen Übersetzung. Verfasser und Adressaten sind unbekannt, die Abfassung wird meist zwischen 60 und 90 angesetzt.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Die Verbindung von Zusage und Genügsamkeit wird als Beispiel dafür gelesen, wie Vertrauen konkrete wirtschaftliche Folgen hat.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Der Vers gehört zu den häufigsten Trostworten bei Sterbebegleitung und Beerdigung – dort meist ohne den ursprünglichen Anlass.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die Zusage lässt sich nicht überprüfen. Ausleger halten fest, dass der Hebräerbrief sie an eine Gemeinde richtet, die bereits Verluste erlitten hat, und nicht an Unbetroffene.',
      },
    ],
    crossRefs: [
      { book: '5mo', chapter: 31, verse: 6, note: 'Die Vorlage im Alten Testament' },
      { book: 'jos', chapter: 1, verse: 5 },
      { book: 'ps', chapter: 118, verse: 6 },
      { book: 'mt', chapter: 6, verse: 25 },
    ],
  },
  {
    book: '1petr',
    chapter: 5,
    from: 7,
    to: 7,
    title: '„Alle Sorge werfet auf ihn“',
    historicalShort:
      'Ein Vers an eine bedrängte Gemeinde – mit einer ungewöhnlich schlichten Begründung.',
    historicalLong:
      'Der erste Petrusbrief richtet sich an Christen in Kleinasien, die als Fremdlinge angeredet werden und offenbar unter gesellschaftlicher Ausgrenzung litten. Der Vers greift Psalm 55,22 auf. Das Wort für Sorge meint hier die Angst um das Nötige, nicht die Fürsorge. Die Begründung ist auffällig kurz und unbeweisbar: denn er sorgt für euch. Unmittelbar danach folgt die Aufforderung zur Nüchternheit und Wachsamkeit – der Text verbindet Loslassen und Aufmerksamkeit.',
    reception:
      'Der Vers gehört zu den meistgesprochenen Zusagen in der Krankenseelsorge und ist über Psalm 55, den er aufnimmt, mit einer langen Gebetstradition verbunden. Bach nahm den Psalmvers in seine Kantate BWV 71 auf; im Gesangbuch steht er hinter Neumarks Lied „Wer nur den lieben Gott lässt walten“.\n\nDie Verwendung als Beruhigungsformel ist umstritten. Wo der Satz Trauernden oder Erschöpften zugesprochen wird, kann er als Aufforderung ankommen, die eigene Last nicht mehr zu zeigen. Der Brief richtet ihn an Gemeinden unter Druck und stellt ihn zwischen den Aufruf zur Demut und die Warnung vor dem Widersacher – er steht in einer Lage, in der die Sorge begründet ist.',
    terms: [
      {
        word: 'griech. epiripsantes',
        rendered: 'werfet',
        note: 'Aufwerfen, hinaufwerfen – dasselbe Wort steht in der griechischen Bibel, wenn Kleider auf ein Reittier geworfen werden. Es beschreibt eine einmalige, entschiedene Bewegung, kein allmähliches Loslassen.',
      },
      {
        word: 'griech. melei auto',
        rendered: 'er sorgt für euch',
        note: 'Wörtlich „es liegt ihm an euch“. Ein anderes Wort als das für die Sorge im ersten Satzteil: Was die Angeredeten belastet, ist nicht dasselbe wie das, was Gott tut.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Brief setzt eine Situation der Ausgrenzung, nicht der staatlichen Verfolgung voraus. Die Verfasserschaft des Petrus ist umstritten; meist wird der Brief auf 80 bis 100 datiert.',
      },
      {
        tradition: 'Monastische Tradition',
        text: 'Der Vers gehört zum festen Bestand der Komplet, des Nachtgebets – gebetet am Ende des Tages, wenn das Sorgen ohnehin nichts mehr ausrichtet.',
      },
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Das Bild des Werfens setzt eine Bewegung voraus. Der Text redet nicht davon, dass Sorge verschwindet, sondern davon, wohin sie geht.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Als Aufforderung an Menschen mit Angsterkrankungen gerichtet, kann der Vers überfordern. Der Nachsatz über Nüchternheit zeigt, dass der Text Wachheit nicht abschafft.',
      },
    ],
    crossRefs: [
      { book: 'ps', chapter: 55, verse: 22, note: 'Die Vorlage im Psalter' },
      { book: '1petr', chapter: 5, verse: 8 },
      { book: 'mt', chapter: 6, verse: 34 },
      { book: 'phil', chapter: 4, verse: 6 },
    ],
  },
  {
    book: '1joh',
    chapter: 3,
    from: 1,
    to: 1,
    title: '„Daß wir Gottes Kinder sollen heißen“',
    historicalShort:
      'Ein Ausruf, kein Lehrsatz – und ein Vers, der die Fremdheit gleich mitnennt.',
    historicalLong:
      'Der Satz beginnt mit einer Aufforderung zum Hinsehen und ist als Ausruf gebaut. Die Kindschaft wird dabei nicht als Naturzustand beschrieben, sondern als Verleihung: Wir sollen so heißen. Bemerkenswert ist die zweite Hälfte, die im Zitieren meist wegfällt: Aus der Kindschaft folgt nicht Anerkennung, sondern Fremdheit gegenüber der Welt. Die johanneischen Briefe setzen eine Gemeinde voraus, die eine Spaltung hinter sich hat; die scharfen Abgrenzungen erklären sich daraus.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Brief richtet sich gegen eine Gruppe, die die Gemeinde verlassen hat. Die Betonung der Zugehörigkeit hat diesen Konflikt als Hintergrund.',
      },
      {
        tradition: 'Ostkirchliche Tradition',
        text: 'Die Gotteskindschaft wird als Anfang der Vergöttlichung verstanden: Der Mensch wird durch Gnade, was Gott von Natur ist.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Betont wird das Erzeigen der Liebe: Der Stand ist gegeben, nicht erreicht. Vers 2 hält ausdrücklich fest, dass noch nicht erschienen ist, was wir sein werden.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die Gegenüberstellung von Gemeinde und Welt kann in Abschottung führen. Ausleger verweisen darauf, dass derselbe Brief die Liebe zum konkreten Bruder zum einzigen Prüfstein macht.',
      },
    ],
    crossRefs: [
      { book: '1joh', chapter: 3, verse: 2, note: 'Es ist noch nicht erschienen, was wir sein werden' },
      { book: 'joh', chapter: 1, verse: 12 },
      { book: 'roem', chapter: 8, verse: 16 },
      { book: 'gal', chapter: 4, verse: 6 },
    ],
  },
  {
    book: 'jak',
    chapter: 4,
    from: 7,
    to: 8,
    title: '„Widerstehet dem Teufel“',
    historicalShort:
      'Zwei Verse voller Befehlsformen – in einem Brief, den Luther gering geschätzt hat.',
    historicalLong:
      'Der Jakobusbrief besteht überwiegend aus Mahnungen und ist stilistisch der jüdischen Weisheitsliteratur nahe. In diesem Abschnitt stehen zehn Aufforderungen dicht hintereinander. Das Nahen zu Gott ist ein Ausdruck aus der Priestersprache. Luther nannte den Brief eine stroherne Epistel, weil er Christus und die Rechtfertigung kaum erwähne; er hat ihn dennoch übersetzt und im Kanon belassen. Die Spannung zu Paulus liegt vor allem in Kapitel 2, wo Glaube ohne Werke tot genannt wird.',
    interpretations: [
      {
        tradition: 'Historisch-kritische Forschung',
        text: 'Der Brief gilt meist als nachpaulinisch, um 80 bis 100. Die Zuschreibung an den Herrenbruder ist umstritten; das gute Griechisch spricht dagegen.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Luthers Vorbehalt bezog sich auf das Verhältnis von Glaube und Werken. Die lutherische Tradition hat den Brief später wieder stärker gewürdigt.',
      },
      {
        tradition: 'Katholische Tradition',
        text: 'Der Brief wurde im Streit der Reformationszeit gegen die Rechtfertigung allein aus Glauben angeführt. Die Gemeinsame Erklärung von 1999 hat den Gegensatz entschärft.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die Rede vom Widerstehen kann Kämpfe personalisieren, die andere Ursachen haben. Ausleger betonen den zweiten Vers: Die Bewegung geht zuerst auf Gott zu, nicht gegen einen Gegner.',
      },
    ],
    crossRefs: [
      { book: 'jak', chapter: 2, verse: 17, note: 'Glaube ohne Werke ist tot' },
      { book: 'jak', chapter: 4, verse: 10 },
      { book: '1petr', chapter: 5, verse: 9 },
      { book: 'eph', chapter: 6, verse: 11 },
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
