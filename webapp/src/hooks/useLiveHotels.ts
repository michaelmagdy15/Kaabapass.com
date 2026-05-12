"use client";
// ─── useLiveHotels ───────────────────────────────────────────────────────────
// Fetches live (or mock) hotel offers from /api/hotels/search
// based on the current BookingState search params and selected package tier.

import { useState, useEffect, useCallback } from "react";
import type { HotelOffer, SearchParams } from "@/types";

export interface UseLiveHotelsResult {
  offers: HotelOffer[];
  loading: boolean;
  error: string | null;
  source: "live" | "mock" | null;
  refetch: () => void;
}

/**
 * Derive hotel check-in/check-out dates from travel params.
 * Mirror logic from useLiveFlights for consistency.
 */
function deriveHotelDates(
  travelWindow: string,
  tripLength: number
): { checkIn: string; checkOut: string } {
  const yearMatch = travelWindow.match(/\d{4}/);
  const year = yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear() + 1;

  const checkIn = new Date(`${year}-03-01`);
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkOut.getDate() + tripLength);

  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return { checkIn: fmt(checkIn), checkOut: fmt(checkOut) };
}

/**
 * Map hotel star tier (from Package.hotelStars) to Amadeus ratings filter.
 */
function starsToRatings(stars: number): string {
  if (stars >= 5) return "5";
  if (stars >= 4) return "4,5";
  return "3,4,5";
}

export function useLiveHotels(
  searchParams: SearchParams,
  hotelStars = 5
): UseLiveHotelsResult {
  const [offers, setOffers] = useState<HotelOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<"live" | "mock" | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { checkIn, checkOut } = deriveHotelDates(
      searchParams.travelWindow,
      searchParams.tripLength
    );
    const adults = Math.max(1, searchParams.adults);
    const rooms = Math.max(1, Math.ceil(adults / 2));
    const ratings = starsToRatings(hotelStars);

    const qs = new URLSearchParams({
      checkIn,
      checkOut,
      adults: String(adults),
      rooms: String(rooms),
      ratings,
    });

    try {
      const res = await window.fetch(`/api/hotels/search?${qs}`);
      const json = await res.json();
      setOffers(json.offers ?? []);
      setSource(json.source === "live" ? "live" : "mock");
      if (json.error) setError(json.error);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch hotels");
    } finally {
      setLoading(false);
    }
  }, [searchParams, hotelStars]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { offers, loading, error, source, refetch: fetch };
}

/**
 * Re-validate a hotel offer's price and availability before booking.
 * Call this immediately before showing "Confirm Booking".
 */
export async function confirmHotelPrice(offerId: string): Promise<{
  available: boolean;
  confirmedAt: string;
  source: string;
  error?: string;
}> {
  const res = await fetch(
    `/api/hotels/price?${new URLSearchParams({ offerId })}`
  );
  if (!res.ok) throw new Error(`Hotel price check failed: ${res.status}`);
  return res.json();
}
