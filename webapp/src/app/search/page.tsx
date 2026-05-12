"use client";

import { useBooking } from "@/hooks/useBooking";
import { PACKAGES } from "@/lib/mock/packages";
import { PackageCard } from "@/components/booking/PackageCard";
import { StepIndicator } from "@/components/shared/StepIndicator";
import { TrustBadge } from "@/components/shared/TrustBadge";
import { SearchCard } from "@/components/booking/SearchCard";
import { LivePriceWidget } from "@/components/booking/LivePriceWidget";
import { WhatsAppFloater } from "@/components/shared/WhatsAppFloater";
import { useRouter } from "next/navigation";
import { MapPin, Users, Calendar, ChevronDown, ChevronUp, Plane, Building2 } from "lucide-react";
import { useState } from "react";
import type { FlightOffer, HotelOffer } from "@/types";

export default function SearchPage() {
  const { booking, selectPackage, confirmFlight, confirmHotel } = useBooking();
  const router = useRouter();
  const [refinersOpen, setRefinersOpen] = useState(false);

  const { searchParams, selectedPackage } = booking;

  const handleSelect = (pkg: typeof PACKAGES[0]) => {
    selectPackage(pkg);
    router.push("/travelers");
  };

  const handleFlightLocked = (offer: FlightOffer, confirmedAt: string) => {
    confirmFlight(offer, confirmedAt);
  };

  const handleHotelLocked = (offer: HotelOffer, confirmedAt: string) => {
    confirmHotel(offer, confirmedAt);
  };

  const flightClass = selectedPackage?.flightClass ?? "economy";
  const hotelStars = selectedPackage?.hotelStars ?? 5;

  return (
    <>
      {/* Step bar */}
      <div className="bg-surface border-b border-border py-4 px-4">
        <StepIndicator currentStep={2} />
      </div>

      {/* Search summary & refine */}
      <div className="bg-neutral border-b border-border py-4 px-4 md:px-6">
        <div className="max-w-content mx-auto">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4 flex-wrap text-body-sm font-inter text-secondary">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-primary" />
                {searchParams.departureCity}
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={14} className="text-primary" />
                {searchParams.adults + searchParams.children + searchParams.infants} travelers
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-primary" />
                {searchParams.travelWindow} · {searchParams.tripLength} days
              </span>
            </div>
            <button
              onClick={() => setRefinersOpen(!refinersOpen)}
              className="flex items-center gap-1.5 font-inter text-label font-medium text-primary hover:underline"
            >
              Refine search
              {refinersOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          </div>

          {refinersOpen && (
            <div className="mt-4">
              <SearchCard inline />
            </div>
          )}
        </div>
      </div>

      {/* Two-column layout: packages left, live prices right */}
      <div className="bg-neutral min-h-screen">
        <div className="max-w-content mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8 items-start">

            {/* Left: Package cards */}
            <div>
              <div className="mb-6">
                <h1 className="font-fraunces text-h1 text-on-surface">Choose your package</h1>
                <p className="font-inter text-body-md text-secondary mt-1">
                  Four curated options. Select the one that fits your journey.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {PACKAGES.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    isSelected={selectedPackage?.id === pkg.id}
                    onSelect={handleSelect}
                  />
                ))}
              </div>

              <div className="mt-8">
                <TrustBadge variant="inline" />
              </div>
            </div>

            {/* Right: Live prices sticky panel */}
            <div className="xl:sticky xl:top-6">
              <div className="mb-4">
                <h2 className="font-fraunces text-h2 text-on-surface flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5">
                    <Plane size={18} className="text-primary" />
                    <Building2 size={18} className="text-gold" />
                  </span>
                  Live Availability
                </h2>
                <p className="font-inter text-body-sm text-secondary mt-0.5">
                  Prices update with your selected package. Lock a fare before proceeding.
                </p>
              </div>

              {/* Price summary badges if already locked */}
              {(booking.confirmedFlight || booking.confirmedHotel) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {booking.confirmedFlight && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-xs font-medium text-green-700">
                      <Plane size={11} />
                      Flight locked · ${Number(booking.confirmedFlight.offer.price.grandTotal).toLocaleString()}
                    </span>
                  )}
                  {booking.confirmedHotel && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-xs font-medium text-green-700">
                      <Building2 size={11} />
                      Hotel locked · ${Number(booking.confirmedHotel.offer.price.total).toLocaleString()}
                    </span>
                  )}
                </div>
              )}

              <LivePriceWidget
                searchParams={searchParams}
                flightClass={flightClass}
                hotelStars={hotelStars}
                onFlightLocked={handleFlightLocked}
                onHotelLocked={handleHotelLocked}
              />
            </div>

          </div>
        </div>
      </div>
      <WhatsAppFloater />
    </>
  );
}
