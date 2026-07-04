import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { NavigationManager } from "@/features/admin/navigation/navigation-manager";

export const metadata: Metadata = { title: "Navigation" };

export default async function AdminNavigationPage() {
  let items: Awaited<ReturnType<typeof prisma.navigationItem.findMany>> = [];
  let loadError: string | null = null;

  try {
    items = await prisma.navigationItem.findMany({ where: { location: "HEADER" }, orderBy: { order: "asc" } });
  } catch (error) {
    console.error("AdminNavigationPage: failed to load navigation items —", error);
    loadError = "Couldn't reach the database. The list below may be out of date — try refreshing.";
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Navigation</h1>
        <p className="text-sm text-ink-faint">Manage the links shown in the site header.</p>
      </div>
      {loadError && (
        <div className="rounded-control border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{loadError}</div>
      )}
      <NavigationManager items={items} />
    </div>
  );
}
