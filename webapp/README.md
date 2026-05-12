# KaabaPass — Webapp README

## Running locally

```bash
cd webapp
npm install
npm run dev
# → http://localhost:3000
```

## Full booking flow

| Step | Route | Description |
|---|---|---|
| 1 | `/` | Landing — hero, search card, packages preview, FAQ |
| 2 | `/search` | Package results — 4 tiers, Customize SmartBuilder modal |
| 3 | `/travelers` | Traveler forms — per-person details + mock passport upload |
| 4 | `/review` | Price breakdown — itinerary review + payment method |
| 5 | `/confirmation` | Booking confirmed — reference, next-steps, concierge |
| — | `/dashboard` | Live trip hub — countdown, visa status, flights, hotel |

## Additional pages

- `/about` — Mission, values, legal wording
- `/help` — Full FAQ + contact channels
- `/premium` — VIP & group packages
- `/contact` — Contact form + business hours

## What's mocked

| Feature | Status |
|---|---|
| Packages, prices, hotels | Static fixture (`lib/mock/packages.ts`) |
| Flights | Hardcoded combos in dashboard |
| Prayer times | NYC placeholder — no API call |
| Passport/ID upload | Mock green-check, no file stored |
| Payment processing | No real Stripe — confirmation fires on click |
| PDF download | Placeholder — no `@react-pdf/renderer` yet |
| WhatsApp chat | Deep-links to real WhatsApp number |
| Booking state | In-memory (lost on refresh) — use `localStorage` for persistence |

## Tech stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** — `@theme` CSS tokens in `globals.css`
- **React Context** — `BookingProvider` in `hooks/useBooking.tsx`
- **Lucide React** — icons
- **Google Fonts** — Fraunces, Inter, Tajawal via `next/font`

## Design tokens

All tokens defined in `src/app/globals.css` inside `@theme {}`.  
Key colors: `--color-primary` (Forest Emerald #1B4332), `--color-gold` (Amber Gold #B7791F), `--color-surface` (Soft Ivory #FAFAF7).

## File structure

```
webapp/src/
├── app/
│   ├── layout.tsx          # Root layout: PrayerStrip + Header + Footer + Providers
│   ├── page.tsx            # Screen 1: Landing
│   ├── search/page.tsx     # Screen 2: Packages
│   ├── travelers/page.tsx  # Screen 3: Traveler docs
│   ├── review/page.tsx     # Screen 4: Review & pay
│   ├── confirmation/page.tsx # Screen 5: Confirmed
│   ├── dashboard/page.tsx  # Live trip dashboard
│   ├── about/page.tsx
│   ├── help/page.tsx
│   ├── premium/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── layout/             # PrayerStrip, Header, Footer
│   ├── booking/            # SearchCard, PackageCard, SmartBuilderModal
│   └── shared/             # StepIndicator, ServiceIconRow, TrustBadge, WhatsAppFloater, DepartureCountdown, FAQAccordion, ConciergeCard
├── hooks/useBooking.tsx    # BookingProvider + useBooking
├── lib/
│   ├── mock/               # packages, hotels, flights, testimonials, concierge, faqs, seed
│   ├── i18n/en.ts
│   └── utils.ts
└── types/index.ts
```
