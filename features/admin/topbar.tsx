"use client";

import { signOut } from "next-auth/react";
import { LogOut, Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAdminTheme } from "@/features/admin/use-admin-theme";

interface TopbarProps {
  user: { name?: string | null; email?: string | null; role: string };
}

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export function AdminTopbar({ user }: TopbarProps) {
  const { dark, toggle } = useAdminTheme();

  return (
    <header className="flex h-16 items-center justify-end border-b border-border bg-surface px-6">

      <div className="flex items-center gap-3">
        <Button size="icon" variant="ghost" onClick={toggle} aria-label="Toggle dark mode">
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 hover:bg-surface-muted" data-cursor-hover>
              <Avatar className="h-8 w-8">
                <AvatarFallback>{initials(user.name ?? user.email ?? "U")}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-ink">{user.name ?? user.email}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              {user.name}
              <p className="text-xs font-normal text-ink-faint">{user.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
              <LogOut className="h-4 w-4" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
