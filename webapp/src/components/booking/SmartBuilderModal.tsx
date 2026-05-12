"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, Minus, ChevronRight } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import type { Package, PackageCustomizations, ServiceKey } from "@/types";
import { useBooking } from "@/hooks/useBooking";

interface SmartBuilderModalProps {
  basePackage: Package;
  onClose: () => void;
}

const ADD_ONS: { key: ServiceKey; label: string; description: string; price: number }[] = [
  { key: "car-rental", label: "Private car rental", description: "Dedicated driver for the full trip duration", price: 350 },
];

const UPGRADES = [
  { id: "flight-business", label: "Flight upgrade to Business Class", price: 1800 },
  { id: "madinah-3", label: "Madinah extension (+3 nights)", price: 480 },
  { id: "guide-private", label: "Private scholar-guide (vs. group)", price: 650 },
  { id: "meals", label: "Full board meals package", price: 220 },
  { id: "fast-track-visa", label: "Priority visa processing (24–48 hrs)", price: 150 },
];

export function SmartBuilderModal({ basePackage, onClose }: SmartBuilderModalProps) {
  const router = useRouter();
  const { selectPackage, applyCustomizations } = useBooking();

  const [selectedUpgrades, setSelectedUpgrades] = useState<Set<string>>(new Set());
  const [selectedAddOns, setSelectedAddOns] = useState<Set<ServiceKey>>(new Set());
  const [extraNights, setExtraNights] = useState(0);

  const toggleUpgrade = (id: string) => {
    setSelectedUpgrades((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAddOn = (key: ServiceKey) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const upgradeTotal = UPGRADES.filter((u) => selectedUpgrades.has(u.id)).reduce((s, u) => s + u.price, 0);
  const addOnTotal = ADD_ONS.filter((a) => selectedAddOns.has(a.key)).reduce((s, a) => s + a.price, 0);
  const nightsTotal = extraNights * 180;
  const total = basePackage.pricePerPerson + upgradeTotal + addOnTotal + nightsTotal;

  const handleApply = () => {
    selectPackage(basePackage);
    applyCustomizations({ selectedAddOns: Array.from(selectedAddOns) });
    onClose();
    router.push("/travelers");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex"
      role="dialog"
      aria-modal="true"
      aria-label="Customize your package"
    >
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close customizer"
      />

      {/* Sheet */}
      <div className="relative ml-auto w-full max-w-[480px] h-full bg-surface overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-surface border-b border-border px-5 py-4 flex items-center justify-between z-10">
          <div>
            <p className="font-inter text-label-caps text-muted uppercase tracking-widest">{basePackage.tier}</p>
            <h2 className="font-fraunces text-h3 text-on-surface">{basePackage.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-primary transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Base price */}
        <div className="bg-neutral border-b border-border px-5 py-4">
          <div className="flex items-end gap-2">
            <span className="font-fraunces text-[32px] leading-none text-on-surface">{formatCurrency(total)}</span>
            <span className="font-inter text-body-sm text-muted pb-1">per person · all-inclusive</span>
          </div>
          {(upgradeTotal + addOnTotal + nightsTotal) > 0 && (
            <p className="font-inter text-body-sm text-primary mt-1">
              +{formatCurrency(upgradeTotal + addOnTotal + nightsTotal)} in customizations
            </p>
          )}
        </div>

        {/* Upgrades */}
        <div className="px-5 py-5 border-b border-border">
          <h3 className="font-inter font-semibold text-body-md text-on-surface mb-4">Upgrades</h3>
          <div className="space-y-3">
            {UPGRADES.map((u) => (
              <label
                key={u.id}
                className={cn(
                  "flex items-center justify-between gap-4 p-4 border rounded-md cursor-pointer transition-all",
                  selectedUpgrades.has(u.id)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40"
                )}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedUpgrades.has(u.id)}
                    onChange={() => toggleUpgrade(u.id)}
                    className="accent-primary w-4 h-4"
                  />
                  <span className="font-inter text-body-sm font-medium text-on-surface">{u.label}</span>
                </div>
                <span className="font-inter text-body-sm font-semibold text-primary flex-shrink-0">
                  +{formatCurrency(u.price)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Extra nights */}
        <div className="px-5 py-5 border-b border-border">
          <h3 className="font-inter font-semibold text-body-md text-on-surface mb-4">Extra hotel nights</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setExtraNights(Math.max(0, extraNights - 1))}
              disabled={extraNights === 0}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-30"
              aria-label="Remove night"
            >
              <Minus size={16} />
            </button>
            <div className="text-center">
              <span className="font-fraunces text-h2 text-on-surface">{extraNights}</span>
              <p className="font-inter text-body-sm text-muted">
                {extraNights === 0 ? "No extras" : `+${formatCurrency(nightsTotal)}`}
              </p>
            </div>
            <button
              onClick={() => setExtraNights(Math.min(7, extraNights + 1))}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              aria-label="Add night"
            >
              <Plus size={16} />
            </button>
            <p className="font-inter text-body-sm text-muted">$180 per night</p>
          </div>
        </div>

        {/* Add-ons */}
        {ADD_ONS.length > 0 && (
          <div className="px-5 py-5 border-b border-border">
            <h3 className="font-inter font-semibold text-body-md text-on-surface mb-4">Add-ons</h3>
            <div className="space-y-3">
              {ADD_ONS.map((a) => (
                <label
                  key={a.key}
                  className={cn(
                    "flex items-center justify-between gap-4 p-4 border rounded-md cursor-pointer transition-all",
                    selectedAddOns.has(a.key)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedAddOns.has(a.key)}
                      onChange={() => toggleAddOn(a.key)}
                      className="accent-primary w-4 h-4 mt-0.5"
                    />
                    <div>
                      <p className="font-inter text-body-sm font-medium text-on-surface">{a.label}</p>
                      <p className="font-inter text-body-sm text-muted">{a.description}</p>
                    </div>
                  </div>
                  <span className="font-inter text-body-sm font-semibold text-primary flex-shrink-0">
                    +{formatCurrency(a.price)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Sticky CTA */}
        <div className="sticky bottom-0 bg-surface border-t border-border px-5 py-4 mt-auto">
          <button
            onClick={handleApply}
            className="w-full h-12 bg-primary text-on-primary font-inter font-semibold text-label rounded-md hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
          >
            Book this package — {formatCurrency(total)} <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
