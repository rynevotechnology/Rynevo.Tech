import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";

/**
 * Generic admin resource API with role-based access control and a strict
 * allow-list of models + field types (no raw model access from the client).
 */

const resources = {
  inquiries: {
    model: () => prisma.contactInquiry,
    create: null, // created by the public contact form
    fields: { status: "string" },
  },
  applications: {
    model: () => prisma.jobApplication,
    create: null, // created by the public application form
    fields: { status: "string" },
  },
  jobs: {
    model: () => prisma.job,
    fields: {
      title: "string", slug: "string", category: "string", jobType: "string",
      experience: "string", location: "string", remote: "bool", published: "bool",
      summary: "string", description: "string", responsibilities: "string", requirements: "string",
    },
  },
  posts: {
    model: () => prisma.blogPost,
    fields: {
      title: "string", slug: "string", category: "string", excerpt: "string", content: "string",
      readMinutes: "int", tags: "string", isFeatured: "bool", published: "bool",
    },
  },
  projects: {
    model: () => prisma.portfolioProject,
    fields: {
      title: "string", slug: "string", industry: "string", category: "string",
      summary: "string", stack: "string", isDemo: "bool", published: "bool",
    },
  },
  testimonials: {
    model: () => prisma.testimonial,
    fields: {
      authorName: "string", authorRole: "string", company: "string", quote: "string",
      isSample: "bool", published: "bool", order: "int",
    },
  },
  users: {
    model: () => prisma.user,
    adminOnly: true,
    fields: { email: "string", name: "string", role: "string", passwordHash: "secret" },
  },
} as const;

type ResourceKey = keyof typeof resources;

function resolve(key: string) {
  return (resources as Record<string, unknown | undefined>)[key];
}

async function guard(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  return session;
}

function castValue(type: string, raw: unknown) {
  if (type === "bool") return raw === true || raw === "true" || raw === "on";
  if (type === "int") return parseInt(String(raw || "0"), 10) || 0;
  return String(raw ?? "");
}

export async function GET(request: NextRequest, ctx: { params: { resource: string } }) {
  const session = await guard(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const spec = resolve(ctx.params.resource) as (typeof resources)[ResourceKey] | undefined;
  if (!spec) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  if ((spec as { adminOnly?: boolean }).adminOnly && session.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const url = new URL(request.url);
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "100", 10) || 100, 200);
  const orderBy: Record<string, "desc"> = { createdAt: "desc" };

  // Secret fields (like passwordHash) are never returned to the client
  const items = await (spec as { model: () => { findMany: Function } }).model().findMany({
    orderBy,
    take: limit,
    ...( spec as { adminOnly?: boolean } ).adminOnly
      ? { select: { id: true, email: true, name: true, role: true, createdAt: true } }
      : {},
  });

  return NextResponse.json({ ok: true, items });
}

export async function POST(request: NextRequest, ctx: { params: { resource: string } }) {
  const session = await guard(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const spec = resolve(ctx.params.resource) as (typeof resources)[ResourceKey] | undefined;
  if (!spec) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  if ((spec as { adminOnly?: boolean }).adminOnly && session.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (!(spec as unknown as { create: unknown }).create && (spec as unknown as { create: unknown }).create === null) {
    return NextResponse.json({ error: "This resource is read-only." }, { status: 405 });
  }

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const data: Record<string, unknown> = {};
  const fields = (spec as unknown as { fields: Record<string, string> }).fields;
  for (const [field, type] of Object.entries(fields)) {
    if (field in body && type !== "secret") data[field] = castValue(type, body[field]);
  }
  if (ctx.params.resource === "jobs") data.category = body.category; // enum passthrough
  if (ctx.params.resource === "posts") data.category = body.category;

  try {
    const created = await (spec as { model: () => { create: Function } }).model().create({ data });
    return NextResponse.json({ ok: true, item: created }, { status: 201 });
  } catch (error) {
    console.error("[admin POST]", error);
    return NextResponse.json({ error: "Create failed — check that required fields are valid." }, { status: 400 });
  }
}
