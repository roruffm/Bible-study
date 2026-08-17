/* Neue NT-Artikel: Epheser (Teil 1) */

const DAT = {
  events: 'Kleinasien, angenommener Empfängerkreis um Ephesus',
  written: 'zwischen 60 und 90 n. Chr., je nach Verfasserfrage',
  epoch: 'urkirche',
};

export const ARTICLES = [
  {
    book: 'eph',
    chapter: 1,
    from: 1,
    to: 14,
    title: '„versiegelt worden seid mit dem Heiligen Geist“',
    dating: DAT,
    historicalShort:
      'Ein Brief, dessen Anschrift in den ältesten Handschriften fehlt – und ein Lobpreis, der im Griechischen aus einem einzigen Satz besteht.',
    historicalLong:
      'Die Worte „zu Ephesus“ stehen in den ältesten Handschriften nicht. Der Papyrus 46 aus dem dritten Jahrhundert, der Codex Sinaiticus und der Codex Vaticanus lassen sie weg; im Text klafft dann eine Lücke, als sei ein Ortsname einzusetzen. Marcion kannte den Brief um 140 unter dem Namen an die Laodizener, und Origenes bezeugt eine Fassung ohne Ortsangabe. Die verbreitetste Erklärung: Es handelt sich um ein Rundschreiben, in das der Bote den jeweiligen Ort einsetzte – was zugleich erklärt, warum der Brief keine einzige persönliche Nachricht enthält, obwohl die Apostelgeschichte von einem dreijährigen Aufenthalt in Ephesus berichtet.\n\nDie Verfasserfrage ist bei diesem Brief besonders umstritten. Etwa ein Drittel der Wörter findet sich fast wörtlich im Kolosserbrief wieder, oft in anderer Bedeutung; der Satzbau ist mit seinen ineinandergeschobenen Nebensätzen und Genitivketten schwerfälliger als in den unbestrittenen Briefen, und der Wortschatz weicht ab. Die Mehrheit der Forschung hält den Brief für das Werk eines Schülers, der den Kolosserbrief vor sich hatte und für einen weiteren Leserkreis überarbeitete.\n\nDer Lobpreis, der folgt, ist im Griechischen ein einziger Satz über zwölf Verse – der längste zusammenhängende Satz des Neuen Testaments. Die Form ist die der jüdischen Beracha: Gelobt sei Gott, der… Solche Segenssprüche standen am Anfang von Gebeten und Gottesdiensten und sind in der Synagogenliturgie und in Qumran belegt. Der Brief füllt die geprägte Form mit einer Aufzählung dessen, was geschehen ist.\n\nDer Ausdruck, alle Dinge sollten in Christus zusammengefasst werden, gebraucht ein Wort aus der Rechnungsführung und der Rhetorik: die Summe unter eine Spalte ziehen, die Hauptsache einer Rede am Ende zusammenfassen. Er beschreibt keine Wiederherstellung eines früheren Zustands, sondern eine Zusammenführung dessen, was auseinanderliegt – Himmel und Erde ausdrücklich eingeschlossen.\n\nDas Bild vom Siegel stammt aus dem Rechtsleben. Waren wurden versiegelt, um Eigentum und Unversehrtheit zu bezeichnen; Urkunden trugen Siegel als Beglaubigung, Sklaven und Soldaten Zeichen ihrer Zugehörigkeit. Das Wort für Pfand, das folgt, ist ein semitisches Lehnwort aus dem Handelsrecht: die Anzahlung, die den Rest verbindlich macht. Im neugriechischen Sprachgebrauch bezeichnet dasselbe Wort bis heute den Verlobungsring.',
    reception:
      'Die fehlende Ortsangabe ist einer der bekanntesten textkritischen Befunde des Neuen Testaments. Sie hat die Vermutung gestützt, es handle sich um ein Rundschreiben, und damit auch die Frage nach dem verlorenen Laodizenerbrief berührt, den der Kolosserbrief erwähnt. Eine lateinische Fälschung unter diesem Namen stand im Mittelalter in zahlreichen Bibelhandschriften.\n\nDer Lobpreis gehört zu den Grundtexten der Erwählungslehre. Die Wendung, Gott habe erwählt, ehe der Welt Grund gelegt war, ist in den Auseinandersetzungen über die Prädestination von allen Seiten angeführt worden: von Augustinus gegen Pelagius, von der Dordrechter Synode 1619, von Karl Barth in seiner Umformung der Erwählungslehre, die Christus zum Erwählten und Verworfenen zugleich macht. Der Text selbst spricht durchgehend in der Mehrzahl und von einer Erwählung „in Christus“ – ein Befund, den die neuere Auslegung stark betont.\n\nDas Bild vom Siegel ist in die Tauf- und Firmliturgie eingegangen. Die Alte Kirche nannte die Taufe sphragis, Siegel, und die Salbung nach der Taufe wurde als Besiegelung gedeutet; die orthodoxe Chrismation und die westliche Firmung gehen darauf zurück. Das Wort für Pfand hat der Rede vom Angeld des Geistes ihren Ort gegeben – etwas ist schon da, und es ist nicht alles.',
    world: [
      {
        aspect: 'arbeit',
        text: 'Ein Siegel wurde mit einem Ring in Wachs oder Ton gedrückt und trug ein Bild oder ein Monogramm. Amphoren, Warenballen und Türen wurden so verschlossen; wer das Siegel brach, machte sich strafbar.',
      },
      {
        aspect: 'recht',
        text: 'Die Anzahlung machte einen Kauf verbindlich: Wer sie geleistet hatte, konnte nicht mehr zurücktreten, ohne sie zu verlieren. Papyrusverträge aus Ägypten nennen sie regelmäßig, oft bei Grundstücken und Vieh.',
      },
      {
        aspect: 'glaube',
        text: 'Segenssprüche eröffneten jüdische Gebete und Gottesdienste; die Achtzehnbitten beginnen so, und in Qumran sind ähnliche Formeln gefunden worden. Wer einen Brief damit begann, sprach in einer bekannten Form.',
      },
      {
        aspect: 'gesellschaft',
        text: 'Rundschreiben waren üblich: Städtebünde, Vereine und Verwaltungen schickten denselben Text an mehrere Empfänger, der Bote trug ihn von Ort zu Ort und trug die Anschrift ein. Erhaltene Kaisererlasse zeigen das Verfahren.',
      },
    ],
    terms: [
      {
        word: 'griech. anakephalaiosasthai',
        rendered: 'zusammengefaßt würden',
        note: 'Die Summe unter eine Spalte ziehen, die Hauptsache einer Rede zusammenfassen. Ein Wort aus Rechnungsführung und Rhetorik – es beschreibt keine Wiederherstellung, sondern eine Zusammenführung dessen, was auseinanderliegt.',
      },
      {
        word: 'griech. esphragisthete',
        rendered: 'versiegelt worden seid',
        note: 'Mit einem Siegel versehen – ein Rechtsakt, der Eigentum und Unversehrtheit bezeichnet. Die Alte Kirche nannte die Taufe danach sphragis; die Salbung nach der Taufe wurde als Besiegelung gedeutet.',
      },
      {
        word: 'griech. arrabon',
        rendered: 'das Pfand',
        note: 'Ein semitisches Lehnwort aus dem Handelsrecht: die Anzahlung, die den Rest verbindlich macht. Im Neugriechischen bezeichnet dasselbe Wort den Verlobungsring.',
      },
    ],
    interpretations: [
      {
        tradition: 'Textkritik',
        text: 'Die Worte „zu Ephesus“ fehlen in den ältesten Handschriften; Marcion kannte den Brief als an die Laodizener, Origenes eine Fassung ohne Ortsangabe. Die verbreitetste Erklärung ist ein Rundschreiben – was zugleich erklärt, warum jede persönliche Nachricht fehlt.',
      },
      {
        tradition: 'Historisch-kritische Einordnung',
        text: 'Etwa ein Drittel der Wörter findet sich im Kolosserbrief wieder, oft in anderer Bedeutung. Satzbau und Wortschatz weichen von den unbestrittenen Briefen ab. Die Mehrheit hält den Brief für das Werk eines Schülers, der den Kolosserbrief für einen weiteren Leserkreis überarbeitete.',
      },
      {
        tradition: 'Reformierte Auslegung',
        text: 'Die Erwählung vor Grundlegung der Welt ist eine Kernstelle der Prädestinationslehre. Die Dordrechter Synode führte sie 1619 an; Karl Barth formte die Lehre im 20. Jahrhundert um und machte Christus zum Erwählten und Verworfenen zugleich.',
      },
      {
        tradition: 'Katholische Auslegung',
        text: 'Der Ausdruck von der Zusammenfassung aller Dinge in Christus ist zu einem Leitwort der Schöpfungs- und Vollendungslehre geworden. Irenäus baute darauf seine Vorstellung von der Rekapitulation; im 20. Jahrhundert hat Teilhard de Chardin sie neu aufgenommen.',
      },
      {
        tradition: 'Neuere Auslegung',
        text: 'Der Text spricht durchgehend in der Mehrzahl und von einer Erwählung „in Christus“. Daraus wird gefolgert, dass es nicht um die Auswahl Einzelner geht, sondern um die Bestimmung einer Gemeinschaft – eine Lesart, die die Schärfe der klassischen Prädestinationsdebatte mildert.',
      },
    ],
    crossRefs: [
      { book: 'kol', chapter: 4, verse: 16, note: 'Der Brief aus Laodizea' },
      { book: '2kor', chapter: 1, verse: 22, note: 'Siegel und Pfand des Geistes' },
      { book: 'apg', chapter: 19, verse: 10, note: 'Der lange Aufenthalt in Ephesus' },
      { book: 'kol', chapter: 1, verse: 14, note: 'Die Parallele im Kolosserbrief' },
    ],
    sources: [
      'Papyrus 46, Codex Sinaiticus und Vaticanus zu Epheser 1,1',
      'Tertullian, Gegen Marcion 5,11 und 5,17',
      'Irenäus, Gegen die Häresien 3,16,6 (Rekapitulation)',
    ],
  },
  {
    book: 'eph',
    chapter: 1,
    from: 15,
    to: 23,
    title: '„erleuchtete Augen eures Verständnisses“',
    dating: DAT,
    historicalShort:
      'Ein Gebet um Erkenntnis, eine Aufzählung überirdischer Mächte und das Bild vom Leib, das dem Brief seine Gestalt gibt.',
    historicalLong:
      'Das Gebet folgt auf den Lobpreis und bittet um dreierlei: die Hoffnung der Berufung, den Reichtum des Erbes, die Größe der Kraft. Die Häufung von Genitiven ist für diesen Brief kennzeichnend – ein Stilzug, der ihn von den unbestrittenen Paulusbriefen unterscheidet und den Übersetzern seit jeher Mühe macht. Luther löste ihn mit Nebensätzen auf, wo das Griechische aneinanderreiht.\n\nDie Wendung von den erleuchteten Augen des Herzens – Luther schreibt Verständnis – ist ein Bild aus der Weisheitsliteratur. Sie setzt voraus, dass Erkenntnis nicht das Ergebnis von Anstrengung ist, sondern von Öffnung; im Griechischen steht ein Partizip im Perfekt, also ein Zustand, der eingetreten ist. Die Bitte lautet damit nicht: strengt euch an, sondern: möge euch aufgehen.\n\nDie Aufzählung der Mächte – Fürstentümer, Gewalt, Macht, Herrschaft – ist eine der ausführlichsten des Neuen Testaments. Solche Reihen sind aus der jüdischen Apokalyptik bekannt; das Henochbuch, das Testament Levis und die Qumranschriften kennen abgestufte Ordnungen himmlischer Wesen. Für Leser in Kleinasien hatte das eine handfeste Seite: Man rechnete mit Sternmächten, die das Schicksal bestimmen, und suchte durch Amulette und Beschwörungen Schutz. Der Brief bestreitet ihre Existenz nicht, sondern ihre Zuständigkeit.\n\nDer Zusatz „nicht allein auf dieser Welt, sondern auch in der zukünftigen“ gebraucht die jüdische Unterscheidung zweier Zeitalter. Sie teilt die Geschichte in den gegenwärtigen und den kommenden Äon; die rabbinische Literatur arbeitet durchgehend damit. Der Satz behauptet also nicht nur eine gegenwärtige Überordnung, sondern eine, die auch dann gilt, wenn sich alles ändert.\n\nDas Bild von Haupt und Leib ist im Epheserbrief anders gebaut als im ersten Korintherbrief. Dort sind alle Glieder gleichrangig und das Haupt ist eines unter ihnen; hier ist Christus das Haupt und die Gemeinde der Leib. Die Verschiebung ist erheblich: Aus einem Bild für gegenseitige Angewiesenheit wird eines für Zuordnung. Der Schlusssatz über die Fülle ist grammatisch mehrdeutig – die Gemeinde erfüllt ihn, oder sie wird von ihm erfüllt. Beide Lesarten sind alt.',
    reception:
      'Das Gebet um erleuchtete Augen ist in Gottesdienstordnungen und Predigtgebete eingegangen. Die Wendung selbst hat der Frömmigkeitssprache ein Bild geliefert, das ohne Anstrengung auskommt: Erkenntnis als etwas, das aufgeht.\n\nDie Rede von den Mächten und Gewalten hat im 20. Jahrhundert eine unerwartete Wirkung entfaltet. Hendrik Berkhof deutete sie 1953 auf überpersönliche Strukturen – Staat, Wirtschaft, Ideologie –, die Menschen beherrschen, ohne dass ein Einzelner sie steuert; Walter Wink baute die Deutung in den 1980er Jahren zu einer politischen Theologie aus. Die Bekennende Kirche und später die Befreiungstheologie haben in dieser Linie gelesen. Ob das dem Text entspricht oder ihn modernisiert, wird verschieden beurteilt.\n\nDas Bild von der Kirche als Leib Christi mit Christus als Haupt ist zur Grundfigur der katholischen Ekklesiologie geworden. Die Enzyklika Mystici corporis von 1943 entfaltet sie; das Zweite Vatikanische Konzil stellte ihr das Bild vom wandernden Gottesvolk zur Seite, um die Zuordnung nicht zur Unterordnung werden zu lassen. Die reformatorische Auslegung hat stets betont, dass das Haupt außerhalb des Leibes steht und deshalb keine Instanz auf Erden vertritt.',
    world: [
      {
        aspect: 'glaube',
        text: 'Die Ephesia grammata waren ein Satz von sechs unverständlichen Zauberworten, die nach antiker Überlieferung an der Artemisstatue standen. Man trug sie als Spruch bei sich, ritzte sie in Ringe und schrieb sie ab; ein Gewerbe lebte davon, und die Apostelgeschichte erzählt von der Verbrennung solcher Bücher.',
      },
      {
        aspect: 'macht',
        text: 'Die genannten Wörter bezeichnen im Alltag Amtsgewalt: Behörden, Statthalter, Vollmachten. Dieselben Begriffe für himmlische Mächte zu gebrauchen, ordnete beide Bereiche derselben Frage zu – wer hat wirklich zu sagen.',
      },
      {
        aspect: 'gesellschaft',
        text: 'Ein antiker Brief begann üblicherweise mit einem Dank an eine Gottheit für das Wohl des Empfängers; die Papyrusbriefe aus Ägypten zeigen die Formel hundertfach. Hier ist die Höflichkeitsform zu einem Gebet ausgebaut, das den ganzen Abschnitt füllt.',
      },
      {
        aspect: 'alltag',
        text: 'Ein Körper wurde als Einheit gedacht, in der ein Teil auf den anderen reagiert; antike Ärzte beschrieben das als Sympathie. Das Bild vom Leib setzt diese Vorstellung voraus und war deshalb sofort verständlich.',
      },
    ],
    terms: [
      {
        word: 'griech. pephotismenous tous ophthalmous',
        rendered: 'erleuchtete Augen',
        note: 'Ein Partizip im Perfekt: erleuchtet und erleuchtet geblieben. Das Bild stammt aus der Weisheitsliteratur und setzt voraus, dass Erkenntnis aufgeht, statt erarbeitet zu werden.',
      },
      {
        word: 'griech. archen kai exousian kai dynamin kai kyrioteta',
        rendered: 'Fürstentümer, Gewalt, Macht, Herrschaft',
        note: 'Eine der ausführlichsten Machtreihen des Neuen Testaments. Dieselben Wörter bezeichnen im Alltag Amtsgewalt. Der Text bestreitet nicht die Existenz dieser Mächte, sondern ihre Zuständigkeit.',
      },
      {
        word: 'griech. to pleroma',
        rendered: 'die Fülle',
        note: 'Grammatisch mehrdeutig: Die Gemeinde erfüllt ihn, oder sie wird von ihm erfüllt. Beide Lesarten sind alt. Das Wort spielt in den gnostischen Systemen des zweiten Jahrhunderts eine große Rolle.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Einordnung',
        text: 'Die Genitivketten und die Machtreihen sind Stilzüge, die den Brief von den unbestrittenen Paulusbriefen unterscheiden. Das Bild von Haupt und Leib ist gegenüber dem ersten Korintherbrief verschoben: Dort sind alle Glieder gleichrangig, hier ist Christus das Haupt und die Gemeinde der Leib.',
      },
      {
        tradition: 'Katholische Auslegung',
        text: 'Die Kirche als Leib Christi ist zur Grundfigur der Ekklesiologie geworden; die Enzyklika Mystici corporis von 1943 entfaltet sie. Das Zweite Vatikanische Konzil stellte ihr das Bild vom wandernden Gottesvolk zur Seite, damit die Zuordnung nicht zur Unterordnung wird.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Betont wird, dass das Haupt außerhalb des Leibes steht und deshalb auf Erden nicht vertreten werden kann. Die Kirche hat ein Haupt, aber keinen Stellvertreter – dieses Argument gehört zum Kernbestand der reformatorischen Ekklesiologie.',
      },
      {
        tradition: 'Politische Theologie',
        text: 'Hendrik Berkhof deutete die Mächte 1953 auf überpersönliche Strukturen – Staat, Wirtschaft, Ideologie –, die Menschen beherrschen, ohne dass ein Einzelner sie steuert. Walter Wink baute die Deutung in den 1980er Jahren aus. Ob das dem Text entspricht oder ihn modernisiert, wird verschieden beurteilt.',
      },
      {
        tradition: 'Religionsgeschichtliche Einordnung',
        text: 'Die Machtreihen entsprechen den abgestuften Ordnungen himmlischer Wesen in der jüdischen Apokalyptik. Für Leser in Kleinasien hatten sie eine handfeste Seite: Man suchte durch Amulette Schutz vor Sternmächten. Der Text nimmt diese Furcht ernst und ordnet sie unter.',
      },
    ],
    crossRefs: [
      { book: '1kor', chapter: 12, verse: 12, note: 'Das andere Leib-Bild' },
      { book: 'kol', chapter: 1, verse: 18, note: 'Christus als Haupt des Leibes' },
      { book: 'ps', chapter: 8, verse: 6, note: 'Alles unter seine Füße getan' },
      { book: 'apg', chapter: 19, verse: 19, note: 'Die Verbrennung der Zauberbücher' },
    ],
    sources: [
      'Hendrik Berkhof, Christus und die Mächte, 1953',
      'Pius XII., Mystici corporis, 1943',
      'Erstes Henochbuch 61,10 (Reihen himmlischer Mächte)',
    ],
  },
  {
    book: 'eph',
    chapter: 2,
    from: 1,
    to: 7,
    title: '„nach dem Fürsten, der in der Luft herrscht“',
    dating: DAT,
    historicalShort:
      'Die schwärzeste Beschreibung des Menschen im Neuen Testament – und der Umschwung, der mit zwei Wörtern beginnt: Aber Gott.',
    historicalLong:
      'Der Abschnitt beschreibt den früheren Zustand mit drei Größen, die zusammenwirken: der Lauf dieser Welt, ein Fürst, der in der Luft herrscht, und die eigenen Begierden. Außen, oben und innen – die Beschreibung lässt keinen Bereich aus. Das Wort für tot steht dabei nicht im Futur, sondern beschreibt den Zustand: Ihr wart tot, nicht ihr werdet sterben.\n\nDie Luft als Wohnort von Mächten ist eine Vorstellung der antiken Kosmologie. Der Raum zwischen Erde und Mond galt als Aufenthaltsbereich von Dämonen; Plutarch, Philon und die jüdische Apokalyptik setzen das voraus, und im Testament Levis wird der Himmel in Schichten geteilt, deren unterste den bösen Geistern gehört. Der Ausdruck ist damit keine Metapher, sondern eine Ortsangabe nach dem Weltbild der Zeit.\n\nDie Wendung von den Kindern des Zorns ist ein Semitismus: Wer Sohn oder Kind von etwas heißt, gehört ihm zu. Sie steht mit dem Zusatz „von Natur“, und daran hat sich ein langer Streit entzündet. Augustinus las darin die Erbsünde; die östliche Tradition versteht die Formulierung als Beschreibung eines Zustands, in den man hineinwächst, nicht einer vererbten Schuld. Das griechische Wort für Natur kann beides tragen.\n\nDer Umschwung beginnt mit zwei Wörtern, die im Griechischen am Satzanfang stehen und dadurch betont sind: Gott aber. Was folgt, ist eine Reihe von drei Verben mit derselben Vorsilbe – mitlebendig gemacht, miterweckt, mitgesetzt. Alle drei sind Neubildungen oder seltene Wörter, und alle drei stellen die Angeredeten neben Christus. Die Aussage, sie seien bereits in die himmlische Welt versetzt, geht über den Kolosserbrief hinaus, der die Auferstehung mit Christus zwar behauptet, das Sitzen im Himmel aber nicht.\n\nGenau darin liegt die theologische Schwierigkeit dieses Briefes. Der Römerbrief stellt die Auferstehung der Glaubenden ausdrücklich in die Zukunft; hier ist sie geschehen. Ein Teil der Forschung sieht darin den entscheidenden Hinweis auf einen späteren Verfasser, ein anderer eine Verschiebung des Blickwinkels, die derselbe Autor vornehmen konnte. Der Zusatz über die zukünftigen Zeiten hält immerhin einen Rest von Ausstehendem fest.',
    reception:
      'Der Abschnitt ist einer der Grundtexte der Gnadenlehre. Die Beschreibung als Tote hat in der reformatorischen Auslegung besonderes Gewicht bekommen: Ein Toter kann sich nicht selbst helfen, und daraus folgt die Unfähigkeit des Menschen zum ersten Schritt. Die Dordrechter Lehrregeln argumentieren so, und die lutherische Konkordienformel ebenfalls; die katholische Lehre hält dagegen, dass die Gnade zuvorkommt, ohne den Willen auszuschalten.\n\nDie Wendung von den Kindern des Zorns von Natur ist eine der Belegstellen der Erbsündenlehre. Augustinus führte sie gegen Pelagius an; das Konzil von Trient nahm sie auf. Die östlichen Kirchen sprechen lieber von der Sterblichkeit, die alle erben, als von der Schuld – der Unterschied zwischen Ost und West geht an dieser Stelle auseinander und ist nie beigelegt worden.\n\nDer Fürst in der Luft hat die Vorstellungswelt vom Teufel mitgeprägt. Über das Mittelalter bis in die frühe Neuzeit galt die Luft als sein Bereich; Stürme, Blitze und Seuchen wurden ihm zugeschrieben, und Luther nannte ihn in dieser Linie den Fürsten dieser Welt. Die Vorstellung, dass sich in der Luft etwas entscheidet, hat in Wetterläuten und Wetterbeschwörungen praktische Folgen gehabt.',
    world: [
      {
        aspect: 'glaube',
        text: 'In den Mysterienkulten hieß der Eingeweihte neu geboren; eine römische Inschrift des vierten Jahrhunderts nennt einen Mithras-Anhänger wiedergeboren für die Ewigkeit. Die Sprache von Tod und Lebendigmachen war also nicht fremd – ungewöhnlich ist, dass hier kein Ritus den Umschwung bewirkt.',
      },
      {
        aspect: 'alltag',
        text: 'Wetter war bedrohlich und unerklärlich: Stürme versenkten Schiffe, Hagel vernichtete Ernten, Blitze schlugen ein. Wer die Luft von Mächten bewohnt dachte, erklärte damit etwas, wofür es sonst keine Erklärung gab.',
      },
      {
        aspect: 'gesellschaft',
        text: 'Die Wendung „Kind von etwas“ ist ein Semitismus: Wer Sohn des Friedens oder Kind des Lichts heißt, gehört dazu. Sie beschreibt Zugehörigkeit, nicht Abstammung, und war jedem geläufig, der die griechische Bibel kannte.',
      },
      {
        aspect: 'macht',
        text: 'Das Wort für den Fürsten bezeichnet den Inhaber einer Amtsgewalt. Es auf eine unsichtbare Macht anzuwenden, ordnete diese in dieselbe Reihe ein wie Statthalter und Beamte – und machte sie damit angreifbar.',
      },
    ],
    terms: [
      {
        word: 'griech. ton archonta tes exousias tou aeros',
        rendered: 'dem Fürsten, der in der Luft herrscht',
        note: 'Eine Ortsangabe nach dem Weltbild der Zeit: Der Raum zwischen Erde und Mond galt als Aufenthaltsbereich von Dämonen. Der Ausdruck ist keine Metapher, sondern folgt der antiken Kosmologie.',
      },
      {
        word: 'griech. tekna physei orges',
        rendered: 'Kinder des Zorns von Natur',
        note: 'Ein Semitismus für Zugehörigkeit, verbunden mit einem griechischen Wort für Natur, das Herkunft und Beschaffenheit meinen kann. An dieser Doppeldeutigkeit hängt der Streit über die Erbsünde.',
      },
      {
        word: 'griech. synezoopoiesen',
        rendered: 'lebendig gemacht',
        note: 'Eine seltene Neubildung: mit jemandem zusammen lebendig gemacht. Sie steht in einer Reihe von drei Verben mit derselben Vorsilbe, die alle die Angeredeten neben Christus stellen.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Einordnung',
        text: 'Die Aussage, die Angeredeten seien bereits in die himmlische Welt versetzt, geht über den Kolosserbrief hinaus und steht dem Römerbrief entgegen, der die Auferstehung der Glaubenden in die Zukunft stellt. Sie gehört zu den Hauptargumenten für einen späteren Verfasser.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Die Beschreibung als Tote trägt die Lehre von der Unfähigkeit des Menschen zum ersten Schritt: Ein Toter kann sich nicht selbst helfen. Die Dordrechter Lehrregeln und die Konkordienformel argumentieren so; das „Gott aber“ am Satzanfang gilt als Wendepunkt.',
      },
      {
        tradition: 'Katholische Auslegung',
        text: 'Die Gnade kommt zuvor, ohne den Willen auszuschalten. Trient nahm die Wendung von den Kindern des Zorns in die Erbsündenlehre auf, hielt aber daran fest, dass der Mensch der Gnade zustimmen kann und muss.',
      },
      {
        tradition: 'Orthodoxe Tradition',
        text: 'Die östlichen Kirchen sprechen von der Sterblichkeit, die alle erben, statt von einer vererbten Schuld. Die Formulierung „von Natur“ wird als Beschreibung eines Zustands verstanden, in den man hineinwächst. Der Unterschied zwischen Ost und West ist an dieser Stelle nie beigelegt worden.',
      },
      {
        tradition: 'Wirkungsgeschichtliche Anmerkung',
        text: 'Der Fürst in der Luft hat die Vorstellungswelt vom Teufel mitgeprägt. Bis in die frühe Neuzeit galt die Luft als sein Bereich; Stürme und Seuchen wurden ihm zugeschrieben. Wetterläuten und Wetterbeschwörungen sind praktische Folgen dieser Vorstellung.',
      },
    ],
    crossRefs: [
      { book: 'kol', chapter: 2, verse: 13, note: 'Die Parallele im Kolosserbrief' },
      { book: 'roem', chapter: 6, verse: 5, note: 'Die Auferstehung in der Zukunft' },
      { book: 'eph', chapter: 6, verse: 12, note: 'Der Kampf gegen die Mächte' },
      { book: 'joh', chapter: 12, verse: 31, note: 'Der Fürst dieser Welt' },
    ],
    sources: [
      'Plutarch, Über das Verstummen der Orakel 13 (Dämonen im Luftraum)',
      'Konzil von Trient, Sitzung 5, Dekret über die Erbsünde',
      'Testament Levis 3 (Schichtung der Himmel)',
    ],
  },
  {
    book: 'eph',
    chapter: 2,
    from: 11,
    to: 22,
    title: '„hat abgebrochen den Zaun, der dazwischen war“',
    dating: DAT,
    historicalShort:
      'Ein Bild aus dem Jerusalemer Tempel: die Schranke, die Heiden bei Todesstrafe nicht überschreiten durften – und die Aussage, sie sei niedergerissen.',
    historicalLong:
      'Das Wort, das Luther mit Zaun übersetzt, bezeichnet eine Trennmauer oder Schranke. Für Leser der Zeit lag ein bestimmter Bau nahe: Im Jerusalemer Tempel trennte eine steinerne Schranke von etwa anderthalb Metern Höhe den äußeren Vorhof, den Heiden betreten durften, vom inneren Bezirk. An ihr standen in griechischer und lateinischer Sprache Warntafeln. Zwei davon sind gefunden worden – eine vollständig 1871, ein Bruchstück 1935; ihr Text lautet, kein Fremder dürfe eintreten, und wer ergriffen werde, sei selbst schuld an seinem Tod, der darauf folge. Josephus berichtet dasselbe, und die Apostelgeschichte erzählt, dass ein Aufruhr gegen Paulus mit dem Verdacht begann, er habe einen Griechen über die Schranke geführt.\n\nDass der Brief diese Mauer als abgebrochen bezeichnet, ist deshalb eine ungeheure Aussage – und wenn er nach 70 geschrieben wurde, eine doppeldeutige: Die Mauer stand dann tatsächlich nicht mehr, weil der Tempel zerstört war. Ausleger haben daraus ein Datierungsargument gemacht; sicher ist es nicht, weil das Bild auch ohne die Zerstörung verständlich wäre.\n\nDie Beschreibung der früheren Lage ist in Rechtsbegriffen gefasst. Ohne Bürgerrecht in Israel, fremd den Bundesschlüssen, ohne Hoffnung, ohne Gott in der Welt: Das erste Wort bezeichnet die Bürgerschaft einer Stadt, das zweite die vertragliche Zusage. Der Ausdruck ohne Gott lautet im Griechischen atheoi – dasselbe Wort, mit dem die Umwelt die Christen belegte, weil sie die Götter der Städte nicht anerkannten. Der Brief dreht es um.\n\nDas Ziel des Abbruchs wird zweimal benannt und ist bemerkenswert: nicht dass die einen zu den anderen kommen, sondern dass aus zweien ein neuer Mensch geschaffen wird. Das Wort für neu meint nicht das zeitlich Jüngere, sondern das Andersartige. Damit ist auch die Vorstellung abgewehrt, die Heiden würden Juden – oder umgekehrt.\n\nDer Schluss wechselt in die Bausprache. Der Ausdruck für den Eckstein kann den Grundstein an der Ecke meinen oder den Schlussstein im Gewölbe; beide Deutungen sind alt, und die Wortwahl lässt beides zu. Das Bild vom Tempel, der aus Menschen gebaut wird, kehrt in mehreren Schriften des Neuen Testaments wieder und war in Qumran vorbereitet, wo die Gemeinde sich als Heiligtum verstand, weil sie den Jerusalemer Tempel für verunreinigt hielt.',
    reception:
      'Der Abschnitt ist zum wichtigsten neutestamentlichen Text der Versöhnungsarbeit zwischen Gruppen geworden. Er wird in Erklärungen gegen Rassismus, in der Aufarbeitung der Apartheid und in Friedensinitiativen zitiert; das Bekenntnis von Belhar von 1986 nimmt ihn auf. In der Auseinandersetzung um die Mauer zwischen Israel und den palästinensischen Gebieten ist er von kirchlichen Gruppen beider Seiten angeführt worden – ein Gebrauch, der zeigt, wie unmittelbar das Bild wirkt und wie schnell es politisch wird.\n\nDie Warntafel vom Tempel gehört zu den eindrücklichsten archäologischen Funden zum Neuen Testament. Die vollständige Tafel, 1871 von Charles Clermont-Ganneau gefunden, steht heute in Istanbul; das Bruchstück von 1935 in Jerusalem. Sie belegt eine Todesdrohung, die Rom einer unterworfenen Provinz ausdrücklich zugestand – ein seltener Fall, den Josephus eigens hervorhebt.\n\nIm christlich-jüdischen Gespräch ist der Abschnitt schwierig geblieben. Die Aussage, das Gesetz sei aufgehoben worden, um Frieden zu schaffen, ist über Jahrhunderte als Abwertung des Judentums gelesen worden. Die neuere Auslegung betont, dass der Text von der trennenden Wirkung bestimmter Gebote spricht, nicht vom Gesetz als ganzem, und dass sein Ziel eine Gemeinschaft ist, in der beide bleiben, was sie sind.',
    world: [
      {
        aspect: 'macht',
        text: 'Rom gestand der Tempelverwaltung ausdrücklich zu, die Todesstrafe gegen Übertreter der Schranke zu vollstrecken – auch gegen römische Bürger. Josephus hebt diesen Ausnahmefall eigens hervor; sonst lag das Recht allein beim Statthalter.',
      },
      {
        aspect: 'raum',
        text: 'Der äußere Vorhof des Tempels war ein weiter, gepflasterter Platz mit Säulenhallen, Marktständen und Wechslern. Er stand allen offen. Die Schranke lag im Inneren und war nur anderthalb Meter hoch – sie sollte nicht abhalten, sondern kennzeichnen.',
      },
      {
        aspect: 'recht',
        text: 'Bürgerrecht war der Schlüssel zu allem: Klagerecht, Erbrecht, Schutz vor Prügelstrafe, Anteil an Verteilungen. Wer es nicht hatte, war auf Wohlwollen angewiesen. Der Text beschreibt die frühere Lage genau in diesen Begriffen.',
      },
      {
        aspect: 'glaube',
        text: 'Die Beschneidung war im römischen Alltag ein bekanntes Unterscheidungsmerkmal und Gegenstand von Spott; Martial und Juvenal machen Witze darüber, und im Bad und im Gymnasium war sie zu sehen. Beschneidung und Vorhaut sind hier keine Fachbegriffe, sondern die üblichen Gruppennamen von innen und von außen.',
      },
    ],
    terms: [
      {
        word: 'griech. to mesotoichon tou phragmou',
        rendered: 'den Zaun, der dazwischen war',
        note: 'Die Trennmauer der Umzäunung. Für Leser der Zeit lag die steinerne Schranke im Jerusalemer Tempel nahe, an der Warntafeln Heiden bei Todesstrafe den Zutritt verboten. Zwei dieser Tafeln sind gefunden worden.',
      },
      {
        word: 'griech. atheoi',
        rendered: 'ohne Gott',
        note: 'Dasselbe Wort, mit dem die Umwelt die Christen belegte, weil sie die Götter der Städte nicht anerkannten. Der Brief dreht den Vorwurf um und wendet ihn auf die frühere Lage der Angeredeten selbst.',
      },
      {
        word: 'griech. akrogoniaiou',
        rendered: 'der Eckstein',
        note: 'Der Stein an der Ecke – der Grundstein, der die Flucht bestimmt, oder der Schlussstein im Gewölbe. Beide Deutungen sind alt, und die Wortwahl lässt beides zu.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Einordnung',
        text: 'Das Bild von der niedergerissenen Mauer ist nach der Zerstörung des Tempels doppeldeutig, weil sie dann tatsächlich nicht mehr stand. Ausleger haben daraus ein Datierungsargument gemacht; sicher ist es nicht, weil das Bild auch vorher verständlich wäre.',
      },
      {
        tradition: 'Kirchenväter',
        text: 'Die Väter lasen den Abschnitt als Beschreibung der einen Kirche aus zwei Völkern. Chrysostomos hob hervor, dass nicht die einen zu den anderen kommen, sondern ein Drittes entsteht – ein Gedanke, den er gegen die Bevorzugung einer Herkunft wandte.',
      },
      {
        tradition: 'Christlich-jüdisches Gespräch',
        text: 'Die Aussage über das aufgehobene Gesetz ist über Jahrhunderte als Abwertung des Judentums gelesen worden. Die neuere Auslegung betont, dass der Text von der trennenden Wirkung bestimmter Gebote spricht und dass sein Ziel eine Gemeinschaft ist, in der beide bleiben, was sie sind.',
      },
      {
        tradition: 'Versöhnungsgeschichtliche Rezeption',
        text: 'Der Abschnitt ist zum wichtigsten neutestamentlichen Text der Versöhnungsarbeit zwischen Gruppen geworden. Das Bekenntnis von Belhar von 1986 nimmt ihn auf; in Erklärungen gegen Rassismus und in Friedensinitiativen wird er regelmäßig zitiert.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Das Bild von der Mauer ist so unmittelbar, dass es schnell politisch wird; kirchliche Gruppen haben es in gegenwärtigen Konflikten für entgegengesetzte Positionen in Anspruch genommen. Ausleger halten fest, dass der Text von einer bestimmten Schranke spricht und keine Anweisung für Grenzverläufe gibt.',
      },
    ],
    crossRefs: [
      { book: 'apg', chapter: 21, verse: 28, note: 'Der Vorwurf, einen Griechen in den Tempel geführt zu haben' },
      { book: 'jes', chapter: 57, verse: 19, note: 'Friede den Fernen und den Nahen' },
      { book: 'ps', chapter: 118, verse: 22, note: 'Der Stein, den die Bauleute verwarfen' },
      { book: '1petr', chapter: 2, verse: 5, note: 'Der Bau aus lebendigen Steinen' },
    ],
    sources: [
      'Warntafel des Jerusalemer Tempels, gefunden 1871 (Istanbul) und 1935 (Jerusalem)',
      'Josephus, Jüdischer Krieg 5,193–194',
      'Bekenntnis von Belhar, 1986',
    ],
  },
  {
    book: 'eph',
    chapter: 3,
    from: 1,
    to: 13,
    title: '„daß die Heiden Miterben seien“',
    dating: DAT,
    historicalShort:
      'Das Geheimnis, um das es geht, ist keine Lehre über Gott, sondern eine über Menschen: dass die Völker dazugehören.',
    historicalLong:
      'Der Abschnitt beginnt mit einem Satz, der abbricht. Nach „Derhalben ich, Paulus, der Gefangene Christi Jesu für euch Heiden“ folgt kein Hauptsatz; erst zwölf Verse später wird der Faden wieder aufgenommen. Solche Einschübe sind für diesen Brief kennzeichnend und in der Rhetorik als Kunstmittel bekannt, doch die Länge ist ungewöhnlich.\n\nDas Wort Geheimnis trägt den Abschnitt und wird ausdrücklich bestimmt. In den Mysterienkulten bezeichnete es das nur Eingeweihten Mitgeteilte; in der jüdischen Apokalyptik den verborgenen Ratschluss Gottes, den ein Seher erfährt. Der Brief nimmt beides auf und füllt es mit einem Inhalt, der keine Spekulation ist: dass die Völker Miterben sind, miteinverleibt und Mitgenossen der Verheißung. Drei Wörter mit derselben Vorsilbe, alle drei selten, das mittlere sonst nirgends belegt.\n\nDie Aussage, das Geheimnis sei früheren Geschlechtern nicht kundgetan worden, steht in einer Spannung zum Alten Testament, das die Verheißung an Abraham auf alle Völker bezieht. Der Brief löst sie nicht auf. Der Römerbrief argumentiert anders und führt gerade die Schriftzitate an, die den Einschluss der Völker belegen. Der Unterschied gehört zu den Beobachtungen, die für einen anderen Verfasser sprechen.\n\nBemerkenswert ist die Rolle, die der Gemeinde zugeschrieben wird: Durch sie soll den Mächten in den himmlischen Bereichen die vielfältige Weisheit Gottes kundgetan werden. Die Gemeinde ist damit nicht Empfängerin einer Botschaft, sondern selbst die Botschaft – und ihre Adressaten sind überirdisch. Das griechische Wort für vielfältig bedeutet wörtlich vielfarbig und wurde für gewebte Stoffe und für Blumenwiesen gebraucht.\n\nDie Selbstbezeichnung als allergeringster unter allen Heiligen steigert eine Wendung aus dem ersten Korintherbrief, wo der Absender sich den geringsten der Apostel nennt. Hier ist die Steigerung grammatisch übertrieben: eine Komparativform des Superlativs, die es im Griechischen eigentlich nicht gibt. Solche Steigerungen sind ein Zug der späteren Sprache und werden in der Verfasserdebatte angeführt.',
    reception:
      'Der Abschnitt ist zum Kerntext der Missionstheologie geworden. Die Aussage, die Zugehörigkeit der Völker sei das Geheimnis selbst, hat im 20. Jahrhundert die Einsicht getragen, dass Mission keine Ausweitung einer Kultur ist, sondern die Einlösung einer Zusage. Die Weltmissionskonferenzen seit Edinburgh 1910 und die missionstheologischen Erklärungen des Ökumenischen Rates berufen sich darauf.\n\nDie drei Wörter mit der Vorsilbe „mit“ sind in ökumenischen Texten aufgenommen worden, weil sie eine Gleichstellung ohne Angleichung beschreiben: Miterben, nicht Nacherben. In den Dokumenten über die Einheit der Kirchen wird der Vers regelmäßig zitiert.\n\nDie Aussage über die Gemeinde als Schauplatz, an dem den himmlischen Mächten etwas kundgetan wird, hat die Auslegung stets beschäftigt. Sie gibt der Kirche eine Bedeutung, die über ihre sichtbare Größe hinausgeht, und ist in der Ekklesiologie des 20. Jahrhunderts von Karl Barth bis in die katholische Konzilstheologie aufgenommen worden – meist mit dem Zusatz, dass daraus kein Anlass zur Selbstüberschätzung folgt, weil die Gemeinde in dieser Rolle nicht handelt, sondern gezeigt wird.',
    world: [
      {
        aspect: 'glaube',
        text: 'In den Mysterienkulten war das Geheimnis geschützt: Verrat wurde streng bestraft, und die Eingeweihten schwiegen so gründlich, dass wir bis heute wenig über die Feiern wissen. Ein Geheimnis, das ausgerufen wird, ist ein Widerspruch in sich.',
      },
      {
        aspect: 'arbeit',
        text: 'Das Wort für vielfältig heißt wörtlich vielfarbig und wurde für gewebte Stoffe gebraucht. Buntgewebte Teppiche und Gewänder galten als Höchstleistung des Handwerks; ihre Herstellung dauerte Monate.',
      },
      {
        aspect: 'gesellschaft',
        text: 'Miterbe zu sein war ein Rechtsverhältnis mit gleichem Anspruch. Wer als Nacherbe eingesetzt war, bekam erst nach einem anderen; wer Miterbe war, teilte gleichzeitig. Die Unterscheidung war jedem Testamentsvollstrecker geläufig.',
      },
      {
        aspect: 'macht',
        text: 'Die himmlischen Mächte galten als Zuschauer des Weltgeschehens; die jüdische Apokalyptik lässt sie beobachten und staunen. Eine Versammlung in Privatwohnungen zum Schauplatz für sie zu erklären, kehrt jedes Größenverhältnis um.',
      },
    ],
    terms: [
      {
        word: 'griech. mysterion',
        rendered: 'dieses Geheimnis',
        note: 'In den Mysterienkulten das nur Eingeweihten Mitgeteilte, in der jüdischen Apokalyptik der verborgene Ratschluss Gottes. Der Brief füllt beides mit einem Inhalt, der keine Spekulation ist: dass die Völker dazugehören.',
      },
      {
        word: 'griech. synkleronoma kai syssoma kai symmetocha',
        rendered: 'Miterben seien und mit eingeleibt und Mitgenossen',
        note: 'Drei seltene Wörter mit derselben Vorsilbe; das mittlere ist sonst nirgends belegt. Sie beschreiben Gleichstellung ohne Angleichung – Miterben, nicht Nacherben.',
      },
      {
        word: 'griech. polypoikilos',
        rendered: 'die mannigfaltige Weisheit',
        note: 'Wörtlich: vielfarbig. Das Wort wurde für gewebte Stoffe und Blumenwiesen gebraucht. Es beschreibt keine Menge, sondern eine Vielfalt, die als ganze zu sehen ist.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Einordnung',
        text: 'Die Aussage, das Geheimnis sei früheren Geschlechtern nicht kundgetan worden, steht in Spannung zum Römerbrief, der gerade Schriftzitate für den Einschluss der Völker anführt. Die grammatisch übertriebene Steigerung in der Selbstbezeichnung ist ein Zug späterer Sprache.',
      },
      {
        tradition: 'Missionstheologische Lesart',
        text: 'Dass die Zugehörigkeit der Völker das Geheimnis selbst ist, hat im 20. Jahrhundert die Einsicht getragen, dass Mission keine Ausweitung einer Kultur ist, sondern die Einlösung einer Zusage. Die Weltmissionskonferenzen seit 1910 berufen sich darauf.',
      },
      {
        tradition: 'Ökumenische Auslegung',
        text: 'Die drei Wörter mit der Vorsilbe „mit“ beschreiben eine Gleichstellung ohne Angleichung. In Dokumenten über die Einheit der Kirchen wird der Vers regelmäßig zitiert, weil er Gemeinschaft ohne Vereinheitlichung denkt.',
      },
      {
        tradition: 'Kirchenväter',
        text: 'Die Väter lasen die Aussage über die Mächte als Ehrung der Kirche: An ihr wird sichtbar, was sonst verborgen bleibt. Chrysostomos fügte hinzu, dass die Engel dabei lernen – ein Gedanke, der die Ordnung zwischen Himmel und Erde umkehrt.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Die Rolle der Gemeinde als Schauplatz gibt ihr eine Bedeutung, die zur Selbstüberschätzung einlädt. Ausleger halten fest, dass sie in dieser Rolle nicht handelt, sondern gezeigt wird – der Satz spricht von etwas, das an ihr geschieht, nicht von etwas, das sie leistet.',
      },
    ],
    crossRefs: [
      { book: 'kol', chapter: 1, verse: 26, note: 'Das Geheimnis im Kolosserbrief' },
      { book: 'roem', chapter: 16, verse: 25, note: 'Das verschwiegene Geheimnis' },
      { book: '1kor', chapter: 15, verse: 9, note: 'Der geringste der Apostel' },
      { book: '1mo', chapter: 12, verse: 3, note: 'Die Verheißung an alle Geschlechter' },
    ],
    sources: [
      'Weltmissionskonferenz Edinburgh 1910',
      'Papyri und Inschriften zum Schweigegebot der Mysterien',
      'Chrysostomos, Homilien zum Epheserbrief 7',
    ],
  },
  {
    book: 'eph',
    chapter: 3,
    from: 14,
    to: 19,
    title: '„die Breite und die Länge und die Tiefe und die Höhe“',
    dating: DAT,
    historicalShort:
      'Ein Gebet in kniender Haltung – ungewöhnlich für die Zeit – und vier Maße ohne genanntes Bezugswort.',
    historicalLong:
      'Gebetet wurde im Stehen, mit erhobenen Händen; so zeigen es die Darstellungen in den Katakomben, und so beschreiben es jüdische wie heidnische Quellen. Das Knien war die Haltung der Bitte in äußerster Not, der Trauer und der Unterwerfung. Wenn der Brief das Beugen der Knie eigens erwähnt, benennt er eine Ausnahme – dieselbe Haltung wie in der Gethsemane-Szene bei Lukas und bei der Steinigung des Stephanus.\n\nDer Zusatz über den Vater, von dem jede Vaterschaft im Himmel und auf Erden ihren Namen hat, ist ein Wortspiel, das im Deutschen verlorengeht: Die griechischen Wörter für Vater und für Geschlecht oder Sippe klingen ähnlich. Es geht also nicht um eine Ableitung menschlicher Vaterschaft, sondern um die Herkunft jeder Zugehörigkeit.\n\nDie vier Maße sind das Rätsel des Abschnitts. Der Text nennt kein Bezugswort – Breite, Länge, Tiefe und Höhe wovon? Die Auslegung hat vieles vorgeschlagen: das Kreuz mit seinen vier Balkenrichtungen, die Ausdehnung des Alls, die Weisheit Gottes, die Liebe Christi, die der nächste Satz nennt. Für die letzte spricht der Satzbau, für die erste eine lange Tradition, die bei Augustinus ausgeführt ist. In der antiken Zauberliteratur sind Vierheiten von Ausdehnungen als Beschreibung des Kosmos geläufig; der Brief könnte die Formel aufnehmen und auf etwas anderes lenken.\n\nDer Satz, man solle erkennen, was alle Erkenntnis übertrifft, ist ein bewusster Widerspruch. Die griechische Rhetorik nennt eine solche Figur Oxymoron. Sie stellt fest, dass das Erkennen hier an eine Grenze kommt, ohne aufzuhören – ein Gedanke, den die Mystik aufgenommen und ausgebaut hat.\n\nDer Abschnitt endet mit der Bitte, erfüllt zu werden zur ganzen Fülle Gottes. Das Wort Fülle steht in diesem Brief mehrfach und ist in den gnostischen Systemen des zweiten Jahrhunderts zu einem Fachbegriff geworden: das Pleroma als Bereich der göttlichen Wesenheiten. Ob der Brief den Begriff vorbereitet oder ob die späteren Systeme ihn von hier übernahmen, ist eine offene Frage der Forschung.',
    reception:
      'Die vier Maße sind zu einem der beständigsten Bilder der christlichen Frömmigkeit geworden. Augustinus deutete sie auf das Kreuz: die Breite des Querbalkens für die guten Werke, die Länge für die Ausdauer, die Höhe für die Hoffnung, die Tiefe für die verborgene Gnade. Diese Deutung hat die mittelalterliche Predigt und die Kreuzesfrömmigkeit geprägt und findet sich in Hymnen und in der bildenden Kunst.\n\nDer Satz über das Erkennen dessen, was alle Erkenntnis übersteigt, ist ein Grundtext der Mystik. Gregor von Nyssa, Dionysius Areopagita und über sie die gesamte negative Theologie berufen sich darauf: Gott wird erkannt, indem erkannt wird, dass er nicht zu erkennen ist. Die Wolke des Nichtwissens, eine englische Schrift des 14. Jahrhunderts, baut ganz auf diesem Gedanken.\n\nDas Knien hat sich als Gebetshaltung durchgesetzt, obwohl es in der Alten Kirche die Ausnahme war. Das Konzil von Nizäa verbot 325 ausdrücklich, an Sonntagen und in der Osterzeit kniend zu beten – ein Zeichen dafür, dass es sich bereits ausbreitete. Im Mittelalter wurde es zur Regel, verstärkt durch die Lehnsgeste des Kniefalls vor dem Herrn.',
    world: [
      {
        aspect: 'alltag',
        text: 'Gebetet wurde stehend, mit erhobenen und geöffneten Händen; die Katakombenmalereien zeigen diese Haltung durchgehend. Das Knien gehörte zur Bitte in äußerster Not, zur Trauer und zur Unterwerfung vor einem Herrscher.',
      },
      {
        aspect: 'glaube',
        text: 'In der antiken Zauberliteratur beschreiben Vierheiten von Ausdehnungen den Kosmos; Beschwörungen rufen Mächte in alle vier Richtungen an. Wer vier Maße nannte, gebrauchte eine geläufige Formel.',
      },
      {
        aspect: 'gesellschaft',
        text: 'Die griechischen Wörter für Vater und für Sippe klingen ähnlich; jede Familie, jeder Stamm, jedes Volk galt als von einem Stammvater benannt. Herkunft war Namensache, und Namen begründeten Ansprüche.',
      },
      {
        aspect: 'arbeit',
        text: 'Maße wurden mit Messschnur und Rute genommen; Bauleute und Feldmesser arbeiteten mit Länge, Breite und Höhe. Die vierte Größe, die Tiefe, gehörte zum Ausheben von Fundamenten und zum Lotsen in Häfen.',
      },
    ],
    terms: [
      {
        word: 'griech. kampto ta gonata',
        rendered: 'beuge ich meine Kniee',
        note: 'Eine Ausnahmehaltung: Gebetet wurde im Stehen mit erhobenen Händen. Das Knien gehörte zur Bitte in äußerster Not und zur Unterwerfung – dieselbe Haltung wie in Gethsemane bei Lukas.',
      },
      {
        word: 'griech. to platos kai mekos kai hypsos kai bathos',
        rendered: 'die Breite und die Länge und die Tiefe und die Höhe',
        note: 'Vier Maße ohne genanntes Bezugswort. Vorgeschlagen wurden das Kreuz, das All, die Weisheit Gottes und die Liebe Christi, die der nächste Satz nennt. Der Satzbau spricht für die letzte.',
      },
      {
        word: 'griech. gnonai te hyperballousan tes gnoseos',
        rendered: 'erkennen die Liebe Christi, die doch alle Erkenntnis übertrifft',
        note: 'Ein bewusster Widerspruch – die Rhetorik nennt die Figur Oxymoron. Sie stellt fest, dass das Erkennen an eine Grenze kommt, ohne aufzuhören. Die Mystik hat den Gedanken aufgenommen und ausgebaut.',
      },
    ],
    interpretations: [
      {
        tradition: 'Augustinische Tradition',
        text: 'Augustinus deutete die vier Maße auf das Kreuz: die Breite des Querbalkens für die guten Werke, die Länge für die Ausdauer, die Höhe für die Hoffnung, die Tiefe für die verborgene Gnade. Diese Deutung hat die mittelalterliche Predigt und die Kreuzesfrömmigkeit geprägt.',
      },
      {
        tradition: 'Mystische Tradition',
        text: 'Der Satz über das Erkennen dessen, was alle Erkenntnis übersteigt, ist ein Grundtext der negativen Theologie. Gregor von Nyssa und Dionysius Areopagita berufen sich darauf; die Wolke des Nichtwissens aus dem 14. Jahrhundert baut ganz auf diesem Gedanken.',
      },
      {
        tradition: 'Historisch-kritische Einordnung',
        text: 'Die Vierheit von Ausdehnungen ist aus der antiken Zauberliteratur als Beschreibung des Kosmos bekannt. Der Brief könnte die Formel aufnehmen und auf die Liebe Christi lenken – eine Umbesetzung, die zu seiner Art passt, besetzte Begriffe zu übernehmen.',
      },
      {
        tradition: 'Liturgische Rezeption',
        text: 'Das Knien hat sich als Gebetshaltung durchgesetzt, obwohl es in der Alten Kirche die Ausnahme war. Das Konzil von Nizäa verbot 325 ausdrücklich das Knien an Sonntagen und in der Osterzeit – ein Zeichen dafür, dass es sich ausbreitete.',
      },
      {
        tradition: 'Forschungsgeschichtliche Anmerkung',
        text: 'Das Wort Fülle ist in den gnostischen Systemen des zweiten Jahrhunderts zum Fachbegriff geworden. Ob der Brief den Begriff vorbereitet oder ob die späteren Systeme ihn von hier übernahmen, ist offen und gehört zu den Fragen, an denen die Datierung hängt.',
      },
    ],
    crossRefs: [
      { book: 'lk', chapter: 22, verse: 41, note: 'Das Knien in Gethsemane' },
      { book: 'apg', chapter: 7, verse: 60, note: 'Stephanus kniet nieder' },
      { book: 'hi', chapter: 11, verse: 8, note: 'Höher als der Himmel, tiefer als die Hölle' },
      { book: 'eph', chapter: 1, verse: 23, note: 'Die Fülle, schon einmal genannt' },
    ],
    sources: [
      'Augustinus, Brief 140 an Honoratus (Deutung der vier Maße)',
      'Konzil von Nizäa 325, Kanon 20',
      'Die Wolke des Nichtwissens, England, 14. Jahrhundert',
    ],
  },
];
