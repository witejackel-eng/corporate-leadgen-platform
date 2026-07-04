import { prisma } from "@/lib/prisma";

const FALLBACK_SUMMARY = { totalLeads: 1284, newThisMonth: 96, qualifiedRate: 34, wonThisMonth: 18 };

const FALLBACK_TRAFFIC = [
  { date: "Week 1", visitors: 4200, signups: 62 },
  { date: "Week 2", visitors: 4650, signups: 71 },
  { date: "Week 3", visitors: 5100, signups: 84 },
  { date: "Week 4", visitors: 4980, signups: 79 },
  { date: "Week 5", visitors: 5600, signups: 95 },
  { date: "Week 6", visitors: 6120, signups: 108 },
  { date: "Week 7", visitors: 6480, signups: 121 },
  { date: "Week 8", visitors: 7020, signups: 134 },
];

const FALLBACK_SOURCES = [
  { source: "Contact form", count: 412 },
  { source: "Demo request", count: 356 },
  { source: "Referral", count: 198 },
  { source: "LinkedIn", count: 164 },
  { source: "Event", count: 89 },
  { source: "Other", count: 65 },
];

const FALLBACK_STATUS = [
  { status: "New", count: 210 },
  { status: "Contacted", count: 340 },
  { status: "Qualified", count: 285 },
  { status: "Proposal", count: 190 },
  { status: "Won", count: 164 },
  { status: "Lost", count: 95 },
];

export async function getDashboardSummary() {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [totalLeads, newThisMonth, qualifiedOrBetter, wonThisMonth] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.lead.count({ where: { status: { in: ["QUALIFIED", "PROPOSAL", "WON"] } } }),
      prisma.lead.count({ where: { status: "WON", updatedAt: { gte: startOfMonth } } }),
    ]);

    if (totalLeads === 0) return FALLBACK_SUMMARY;

    return {
      totalLeads,
      newThisMonth,
      qualifiedRate: Math.round((qualifiedOrBetter / totalLeads) * 100),
      wonThisMonth,
    };
  } catch {
    return FALLBACK_SUMMARY;
  }
}

export async function getLeadsBySource() {
  try {
    const grouped = await prisma.lead.groupBy({ by: ["source"], _count: { source: true } });
    if (!grouped.length) return FALLBACK_SOURCES;
    return grouped.map((g) => ({ source: g.source.replace("_", " "), count: g._count.source }));
  } catch {
    return FALLBACK_SOURCES;
  }
}

export async function getLeadsByStatus() {
  try {
    const grouped = await prisma.lead.groupBy({ by: ["status"], _count: { status: true } });
    if (!grouped.length) return FALLBACK_STATUS;
    return grouped.map((g) => ({ status: g.status, count: g._count.status }));
  } catch {
    return FALLBACK_STATUS;
  }
}

// Illustrative traffic trend — wire up to your analytics provider (GA4, Plausible, etc.) in production.
export async function getTrafficTrend() {
  return FALLBACK_TRAFFIC;
}

export async function getRecentLeads(limit = 6) {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: { assignedTo: true },
    });
    if (leads.length) return leads;
  } catch {
    /* noop */
  }
  return [];
}
