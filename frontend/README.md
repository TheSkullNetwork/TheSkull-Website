# The Skull — Frontend

React 18 + Vite + react-router site. Fully browsable as a static build
with no backend — live features enhance it when the backend is reachable.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

## Pages

| Route | What |
|---|---|
| `/` | Home: live member stats, by-the-numbers strip, GitHub repo carousel |
| `/about`, `/server-info`, `/staff` | Community info |
| `/bot` | Full TheSkull bot command reference |
| `/resources` → `/resources/cybersecurity/:subtype`, `/resources/developers/:subtype` | Sidebar-browsable resource library |
| `/articles`, `/articles/:slug` | Short awareness/news posts |
| `/submit-resource` | Public submission form (rate-limited server-side) |
| `/admin` | Staff-only panel (Discord OAuth login) |

## Backend connectivity

`src/config.js` reads `VITE_BACKEND_URL`. Leave it **empty** when
deploying with the included `vercel.json` — that file proxies `/api/*`
and `/auth/*` to the backend, so the browser only ever talks to its own
origin. Set it to e.g. `http://localhost:8787` for local backend dev.

Fallback behavior (all automatic):

- Backend unreachable → bundled seed data in `src/data/`
- A category has no items in the live store yet → bundled seed data for
  that category (`hooks/useLiveResources.js`)
- Stats unreachable → sample numbers / hidden strip

## Layout conventions

```
src/
  main.jsx            entry, BrowserRouter wrapper
  App.jsx             route table only
  config.js           BACKEND_URL from VITE_BACKEND_URL
  pages/              one component per route (.jsx only)
  components/         reusable components (.jsx only)
    admin/            SubmissionsPanel, ResourcesPanel
  styles/             every .css lives here, mirroring pages/ and components/
  data/               seed data: systems, commands, staff, resources, articles
  hooks/              useAuth, useDiscordStats, useGithubRepos,
                      useLiveResources, useCommandFilter
  lib/icons.js        string-name → lucide icon map
```

Rules: `.jsx` and `.css` never share a folder; styles mirror the
component tree; new resource *categories* must also be added to the
backend's copy of the seed data (see `backend/README.md`).

## Deploying (maintainers)

Vercel import with root directory `frontend/`, framework preset "Vite".
No build env vars needed — leave `VITE_BACKEND_URL` empty so requests
stay same-origin through the proxy config.
