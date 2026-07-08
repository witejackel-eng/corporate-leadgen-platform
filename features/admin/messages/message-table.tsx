"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Mail, MailOpen, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteMessage, markMessageRead } from "@/actions/cms";
import { formatDate } from "@/lib/utils";

interface MessageRow {
  id: string;
  type: string;
  name: string | null;
  email: string;
  subject: string | null;
  body: string;
  read: boolean;
  createdAt: string | Date;
}

export function MessageTable({ messages }: { messages: MessageRow[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggleRead = (id: string, read: boolean) => {
    startTransition(async () => {
      await markMessageRead(id, !read);
      router.refresh();
    });
  };

  const onDelete = (id: string) => {
    startTransition(async () => {
      const result = await deleteMessage(id);
      if (result.success) {
        toast.success("Message deleted");
        router.refresh();
      }
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>From</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Received</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {messages.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="py-10 text-center text-ink-faint">
              No messages yet.
            </TableCell>
          </TableRow>
        ) : (
          messages.map((m) => (
            <TableRow key={m.id} className={m.read ? "" : "bg-accent-blue/5"}>
              <TableCell>
                <p className="font-medium text-ink">{m.name ?? m.email}</p>
                <p className="text-xs text-ink-faint">{m.email}</p>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{m.type}</Badge>
              </TableCell>
              <TableCell className="max-w-xs truncate text-sm text-ink-faint">{m.subject ?? m.body}</TableCell>
              <TableCell className="text-sm text-ink-faint">{formatDate(m.createdAt)}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button size="icon" variant="ghost" aria-label="Mark as read" disabled={isPending} onClick={() => toggleRead(m.id, m.read)}>
                  {m.read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4 text-accent-blue" />}
                </Button>
                <Button size="icon" variant="ghost" aria-label="Delete message" disabled={isPending} onClick={() => onDelete(m.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
