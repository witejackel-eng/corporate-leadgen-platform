import { prisma } from "@/lib/prisma";
import { NAV_LINKS } from "@/lib/constants";

export interface NavLink {
  id?: string;
  label: string;
  href: string;
}

export async function getHeaderNavLinks(): Promise<NavLink[]> {
  try {
    const rows = await prisma.navigationItem.findMany({
      where: { location: "HEADER" },
      orderBy: { order: "asc" },
    });
    // An empty result is a valid, intentional admin choice (they deleted every
    // link) and must NOT be treated the same as a database outage — only a
    // thrown error falls back to the curated defaults below.
    return rows.map((r) => ({ id: r.id, label: r.label, href: r.href }));
  } catch (error) {
    console.error("getHeaderNavLinks: falling back to defaults —", error);
    return [...NAV_LINKS];
  }
}
