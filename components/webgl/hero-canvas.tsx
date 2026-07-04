"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/webgl/hero-scene").then((m) => m.HeroScene), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-accent-blue/30 via-accent-purple/25 to-accent-cyan/25 blur-2xl" />
    </div>
  ),
});

export function HeroCanvas() {
  return <HeroScene />;
}
