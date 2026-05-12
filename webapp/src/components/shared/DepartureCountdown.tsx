"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

interface DepartureCountdownProps {
  /** ISO date string of the departure date */
  departureDate: string;
  className?: string;
}

export function DepartureCountdown({ departureDate, className = "" }: DepartureCountdownProps) {
  const target = new Date(departureDate);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft(target));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departureDate]);

  if (!mounted) return null;

  const units: { value: number; label: string }[] = [
    { value: timeLeft.days, label: "days" },
    { value: timeLeft.hours, label: "hours" },
    { value: timeLeft.minutes, label: "min" },
    { value: timeLeft.seconds, label: "sec" },
  ];

  return (
    <div className={`flex items-end gap-4 ${className}`}>
      {units.map(({ value, label }) => (
        <div key={label} className="text-center">
          <span className="font-fraunces tabular-nums leading-none text-on-surface" style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)" }}>
            {String(value).padStart(2, "0")}
          </span>
          <p className="font-inter text-label-caps uppercase tracking-widest text-muted text-xs mt-1">{label}</p>
        </div>
      ))}
    </div>
  );
}
