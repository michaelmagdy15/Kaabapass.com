---
version: alpha
name: KaabaPass
description: One-click Umrah travel platform for U.S. Muslims. "One click. We handle everything." Reverent, modern, trustworthy — built around the sacred journey to Mecca and Madinah.

colors:
  # Brand — sampled from logo studies
  primary: "#193C31"            # Forest Emerald — deep, grounded, sacred
  primary-container: "#2A5C4D"  # Lifted forest for hover, secondary surfaces
  on-primary: "#FFFFFF"

  # Premium accent (used sparingly — premium tier, confirmations, embassy badge)
  tertiary: "#B08848"           # Amber Gold — warm, rich, never glittery
  tertiary-container: "#D4A968"
  on-tertiary: "#1A1A1A"

  # Surfaces
  neutral: "#FAF7F0"            # Soft Ivory — barely-warm white, premium and clean
  surface: "#FFFFFF"
  surface-elevated: "#F5EFE0"   # Warm cream for the premium card / confirmation hero
  on-neutral: "#1A1A1A"
  on-surface: "#1A1A1A"

  # Text scale
  secondary: "#3A3F47"          # Charcoal slate — body
  muted: "#6C7278"              # Captions, metadata, helper text
  on-muted: "#FFFFFF"

  # Lines
  border: "#E8E2D4"
  border-strong: "#C9BFA8"

  # Semantic
  success: "#2D7A4F"
  on-success: "#FFFFFF"
  warning: "#B8862E"
  on-warning: "#1A1A1A"
  error: "#A6362F"
  on-error: "#FFFFFF"
  info: "#2A5C7A"
  on-info: "#FFFFFF"

typography:
  display-lg:
    fontFamily: Fraunces
    fontSize: 3.5rem
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  display-md:
    fontFamily: Fraunces
    fontSize: 2.75rem
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  h1:
    fontFamily: Fraunces
    fontSize: 2.25rem
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  h2:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: 600
    lineHeight: 1.25
  h3:
    fontFamily: Inter
    fontSize: 1.375rem
    fontWeight: 600
    lineHeight: 1.35
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.55
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.4
  label-caps:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.08em"
  price-display:
    fontFamily: Fraunces
    fontSize: 2rem
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.01em"
  arabic-accent:
    fontFamily: Tajawal
    fontSize: 1rem
    fontWeight: 500
    lineHeight: 1.4

rounded:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: 16px
    height: 52px
  button-primary-hover:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: 16px
    height: 52px
  button-ghost:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: 12px
  button-premium:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: 16px
    height: 52px

  input-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 14px
    height: 52px
  input-focused:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"

  card-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-package-essential:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-package-comfort:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-package-premium:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 24px

  badge-trust:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: 8px
  badge-included:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 8px
  badge-premium:
    backgroundColor: "{colors.tertiary-container}"
    textColor: "{colors.on-tertiary}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: 8px

  step-indicator-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    size: 32px
  step-indicator-inactive:
    backgroundColor: "{colors.border}"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    size: 32px

  nav-header:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label}"
    height: 72px
    padding: 24px

  prayer-strip:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-caps}"
    height: 32px
    padding: 8px
---

## Overview

**Brand essence.** KaabaPass exists to make the Umrah journey effortless for U.S. Muslims. The official tagline — **"One click. We handle everything."** — is the entire product promise distilled, and the UI must earn it on every screen. The three brand pillars, shown in the master logo sheet, are: **One-click booking · Complete peace of mind · Your journey, our responsibility.** The visual language must feel the way a well-organized pilgrimage feels: calm, dignified, prepared, generous, never anxious or transactional. Think *contemporary museum signage* meets *premium boutique hotel* meets *the quiet warmth of a Madinah dawn* — never souvenir-shop, never travel-agency-circa-2008, never Vegas.

**Voice.** Warm, calm, confident. "We've handled this for 12,000 pilgrims" — not "Yay, ready for your trip?!" English is primary; Arabic appears as a discreet accent (e.g., *لبيك* on the confirmation screen), never as decoration anyone on the team can't read.

**The user.** A Muslim adult in the United States, often booking for family that includes parents and children, often performing Umrah for the first time. They are spending several thousand dollars on a religious obligation. They want **proof that this company is real, licensed, and respectful** before they trust it with passports and payment. Every screen must earn that trust.

**The promise made visual.** "One click. One price. One trusted partner. Everything handled." The UI delivers on this by collapsing the entire booking flow into five screens with no surprises, no hidden fees, and trust signals visible on every screen.

