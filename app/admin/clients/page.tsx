import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { ClientManager } from "@/features/admin/clients/client-manager";

export const metadata: Metadata = { title: "Clients" };

export default async function AdminClientsPage() {
  const clients = await prisma.client.findMany({ orderBy: { order: "asc" } }).catch(() => []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Clients</h1>
        <p className="text-sm text-ink-faint">Logos shown in the homepage trusted-by marquee.</p>
      </div>
      <ClientManager clients={clients} />
    </div>
  );
}
