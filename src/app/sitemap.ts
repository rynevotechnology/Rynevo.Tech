import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { services } from "@/lib/content/services";
import { projects } from "@/lib/content/projects";
import { site } from "@/lib/content/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/expertise",
    "/industries",
    "/portfolio",
    "/careers",
    "/insights",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${base}/case-studies/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const [cases, posts] = await Promise.all([
      prisma.portfolioProject.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
      prisma.blogPost.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    ]);
    dynamicRoutes = [
      ...cases.map((c) => ({
        url: `${base}/case-studies/${c.slug}`,
        lastModified: c.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
      ...posts.map((p) => ({
        url: `${base}/insights/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  } catch {
    // DB not reachable (e.g. CI build) — static routes still ship
  }

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...dynamicRoutes];
}
