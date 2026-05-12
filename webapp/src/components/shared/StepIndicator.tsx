import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
  labels?: string[];
}

const DEFAULT_LABELS = ["Search", "Packages", "Travelers", "Review", "Confirm"];

export function StepIndicator({ currentStep, totalSteps = 5, labels = DEFAULT_LABELS }: StepIndicatorProps) {
  return (
    <nav aria-label="Booking progress" className="w-full">
      <ol className="flex items-center justify-center gap-0">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isComplete = step < currentStep;
          const isActive = step === currentStep;

          return (
            <li key={step} className="flex items-center">
              {/* Circle */}
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-label font-inter font-semibold text-sm transition-all",
                    isComplete
                      ? "bg-primary text-on-primary"
                      : isActive
                      ? "bg-primary text-on-primary ring-4 ring-primary/20"
                      : "bg-border text-muted"
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isComplete ? <Check size={14} strokeWidth={2.5} /> : step}
                </div>
                <span
                  className={cn(
                    "font-inter text-[11px] font-medium hidden sm:block",
                    isActive ? "text-primary" : isComplete ? "text-secondary" : "text-muted"
                  )}
                >
                  {labels[i]}
                </span>
              </div>

              {/* Connector line */}
              {step < totalSteps && (
                <div
                  className={cn(
                    "h-px w-8 sm:w-16 md:w-24 mx-1 transition-all",
                    isComplete ? "bg-primary" : "bg-border"
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
