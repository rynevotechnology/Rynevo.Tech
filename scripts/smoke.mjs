/* Smoke test for admin flow + careers apply API (run with: node scripts/smoke.mjs) */
const b = "http://localhost:3100";
const out = {};

const admin = await fetch(b + "/admin", { redirect: "manual" });
out.adminStatus = admin.status;
out.adminLocation = (admin.headers.get("location") || "").replace("http://localhost:3100", "");

const loginPage = await fetch(b + "/admin/login");
out.loginPage = loginPage.status;

const loginRes = await fetch(b + "/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "admin@rynevotechnologys.com", password: "change-me-please-1f3a9" }),
});
const sess = (loginRes.headers.get("set-cookie") || "").split(";")[0];
const adminAuthed = await fetch(b + "/admin", { redirect: "manual", headers: { Cookie: sess } });
out.adminAuthed = adminAuthed.status;

// Jobs + careers apply API
const jobId = process.env.SMOKE_JOB_ID;
if (jobId) {
  const fd = new FormData();
  fd.append("jobId", jobId);
  fd.append("name", "Smoke Applicant");
  fd.append("email", "app@smoke.dev");
  fd.append("experienceYears", "3");
  fd.append("location", "Remote City");
  fd.append("coverLetter", "Automated smoke application.");
  fd.append("website", "");
  fd.append("resume", new File(["fake pdf content for smoke test"], "resume.pdf", { type: "application/pdf" }));
  const apply = await fetch(b + "/api/careers/apply", { method: "POST", body: fd });
  out.applyStatus = apply.status;

  const fd2 = new FormData();
  fd2.append("jobId", jobId);
  fd2.append("name", "Bad File");
  fd2.append("email", "b@smoke.dev");
  fd2.append("experienceYears", "1");
  fd2.append("resume", new File(["x"], "evil.exe", { type: "application/octet-stream" }));
  const badApply = await fetch(b + "/api/careers/apply", { method: "POST", body: fd2 });
  out.badResumeRejected = badApply.status;
}

const list = await fetch(b + "/api/admin/applications", { headers: { Cookie: sess } });
const lb = await list.json();
out.applicationsCount = lb.items?.length;

if (lb.items?.length) {
  const patch = await fetch(b + `/api/admin/applications/${lb.items[0].id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Cookie: sess },
    body: JSON.stringify({ status: "REVIEWING" }),
  });
  out.patchStatus = patch.status;
}

console.log(JSON.stringify(out, null, 2));
