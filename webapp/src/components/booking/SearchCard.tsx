"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Users, Calendar, Clock, ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBooking } from "@/hooks/useBooking";

const US_CITIES = [
  { city: "New York", code: "JFK" },
  { city: "New York", code: "EWR" },
  { city: "Washington DC", code: "IAD" },
  { city: "Chicago", code: "ORD" },
  { city: "Los Angeles", code: "LAX" },
  { city: "Houston", code: "IAH" },
  { city: "Atlanta", code: "ATL" },
  { city: "Dallas", code: "DFW" },
  { city: "Detroit", code: "DTW" },
  { city: "Philadelphia", code: "PHL" },
];

const TRIP_LENGTHS: (7 | 10 | 14 | "custom")[] = [7, 10, 14, "custom"];

export function SearchCard({ inline = false }: { inline?: boolean }) {
  const router = useRouter();
  const { setSearchParams } = useBooking();

  const [departure, setDeparture] = useState("JFK");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelersOpen, setTravelersOpen] = useState(false);
  const [tripLength, setTripLength] = useState<7 | 10 | 14 | "custom">(10);
  const [flexible, setFlexible] = useState(false);

  const selectedCity = US_CITIES.find((c) => c.code === departure);
  const totalTravelers = adults + children + infants;

  const handleSearch = () => {
    setSearchParams({
      departureCity: selectedCity ? `${selectedCity.city} (${selectedCity.code})` : departure,
      departureCode: departure,
      adults,
      children,
      infants,
      travelWindow: flexible ? "Flexible — next 3 months" : "Mar 12 – Mar 22, 2026",
      tripLength: tripLength === "custom" ? 10 : tripLength,
    });
    router.push("/search");
  };

  return (
    <div
      className={cn(
        "bg-surface rounded-xl border border-border shadow-card w-full",
        inline ? "p-5" : "p-5 md:p-6"
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        {/* Departure */}
        <div className="flex flex-col gap-1">
          <label className="font-inter text-label font-medium text-muted flex items-center gap-1.5">
            <MapPin size={13} />
            Departure City
          </label>
          <select
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="h-[52px] px-3 border border-border rounded-sm bg-surface font-inter text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            aria-label="Select departure city"
          >
            {US_CITIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.city} ({c.code})
              </option>
            ))}
          </select>
        </div>

        {/* Travelers */}
        <div className="flex flex-col gap-1 relative">
          <label className="font-inter text-label font-medium text-muted flex items-center gap-1.5">
            <Users size={13} />
            Travelers
          </label>
          <button
            onClick={() => setTravelersOpen(!travelersOpen)}
            className="h-[52px] px-3 border border-border rounded-sm bg-surface font-inter text-body-md text-on-surface focus:outline-none focus:border-primary flex items-center justify-between transition-all hover:border-primary"
            aria-expanded={travelersOpen}
            aria-haspopup="listbox"
          >
            <span>{totalTravelers} traveler{totalTravelers !== 1 ? "s" : ""}</span>
            {travelersOpen ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
          </button>

          {travelersOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-md shadow-card z-20 p-4 space-y-3">
              {[
                { label: "Adults", sub: "Age 12+", value: adults, set: setAdults, min: 1 },
                { label: "Children", sub: "Ages 2–11", value: children, set: setChildren, min: 0 },
                { label: "Infants", sub: "Under 2", value: infants, set: setInfants, min: 0 },
              ].map(({ label, sub, value, set, min }) => (
                <div key={label} className="flex items-center justify-between">
                  <div>
                    <p className="font-inter text-body-sm font-medium text-on-surface">{label}</p>
                    <p className="font-inter text-body-sm text-muted">{sub}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => set(Math.max(min, value - 1))}
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-30"
                      disabled={value <= min}
                      aria-label={`Decrease ${label}`}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-inter font-medium w-5 text-center text-on-surface">{value}</span>
                    <button
                      onClick={() => set(value + 1)}
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                      aria-label={`Increase ${label}`}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setTravelersOpen(false)}
                className="w-full mt-1 py-2 bg-primary text-on-primary rounded-md font-inter text-label font-medium"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Travel Window */}
        <div className="flex flex-col gap-1">
          <label className="font-inter text-label font-medium text-muted flex items-center gap-1.5">
            <Calendar size={13} />
            Travel Dates
          </label>
          <div className="h-[52px] border border-border rounded-sm bg-surface flex items-center px-3">
            <div className="flex-1">
              {flexible ? (
                <span className="font-inter text-body-sm text-on-surface">Flexible — next 3 months</span>
              ) : (
                <span className="font-inter text-body-md text-on-surface">Mar 12 – Mar 22, 2026</span>
              )}
            </div>
            <button
              onClick={() => setFlexible(!flexible)}
              className="text-[11px] font-inter font-medium text-primary hover:underline ml-2"
            >
              {flexible ? "Pick dates" : "Flexible"}
            </button>
          </div>
        </div>

        {/* Trip Length */}
        <div className="flex flex-col gap-1">
          <label className="font-inter text-label font-medium text-muted flex items-center gap-1.5">
            <Clock size={13} />
            Trip Length
          </label>
          <div className="h-[52px] border border-border rounded-sm bg-surface flex items-stretch overflow-hidden">
            {TRIP_LENGTHS.map((len, i) => (
              <button
                key={String(len)}
                onClick={() => setTripLength(len)}
                className={cn(
                  "flex-1 font-inter text-body-sm font-medium transition-all",
                  i < TRIP_LENGTHS.length - 1 ? "border-r border-border" : "",
                  tripLength === len
                    ? "bg-primary text-on-primary"
                    : "text-secondary hover:bg-neutral"
                )}
                aria-pressed={tripLength === len}
              >
                {len === "custom" ? "Custom" : `${len}d`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="w-full h-[52px] bg-primary text-on-primary font-inter font-medium text-label rounded-md hover:bg-primary-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Search for Umrah packages"
      >
        Find my Umrah package
      </button>
    </div>
  );
}
