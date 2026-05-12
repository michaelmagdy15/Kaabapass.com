# KaabaPass — Design & Product Decisions

All decisions made without asking. This file documents why.

---

## Architecture

| Decision | Choice | Rationale |
|---|---|---|
| Repo structure | Option A (Next.js in `/webapp/`, root `index.html` stays) | Keeps the Coming Soon live on GitHub Pages while the webapp develops independently |
| Routing | Next.js 14 App Router | Native layouts, server components, streaming |
| State management | React Context (`BookingProvider`) | Simple, no external dep; survives 5-page flow without persistence needed for prototype |
| Styling | Tailwind CSS v4 + vanilla CSS custom properties | v4's `@theme` paradigm allows full design token inheritance in CSS; no `tailwind.config.ts` mapping needed |
| Fonts | `next/font` (Fraunces, Inter, Tajawal) | Zero layout shift, self-hosted via Google Fonts CDN |

---

## Legal & Compliance

| Issue | Decision |
|---|---|
| "In partnership with the Saudi Embassy" | **Removed entirely.** Replaced with: *"We assist travelers through the Umrah visa application process in cooperation with authorized travel and visa partners."* |
| Visa guarantee | Never implied. All visa copy says "assistance" and "in cooperation with authorized partners." |
| Visa approval claim | Every visa mention includes: *"Approval decisions rest with Saudi authorities."* |

---

## Mock Data

| Item | Decision |
|---|---|
| Prices | Realistic 2026 market rates: Economy $1,890 → VIP $7,200 |
| Flights | Emirates/Saudia real routes: JFK/IAD/ORD/LAX → JED |
| Hotels | Real 5-star Mecca hotel names (Fairmont, Hilton, Marriott, Swissôtel) at accurate distances |
| Booking ref | Format: `KP-XXXXXX` (6 random alphanumeric) |
| Departure date (demo) | March 12, 2026 |

---

## UI / UX

| Decision | Choice |
|---|---|
| Prayer strip | Hardcoded NYC placeholder (no geolocation API in prototype) |
| WhatsApp floater | Fixed bottom-right, opens a chat panel with canned replies that deep-link to WhatsApp |
| PDF download | Placeholder (downloads blank file) — `@react-pdf/renderer` to replace in production |
| SmartBuilderModal | Slide-in right sheet with upgrades, extra nights stepper, add-ons, live total |
| Dark mode | Not implemented in webapp (Coming Soon page has dark mode toggle) |
| Animations | Tailwind `transition-*` only; no Framer Motion installed to keep bundle lean |
| Image assets | No real hotel photos in prototype — color blocks used for package cards |

---

## Naming

- `KP-` prefix for booking refs (KaabaPass)
- Routes: `/search`, `/travelers`, `/review`, `/confirmation`, `/dashboard` (plain English, no IDs)
- Component naming: PascalCase, no `Page` suffix on non-page components
