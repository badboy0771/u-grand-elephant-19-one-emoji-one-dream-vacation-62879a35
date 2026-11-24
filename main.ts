// One Emoji, One Dream Vacation — a single emoji, nothing else.
// The program validates the emoji against the bounty gate, writes it to
// /output/entry.txt, then reads the file back to confirm the write landed.
//
// The emoji (final): U+1F305 SUNRISE OVER SEA. It keeps v2's specificity
// and puts the place back in the picture: not an object but a scene, not a
// postcard but a moment. A stranger sees the sea, the horizon and the sun
// coming up over it — the first morning of the trip, before anyone else is
// awake — which is exactly the judge's second criterion: the place arrives
// before a single word is read. It is personal and specific (criterion 3):
// one dawn, one shore, a moment you have to be there for, not any holiday
// in general. And it is fresh (criterion 4) where the desert island is the
// first image every entrant reaches for: a sunrise is a feeling as much as
// a place, the trip as a beginning rather than a backdrop. It still reads
// instantly at small size on any screen (criterion 5): sun, sea, horizon,
// three shapes a child could draw.
//
// Rejected: v1 U+1F3DD desert island — the plainest postcard, vivid but the
// most generic pick in the field, loses on specificity and surprise to any
// entry with a moment of its own. v2 U+1F41A spiral shell — personal and
// specific, a keepsake from one morning on one shore, but it shows the
// souvenir instead of the place, so it can lose on vividness to any emoji
// that puts the stranger on the beach itself. The sunrise wins the
// head-to-head against both: it is the beach, the sea and the dawn in one
// glance, and no other single emoji holds a whole first morning.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// U+1F305, exactly one code point, 4 bytes in UTF-8. Written as an escape
// so no variation selector or invisible joiner can sneak in.
const ENTRY = "\u{1F305}";

function checkEntry(emoji: string): string {
  // The gate: /output/entry.txt must be UTF-8 text of 1 to 8 characters,
  // not only white space. This entry aims far inside it: one character.
  const graphemes = [...emoji];
  if (graphemes.length !== 1) {
    throw new Error(`entry must be exactly one emoji, got ${graphemes.length} graphemes`);
  }
  if (emoji.trim() !== emoji || /\s/.test(emoji)) {
    throw new Error("entry must not contain whitespace");
  }
  // One emoji means one code point that is actually pictographic.
  if (!/^\p{Extended_Pictographic}$/u.test(emoji)) {
    throw new Error("entry must be a single pictographic character");
  }
  // Tie-breaks favour smaller text, so keep the byte count minimal too.
  const bytes = new TextEncoder().encode(emoji).length;
  if (bytes > 8) {
    throw new Error(`entry is ${bytes} bytes, gate allows at most 8 characters`);
  }
  return emoji;
}

function main(): void {
  const validated = checkEntry(ENTRY);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", validated, "utf8");
  const back = readFileSync("/output/entry.txt", "utf8");
  if (back !== validated) {
    throw new Error("read-back mismatch: /output/entry.txt does not hold the entry");
  }
  console.log(`wrote ${validated} (${[...validated].length} grapheme, ${new TextEncoder().encode(validated).length} bytes) to /output/entry.txt`);
}

main();
