"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/shared/magnetic-button";
import { SplitText } from "@/components/shared/split-text";
import { Reveal } from "@/components/shared/reveal";
import { HeroCanvas } from "@/components/webgl/hero-canvas";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0">
        <HeroCanvas />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-canvas/10 via-canvas/40 to-canvas" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center">
        <Reveal direction="up" amount={0.8}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-emerald" />
            Now serving 2,400+ enterprise marketing teams
          </span>
        </Reveal>

        <SplitText
          text="The revenue engine for enterprise marketing teams"
          as="h1"
          className="mt-8 max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl"
        />

        <Reveal direction="up" delay={0.3}>
          <p className="mt-8 max-w-2xl text-balance text-lg text-ink-soft sm:text-xl">
            Meridian unifies pipeline attribution, account orchestration, and revenue reporting —
            so your team can prove what's working, without stitching together six different tools.
          </p>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Magnetic>
            <Button asChild size="lg" variant="accent" data-cursor-hover>
              <Link href="/contact">
                Book a demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </Magnetic>
          <Magnetic strength={0.25}>
            <Button asChild size="lg" variant="glass" data-cursor-hover>
              <Link href="/case-studies">
                <PlayCircle className="h-4 w-4" /> See it in action
              </Link>
            </Button>
          </Magnetic>
        </motion.div>

        <Reveal direction="up" delay={0.7} className="mt-16 w-full">
          <p className="text-xs uppercase tracking-[0.2em] text-ink-faint">No credit card required · 21-day guided pilot</p>
        </Reveal>
      </div>
    </section>
  );
}
