// ─── Hotel Offer Price/Availability Check API Route ──────────────────────────
// GET /api/hotels/price?offerId=OFFER_ID_FROM_SEARCH
//
// Re-validates a hotel offer's price and availability before booking.
// Always call this immediately before displaying "Confirm Booking" button.

import { NextRequest, NextResponse } from "next/server";
import { amadeusConfigured, getAmadeusClient } from "@/lib/amadeus";
import type { HotelOffer } from "@/types";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const offerId = searchParams.get("offerId");

  if (!offerId) {
    return NextResponse.json(
      { error: "offerId query parameter is required" },
      { status: 400 }
    );
  }

  // ── Mock mode ─────────────────────────────────────────────────────────────
  if (!amadeusConfigured()) {
    return NextResponse.json({
      source: "mock",
      message: "Mock hotel price check — returning placeholder confirmation.",
      available: true,
      offerId,
      confirmedAt: new Date().toISOString(),
    });
  }

  // ── Live Amadeus hotel offer check ────────────────────────────────────────
  try {
    const amadeus = getAmadeusClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await (amadeus.shopping.hotelOffersSearch as any).get({ offerId });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw = response.data as any;
    const offer = raw?.offers?.[0];
    const hotel = raw?.hotel;

    if (!offer) {
      return NextResponse.json(
        { error: "Offer not found or no longer available", available: false },
        { status: 404 }
      );
    }

    const confirmed: Partial<HotelOffer> & { available: boolean; confirmedAt: string } = {
      id: offer.id,
      hotelId: hotel?.hotelId,
      hotelName: hotel?.name,
      rating: hotel?.rating,
      address: {
        lines: hotel?.address?.lines ?? [],
        cityName: hotel?.address?.cityName ?? "Makkah",
        countryCode: hotel?.address?.countryCode ?? "SA",
      },
      price: {
        currency: offer.price?.currency ?? "USD",
        total: offer.price?.total ?? "0",
        base: offer.price?.base ?? "0",
      },
      room: {
        typeEstimated: offer.room?.typeEstimated,
        description: offer.room?.description,
      },
      policies: offer.policies,
      checkInDate: offer.checkInDate,
      checkOutDate: offer.checkOutDate,
      boardType: offer.boardType,
      available: true,
      confirmedAt: new Date().toISOString(),
    };

    return NextResponse.json({ source: "live", ...confirmed });
  } catch (err: unknown) {
    console.error("[hotels/price] Amadeus error:", err);
    return NextResponse.json(
      {
        source: "mock",
        error:
          err instanceof Error ? err.message : "Price check failed",
        available: false,
      },
      { status: 502 }
    );
  }
}
