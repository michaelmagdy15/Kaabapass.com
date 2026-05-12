"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Download, Share2, ChevronRight } from "lucide-react";
import { ConciergeCard } from "@/components/shared/ConciergeCard";
import { CONCIERGE_PROFILES } from "@/lib/mock/seed";
import { useBooking } from "@/hooks/useBooking";

const NEXT_STEPS = [
  { step: "01", title: "Visa processing", body: "3–5 business days, processed via our authorized visa partners." },
  { step: "02", title: "Documents ready", body: "We will notify you by email and WhatsApp when your documents are confirmed." },
  { step: "03", title: "Pre-departure checklist", body: "Sent to you 14 days before departure." },
  { step: "04", title: "Departure", body: "Your dedicated concierge is available 24/7 via WhatsApp throughout your journey." },
];

function ConfirmationContent() {
  const params = useSearchParams();
  const ref = params.get("ref") || "KBP-2026-00142";
  const { booking } = useBooking();
  const pkg = booking.selectedPackage;

  return (
    <div className="bg-neutral min-h-screen">
      <div className="max-w-[720px] mx-auto px-4 md:px-6 py-12">
        {/* Success hero */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={32} className="text-on-primary" />
          </div>
          <p className="font-tajawal text-[32px] text-primary mb-2 arabic-accent" dir="rtl">لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ</p>
          <h1 className="font-fraunces text-h1 text-on-surface mt-2 mb-3">Your Umrah is booked.</h1>
          <p className="font-inter text-body-md text-secondary leading-relaxed max-w-[440px] mx-auto">
            We have sent your confirmation to your email. Your dedicated concierge will reach out within 24 hours.
          </p>
        </div>

        {/* Booking ref */}
        <div className="bg-surface border border-border rounded-xl p-5 mb-6 text-center">
          <p className="font-inter text-label text-muted mb-1">Booking reference</p>
          <p className="font-fraunces text-h2 text-primary tracking-wider">{ref}</p>
          {pkg && (
            <p className="font-inter text-body-sm text-muted mt-1">{pkg.name} · {pkg.tier}</p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <button className="flex-1 h-11 flex items-center justify-center gap-2 border border-border rounded-md font-inter text-label font-medium text-secondary hover:border-primary hover:text-primary transition-all">
            <Download size={16} />
            Download Itinerary PDF
          </button>
          <button className="flex-1 h-11 flex items-center justify-center gap-2 border border-border rounded-md font-inter text-label font-medium text-secondary hover:border-primary hover:text-primary transition-all">
            <Share2 size={16} />
            Share with family
          </button>
        </div>

        {/* What happens next */}
        <div className="mb-8">
          <h2 className="font-fraunces text-h2 text-on-surface mb-5">What happens next</h2>
          <div className="space-y-4">
            {NEXT_STEPS.map(({ step, title, body }) => (
              <div key={step} className="bg-surface border border-border rounded-xl p-5 flex gap-4">
                <span className="font-fraunces text-[28px] text-gold/60 font-medium leading-none w-10 flex-shrink-0">{step}</span>
                <div>
                  <p className="font-inter font-semibold text-body-md text-on-surface mb-0.5">{title}</p>
                  <p className="font-inter text-body-sm text-secondary leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Concierge */}
        <div className="mb-8">
          <h2 className="font-fraunces text-h2 text-on-surface mb-4">Your concierge</h2>
          <ConciergeCard profile={CONCIERGE_PROFILES[0]} />
        </div>

        {/* Dashboard CTA */}
        <Link
          href="/dashboard"
          className="w-full h-12 bg-primary text-on-primary font-inter font-semibold text-label rounded-md hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
        >
          View My Trip Dashboard <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral flex items-center justify-center"><p className="font-inter text-muted">Loading...</p></div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
