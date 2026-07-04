"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-guard";
import { sanitizeRichText } from "@/lib/sanitize";
import { blogPostSchema } from "@/lib/validations/cms";
import type { ActionResult } from "@/actions/leads";

function estimateReadingTime(html: string) {
  const words = html.replace(/<[^>]*>/g, " ").trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

async function resolveCategoryId(name: string) {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  const category = await prisma.category.upsert({
    where: { slug },
    update: {},
    create: { name, slug },
  });
  return category.id;
}

async function syncTags(postId: string, tagNames: string[]) {
  await prisma.tagsOnPosts.deleteMany({ where: { postId } });
  for (const name of tagNames) {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const tag = await prisma.tag.upsert({ where: { slug }, update: {}, create: { name, slug } });
    await prisma.tagsOnPosts.create({ data: { postId, tagId: tag.id } });
  }
}

export async function upsertBlogPost(input: unknown): Promise<ActionResult> {
  const session = await requireStaff();
  const parsed = blogPostSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const { id, tags, category, published, ...data } = parsed.data;
  data.content = sanitizeRichText(data.content);
  const categoryId = await resolveCategoryId(category);
  const readingTime = estimateReadingTime(data.content);
  const tagNames = (tags ?? "").split(",").map((t) => t.trim()).filter(Boolean);

  let postId = id;
  if (id) {
    await prisma.blogPost.update({
      where: { id },
      data: { ...data, categoryId, readingTime, published, publishedAt: published ? new Date() : null },
    });
  } else {
    const created = await prisma.blogPost.create({
      data: { ...data, categoryId, readingTime, published, publishedAt: published ? new Date() : null, authorId: session.user.id },
    });
    postId = created.id;
  }

  if (postId) await syncTags(postId, tagNames);

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { success: true };
}

export async function deleteBlogPost(id: string): Promise<ActionResult> {
  await requireStaff();
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { success: true };
}
