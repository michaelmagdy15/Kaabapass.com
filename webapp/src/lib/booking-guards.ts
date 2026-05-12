// ─── Booking Navigation Guards ────────────────────────────────────────────────
import type { BookingState } from "@/types";

/**
 * Returns true if the booking has a selected package.
 * Used to guard /travelers and beyond.
 */
export function hasSelectedPackage(booking: BookingState): boolean {
  return !!booking.selectedPackage;
}

/**
 * Returns true if traveler data has been entered.
 * Used to guard /review and beyond.
 */
export function hasTravelers(booking: BookingState): boolean {
  return !!(booking.travelers && booking.travelers.length > 0);
}

/**
 * Returns true if the booking is fully complete.
 * Used to guard /confirmation and /dashboard.
 */
export function isBookingComplete(booking: BookingState): boolean {
  return !!booking.bookingComplete && !!booking.bookingRef;
}
