"use client";
// ─── LivePriceWidget ──────────────────────────────────────────────────────────
// Displays real-time flight + hotel prices fetched from Amadeus.
// Shows loading skeletons, a "price valid for 15 min" countdown, and
// a "Lock This Price" CTA that triggers price confirmation before proceeding.

import { useState, useEffect, useCallback } from "react";
import { Plane, Building2, Lock, RefreshCw, AlertCircle, CheckCircle2, Wifi, WifiOff } from "lucide-react";
import type { FlightOffer, HotelOffer, SearchParams } from "@/types";
import { useLiveFlights, confirmFlightPrice } from "@/hooks/useLiveFlights";
import { useLiveHotels, confirmHotelPrice } from "@/hooks/useLiveHotels";

// ── Sub-components ────────────────────────────────────────────────────────────

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-border/60 via-border/30 to-border/60 rounded-lg ${className}`}
      style={{ backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }}
    />
  );
}

function LiveBadge({ source }: { source: "live" | "mock" | null }) {
  if (!source) return null;
  return source === "live" ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
      <Wifi size={10} />
      Live prices
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
      <WifiOff size={10} />
      Estimated
    </span>
  );
}

function PriceCountdown({ lockedAt }: { lockedAt: Date }) {
  const [secondsLeft, setSecondsLeft] = useState(900); // 15 min

  useEffect(() => {
    const elapsed = Math.floor((Date.now() - lockedAt.getTime()) / 1000);
    const initial = Math.max(0, 900 - elapsed);
    setSecondsLeft(initial);

    const interval = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [lockedAt]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const isUrgent = secondsLeft < 120;
  const expired = secondsLeft === 0;

  return (
    <span
      className={`font-mono text-xs font-semibold ${
        expired
          ? "text-red-600"
          : isUrgent
          ? "text-amber-600"
          : "text-green-700"
      }`}
    >
      {expired
        ? "Expired — please re-search"
        : `Price held for ${mins}:${String(secs).padStart(2, "0")}`}
    </span>
  );
}

// ── Carrier name lookup (common airlines on JED/MED routes) ──────────────────
const CARRIER_NAMES: Record<string, string> = {
  SV: "Saudia Airlines",
  EK: "Emirates",
  QR: "Qatar Airways",
  EY: "Etihad Airways",
  TK: "Turkish Airlines",
  MS: "EgyptAir",
  RJ: "Royal Jordanian",
  ME: "Middle East Airlines",
  XY: "flynas",
  F3: "Flyadeal",
};

function carrierName(code: string): string {
  return CARRIER_NAMES[code] ?? code;
}

function formatDuration(iso: string): string {
  // PT11H30M → 11h 30m
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return iso;
  const h = match[1] ? `${match[1]}h ` : "";
  const m = match[2] ? `${match[2]}m` : "";
  return (h + m).trim();
}

// ── Main FlightCard ───────────────────────────────────────────────────────────
function FlightCard({
  offer,
  selected,
  onSelect,
}: {
  offer: FlightOffer;
  selected: boolean;
  onSelect: () => void;
}) {
  const out = offer.itineraries[0];
  const ret = offer.itineraries[1];
  const seg = out?.segments[0];
  const carrier = seg?.carrierCode ?? offer.validatingAirlineCodes[0] ?? "—";
  const stops = out?.segments.length - 1;

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-xl border transition-all ${
        selected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border bg-surface hover:border-primary/50 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-inter font-semibold text-sm text-on-surface">
              {carrierName(carrier)}
            </span>
            <span className="text-xs text-secondary">{carrier}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-secondary">
            <span>{seg?.departure.iataCode}</span>
            <div className="flex-1 flex items-center gap-1">
              <div className="flex-1 border-t border-dashed border-border" />
              <Plane size={11} className="text-primary rotate-45" />
              <div className="flex-1 border-t border-dashed border-border" />
            </div>
            <span>{seg?.arrival.iataCode}</span>
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-secondary">
            <span>{formatDuration(out?.duration ?? "")}</span>
            <span className="text-border">|</span>
            <span>{stops === 0 ? "Nonstop" : `${stops} stop${stops > 1 ? "s" : ""}`}</span>
            {ret && (
              <>
                <span className="text-border">|</span>
                <span>Return: {formatDuration(ret.duration)}</span>
              </>
            )}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-fraunces text-xl font-semibold text-on-surface">
            ${Number(offer.price.grandTotal).toLocaleString()}
          </div>
          <div className="text-xs text-secondary">per person</div>
          {offer.numberOfBookableSeats <= 4 && offer.numberOfBookableSeats > 0 && (
            <div className="text-xs font-medium text-amber-600 mt-0.5">
              {offer.numberOfBookableSeats} seats left!
            </div>
          )}
        </div>
      </div>
      {selected && (
        <div className="mt-2 flex items-center gap-1.5 text-primary text-xs font-medium">
          <CheckCircle2 size={13} />
          Selected
        </div>
      )}
    </button>
  );
}

// ── Main HotelCard ────────────────────────────────────────────────────────────
function HotelCard({
  offer,
  selected,
  onSelect,
}: {
  offer: HotelOffer;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-xl border transition-all ${
        selected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border bg-surface hover:border-primary/50 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-inter font-semibold text-sm text-on-surface truncate">
              {offer.hotelName}
            </span>
            {offer.rating && (
              <span className="text-xs text-amber-500 shrink-0">
                {"★".repeat(Number(offer.rating))}
              </span>
            )}
          </div>
          <div className="text-xs text-secondary truncate mb-0.5">
            {offer.room?.description?.text ?? offer.room?.typeEstimated?.category ?? "Standard Room"}
          </div>
          <div className="text-xs text-secondary">
            {offer.boardType === "BREAKFAST" ? "🍳 Breakfast included" : "Room only"} ·{" "}
            {offer.policies?.checkInOut
              ? `Check-in ${offer.policies.checkInOut.checkIn}`
              : "See hotel for details"}
          </div>
          {offer.policies?.cancellations?.[0] && (
            <div className="text-xs text-secondary mt-0.5 line-clamp-1">
              📋 {offer.policies.cancellations[0].description?.text}
            </div>
          )}
        </div>
        <div className="text-right shrink-0">
          <div className="font-fraunces text-xl font-semibold text-on-surface">
            ${Number(offer.price.total).toLocaleString()}
          </div>
          <div className="text-xs text-secondary">total stay</div>
        </div>
      </div>
      {selected && (
        <div className="mt-2 flex items-center gap-1.5 text-primary text-xs font-medium">
          <CheckCircle2 size={13} />
          Selected
        </div>
      )}
    </button>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface LivePriceWidgetProps {
  searchParams: SearchParams;
  flightClass?: "economy" | "business" | "first";
  hotelStars?: number;
  onFlightLocked?: (offer: FlightOffer, confirmedAt: string) => void;
  onHotelLocked?: (offer: HotelOffer, confirmedAt: string) => void;
}

// ── Main Widget ───────────────────────────────────────────────────────────────
export function LivePriceWidget({
  searchParams,
  flightClass = "economy",
  hotelStars = 5,
  onFlightLocked,
  onHotelLocked,
}: LivePriceWidgetProps) {
  const {
    offers: flightOffers,
    loading: flightLoading,
    error: flightError,
    source: flightSource,
    refetch: refetchFlights,
  } = useLiveFlights(searchParams, flightClass);

  const {
    offers: hotelOffers,
    loading: hotelLoading,
    error: hotelError,
    source: hotelSource,
    refetch: refetchHotels,
  } = useLiveHotels(searchParams, hotelStars);

  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
  const [lockingFlight, setLockingFlight] = useState(false);
  const [lockingHotel, setLockingHotel] = useState(false);
  const [flightLockError, setFlightLockError] = useState<string | null>(null);
  const [hotelLockError, setHotelLockError] = useState<string | null>(null);
  const [flightLockedAt, setFlightLockedAt] = useState<Date | null>(null);
  const [hotelLockedAt, setHotelLockedAt] = useState<Date | null>(null);

  // Auto-select first result when loaded
  useEffect(() => {
    if (!selectedFlightId && flightOffers.length > 0) {
      setSelectedFlightId(flightOffers[0].id);
    }
  }, [flightOffers, selectedFlightId]);

  useEffect(() => {
    if (!selectedHotelId && hotelOffers.length > 0) {
      setSelectedHotelId(hotelOffers[0].id);
    }
  }, [hotelOffers, selectedHotelId]);

  const handleLockFlight = useCallback(async () => {
    const offer = flightOffers.find((o) => o.id === selectedFlightId);
    if (!offer) return;
    setLockingFlight(true);
    setFlightLockError(null);
    try {
      const result = await confirmFlightPrice(offer);
      const lockedAt = new Date(result.confirmedAt);
      setFlightLockedAt(lockedAt);
      onFlightLocked?.(result.confirmed, result.confirmedAt);
    } catch (e) {
      setFlightLockError(e instanceof Error ? e.message : "Price lock failed");
    } finally {
      setLockingFlight(false);
    }
  }, [flightOffers, selectedFlightId, onFlightLocked]);

  const handleLockHotel = useCallback(async () => {
    const offer = hotelOffers.find((o) => o.id === selectedHotelId);
    if (!offer) return;
    setLockingHotel(true);
    setHotelLockError(null);
    try {
      const result = await confirmHotelPrice(offer.id);
      if (!result.available) {
        setHotelLockError("This room is no longer available. Please select another.");
        return;
      }
      const lockedAt = new Date(result.confirmedAt);
      setHotelLockedAt(lockedAt);
      onHotelLocked?.(offer, result.confirmedAt);
    } catch (e) {
      setHotelLockError(e instanceof Error ? e.message : "Hotel price lock failed");
    } finally {
      setLockingHotel(false);
    }
  }, [hotelOffers, selectedHotelId, onHotelLocked]);

  return (
    <div className="space-y-6">
      {/* ── Flight Section ─────────────────────────────────────────────── */}
      <section className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-neutral">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Plane size={16} className="text-primary" />
            </div>
            <div>
              <h3 className="font-inter font-semibold text-sm text-on-surface">
                Available Flights
              </h3>
              <p className="text-xs text-secondary">
                Round-trip · {searchParams.departureCity} → Jeddah (JED)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LiveBadge source={flightSource} />
            <button
              onClick={refetchFlights}
              disabled={flightLoading}
              title="Refresh prices"
              className="p-1.5 rounded-lg hover:bg-border/30 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={14} className={`text-secondary ${flightLoading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {flightLoading ? (
            <>
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </>
          ) : flightError && flightOffers.length === 0 ? (
            <div className="flex items-start gap-2 text-amber-700 bg-amber-50 rounded-xl p-3 text-sm">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{flightError}</span>
            </div>
          ) : (
            flightOffers.map((offer) => (
              <FlightCard
                key={offer.id}
                offer={offer}
                selected={offer.id === selectedFlightId}
                onSelect={() => {
                  setSelectedFlightId(offer.id);
                  setFlightLockedAt(null);
                }}
              />
            ))
          )}

          {flightError && flightOffers.length > 0 && (
            <p className="text-xs text-amber-600 flex items-center gap-1">
              <AlertCircle size={12} />
              {flightError}
            </p>
          )}
        </div>

        {!flightLoading && flightOffers.length > 0 && (
          <div className="px-4 pb-4">
            {flightLockedAt ? (
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-green-700">Price locked!</span>
                </div>
                <PriceCountdown lockedAt={flightLockedAt} />
              </div>
            ) : (
              <button
                onClick={handleLockFlight}
                disabled={!selectedFlightId || lockingFlight}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white font-inter font-semibold text-sm py-3 px-4 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {lockingFlight ? (
                  <RefreshCw size={15} className="animate-spin" />
                ) : (
                  <Lock size={15} />
                )}
                {lockingFlight ? "Confirming price…" : "Lock This Flight Price"}
              </button>
            )}
            {flightLockError && (
              <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={12} />
                {flightLockError}
              </p>
            )}
          </div>
        )}
      </section>

      {/* ── Hotel Section ─────────────────────────────────────────────── */}
      <section className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-neutral">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
              <Building2 size={16} className="text-gold" />
            </div>
            <div>
              <h3 className="font-inter font-semibold text-sm text-on-surface">
                Available Hotels in Makkah
              </h3>
              <p className="text-xs text-secondary">
                {hotelStars}★ · Near Masjid al-Haram
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LiveBadge source={hotelSource} />
            <button
              onClick={refetchHotels}
              disabled={hotelLoading}
              title="Refresh hotels"
              className="p-1.5 rounded-lg hover:bg-border/30 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={14} className={`text-secondary ${hotelLoading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {hotelLoading ? (
            <>
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </>
          ) : hotelError && hotelOffers.length === 0 ? (
            <div className="flex items-start gap-2 text-amber-700 bg-amber-50 rounded-xl p-3 text-sm">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{hotelError}</span>
            </div>
          ) : (
            hotelOffers.map((offer) => (
              <HotelCard
                key={offer.id}
                offer={offer}
                selected={offer.id === selectedHotelId}
                onSelect={() => {
                  setSelectedHotelId(offer.id);
                  setHotelLockedAt(null);
                }}
              />
            ))
          )}
        </div>

        {!hotelLoading && hotelOffers.length > 0 && (
          <div className="px-4 pb-4">
            {hotelLockedAt ? (
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-green-700">Room reserved!</span>
                </div>
                <PriceCountdown lockedAt={hotelLockedAt} />
              </div>
            ) : (
              <button
                onClick={handleLockHotel}
                disabled={!selectedHotelId || lockingHotel}
                className="w-full flex items-center justify-center gap-2 border border-primary text-primary font-inter font-semibold text-sm py-3 px-4 rounded-xl hover:bg-primary/5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {lockingHotel ? (
                  <RefreshCw size={15} className="animate-spin" />
                ) : (
                  <Lock size={15} />
                )}
                {lockingHotel ? "Checking availability…" : "Reserve This Room"}
              </button>
            )}
            {hotelLockError && (
              <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={12} />
                {hotelLockError}
              </p>
            )}
          </div>
        )}
      </section>

      {/* ── Disclaimer ────────────────────────────────────────────────── */}
      <p className="text-xs text-secondary text-center">
        Prices are indicative and subject to availability at time of booking. Fares
        fluctuate in real-time — lock in your selections to hold the displayed price for
        15 minutes.
      </p>
    </div>
  );
}
