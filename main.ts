// One Emoji, One Dream Vacation — a single emoji, nothing else.
// The program validates the emoji against the bounty gate, writes it to
// /output/entry.txt, then reads the file back to confirm the write landed.
//
// The emoji (v1): U+1F3DD DESERT ISLAND. The most direct postcard there is:
// sun, sea, sand and one palm, the image every "dream vacation" search
// returns first. Chosen as the baseline because it is the plainest possible
// reading of the brief — a stranger sees beach, island and escape in one
// glance, no words needed, readable at any size on any screen.
//
// The risk, and why this is only v1: it is also the most obvious pick in the
// field. The judge's third and fourth criteria reward the specific and the
// fresh over the generic, so a later revision should trade some of this
// instant obviousness for a moment or a detail that belongs to one trip
// rather than every holiday.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// U+1F3DD, exactly one code point, 4 bytes in UTF-8. Written as an escape
// so no variation selector or invisible joiner can sneak in.
const ENTRY = "\u{1F3DD}";

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
