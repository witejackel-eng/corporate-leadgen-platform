"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/shared/magnetic-button";
import { Reveal } from "@/components/shared/reveal";
import { AuroraBackground } from "@/components/shared/aurora-background";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-28">
      <AuroraBackground className="opacity-70" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 text-center">
        <Reveal direction="scale">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Ready to prove what your marketing is actually worth?
          </h2>
        </Reveal>
        <Reveal direction="up" delay={0.1}>
          <p className="max-w-xl text-lg text-ink-soft">
            Join 2,400+ enterprise marketing teams running their pipeline on Meridian. Your 21-day guided pilot starts with a
            30-minute call.
          </p>
        </Reveal>
        <Reveal direction="up" delay={0.2}>
          <Magnetic>
            <Button asChild size="lg" variant="accent" data-cursor-hover>
              <Link href="/contact">
                Book a demo <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
