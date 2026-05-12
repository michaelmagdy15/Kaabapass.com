"use client";

import { useState } from "react";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { TrustBadge } from "@/components/shared/TrustBadge";
import { MessageCircle, Phone, Mail, Clock } from "lucide-react";
import { FAQS } from "@/lib/mock/seed";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Visa", "Booking", "Flights", "Pricing", "Support"];

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? FAQS
    : FAQS.filter(f =>
        f.category?.toLowerCase() === activeCategory.toLowerCase()
      );

  return (
    <div className="bg-neutral min-h-screen">
      {/* Hero */}
      <div className="bg-primary py-12 px-4">
        <div className="max-w-content mx-auto text-center">
          <p className="font-inter text-label-caps uppercase tracking-widest text-white/60 mb-3">Help Center</p>
          <h1 className="font-fraunces text-h1 text-white mb-3">How can we help?</h1>
          <p className="font-inter text-body-md text-white/70 max-w-[480px] mx-auto">
            Find answers to common questions about Umrah travel, visa assistance, and your booking.
          </p>
        </div>
      </div>

      {/* FAQ section */}
      <div className="max-w-[720px] mx-auto px-4 md:px-6 py-12">
        <div className="mb-8">
          <h2 className="font-fraunces text-h2 text-on-surface mb-5">Frequently asked questions</h2>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter FAQ by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={cn(
                  "px-4 py-1.5 rounded-full font-inter text-label font-medium border transition-all",
                  activeCategory === cat
                    ? "bg-primary text-on-primary border-primary"
                    : "bg-surface text-secondary border-border hover:border-primary hover:text-primary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <FAQAccordion faqs={filtered} showAll />
          ) : (
            <div className="bg-surface border border-border rounded-xl p-8 text-center">
              <p className="font-inter text-body-md text-muted">
                No FAQs in this category yet. Try <button className="text-primary hover:underline" onClick={() => setActiveCategory("All")}>All</button> or{" "}
                <a href="/contact" className="text-primary hover:underline">contact us</a>.
              </p>
            </div>
          )}
        </div>

        <TrustBadge variant="inline" className="mb-10" />

        {/* Contact options */}
        <h2 className="font-fraunces text-h2 text-on-surface mb-5">Still need help?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <MessageCircle size={20} className="text-[#25D366]" />, label: "WhatsApp", value: "+1 (800) 555-0142", sub: "Typically replies in minutes", href: "https://wa.me/18005550142" },
            { icon: <Phone size={20} className="text-primary" />, label: "Phone", value: "+1 (800) 555-0142", sub: "Mon–Sat, 9am–8pm EST", href: "tel:+18005550142" },
            { icon: <Mail size={20} className="text-primary" />, label: "Email", value: "support@kaabapass.com", sub: "Response within 4 hours", href: "mailto:support@kaabapass.com" },
          ].map((c) => (
            <a key={c.label} href={c.href}
              className="bg-surface border border-border rounded-xl p-5 hover:border-primary transition-all group">
              <div className="mb-3">{c.icon}</div>
              <p className="font-inter font-semibold text-body-md text-on-surface group-hover:text-primary transition-colors">{c.label}</p>
              <p className="font-inter text-body-sm text-secondary mt-0.5">{c.value}</p>
              <p className="font-inter text-body-sm text-muted mt-1 flex items-center gap-1">
                <Clock size={12} /> {c.sub}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
