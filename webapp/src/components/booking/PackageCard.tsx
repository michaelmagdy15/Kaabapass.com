"use client";

import { cn } from "@/lib/utils";
import { Check, Info, Sliders } from "lucide-react";
import type { Package } from "@/types";
import { ServiceIconRow } from "@/components/shared/ServiceIconRow";
import { SmartBuilderModal } from "@/components/booking/SmartBuilderModal";
import { useState } from "react";

interface PackageCardProps {
  pkg: Package;
  isSelected?: boolean;
  onSelect?: (pkg: Package) => void;
  showCTA?: boolean;
  className?: string;
  travelerCount?: number;
}

export function PackageCard({
  pkg,
  isSelected,
  onSelect,
  showCTA = true,
  className,
  travelerCount = 2,
}: PackageCardProps) {
  const [builderOpen, setBuilderOpen] = useState(false);

  return (
    <>
      <article
        className={cn(
          "bg-surface rounded-xl border transition-all overflow-hidden flex flex-col",
          isSelected
            ? "border-primary ring-2 ring-primary/20"
            : "border-border hover:border-primary/50",
          className
        )}
        aria-label={`${pkg.name} package`}
      >
        {/* Badge row */}
        <div className="flex items-center justify-between px-5 pt-4 pb-0 min-h-[32px]">
          {pkg.badge ? (
            <span className="font-inter text-[11px] font-semibold uppercase tracking-widest text-gold border border-gold/40 bg-gold/5 px-2.5 py-1 rounded-full">
              {pkg.badge}
            </span>
          ) : <span />}
          {isSelected && (
            <span className="font-inter text-[11px] font-semibold text-primary flex items-center gap-1">
              <Check size={12} /> Selected
            </span>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">
          {/* Tier name */}
          <p className="font-inter text-label-caps uppercase tracking-widest text-muted font-medium mb-1">
            {pkg.tier}
          </p>
          <h2 className="font-fraunces text-h2 text-on-surface leading-tight">{pkg.name}</h2>
          <p className="font-inter text-body-md text-secondary mt-1.5 leading-relaxed">{pkg.shortDescription}</p>

          {/* Price */}
          <div className="mt-4 flex items-end gap-1.5">
            <span className="font-fraunces text-[36px] leading-none text-on-surface font-medium">
              ${pkg.pricePerPerson.toLocaleString()}
            </span>
            <span className="font-inter text-body-sm text-muted pb-1">per person</span>
          </div>
          <p className="font-inter text-body-sm text-muted mt-0.5">
            Total for {travelerCount}: <span className="font-medium text-on-surface">${(pkg.pricePerPerson * travelerCount).toLocaleString()}</span>
            {" "}&mdash; all-inclusive · taxes included
          </p>

          {/* Services */}
          <ServiceIconRow included={pkg.services.included} size="sm" className="mt-4" />

          {/* Key inclusions */}
          <ul className="mt-4 space-y-1.5 flex-1">
            {pkg.highlights.slice(0, 4).map((h) => (
              <li key={h} className="flex items-start gap-2 font-inter text-body-sm text-secondary">
                <Check size={13} className="text-primary mt-0.5 flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>

          {/* What's not included */}
          {pkg.services.addOns.length > 0 && (
            <div className="mt-3 flex items-center gap-1.5">
              <Info size={12} className="text-muted flex-shrink-0" />
              <p className="font-inter text-body-sm text-muted">
                <span className="font-medium">Add-ons available:</span>{" "}
                {pkg.services.addOns.map((a) => a.label).join(", ")}
              </p>
            </div>
          )}

          {/* CTAs */}
          {showCTA && onSelect && (
            <div className="mt-5 space-y-2">
              <button
                onClick={() => onSelect(pkg)}
                className={cn(
                  "w-full h-11 rounded-md font-inter font-medium text-label transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  isSelected
                    ? "bg-primary text-on-primary"
                    : "border border-primary text-primary hover:bg-primary hover:text-on-primary"
                )}
                aria-pressed={isSelected}
              >
                {isSelected ? "Selected — continue" : "Select this package"}
              </button>
              <button
                onClick={() => setBuilderOpen(true)}
                className="w-full h-9 rounded-md font-inter text-label text-muted border border-border hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-1.5"
              >
                <Sliders size={13} /> Customize
              </button>
            </div>
          )}
        </div>
      </article>

      {builderOpen && (
        <SmartBuilderModal
          basePackage={pkg}
          onClose={() => setBuilderOpen(false)}
        />
      )}
    </>
  );
}
