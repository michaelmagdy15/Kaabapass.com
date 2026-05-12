"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/hooks/useBooking";
import { StepIndicator } from "@/components/shared/StepIndicator";
import { TrustBadge } from "@/components/shared/TrustBadge";
import { WhatsAppFloater } from "@/components/shared/WhatsAppFloater";
import { PlusCircle, ChevronDown, ChevronUp, Info, Upload, Check, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  validateFullName,
  validatePassportNumber,
  validatePassportExpiry,
  validateEmail,
} from "@/lib/validation";
import { hasSelectedPackage } from "@/lib/booking-guards";
import type { Traveler } from "@/types";

function generateId() { return Math.random().toString(36).slice(2, 9); }

const EMPTY_TRAVELER = (): Traveler => ({
  id: generateId(),
  fullName: "",
  passportNumber: "",
  passportExpiry: "",
  nationality: "United States",
  gender: "Male",
  passportPhotoUploaded: false,
  idPhotoUploaded: false,
});

type TravelerErrors = {
  fullName?: string;
  passportNumber?: string;
  passportExpiry?: string;
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1.5 font-inter text-body-sm text-red-600 mt-1" role="alert">
      <AlertCircle size={12} className="flex-shrink-0" />
      {message}
    </p>
  );
}

function TravelerForm({
  traveler,
  index,
  errors,
  touched,
  onChange,
  onRemove,
  canRemove,
}: {
  traveler: Traveler;
  index: number;
  errors: TravelerErrors;
  touched: Partial<Record<keyof TravelerErrors, boolean>>;
  onChange: (t: Traveler) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const [open, setOpen] = useState(index === 0);

  const update = (field: keyof Traveler, value: unknown) =>
    onChange({ ...traveler, [field]: value });

  const hasErrors = Object.values(errors).some(Boolean);

  const inputClass = (field: keyof TravelerErrors) =>
    cn(
      "h-11 px-3 border rounded-sm font-inter text-body-md focus:outline-none focus:ring-2 transition-all w-full",
      touched[field] && errors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50"
        : "border-border focus:border-primary focus:ring-primary/20"
    );

  return (
    <div className={cn(
      "bg-surface border rounded-xl overflow-hidden transition-colors",
      hasErrors && touched.fullName ? "border-red-300" : "border-border"
    )}>
      <button
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-neutral transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        type="button"
      >
        <div className="flex items-center gap-3">
          <span className={cn(
            "w-8 h-8 rounded-full font-inter font-semibold text-sm flex items-center justify-center flex-shrink-0",
            hasErrors && touched.fullName ? "bg-red-100 text-red-600" : "bg-primary text-on-primary"
          )}>
            {index + 1}
          </span>
          <span className="font-inter font-medium text-body-md text-on-surface">
            {traveler.fullName || `Traveler ${index + 1}`}
          </span>
          {hasErrors && touched.fullName && (
            <span className="font-inter text-body-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={12} /> Incomplete
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {canRemove && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); onRemove(); } }}
              className="text-muted hover:text-red-500 transition-colors p-1"
              aria-label={`Remove traveler ${index + 1}`}
            >
              <X size={16} />
            </span>
          )}
          {open ? <ChevronUp size={18} className="text-muted" /> : <ChevronDown size={18} className="text-muted" />}
        </div>
      </button>

      {open && (
        <div className="px-5 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border pt-5">
          {/* Full Name */}
          <div className="sm:col-span-2 flex flex-col gap-1">
            <label className="font-inter text-label font-medium text-muted" htmlFor={`name-${traveler.id}`}>
              Full legal name <span className="text-red-500">*</span>
              <span className="text-muted font-normal ml-1">(as in passport)</span>
            </label>
            <input
              id={`name-${traveler.id}`}
              type="text"
              value={traveler.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              onBlur={() => onChange({ ...traveler })} // trigger parent touched update
              placeholder="e.g. Ahmad Yusuf Ibrahim"
              className={inputClass("fullName")}
              autoComplete="name"
            />
            <FieldError message={touched.fullName ? errors.fullName : undefined} />
          </div>

          {/* Passport Number */}
          <div className="flex flex-col gap-1">
            <label className="font-inter text-label font-medium text-muted" htmlFor={`pp-${traveler.id}`}>
              Passport number <span className="text-red-500">*</span>
            </label>
            <input
              id={`pp-${traveler.id}`}
              type="text"
              value={traveler.passportNumber}
              onChange={(e) => update("passportNumber", e.target.value.toUpperCase())}
              placeholder="e.g. A12345678"
              className={inputClass("passportNumber")}
              autoComplete="off"
              maxLength={9}
            />
            <FieldError message={touched.passportNumber ? errors.passportNumber : undefined} />
          </div>

          {/* Expiry */}
          <div className="flex flex-col gap-1">
            <label className="font-inter text-label font-medium text-muted" htmlFor={`exp-${traveler.id}`}>
              Passport expiry <span className="text-red-500">*</span>
            </label>
            <input
              id={`exp-${traveler.id}`}
              type="date"
              value={traveler.passportExpiry}
              onChange={(e) => update("passportExpiry", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className={inputClass("passportExpiry")}
            />
            <FieldError message={touched.passportExpiry ? errors.passportExpiry : undefined} />
            {!errors.passportExpiry && (
              <p className="font-inter text-body-sm text-muted">Must be valid 6+ months after travel (Saudi requirement)</p>
            )}
          </div>

          {/* Nationality */}
          <div className="flex flex-col gap-1">
            <label className="font-inter text-label font-medium text-muted" htmlFor={`nat-${traveler.id}`}>Nationality</label>
            <input
              id={`nat-${traveler.id}`}
              type="text"
              value={traveler.nationality}
              onChange={(e) => update("nationality", e.target.value)}
              className="h-11 px-3 border border-border rounded-sm font-inter text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-1">
            <label className="font-inter text-label font-medium text-muted" htmlFor={`gender-${traveler.id}`}>Gender</label>
            <select
              id={`gender-${traveler.id}`}
              value={traveler.gender}
              onChange={(e) => update("gender", e.target.value)}
              className="h-11 px-3 border border-border rounded-sm font-inter text-body-md bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Prefer not to say</option>
            </select>
          </div>

          {/* Photo uploads (simulated) */}
          {(["passportPhotoUploaded", "idPhotoUploaded"] as const).map((field) => {
            const label = field === "passportPhotoUploaded" ? "Passport photo page scan" : "Recent passport-style photo";
            const uploaded = traveler[field] as boolean;
            return (
              <div key={field} className="flex flex-col gap-1">
                <label className="font-inter text-label font-medium text-muted">{label}</label>
                <button
                  type="button"
                  onClick={() => update(field, true)}
                  className={cn(
                    "h-11 flex items-center justify-center gap-2 border rounded-sm font-inter text-label transition-all",
                    uploaded
                      ? "bg-primary/5 border-primary text-primary"
                      : "border-dashed border-border text-muted hover:border-primary hover:text-primary"
                  )}
                  aria-label={`Upload ${label}`}
                >
                  {uploaded ? <Check size={14} /> : <Upload size={14} />}
                  {uploaded ? "Uploaded ✓" : "Drop or click to upload"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function TravelersPage() {
  const router = useRouter();
  const { booking, setTravelers } = useBooking();
  const [ready, setReady] = useState(false);

  // Navigation guard — must run client-side only
  useEffect(() => {
    if (!hasSelectedPackage(booking)) {
      router.replace("/search");
    } else {
      setReady(true);
    }
  }, [booking, router]);

  if (!ready) return null;

  const totalNeeded = booking.searchParams.adults + booking.searchParams.children;
  const [travelers, setLocalTravelers] = useState<Traveler[]>(
    Array.from({ length: Math.max(totalNeeded, 1) }, EMPTY_TRAVELER)
  );
  const [touched, setTouched] = useState<Record<string, Partial<Record<keyof TravelerErrors, boolean>>>>({});
  const [consent, setConsent] = useState(false);
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const getTravelerErrors = useCallback((t: Traveler): TravelerErrors => ({
    fullName: validateFullName(t.fullName) ?? undefined,
    passportNumber: validatePassportNumber(t.passportNumber) ?? undefined,
    passportExpiry: validatePassportExpiry(t.passportExpiry) ?? undefined,
  }), []);

  const emailError = validateEmail(email);

  const updateTraveler = (index: number, updated: Traveler) => {
    setLocalTravelers((prev) => prev.map((t, i) => (i === index ? updated : t)));
    // Mark all fields as touched when user edits
    setTouched((prev) => ({
      ...prev,
      [updated.id]: { fullName: true, passportNumber: true, passportExpiry: true },
    }));
  };

  const addTraveler = () => setLocalTravelers((prev) => [...prev, EMPTY_TRAVELER()]);

  const removeTraveler = (index: number) => {
    setLocalTravelers((prev) => prev.filter((_, i) => i !== index));
  };

  const allTravelersValid = travelers.every((t) => {
    const errs = getTravelerErrors(t);
    return !errs.fullName && !errs.passportNumber && !errs.passportExpiry;
  });

  const handleContinue = () => {
    setSubmitAttempted(true);
    setEmailTouched(true);
    // Touch all travelers
    const allTouched: Record<string, Partial<Record<keyof TravelerErrors, boolean>>> = {};
    travelers.forEach((t) => {
      allTouched[t.id] = { fullName: true, passportNumber: true, passportExpiry: true };
    });
    setTouched(allTouched);

    if (!allTravelersValid || emailError || !consent) return;

    setTravelers(travelers);
    // Store email in booking state via confirmBooking later; pass via router state
    sessionStorage.setItem("kp_contact_email", email);
    router.push("/review");
  };

  const canSubmit = allTravelersValid && !emailError && consent;

  return (
    <>
      <div className="bg-surface border-b border-border py-4 px-4">
        <StepIndicator currentStep={3} />
      </div>

      <div className="bg-neutral min-h-screen py-10">
        <div className="max-w-[720px] mx-auto px-4 md:px-6">
          <div className="mb-8">
            <h1 className="font-fraunces text-h1 text-on-surface">Tell us who is traveling.</h1>
            <p className="font-inter text-body-md text-secondary mt-2 leading-relaxed">
              We will handle the embassy paperwork after this. You will not need to visit any consulate.
            </p>
          </div>

          {/* Mahram notice */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6 flex gap-3">
            <Info size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <p className="font-inter text-body-sm text-secondary leading-relaxed">
              Saudi regulations allow women to perform Umrah as part of an organized group without a mahram.
              KaabaPass coordinates all required group documentation through our authorized partners.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {travelers.map((t, i) => (
              <TravelerForm
                key={t.id}
                traveler={t}
                index={i}
                errors={getTravelerErrors(t)}
                touched={touched[t.id] ?? {}}
                onChange={(u) => updateTraveler(i, u)}
                onRemove={() => removeTraveler(i)}
                canRemove={travelers.length > 1}
              />
            ))}
          </div>

          <button
            onClick={addTraveler}
            type="button"
            className="flex items-center gap-2 font-inter text-label font-medium text-primary hover:underline mb-8"
          >
            <PlusCircle size={16} />
            Add another traveler
          </button>

          {/* Contact email */}
          <div className="bg-surface border border-border rounded-xl p-5 mb-6">
            <h2 className="font-inter font-semibold text-body-md text-on-surface mb-1">
              Confirmation email <span className="text-red-500">*</span>
            </h2>
            <p className="font-inter text-body-sm text-muted mb-3">
              Your booking confirmation and visa updates will be sent here.
            </p>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              placeholder="you@example.com"
              autoComplete="email"
              className={cn(
                "w-full h-11 px-3 border rounded-sm font-inter text-body-md focus:outline-none focus:ring-2 transition-all",
                (emailTouched || submitAttempted) && emailError
                  ? "border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50"
                  : "border-border focus:border-primary focus:ring-primary/20"
              )}
            />
            {(emailTouched || submitAttempted) && emailError && (
              <p className="flex items-center gap-1.5 font-inter text-body-sm text-red-600 mt-1.5" role="alert">
                <AlertCircle size={12} />
                {emailError}
              </p>
            )}
          </div>

          {/* Consent */}
          <label className="flex items-start gap-3 cursor-pointer mb-6">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 accent-primary w-4 h-4 flex-shrink-0"
              id="consent-checkbox"
            />
            <span className="font-inter text-body-sm text-secondary leading-relaxed">
              I authorize KaabaPass to submit Umrah visa applications on behalf of all listed travelers
              through its authorized partners. I confirm all provided information is accurate and matches
              the travelers&apos; passports.
            </span>
          </label>

          {submitAttempted && !canSubmit && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4 flex items-start gap-2">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="font-inter text-body-sm text-red-700">
                Please complete all required fields above before continuing.
              </p>
            </div>
          )}

          <TrustBadge variant="inline" className="mb-6" />

          <button
            onClick={handleContinue}
            type="button"
            className={cn(
              "w-full h-12 font-inter font-semibold text-label rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              canSubmit
                ? "bg-primary text-on-primary hover:bg-primary-container"
                : "bg-primary/40 text-on-primary cursor-not-allowed"
            )}
            aria-disabled={!canSubmit}
          >
            Continue to review
          </button>
        </div>
      </div>

      <WhatsAppFloater />
    </>
  );
}
