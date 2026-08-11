# Cone Reflex Trainer

A mobile-first visual reaction-time trainer for football (soccer) cone drills.
Prop a phone or tablet up nearby, pick a game mode, and react to the color
cues by touching the matching physical cone. Every mode is fully hands-off:
colors change automatically on a timer — the screen is never something you
need to tap to make the drill proceed.

No backend, no accounts, no storage — everything lives in memory for the
session, so a page refresh resets progress by design.

## Game modes

- **Call & Touch** — a color flashes, changes automatically on a timer,
  repeat. Open-ended; exit whenever you're done.
- **Beat the Clock** — same automatic flashing, capped by a duration
  (30/60/90s) instead of an exit button.
- **React & Sprint** — same automatic flashing, capped by a target rep count
  (10/20/30) instead of a duration — a defined "set."
- **Sequence Recall** — watch a growing pattern of colors play back, then
  attempt it from memory on the cones. Self-report "Nailed it" / "Missed it"
  since there's no sensor to verify a physical attempt.
- **Double Call** — two colors shown at once (split screen), touch both
  cones. Requires at least 2 active colors.
- **Go / No-Go** — most colors mean go touch the cone; one designated
  No-Go color (marked with a slashed-circle overlay) means freeze. Requires
  at least 2 active colors.

Every mode shares one interval-driven engine (`useAutoAdvance`), except
Sequence Recall, which needs its own round-based hook (`useSequenceSession`)
since it waits on a physical memory attempt rather than a fixed timer.

## Local development

```bash
npm install
npm run dev
```

Open the printed `http://localhost:5173` URL. For testing on a phone on the
same Wi-Fi network, run `npm run dev -- --host` instead and use the LAN URL
it prints.

## Build

```bash
npm run build
```

Outputs a static site to `dist/`. `npm run preview` serves that build
locally to sanity-check it before deploying.

## Project structure

- `src/config/` — tunable data: cone colors, game mode list, speed/duration/
  rep-count settings.
- `src/engine/useAutoAdvance.js` — shared timer-driven engine used by five of
  the six modes (Call & Touch, Beat the Clock, React & Sprint, Double Call,
  Go/No-Go); `useSequenceSession.js` is Sequence Recall's dedicated hook.
- `src/screens/` — one component per screen (`GameSelect`, `GameConfig`,
  `Summary`, plus `Play.jsx` dispatching to a `Play*.jsx` per mode).
- `src/components/PlayChrome.jsx` — shared play-screen chrome: the exit
  button, the speed overlay, and the seconds-per-cue reference pill.

## Privacy

This app is intentionally unlisted: `robots.txt` disallows all crawlers and
`index.html` carries a `noindex, nofollow` meta tag. There's no analytics or
tracking. Treat the deployed URL itself as the access control — anyone with
the link can open the app.
