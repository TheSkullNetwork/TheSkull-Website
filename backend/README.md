# The Skull — Backend API

Small self-contained Express API (no React/Vite in here, deliberately —
it deploys on its own). Powers everything the static frontend can't do.

## Run

```bash
npm install
npm run start        # default port 8787, or set PORT
```

Health check: `GET /healthz`

## Endpoints

### Public

| Method | Path | Notes |
|---|---|---|
| GET | `/healthz` | Config flags: firebase, oauth, bot stats |
| GET | `/api/stats` | Discord member count (1 min cache) + catalog stats |
| GET | `/api/resources?category=cybersecurity\|developers` | Resource library |
| POST | `/api/submissions` | Submit a resource for staff review. Rate limit: 3/hour. Validates URL scheme + field lengths |

### Admin (requires session cookie from Discord OAuth)

| Method | Path | Notes |
|---|---|---|
| GET | `/auth/discord` | Start OAuth login (gated to `ADMIN_DISCORD_IDS`) |
| GET | `/auth/discord/callback` | OAuth callback → sets JWT cookie (7 days) |
| GET | `/api/auth/me` | Current session |
| POST | `/api/auth/logout` | Clear session |
| POST | `/api/admin/resources` | Create resource |
| PUT / DELETE | `/api/admin/resources/:id` | Edit / remove resource |
| GET | `/api/admin/submissions` | List (`?status=pending\|approved\|denied`) |
| POST | `/api/admin/submissions/:id/approve` | Adds to resources + notifies submitter |
| POST | `/api/admin/submissions/:id/deny` | Records reason + notifies submitter |

General rate limit: 100 requests / 15 min per IP.

## Storage: Firestore with graceful fallback

- Firebase env vars present → Firestore collections `resources` and
  `submissions`
- Absent or failing → **in-memory** storage (resets on restart; fine
  for local dev and CI)

Same code path either way — see `lib/resourcesStore.js`.

## Layout

```
server.js               mounts routes, CORS, rate limits, /healthz, /api/stats
auth.js                 Discord OAuth2 + JWT cookie sessions + requireAdmin
routes/
  resources.js          public GET, admin write endpoints
  submissions.js        public POST, admin review endpoints
lib/
  firebase.js           admin SDK init (or none)
  resourcesStore.js     Firestore-or-memory store
  submissionsStore.js   same pattern for submissions
  notify.js             webhook + best-effort DM on decisions
  rateLimit.js          general / submit / auth limiters
data/                   backend's own copy of seed data (kept separate from
                        frontend/src/data on purpose — see README note)
.env                    secrets — never committed (.env.example documents each)
```

## Adding a new resource category

Items can be added live through `/admin`. A brand-new *category*
requires updating seed data in both copies:
`backend/data/resourcesCyber.js` (or `resourcesDev.js`) **and**
`frontend/src/data/` — the deployed backend can't reach into the
frontend folder.
