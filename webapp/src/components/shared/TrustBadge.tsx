import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  variant?: "default" | "inline";
  className?: string;
}

export function TrustBadge({ variant = "default", className }: TrustBadgeProps) {
  if (variant === "inline") {
    return (
      <p className={cn("font-inter text-body-sm text-muted leading-relaxed", className)}>
        <ShieldCheck size={14} className="inline mr-1 text-primary" />
        We assist travelers through the Umrah visa application process in cooperation with{" "}
        <span className="text-primary font-medium">authorized travel and visa partners</span>.
      </p>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <div className="flex items-center gap-2 bg-neutral border border-border px-3 py-1.5 rounded-full">
        <ShieldCheck size={14} className="text-primary flex-shrink-0" />
        <span className="font-inter text-label-caps text-primary font-semibold uppercase tracking-widest text-xs">
          Licensed Umrah Travel Agency
        </span>
      </div>
      <div className="flex items-center gap-2 bg-neutral border border-border px-3 py-1.5 rounded-full">
        <span className="font-inter text-label-caps text-secondary font-medium uppercase tracking-widest text-xs">
          Authorized Visa Partners
        </span>
      </div>
      <div className="flex items-center gap-2 bg-neutral border border-border px-3 py-1.5 rounded-full">
        <span className="font-inter text-label-caps text-secondary font-medium uppercase tracking-widest text-xs">
          24/7 Concierge Support
        </span>
      </div>
    </div>
  );
}
