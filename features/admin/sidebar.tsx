"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Briefcase,
  Compass,
  FileText,
  FolderKanban,
  HelpCircle,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  MessageSquareQuote,
  Settings,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

const NAV = [
  { section: "Overview", items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }] },
  {
    section: "CRM",
    items: [
      { href: "/admin/leads", label: "Leads", icon: Inbox },
      { href: "/admin/messages", label: "Messages", icon: MessageSquareQuote },
    ],
  },
  {
    section: "Content",
    items: [
      { href: "/admin/homepage", label: "Homepage", icon: LayoutDashboard },
      { href: "/admin/navigation", label: "Navigation", icon: Compass },
      { href: "/admin/blog", label: "Blog", icon: FileText },
      { href: "/admin/projects", label: "Projects", icon: FolderKanban },
      { href: "/admin/case-studies", label: "Case Studies", icon: Briefcase },
      { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
      { href: "/admin/clients", label: "Clients", icon: Users },
      { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
      { href: "/admin/media", label: "Media", icon: ImageIcon },
    ],
  },
  {
    section: "Organization",
    items: [
      { href: "/admin/users", label: "Users", icon: Users },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface lg:flex">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6 font-display text-base font-bold tracking-tight text-ink">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-sm text-white">M</span>
        {SITE_CONFIG.name}
        <span className="ml-auto rounded-full bg-accent-blue/10 px-2 py-0.5 text-[10px] font-semibold text-accent-blue">Admin</span>
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-6">
        {NAV.map((group) => (
          <div key={group.section}>
            <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">{group.section}</p>
            <div className="mt-2 flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive ? "bg-accent-blue/10 text-accent-blue" : "text-ink-soft hover:bg-surface-muted hover:text-ink"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <Link href="/" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-faint hover:text-ink">
          <BarChart3 className="h-4 w-4" /> View live site
        </Link>
      </div>
    </aside>
  );
}
