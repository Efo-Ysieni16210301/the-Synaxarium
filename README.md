# Feasts of the Saints — bilingual, offline-first

A scaffold for a Next.js + TypeScript + Tailwind app that shows the
Ethiopian/Eritrean Orthodox saint(s) commemorated on each day of the
**Ethiopian calendar**, in English and Amharic, working offline, and
packaged for web, desktop, and Android from one codebase.

## Why this architecture

**One static export, three targets.** `next.config.js` sets
`output: 'export'`, which turns the whole app into a folder of plain
HTML/CSS/JS (`out/`). That single folder can be:

1. **Hosted on the web** and installed as a PWA (desktop Chrome/Edge:
   "Install app"; Android Chrome: "Add to Home screen"). This alone
   gets you an installable, offline-capable app on both platforms
   with no extra tooling.
2. **Wrapped for Android** with [Capacitor](https://capacitorjs.com)
   (`capacitor.config.ts` is included) to produce a real `.apk`/`.aab`
   for the Play Store.
3. **Wrapped for desktop** with [Tauri](https://tauri.app) (recommended:
   small binaries, uses the OS's native webview) or Electron, if you
   want a downloadable desktop installer instead of "just" a PWA.

**No server needed at runtime.** All content lives in versioned JSON
files bundled into the app at build time (`src/data/feasts/*.json`).
There's no database and no API to go offline-sync — the entire
dataset simply ships inside the app, which is the simplest possible
offline story for content that changes rarely (saints' days don't
move).

**Ethiopian calendar first.** Feast days are keyed by Ethiopian month
and day (`src/lib/ethiopianCalendar.ts` converts today's Gregorian
date to Ethiopian on the client). This is the detail most "just build
a calendar app" tutorials get wrong for this use case.

## Adding a saint's image

Each saint in `Saint` (`src/types/feast.ts`) has an optional
`imageId` — a filename that lives under `public/saints/`. Set it in
that saint's JSON entry:

```json
{
  "id": "bartholomew-the-apostle",
  "imageId": "bartholomew.jpg",
  ...
}
```

and drop `bartholomew.jpg` into `public/saints/`. `FeastCard` shows a
small circular thumbnail per saint (falling back to a plain initial
badge if no image is set yet), and the full story page shows a larger
version. Nothing else needs to change - the lookup is just
`/saints/${saint.imageId}`.

Two things worth knowing:

- **Offline**: images are plain `<img>` tags, not `next/image` (there's
  no image-optimization server in a static export). The service
  worker's cache-first strategy already caches whatever the browser
  fetches, images included, so once a saint's page has been opened
  online, that image is available offline too - no extra wiring needed.
- **Rights**: see `public/saints/README.txt` - traditional icon images
  and photos pulled from Telegram posts or church sites are usually
  still copyrighted, even when shared freely. Use your own images, a
  clearly public-domain/openly-licensed source, or get permission
  before shipping.

## Browsing by date

Beyond "today's feast" on the home page, three routes let someone
jump to any Ethiopian date and read the saints for that day:

- `/browse/` — grid of all 13 Ethiopian months
- `/month/[month]/` — every day in that month, highlighting which
  days already have a saint entry
- `/day/[month]/[day]/` — the feast for that specific date, with a
  dropdown to jump straight to a different month/day

All three are pre-rendered for every possible date at build time
(`generateStaticParams` in each page), so browsing works completely
offline once the app has been opened once — there's no "loading"
state waiting on a network request.

## Feature ideas for where to take this next

- **Full year of data**: one JSON file per Ethiopian day (or per
  month, if you prefer fewer files) — the loader in
  `src/data/feasts/index.ts` just needs one more import line per file.
- **Notifications**: a small daily local notification ("Today: Saint
  X") — trivial in Capacitor (`@capacitor/local-notifications`), and
  on desktop via the Notifications API once installed as a PWA.
- **Search**: a simple client-side search across saint names once you
  have real content (e.g. with `flexsearch` or even a naive `.filter`,
  since the whole dataset already ships in the bundle).
- **A "browse by month" grid** using `getAllFeasts()` — the data layer
  already supports this, only a new page/component is needed.
- **Favorites/bookmarks**: store saint IDs in `localStorage` (already
  wired up as the pattern for the language preference).
- **Third language**: widen `Localized` in `src/types/feast.ts` (e.g.
  add `ti` for Tigrinya) and add the key to each JSON file and each
  `i18n/*.json` dictionary — nothing else changes.
- **Icon/short-description sharing**: a "share today's feast" button
  using the Web Share API (works in the installed PWA on both Android
  and desktop Chrome/Edge).

## Content — please read before publishing

The sample file (`src/data/feasts/1-1.json`) has short, original
summaries and placeholder `story` fields
(`REPLACE_WITH_FULL_STORY_TEXT_YOU_HAVE_RIGHTS_TO_PUBLISH`). Fill
those in with content you have the right to publish — e.g. your own
writing, a public-domain translation of the Synaxarium, or text
you've gotten permission to use from whoever holds rights to it
(church publications, Telegram channels, etc. are typically someone's
copyrighted work even when shared freely). This matters more once
the app is public and installable, not just for a private prototype.

## Getting it running

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # writes the static export to ./out
```

## Packaging for Android (Capacitor)

```bash
npm run build                # produces ./out
npx cap add android          # first time only
npm run cap:sync             # copies ./out into the native project
npm run cap:android          # opens Android Studio to build/run/sign
```

## Packaging for desktop

**Simplest path — installable PWA:** deploy `out/` to any static
host (or even open it from disk) and use the browser's "Install app."
The service worker (`public/sw.js`) already handles offline caching.

**Native installer path — Tauri:** `npm create tauri-app@latest` in a
sibling folder (or follow Tauri's "existing frontend" guide), point
its `frontendDist` at this project's `out/` folder, and build. Tauri
produces a small native binary for Windows/macOS/Linux from the same
static export.

## Fonts and true offline support

`src/app/globals.css` currently loads Noto Sans Ethiopic from Google
Fonts over the network, which will fail once the device is offline
and the font hasn't been cached yet. For production, download the
`.woff2` files, put them under `public/fonts/`, and switch the
`@import` to local `@font-face` rules — then the service worker caches
them like every other asset and Amharic text renders correctly with
zero network.
