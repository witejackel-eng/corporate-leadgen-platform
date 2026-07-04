import { cn } from "@/lib/utils";

export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden bg-noise", className)} aria-hidden>
      <div className="aurora-layer opacity-60" />
      <div className="absolute inset-0 mesh-gradient" />
    </div>
  );
}
