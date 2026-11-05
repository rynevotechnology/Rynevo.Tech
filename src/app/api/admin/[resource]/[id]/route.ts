import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";

const specs: Record<string, { model: () => { update: Function; delete: Function; findUnique: Function }; adminOnly?: boolean }> = {
  inquiries: { model: () => prisma.contactInquiry },
  applications: { model: () => prisma.jobApplication },
  jobs: { model: () => prisma.job },
  posts: { model: () => prisma.blogPost },
  projects: { model: () => prisma.portfolioProject },
  testimonials: { model: () => prisma.testimonial },
  users: { model: () => prisma.user, adminOnly: true },
};

async function guard(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  return token ? await verifySessionToken(token) : null;
}

export async function PATCH(
  request: NextRequest,
  ctx: { params: { resource: string; id: string } }
) {
  const session = await guard(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const spec = specs[ctx.params.resource];
  if (!spec) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  if (spec.adminOnly && session.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  // Field allow-list per resource — the client cannot touch anything else.
  const allowed: Record<string, string> = {
    // transitions & shared fields
    status: "string",
    published: "bool",
    // jobs
    title: "string", slug: "string", category: "string", jobType: "string",
    experience: "string", location: "string", remote: "bool",
    summary: "string", description: "string", responsibilities: "string", requirements: "string",
    // posts
    excerpt: "string", content: "string", readMinutes: "int", tags: "string",
    isFeatured: "bool",
    // projects
    industry: "string", stack: "string", isDemo: "bool",
    // testimonials
    authorName: "string", authorRole: "string", company: "string", quote: "string",
    isSample: "bool", order: "int",
    // users (ADMIN only, role only — passwords handled separately)
    name: "string", role: "string",
  };

  const data: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(body)) {
    const type = allowed[key];
    if (!type || type === "ignore" || type === "string-status") continue;
    if (type === "bool") data[key] = value === true || value === "true";
    else if (type === "int") data[key] = parseInt(String(value || "0"), 10) || 0;
    else data[key] = String(value).slice(0, 20000);
  }

  try {
    const item = await spec.model().update({ where: { id: ctx.params.id }, data });
    return NextResponse.json({ ok: true, item });
  } catch (error) {
    console.error("[admin PATCH]", error);
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  ctx: { params: { resource: string; id: string } }
) {
  const session = await guard(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const spec = specs[ctx.params.resource];
  if (!spec) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  if (spec.adminOnly && session.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    // Job applications reference jobs; detach before deleting a job
    if (ctx.params.resource === "jobs") {
      await prisma.jobApplication.updateMany({ where: { jobId: ctx.params.id }, data: { jobId: null } });
    }
    await spec.model().delete({ where: { id: ctx.params.id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin DELETE]", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}
