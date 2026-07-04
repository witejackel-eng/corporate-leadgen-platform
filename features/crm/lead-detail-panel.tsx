"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Mail, Phone, Building2, User as UserIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LeadStatusBadge } from "@/features/crm/lead-status-badge";
import { addLeadNote, assignLead, updateLeadStatus } from "@/actions/leads";
import { formatDate } from "@/lib/utils";

const STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"];

interface LeadDetailPanelProps {
  lead: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    jobTitle: string | null;
    message: string | null;
    source: string;
    status: string;
    assignedToId: string | null;
    createdAt: string | Date;
    notes: { id: string; body: string; createdAt: string | Date; author: { name: string | null; email: string } }[];
    activities: { id: string; description: string; createdAt: string | Date; user: { name: string | null; email: string } | null }[];
  };
  staff: { id: string; name: string | null; email: string }[];
}

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export function LeadDetailPanel({ lead, staff }: LeadDetailPanelProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [noteBody, setNoteBody] = useState("");

  const handleStatusChange = (status: string) => {
    startTransition(async () => {
      const result = await updateLeadStatus({ leadId: lead.id, status });
      if (result.success) {
        toast.success("Status updated");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  };

  const handleAssign = (userId: string) => {
    startTransition(async () => {
      const result = await assignLead({ leadId: lead.id, userId: userId === "unassigned" ? null : userId });
      if (result.success) {
        toast.success("Assignment updated");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  };

  const handleAddNote = () => {
    if (!noteBody.trim()) return;
    startTransition(async () => {
      const result = await addLeadNote({ leadId: lead.id, body: noteBody });
      if (result.success) {
        setNoteBody("");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-6 lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{lead.name}</CardTitle>
              <LeadStatusBadge status={lead.status} />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm text-ink-soft">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-ink-faint" /> {lead.email}
            </div>
            {lead.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-ink-faint" /> {lead.phone}
              </div>
            )}
            {lead.company && (
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-ink-faint" /> {lead.company} {lead.jobTitle && `· ${lead.jobTitle}`}
              </div>
            )}
            {lead.message && <p className="mt-2 rounded-lg bg-surface-muted p-4 text-ink-soft">{lead.message}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Textarea
                placeholder="Add a note about this lead…"
                value={noteBody}
                onChange={(e) => setNoteBody(e.target.value)}
                rows={3}
              />
              <Button size="sm" variant="accent" className="self-end" disabled={isPending} onClick={handleAddNote}>
                Add note
              </Button>
            </div>
            <div className="flex flex-col gap-4 border-t border-border pt-4">
              {lead.notes.length === 0 ? (
                <p className="text-sm text-ink-faint">No notes yet.</p>
              ) : (
                lead.notes.map((note) => (
                  <div key={note.id} className="flex gap-3">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback>{initials(note.author.name ?? note.author.email)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-ink">{note.body}</p>
                      <p className="mt-0.5 text-xs text-ink-faint">
                        {note.author.name ?? note.author.email} · {formatDate(note.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Manage</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-faint">Status</p>
              <Select value={lead.status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-faint">Assigned to</p>
              <Select value={lead.assignedToId ?? "unassigned"} onValueChange={handleAssign}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {staff.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.name ?? u.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-faint">
              <UserIcon className="h-3.5 w-3.5" /> Source: {lead.source.replace("_", " ")}
            </div>
            <div className="text-xs text-ink-faint">Created {formatDate(lead.createdAt)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {lead.activities.map((activity) => (
                <div key={activity.id} className="flex gap-3 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" />
                  <div>
                    <p className="text-ink-soft">{activity.description}</p>
                    <p className="text-xs text-ink-faint">
                      {activity.user?.name ?? activity.user?.email ?? "System"} · {formatDate(activity.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
