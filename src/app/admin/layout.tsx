import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Rynevo Technologys administration dashboard.",
  robots: { index: false, follow: false },
};

// The admin area lives outside the public navbar/footer chrome.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-svh">{children}</div>;
}
