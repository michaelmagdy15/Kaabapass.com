"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/hooks/useBooking";
import { StepIndicator } from "@/components/shared/StepIndicator";
import { ServiceIconRow } from "@/components/shared/ServiceIconRow";
import { WhatsAppFloater } from "@/components/shared/WhatsAppFloater";
import {
  CreditCard, Smartphone, RefreshCw, ChevronDown, ChevronUp,
  Plane, Building2, Bus, Compass, FileCheck, Pencil, Lock, AlertCircle
} from "lucide-react";
import { cn, formatCurrency, totalPackagePrice } from "@/lib/utils";
import {
  validateCardNumber, validateCardExpiry, validateCVV,
  validateCardholderName, formatCardNumber, formatCardExpiry
} from "@/lib/validation";
import { hasSelectedPackage, hasTravelers } from "@/lib/booking-guards";
import type { PaymentMethod } from "@/types";

const PAYMENT_OPTIONS: { key: PaymentMethod; label: string; icon: React.ReactNode }[] = [
  { key: "card", label: "Credit or Debit Card", icon: <CreditCard size={18} /> },
  { key: "apple-pay", label: "Apple Pay", icon: <Smartphone size={18} /> },
  { key: "google-pay", label: "Google Pay", icon: <Smartphone size={18} /> },
  { key: "installments", label: "Pay in 4 installments", icon: <RefreshCw size={18} /> },
];

function FieldError({ msg }: { msg?: string | null }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1.5 font-inter text-body-sm text-red-600 mt-1" role="alert">
      <AlertCircle size={12} className="flex-shrink-0" />
      {msg}
    </p>
  );
}

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
        <button onClick={onEdit} className="text-primary hover:text-primary-container flex items-center gap-1 font-inter text-label">
          <Pencil size={13} /> Edit
        </button>
      )}
    </div>
  );
}

type CardF = { number: string; expiry: string; cvv: string; name: string };

