"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/hooks/useBooking";
import { StepIndicator } from "@/components/shared/StepIndicator";
import { TrustBadge } from "@/components/shared/TrustBadge";
import { WhatsAppFloater } from "@/components/shared/WhatsAppFloater";
import { PlusCircle, ChevronDown, ChevronUp, Info, Upload, Check } from "lucide-react";
import { cn } from "@/lib/utils";
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

function TravelerForm({
  traveler,
  index,
  onChange,
}: {
  traveler: Traveler;
  index: number;
  onChange: (t: Traveler) => void;
}) {
  const [open, setOpen] = useState(index === 0);

  const update = (field: keyof Traveler, value: unknown) =>
    onChange({ ...traveler, [field]: value });

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-neutral transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-inter font-semibold text-sm flex items-center justify-center flex-shrink-0">
            {index + 1}
          </span>
          <span className="font-inter font-medium text-body-md text-on-surface">
            {traveler.fullName || `Traveler ${index + 1}`}
          </span>
        </div>
        {open ? <ChevronUp size={18} className="text-muted" /> : <ChevronDown size={18} className="text-muted" />}
      </button>

      {open && (
        <div className="px-5 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border pt-5">
          {/* Full Name */}
          <div className="sm:col-span-2 flex flex-col gap-1">
            <label className="font-inter text-label font-medium text-muted" htmlFor={`name-${traveler.id}`}>
              Full legal name (as in passport)
            </label>
            <input
              id={`name-${traveler.id}`}
              type="text"
              value={traveler.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="e.g. Ahmad Yusuf Ibrahim"
              className="h-11 px-3 border border-border rounded-sm font-inter text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Passport Number */}
          <div className="flex flex-col gap-1">
            <label className="font-inter text-label font-medium text-muted" htmlFor={`pp-${traveler.id}`}>Passport number</label>
            <input
              id={`pp-${traveler.id}`}
              type="text"
              value={traveler.passportNumber}
              onChange={(e) => update("passportNumber", e.target.value)}
              placeholder="e.g. A12345678"
              className="h-11 px-3 border border-border rounded-sm font-inter text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Expiry */}
          <div className="flex flex-col gap-1">
            <label className="font-inter text-label font-medium text-muted" htmlFor={`exp-${traveler.id}`}>Passport expiry</label>
            <input
              id={`exp-${traveler.id}`}
              type="date"
              value={traveler.passportExpiry}
              onChange={(e) => update("passportExpiry", e.target.value)}
              min="2026-01-01"
              className="h-11 px-3 border border-border rounded-sm font-inter text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
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
          {["passportPhotoUploaded", "idPhotoUploaded"].map((field) => {
            const label = field === "passportPhotoUploaded" ? "Passport photo page" : "Recent passport-style photo";
            const uploaded = traveler[field as keyof Traveler] as boolean;
            return (
              <div key={field} className="flex flex-col gap-1">
                <label className="font-inter text-label font-medium text-muted">{label}</label>
                <button
                  type="button"
                  onClick={() => update(field as keyof Traveler, true)}
                  className={cn(
                    "h-11 flex items-center justify-center gap-2 border rounded-sm font-inter text-label transition-all",
                    uploaded
                      ? "bg-primary/5 border-primary text-primary"
                      : "border-dashed border-border text-muted hover:border-primary hover:text-primary"
                  )}
                  aria-label={`Upload ${label}`}
                >
                  {uploaded ? <Check size={14} /> : <Upload size={14} />}
                  {uploaded ? "Uploaded" : "Drop or click to upload"}
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
  const totalNeeded = booking.searchParams.adults + booking.searchParams.children;
  const [travelers, setLocalTravelers] = useState<Traveler[]>(
    Array.from({ length: Math.max(totalNeeded, 1) }, EMPTY_TRAVELER)
  );
  const [consent, setConsent] = useState(false);

  const updateTraveler = (index: number, updated: Traveler) => {
    setLocalTravelers((prev) => prev.map((t, i) => (i === index ? updated : t)));
  };

  const addTraveler = () => setLocalTravelers((prev) => [...prev, EMPTY_TRAVELER()]);

  const handleContinue = () => {
    setTravelers(travelers);
    router.push("/review");
  };

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
              <TravelerForm key={t.id} traveler={t} index={i} onChange={(u) => updateTraveler(i, u)} />
            ))}
          </div>

          <button
            onClick={addTraveler}
            className="flex items-center gap-2 font-inter text-label font-medium text-primary hover:underline mb-8"
          >
            <PlusCircle size={16} />
            Add another traveler
          </button>

          {/* Consent */}
          <label className="flex items-start gap-3 cursor-pointer mb-8">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 accent-primary w-4 h-4 flex-shrink-0"
              id="consent-checkbox"
            />
            <span className="font-inter text-body-sm text-secondary leading-relaxed">
              I authorize KaabaPass to submit Umrah visa applications on behalf of all listed travelers
              through its authorized partners. I confirm all provided information is accurate.
            </span>
          </label>

          <TrustBadge variant="inline" className="mb-6" />

          <button
            onClick={handleContinue}
            disabled={!consent}
            className="w-full h-12 bg-primary text-on-primary font-inter font-semibold text-label rounded-md hover:bg-primary-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Continue to review
          </button>
        </div>
      </div>

      <WhatsAppFloater />
    </>
  );
}
