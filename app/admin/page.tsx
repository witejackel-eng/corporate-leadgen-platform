import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Percent, Trophy, Users } from "lucide-react";

import { getDashboardSummary, getLeadsBySource, getLeadsByStatus, getRecentLeads, getTrafficTrend } from "@/server/queries/analytics";
import { StatCard } from "@/features/admin/dashboard/stat-card";
import { LeadSourceChart, LeadStatusChart, TrafficChart } from "@/features/admin/dashboard/charts";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  const [summary, traffic, sources, statuses, recentLeads] = await Promise.all([
    getDashboardSummary(),
    getTrafficTrend(),
    getLeadsBySource(),
    getLeadsByStatus(),
    getRecentLeads(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Dashboard</h1>
        <p className="text-sm text-ink-faint">Real-time overview of your pipeline and marketing performance.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total leads" value={summary.totalLeads.toLocaleString()} icon={Users} delta="+12% vs last month" />
        <StatCard label="New this month" value={summary.newThisMonth.toLocaleString()} icon={BarChart3} delta="+8% vs last month" />
        <StatCard label="Qualified rate" value={`${summary.qualifiedRate}%`} icon={Percent} delta="+3pts vs last month" />
        <StatCard label="Won this month" value={summary.wonThisMonth.toLocaleString()} icon={Trophy} delta="+5% vs last month" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TrafficChart data={traffic} />
        </div>
        <LeadStatusChart data={statuses} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <LeadSourceChart data={sources} />
        </div>

        <div className="rounded-card border border-border bg-surface p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-semibold text-ink">Recent leads</h3>
            <Link href="/admin/leads" className="text-xs font-medium text-accent-blue hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-4 flex flex-col divide-y divide-border">
            {recentLeads.length === 0 ? (
              <p className="py-6 text-center text-sm text-ink-faint">
                No leads yet — submissions from the contact and demo forms will appear here.
              </p>
            ) : (
              recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-ink">{lead.name}</p>
                    <p className="text-xs text-ink-faint">
                      {lead.company ?? "—"} · {formatDate(lead.createdAt)}
                    </p>
                  </div>
                  <Badge variant={lead.status === "WON" ? "emerald" : "default"}>{lead.status.replace("_", " ")}</Badge>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
