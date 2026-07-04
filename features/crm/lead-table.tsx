"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Download, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeadStatusBadge } from "@/features/crm/lead-status-badge";
import { formatDate } from "@/lib/utils";

const STATUSES = ["ALL", "NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"] as const;

interface LeadRow {
  id: string;
  name: string;
  email: string;
  company: string | null;
  status: string;
  source: string;
  createdAt: string | Date;
  assignedTo: { name: string | null; email: string } | null;
}

export function LeadTable({ leads }: { leads: LeadRow[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("ALL");

  const filtered = useMemo(() => {
    return leads.filter((lead) => {
      const matchesStatus = status === "ALL" ? true : lead.status === status;
      const matchesQuery = query
        ? `${lead.name} ${lead.email} ${lead.company ?? ""}`.toLowerCase().includes(query.toLowerCase())
        : true;
      return matchesStatus && matchesQuery;
    });
  }, [leads, status, query]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={status} onValueChange={(v) => setStatus(v as (typeof STATUSES)[number])}>
          <TabsList>
            {STATUSES.map((s) => (
              <TabsTrigger key={s} value={s}>
                {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <Input placeholder="Search leads…" className="w-56 pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <Button asChild variant="outline" size="sm">
            <a href="/api/admin/leads/export">
              <Download className="h-4 w-4" /> Export CSV
            </a>
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="py-10 text-center text-ink-faint">
                No leads match your filters.
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((lead) => (
              <TableRow key={lead.id} className="cursor-pointer">
                <TableCell>
                  <Link href={`/admin/leads/${lead.id}`} className="block">
                    <p className="font-medium text-ink">{lead.name}</p>
                    <p className="text-xs text-ink-faint">{lead.email}</p>
                  </Link>
                </TableCell>
                <TableCell>{lead.company ?? "—"}</TableCell>
                <TableCell className="text-sm text-ink-faint">{lead.source.replace("_", " ")}</TableCell>
                <TableCell>
                  <LeadStatusBadge status={lead.status} />
                </TableCell>
                <TableCell className="text-sm text-ink-faint">{lead.assignedTo?.name ?? lead.assignedTo?.email ?? "Unassigned"}</TableCell>
                <TableCell className="text-sm text-ink-faint">{formatDate(lead.createdAt)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
