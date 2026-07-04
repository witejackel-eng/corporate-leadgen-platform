import { prisma } from "@/lib/prisma";
import { DEFAULT_BLOG_POSTS, type BlogPostData } from "@/lib/data/blog";

export async function getBlogPosts(): Promise<BlogPostData[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      include: { author: true, category: true, tags: { include: { tag: true } } },
    });
    if (rows.length) {
      return rows.map((r) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        excerpt: r.excerpt,
        content: r.content,
        coverImage: r.coverImage,
        category: r.category?.name ?? "General",
        tags: r.tags.map((t) => t.tag.name),
        featured: r.featured,
        readingTime: r.readingTime,
        publishedAt: (r.publishedAt ?? r.createdAt).toISOString(),
        author: { name: r.author.name ?? "Meridian Team", role: "Meridian", avatar: r.author.image ?? "/images/blog/author-evelyn.svg" },
      }));
    }
  } catch {
    /* DB unavailable — serve curated defaults */
  }
  return DEFAULT_BLOG_POSTS;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostData | undefined> {
  const all = await getBlogPosts();
  return all.find((p) => p.slug === slug);
}

export async function getFeaturedBlogPosts(): Promise<BlogPostData[]> {
  const all = await getBlogPosts();
  return all.filter((p) => p.featured);
}

export async function getRelatedPosts(current: BlogPostData, limit = 3): Promise<BlogPostData[]> {
  const all = await getBlogPosts();
  return all
    .filter((p) => p.slug !== current.slug)
    .filter((p) => p.category === current.category || p.tags.some((t) => current.tags.includes(t)))
    .slice(0, limit);
}
