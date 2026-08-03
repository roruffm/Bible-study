/**
 * Beschriftungen auf der Karte so verteilen, dass sie sich möglichst nicht
 * überdecken.
 *
 * Kartenbeschriftung ist ein bekanntes Optimierungsproblem; hier genügt ein
 * einfaches gieriges Verfahren: Für jeden Punkt werden mögliche Positionen der
 * Reihe nach durchprobiert (rechts, links, darüber, darunter …) und die erste
 * genommen, die frei ist. Bei wenigen Dutzend Punkten reicht das völlig.
 */

export interface LabelInput {
  x: number;
  y: number;
  text: string;
}

export type Anchor = 'start' | 'end' | 'middle';

export interface PlacedLabel extends LabelInput {
  labelX: number;
  labelY: number;
  anchor: Anchor;
  /** Wahr, wenn keine freie Position gefunden wurde. */
  crowded: boolean;
}

interface Box {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function overlaps(a: Box, b: Box): boolean {
  return !(a.x2 < b.x1 || b.x2 < a.x1 || a.y2 < b.y1 || b.y2 < a.y1);
}

/**
 * @param unit Größe eines Bildschirmpixels in Zeichenkoordinaten – bei
 *             gezoomter Ansicht sind Beschriftungen sonst riesig.
 */
export function layoutLabels(items: LabelInput[], unit = 1): PlacedLabel[] {
  // Die Punkte selbst gelten von Anfang an als belegt, damit keine
  // Beschriftung auf einem fremden Ortspunkt zu liegen kommt.
  const placed: Box[] = items.map((item) => ({
    x1: item.x - 6 * unit,
    y1: item.y - 6 * unit,
    x2: item.x + 6 * unit,
    y2: item.y + 6 * unit,
  }));

  return items.map((item) => {
    // Grobe Textbreite; genauer ginge nur durch Messen im Browser.
    const width = item.text.length * 5.6 * unit;
    const height = 11 * unit;
    const gap = 9 * unit;

    const candidates: [number, number, Anchor][] = [
      [item.x + gap, item.y + 4 * unit, 'start'],
      [item.x - gap, item.y + 4 * unit, 'end'],
      [item.x, item.y - 10 * unit, 'middle'],
      [item.x, item.y + 17 * unit, 'middle'],
      [item.x + gap, item.y - 9 * unit, 'start'],
      [item.x - gap, item.y - 9 * unit, 'end'],
      [item.x + gap, item.y + 17 * unit, 'start'],
      [item.x - gap, item.y + 17 * unit, 'end'],
      [item.x, item.y - 24 * unit, 'middle'],
      [item.x, item.y + 31 * unit, 'middle'],
    ];

    for (const [labelX, labelY, anchor] of candidates) {
      const left =
        anchor === 'start' ? labelX : anchor === 'end' ? labelX - width : labelX - width / 2;
      const box: Box = { x1: left, y1: labelY - height, x2: left + width, y2: labelY };

      if (!placed.some((other) => overlaps(other, box))) {
        placed.push(box);
        return { ...item, labelX, labelY, anchor, crowded: false };
      }
    }

    // Nichts frei: erste Position nehmen und den Punkt als gedrängt melden,
    // damit die Darstellung ihn zurücknehmen kann.
    const [labelX, labelY, anchor] = candidates[0];
    return { ...item, labelX, labelY, anchor, crowded: true };
  });
}
