# 🎢 Cal Coasters: Discover SoCal RollerCoasters + Live Wait Times

A full-stack web app for finding, comparing, and tracking Southern
California's roller coasters, with live wait times, real specs, an
interactive map, and a quiz that matches you to a coaster based on how
intense you actually want your day to be.

**🟢 Live demo:** https://cal-coasters.vercel.app/

Ask "what's my nearest coaster right now?" and get a real answer, pulled
from live park data, not a static list that hasn't been updated since
launch day.

---

## Why this project?

Existing coaster info is confusing, and is not combined into a single site. Official
park apps only cover their own rides, while RCDB has specs but no live data, and
nothing combines "what's open right now," "how far is it," and "will I actually like this
ride" in one place. This project pulls all three into a single, opinionated tool: a 
hand-curated dataset of real coaster specs, live wait times from a public parks API,
and a scoring system that matches rides to how intense you say you want your day to be.

## Architecture

**Application flow:**
┌────────────┐    HTTPS      ┌─────────────────────────────────┐
│  Browser   │ ───────────▶  │  Next.js App (Vercel)          │
│  (React)   │ ◀───────────  │                                │
└────────────┘  SSR / JSON   │  ┌───────────────────────────┐  │
                             │  │ Server Components         │  │
                             │  │ (data fetching per page)  │  │
                             │  └────────────┬──────────────┘  │
                             │               │                 │
                             │  ┌────────────▼──────────────┐  │
                             │  │ API Routes (/api/*)       │  │
                             │  └────────────┬──────────────┘  │
                             │               │                 │
                             │  ┌────────────▼──────────────┐  │
                             │  │ Client Components         │  │
                             │  │ (map, filters, quiz, etc.)│  │
                             │  └────────────────────────────┘ │
                             └───────────────┬─────────────────┘
                                             │
                       ┌─────────────────────┼─────────────────────┐
                       │ Prisma                                    │ fetch()
                       ▼                                           ▼
             ┌───────────────────┐                     ┌──────────────────────┐
             │  PostgreSQL       │                     │  Queue-Times.com API │
             │  (Supabase)       │                     │  (live wait times)   │
             │  pooled + direct  │                     └──────────────────────┘
             │  connections      │
             └───────────────────┘

## Tech stack

| Layer | Tech |
|---|---|
| Language | TypeScript |
| Framework | Next.js (App Router, Server Components + Client Components) |
| Styling | Tailwind CSS v4, custom design tokens (colors, type, components) |
| Database | PostgreSQL (Supabase — pooled connection for the app, direct for migrations) |
| ORM | Prisma |
| Mapping | Leaflet / react-leaflet, OpenStreetMap tiles, custom markers |
| External API | Queue-Times.com (live ride wait times & open/closed status) |
| Hosting | Vercel (auto-deploy on push) |
| Version control | Git / GitHub |

## Features

- **Interactive map** — every tracked coaster pinned with custom markers, popups showing live status and key stats
- **Live departure board** — region-tabbed (LA/OC/SD), searchable, sorted open-first with live wait times, refreshed on a 5-minute cache
- **Daily featured coaster** — a deterministic "coaster of the day" rotation on the homepage
- **Search & filter** — by name, intensity tier (Family/Thrill/Extreme), track material, ride design, manufacturer, park, and inversions
- **Nearest coasters** — browser geolocation ranks the 5 closest coasters by real distance (Haversine formula)
- **Comparison tool** — search-to-add up to 3 coasters, side-by-side stats with per-row "winner" highlighting
- **Intensity quiz** — a short questionnaire scored against curated ride attributes to surface your best-match coasters
- **Park operating status** — live snapshot of how many tracked rides are open per park
- **Custom design system** — hand-built color tokens, typography, and component classes rather than a default UI kit

## Running it locally

```bash
# 1. Clone and install
git clone https://github.com/YOUR_USERNAME/nearest-coasters.git
cd nearest-coasters
npm install

# 2. Configure environment
# Create .env and .env.local with:
#   DATABASE_URL="<pooled Supabase connection string>"
#   DIRECT_URL="<direct Supabase connection string>"

# 3. Set up the database
npx prisma migrate dev
npx prisma db seed

# 4. Run the dev server
npm run dev
```

Open `http://localhost:3000`.

## What I'd build next

- Expand coverage beyond SoCal (NorCal, and more theme parks across California)
- User accounts with saved favorites and a personal "ridden" tracker
- Push/email alerts when a favorited coaster's wait drops below a threshold
- An admin interface for curating ride data instead of hand-editing a seed script
- Automated tests around the intensity-scoring and nearest-coaster logic

---

Built as a hands-on full-stack project — from database schema design and
a live third-party API integration, through a custom frontend design
system, to a production deployment on Vercel.
