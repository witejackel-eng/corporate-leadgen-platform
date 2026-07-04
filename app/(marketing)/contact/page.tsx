import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ContactForm } from "@/features/contact/contact-form";
import { AuroraBackground } from "@/components/shared/aurora-background";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: "Talk to the Meridian team about pipeline attribution, ABM orchestration, and revenue reporting for your enterprise marketing org.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="relative pt-40 pb-28">
      <AuroraBackground className="opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Get in touch"
          title="Let's talk about your pipeline"
          description="Tell us a bit about your team. A solutions engineer will follow up within one business day with a tailored walkthrough."
        />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr]">
          <Reveal direction="left" className="flex flex-col gap-8">
            <div>
              <h3 className="font-display text-lg font-semibold text-ink">Prefer to reach out directly?</h3>
              <div className="mt-4 flex flex-col gap-4">
                <a href={`mailto:${SITE_CONFIG.name === "Meridian" ? "hello@meridian.io" : ""}`} className="flex items-center gap-3 text-sm text-ink-soft hover:text-ink">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue">
                    <Mail className="h-4 w-4" />
                  </span>
                  hello@meridian.io
                </a>
                <div className="flex items-center gap-3 text-sm text-ink-soft">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue">
                    <Phone className="h-4 w-4" />
                  </span>
                  +1 (415) 555-0138
                </div>
                <div className="flex items-center gap-3 text-sm text-ink-soft">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue">
                    <MapPin className="h-4 w-4" />
                  </span>
                  San Francisco, CA · Remote-first
                </div>
              </div>
            </div>

            <div className="rounded-card border border-border bg-surface p-6">
              <h4 className="text-sm font-semibold text-ink">What happens after you submit?</h4>
              <ol className="mt-3 flex flex-col gap-2 text-sm text-ink-faint">
                <li>1. A solutions engineer reviews your current stack.</li>
                <li>2. You get a 30-minute call scoped to your attribution setup.</li>
                <li>3. If it&apos;s a fit, your 21-day guided pilot starts within the week.</li>
              </ol>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
