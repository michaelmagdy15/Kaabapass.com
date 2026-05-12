"use client";
// ─── useLiveFlights ──────────────────────────────────────────────────────────
// Fetches live (or mock) flight offers from /api/flights/search
// based on the current BookingState search params.
// Handles loading, error, and graceful fallback.

import { useState, useEffect, useCallback } from "react";
import type { FlightOffer, SearchParams } from "@/types";

export interface UseLiveFlightsResult {
  offers: FlightOffer[];
  loading: boolean;
  error: string | null;
  source: "live" | "mock" | null;
  refetch: () => void;
}

/**
 * Map a friendly travel window label (e.g. "Ramadan 2027") to approximate
 * departure/return dates for the Amadeus API.
 * In production this would come from a date picker; for now we derive sensible
 * defaults from today + the trip length.
 */
function deriveFlightDates(
  travelWindow: string,
  tripLength: number
): { departureDate: string; returnDate: string } {
  // Try to find a year in the label
  const yearMatch = travelWindow.match(/\d{4}/);
  const year = yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear() + 1;

  // Ramadan 2026 ≈ Feb 28; Ramadan 2027 ≈ Feb 17 — rough heuristic
  const departure = new Date(`${year}-03-01`);
  departure.setFullYear(year);

  const returnDate = new Date(departure);
  returnDate.setDate(returnDate.getDate() + tripLength);

  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return { departureDate: fmt(departure), returnDate: fmt(returnDate) };
}

/**
 * Map a departure city name → its nearest IATA airport code.
 * This covers the most common US cities KaabaPass serves.
 */
function cityToIata(cityName: string, fallback = "JFK"): string {
  const map: Record<string, string> = {
    "New York": "JFK",
    "Los Angeles": "LAX",
    "Chicago": "ORD",
    "Houston": "IAH",
    "Dallas": "DFW",
    "Miami": "MIA",
    "Washington": "IAD",
    "San Francisco": "SFO",
    "Boston": "BOS",
    "Detroit": "DTW",
    "London": "LHR",
    "Toronto": "YYZ",
    "Dubai": "DXB",
  };
  for (const [key, code] of Object.entries(map)) {
    if (cityName.toLowerCase().includes(key.toLowerCase())) return code;
  }
  return fallback;
}

/**
 * Map a KaabaPass flight class to Amadeus travelClass param.
 */
function flightClassToAmadeus(fc: string): string {
  if (fc === "business") return "BUSINESS";
  if (fc === "first") return "FIRST";
  return "ECONOMY";
}

export function useLiveFlights(
  searchParams: SearchParams,
  flightClass: "economy" | "business" | "first" = "economy"
): UseLiveFlightsResult {
  const [offers, setOffers] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<"live" | "mock" | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    const origin = searchParams.departureCode || cityToIata(searchParams.departureCity);
    const { departureDate, returnDate } = deriveFlightDates(
      searchParams.travelWindow,
      searchParams.tripLength
    );
    const travelClass = flightClassToAmadeus(flightClass);

    const qs = new URLSearchParams({
      origin,
      destination: "JED",
      departureDate,
      returnDate,
      adults: String(Math.max(1, searchParams.adults)),
      children: String(searchParams.children),
      infants: String(searchParams.infants),
      travelClass,
    });

    try {
      const res = await window.fetch(`/api/flights/search?${qs}`);
      const json = await res.json();
      setOffers(json.offers ?? []);
      setSource(json.source === "live" ? "live" : "mock");
      if (json.error) setError(json.error);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch flights");
    } finally {
      setLoading(false);
    }
  }, [searchParams, flightClass]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { offers, loading, error, source, refetch: fetch };
}

/**
 * Confirm (price-check) a selected flight offer.
 * Returns the confirmed offer with a fresh price or throws.
 */
export async function confirmFlightPrice(
  offer: FlightOffer
): Promise<{ confirmed: FlightOffer; confirmedAt: string; source: string }> {
  const res = await fetch("/api/flights/price", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ offer }),
  });
  if (!res.ok) throw new Error(`Price confirmation failed: ${res.status}`);
  return res.json();
}
