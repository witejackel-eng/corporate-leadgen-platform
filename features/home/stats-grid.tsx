"use client";

import { motion } from "framer-motion";

import { AnimatedCounter } from "@/components/shared/animated-counter";
import { RevealGroup, revealItemVariants } from "@/components/shared/reveal";
import { getIcon } from "@/lib/icon-map";

interface StatItem {
  id?: string;
  label: string;
  value: string;
  suffix: string;
  icon: string;
}

export function StatsGrid({ stats }: { stats: StatItem[] }) {
  return (
    <RevealGroup className="grid grid-cols-2 gap-10 lg:grid-cols-4" stagger={0.12}>
      {stats.map((stat) => {
        const Icon = getIcon(stat.icon);
        const numericValue = parseFloat(stat.value);
        return (
          <motion.div
            key={stat.id ?? stat.label}
            variants={revealItemVariants}
            className="flex flex-col items-center gap-3 text-center"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue">
              <Icon className="h-5 w-5" />
            </span>
            <span className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              <AnimatedCounter value={numericValue} suffix={stat.suffix} decimals={numericValue % 1 !== 0 ? 2 : 0} />
            </span>
            <span className="max-w-[16ch] text-sm text-ink-faint">{stat.label}</span>
          </motion.div>
        );
      })}
    </RevealGroup>
  );
}
