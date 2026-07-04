"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { updateUserRole } from "@/actions/users";
import { formatDate } from "@/lib/utils";

interface UserRow {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: string | Date;
}

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export function UserTable({ users, currentUserId }: { users: UserRow[]; currentUserId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onRoleChange = (userId: string, role: string) => {
    startTransition(async () => {
      const result = await updateUserRole({ userId, role });
      if (result.success) {
        toast.success("Role updated");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Joined</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{initials(user.name ?? user.email)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-ink">{user.name ?? "—"}</p>
                  <p className="text-xs text-ink-faint">{user.email}</p>
                </div>
                {user.id === currentUserId && <Badge variant="accent">You</Badge>}
              </div>
            </TableCell>
            <TableCell>
              <Select
                value={user.role}
                disabled={user.id === currentUserId || isPending}
                onValueChange={(v) => onRoleChange(user.id, v)}
              >
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="EDITOR">Editor</SelectItem>
                  <SelectItem value="VIEWER">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="text-sm text-ink-faint">{formatDate(user.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
