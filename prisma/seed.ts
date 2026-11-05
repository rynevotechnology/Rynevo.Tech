/**
 * Seeds the database with:
 *  - an admin user (from ADMIN_EMAIL / ADMIN_PASSWORD env vars)
 *  - blog articles
 *  - the three real portfolio projects
 *
 * Any demo/sample data is pruned: sample job listings, sample testimonials,
 * and smoke/dev test records. Real job openings and testimonials are managed
 * from the admin dashboard only.
 *
 * Run: npm run setup   (first time) or npm run seed
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { seedPosts } from "../src/lib/content/blog";
import { projects } from "../src/lib/content/projects";

const prisma = new PrismaClient();

async function main() {
  // ── Admin user ──────────────────────────────────────────────────────────
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@rynevotechnologys.com").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "change-me-please-1f3a9";

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: "Site Administrator",
        role: "ADMIN",
        passwordHash: await bcrypt.hash(adminPassword, 12),
      },
    });
    console.log(`✅ Admin user created: ${adminEmail}`);
  } else {
    console.log(`ℹ️ Admin user already exists: ${adminEmail}`);
  }

  // ── Blog posts ─────────────────────────────────────────────────────────
  for (const post of seedPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        title: post.title,
        category: post.category,
        excerpt: post.excerpt,
        content: post.content,
        readMinutes: post.readMinutes,
        tags: post.tags,
        isFeatured: Boolean(post.isFeatured),
        published: true,
      },
    });
  }
  console.log(`✅ Blog posts: ${seedPosts.length} articles ensured`);

// ── Portfolio projects (real builds) ──────────────────────────────────────
  for (const project of projects) {
    await prisma.portfolioProject.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        industry: project.industry,
        category: project.category,
        summary: project.summary,
        stack: project.stack.join(", "),
        isDemo: project.isDemo,
      },
      create: {
        slug: project.slug,
        title: project.title,
        industry: project.industry,
        category: project.category,
        summary: project.summary,
        stack: project.stack.join(", "),
        isDemo: project.isDemo,
        published: true,
      },
    });
  }
  console.log(`✅ Portfolio: ${projects.length} real projects ensured`);

  // ── Remove demo/sample data ────────────────────────────────────────────
  // Sample job listings, sample testimonials, and smoke/dev test records are
  // removed so the database mirrors exactly what is published on the site.
  await prisma.portfolioProject.deleteMany({ where: { isDemo: true } });
  await prisma.job.deleteMany({ where: { OR: [{ title: { contains: "SAMPLE" } }, { slug: { startsWith: "sample-" } }] } });
  await prisma.testimonial.deleteMany({ where: { isSample: true } });
  await prisma.jobApplication.deleteMany({ where: { OR: [{ email: { contains: "smoke" } }, { name: { contains: "Smoke" } }] } });
  await prisma.contactInquiry.deleteMany({ where: { OR: [{ email: { contains: "smoke" } }, { name: { contains: "Smoke" } }] } });
  console.log("🧹 Demo/sample and smoke-test data cleaned from the database");

  console.log("\n🌱 Seed complete.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
