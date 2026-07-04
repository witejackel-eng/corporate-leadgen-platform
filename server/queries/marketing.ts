import { prisma } from "@/lib/prisma";
import { DEFAULT_BENEFITS, DEFAULT_FAQS, DEFAULT_FEATURES, DEFAULT_STATS } from "@/lib/data/marketing";
import { DEFAULT_CLIENTS, DEFAULT_TESTIMONIALS } from "@/lib/data/clients";

export async function getStats() {
  try {
    const rows = await prisma.stat.findMany({ orderBy: { order: "asc" } });
    if (rows.length) return rows;
  } catch {
    /* DB unavailable — serve curated defaults */
  }
  return DEFAULT_STATS;
}

export async function getFeatures() {
  try {
    const rows = await prisma.feature.findMany({ orderBy: { order: "asc" } });
    if (rows.length) return rows;
  } catch {
    /* noop */
  }
  return DEFAULT_FEATURES;
}

export async function getBenefits() {
  try {
    const rows = await prisma.benefit.findMany({ orderBy: { order: "asc" } });
    if (rows.length) return rows;
  } catch {
    /* noop */
  }
  return DEFAULT_BENEFITS;
}

export async function getFaqs() {
  try {
    const rows = await prisma.faq.findMany({ orderBy: { order: "asc" } });
    if (rows.length) return rows;
  } catch {
    /* noop */
  }
  return DEFAULT_FAQS;
}

export async function getClients() {
  try {
    const rows = await prisma.client.findMany({ orderBy: { order: "asc" } });
    if (rows.length) return rows;
  } catch {
    /* noop */
  }
  return DEFAULT_CLIENTS;
}

export async function getTestimonials() {
  try {
    const rows = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
    if (rows.length) return rows;
  } catch {
    /* noop */
  }
  return DEFAULT_TESTIMONIALS;
}
