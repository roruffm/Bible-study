/**
 * Orte für das Kartenmodul.
 *
 * Diese Datei ist die alleinige Quelle für alles, was auf der Karte erscheint.
 * Wo es zu einem Ort einen ausführlichen Lexikoneintrag gibt, verweist
 * `lexicon` darauf – so bleiben Kartendaten und Lexikontexte getrennt, ohne
 * dass Koordinaten doppelt gepflegt werden müssen.
 *
 * Koordinaten sind `[Längengrad, Breitengrad]`, wie in GeoJSON üblich. Antike
 * Ortslagen sind teils nur ungefähr bestimmbar; wo die Lage umstritten ist,
 * sagt der Text es. Landschaften (`region`) haben keinen Punkt, sondern eine
 * ungefähre Mitte – sie werden auf der Karte nur beschriftet.
 *
 * Jeder Ort trägt mindestens eine Bibelstelle. `scripts/check-references.mjs`
 * prüft das und schlägt an, wenn eine Angabe nicht existiert.
 */

export type PlaceKind = 'stadt' | 'berg' | 'gewaesser' | 'region' | 'insel';

export const PLACE_KIND_LABEL: Record<PlaceKind, string> = {
  stadt: 'Stadt',
  berg: 'Berg',
  gewaesser: 'Gewässer',
  region: 'Landschaft',
  insel: 'Insel',
};

export const PLACE_KIND_PLURAL: Record<PlaceKind, string> = {
  stadt: 'Städte',
  berg: 'Berge',
  gewaesser: 'Gewässer',
  region: 'Landschaften',
  insel: 'Inseln',
};

export interface PlaceRef {
  book: string;
  chapter: number;
  verse: number;
  note?: string;
}

export interface MapPlace {
  id: string;
  name: string;
  /** [Längengrad, Breitengrad] */
  coords: [number, number];
  kind: PlaceKind;
  /**
   * Gewicht für die Beschriftung: 1 sind die Orte, die auf jeder Karte stehen
   * müssen, 2 der Rest. Auf der Gesamtkarte ist nicht für jeden Namen Platz –
   * wer Rang 1 hat, bekommt ihn zuerst. Ohne Angabe gilt 2.
   */
  rank?: 1 | 2;
  /**
   * Nur bei Landschaften: ungefähre Ausdehnung in Längengraden. Sie
   * entscheidet, ab welchem Ausschnitt der Name erscheint – „Galiläa“ gehört
   * nicht auf eine Karte, die von Rom bis Susa reicht.
   */
  span?: number;
  /** Ein Satz, der sagt, warum dieser Ort in der Bibel vorkommt. */
  short: string;
  /** Hintergrund: Lage, Geschichte, Ausgrabungen, Bedeutung im Text. */
  long?: string;
  /** Eine harte Angabe in wenigen Worten – „210 m unter dem Meeresspiegel“. */
  fact?: string;
  /** Stellen, an denen der Ort eine Rolle spielt. */
  refs: PlaceRef[];
  /** Kennung eines Lexikoneintrags mit ausführlichem Text. */
  lexicon?: string;
  /** Heutige Lage oder heutiger Name, wo er sich geändert hat. */
  today?: string;
}

