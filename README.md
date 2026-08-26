# The Skull — Website

The Skull is a Discord community for people into development and
cybersecurity. This repo is the community's website: a public resource
library (OSINT, web hacking, dev tooling and more), short articles,
server info, staff listings, and a full reference for TheSkull, the
community's own Discord bot.

It is a real two-part app. Each half runs independently:

```
TheSkull-Website/
├── frontend/    React site (Vite)    → what people visit
├── backend/     small Express API    → powers live features
└── GUIDE.md     contributor / local setup guide
```

## Quick start (local)

```bash
git clone https://github.com/TheSkullNetwork/TheSkull-Website.git
cd TheSkull-Website

cd frontend && npm install && npm run dev     # http://localhost:5173
```

That's it — the site is fully browsable without the backend. It falls
back to bundled data and skips live stats automatically.

Optional, only if you're working on submissions/admin/stats:

```bash
cd backend && npm install && npm run start    # http://localhost:8787
cp .env.example .env                          # everything works empty
```

See `GUIDE.md` for the full local-setup walkthrough.

## What each part does

| | Frontend | Backend |
|---|---|---|
| Stack | React 18 + Vite + react-router | Node 18 + Express 5 |
| Needs the other? | No — graceful fallbacks | No — standalone API |
| Storage | none | Firestore → in-memory fallback |
| Details | `frontend/README.md` | `backend/README.md` |

The backend adds four things a static site can't do:

1. Discord OAuth login gated to specific admin IDs (powers `/admin`)
2. Firestore-backed resources & submissions (in-memory without Firebase)
3. Discord notifications when submissions are approved or denied
4. Cached Discord member stats + live numbers from the bot

All credentials live in `backend/.env` (documented in
`backend/.env.example`). `.env` files are never committed.

## You can / you can't

This repo is open source **for contribution purposes**.

✅ Allowed — no permission needed:
- Read, clone, fork
- Run it locally on your own machine
- Open issues, send pull requests
- Learn from the code

❌ Not allowed:
- Deploying a public copy of this site under your own domain or
  presenting it as The Skull
- Using the repo, its branding, or its content to stand up a look-alike
  production instance

The production deployment (real domain, Discord app, Firebase project)
belongs to The Skull community. Local development and contributions:
always welcome. Public rehosting: no.

## Contributing

Read `GUIDE.md`. Short version: fork, run locally, PR. Don't commit
`.env` files, don't mix `.jsx` and `.css` folders, run `npm run build`
before opening a PR.
