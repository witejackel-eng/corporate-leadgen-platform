import {
  BarChart3,
  Building2,
  CheckCircle2,
  Clock,
  GitBranch,
  Layers,
  Plug,
  PresentationIcon,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  TrendingUp,
  Building2,
  Clock,
  ShieldCheck,
  GitBranch,
  Layers,
  Sparkles,
  BarChart3,
  Workflow,
  Plug,
  Zap,
  Users,
  PresentationIcon,
  Rocket,
  CheckCircle2,
};

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Sparkles;
}
