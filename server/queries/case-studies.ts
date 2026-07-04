import { prisma } from "@/lib/prisma";
import { DEFAULT_CASE_STUDIES, type CaseStudyData } from "@/lib/data/case-studies";

export async function getCaseStudies(): Promise<CaseStudyData[]> {
  try {
    const rows = await prisma.caseStudy.findMany({
      orderBy: { order: "asc" },
      include: { sections: { orderBy: { order: "asc" } } },
    });
    if (rows.length) {
      return rows.map((r) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        client: r.client,
        industry: r.industry,
        category: r.category,
        summary: r.summary,
        coverImage: r.coverImage,
        heroImage: r.heroImage,
        duration: r.duration,
        team: r.team,
        role: r.role,
        technologies: r.technologies,
        metrics: r.metrics as { label: string; value: string }[],
        sections: r.sections.map((s) => ({ key: s.key, title: s.title, body: s.body })),
      }));
    }
  } catch {
    /* DB unavailable — serve curated defaults */
  }
  return DEFAULT_CASE_STUDIES;
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyData | undefined> {
  const all = await getCaseStudies();
  return all.find((cs) => cs.slug === slug);
}
