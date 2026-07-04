"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteCaseStudy } from "@/actions/case-studies";

interface Row {
  id: string;
  title: string;
  client: string;
  category: string;
  featured: boolean;
}

export function CaseStudyTable({ caseStudies }: { caseStudies: Row[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onDelete = (id: string) => {
    startTransition(async () => {
      const result = await deleteCaseStudy(id);
      if (result.success) {
        toast.success("Case study deleted");
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
          <Link href="/admin/case-studies/new">
            <Plus className="h-4 w-4" /> New case study
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {caseStudies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-10 text-center text-ink-faint">
                No case studies yet.
              </TableCell>
            </TableRow>
          ) : (
            caseStudies.map((cs) => (
              <TableRow key={cs.id}>
                <TableCell className="font-medium text-ink">{cs.title}</TableCell>
                <TableCell>{cs.client}</TableCell>
                <TableCell>
                  <Badge variant="indigo">{cs.category}</Badge>
                </TableCell>
                <TableCell>{cs.featured ? "Yes" : "No"}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button size="icon" variant="ghost" asChild>
                    <Link href={`/admin/case-studies/${cs.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="icon" variant="ghost" disabled={isPending} onClick={() => onDelete(cs.id)}>
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
