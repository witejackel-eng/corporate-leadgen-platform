"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/shared/tilt-card";
import { Reveal } from "@/components/shared/reveal";

interface ProjectCardProps {
  title: string;
  category: string;
  summary: string;
  coverImage: string;
  technologies: string[];
  liveUrl: string;
  index?: number;
}

export function ProjectCard({ title, category, summary, coverImage, technologies, liveUrl, index = 0 }: ProjectCardProps) {
  return (
    <Reveal delay={index * 0.08} direction="up">
      <TiltCard className="h-full">
        <Link
          href={liveUrl}
          target="_blank"
          rel="noreferrer"
          data-cursor-hover
          className="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface shadow-soft transition-shadow duration-300 hover:shadow-lift"
        >
          <div className="relative overflow-hidden">
            <div className="flex items-center gap-1.5 border-b border-border/60 bg-ink px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-3 truncate rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] text-white/70">
                {liveUrl.replace("https://", "")}
              </span>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
              <Image
                src={coverImage}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3 p-6">
            <div className="flex items-center justify-between">
              <Badge variant="accent">{category}</Badge>
              <ArrowUpRight className="h-4 w-4 text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-blue" />
            </div>
            <h3 className="font-display text-xl font-semibold tracking-tight text-ink">{title}</h3>
            <p className="text-sm leading-relaxed text-ink-faint">{summary}</p>
            <div className="mt-auto flex flex-wrap gap-2 pt-3">
              {technologies.map((tech) => (
                <span key={tech} className="rounded-full bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-ink-soft">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </TiltCard>
    </Reveal>
  );
}
