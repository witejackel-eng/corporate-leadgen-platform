import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getLeadById, getStaffUsers } from "@/server/queries/leads";
import { LeadDetailPanel } from "@/features/crm/lead-detail-panel";

export const metadata: Metadata = { title: "Lead Detail" };

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [lead, staff] = await Promise.all([getLeadById(id), getStaffUsers()]);

  if (!lead) notFound();

  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/leads" className="inline-flex w-fit items-center gap-2 text-sm font-medium text-ink-faint hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> All leads
      </Link>
      <LeadDetailPanel lead={lead} staff={staff} />
    </div>
  );
}
