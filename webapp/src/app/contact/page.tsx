"use client";

import { useState } from "react";
import { MessageCircle, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";

const HOURS = [
  { days: "Monday – Friday", hours: "9:00 AM – 8:00 PM EST" },
  { days: "Saturday", hours: "10:00 AM – 6:00 PM EST" },
  { days: "Sunday", hours: "Closed (WhatsApp monitored)" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", subject: "general" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-neutral min-h-screen">
      {/* Hero */}
      <div className="bg-primary py-12 px-4">
        <div className="max-w-content mx-auto">
          <p className="font-inter text-label-caps uppercase tracking-widest text-white/60 mb-3">Contact Us</p>
          <h1 className="font-fraunces text-h1 text-white mb-3">We are here for you</h1>
          <p className="font-inter text-body-md text-white/75 max-w-[480px]">
            Our team of Umrah travel specialists is ready to answer your questions and help plan your journey.
          </p>
        </div>
      </div>

      <div className="max-w-content mx-auto px-4 md:px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-[900px]">
        {/* Left: form */}
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
            <form onSubmit={handleSubmit} className="space-y-4 bg-surface border border-border rounded-xl p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-inter text-label text-secondary block mb-1" htmlFor="contact-name">Full name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Ahmed Hassan"
                    className="w-full h-11 px-3 border border-border rounded-md font-inter text-body-sm text-on-surface bg-surface placeholder-muted focus:outline-none focus:border-primary transition-colors"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-inter text-label text-secondary block mb-1" htmlFor="contact-email">Email address</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="ahmed@example.com"
                    className="w-full h-11 px-3 border border-border rounded-md font-inter text-body-sm text-on-surface bg-surface placeholder-muted focus:outline-none focus:border-primary transition-colors"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="font-inter text-label text-secondary block mb-1" htmlFor="contact-phone">Phone (optional)</label>
                <input
                  id="contact-phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-11 px-3 border border-border rounded-md font-inter text-body-sm text-on-surface bg-surface placeholder-muted focus:outline-none focus:border-primary transition-colors"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="font-inter text-label text-secondary block mb-1" htmlFor="contact-subject">Subject</label>
                <select
                  id="contact-subject"
                  className="w-full h-11 px-3 border border-border rounded-md font-inter text-body-sm text-on-surface bg-surface focus:outline-none focus:border-primary transition-colors"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                >
                  <option value="general">General inquiry</option>
                  <option value="booking">Booking support</option>
                  <option value="visa">Visa assistance</option>
                  <option value="group">Group / family package</option>
                  <option value="cancel">Cancellation or refund</option>
                </select>
              </div>
              <div>
                <label className="font-inter text-label text-secondary block mb-1" htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="Describe your question or travel plans..."
                  className="w-full px-3 py-2 border border-border rounded-md font-inter text-body-sm text-on-surface bg-surface placeholder-muted focus:outline-none focus:border-primary transition-colors resize-none"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="w-full h-12 bg-primary text-on-primary font-inter font-semibold text-label rounded-md hover:bg-primary-container transition-colors"
              >
                Send message
              </button>
            </form>
          )}
        </div>

        {/* Right: channels + hours */}
        <div className="space-y-6">
          <h2 className="font-fraunces text-h2 text-on-surface">Other ways to reach us</h2>

          {[
            { icon: <MessageCircle size={20} className="text-[#25D366]" />, label: "WhatsApp", value: "+1 (800) 555-0142", href: "https://wa.me/18005550142", sub: "Fastest — typically replies in minutes" },
            { icon: <Phone size={20} className="text-primary" />, label: "US Phone", value: "+1 (800) 555-0142", href: "tel:+18005550142", sub: "Toll-free within the United States" },
            { icon: <Phone size={20} className="text-primary" />, label: "Saudi Office", value: "+966 11 555 0100", href: "tel:+966115550100", sub: "Jeddah office, AST hours" },
            { icon: <Mail size={20} className="text-primary" />, label: "Email", value: "support@kaabapass.com", href: "mailto:support@kaabapass.com", sub: "Response within 4 business hours" },
          ].map((c) => (
            <a key={c.label} href={c.href} className="flex gap-4 items-start group">
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-primary transition-colors">
                {c.icon}
              </div>
              <div>
                <p className="font-inter font-semibold text-body-md text-on-surface group-hover:text-primary transition-colors">{c.label}</p>
                <p className="font-inter text-body-sm text-secondary">{c.value}</p>
                <p className="font-inter text-body-sm text-muted">{c.sub}</p>
              </div>
            </a>
          ))}

          {/* Hours */}
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
