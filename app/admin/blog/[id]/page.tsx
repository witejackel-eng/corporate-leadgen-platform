import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { BlogPostForm } from "@/features/admin/blog/blog-post-form";

export const metadata: Metadata = { title: "Edit Post" };

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const post = await prisma.blogPost
    .findUnique({ where: { id }, include: { category: true, tags: { include: { tag: true } } } })
    .catch(() => null);

  if (!post) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Edit post</h1>
        <p className="text-sm text-ink-faint">{post.title}</p>
      </div>
      <BlogPostForm
        initialValues={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage,
          category: post.category?.name ?? "",
          tags: post.tags.map((t) => t.tag.name).join(", "),
          published: post.published,
          featured: post.featured,
        }}
      />
    </div>
  );
}
