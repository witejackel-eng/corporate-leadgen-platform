"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/shared/tilt-card";
import { Reveal } from "@/components/shared/reveal";

interface CaseStudyCardProps {
  slug: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  coverImage: string;
  index?: number;
}

export function CaseStudyCard({ slug, title, client, category, summary, coverImage, index = 0 }: CaseStudyCardProps) {
  return (
    <Reveal delay={index * 0.08} direction="up">
      <TiltCard className="h-full">
        <Link
          href={`/case-studies/${slug}`}
          data-cursor-hover
          className="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface shadow-soft transition-shadow duration-300 hover:shadow-lift"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
            <Image
              src={coverImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 text-sm font-medium text-white/90">{client}</span>
          </div>
          <div className="flex flex-1 flex-col gap-3 p-6">
            <div className="flex items-center justify-between">
              <Badge variant="indigo">{category}</Badge>
              <ArrowUpRight className="h-4 w-4 text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-blue" />
            </div>
            <h3 className="font-display text-xl font-semibold tracking-tight text-ink">{title}</h3>
            <p className="text-sm leading-relaxed text-ink-faint">{summary}</p>
          </div>
        </Link>
      </TiltCard>
    </Reveal>
  );
}
