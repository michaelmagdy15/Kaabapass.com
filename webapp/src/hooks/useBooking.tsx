"use client";

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { BookingState, SearchParams, Package, PackageCustomizations, Traveler, PaymentMethod } from "@/types";
import { PACKAGES } from "@/lib/mock/packages";
import { generateBookingRef } from "@/lib/utils";

interface BookingContextValue {
  booking: BookingState;
  setSearchParams: (params: SearchParams) => void;
  selectPackage: (pkg: Package) => void;
  applyCustomizations: (customizations: PackageCustomizations) => void;
  setTravelers: (travelers: Traveler[]) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  confirmBooking: (email: string) => string;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

const DEFAULT_STATE: BookingState = {
  searchParams: {
    departureCity: "New York (JFK)",
    departureCode: "JFK",
    adults: 2,
    children: 0,
    infants: 0,
    travelWindow: "Mar 12 – Mar 22, 2026",
    tripLength: 10,
  },
  selectedPackage: PACKAGES[1], // Standard pre-selected for demo
};

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(DEFAULT_STATE);

  const setSearchParams = useCallback((params: SearchParams) => {
    setBooking((prev) => ({ ...prev, searchParams: params }));
  }, []);

  const selectPackage = useCallback((pkg: Package) => {
    setBooking((prev) => ({ ...prev, selectedPackage: pkg, customizations: undefined }));
  }, []);

  const applyCustomizations = useCallback((customizations: PackageCustomizations) => {
    setBooking((prev) => ({ ...prev, customizations }));
  }, []);

  const setTravelers = useCallback((travelers: Traveler[]) => {
    setBooking((prev) => ({ ...prev, travelers }));
  }, []);

  const setPaymentMethod = useCallback((method: PaymentMethod) => {
    setBooking((prev) => ({ ...prev, paymentMethod: method }));
  }, []);

  const confirmBooking = useCallback((email: string) => {
    const ref = generateBookingRef();
    setBooking((prev) => ({ ...prev, bookingRef: ref, userEmail: email, bookingComplete: true }));
    return ref;
  }, []);

  const resetBooking = useCallback(() => {
    setBooking(DEFAULT_STATE);
  }, []);

  return (
    <BookingContext.Provider
      value={{ booking, setSearchParams, selectPackage, applyCustomizations, setTravelers, setPaymentMethod, confirmBooking, resetBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