export default function ReviewPage() {
  const router = useRouter();
  const { booking, setPaymentMethod, confirmBooking } = useBooking();
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [priceOpen, setPriceOpen] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [card, setCard] = useState<CardF>({ number: "", expiry: "", cvv: "", name: "" });
  const [touched, setTouched] = useState<Partial<Record<keyof CardF, boolean>>>({});

  const [ready, setReady] = useState(false);

  // Navigation guards — must run client-side only
  useEffect(() => {
    if (!hasSelectedPackage(booking)) {
      router.replace("/search");
    } else if (!hasTravelers(booking)) {
      router.replace("/travelers");
    } else {
      setReady(true);
    }
  }, [booking, router]);

  if (!ready) return null;

  const pkg = booking.selectedPackage!;
  const params = booking.searchParams;
  const total = totalPackagePrice(pkg.pricePerPerson, params.adults, params.children);
  const contactEmail = (typeof window !== "undefined" && sessionStorage.getItem("kp_contact_email")) || "";

  const cardErrors = {
    number: validateCardNumber(card.number),
    expiry: validateCardExpiry(card.expiry),
    cvv: validateCVV(card.cvv),
    name: validateCardholderName(card.name),
  };
  const cardValid = !Object.values(cardErrors).some(Boolean);

  const touch = (f: keyof CardF) => setTouched(p => ({ ...p, [f]: true }));
  const updateCard = (f: keyof CardF, raw: string) => {
    let v = raw;
    if (f === "number") v = formatCardNumber(raw);
    if (f === "expiry") v = formatCardExpiry(raw);
    if (f === "cvv") v = raw.replace(/\D/g, "").slice(0, 4);
    setCard(p => ({ ...p, [f]: v }));
  };

  const fieldClass = (f: keyof CardF) =>
    cn("w-full h-11 px-3 border rounded-sm font-inter text-body-md focus:outline-none focus:ring-2 transition-all",
      (touched[f] || attempted) && cardErrors[f]
        ? "border-red-400 focus:ring-red-200 bg-red-50"
        : "border-border focus:border-primary focus:ring-primary/20");

  const handleConfirm = () => {
    setAttempted(true);
    if (method === "card") {
      setTouched({ number: true, expiry: true, cvv: true, name: true });
      if (!cardValid) return;
    }
    setPaymentMethod(method);
    const ref = confirmBooking(contactEmail || "traveler@example.com");
    router.push(`/confirmation?ref=${ref}`);
  };

  const canConfirm = method !== "card" || cardValid;

  return (
    <>
      <div className="bg-surface border-b border-border py-4 px-4">
        <StepIndicator currentStep={4} />
      </div>
      <div className="bg-neutral min-h-screen py-10">
        <div className="max-w-[860px] mx-auto px-4 md:px-6">
          <h1 className="font-fraunces text-h1 text-on-surface mb-2">Review your booking</h1>
          <p className="font-inter text-body-md text-secondary mb-8">Double-check everything below before confirming.</p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-3 space-y-5">
              {/* Package */}
              <div className="bg-surface border border-border rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-inter text-label-caps text-muted font-medium uppercase tracking-widest">{pkg.tier}</p>
                    <h2 className="font-fraunces text-h2 text-on-surface">{pkg.name}</h2>
                  </div>
                  <button onClick={() => router.push("/search")} className="text-primary flex items-center gap-1 font-inter text-label hover:underline">
                    <Pencil size={13} /> Change
                  </button>
                </div>
                <ServiceIconRow included={pkg.services.included} size="sm" />
              </div>

              {/* Itinerary */}
              <div className="bg-surface border border-border rounded-xl p-5">
                <h3 className="font-fraunces text-h3 text-on-surface mb-1">Itinerary</h3>

                {/* Live-confirmed flight details */}
                {booking.confirmedFlight ? (() => {
                  const seg = booking.confirmedFlight.offer.itineraries?.[0]?.segments?.[0];
                  const ret = booking.confirmedFlight.offer.itineraries?.[1]?.segments?.[0];
                  const fare = `$${Number(booking.confirmedFlight.offer.price.grandTotal).toLocaleString()}`;
                  return (
                    <>
                      <LineItem
                        icon={<Plane size={16} />}
                        label={`Outbound · ${seg?.carrierCode ?? ""} ${seg?.number ?? ""} · Price-locked ${fare}`}
                        value={`${seg?.departure?.iataCode ?? params.departureCode} → ${seg?.arrival?.iataCode ?? "JED"} · Dep ${seg?.departure?.at ? new Date(seg.departure.at).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : params.travelWindow.split("–")[0]?.trim()}`}
                      />
                      {ret && (
                        <LineItem
                          icon={<Plane size={16} className="rotate-180" />}
                          label={`Return · ${ret.carrierCode ?? ""} ${ret.number ?? ""}`}
                          value={`${ret.departure?.iataCode ?? "JED"} → ${ret.arrival?.iataCode ?? params.departureCode} · Dep ${ret.departure?.at ? new Date(ret.departure.at).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : params.travelWindow.split("–")[1]?.trim()}`}
                        />
                      )}
                    </>
                  );
                })() : (
                  <>
                    <LineItem icon={<Plane size={16} />} label="Outbound flight" value={`${params.departureCode} → JED · ${params.travelWindow.split("–")[0]?.trim() ?? "Mar 12, 2026"}`} />
                    <LineItem icon={<Plane size={16} className="rotate-180" />} label="Return flight" value={`JED → ${params.departureCode} · ${params.travelWindow.split("–")[1]?.trim() ?? "Mar 22, 2026"}`} />
                  </>
                )}

                {/* Live-confirmed hotel details */}
                {booking.confirmedHotel ? (() => {
                  const h = booking.confirmedHotel.offer;
                  const rate = `$${Number(h.price.total).toLocaleString()}`;
                  return (
                    <LineItem
                      icon={<Building2 size={16} />}
                      label={`Hotel · Price-locked ${rate} total`}
                      value={`${h.hotelName} · ${pkg.hotelStars}★ · ${params.tripLength} nights`}
                    />
                  );
                })() : (
                  <LineItem icon={<Building2 size={16} />} label="Hotel" value={`${pkg.hotelStars}-star · ${pkg.hotelDistanceMeters}m from Masjid al-Haram · ${params.tripLength} nights`} />
                )}

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
                {(booking.travelers?.length ?? 0) > 0 ? (
                  <ul className="space-y-1">
                    {booking.travelers!.map((t, i) => (
                      <li key={t.id} className="font-inter text-body-md text-secondary">
                        {i + 1}. {t.fullName} — Passport {t.passportNumber}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-inter text-body-md text-secondary">
                    {params.adults} adult{params.adults !== 1 ? "s" : ""}
                    {params.children > 0 ? `, ${params.children} child${params.children !== 1 ? "ren" : ""}` : ""}
                  </p>
                )}
                {contactEmail && (
                  <p className="font-inter text-body-sm text-muted mt-2">
                    Confirmation to: <strong>{contactEmail}</strong>
                  </p>
                )}
              </div>
            </div>

            {/* Right — payment */}
            <div className="md:col-span-2 space-y-5">
              <div className="bg-surface border border-border rounded-xl p-5 sticky top-24">
                <div className="mb-1">
                  <span className="font-fraunces text-[36px] leading-none text-on-surface">{formatCurrency(total)}</span>
                </div>
                <p className="font-inter text-body-sm text-muted mb-4">all-inclusive · taxes &amp; fees included</p>

                <button onClick={() => setPriceOpen(!priceOpen)} className="flex items-center gap-1.5 font-inter text-label text-primary font-medium hover:underline mb-3">
                  See breakdown {priceOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                {priceOpen && (
                  <div className="space-y-2 mb-4 border-t border-border pt-3">
                    <div className="flex justify-between font-inter text-body-sm text-secondary">
                      <span>Adults × {params.adults}</span><span>{formatCurrency(pkg.pricePerPerson * params.adults)}</span>
                    </div>
                    {params.children > 0 && (
                      <div className="flex justify-between font-inter text-body-sm text-secondary">
                        <span>Children × {params.children}</span><span>{formatCurrency(Math.round(pkg.pricePerPerson * 0.7) * params.children)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-inter text-body-md font-semibold text-on-surface border-t border-border pt-2">
                      <span>Total</span><span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                )}

                {/* Payment methods */}
                <div className="space-y-2 mb-4">
                  {PAYMENT_OPTIONS.map((opt) => (
                    <label key={opt.key} className={cn("flex items-center gap-3 px-3 py-3 border rounded-md cursor-pointer transition-all", method === opt.key ? "border-primary bg-primary/5" : "border-border hover:border-primary/50")}>
                      <input type="radio" name="payment" value={opt.key} checked={method === opt.key} onChange={() => setMethod(opt.key)} className="accent-primary" />
                      <span className="text-secondary">{opt.icon}</span>
                      <span className="font-inter text-body-sm font-medium text-on-surface">{opt.label}</span>
                    </label>
                  ))}
                </div>

                {/* Card form */}
                {method === "card" && (
                  <div className="border border-border rounded-md p-4 mb-4 space-y-3 bg-neutral/50">
                    <p className="font-inter text-label font-medium text-muted flex items-center gap-1.5 mb-1">
                      <Lock size={12} /> Card details — 256-bit encrypted
                    </p>
                    <div>
                      <label className="font-inter text-label text-muted block mb-1" htmlFor="rv-card-number">Card number <span className="text-red-500">*</span></label>
                      <input id="rv-card-number" type="text" inputMode="numeric" placeholder="1234 5678 9012 3456" value={card.number} onChange={e => updateCard("number", e.target.value)} onBlur={() => touch("number")} className={fieldClass("number")} maxLength={19} autoComplete="cc-number" />
                      <FieldError msg={(touched.number || attempted) ? cardErrors.number : null} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-inter text-label text-muted block mb-1" htmlFor="rv-expiry">Expiry <span className="text-red-500">*</span></label>
                        <input id="rv-expiry" type="text" inputMode="numeric" placeholder="MM/YY" value={card.expiry} onChange={e => updateCard("expiry", e.target.value)} onBlur={() => touch("expiry")} className={fieldClass("expiry")} maxLength={5} autoComplete="cc-exp" />
                        <FieldError msg={(touched.expiry || attempted) ? cardErrors.expiry : null} />
                      </div>
                      <div>
                        <label className="font-inter text-label text-muted block mb-1" htmlFor="rv-cvv">CVV <span className="text-red-500">*</span></label>
                        <input id="rv-cvv" type="text" inputMode="numeric" placeholder="123" value={card.cvv} onChange={e => updateCard("cvv", e.target.value)} onBlur={() => touch("cvv")} className={fieldClass("cvv")} maxLength={4} autoComplete="cc-csc" />
                        <FieldError msg={(touched.cvv || attempted) ? cardErrors.cvv : null} />
                      </div>
                    </div>
                    <div>
                      <label className="font-inter text-label text-muted block mb-1" htmlFor="rv-name">Cardholder name <span className="text-red-500">*</span></label>
                      <input id="rv-name" type="text" placeholder="Full name on card" value={card.name} onChange={e => updateCard("name", e.target.value)} onBlur={() => touch("name")} className={fieldClass("name")} autoComplete="cc-name" />
                      <FieldError msg={(touched.name || attempted) ? cardErrors.name : null} />
                    </div>
                  </div>
                )}

                <button
                  onClick={handleConfirm}
                  className={cn("w-full h-12 font-inter font-semibold text-label rounded-md transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    canConfirm ? "bg-primary text-on-primary hover:bg-primary-container" : "bg-primary/40 text-on-primary cursor-not-allowed")}
                >
                  <Lock size={15} /> Confirm &amp; Book
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
