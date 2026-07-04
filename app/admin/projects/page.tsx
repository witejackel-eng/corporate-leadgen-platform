import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { ProjectManager } from "@/features/admin/projects/project-manager";

export const metadata: Metadata = { title: "Projects" };

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } }).catch(() => []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Projects</h1>
        <p className="text-sm text-ink-faint">Manage the engineering showcase cards on the homepage.</p>
      </div>
      <ProjectManager projects={projects} />
    </div>
  );
}
