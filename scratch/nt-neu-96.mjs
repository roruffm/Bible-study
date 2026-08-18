const DAT = {
  events: 'Die Ereignisse werden auf den Tag nach dem Sabbat und den folgenden Abend gelegt, nach überwiegender Annahme im Frühjahr des Jahres 30 n. Chr.',
  written: 'Das Lukasevangelium wird meist auf 80 bis 90 n. Chr. datiert; sein Schluß führt unmittelbar auf die Apostelgeschichte desselben Verfassers zu.',
  epoch: 'roemer',
};

export const ARTICLES = [
  {
    book: 'lk',
    chapter: 24,
    from: 1,
    to: 12,
    title: '„Was suchet ihr den Lebendigen bei den Toten?“',
    historicalShort:
      'Die Frauen aus Galiläa kommen mit den vorbereiteten Salben zum Grab, finden es offen und leer und werden von zwei Gestalten an ein früheres Wort erinnert. Ihre Meldung an die Apostel wird als Geschwätz abgetan.',
    historicalLong:
      'Die Salben waren am Rüsttag zubereitet worden, unmittelbar vor Sabbatbeginn. Es geht dabei nicht um eine Einbalsamierung nach ägyptischer Art, sondern um wohlriechende Öle und Harze, die den Geruch überdecken sollten; die Bestattung war in großer Eile erfolgt. Der erste Tag der Woche ist der Tag nach dem Sabbat, also der Sonntag; die Frauen brechen bei Dämmerung auf, sobald das Arbeitsverbot endet.\n\nDer Stein vor dem Grab war entweder ein zugeschnittener Pfropfen oder eine runde Scheibe, die in einer Rinne lief. Solche Rollsteine sind archäologisch nachgewiesen, aber selten und fast nur bei Gräbern wohlhabender Familien.\n\nDie Gestalten am Grab beschreibt Lukas als zwei Männer in glänzenden Kleidern. Er sagt nicht Engel, während Matthäus von einem Engel spricht, Markus von einem jungen Mann und Johannes von zwei Engeln. Dieselbe Wendung von zwei Männern in weißen Kleidern verwendet er im ersten Kapitel der Apostelgeschichte bei der Himmelfahrt; beide Szenen sind damit aufeinander bezogen.\n\nAn einer Stelle weicht Lukas deutlich ab. Bei Markus und Matthäus wird den Frauen aufgetragen, den Jüngern zu sagen, sie sollten nach Galiläa gehen, dort werde man ihn sehen. Bei Lukas wird statt dessen an ein Wort erinnert, das er in Galiläa gesagt hatte. Aus einer Verheißung für die Zukunft wird eine Erinnerung an die Vergangenheit, und das hat einen erkennbaren Grund: bei Lukas geschieht alles Weitere in Jerusalem und seiner Umgebung, kein einziges Erscheinen wird nach Galiläa verlegt.\n\nDie Namen der Frauen nennt der Text erst hinterher: Maria aus Magdala, Johanna und Maria, die Mutter des Jakobus. Johanna war früher als Frau eines Verwalters des Herodes eingeführt worden, gehörte also zur wohlhabenden Schicht. Das Wort, mit dem die Apostel ihre Meldung abtun, stammt aus der Sprache der Medizin und bezeichnet dort das wirre Reden Fiebernder; Luther gibt es mit Märlein wieder. Der Vers über Petrus, der zum Grab läuft, fehlt im Codex Bezae und gehört zu jener Gruppe von Stellen, die in einem Teil der westlichen Überlieferung nicht stehen.',
    reception:
      'Daß Frauen die ersten Zeuginnen sind, ist der christlichen Verkündigung von außen früh vorgehalten worden. Der Philosoph Kelsos spottete im zweiten Jahrhundert, die ganze Sache beruhe auf dem Gerede einer überspannten Frau; Origenes gibt den Einwand in seiner Erwiderung wörtlich wieder und antwortet darauf. Die Schwierigkeit war real: nach Josephus wurden Frauen als Zeuginnen nicht zugelassen, und auch das römische Recht schränkte ihre Zeugnisfähigkeit ein. Gerade darin sehen viele Ausleger ein Argument für das Alter der Überlieferung: eine erfundene Geschichte hätte andere Zeugen gewählt.\n\nMaria von Magdala trägt seit der Alten Kirche den Titel Apostelin der Apostel. Er findet sich bei Hippolyt im dritten Jahrhundert und wird von mittelalterlichen Auslegern wiederholt; im Juni 2016 hat Papst Franziskus ihren Gedenktag im römischen Kalender zum Fest erhoben und die Bezeichnung dabei ausdrücklich aufgenommen. Zugleich ist ihre Gestalt jahrhundertelang durch die Gleichsetzung mit der Sünderin aus dem siebten Kapitel überlagert worden, die auf eine Predigt Gregors des Großen aus dem Jahr 591 zurückgeht und im Westen erst 1969 aus dem liturgischen Kalender entfernt wurde.\n\nIn den östlichen Kirchen wird der zweite Sonntag nach Ostern als Sonntag der Myrophoren begangen, der Salbenträgerinnen. Ihre Namen werden verlesen, und die Ikonen dieses Tages zeigen die Frauen vor dem leeren Grab. Im Westen hat sich eine vergleichbare Hervorhebung erst im zwanzigsten Jahrhundert entwickelt, vor allem im Zuge der Diskussion über die Rolle von Frauen in den Kirchen.',
    world: [
      {
        aspect: 'alltag',
        text: 'Zur Bestattung gehörten wohlriechende Öle und Harze, die den Verwesungsgeruch überdecken sollten. Eine Konservierung war nicht beabsichtigt. Wegen des anbrechenden Sabbats war die Beisetzung übereilt geblieben und sollte nachgeholt werden.',
      },
      {
        aspect: 'raum',
        text: 'Grabkammern wurden in weichen Kalkfels geschlagen und mit einem Stein verschlossen. Meist war es ein zugehauener Pfropfen; die bekannten runden Rollsteine sind selten und gehören zu aufwendigen Anlagen.',
      },
      {
        aspect: 'gesellschaft',
        text: 'Die Zeugnisfähigkeit von Frauen war eingeschränkt. Josephus schreibt, Frauen würden wegen Leichtfertigkeit nicht als Zeuginnen zugelassen; das römische Recht kannte ähnliche Beschränkungen. Eine Meldung von Frauen hatte damit vor Gericht kein Gewicht.',
      },
      {
        aspect: 'glaube',
        text: 'Der erste Tag der Woche wurde in den christlichen Gemeinden früh zum Versammlungstag. Der Sabbat blieb zunächst daneben bestehen; die Verlagerung des Ruhetags folgte erst später und wurde im vierten Jahrhundert staatlich geregelt.',
      },
    ],
    terms: [
      {
        word: 'griech. ta arōmata',
        rendered: 'die Spezerei',
        note: 'Wohlriechende Harze und Öle für die Bestattung. Luthers Spezerei ist ein altes Wort für Gewürze und duftende Substanzen.',
      },
      {
        word: 'griech. ton lithon apokekylismenon',
        rendered: 'den Stein abgewälzt',
        note: 'Der Verschluß der Grabkammer. Ein in einer Rinne laufender Rollstein war teuer und blieb wohlhabenden Familien vorbehalten.',
      },
      {
        word: 'griech. andres dyo en esthēti astraptousē',
        rendered: 'zwei Männer mit glänzenden Kleidern',
        note: 'Lukas spricht nicht von Engeln. Dieselbe Wendung verwendet er in der Apostelgeschichte bei der Himmelfahrt.',
      },
      {
        word: 'griech. hōsei lēros',
        rendered: "als wären's Märlein",
        note: 'Das griechische Wort stammt aus der medizinischen Fachsprache und bezeichnet das wirre Reden Fiebernder.',
      },
    ],
    interpretations: [
      {
        tradition: 'historisch-kritisch',
        text: 'Lukas verlegt alle Erscheinungen nach Jerusalem und formt deshalb die Botschaft am Grab um: aus dem Verweis nach Galiläa wird die Erinnerung an ein dort gesprochenes Wort. Die Nennung der Frauen als erste Zeuginnen gilt vielen als Zeichen für das Alter der Überlieferung.',
      },
      {
        tradition: 'katholisch',
        text: 'Maria von Magdala wird als Apostelin der Apostel bezeichnet; ihr Gedenktag wurde 2016 zum Fest erhoben. Die Auslegung betont, daß die Botschaft zuerst denen anvertraut wird, deren Wort damals rechtlich nichts galt.',
      },
      {
        tradition: 'reformatorisch',
        text: 'Hervorgehoben wird der Unglaube der Apostel, den der Text ohne Beschönigung festhält. Der Osterglaube erscheint nicht als naheliegende Folgerung aus einem leeren Grab, sondern als etwas, das den Zeugen erst zugesprochen werden muß.',
      },
      {
        tradition: 'orthodox',
        text: 'Der Sonntag der Myrophoren gilt den Salbenträgerinnen und Joseph von Arimathia. Die Frage nach dem Lebendigen bei den Toten gehört zu den festen Zeilen der Osterhymnen.',
      },
      {
        tradition: 'feministisch',
        text: 'Betont wird die Spannung zwischen der Rolle der Frauen im Text und ihrer späteren Behandlung in den Kirchen. Der Bericht zeige Frauen als Zeuginnen und Verkündigerinnen und die Männer als die, die nicht glauben.',
      },
    ],
    crossRefs: [
      { book: 'mk', chapter: 16, verse: 1, note: 'Die Frauen mit den Spezereien bei Markus, dort mit dem Verweis nach Galiläa.' },
      { book: 'mt', chapter: 28, verse: 1, note: 'Die Fassung des Matthäus mit einem Engel und dem Erdbeben.' },
      { book: 'joh', chapter: 20, verse: 1, note: 'Maria von Magdala allein am Grab im vierten Evangelium.' },
      { book: 'apg', chapter: 1, verse: 10, note: 'Zwei Männer in weißen Kleidern bei der Himmelfahrt: dieselbe Wendung.' },
    ],
    dating: DAT,
  },
  {
    book: 'lk',
    chapter: 24,
    from: 36,
    to: 53,
    title: '„ein Geist hat nicht Fleisch und Bein“',
    historicalShort:
      'Der Auferstandene tritt in den Kreis der Jünger, läßt sich anfassen und ißt vor ihnen. Er legt die Schriften aus, beauftragt sie und verheißt den Geist. Das Buch endet mit einem Segen bei Bethanien und mit Lobpreis im Tempel.',
    historicalLong:
      'Die Szene ist von der Sorge bestimmt, das Erscheinen könne als Spuk verstanden werden. Genau das äußern die Jünger: sie meinen, einen Geist zu sehen. Die Antwort ist demonstrativ. Hände und Füße werden gezeigt, die Aufforderung zum Anfassen ergeht, und schließlich wird vor ihren Augen gegessen. Diese Betonung der Leiblichkeit hat im zweiten Jahrhundert Gewicht bekommen, als bestritten wurde, daß Christus einen wirklichen Körper gehabt habe. Ignatius von Antiochien führt um 110 in seinem Brief nach Smyrna ein sehr ähnliches Wort des Auferstandenen an, er sei kein körperloser Geist; woher er es hat, ist unbekannt.\n\nDer Text hat mehrere textkritische Besonderheiten. Der Friedensgruß, die Bemerkung über das Zeigen der Hände und Füße, der Halbsatz über das Auffahren in den Himmel und die Anbetung am Schluß fehlen sämtlich im Codex Bezae und teilweise in weiteren Zeugen. Im neunzehnten Jahrhundert galten sie deshalb als spätere Zusätze; die neueren Ausgaben nehmen sie überwiegend in den Text auf. Der Honigseim neben dem gebratenen Fisch dagegen steht nur in einem Teil der Handschriften und ist mit hoher Wahrscheinlichkeit nachgetragen; Luther folgt dem byzantinischen Text und hat ihn.\n\nDie Auslegung der Schriften nennt drei Größen: Gesetz des Mose, Propheten und Psalmen. Das ist eine der frühesten Belegstellen für eine dreiteilige Einteilung der jüdischen Bibel, in der die Psalmen für die Sammlung der Schriften stehen. Der Auftrag, der folgt, ist zugleich das Programm des zweiten Buches: Umkehr und Vergebung für alle Völker, beginnend in Jerusalem, und dazu die Verheißung der Kraft aus der Höhe.\n\nDie Himmelfahrt erzählt Lukas zweimal, hier am Abend des Ostertages und im ersten Kapitel der Apostelgeschichte nach vierzig Tagen. Die Spannung ist offenkundig und seit der Alten Kirche bemerkt; Erklärungen reichen von der Annahme, das Evangelium erzähle zusammenfassend ohne Zeitangabe, bis zu der Vermutung, der Schluß sei bei der Abfassung des zweiten Buches überarbeitet worden.\n\nDer letzte Zug ist sorgfältig gesetzt. Jesus hebt die Hände und segnet, also mit der Gebärde des Priesters, wie sie das dritte Buch Mose beschreibt. Das Evangelium hatte damit begonnen, daß der Priester Zacharias aus dem Tempel trat und den erwarteten Segen nicht sprechen konnte, weil er stumm geworden war. Am Ende wird der Segen gesprochen, draußen bei Bethanien, und die Jünger kehren in den Tempel zurück und loben Gott.',
    reception:
      'Die Betonung des Anfassens und Essens ist zur Hauptwaffe gegen die Auffassung geworden, Christus habe nur scheinbar einen Leib gehabt. Irenäus und Tertullian führen die Stelle im zweiten und dritten Jahrhundert gegen diese Richtung an, und sie steht hinter der Formulierung der Glaubensbekenntnisse über Leiden, Tod und Auferstehung des Fleisches.\n\nIn der Reformationszeit bekam die Himmelfahrt eine unerwartete Bedeutung im Abendmahlsstreit. Zwingli argumentierte, ein Leib könne nur an einem Ort sein; wenn Christus zur Rechten Gottes sitze, könne sein Leib nicht zugleich auf allen Altären gegenwärtig sein. Luther antwortete mit der Lehre, die Rechte Gottes sei kein Ort, und der Leib Christi könne überall gegenwärtig sein. Damit hängt der Streit über die Himmelfahrt unmittelbar an dem Streit über die Einsetzungsworte, an dem die Reformation zerbrach.\n\nDas Fest der Himmelfahrt ist seit dem vierten Jahrhundert bezeugt und wird am vierzigsten Tag nach Ostern begangen. In der Kunst hat sich seit etwa dem Jahr 1000, zuerst in England, ein eigener Bildtyp entwickelt, bei dem nur noch die Füße des Aufsteigenden im oberen Bildrand zu sehen sind. In Deutschland ist der Feiertag seit dem neunzehnten Jahrhundert zunehmend als Vatertag begangen worden, womit sein Ursprung im allgemeinen Bewußtsein weitgehend verschwunden ist.\n\nWas leibliche Auferstehung bedeutet, ist im zwanzigsten Jahrhundert erneut zum Streitpunkt geworden. Rudolf Bultmann forderte 1941, die Aussagen von ihrem antiken Weltbild zu lösen und auf ihren Anspruch an den Hörer hin zu befragen; Wolfhart Pannenberg hielt seit den sechziger Jahren dagegen, die Auferstehung sei als geschichtliches Ereignis zu behaupten, wenn die Rede von ihr nicht leer werden solle. Die Auseinandersetzung ist nicht abgeschlossen und wird in beiden großen Konfessionen geführt.',
    world: [
      {
        aspect: 'alltag',
        text: 'Gebratener Fisch war am See Genezareth Grundnahrung und wurde auch getrocknet und gesalzen weit ins Land gehandelt. Daß eine Portion davon zur Hand ist, gehört zur Beiläufigkeit der Szene.',
      },
      {
        aspect: 'glaube',
        text: 'Der Segen mit erhobenen Händen ist die Gebärde des Priesters beim Abschluß des Opferdienstes. Sie ist im dritten Buch Mose beschrieben und in den Gottesdiensten von Judentum und Christentum bis heute in Gebrauch.',
      },
      {
        aspect: 'raum',
        text: 'Bethanien lag am Osthang des Ölbergs, etwa drei Kilometer von Jerusalem entfernt und damit innerhalb der Strecke, die am Sabbat zurückgelegt werden durfte. Die Apostelgeschichte nennt für dieselbe Szene den Ölberg.',
      },
      {
        aspect: 'gesellschaft',
        text: 'Der Tempel blieb für die erste Gemeinde der Versammlungsort. Die Apostelgeschichte schildert, wie ihre Glieder täglich dorthin gehen und daneben in den Häusern das Brot brechen; eine Trennung von der übrigen Gottesdienstgemeinde gab es zunächst nicht.',
      },
    ],
    terms: [
      {
        word: 'griech. sarka kai ostea',
        rendered: 'Fleisch und Bein',
        note: 'Die Wendung betont die Körperlichkeit gegenüber der Annahme einer Erscheinung. Ignatius von Antiochien führt um 110 ein ähnliches Wort an.',
      },
      {
        word: 'griech. apo melissiou kēriou',
        rendered: 'Honigseim',
        note: 'Der Honig steht nur in einem Teil der Handschriften und ist wahrscheinlich nachgetragen. Luther folgt dem byzantinischen Text.',
      },
      {
        word: 'griech. dynamin ex hypsous',
        rendered: 'mit der Kraft aus der Höhe',
        note: 'Die Umschreibung für den Geist, dessen Kommen die Apostelgeschichte im zweiten Kapitel erzählt. Der Gottesname wird dabei gemieden.',
      },
      {
        word: 'griech. heōs pros Bēthanian',
        rendered: 'bis gen Bethanien',
        note: 'Der Ort am Osthang des Ölbergs. Die Apostelgeschichte nennt für dieselbe Szene den Berg selbst.',
      },
    ],
    interpretations: [
      {
        tradition: 'historisch-kritisch',
        text: 'Der Schluß ist auf die Fortsetzung hin angelegt und nennt bereits das Programm des zweiten Buches. Die doppelte Erzählung der Himmelfahrt mit unterschiedlichem Zeitabstand gilt als offene Frage; mehrere Halbsätze des Abschnitts fehlen zudem in einem Teil der westlichen Überlieferung.',
      },
      {
        tradition: 'katholisch',
        text: 'Die Himmelfahrt wird als Hochfest am vierzigsten Tag nach Ostern begangen. Die Auslegung betont, daß der Auferstandene die Schriften auslegt und den Auftrag erteilt, bevor er scheidet; das Sehen wird durch das Zeugnis abgelöst.',
      },
      {
        tradition: 'reformatorisch',
        text: 'Luther zog aus dem Sitzen zur Rechten Gottes, daß diese Rechte kein Ort sei und der Leib Christi überall gegenwärtig sein könne. Zwingli bestritt das mit dem Hinweis auf die Örtlichkeit jedes Leibes; an dieser Frage hing der Streit um das Abendmahl.',
      },
      {
        tradition: 'orthodox',
        text: 'Die Himmelfahrt zählt zu den zwölf großen Festen. Die Hymnen deuten sie als Erhöhung der angenommenen menschlichen Natur und nicht als Entfernung; der Segen am Schluß wird in den Gottesdiensten dieses Tages aufgenommen.',
      },
      {
        tradition: 'neuzeitlich-theologisch',
        text: 'Seit dem zwanzigsten Jahrhundert wird gestritten, wie die Rede von der leiblichen Auferstehung zu verstehen sei. Bultmann wollte sie vom antiken Weltbild lösen, Pannenberg auf der geschichtlichen Behauptung bestehen. Die Betonung von Fleisch und Bein im Text gehört zu den Argumenten der zweiten Seite.',
      },
    ],
    crossRefs: [
      { book: 'apg', chapter: 1, verse: 9, note: 'Die zweite Erzählung der Himmelfahrt, dort nach vierzig Tagen auf dem Ölberg.' },
      { book: '3mo', chapter: 9, verse: 22, note: 'Aaron hebt die Hände über das Volk und segnet: die Gebärde am Schluß des Evangeliums.' },
      { book: 'lk', chapter: 1, verse: 9, note: 'Zacharias im Tempel, der den Segen nicht sprechen kann: der Anfang, auf den der Schluß antwortet.' },
      { book: 'joh', chapter: 20, verse: 19, note: 'Der Friedensgruß des Auferstandenen im vierten Evangelium.' },
    ],
    dating: DAT,
  },
];
