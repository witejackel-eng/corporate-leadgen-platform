import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getBlogPosts } from "@/server/queries/blog";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/shared/reveal";
import { BlogExplorer } from "@/features/blog/blog-explorer";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thought leadership on pipeline attribution, ABM orchestration, and enterprise revenue operations from the Meridian team.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();
  const [featured, ...rest] = posts;
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <div className="relative pt-40 pb-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Blog"
          title="Insights for revenue teams"
          description="Attribution, ABM, and revenue operations — written by the team building the platform, not a content mill."
        />

        {featured && (
          <Reveal direction="scale" className="mt-16">
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid grid-cols-1 overflow-hidden rounded-card border border-border bg-surface shadow-soft transition-shadow hover:shadow-lift lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink lg:aspect-auto">
                <Image src={featured.coverImage} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
                <Badge variant="accent">Featured</Badge>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{featured.title}</h2>
                <p className="text-ink-faint">{featured.excerpt}</p>
                <p className="text-xs text-ink-faint">
                  {formatDate(featured.publishedAt)} · {featured.readingTime} min read
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-blue">
                  Read the article <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        <div className="mt-16">
          <BlogExplorer posts={rest} categories={categories} />
        </div>
      </div>
    </div>
  );
}
