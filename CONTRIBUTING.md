# Contributing to The Skull

Thanks for wanting to help out. This repo is open source so people can read the code, fix bugs, and propose features. It is **not** a template for standing up your own copy of the live site — the production deployment (Vercel + WispByte, real Discord app, real Firebase project) belongs to The Skull community.

## What you can do

- Fork and clone the repo
- Run it locally to test your changes
- Open an issue (bug report, suggestion, question)
- Open a pull request against a bug or feature

## What this repo doesn't grant

Being open source means the *code* is visible, and forking/cloning it to work on locally and send a PR is exactly how that's meant to be used. What it doesn't do is transfer any rights to the Discord server, the bot, or the brand — so please don't take this repo and deploy a live public copy of it elsewhere presented as The Skull. Local dev and PRs: yes. Standing up a public look-alike site: no.

## Prerequisites

- Node.js 18+
- A Discord account (only needed if you're testing the `/admin` login flow — most contributions won't touch that)

## Setup

### 1. Clone and install

```bash
git clone https://github.com/TheSkullNetwork/TheSkull-Website.git
cd TheSkull-Website

cd frontend && npm install
cd ../backend && npm install
```

### 2. Run the frontend

```bash
cd frontend
npm run dev     # http://localhost:5173
```

This alone is enough for almost all contribution work — pages, components, styling, resource/article data. The site falls back to bundled sample data and skips live stats when there's no backend running, so you don't need a backend at all just to work on the UI.

### 3. (Optional) Run the backend

Only needed if your change touches resource submissions, the admin panel, or live stats.

```bash
cd backend
cp .env.example .env
npm run start    # http://localhost:8787
```

Leave the Firebase and Discord OAuth variables in `.env` empty — everything degrades gracefully:

- No Firebase → resources/submissions use in-memory storage (resets on restart, fine for local testing)
- No Discord OAuth vars → `/admin` login is disabled, but public routes still work
- No `BOT_STATS_URL` → homepage stats fall back to sample numbers

If you *do* need to test Discord login locally, create your own throwaway Discord OAuth app at [discord.com/developers/applications](https://discord.com/developers/applications), set the redirect to `http://localhost:8787/auth/discord/callback`, and fill in `DISCORD_CLIENT_ID` / `DISCORD_CLIENT_SECRET` / `DISCORD_REDIRECT_URI` / `JWT_SECRET` / `ADMIN_DISCORD_IDS` (your own Discord user ID) in `backend/.env`.

Point the frontend at your local backend by setting, in `frontend/.env`:

```
VITE_BACKEND_URL=http://localhost:8787
```

## Project layout

```
frontend/
  src/
    pages/        page components
    components/   reusable components
    data/         seed data (systems, commands, staff, resources, articles)
    hooks/        useAuth, useDiscordStats, useGithubRepos, useLiveResources
    styles/       one CSS file per page/component, mirrored under styles/

backend/
  core/           server.js (entry), auth.js (Discord OAuth + JWT)
  routes/         resources.js, submissions.js
  lib/            firebase.js, resourcesStore.js, submissionsStore.js, notify.js
  data/           backend's own copy of resource seed data
```

If your change adds a new resource *category* (not just an item), update the seed data in both `frontend/src/data/` and `backend/data/` — they're deliberately kept as separate copies since the backend can't reach into `frontend/` once deployed.

## Before opening a PR

- Run `npm run build` in `frontend/` to make sure it still builds
- Keep `.jsx` and `.css` in their existing folders (they're never mixed) and mirror the `pages/` / `components/` split in `styles/`
- Don't commit any `.env` file — only `.env.example` files belong in the repo
- Don't commit directly to `main` — always open a PR
