const DAT = {
  events: 'Reinheitsstreit, die Zehnstädte und der Weg nach Bethsaida',
  written: 'um 70 n. Chr., am ehesten in Rom',
  epoch: 'roemer',
};

export const ARTICLES = [
  {
    book: 'mk',
    chapter: 7,
    from: 1,
    to: 23,
    title: '„was den Menschen gemein macht“',
    historicalShort:
      'Der Streit um gewaschene Hände wird zur Grundsatzfrage: Woher kommt die Unreinheit, von außen oder von innen?',
    historicalLong:
      'Markus schiebt eine Erklärung ein, die den Blick auf sein Publikum freigibt: Er muss auseinandersetzen, was die Pharisäer und alle Juden tun. Wer für Leser schreibt, denen jüdische Bräuche vertraut sind, erklärt sie nicht. Die Klammer in den Versen drei und vier gehört zu den deutlichsten Hinweisen darauf, dass dieses Evangelium außerhalb Judäas entstand und Nichtjuden im Blick hat. Sachlich ist die Erklärung dabei überzogen: Die rituelle Handwaschung vor dem Essen war eine Praxis der Pharisäer und der Priester, nicht aller Juden.\n\nDer Vorwurf betrifft nicht die Tora, sondern die Überlieferung der Ältesten – jene mündlich weitergegebene Auslegung, die später in Mischna und Talmud schriftlich wurde. Die Pharisäer verstanden sie als Zaun um das Gesetz: Wer die Vorschriften weiter fasst, als sie geschrieben stehen, gerät gar nicht erst in die Nähe einer Übertretung. Der Einwand in dieser Szene dreht das um: Der Zaun könne so hoch werden, dass er den Garten verdeckt.\n\nAls Beispiel dient das Korban-Gelübde. Wer einen Besitz für den Tempel weihte, entzog ihn jeder anderen Verwendung – auch der Unterstützung der eigenen Eltern. Rabbinische Quellen belegen, dass solche Gelübde vorkamen und dass man um ihre Auflösung stritt; die Mischna widmet dem Thema einen eigenen Traktat und kennt Wege, ein unbedacht gesprochenes Gelübde zurückzunehmen. Der Vorwurf trifft also einen wirklichen Konflikt, verallgemeinert ihn aber.\n\nDer entscheidende Satz kehrt die Richtung um: Nicht was hineingeht, verunreinigt, sondern was herauskommt. Markus zieht selbst die Folgerung und bemerkt, der natürliche Gang fege alle Speise aus – ein Halbsatz, den viele Handschriften anders lesen und den Matthäus streicht. In der einen Lesart spricht Jesus alle Speisen rein, in der anderen beschreibt der Satz nur den Verdauungsweg. An diesem Halbsatz hängt eine der folgenreichsten Weichenstellungen der frühen Kirche.',
    reception:
      'Die Frage, ob die Speisegebote für Christen gelten, entschied über den Weg der jungen Gemeinden. Die Apostelgeschichte erzählt sie an der Vision des Petrus, der Galaterbrief am Streit in Antiochia, wo Petrus und Paulus über die Tischgemeinschaft mit Nichtjuden aneinandergerieten. Der Halbsatz bei Markus ist der früheste Beleg dafür, dass man sich für die Freiheit auf ein Jesuswort berief.\n\nDie Wirkung reicht weit über die Ernährung hinaus. Wo Reinheit ins Innere verlegt wird, verliert die kultische Ordnung ihren Rang – und mit ihr eine Praxis, die Zugehörigkeit sichtbar machte. Jüdische Auslegung hat darauf hingewiesen, dass die christliche Lesart dieser Szene jahrhundertelang benutzt wurde, um jüdische Frömmigkeit als äußerlich abzutun. Das Wort vom Heucheln stammt aus einem innerjüdischen Prophetenzitat und war ursprünglich Selbstkritik, keine Fremdkritik.\n\nDie Aufzählung der zwölf Untugenden am Ende folgt einem Muster, das in der antiken Popularphilosophie verbreitet war; die Stoiker führten Lasterkataloge in derselben Form. Sie taucht bei Paulus mehrfach auf und ist über die Beichtspiegel des Mittelalters in die Lehre von den Hauptsünden eingegangen.',
    world: [
      {
        aspect: 'alltag',
        text: 'Wasser war in Galiläa knapp und musste geschöpft und getragen werden. Ein Haushalt, der vor jeder Mahlzeit die Hände übergoss, verbrauchte davon spürbar mehr als einer, der es nicht tat.',
      },
      {
        aspect: 'glaube',
        text: 'Rein und unrein bezeichneten keine Hygiene, sondern die Tauglichkeit zum Gottesdienst. Wer unrein war, blieb dem Heiligtum fern, bis eine Frist verstrichen und ein Bad genommen war.',
      },
      {
        aspect: 'gesellschaft',
        text: 'Die Versorgung alter Eltern lag bei den Kindern; eine staatliche Absicherung gab es nicht. Wer sich dieser Pflicht entzog, ließ Vater und Mutter ohne Auskommen zurück.',
      },
      {
        aspect: 'recht',
        text: 'Ein einmal gesprochenes Gelübde galt als bindend, weil es Gott gegenüber ausgesprochen war. Die Gelehrten stritten darüber, unter welchen Bedingungen es sich auflösen ließ.',
      },
    ],
    terms: [
      {
        word: 'griech. koinos',
        rendered: 'gemeinen',
        note: 'Wörtlich gemein im Sinn von gewöhnlich, allgemein zugänglich – und darum nicht abgesondert für Gott. Luther übersetzt wörtlich; heutige Ausgaben schreiben unrein.',
      },
      {
        word: 'griech. he paradosis ton presbyteron',
        rendered: 'Aufsätze der Ältesten',
        note: 'Die mündliche Überlieferung neben der geschriebenen Tora, später in der Mischna gesammelt. Bestritten wird hier nicht das Gesetz, sondern seine Auslegung.',
      },
      {
        word: 'hebr. qorban',
        rendered: 'Korban',
        note: 'Eine Weihegabe. Markus behält das fremde Wort bei und übersetzt es sofort – ein Zeichen dafür, dass seine Leser es nicht kannten.',
      },
      {
        word: 'griech. entalmata anthropon',
        rendered: 'Menschengebot',
        note: 'Aus dem Jesajazitat übernommen, das der griechischen Übersetzung folgt; der hebräische Wortlaut lautet an dieser Stelle anders.',
      },
      {
        word: 'griech. katharizon panta ta bromata',
        rendered: 'der alle Speise ausfegt',
        note: 'Grammatisch mehrdeutig. Bezieht sich das Beiwort auf den Gang oder auf Jesus, der damit alle Speisen reinigt? Die Handschriften geben beides her.',
      },
    ],
    interpretations: [
      {
        tradition: 'Katholische Auslegung',
        text: 'Die Szene unterscheidet göttliches Gebot und menschliche Satzung, hebt aber die Überlieferung als solche nicht auf. Die Kirche kennt weiterhin Ordnungen, die nicht in der Schrift stehen und dennoch verpflichten.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Ein Kernbeleg gegen kirchliche Zusatzgebote. Luther bezog die Stelle auf Fastenordnungen und Klosterregeln seiner Zeit und las sie als Freiheit des Gewissens gegenüber solchen Vorschriften.',
      },
      {
        tradition: 'Jüdische Sicht',
        text: 'Der Vorwurf trifft eine Zuspitzung, nicht die Praxis im Ganzen. Auch die rabbinische Überlieferung kennt den Vorrang der Elternehrung vor einem Gelübde und Wege, ein solches aufzulösen.',
      },
      {
        tradition: 'Historisch-kritische Deutung',
        text: 'Die eingeschobene Erklärung verrät ein nichtjüdisches Publikum. Ob die Bemerkung über die Speisen auf Jesus zurückgeht oder die Praxis der markinischen Gemeinde begründet, ist umstritten.',
      },
    ],
    crossRefs: [
      { book: 'jes', chapter: 29, verse: 13, note: 'Das Zitat vom Ehren mit den Lippen' },
      { book: '2mo', chapter: 20, verse: 12, note: 'Das Gebot der Elternehrung' },
      { book: '3mo', chapter: 11, verse: 47, note: 'Die Unterscheidung rein und unrein' },
      { book: 'apg', chapter: 10, verse: 15, note: 'Die Vision des Petrus' },
      { book: 'roem', chapter: 14, verse: 14, note: 'Nichts ist an sich gemein' },
      { book: 'gal', chapter: 2, verse: 12, note: 'Der Streit um die Tischgemeinschaft' },
    ],
    dating: DAT,
  },
  {
    book: 'mk',
    chapter: 7,
    from: 31,
    to: 37,
    title: '„Hephatha! das ist: Tu dich auf“',
    historicalShort:
      'Eine Heilung im heidnischen Zehnstädtebund, erzählt mit Speichel, Seufzen und einem aramäischen Wort.',
    historicalLong:
      'Der Weg, den Markus angibt, ist geografisch verwunderlich: von Tyrus über Sidon zum See Genezareth mitten durch das Gebiet der Zehnstädte. Sidon liegt nördlich von Tyrus, also in der Gegenrichtung; die Zehnstädte liegen östlich des Sees. Wer die Landkarte anlegt, erhält einen weiten Bogen durch überwiegend nichtjüdisches Gebiet. Ob Markus die Wege nicht kannte oder ob ihm die Route wichtiger war als die Entfernung, ist offen – erzählerisch führt sie durch lauter heidnisches Land.\n\nDie Zehnstädte waren ein Verbund griechisch geprägter Städte mit eigener Verfassung, Theatern und Tempeln; Plinius zählt sie auf, und ihre Münzen zeigen griechische Götter. Für einen jüdischen Wanderprediger war das fremdes Terrain. Dass Markus dorthin verlegt, was er erzählt, gehört zu einer Linie seines Buches: Zwischen den beiden Speisungen bewegt sich Jesus fast durchgehend außerhalb jüdischen Gebiets.\n\nDie Behandlung folgt Schritten, die aus antiken Heilberichten bekannt sind: Absonderung von der Menge, Berührung der betroffenen Stellen, Speichel, Blick nach oben, ein Seufzen und ein Machtwort in fremder Sprache. Speichel galt in der Antike weithin als heilkräftig; Plinius und Tacitus berichten davon, und Tacitus erzählt eine Heilung des Kaisers Vespasian in Alexandria mit demselben Mittel. Markus behält diese Züge bei, wo Matthäus und Lukas sie meiden.\n\nDas beibehaltene aramäische Wort steht in einer Reihe mit dem Zuruf an das Mädchen des Jairus und dem Ruf am Kreuz. Markus lässt solche Worte stehen und übersetzt sie sofort. Sie sind der stärkste Hinweis darauf, dass hinter dem griechischen Text eine aramäisch erzählte Überlieferung steht.',
    reception:
      'Der Ruf ist in die Taufliturgie eingegangen. Die römische Ordnung kannte einen Ritus, bei dem der Priester Ohren und Mund des Täuflings berührte und das Wort sprach; das Zweite Vatikanische Konzil behielt ihn als freigestellte Handlung bei der Kindertaufe bei. Ambrosius von Mailand erklärt ihn schon im vierten Jahrhundert seinen Täuflingen.\n\nDer Schlussruf der Menge zitiert die Schöpfungserzählung, wo Gott alles gut gemacht sieht, und nimmt zugleich eine Verheißung Jesajas auf, nach der Taube hören und Stumme jubeln werden. Die frühe Kirche las die Heilung darum als Anzeichen der versprochenen Wiederherstellung.\n\nIn der Geschichte der Gehörlosenbildung ist die Stelle zwiespältig geblieben. Sie diente jahrhundertelang als Beleg dafür, dass Taubheit ein zu behebender Mangel sei; die Gehörlosengemeinschaft hat dieser Lesart widersprochen und darauf bestanden, dass Gebärdensprache eine vollwertige Sprache ist und keine Ersatzform. Neuere theologische Arbeiten aus der Behindertenperspektive lesen die Szene darum gegen den Strich: als Begegnung, nicht als Reparatur.',
    world: [
      {
        aspect: 'raum',
        text: 'Der Städtebund östlich und südlich des Sees war griechisch verfasst, mit eigenen Ratsversammlungen und eigener Münzprägung. Er gehörte zur Provinz Syrien und nicht zum Herrschaftsgebiet des Antipas.',
      },
      {
        aspect: 'alltag',
        text: 'Wer weder hörte noch verständlich sprach, war vom Handel, vom Gericht und vom Gottesdienst weitgehend ausgeschlossen; verbindliche Geschäfte wurden mündlich vor Zeugen geschlossen.',
      },
      {
        aspect: 'glaube',
        text: 'Heilkundige der Antike arbeiteten mit Berührung, Anrufung und Substanzen; die Tempel des Asklepios in den griechischen Städten führten Listen über Genesungen, die Besucher als Weihgaben stifteten.',
      },
      {
        aspect: 'gesellschaft',
        text: 'Aramäisch war die Umgangssprache Galiläas, Griechisch die Sprache der Verwaltung und des Handels. In den Zehnstädten hörte man beides, in den Dörfern östlich davon überwiegend das erste.',
      },
    ],
    terms: [
      {
        word: 'aram. ephphatha',
        rendered: 'Hephatha',
        note: 'Ein Befehl in der Sprache, die Jesus sprach. Markus behält vier solcher Worte im griechischen Text und übersetzt sie jedes Mal.',
      },
      {
        word: 'griech. mogilalos',
        rendered: 'einen Tauben, der stumm war',
        note: 'Das griechische Wort heißt schwer redend und steht in der ganzen griechischen Bibel nur noch einmal – in der Jesajastelle, die dieser Bericht aufnimmt.',
      },
      {
        word: 'griech. ho desmos tes glosses',
        rendered: 'das Band seiner Zunge war los',
        note: 'Ein Bild, das in antiken Texten wiederkehrt: Die Sprachlosigkeit gilt als Fessel, die zu lösen ist.',
      },
      {
        word: 'griech. kalos panta pepoieken',
        rendered: 'Er hat alles wohl gemacht',
        note: 'Der Ruf der Menge nimmt den Refrain des Schöpfungsberichts auf, wo Gott sein Werk gut nennt.',
      },
    ],
    interpretations: [
      {
        tradition: 'Katholische Auslegung',
        text: 'Die Handlung ist in die Taufe eingegangen: Was hier geöffnet wird, öffnet sich dem Getauften für das Wort. Der Ritus wird bis heute bei der Kindertaufe gebraucht.',
      },
      {
        tradition: 'Orthodoxe Auslegung',
        text: 'Die leibliche Berührung zeigt, dass die Erlösung den ganzen Menschen betrifft. Speichel, Finger und Atem stehen für das Herabkommen Gottes in das Stoffliche.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Das Machtwort steht im Mittelpunkt, nicht die Gebärde. Nicht das Mittel wirkt, sondern der Zuspruch – die Zeichen sind Beiwerk, das dem Wort dient.',
      },
      {
        tradition: 'Historisch-kritische Deutung',
        text: 'Die Wegangabe passt nicht zur Landkarte und gilt als Kunstgriff des Erzählers. Die Heilzüge entsprechen antiker Praxis; Matthäus und Lukas lassen sie aus.',
      },
      {
        tradition: 'Auslegung aus der Behindertenperspektive',
        text: 'Die Stelle diente lange als Beleg, Taubheit sei ein Mangel. Dagegen steht die Lesart, hier werde ein Ausgeschlossener in die Gemeinschaft zurückgeholt – die Begegnung, nicht das Ohr, sei der Gegenstand.',
      },
    ],
    crossRefs: [
      { book: 'jes', chapter: 35, verse: 5, note: 'Der Verheißung, dass Taube hören' },
      { book: '1mo', chapter: 1, verse: 31, note: 'Gott sah alles, was er gemacht hatte' },
      { book: 'mk', chapter: 5, verse: 41, note: 'Talitha kumi, ein zweites aramäisches Wort' },
      { book: 'mk', chapter: 8, verse: 23, note: 'Speichel auch bei der Blindenheilung' },
    ],
    dating: DAT,
  },
  {
    book: 'mk',
    chapter: 8,
    from: 1,
    to: 26,
    title: '„Ich sehe Menschen gehen, als sähe ich Bäume“',
    historicalShort:
      'Eine zweite Speisung, ein verweigertes Zeichen und eine Heilung, die zwei Anläufe braucht.',
    historicalLong:
      'Dass Markus zweimal eine Speisung erzählt, hat die Auslegung lange beschäftigt. Die meisten sehen darin zwei Fassungen derselben Überlieferung, die in verschiedenen Gemeinden umliefen und die Markus beide aufnahm, statt sich zu entscheiden. Auffällig ist die Aufteilung: Die erste geschieht auf jüdischem Boden mit zwölf Körben voll Resten, diese hier im heidnischen Osten mit sieben. Zwölf steht für die Stämme Israels, sieben für die Völkerzahl der Antike – die Zahlen erzählen mit.\n\nDie Bitte um ein Zeichen vom Himmel wird nicht nur abgelehnt, sondern mit einem Seufzen abgelehnt. In der griechischen Bibel steht die Wendung von diesem Geschlecht regelmäßig für die Wüstengeneration, die trotz aller Zeichen nicht traute. Wer nach einem Beweis fragt, bekommt keinen; wer keinen fordert, hat gerade zwei Speisungen erlebt.\n\nDas Gespräch im Boot ist die schärfste Zurechtweisung der Jünger im ganzen Buch. Die Fragen häufen sich, und die Wendung von den Augen, die nicht sehen, und den Ohren, die nicht hören, stammt aus Jeremia und aus Jesaja, wo sie dem ungehorsamen Volk gilt. Markus wendet sie auf die zwölf engsten Begleiter an. Der Sauerteig, vor dem gewarnt wird, verbindet zwei Größen, die sonst nichts verbindet: die frommen Gegner und den Hof des Landesherrn.\n\nDie Blindenheilung ist die einzige im Neuen Testament, die stufenweise geschieht. Der erste Versuch bringt nur Umrisse, erst der zweite volle Schärfe. Die Stellung ist kaum zufällig: Unmittelbar danach folgt das Bekenntnis des Petrus, der Jesus richtig benennt und ihn im selben Atemzug missversteht. Was am Blinden geschieht, geschieht am Jüngerkreis in Zeitlupe.',
    reception:
      'Die stufenweise Heilung ist zu einem Bild für den Glaubensweg geworden. Gregor der Große deutete sie als Fortschritt der Erkenntnis, Bernhard von Clairvaux als Stufen der Betrachtung; John Newton, der Verfasser von Amazing Grace, griff sie im 18. Jahrhundert für die eigene Bekehrungsgeschichte auf. In der neueren Auslegung dient sie als Schlüssel zum Aufbau des ganzen Evangeliums, das zwischen zwei Blindenheilungen den Weg nach Jerusalem erzählt.\n\nDie Verweigerung des Zeichens hat eine lange Wirkung in der Frage, was Wunder beweisen können. Augustinus zog aus ihr, dass Zeichen den Glauben stützen, ihn aber nicht erzwingen; die Aufklärung las sie als Absage an jede Beglaubigung durch das Außerordentliche. Beide berufen sich auf denselben Satz.\n\nDas Wort vom Sauerteig ist sprichwörtlich geworden und wird meist auf verborgene Verderbnis gedeutet. Paulus verwendet dasselbe Bild in dieser Richtung, während es an anderer Stelle in den Evangelien für das Wachsen des Reiches Gottes steht – dasselbe Bild trägt beide Vorzeichen.',
    world: [
      {
        aspect: 'alltag',
        text: 'Brot war die Hauptnahrung; Fisch kam vom See, gesalzen oder eingelegt, und war in Galiläa eine der wenigen Handelswaren, die über die Grenzen gingen.',
      },
      {
        aspect: 'arbeit',
        text: 'Sauerteig hieß ein Rest vom Vortag, den man aufhob und dem neuen Teig zusetzte. Jeder Haushalt bewahrte ihn auf; vor dem Passa musste er restlos beseitigt werden.',
      },
      {
        aspect: 'macht',
        text: 'Der Hof des Antipas und die pharisäische Bewegung standen einander fern; hier werden sie in einem Atemzug genannt. Markus deutet Zusammenspiel an, wo sonst Gegensatz herrscht.',
      },
      {
        aspect: 'gesellschaft',
        text: 'Bethsaida lag am Nordufer und wurde vom Tetrarchen Philippus zur Stadt ausgebaut; sie hieß danach Julias, nach einer Angehörigen des Kaiserhauses.',
      },
    ],
    terms: [
      {
        word: 'griech. splanchnizomai',
        rendered: 'Mich jammert des Volks',
        note: 'Wörtlich: Es dreht sich mir im Innersten um. Das Wort bezeichnet keine Stimmung, sondern eine körperlich empfundene Regung.',
      },
      {
        word: 'griech. semeion apo tou ouranou',
        rendered: 'ein Zeichen vom Himmel',
        note: 'Verlangt wird kein Wunder überhaupt, sondern ein amtliches Beglaubigungszeichen von oben – etwas, das keinen Zweifel zulässt.',
      },
      {
        word: 'griech. he zyme tou Herodou',
        rendered: 'dem Sauerteig des Herodes',
        note: 'Manche Handschriften lesen statt des Landesherrn dessen Anhänger. Beide Lesarten meinen die höfische Partei, nicht eine Lehre.',
      },
      {
        word: 'griech. peporomene kardia',
        rendered: 'ein erstarrtes Herz',
        note: 'Dasselbe Wort stand vorher von den Gegnern. Markus legt den Jüngern zur Last, was er zuvor den Widersachern zuschrieb.',
      },
    ],
    interpretations: [
      {
        tradition: 'Katholische Auslegung',
        text: 'Die zweite Speisung gilt den Völkern und weist auf die weltweite Kirche. Die zwei Anläufe der Heilung wurden als Stufen des geistlichen Wachstums gelesen, seit Gregor dem Großen.',
      },
      {
        tradition: 'Reformatorische Auslegung',
        text: 'Die Verweigerung des Zeichens trifft jede Frömmigkeit, die Sicherheit sucht. Glaube hält sich an die Zusage und nicht an einen Beweis, den man vorzeigen könnte.',
      },
      {
        tradition: 'Orthodoxe Auslegung',
        text: 'Erkenntnis wächst schrittweise; die Öffnung der Augen geschieht nicht auf einmal. Die Väter lasen darin den Weg der Reinigung, der Erleuchtung und der Vereinigung.',
      },
      {
        tradition: 'Historisch-kritische Deutung',
        text: 'Zwei Fassungen einer Überlieferung, vom Verfasser nebeneinandergestellt. Die Zahlen der Körbe und der Ort trennen jüdischen und heidnischen Bereich.',
      },
      {
        tradition: 'Literarische Deutung',
        text: 'Die Stelle bildet die Achse des Buches. Zwischen zwei Blindenheilungen steht der Weg nach Jerusalem, und die stufenweise Genesung spiegelt das halbe Verstehen der Begleiter.',
      },
    ],
    crossRefs: [
      { book: 'mk', chapter: 6, verse: 42, note: 'Die erste Speisung' },
      { book: 'jer', chapter: 5, verse: 21, note: 'Augen, die nicht sehen' },
      { book: 'mk', chapter: 10, verse: 51, note: 'Die zweite Blindenheilung' },
      { book: '1kor', chapter: 5, verse: 6, note: 'Ein wenig Sauerteig versäuert den Teig' },
      { book: 'mt', chapter: 16, verse: 12, note: 'Matthäus deutet den Sauerteig als Lehre' },
    ],
    dating: DAT,
  },
];
