// ─── KaabaPass Shared Validation Library ─────────────────────────────────────
// Returns null if valid, or an error string if invalid.

/** Full legal name — at least 2 words, letters/spaces/hyphens only, 3–80 chars */
export function validateFullName(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Full name is required.";
  if (trimmed.length < 3) return "Name must be at least 3 characters.";
  if (trimmed.length > 80) return "Name must be under 80 characters.";
  if (!/^[A-Za-z\s\-']+$/.test(trimmed)) return "Name may only contain letters, spaces, hyphens, or apostrophes.";
  if (trimmed.split(/\s+/).filter(Boolean).length < 2) return "Please enter your full name (first and last).";
  return null;
}

/** US/international passport number — alphanumeric, 6–9 characters */
export function validatePassportNumber(value: string): string | null {
  const trimmed = value.trim().toUpperCase();
  if (!trimmed) return "Passport number is required.";
  if (!/^[A-Z0-9]{6,9}$/.test(trimmed)) return "Passport number must be 6–9 alphanumeric characters (e.g. A12345678).";
  return null;
}

/**
 * Passport expiry — must be a valid date AND at least 6 months from today
 * (Saudi Umrah visa requirement).
 */
export function validatePassportExpiry(value: string): string | null {
  if (!value) return "Passport expiry date is required.";
  const date = new Date(value);
  if (isNaN(date.getTime())) return "Please enter a valid date.";
  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
  if (date < sixMonthsFromNow) {
    return "Passport must be valid for at least 6 months beyond your travel date (Saudi requirement).";
  }
  return null;
}

/** Standard email format */
export function validateEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Email address is required.";
  // RFC-simplified but covers all real-world emails
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) return "Please enter a valid email address.";
  return null;
}

/** US phone — optional field; if provided must be a recognisable US number */
export function validatePhone(value: string): string | null {
  if (!value || !value.trim()) return null; // optional
  const digits = value.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 11) return "Please enter a valid US phone number (10 digits).";
  return null;
}

/** Credit card number — 16 digits (Visa/MC/Amex accepts 15) */
export function validateCardNumber(value: string): string | null {
  const digits = value.replace(/\s/g, "");
  if (!digits) return "Card number is required.";
  if (!/^\d{15,16}$/.test(digits)) return "Please enter a valid 16-digit card number.";
  return null;
}

/** Card expiry MM/YY — must be a future month */
export function validateCardExpiry(value: string): string | null {
  if (!value) return "Expiry date is required.";
  const match = value.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return "Use MM/YY format (e.g. 09/28).";
  const month = parseInt(match[1], 10);
  const year = parseInt("20" + match[2], 10);
  if (month < 1 || month > 12) return "Month must be between 01 and 12.";
  const now = new Date();
  const expiry = new Date(year, month - 1);
  if (expiry <= now) return "This card has expired.";
  return null;
}

/** CVV — 3 digits (Visa/MC) or 4 (Amex) */
export function validateCVV(value: string): string | null {
  if (!value) return "CVV is required.";
  if (!/^\d{3,4}$/.test(value.trim())) return "CVV must be 3 or 4 digits.";
  return null;
}

/** Cardholder name — same rules as full name */
export function validateCardholderName(value: string): string | null {
  return validateFullName(value);
}

/** Generic minimum-length text (for message fields etc.) */
export function validateMinLength(value: string, min: number, label = "This field"): string | null {
  if (!value.trim()) return `${label} is required.`;
  if (value.trim().length < min) return `${label} must be at least ${min} characters.`;
  return null;
}

/** Format a raw digit string as a card number (XXXX XXXX XXXX XXXX) */
export function formatCardNumber(raw: string): string {
  return raw
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})/g, "$1 ")
    .trim();
}

/** Format card expiry input to MM/YY as the user types */
export function formatCardExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return digits.slice(0, 2) + "/" + digits.slice(2);
}
