"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/hooks/useBooking";
import { StepIndicator } from "@/components/shared/StepIndicator";
import { ServiceIconRow } from "@/components/shared/ServiceIconRow";
import { WhatsAppFloater } from "@/components/shared/WhatsAppFloater";
import {
  CreditCard, Smartphone, RefreshCw, ChevronDown, ChevronUp,
  Plane, Building2, Bus, Compass, FileCheck, Pencil, Lock
} from "lucide-react";
import { cn, formatCurrency, totalPackagePrice } from "@/lib/utils";
import type { PaymentMethod } from "@/types";

const PAYMENT_OPTIONS: { key: PaymentMethod; label: string; icon: React.ReactNode }[] = [
  { key: "card", label: "Credit or Debit Card", icon: <CreditCard size={18} /> },
  { key: "apple-pay", label: "Apple Pay", icon: <Smartphone size={18} /> },
  { key: "google-pay", label: "Google Pay", icon: <Smartphone size={18} /> },
  { key: "installments", label: "Pay in 4 installments", icon: <RefreshCw size={18} /> },
];

function LineItem({ icon, label, value, onEdit }: { icon: React.ReactNode; label: string; value: string; onEdit?: () => void }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-border last:border-0">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-primary">{icon}</span>
        <div>
          <p className="font-inter text-body-sm text-muted">{label}</p>
          <p className="font-inter text-body-md font-medium text-on-surface">{value}</p>
        </div>
      </div>
      {onEdit && (
        <button onClick={onEdit} className="text-primary hover:text-primary-container flex items-center gap-1 font-inter text-label" aria-label={`Edit ${label}`}>
          <Pencil size={13} /> Edit
        </button>
      )}
    </div>
  );
}

