import Papa from "papaparse";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "EDITOR")) {
    return new Response("Unauthorized", { status: 401 });
  }

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: { assignedTo: true },
  });

  const rows = leads.map((lead) => ({
    Name: lead.name,
    Email: lead.email,
    Company: lead.company ?? "",
    "Job Title": lead.jobTitle ?? "",
    Phone: lead.phone ?? "",
    Source: lead.source,
    Status: lead.status,
    "Assigned To": lead.assignedTo?.name ?? lead.assignedTo?.email ?? "",
    Value: lead.value ? lead.value.toString() : "",
    "Created At": lead.createdAt.toISOString(),
  }));

  const csv = Papa.unparse(rows);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="meridian-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
