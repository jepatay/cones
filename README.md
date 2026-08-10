# Cone Reflex Trainer

A mobile-first visual reaction-time trainer for football (soccer) cone drills.
Prop a phone or tablet up nearby, pick a game mode, and react to the color
cues while you touch/sprint to the matching cone.

No backend, no accounts, no storage — everything lives in memory for the
session, so a page refresh resets progress by design.

## Game modes

- **Call & Touch** — a color flashes, tap the screen when you react, repeat.
- **Beat the Clock** — colors fire on a fixed interval for a set duration;
  tap as many as you can before time runs out.
- **React & Sprint** — like Call & Touch, but every rep is timed, with an
  average/best reaction time shown at the end.
- Sequence Recall, Double Call, Go/No-Go — stubbed as "Coming soon" tiles,
  wired into the same select → config → play → summary flow for later.

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

- `src/config/` — tunable data: cone colors, game mode list, speed/duration
  settings.
- `src/engine/useReflexSession.js` — shared "flash a color, wait, repeat"
  engine used by all three built game modes.
- `src/screens/` — one component per screen (`GameSelect`, `GameConfig`,
  `Play`, `Summary`).

## Privacy

This app is intentionally unlisted: `robots.txt` disallows all crawlers and
`index.html` carries a `noindex, nofollow` meta tag. There's no analytics or
tracking. Treat the deployed URL itself as the access control — anyone with
the link can open the app.
