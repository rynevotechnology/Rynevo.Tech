/**
 * Careers category metadata.
 *
 * NOTE: No sample job listings are seeded or published. Job openings are
 * managed from the admin dashboard and appear on /careers only once a real,
 * verified position is entered there and published.
 */

export const jobCategoryLabels: Record<string, string> = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  FULLSTACK: "Full-Stack",
  AI_ML: "AI/ML",
  DESIGN: "Design",
  QA: "QA & Testing",
  MARKETING: "Marketing",
  INTERNSHIP: "Internship",
};

export const experienceOptions = ["Any", "Entry (0-2 years)", "Mid (2-5 years)", "Senior (5+ years)"];
export const typeOptions = ["Any", "full-time", "contract", "fixed-term", "internship"];
export const locationOptions = ["Any", "Remote", "Hybrid", "On-site"];
