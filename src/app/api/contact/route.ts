import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendContactEmail, markInquiryEmailed } from "@/lib/mail";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  services: z.array(z.string().trim().max(80)).max(16).default([]),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(30, "Please describe your project (30+ characters)").max(5000),
  // Anti-bot fields: honeypots must be empty; humans need ≥3s on the form
  website: z.string().optional().default(""),
  profileUrl: z.string().optional().default(""),
  formStartedAt: z.number().optional().default(0),
});

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 415 });
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Please check your entries";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = parsed.data;

    // Bot protection: honeypots + minimum human interaction time
    if (data.website || data.profileUrl) {
      return NextResponse.json({ error: "Spam protection triggered." }, { status: 400 });
    }
    const elapsedSeconds = (Date.now() - data.formStartedAt) / 1000;
    if (data.formStartedAt && (elapsedSeconds < 3 || elapsedSeconds > 60 * 60 * 6)) {
      return NextResponse.json({ error: "Spam protection triggered." }, { status: 400 });
    }

    const serviceLabels = data.services.join(", ") || "General inquiry";

    const inquiry = await prisma.contactInquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        services: serviceLabels,
        budget: data.budget || null,
        message: data.message,
      },
    });

    // Fire-and-forget email notification
    const emailSent = await sendContactEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      services: serviceLabels,
      budget: data.budget,
      message: data.message,
    });
    if (emailSent) {
      try {
        await markInquiryEmailed(inquiry.id);
      } catch {}
    }

    return NextResponse.json({ ok: true, id: inquiry.id }, { status: 201 });
  } catch (error) {
    console.error("[contact POST]", error);
    return NextResponse.json(
      { error: "Something went wrong on our side. Please try again shortly." },
      { status: 500 }
    );
  }
}
