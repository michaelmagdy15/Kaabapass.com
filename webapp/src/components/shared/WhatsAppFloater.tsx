"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const CONCIERGE_NAME = "Aisha Malik";
const CONCIERGE_ROLE = "Your trip concierge";
const CONCIERGE_INITIALS = "AM";

const CANNED_REPLIES = [
  "What is the status of my Umrah visa?",
  "When do I receive my flight details?",
  "Can I modify my hotel?",
  "I need help with mahram requirements.",
];

export function WhatsAppFloater() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/18005550142?text=${encoded}`, "_blank");
    setMessage("");
  };

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-20 right-4 w-[320px] bg-surface rounded-2xl shadow-2xl border border-border z-40 overflow-hidden"
          role="dialog"
          aria-label="Chat with concierge"
        >
          {/* Header */}
          <div className="bg-[#25D366] px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="font-inter font-bold text-white text-xs">{CONCIERGE_INITIALS}</span>
            </div>
            <div className="flex-1">
              <p className="font-inter font-semibold text-white text-sm">{CONCIERGE_NAME}</p>
              <p className="font-inter text-white/75 text-xs">{CONCIERGE_ROLE}</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* Greeting */}
          <div className="px-4 pt-4 pb-3 bg-neutral">
            <div className="bg-surface border border-border rounded-xl rounded-tl-sm p-3 max-w-[80%]">
              <p className="font-inter text-body-sm text-on-surface">
                As-salamu alaykum! I am Aisha, your dedicated trip concierge. How can I help you today?
              </p>
            </div>
          </div>

          {/* Quick replies */}
          <div className="px-4 pb-3 bg-neutral flex flex-wrap gap-2">
            {CANNED_REPLIES.map((r) => (
              <button
                key={r}
                onClick={() => setMessage(r)}
                className="font-inter text-xs text-primary border border-primary/40 rounded-full px-3 py-1 hover:bg-primary hover:text-on-primary transition-all"
              >
                {r}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-border flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 h-9 px-3 border border-border rounded-full font-inter text-body-sm text-on-surface bg-neutral placeholder-muted focus:outline-none focus:border-[#25D366] transition-colors text-xs"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:bg-[#1ebe5d] transition-colors"
              aria-label="Send via WhatsApp"
            >
              <Send size={14} />
            </button>
          </div>
          <p className="text-center font-inter text-[10px] text-muted pb-2">Opens WhatsApp · Replies within minutes</p>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-4 w-14 h-14 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center z-40 hover:scale-105 active:scale-95 transition-transform"
        aria-label="Open WhatsApp chat"
      >
        {open ? <X size={22} className="text-white" /> : <MessageCircle size={24} className="text-white" fill="white" />}
      </button>
    </>
  );
}
