# Arus Kita Frontend

**Arus Kita** is a mobile-first disaster logistics Progressive Web App built for **GarudaHacks 7.0**. This frontend connects **Donatur**, **Admin Posko**, **Toko Mitra**, and **Relawan Kurir** to one operational flow: from public disaster transparency, to donation checkout, to verified last-mile handoff in the field.

It is designed as the role-based interface for the ArusKita backend API. The app emphasizes **trust, operational clarity, and field usability** through real API-backed data, QR/PIN custody handoff, map-based monitoring, and installable PWA support.

Backend API reference: [ArusKita Postman Documentation](https://documenter.getpostman.com/view/33317073/2sBY4Mvgsz)

## Why This Project Exists

Disaster aid systems often fail in three places:

- donors cannot clearly see where money goes,
- field operators struggle to coordinate distribution across multiple actors,
- final delivery is hard to verify in a way that is transparent and auditable.

Arus Kita addresses that gap with a single interface layer for the full chain:

- **public users** can inspect disaster posts and transparency data,
- **donors** can donate and track impact,
- **stores** can fulfill orders and hand over goods securely,
- **couriers** can transport aid with trackable custody,
- **admins** can receive, verify, and document final distribution.

## What This Frontend Delivers

- **Public transparency experience** with disaster map, disbursement dashboard, and proof-based distribution pages.
- **Role-based operational dashboards** for donor, admin, store, and courier users.
- **PWA installation flow** so the app behaves like a field-ready mobile tool.
- **QR/PIN custody flow** for store-to-courier and courier-to-posko handoff.
- **GPS- and camera-aware interaction patterns** for field verification flows.
- **Strict API fidelity**: screens are built against actual backend responses, not invented mock data.

## Built With

- **Framework:** Next.js 16.2.10
- **Language:** TypeScript 5, React 19.2.4
- **Styling:** Tailwind CSS v4, `tailwind-merge`
- **UI Utilities:** `@base-ui/react`, `class-variance-authority`, shadcn-style primitives
- **Animation:** Framer Motion
- **Maps:** Leaflet, `react-leaflet`
- **QR:** `qrcode`, native `BarcodeDetector` with `jsqr` fallback
- **PWA:** `app/manifest.ts`, custom `public/sw.js`
- **Linting:** ESLint 9 with `eslint-config-next`

## Tools Used

| Tool / Technology | Usage |
| --- | --- |
| Next.js App Router | Route structure and application shell |
| React | UI composition and client-side state |
| TypeScript | End-to-end typing for API and UI logic |
| Tailwind CSS v4 | Design tokens and styling |
| Framer Motion | Motion and interaction polish |
| Leaflet / react-leaflet | Disaster maps and courier delivery map |
| `qrcode` | QR generation for custody and install flows |
| `BarcodeDetector` + `jsqr` | Camera-based QR scanning with fallback support |
| `@base-ui/react` | Headless interaction primitives |
| ESLint | Code quality and hooks correctness |

## Key Features

- **Landing page** with product framing, map preview, transparency hooks, and install-to-PWA prompts.
- **Public disaster map** at `/peta-bencana` with search/filter and urgency-based discovery.
- **Public transparency dashboard** at `/transparansi` with totals, allocation, and monthly disbursement views.
- **Public distribution proof page** at `/penyaluran` for verified delivery evidence.
- **Multi-step registration** with role-specific completion flow for donor, admin, store, and courier.
- **Donor dashboard** for map-based discovery, donation flow, transaction history, points, and profile.
- **Admin dashboard** for event creation, receiving goods from courier, supplemental needs, and final distribution proof capture.
- **Store dashboard** for order acceptance, readiness, and dynamic QR/PIN pickup handoff.
- **Courier dashboard** for task claiming, live delivery map, store pickup scan, posko handoff, and contribution history.
- **Skeleton loading and mobile-first layouts** across data-driven screens.

## Role Flows

### Public

1. Open landing page or public map.
2. Inspect active disaster posts and transparency metrics.
3. Continue to login or registration if the user wants to participate.

### Donatur

1. Browse posko and disaster needs on the map.
2. Open posko detail and continue to donation.
3. Complete payment through the backend-integrated payment flow.
4. Track transaction detail, transparency, and points.

### Toko Mitra

1. View available or active orders.
2. Accept and prepare order items.
3. Generate a dynamic QR plus fallback PIN for courier pickup.
4. Wait for successful pickup and track contribution data.

### Relawan Kurir

1. Claim nearby task.
2. Navigate to store and perform store-to-courier handoff scan.
3. Deliver to posko while updating task progress.
4. Generate or present delivery handoff proof at the destination.

### Admin Posko

1. Create disaster event and needs catalog.
2. Receive courier handoff through QR/PIN flow.
3. Capture distribution proof per item type with location-aware evidence.
4. Complete distribution and keep public transparency aligned with backend records.

## Architecture

The codebase uses a **feature-based frontend architecture**. App Router pages stay thin, while feature modules own their own components, hooks, services, and types.

```text
Route (src/app/**/page.tsx)
  -> Feature Component
  -> Feature Hook
  -> Feature Service
  -> shared/services/apiClient.ts
  -> Backend API
```

### Conventions

- **Thin pages**: route files mostly wire components and hooks.
- **Feature isolation**: each feature keeps its own UI, data logic, and API types.
- **Shared API client**: all HTTP traffic goes through one wrapper for consistent error handling and auth headers.
- **No fabricated backend data**: UI is built from actual API contracts.
- **Browser API safety**: camera, scanner, geolocation, and Leaflet behavior are gated to client-side execution.

## Folder Structure

```text
garhack/
├── public/                      # PWA assets, icons, service worker
├── scripts/                     # Utility scripts
├── src/
│   ├── app/                     # Next.js App Router routes
│   │   ├── dashboard/
│   │   │   ├── admin/
│   │   │   ├── donatur/
│   │   │   ├── kurir/
│   │   │   └── toko/
│   │   ├── login/
│   │   ├── register/
│   │   ├── peta-bencana/
│   │   ├── penyaluran/
│   │   ├── splashscreen/
│   │   └── transparansi/
│   ├── components/ui/           # Shared primitive UI components
│   ├── features/                # Feature modules
│   │   ├── admin-dashboard/
│   │   ├── auth/
│   │   ├── courier-dashboard/
│   │   ├── create-event/
│   │   ├── crisis-map/
│   │   ├── distributions/
│   │   ├── donation/
│   │   ├── donor-dashboard/
│   │   ├── landing/
│   │   ├── shop/
│   │   └── transparency/
│   ├── lib/
│   └── shared/                  # Cross-feature hooks, services, config, utils, styles
├── components.json
├── next.config.ts
├── package.json
└── tsconfig.json
```

## App Routes

### Public Routes

| Path | Description |
| --- | --- |
| `/` | Landing page |
| `/login` | Login page with role-based redirect after auth |
| `/register` | Registration flow with role-specific profile completion |
| `/peta-bencana` | Public disaster map |
| `/penyaluran` | Public distribution proof page |
| `/transparansi` | Public transparency dashboard |
| `/splashscreen` | PWA splash experience |

### Donatur Routes

| Path | Description |
| --- | --- |
| `/dashboard/donatur` | Donor home and map experience |
| `/dashboard/donatur/posko/[postId]` | Posko detail |
| `/dashboard/donatur/donasi` | Donation flow |
| `/dashboard/donatur/transparansi` | Donation history |
| `/dashboard/donatur/transparansi/[donationId]` | Donation detail |
| `/dashboard/donatur/poin` | Points and rewards |
| `/dashboard/donatur/profil` | Donor profile |

### Admin Routes

| Path | Description |
| --- | --- |
| `/dashboard/admin` | Admin dashboard |
| `/dashboard/admin/buat-event` | Event creation wizard |
| `/dashboard/admin/event/[postId]/scan` | Courier handoff scan |
| `/dashboard/admin/order/[orderId]/pembagian` | Distribution proof flow |
| `/dashboard/admin/order/[orderId]/kebutuhan-susulan` | Supplemental needs |
| `/dashboard/admin/profil` | Admin profile |

### Toko Routes

| Path | Description |
| --- | --- |
| `/dashboard/toko` | Store dashboard |
| `/dashboard/toko/orders/[id]` | Store order detail |
| `/dashboard/toko/orders/[id]/qr` | Store pickup QR/PIN handoff |

### Kurir Routes

| Path | Description |
| --- | --- |
| `/dashboard/kurir` | Courier task list |
| `/dashboard/kurir/antar/[orderId]` | Delivery execution flow |
| `/dashboard/kurir/jejak` | Contribution history |
| `/dashboard/kurir/profil` | Courier profile |

## Environment Variables

Copy `.env.example` to `.env` and set the backend base URL.

| Variable | Description | Example |
| --- | --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for the ArusKita backend API | `https://nic.akademicompetition.id/api/v1` |

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url> <project-name>
   cd <project-name>
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open `http://localhost:3000`.

5. **Run quality and production checks**

   ```bash
   npm run lint
   npm run build
   npm run start
   ```
