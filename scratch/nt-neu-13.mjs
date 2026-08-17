/* Neue NT-Artikel: Galater lückenlos (Teil 1) */

const DAT = {
  events: 'Gemeinden in Galatien',
  written: 'zwischen 48 und 56 n. Chr.',
  epoch: 'urkirche',
};

export const ARTICLES = [
  {
    book: 'gal',
    chapter: 1,
    from: 1,
    to: 10,
    title: '„der sei verflucht!“',
    dating: DAT,
    historicalShort:
      'Der einzige Paulusbrief ohne Danksagung – stattdessen steht dort ein zweifach ausgesprochener Fluch.',
    historicalLong:
      'Antike Briefe folgten einem festen Bauplan: Absender, Empfänger, Gruß, dann eine Danksagung oder ein Wunsch für das Wohlergehen. Alle Paulusbriefe halten sich daran – bis auf diesen. Wo sonst der Dank steht, folgt hier eine Verwunderung, und wo sonst Lob steht, ein Fluch. Für Leser, die das Formular kannten, war das ein Schlag ins Gesicht, bevor ein Argument fiel.\n\nSchon der Absender ist Streit. Die Klammer im ersten Vers – nicht von Menschen, auch nicht durch Menschen – verteidigt etwas, das offenbar bestritten wurde: die Herkunft der Vollmacht. Das ganze erste Kapitel entfaltet diesen Punkt. Der Absender behauptet damit nicht mehr Vollmacht als die Jerusalemer Apostel, sondern eine unabhängige.\n\nWo Galatien lag, ist eine alte Streitfrage. Der Name bezeichnete zwei Dinge: das Siedlungsgebiet keltischer Stämme im Norden Kleinasiens, die im dritten Jahrhundert vor Christus eingewandert waren, und die römische Provinz Galatia, die seit 25 vor Christus auch Landschaften im Süden umfasste – darunter Antiochien, Ikonion, Lystra und Derbe, die die Apostelgeschichte als Missionsorte nennt. Wer den Süden annimmt, kann den Brief sehr früh ansetzen, vor das Apostelkonzil; wer den Norden annimmt, später. Die Frage hängt mit der Frühdatierung des Briefes zusammen und ist nicht entschieden.\n\nDas Wort für den Fluch ist anathema. In der griechischen Bibel übersetzt es den hebräischen Begriff für das, was dem Gebrauch entzogen und Gott überlassen wird – im Kriegsrecht des Alten Testaments die dem Untergang geweihte Beute. Es meint keine Verwünschung im Sinne eines Schimpfworts, sondern die Übergabe an Gottes Urteil. Die zweifache Wiederholung ist eine rhetorische Verstärkung, und der Einschluss eines Engels vom Himmel sowie der eigenen Person zeigt, worum es geht: nicht um Personen, sondern um den Inhalt.\n\nDer letzte Vers des Abschnitts wehrt einen Vorwurf ab, der offenbar erhoben wurde: Menschen gefällig zu sein. Der Vorwurf traf Redner, die ihrem Publikum nach dem Mund sprachen, und war ein Gemeinplatz der Philosophenpolemik. Möglicherweise hatten die Gegner behauptet, der Verzicht auf die Beschneidung sei eine Erleichterung, mit der man Heiden gewinnen wolle – der scharfe Ton der vorangehenden Verse ist dann zugleich die Widerlegung.',
    reception:
      'Der Vers vom Fluch über jedes andere Evangelium ist einer der folgenreichsten des Neuen Testaments. Er steht hinter der gesamten Praxis der Lehrverurteilung: Die Konzilien der Alten Kirche schlossen ihre Lehrentscheidungen mit der Formel „der sei anathema“, und das Konzil von Trient gebrauchte sie in Dutzenden von Kanones gegen die Reformation. Über diesen Weg ist aus einem Satz gegen eine Botschaft ein Verfahren gegen Personen geworden.\n\nLuther berief sich auf denselben Vers, um sein eigenes Vorgehen zu begründen: Wenn selbst ein Engel keine andere Botschaft bringen dürfe, dann sei auch keine kirchliche Instanz davon ausgenommen. Der Galaterbrief war sein Lieblingsbrief; er nannte ihn seine Käthe von Bora und legte ihn zweimal ausführlich aus, 1519 und 1531.\n\nDie Formel selbst hat sich verändert. Das anathema der Konzilien meint den Ausschluss aus der Kirche, das anathema dieses Verses die Übergabe an Gottes Urteil. Die ökumenischen Gespräche des 20. Jahrhunderts haben sich mit den gegenseitigen Verurteilungen befasst; die Gemeinsame Erklärung zur Rechtfertigungslehre von 1999 hält fest, dass die Lehrverurteilungen des 16. Jahrhunderts den heutigen Partner nicht mehr treffen.',
    world: [
      {
        aspect: 'gesellschaft',
        text: 'Briefe folgten einem festen Bauplan, den jeder Schreiber gelernt hatte. Papyrusbriefe aus Ägypten zeigen ihn zu Tausenden: Gruß, Wunsch für das Wohlergehen, Hauptteil, Schlussgruß. Wer abwich, tat es absichtlich.',
      },
      {
        aspect: 'raum',
        text: 'Keltische Stämme wanderten im dritten Jahrhundert vor Christus nach Kleinasien ein und siedelten um Ankyra. Hieronymus berichtet noch im vierten Jahrhundert, sie sprächen eine Sprache, die der in Trier ähnele.',
      },
      {
        aspect: 'glaube',
        text: 'Das Wort anathema übersetzt in der griechischen Bibel den hebräischen Begriff für das, was dem Gebrauch entzogen und Gott überlassen wird – im Kriegsrecht die dem Untergang geweihte Beute, in Tempeln die geweihte Gabe.',
      },
      {
        aspect: 'macht',
        text: 'Wanderredner wurden daran gemessen, ob sie ihrem Publikum gefielen; wer nicht gefiel, hatte keine Zuhörer und keinen Unterhalt. Der Vorwurf, nach dem Mund zu reden, war deshalb ein wirksamer – und ein üblicher.',
      },
    ],
    terms: [
      {
        word: 'griech. anathema esto',
        rendered: 'der sei verflucht',
        note: 'Übergeben an Gottes Urteil – kein Schimpfwort, sondern ein Rechtsbegriff aus dem Bannrecht. Über die Konzilien ist daraus die Formel der Lehrverurteilung geworden, die den Ausschluss aus der Kirche meint.',
      },
      {
        word: 'griech. heteron euangelion',
        rendered: 'zu einem anderen Evangelium',
        note: 'Der Text gebraucht zwei verschiedene Wörter für „anderes“: erst eines, das ein Anderes derselben Art meint, dann eines, das ein Anderes anderer Art meint. Die Unterscheidung trägt den ganzen Satz.',
      },
      {
        word: 'griech. anthropois areskein',
        rendered: 'Menschen gefällig zu sein',
        note: 'Ein feststehender Vorwurf gegen Redner, die ihrem Publikum nach dem Mund sprechen. Er stammt aus der Philosophenpolemik und war offenbar gegen den Absender erhoben worden.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Einordnung',
        text: 'Das Fehlen der Danksagung ist ein bewusster Stilbruch und der schärfste Anfang eines neutestamentlichen Briefes. Die Frage nach dem Ort Galatiens – Nord oder Süd – hängt mit der Datierung zusammen und ist nicht entschieden; für den Süden spricht die Apostelgeschichte, für den Norden der übliche Wortgebrauch.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Luther nannte den Galaterbrief seinen Lieblingsbrief und legte ihn zweimal ausführlich aus. Den Fluch über jedes andere Evangelium wandte er gegen die kirchliche Lehrautorität: Wenn selbst ein Engel ausgenommen sei, dann jede Instanz. Der Vers wurde zur Begründung der reformatorischen Berufung auf die Schrift.',
      },
      {
        tradition: 'Katholische Auslegung',
        text: 'Der Vers gilt als Beleg dafür, dass es eine bindende Botschaft gibt, die nicht zur Verfügung steht. Die Konzilien schlossen ihre Lehrentscheidungen mit der Formel „der sei anathema“ – ein Verfahren, das über Jahrhunderte die Grenzen der Lehre markierte und im Kirchenrecht von 1983 nicht mehr geführt wird.',
      },
      {
        tradition: 'Ökumenische Auslegung',
        text: 'Die gegenseitigen Lehrverurteilungen des 16. Jahrhunderts sind im 20. Jahrhundert überprüft worden. Die Gemeinsame Erklärung zur Rechtfertigungslehre von 1999 hält fest, dass sie den heutigen Partner nicht mehr treffen. Der Vers selbst richtet sich gegen eine Botschaft, nicht gegen Personen – eine Unterscheidung, die die Wirkungsgeschichte oft verwischt hat.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Ein Satz, der jede abweichende Verkündigung verflucht, lässt sich in jede Richtung wenden, weil jede Seite ihre eigene für die ursprüngliche hält. Ausleger halten fest, dass der Text einen bestimmten Streit im Blick hat – die Beschneidung von Heidenchristen – und dass seine Übertragung auf beliebige Lehrfragen ihm Gewalt antut.',
      },
    ],
    crossRefs: [
      { book: 'apg', chapter: 15, verse: 1, note: 'Der Streit um die Beschneidung' },
      { book: 'gal', chapter: 5, verse: 12, note: 'Der schärfste Satz gegen die Gegner' },
      { book: '1kor', chapter: 16, verse: 22, note: 'Dieselbe Fluchformel' },
      { book: '1thess', chapter: 2, verse: 4, note: 'Nicht Menschen gefallen, sondern Gott' },
    ],
    sources: [
      'Hieronymus, Kommentar zum Galaterbrief, Vorrede zum 2. Buch',
      'Konzil von Trient, Kanones der Sitzungen 6 und 7',
      'Gemeinsame Erklärung zur Rechtfertigungslehre, 1999',
    ],
  },
  {
    book: 'gal',
    chapter: 1,
    from: 11,
    to: 24,
    title: '„zog hin nach Arabien“',
    dating: DAT,
    historicalShort:
      'Ein Lebenslauf als Beweisführung: drei Jahre Abwesenheit, fünfzehn Tage in Jerusalem, ein Eid. Alles dient einem Zweck – der Unabhängigkeit der Botschaft.',
    historicalLong:
      'Der Abschnitt ist als Beweisführung gebaut. Jede Angabe dient dem Nachweis, dass die Botschaft nicht aus Jerusalem stammt: Er ging nicht sofort dorthin, sondern nach Arabien; er kam erst nach drei Jahren; er blieb nur fünfzehn Tage; er sah nur zwei Personen; die Gemeinden in Judäa kannten ihn nicht einmal vom Sehen. Die Zeitangaben sind deshalb keine Nebensache, sondern das Argument selbst. Der eingeschobene Eid – Gott weiß, ich lüge nicht – zeigt, dass die Angaben bestritten wurden.\n\nArabien meint hier nicht die Halbinsel, sondern das Reich der Nabatäer, das von Petra aus große Teile Ostjordaniens, den Negev und Gebiete bis nach Damaskus beherrschte. Der Nabatäerkönig Aretas IV. regierte von 9 vor bis 40 nach Christus; der zweite Korintherbrief erwähnt, dass sein Statthalter in Damaskus den Absender festnehmen wollte. Was er dort tat, sagt der Text nicht – Rückzug und Mission sind beide vorgeschlagen worden; die Verfolgung durch die Nabatäer spricht eher für das zweite.\n\nDie Formulierung, Gott habe seinen Sohn in ihm offenbart, ist eigentümlich. Der Text sagt nicht: mir, sondern: in mir. Und er beschreibt keinen Sturz vom Pferd, kein Licht, keine Stimme – nichts von dem, was die Apostelgeschichte dreimal erzählt. Die Selbstbeschreibung mit den Worten der Prophetenberufung – ausgesondert vom Mutterleibe an – stellt das Ereignis in eine Reihe mit Jeremia und dem Gottesknecht bei Jesaja. Es geht um Beauftragung, nicht um Bekehrung.\n\nDas Wort für den Besuch bei Petrus ist ungewöhnlich: historesai. Es bedeutet, jemanden aufsuchen, um sich kundig zu machen – daher stammt das Wort Historie. Die Übersetzung mit „schauen“ verdeckt das. Fünfzehn Tage sind lang genug, um viel zu erfahren, und die Wahl des Wortes räumt ein, dass es dabei um Auskunft ging – was der Beweisführung des Kapitels eigentlich zuwiderläuft.\n\nDie Erwähnung des Jakobus als Bruder des Herrn ist eine der wenigen Stellen, die die Verwandtschaft ausdrücklich benennen. Josephus nennt ihn ebenso und berichtet von seiner Steinigung im Jahr 62. Dass er neben Petrus als einziger genannt wird, zeigt seine Stellung in Jerusalem – zwei Kapitel später erscheint er an erster Stelle unter den Säulen.',
    reception:
      'Der Abschnitt ist die wichtigste Quelle für die Frühzeit des Paulus und die Grundlage jeder Chronologie. Die Zeitangaben – drei Jahre, dann vierzehn – werden mit den Angaben der Apostelgeschichte verglichen, die eine andere Reihenfolge bietet; die Unterschiede gehören zu den klassischen Problemen der Forschung. Ob die Jahre inklusiv gerechnet sind, wie in der Antike üblich, verschiebt das Ergebnis um bis zu zwei Jahre.\n\nDie Deutung des Damaskusereignisses hat sich verschoben. Über Jahrhunderte galt es als Bekehrung – vom Judentum zum Christentum –, und die Kunst hat es entsprechend dargestellt, von Michelangelo bis Caravaggio, dessen Bild von 1601 in Rom hängt. Seit dem 20. Jahrhundert wird es zunehmend als Berufung verstanden: Der Text selbst gebraucht die Sprache der Prophetenberufung, und ein Wechsel der Religion ist ihm fremd, weil es das Christentum als eigene Religion noch nicht gab.\n\nDie Spannung zwischen diesem Kapitel und der Apostelgeschichte hat die Forschung des 19. Jahrhunderts beschäftigt. Ferdinand Christian Baur machte sie zum Ausgangspunkt seiner These von einem grundlegenden Gegensatz zwischen dem paulinischen und dem petrinischen Christentum. Die These in ihrer strengen Form gilt als überholt, doch die Beobachtung bleibt: Beide Quellen erzählen dieselbe Zeit verschieden.',
    world: [
      {
        aspect: 'raum',
        text: 'Das Reich der Nabatäer erstreckte sich von Petra aus über Ostjordanien und den Negev bis in die Nähe von Damaskus. Es lebte vom Karawanenhandel mit Weihrauch und Gewürzen; Petra war seine in Fels gehauene Hauptstadt.',
      },
      {
        aspect: 'gesellschaft',
        text: 'Ein Eid war eine rechtlich erhebliche Handlung. Wer bei Gott schwor und log, verfiel dessen Urteil. In Briefen erscheint die Formel selten – sie zeigt an, dass der Schreibende mit Zweifeln rechnet.',
      },
      {
        aspect: 'macht',
        text: 'Aretas IV. regierte die Nabatäer von 9 vor bis 40 nach Christus und war zeitweise Schwiegervater des Herodes Antipas. Sein Statthalter in Damaskus überwachte die Stadt – ein Hinweis auf nabatäischen Einfluss dort.',
      },
      {
        aspect: 'arbeit',
        text: 'Fünfzehn Tage in einem fremden Haus bedeuteten Kost und Logis für einen Gast. Gastfreundschaft war Pflicht, hatte aber Grenzen; wer länger blieb, musste mitarbeiten oder beitragen.',
      },
    ],
    terms: [
      {
        word: 'griech. en emoi',
        rendered: 'in mir',
        note: 'Der Text sagt nicht „mir“, sondern „in mir“. Ob das den Ort der Offenbarung meint oder ihren Zweck – damit er ihn weitersage –, ist umstritten. Von einem Sturz, einem Licht oder einer Stimme steht nichts.',
      },
      {
        word: 'griech. historesai',
        rendered: 'zu schauen',
        note: 'Jemanden aufsuchen, um sich kundig zu machen; daher stammt das Wort Historie. Die Wortwahl räumt ein, dass es beim Besuch um Auskunft ging – was der Beweisführung des Kapitels eigentlich zuwiderläuft.',
      },
      {
        word: 'griech. aphorisas ek koilias',
        rendered: 'von meiner Mutter Leibe an hat ausgesondert',
        note: 'Eine Wendung aus der Prophetenberufung: Jeremia und der Gottesknecht bei Jesaja werden so beschrieben. Der Text stellt das Damaskusereignis damit in diese Reihe – als Beauftragung, nicht als Religionswechsel.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Einordnung',
        text: 'Der Abschnitt ist die wichtigste Quelle für die Frühzeit und die Grundlage jeder Chronologie. Seine Angaben weichen von der Apostelgeschichte ab, die eine andere Reihenfolge der Jerusalembesuche bietet. Als Selbstzeugnis hat der Brief methodisch den Vorrang.',
      },
      {
        tradition: 'Neuere Paulusforschung',
        text: 'Das Damaskusereignis wird zunehmend als Berufung und nicht als Bekehrung verstanden. Der Text gebraucht die Sprache der Prophetenberufung, und ein Wechsel der Religion ist ihm fremd – das Christentum als eigene Religion gab es noch nicht. Der Beauftragte bleibt Jude und wird zum Boten an die Heiden.',
      },
      {
        tradition: 'Kirchenväter',
        text: 'Die Väter lasen den Aufenthalt in Arabien als Zeit der Zurüstung; Chrysostomos sah darin die Vorbereitung des Predigers. Die Kürze des Jerusalembesuchs diente ihnen als Beleg für die unmittelbare Vollmacht, ohne dass sie darin einen Gegensatz zu den anderen Aposteln erkannten.',
      },
      {
        tradition: 'Forschungsgeschichtliche Anmerkung',
        text: 'Ferdinand Christian Baur machte die Spannung zwischen diesem Kapitel und der Apostelgeschichte im 19. Jahrhundert zum Ausgangspunkt seiner These von einem Gegensatz zwischen paulinischem und petrinischem Christentum. Die These in ihrer strengen Form gilt als überholt; die Beobachtung, dass beide Quellen dieselbe Zeit verschieden erzählen, bleibt.',
      },
      {
        tradition: 'Kunstgeschichtliche Anmerkung',
        text: 'Die Darstellung des Damaskusereignisses folgt der Apostelgeschichte, nicht diesem Brief: Sturz, Licht, Stimme. Caravaggios Bild von 1601 zeigt den Gestürzten unter einem Pferd, das in keiner der Quellen vorkommt. Der Brief bietet für ein Bild nichts – er beschreibt kein Ereignis, sondern einen Auftrag.',
      },
    ],
    crossRefs: [
      { book: 'apg', chapter: 9, verse: 3, note: 'Die erste Erzählung des Damaskusereignisses' },
      { book: '2kor', chapter: 11, verse: 32, note: 'Der Statthalter des Aretas in Damaskus' },
      { book: 'jer', chapter: 1, verse: 5, note: 'Ehe ich dich im Mutterleibe bereitete' },
      { book: 'gal', chapter: 2, verse: 9, note: 'Jakobus unter den Säulen' },
    ],
    sources: [
      'Josephus, Jüdische Altertümer 20,200 (Jakobus)',
      'Apostelgeschichte 9, 22 und 26',
      'Ferdinand Christian Baur, Paulus, der Apostel Jesu Christi, 1845',
    ],
  },
  {
    book: 'gal',
    chapter: 2,
    from: 1,
    to: 10,
    title: '„die für Säulen angesehen waren“',
    dating: DAT,
    historicalShort:
      'Der Bericht über die Verhandlung in Jerusalem – aus der Sicht einer Partei, mit spürbarer Spitze gegen die Verhandlungspartner.',
    historicalLong:
      'Der Abschnitt schildert dieselbe Verhandlung, die die Apostelgeschichte im fünfzehnten Kapitel erzählt – vermutlich jedenfalls; die Unterschiede sind erheblich. Dort ist es eine förmliche Versammlung mit Reden und einem schriftlichen Beschluss, hier ein Gespräch unter wenigen, das mit einem Handschlag endet. Dort werden den Heidenchristen vier Auflagen gemacht, hier ausdrücklich keine außer der Sorge für die Armen. Ob es sich um zwei verschiedene Zusammenkünfte handelt oder um zwei Darstellungen derselben, ist eine der ältesten Streitfragen der Forschung.\n\nDer Ton ist verräterisch. Dreimal heißt es von den Jerusalemern, sie hätten Ansehen gehabt oder seien als Säulen angesehen gewesen – im Griechischen jedes Mal mit einer Wendung, die eine Distanz einlegt. Der Einschub, es liege ihm nichts daran, welcherlei sie gewesen seien, verstärkt das. Zugleich wird das Ergebnis als Anerkennung berichtet: Sie gaben die rechte Hand. Beides steht nebeneinander.\n\nDer Fall des Titus ist der Prüfstein. Er war Grieche, unbeschnitten, und wurde mitgenommen – offenbar als lebender Testfall. Der Satz, er sei nicht gezwungen worden, sich beschneiden zu lassen, ist im Griechischen so gebaut, dass ein Teil der Ausleger fragt, ob er sich vielleicht freiwillig habe beschneiden lassen. Der folgende Satz ist grammatisch abgebrochen – der einzige unvollständige Satz im Corpus der Paulusbriefe. Erregung ist die naheliegende Erklärung.\n\nDas Bild von den Säulen stammt aus der Tempelarchitektur. Die jüdische Überlieferung nannte große Gestalten der Vergangenheit so, und die Vorstellung von der Gemeinde als Bau ist im Neuen Testament verbreitet. Die drei Genannten – Jakobus, Kephas, Johannes – erscheinen in dieser Reihenfolge, mit dem Herrenbruder an erster Stelle; das ist ein Hinweis auf die Verhältnisse in Jerusalem und weicht von der Reihenfolge der Evangelien ab.\n\nDie Bitte, der Armen zu gedenken, ist keine allgemeine Mahnung. Sie bezieht sich auf die Kollekte für Jerusalem, die mehrere Briefe erwähnen und die über Jahre organisiert wurde: Sammlungen in Galatien, Mazedonien und Achaia, Abgesandte der Gemeinden, ein gemeinsamer Transport. Sie war mehr als Hilfe – sie war das sichtbare Band zwischen den heidenchristlichen Gemeinden und der Muttergemeinde und der praktische Gegenwert des Handschlags.',
    reception:
      'Der Abschnitt ist die Grundlage jeder Darstellung des Verhältnisses zwischen Paulus und der Jerusalemer Gemeinde. Die Unterschiede zur Apostelgeschichte haben die Forschung seit dem 19. Jahrhundert beschäftigt; sie sind der Ausgangspunkt für die Frage, wie weit sich beide Quellen ergänzen und wo sie einander widersprechen.\n\nDie Aufteilung der Missionsgebiete – die einen zu den Heiden, die anderen zu den Juden – ist in der Missionsgeschichte immer wieder als Modell herangezogen worden, meist zur Begründung von Zuständigkeitsabgrenzungen zwischen Gesellschaften und Kirchen. Der Text selbst lässt offen, ob es sich um eine geographische oder eine personelle Aufteilung handelt; die Praxis der Apostelgeschichte spricht gegen eine strenge Trennung.\n\nDie Kollekte für Jerusalem ist im 20. Jahrhundert neu entdeckt worden. Sie gilt als frühestes Beispiel organisierter kirchlicher Hilfe über Provinzgrenzen hinweg und wird in der Diakoniegeschichte und in ökumenischen Texten regelmäßig angeführt. Ihr Ausgang ist unbekannt: Die Apostelgeschichte erwähnt die Übergabe nicht ausdrücklich, und ob sie angenommen wurde, sagt keine Quelle.',
    world: [
      {
        aspect: 'gesellschaft',
        text: 'Der Handschlag war ein Rechtsakt. Er besiegelte Verträge, Bündnisse und Aufnahmen; Münzen zeigen zwei verbundene Hände als Bild der Eintracht. Was mit ihm geschlossen wurde, galt ohne Urkunde.',
      },
      {
        aspect: 'arbeit',
        text: 'Eine Kollekte über mehrere Provinzen zu organisieren, bedeutete: sammeln, aufbewahren, in Münzen umtauschen, Begleiter bestimmen, transportieren. Geld über Land zu bringen war gefährlich; die Briefe nennen deshalb mehrere Abgesandte.',
      },
      {
        aspect: 'macht',
        text: 'Jerusalem war die Muttergemeinde und beanspruchte Vorrang. Wer dort anerkannt war, konnte sich anderswo darauf berufen; wer es nicht war, hatte einen dauerhaften Einwand gegen sich. Anerkennung war deshalb kein Formalakt.',
      },
      {
        aspect: 'glaube',
        text: 'Die Beschneidung war das Bundeszeichen und wurde am achten Tag vollzogen. Erwachsene Übertretende ließen sich beschneiden; die Handlung war schmerzhaft und in der griechischen Welt anstößig, weil sie den Körper entstellte.',
      },
    ],
    terms: [
      {
        word: 'griech. hoi dokountes styloi einai',
        rendered: 'die für Säulen angesehen waren',
        note: 'Wörtlich: die als Säulen zu sein scheinen. Die Wendung legt eine Distanz ein, ohne die Anerkennung zu bestreiten. Das Bild stammt aus der Tempelarchitektur; die jüdische Überlieferung nannte große Gestalten der Vergangenheit so.',
      },
      {
        word: 'griech. dexias edokan koinonias',
        rendered: 'gaben sie mir die rechte Hand',
        note: 'Der Handschlag als Rechtsakt, mit dem Verträge und Bündnisse besiegelt wurden. Das hinzugefügte Wort bezeichnet die Teilhaberschaft – dieselbe Vokabel, die anderswo für die Beteiligung an einem Unternehmen steht.',
      },
      {
        word: 'griech. pseudadelphoi',
        rendered: 'falsche Brüder',
        note: 'Ein Wort, das es vor dem Neuen Testament nicht gibt. Es bezeichnet Menschen, die zur Gemeinde gehören und ihr zugleich als Gegner erscheinen – kein Vorwurf von außen, sondern die Beschreibung eines inneren Bruchs.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Einordnung',
        text: 'Der Bericht steht in Spannung zur Apostelgeschichte, die eine förmliche Versammlung mit schriftlichem Beschluss und vier Auflagen schildert. Ob es zwei Zusammenkünfte waren oder zwei Darstellungen derselben, ist eine der ältesten Streitfragen. Als Selbstzeugnis einer beteiligten Partei hat dieser Text methodisch den Vorrang.',
      },
      {
        tradition: 'Kirchenväter',
        text: 'Die Väter lasen den Abschnitt als Bericht über die Einmütigkeit der Apostel und glätteten die Spitzen. Hieronymus und Chrysostomos betonten, dass keine Auflage gemacht wurde und dass die Anerkennung gegenseitig war; die Distanz in der Wortwahl blieb unbeachtet.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Luther las den Abschnitt als Beleg dafür, dass die Wahrheit des Evangeliums nicht von Ämtern abhängt: Auch Säulen können sich irren, und keiner sei so hoch, dass er nicht am Evangelium gemessen würde. Der Fall des Titus galt ihm als Musterfall der Freiheit.',
      },
      {
        tradition: 'Diakoniegeschichtliche Lesart',
        text: 'Die Kollekte für Jerusalem ist das früheste Beispiel organisierter kirchlicher Hilfe über Provinzgrenzen hinweg. Sie war zugleich ein Band zwischen ungleichen Gemeinden – die Heidenchristen gaben, die Muttergemeinde empfing. Ihr Ausgang ist unbekannt.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Der Bericht stammt von einer Partei und ist erkennbar auf ein Ziel hin erzählt. Was die Jerusalemer Seite dachte, ist nicht überliefert; die Apostelgeschichte gibt eine andere Darstellung, deren Verfasser ebenfalls nicht neutral ist. Über den tatsächlichen Verlauf lässt sich deshalb weniger sagen, als beide Texte nahelegen.',
      },
    ],
    crossRefs: [
      { book: 'apg', chapter: 15, verse: 6, note: 'Die andere Darstellung derselben Verhandlung' },
      { book: '1kor', chapter: 16, verse: 1, note: 'Die Kollekte für Jerusalem' },
      { book: 'roem', chapter: 15, verse: 25, note: 'Die Reise mit der Kollekte' },
      { book: 'gal', chapter: 2, verse: 11, note: 'Der Streit in Antiochien danach' },
    ],
    sources: [
      'Apostelgeschichte 15,1–35',
      'Zweiter Korintherbrief 8–9 (Organisation der Kollekte)',
      'Münzbilder mit verbundenen Händen (concordia)',
    ],
  },
  {
    book: 'gal',
    chapter: 3,
    from: 1,
    to: 14,
    title: '„wer hat euch bezaubert“',
    dating: DAT,
    historicalShort:
      'Der Vorwurf des bösen Blicks, ein Rückgriff auf Abraham und die härteste Aussage des Neuen Testaments über das Kreuz: Er wurde ein Fluch.',
    historicalLong:
      'Das Wort für bezaubern bezeichnet den bösen Blick – eine Vorstellung, die im ganzen Mittelmeerraum verbreitet war und bis heute in Amuletten fortlebt. Man glaubte, Neid könne durch den Blick schaden, besonders Kindern und Vieh; Plutarch widmet der Frage eine Erörterung, und Amulette gegen den bösen Blick sind zu Tausenden gefunden worden. Der Vorwurf ist damit nicht bloß eine Redensart: Er unterstellt eine Einwirkung, gegen die Argumente nichts ausrichten.\n\nDer Ausdruck, Christus sei ihnen vor Augen gemalt worden, gebraucht ein Wort aus dem öffentlichen Anschlag: Verordnungen und Bekanntmachungen wurden auf Tafeln geschrieben und ausgehängt. Die Verkündigung erscheint damit als öffentliche Bekanntgabe, nicht als geheime Lehre – und der Vorwurf lautet, dass die Galater etwas nicht sehen, was ihnen angeschlagen wurde.\n\nDie Beweisführung, die folgt, arbeitet mit Abraham. Das ist kein Zufall: Die Gegner beriefen sich mit hoher Wahrscheinlichkeit ebenfalls auf ihn, denn Abraham ist der erste Beschnittene, und die jüdische Überlieferung feiert ihn als den, der das Gesetz hielt, bevor es gegeben war. Der Brief greift das an, indem er den zeitlichen Vorrang geltend macht: Abraham glaubte, und es wurde ihm zur Gerechtigkeit gerechnet – bevor er beschnitten wurde. Das Argument ist ein Argument aus der Reihenfolge.\n\nDer schärfste Satz des Abschnitts erklärt, Christus sei ein Fluch geworden, und stützt sich auf eine Bestimmung des fünften Buchs Mose: Wer am Holz hängt, ist verflucht. Die Vorschrift betrifft dort die Aufhängung eines bereits Hingerichteten zur Abschreckung, nicht die Kreuzigung. In Qumran ist ein Text gefunden worden, der die Bestimmung auf die Kreuzigung von Lebenden bezieht; auch der römische Statthalter Alexander Jannäus soll so verfahren sein. Die Stelle war also bereits mit der Kreuzigung verbunden, bevor der Brief sie zitiert – und sie war der schwerste Einwand gegen die Verkündigung eines Gekreuzigten.\n\nDer Brief nimmt diesen Einwand nicht zurück, sondern macht ihn zum Kern: Der Fluch traf ihn, damit der Segen an die Völker komme. Die Argumentation läuft über einen Tausch, und sie endet mit dem Wort, um das der ganze Streit geht – dem Geist, den die Galater empfangen haben, und zwar nachweislich vor jeder Beschneidung. Das ist der eigentliche Beweis: die Erfahrung der Angeredeten selbst.',
    reception:
      'Der Satz, Christus sei ein Fluch geworden, gehört zu den härtesten des Neuen Testaments und ist zum Kern der reformatorischen Kreuzestheologie geworden. Luther entfaltete daraus die Vorstellung des fröhlichen Wechsels: Christus nimmt, was uns gehört, und gibt, was ihm gehört. Die Formel steht in seiner Auslegung von 1531 und hat die evangelische Frömmigkeit tief geprägt.\n\nZugleich hat der Vers Anstoß erregt. Kritiker der Strafaustauschlehre wenden ein, ein Gott, der einen Unschuldigen verflucht, sei nicht der, den das Evangelium verkündigt. Verteidiger halten dagegen, dass der Text keinen Dritten kennt, der straft, sondern von einem Eintreten spricht. Die Auseinandersetzung ist seit dem 19. Jahrhundert im Gang und hat sich seit den 1990er Jahren verschärft.\n\nDer Rückgriff auf Abraham ist in der jüdisch-christlichen Diskussion wichtig geworden. Beide Seiten berufen sich auf ihn, und die Frage, wem er gehört, ist alt. Die neuere Auslegung betont, dass der Brief Abraham nicht für sich reklamiert, sondern die Ausweitung des Segens auf die Völker begründet – ein Anliegen, das die Verheißung im ersten Buch Mose selbst ausspricht.',
    world: [
      {
        aspect: 'glaube',
        text: 'Der Glaube an den bösen Blick war im ganzen Mittelmeerraum verbreitet. Amulette gegen ihn sind zu Tausenden gefunden worden, oft mit einem Auge oder einer Hand; Plutarch erörtert, wie Neid durch den Blick schaden könne.',
      },
      {
        aspect: 'macht',
        text: 'Verordnungen wurden auf Tafeln geschrieben und öffentlich ausgehängt; wer sie nicht las, konnte sich nicht darauf berufen. Das Wort für „vor Augen gemalt“ stammt aus dieser Praxis der amtlichen Bekanntmachung.',
      },
      {
        aspect: 'recht',
        text: 'Das fünfte Buch Mose ordnet an, einen Hingerichteten zur Abschreckung an ein Holz zu hängen und ihn vor Sonnenuntergang abzunehmen. Ein Text aus Qumran bezieht die Bestimmung auf die Kreuzigung von Lebenden.',
      },
      {
        aspect: 'gesellschaft',
        text: 'Abraham galt als Stammvater und Vorbild. Die jüdische Überlieferung rühmt ihn als den, der das Gesetz hielt, bevor es gegeben war, und als ersten Beschnittenen. Wer über die Zugehörigkeit stritt, kam an ihm nicht vorbei.',
      },
    ],
    terms: [
      {
        word: 'griech. ebaskanen',
        rendered: 'bezaubert',
        note: 'Mit dem bösen Blick geschädigt. Das Wort setzt eine Einwirkung voraus, gegen die Argumente nichts ausrichten – ein scharfer Vorwurf, der die Galater nicht für dumm, sondern für behext erklärt.',
      },
      {
        word: 'griech. proegraphe',
        rendered: 'vor die Augen gemalt',
        note: 'Öffentlich angeschlagen, wie eine amtliche Bekanntmachung auf einer Tafel. Die Verkündigung erscheint als öffentliche Bekanntgabe – und der Vorwurf lautet, dass die Angeredeten nicht sehen, was ausgehängt war.',
      },
      {
        word: 'griech. katara',
        rendered: 'ein Fluch',
        note: 'Nicht: verflucht, sondern: Fluch. Die Verkürzung verschärft die Aussage. Sie stützt sich auf eine Bestimmung des fünften Buchs Mose, die zur Zeit des Briefes bereits mit der Kreuzigung verbunden war.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Einordnung',
        text: 'Der Rückgriff auf Abraham setzt voraus, dass die Gegner sich ebenfalls auf ihn beriefen. Das Argument läuft über die Reihenfolge: Der Glaube wurde ihm angerechnet, bevor er beschnitten wurde. Der eigentliche Beweis ist aber die Erfahrung der Angeredeten – sie empfingen den Geist vor jeder Beschneidung.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Luther entwickelte aus dem Satz vom Fluch die Vorstellung des fröhlichen Wechsels: Christus nimmt, was uns gehört, und gibt, was ihm gehört. Die Formel steht in seiner Galaterauslegung von 1531 und hat die evangelische Frömmigkeit tief geprägt.',
      },
      {
        tradition: 'Katholische Auslegung',
        text: 'Der Vers wird im Zusammenhang der Stellvertretung gelesen: Christus tritt ein, ohne dass Gott sich gegen ihn wendet. Der Katechismus betont, dass er die Menschen nicht ersetzt, sondern in ihre Lage eintritt und sie dadurch verändert.',
      },
      {
        tradition: 'Jüdische Auslegung',
        text: 'Der Streit um Abraham ist alt. Die rabbinische Überlieferung rühmt ihn als den, der das Gesetz hielt, bevor es gegeben war, und als ersten Beschnittenen. Jüdische Ausleger halten fest, dass die Verheißung des Segens für die Völker im ersten Buch Mose steht und dass sie eine Ausweitung meint, keine Ablösung.',
      },
      {
        tradition: 'Kritische Rückfrage',
        text: 'Kritiker der Strafaustauschlehre wenden ein, ein Gott, der einen Unschuldigen verflucht, sei nicht der Gott des Evangeliums. Verteidiger halten dagegen, dass der Text keinen strafenden Dritten kennt, sondern ein Eintreten beschreibt. Die Auseinandersetzung hat sich seit den 1990er Jahren verschärft.',
      },
    ],
    crossRefs: [
      { book: '1mo', chapter: 15, verse: 6, note: 'Abraham glaubte, und es wurde ihm gerechnet' },
      { book: '5mo', chapter: 21, verse: 23, note: 'Verflucht ist, wer am Holz hängt' },
      { book: '1mo', chapter: 12, verse: 3, note: 'In dir sollen gesegnet werden alle Geschlechter' },
      { book: 'hab', chapter: 2, verse: 4, note: 'Der Gerechte wird seines Glaubens leben' },
    ],
    sources: [
      'Qumran, Tempelrolle 11Q19 64,6–13',
      'Plutarch, Tischgespräche 5,7 (über den bösen Blick)',
      'Luther, Galaterkommentar 1531',
    ],
  },
  {
    book: 'gal',
    chapter: 3,
    from: 15,
    to: 29,
    title: '„das Gesetz ist unser Zuchtmeister gewesen“',
    dating: DAT,
    historicalShort:
      'Ein Argument aus dem Erbrecht, eine Rechnung mit vierhundertdreißig Jahren – und ein Bild aus dem Kinderzimmer, das die Rolle des Gesetzes bestimmt.',
    historicalLong:
      'Der Abschnitt beginnt mit einem Argument aus dem Recht. Das griechische Wort bezeichnet sowohl den Bund als auch das Testament, und der Brief nutzt beide Bedeutungen: Ein rechtskräftiges Testament kann nicht nachträglich geändert oder ergänzt werden. Im hellenistischen Recht, besonders im ägyptischen, galt das tatsächlich – ein hinterlegtes Testament war unwiderruflich. Das römische Recht kannte diese Bindung nicht in derselben Strenge; der Brief argumentiert also mit dem Recht seiner Leser.\n\nDie Zahl vierhundertdreißig stammt aus dem zweiten Buch Mose, wo sie die Dauer des Aufenthalts in Ägypten angibt. Die griechische Fassung rechnet sie anders als die hebräische, nämlich einschließlich der Zeit der Erzväter. Der Brief nimmt sie als Abstand zwischen Verheißung und Gesetzgebung – eine Rechnung, die nur mit der griechischen Zählung aufgeht und die zeigt, aus welcher Bibelfassung gearbeitet wird.\n\nDas Argument über den Samen ist eine rabbinische Auslegungstechnik. Der Brief macht geltend, das hebräische Wort stehe in der Einzahl und meine deshalb einen einzigen – Christus. Sprachlich ist das angreifbar, weil das Wort ein Sammelbegriff ist und die Nachkommenschaft insgesamt bezeichnet; genau so wird es im ersten Buch Mose gebraucht. Solche Schlüsse aus grammatischer Form waren in der Auslegung der Zeit jedoch anerkannt und finden sich in Qumran und in der rabbinischen Literatur.\n\nDie Aussage, das Gesetz sei durch Engel gegeben worden, überrascht. Im zweiten Buch Mose ist von Engeln keine Rede; die Vorstellung stammt aus der Auslegungstradition und findet sich bei Josephus, in der Apostelgeschichte und im Hebräerbrief. Hier hat sie eine Spitze: Was durch Engel und einen Mittler gegeben wurde, ist mittelbar – die Verheißung dagegen kam unmittelbar von Gott an Abraham.\n\nDas Wort, das Luther mit Zuchtmeister übersetzt, ist paidagogos und bezeichnet keinen Lehrer. Der Pädagoge war ein Sklave, der das Kind zur Schule brachte, es beaufsichtigte, vor Gefahren schützte und bei Bedarf schlug; er unterrichtete nicht. Seine Zuständigkeit endete mit der Mündigkeit. Das Bild ist damit weder abwertend noch schmeichelhaft: Der Pädagoge war notwendig und vorübergehend. Der Abschnitt endet mit der Formel über die aufgehobenen Unterschiede, die vermutlich aus der Taufliturgie stammt.',
    reception:
      'Das Bild vom Pädagogen hat die Auslegungsgeschichte in eine falsche Richtung gelenkt, weil das Wort im Deutschen und in den romanischen Sprachen zum Erzieher und Lehrer geworden ist. Daraus entstand die Vorstellung, das Gesetz erziehe zu Christus hin – eine Lesart, die der Text nicht trägt: Der Pädagoge lehrt nicht, er begleitet. Die Revisionen der Bibelübersetzungen haben das im 20. Jahrhundert zunehmend berücksichtigt.\n\nDie Formel über die aufgehobenen Unterschiede – nicht Jude noch Grieche, nicht Sklave noch Freier, nicht Mann noch Frau – ist einer der meistzitierten Sätze der Bibel überhaupt. Sie ist in der Abolitionsbewegung, in der Frauenbewegung und in der Bürgerrechtsbewegung angeführt worden; das dritte Paar ist dabei stets das umstrittenste gewesen, weil andere neutestamentliche Texte die Geschlechterordnung bekräftigen. Die Forschung sieht in dem Satz überwiegend eine Taufformel, die älter ist als der Brief.\n\nDie Bestimmung des Verhältnisses von Gesetz und Verheißung ist der Kern des reformatorischen Streits. Luther entwickelte daraus die Unterscheidung von Gesetz und Evangelium, die seine gesamte Theologie ordnet; Calvin betonte stärker die bleibende Bedeutung des Gesetzes als Wegweisung. Die Auseinandersetzung darüber hat die protestantischen Traditionen bis ins 20. Jahrhundert geteilt, als Karl Barth die Reihenfolge umkehrte und von Evangelium und Gesetz sprach.',
    world: [
      {
        aspect: 'recht',
        text: 'Im hellenistischen Recht war ein hinterlegtes Testament unwiderruflich; Papyri aus Ägypten zeigen die Verfahren. Das römische Recht kannte diese Bindung nicht in derselben Strenge – der Brief argumentiert mit dem Recht seiner Leser.',
      },
      {
        aspect: 'alltag',
        text: 'Der Pädagoge war ein Sklave, der das Kind zur Schule brachte, es beaufsichtigte und bei Bedarf schlug. Er unterrichtete nicht. Grabreliefs zeigen ihn hinter dem Kind gehend; seine Zuständigkeit endete mit der Mündigkeit.',
      },
      {
        aspect: 'glaube',
        text: 'Die Vorstellung, das Gesetz sei durch Engel gegeben worden, stammt aus der Auslegungstradition; im zweiten Buch Mose steht sie nicht. Josephus, die Apostelgeschichte und der Hebräerbrief setzen sie voraus – sie war offenbar allgemein bekannt.',
      },
      {
        aspect: 'gesellschaft',
        text: 'Die Taufe war der Übergang in eine neue Zugehörigkeit. Wer sie empfing, legte die Kleider ab und erhielt neue – ein Vorgang, in dem Standesunterschiede für einen Augenblick sichtbar aufgehoben waren.',
      },
    ],
    terms: [
      {
        word: 'griech. diatheke',
        rendered: 'Testament',
        note: 'Das Wort bezeichnet sowohl den Bund als auch die letztwillige Verfügung. Der Brief nutzt beide Bedeutungen: Ein rechtskräftiges Testament kann nicht nachträglich geändert werden – also auch die Verheißung nicht durch das Gesetz.',
      },
      {
        word: 'griech. paidagogos',
        rendered: 'Zuchtmeister',
        note: 'Kein Lehrer, sondern ein Sklave, der das Kind zur Schule brachte und beaufsichtigte. Notwendig und vorübergehend. Die spätere Bedeutungsverschiebung zum Erzieher hat die Auslegung in eine falsche Richtung gelenkt.',
      },
      {
        word: 'griech. sperma',
        rendered: 'Samen',
        note: 'Ein Sammelbegriff, der die Nachkommenschaft insgesamt bezeichnet. Der Schluss aus der Einzahl auf eine einzelne Person ist sprachlich angreifbar, entspricht aber anerkannten Auslegungstechniken der Zeit.',
      },
    ],
    interpretations: [
      {
        tradition: 'Historisch-kritische Einordnung',
        text: 'Die Beweisführung arbeitet mit hellenistischem Erbrecht, mit der griechischen Bibelfassung und mit rabbinischen Auslegungstechniken. Sie setzt Leser voraus, die diese Verfahren kennen – ein Hinweis darauf, dass die Gegner auf demselben Feld argumentierten.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Luther entwickelte aus dem Verhältnis von Gesetz und Verheißung die Unterscheidung von Gesetz und Evangelium, die seine gesamte Theologie ordnet. Das Gesetz treibt zu Christus, indem es die eigene Unfähigkeit aufdeckt – eine Deutung, die auf dem Bild vom Pädagogen als Erzieher beruht.',
      },
      {
        tradition: 'Reformierte Auslegung',
        text: 'Calvin betonte die bleibende Bedeutung des Gesetzes als Wegweisung für das Leben der Glaubenden. Der Pädagoge sei nicht abgeschafft, sondern in seiner Funktion abgelöst. Die Unterscheidung hat die protestantischen Traditionen geteilt.',
      },
      {
        tradition: 'Sprachgeschichtliche Anmerkung',
        text: 'Das Wort Pädagoge ist im Deutschen zum Erzieher geworden. Daraus entstand die Vorstellung, das Gesetz erziehe zu Christus hin – eine Lesart, die der Text nicht trägt. Der antike Pädagoge lehrte nicht; er begleitete, bis das Kind mündig war.',
      },
      {
        tradition: 'Gleichheitsgeschichtliche Rezeption',
        text: 'Die Formel über die aufgehobenen Unterschiede ist in der Abolitionsbewegung, der Frauenbewegung und der Bürgerrechtsbewegung angeführt worden. Das dritte Paar ist das umstrittenste, weil andere neutestamentliche Texte die Geschlechterordnung bekräftigen. Die Forschung hält den Satz überwiegend für eine Taufformel, die älter ist als der Brief.',
      },
    ],
    crossRefs: [
      { book: '2mo', chapter: 12, verse: 40, note: 'Die vierhundertdreißig Jahre' },
      { book: 'kol', chapter: 3, verse: 11, note: 'Die andere Fassung derselben Formel' },
      { book: 'apg', chapter: 7, verse: 53, note: 'Das Gesetz durch Engel empfangen' },
      { book: 'roem', chapter: 7, verse: 12, note: 'Das Gesetz ist heilig' },
    ],
    sources: [
      'Papyri zum hellenistischen Testamentsrecht',
      'Josephus, Jüdische Altertümer 15,136 (Gesetz durch Engel)',
      'Grabreliefs mit Darstellungen des paidagogos',
    ],
  },
];
