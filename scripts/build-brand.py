#!/usr/bin/env python3
"""
Erzeugt die Markenbilder aus der gelieferten Vorlage.

Die Vorlage `brand/entgegen-original.png` enthält beides nebeneinander auf
einem Creme-Verlauf: links das App-Icon als gerundetes Quadrat, rechts den
Schriftzug. Dieses Skript schneidet beides heraus, stellt den Schriftzug frei
und legt die Größen an, die Browser und Betriebssysteme erwarten.

Die Ergebnisse liegen im Repository (`public/`), das Skript muss also nur
laufen, wenn sich die Vorlage ändert:

    pip install Pillow
    python3 scripts/build-brand.py

Abhängigkeit: Pillow. Sie wird bewusst nicht in package.json geführt – die
Bilder sind fertig eingecheckt, der normale Build braucht sie nicht.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
QUELLE = ROOT / 'brand' / 'entgegen-original.png'
ZIEL = ROOT / 'public'

# Ausschnitte in der Vorlage, an den sichtbaren Kanten abgemessen.
ICON = (162, 205, 491, 550)
SCHRIFTZUG = (556, 236, 1252, 522)

# Aus der Vorlage entnommen – dieselben Werte stehen in global.css.
TEAL = (22, 76, 88)

# Hilfsfarbe der Freistellung; kommt in der Vorlage nirgends vor.
MARKE = (255, 0, 0)


def freistellen(bild: Image.Image, box: tuple[int, int, int, int]) -> Image.Image:
    """
    Trennt den Schriftzug vom Creme-Hintergrund.

    Eine feste Helligkeitsschwelle scheitert hier: Der Hintergrund ist ein
    weicher Verlauf, und das Gold des Schwungs ist selbst recht hell. Deshalb
    wird der Hintergrund aus den vier Ecken des Ausschnitts bilinear geschätzt.
    Was davon abweicht, gehört zur Schrift – und wird um den Creme-Anteil
    bereinigt, sonst bliebe an jeder Kante ein heller Saum stehen.
    """
    ausschnitt = bild.crop(box)
    breite, hoehe = ausschnitt.size
    quelle = ausschnitt.load()

    ol = bild.getpixel((box[0] + 2, box[1] + 2))
    orr = bild.getpixel((box[2] - 2, box[1] + 2))
    ul = bild.getpixel((box[0] + 2, box[3] - 2))
    ur = bild.getpixel((box[2] - 2, box[3] - 2))

    ergebnis = Image.new('RGBA', (breite, hoehe))
    ziel = ergebnis.load()

    for y in range(hoehe):
        fy = y / (hoehe - 1)
        for x in range(breite):
            fx = x / (breite - 1)
            hintergrund = [
                (ol[i] * (1 - fx) + orr[i] * fx) * (1 - fy)
                + (ul[i] * (1 - fx) + ur[i] * fx) * fy
                for i in range(3)
            ]
            r, g, b = quelle[x, y]
            abstand = max(abs(r - hintergrund[0]), abs(g - hintergrund[1]), abs(b - hintergrund[2]))

            # Bis 14 reiner Hintergrund, ab 60 volle Deckung, dazwischen weich.
            alpha = min(1.0, max(0.0, (abstand - 14) / 46))
            if alpha == 0:
                ziel[x, y] = (0, 0, 0, 0)
                continue

            teiler = 1 / alpha
            ziel[x, y] = (
                *(
                    max(0, min(255, round(hintergrund[i] - (hintergrund[i] - kanal) * teiler)))
                    for i, kanal in enumerate((r, g, b))
                ),
                round(alpha * 255),
            )

    return ergebnis.crop(ergebnis.getbbox())


def ecken_freistellen(icon: Image.Image) -> Image.Image:
    """
    Macht die vier Ecken außerhalb des gerundeten Quadrats durchsichtig.

    In der Vorlage steht das Icon auf Creme, die Ecken tragen diese Farbe also
    mit. Auf einer Kachelfläche oder unter der Maske von Android sähe man sie
    als helle Zipfel. Statt einen Radius zu raten, wird der Hintergrund von den
    Ecken aus geflutet – so folgt die Freistellung der tatsächlichen Silhouette.

    Zwei Werte sind heikel. Die Toleranz muss den weichen Schatten unter dem
    Icon mitnehmen (sonst bleibt ein beiger Zipfel stehen), darf aber nicht bis
    zum Teal des Rahmens reichen – ab etwa 340 läuft die Flut durch den Rahmen
    und frisst das ganze Bild. Und die Markierungsfarbe muss weit vom Creme
    entfernt liegen: Pillow bricht sofort ab, wenn sie innerhalb der Toleranz
    liegt, und füllt dann gar nichts.
    """
    maske = Image.new('L', icon.size, 255)
    hilfs = icon.convert('RGB').copy()
    for ecke in ((0, 0), (icon.width - 1, 0), (0, icon.height - 1), (icon.width - 1, icon.height - 1)):
        ImageDraw.floodfill(hilfs, ecke, MARKE, thresh=320)

    px = hilfs.load()
    mp = maske.load()
    for y in range(icon.height):
        for x in range(icon.width):
            if px[x, y] == MARKE:
                mp[x, y] = 0

    # Eine Spur weichzeichnen, damit die Rundung nicht ausgefranst wirkt.
    freigestellt = icon.convert('RGBA')
    freigestellt.putalpha(maske.filter(ImageFilter.GaussianBlur(0.8)))
    return freigestellt


def aufhellen(bild: Image.Image) -> Image.Image:
    """
    Fassung für das dunkle Erscheinungsbild.

    Das Teal des Schriftzugs ist auf dunklem Grund zu dunkel zum Lesen. Nur
    dieser Farbanteil wird aufgehellt; das Gold des Weges bleibt, wie es ist –
    es trägt auf beiden Untergründen.
    """
    hell = bild.copy()
    px = hell.load()
    for y in range(hell.height):
        for x in range(hell.width):
            r, g, b, a = px[x, y]
            if a and b > r + 12:  # Teal, nicht Gold
                # Die Kanäle werden ungleich angehoben: Rot am wenigsten,
                # Blau am stärksten. Gleichmäßiges Aufhellen ergäbe ein
                # blasses Graublau, das mit dem Icon nichts mehr gemein hat.
                px[x, y] = (
                    min(255, round(r + (255 - r) * 0.43)),
                    min(255, round(g + (255 - g) * 0.61)),
                    min(255, round(b + (255 - b) * 0.68)),
                    a,
                )
    return hell


def sparsam(bild: Image.Image, ziel: Path, farben: int = 200) -> None:
    """
    Speichert mit reduzierter Farbtabelle.

    Das Zeichen besteht aus zwei Farbverläufen und einer Fläche – volle
    24-Bit-Tiefe kostet hier das Fünffache an Dateigröße, ohne dass man den
    Unterschied sieht. Das zählt, weil Icon und Schriftzug im Vorab-Cache der
    App liegen und damit bei jeder Installation mitkommen.
    """
    bild.quantize(colors=farben, method=Image.FASTOCTREE).save(ziel, optimize=True)


def main() -> None:
    vorlage = Image.open(QUELLE).convert('RGB')

    # --- App-Icon -----------------------------------------------------------
    # Der gerundete Rahmen der Vorlage ist 329 x 345 Pixel groß, also nicht
    # ganz quadratisch. Ein App-Icon muss es sein; die Stauchung um fünf
    # Prozent fällt in keiner der Anzeigegrößen auf.
    icon = ecken_freistellen(vorlage.crop(ICON).resize((512, 512), Image.LANCZOS))
    sparsam(icon, ZIEL / 'icon-512.png', 256)
    sparsam(icon.resize((192, 192), Image.LANCZOS), ZIEL / 'icon-192.png')
    sparsam(icon.resize((180, 180), Image.LANCZOS), ZIEL / 'apple-touch-icon.png')

    # Browserkachel. Eine nachgezeichnete SVG-Fassung wäre bei 16 Pixeln zwar
    # schärfer, sähe aber anders aus als das Zeichen überall sonst – und bei
    # dieser Größe ist ohnehin jedes Icon unscharf. Also lieber das echte.
    for kante in (32, 48):
        sparsam(icon.resize((kante, kante), Image.LANCZOS), ZIEL / f'favicon-{kante}.png', 64)

    # Maskierbares Icon: Android schneidet je nach Gerät Kreise, abgerundete
    # Quadrate oder Tropfen aus. Deshalb sitzt die Grafik auf ganzer Fläche
    # Teal und hält den vorgeschriebenen Sicherheitsrand von 20 Prozent ein.
    maskierbar = Image.new('RGBA', (512, 512), (*TEAL, 255))
    innen = icon.resize((307, 307), Image.LANCZOS)
    maskierbar.paste(innen, (102, 102), innen)
    sparsam(maskierbar, ZIEL / 'icon-maskable.png', 256)

    # --- Schriftzug ---------------------------------------------------------
    # Beide Fassungen liegen im Vorab-Cache der App, damit die Seite auch ohne
    # Verbindung vollständig aussieht. Deshalb werden sie auf die doppelte
    # Anzeigebreite begrenzt statt in voller Auflösung mitgeschleppt – das
    # reicht für hochauflösende Bildschirme und halbiert die Dateigröße.
    schriftzug = freistellen(vorlage, SCHRIFTZUG)
    klein = schriftzug.resize(
        (560, round(560 / schriftzug.width * schriftzug.height)), Image.LANCZOS
    )
    sparsam(klein, ZIEL / 'schriftzug.png')
    sparsam(aufhellen(klein), ZIEL / 'schriftzug-dunkel.png')

    # Vorschaubild für geteilte Links: der Schriftzug mittig auf Creme.
    vorschau = Image.new('RGB', (1200, 630), (247, 244, 238))
    breit = schriftzug.resize(
        (840, round(840 / schriftzug.width * schriftzug.height)), Image.LANCZOS
    )
    vorschau.paste(breit, ((1200 - breit.width) // 2, (630 - breit.height) // 2), breit)
    vorschau.save(ZIEL / 'vorschau.png', optimize=True)

    print(f'Icon        : {icon.size[0]}x{icon.size[1]}, dazu 192, 180, 48, 32 und maskierbar')
    print(f'Schriftzug  : {klein.width}x{klein.height}, hell und dunkel')
    print(f'Vorschaubild: {vorschau.size[0]}x{vorschau.size[1]}')


if __name__ == '__main__':
    main()
