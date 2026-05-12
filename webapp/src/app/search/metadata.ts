import type { Metadata } from "next";

const BASE_URL = "https://app.kaabapass.com";

/**
 * Route-level metadata for /search.
 * The page itself is "use client", so metadata is exported from this
 * separate server-only module and re-exported via the route segment.
 *
 * Note: In Next.js App Router, metadata must live in a Server Component.
 * Since page.tsx uses "use client", this file provides the metadata
 * by being imported in a layout.tsx for this segment if needed.
 *
 * For now, the global layout title template "... | KaabaPass" handles
 * the title. This file documents the intended metadata for reference.
 */
export const metadata: Metadata = {
  title: "Choose Your Umrah Package — Flights, Hotels & Guides",
  description:
    "Browse curated Umrah packages from the USA. Economy, comfort, premium, and VIP tiers — all-inclusive with flights, hotels near Masjid al-Haram, visa assistance, and 24/7 concierge.",
  alternates: { canonical: `${BASE_URL}/search` },
  openGraph: {
    title: "Choose Your Umrah Package | KaabaPass",
    description:
      "Browse curated Umrah packages from the USA. Economy, comfort, premium, and VIP tiers — all-inclusive.",
    url: `${BASE_URL}/search`,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "KaabaPass Umrah Packages" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Choose Your Umrah Package | KaabaPass",
    description: "Economy, comfort, premium, and VIP Umrah packages from the USA.",
    images: ["/og-image.png"],
  },
};
