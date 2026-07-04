import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { MessageTable } from "@/features/admin/messages/message-table";

export const metadata: Metadata = { title: "Messages" };

export default async function AdminMessagesPage() {
  const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Messages</h1>
        <p className="text-sm text-ink-faint">Newsletter subscriptions and other inbound submissions.</p>
      </div>
      <MessageTable messages={messages} />
    </div>
  );
}
