import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateBookingRef(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `KBP-${year}-${rand}`;
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

export function totalTravelers(adults: number, children: number, infants: number): number {
  return adults + children + infants;
}

export function totalPackagePrice(pricePerPerson: number, adults: number, children: number): number {
  return pricePerPerson * adults + Math.round(pricePerPerson * 0.7) * children;
}
