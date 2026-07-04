import { getStats } from "@/server/queries/marketing";
import { StatsGrid } from "@/features/home/stats-grid";

export async function StatsSection() {
  const stats = await getStats();

  return (
    <section className="relative border-y border-border bg-surface py-20">
      <div className="mx-auto max-w-6xl px-6">
        <StatsGrid stats={stats} />
      </div>
    </section>
  );
}
