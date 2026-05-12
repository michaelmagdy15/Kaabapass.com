import type { Metadata } from "next";
import type { ServiceKey } from "@/types";
import { ServiceIconRow } from "@/components/shared/ServiceIconRow";
import { TrustBadge } from "@/components/shared/TrustBadge";
import { Star, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Premium Packages — KaabaPass",
  description: "Elite Umrah packages with VIP suites near Masjid al-Haram, private guides, and family group options.",
};


const PREMIUM_TIERS: {
  name: string;
  price: number;
  highlight: boolean;
  description: string;
  features: string[];
  included: ServiceKey[];
}[] = [
  {
    name: "Premium Select",
    price: 4800,
    highlight: false,
    description: "4-star hotel within 500m of Masjid al-Haram, private airport shuttle, and dedicated concierge.",
    features: [
      "4-star hotel, ≤500m from Haram",
      "Business-class flight available",
      "Dedicated concierge (WhatsApp)",
      "Private airport transfers",
      "Licensed group guide",
      "Full visa application assistance",
      "Madinah extension available (+$450)",
    ],
    included: ["flights", "hotels", "guides", "shuttle", "visa"],
  },
  {
    name: "VIP Sanctuary",
    price: 7200,
    highlight: true,
    description: "5-star tower suite with Haram view, private scholar-guide, and 24/7 on-call concierge.",
    features: [
      "5-star Haram-view suite",
      "Business-class flights included",
      "Private scholar-guide throughout",
      "Private car for duration",
      "24/7 on-call concierge",
      "Gourmet meal plan",
      "Priority visa processing",
      "Madinah 3-night extension included",
    ],
    included: ["flights", "hotels", "guides", "shuttle", "car-rental", "visa"],
  },
];

const GROUP_OPTIONS = [
  { label: "Family package (4–7 travelers)", note: "Children 5–12 at 60% rate", discount: "10% off" },
  { label: "Group pilgrimage (8–20)", note: "Requires 60-day advance booking", discount: "15% off" },
  { label: "Mosque group (21+)", note: "Custom itinerary + dedicated coordinator", discount: "Custom pricing" },
];

export default function PremiumPage() {
  return (
    <div className="bg-neutral min-h-screen">
      {/* Hero */}
      <section className="bg-primary py-14 px-4">
        <div className="max-w-content mx-auto text-center">
          <p className="font-inter text-label-caps uppercase tracking-widest text-white/60 mb-3">Elite Travel</p>
          <h1 className="font-fraunces text-h1 text-white mb-4">Premium &amp; VIP Packages</h1>
          <p className="font-inter text-body-lg text-white/75 max-w-[540px] mx-auto">
            For those who seek complete peace of mind. Every detail arranged. Every moment honored.
          </p>
        </div>
      </section>

      {/* Premium tiers */}
      <section className="py-12 px-4">
        <div className="max-w-content mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[900px]">
          {PREMIUM_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl border overflow-hidden ${tier.highlight ? "border-gold bg-surface shadow-lg" : "border-border bg-surface"}`}
            >
              {tier.highlight && (
                <div className="bg-gold px-5 py-2 flex items-center gap-2">
                  <Star size={14} fill="white" className="text-white" />
                  <span className="font-inter text-label-caps uppercase text-white tracking-widest text-xs">Most requested</span>
                </div>
              )}
              <div className="p-6">
                <p className="font-inter text-label-caps uppercase tracking-widest text-muted text-xs mb-2">{tier.name}</p>
                <div className="flex items-end gap-2 mb-3">
                  <span className="font-fraunces text-[40px] leading-none text-on-surface">${tier.price.toLocaleString()}</span>
                  <span className="font-inter text-body-sm text-muted pb-1">per person</span>
                </div>
                <p className="font-inter text-body-md text-secondary mb-5">{tier.description}</p>

                <ServiceIconRow included={tier.included} className="mb-5" />

                <ul className="space-y-2 mb-6">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-inter text-body-sm text-secondary">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/search?tier=${tier.name.toLowerCase().replace(" ", "-")}`}
                  className="block w-full h-11 bg-primary text-on-primary font-inter font-semibold text-label rounded-md flex items-center justify-center hover:bg-primary-container transition-colors text-center"
                >
                  Book {tier.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Group packages */}
      <section className="bg-surface border-t border-b border-border py-12 px-4">
        <div className="max-w-content mx-auto max-w-[720px]">
          <p className="font-inter text-label-caps uppercase tracking-widest text-primary font-semibold mb-2">Group Travel</p>
          <h2 className="font-fraunces text-h2 text-on-surface mb-6">Family &amp; group packages</h2>
          <div className="space-y-4 mb-8">
            {GROUP_OPTIONS.map((g) => (
              <div key={g.label} className="flex items-center justify-between p-4 border border-border rounded-xl">
                <div>
                  <p className="font-inter font-semibold text-body-md text-on-surface">{g.label}</p>
                  <p className="font-inter text-body-sm text-muted">{g.note}</p>
                </div>
                <span className="font-inter font-semibold text-primary text-body-sm flex-shrink-0 ml-4">{g.discount}</span>
              </div>
            ))}
          </div>
          <Link
            href="/contact"
            className="inline-flex h-11 px-6 items-center rounded-md border border-primary text-primary font-inter font-semibold text-label hover:bg-primary hover:text-on-primary transition-all"
          >
            Request a group quote
          </Link>
        </div>
      </section>

      {/* Trust */}
      <section className="py-12 px-4">
        <div className="max-w-content mx-auto max-w-[720px]">
          <TrustBadge />
        </div>
      </section>
    </div>
  );
}