export const PLACES: MapPlace[] = [
  /* ------------------------------------------------- Jerusalem und Judäa */
  {
    id: 'jerusalem',
    name: 'Jerusalem',
    coords: [35.23, 31.78],
    kind: 'stadt',
    rank: 1,
    lexicon: 'jerusalem',
    fact: '760 m hoch, ohne Fluss',
    short: 'Hauptstadt seit David, Ort des Tempels, zweimal zerstört.',
    long: 'Die Stadt liegt an keiner Handelsstraße, hat keinen Fluss und keinen Hafen – ihre Bedeutung ist ausschließlich politisch und religiös. David wählte sie gerade deshalb: Sie gehörte keinem der zwölf Stämme, sondern den Jebusitern, und taugte damit als neutrale Hauptstadt für ein Reich aus Nord und Süd. Die Wasserversorgung kam bis zur Zeit Hiskias aus der Gihonquelle außerhalb der Mauer; sein 533 m langer Tunnel, dessen Bauinschrift erhalten ist, holte sie in die Stadt.',
    refs: [
      { book: '2sam', chapter: 5, verse: 7, note: 'David nimmt die Burg Zion' },
      { book: '2koe', chapter: 25, verse: 9, note: 'Zerstörung durch Babylon' },
      { book: 'lk', chapter: 19, verse: 41, note: 'Jesus weint über die Stadt' },
    ],
  },
  {
    id: 'bethlehem',
    name: 'Bethlehem',
    coords: [35.2, 31.7],
    kind: 'stadt',
    rank: 1,
    lexicon: 'bethlehem',
    short: 'Heimat Davids und Geburtsort Jesu nach Matthäus und Lukas.',
    long: 'Der Name heißt „Haus des Brotes“ – der Ort lag am Rand des fruchtbaren Bergrückens, dahinter beginnt die Wüste Juda. Das Buch Rut spielt auf seinen Feldern. Weil David von hier stammte, verband sich die Erwartung eines Nachkommen Davids mit dem Dorf. Es war klein genug, dass die Propheten das eigens betonen.',
    refs: [
      { book: 'rut', chapter: 1, verse: 22, note: 'Rut kommt zur Gerstenernte' },
      { book: '1sam', chapter: 16, verse: 1, note: 'Samuel salbt David' },
      { book: 'lk', chapter: 2, verse: 4, note: 'Geburt Jesu' },
    ],
  },
  {
    id: 'hebron',
    name: 'Hebron',
    coords: [35.1, 31.53],
    kind: 'stadt',
    rank: 1,
    short:
      'Grabstätte der Erzväter und erste Hauptstadt Davids, bevor er nach Jerusalem zog.',
    long: 'Mit 930 m die höchstgelegene Stadt der Region. Der Kauf der Höhle Machpela ist die einzige Landerwerbung, die die Erzvätererzählungen ausführlich schildern – Abraham besitzt am Ende nichts vom verheißenen Land außer einem Grab. Sieben Jahre lang regierte David hier über Juda allein, bevor auch der Norden ihn anerkannte.',
    refs: [
      { book: '1mo', chapter: 23, verse: 19, note: 'Begräbnis Saras in Machpela' },
      { book: '2sam', chapter: 2, verse: 4, note: 'David wird König über Juda' },
    ],
  },
  {
    id: 'betanien',
    name: 'Betanien',
    coords: [35.26, 31.77],
    kind: 'stadt',
    short: 'Dorf am Ölberg, Zuhause von Maria, Marta und Lazarus.',
    long: 'Rund drei Kilometer von Jerusalem entfernt, hinter dem Ölberg und damit außer Sicht der Stadt. Nach Markus übernachtete Jesus in der letzten Woche hier, statt in Jerusalem zu bleiben – für Pilger war die Stadt zum Passa hoffnungslos überfüllt.',
    refs: [
      { book: 'joh', chapter: 11, verse: 1, note: 'Lazarus' },
      { book: 'mk', chapter: 11, verse: 11, note: 'Quartier in der letzten Woche' },
    ],
  },
  {
    id: 'emmaus',
    name: 'Emmaus',
    coords: [35.02, 31.84],
    kind: 'stadt',
    short:
      'Ziel der beiden Jünger am Ostertag. Die genaue Lage ist unsicher – schon die alten Handschriften nennen verschiedene Entfernungen.',
    long: 'Lukas gibt „sechzig Stadien“ an, gut elf Kilometer; ein Teil der Handschriften liest 160 Stadien. Vier Orte werden vorgeschlagen, keiner überzeugt alle. Die Karte zeigt die verbreitetste Annahme; die Unsicherheit gehört zur Sache.',
    refs: [{ book: 'lk', chapter: 24, verse: 13, note: 'Der Weg am Ostertag' }],
  },
  {
    id: 'jericho',
    name: 'Jericho',
    coords: [35.45, 31.87],
    kind: 'stadt',
    rank: 1,
    lexicon: 'jericho',
    fact: '250 m unter dem Meeresspiegel',
    short: 'Oasenstadt 250 m unter dem Meeresspiegel, eine der ältesten der Welt.',
    long: 'Die Quelle Ain es-Sultan macht mitten in der Wüste eine Palmenoase möglich; deshalb ist der Platz seit rund 10 000 Jahren bewohnt. Über die Datierung der Zerstörungsschichten wird seit Kathleen Kenyons Grabungen in den 1950er Jahren gestritten: Sie fand für die üblicherweise angenommene Zeit Josuas keine Stadtmauer. Zur Zeit Jesu lag das herodianische Jericho etwas südlich der alten Ruine.',
    refs: [
      { book: 'jos', chapter: 6, verse: 20, note: 'Der Fall der Mauern' },
      { book: 'lk', chapter: 19, verse: 1, note: 'Zachäus' },
    ],
  },
  {
    id: 'lachisch',
    name: 'Lachisch',
    coords: [34.85, 31.56],
    kind: 'stadt',
    short:
      'Zweitwichtigste Stadt Judas. Ihre Belagerung durch Sanherib ist auf assyrischen Reliefs im Detail dargestellt.',
    long: 'Die Reliefs aus Sanheribs Palast in Ninive – heute im Britischen Museum – zeigen die Rampe, die Sturmböcke und die Verschleppung der Bewohner. Die Rampe liegt bis heute am Hügel. Dazu kommen die „Lachisch-Briefe“, Tonscherben mit hebräischen Notizen aus den letzten Tagen vor der babylonischen Eroberung 587 v. Chr. Kaum ein biblisches Ereignis ist so gut von außen belegt.',
    refs: [
      { book: '2koe', chapter: 18, verse: 14, note: 'Hiskia verhandelt mit Sanherib' },
      { book: 'jer', chapter: 34, verse: 7, note: 'Eine der letzten festen Städte' },
    ],
  },
  {
    id: 'beerscheba',
    name: 'Beerscheba',
    coords: [34.79, 31.25],
    kind: 'stadt',
    short: 'Südgrenze des Landes – „von Dan bis Beerscheba“ meint das ganze Israel.',
    long: 'Der Name heißt „Brunnen des Schwurs“ oder „Brunnen der Sieben“. Hier endet das Ackerland und beginnt die Steppe; wer weiterzog, war auf Brunnen angewiesen, und um Brunnen wurde gestritten. Die Formel „von Dan bis Beerscheba“ steht rund zehnmal in der Bibel für die volle Ausdehnung des Landes.',
    refs: [
      { book: '1mo', chapter: 21, verse: 31, note: 'Abraham und Abimelech schwören' },
      { book: 'ri', chapter: 20, verse: 1, note: '„Von Dan bis Beerscheba“' },
    ],
  },

  /* ---------------------------------------------- Samarien und Nordreich */
  {
    id: 'samaria',
    name: 'Samaria',
    coords: [35.2, 32.28],
    kind: 'stadt',
    rank: 1,
    lexicon: 'samaria',
    short: 'Hauptstadt des Nordreichs, 722 v. Chr. von Assyrien erobert.',
    long: 'Omri kaufte den Hügel und baute die Stadt von Grund auf – wie David in Jerusalem schuf er sich damit eine Hauptstadt ohne Stammesgeschichte. Die Ausgrabungen förderten hunderte fein geschnitzte Elfenbeinplättchen zutage; der Spott des Amos über die „Elfenbeinhäuser“ hat einen archäologischen Hintergrund.',
    refs: [
      { book: '1koe', chapter: 16, verse: 24, note: 'Omri kauft den Berg' },
      { book: 'am', chapter: 3, verse: 15, note: 'Die Elfenbeinhäuser' },
      { book: '2koe', chapter: 17, verse: 6, note: 'Eroberung durch Assyrien' },
    ],
  },
  {
    id: 'sichem',
    name: 'Sichem',
    coords: [35.28, 32.21],
    kind: 'stadt',
    rank: 1,
    short:
      'Alter Heiligtumsort zwischen Garizim und Ebal; hier hält Josua den Landtag und trifft Jesus die Frau am Brunnen.',
    long: 'Die Stadt liegt im Pass zwischen zwei Bergen, die wie ein natürliches Amphitheater wirken – die Segens- und Fluchzeremonie von Josua 8 nutzt genau diese Akustik. Auf dem Garizim stand später der samaritanische Tempel, den die Hasmonäer 128 v. Chr. zerstörten. Der Streit darüber, welcher Berg der richtige sei, steht dem Gespräch am Jakobsbrunnen im Rücken.',
    refs: [
      { book: 'jos', chapter: 24, verse: 1, note: 'Der Landtag zu Sichem' },
      { book: 'joh', chapter: 4, verse: 5, note: 'Die Frau am Brunnen' },
    ],
  },
  {
    id: 'bethel',
    name: 'Bethel',
    coords: [35.22, 31.93],
    kind: 'stadt',
    rank: 1,
    short: 'Ort von Jakobs Traum, später Reichsheiligtum des Nordreichs.',
    long: 'Der Name heißt „Haus Gottes“. Als das Reich zerfiel, richtete Jerobeam hier und in Dan Stierbilder ein, damit die Nordisraeliten nicht mehr nach Jerusalem pilgern mussten – aus Sicht der Königsbücher der Sündenfall des Nordreichs. Amos wird in Bethel des Landes verwiesen, weil es „ein Heiligtum des Königs“ sei.',
    refs: [
      { book: '1mo', chapter: 28, verse: 19, note: 'Jakobs Traum von der Leiter' },
      { book: '1koe', chapter: 12, verse: 29, note: 'Jerobeams Stierbild' },
      { book: 'am', chapter: 7, verse: 13, note: '„Heiligtum des Königs“' },
    ],
  },
  {
    id: 'silo',
    name: 'Silo',
    coords: [35.29, 32.06],
    kind: 'stadt',
    short: 'Standort der Bundeslade vor Jerusalem; hier wächst Samuel auf.',
    long: 'Rund drei Jahrhunderte lang war Silo der zentrale Wallfahrtsort – bis die Philister die Lade erbeuteten und der Ort offenbar zerstört wurde. Die Grabungen zeigen eine Brandschicht aus dem 11. Jahrhundert v. Chr. Jeremia nutzt Silo als Warnung: Wer meint, der Tempel sei unzerstörbar, solle sich ansehen, was aus Silo wurde.',
    refs: [
      { book: 'jos', chapter: 18, verse: 1, note: 'Die Stiftshütte in Silo' },
      { book: '1sam', chapter: 1, verse: 3, note: 'Hanna und Samuel' },
      { book: 'jer', chapter: 7, verse: 12, note: '„Gehet hin gen Silo“' },
    ],
  },
  {
    id: 'megiddo',
    name: 'Megiddo',
    coords: [35.18, 32.58],
    kind: 'stadt',
    rank: 1,
    short:
      'Festung an der wichtigsten Heerstraße; vom hebräischen „Har Megiddo“ leitet sich der Name Harmagedon ab.',
    long: 'Der Hügel bewacht den Engpass, durch den die Via Maris zwischen Ägypten und Mesopotamien führte – wer Megiddo hielt, kontrollierte den Durchgangsverkehr des Nahen Ostens. Archäologen zählten 26 übereinanderliegende Städte. Kein Ort wurde häufiger umkämpft; die erste ausführlich beschriebene Schlacht der Weltgeschichte, die Thutmosis III. um 1457 v. Chr. gewann, fand hier statt. Daher rührt der Klang des Namens in der Offenbarung.',
    refs: [
      { book: 'ri', chapter: 5, verse: 19, note: 'Das Lied der Debora' },
      { book: '2koe', chapter: 23, verse: 29, note: 'Der Tod Josias' },
      { book: 'offb', chapter: 16, verse: 16, note: 'Harmagedon' },
    ],
  },
  {
    id: 'betschean',
    name: 'Bet-Schean',
    coords: [35.5, 32.5],
    kind: 'stadt',
    short: 'Stadt am Kreuzungspunkt zweier Täler; an ihrer Mauer wurde Sauls Leichnam aufgehängt.',
    long: 'Der Ort verbindet die Jesreelebene mit dem Jordantal und war lange ägyptische Garnison. In römischer Zeit wuchs er als Skythopolis zur größten Stadt der Dekapolis; Theater, Straßen und Bäder sind ausgegraben.',
    refs: [{ book: '1sam', chapter: 31, verse: 10, note: 'Sauls Leichnam an der Mauer' }],
  },

  /* ------------------------------------------------------------ Galiläa */
  {
    id: 'nazareth',
    name: 'Nazareth',
    coords: [35.3, 32.7],
    kind: 'stadt',
    rank: 1,
    lexicon: 'nazareth',
    fact: 'wohl unter 400 Einwohner',
    short: 'Unbedeutendes Dorf, in dem Jesus aufwuchs.',
    long: 'Weder das Alte Testament noch Josephus noch der Talmud erwähnen den Ort; die Grabungen deuten auf ein Dorf mit vielleicht zweihundert bis vierhundert Menschen. Wenige Kilometer entfernt baute Herodes Antipas die Stadt Sepphoris neu auf – ein Bauhandwerker aus Nazareth dürfte dort Arbeit gefunden haben. Die Frage „Was kann aus Nazareth Gutes kommen?“ ist keine Erfindung des Evangelisten, sondern spiegelt die Bedeutungslosigkeit des Ortes.',
    refs: [
      { book: 'lk', chapter: 1, verse: 26, note: 'Die Ankündigung an Maria' },
      { book: 'joh', chapter: 1, verse: 46, note: '„Was kann aus Nazareth Gutes kommen?“' },
    ],
  },
  {
    id: 'kapernaum',
    name: 'Kapernaum',
    coords: [35.57, 32.88],
    kind: 'stadt',
    rank: 1,
    lexicon: 'kapernaum',
    short: 'Fischerort am See, Ausgangspunkt des Wirkens Jesu in Galiläa.',
    long: 'Der Ort lag an der Grenze zwischen dem Gebiet des Antipas und dem des Philippus – daher der Zollposten, an dem Levi saß. Ausgegraben sind eine Synagoge aus dem 4./5. Jahrhundert, die auf älteren Basaltfundamenten steht, und ein Wohnviertel aus einfachen Basalthäusern mit flachen Dächern aus Balken, Zweigen und Lehm. Dass vier Männer ein solches Dach aufdecken konnten, ist bautechnisch genau richtig erzählt.',
    refs: [
      { book: 'mt', chapter: 4, verse: 13, note: 'Jesus zieht nach Kapernaum' },
      { book: 'mk', chapter: 2, verse: 1, note: 'Der Gelähmte durch das Dach' },
    ],
  },
  {
    id: 'tiberias',
    name: 'Tiberias',
    coords: [35.53, 32.79],
    kind: 'stadt',
    short:
      'Von Herodes Antipas neu gegründet und nach dem Kaiser benannt. Die Evangelien erzählen kein Auftreten Jesu dort.',
    long: 'Antipas ließ die Stadt um 20 n. Chr. teilweise über einem Gräberfeld errichten, was sie für strenggläubige Juden unrein machte – anfangs musste er Siedler zwangsweise ansiedeln. Nach 135 n. Chr. wurde sie zum geistigen Zentrum des Judentums: Hier entstanden der Jerusalemer Talmud und die masoretische Vokalisierung des hebräischen Bibeltextes, auf der bis heute jede Übersetzung beruht.',
    refs: [{ book: 'joh', chapter: 6, verse: 23, note: 'Schiffe aus Tiberias' }],
  },
  {
    id: 'caesarea-philippi',
    name: 'Cäsarea Philippi',
    coords: [35.69, 33.25],
    kind: 'stadt',
    short:
      'Ort mit einem Heiligtum für den Gott Pan und einem Kaisertempel – ausgerechnet dort fällt die Frage, wer Jesus sei.',
    long: 'Am Fuß des Hermon entspringt hier eine der Jordanquellen aus einer Felsgrotte. Die Grotte war dem Hirtengott Pan geweiht, der Ort hieß deshalb Paneas; Herodes errichtete daneben einen Tempel für Augustus, sein Sohn Philippus baute die Stadt aus. Vor dieser Felswand voller Götternischen fällt das Wort vom Felsen, auf den die Gemeinde gebaut wird – ein Zusammentreffen, das die Ausleger seit jeher beschäftigt.',
    refs: [
      { book: 'mt', chapter: 16, verse: 13, note: 'Das Bekenntnis des Petrus' },
      { book: 'mk', chapter: 8, verse: 27, note: '„Wer sagen die Leute, dass ich sei?“' },
    ],
  },

  /* ------------------------------------------------ Küste und Philistäa */
  {
    id: 'caesarea',
    name: 'Cäsarea',
    coords: [34.89, 32.5],
    kind: 'stadt',
    rank: 1,
    lexicon: 'caesarea',
    short: 'Von Herodes erbauter Hafen und Sitz der römischen Statthalter.',
    long: 'Die Küste bot keinen natürlichen Hafen, also ließ Herodes einen künstlichen bauen – mit Betonblöcken, die unter Wasser abbinden, eine römische Erfindung. Hier fand man 1961 die Inschrift, die Pontius Pilatus als „Praefectus Iudaeae“ nennt: der einzige zeitgenössische Beleg für ihn. Paulus saß in dieser Stadt zwei Jahre in Haft, bevor er sich auf den Kaiser berief.',
    refs: [
      { book: 'apg', chapter: 10, verse: 1, note: 'Der Hauptmann Kornelius' },
      { book: 'apg', chapter: 25, verse: 11, note: 'Paulus beruft sich auf den Kaiser' },
    ],
  },
  {
    id: 'joppe',
    name: 'Joppe',
    coords: [34.75, 32.05],
    kind: 'stadt',
    rank: 1,
    today: 'Jaffa, heute Teil von Tel Aviv',
    short: 'Hafen, von dem Jona flieht – und in dem Petrus die Vision vor der Kornelius-Begegnung hat.',
    long: 'Der einzige halbwegs brauchbare Naturhafen der judäischen Küste, gedeckt durch eine Felsenkette, aber bei Weststurm gefährlich. Über Joppe kam das Zedernholz für beide Tempelbauten ins Land. Dass Jona ausgerechnet hier ein Schiff nach Tarsis nimmt, ist die geografisch nächstliegende Art, in die entgegengesetzte Richtung von Ninive zu fliehen.',
    refs: [
      { book: 'jona', chapter: 1, verse: 3, note: 'Jonas Flucht' },
      { book: 'apg', chapter: 10, verse: 9, note: 'Die Vision des Petrus' },
    ],
  },
  {
    id: 'gaza',
    name: 'Gaza',
    coords: [34.47, 31.5],
    kind: 'stadt',
    short: 'Südlichste der fünf Philisterstädte, Schauplatz des Endes Simsons.',
    long: 'Letzte Station vor der Sinaiwüste und damit Umschlagplatz für alles, was von Ägypten kam. Wer nach Süden zog, deckte sich hier ein.',
    refs: [
      { book: 'ri', chapter: 16, verse: 21, note: 'Simson in der Mühle' },
      { book: 'apg', chapter: 8, verse: 26, note: 'Philippus und der Äthiopier' },
    ],
  },
  {
    id: 'aschkelon',
    name: 'Aschkelon',
    coords: [34.55, 31.67],
    kind: 'stadt',
    short: 'Philisterstadt am Meer, in Davids Klage um Saul genannt.',
    long: 'Die einzige der fünf Philisterstädte direkt am Meer und damit Seehafen. Der Name taucht schon auf der Merenptah-Stele um 1208 v. Chr. auf – derselben Inschrift, die als früheste außerbiblische Erwähnung „Israels“ gilt.',
    refs: [
      { book: '2sam', chapter: 1, verse: 20, note: '„Verkündigt es nicht auf den Gassen zu Askalon“' },
      { book: 'ri', chapter: 14, verse: 19, note: 'Simson in Askalon' },
    ],
  },
  {
    id: 'aschdod',
    name: 'Aschdod',
    coords: [34.65, 31.8],
    kind: 'stadt',
    short: 'Philisterstadt, in deren Dagon-Tempel die erbeutete Bundeslade stand.',
    refs: [{ book: '1sam', chapter: 5, verse: 1, note: 'Die Lade im Dagon-Tempel' }],
  },
  {
    id: 'gat',
    name: 'Gat',
    coords: [34.85, 31.7],
    kind: 'stadt',
    short: 'Heimatstadt Goliats; David suchte hier zeitweise Zuflucht vor Saul.',
    long: 'Die Ausgrabungen in Tell es-Safi zeigen eine der größten Städte der Region im 10./9. Jahrhundert v. Chr. – und eine Scherbe mit zwei Namen, die dem Namen „Goliat“ sprachlich entsprechen. Sie beweist nicht die Erzählung, belegt aber, dass solche Namen dort geläufig waren.',
    refs: [
      { book: '1sam', chapter: 17, verse: 4, note: 'Goliat von Gat' },
      { book: '1sam', chapter: 27, verse: 2, note: 'David bei König Achis' },
    ],
  },
  {
    id: 'tyrus',
    name: 'Tyrus',
    coords: [35.2, 33.27],
    kind: 'stadt',
    rank: 1,
    short:
      'Phönizische Handelsmacht auf einer Insel vor der Küste; Hiram lieferte Salomo Zedernholz.',
    long: 'Die Stadt lag auf einer Insel und galt als uneinnehmbar – Nebukadnezar belagerte sie dreizehn Jahre ohne Erfolg. Alexander der Große schüttete 332 v. Chr. einen Damm auf und nahm sie. Der Damm versandete und verband die Insel dauerhaft mit dem Festland; die Halbinsel von heute ist das Ergebnis einer Belagerung. Tyrus lebte vom Fernhandel und vom Purpur, der aus Meeresschnecken gewonnen wurde.',
    refs: [
      { book: '1koe', chapter: 5, verse: 1, note: 'Hiram liefert Salomo Holz' },
      { book: 'hes', chapter: 27, verse: 3, note: 'Klage über die Handelsstadt' },
      { book: 'mk', chapter: 7, verse: 24, note: 'Die syrophönizische Frau' },
    ],
  },
  {
    id: 'sidon',
    name: 'Sidon',
    coords: [35.37, 33.56],
    kind: 'stadt',
    rank: 1,
    short: 'Phönizischer Hafen; aus dieser Gegend stammt die Frau, die Jesus umstimmt.',
    long: 'Ältere Schwesterstadt von Tyrus und im Alten Testament oft stellvertretend für ganz Phönizien genannt. Isebel, die Frau Ahabs, war eine sidonische Königstochter – mit ihr kam der Baalskult an den Hof des Nordreichs.',
    refs: [
      { book: '1koe', chapter: 17, verse: 9, note: 'Die Witwe zu Zarpat' },
      { book: 'mk', chapter: 7, verse: 31, note: 'Jesus im Gebiet von Sidon' },
    ],
  },

  /* ------------------------------------------------- Berge und Gewässer */
  {
    id: 'genezareth',
    name: 'See Genezareth',
    coords: [35.59, 32.82],
    kind: 'gewaesser',
    rank: 1,
    lexicon: 'genezareth',
    fact: '210 m unter dem Meeresspiegel',
    short: 'Süßwassersee 210 m unter dem Meeresspiegel, berüchtigt für plötzliche Fallwinde.',
    long: 'Der See ist 21 km lang und 13 km breit – von jedem Ufer aus sieht man das gegenüberliegende. Weil er tief in einem Graben liegt und die Hänge ringsum steil aufsteigen, stürzt kalte Luft von den Höhen herab und trifft auf die warme Luft über dem Wasser: Innerhalb von Minuten kann eine glatte Fläche zu meterhohen Wellen werden. 1986 gab ein Niedrigwasserstand ein Fischerboot aus dem 1. Jahrhundert frei, 8,20 m lang, für rund fünfzehn Personen.',
    refs: [
      { book: 'mt', chapter: 4, verse: 18, note: 'Die Berufung der Fischer' },
      { book: 'mk', chapter: 4, verse: 39, note: 'Der Sturm wird gestillt' },
    ],
  },
  {
    id: 'jordan',
    name: 'Jordan',
    coords: [35.55, 32.3],
    kind: 'gewaesser',
    rank: 1,
    lexicon: 'jordan',
    fact: 'rund 250 km Luftlinie, 1000 km Lauf',
    short: 'Fluss vom Hermon zum Toten Meer; an ihm tauft Johannes.',
    long: 'Der Name bedeutet wohl „der Herabsteigende“: Vom Hermon bis zum Toten Meer fällt der Fluss um mehr als 900 Höhenmeter. Er ist nirgends breit oder tief, aber sein Windungslauf ist fast viermal so lang wie die Luftlinie. Als Grenze zwischen Wüstenzeit und Land ist er im Text mehr Schwelle als Hindernis.',
    refs: [
      { book: 'jos', chapter: 3, verse: 17, note: 'Der Durchzug' },
      { book: 'mt', chapter: 3, verse: 13, note: 'Die Taufe Jesu' },
    ],
  },
  {
    id: 'totes-meer',
    name: 'Totes Meer',
    coords: [35.47, 31.5],
    kind: 'gewaesser',
    rank: 1,
    fact: '430 m unter dem Meeresspiegel',
    short:
      'Tiefster Punkt der Erdoberfläche, rund 430 m unter dem Meeresspiegel. An seinem Nordwestufer lagen die Rollen von Qumran.',
    long: 'Der See hat keinen Abfluss; alles Wasser verdunstet, das Salz bleibt. Mit rund 30 Prozent Salzgehalt ist er etwa zehnmal so salzig wie das Mittelmeer – Fische, die der Jordan hineinträgt, sterben sofort. Die Bibel nennt ihn „Salzmeer“. Hesekiels Vision eines Stroms, der ihn gesund macht und in dem Fische leben, setzt genau dieses Wissen voraus. 1947 fand ein Beduinenjunge in einer Höhle am Nordwestufer die ersten Schriftrollen von Qumran; sie sind rund tausend Jahre älter als die bis dahin bekannten hebräischen Handschriften.',
    refs: [
      { book: '1mo', chapter: 14, verse: 3, note: 'Das „Salzmeer“' },
      { book: 'hes', chapter: 47, verse: 8, note: 'Der Strom macht das Wasser gesund' },
    ],
  },
  {
    id: 'jabbok',
    name: 'Jabbok',
    coords: [35.61, 32.1],
    kind: 'gewaesser',
    short: 'Nebenfluss des Jordan; an seiner Furt ringt Jakob eine Nacht lang.',
    refs: [{ book: '1mo', chapter: 32, verse: 22, note: 'Jakob an der Furt' }],
  },
  {
    id: 'karmel',
    name: 'Berg Karmel',
    coords: [34.97, 32.73],
    kind: 'berg',
    short: 'Höhenzug an der Grenze zum phönizischen Gebiet, Schauplatz von Elias Gottesurteil.',
    long: 'Kein einzelner Gipfel, sondern ein 39 km langer Höhenzug, der bis ans Meer reicht und die Küstenebene unterbricht. Er fängt Regen ab und ist deshalb ungewöhnlich grün – der Name heißt „Garten Gottes“. Dass die Dürre ausgerechnet hier endet, ist kein Zufall der Erzählung.',
    refs: [{ book: '1koe', chapter: 18, verse: 20, note: 'Elia und die Baalspropheten' }],
  },
  {
    id: 'tabor',
    name: 'Berg Tabor',
    coords: [35.39, 32.69],
    kind: 'berg',
    short: 'Auffällig freistehender Berg in Galiläa; seit dem 4. Jh. als Ort der Verklärung verehrt.',
    long: 'Mit 588 m nicht hoch, aber weil er allein aus der Ebene aufsteigt, von weither sichtbar. Die Evangelien nennen für die Verklärung nur „einen hohen Berg“; die Zuordnung zum Tabor ist kirchliche Überlieferung, andere denken an den Hermon.',
    refs: [{ book: 'ri', chapter: 4, verse: 6, note: 'Barak sammelt das Heer' }],
  },
  {
    id: 'hermon',
    name: 'Hermon',
    coords: [35.86, 33.42],
    kind: 'berg',
    rank: 1,
    fact: '2814 m',
    short: 'Mit 2814 m der höchste Berg der Region; seine Schneeschmelze speist den Jordan.',
    long: 'Der Schnee bleibt bis in den Sommer liegen und ist von Galiläa aus zu sehen. Die nächtliche Kondensation an seinen Hängen ist so stark, dass „Tau des Hermon“ im Psalm für überströmende Fülle steht.',
    refs: [
      { book: '5mo', chapter: 3, verse: 8, note: 'Die Nordgrenze des Ostjordanlandes' },
      { book: 'ps', chapter: 133, verse: 3, note: '„Wie der Tau des Hermon“' },
    ],
  },
  {
    id: 'nebo',
    name: 'Berg Nebo',
    coords: [35.73, 31.77],
    kind: 'berg',
    short: 'Von hier sieht Mose das Land, das er nicht mehr betreten wird.',
    long: 'Vom Kamm aus liegt bei klarer Luft das ganze Westjordanland vor Augen, bis zum Mittelmeer. Der Höhenunterschied zum Jordantal beträgt über 1200 Meter.',
    refs: [{ book: '5mo', chapter: 34, verse: 1, note: 'Der Blick über das Land' }],
  },
  {
    id: 'sinai',
    name: 'Sinai',
    coords: [33.97, 28.54],
    kind: 'berg',
    rank: 1,
    lexicon: 'sinai',
    short: 'Berg der Weisung. Welcher Gipfel gemeint ist, lässt sich nicht sicher bestimmen.',
    long: 'Der Text nennt den Berg abwechselnd Sinai und Horeb. Die Verortung im Süden der Halbinsel geht auf christliche Mönche des 4. Jahrhunderts zurück; andere Vorschläge liegen im Nordwesten Arabiens oder im Norden der Halbinsel. Archäologisch ist keiner belegt. Die Karte zeigt die traditionelle Annahme.',
    refs: [
      { book: '2mo', chapter: 19, verse: 20, note: 'Gott steigt auf den Berg herab' },
      { book: '1koe', chapter: 19, verse: 8, note: 'Elia am Horeb' },
    ],
  },
  {
    id: 'ararat',
    name: 'Ararat',
    coords: [44.3, 39.7],
    kind: 'berg',
    short:
      'Das Gebirge, auf dem die Arche nach 1. Mose 8 aufsetzt. Der Text nennt eine Region, keinen einzelnen Gipfel.',
    long: 'Im Hebräischen steht „die Berge Ararat“ – gemeint ist das Land Urartu, ein Reich im Hochland des heutigen Ostanatoliens und Armeniens. Die Gleichsetzung mit dem 5137 m hohen Vulkan, der heute Ararat heißt, ist eine spätere Zuspitzung.',
    refs: [{ book: '1mo', chapter: 8, verse: 4, note: 'Die Arche setzt auf' }],
  },

  /* ------------------------------------------------ Ägypten und Wüste */
  {
    id: 'aegypten',
    name: 'Memphis',
    coords: [31.25, 29.85],
    kind: 'stadt',
    rank: 1,
    lexicon: 'aegypten',
    today: 'Bei Kairo, Luther nennt es „Noph“',
    short: 'Alte Hauptstadt Ägyptens – des Reiches, das in der Bibel Zuflucht und Sklavenhaus zugleich ist.',
    long: 'Über zwei Jahrtausende die wichtigste Stadt Ägyptens, an der Nahtstelle zwischen Delta und Niltal. Bei Hungersnot in Kanaan zog man nach Ägypten, weil der Nil unabhängig vom Regen führte – die Erzväter ebenso wie die Familie Jesu. Genau dieses Reich wird in der Auszugserzählung zum Ort der Zwangsarbeit. Die Bibel hält beides nebeneinander aus.',
    refs: [
      { book: '1mo', chapter: 12, verse: 10, note: 'Abram zieht wegen der Hungersnot hinab' },
      { book: 'jes', chapter: 19, verse: 13, note: 'Die Fürsten zu Noph' },
    ],
  },
  {
    id: 'ramses',
    name: 'Ramses',
    coords: [31.83, 30.8],
    kind: 'stadt',
    rank: 1,
    short: 'Vorratsstadt im Nildelta, die Israel nach 2. Mose 1 erbauen musste – Ausgangspunkt des Auszugs.',
    long: 'Der Name verweist auf Ramses II. (13. Jh. v. Chr.); die Ausgrabungen in Qantir haben dort eine riesige Residenzstadt freigelegt. Das ist eines der Hauptargumente für eine Datierung des Auszugs ins 13. Jahrhundert – andere halten den Namen für eine spätere Aktualisierung eines älteren Ortsnamens.',
    refs: [
      { book: '2mo', chapter: 1, verse: 11, note: 'Zwangsarbeit an den Vorratsstädten' },
      { book: '2mo', chapter: 12, verse: 37, note: 'Aufbruch von Ramses' },
    ],
  },
  {
    id: 'theben',
    name: 'Theben',
    coords: [32.64, 25.7],
    kind: 'stadt',
    today: 'Luxor',
    short: 'Religiöses Zentrum Oberägyptens; die Propheten nennen es „No-Amon“.',
    long: 'Die Tempelanlagen von Karnak und Luxor und die Königsgräber im Tal der Könige liegen hier. Als Assurbanipal die Stadt 663 v. Chr. plünderte, ging das als Schock durch den ganzen Orient – Nahum führt es Ninive als Warnung vor Augen: Wenn selbst Theben fiel, fällst auch du.',
    refs: [{ book: 'nah', chapter: 3, verse: 8, note: '„Bist du besser als No-Amon?“' }],
  },
  {
    id: 'alexandria',
    name: 'Alexandria',
    coords: [29.92, 31.2],
    kind: 'stadt',
    rank: 1,
    short:
      'Größte jüdische Gemeinde außerhalb Judäas. Hier entstand die Septuaginta, die griechische Bibel des Neuen Testaments.',
    long: 'Alexander gründete die Stadt 331 v. Chr.; sie wurde zum Zentrum griechischer Gelehrsamkeit mit der berühmtesten Bibliothek der Antike. Ein ganzes Stadtviertel war jüdisch. Ab dem 3. Jahrhundert v. Chr. übersetzte man dort die hebräischen Schriften ins Griechische – die Septuaginta. Wenn das Neue Testament das Alte zitiert, zitiert es meist diese Übersetzung, weshalb der Wortlaut manchmal vom hebräischen Text abweicht. Die Getreideschiffe von hier versorgten Rom; auf einem davon fuhr Paulus.',
    refs: [
      { book: 'apg', chapter: 18, verse: 24, note: 'Apollos aus Alexandria' },
      { book: 'apg', chapter: 27, verse: 6, note: 'Ein Schiff aus Alexandria' },
    ],
  },
  {
    id: 'kadesch-barnea',
    name: 'Kadesch-Barnea',
    coords: [34.5, 30.68],
    kind: 'stadt',
    short: 'Oase, an der Israel nach 4. Mose den größten Teil der Wüstenzeit verbrachte.',
    long: 'Von den vierzig Jahren entfallen nach dem Text achtunddreißig auf diesen Ort. Von hier brachen die Kundschafter auf, hier starb Mirjam, hier scheiterte Mose am Streit ums Wasser. Die Oase liegt am Übergang zwischen Negev und Sinai.',
    refs: [
      { book: '4mo', chapter: 13, verse: 26, note: 'Die Kundschafter kehren zurück' },
      { book: '4mo', chapter: 20, verse: 1, note: 'Mirjams Tod' },
    ],
  },

  /* --------------------------------------- Syrien und Mesopotamien */
  {
    id: 'damaskus',
    name: 'Damaskus',
    coords: [36.3, 33.51],
    kind: 'stadt',
    rank: 1,
    lexicon: 'damaskus',
    short: 'Uralte Handelsstadt; auf dem Weg dorthin wendet sich das Leben des Paulus.',
    long: 'Eine der am längsten durchgehend bewohnten Städte der Welt, gespeist von der Oase des Barada. Über Jahrhunderte war das aramäische Damaskus der wichtigste Gegner und zeitweise Bündnispartner der israelitischen Könige. Zur Zeit des Paulus gab es dort mehrere Synagogen – deshalb führte sein Weg dorthin.',
    refs: [
      { book: '2koe', chapter: 5, verse: 12, note: 'Naaman und die Flüsse von Damaskus' },
      { book: 'apg', chapter: 9, verse: 3, note: 'Die Wende vor der Stadt' },
    ],
  },
  {
    id: 'antiochia',
    name: 'Antiochia in Syrien',
    coords: [36.16, 36.2],
    kind: 'stadt',
    rank: 1,
    lexicon: 'antiochia',
    fact: 'etwa 300 000 Einwohner',
    short: 'Drittgrößte Stadt des Reiches; hier hießen die Anhänger Jesu zuerst „Christen“.',
    long: 'Nach Rom und Alexandria die größte Stadt des Imperiums, mit einer beleuchteten Hauptstraße von über drei Kilometern Länge. Die Gemeinde dort war die erste, in der Juden und Nichtjuden zusammen aßen – daran entzündete sich der Streit, den Paulus im Galaterbrief schildert, und von hier gingen alle drei Missionsreisen aus. Der Spitzname „Christen“ kam von außen.',
    refs: [
      { book: 'apg', chapter: 11, verse: 26, note: 'Zuerst „Christen“ genannt' },
      { book: 'apg', chapter: 13, verse: 1, note: 'Aussendung von Barnabas und Saulus' },
      { book: 'gal', chapter: 2, verse: 11, note: 'Der Streit mit Petrus' },
    ],
  },
  {
    id: 'haran',
    name: 'Haran',
    coords: [39.03, 36.86],
    kind: 'stadt',
    rank: 1,
    short:
      'Zwischenstation der Familie Abrahams auf dem Weg von Ur nach Kanaan; später sucht Jakob hier eine Frau.',
    long: 'Knotenpunkt der Karawanenwege am oberen Euphrat und wie Ur ein Zentrum des Mondgottkults – die Familie zieht also von einer Mondstadt in die andere. Drei Generationen halten die Verbindung dorthin: Abraham bricht auf, Isaaks Frau kommt von dort, Jakob flieht dorthin zurück.',
    refs: [
      { book: '1mo', chapter: 11, verse: 31, note: 'Terach zieht bis Haran' },
      { book: '1mo', chapter: 28, verse: 10, note: 'Jakob flieht nach Haran' },
    ],
  },
  {
    id: 'karkemisch',
    name: 'Karkemisch',
    coords: [38.01, 36.83],
    kind: 'stadt',
    short:
      'Furt über den Euphrat. Die Schlacht von 605 v. Chr. entschied, dass Babylon und nicht Ägypten die Levante beherrschte.',
    long: 'Der Sieg Nebukadnezars über Pharao Necho ist in der babylonischen Chronik und bei Jeremia gleichlautend überliefert. Für Juda war er das Ende jeder Hoffnung auf ägyptischen Schutz – von da an lief alles auf 587 v. Chr. zu.',
    refs: [
      { book: 'jer', chapter: 46, verse: 2, note: 'Die Schlacht gegen Necho' },
      { book: '2chr', chapter: 35, verse: 20, note: 'Josia stellt sich Necho entgegen' },
    ],
  },
  {
    id: 'ninive',
    name: 'Ninive',
    coords: [43.15, 36.36],
    kind: 'stadt',
    rank: 1,
    lexicon: 'ninive',
    today: 'Bei Mossul im Irak',
    short: 'Hauptstadt Assyriens, 612 v. Chr. zerstört – und im Buch Jona ausgerechnet verschont.',
    long: 'Sanherib machte die Stadt zur Hauptstadt und ließ sie mit einer 12 km langen Mauer umgeben. In der Bibliothek Assurbanipals fand man über 20 000 Tontafeln, darunter das Gilgamesch-Epos mit seiner Flutgeschichte. Nach dem Fall 612 v. Chr. war der Ort so vollständig verschwunden, dass die griechischen Geschichtsschreiber ihn für eine Legende hielten – bis 1847 die ersten Paläste ausgegraben wurden.',
    refs: [
      { book: 'jona', chapter: 3, verse: 3, note: 'Die große Stadt' },
      { book: 'nah', chapter: 1, verse: 1, note: 'Die Last über Ninive' },
    ],
  },
  {
    id: 'babylon',
    name: 'Babylon',
    coords: [44.42, 32.54],
    kind: 'stadt',
    rank: 1,
    lexicon: 'babylon',
    today: 'Ruinenstätte im Irak',
    short: 'Macht, die 587 v. Chr. Jerusalem zerstörte; im Neuen Testament Deckwort für Rom.',
    long: 'Unter Nebukadnezar II. die größte Stadt der Welt, mit dem Ischtar-Tor, der Prozessionsstraße und der Zikkurat Etemenanki – jenem Stufenturm, der hinter der Erzählung vom Turmbau steht. In den Verwaltungstexten des Palastes taucht der verschleppte Judäerkönig Jojachin samt Öl- und Getreiderationen namentlich auf. Nach der Zerstörung des zweiten Tempels wurde „Babylon“ zum verhüllten Namen für Rom, so in der Offenbarung und wohl auch am Ende des ersten Petrusbriefs.',
    refs: [
      { book: '2koe', chapter: 25, verse: 11, note: 'Die Verschleppung' },
      { book: 'ps', chapter: 137, verse: 1, note: '„An den Wassern zu Babel“' },
      { book: 'offb', chapter: 17, verse: 5, note: 'Babylon als Deckname' },
    ],
  },
  {
    id: 'ur',
    name: 'Ur',
    coords: [45.97, 30.96],
    kind: 'stadt',
    rank: 1,
    lexicon: 'ur',
    today: 'Südirak',
    short: 'Sumerische Metropole, aus der Abrahams Familie aufbricht.',
    long: 'Um 2000 v. Chr. eine der größten Städte der Welt, mit Schrift, Rechtswesen und einer gewaltigen Zikkurat für den Mondgott Nanna. Leonard Woolley legte in den 1920er Jahren die Königsgräber frei. Wer von hier aufbrach, verließ nicht die Wildnis, sondern die Zivilisation.',
    refs: [
      { book: '1mo', chapter: 11, verse: 31, note: 'Aufbruch aus Ur' },
      { book: 'neh', chapter: 9, verse: 7, note: 'Erinnerung an die Berufung' },
    ],
  },
  {
    id: 'susa',
    name: 'Susa',
    coords: [48.26, 32.19],
    kind: 'stadt',
    rank: 1,
    short: 'Winterresidenz der Perserkönige und Schauplatz des Buches Ester.',
    long: 'Die persischen Großkönige zogen mit den Jahreszeiten zwischen mehreren Residenzen um; Susa war die Winterhauptstadt. Nehemia war dort Mundschenk, Daniel sieht dort eine Vision, das Buch Ester spielt vollständig am Hof. Der Kodex Hammurabis wurde hier gefunden – als Kriegsbeute, Jahrhunderte zuvor verschleppt.',
    refs: [
      { book: 'est', chapter: 1, verse: 2, note: 'Der Hof des Ahasveros' },
      { book: 'neh', chapter: 1, verse: 1, note: 'Nehemia auf der Burg Susa' },
      { book: 'dan', chapter: 8, verse: 2, note: 'Daniels Vision' },
    ],
  },
  {
    id: 'ekbatana',
    name: 'Ekbatana',
    coords: [48.52, 34.8],
    kind: 'stadt',
    short: 'Sommerresidenz der Perserkönige; hier wird nach Esra 6 das Edikt des Kyros wiedergefunden.',
    long: 'Dass die Erlaubnis zum Tempelbau ausgerechnet im Archiv der Sommerresidenz auftaucht, ist ein Detail, das die persische Verwaltungspraxis erstaunlich genau trifft: Urkunden lagerten dort, wo der Hof zur Zeit ihrer Ausstellung residierte.',
    refs: [{ book: 'esr', chapter: 6, verse: 2, note: 'Die wiedergefundene Urkunde' }],
  },

  /* ------------------------------------------------- Kleinasien */
  {
    id: 'tarsus',
    name: 'Tarsus',
    coords: [34.9, 36.92],
    kind: 'stadt',
    rank: 1,
    lexicon: 'tarsus',
    short: 'Geburtsstadt des Paulus, bekannt für ihre Philosophenschulen.',
    long: 'Hauptstadt Kilikiens am Fuß des Taurus, direkt vor dem Pass der „Kilikischen Tore“. Strabo bescheinigt der Stadt einen Bildungseifer, der Athen und Alexandria übertreffe. Dass Paulus römischer Bürger war und Griechisch wie Hebräisch beherrschte, passt zu einer wohlhabenden jüdischen Familie in dieser Stadt.',
    refs: [
      { book: 'apg', chapter: 9, verse: 11, note: '„Saulus von Tarsus“' },
      { book: 'apg', chapter: 21, verse: 39, note: '„Bürger einer nicht unberühmten Stadt“' },
    ],
  },
  {
    id: 'ephesus',
    name: 'Ephesus',
    coords: [27.34, 37.95],
    kind: 'stadt',
    rank: 1,
    lexicon: 'ephesus',
    short: 'Metropole mit dem Artemistempel; Paulus wirkte hier über zwei Jahre.',
    long: 'Der Artemistempel galt als eines der sieben Weltwunder und war viermal so groß wie der Parthenon. Er war zugleich Bank und Wallfahrtsziel; ein ganzer Wirtschaftszweig lebte von silbernen Miniaturtempeln für Pilger. Der Aufruhr der Silberschmiede in Apostelgeschichte 19 ist damit kein religiöser Zufall, sondern ein Konflikt um Umsatz. Das Theater, in dem die Menge tobte, fasste rund 24 000 Menschen und ist erhalten.',
    refs: [
      { book: 'apg', chapter: 19, verse: 10, note: 'Zwei Jahre Lehre' },
      { book: 'apg', chapter: 19, verse: 28, note: 'Der Aufruhr der Silberschmiede' },
      { book: 'offb', chapter: 2, verse: 1, note: 'Das erste Sendschreiben' },
    ],
  },
  {
    id: 'smyrna',
    name: 'Smyrna',
    coords: [27.14, 38.42],
    kind: 'stadt',
    today: 'Izmir',
    short: 'Eine der sieben Gemeinden der Offenbarung – neben Philadelphia die einzige ohne Tadel.',
    long: 'Die Stadt war um 600 v. Chr. zerstört und Jahrhunderte später neu gegründet worden; sie nannte sich selbst die auferstandene Stadt. Das Sendschreiben spricht sie mit „der tot war und lebendig geworden ist“ an – jedes der sieben Schreiben greift so ein Stück Lokalkolorit auf.',
    refs: [{ book: 'offb', chapter: 2, verse: 8, note: 'An die Gemeinde in Smyrna' }],
  },
  {
    id: 'pergamon',
    name: 'Pergamon',
    coords: [27.18, 39.13],
    kind: 'stadt',
    short:
      'Sitz des ersten Kaisertempels der Provinz; die Offenbarung nennt die Stadt „wo der Thron des Satans ist“.',
    long: 'Auf der Akropolis standen der monumentale Zeusaltar, ein Heiligtum des Heilgottes Asklepios und seit 29 v. Chr. der erste Tempel für den lebenden Kaiser in der Provinz Asien. Welches dieser Bauwerke mit dem „Thron des Satans“ gemeint ist, ist umstritten – der Kaiserkult ist der wahrscheinlichste Bezug. Aus Pergamon stammt auch das Wort Pergament: Als Ägypten den Papyrus-Export sperrte, wich die Bibliothek auf Tierhaut aus.',
    refs: [{ book: 'offb', chapter: 2, verse: 12, note: '„Wo der Thron des Satans ist“' }],
  },
  {
    id: 'thyatira',
    name: 'Thyatira',
    coords: [27.84, 38.92],
    kind: 'stadt',
    short: 'Stadt der Handwerkerzünfte, aus der die Purpurhändlerin Lydia stammte.',
    long: 'Inschriften belegen für Thyatira ungewöhnlich viele Zünfte: Färber, Wollarbeiter, Gerber, Töpfer. Jede Zunft hatte ihren Schutzgott und ihre gemeinsamen Mahlzeiten – wer nicht mitfeierte, verlor Aufträge. Das Sendschreiben, das vor dem Essen von Götzenopferfleisch warnt, trifft damit eine sehr konkrete Existenzfrage.',
    refs: [
      { book: 'apg', chapter: 16, verse: 14, note: 'Lydia, die Purpurhändlerin' },
      { book: 'offb', chapter: 2, verse: 18, note: 'An die Gemeinde in Thyatira' },
    ],
  },
  {
    id: 'sardes',
    name: 'Sardes',
    coords: [28.04, 38.49],
    kind: 'stadt',
    short: 'Einst Hauptstadt des Krösus; die Offenbarung hält ihr vor, dem Namen nach zu leben.',
    long: 'Hier wurden im 6. Jahrhundert v. Chr. die ersten Münzen der Welt geprägt; der sagenhafte Reichtum des Krösus stammte aus dem Goldsand des Flusses Paktolos. Die Burg galt als uneinnehmbar und wurde trotzdem zweimal nachts überrumpelt, weil niemand Wache hielt. „Sei wachsam“ ist an diese Stadt gerichtet kein allgemeiner Rat.',
    refs: [{ book: 'offb', chapter: 3, verse: 1, note: '„Du hast den Namen, dass du lebest“' }],
  },
  {
    id: 'philadelphia',
    name: 'Philadelphia',
    coords: [28.52, 38.35],
    kind: 'stadt',
    short: 'Erdbebengefährdete Stadt; ihr wird eine „offene Tür“ zugesagt.',
    long: 'Das Erdbeben von 17 n. Chr. zerstörte die Stadt; Nachbeben hielten die Einwohner jahrelang davon ab, in den Häusern zu schlafen. Die Zusage, wer überwindet, werde „ein Pfeiler im Tempel“ sein und nicht mehr hinausgehen, spricht in ein Leben hinein, in dem nichts feststand.',
    refs: [{ book: 'offb', chapter: 3, verse: 7, note: '„Eine offene Tür“' }],
  },
  {
    id: 'laodizea',
    name: 'Laodizea',
    coords: [29.11, 37.84],
    kind: 'stadt',
    short:
      'Reiche Bankenstadt ohne eigenes gutes Wasser – daher das Bild vom lauwarmen Wasser.',
    long: 'Die Stadt war so wohlhabend, dass sie nach dem Erdbeben von 60 n. Chr. auf Hilfe aus Rom verzichtete. Sie war berühmt für schwarze Wolle und eine Augensalbe. Ihr Wasser kam durch eine Leitung aus den heißen Quellen von Hierapolis und den kalten Quellen von Kolossä und traf lauwarm ein. Drei Vorwürfe des Sendschreibens – lauwarm, nackt, blind – treffen genau die drei Stolzpunkte der Stadt.',
    refs: [
      { book: 'kol', chapter: 4, verse: 16, note: 'Ein Brief nach Laodizea' },
      { book: 'offb', chapter: 3, verse: 15, note: '„Weder kalt noch warm“' },
    ],
  },
  {
    id: 'kolossae',
    name: 'Kolossä',
    coords: [29.26, 37.79],
    kind: 'stadt',
    short: 'Kleine Stadt im Lykostal, Adressatin des Kolosserbriefs.',
    long: 'Einst bedeutend, zur Zeit des Briefs längst von Laodizea überholt. Paulus war nach eigener Aussage nie dort; die Gemeinde ging wohl auf Epaphras zurück. Der Ort ist bis heute nicht ausgegraben.',
    refs: [{ book: 'kol', chapter: 1, verse: 2, note: 'Anschrift des Briefs' }],
  },
  {
    id: 'milet',
    name: 'Milet',
    coords: [27.28, 37.53],
    kind: 'stadt',
    short: 'Hafenstadt, in der Paulus seine Abschiedsrede an die Ältesten von Ephesus hält.',
    long: 'Heimat der ersten griechischen Naturphilosophen. Der Hafen versandete im Lauf der Jahrhunderte; die Ruinen liegen heute mehrere Kilometer landeinwärts. Die Rede in Apostelgeschichte 20 ist die einzige Ansprache des Paulus an eine christliche Gemeinde, die Lukas ausführlich wiedergibt.',
    refs: [{ book: 'apg', chapter: 20, verse: 17, note: 'Die Abschiedsrede' }],
  },
  {
    id: 'troas',
    name: 'Troas',
    coords: [26.16, 39.75],
    kind: 'stadt',
    short: 'Hafen an der Meerenge; hier hört Paulus den Ruf, nach Makedonien überzusetzen.',
    long: 'Römische Kolonie nahe dem alten Troja und wichtigster Überfahrtshafen nach Europa. Mit dem Aufbruch von hier beginnt der Abschnitt der Apostelgeschichte, in dem der Erzähler unvermittelt „wir“ sagt. In Troas fällt auch der junge Eutychus während einer langen Nachtpredigt aus dem Fenster.',
    refs: [
      { book: 'apg', chapter: 16, verse: 8, note: 'Der Ruf nach Makedonien' },
      { book: 'apg', chapter: 20, verse: 7, note: 'Eutychus am Fenster' },
    ],
  },
  {
    id: 'antiochia-pisidien',
    name: 'Antiochia in Pisidien',
    coords: [31.19, 38.3],
    kind: 'stadt',
    short: 'Römische Kolonie im Bergland; Ort der ersten großen Predigt des Paulus vor Nichtjuden.',
    long: 'Veteranenkolonie auf 1100 m Höhe an der Via Sebaste. Die Predigt in der Synagoge ist die erste, die Lukas ausführlich wiedergibt; auf den Widerstand folgt der programmatische Satz, man wende sich nun den Heiden zu.',
    refs: [{ book: 'apg', chapter: 13, verse: 14, note: 'Die Predigt in der Synagoge' }],
  },
  {
    id: 'ikonion',
    name: 'Ikonion',
    coords: [32.49, 37.87],
    kind: 'stadt',
    today: 'Konya',
    short: 'Station auf allen drei Missionsreisen des Paulus.',
    refs: [
      { book: 'apg', chapter: 14, verse: 1, note: 'Predigt in der Synagoge' },
      { book: '2tim', chapter: 3, verse: 11, note: 'Rückblick auf die Verfolgungen' },
    ],
  },
  {
    id: 'lystra',
    name: 'Lystra',
    coords: [32.45, 37.58],
    kind: 'stadt',
    short: 'Hier wird Paulus gesteinigt und liegengelassen – und hier stößt Timotheus zu ihm.',
    long: 'Die Bewohner sprachen lykaonisch, nicht Griechisch; eine örtliche Sage erzählte, Zeus und Hermes seien einst unerkannt in dieser Gegend zu Gast gewesen. Dass die Menge nach der Heilung genau diese beiden Namen ruft, trifft die regionale Überlieferung punktgenau.',
    refs: [
      { book: 'apg', chapter: 14, verse: 19, note: 'Die Steinigung' },
      { book: 'apg', chapter: 16, verse: 1, note: 'Timotheus schließt sich an' },
    ],
  },
  {
    id: 'derbe',
    name: 'Derbe',
    coords: [33.28, 37.35],
    kind: 'stadt',
    short: 'Östlichster Punkt der ersten Missionsreise.',
    refs: [{ book: 'apg', chapter: 14, verse: 20, note: 'Weiterreise nach Derbe' }],
  },

  /* ------------------------------------- Griechenland, Inseln, Italien */
  {
    id: 'athen',
    name: 'Athen',
    coords: [23.73, 37.98],
    kind: 'stadt',
    rank: 1,
    lexicon: 'athen',
    short: 'Zentrum der Philosophie; Ort der Rede des Paulus auf dem Areopag.',
    long: 'Politisch längst bedeutungslos, als Universitätsstadt aber ungebrochen angesehen. Der Areopag war zu dieser Zeit weniger Gerichtshügel als Rat, der über Religion und Lehre wachte. Die Rede ist die einzige im Neuen Testament, die ohne ein einziges Schriftzitat auskommt und stattdessen griechische Dichter anführt – und sie bricht ab, sobald von Auferstehung die Rede ist.',
    refs: [{ book: 'apg', chapter: 17, verse: 22, note: 'Die Rede auf dem Areopag' }],
  },
  {
    id: 'korinth',
    name: 'Korinth',
    coords: [22.88, 37.94],
    kind: 'stadt',
    rank: 1,
    lexicon: 'korinth',
    short: 'Hafenstadt mit zwei Häfen und einer besonders zerstrittenen Gemeinde.',
    long: 'Die Stadt kontrollierte den Landsteg zwischen zwei Meeren; kleinere Schiffe wurden auf einer gepflasterten Schleppbahn quer über die Landenge gezogen. 146 v. Chr. zerstört, 44 v. Chr. als römische Kolonie neu gegründet – die Bevölkerung war zugewandert, ohne alte Familien, mit steilen sozialen Aufstiegen. Die Konflikte des ersten Korintherbriefs, vom Streit um Redner bis zum ungleichen Abendmahl, sind Konflikte einer solchen Stadt. Die Gallio-Inschrift aus Delphi erlaubt es, den Aufenthalt des Paulus auf 50–52 n. Chr. zu datieren – der festeste Zeitanker des ganzen Neuen Testaments.',
    refs: [
      { book: 'apg', chapter: 18, verse: 1, note: 'Anderthalb Jahre in Korinth' },
      { book: 'apg', chapter: 18, verse: 12, note: 'Vor dem Statthalter Gallio' },
      { book: '1kor', chapter: 1, verse: 11, note: 'Der Streit in der Gemeinde' },
    ],
  },
  {
    id: 'kenchreae',
    name: 'Kenchreä',
    coords: [22.99, 37.89],
    kind: 'stadt',
    short: 'Osthafen Korinths; von dort stammt die Diakonin Phöbe aus Römer 16.',
    long: 'Paulus empfiehlt Phöbe als „Dienerin der Gemeinde zu Kenchreä“ und als „Beistand vieler“ – vermutlich überbrachte sie den Römerbrief. Das griechische Wort für ihre Rolle ist dasselbe, das anderswo mit „Diakon“ wiedergegeben wird.',
    refs: [
      { book: 'apg', chapter: 18, verse: 18, note: 'Paulus schert sich das Haupt' },
      { book: 'roem', chapter: 16, verse: 1, note: 'Phöbe aus Kenchreä' },
    ],
  },
  {
    id: 'philippi',
    name: 'Philippi',
    coords: [24.29, 41.01],
    kind: 'stadt',
    rank: 1,
    lexicon: 'philippi',
    short: 'Römische Kolonie und erste Gemeinde auf europäischem Boden.',
    long: 'Nach der Schlacht von 42 v. Chr. mit römischen Veteranen besiedelt; die Bürger hatten italisches Recht und waren entsprechend stolz darauf. Deshalb wiegt es hier besonders schwer, dass die Behörden zwei römische Bürger ohne Urteil auspeitschen ließen – und deshalb klingt der Satz „unser Bürgerrecht ist im Himmel“ im Philipperbrief für diese Leser wie eine Spitze.',
    refs: [
      { book: 'apg', chapter: 16, verse: 12, note: 'Die erste Gemeinde in Europa' },
      { book: 'phil', chapter: 1, verse: 1, note: 'Anschrift des Briefs' },
    ],
  },
  {
    id: 'thessalonich',
    name: 'Thessalonich',
    coords: [22.94, 40.64],
    kind: 'stadt',
    rank: 1,
    lexicon: 'thessalonich',
    short: 'Hafenstadt an der Via Egnatia; an sie geht wohl der älteste Brief des Paulus.',
    long: 'Als freie Stadt behielt Thessalonich seine eigenen Behörden – Lukas nennt sie „Politarchen“, ein Titel, den man lange nur aus der Apostelgeschichte kannte, bis Inschriften ihn bestätigten. Der erste Thessalonicherbrief, um 50 n. Chr. geschrieben, ist mit einiger Wahrscheinlichkeit die älteste erhaltene christliche Schrift überhaupt.',
    refs: [
      { book: 'apg', chapter: 17, verse: 1, note: 'Drei Sabbate in der Synagoge' },
      { book: '1thess', chapter: 1, verse: 1, note: 'Anschrift des Briefs' },
    ],
  },
  {
    id: 'beroea',
    name: 'Beröa',
    coords: [22.2, 40.52],
    kind: 'stadt',
    short: 'Die Apostelgeschichte lobt ihre Bewohner, weil sie das Gehörte an der Schrift prüften.',
    refs: [{ book: 'apg', chapter: 17, verse: 11, note: '„Sie forschten täglich in der Schrift“' }],
  },
  {
    id: 'zypern',
    name: 'Salamis auf Zypern',
    coords: [33.9, 35.18],
    kind: 'insel',
    rank: 1,
    short: 'Heimat des Barnabas und erste Station der ersten Missionsreise.',
    long: 'Zypern war reich an Kupfer – das lateinische Wort für Kupfer leitet sich vom Namen der Insel ab. Die jüdische Gemeinde war groß genug für mehrere Synagogen. Dass Barnabas von hier stammte, erklärt, warum die erste Reise dorthin führte.',
    refs: [
      { book: 'apg', chapter: 4, verse: 36, note: 'Barnabas, ein Zyprer' },
      { book: 'apg', chapter: 13, verse: 5, note: 'Erste Station der Reise' },
    ],
  },
  {
    id: 'paphos',
    name: 'Paphos',
    coords: [32.41, 34.76],
    kind: 'insel',
    short: 'Sitz des römischen Statthalters von Zypern.',
    long: 'Hier tritt zum ersten Mal ein römischer Amtsträger als Zuhörer auf – und von dieser Szene an nennt Lukas den Apostel nicht mehr Saulus, sondern Paulus.',
    refs: [{ book: 'apg', chapter: 13, verse: 6, note: 'Der Statthalter Sergius Paulus' }],
  },
  {
    id: 'rhodos',
    name: 'Rhodos',
    coords: [28.22, 36.44],
    kind: 'insel',
    short: 'Station auf der Rückreise der dritten Missionsreise.',
    refs: [{ book: 'apg', chapter: 21, verse: 1, note: 'Auf der Fahrt nach Jerusalem' }],
  },
  {
    id: 'patmos',
    name: 'Patmos',
    coords: [26.55, 37.31],
    kind: 'insel',
    rank: 1,
    lexicon: 'patmos',
    fact: 'rund 34 km²',
    short: 'Kleine Ägäisinsel, auf der Johannes die Offenbarung empfängt.',
    long: 'Eine karge Felseninsel vor der Küste Kleinasiens, kaum größer als ein größeres Stadtgebiet. Rom verbannte politisch Unbequeme auf solche Inseln – Verbannung war eine mildere Strafe als Zwangsarbeit, aber sie schnitt vom öffentlichen Leben ab. Der Text sagt selbst, Johannes sei „um des Wortes Gottes willen“ dort gewesen.',
    refs: [{ book: 'offb', chapter: 1, verse: 9, note: '„Ich war auf der Insel Patmos“' }],
  },
  {
    id: 'kreta',
    name: 'Kreta',
    coords: [24.75, 34.9],
    kind: 'insel',
    rank: 1,
    short: 'Vor ihrer Südküste beginnt der Seesturm, der zum Schiffbruch führt.',
    long: 'Die Segelsaison im Mittelmeer endete Mitte November; danach galt das Meer als geschlossen. Der Bericht in Apostelgeschichte 27 nennt Windrichtungen, Ankermanöver und Lotungen so genau, dass Seefahrtshistoriker ihn als Quelle für antike Navigation heranziehen.',
    refs: [
      { book: 'apg', chapter: 27, verse: 12, note: 'Der Aufbruch aus dem Guthafen' },
      { book: 'tit', chapter: 1, verse: 5, note: 'Titus bleibt auf Kreta' },
    ],
  },
  {
    id: 'malta',
    name: 'Malta',
    coords: [14.38, 35.9],
    kind: 'insel',
    rank: 1,
    short: 'Hier strandet das Schiff des Paulus; er bleibt drei Monate auf der Insel.',
    long: 'Die Strandung nach vierzehn Tagen Treiben passt zur vorherrschenden Windrichtung und zur Drift – eine der Berechnungen, die die Genauigkeit des Berichts stützen. Alle 276 Menschen an Bord kommen an Land.',
    refs: [{ book: 'apg', chapter: 28, verse: 1, note: 'Der Schiffbruch' }],
  },
  {
    id: 'syrakus',
    name: 'Syrakus',
    coords: [15.28, 37.07],
    kind: 'stadt',
    short: 'Station auf der letzten Etappe nach Rom.',
    refs: [{ book: 'apg', chapter: 28, verse: 12, note: 'Drei Tage in Syrakus' }],
  },
  {
    id: 'puteoli',
    name: 'Puteoli',
    coords: [14.12, 40.82],
    kind: 'stadt',
    today: 'Pozzuoli bei Neapel',
    short: 'Hauptumschlagplatz für Getreide aus Ägypten – hier geht Paulus in Italien an Land.',
    long: 'Der wichtigste Hafen Italiens, bevor Ostia ausgebaut wurde. Dass Paulus dort bereits Christen antrifft, zeigt: Die Botschaft war über die Handelswege längst vor ihm angekommen.',
    refs: [{ book: 'apg', chapter: 28, verse: 13, note: '„Da fanden wir Brüder“' }],
  },
  {
    id: 'rom',
    name: 'Rom',
    coords: [12.48, 41.89],
    kind: 'stadt',
    rank: 1,
    lexicon: 'rom',
    fact: 'etwa eine Million Einwohner',
    short: 'Hauptstadt des Reiches; die Apostelgeschichte endet mit Paulus unter Hausarrest.',
    long: 'Die größte Stadt der Antike, mit einer jüdischen Gemeinde von vielleicht 40 000 Menschen. Kaiser Claudius wies sie 49 n. Chr. wegen innerer Unruhen teilweise aus – Sueton nennt als Anlass Streit „auf Betreiben eines Chrestus“, worin viele einen verzerrten Hinweis auf Christus sehen. Genau diese Ausweisung führte Aquila und Priszilla nach Korinth. Die Apostelgeschichte endet ohne Urteil und ohne Tod: mit zwei Jahren Hausarrest und offener Verkündigung.',
    refs: [
      { book: 'apg', chapter: 28, verse: 16, note: 'Ankunft in Rom' },
      { book: 'apg', chapter: 28, verse: 30, note: 'Zwei Jahre Hausarrest' },
      { book: 'roem', chapter: 1, verse: 7, note: 'Anschrift des Briefs' },
    ],
  },

  /* ------------------------------------------------------- Landschaften */
  {
    id: 'galilaea',
    name: 'Galiläa',
    coords: [35.42, 32.95],
    kind: 'region',
    span: 0.7,
    rank: 1,
    short: 'Fruchtbarer Norden mit dichter Besiedlung; Wirkungsraum Jesu.',
    long: 'Ringsum von nichtjüdischem Gebiet umgeben – daher schon bei Jesaja „Galiläa der Heiden“. Die Landschaft war fruchtbarer und dichter besiedelt als Judäa; Josephus zählt (sicher übertrieben) 204 Ortschaften. Von Jerusalem aus galten Galiläer als provinziell, hörbar an ihrer Aussprache.',
    refs: [
      { book: 'mt', chapter: 4, verse: 15, note: '„Galiläa der Heiden“' },
      { book: 'mk', chapter: 1, verse: 14, note: 'Beginn des Wirkens Jesu' },
    ],
  },
  {
    id: 'judaea',
    name: 'Judäa',
    coords: [35.05, 31.62],
    kind: 'region',
    span: 0.8,
    rank: 1,
    short: 'Bergland um Jerusalem; ab 6 n. Chr. römische Provinz unter einem Präfekten.',
    long: 'Ein schmaler Höhenrücken, nach Osten steil zur Wüste abfallend. Nach der Absetzung des Archelaos wurde Judäa direkt römisch verwaltet – daraus folgten die Steuerschätzung, die römische Gerichtsbarkeit und die Zuständigkeit des Pilatus, ohne die die Passionserzählung nicht zu verstehen ist.',
    refs: [
      { book: 'mt', chapter: 2, verse: 1, note: 'Bethlehem im jüdischen Land' },
      { book: 'lk', chapter: 3, verse: 1, note: 'Pilatus als Landpfleger' },
    ],
  },
  {
    id: 'samarien',
    name: 'Samarien',
    coords: [35.0, 32.35],
    kind: 'region',
    span: 0.7,
    rank: 1,
    short: 'Landschaft zwischen Galiläa und Judäa, deren Bewohner mit Jerusalem zerstritten waren.',
    long: 'Wer von Galiläa nach Jerusalem zog, konnte durch Samarien gehen oder das Jordantal nehmen – viele wählten den Umweg. Der Streit reichte Jahrhunderte zurück: eigener Tempel auf dem Garizim, eigene Fassung der fünf Bücher Mose. Dass in einem Gleichnis ausgerechnet ein Samariter der Nächste ist, war für die ersten Hörer eine Zumutung.',
    refs: [
      { book: 'joh', chapter: 4, verse: 4, note: '„Er musste durch Samarien reisen“' },
      { book: 'apg', chapter: 8, verse: 5, note: 'Philippus in Samarien' },
    ],
  },
  {
    id: 'dekapolis',
    name: 'Dekapolis',
    coords: [35.95, 32.55],
    kind: 'region',
    span: 1.2,
    short: 'Bund griechisch geprägter Städte östlich des Sees; nichtjüdisches Gebiet.',
    long: 'Zehn selbstverwaltete Städte hellenistischen Zuschnitts mit Theatern, Tempeln und Gymnasien. Dass dort Schweineherden gehalten wurden, ist kein erzählerisches Detail, sondern Landeskunde: Es war kein jüdisches Land.',
    refs: [
      { book: 'mt', chapter: 4, verse: 25, note: 'Menschen aus den zehn Städten' },
      { book: 'mk', chapter: 5, verse: 20, note: 'Der Geheilte verkündigt in der Dekapolis' },
    ],
  },
  {
    id: 'phoenizien',
    name: 'Phönizien',
    coords: [35.35, 34.1],
    kind: 'region',
    span: 0.7,
    short: 'Schmaler Küstenstreifen der Handels- und Seefahrerstädte Tyrus und Sidon.',
    long: 'Zwischen Gebirge und Meer eingeklemmt, blieb den Phöniziern nur das Meer. Sie gründeten Kolonien bis Karthago und Spanien und gaben der Welt die Buchstabenschrift, aus der über das Griechische auch unser Alphabet hervorging.',
    refs: [{ book: 'apg', chapter: 11, verse: 19, note: 'Die Botschaft erreicht Phönizien' }],
  },
  {
    id: 'gilead',
    name: 'Gilead',
    coords: [35.85, 32.3],
    kind: 'region',
    span: 0.9,
    short: 'Bergland östlich des Jordan, bekannt für seinen Balsam.',
    refs: [
      { book: '1mo', chapter: 31, verse: 21, note: 'Jakob flieht ins Gebirge Gilead' },
      { book: 'jer', chapter: 8, verse: 22, note: '„Ist denn keine Salbe in Gilead?“' },
    ],
  },
  {
    id: 'baschan',
    name: 'Baschan',
    coords: [36.0, 32.85],
    kind: 'region',
    span: 0.8,
    short: 'Fruchtbare Hochebene im Nordosten, sprichwörtlich für starkes Vieh.',
    refs: [
      { book: '5mo', chapter: 3, verse: 1, note: 'Og, der König von Baschan' },
      { book: 'ps', chapter: 22, verse: 12, note: '„Starke Stiere von Baschan“' },
    ],
  },
  {
    id: 'moab',
    name: 'Moab',
    coords: [35.78, 31.25],
    kind: 'region',
    span: 0.9,
    short: 'Hochland östlich des Toten Meeres; Heimat Ruts.',
    long: 'Die Mescha-Stele, um 840 v. Chr. vom moabitischen König gesetzt, erzählt denselben Konflikt wie 2. Könige 3 – aus der Gegenseite. Sie nennt „Israel“ und mit einiger Wahrscheinlichkeit das „Haus Davids“ und ist damit eine der wichtigsten außerbiblischen Inschriften überhaupt.',
    refs: [
      { book: '4mo', chapter: 22, verse: 1, note: 'Israel lagert in den Gefilden Moabs' },
      { book: 'rut', chapter: 1, verse: 1, note: 'Die Familie zieht ins Land Moab' },
    ],
  },
  {
    id: 'edom',
    name: 'Edom',
    coords: [35.4, 30.4],
    kind: 'region',
    span: 1.1,
    short: 'Gebirgiges Land im Süden; im Text der verwandte und doch feindliche Nachbar.',
    long: 'Edom gilt als Nachkommenschaft Esaus – die Feindschaft ist deshalb im Text immer auch Brudergeschichte. Als Jerusalem 587 v. Chr. fiel, sollen sich Edomiter beteiligt haben; Obadja und Psalm 137 halten das fest.',
    refs: [
      { book: '4mo', chapter: 20, verse: 14, note: 'Edom verweigert den Durchzug' },
      { book: 'obd', chapter: 1, verse: 10, note: 'Der Vorwurf gegen den Bruder' },
    ],
  },
  {
    id: 'ammon',
    name: 'Ammon',
    coords: [36.0, 31.95],
    kind: 'region',
    span: 0.7,
    short: 'Nachbarreich östlich des Jordan mit der Hauptstadt Rabba, dem heutigen Amman.',
    refs: [
      { book: 'ri', chapter: 11, verse: 4, note: 'Der Krieg zur Zeit Jeftas' },
      { book: '2sam', chapter: 10, verse: 1, note: 'Davids Feldzug' },
    ],
  },
  {
    id: 'aram',
    name: 'Aram (Syrien)',
    coords: [37.2, 34.8],
    kind: 'region',
    span: 3,
    short: 'Aramäische Reiche im Norden – Jahrhunderte lang Nachbar, Gegner und Bündnispartner.',
    long: 'Das Aramäische wurde zur Verkehrssprache des ganzen Vorderen Orients und war zur Zeit Jesu die Alltagssprache in Galiläa. Teile von Daniel und Esra stehen auf Aramäisch; einzelne Worte Jesu sind im griechischen Text aramäisch stehen geblieben.',
    refs: [
      { book: '2koe', chapter: 5, verse: 1, note: 'Naaman, der Feldhauptmann' },
      { book: 'jes', chapter: 7, verse: 1, note: 'Rezin zieht gegen Jerusalem' },
    ],
  },
  {
    id: 'assyrien',
    name: 'Assyrien',
    coords: [42.4, 35.6],
    kind: 'region',
    span: 4,
    rank: 1,
    short: 'Erste Großmacht, die das Nordreich vernichtete und Juda tributpflichtig machte.',
    long: 'Assyrien erfand die systematische Deportation ganzer Oberschichten – so verschwand das Nordreich 722 v. Chr. als politische Größe. Sanheribs eigener Bericht über den Feldzug gegen Hiskia ist erhalten: Er rühmt sich, den König „wie einen Vogel im Käfig“ eingeschlossen zu haben – die Eroberung Jerusalems erwähnt er nicht.',
    refs: [
      { book: '2koe', chapter: 17, verse: 6, note: 'Das Ende des Nordreichs' },
      { book: 'jes', chapter: 10, verse: 5, note: '„Assur, die Rute meines Zorns“' },
    ],
  },
  {
    id: 'chaldaea',
    name: 'Chaldäa (Babylonien)',
    coords: [45.4, 31.4],
    kind: 'region',
    span: 3,
    rank: 1,
    short: 'Schwemmland zwischen Euphrat und Tigris, Kernland des babylonischen Reiches.',
    refs: [
      { book: 'hab', chapter: 1, verse: 6, note: 'Das grimmige Volk der Chaldäer' },
      { book: 'jer', chapter: 25, verse: 12, note: 'Siebzig Jahre für Babel' },
    ],
  },
  {
    id: 'persien',
    name: 'Persien',
    coords: [47.6, 31.2],
    kind: 'region',
    span: 4.5,
    rank: 1,
    short: 'Reich des Kyros, das die Rückkehr aus dem Exil erlaubte.',
    long: 'Anders als Assyrien und Babylon setzten die Perser auf lokale Selbstverwaltung und die Rückführung verschleppter Kulte. Der Kyros-Zylinder beschreibt genau diese Politik – aus persischer Sicht, ohne Israel zu nennen. Jesaja nennt Kyros ausdrücklich „meinen Gesalbten“: der einzige Nichtisraelit, dem dieser Titel gilt.',
    refs: [
      { book: 'esr', chapter: 1, verse: 1, note: 'Das Edikt des Kyros' },
      { book: 'dan', chapter: 8, verse: 20, note: 'Die Könige von Medien und Persien' },
    ],
  },
  {
    id: 'aegypten-land',
    name: 'Ägypten',
    coords: [30.8, 27.4],
    kind: 'region',
    span: 4,
    rank: 1,
    short: 'Land am Nil: Zufluchtsort bei Hungersnot und Sinnbild der Knechtschaft zugleich.',
    refs: [
      { book: '2mo', chapter: 1, verse: 8, note: '„Ein neuer König, der Josef nicht kannte“' },
      { book: 'mt', chapter: 2, verse: 13, note: 'Die Flucht nach Ägypten' },
    ],
  },
  {
    id: 'makedonien',
    name: 'Makedonien',
    coords: [22.4, 41.3],
    kind: 'region',
    span: 3,
    rank: 1,
    short: 'Römische Provinz im Norden Griechenlands – der erste europäische Boden der Mission.',
    refs: [
      { book: 'apg', chapter: 16, verse: 9, note: 'Der Ruf im Traum' },
      { book: '2kor', chapter: 8, verse: 1, note: 'Die Sammlung der Gemeinden' },
    ],
  },
  {
    id: 'achaia',
    name: 'Achaia',
    coords: [22.4, 38.3],
    kind: 'region',
    span: 2.5,
    short: 'Provinz mit Athen und Korinth; Verwaltungssitz war Korinth, nicht Athen.',
    refs: [
      { book: 'apg', chapter: 18, verse: 12, note: 'Gallio, Statthalter von Achaia' },
      { book: 'roem', chapter: 15, verse: 26, note: 'Die Kollekte für Jerusalem' },
    ],
  },
  {
    id: 'asia',
    name: 'Provinz Asien',
    coords: [29.6, 39.4],
    kind: 'region',
    span: 4,
    rank: 1,
    short: 'Reichste Provinz Kleinasiens mit Ephesus als Hauptstadt; Adressatin der sieben Sendschreiben.',
    long: 'Der Kaiserkult war hier besonders stark verankert – mehrere Städte wetteiferten um das Recht, einen Tempel für den Kaiser zu bauen. Vor diesem Hintergrund ist die Offenbarung geschrieben.',
    refs: [
      { book: 'apg', chapter: 19, verse: 10, note: 'Alle in Asien hören das Wort' },
      { book: 'offb', chapter: 1, verse: 11, note: 'Die sieben Gemeinden' },
    ],
  },
  {
    id: 'galatien',
    name: 'Galatien',
    coords: [33.2, 39.4],
    kind: 'region',
    span: 3,
    short: 'Hochland Kleinasiens, besiedelt von eingewanderten Kelten; Adressat des Galaterbriefs.',
    long: 'Ob der Brief an die keltischen Gemeinden im Norden oder an die Städte der ersten Missionsreise im Süden der gleichnamigen Provinz geht, ist bis heute offen – und entscheidet mit über seine Datierung.',
    refs: [
      { book: 'apg', chapter: 16, verse: 6, note: 'Die Reise durch Galatien' },
      { book: 'gal', chapter: 1, verse: 2, note: 'An die Gemeinden in Galatien' },
    ],
  },
];

