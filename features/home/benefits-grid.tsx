"use client";

import { Reveal } from "@/components/shared/reveal";
import { getIcon } from "@/lib/icon-map";

interface BenefitItem {
  id?: string;
  title: string;
  description: string;
  icon: string;
}

export function BenefitsGrid({ benefits }: { benefits: BenefitItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-border bg-border md:grid-cols-2">
      {benefits.map((benefit, i) => {
        const Icon = getIcon(benefit.icon);
        return (
          <Reveal key={benefit.id ?? benefit.title} delay={i * 0.08} direction="up" className="bg-surface p-8 sm:p-10">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-emerald/10 text-accent-emerald">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink">{benefit.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-faint">{benefit.description}</p>
          </Reveal>
        );
      })}
    </div>
  );
}
