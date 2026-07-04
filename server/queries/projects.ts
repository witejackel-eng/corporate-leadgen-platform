import { prisma } from "@/lib/prisma";
import { DEFAULT_PROJECTS } from "@/lib/data/projects";

export async function getProjects() {
  try {
    const rows = await prisma.project.findMany({ orderBy: { order: "asc" } });
    if (rows.length) return rows;
  } catch {
    /* DB unavailable — serve curated defaults */
  }
  return DEFAULT_PROJECTS;
}

export async function getFeaturedProjects() {
  const projects = await getProjects();
  return projects.filter((p) => p.featured);
}
