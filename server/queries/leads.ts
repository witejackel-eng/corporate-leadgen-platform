import { prisma } from "@/lib/prisma";

export async function getLeads() {
  try {
    return await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      include: { assignedTo: true, tags: { include: { tag: true } } },
    });
  } catch {
    return [];
  }
}

export async function getLeadById(id: string) {
  try {
    return await prisma.lead.findUnique({
      where: { id },
      include: {
        assignedTo: true,
        tags: { include: { tag: true } },
        notes: { include: { author: true }, orderBy: { createdAt: "desc" } },
        activities: { include: { user: true }, orderBy: { createdAt: "desc" } },
      },
    });
  } catch {
    return null;
  }
}

export async function getStaffUsers() {
  try {
    return await prisma.user.findMany({ where: { role: { in: ["ADMIN", "EDITOR"] } }, orderBy: { name: "asc" } });
  } catch {
    return [];
  }
}

export async function getLeadTags() {
  try {
    return await prisma.leadTag.findMany({ orderBy: { name: "asc" } });
  } catch {
    return [];
  }
}
