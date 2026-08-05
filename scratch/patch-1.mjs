/**
 * Vertiefung, erste Reihe: die meistgelesenen Abschnitte.
 *
 * Wird von scripts/patch-commentary.mjs eingelesen und danach nicht mehr
 * gebraucht – der Bestand steht anschließend in src/content/commentary.ts.
 */
export const PATCHES = {
  /* ------------------------------------------------ Tora und Geschichte */

  '1mo 1,1': {
    longAdd:
      'Der Aufbau ist streng: Die ersten drei Tage schaffen Räume – Licht und Finsternis, Himmelsgewölbe und Wasser, Land und Meer –, die zweiten drei füllen sie mit Gestirnen, Fischen, Vögeln und Landtieren. Tag eins gehört zu Tag vier, Tag zwei zu Tag fünf, Tag drei zu Tag sechs. Der siebte Tag steht außerhalb dieser Ordnung und hat als einziger kein Werk: Er ist das Ziel, nicht der Rest. Der wiederkehrende Satz „und Gott sah, daß es gut war“ ist dabei kein ästhetisches Urteil, sondern eine Feststellung über die Brauchbarkeit der Welt – sie taugt zum Leben.',
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
    reception:
      'Der Auftrag, sich die Erde untertan zu machen, ist über Jahrhunderte als Freibrief gelesen worden. Der Historiker Lynn White machte 1967 genau diesen Vers für die ökologische Krise mitverantwortlich – eine These, die heftig widersprochen wurde, aber die Debatte bis heute prägt. Die Gegenlesart weist darauf hin, dass das hebräische Wort für „herrschen“ in derselben Bibel den Hirten meint, der für die Herde einsteht, und dass der Mensch im zweiten Schöpfungsbericht den Garten „bebauen und bewahren“ soll.\n\nDie andere Wirkung geht in die entgegengesetzte Richtung: Dass jeder Mensch Gottes Bild ist, wurde in den Abolitionismus, in die Erklärung der Menschenrechte und in die Bürgerrechtsbewegung hinein zitiert. Beide Wirkungen gehen von demselben Kapitel aus.',
    interpretations: [
      {
        tradition: 'Jüdische Auslegung',
        text: 'Raschi liest den ersten Satz nicht als Zeitangabe, sondern als Überschrift: „Als Gott anfing, Himmel und Erde zu schaffen …“ Die Frage, was vorher war, wird damit gar nicht erst gestellt – der Text beginnt bei der Ordnung, nicht beim Ursprung.',
      },
    ],
  },

  '1mo 3,1': {
    longAdd:
      'Bemerkenswert ist, was nicht dasteht. Von einem Apfel ist keine Rede, von einem Teufel auch nicht: Die Schlange gehört zu den Tieren, die Gott gemacht hat, und wird erst in hellenistischer Zeit mit dem Satan gleichgesetzt. Das Wort „Sünde“ kommt im ganzen Kapitel nicht vor, „Fall“ ebenso wenig. Und der Satz der Schlange ist nicht einmal falsch: Die Augen werden tatsächlich aufgetan, die beiden sterben nicht an diesem Tag. Was sie gewinnen, ist Erkenntnis; was sie verlieren, ist die Selbstverständlichkeit.',
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
    reception:
      'Kaum ein Kapitel hat mehr Schaden angerichtet. Aus der Reihenfolge von Verführung und Strafe wurde über Jahrhunderte die Behauptung abgeleitet, die Frau sei die Tür zur Sünde – ein Satz, der von Kirchenvätern bis in Hexenprozesse hinein wirkte. Auch der Satz „er soll dein Herr sein“ wurde als Anordnung gelesen statt als Beschreibung eines beschädigten Zustands.\n\nDaneben steht eine Auslegungslinie, die den Text als Erklärung der Mühsal las: Warum Ackerbau schwer ist, warum Geburten gefährlich sind, warum Menschen sterben. Und in der Kunst wurde aus der namenlosen Frucht der Apfel – vermutlich, weil das lateinische *malum* sowohl „Apfel“ als auch „das Böse“ heißt.',
    interpretations: [
      {
        tradition: 'Religionsgeschichtliche Einordnung',
        text: 'Die Erzählung teilt Motive mit älteren Texten der Umwelt: Im Gilgamesch-Epos verliert der Mensch die Unsterblichkeit an eine Schlange, und die Verwandlung des Wildmanns Enkidu zum Menschen geht ebenfalls über eine Erkenntnis, nach der es kein Zurück gibt. Israel erzählt das Motiv um – nicht Götterlaune, sondern eine Entscheidung des Menschen steht am Anfang.',
      },
    ],
  },

  '1mo 22,1': {
    longAdd:
      'Der Erzähler nimmt dem Leser die Spannung im ersten Satz: Gott „versuchte“ Abraham – der Ausgang ist von Anfang an klar, für alle außer für Abraham. Auffällig ist auch die Sprache der Nähe, die der Text ausgerechnet hier häuft: „deinen einzigen Sohn, den du lieb hast“. Es ist die erste Stelle der Bibel, an der das Wort „lieben“ vorkommt. Und dreimal sagt Abraham dasselbe: „Hier bin ich“ – zu Gott, zu Isaak, zum Engel. Die Erzählung besteht aus lauter Auslassungen: Sara kommt nicht vor, Isaaks Alter bleibt offen, und was Abraham denkt, wird nie gesagt.',
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
    reception:
      'Im Judentum heißt der Abschnitt die Akeda, die „Bindung“, und wurde in den Verfolgungen des Mittelalters zum Text der Märtyrer: In den Klageliedern auf die Pogrome der Kreuzzugszeit gehen Eltern und Kinder gemeinsam in den Tod und rufen dabei Isaak an. Im Christentum wurde die Szene früh als Vorabbild der Kreuzigung gelesen – Isaak trägt das Holz wie Jesus den Balken.\n\nDie Kehrseite ist die Rechtfertigung von Gehorsam gegen jede Einsicht. Immanuel Kant hat dagegen den schärfsten Einwand formuliert: Abraham hätte antworten müssen, dass er sich sicher sei, kein Unrecht zu tun, aber nicht sicher sein könne, dass die Stimme Gott sei. Wer eine Stimme zum Töten hört, so Kant, muss sie deshalb zurückweisen.',
    interpretations: [
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Manche lesen den Text nicht als Vorbild, sondern als Erfahrungsbericht: Es gibt Wege, auf denen ein Mensch verliert, woran sein Leben hängt, und keine Erklärung bekommt. Dass der Text darüber schweigt, was Abraham dabei empfindet, wird dann nicht als Lücke gelesen, sondern als Respekt.',
      },
    ],
  },

  '2mo 3,13': {
    longAdd:
      'Die Antwort ist eine Verweigerung und eine Zusage zugleich. Im Alten Orient gab ein Name Verfügungsgewalt: Wer den Namen einer Gottheit kannte, konnte sie anrufen und in Formeln binden. Gott antwortet mit einem Satz, der grammatisch offen bleibt – er lässt sich als „ich bin, der ich bin“, als „ich werde sein, der ich sein werde“ und als „ich werde da sein, als der ich da sein werde“ übersetzen. Luther entschied sich für die Zukunftsform und schrieb sie in Großbuchstaben. Vers 15 gibt dann doch einen Namen, aber gebunden an eine Geschichte: der Gott Abrahams, Isaaks und Jakobs.',
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
    reception:
      'Die griechische Übersetzung machte aus dem Satz eine Aussage über das Sein selbst: „Ich bin der Seiende.“ Von dort führt eine lange Linie über Augustinus und Thomas von Aquin zur Bestimmung Gottes als das Sein schlechthin – eine Deutung, die viel philosophische Kraft entfaltet hat und der neuere Exegeten entgegenhalten, dass der hebräische Text vom Dasein für jemanden spricht, nicht vom Sein an sich.\n\nMartin Buber und Franz Rosenzweig übersetzten deshalb bewusst gegen die Tradition: „Ich werde dasein, als der ich dasein werde“ – und trafen damit im 20. Jahrhundert einen Ton, der auch in christlichen Gesangbüchern nachhallt.',
    interpretations: [
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der Midrasch versteht die Doppelung als Zusage an Bedrängte: Ich werde bei ihnen sein in dieser Not, und ich werde bei ihnen sein in der nächsten. Der Name ist damit keine Definition, sondern ein Versprechen für die Zukunft.',
      },
    ],
  },

  '2mo 20,1': {
    longAdd:
      'Die Zählung der zehn Gebote ist keine Angabe des Textes, sondern eine Entscheidung der Auslegung – und die Konfessionen entschieden verschieden. Judentum, orthodoxe und reformierte Kirchen zählen das Bilderverbot als eigenes Gebot und fassen die beiden Begehrensverbote am Ende zusammen. Katholische und lutherische Tradition rechnen das Bilderverbot zum ersten Gebot und teilen dafür am Schluss auf. Beide Zählungen kommen auf zehn, aber ein „viertes Gebot“ meint dann Verschiedenes. Wer über die Gebote spricht, spricht deshalb immer schon aus einer Tradition heraus.',
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
    reception:
      'Die Gebote stehen bis heute in Gerichtssälen, Schulen und Verfassungsdebatten – und ihre öffentliche Aufstellung ist in den USA mehrfach vor dem Supreme Court gelandet. Zugleich sind sie im Recht nie einfach übernommen worden: Kein moderner Staat verbietet Bilder oder verlangt die Sabbatruhe.\n\nDas Bilderverbot hat eine eigene, blutige Geschichte: Im byzantinischen Bilderstreit des 8. und 9. Jahrhunderts und noch einmal in der Reformationszeit wurden Kirchen geplündert und Kunstwerke zerstört; in Zürich und Wittenberg wurde erbittert darüber gestritten, ob Luther oder Karlstadt recht behielt. Die Ostkirche entschied den Streit 843 zugunsten der Ikonen – mit dem Argument, dass Gott in Christus selbst ein Bild geworden sei.',
    interpretations: [
      {
        tradition: 'Rechtsgeschichtliche Einordnung',
        text: 'Verglichen mit dem Kodex Hammurapi fällt auf, was fehlt: keine Strafandrohung, keine Fallunterscheidung, kein Verfahren. Die zehn Worte sind kein Gesetzbuch, sondern eine Grundordnung, die erst in den folgenden Kapiteln in einzelne Rechtssätze übersetzt wird.',
      },
    ],
  },

  '5mo 6,4': {
    longAdd:
      'Der Satz ist grammatisch nicht eindeutig, und die Übersetzungen gehen auseinander: „Der HERR, unser Gott, ist ein einiger HERR“ ist eine Aussage über die Einzigkeit; „Der HERR ist unser Gott, der HERR allein“ ist eine Aussage über die Bindung. Der Unterschied ist nicht klein. Im ersten Fall geht es um die Zahl der Götter, im zweiten darum, wem dieses Volk gehört. Die ältere Forschung sah in dem Vers deshalb keinen Monotheismus im späteren Sinn, sondern die Forderung ausschließlicher Treue – nicht: es gibt nur einen Gott, sondern: für uns kommt nur dieser eine in Frage.',
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
    reception:
      'Das Schma ist das Gebet, mit dem gläubige Jüdinnen und Juden den Tag beginnen und beschließen – und mit dem viele in den Tod gegangen sind. Rabbi Akiba soll es unter der Folter der Römer gesprochen haben; in den Ghettos und Lagern des 20. Jahrhunderts wurde es wieder zum letzten Satz.\n\nDie Anweisungen der Verse 8 und 9 sind wörtlich genommen worden und im Judentum bis heute sichtbar: Tefillin an Arm und Stirn, die Mesusa am Türpfosten. Im Christentum blieb der Vers dagegen fast unsichtbar – bis auf die Stelle, an der Jesus ihn zitiert und damit das ganze Gesetz zusammenfasst.',
    interpretations: [
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Luther legte das Gewicht auf das erste Gebot und las das Schma als dessen Auslegung: Woran ein Mensch sein Herz hängt, das ist sein Gott. Die Frage lautet damit nicht, ob jemand einen Gott hat, sondern welchen.',
      },
    ],
  },

  /* --------------------------------------------------- Psalmen und Weisheit */

  'ps 23,1': {
    longAdd:
      'Der Psalm wechselt in der Mitte die Perspektive. Bis Vers 3 wird über Gott geredet – „er weidet mich“, „er führet mich“. Ab Vers 4, im finsteren Tal, wird Gott angeredet: „du bist bei mir“. Genau dort, wo es dunkel wird, wird aus dem Reden über Gott ein Reden mit ihm. Auch das Bild wechselt: Aus dem Hirten wird in Vers 5 der Gastgeber, der einen Tisch deckt – und zwar im Angesicht der Feinde, die also nicht verschwunden sind. Der Psalm verspricht keine feindfreie Welt, sondern einen gedeckten Tisch mitten darin.',
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
    reception:
      'Dieser Psalm ist der Text, der in Deutschland am häufigsten am Grab gesprochen wird – und er ist zugleich der, den auch Menschen ohne Kirchenbindung noch auswendig können. Vertont wurde er hundertfach, von Schütz und Bach bis zu Popsongs; das schottische Gesangbuchlied „The Lord’s my Shepherd“ und Bourgeois’ „Der Herr ist mein getreuer Hirt“ gehören zum Kernbestand des evangelischen Singens.\n\nSeine Bildsprache stammt aus dem Alten Orient, wo „Hirte“ ein Königstitel war – in Ägypten wie in Mesopotamien. Dass dieser Titel hier nicht dem König Israels, sondern Gott gilt, ist eine leise politische Aussage.',
    interpretations: [
      {
        tradition: 'Kritische Rückfrage',
        text: 'Wer den Psalm am Sterbebett hört, hört ihn anders als jemand, dem gerade Unrecht geschieht. Ausleger warnen deshalb davor, ihn zum Beruhigungsmittel zu machen: Er wurde von Menschen gebetet, die sehr genau wussten, dass Stecken und Stab auch schlagen können.',
      },
    ],
  },

  'ps 22,1': {
    longAdd:
      'Der Psalm ist zweigeteilt, und die zweite Hälfte wird selten mitzitiert. Bis Vers 21 ist er eine Klage, die nichts auslässt: Verlassenheit, Spott, ausgerenkte Glieder, verteilte Kleider. Ab Vers 22 kippt der Ton unvermittelt in Dank und Lobgesang, und der Schluss weitet sich auf „alle Welt“ und die kommenden Geschlechter. Ob dieser Umschwung nachträglich angefügt wurde oder ob der Beter zwischendurch eine Zusage empfangen hat – im Tempel womöglich durch einen Priester –, ist nicht zu entscheiden. Klar ist nur: Der Text bleibt nicht bei der Klage stehen, aber er kommt auch nicht ohne sie aus.',
    terms: [
      {
        word: 'hebr. eli eli lama asawtani',
        rendered: 'Mein Gott, mein Gott, warum hast du mich verlassen',
        note: 'Diesen Anfang zitiert Jesus am Kreuz – bei Markus allerdings in aramäischer Form. Wer einen Psalm mit seinem ersten Vers anführt, ruft im Judentum das ganze Lied auf; deshalb ist strittig, ob der Ruf nur Verzweiflung ausdrückt oder auch schon den Schluss meint.',
      },
    ],
    reception:
      'Die Passionsberichte sind mit diesem Psalm durchsetzt: das Verteilen der Kleider, das Kopfschütteln der Umstehenden, der Spottsatz „Er hat auf Gott vertraut, der helfe ihm nun“. Die Evangelisten erzählen die Kreuzigung in seinen Worten – ob als Erinnerung an tatsächlich Gesagtes oder als Deutung des Geschehens, ist umstritten.\n\nVers 17 hat eine eigene, belastete Geschichte: Der hebräische Text ist an dieser Stelle unklar, die griechische Übersetzung las „sie haben meine Hände und Füße durchgraben“. Über Jahrhunderte wurde daraus im christlich-jüdischen Streitgespräch der Vorwurf, die Juden hätten ihren eigenen Text gefälscht – ein Vorwurf, den die Textforschung nicht bestätigt.',
    interpretations: [
      {
        tradition: 'Liturgische Rezeption',
        text: 'In der Karfreitagsliturgie vieler Kirchen wird der Psalm ganz gelesen oder gesungen, oft ohne Antwort und ohne Segen. Dass die Klage im Gottesdienst stehen bleiben darf, ohne sofort aufgelöst zu werden, gilt als eine ihrer wichtigsten Funktionen.',
      },
    ],
  },

  'ps 51,1': {
    longAdd:
      'Die Bitten in der Mitte des Psalms verwenden dieselben Verben wie der Schöpfungsbericht: „Schaffe in mir, Gott, ein reines Herz“ steht dort mit dem Wort, das sonst nur Gott als Subjekt hat. Der Beter bittet also nicht um Besserung, sondern um eine Neuschöpfung – er traut sich selbst die Wende nicht zu. Auffällig ist auch der Schluss: Nach der Ablehnung des Opfers in Vers 18 folgen in den letzten beiden Versen doch wieder Brandopfer auf dem Altar. Die meisten Ausleger sehen darin einen nachexilischen Zusatz, der die scharfe Kultkritik entschärfen sollte.',
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
    reception:
      'Psalm 51 ist der bekannteste der sieben Bußpsalmen und stand im Zentrum der mittelalterlichen Bußpraxis. Sein lateinischer Anfang *Miserere mei, Deus* wurde zum Namen einer ganzen Gattung; Allegris Vertonung in der Sixtinischen Kapelle durfte lange nicht abgeschrieben werden. Luther legte den Psalm 1532 in einer eigenen Vorlesung aus und fand darin seine Lehre vom Menschen wieder.\n\nDie Überschrift verbindet den Psalm mit Davids Vergehen an Batseba. Historisch ist diese Zuordnung wahrscheinlich später hinzugefügt; als Deutung hat sie den Text jedoch geprägt – er wurde zum Gebet der Mächtigen, die sich schuldig gemacht haben.',
    interpretations: [
      {
        tradition: 'Kritische Rückfrage',
        text: 'Der Satz „an dir allein habe ich gesündigt“ ist Auslegern immer wieder aufgestoßen: Wenn der Psalm von Davids Tat an Batseba und an Uria handelt, sind es gerade nicht nur Gott, an dem gesündigt wurde. Wer den Vers zitiert, um Verantwortung gegenüber Menschen zu übergehen, wendet ihn gegen seine eigene Überschrift.',
      },
    ],
  },

  'ps 139,1': {
    longAdd:
      'Der Psalm ist eine Verteidigungsrede vor Gericht. Das wird erst am Schluss deutlich, wo der Beter darum bittet, geprüft zu werden – und im ausgelassenen Teil, den Versen 19 bis 22, wo er sich scharf von den „Blutgierigen“ abgrenzt. Die berühmten Verse über das Durchschautsein sind also nicht als Meditation gedichtet, sondern als Argument: Wenn Gott alles weiß, dann weiß er auch, dass ich unschuldig bin. Wer nur die schönen Verse liest, liest den Psalm ohne seine Lage.',
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
    reception:
      'Die Verse 13 bis 16 gehören zu den meistzitierten Stellen in der Debatte um Schwangerschaftsabbruch, in Deutschland wie in den USA. Ausleger weisen darauf hin, dass der Psalm keine Aussage über den Status des Embryos treffen will, sondern über Gottes Zuwendung zu diesem einen Beter; wer ihn zum Argument macht, macht aus einem Gebet einen Rechtssatz. Dass er in dieser Rolle wirkt, lässt sich davon unabhängig nicht bestreiten.\n\nEine andere Wirkung ist stiller: In der Seelsorge bei Menschen mit Behinderung und in der Trauerbegleitung nach Fehlgeburten ist gerade Vers 16 – „alle Tage waren auf dein Buch geschrieben“ – zu einem der meistgesprochenen Sätze geworden.',
    interpretations: [],
  },

  'spr 3,5': {
    longAdd:
      'Die beiden Verse stehen mitten in einer Lehrrede, die ein Vater an seinen Sohn richtet – der Rahmen ist Ausbildung, nicht Mystik. Und die Weisheitsliteratur ist gerade das Gegenteil von Verstandesverzicht: Sie sammelt Erfahrung, wägt ab, beobachtet die Ameise und die Wetterlage. Der Satz warnt deshalb nicht vor dem Denken, sondern vor einer bestimmten Haltung des Denkens: sich auf die eigene Einsicht zu *stützen*, sie zum tragenden Grund zu machen. Wer das im Blick behält, liest den Vers nicht als Aufforderung, den Kopf abzugeben.',
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
    reception:
      'Der Vers gehört zu den meistverschenkten Konfirmations- und Taufsprüchen im deutschen Sprachraum und steht auf unzähligen Postkarten. In der Ratgeberliteratur wird er gern als Gegensatz zu Planung und Fachwissen gelesen – ein Gebrauch, der in evangelikalen Kreisen bis zur Ablehnung ärztlicher Behandlung führen kann. Ausleger halten dagegen, dass in demselben Buch der Rat der Vielen empfohlen und Faulheit gerügt wird.',
    interpretations: [
      {
        tradition: 'Jüdische Auslegung',
        text: 'Die rabbinische Tradition liest den Vers zusammen mit dem Studium: Vertrauen und Lernen sind keine Gegensätze. Wer Tora lernt, verlässt sich gerade nicht auf seinen eigenen Einfall, sondern stellt ihn in ein Gespräch, das seit Generationen läuft.',
      },
    ],
  },

  /* -------------------------------------------------------------- Propheten */

  'jes 53,1': {
    longAdd:
      'Der Text ist kunstvoll gebaut: Fünf Strophen zu je drei Versen, mit dem Zentrum in Vers 5. Und er hat einen auffälligen Perspektivwechsel – gerahmt von Gottesreden am Anfang und Ende spricht in der Mitte ein „Wir“, das seine eigene Fehleinschätzung eingesteht: „Wir aber hielten ihn für den, der von Gott geschlagen wäre.“ Erzählt wird also nicht nur ein Leiden, sondern eine Umkehr im Urteil über dieses Leiden. Wer der Knecht ist, sagt der Text nie; die Kandidaten reichen vom Propheten selbst über einen namenlosen Gerechten bis zum Volk Israel im Exil.',
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
    reception:
      'Kein Kapitel des Alten Testaments ist im christlich-jüdischen Verhältnis so belastet. Seit der Alten Kirche wurde es als Beweis gelesen, dass Jesus der Messias sei, und in den mittelalterlichen Zwangsdisputationen mussten jüdische Gelehrte sich dazu verhören lassen – in Paris 1240, in Barcelona 1263, in Tortosa 1413. Wer die christliche Deutung nicht teilte, galt als verstockt.\n\nHeute betonen kirchliche Erklärungen, dass die christliche Lesart eine nachträgliche Aneignung ist und die jüdische Auslegung – die den Knecht auf Israel bezieht – dem Text mindestens ebenso nahesteht. In der Musik ist das Kapitel durch Händels *Messiah* präsent geblieben: „He was despised“ und „Surely he hath borne our griefs“ stammen aus diesen Versen.',
    interpretations: [
      {
        tradition: 'Ostkirchliche Auslegung',
        text: 'Die orthodoxe Theologie liest das Lied weniger als Rechtsvorgang – Strafe wird übernommen – denn als Mitleiden: Gott geht in das menschliche Elend hinein und heilt es von innen. Der Vers „durch seine Wunden sind wir geheilt“ steht dann für Heilung, nicht für Bezahlung.',
      },
    ],
  },

  'jer 29,11': {
    longAdd:
      'Der Vers steht in einem Brief, und der Brief hat eine Adresse: die nach Babel Verschleppten, die auf schnelle Rückkehr hofften. Jeremia schreibt ihnen das Gegenteil. Baut Häuser, pflanzt Gärten, heiratet, sucht das Beste der Stadt, in die ihr verschleppt seid – und rechnet mit siebzig Jahren. Die Zusage in Vers 11 gilt also nicht anstelle des Exils, sondern mitten darin, und sie gilt einer Generation, die das Ende nicht mehr erleben wird. Die Verse davor sind die Bedingung, unter der der berühmte Satz überhaupt steht.',
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
    reception:
      'Der Vers ist heute wohl der meistverschenkte Bibelvers auf Karten, Tassen und Abschlussfeiern, im englischen Sprachraum noch stärker als im deutschen. In der Wohlstandsverkündigung wird er zur Zusage persönlichen Erfolgs, was den Brief auf den Kopf stellt: Gesagt ist er Menschen, deren Stadt zerstört und deren Land verloren war.\n\nDaneben hat er eine ganz andere Wirkung entfaltet: Die Aufforderung, das Wohl der fremden Stadt zu suchen, gilt als eine der frühesten Grundlagen für ein Leben in der Diaspora – und wird in Debatten über Migration und Integration bis heute zitiert.',
    interpretations: [
      {
        tradition: 'Jüdische Auslegung',
        text: 'Im Judentum ist der Brief zum Grundtext des Lebens in der Fremde geworden: Man betet für das Wohl des Landes, in dem man wohnt, auch wenn man nicht dorthin gehört. Der Talmud leitet daraus die Pflicht ab, für die Regierung zu beten – nicht aus Zustimmung, sondern weil das eigene Leben an ihrer Ordnung hängt.',
      },
    ],
  },

  'mi 6,8': {
    longAdd:
      'Der Vers ist die Antwort auf eine Frage, die zwei Verse vorher gestellt wird und die immer größer wird: Soll ich mit Brandopfern kommen? Mit tausend Widdern? Mit zehntausend Strömen Öl? Mit meinem erstgeborenen Sohn? Die Steigerung ist bitter gemeint – sie zeigt einen Menschen, der immer mehr geben will und immer weniger versteht. Die Antwort nimmt der Steigerung den Boden: Es ist längst gesagt, und es ist nicht kompliziert. Drei Worte, von denen keines im Tempel stattfindet.',
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
    reception:
      'Der Vers gilt vielen als Kurzfassung prophetischer Ethik und steht in den Grundlagentexten kirchlicher Entwicklungsarbeit ebenso wie in Reden der amerikanischen Bürgerrechtsbewegung. Im Judentum zählt er zu den Sätzen, in denen die 613 Gebote der Tora zusammengefasst werden – der Talmud nennt Micha als den, der sie auf drei brachte.',
    interpretations: [],
  },

  /* ------------------------------------------------------------ Evangelien */

  'mt 5,3': {
    longAdd:
      'Der Aufbau ist gerechnet: Acht Seligpreisungen in der dritten Person, eingerahmt von derselben Begründung – „denn ihr ist das Himmelreich“ am Anfang und am Ende. Die neunte, längere spricht die Hörer dann direkt an. Die ersten vier gelten Menschen in Not, die zweiten vier Menschen, die etwas tun; in der Mitte steht der Hunger nach Gerechtigkeit, der beides verbindet. Der Vergleich mit der Feldrede bei Lukas ist aufschlussreich: Dort heißt es schlicht „Selig seid ihr Armen“ – Matthäus fügt „geistlich“ hinzu und verschiebt damit den Ton von der Lage zur Haltung.',
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
    reception:
      'Die Bergpredigt ist der Text, an dem sich seit Tertullian entscheidet, wie Christen zu Gewalt, Eid und Besitz stehen. Franz von Assisi, die Täufer, die Quäker, Tolstoi, Gandhi, Martin Luther King, Dietrich Bonhoeffer – die Linie derer, die sie wörtlich nehmen wollten, zieht sich durch die ganze Geschichte und stand meist quer zu den Kirchen ihrer Zeit.\n\nDie Gegenbewegung ist ebenso alt: die Deutung als unerfüllbare Forderung, die den Menschen zur Einsicht in seine Ohnmacht treibt; die Zweiteilung in Gebote für alle und Räte für Mönche; die Beschränkung auf das persönliche Verhalten, die dem Staat sein Schwert lässt. Keine dieser Lesarten ist ohne Folgen geblieben.',
    interpretations: [
      {
        tradition: 'Jüdische Einordnung',
        text: 'Seligpreisungen sind eine bekannte jüdische Gattung; sie finden sich in den Psalmen und in Texten aus Qumran. Neuere Forschung liest die Bergpredigt deshalb nicht als Absetzung vom Judentum, sondern als Beitrag innerhalb einer laufenden Debatte darüber, wie die Tora zu halten sei.',
      },
    ],
  },

  'mt 6,9': {
    longAdd:
      'Das Gebet fällt durch das auf, was es nicht enthält: keinen Dank, kein Lob eigener Frömmigkeit, keine Bitte für sich allein – alles steht im Plural. Und es hat eine Reihenfolge: erst drei Bitten um das, was Gott angeht, dann drei um das, was die Betenden angeht. Die Lukas-Fassung ist deutlich kürzer, was in der Forschung meist so erklärt wird, dass die Gemeinden ein kürzeres Gebet liturgisch ausgebaut haben. Der Schlusssatz „Denn dein ist das Reich“ fehlt in den ältesten Handschriften ganz; er stammt aus dem gottesdienstlichen Gebrauch und ist deshalb in katholischen Messen bis heute vom Vaterunser abgesetzt.',
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
    reception:
      'Das Vaterunser ist der einzige Text, den fast alle Konfessionen gemeinsam sprechen – und die Stelle, an der die Unterschiede trotzdem hörbar werden: am Schlusssatz, an „Schuld“ gegen „Schulden“, an der Bitte um Bewahrung vor Versuchung. Ökumenische Gottesdienste einigen sich meist auf die Fassung von 1971.\n\nDie fünfte Bitte hat eine praktische Wirkungsgeschichte: Sie band das Vergebenwollen an das Vergebenbekommen und wurde in der Bußpraxis der Alten Kirche wie in heutiger Versöhnungsarbeit zur Nagelprobe. Dass sie im Gottesdienst wöchentlich gesprochen wird, hat schon Augustinus als tägliche Reinigung gedeutet.',
    interpretations: [
      {
        tradition: 'Jüdische Einordnung',
        text: 'Fast jede Bitte hat eine Entsprechung im jüdischen Gebet: die Heiligung des Namens und das Kommen des Reiches im Kaddisch, die Bitte um Brot und Vergebung im Achtzehnbittengebet. Das Vaterunser ist danach kein neues Gebet, sondern eine knappe, zugespitzte Zusammenfassung dessen, was Juden damals beteten.',
      },
    ],
  },

  'lk 10,25': {
    longAdd:
      'Die Erzählung dreht die Frage um. Der Gesetzeslehrer fragt: Wer ist mein Nächster? – also: Wo hört meine Pflicht auf? Jesus antwortet mit einer Geschichte und fragt am Ende zurück: Wer ist dem Überfallenen zum Nächsten geworden? Aus einer Abgrenzungsfrage wird eine Handlungsfrage. Auch die Route ist genau gewählt: Die Straße von Jerusalem hinab nach Jericho fällt auf 27 Kilometern um rund tausend Höhenmeter durch unübersichtliches Gelände und war für Überfälle berüchtigt. Und Priester und Levit handeln nicht unbedingt herzlos: Wer einen Toten berührte, wurde kultisch unrein und für den Tempeldienst untauglich. Die Geschichte stellt zwei Pflichten gegeneinander.',
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
    reception:
      'Aus dem Gleichnis ist ein Rechtsbegriff geworden: Die „Samariter-Gesetze“ vieler Länder regeln, wer zur Hilfe verpflichtet ist und wer dabei vor Haftung geschützt wird. Krankenhäuser, Hilfsdienste und die Telefonseelsorge in mehreren Ländern tragen den Namen.\n\nWeniger bekannt ist die Kehrseite: Dass ausgerechnet ein Samariter der Vorbildliche ist, war für die ersten Hörer eine Provokation – Samaritaner galten als Abtrünnige, und die Feindschaft war gegenseitig. In der christlichen Predigt wurde daraus über Jahrhunderte oft das Gegenteil: eine Erzählung über versagende jüdische Amtsträger. Diese Zuspitzung hat antijüdische Klischees gestützt und wird in neueren Auslegungen ausdrücklich zurückgewiesen.',
    interpretations: [
      {
        tradition: 'Ostkirchliche Auslegung',
        text: 'In der orthodoxen Tradition wird die Geschichte oft auf Christus gelesen: Er ist der Fremde, der zu den Verwundeten kommt und sie in die Herberge – die Kirche – bringt. Diese Deutung nimmt der Erzählung nichts von ihrer ethischen Spitze, stellt sie aber in einen zweiten Rahmen.',
      },
    ],
  },

  'lk 15,11': {
    longAdd:
      'Das Gleichnis hat zwei Söhne und keinen Schluss. Der ältere bleibt am Ende draußen, seine Antwort auf die Bitte des Vaters wird nicht erzählt – die Geschichte bricht ab, und die Frage geht an die Zuhörer. Und die sind bekannt: Lukas nennt in Vers 2 Pharisäer und Schriftgelehrte, die daran Anstoß nehmen, dass Jesus mit Zöllnern isst. Das Gleichnis antwortet ihnen, aber ohne sie zu verurteilen: Der Vater geht auch zum älteren Sohn hinaus und sagt ihm den vielleicht wichtigsten Satz des Textes – „du bist allezeit bei mir, und alles, was mein ist, das ist dein“.',
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
    reception:
      'Rembrandts Gemälde in der Eremitage hat die Rezeption geprägt wie kaum ein Bild sonst; Henri Nouwens Buch darüber ist zu einem der meistgelesenen geistlichen Titel des 20. Jahrhunderts geworden. In der Beichtpraxis der katholischen Kirche ist das Gleichnis der zentrale Bezugstext.\n\nAuslegungsgeschichtlich problematisch ist die Rolle des älteren Bruders: Er wurde über Jahrhunderte mit dem Judentum gleichgesetzt, der jüngere mit den Heidenchristen – eine Deutung, die den Text gegen die Absicht seiner Pointe wendet, denn der Vater bekräftigt gegenüber dem Älteren ausdrücklich dessen bleibendes Recht.',
    interpretations: [
      {
        tradition: 'Sozialgeschichtliche Lesart',
        text: 'Das Erbe zu Lebzeiten zu fordern und in der Fremde zu verbrauchen bedeutete für die Familie einen realen Verlust an Land und Ansehen. Dass der Vater dem Zurückkehrenden entgegenläuft, war für einen Hausherrn ein Bruch mit der Würde seines Standes – die Geschichte erzählt nicht nur von Vergebung, sondern von einem, der sich für sie öffentlich blamiert.',
      },
    ],
  },

  'joh 1,1': {
    longAdd:
      'Der Prolog ist wahrscheinlich ein älteres Lied, das der Evangelist übernommen und durch Prosaabschnitte über Johannes den Täufer unterbrochen hat – Vers 6 bis 8 und Vers 15 fallen aus dem Rhythmus. Der Bogen führt von der Ewigkeit über die Schöpfung und die Ablehnung bis zu dem Satz, auf den alles zuläuft: „Das Wort ward Fleisch.“ Für griechisch gebildete Ohren war genau das die Zumutung. Dass es ein göttliches Vernunftprinzip gibt, war Allgemeinbildung; dass dieses Prinzip ein Mensch aus Nazareth mit Schweiß, Durst und Todesangst sein soll, war es nicht.',
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
    reception:
      'Der Prolog war der Schlüsseltext der christologischen Konzilien: In Nizäa 325 und Chalcedon 451 wurde mit seinen Sätzen gerungen, und die Formeln über die Gottheit Christi sind ohne ihn nicht zu verstehen. Bis zur Liturgiereform wurde er in der katholischen Messe am Ende jedes Gottesdienstes gelesen, das „Letzte Evangelium“.\n\nAn Vers 1 hängt bis heute ein Übersetzungsstreit: Weil im Griechischen vor dem zweiten „Gott“ der Artikel fehlt, übersetzen die Zeugen Jehovas „ein Gott“. Die große Mehrheit der Gräzisten hält das für unhaltbar – das Fehlen des Artikels markiert hier das Prädikat, nicht eine Abstufung.',
    interpretations: [
      {
        tradition: 'Jüdische Einordnung',
        text: 'Die jüdische Tradition kennt das Motiv eines Wortes, das bei Gott ist, aus den Targumen, wo das aramäische *Memra* als Umschreibung für Gottes Wirken steht, und aus der Weisheitsliteratur. Neuere Forschung liest den Prolog deshalb weniger als Anleihe bei griechischer Philosophie denn als Zuspitzung innerjüdischer Sprache.',
      },
    ],
  },

  'joh 3,16': {
    longAdd:
      'Der Vers steht in einem Nachtgespräch mit Nikodemus – und es ist nicht sicher, wo dieses Gespräch aufhört. Die ältesten Handschriften kennen keine Anführungszeichen; ob Vers 16 noch Jesus spricht oder schon der Evangelist kommentiert, ist deshalb offen, und die Übersetzungen setzen die Grenze verschieden. Ebenso strittig ist das erste Wort: „Also hat Gott die Welt geliebt“ meint bei Luther nicht das Ausmaß, sondern die Art – „auf diese Weise“. Die vertraute Steigerungslesart – „so sehr“ – ist erst durch spätere Übersetzungen gewachsen.',
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
    reception:
      'Kein Vers ist häufiger auf Plakaten in Stadien, auf Aufklebern und in Werbespots erschienen; „John 3:16“ genügt in den USA als Erkennungszeichen. Diese Verselbständigung ist selbst ein Thema geworden: Der Vers wird meist ohne Vers 17 zitiert, der ausdrücklich sagt, dass der Sohn nicht zum Richten gesandt ist.\n\nDie Rede vom Vater, der den Sohn „gibt“, ist zudem theologisch scharf befragt worden. Feministische und befreiungstheologische Ausleger haben darauf hingewiesen, dass eine Deutung, in der ein Vater seinen Sohn opfert, in der Seelsorge an Gewaltbetroffenen Schaden anrichten kann – und dass der Text selbst das Geben nicht als Tötung, sondern als Hingabe beschreibt.',
    interpretations: [
      {
        tradition: 'Ostkirchliche Auslegung',
        text: 'Die orthodoxe Theologie liest den Vers von der Menschwerdung her, nicht vom Kreuz: Gott gibt den Sohn in die Welt hinein, damit menschliches Leben an göttlichem teilhat. Das Ziel ist weniger die Tilgung einer Schuld als die Heilung der Sterblichkeit.',
      },
    ],
  },

  'joh 14,6': {
    longAdd:
      'Der Satz ist eine Antwort auf eine praktische Frage. Thomas hat gerade gesagt: Wir wissen nicht, wohin du gehst – wie können wir den Weg wissen? Die Antwort verschiebt die Ebene: Nicht eine Route wird genannt, sondern eine Person. Und der Zusammenhang ist Abschied, nicht Religionsvergleich: Jesus redet zu den Seinen am letzten Abend, um sie zu trösten. Ob ein Trostwort an Bedrängte zugleich ein Urteil über andere Religionen enthält, ist genau die Frage, an der sich die Auslegungen scheiden.',
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
    reception:
      'Der Vers ist der meistzitierte Beleg für den Absolutheitsanspruch des Christentums – und stand deshalb im Zentrum aller Streitigkeiten um Mission und Religionsdialog. Das Zweite Vatikanische Konzil formulierte 1965 in *Nostra aetate*, dass die Kirche nicht ablehnt, „was in diesen Religionen wahr und heilig ist“; die evangelischen Kirchen ringen in ihren Dialogpapieren seit den 1970er Jahren um dieselbe Frage.\n\nBesonders belastet ist der Gebrauch gegenüber dem Judentum. Kirchliche Erklärungen nach 1945 – von der Rheinischen Synode 1980 bis zu römischen Dokumenten – halten fest, dass Gottes Bund mit Israel nicht gekündigt ist, und lehnen eine Judenmission ab. Wie das mit diesem Vers zusammengeht, ist theologisch nicht abschließend geklärt und wird offen ausgetragen.',
    interpretations: [
      {
        tradition: 'Exegetische Beobachtung',
        text: 'Der Satz ist an Jünger gerichtet, die bleiben sollen, nicht an Außenstehende, über die geurteilt wird. Manche Ausleger schließen daraus, dass er die Zugehörigkeit der Gemeinde bestimmt und nicht die Grenzen des Heils – andere halten dagegen, dass „niemand kommt zum Vater denn durch mich“ eine Aussage über alle sei.',
      },
    ],
  },

  'apg 2,1': {
    longAdd:
      'Das Fest, an dem das geschieht, ist kein christliches: Schawuot, das Wochenfest, fiel fünfzig Tage nach Passa und war ursprünglich ein Erntefest, das im Judentum zunehmend als Fest der Tora-Gabe am Sinai begangen wurde. Damit wird die Szene lesbar: Am Sinai gab Gott sein Gebot unter Feuer und Donner; hier gibt er seinen Geist unter Feuer und Sturm. Die rabbinische Überlieferung erzählte sogar, die Stimme vom Sinai habe sich in siebzig Sprachen geteilt, damit alle Völker sie hören konnten – dieselbe Zahl, die die Völkerliste der Genesis nennt.',
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
    reception:
      'Aus der Frage, was in Jerusalem geschah, ist im 20. Jahrhundert eine weltweite Bewegung geworden: Die Erweckung in der Azusa Street in Los Angeles ab 1906 machte die Geisterfahrung zum Kern einer eigenen Frömmigkeit. Pfingstlich-charismatische Kirchen gehören heute zu den am schnellsten wachsenden christlichen Gruppen überhaupt, mit Schwerpunkten in Lateinamerika, Afrika und Asien.\n\nDie Gegenlesart hat ebenfalls Geschichte gemacht: Die Völkerliste in den Versen 9 bis 11 nennt Menschen aus dem ganzen bekannten Erdkreis, und jeder hört in seiner eigenen Sprache. Daraus wurde ein Argument gegen die eine Kirchensprache – und in der Missionsgeschichte das Motiv, die Bibel in jede Sprache zu übersetzen, statt eine heilige Sprache durchzusetzen.',
    interpretations: [
      {
        tradition: 'Kritische Einordnung',
        text: 'Historisch lässt sich hinter der Szene wenig sichern. Paulus, der früheste Zeuge, kennt eine Geistausgießung als Erfahrung der Gemeinden, erwähnt aber kein Pfingstereignis in Jerusalem. Lukas erzählt hier weniger ein datierbares Ereignis als den Anfang der Kirche in Bildern, die den Sinai zitieren.',
      },
    ],
  },

  /* ---------------------------------------------------------------- Briefe */

  'roem 8,28': {
    longAdd:
      'Der Text ist an dieser Stelle nicht eindeutig überliefert. Einige alte Handschriften lesen „Gott lässt alle Dinge zum Besten dienen“ – dann ist Gott das Subjekt, und der Satz sagt nicht, dass alles gut ist, sondern dass Gott daran arbeitet. Luther folgt der anderen Lesart. Wichtiger noch ist der Zusammenhang: Zwei Verse vorher steht, dass wir nicht wissen, was wir beten sollen, und dass der Geist mit unaussprechlichem Seufzen eintritt. Der berühmte Satz folgt also nicht auf eine Erfolgsbilanz, sondern auf das Eingeständnis der Ratlosigkeit.',
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
    reception:
      'Der Vers ist ein Trostwort ersten Ranges – und ein Satz, mit dem viel Schaden angerichtet wurde. In der Seelsorge gilt es als Grundregel, ihn Trauernden nicht ungefragt zuzusprechen: Wer eben ein Kind verloren hat, hört „alles dient zum Besten“ als Verharmlosung. Dass er im Text gerade nicht erklärt, wozu ein Leid gut sei, sondern nur, wer daran festhält, wird beim Zitieren oft überhört.\n\nDie Verse 29 und 30 wurden zur Grundlage der Prädestinationslehre. Augustinus, Calvin und die Synode von Dordrecht 1619 leiteten daraus eine doppelte Vorherbestimmung ab; die lutherische Tradition wehrte sich dagegen, und die *Konkordienformel* von 1577 lehnte eine Erwählung zur Verdammnis ausdrücklich ab.',
    interpretations: [
      {
        tradition: 'Ostkirchliche Auslegung',
        text: 'Die orthodoxe Theologie liest das Vorherwissen nicht als Vorherbestimmen: Gott sieht, wer sich ihm öffnet, ohne es zu erzwingen. Freiheit und Gnade stehen dabei nicht in Konkurrenz – ein Ansatz, der die westliche Zuspitzung des Streits gar nicht erst mitmacht.',
      },
    ],
  },

  '1kor 13,1': {
    longAdd:
      'Das Kapitel ist kein Einschub und keine Hochzeitsrede, sondern der Mittelteil einer Auseinandersetzung. In Korinth stritt man darüber, welche Geistesgaben mehr gelten; Kapitel 12 und 14 handeln von Zungenrede, Prophetie und Ordnung im Gottesdienst. Genau dazwischen setzt Paulus diesen Text – und alle Gaben, um die gestritten wird, tauchen in den ersten drei Versen wieder auf, jeweils entwertet. Die Liebe wird dabei nicht definiert, sondern in fünfzehn Verben beschrieben, von denen kein einziges ein Gefühl benennt. Es sind lauter Handlungen und Unterlassungen.',
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
    reception:
      'Kaum ein Text wird häufiger bei Trauungen gelesen – obwohl er nicht von Paaren handelt, sondern von einer zerstrittenen Gemeinde. Ausleger sehen darin keinen Fehler: Die Beschreibung trifft, was in jeder dauerhaften Beziehung gebraucht wird. Der Umzug in die Hochzeitsliturgie hat den Text allerdings weichgezeichnet; im Original ist er eine Zurechtweisung.\n\nMartin Luther King zitierte das Kapitel regelmäßig und verband es mit dem griechischen Wortfeld: Agape sei die Liebe, die man auch dem Gegner schuldet, weil sie keine Sympathie voraussetzt. Diese Auslegung ist in die Sprache der Bürgerrechtsbewegung eingegangen.',
    interpretations: [
      {
        tradition: 'Kritische Rückfrage',
        text: '„Sie verträgt alles, sie duldet alles“ ist Menschen in Gewaltbeziehungen als Aufforderung zum Aushalten vorgehalten worden. Seelsorgliche Literatur widerspricht hier deutlich: Der Text beschreibt, was Liebe tut, und begründet keine Pflicht, Misshandlung zu ertragen – „sie freut sich nicht der Ungerechtigkeit“ steht im selben Abschnitt.',
      },
    ],
  },

  'gal 3,26': {
    longAdd:
      'Der Satz ist wahrscheinlich älter als der Brief: Aufbau und Rhythmus deuten auf eine Taufformel hin, die Paulus zitiert – dieselben drei Paare tauchen in abgewandelter Form in 1. Korinther 12 und Kolosser 3 auf. Die drei Gegensätze sind nicht beliebig gewählt; sie benennen die Grundunterscheidungen der antiken Gesellschaft: Herkunft, Rechtsstand, Geschlecht. Und die Formulierung wechselt beim dritten Paar auffällig: Statt „kein Mann noch Weib“ steht im Griechischen „nicht männlich und weiblich“ – exakt die Worte, mit denen die griechische Übersetzung von Genesis 1,27 die Erschaffung des Menschen beschreibt.',
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
    reception:
      'Der Vers gehört zu den meistzitierten der Bibel in Debatten um Gleichheit – und seine Wirkungsgeschichte ist zwiespältig. Abolitionisten führten ihn gegen die Sklaverei ins Feld, während ihre Gegner mit den Haustafeln der Briefe antworteten; in Südafrika stand er im Zentrum der kirchlichen Auseinandersetzung um die Apartheid, und die Bekenntniserklärung von Belhar 1986 baut auf ihm auf.\n\nIn der Frauenordination und in der Diskussion um Homosexualität wird er ebenso angeführt. Der Einwand lautet jeweils, der Vers rede vom Heil und nicht von Ämtern oder Ordnungen. Wo die Grenze zwischen beidem verläuft, ist bis heute konfessionell umstritten.',
    interpretations: [
      {
        tradition: 'Ökumenische Verständigung',
        text: 'Viele Kirchen haben sich darauf verständigt, dass der Vers eine Wirklichkeit beschreibt, die in der Gemeinde sichtbar werden soll, ohne dass daraus unmittelbar eine Kirchenordnung folgt. Der Streit verläuft dann nicht mehr um den Vers selbst, sondern um die Frage, was „sichtbar werden“ konkret verlangt.',
      },
    ],
  },

  'eph 2,8': {
    longAdd:
      'Der Abschnitt endet nicht bei Vers 9, sondern bei Vers 10 – und dort stehen die Werke wieder da, nur an anderer Stelle. Nicht als Weg zum Heil, sondern als das, wozu Gerettete geschaffen sind. Griechisch heißt es sogar, Gott habe sie „zuvor bereitet, dass wir darin wandeln sollen“: Die guten Werke warten schon. Wer nur die Verse 8 und 9 zitiert, macht aus einer Umstellung eine Streichung. Bemerkenswert ist auch, worauf sich „das nicht aus euch“ bezieht – grammatisch am ehesten auf den ganzen Vorgang, nicht nur auf den Glauben.',
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
    reception:
      'Diese Verse gehören zum Kernbestand der Reformation und stehen in Luthers Vorreden ebenso wie in unzähligen Gesangbuchliedern. Der Streit, den sie auslösten, wurde 1999 in der *Gemeinsamen Erklärung zur Rechtfertigungslehre* zwischen dem Lutherischen Weltbund und der katholischen Kirche zumindest teilweise beigelegt: Beide Seiten erklärten, dass der Mensch allein aus Gnade angenommen wird und die gegenseitigen Lehrverurteilungen des 16. Jahrhunderts den heutigen Partner nicht mehr treffen.\n\nDie Kehrseite ist ein Missbrauch, den schon Bonhoeffer benannt hat: „billige Gnade“ – Vergebung als Prinzip, das nichts kostet und nichts ändert. Die Verse 8 bis 10 zusammen zu lesen ist die exegetische Antwort darauf.',
    interpretations: [
      {
        tradition: 'Historische Einordnung',
        text: 'Die neuere Paulusforschung liest die Gegenüberstellung von Glaube und Werken weniger als Streit um menschliche Leistung als um Zugehörigkeit: Strittig war in den Gemeinden, ob Nichtjuden Beschneidung und Speisegebote übernehmen mussten. Ob der Epheserbrief diese Frontstellung noch teilt oder sie bereits grundsätzlich versteht, ist umstritten.',
      },
    ],
  },

  'phil 2,5': {
    longAdd:
      'Der Hymnus hat eine klare Kurve: Abstieg in den Versen 6 bis 8, Aufstieg in 9 bis 11, und der tiefste Punkt ist mit drei Worten markiert – „ja zum Tode am Kreuz“. Viele Forscher halten gerade diese drei Worte für Paulus’ eigenen Zusatz zu einem übernommenen Lied; sie sprengen das Versmaß. Der Rahmen ist dabei nicht Dogmatik, sondern Streitschlichtung: Die Gemeinde in Philippi war zerstritten, und Paulus stellt ihr nicht eine Lehre, sondern eine Haltung vor Augen. Der Hymnus ist ein Argument in einem Konflikt.',
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
    reception:
      'Der Hymnus lieferte den christologischen Konzilien ihre Sprache, und der Karfreitag lebt bis heute von seinen Bildern. Bemerkenswerter ist seine politische Wirkung: Die Schlussverse übertragen auf Christus, was in den Städten des Reiches dem Kaiser galt – dass sich ihm jedes Knie beuge und jede Zunge ihn als *Kyrios* bekenne. In Philippi, einer römischen Veteranenkolonie, war das keine fromme Floskel.\n\nDie Aufforderung zur Erniedrigung hat auch Schaden gestiftet: Sie wurde Untergebenen, Frauen und Kolonisierten als Pflicht zum Aushalten gepredigt. Feministische Theologie hat dagegen eingewandt, dass Selbstentleerung nur predigen kann, wer etwas zu entleeren hat – dem Machtlosen ist mit dem Ruf zur Demut nicht geholfen.',
    interpretations: [
      {
        tradition: 'Religionsgeschichtliche Forschung',
        text: 'Form, Rhythmus und ungewöhnliche Vokabeln sprechen dafür, dass Paulus hier ein bereits vorhandenes Lied der Gemeinden zitiert. Damit wäre der Text älter als der Brief und einer der frühesten Belege dafür, wie in den ersten Jahrzehnten von Christus gesungen wurde – gesungene Theologie vor geschriebener.',
      },
    ],
  },

  'hebr 11,1': {
    longAdd:
      'Der Satz ist keine Definition des Glaubens im heutigen Sinn, sondern eine Beschreibung dessen, was er leistet – und er steht am Anfang einer langen Aufzählung. Was in Kapitel 11 folgt, sind keine Glaubenssätze, sondern Lebensläufe: Abel, Henoch, Noah, Abraham, Sara, Mose, Rahab. Und der Abschnitt endet nicht triumphal. Die Verse 36 bis 39 zählen Verspottete, Gesteinigte, Zersägte auf und schließen mit dem Satz, dass sie die Verheißung gerade nicht erlangt haben. Glaube heißt in diesem Kapitel: unterwegs bleiben, ohne anzukommen.',
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
    reception:
      'Kapitel 11 ist zum Musterkatalog des Glaubens geworden und prägt Predigt und Frömmigkeit bis heute – von mittelalterlichen Heiligenreihen bis zu modernen Vorbildersammlungen. Auffällig ist, wen es aufnimmt: Rahab, eine Prostituierte, und Sara, die im Erzählzusammenhang gelacht hat. Der Katalog ist deutlich weiter als die Frömmigkeit, die sich auf ihn beruft.\n\nIn der Auseinandersetzung mit dem Atheismus ist der Vers oft als Beleg dafür zitiert worden, Glaube sei Fürwahrhalten ohne Grund. Ausleger halten dagegen, dass *elenchos* ein Beweiswort ist und der Verfasser gerade nicht zum blinden Vertrauen aufruft, sondern auf eine Erfahrungsgeschichte verweist.',
    interpretations: [
      {
        tradition: 'Jüdische Einordnung',
        text: 'Der Katalog folgt einer bekannten Form: Auch das Buch Jesus Sirach lobt „berühmte Männer“ in einer langen Reihe. Der Hebräerbrief übernimmt diese Gattung und deutet sie um – nicht ihre Taten machen die Aufgezählten groß, sondern dass sie sich auf Unsichtbares verlassen haben.',
      },
    ],
  },

  'jak 2,14': {
    longAdd:
      'Der scheinbare Widerspruch zu Paulus löst sich zum Teil an den Wörtern auf. Wenn Paulus von „Werken“ spricht, meint er meist die Werke des Gesetzes – Beschneidung, Speisegebote, Feiertage, also Kennzeichen der Zugehörigkeit. Jakobus meint tätige Hilfe: Er hat zwei Verse vorher jemanden vor Augen, der einem Hungernden „Gehet hin in Frieden“ wünscht und ihm nichts gibt. Auch „Glaube“ ist verschieden gefüllt: Bei Paulus ist er Vertrauen, bei Jakobus ein bloßes Fürwahrhalten, das auch die Dämonen haben. Beide berufen sich auf Abraham – und meinen verschiedene Szenen seines Lebens.',
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
    reception:
      'Luther nannte den Jakobusbrief 1522 in seiner Vorrede eine „stroherne Epistel“ und stellte ihn im Anhang seines Neuen Testaments hinter die anderen Schriften – eine Wertung, die er später zurückhaltender formulierte, die aber in der lutherischen Tradition nachwirkte. Das Konzil von Trient antwortete 1546 mit der ausdrücklichen Bekräftigung des Briefes als vollgültiger Schrift.\n\nDie *Gemeinsame Erklärung zur Rechtfertigungslehre* von 1999 hat den Streit entschärft, ohne ihn aufzulösen: Beide Seiten halten fest, dass der Glaube die Werke wirkt und die Werke ihn nicht ersetzen. In der Diakonie und in der christlichen Sozialarbeit ist Jakobus 2 der meistzitierte Begründungstext geblieben.',
    interpretations: [
      {
        tradition: 'Historische Einordnung',
        text: 'Manche Ausleger lesen den Abschnitt als Reaktion nicht auf Paulus selbst, sondern auf eine verkürzte Paulus-Auslegung, die in einigen Gemeinden umlief: Wenn der Glaube genügt, sei das Handeln gleichgültig. Der Brief widerspricht dann nicht Paulus, sondern denen, die ihn missverstanden.',
      },
    ],
  },

  '1joh 4,7': {
    longAdd:
      'Der Satz „Gott ist Liebe“ steht zweimal in diesem Abschnitt, und beide Male ist er nicht der Ausgangspunkt, sondern die Folgerung – begründet mit einem Ereignis: dass Gott den Sohn gesandt hat. Der Brief argumentiert also nicht von einem allgemeinen Begriff der Liebe zu Gott hin, sondern umgekehrt. Ebenso wichtig ist die Grenze, die der Text zieht: Wer Gott zu lieben behauptet und den Bruder hasst, wird in Vers 20 schlicht ein Lügner genannt. Das Wort ist hart, und es steht in einem Brief, der von Spaltungen in der Gemeinde geprägt ist.',
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
    reception:
      'Der Satz „Gott ist Liebe“ ist wohl die meistzitierte Kurzformel des Christentums und steht über Kirchentüren, in Traureden und auf Grabsteinen. Benedikt XVI. machte ihn 2005 zum Titel seiner ersten Enzyklika *Deus caritas est* und verband darin die griechischen Wörter *eros* und *agape* ausdrücklich miteinander.\n\nDie Verkürzung liegt nahe: Der Satz lässt sich so lesen, als sei Liebe ein anderes Wort für Gott – und damit alles gemeint, was Menschen so nennen. Der Brief selbst geht den umgekehrten Weg; er bestimmt, was Liebe ist, von einem bestimmten Ereignis her, nicht von der Erfahrung.',
    interpretations: [
      {
        tradition: 'Historische Einordnung',
        text: 'Der Brief entsteht in einer Gemeinde, aus der Menschen weggegangen sind – Kapitel 2 spricht von solchen, die „von uns ausgegangen“ sind. Der Ruf zur gegenseitigen Liebe ist deshalb zunächst nach innen gerichtet: Er soll eine Gruppe zusammenhalten, die gerade auseinanderfällt. Ob und wie weit er darüber hinausreicht, ist eine Frage der Auslegung, nicht des Wortlauts.',
      },
    ],
  },

  'offb 21,1': {
    longAdd:
      'Die Bewegungsrichtung ist bemerkenswert: Die Stadt kommt herab. Nicht die Erlösten steigen in den Himmel, sondern Gott zieht zu den Menschen – „siehe da, die Hütte Gottes bei den Menschen“. Das Wort für Hütte ist dasselbe, mit dem das Wüstenzelt bezeichnet wurde, in dem Gott mit Israel mitzog. Und der Satz „das Meer ist nicht mehr“ meint keine Austrocknung der Ozeane: Das Meer steht in dieser Bildwelt für das Chaos, aus dem in Kapitel 13 das Tier aufsteigt. Was aufhört, ist die Bedrohung, nicht die Schöpfung.',
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
    reception:
      'Die Deutung dieses Kapitels trennt bis heute christliche Strömungen. Die kirchliche Hauptlinie seit Augustinus liest es als Bild für die vollendete Gemeinschaft mit Gott, nicht als Fahrplan. Der Dispensationalismus des 19. Jahrhunderts – über die Scofield-Bibel weit verbreitet – ordnete es dagegen in eine feste Abfolge künftiger Ereignisse ein, mit erheblichen politischen Folgen bis in die Nahostpolitik hinein.\n\nDaneben steht eine schöpfungstheologische Wirkung: Weil der Text von einer neuen Erde spricht und nicht von deren Abschaffung, ist er in den letzten Jahrzehnten zu einem Kerntext kirchlicher Umweltarbeit geworden. Wer die Erde für Ausschussware hält, so das Argument, liest hier gegen den Wortlaut.',
    interpretations: [
      {
        tradition: 'Seelsorgliche Lesart',
        text: 'Vers 4 – dass Gott alle Tränen abwischt – ist einer der meistgesprochenen Sätze an Gräbern. Bemerkenswert ist, dass er die Tränen nicht für unnötig erklärt: Erst werden sie da sein, dann werden sie abgewischt. Der Trost bestreitet den Schmerz nicht, sondern setzt ihn voraus.',
      },
    ],
  },
};
