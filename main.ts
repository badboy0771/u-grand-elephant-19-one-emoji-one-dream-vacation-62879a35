// One Emoji, One Dream Vacation — a single emoji, nothing else.
// The program validates the emoji against the bounty gate, writes it to
// /output/entry.txt, then reads the file back to confirm the write landed.
//
// The emoji (v2): U+1F41A SPIRAL SHELL. A deliberate turn away from v1's
// postcard cliché: instead of the whole island, one small thing a traveller
// actually picks up on the beach and carries home. It is personal and
// specific where the desert island is generic — a shell belongs to one
// morning, one shore, one person bending down — and it carries a spark of
// wit: the whole dream vacation folded into a souvenir the size of a coin.
//
// The risk, and why this is not yet final: the judge's second criterion
// wants the stranger to see the place before reading a word, and a shell
// shows a keepsake, not the place itself. Against a plain beach or island
// it can lose on vividness even while it wins on specificity. The final
// revision should keep v2's specificity but put the place back in the
// picture: a scene, not an object, and a moment, not a postcard.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// U+1F41A, exactly one code point, 4 bytes in UTF-8. Written as an escape
// so no variation selector or invisible joiner can sneak in.
const ENTRY = "\u{1F41A}";

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
