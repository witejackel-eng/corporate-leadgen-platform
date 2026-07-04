"use client";

import { DonutChart, Legend } from "@tremor/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  fontSize: 12,
  boxShadow: "var(--shadow-soft)",
};

export function TrafficChart({ data }: { data: { date: string; visitors: number; signups: number }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic &amp; signups</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="visitorsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent-blue)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--color-accent-blue)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-ink-faint)" />
            <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-ink-faint)" width={40} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="visitors" stroke="var(--color-accent-blue)" fill="url(#visitorsFill)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function LeadSourceChart({ data }: { data: { source: string; count: number }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads by source</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} layout="vertical" margin={{ left: 16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
            <XAxis type="number" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-ink-faint)" />
            <YAxis type="category" dataKey="source" tickLine={false} axisLine={false} fontSize={12} width={100} stroke="var(--color-ink-faint)" />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="count" fill="var(--color-accent-indigo)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

const STATUS_COLORS = ["slate", "blue", "indigo", "violet", "emerald", "red"] as const;

export function LeadStatusChart({ data }: { data: { status: string; count: number }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pipeline by status</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <DonutChart
          data={data}
          category="count"
          index="status"
          colors={[...STATUS_COLORS]}
          className="h-52"
          showAnimation
          valueFormatter={(v: number) => `${v} leads`}
        />
        <Legend categories={data.map((d) => d.status)} colors={[...STATUS_COLORS]} className="justify-center" />
      </CardContent>
    </Card>
  );
}
