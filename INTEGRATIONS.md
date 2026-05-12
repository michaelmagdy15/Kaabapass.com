# KaabaPass — Integrations Required for Production

This file lists every external API, service, and SDK the webapp needs when moving from prototype to production.

---

## Flight & Package Data

| Integration | Purpose | Recommended |
|---|---|---|
| Amadeus Travel APIs | Live flight search JFK/IAD/ORD/LAX → JED, real pricing | Amadeus Self-Service (free sandbox → paid) |
| Sabre NDC | Alternative GDS for US-focused agency | Sabre Dev Studio |

---

## Umrah Visa

| Integration | Purpose | Note |
|---|---|---|
| Authorized Umrah visa partner API | Submit traveler data, track visa status | Must be a licensed Nusuk/Ministry of Hajj partner |
| Nusuk Platform | Saudi official Umrah permit system | Pilgrims register directly; agency submits via Nusuk API |

---

## Hotels

| Integration | Purpose |
|---|---|
| Expedia Partner Solutions or HotelBeds | Real Mecca hotel inventory near Haram |
| Makkah Clock Royal Tower / Fairmont / Hilton direct APIs | Premium/VIP tier direct booking |

---

## Payments

| Integration | Purpose |
|---|---|
| Stripe (card payments) | US travelers, PCI DSS compliant |
| Stripe Link / Apple Pay / Google Pay | One-click payment methods |
| Klarna or Affirm | "Pay in 4" installments |

---

## Communication

| Integration | Purpose |
|---|---|
| Twilio WhatsApp Business API | Send booking confirmations, visa updates, trip reminders |
| Twilio Verify | OTP for booking confirmation |
| Resend or SendGrid | Transactional email (confirmation PDFs, itineraries) |

---

## Document Generation

| Integration | Purpose |
|---|---|
| `@react-pdf/renderer` | Generate booking confirmation PDF, visa checklist |
| AWS S3 or Supabase Storage | Store signed documents |

---

## Authentication

| Integration | Purpose |
|---|---|
| Supabase Auth | Magic link + Google OAuth for account creation |
| NextAuth.js | Alternative if multi-provider needed |

---

## Analytics & Monitoring

| Integration | Purpose |
|---|---|
| PostHog | Product analytics, funnel tracking (Search → Confirmation) |
| Sentry | Error monitoring |
| Vercel Analytics | Core Web Vitals |

---

## Prayer Times (Production)

| Integration | Purpose |
|---|---|
| Aladhan API (`api.aladhan.com`) | Real prayer times by geolocation for the prayer strip |

---

## Maps

| Integration | Purpose |
|---|---|
| Google Maps Embed API | Hotel-to-Haram distance visualization on Dashboard |
