# KaabaPass — Legal & Compliance Notes

## Visa Language Policy

All UI copy must avoid:
- "In partnership with the Saudi Embassy"
- "We process your visa"
- "Visa guaranteed"
- Any implication that KaabaPass is an official Saudi government entity

**Approved phrasing:**
> *"We assist travelers through the Umrah visa application process in cooperation with authorized travel and visa partners."*

> *"Visa application assistance is included. Approval decisions rest with Saudi authorities."*

## Verified Compliance Locations

| File | Location | Status |
|---|---|---|
| `app/page.tsx` | Hero section trust badge | ✅ Legal-safe |
| `components/shared/TrustBadge.tsx` | All instances | ✅ Legal-safe |
| `app/review/page.tsx` | Price breakdown, visa note | ✅ Legal-safe |
| `app/confirmation/page.tsx` | What-happens-next timeline | ✅ Legal-safe |
| `app/dashboard/page.tsx` | Visa status card | ✅ Legal-safe |
| `app/about/page.tsx` | Licensing section | ✅ Legal-safe |
| `app/help/page.tsx` | FAQ content | ✅ Review needed |
| `lib/mock/faqs.ts` | FAQ item content | ✅ Review needed |

## Mahram Requirements

All mahram copy states the *general* requirement without making a legal determination:
> *"Women may be required to travel with a mahram (male guardian). Requirements vary by country of residence and age. Please consult your local mosque or travel authority."*

## Refund Policy

All copy says "subject to airline and hotel cancellation terms" — no specific refund amount is guaranteed in UI copy.

## Disclaimer

KaabaPass is a US-licensed travel agency. It is not affiliated with the Saudi Embassy, the Saudi Ministry of Hajj, or any Saudi government agency. All visa processing is conducted through authorized travel partners.
