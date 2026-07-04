import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { HomepageBlocksManager } from "@/features/admin/homepage/homepage-blocks-manager";

export const metadata: Metadata = { title: "Homepage" };

export default async function AdminHomepagePage() {
  const [stats, features, benefits] = await Promise.all([
    prisma.stat.findMany({ orderBy: { order: "asc" } }).catch(() => []),
    prisma.feature.findMany({ orderBy: { order: "asc" } }).catch(() => []),
    prisma.benefit.findMany({ orderBy: { order: "asc" } }).catch(() => []),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Homepage</h1>
        <p className="text-sm text-ink-faint">Edit the stats, feature cards, and benefit tiles shown on the homepage.</p>
      </div>
      <HomepageBlocksManager stats={stats} features={features} benefits={benefits} />
    </div>
  );
}
