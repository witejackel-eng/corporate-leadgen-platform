import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getBlogPostBySlug, getBlogPosts, getRelatedPosts } from "@/server/queries/blog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Reveal } from "@/components/shared/reveal";
import { BlogCard } from "@/features/blog/blog-card";
import { formatDate } from "@/lib/utils";
import { sanitizeRichText } from "@/lib/sanitize";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, images: [post.coverImage], type: "article" },
  };
}

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author.name },
  };

  return (
    <article className="relative pt-32 pb-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-3xl px-6">
        <Reveal direction="up">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-ink-faint hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>
        </Reveal>

        <Reveal direction="up" delay={0.1} className="mt-6">
          <Badge variant="accent">{post.category}</Badge>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{post.title}</h1>
          <div className="mt-6 flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{initials(post.author.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-ink">{post.author.name}</p>
              <p className="text-xs text-ink-faint">
                {formatDate(post.publishedAt)} · {post.readingTime} min read
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal direction="scale" delay={0.2} className="mt-10 overflow-hidden rounded-card border border-border">
          <div className="relative aspect-[16/9] w-full">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.25}>
          <div className="prose prose-neutral mt-10 max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-accent-blue" dangerouslySetInnerHTML={{ __html: sanitizeRichText(post.content) }} />
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-8">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-ink-soft">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mx-auto mt-24 max-w-6xl px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">Related articles</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {related.map((r, i) => (
              <BlogCard
                key={r.slug}
                slug={r.slug}
                title={r.title}
                excerpt={r.excerpt}
                coverImage={r.coverImage}
                category={r.category}
                readingTime={r.readingTime}
                publishedAt={r.publishedAt}
                index={i}
              />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
