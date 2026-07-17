# Arus Kita

**Platform Ekosistem Logistik Kebencanaan Terpadu** — this is the frontend for Arus Kita, a Next.js Progressive Web App built for GarudaHacks 7.0. It gives Admin Posko, Donatur, Toko Mitra, and Relawan Kurir a role-specific mobile-first interface over the [ArusKita backend API](https://documenter.getpostman.com/view/33317073/2sBY4Mvgsz), covering public disaster transparency, donation checkout, store order fulfillment, and courier delivery with QR/PIN chain-of-custody handoffs.

The app is installable as a PWA (manifest + minimal service worker) and is built strictly against real backend responses — every screen renders only fields the API actually returns; nothing is mocked or fabricated.

## Built With

- **Framework:** Next.js 16.2.10 (App Router, Turbopack)
- **Language:** TypeScript 5, React 19.2.4
- **Styling:** Tailwind CSS v4 (CSS-first `@theme` config), `tailwind-merge`
- **UI Primitives:** shadcn-style components (`components.json`), `@base-ui/react`, `class-variance-authority`
- **Animation:** Framer Motion
- **Maps:** Leaflet + react-leaflet (SSR-safe dynamic imports)
- **QR:** `qrcode` (generation), native `BarcodeDetector` Web API (scanning)
- **Icons:** lucide-react
- **PWA:** Next.js Metadata API (`app/manifest.ts`) + custom `public/sw.js`
- **Architecture:** Feature-based folders, App Router, client-side data fetching via a shared `apiClient`

## Tools Used

| Tool / Technology | Usage |
| --- | --- |
| Next.js | App Router, routing, PWA metadata, image/font handling |
| React | Component model, hooks-based state |
| TypeScript | Static typing across the whole app |
| Tailwind CSS v4 | Styling via `@theme` tokens in `globals.css`, no separate config file |
| Leaflet / react-leaflet | Interactive disaster map, live courier delivery tracking |
| Framer Motion | Press/tap micro-interactions (`PressButton`) |
| `qrcode` | Client-side QR code image generation for custody handoff and install prompts |
| `BarcodeDetector` (Web API) | Camera-based QR scanning, no external scanning library |
| lucide-react | Icon set used across the app |
| `@base-ui/react`, `class-variance-authority`, `tailwind-merge` | Headless UI primitives and class composition |
| ESLint 9 (`eslint-config-next`) | Linting, including React Hooks correctness rules |

## Copyright Materials

This repository contains only frontend source code written by the team. No copyrighted images, music, illustrations, or external datasets are bundled. App icons/wordmarks under `public/icon/` are original assets created for this project. Map tiles are served live from the OpenStreetMap tile servers (`{s}.tile.openstreetmap.org`) under their standard attribution. Third-party npm packages are listed in `package.json` and governed by their respective licenses.

## Key Features

- **Public landing** — hero map preview, live transparency stats, install-to-PWA flow with QR/instruction modals.
- **Public disaster map** (`/peta-bencana`) — search/filter posko by disaster type, mobile bottom-sheet posko list, urgency legend.
- **Public transparency** (`/transparansi`) & **distributions** (`/penyaluran`) — verified delivery proofs, monthly disbursement chart, allocation breakdown.
- **Auth & registration** — login with role-based redirect, multi-step OTP registration with a distinct profile step per role (Donatur, Admin Posko, Toko Mitra, Relawan Kurir).
- **Donatur dashboard** — map-based posko picker, posko detail, donation checkout + payment result/success, transaction history with custody hash trail, points, profile.
- **Admin Posko dashboard** — event creation wizard (camera capture → details → needs catalog), QR scan to receive goods from courier, per-item distribution proof capture with live GPS-tagged camera, supplemental-needs flow.
- **Toko Mitra dashboard** — order accept/prepare, dynamic QR + fallback PIN handoff to courier with auto-refresh and live pickup detection.
- **Relawan Kurir dashboard** — nearby task list, live-GPS delivery map (Leaflet, straight-line route + moving marker), two-stage custody handoff (store → courier via QR/PIN, courier → posko via QR), goodness/certificate trail, profile.
- **Skeleton loading** across every data-driven page, matching the real layout shape instead of generic spinners.

---

## Domain Model (Frontend Types)

Frontend types mirror the backend response envelopes 1:1 (`{ status, message, data }`), organized per feature under `src/features/*/types/`:

- **Auth** — `LoginData`, `RegisteredUser`/role-specific registered-profile shapes, JWT payload decoding for role-based routing.
- **Crisis Map / Transparency** — `Posko`, `PoskoSummaryItem`, `DashboardSummary`, distribution proof records.
- **Donor** — `DonorDashboardMapData`, `DonorPostDetail`, `DonorTransaction`, `DonorProfile`, points/rewards.
- **Create Event** — `EventPhoto`, `DisasterType`, `CreateEventData`/`CreateEventItemInput`.
- **Admin Dashboard** — `AdminDashboardData`, `DashboardEvent`/`DashboardOrder`, `AdminOrderReceivingData`, `CustodyPostHandoffData`, `SupplementalNeedData`.
- **Courier Dashboard** — `CourierTask`/`CourierTaskDetail`, `CourierHandoffTokenData`, `CustodyStoreHandoffData`, `CourierProfileData`, `CourierGoodnessData`.
- **Shop (Toko)** — `StoreProfileData`, `StoreOrderItem`/`StoreOrderDetailData`, `StoreOrderReadyData`, `StoreDisbursementData`, `StoreGoodnessData`.

---

## Folder Structure

```
garhack/
├── src/
│   ├── app/                        # Next.js App Router — routes only, thin pages
│   │   ├── page.tsx                 # Landing page
│   │   ├── manifest.ts              # PWA manifest (Metadata API)
│   │   ├── login/                   # Login
│   │   ├── register/                # Multi-step registration wizard
│   │   ├── splashscreen/            # PWA cold-launch splash
│   │   ├── peta-bencana/            # Public disaster map
│   │   ├── penyaluran/              # Public distributions
│   │   ├── transparansi/            # Public transparency dashboard
│   │   └── dashboard/
│   │       ├── donatur/             # Donor role routes (peta, posko/[id], donasi, transparansi, poin, profil)
│   │       ├── admin/               # Admin posko routes (buat-event, order/[id]/*, event/[id]/*, profil)
│   │       ├── toko/                # Store routes (orders, orders/[id], orders/[id]/qr)
│   │       └── kurir/               # Courier routes (tugas, antar/[orderId], jejak, profil)
│   │
│   ├── features/                    # Feature-based modules (the real business logic)
│   │   └── <feature>/
│   │       ├── components/          # Feature-scoped UI
│   │       ├── hooks/                # Data-fetching hooks (isLoading/error/data pattern)
│   │       ├── services/             # apiClient calls, one function per endpoint
│   │       ├── types/                # Request/response types mirroring the API
│   │       └── constants/, utils/    # Feature-local helpers, where needed
│   │   (auth, crisis-map, transparency, distributions, donation, donor-dashboard,
│   │    create-event, admin-dashboard, courier-dashboard, shop, landing)
│   │
│   ├── shared/                       # Cross-feature building blocks
│   │   ├── components/               # PressButton, Portal, InstallQRModal, QrScanFrame, SplashScreen...
│   │   ├── hooks/                     # useGeolocation, useCameraCapture, useQrScanner, useLogout...
│   │   ├── services/                  # apiClient (fetch wrapper), authService
│   │   ├── utils/                     # formatCurrency, geo (haversine), jwt decode, authSession
│   │   ├── config/                    # env.ts
│   │   └── styles/                    # globals.css (Tailwind v4 @theme tokens)
│   │
│   ├── components/ui/                # shadcn-generated primitives (Skeleton, etc.)
│   └── lib/                          # shadcn `cn()` class utility
│
├── public/                           # Icons, sw.js, static assets
├── next.config.ts                    # Redirects, security headers
├── components.json                   # shadcn config
└── tsconfig.json                     # `@/*` → `src/*` path alias
```

---

## Architecture

```
Route (src/app/**/page.tsx)
     │  thin: wires hooks + components, no business logic
     ▼
