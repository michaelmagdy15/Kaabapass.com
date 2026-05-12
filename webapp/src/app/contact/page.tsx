"use client";

import { useState } from "react";
import { MessageCircle, Phone, Mail, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { validateFullName, validateEmail, validatePhone, validateMinLength } from "@/lib/validation";

const HOURS = [
  { days: "Monday – Friday", hours: "9:00 AM – 8:00 PM EST" },
  { days: "Saturday", hours: "10:00 AM – 6:00 PM EST" },
  { days: "Sunday", hours: "Closed (WhatsApp monitored)" },
];

function InlineError({ msg }: { msg?: string | null }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1.5 font-inter text-body-sm text-red-600 mt-1" role="alert">
      <AlertCircle size={12} className="flex-shrink-0" />{msg}
    </p>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", subject: "general" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [attempted, setAttempted] = useState(false);

  const errors = {
    name: validateFullName(form.name),
    email: validateEmail(form.email),
    phone: validatePhone(form.phone),
    message: validateMinLength(form.message, 10, "Message"),
  };
  const isValid = !errors.name && !errors.email && !errors.phone && !errors.message;

  const touch = (f: string) => setTouched(p => ({ ...p, [f]: true }));

  const fieldClass = (f: string) => cn(
    "w-full h-11 px-3 border rounded-md font-inter text-body-sm text-on-surface bg-surface placeholder-muted focus:outline-none focus:border-primary transition-colors",
    (touched[f] || attempted) && errors[f as keyof typeof errors]
      ? "border-red-400 bg-red-50"
      : "border-border"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    if (!isValid) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-neutral min-h-screen">
      <div className="bg-primary py-12 px-4">
        <div className="max-w-content mx-auto">
          <p className="font-inter text-label-caps uppercase tracking-widest text-white/60 mb-3">Contact Us</p>
          <h1 className="font-fraunces text-h1 text-white mb-3">We are here for you</h1>
          <p className="font-inter text-body-md text-white/75 max-w-[480px]">
            Our team of Umrah travel specialists is ready to answer your questions and help plan your journey.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 md:px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="font-fraunces text-h2 text-on-surface mb-5">Send us a message</h2>
          {submitted ? (
            <div className="bg-surface border border-border rounded-xl p-8 text-center">
              <CheckCircle2 size={40} className="text-primary mx-auto mb-4" />
              <h3 className="font-fraunces text-h3 text-on-surface mb-2">Message received</h3>
              <p className="font-inter text-body-md text-secondary">
                We will respond to <strong>{form.email}</strong> within 4 hours during business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4 bg-surface border border-border rounded-xl p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-inter text-label text-secondary block mb-1" htmlFor="contact-name">
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input id="contact-name" type="text" placeholder="Ahmed Hassan"
                    className={fieldClass("name")} value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} onBlur={() => touch("name")} />
                  <InlineError msg={(touched.name || attempted) ? errors.name : null} />
                </div>
                <div>
                  <label className="font-inter text-label text-secondary block mb-1" htmlFor="contact-email">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input id="contact-email" type="email" placeholder="ahmed@example.com"
                    className={fieldClass("email")} value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })} onBlur={() => touch("email")} />
                  <InlineError msg={(touched.email || attempted) ? errors.email : null} />
                </div>
              </div>
              <div>
                <label className="font-inter text-label text-secondary block mb-1" htmlFor="contact-phone">Phone (optional)</label>
                <input id="contact-phone" type="tel" placeholder="+1 (555) 000-0000"
                  className={fieldClass("phone")} value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })} onBlur={() => touch("phone")} />
                <InlineError msg={(touched.phone || attempted) ? errors.phone : null} />
              </div>
              <div>
                <label className="font-inter text-label text-secondary block mb-1" htmlFor="contact-subject">Subject</label>
                <select id="contact-subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                  className="w-full h-11 px-3 border border-border rounded-md font-inter text-body-sm text-on-surface bg-surface focus:outline-none focus:border-primary transition-colors">
                  <option value="general">General inquiry</option>
                  <option value="booking">Booking support</option>
                  <option value="visa">Visa assistance</option>
                  <option value="group">Group / family package</option>
                  <option value="cancel">Cancellation or refund</option>
                </select>
              </div>
              <div>
                <label className="font-inter text-label text-secondary block mb-1" htmlFor="contact-message">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea id="contact-message" rows={5} placeholder="Describe your question or travel plans..."
                  className={cn("w-full px-3 py-2 border rounded-md font-inter text-body-sm text-on-surface bg-surface placeholder-muted focus:outline-none focus:border-primary transition-colors resize-none",
                    (touched.message || attempted) && errors.message ? "border-red-400 bg-red-50" : "border-border")}
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} onBlur={() => touch("message")} />
                <InlineError msg={(touched.message || attempted) ? errors.message : null} />
              </div>
              <button type="submit"
                className={cn("w-full h-12 font-inter font-semibold text-label rounded-md transition-colors",
                  isValid ? "bg-primary text-on-primary hover:bg-primary-container" : "bg-primary/40 text-on-primary cursor-not-allowed")}>
                Send message
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="font-fraunces text-h2 text-on-surface">Other ways to reach us</h2>
          {[
            { icon: <MessageCircle size={20} className="text-[#25D366]" />, label: "WhatsApp", value: "+1 (800) 555-0142", href: "https://wa.me/18005550142", sub: "Fastest — typically replies in minutes" },
            { icon: <Phone size={20} className="text-primary" />, label: "US Phone", value: "+1 (800) 555-0142", href: "tel:+18005550142", sub: "Toll-free within the United States" },
            { icon: <Phone size={20} className="text-primary" />, label: "Saudi Office", value: "+966 11 555 0100", href: "tel:+966115550100", sub: "Jeddah office, AST hours" },
            { icon: <Mail size={20} className="text-primary" />, label: "Email", value: "support@kaabapass.com", href: "mailto:support@kaabapass.com", sub: "Response within 4 business hours" },
          ].map((c) => (
            <a key={c.label} href={c.href} className="flex gap-4 items-start group">
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-primary transition-colors">{c.icon}</div>
              <div>
                <p className="font-inter font-semibold text-body-md text-on-surface group-hover:text-primary transition-colors">{c.label}</p>
                <p className="font-inter text-body-sm text-secondary">{c.value}</p>
                <p className="font-inter text-body-sm text-muted">{c.sub}</p>
              </div>
            </a>
          ))}
          <div className="bg-surface border border-border rounded-xl p-5 mt-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-primary" />
              <h3 className="font-inter font-semibold text-body-md text-on-surface">Business hours</h3>
            </div>
            <div className="space-y-2">
              {HOURS.map((h) => (
                <div key={h.days} className="flex justify-between font-inter text-body-sm">
                  <span className="text-secondary">{h.days}</span>
                  <span className="text-on-surface font-medium">{h.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
