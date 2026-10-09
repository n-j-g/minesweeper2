# Minesweeper 2

Minesweeper where a solved board never comes down to a guess.

**Play:** https://n-j-g.github.io/minesweeper2/

## What's different

- **Naive fill.** A number touching exactly as many covered cells as its value gets those cells marked, and a number whose marks already match its value opens its other neighbors. This repeats in waves until neither rule applies. It never combines two numbers, so every overlap puzzle is left for you.
- **Settle.** When nothing on the board is guaranteed safe, the game picks something to settle: a true 50/50 group if one exists, otherwise the edge cell least likely to be a mine. Settle reveals it with no risk. You can also select a 50/50 group yourself; it only qualifies if the board allows exactly two layouts for it and nothing could ever tell them apart.
- **Cheats.** "Safe cells" highlights every cell that is guaranteed safe right now: 0 uses on Beginner, 1 on Intermediate, 3 on Expert. An "Unlimited cheats" switch in the menu turns it into a live overlay.

## Install on iPhone

1. Open the link above in Safari.
2. Tap **Share**, then **Add to Home Screen**.
3. Launch it from the icon once while online. After that it works with no connection.

Updates arrive automatically: the app checks for a new version in the background when it has a connection, and uses it the next time you open it.

## Files

- `index.html`: the whole game (markup, styles, solver and UI)
- `sw.js`: offline cache. Bump `CACHE` when shipping changes so old files are cleared.
- `manifest.webmanifest`, `icons/`: Home Screen app details
- `fonts/`: Martian Mono and Instrument Sans (SIL Open Font License), bundled so the game looks the same offline
