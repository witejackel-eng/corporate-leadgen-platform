import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { getCaseStudies, getCaseStudyBySlug } from "@/server/queries/case-studies";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { CaseStudyNav } from "@/features/case-studies/case-study-nav";

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) return {};

  return {
    title: caseStudy.title,
    description: caseStudy.summary,
    alternates: { canonical: `/case-studies/${caseStudy.slug}` },
    openGraph: { title: caseStudy.title, description: caseStudy.summary, images: [caseStudy.heroImage] },
  };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  const navItems = caseStudy.sections.map((s) => ({ key: s.key, title: s.title }));

  return (
    <article className="relative pt-32 pb-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal direction="up">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm font-medium text-ink-faint hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> All case studies
          </Link>
        </Reveal>

        <Reveal direction="up" delay={0.1} className="mt-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="indigo">{caseStudy.category}</Badge>
            <span className="text-sm text-ink-faint">{caseStudy.industry}</span>
          </div>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{caseStudy.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">{caseStudy.summary}</p>
        </Reveal>

        <Reveal direction="scale" delay={0.2} className="mt-10 overflow-hidden rounded-card border border-border">
          <div className="relative aspect-[16/8] w-full">
            <Image src={caseStudy.heroImage} alt={caseStudy.title} fill className="object-cover" priority />
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.25}>
          <dl className="mt-10 grid grid-cols-2 gap-6 rounded-card border border-border bg-surface p-6 sm:grid-cols-4">
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink-faint">Client</dt>
              <dd className="mt-1 font-medium text-ink">{caseStudy.client}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink-faint">Duration</dt>
              <dd className="mt-1 font-medium text-ink">{caseStudy.duration}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink-faint">Team</dt>
              <dd className="mt-1 font-medium text-ink">{caseStudy.team}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink-faint">Role</dt>
              <dd className="mt-1 font-medium text-ink">{caseStudy.role}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {caseStudy.metrics.map((metric) => (
              <div key={metric.label} className="rounded-card border border-border bg-canvas-soft p-6 text-center">
                <p className="font-display text-3xl font-semibold text-accent-blue">{metric.value}</p>
                <p className="mt-1 text-xs text-ink-faint">{metric.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 flex flex-wrap gap-2">
          {caseStudy.technologies.map((tech) => (
            <span key={tech} className="rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-ink-soft">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-12 lg:flex-row">
          <CaseStudyNav items={navItems} />

          <div className="flex-1 divide-y divide-border">
            {caseStudy.sections.map((section) => (
              <section key={section.key} id={section.key} className="scroll-mt-28 py-10">
                <Reveal direction="up" amount={0.2}>
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">{section.title}</h2>
                  <p className="mt-4 max-w-3xl text-[1.05rem] leading-relaxed text-ink-soft">{section.body}</p>
                </Reveal>
              </section>
            ))}
          </div>
        </div>

        <Reveal direction="up" className="mt-16 flex justify-center border-t border-border pt-12">
          <Button asChild size="lg" variant="accent">
            <Link href="/contact">
              See how Meridian could work for your team <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </article>
  );
}