┌───────────────────────┐
│      Component        │  ← Presentation, feature-scoped
│  features/*/components│
└───────────┬────────────┘
            │ uses
            ▼
┌───────────────────────┐
│         Hook          │  ← useState(data/error/isLoading) + useEffect fetch,
│    features/*/hooks   │     polling/refetch where needed
└───────────┬────────────┘
            │ calls
            ▼
┌───────────────────────┐
│        Service        │  ← One function per backend endpoint,
│   features/*/services │     typed request/response via apiClient
└───────────┬────────────┘
            │ calls
            ▼
┌───────────────────────┐
│    shared/apiClient    │  ← fetch wrapper: base URL, Bearer token,
│                        │     FormData handling, ApiError w/ real message
└───────────┬────────────┘
            │
            ▼
        Backend API
```

### Conventions

- **Data-fetching hooks** always expose `{ data, error, isLoading }` (default `isLoading = true`), fetch inside `useEffect` with a `cancelled` guard, and set `isLoading = false` in `finally`.
- **Services** never call `fetch` directly — they go through `shared/services/apiClient.ts`, which auto-attaches `Authorization: Bearer <token>`, handles `FormData` bodies (multipart uploads), and throws `ApiError` with the backend's real `message`.
- **No fabricated UI** — if a mockup shows a stat, badge, or button not backed by an actual API field/endpoint, it is either dropped or clearly built as a client-only affordance (e.g. read-only toggle) rather than faked.
- **SSR-safe browser APIs** — Leaflet maps, camera capture, geolocation, and QR scanning are all wrapped behind `next/dynamic(..., { ssr: false })` loaders or effect-gated hooks, since they touch `window`/`navigator` at import time.
- **Custody/handoff flows** reuse the same primitives on both sides: `useQrScanner` + `QrScanFrame` for scanning (admin scanning courier, courier scanning store), `qrcode` + polling for generating/displaying a live-refreshing token (store showing courier, courier showing posko).

---

## App Routes

### Public

| Path | Description |
| --- | --- |
| `/` | Landing page |
| `/login` | Login, redirects by role from the JWT (`admin` → `/dashboard/admin`, `donor` → `/dashboard/donatur`, `relawan` → `/dashboard/kurir`) |
| `/register` | Role-select → email/OTP → password → role-specific profile step → success |
| `/peta-bencana` | Public interactive disaster map |
| `/penyaluran` | Public verified distribution proofs |
| `/transparansi` | Public transparency dashboard (totals, monthly disbursement, ledger) |
| `/splashscreen` | PWA cold-launch splash (skipped on repeat launches within a session) |

### Donatur (`/dashboard/donatur`)

| Path | Description |
| --- | --- |
| `/dashboard/donatur` | Posko map + most-urgent section |
| `/dashboard/donatur/posko/[postId]` | Posko detail |
| `/dashboard/donatur/donasi` | Posko picker (no `postId`) → donation form → payment result → success |
| `/dashboard/donatur/transparansi` | Donation history + `[donationId]` detail |
| `/dashboard/donatur/poin` | Points balance, history, rewards |
| `/dashboard/donatur/profil` | Profile, autonomous-mode card, menu, logout |

### Admin Posko (`/dashboard/admin`)

| Path | Description |
| --- | --- |
| `/dashboard/admin` | Home: active events, latest orders per event |
| `/dashboard/admin/buat-event` | 4-step event creation wizard |
| `/dashboard/admin/event/[postId]/scan` | Scan courier's QR to confirm posko handoff |
| `/dashboard/admin/order/[orderId]/pembagian` | Per-item distribution checklist + camera proof capture → complete |
| `/dashboard/admin/order/[orderId]/kebutuhan-susulan` | Supplemental needs form for an in-flight order |
| `/dashboard/admin/profil` | Profile, verification status, menu, logout |

### Toko Mitra (`/dashboard/toko`)

| Path | Description |
| --- | --- |
| `/dashboard/toko` | Current order card + order history |
| `/dashboard/toko/orders/[id]` | Order detail, checklist, mark ready |
| `/dashboard/toko/orders/[id]/qr` | Dynamic QR + fallback PIN for courier pickup, auto-refresh, live pickup detection |

### Relawan Kurir (`/dashboard/kurir`)

| Path | Description |
| --- | --- |
| `/dashboard/kurir` | Nearby task list, claim task |
| `/dashboard/kurir/antar/[orderId]` | Live delivery map, arrive-at-store scan (QR/PIN), custody banner, arrive-at-posko QR handoff |
| `/dashboard/kurir/jejak` | Goodness certificate + delivery history |
| `/dashboard/kurir/profil` | Profile, vehicle/area info, availability status, logout |

---

## Environment Variables

Copy `.env.example` (create one if missing) to `.env` and fill in the values before running.

| Variable | Description | Example |
| --- | --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL of the ArusKita backend API | `https://nic.akademicompetition.id/api/v1` |

---

## Getting Started

1. **Clone the project**

   ```bash
   git clone <repository-url> <project-name>
   cd <project-name>
   ```

2. **Set up environment**

   ```bash
   cp .env.example .env
   # Edit .env with your backend API base URL
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Run**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). The app is a client-heavy PWA — most dashboard pages fetch data on mount from `NEXT_PUBLIC_API_BASE_URL` and require a valid session (log in first, or register a new account per role).

   ```bash
   npm run build && npm run start   # production build
   npm run lint                      # ESLint (React Hooks rules included)
   ```

5. **Continue building**
   - Add a new feature module under `src/features/<name>/` with `components/`, `hooks/`, `services/`, `types/` (and `constants/`/`utils/` if needed).
   - Define request/response types in `types/` that mirror the backend's `{ status, message, data }` envelope exactly.
   - Add one function per endpoint in `services/`, calling `shared/services/apiClient.ts` — never `fetch` directly.
   - Wrap data access in a hook under `hooks/` following the `{ data, error, isLoading }` pattern.
   - Wire the route in `src/app/**/page.tsx`, keeping the page itself thin.
