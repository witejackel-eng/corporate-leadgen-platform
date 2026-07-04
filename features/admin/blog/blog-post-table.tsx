"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteBlogPost } from "@/actions/blog-posts";
import { formatDate } from "@/lib/utils";

interface PostRow {
  id: string;
  title: string;
  published: boolean;
  category: { name: string } | null;
  createdAt: string | Date;
}

export function BlogPostTable({ posts }: { posts: PostRow[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onDelete = (id: string) => {
    startTransition(async () => {
      const result = await deleteBlogPost(id);
      if (result.success) {
        toast.success("Post deleted");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <Button asChild variant="accent" size="sm">
          <Link href="/admin/blog/new">
            <Plus className="h-4 w-4" /> New post
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-10 text-center text-ink-faint">
                No posts yet — create your first one.
              </TableCell>
            </TableRow>
          ) : (
            posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium text-ink">{post.title}</TableCell>
                <TableCell>{post.category?.name ?? "—"}</TableCell>
                <TableCell>
                  <Badge variant={post.published ? "emerald" : "outline"}>{post.published ? "Published" : "Draft"}</Badge>
                </TableCell>
                <TableCell className="text-sm text-ink-faint">{formatDate(post.createdAt)}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button size="icon" variant="ghost" asChild>
                    <Link href={`/admin/blog/${post.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="icon" variant="ghost" disabled={isPending} onClick={() => onDelete(post.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
