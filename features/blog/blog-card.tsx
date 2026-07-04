"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/shared/reveal";
import { TiltCard } from "@/components/shared/tilt-card";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  readingTime: number;
  publishedAt: string;
  index?: number;
}

export function BlogCard({ slug, title, excerpt, coverImage, category, readingTime, publishedAt, index = 0 }: BlogCardProps) {
  return (
    <Reveal delay={index * 0.06} direction="up">
      <TiltCard className="h-full">
        <Link
          href={`/blog/${slug}`}
          data-cursor-hover
          className="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface shadow-soft transition-shadow duration-300 hover:shadow-lift"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
            <Image
              src={coverImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col gap-3 p-6">
            <div className="flex items-center justify-between">
              <Badge>{category}</Badge>
              <ArrowUpRight className="h-4 w-4 text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-blue" />
            </div>
            <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink">{title}</h3>
            <p className="line-clamp-2 text-sm leading-relaxed text-ink-faint">{excerpt}</p>
            <p className="mt-auto pt-3 text-xs text-ink-faint">
              {formatDate(publishedAt)} · {readingTime} min read
            </p>
          </div>
        </Link>
      </TiltCard>
    </Reveal>
  );
}
