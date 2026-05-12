"use client";

import { useBooking } from "@/hooks/useBooking";
import { CONCIERGE_PROFILES } from "@/lib/mock/seed";
import { ConciergeCard } from "@/components/shared/ConciergeCard";
import { ServiceIconRow } from "@/components/shared/ServiceIconRow";
import { WhatsAppFloater } from "@/components/shared/WhatsAppFloater";
import { DepartureCountdown } from "@/components/shared/DepartureCountdown";
import Link from "next/link";
import {
  CheckCircle2, Clock, Plane, Building2, FileCheck, Calendar,
  ChevronRight, MapPin
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const TIMELINE = [
  { id: 1, done: true, label: "Booking confirmed", date: "Mar 1, 2026" },
  { id: 2, done: true, label: "Visa application submitted", date: "Mar 2, 2026" },
  { id: 3, done: false, label: "Visa approved", date: "Est. Mar 6, 2026" },
  { id: 4, done: false, label: "Pre-departure checklist sent", date: "Feb 26, 2026" },
  { id: 5, done: false, label: "Departure", date: "Mar 12, 2026" },
];

export default function DashboardPage() {
  const { booking } = useBooking();
  const pkg = booking.selectedPackage;
  const params = booking.searchParams;
  const ref = booking.bookingRef ?? "KBP-2026-00142";

  return (
    <>
      <div className="bg-primary py-8 px-4">
        <div className="max-w-content mx-auto">
          <p className="font-inter text-label-caps uppercase tracking-widest text-white/60 mb-1">My Trip</p>
          <h1 className="font-fraunces text-h1 text-white mb-1">{pkg?.name ?? "The Complete Experience"}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-2 mb-6">
            <span className="flex items-center gap-1.5 font-inter text-body-sm text-white/70">
              <MapPin size={14} /> {params.departureCity} → Makkah
            </span>
            <span className="flex items-center gap-1.5 font-inter text-body-sm text-white/70">
              <Calendar size={14} /> {params.travelWindow}
            </span>
            <span className="font-inter text-body-sm text-white/70">Ref: {ref}</span>
          </div>
          <p className="font-inter text-label-caps uppercase tracking-widest text-white/50 mb-3">Departure in</p>
          <DepartureCountdown departureDate="2026-03-12T00:00:00" className="[&_span]:text-white [&_p]:text-white/50" />
        </div>
      </div>

      <div className="bg-neutral min-h-screen py-8">
        <div className="max-w-content mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-5">
              {/* Status card */}
              <div className="bg-surface border border-border rounded-xl p-5">
                <h2 className="font-fraunces text-h2 text-on-surface mb-4">Trip status</h2>
                <div className="relative space-y-0">
                  {TIMELINE.map((item, i) => (
                    <div key={item.id} className="flex gap-4 pb-5 last:pb-0">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? "bg-primary" : "bg-border"}`}>
                          {item.done
                            ? <CheckCircle2 size={16} className="text-on-primary" />
                            : <Clock size={16} className="text-muted" />
                          }
                        </div>
                        {i < TIMELINE.length - 1 && (
                          <div className={`w-px flex-1 mt-1 min-h-[24px] ${item.done ? "bg-primary" : "bg-border"}`} />
                        )}
                      </div>
                      <div className="pt-1">
                        <p className={`font-inter font-medium text-body-md ${item.done ? "text-on-surface" : "text-muted"}`}>{item.label}</p>
                        <p className="font-inter text-body-sm text-muted">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included services */}
              <div className="bg-surface border border-border rounded-xl p-5">
                <h2 className="font-fraunces text-h2 text-on-surface mb-4">Your package includes</h2>
                <ServiceIconRow
                  included={pkg?.services.included ?? ["flights", "hotels", "guides", "shuttle", "visa", "car-rental"]}
                  size="md"
                />
                <ul className="mt-4 space-y-2">
                  {(pkg?.highlights ?? [
                    "Round-trip economy flight (JFK → JED)",
                    "5-star hotel · 300m from Masjid al-Haram · 10 nights",
                    "Private airport transfers",
                    "Licensed private English-speaking guide",
                    "Umrah visa assistance via authorized partners",
                    "Madinah extension (3 nights)",
                  ]).map((h) => (
                    <li key={h} className="flex items-start gap-2 font-inter text-body-sm text-secondary">
                      <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Flight summary */}
              <div className="bg-surface border border-border rounded-xl p-5">
                <h2 className="font-fraunces text-h2 text-on-surface mb-4">Flights</h2>
                {[
                  { dir: "Outbound", from: params.departureCode ?? "JFK", to: "JED", date: "Mar 12, 2026", flight: "EK 201" },
                  { dir: "Return", from: "JED", to: params.departureCode ?? "JFK", date: "Mar 22, 2026", flight: "EK 202" },
                ].map((f) => (
                  <div key={f.dir} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
                    <Plane size={18} className={`text-primary ${f.dir === "Return" ? "rotate-180" : ""}`} />
                    <div className="flex-1">
                      <p className="font-inter text-body-sm text-muted">{f.dir} · {f.date}</p>
                      <p className="font-inter font-medium text-body-md text-on-surface">{f.from} → {f.to} · {f.flight}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hotel */}
              <div className="bg-surface border border-border rounded-xl p-5">
                <h2 className="font-fraunces text-h2 text-on-surface mb-3">Hotel</h2>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Building2 size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-inter font-medium text-body-md text-on-surface">
                      {(pkg?.hotelStars ?? 5)}-star hotel · {(pkg?.hotelDistanceMeters ?? 300)}m from Masjid al-Haram
                    </p>
                    <p className="font-inter text-body-sm text-muted">Mar 12 – Mar 22, 2026 · 10 nights</p>
                    <p className="font-inter text-body-sm text-muted">Makkah, Saudi Arabia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-5">
              {/* Price summary */}
              <div className="bg-surface border border-border rounded-xl p-5">
                <p className="font-inter text-label text-muted mb-1">Total paid</p>
                <p className="font-fraunces text-[36px] text-on-surface leading-none mb-1">
                  {formatCurrency((pkg?.pricePerPerson ?? 3890) * (params.adults + params.children))}
                </p>
                <p className="font-inter text-body-sm text-muted">all-inclusive · taxes included</p>
              </div>

              {/* Visa status */}
              <div className="bg-surface border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FileCheck size={16} className="text-primary" />
                  <h2 className="font-fraunces text-h3 text-on-surface">Visa status</h2>
                </div>
                <div className="bg-gold/10 border border-gold/30 rounded-md px-3 py-2 font-inter text-body-sm text-on-surface font-medium">
                  In progress — Est. Mar 6, 2026
                </div>
                <p className="font-inter text-body-sm text-muted mt-2 leading-relaxed">
                  Processed via our authorized visa partners. We will notify you by email and WhatsApp.
                </p>
              </div>

              {/* Concierge */}
              <div className="bg-surface border border-border rounded-xl p-5">
                <h2 className="font-fraunces text-h3 text-on-surface mb-3">Your concierge</h2>
                <ConciergeCard profile={CONCIERGE_PROFILES[0]} compact />
              </div>

              {/* Documents */}
              <div className="bg-surface border border-border rounded-xl p-5">
                <h2 className="font-fraunces text-h3 text-on-surface mb-3">Documents</h2>
                <div className="space-y-2">
                  {["Booking confirmation.pdf", "Visa application receipt.pdf"].map((doc) => (
                    <button key={doc} className="w-full flex items-center justify-between py-2.5 px-3 bg-neutral border border-border rounded-md hover:border-primary transition-colors group">
                      <span className="font-inter text-body-sm text-secondary group-hover:text-on-surface">{doc}</span>
                      <ChevronRight size={14} className="text-muted group-hover:text-primary" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WhatsAppFloater />
    </>
  );
}
