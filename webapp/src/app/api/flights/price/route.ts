// ─── Flight Price Confirmation API Route ─────────────────────────────────────
// POST /api/flights/price
// Body: { offer: FlightOffer }
//
// Re-validates a flight offer's price with Amadeus before booking.
// This is the critical "price lock" step — prices in GDS change frequently.

import { NextRequest, NextResponse } from "next/server";
import { amadeusConfigured, getAmadeusClient } from "@/lib/amadeus";
import type { FlightOffer } from "@/types";

export async function POST(req: NextRequest) {
  let body: { offer?: FlightOffer };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { offer } = body;
  if (!offer) {
    return NextResponse.json(
      { error: "Request body must include an `offer` object" },
      { status: 400 }
    );
  }

  // ── Mock mode: echo back the offer as "confirmed" ────────────────────────
  if (!amadeusConfigured()) {
    return NextResponse.json({
      source: "mock",
      message: "Mock price confirmation — offer echoed back as-is.",
      confirmed: offer,
      confirmedAt: new Date().toISOString(),
    });
  }

  // ── Live Amadeus price confirmation ──────────────────────────────────────
  try {
    const amadeus = getAmadeusClient();
    const raw = offer._raw ?? offer;

    const response = await amadeus.shopping.flightOffersSearch.pricing.post(
      JSON.stringify({ data: { type: "flight-offers-pricing", flightOffers: [raw] } })
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const confirmedRaw = response.data?.flightOffers?.[0] as any;
    if (!confirmedRaw) {
      return NextResponse.json(
        { error: "No confirmed offer returned from Amadeus" },
        { status: 502 }
      );
    }

    const confirmed: FlightOffer = {
      id: confirmedRaw.id ?? offer.id,
      source: "live-confirmed",
      itineraries: confirmedRaw.itineraries ?? offer.itineraries,
      price: confirmedRaw.price ?? offer.price,
      travelerPricings: confirmedRaw.travelerPricings ?? [],
      validatingAirlineCodes: confirmedRaw.validatingAirlineCodes ?? [],
      numberOfBookableSeats: confirmedRaw.numberOfBookableSeats ?? 0,
      _raw: confirmedRaw,
    };

    return NextResponse.json({
      source: "live",
      confirmed,
      confirmedAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    console.error("[flights/price] Amadeus error:", err);
    // Return the original offer so the UI can still proceed
    return NextResponse.json({
      source: "mock",
      error:
        err instanceof Error ? err.message : "Price confirmation failed — offer unverified",
      confirmed: offer,
      confirmedAt: new Date().toISOString(),
    });
  }
}
