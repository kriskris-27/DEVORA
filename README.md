# Break Down Buddy – Instant Mechanic Assistance

A full‑stack web app that connects users to nearby mechanics in real time. Built with React + Vite (client), Express + TypeScript (server), and Supabase authentication.

## 1) Problem
- Travelers struggle to find reliable nearby mechanics during breakdowns, especially in unfamiliar or remote areas.
- Need a location‑first discovery experience and a simple mechanic onboarding flow.

## 2) Solution
- Role‑based web app with distinct flows for users and mechanics.
- Location‑first search with map, manual pin, and distance sorting.
- Modern, accessible UI with glassmorphism and subtle animations.

## 3) Tech Stack
- Client: React, Vite, TypeScript, React Router, React Leaflet, Tailwind CSS
- Server: Node.js, Express, TypeScript (ESM), CORS
- Auth: Supabase (email/password, password reset, sessions)
- Hosting: Client (Vercel with SPA rewrites), Server (Render)

## 4) Key Features
- Supabase Auth: register, login, logout, password reset
- RBAC: `user` and `mechanic` via Supabase `user_metadata.role`
- Protected Routes: guards for mechanic onboarding and dashboard
- Mechanic Onboarding: name, working hours, phone, map pin
  - First visit: auto‑detect location (with permission)
  - Manual pinning supported
- Mechanic Dashboard: view/edit profile + map to update coordinates
- Find Mechanics (User):
  - Geolocation center + Leaflet map markers
  - Results list sorted by distance
  - One‑tap radius presets (2/5/10 km)
  - Manual pin drop to change search center
  - Contact shortcuts (Call, Copy Coords, Google Maps navigate)
  - Web Share API for sharing location
  - Offline SMS fallback hint if network fails
  - Local persistence of last center/radius
- UI/UX:
  - Glassmorphism theme (very light blue + light gray)
  - Global Header/Footer, hero section, subtle animations
  - Tailwind utilities for buttons, inputs, cards, animations
- Backend API:
  - POST `/api/mechanics` create/update mechanic profile
  - GET `/api/mechanics/:email` fetch a profile
  - GET `/api/mechanics?lat&lng&radiusKm` nearby search (Haversine)
  - POST `/api/mechanics/sms/help` stub for future SMS fallback
- Ops:
  - Dynamic CORS via `CORS_ORIGINS`
  - SPA 404 fix on Vercel via `vercel.json` rewrites
  - Extensive request/response and client logs

## 5) Monorepo Structure
```
client/          # React + Vite app
server/          # Express + TS API
```

## 6) Environment Variables

Client (`client/.env`):
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:5000   # or your Render server URL
```

Server (Render dashboard or `server/.env` for local dev):
```
PORT=5000
CORS_ORIGINS=http://localhost:5173,https://your-client-domain
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE=your_supabase_service_role_key
```

Note: `.env` files are ignored and were scrubbed from git history.

## 7) Local Development

Terminal 1 – Server
```bash
cd server
npm install
npm start
# Server runs on http://localhost:5000
```

Terminal 2 – Client
```bash
cd client
npm install
npm run dev
# Client runs on http://localhost:5173
```

## 8) Deployment

Client (Vercel):
- Root Directory: `client`
- Build Command: `npm install && npm run build`
- Output: `dist`
- SPA Rewrite: `client/vercel.json`
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Server (Render):
- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`
- Set env vars (see above)

## 9) API Endpoints (server)
- POST `/api/mechanics`
  - Body: `{ email, name, workingHours, phone, location: { lat, lng } }`
  - Upserts a mechanic profile (in‑memory store for now)
- GET `/api/mechanics/:email`
  - Returns profile or 404 if not found
- GET `/api/mechanics?lat&lng&radiusKm`
  - Returns `{ results: [{ mechanic, distanceKm }] }` sorted by distance
- POST `/api/mechanics/sms/help`
  - Stub for future SMS integration

## 10) How to Use (Demo Script)
- User:
  1) Open Home → click “Get Help Now”
  2) Allow location → see nearby mechanics on map + list
  3) Adjust radius preset or drop a custom pin
  4) Click a result → Call / Navigate / Copy Coords / Share
- Mechanic:
  1) “Mechanic Portal” → register/login
  2) Onboarding → auto location + manual pin → save
  3) Dashboard → edit profile & coordinates via map → save

## 11) Security
- Client uses Supabase anon key only
- Server uses Supabase service role key (env only)
- `.env` files ignored; past commits cleaned

## 12) Roadmap
- Persist mechanics in a real DB (Supabase/Postgres)
- Integrate SMS fallback (Twilio)
- Reviews/ratings and availability scheduling
- Push notifications, job requests
- Advanced filters and clustering on map

## 13) Notable Files
- Client
  - `client/src/App.tsx` – routes + protected guards
  - `client/src/pages/MechanicAuth.tsx` – auth screens
  - `client/src/pages/MechanicOnboarding.tsx` – onboarding with map
  - `client/src/pages/MechanicDashboard.tsx` – profile edit + map
  - `client/src/pages/FindMechanics.tsx` – location‑first search
  - `client/src/index.css` – Tailwind utilities (glass, buttons, animations)
  - `client/vercel.json` – SPA rewrite
- Server
  - `server/src/server.ts` – Express app, dynamic CORS, logging
  - `server/src/routes/mechanics.ts` – REST endpoints
  - `server/src/supabase.ts` – Supabase server client helper

---
Built with care to be fast, simple, and reliable in emergencies.


