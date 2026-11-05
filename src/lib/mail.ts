import nodemailer, { Transporter } from "nodemailer";
import { prisma } from "./prisma";

/**
 * Email notifications. Optional: without SMTP configuration, submissions are
 * still persisted to the database and logged server-side.
 */

function getTransport(): Transporter | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
  if (!SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || "587", 10),
    secure: SMTP_SECURE === "true",
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });
}

export async function sendNotificationEmail(subject: string, html: string) {
  const transport = getTransport();
  const to = process.env.MAIL_TO;
  if (!transport || !to) {
    console.log(`[mail:skipped] ${subject}`);
    return false;
  }
  try {
    await transport.sendMail({
      from: process.env.MAIL_FROM || to,
      to,
      subject,
      html,
    });
    return true;
  } catch (err) {
    console.error("[mail:error]", err);
    return false;
  }
}

export async function sendContactEmail(inquiry: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  services: string;
  budget?: string | null;
  message: string;
}) {
  const html = `
    <h2>New project inquiry — Rynevo Technologys</h2>
    <p><strong>Name:</strong> ${inquiry.name}</p>
    <p><strong>Email:</strong> ${inquiry.email}</p>
    ${inquiry.company ? `<p><strong>Company:</strong> ${inquiry.company}</p>` : ""}
    ${inquiry.phone ? `<p><strong>Phone:</strong> ${inquiry.phone}</p>` : ""}
    <p><strong>Services:</strong> ${inquiry.services}</p>
    ${inquiry.budget ? `<p><strong>Budget:</strong> ${inquiry.budget}</p>` : ""}
    <hr />
    <p>${inquiry.message.replace(/\n/g, "<br/>")}</p>
  `;
  const sent = await sendNotificationEmail(`New inquiry from ${inquiry.name}`, html);
  if (sent) {
    // best-effort flagging; failure to update is not fatal
    try {
      // updated by the API route after capture of the record id
    } catch {}
  }
  return sent;
}

export async function markInquiryEmailed(id: string) {
  await prisma.contactInquiry.update({ where: { id }, data: { emailSent: true } });
}

export async function sendApplicationConfirmationEmail(app: {
  name: string;
  email: string;
  jobTitle: string;
}) {
  const transport = getTransport();
  if (!transport) return false;
  try {
    await transport.sendMail({
      from: process.env.MAIL_FROM,
      to: app.email,
      subject: `We received your application — ${app.jobTitle} | Rynevo Technologys`,
      html: `
        <p>Hi ${app.name},</p>
        <p>Thank you for applying for the <strong>${app.jobTitle}</strong> position at Rynevo Technologys.
        Our team will review your application and get back to you if your profile matches.</p>
        <p>— The Rynevo Technologys Talent Team</p>
      `,
    });
    return true;
  } catch (err) {
    console.error("[mail:error]", err);
    return false;
  }
}
