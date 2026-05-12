import Link from "next/link";

const LINKS_COL1 = [
  { href: "/about", label: "About" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/premium", label: "Premium Features" },
];
const LINKS_COL2 = [
  { href: "/help", label: "Help Center" },
  { href: "/contact", label: "Contact" },
  { href: "/search", label: "Browse Packages" },
];
const LINKS_COL3 = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-on-primary mt-16" role="contentinfo">
      <div className="max-w-content mx-auto px-4 md:px-6 py-12">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="28" height="28" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect width="64" height="64" rx="12" fill="rgba(255,255,255,0.1)"/>
                <path d="M11,44 A22,22 0 1,0 44,11" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
                <path d="M44,11 A22,22 0 0,1 44,53" stroke="#B08848" strokeWidth="3" strokeLinecap="round"/>
                <rect x="22" y="27" width="20" height="22" fill="rgba(0,0,0,0.5)"/>
                <polygon points="22,27 32,22 42,27" fill="rgba(0,0,0,0.4)"/>
                <rect x="22" y="34" width="20" height="4" fill="#B08848" opacity="0.8"/>
              </svg>
              <span className="font-inter font-semibold text-[17px] text-white">KaabaPass</span>
            </div>
            <p className="font-inter text-body-sm text-white/70 leading-relaxed max-w-[200px]">
              Your journey to Makkah, simplified. One click. We handle everything.
            </p>
          </div>

          {/* Nav columns */}
          <div>
            <h3 className="font-inter text-label-caps font-semibold text-white/50 uppercase tracking-widest mb-4">Company</h3>
            <ul className="space-y-3">
              {LINKS_COL1.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-inter text-body-sm text-white/80 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-inter text-label-caps font-semibold text-white/50 uppercase tracking-widest mb-4">Support</h3>
            <ul className="space-y-3">
              {LINKS_COL2.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-inter text-body-sm text-white/80 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-inter text-label-caps font-semibold text-white/50 uppercase tracking-widest mb-4">Legal</h3>
            <ul className="space-y-3">
              {LINKS_COL3.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-inter text-body-sm text-white/80 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="font-inter text-body-sm text-white/60">
                US: +1 (800) 555-0142<br />
                SA: +966 50 555 0142
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6">
          {/* Arabic accent */}
          <p className="font-tajawal text-center text-white/30 text-sm mb-3 arabic-accent" dir="rtl">
            بسم الله الرحمن الرحيم
          </p>
          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-inter text-body-sm text-white/50">
              © 2026 KaabaPass. All rights reserved. Licensed travel agency.
            </p>
            <p className="font-inter text-body-sm text-white/40 text-center md:text-right">
              We assist travelers through the Umrah visa application process in cooperation with authorized travel and visa partners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