export default function ReviewPage() {
  const router = useRouter();
  const { booking, setPaymentMethod, confirmBooking } = useBooking();
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [priceOpen, setPriceOpen] = useState(false);

  const pkg = booking.selectedPackage;
  const params = booking.searchParams;

  if (!pkg) {
    router.replace("/search");
    return null;
  }

  const total = totalPackagePrice(pkg.pricePerPerson, params.adults, params.children);

  const handleConfirm = () => {
    setPaymentMethod(method);
    const ref = confirmBooking("traveler@example.com");
    router.push(`/confirmation?ref=${ref}`);
  };

  return (
    <>
      <div className="bg-surface border-b border-border py-4 px-4">
        <StepIndicator currentStep={4} />
      </div>

      <div className="bg-neutral min-h-screen py-10">
        <div className="max-w-[860px] mx-auto px-4 md:px-6">
          <h1 className="font-fraunces text-h1 text-on-surface mb-2">Review your booking</h1>
          <p className="font-inter text-body-md text-secondary mb-8">
            Double-check everything below before confirming.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Left — details */}
            <div className="md:col-span-3 space-y-5">
              {/* Package summary */}
              <div className="bg-surface border border-border rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-inter text-label-caps text-muted font-medium uppercase tracking-widest">{pkg.tier}</p>
                    <h2 className="font-fraunces text-h2 text-on-surface">{pkg.name}</h2>
                  </div>
                  <button
                    onClick={() => router.push("/search")}
                    className="text-primary flex items-center gap-1 font-inter text-label hover:underline"
                  >
                    <Pencil size={13} /> Change
                  </button>
                </div>
                <ServiceIconRow included={pkg.services.included} size="sm" />
              </div>

              {/* Flight & hotel details */}
              <div className="bg-surface border border-border rounded-xl p-5">
                <h3 className="font-fraunces text-h3 text-on-surface mb-1">Itinerary</h3>
                <LineItem icon={<Plane size={16} />} label="Outbound flight" value={`${params.departureCode} → JED · Mar 12, 2026`} />
                <LineItem icon={<Plane size={16} className="rotate-180" />} label="Return flight" value={`JED → ${params.departureCode} · Mar 22, 2026`} />
                <LineItem icon={<Building2 size={16} />} label="Hotel" value={`${pkg.hotelStars}-star · ${pkg.hotelDistanceMeters}m from Masjid al-Haram · 10 nights`} />
                <LineItem icon={<Bus size={16} />} label="Transportation" value={pkg.flightClass === "economy" ? "Shared shuttle transfers" : "Private car throughout"} />
                <LineItem icon={<Compass size={16} />} label="Tour guide" value={pkg.flightClass === "business" || pkg.flightClass === "first" ? "Private licensed scholar-guide" : "Licensed group guide (English)"} />
                <LineItem icon={<FileCheck size={16} />} label="Visa assistance" value="Processed via our authorized partners · 3–5 business days" />
              </div>

              {/* Travelers */}
              <div className="bg-surface border border-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-fraunces text-h3 text-on-surface">Travelers</h3>
                  <button onClick={() => router.push("/travelers")} className="text-primary flex items-center gap-1 font-inter text-label hover:underline">
                    <Pencil size={13} /> Edit
                  </button>
                </div>
                <p className="font-inter text-body-md text-secondary">
                  {params.adults} adult{params.adults !== 1 ? "s" : ""}
                  {params.children > 0 ? `, ${params.children} child${params.children !== 1 ? "ren" : ""}` : ""}
                  {params.infants > 0 ? `, ${params.infants} infant${params.infants !== 1 ? "s" : ""}` : ""}
                </p>
                <p className="font-inter text-body-sm text-muted mt-1">
                  Departing from {params.departureCity} · {params.travelWindow}
                </p>
              </div>
            </div>

            {/* Right — pricing + payment */}
            <div className="md:col-span-2 space-y-5">
              {/* Price card */}
              <div className="bg-surface border border-border rounded-xl p-5 sticky top-24">
                <div className="flex items-end justify-between mb-1">
                  <span className="font-fraunces text-[36px] leading-none text-on-surface">
                    {formatCurrency(total)}
                  </span>
                </div>
                <p className="font-inter text-body-sm text-muted mb-4">all-inclusive · taxes & fees included</p>

                {/* Breakdown toggle */}
                <button
                  onClick={() => setPriceOpen(!priceOpen)}
                  className="flex items-center gap-1.5 font-inter text-label text-primary font-medium hover:underline mb-2"
                >
                  See breakdown {priceOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                {priceOpen && (
                  <div className="space-y-2 mb-4 border-t border-border pt-3">
                    <div className="flex justify-between font-inter text-body-sm text-secondary">
                      <span>Adults × {params.adults}</span>
                      <span>{formatCurrency(pkg.pricePerPerson * params.adults)}</span>
                    </div>
                    {params.children > 0 && (
                      <div className="flex justify-between font-inter text-body-sm text-secondary">
                        <span>Children × {params.children}</span>
                        <span>{formatCurrency(Math.round(pkg.pricePerPerson * 0.7) * params.children)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-inter text-body-sm text-secondary">
                      <span>Taxes & fees</span>
                      <span>Included</span>
                    </div>
                    <div className="flex justify-between font-inter text-body-md font-semibold text-on-surface border-t border-border pt-2">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                )}

                {/* Payment method */}
                <div className="space-y-2 mb-5">
                  {PAYMENT_OPTIONS.map((opt) => (
                    <label
                      key={opt.key}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 border rounded-md cursor-pointer transition-all",
                        method === opt.key
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={opt.key}
                        checked={method === opt.key}
                        onChange={() => setMethod(opt.key)}
                        className="accent-primary"
                      />
                      <span className="text-secondary">{opt.icon}</span>
                      <span className="font-inter text-body-sm font-medium text-on-surface">{opt.label}</span>
                    </label>
                  ))}
                </div>

                <button
                  onClick={handleConfirm}
                  className="w-full h-12 bg-primary text-on-primary font-inter font-semibold text-label rounded-md hover:bg-primary-container transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <Lock size={15} />
                  Confirm &amp; Book
                </button>

                <p className="font-inter text-body-sm text-muted text-center mt-3">
                  Free cancellation within 14 days.{" "}
                  <a href="/terms" className="text-primary hover:underline">Cancellation policy</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WhatsAppFloater />
    </>
  );
}
