import { Badge } from "@/components/ui/badge";

const STATUS_VARIANT: Record<string, "default" | "accent" | "indigo" | "emerald" | "outline"> = {
  NEW: "outline",
  CONTACTED: "default",
  QUALIFIED: "indigo",
  PROPOSAL: "accent",
  WON: "emerald",
  LOST: "outline",
};

export function LeadStatusBadge({ status }: { status: string }) {
  return <Badge variant={STATUS_VARIANT[status] ?? "default"}>{status.replace("_", " ")}</Badge>;
}