export function findPlace(id: string): MapPlace | undefined {
  return PLACES.find((p) => p.id === id);
}

/** Der Kartenort zu einem Lexikoneintrag, falls es einen gibt. */
export function placeForLexicon(lexiconId: string): MapPlace | undefined {
  return PLACES.find((p) => p.lexicon === lexiconId);
}

/* --------------------------------------------------------- Ausschnitte */

export interface MapView {
  id: string;
  label: string;
  /** Geografischer Rahmen: [West, Süd, Ost, Nord] */
  bounds: [number, number, number, number];
}

/**
 * Voreingestellte Ausschnitte. Die Levante ist auf der Gesamtkarte so
 * gedrängt, dass ohne Zoom kaum etwas zu erkennen wäre.
 */
export const MAP_VIEWS: MapView[] = [
  { id: 'welt', label: 'Ganze Welt der Bibel', bounds: [10, 22, 50, 46] },
  { id: 'israel', label: 'Israel', bounds: [34.2, 30.6, 36.3, 33.8] },
  { id: 'levante', label: 'Levante und Ägypten', bounds: [29, 26, 40, 37.5] },
  { id: 'aegaeis', label: 'Ägäis und Kleinasien', bounds: [21, 34, 36, 41.8] },
  { id: 'mesopotamien', label: 'Mesopotamien', bounds: [35, 29, 50, 38] },
  { id: 'westen', label: 'Griechenland und Italien', bounds: [11, 33, 29, 42.5] },
];
