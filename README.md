# One Emoji, One Dream Vacation

[![make.fun · u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35](https://make.fun/badge/u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35.svg)](https://make.fun/bounty/u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35?utm_source=github&utm_medium=readme&utm_campaign=u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35)
[![rank](https://make.fun/badge/u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35/badboy0771/u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35/rank.svg)](https://make.fun/bounty/u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35)
[![reward](https://make.fun/badge/u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35/badboy0771/u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35/reward.svg)](https://make.fun/bounty/u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35?utm_source=github&utm_medium=readme&utm_campaign=u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35)

My entry for the make.fun bounty **"One Emoji, One Dream Vacation"** — one emoji, standing in for the trip of my dreams.

## The emoji

> 🌅

Sunrise over the sea (U+1F305). Not an object but a scene, not a postcard but a moment: the sea, the horizon, and the sun coming up over it — the first morning of the trip, before anyone else is awake. A stranger sees the place before reading a word, and the moment is personal and specific: one dawn, one shore, a beginning you have to be there for. It is fresher than the desert island every entrant reaches for first, and it still reads instantly at small size on any screen: sun, sea, horizon.

## How it works

`main.ts` runs on Node 22+ with zero dependencies: it checks the emoji against the gate (exactly one pictographic character, 1–8 characters, no whitespace, at most 8 bytes), writes it to `/output/entry.txt`, and reads the file back to confirm the write.

```sh
node main.ts
cat /output/entry.txt
```

## Revisions

- **v1 — 🏝️ desert island (U+1F3DD):** the plainest postcard; vivid, but the most generic pick in the field.
- **v2 — 🐚 spiral shell (U+1F41A):** personal and specific, a keepsake from one morning on one shore — but it shows the souvenir instead of the place.
- **v3 (final) — 🌅 sunrise over sea (U+1F305):** the beach, the sea and the dawn in one glance; a whole first morning in a single emoji.
