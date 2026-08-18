const DAT = {
  events: 'Die Szenen spielen am See Genezareth und in Kapernaum kurz vor einem Passafest, etwa 28 oder 29 n. Chr.',
  written: 'Das Johannesevangelium wird meist auf 90 bis 110 n. Chr. datiert; die Brotrede folgt dem Aufbau einer Synagogenpredigt über ein Schriftwort.',
  epoch: 'roemer',
};

export const ARTICLES = [
  {
    book: 'joh',
    chapter: 6,
    from: 1,
    to: 21,
    title: '„fünf Gerstenbrote und zwei Fische“',
    historicalShort:
      'Am See wird eine große Menge mit den Vorräten eines einzigen Knaben satt. Die Leute wollen Jesus daraufhin zum König machen, und er entzieht sich. In der Nacht kommt er den Jüngern auf dem Wasser entgegen.',
    historicalLong:
      'Die Speisung ist die einzige Erzählung, die in allen vier Evangelien steht. Die Fassung des vierten unterscheidet sich in mehreren Einzelheiten. Philippus und Andreas werden mit Namen genannt; die Vorräte gehören einem Knaben; und es sind ausdrücklich Gerstenbrote. Gerste war das Brot der Armen, billiger als Weizen und im Frühjahr als erstes geerntet. Damit ist zugleich das Vorbild angezeigt: im zweiten Königsbuch bringt ein Mann dem Propheten Elisa zwanzig Gerstenbrote, hundert Menschen werden davon satt, und es bleibt übrig.\n\nDie Preisangabe des Philippus ist genau bemessen. Zweihundert Groschen sind zweihundert Tagelöhne; das ist der Betrag, den ein Arbeiter in zwei Dritteln eines Jahres verdient. Er reicht nach seiner Rechnung nicht einmal für einen Bissen je Person.\n\nDer Zusatz über die zwölf Körbe und die Anweisung, die Brocken zu sammeln, damit nichts umkomme, steht so nur hier. Das Sammeln von Speiseresten war Vorschrift und Gewohnheit; verdorbenes Brot galt als schwerer Mißstand.\n\nDer politische Zug ist ebenfalls diesem Evangelium eigen: die Menge will ihn ergreifen und zum König machen. Das ist im Zusammenhang der Zeit nicht abwegig. Josephus berichtet von mehreren Gestalten, die Anhänger in die Wüste führten und Zeichen versprachen, unter ihnen Theudas und ein namentlich nicht genannter Ägypter; in beiden Fällen ging die römische Verwaltung mit Truppen gegen sie vor. Wer in der Einöde Brot verschaffte, rief die Erinnerung an Mose und das Manna auf, und daraus konnte rasch eine Bewegung werden.\n\nDer nächtliche Gang über den See folgt unmittelbar. Die Entfernungsangabe von fünfundzwanzig bis dreißig Stadien entspricht etwa fünf bis sechs Kilometern; der See ist an dieser Stelle rund zwölf Kilometer breit, sie waren also etwa in der Mitte. Der Zuspruch lautet im Griechischen wörtlich ich bin. Das kann schlicht heißen, ich bin es; es kann aber auch die Formel aufnehmen, mit der Gott sich am Dornbusch und im Jesajabuch selbst benennt. Diese Doppeldeutigkeit ist in diesem Evangelium durchgehend gewollt.',
    reception:
      'Die Speisung gehört zu den frühesten Bildmotiven der Christenheit. In den Katakomben Roms erscheinen Brotkörbe und Fische seit dem dritten Jahrhundert, oft neben der Figur des Hirten. Die Kirche von Tabgha am Nordwestufer des Sees bewahrt ein Bodenmosaik aus dem fünften Jahrhundert mit einem Korb zwischen zwei Fischen; es gehört zu den bekanntesten Bildern des Heiligen Landes.\n\nDie zwölf Körbe sind früh auf die zwölf Stämme und die zwölf Apostel gedeutet worden. In der Sozialgeschichte der Kirche hat der Text eine andere Wirkung entfaltet: er steht hinter der Armenspeisung als kirchlicher Aufgabe, von den Armenpflegern der Alten Kirche über die mittelalterlichen Spitäler bis zu den Tafeln und Mittagstischen der Gegenwart. Die Anweisung, die Reste zu sammeln, damit nichts verderbe, wird in der Diskussion über Lebensmittelverschwendung regelmäßig angeführt.\n\nDer Versuch, ihn zum König zu machen, hat in der neueren Auslegung an Aufmerksamkeit gewonnen. Er zeigt, daß die Bewegung von außen als politisch wahrgenommen wurde, und macht verständlich, warum die römische Verwaltung am Ende mit einem Kreuz antwortete. In der lateinamerikanischen Theologie ist die Szene entsprechend gelesen worden: der Text weise die Königsmacherei zurück und behalte doch die Frage nach dem Brot als das eigentliche Thema.',
    world: [
      {
        aspect: 'alltag',
        text: 'Gerstenbrot war das Brot der ärmeren Leute; Weizen kostete etwa das Doppelte. Die Gerste wurde als erstes Getreide im April geerntet, was zu der Bemerkung paßt, das Passafest sei nahe gewesen.',
      },
      {
        aspect: 'arbeit',
        text: 'Am See wurde mit Wurf- und Schleppnetzen gefischt. Der Fang wurde gesalzen oder eingelegt und weit gehandelt; getrockneter Kleinfisch war eine gewöhnliche Wegzehrung und paßt zu den zwei Fischen des Knaben.',
      },
      {
        aspect: 'macht',
        text: 'Josephus berichtet von mehreren Anführern, die Anhänger in die Wüste führten und Wunder ankündigten. Die Verwaltung reagierte jedesmal militärisch. Eine Menge, die jemanden zum König ausrufen will, war deshalb eine unmittelbare Gefahr.',
      },
      {
        aspect: 'raum',
        text: 'Der See mißt etwa einundzwanzig Kilometer in der Länge und bis zu zwölf in der Breite. Fallwinde aus den Schluchten der Golanhöhen können ihn binnen kurzem aufwühlen; Ruderboote kamen dann kaum voran.',
      },
    ],
    terms: [
      {
        word: 'griech. diakosiōn dēnariōn',
        rendered: 'zweihundert Groschen',
        note: 'Zweihundert Tagelöhne, also der Verdienst von etwa acht Monaten. Die Zahl bemißt den Abstand zwischen Bedarf und Mitteln.',
      },
      {
        word: 'griech. pente artous krithinous',
        rendered: 'fünf Gerstenbrote',
        note: 'Gerste war das billigere Getreide und galt als Nahrung der Armen. Die Elisaerzählung des zweiten Königsbuchs nennt ebenfalls Gerstenbrote.',
      },
      {
        word: 'griech. dōdeka kophinous',
        rendered: 'zwölf Körbe',
        note: 'Der Korb war ein geflochtenes Behältnis für Wegzehrung. Die Zwölfzahl ist früh auf die Stämme Israels und auf die Apostel bezogen worden.',
      },
      {
        word: 'griech. egō eimi',
        rendered: "Ich bin's",
        note: 'Wörtlich ich bin. Der Ausdruck kann eine schlichte Selbstvorstellung sein oder die Selbstbenennung Gottes am Dornbusch aufnehmen.',
      },
    ],
    interpretations: [
      {
        tradition: 'historisch-kritisch',
        text: 'Die Speisung steht in allen vier Evangelien, bei Markus und Matthäus sogar zweimal. Die Fassung des vierten Evangeliums zeigt eigene Züge, die auf eine selbständige Überlieferung deuten; die Nähe zur Elisaerzählung ist in allen Fassungen erkennbar.',
      },
      {
        tradition: 'katholisch',
        text: 'Die Handlungsfolge von Nehmen, Danken und Austeilen entspricht der Feier der Eucharistie und wird als deren Vorabbildung gelesen. Die Sorge um die Reste hat in der Ehrfurcht vor den verbleibenden Gaben eine liturgische Entsprechung.',
      },
      {
        tradition: 'reformatorisch',
        text: 'Betont wird, daß das Vorhandene zunächst lächerlich wenig ist und daß gerade damit gearbeitet wird. Die Zurückweisung der Königsmacherei gilt als Beispiel dafür, daß Christus sich nicht in Dienst nehmen läßt.',
      },
      {
        tradition: 'orthodox',
        text: 'Die Väter deuten die fünf Brote auf die fünf Bücher Mose und das Zeichen auf die Fülle, die aus der Schrift kommt. Der Gang über das Wasser gehört in den östlichen Gesängen zu den Erweisen der göttlichen Macht über die Schöpfung.',
      },
      {
        tradition: 'befreiungstheologisch',
        text: 'Im Mittelpunkt steht, daß Menschen satt werden und daß der Text die Frage nach dem Brot nicht ins Geistliche auflöst. Die Zurückweisung des Königtums wird als Absage an eine Herrschaft gelesen, die die Hungernden verwaltet, statt sie zu speisen.',
      },
    ],
    crossRefs: [
      { book: '2koe', chapter: 4, verse: 42, note: 'Elisa speist hundert Männer mit zwanzig Gerstenbroten, und es bleibt übrig.' },
      { book: 'mk', chapter: 6, verse: 32, note: 'Die Speisung bei Markus, mit der Beschreibung der Menge wie Schafe ohne Hirten.' },
      { book: '2mo', chapter: 16, verse: 4, note: 'Das Brot vom Himmel in der Wüste, auf das die folgende Rede zurückgreift.' },
      { book: '2mo', chapter: 3, verse: 14, note: 'Die Selbstbenennung Gottes am Dornbusch, die in dem Zuspruch mitklingen kann.' },
    ],
    dating: DAT,
  },
  {
    book: 'joh',
    chapter: 6,
    from: 22,
    to: 40,
    title: '„Ich bin das Brot des Lebens“',
    historicalShort:
      'In Kapernaum sucht die Menge nach dem Speisenden und wird auf eine andere Speise verwiesen. Aus dem Streit über das Manna entwickelt sich eine Rede, in der zum ersten Mal das Wort steht, mit dem dieses Evangelium arbeitet.',
    historicalLong:
      'Die Rede ist nach einem erkennbaren Muster gebaut. Sie geht von einem Schriftwort aus, das die Gesprächspartner selbst einbringen: er gab ihnen Brot vom Himmel zu essen. Der Satz steht im achtundsiebzigsten Psalm und geht auf die Mannaerzählung zurück. Danach wird das Zitat Wort für Wort durchgegangen und neu bestimmt: nicht Mose hat gegeben, sondern der Vater gibt; nicht damals, sondern jetzt; und das Brot ist nicht das Manna, sondern der, der vom Himmel herabkommt. Peder Borgen hat 1965 gezeigt, daß dieses Verfahren dem der jüdischen Synagogenpredigt entspricht, in der ein Vers vorgelesen und dann Glied für Glied ausgelegt wird. Die Rede ist damit keine freie Erfindung einer fremden Denkform, sondern folgt einem vertrauten Muster.\n\nDie Erwartung im Hintergrund ist bezeugt. Mehrere jüdische Texte der Zeit rechnen damit, daß in der kommenden Zeit das Manna wiederkehren werde; die syrische Baruchapokalypse sagt es ausdrücklich. Die Forderung nach einem Zeichen ist deshalb nicht bloß Trotz: wer beansprucht, mehr als Mose zu sein, müßte etwas bringen, was das Manna übertrifft.\n\nZwei Einzelheiten sind bemerkenswert. Das Wort, mit dem der Vater den Menschensohn versiegelt hat, stammt aus dem Rechts- und Geschäftsleben; ein Siegel beglaubigt eine Urkunde oder eine Ware und macht sie unbestreitbar. Und die Frage der Menge nach den Werken Gottes wird mit einer Einzahl beantwortet: das Werk Gottes sei, an den zu glauben, den er gesandt hat. Aus dem Plural der zu leistenden Werke wird ein einziges, das nicht geleistet, sondern empfangen wird.\n\nDer Satz, mit dem der Abschnitt endet, ist der erste einer Reihe. Sieben Sätze dieses Evangeliums verbinden die Formel ich bin mit einem Bild: Brot, Licht, Tür, Hirte, Auferstehung und Leben, Weg, Weinstock. Sie sind kein Zufall der Überlieferung, sondern ein Aufbauprinzip des Buches.',
    reception:
      'Der Satz über das Werk Gottes ist in der Reformationszeit zu einer Schlüsselstelle geworden. Er wurde gegen die Vorstellung angeführt, der Mensch könne durch eine Vielzahl von Leistungen vor Gott bestehen, und stand neben den paulinischen Aussagen über Glauben und Werke. Die katholische Auslegung hält dagegen, daß der Glaube selbst als Tat beschrieben wird und daß der Text nicht zwischen Glauben und Handeln trennt.\n\nDas Brot des Lebens ist zu einer der geläufigsten Bezeichnungen für die Eucharistie geworden. Der Ausdruck steht in Meßgesängen, in Kirchenliedern und über den Portalen zahlloser Kirchen. In der Sprache der Diakonie wird er zugleich auf das wirkliche Brot bezogen; die Verbindung von Sättigung und Zuspruch gehört zu den ältesten Selbstverständlichkeiten christlicher Armenfürsorge.\n\nDie Wendung vom Jüngsten Tag, die in diesem Abschnitt viermal begegnet, hat die deutsche Sprache geprägt. Sie steht in Bekenntnissen, in Kirchenliedern und in der Redensart vom Jüngsten Gericht. In der Auslegung ist sie viel diskutiert worden, weil sie neben Sätzen steht, die das ewige Leben als bereits gegenwärtig beschreiben; wie beide Reihen zusammengehören, gehört zu den offenen Fragen dieses Evangeliums.',
    world: [
      {
        aspect: 'glaube',
        text: 'Die Erwartung, das Manna werde in der kommenden Zeit wiederkehren, ist in jüdischen Schriften des ersten und zweiten Jahrhunderts bezeugt. Sie verband die Rettung am Ende mit der Rettung am Anfang und machte Mose zum Maßstab jedes künftigen Führers.',
      },
      {
        aspect: 'recht',
        text: 'Ein Siegel aus Ton oder Wachs beglaubigte Urkunden, verschloß Warenballen und wies den Eigentümer aus. Es zu brechen war strafbar. Die Rede vom Versiegeln bezeichnet damit eine amtliche Bestätigung.',
      },
      {
        aspect: 'alltag',
        text: 'Brot war die Hauptnahrung und machte den größten Teil des täglichen Bedarfs aus. Es wurde täglich gebacken und am selben Tag gegessen; Vorräte hielten sich nicht. Die Bitte um das tägliche Brot beschreibt eine unmittelbare Erfahrung.',
      },
      {
        aspect: 'gesellschaft',
        text: 'Die Synagoge war Versammlungsort, Schule und Gerichtsstätte zugleich. In ihr wurde ein Schriftabschnitt gelesen und ausgelegt; die Auslegung ging vom Wortlaut aus und arbeitete sich an ihm entlang, wie es diese Rede tut.',
      },
    ],
    terms: [
      {
        word: 'griech. esphragisen',
        rendered: 'versiegelt',
        note: 'Ein Ausdruck des Rechts- und Geschäftslebens. Das Siegel beglaubigt eine Urkunde oder eine Ware und macht die Herkunft unbestreitbar.',
      },
      {
        word: 'griech. ta erga tou theou',
        rendered: 'Gottes Werke wirken',
        note: 'Die Frage steht im Plural, die Antwort in der Einzahl. Aus vielen zu leistenden Werken wird ein einziges, das im Glauben besteht.',
      },
      {
        word: 'griech. arton ek tou ouranou',
        rendered: 'Brot vom Himmel',
        note: 'Ein Zitat aus dem achtundsiebzigsten Psalm über das Manna. Die Rede legt es Glied für Glied aus, wie es in der Synagogenpredigt üblich war.',
      },
      {
        word: 'griech. en tē eschatē hēmera',
        rendered: 'am Jüngsten Tage',
        note: 'Die Wendung kommt in diesem Kapitel viermal vor. Sie steht neben Sätzen, die das ewige Leben als gegenwärtig beschreiben.',
      },
    ],
    interpretations: [
      {
        tradition: 'historisch-kritisch',
        text: 'Der Aufbau folgt dem Muster der Synagogenpredigt: ein Schriftwort wird zitiert und gliedweise ausgelegt. Daraus wird geschlossen, daß die Rede in einem jüdisch geprägten Umfeld entstand und nicht aus griechischer Philosophie stammt.',
      },
      {
        tradition: 'katholisch',
        text: 'Die Rede wird auf die Eucharistie hin gelesen, ohne daß dieser Abschnitt schon von Fleisch und Blut spricht. Das Brot des Lebens ist zunächst der Sprechende selbst; die sakramentale Deutung setzt später im Kapitel ein.',
      },
      {
        tradition: 'reformatorisch',
        text: 'Der Satz über das eine Werk Gottes gehört zu den Kernstellen der Rechtfertigungslehre. Luther bezog das ganze Kapitel auf den Glauben und bestritt, daß es vom Abendmahl handle.',
      },
      {
        tradition: 'orthodox',
        text: 'Die östliche Auslegung verbindet das Brot des Lebens mit der Menschwerdung: was vom Himmel herabkommt, ist der Fleischgewordene selbst. Die liturgischen Texte nehmen die Formel in den Gesängen zur Kommunion auf.',
      },
      {
        tradition: 'jüdisch',
        text: 'Jüdische Ausleger weisen darauf hin, daß die Auslegungstechnik der Rede der rabbinischen entspricht und daß die Erwartung eines wiederkehrenden Manna in jüdischen Texten belegt ist. Bestritten wird die Folgerung, nicht Mose habe gegeben.',
      },
    ],
    crossRefs: [
      { book: 'ps', chapter: 78, verse: 24, note: 'Er ließ Manna auf sie regnen und gab ihnen Himmelsbrot: das ausgelegte Zitat.' },
      { book: '2mo', chapter: 16, verse: 15, note: 'Die Erzählung vom Manna, aus der die Frage nach dem Zeichen kommt.' },
      { book: 'joh', chapter: 4, verse: 14, note: 'Das Wasser, das zur Quelle wird: dieselbe Bewegung vom Stofflichen zum Bleibenden.' },
      { book: 'roem', chapter: 4, verse: 11, note: 'Das Siegel als Beglaubigung, bei Paulus auf die Beschneidung bezogen.' },
    ],
    dating: DAT,
  },
  {
    book: 'joh',
    chapter: 6,
    from: 41,
    to: 59,
    title: '„Wer mein Fleisch isset und trinket mein Blut“',
    historicalShort:
      'Die Rede geht vom Brot zum Fleisch über und fordert, das Blut des Menschensohnes zu trinken. Für jüdische Hörer war das ein doppelter Anstoß, denn der Genuß von Blut ist in der Tora ausdrücklich verboten.',
    historicalLong:
      'Das Murren, mit dem der Abschnitt einsetzt, ist mit Bedacht gewählt. Dasselbe Wort steht in der griechischen Übersetzung des zweiten Buchs Mose für das Murren Israels in der Wüste, und zwar gerade in der Mannaerzählung. Der Einwand selbst ist naheliegend: man kennt die Familie.\n\nIn der Mitte des Abschnitts vollzieht sich ein Wechsel, der seit langem diskutiert wird. Bis dahin war vom Brot die Rede und vom Glauben; von der Mitte des einundfünfzigsten Verses an ist vom Fleisch die Rede und vom Essen. Auch das Wort wechselt: statt des gewöhnlichen Verbs für essen steht von da an ein derberes, das kauen oder nagen bedeutet und sonst vom Fressen der Tiere gebraucht wird. Rudolf Bultmann hielt diesen Teil deshalb für den Einschub eines späteren Bearbeiters, der die Rede auf das Abendmahl hin ergänzte. Andere halten den Wechsel für gewollt und sehen darin die Zuspitzung, auf die die ganze Rede hinausläuft. Handschriftlich fehlt der Abschnitt nirgends.\n\nDer eigentliche Anstoß liegt beim Blut. Das dritte Buch Mose verbietet den Genuß von Blut mit größter Schärfe und begründet es damit, daß im Blut das Leben ist; schon die Noahgebote im ersten Buch Mose enthalten dieses Verbot, und es gilt in der jüdischen Überlieferung auch für Nichtjuden. Wer Blut zu trinken anbietet, verlangt nicht etwas Ungewohntes, sondern etwas Untersagtes. Die Empörung im zweiundfünfzigsten Vers ist deshalb keine Begriffsstutzigkeit.\n\nDas Zitat, alle würden von Gott gelehrt sein, stammt aus dem Jesajabuch und steht dort in einem Trostwort an das zerstörte Jerusalem. Verwandt ist die Verheißung des neuen Bundes bei Jeremia, nach der niemand mehr den anderen belehren muß. Beide Stellen sind in der Reformationszeit für das innere Zeugnis des Geistes angeführt worden.\n\nDie Schlußbemerkung nennt den Ort: die Synagoge in Kapernaum. Von ihr sind die Fundamente erhalten. Der weiße Kalksteinbau, den man heute sieht, stammt aus dem vierten oder fünften Jahrhundert, steht aber auf einem älteren Unterbau aus schwarzem Basalt, der ins erste Jahrhundert gehört. Es ist möglich, daß dies das Gebäude ist, von dem der Text spricht.',
    reception:
      'Diese Verse haben den Christen in den ersten Jahrhunderten den Vorwurf des Kannibalismus eingetragen. Die Anklagen sind bezeugt: Minucius Felix läßt in seinem Dialog Octavius einen heidnischen Sprecher behaupten, die Christen töteten bei ihren Zusammenkünften ein Kind und tränken sein Blut, und Eusebius überliefert, daß bei der Verfolgung in Lyon im Jahr 177 unter der Folter entsprechende Aussagen erpreßt wurden. Die Apologeten des zweiten Jahrhunderts wandten erhebliche Mühe darauf, den Vorwurf zu widerlegen.\n\nIm Abendmahlsstreit der Reformationszeit spielte das Kapitel eine überraschende Rolle. Zwingli führte den Vers, das Fleisch sei nichts nütze, gegen die leibliche Gegenwart Christi im Mahl an. Luther antwortete nicht, indem er den Vers anders auslegte, sondern indem er bestritt, daß dieses Kapitel überhaupt vom Abendmahl handle; es rede vom Glauben. Damit standen beide Seiten gegen die Erwartung: der Verfechter der Realpräsenz bestritt den sakramentalen Bezug der Stelle, sein Gegner berief sich auf sie. Die katholische Auslegung liest die Verse dagegen seit jeher eucharistisch; das Konzil von Trient nahm 1551 darauf Bezug.\n\nIn der Neuzeit hat die Härte der Sprache eine eigene Aufmerksamkeit gefunden. Daß der Text ein Wort für Essen wählt, das nach Kauen klingt, wird in der neueren Auslegung nicht mehr weggeglättet. Es gilt als Zeichen dafür, daß hier eine Zumutung ausgesprochen und nicht ein Bild angeboten wird.',
    world: [
      {
        aspect: 'glaube',
        text: 'Das Verbot, Blut zu genießen, gehört zu den strengsten Bestimmungen der Tora und wird damit begründet, daß im Blut das Leben ist. Es galt nach jüdischer Auffassung auch für Nichtjuden und wurde beim Schlachten durch sorgfältiges Ausbluten beachtet.',
      },
      {
        aspect: 'gesellschaft',
        text: 'In einer Ortschaft von wenigen hundert Einwohnern kannte man die Familien. Der Einwand, man kenne Vater und Mutter, ist die naheliegende Antwort auf einen Anspruch, der die Herkunft übersteigt.',
      },
      {
        aspect: 'raum',
        text: 'Kapernaum lag am Nordufer des Sees an der Straße nach Damaskus, mit einem Zollposten und einer Fischereisiedlung. Die Fundamente der Synagoge sind erhalten; unter dem späteren weißen Bau liegt ein älterer aus schwarzem Basalt.',
      },
      {
        aspect: 'alltag',
        text: 'Fleisch kam auf den Tisch der einfachen Leute nur zu Festen. Es wurde geschlachtet, ausgeblutet und rasch verzehrt, weil es sich nicht hielt. Die Rede vom Essen des Fleisches traf damit auf eine sehr konkrete Vorstellung.',
      },
    ],
    terms: [
      {
        word: 'griech. egongyzon',
        rendered: 'Da murrten die Juden',
        note: 'Dasselbe Wort steht in der griechischen Bibel für das Murren Israels in der Wüste, und zwar in der Mannaerzählung selbst.',
      },
      {
        word: 'griech. ean mē ho patēr helkysē auton',
        rendered: 'es sei denn, daß ihn ziehe der Vater',
        note: 'Das Verb meint ein wirkliches Ziehen, wie beim Netz oder beim Schwert. In der Gnadenlehre ist der Vers vielfach herangezogen worden.',
      },
      {
        word: 'griech. esontai pantes didaktoi theou',
        rendered: 'Sie werden alle von Gott gelehrt sein',
        note: 'Ein Zitat aus dem Jesajabuch, verwandt mit der Verheißung des neuen Bundes bei Jeremia, nach der keiner mehr den anderen lehren muß.',
      },
      {
        word: 'griech. en synagōgē',
        rendered: 'in der Schule',
        note: 'Gemeint ist die Synagoge von Kapernaum. Luther gibt das Wort mit Schule wieder, wie er es durchgehend tut.',
      },
    ],
    interpretations: [
      {
        tradition: 'historisch-kritisch',
        text: 'Der Wechsel von Brot zu Fleisch und vom gewöhnlichen zum derben Wort für Essen wird von einem Teil der Forschung als späterer Einschub gedeutet, der die Rede auf das Abendmahl hin ergänzt. Handschriftliche Stützen dafür gibt es nicht.',
      },
      {
        tradition: 'katholisch',
        text: 'Die Verse gelten als Grundstelle der Eucharistielehre. Trient bezog sich 1551 auf sie, und die Fronleichnamsliturgie nimmt sie auf; die Wirklichkeit der Gegenwart wird gerade aus der Härte der Formulierung abgeleitet.',
      },
      {
        tradition: 'reformatorisch',
        text: 'Luther bestritt, daß das Kapitel vom Abendmahl handle, und las es vom Glauben her. Zwingli führte umgekehrt den Vers über das nutzlose Fleisch gegen die leibliche Gegenwart an. Die reformierte Tradition folgt im wesentlichen der geistlichen Deutung.',
      },
      {
        tradition: 'orthodox',
        text: 'Die östliche Kirche liest die Verse eucharistisch und verbindet sie mit der Vorstellung, daß der Mensch durch die Teilhabe an den Gaben verwandelt wird. Die Formulierung vom Bleiben ineinander gehört zu den Grundworten dieser Lehre.',
      },
      {
        tradition: 'jüdisch',
        text: 'Aus jüdischer Sicht ist die Aufforderung, Blut zu trinken, nicht befremdlich, sondern verboten. Das Blutverbot gehört zu den Bestimmungen, die auch für Nichtjuden gelten; die Empörung im Text ist damit sachlich begründet.',
      },
    ],
    crossRefs: [
      { book: '3mo', chapter: 17, verse: 10, note: 'Das Verbot, Blut zu genießen, mit der Begründung, daß im Blut das Leben ist.' },
      { book: 'jes', chapter: 54, verse: 13, note: 'Alle deine Kinder werden vom Herrn gelehrt sein: das zitierte Prophetenwort.' },
      { book: '2mo', chapter: 16, verse: 2, note: 'Das Murren der Gemeinde in der Wüste, auf das der Ausdruck anspielt.' },
      { book: '1kor', chapter: 11, verse: 27, note: 'Die Warnung vor unwürdigem Essen und Trinken beim Herrenmahl.' },
    ],
    dating: DAT,
  },
  {
    book: 'joh',
    chapter: 6,
    from: 60,
    to: 71,
    title: '„Das ist eine harte Rede“',
    historicalShort:
      'Viele Anhänger halten die Rede nicht aus und gehen weg. Auf die Frage, ob auch die Zwölf gehen wollen, antwortet Petrus mit einem Bekenntnis, und der Abschnitt endet mit einem Wort über einen aus ihrer Mitte.',
    historicalLong:
      'Das griechische Wort für hart meint nicht schwer verständlich, sondern unerträglich. Die Hörer beschweren sich nicht über Dunkelheit, sondern über eine Zumutung. Was folgt, löst sie nicht auf.\n\nDer Satz über das Auffahren des Menschensohnes bleibt im Griechischen unvollendet: wie, wenn ihr denn sehen werdet. Der Nachsatz fehlt. Zwei Ergänzungen werden erwogen: dann wird sich der Anstoß auflösen, oder dann wird er noch größer. Der Text entscheidet nicht.\n\nDer folgende Vers ist der schwierigste des Kapitels. Es heißt, der Geist mache lebendig, das Fleisch sei nichts nütze, und das unmittelbar nachdem das Fleisch des Menschensohnes die rechte Speise genannt wurde. Die verbreitete Auflösung unterscheidet zwei Bedeutungen: Fleisch bezeichnet hier wie im dritten Kapitel den Menschen in seiner Begrenztheit, nicht das Fleisch dessen, von dem die Rede war. Wer den Vers gegen die sakramentale Deutung des Kapitels wendet, muß diesen Bedeutungswechsel bestreiten; genau darüber ist im sechzehnten Jahrhundert gestritten worden.\n\nDann geschieht, was in keinem anderen Evangelium erzählt wird: viele Anhänger verlassen ihn. Es ist kein Streit mit Gegnern, sondern der Weggang von Menschen, die bis dahin mitgegangen waren. Die Frage an die Zwölf ist im Griechischen so gestellt, daß sie eine verneinende Antwort erwartet, und doch ist sie offen.\n\nDas Bekenntnis des Petrus steht an der Stelle, an der die drei anderen Evangelien das Bekenntnis bei Cäsarea Philippi berichten. Der Wortlaut ist anders und geht von der Erfahrung aus: wohin sollen wir gehen. Es ist kein Satz der Gewißheit, sondern der Ausweglosigkeit im guten Sinn.\n\nDas Schlußwort über einen Teufel unter den Zwölfen greift der Passion vor. Der Erzähler löst es sogleich auf und nennt Judas. Der Beiname Ischariot ist nicht sicher zu erklären; erwogen werden eine Herkunftsangabe, Mann aus Kerijot, und eine Verbindung mit den Sikariern, den Dolchmännern des Aufstands, wobei diese Gruppe erst Jahrzehnte später bezeugt ist.',
    reception:
      'Die Frage, ob auch sie weggehen wollten, ist zu einem der meistzitierten Sätze der Seelsorge geworden. Sie steht in Predigten über Kirchenaustritte, in Ansprachen bei Glaubenskrisen und in der Literatur; Romain Rolland und andere haben sie aufgenommen. Die Antwort des Petrus wird dabei meist als Bekenntnis gelesen; in der neueren Auslegung wird betont, daß sie zunächst eine Frage ist und daß der Text den Weggang der anderen nicht kommentiert.\n\nDer Vers über das nutzlose Fleisch gehört zu den meistumstrittenen der Bibel. Er wurde im Abendmahlsstreit der Reformationszeit von Zwingli gegen die leibliche Gegenwart Christi angeführt und ist seither in jeder Auseinandersetzung über das Verhältnis von Zeichen und Sache aufgetaucht. In der Alten Kirche hatten ihn umgekehrt Gruppen benutzt, die die Menschwerdung bestritten; Irenäus wendet sich ausdrücklich gegen diesen Gebrauch.\n\nDer Massenabfall in diesem Kapitel hat in der Geschichte der Kirche eine besondere Aufmerksamkeit gefunden, wo Gemeinden schrumpften. Er wird angeführt, um festzuhalten, daß Zahlen kein Maßstab sind, und ebenso, um daran zu erinnern, daß eine Verkündigung, die niemanden mehr anstößt, den Text nicht mehr wiedergibt. Beide Verwendungen sind verbreitet; der Abschnitt selbst zieht keine Folgerung.',
    world: [
      {
        aspect: 'gesellschaft',
        text: 'Schüler konnten einen Lehrer verlassen; das war kein Bruch mit einer Institution, sondern das Ende eines persönlichen Verhältnisses. Wer ging, nahm damit auch die Zugehörigkeit zur Gruppe zurück, die sich um den Lehrer gebildet hatte.',
      },
      {
        aspect: 'glaube',
        text: 'Die Vorstellung, daß Gott Menschen zieht oder ihnen den Glauben gibt, steht in den Psalmen und in den Prophetenbüchern neben der Aufforderung zur Umkehr. Beide Reihen bestanden nebeneinander und wurden nicht gegeneinander ausgespielt.',
      },
      {
        aspect: 'macht',
        text: 'Der Beiname Ischariot wird verschieden erklärt. Neben der Herkunft aus einem Ort namens Kerijot wird eine Verbindung zu den Dolchmännern erwogen, einer Gruppe des jüdischen Aufstands; diese ist allerdings erst für die sechziger Jahre bezeugt.',
      },
      {
        aspect: 'alltag',
        text: 'Wer einer Wandergruppe folgte, gab Arbeit und Haushalt für diese Zeit auf. Umkehren bedeutete, an den bisherigen Platz zurückzukehren, und war praktisch jederzeit möglich; die Bindung beruhte nicht auf einem Vertrag.',
      },
    ],
    terms: [
      {
        word: 'griech. sklēros estin ho logos houtos',
        rendered: 'eine harte Rede',
        note: 'Das Wort meint unerträglich, nicht unverständlich. Der Einwand richtet sich gegen die Zumutung, nicht gegen die Dunkelheit.',
      },
      {
        word: 'griech. hē sarx ouk ōphelei ouden',
        rendered: 'das Fleisch ist nichts nütze',
        note: 'Der Ausdruck bezeichnet hier wahrscheinlich den Menschen in seiner Begrenztheit, wie im dritten Kapitel. Über diesen Bedeutungswechsel wurde im sechzehnten Jahrhundert gestritten.',
      },
      {
        word: 'griech. mē kai hymeis thelete hypagein',
        rendered: 'Wollt ihr auch weggehen',
        note: 'Die Frage ist im Griechischen so gestellt, daß sie eine verneinende Antwort erwartet, und bleibt doch offen.',
      },
      {
        word: 'griech. diabolos estin',
        rendered: 'ein Teufel',
        note: 'Das griechische Wort bedeutet Verleumder und ist die übliche Wiedergabe für den Widersacher. Der Erzähler löst die Anspielung sogleich auf.',
      },
    ],
    interpretations: [
      {
        tradition: 'historisch-kritisch',
        text: 'Das Bekenntnis des Petrus steht an der Stelle, an der die anderen Evangelien Cäsarea Philippi berichten. Der Abschnitt gilt als Abschluß einer Komposition, in der das größte Zeichen und der größte Abfall unmittelbar aufeinanderfolgen.',
      },
      {
        tradition: 'katholisch',
        text: 'Die Auslegung hält fest, daß die Rede nicht abgemildert wird, als die Hörer sich abwenden. Das Bekenntnis des Petrus wird als Antwort der Kirche gelesen, die bleibt, weil sie keinen anderen Ort hat.',
      },
      {
        tradition: 'reformatorisch',
        text: 'Der Vers über den Geist, der lebendig macht, wird auf das Wort bezogen: die Rede selbst schafft, wovon sie spricht. Die Frage an die Zwölf gilt als Beispiel dafür, daß Glaube nicht festgehalten, sondern täglich neu ergriffen wird.',
      },
      {
        tradition: 'orthodox',
        text: 'Die Väter wenden sich gegen einen Gebrauch des Verses über das Fleisch, der die Menschwerdung entwertet. Irenäus argumentiert bereits im zweiten Jahrhundert, das Fleisch sei nicht nutzlos, sondern werde vom Geist lebendig gemacht.',
      },
      {
        tradition: 'seelsorglich',
        text: 'Die Frage, ob auch sie weggehen wollten, wird als Grundfrage jeder Glaubenskrise gelesen. Betont wird, daß die Antwort des Petrus keine Gewißheit ausspricht, sondern eine Erfahrung: es gibt keinen anderen Ort, an den zu gehen wäre.',
      },
    ],
    crossRefs: [
      { book: 'mt', chapter: 16, verse: 16, note: 'Das Bekenntnis des Petrus bei Cäsarea Philippi, an derselben Stelle des Erzählgangs.' },
      { book: 'joh', chapter: 3, verse: 6, note: 'Was vom Fleisch geboren ist, ist Fleisch: der Sprachgebrauch, der den schwierigen Vers erklärt.' },
      { book: 'joh', chapter: 13, verse: 27, note: 'Der Satan fährt in Judas: die Fortsetzung des Schlußworts.' },
      { book: 'jos', chapter: 24, verse: 15, note: 'Erwählt euch heute, wem ihr dienen wollt: dieselbe offene Entscheidungsfrage.' },
    ],
    dating: DAT,
  },
];
