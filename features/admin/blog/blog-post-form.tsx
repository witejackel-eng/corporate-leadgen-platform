"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import slugify from "slugify";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/features/admin/blog/rich-text-editor";
import { blogPostSchema } from "@/lib/validations/cms";
import { upsertBlogPost } from "@/actions/blog-posts";

interface BlogPostFormValues {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string;
  published: boolean;
  featured: boolean;
}

export function BlogPostForm({ initialValues }: { initialValues?: BlogPostFormValues }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: initialValues ?? {
      title: "",
      slug: "",
      excerpt: "",
      content: "<p></p>",
      coverImage: "/images/blog/attribution-scale.svg",
      category: "",
      tags: "",
      published: false,
      featured: false,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    startTransition(async () => {
      const result = await upsertBlogPost({ ...data, id: initialValues?.id });
      if (result.success) {
        toast.success(initialValues ? "Post updated" : "Post created");
        router.push("/admin/blog");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <div>
            <Label>Title</Label>
            <Input
              className="mt-1.5"
              {...form.register("title", {
                onBlur: (e) => {
                  if (!form.getValues("slug")) form.setValue("slug", slugify(e.target.value, { lower: true, strict: true }));
                },
              })}
            />
          </div>
          <div>
            <Label>Slug</Label>
            <Input className="mt-1.5" {...form.register("slug")} />
          </div>
          <div>
            <Label>Excerpt</Label>
            <Textarea className="mt-1.5" rows={2} {...form.register("excerpt")} />
          </div>
          <div>
            <Label>Content</Label>
            <div className="mt-1.5">
              <Controller
                control={form.control}
                name="content"
                render={({ field }) => <RichTextEditor value={field.value} onChange={field.onChange} />}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <Label>Category</Label>
            <Input className="mt-1.5" {...form.register("category")} />
          </div>
          <div>
            <Label>Tags (comma-separated)</Label>
            <Input className="mt-1.5" {...form.register("tags")} />
          </div>
          <div>
            <Label>Cover image URL</Label>
            <Input className="mt-1.5" {...form.register("coverImage")} />
          </div>
          <div className="flex items-center justify-between rounded-control border border-border p-3">
            <Label>Published</Label>
            <Switch checked={form.watch("published")} onCheckedChange={(v) => form.setValue("published", v)} />
          </div>
          <div className="flex items-center justify-between rounded-control border border-border p-3">
            <Label>Featured</Label>
            <Switch checked={form.watch("featured")} onCheckedChange={(v) => form.setValue("featured", v)} />
          </div>
          <Button type="submit" variant="accent" disabled={isPending}>
            {isPending ? "Saving…" : initialValues ? "Save changes" : "Create post"}
          </Button>
        </div>
      </div>
    </form>
  );
}
