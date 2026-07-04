import type { MetadataRoute } from "next";

import { getBlogPosts } from "@/server/queries/blog";
import { getCaseStudies } from "@/server/queries/case-studies";
import { SITE_CONFIG } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, caseStudies] = await Promise.all([getBlogPosts(), getCaseStudies()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_CONFIG.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_CONFIG.url}/case-studies`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_CONFIG.url}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_CONFIG.url}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_CONFIG.url}/legal/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_CONFIG.url}/legal/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_CONFIG.url}/legal/cookies`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${SITE_CONFIG.url}/case-studies/${cs.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_CONFIG.url}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...blogRoutes];
}
