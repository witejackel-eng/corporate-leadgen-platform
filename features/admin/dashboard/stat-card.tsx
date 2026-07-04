import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  icon: LucideIcon;
}

export function StatCard({ label, value, delta, deltaPositive = true, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between gap-4 pt-6">
        <div>
          <p className="text-sm text-ink-faint">{label}</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink">{value}</p>
          {delta && (
            <p className={cn("mt-1 text-xs font-medium", deltaPositive ? "text-accent-emerald" : "text-red-500")}>{delta}</p>
          )}
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue">
          <Icon className="h-5 w-5" />
        </span>
      </CardContent>
    </Card>
  );
}
