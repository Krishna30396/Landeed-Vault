# Halfway

Two locations in. One fair meeting point out.

Halfway routes between two people along real roads, finds the point where each
has travelled the same distance, snaps it to the nearest real town, and shows
restaurants, cafés, bars, parks and more around it. All state lives in the URL —
send the link and the other person sees the identical map. No accounts, no
database, no payment, no credit card anywhere in setup.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. It works immediately with **no keys at all**: routing
falls back to the public OSRM demo server and tiles to OSM raster. For production
use, add the two free keys below.

## Configuration

Copy `.env.example` to `.env.local` and fill in what you have:

| Variable | What it does |
|---|---|
| `ORS_API_KEY` | OpenRouteService routing key (free at [openrouteservice.org/dev](https://openrouteservice.org/dev), ~2,000 req/day, no card). Empty → keyless OSRM demo fallback (no SLA — dev only). |
| `NEXT_PUBLIC_STADIA_API_KEY` | Stadia Maps tile key (free at [stadiamaps.com](https://stadiamaps.com), ~200k tiles/month, no card). Empty → keyless OSM raster tiles. |
| `CONTACT_EMAIL` | Required by Nominatim's usage policy if the fallback geocoder is used. |

Note: the Stadia key is deliberately public (`NEXT_PUBLIC_`) — Leaflet loads tile
images straight from the browser. Protect it by **domain allowlisting** in the
Stadia dashboard, not secrecy. `localhost` works by default. Every other key
stays server-side; all other upstream calls go through `/api/*`.

## Swapping providers

Each upstream sits behind a one-function seam in `lib/providers/*/index.js` that
reads an env var and delegates:

| Seam | Env var | Implementations |
|---|---|---|
| `lib/providers/geocode` | `GEOCODER` | `photon` (default, keyless), `nominatim` (keyless, 1 req/s) |
| `lib/providers/router` | `ROUTER` | `openrouteservice` (keyed), OSRM demo fallback via `OSRM_URL` |
| `lib/providers/places` | `PLACES_PROVIDER` | `overpass` (keyless, multi-mirror failover via `OVERPASS_URLS`) |

To add a provider: write `lib/providers/<kind>/<name>.js` returning the same
shape, add one branch to the seam's `index.js`, set the env var. Component code
never changes — providers convert any `[lon,lat]` responses to `[lat,lng]` at
the boundary.

`OVERPASS_URLS` is a comma-separated failover list. Keep at least two mirrors;
requests try each in order. The client sends a plain product-token
`User-Agent` — overpass-api.de's WAF rejects UAs containing an `@`.

## How the midpoint works

The app never averages coordinates (that drops the marker in a lake). It walks
the actual route geometry (`lib/geo.js`), measures cumulative haversine distance
over the drawn polyline, and interpolates the point at 50% of that length —
so the marker always sits on the line, and the fraction is a parameter, ready
for a future "meet nearer me" slider or equal-time mode.

The snapped hub is scored around the raw midpoint (`/api/hubs`): place rank
(city 6 … hamlet 1.5) minus a distance penalty, searching 15 → 30 → 60 km before
falling back to the exact midpoint. The top six are always offered as chips —
the user can override the auto-pick in one tap, and the ribbon honestly shows
how far off-centre their choice is.

## URL schema

```
/?a=51.5074,-0.1278&an=London&b=52.4862,-1.8904&bn=Birmingham
 &r=1&hub=node/12345&rad=5&cat=restaurant,cafe
```

`a`/`b` coordinates (4dp), `an`/`bn` display labels, `r` route alternate index,
`hub` OSM id or `raw`, `rad` radius km, `cat` category ids. Written with
`history.replaceState` on every change; read once on mount to restore the full
view with zero interaction.

## Reliability

- In-memory TTL cache on every upstream (geocode 30 min, routes 30 min, hubs 60 min, places 20 min) — `lib/cache.js`
- Serialised 1 req/s queue for Nominatim — `lib/limiter.js`
- 350 ms debounce + in-flight abort on geocode-as-you-type
- Overpass mirror failover on any non-200/timeout
- `AbortSignal.timeout()` on every outbound fetch (20 s geocode/routing, 30 s Overpass)
- Loading / empty / error states rendered distinctly everywhere; an empty places
  result offers "Try a bigger radius" instead of pretending to fail
- Guards for identical endpoints and unroutable pairs (including OSRM's
  silent snap-to-Portugal behaviour on transatlantic requests)

## Deploy

Push to a Git repo, import into [Vercel](https://vercel.com) (free tier, no
card), set the env vars from `.env.example`, deploy. Then register the deployed
domain in the Stadia dashboard so the tile key works there.
