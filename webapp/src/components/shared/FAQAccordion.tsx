"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/types";

interface FAQAccordionProps {
  faqs: FAQ[];
  limit?: number;
  showAll?: boolean;
}

export function FAQAccordion({ faqs, limit, showAll: initialShowAll = false }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(initialShowAll);

  const displayed = limit && !showAll ? faqs.slice(0, limit) : faqs;

  return (
    <div className="w-full">
      <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
        {displayed.map((faq) => (
          <div key={faq.id}>
            <button
              className="w-full flex items-start justify-between gap-4 px-5 py-4 bg-surface hover:bg-neutral transition-colors text-left"
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              aria-expanded={openId === faq.id}
              aria-controls={`faq-answer-${faq.id}`}
              id={`faq-btn-${faq.id}`}
            >
              <span className="font-inter font-medium text-body-md text-on-surface">{faq.question}</span>
              <ChevronDown
                size={18}
                className={cn(
                  "flex-shrink-0 text-muted transition-transform duration-200 mt-0.5",
                  openId === faq.id ? "rotate-180 text-primary" : ""
                )}
              />
            </button>
            <div
              id={`faq-answer-${faq.id}`}
              role="region"
              aria-labelledby={`faq-btn-${faq.id}`}
              className={cn(
                "overflow-hidden transition-all duration-300",
                openId === faq.id ? "max-h-96" : "max-h-0"
              )}
            >
              <div className="px-5 pb-5 pt-2 bg-surface">
                <p className="font-inter text-body-md text-secondary leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {limit && !showAll && faqs.length > limit && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-4 font-inter text-label font-medium text-primary hover:text-primary-container underline underline-offset-2 transition-colors"
        >
          See all {faqs.length} questions
        </button>
      )}
    </div>
  );
}
