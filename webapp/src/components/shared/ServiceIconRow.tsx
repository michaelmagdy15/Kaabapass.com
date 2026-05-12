import { cn } from "@/lib/utils";
import { Plane, Building2, Compass, Bus, Car, FileCheck } from "lucide-react";
import type { ServiceKey } from "@/types";

const SERVICES: { key: ServiceKey; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { key: "flights", label: "Flights", icon: Plane },
  { key: "hotels", label: "Hotels", icon: Building2 },
  { key: "guides", label: "Tour Guides", icon: Compass },
  { key: "shuttle", label: "Shuttle", icon: Bus },
  { key: "car-rental", label: "Car Rental", icon: Car },
  { key: "visa", label: "Visa Assistance", icon: FileCheck },
];

interface ServiceIconRowProps {
  included: ServiceKey[];
  size?: "sm" | "md";
  className?: string;
}

export function ServiceIconRow({ included, size = "md", className }: ServiceIconRowProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)} role="list" aria-label="Included services">
      {SERVICES.map(({ key, label, icon: Icon }) => {
        const isIncluded = included.includes(key);
        return (
          <div
            key={key}
            role="listitem"
            title={isIncluded ? label : `${label} — Available as add-on`}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-inter transition-all",
              size === "sm" ? "text-[11px]" : "text-label-caps text-xs",
              isIncluded
                ? "bg-neutral border-border text-secondary"
                : "bg-surface border-border/50 text-muted opacity-50"
            )}
          >
            <Icon size={size === "sm" ? 11 : 13} className={isIncluded ? "text-primary" : "text-muted"} />
            <span className="tracking-wide font-medium uppercase">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
