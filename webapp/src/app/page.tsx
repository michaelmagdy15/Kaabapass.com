import type { Metadata } from "next";
import { SearchCard } from "@/components/booking/SearchCard";
import { TrustBadge } from "@/components/shared/TrustBadge";
import { WhatsAppFloater } from "@/components/shared/WhatsAppFloater";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { FAQS, TESTIMONIALS } from "@/lib/mock/seed";
import { Star, Plane, Building2, FileCheck, Bus, Compass, Car, ArrowRight, Check } from "lucide-react";

const BASE_URL = "https://app.kaabapass.com";

export const metadata: Metadata = {
  title: "Book Your Complete Umrah Journey from the USA",
  description:
    "Book your complete Umrah journey in minutes. Flights, hotels near Masjid al-Haram, Umrah visa assistance, ground transportation, and scholar-qualified guides — all in one seamless platform for US travelers.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "KaabaPass — Book Your Complete Umrah Journey from the USA",
    description:
      "One click. We handle everything — flights, hotels near Haram, Umrah visa, ground transport, and licensed guides. Your complete Umrah journey from the USA, simplified.",
    url: BASE_URL,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KaabaPass — Complete Umrah Packages from the USA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KaabaPass — Book Your Complete Umrah Journey from the USA",
    description:
      "One click. We handle everything — flights, hotels near Haram, Umrah visa, transport, and guides.",
    images: ["/og-image.png"],
  },
};


const WHY_ITEMS = [
  { icon: Plane, title: "All-in-one booking", body: "Flights, hotels, visa, transport, and guides — one booking, one platform." },
  { icon: Building2, title: "Haram-adjacent hotels", body: "We partner with the closest 4- and 5-star hotels to Masjid al-Haram." },
  { icon: FileCheck, title: "Visa assistance", body: "We coordinate your Umrah visa in cooperation with authorized partners." },
  { icon: Compass, title: "Scholar-qualified guides", body: "Every guide is licensed and trained to lead pilgrims through the full rites." },
  { icon: Bus, title: "Door-to-door logistics", body: "Private transfers, hotel check-in, and airport pickup — all arranged." },
  { icon: Car, title: "No hidden fees", body: "Our pricing is all-inclusive. Taxes are included in every quoted price." },
];

const STEPS = [
  { step: "01", title: "Choose your package", body: "Browse four curated package tiers and select what fits your needs and budget." },
  { step: "02", title: "Enter traveler details", body: "Provide passport information securely. We handle the visa application." },
  { step: "03", title: "We handle everything", body: "Flights, hotel, transfers, and visa — all coordinated by your concierge." },
  { step: "04", title: "Travel with confidence", body: "Your dedicated concierge is reachable 24/7 via WhatsApp throughout your journey." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-neutral border-b border-border" aria-labelledby="hero-headline">
        <div className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="max-w-[720px] mx-auto text-center mb-10">
            <p className="font-inter text-label-caps uppercase tracking-widest text-primary font-semibold mb-4">
              Umrah travel from the United States
            </p>
            <h1
              id="hero-headline"
              className="font-fraunces text-display text-on-surface leading-tight mb-6"
            >
              Book your entire Umrah journey in minutes.
            </h1>
            <p className="font-inter text-body-lg text-secondary leading-relaxed mb-8">
              Flights, hotels, visa assistance, ground transport, and licensed guides —
              all handled in one seamless platform.
            </p>
            <TrustBadge className="justify-center" />
          </div>

          {/* Search card */}
          <div className="max-w-[860px] mx-auto">
            <SearchCard />
          </div>
        </div>
      </section>

      {/* Why KaabaPass */}
      <section className="bg-surface py-16 md:py-20 border-b border-border" id="why" aria-labelledby="why-heading">
        <div className="max-w-content mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="font-inter text-label-caps uppercase tracking-widest text-primary font-semibold mb-3">Why KaabaPass</p>
            <h2 id="why-heading" className="font-fraunces text-h1 text-on-surface">One platform. Everything handled.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_ITEMS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-neutral rounded-xl border border-border p-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-primary" />
                </div>
                <h3 className="font-fraunces text-h3 text-on-surface mb-1.5">{title}</h3>
                <p className="font-inter text-body-md text-secondary leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-primary py-16 md:py-20 border-b border-white/10" id="how-it-works" aria-labelledby="how-heading">
        <div className="max-w-content mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="font-inter text-label-caps uppercase tracking-widest text-white/60 font-semibold mb-3">Process</p>
            <h2 id="how-heading" className="font-fraunces text-h1 text-white">How it works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map(({ step, title, body }) => (
              <div key={step} className="relative">
                <div className="mb-4">
                  <span className="font-fraunces text-[48px] leading-none text-gold font-medium opacity-60">{step}</span>
                </div>
                <h3 className="font-fraunces text-h3 text-white mb-2">{title}</h3>
                <p className="font-inter text-body-md text-white/70 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/search"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold text-[#111] font-inter font-semibold text-label rounded-md hover:bg-gold/90 transition-colors"
            >
              Start my Umrah <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-neutral py-16 md:py-20 border-b border-border" aria-labelledby="testimonials-heading">
        <div className="max-w-content mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="font-inter text-label-caps uppercase tracking-widest text-primary font-semibold mb-3">Testimonials</p>
            <h2 id="testimonials-heading" className="font-fraunces text-h1 text-on-surface">From our travelers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.id}
                className="bg-surface border border-border rounded-xl p-6 flex flex-col gap-4"
              >
                <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="#B08848" className="text-gold" />
                  ))}
                </div>
                <p className="font-inter text-body-md text-secondary leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <footer>
                  <p className="font-inter text-label font-medium text-on-surface">{t.name}</p>
                  <p className="font-inter text-body-sm text-muted">{t.city} · {t.tier} package</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / compliance strip */}
      <section className="bg-surface py-10 border-b border-border" aria-label="Trust and compliance">
        <div className="max-w-content mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <p className="font-inter text-label font-semibold text-on-surface mb-1">Licensed. Transparent. Trustworthy.</p>
              <p className="font-inter text-body-sm text-muted leading-relaxed">
                We assist travelers through the Umrah visa application process in cooperation with authorized travel and visa partners.
                We are a registered US travel agency. View our{" "}
                <a href="/terms" className="text-primary hover:underline">Terms</a> and{" "}
                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Secure Payments", "Free 14-day cancellation", "24/7 Concierge"].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5 bg-neutral border border-border px-3 py-1.5 rounded-full font-inter text-label-caps text-xs text-secondary font-medium uppercase tracking-wide">
                  <Check size={12} className="text-primary" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-neutral py-16 md:py-20" aria-labelledby="faq-heading">
        <div className="max-w-content mx-auto px-4 md:px-6">
          <div className="max-w-[640px] mx-auto text-center mb-10">
            <p className="font-inter text-label-caps uppercase tracking-widest text-primary font-semibold mb-3">FAQ</p>
            <h2 id="faq-heading" className="font-fraunces text-h1 text-on-surface">Common questions</h2>
          </div>
          <div className="max-w-[720px] mx-auto">
            <FAQAccordion faqs={FAQS} limit={6} />
          </div>
        </div>
      </section>

      <WhatsAppFloater />

      {/* FAQPage structured data for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.slice(0, 6).map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* BreadcrumbList structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://app.kaabapass.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Search Packages",
                item: "https://app.kaabapass.com/search",
              },
            ],
          }),
        }}
      />
    </>
  );
}
