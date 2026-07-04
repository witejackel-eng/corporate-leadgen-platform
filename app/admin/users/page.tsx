import type { Metadata } from "next";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { UserTable } from "@/features/admin/users/user-table";

export const metadata: Metadata = { title: "Users" };

export default async function AdminUsersPage() {
  const session = await auth();
  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } }).catch(() => []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Users</h1>
        <p className="text-sm text-ink-faint">Manage who has access to the admin console and their permission level.</p>
      </div>
      <UserTable users={users} currentUserId={session?.user.id ?? ""} />
    </div>
  );
}
