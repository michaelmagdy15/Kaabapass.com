"use client";

import { useState } from "react";
import { X } from "lucide-react";

const PRAYER_INFO = {
  name: "ASR",
  time: "4:42 PM",
  city: "NEW YORK",
};

export function PrayerStrip() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="bg-primary text-on-primary h-8 flex items-center justify-between px-4"
      role="banner"
      aria-label="Next prayer time"
    >
      <div className="flex-1 flex items-center justify-center gap-3">
        <span className="text-label-caps tracking-widest opacity-70 font-inter">
          NEXT PRAYER
        </span>
        <span className="text-label-caps font-semibold font-inter">
          · {PRAYER_INFO.name} · {PRAYER_INFO.time}
        </span>
        <span className="text-label-caps opacity-70 font-inter hidden sm:inline">
          · {PRAYER_INFO.city}
        </span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-on-primary opacity-60 hover:opacity-100 ml-2 flex-shrink-0"
        aria-label="Dismiss prayer strip"
      >
        <X size={14} />
      </button>
    </div>
  );
}