**Brand mark.** Eight logo directions are explored in the master sheet — *Modern & Premium · Bold & Dynamic · Islamic Elegance · Minimal & Modern · Creative & Memorable · Trust & Reliability · Calligraphic Touch · App Icon Style*. The design system is mark-agnostic: any of these eight directions slots into the UI. Whichever is chosen must render in `primary` (forest emerald), `tertiary` (amber gold), or a two-tone combination of the two — never on any other color, never with effects, gradients, or shadows. In the header (`nav-header`), the mark sits left at 32px height with the wordmark beside it; in the footer, it sits centered at 40px height.

## Colors

The palette is sampled directly from the master logo studies. Two relationships drive everything: **forest emerald on soft ivory** (the foundation, used everywhere) and **amber gold on soft ivory** (the premium accent, used sparingly).

- **Primary `#193C31` — Forest Emerald.** The brand. Used for the primary CTA, headline accents, the prayer-time strip, the active step indicator, the logo wordmark. It carries the weight of trust. Deeper and more grounded than a typical "emerald" — closer to a bottle green or the deep cloth of the Kiswah at certain hours. Never tint or shade for decoration; the green is a signal, not a texture.
- **Primary Container `#2A5C4D`.** Hover state only. Slightly lifted forest.
- **Tertiary `#B08848` — Amber Gold.** Warm, rich, matte gold sampled from the logo accents. Reserved for: (1) the Premium package card, (2) the booking-confirmed celebratory moment, (3) the "Saudi Embassy Partnership" trust badge. Three uses, no more. Gold loses its meaning if it appears more than once per viewport.
- **Tertiary Container `#D4A968`.** A lifted gold for hover/highlight on premium elements.
- **Neutral `#FAF7F0` — Soft Ivory.** The default page background. Barely-warm white — close to the logo presentation background but with the slightest grounding hue. Never use `#FFFFFF` as a page background; surfaces are white, pages are ivory.
- **Surface `#FFFFFF`.** Cards, inputs, modals.
- **Surface Elevated `#F5EFE0`.** The Premium package card and the confirmation hero — a third tier that whispers "this is the special one."
- **Secondary `#3A3F47`.** Body copy.
- **Muted `#6C7278`.** Captions, metadata (e.g., "150m walk to Masjid al-Haram"), helper text under inputs.
- **Border `#E8E2D4`.** Subtle warm border, not gray. Use for input outlines, card dividers, footer separators.
- **Semantic** colors are used only for their literal purpose. Success green for "Visa Approved," warning amber for "Action needed," error red for failed payment or expired passport. Never for decoration.

