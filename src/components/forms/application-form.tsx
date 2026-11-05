"use client";

import { useState } from "react";
import { CheckCircle2, FileUp, Loader2, Send, Trash2, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const inputCls =
  "w-full rounded-xl border border-line bg-bg-2/60 px-4 py-3 text-sm text-ink placeholder:text-ink-2/60 focus:border-accent focus:outline-none";
const ACCEPTED = [".pdf", ".doc", ".docx", ".rtf"];
const MAX_MB = 4;

type Status = "idle" | "submitting" | "success" | "error";

export function ApplicationForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFileError("");
    const f = e.target.files?.[0] ?? null;
    if (!f) {
      setFile(null);
      return;
    }
    const ext = `.${f.name.split(".").pop()?.toLowerCase()}`;
    if (!ACCEPTED.includes(ext)) {
      setFileError(`Unsupported format. Please upload ${ACCEPTED.join(", ")}`);
      setFile(null);
      return;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setFileError(`File is too large. Maximum ${MAX_MB} MB.`);
      setFile(null);
      return;
    }
    setFile(f);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) {
      setFileError("Please attach your resume (PDF or DOC).");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");

    const data = new FormData(e.currentTarget);
    data.set("jobId", jobId);
    data.set("website", String(data.get("website") || ""));
    try {
      const res = await fetch("/api/careers/apply", { method: "POST", body: data });
      const result = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(result.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error — please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-accent/40 bg-accent/5 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-accent2" />
        <h3 className="font-display text-xl font-semibold">Application received.</h3>
        <p className="max-w-md text-sm leading-relaxed text-ink-2">
          Thank you for applying for <strong>{jobTitle}</strong>. Your resume has been attached to your
          application and you&apos;ll receive a confirmation email shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Honeypot */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="apply-name" className="mb-1.5 block text-sm font-medium">Full name *</label>
          <input id="apply-name" name="name" required minLength={2} placeholder="Jane Doe" className={inputCls} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="apply-email" className="mb-1.5 block text-sm font-medium">Email *</label>
          <input id="apply-email" name="email" type="email" required placeholder="jane@email.com" className={inputCls} autoComplete="email" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="apply-phone" className="mb-1.5 block text-sm font-medium">Phone</label>
          <input id="apply-phone" name="phone" type="tel" className={inputCls} autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="apply-experience" className="mb-1.5 block text-sm font-medium">Years of experience *</label>
          <input id="apply-experience" name="experienceYears" required type="number" min={0} max={50} placeholder="e.g. 3" className={inputCls} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="apply-linkedin" className="mb-1.5 block text-sm font-medium">LinkedIn profile</label>
          <input id="apply-linkedin" name="linkedin" type="url" placeholder="https://linkedin.com/in/…" className={inputCls} />
        </div>
        <div>
          <label htmlFor="apply-location" className="mb-1.5 block text-sm font-medium">Current location *</label>
          <input id="apply-location" name="location" required placeholder="City, Country" className={inputCls} />
        </div>
      </div>

      <div>
        <label htmlFor="apply-cover" className="mb-1.5 block text-sm font-medium">Cover note</label>
        <textarea
          id="apply-cover"
          name="coverLetter"
          rows={4}
          placeholder="Optional — tell us briefly why this role fits you…"
          className={cn(inputCls, "resize-y")}
        />
      </div>

      {/* Resume upload */}
      <div>
        <label className="mb-1.5 block text-sm font-medium">Resume * (PDF or DOC, max {MAX_MB} MB)</label>
        {file ? (
          <div className="flex items-center justify-between rounded-xl border border-accent/40 bg-accent/5 px-4 py-3">
            <span className="inline-flex min-w-0 items-center gap-2.5 text-sm">
              <FileUp className="h-4 w-4 shrink-0 text-accent2" />
              <span className="truncate">{file.name}</span>
              <span className="shrink-0 text-xs text-ink-2">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
            </span>
            <button type="button" onClick={() => setFile(null)} aria-label="Remove file" className="shrink-0 text-ink-2 hover:text-red-400">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label
            htmlFor="resume"
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-bg-2/40 px-4 py-8 text-center transition-colors hover:border-accent/50"
          >
            <FileUp className="h-5 w-5 text-accent2" />
            <span className="text-sm text-ink-2">Click to upload — {ACCEPTED.join(", ")}</span>
          </label>
        )}
        <input id="resume" name="resume" type="file" accept={ACCEPTED.join(",")} onChange={onFileChange} className="sr-only" required />
        {fileError && <p className="mt-2 text-xs text-red-400">{fileError}</p>}
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-[15px] font-medium text-white transition-all hover:bg-[#6E7BFF] hover:shadow-[0_0_28px_rgba(88,101,242,0.45)] disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Submit application
          </>
        )}
      </button>

      <p className="text-xs leading-relaxed text-ink-2">
        Your application data is stored securely and used only for recruitment evaluation in line with
        our privacy practices.
      </p>
    </form>
  );
}
