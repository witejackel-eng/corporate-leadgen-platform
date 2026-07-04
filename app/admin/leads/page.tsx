import type { Metadata } from "next";

import { getLeads } from "@/server/queries/leads";
import { LeadTable } from "@/features/crm/lead-table";

export const metadata: Metadata = { title: "Leads" };

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Leads</h1>
        <p className="text-sm text-ink-faint">Every inbound lead from your contact form, demo requests, and campaigns.</p>
      </div>
      <LeadTable leads={leads} />
    </div>
  );
}
