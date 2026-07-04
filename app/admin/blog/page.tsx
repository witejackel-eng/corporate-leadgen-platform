import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { BlogPostTable } from "@/features/admin/blog/blog-post-table";

export const metadata: Metadata = { title: "Blog" };

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost
    .findMany({ orderBy: { createdAt: "desc" }, include: { category: true } })
    .catch(() => []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Blog</h1>
        <p className="text-sm text-ink-faint">Write and publish articles for the public blog.</p>
      </div>
      <BlogPostTable posts={posts} />
    </div>
  );
}
