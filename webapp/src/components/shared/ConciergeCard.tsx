import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConciergeProfile } from "@/types";

interface ConciergeCardProps {
  profile: ConciergeProfile;
  compact?: boolean;
  className?: string;
}

export function ConciergeCard({ profile, compact = false, className }: ConciergeCardProps) {
  return (
    <div className={cn("bg-surface border border-border rounded-xl p-5 flex items-start gap-4", className)}>
      {/* Avatar placeholder */}
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border-2 border-border">
        <span className="font-fraunces text-xl text-primary font-medium">
          {profile.name.charAt(0)}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-fraunces text-h3 text-on-surface font-medium leading-tight">{profile.name}</p>
        <p className="font-inter text-body-sm text-muted mt-0.5">{profile.title}</p>

        <div className="flex flex-wrap gap-1.5 mt-2">
          {profile.languages.map((lang) => (
            <span key={lang} className="font-inter text-[11px] font-medium bg-neutral border border-border text-secondary px-2 py-0.5 rounded-full">
              {lang}
            </span>
          ))}
        </div>

        {!compact && (
          <p className="font-inter text-body-sm text-muted mt-1.5">
            {profile.yearsExperience} years · {profile.available}
          </p>
        )}

        <a
          href={`https://wa.me/${profile.whatsappNumber.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 bg-[#25D366] text-white font-inter text-label font-medium px-3 py-1.5 rounded-md hover:bg-[#20b95a] transition-colors"
          aria-label={`Message ${profile.name} on WhatsApp`}
        >
          <MessageCircle size={14} />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
