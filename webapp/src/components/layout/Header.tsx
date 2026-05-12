"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/search", label: "Packages" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/help", label: "Help Center" },
];

function KaabaPassLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="KaabaPass home">
      <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="64" height="64" rx="12" fill="#193C31"/>
        <path d="M11,44 A22,22 0 1,0 44,11" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
        <path d="M44,11 A22,22 0 0,1 44,53" stroke="#B08848" strokeWidth="3" strokeLinecap="round"/>
        <g transform="translate(46,9) rotate(42)">
          <ellipse cx="0" cy="0" rx="1.2" ry="4" fill="#ffffff"/>
          <path d="M-1.2,0 L-5.5,2.5 L-5.5,3.5 L-1.2,1.8Z" fill="#ffffff"/>
          <path d="M1.2,0 L5.5,2.5 L5.5,3.5 L1.2,1.8Z" fill="#ffffff"/>
        </g>
        <rect x="22" y="27" width="20" height="22" fill="#111111"/>
        <polygon points="22,27 32,22 42,27" fill="#2A2A2A"/>
        <rect x="22" y="34" width="20" height="4" fill="#B08848"/>
        <rect x="28" y="39" width="8" height="10" rx="1.5" fill="#B08848" opacity="0.9"/>
      </svg>
      <span className="font-inter font-semibold text-[17px] text-primary tracking-tight">KaabaPass</span>
    </Link>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "ar">("en");
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border h-[72px] flex items-center" role="banner">
      <div className="w-full max-w-content mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <KaabaPassLogo />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-inter text-label font-medium transition-colors",
                pathname === link.href
                  ? "text-primary"
                  : "text-secondary hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="flex items-center gap-1.5 text-label text-secondary hover:text-primary font-inter font-medium px-3 py-1.5 rounded-full border border-border hover:border-primary transition-all"
            aria-label="Toggle language"
          >
            <Globe size={14} />
            {lang === "en" ? "EN" : "ع"}
          </button>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-md bg-primary text-on-primary text-label font-inter font-medium hover:bg-primary-container transition-colors"
          >
            My Trip
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-secondary hover:text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-surface border-b border-border shadow-card md:hidden z-50">
          <nav className="flex flex-col p-4 gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "py-3 px-3 rounded-md font-inter text-body-md font-medium transition-colors",
                  pathname === link.href
                    ? "text-primary bg-neutral"
                    : "text-secondary hover:text-primary hover:bg-neutral"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border mt-2 pt-3 flex items-center justify-between">
              <button
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                className="flex items-center gap-1.5 text-label text-secondary font-inter font-medium"
              >
                <Globe size={14} />
                {lang === "en" ? "EN / عر" : "عر / EN"}
              </button>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 rounded-md bg-primary text-on-primary text-label font-inter font-medium"
              >
                My Trip
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
