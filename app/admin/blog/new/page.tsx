import type { Metadata } from "next";

import { BlogPostForm } from "@/features/admin/blog/blog-post-form";

export const metadata: Metadata = { title: "New Post" };

export default function NewBlogPostPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">New post</h1>
        <p className="text-sm text-ink-faint">Write a new article for the Meridian blog.</p>
      </div>
      <BlogPostForm />
    </div>
  );
}
