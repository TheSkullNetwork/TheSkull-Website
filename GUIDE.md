# Contributing to The Skull — local setup

This repo is open source so people can read the code, fix bugs, and
propose features. It is **not** a template for standing up your own
copy of the live site — the production deployment (Vercel + WispByte,
real Discord app, real Firebase project) belongs to The Skull community
and isn't something this guide covers. If you're here to contribute,
you only need things running on your own machine.

## What you can do here

- Fork and clone the repo
- Run it locally to test your changes
- Open an issue (bug report, suggestion, question)
- Open a pull request against a bug or feature

## What this repo doesn't grant

Being open source means the *code* is visible, and forking/cloning it
to work on locally and send a PR is exactly how that's meant to be
used. What it doesn't do is transfer any rights to the Discord server,
the bot, or the brand — so please don't take this repo and deploy a
live public copy of it elsewhere (its own domain, its own hosted
instance) presented as The Skull. Local dev and PRs: yes. Standing up
a public look-alike site: no.

## Prerequisites

- Node.js 18+
- A Discord account (only needed if you're testing the `/admin` login
  flow — most contributions won't touch that)

## 1. Clone and install

```
git clone <this-repo-url>
cd TheSkull-Website

cd frontend && npm install
cd ../backend && npm install
```

## 2. Run the frontend

```
cd frontend
npm run dev     # http://localhost:5173
```

This alone is enough for almost all contribution work — pages,
components, styling, resource/article data. The site falls back to
bundled sample data and skips live stats when there's no backend
running, so you don't need a backend at all just to work on the UI.

Drop a placeholder image at `frontend/public/logo.png` if you want the
header to render one locally — it's gitignored/not included in the
repo on purpose.

## 3. (Optional) Run the backend

Only needed if your change touches resource submissions, the admin
panel, or live stats.

```
cd backend
cp .env.example .env
npm run start    # http://localhost:8787
```

Leave the Firebase and Discord OAuth variables in `.env` empty —
everything degrades gracefully:

- No Firebase → resources/submissions use in-memory storage (resets
  when you restart the server, which is fine for local testing)
- No Discord OAuth vars → `/admin` login is disabled, but public
  routes still work
- No `BOT_STATS_URL` → homepage stats fall back to sample numbers

If you *do* need to test Discord login locally, create your own
throwaway Discord OAuth app at
[discord.com/developers/applications](https://discord.com/developers/applications),
set the redirect to `http://localhost:8787/auth/discord/callback`, and
fill in `DISCORD_CLIENT_ID` / `DISCORD_CLIENT_SECRET` /
`DISCORD_REDIRECT_URI` / `JWT_SECRET` / `ADMIN_DISCORD_IDS` (your own
Discord user ID) in `backend/.env`.

Point the frontend at your local backend by setting, in
`frontend/.env`:

```
VITE_BACKEND_URL=http://localhost:8787
```

## 4. Project layout

```
frontend/
  src/
    pages/        page components
    components/   reusable components
    data/         seed data (systems, commands, staff, resources, articles)
    hooks/        useAuth, useDiscordStats, useGithubRepos, useLiveResources
    styles/       one CSS file per page/component, mirrored under styles/

backend/
  server.js       mounts everything
  auth.js         Discord OAuth + JWT session
  routes/         resources.js, submissions.js
  lib/            firebase.js, resourcesStore.js, submissionsStore.js, notify.js
  data/           backend's own copy of resource seed data
```

If your change adds a new resource *category* (not just an item),
update the seed data in both `frontend/src/data/` and `backend/data/`
— they're deliberately kept as separate copies since the backend can't
reach into `frontend/` once deployed.

## 5. Live bot stats (optional)

The homepage's member/profile counters can pull straight from the
bot itself over HTTP. If you're working on that integration, add a
small read-only route to the bot's own codebase:

```js
app.get("/stats", (req, res) => {
  const profileCount = db.prepare("SELECT COUNT(*) AS c FROM profiles").get().c;
  const skullboardCount = db.prepare("SELECT COUNT(*) AS c FROM skullboard").get().c;
  res.json({ profileCount, skullboardCount });
});
```

Then point the backend at it via `BOT_STATS_URL=https://your-bot-host/stats`
in `backend/.env`. Unset or unreachable → falls back to sample numbers.

## 6. Before opening a PR

- Run `npm run build` in `frontend/` to make sure it still builds
- Keep `.jsx` and `.css` in their existing folders (they're never
  mixed) and mirror the `pages/` / `components/` split in `styles/`
- Don't commit any `.env` file — only `.env.example` files belong in
  the repo