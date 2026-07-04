import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import { DEFAULT_BENEFITS, DEFAULT_FAQS, DEFAULT_FEATURES, DEFAULT_STATS } from "../lib/data/marketing";
import { DEFAULT_CLIENTS, DEFAULT_TESTIMONIALS } from "../lib/data/clients";
import { DEFAULT_PROJECTS } from "../lib/data/projects";
import { DEFAULT_CASE_STUDIES } from "../lib/data/case-studies";
import { DEFAULT_BLOG_POSTS } from "../lib/data/blog";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ---------- Users ----------
  const adminPassword = await bcrypt.hash("Password123!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@meridian.io" },
    update: {},
    create: {
      name: "Alex Whitaker",
      email: "admin@meridian.io",
      passwordHash: adminPassword,
      role: "ADMIN",
    },
  });

  const editorPassword = await bcrypt.hash("Password123!", 12);
  await prisma.user.upsert({
    where: { email: "editor@meridian.io" },
    update: {},
    create: {
      name: "Evelyn Marsh",
      email: "editor@meridian.io",
      passwordHash: editorPassword,
      role: "EDITOR",
    },
  });

  // ---------- Homepage blocks ----------
  for (const [i, stat] of DEFAULT_STATS.entries()) {
    await prisma.stat.upsert({
      where: { id: stat.id },
      update: { ...stat, order: i },
      create: { ...stat, order: i },
    });
  }
  for (const [i, feature] of DEFAULT_FEATURES.entries()) {
    await prisma.feature.upsert({
      where: { id: feature.id },
      update: { ...feature, order: i },
      create: { ...feature, order: i },
    });
  }
  for (const [i, benefit] of DEFAULT_BENEFITS.entries()) {
    await prisma.benefit.upsert({
      where: { id: benefit.id },
      update: { ...benefit, order: i },
      create: { ...benefit, order: i },
    });
  }
  for (const [i, faq] of DEFAULT_FAQS.entries()) {
    await prisma.faq.upsert({
      where: { id: faq.id },
      update: { ...faq, order: i },
      create: { ...faq, order: i },
    });
  }

  // ---------- Clients & testimonials ----------
  for (const [i, client] of DEFAULT_CLIENTS.entries()) {
    await prisma.client.upsert({
      where: { id: client.id },
      update: { name: client.name, order: i },
      create: { id: client.id, name: client.name, logo: "/logo.svg", order: i },
    });
  }
  for (const [i, testimonial] of DEFAULT_TESTIMONIALS.entries()) {
    await prisma.testimonial.upsert({
      where: { id: testimonial.id },
      update: { ...testimonial, avatar: "/images/blog/author-evelyn.svg", order: i, featured: true },
      create: { ...testimonial, avatar: "/images/blog/author-evelyn.svg", order: i, featured: true },
    });
  }

  // ---------- Projects ----------
  for (const [i, project] of DEFAULT_PROJECTS.entries()) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: { ...project, order: i },
      create: { ...project, order: i },
    });
  }

  // ---------- Case studies ----------
  for (const [i, cs] of DEFAULT_CASE_STUDIES.entries()) {
    const { sections, ...caseStudyData } = cs;
    const created = await prisma.caseStudy.upsert({
      where: { slug: cs.slug },
      update: { ...caseStudyData, order: i },
      create: { ...caseStudyData, order: i },
    });

    await prisma.caseStudySection.deleteMany({ where: { caseStudyId: created.id } });
    await prisma.caseStudySection.createMany({
      data: sections.map((s, idx) => ({
        caseStudyId: created.id,
        key: s.key as never,
        title: s.title,
        body: s.body,
        order: idx,
      })),
    });
  }

  // ---------- Blog ----------
  for (const post of DEFAULT_BLOG_POSTS) {
    const categorySlug = post.category.toLowerCase().replace(/\s+/g, "-");
    const category = await prisma.category.upsert({
      where: { slug: categorySlug },
      update: {},
      create: { name: post.category, slug: categorySlug },
    });

    const created = await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        published: true,
        featured: post.featured,
        readingTime: post.readingTime,
        categoryId: category.id,
        publishedAt: new Date(post.publishedAt),
      },
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        published: true,
        featured: post.featured,
        readingTime: post.readingTime,
        categoryId: category.id,
        authorId: admin.id,
        publishedAt: new Date(post.publishedAt),
      },
    });

    await prisma.tagsOnPosts.deleteMany({ where: { postId: created.id } });
    for (const tagName of post.tags) {
      const tagSlug = tagName.toLowerCase().replace(/\s+/g, "-");
      const tag = await prisma.tag.upsert({ where: { slug: tagSlug }, update: {}, create: { name: tagName, slug: tagSlug } });
      await prisma.tagsOnPosts.create({ data: { postId: created.id, tagId: tag.id } });
    }
  }

  // ---------- Lead tags ----------
  const leadTagNames = [
    { name: "Enterprise", color: "#2563eb" },
    { name: "Hot lead", color: "#ef4444" },
    { name: "Champion", color: "#10b981" },
    { name: "Needs nurture", color: "#8b5cf6" },
  ];
  const leadTags = [];
  for (const t of leadTagNames) {
    leadTags.push(await prisma.leadTag.upsert({ where: { name: t.name }, update: {}, create: t }));
  }

  // ---------- Sample leads ----------
  const sampleLeads = [
    { name: "Marcus Webb", email: "marcus.webb@vantagecapital.example", company: "Vantage Capital Partners", jobTitle: "CRO", source: "DEMO_REQUEST" as const, status: "PROPOSAL" as const },
    { name: "Priya Anand", email: "priya.anand@nordwindhealth.example", company: "Nordwind Health Systems", jobTitle: "Director of Demand Gen", source: "CONTACT_FORM" as const, status: "QUALIFIED" as const },
    { name: "Jonathan Reyes", email: "jonathan.reyes@halcyoninsurance.example", company: "Halcyon Insurance Group", jobTitle: "SVP Marketing", source: "REFERRAL" as const, status: "WON" as const },
    { name: "Elena Ferro", email: "elena.ferro@circuitryrobotics.example", company: "Circuitry Robotics", jobTitle: "Head of Growth", source: "LINKEDIN" as const, status: "CONTACTED" as const },
    { name: "Derek Oyelaran", email: "derek.oyelaran@meritagefinancial.example", company: "Meritage Financial", jobTitle: "CFO", source: "EVENT" as const, status: "NEW" as const },
  ];

  for (const lead of sampleLeads) {
    const created = await prisma.lead.upsert({
      where: { id: `seed-${lead.email}` },
      update: {},
      create: {
        id: `seed-${lead.email}`,
        ...lead,
        message: `Interested in learning more about Meridian's pipeline intelligence for ${lead.company}.`,
        assignedToId: admin.id,
        tags: { create: [{ tagId: leadTags[Math.floor(Math.random() * leadTags.length)].id }] },
        activities: { create: { type: "CREATED", description: "Lead imported via seed script" } },
      },
    });
    console.log(`Seeded lead: ${created.name}`);
  }

  // ---------- Site settings ----------
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      siteName: "Meridian",
      siteTagline: "The revenue engine for enterprise marketing teams",
      siteDescription:
        "Meridian unifies pipeline intelligence, multi-channel attribution, and account-based orchestration for enterprise marketing teams.",
      contactEmail: "hello@meridian.io",
    },
  });

  // ---------- Navigation ----------
  const headerLinks = [
    { label: "Product", href: "/#product", order: 0 },
    { label: "Projects", href: "/#projects", order: 1 },
    { label: "Case Studies", href: "/case-studies", order: 2 },
    { label: "Pricing", href: "/#pricing", order: 3 },
    { label: "Blog", href: "/blog", order: 4 },
  ];
  for (const link of headerLinks) {
    const existing = await prisma.navigationItem.findFirst({ where: { label: link.label, location: "HEADER" } });
    if (!existing) {
      await prisma.navigationItem.create({ data: { ...link, location: "HEADER" } });
    }
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