**Accessibility.** All text/background pairings meet WCAG AA contrast. `on-primary` (white) on `primary` (#193C31) tests at 12.12:1 — AAA. `on-tertiary` (near-black) on `tertiary` (#B08848) tests at 5.35:1 — AA. **Never put white text on gold** — the contrast (3.25:1) fails AA. Gold takes dark text only. **Never use gold as text on the ivory page background** (3.04:1) — gold is for backgrounds and accents, not type.

## Typography

Two typefaces, plus an Arabic accent.

- **Fraunces** (variable serif) — display, headlines, the total-price number, and the booking reference. Adds gravitas without going churchy. Weight 500 across the board; never bold.
- **Inter** — all UI: body, labels, buttons, navigation, form inputs. Workhorse. Weight 400 for body, 500 for labels, 600 for emphasis.
- **Tajawal** — Arabic strings only. Used very sparingly: a *بسم الله* whisper at the top of the homepage, *لبيك* on the confirmation screen, the Arabic side of the language toggle. Always paired with English; never as decoration on its own.

**Rules.**
- Maximum two type families in any viewport (Fraunces + Inter is the default; Tajawal joins only when Arabic content is present).
- Headlines use Fraunces. UI everywhere else uses Inter. Mixing the two on the same line is forbidden.
- Numerals in prices, dates, and the booking reference always use Fraunces with tabular figures — the price `$4,200` should feel like an editorial pull-quote, not a receipt.
- Never set body copy in all caps. `label-caps` (uppercase, tracked +8%) is for category labels and section eyebrows only — e.g., "INCLUDED" above the icons row on the package card.

## Layout

**Grid.** 4px base unit. All spacing tokens are multiples of 4. The 8-point grid is the working rhythm; 4-point only for fine adjustments inside components (icon-to-label gaps).

**Container widths.**
- Mobile: 16px page gutters, content fills.
- Tablet: 24px gutters, 720px max content.
- Desktop: max 1200px content width, centered, with 32px gutters. Hero sections may break out to 1400px.

**Vertical rhythm.** Sections separated by `spacing.3xl` (64px) on desktop, `spacing.2xl` (48px) on mobile. Components inside sections separated by `spacing.lg` (24px). Form fields stacked with `spacing.md` (16px) between them.

**Mobile-first.** Design every screen at 360px width first. The booking flow must be completable one-handed on a phone. CTAs are full-width and `height: 52px` on mobile — fingertip-friendly with no exception.

**Trust footprint.** Every screen reserves space — typically a thin row above the footer or beside the CTA — for the trust trio: Saudi Embassy partnership badge, refund policy link, 24/7 concierge availability. Never hidden behind a modal, never below the fold on mobile.

## Elevation & Depth

KaabaPass uses **almost no shadows**. The aesthetic is matte and grounded, not glossy or floating. Depth is communicated through surface color (`neutral` → `surface` → `surface-elevated`) and border, not shadow.

The two permitted shadows:

- **Card lift** (package cards, modals): `0 4px 16px rgba(15, 76, 58, 0.06)` — emerald-tinted, barely there.
- **Modal scrim**: `rgba(26, 26, 26, 0.45)` overlay behind any modal or sheet.

No drop shadows on buttons. No inner shadows. No multi-layer shadows. If a card needs to feel "lifted," widen its margin, don't add a shadow.

## Shapes

Rounded corners follow the `rounded` scale.

- **Inputs and small buttons**: `rounded.sm` (8px).
- **Primary buttons and secondary buttons**: `rounded.md` (12px).
- **Cards, package cards, modals**: `rounded.lg` (16px).
- **Hero cards, the homepage search card, the confirmation hero**: `rounded.xl` (24px).
- **Pills, badges, step indicators**: `rounded.full`.

**Iconography.** Use Lucide icons at 24px default. Stroke 1.75px. Never filled-style icons; outline only. Icon color inherits from text color.

**Imagery and pattern.**
- Geometric Islamic patterns (girih, zellige) may appear as **low-opacity ambient backgrounds** on hero sections — never above 8% opacity, never as a foreground element.
- Photography shows pilgrims in respectful long-shot, ihram garments, prayer beads, dates, the Madinah skyline from a distance. No close-ups of faces in worship.
- The Kaaba itself appears in photography only in editorial restraint — never as a decorative element, never cropped, never with overlays. Treat it the way a serious newspaper would.

## Components

### button-primary
The single most important component. Used for the one CTA per screen that moves the user forward: "Find my Umrah package," "Book this package," "Confirm & Book." Emerald background, white text, 52px tall on mobile (full-width) and `min-width: 240px` on desktop. Never two primary buttons in the same viewport.

### button-secondary
White background, emerald text, emerald 1px border. For non-blocking actions like "Save for later" or "Compare packages."

### button-ghost
Ivory background, emerald text, no border. For tertiary actions like "Customize this package" inside the package card.

### button-premium
Gold background, near-black text. Used **only** on the Premium package card and nowhere else.

### input-default
White surface on a ivory page. 1px `border` outline. Label sits above (Inter 500, 14px, `muted` color). Helper text sits below (Inter 400, 14px, `muted` color). On focus, border thickens to 2px and shifts to `primary`. Never use placeholder text as a substitute for a label.

### card-package-essential / card-package-comfort / card-package-premium
The three result cards on Screen 2. Each shows: tier name (label-caps, top-left), package thumbnail or hotel exterior photo (16:9, top), hotel name + distance to Haram (h3 + muted body-sm), flight summary row (airline logos + duration), the included icons row (six `badge-included` pills: ✈️ Flights · 🛏️ Hotels · 🧭 Tour Guides · 🚐 Shuttle · 🚗 Car Rental · 🛂 Visa Assistance), total price (price-display token, all-in, taxes included), and a single primary button. The Premium card swaps in `card-package-premium` background and the `button-premium` token; everything else stays identical so users compare like-to-like.

### badge-trust
The Saudi Embassy partnership badge. Ivory background, emerald text, full pill radius, with a small ✓ or shield icon. Appears in the header on every screen and inline on Screens 3 and 4.

### badge-included
The icon pills inside the package cards. Ivory background, secondary text. Always 6 of them, always in the same order from the master logo sheet: **Flights · Hotels · Tour Guides · Shuttle · Car Rental · Visa Assistance**. On narrow mobile layouts the icons stay visible and the labels wrap to a second line; the order never changes.

### step-indicator-active / step-indicator-inactive
Circular 32px indicators numbered 1–5 across the top of Screens 2–5. Active is emerald-filled; inactive is ivory with muted text. Connecting lines between them are 1px `border`. Always show all five — the user must always see how much is left.

### nav-header
72px tall, white surface, sticky on scroll. Logo left (emerald wordmark + small Kaaba-door-arch monogram), nav center (Packages, How it works, About, Help), language toggle and "Sign in" right. On mobile, collapses to logo + hamburger; the language toggle stays visible.

### prayer-strip
A 32px-tall emerald strip at the very top of every page showing the next prayer time for the user's detected city in white label-caps: `NEXT PRAYER · ASR · 4:42 PM · NEW YORK`. Calm, never blinking, never animated. Dismissible with an × that reappears on the next session.

## Do's and Don'ts

**Do.**
- Treat the Kaaba and Masjid al-Haram with editorial dignity in any imagery.
- Use *لبيك* (labbayk — "Here I am, O Lord") once, on the confirmation screen, as a quiet emotional payoff.
- Keep every price all-inclusive. Show the final number once, prominently. No "+ fees" anywhere.
- Show trust signals on every screen: embassy partnership, refund window, 24/7 concierge.
- Default to mobile-first layouts. Test every screen at 360px.
- Use the language toggle in the header — even if Arabic strings are sparse, the affordance must be visible.

**Don't.**
- Don't use clip-art or cartoon mosques. Don't use the Kaaba as a decorative motif or logo element.
- Don't use bright neon greens, golds with shine/gradient, or any glitter effect. Gold is matte. Green is deep.
- Don't use Arabic typography as decoration — every Arabic string must be real, correct, and meaningful.
- Don't use stock-photo "praying hands" or close-up faces in worship.
- Don't put more than one primary CTA in a viewport. Don't put more than one gold element in a viewport.
- Don't use shadows for emphasis. Don't use gradients for emphasis. Use color and space.
- Don't use exclamation marks in microcopy. The tone is calm, not excited.
- Don't display prices in red, even for discounts. Use the muted strikethrough + primary for the new price.

---

## Application Screens

> The five screens below define the prototype. Generate them in order. For each screen, follow the Goal → Layout → Components → Visual Direction → Constraints structure.

### Screen 1 — Landing / Search

**Goal.** Convey the promise ("one click to a complete Umrah trip") and capture a search in under 30 seconds.

**Platform.** Responsive web; design mobile-first at 360px, then desktop at 1440px.

**Layout & hierarchy.**
- `prayer-strip` at the very top.
- `nav-header` with logo, nav, language toggle, "Sign in."
- Hero section: Fraunces display-lg headline ("Your Umrah, handled."), one-line subhead using the official tagline ("One click. We handle everything.") in Inter body-lg, a `badge-trust` ("In partnership with the Saudi Embassy · Licensed travel agency"), and below it the search card.
- **Search card** (rounded.xl, surface, max-width 880px, centered): four inputs in a single row on desktop, stacked on mobile — Departure City (autocomplete, U.S. airports), Travelers (stepper for adults/children/infants), Travel Window (date range or "Flexible — next 3 months" toggle), Trip Length (7 / 10 / 14 / Custom segmented control). One `button-primary` below: "Find my Umrah package."
- Below the fold (desktop) or on scroll (mobile): three-column "How it works" (1. Tell us when. 2. We bundle flights, hotels, visa, tour guides, shuttle, and car rental. 3. One click, one price, one concierge.), a testimonials carousel with three real-feeling quotes, a wide "Our Saudi Embassy partnership" explainer card, an FAQ accordion (5 items visible, "See all" expands), and the footer.

**Components used.** prayer-strip, nav-header, badge-trust, input-default ×4, button-primary, card-default ×3 (how it works), testimonial card ×3, FAQ accordion.

**Visual direction.** Ivory background. Hero photography is a long-shot of the Madinah skyline at dawn with a barely-visible girih pattern overlay. The search card sits on the ivory on white surface with a very subtle card-lift shadow. Emerald headline accent on one word: "Your **Umrah**, handled."

**Constraints.** One-handed mobile use. CTA always visible on mobile (sticky search card on scroll, or a sticky "Find my package" floater after the user scrolls past the hero). No carousel auto-play. No exclamation marks.

---

### Screen 2 — Package Results

**Goal.** Let the user pick from three curated, fully-bundled packages within 60 seconds, without leaving the page.

**Platform.** Responsive web; three cards side-by-side on desktop, vertically stacked on mobile.

**Layout & hierarchy.**
- prayer-strip, nav-header.
- Step indicator row: 1 (active) — 2 — 3 — 4 — 5.
- Search summary chip-row at the top — "JFK · 2 adults · Departing March 12 · 10 days" — with an "Edit search" ghost button.
- Three package cards: **Essential**, **Comfort**, **Premium**. Each card uses the corresponding `card-package-*` token. Cards are identical in structure so users compare like-to-like: tier label (label-caps), hotel exterior photo (16:9), hotel name + walking distance to Masjid al-Haram (e.g., "Pullman ZamZam Makkah · 150m to the Haram"), flight summary (airline logos, stops, duration), `badge-included` row of five icons, total price all-in (price-display token), refundability one-liner, and a button. Essential and Comfort use `button-primary`. **Premium uses `button-premium` and shows a `badge-premium` pill in the top-right of the card.**
- Below each card, a `button-ghost` "Customize this package" that opens a modal (not a new page) to swap one component (e.g., upgrade the hotel) without losing the bundled price.
- Footer with trust trio.

**Components used.** step-indicator ×5, badge-trust, card-package-essential, card-package-comfort, card-package-premium, badge-included, badge-premium, button-primary, button-premium, button-ghost.

**Visual direction.** Ivory background. Three cards aligned at the top; do not let differing photo heights misalign them. The Premium card sits on `surface-elevated` (slightly warmer cream) — the only visual signal of "this is the special tier" beyond the gold button and badge. Prices are large and dignified (Fraunces price-display token), with "all-inclusive · taxes included" in body-sm muted directly underneath.

**Constraints.** Total price must include everything (flights, hotel, visa, transfers, guide, taxes, fees). No surprise costs on later screens. The cards must remain comparable — no card may have a different number of badge-included items.

---

### Screen 3 — Travelers & Documents

**Goal.** Collect everyone's passport details and photos with zero friction; reassure the user that KaabaPass handles the visa work after this.

**Platform.** Responsive web; single-column on all viewports (this is a form, not a layout puzzle).

**Layout & hierarchy.**
- prayer-strip, nav-header.
- Step indicator: 1 — 2 — 3 (active) — 4 — 5.
- Page header (Fraunces h1): "Tell us who's traveling."
- Subhead (body-lg muted): "We'll handle the embassy paperwork after this. You won't need to visit any consulate."
- Per-traveler accordion (collapsed for travelers 2+ on first load): full legal name (as in passport), passport number, passport expiry (date picker), nationality (select), gender, mahram relationship (conditional, shown only for women under 45 with explanatory tooltip and link to policy details). Two upload zones per traveler: "Passport photo page" and "Recent ID photo" — both accept any file in the prototype and show a green ✓ on success. File names are visible after upload; "Replace" affordance available.
- A `badge-trust` row reaffirming embassy partnership and licensed visa processing.
- One consent checkbox: "I authorize KaabaPass to submit visa applications on behalf of all listed travelers."
- Sticky bottom bar with running price summary on the left and `button-primary` "Continue to review" on the right.

**Components used.** step-indicator, input-default (many), date picker, select, file upload, badge-trust, checkbox, sticky bottom bar, button-primary.

**Visual direction.** Ivory background, white surface card containing the form. Each traveler's section divided by a 1px `border` line, never a heavy header. Upload zones are dashed `border-strong` rectangles in surface white with a small upload icon and "Drop or click to upload" in muted body-md. On successful upload, the zone transitions to a ivory fill with the file name and a ✓ success icon. No animations beyond the green check fade-in.

**Constraints.** Real-time validation, but never block typing. Errors appear below the field in error color with an icon — never as a popup. Mahram field appears only when conditional logic triggers it, with a calm one-line explainer and a "Read more" link, never as a wall of legal text.

---

### Screen 4 — Review & Pay

**Goal.** Show the user exactly what they're buying, exactly what they're paying, and let them confirm in one tap.

**Platform.** Responsive web.

**Layout & hierarchy.**
- prayer-strip, nav-header.
- Step indicator: 1 — 2 — 3 — 4 (active) — 5.
- Two-column layout on desktop (60/40), stacked on mobile.
- **Left column — Itinerary review.** Departure flights, return flights, hotel, transfers, guide assignment (with concierge photo, name, languages spoken, years of experience), visa processing timeline. Each block has an "Edit" ghost-button affordance.
- **Right column — Price + Payment.** Sticky on desktop. `price-display` total at top with "all-inclusive · taxes & fees included" beneath it. Itemized breakdown collapsed by default with a "See breakdown" ghost button. Refund policy summary in one calm sentence (e.g., "Free cancellation within 14 days. Visa processing fee non-refundable after submission.") with a link to the full policy. Payment method selector — Card / Apple Pay / Google Pay / "Pay in 4 installments" — as four large radio cards. Below: `button-primary` "Confirm & book."
- Trust trio in the footer.

**Components used.** step-indicator, card-default, concierge card, ghost edit buttons, price-display token, payment method cards, button-primary, badge-trust.

**Visual direction.** Ivory background, white surface cards for each itinerary block. The price column has a slightly elevated `surface-elevated` background to anchor the eye. Concierge photo is a respectful headshot, circular, 64px, with name in h3 and languages spoken as `badge-included` pills below.

**Constraints.** The total shown here must exactly equal the total shown on Screen 2 — no recalculation, no surprise fees. Payment method selection is single-select; one card highlights with `primary` 2px border when chosen.

---

### Screen 5 — Confirmation

**Goal.** Deliver the emotional payoff and tell the user exactly what happens next.

**Platform.** Responsive web.

**Layout & hierarchy.**
- prayer-strip, nav-header.
- Step indicator: 1 — 2 — 3 — 4 — 5 (active, all five filled).
- Hero confirmation card on `surface-elevated`, max-width 720px, centered, `rounded.xl`. Inside:
  - Quiet *لبيك* in Tajawal at the top, muted color, body-md.
  - Fraunces display-md headline: "Your Umrah is booked."
  - Booking reference in price-display Fraunces: `KP-7F3K2A`.
  - Subhead: "We've emailed your confirmation to [user@email.com] and your dedicated concierge will reach out within 24 hours."
- **What happens next** — a 4-step vertical timeline with `step-indicator-active`/`inactive` markers: 1. Visa processing (3–5 business days) · 2. Documents ready (we'll notify you) · 3. Pre-departure checklist (sent 14 days before) · 4. Departure (concierge available 24/7).
- **Quick actions row**: `button-secondary` "Add to Apple Wallet," `button-secondary` "Download itinerary PDF," `button-secondary` "Share with family."
- **Concierge card**: respectful headshot, name, WhatsApp link, Arabic + English + (e.g.) Urdu spoken, "Available 24/7."
- Footer.

**Components used.** step-indicator, badge-trust, vertical timeline, button-secondary ×3, concierge card.

**Visual direction.** Ivory background. The hero card is the only place in the entire app where the `tertiary` gold appears in any quantity — used on a thin top border or a small ornament above the headline (a single geometric girih element, 32px, muted gold). This is the emotional moment; let it breathe. Generous whitespace. No confetti. No exclamation marks. No celebration animation beyond a slow 400ms fade-in of the hero card.

**Constraints.** This screen must feel earned, not promotional. The dignity of the moment is the design.

---

## Additional Pages (Lower Priority)

Generate these only after the five-screen flow is complete and approved.

- **My Trips** — booked trip summary + countdown to departure + pre-departure checklist (vaccinations, ihram, medications, what-to-pack).
- **About / Our Saudi Embassy Partnership** — long-form page explaining the visa-pass mechanism in plain English with the badge-trust prominent.
- **Help Center** — searchable FAQ with 8–10 plausible questions (women traveling without mahram, refund timing, visa denial handling, hotel proximity guarantees, group bookings, child fares, ihram services, dietary needs).
- **Contact** — concierge call-back form + WhatsApp link + phone number with US and Saudi country codes.

---

## Stitch Generation Notes

When generating each screen in Stitch:

1. Reference this DESIGN.md as the design system (it will be auto-applied if dropped into the project).
2. Use the per-screen Goal / Layout / Components / Visual Direction / Constraints structure above as the screen prompt — copy-paste one screen block at a time into Stitch's prompt input.
3. Specify mobile-first (360px) for the first generation of each screen, then ask Stitch to regenerate at desktop (1440px) and verify the layout adapts.
4. After generating Screens 1 and 2, run Stitch's `lint` command (`npx @google/design.md lint DESIGN.md`) to verify token references and WCAG contrast. Fix any warnings before generating Screens 3–5.
5. Use Stitch's "Stitch screens together" feature to wire the five screens into a clickable prototype flow.
