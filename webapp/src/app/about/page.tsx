import type { Metadata } from "next";
import { TrustBadge } from "@/components/shared/TrustBadge";
import { ShieldCheck, Globe, Heart, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About KaabaPass — Our Mission",
  description: "KaabaPass is a US-based licensed Umrah travel agency dedicated to providing stress-free spiritual journeys for Muslims in America.",
};

const VALUES = [
  { icon: ShieldCheck, title: "Integrity", body: "We are transparent about pricing, timelines, and limitations. No hidden fees, no overpromises." },
  { icon: Heart, title: "Reverence", body: "Every decision is made with the sanctity of Umrah in mind. This is not just travel — it is worship." },
  { icon: Globe, title: "Accessibility", body: "We believe every Muslim in America should be able to perform Umrah without confusion or financial uncertainty." },
  { icon: Users, title: "Community", body: "KaabaPass is built by Muslims, for Muslims. We understand your journey because we have made it ourselves." },
];

export default function AboutPage() {
  return (
    <div className="bg-neutral min-h-screen">
      {/* Hero */}
      <section className="bg-primary py-14 px-4">
        <div className="max-w-content mx-auto max-w-[680px]">
          <p className="font-inter text-label-caps uppercase tracking-widest text-white/60 mb-4">About KaabaPass</p>
          <h1 className="font-fraunces text-h1 text-white mb-5 leading-tight">
            We exist to make Umrah accessible to every Muslim in America.
          </h1>
          <p className="font-inter text-body-lg text-white/80 leading-relaxed">
            Performing Umrah should be about spiritual intention — not spreadsheets, consulate appointments,
            or coordinating a dozen vendors. KaabaPass handles everything so your mind can be where it belongs.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-surface border-b border-border py-12 px-4">
        <div className="max-w-content mx-auto max-w-[720px]">
          <p className="font-inter text-label-caps uppercase tracking-widest text-primary font-semibold mb-4">Our Mission</p>
          <p className="font-inter text-body-lg text-secondary leading-relaxed">
            We are a US-licensed travel agency that operates in full cooperation with authorized Umrah travel
            and visa service partners. Our platform bundles flights, hotels adjacent to Masjid al-Haram, visa
            application assistance, ground transportation, and licensed guides into a single, transparent booking.
          </p>
          <p className="font-inter text-body-lg text-secondary leading-relaxed mt-4">
            We do not claim government partnerships or visa guarantees. We claim something simpler and truer:
            that your experience will be handled with care, competence, and complete honesty.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-neutral py-12 px-4 border-b border-border">
        <div className="max-w-content mx-auto">
          <p className="font-inter text-label-caps uppercase tracking-widest text-primary font-semibold mb-8 text-center">Our Values</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[860px] mx-auto">
            {VALUES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-surface border border-border rounded-xl p-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-primary" />
                </div>
                <h2 className="font-fraunces text-h3 text-on-surface mb-2">{title}</h2>
                <p className="font-inter text-body-md text-secondary leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal/trust section */}
      <section className="bg-surface py-12 px-4">
        <div className="max-w-content mx-auto max-w-[720px]">
          <p className="font-inter text-label-caps uppercase tracking-widest text-primary font-semibold mb-4">Licensing &amp; Compliance</p>
          <p className="font-inter text-body-md text-secondary leading-relaxed mb-5">
            KaabaPass operates as a registered US travel agency. We assist travelers through the Umrah visa
            application process in cooperation with authorized travel and visa partners. All packages include
            visa assistance services — we do not guarantee visa approval as decisions rest with Saudi authorities.
          </p>
          <TrustBadge />
        </div>
      </section>
    </div>
  );
}
