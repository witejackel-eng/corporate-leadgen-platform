"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const pipelineData = [
  { month: "Jan", pipeline: 2.1, closed: 0.8 },
  { month: "Feb", pipeline: 2.6, closed: 1.0 },
  { month: "Mar", pipeline: 3.4, closed: 1.3 },
  { month: "Apr", pipeline: 3.1, closed: 1.5 },
  { month: "May", pipeline: 4.2, closed: 1.9 },
  { month: "Jun", pipeline: 5.0, closed: 2.3 },
  { month: "Jul", pipeline: 5.8, closed: 2.7 },
  { month: "Aug", pipeline: 6.4, closed: 3.1 },
];

const campaignData = [
  { channel: "Paid Search", mql: 420 },
  { channel: "LinkedIn ABM", mql: 310 },
  { channel: "Webinars", mql: 265 },
  { channel: "Organic", mql: 380 },
  { channel: "Email", mql: 190 },
  { channel: "Events", mql: 140 },
];

const forecastData = [
  { week: "W1", forecast: 1.2, actual: 1.15 },
  { week: "W2", forecast: 1.4, actual: 1.42 },
  { week: "W3", forecast: 1.55, actual: 1.5 },
  { week: "W4", forecast: 1.7, actual: 1.78 },
  { week: "W5", forecast: 1.95, actual: 2.02 },
  { week: "W6", forecast: 2.2, actual: 2.15 },
];

const chartTooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  fontSize: 12,
  boxShadow: "var(--shadow-soft)",
};

export function DashboardPreviewSection() {
  const [tab, setTab] = useState("pipeline");

  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="See it in action"
          title="Revenue reporting your whole team opens without being asked"
          description="Every number below reconciles to your CRM automatically — no manual exports, no dueling spreadsheets."
        />

        <Reveal direction="scale" delay={0.15} className="mt-16">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-card border border-border bg-surface shadow-lift">
            <div className="flex items-center gap-2 border-b border-border bg-surface-muted px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
              <span className="ml-4 rounded-full bg-surface px-3 py-1 text-xs text-ink-faint">app.meridian.io/dashboard</span>
            </div>

            <div className="p-6 sm:p-8">
              <Tabs value={tab} onValueChange={setTab}>
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <TabsList>
                    <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
                    <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                    <TabsTrigger value="forecast">Forecast</TabsTrigger>
                  </TabsList>
                  <Badge variant="emerald">Live · synced 2 min ago</Badge>
                </div>

                <TabsContent value="pipeline">
                  <div className="mb-4 flex flex-wrap gap-8">
                    <div>
                      <p className="text-xs text-ink-faint">Total pipeline</p>
                      <p className="font-display text-2xl font-semibold text-ink">{formatCurrency(6400000)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-ink-faint">Closed-won (YTD)</p>
                      <p className="font-display text-2xl font-semibold text-accent-emerald">{formatCurrency(3100000)}</p>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={pipelineData}>
                      <defs>
                        <linearGradient id="pipelineFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--color-accent-blue)" stopOpacity={0.35} />
                          <stop offset="100%" stopColor="var(--color-accent-blue)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="closedFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--color-accent-emerald)" stopOpacity={0.35} />
                          <stop offset="100%" stopColor="var(--color-accent-emerald)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-ink-faint)" />
                      <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-ink-faint)" width={32} />
                      <Tooltip contentStyle={chartTooltipStyle} formatter={(v) => `$${v}M`} />
                      <Area type="monotone" dataKey="pipeline" stroke="var(--color-accent-blue)" fill="url(#pipelineFill)" strokeWidth={2} />
                      <Area type="monotone" dataKey="closed" stroke="var(--color-accent-emerald)" fill="url(#closedFill)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="campaigns">
                  <div className="mb-4">
                    <p className="text-xs text-ink-faint">Marketing-qualified leads by channel, last 90 days</p>
                  </div>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={campaignData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                      <XAxis dataKey="channel" tickLine={false} axisLine={false} fontSize={11} stroke="var(--color-ink-faint)" />
                      <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-ink-faint)" width={32} />
                      <Tooltip contentStyle={chartTooltipStyle} />
                      <Bar dataKey="mql" fill="var(--color-accent-indigo)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="forecast">
                  <div className="mb-4">
                    <p className="text-xs text-ink-faint">Forecasted vs. actual pipeline, rolling 6 weeks ($M)</p>
                  </div>
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={forecastData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                      <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-ink-faint)" />
                      <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-ink-faint)" width={32} />
                      <Tooltip contentStyle={chartTooltipStyle} />
                      <Line type="monotone" dataKey="forecast" stroke="var(--color-accent-purple)" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                      <Line type="monotone" dataKey="actual" stroke="var(--color-accent-blue)" strokeWidth={2.5} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
