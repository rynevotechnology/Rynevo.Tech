import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendApplicationConfirmationEmail } from "@/lib/mail";

export const runtime = "nodejs";
export const maxDuration = 30;

const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx", ".rtf"];
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB
const UPLOAD_DIR = path.join(process.cwd(), "uploads");

/** Sanitize a filename: keep the extension, randomize the stem. */
function safeFileName(original: string) {
  const ext = path.extname(original).toLowerCase();
  return `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 415 });
    }

    const form = await request.formData();

    // Honeypot — bots fill every field
    if (String(form.get("website") || "")) {
      return NextResponse.json({ error: "Spam protection triggered." }, { status: 400 });
    }

    const jobId = String(form.get("jobId") || "");
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim().toLowerCase();
    const phone = String(form.get("phone") || "").trim();
    const linkedin = String(form.get("linkedin") || "").trim();
    const coverLetter = String(form.get("coverLetter") || "").trim();
    const experienceYears = String(form.get("experienceYears") || "").trim();
    const location = String(form.get("location") || "").trim();

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!experienceYears) {
      return NextResponse.json({ error: "Please tell us your years of experience." }, { status: 400 });
    }
    if (linkedin && !/^https?:\/\//.test(linkedin)) {
      return NextResponse.json({ error: "LinkedIn URL must start with http(s)://" }, { status: 400 });
    }

    // Validate resume upload
    const resumeFile = form.get("resume");
    if (!(resumeFile instanceof File)) {
      return NextResponse.json({ error: "Please attach your resume." }, { status: 400 });
    }
    const ext = path.extname(resumeFile.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json({ error: "Resume must be a PDF, DOC, DOCX or RTF file." }, { status: 400 });
    }
    if (resumeFile.size === 0 || resumeFile.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Resume must be between 1 KB and 4 MB." }, { status: 400 });
    }

    // Verify the job exists
    const job = jobId ? await prisma.job.findUnique({ where: { id: jobId } }) : null;

    // Store the file (never trust original names in public paths)
    const storedName = safeFileName(resumeFile.name);
    await mkdir(UPLOAD_DIR, { recursive: true });
    const bytes = Buffer.from(await resumeFile.arrayBuffer());
    await writeFile(path.join(UPLOAD_DIR, storedName), bytes);

    const application = await prisma.jobApplication.create({
      data: {
        jobId: job?.id ?? null,
        name,
        email,
        phone: phone || null,
        linkedin: linkedin || null,
        coverLetter: coverLetter || null,
        experienceYears,
        location: location || null,
        resumeName: storedName,
        resumeSize: resumeFile.size,
      },
    });

    // Non-blocking confirmation email
    sendApplicationConfirmationEmail({
      name,
      email,
      jobTitle: job ? job.title.replace(" — SAMPLE LISTING", "") : "our talent pool",
    }).catch(() => {});

    return NextResponse.json({ ok: true, id: application.id }, { status: 201 });
  } catch (error) {
    console.error("[careers/apply POST]", error);
    return NextResponse.json(
      { error: "Something went wrong on our side. Please try again shortly." },
      { status: 500 }
    );
  }
}
