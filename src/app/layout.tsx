import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { PageTransition } from "@/components/page-transition";
import { BackToTop } from "@/components/back-to-top";
import { site } from "@/lib/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Software, AI & Digital Product Development`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: ["software development", "AI development", "web development", "mobile apps", "Rynevo Technologys"],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Software, AI & Digital Product Development`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080B12" },
    { media: "(prefers-color-scheme: light)", color: "#F6F8FC" },
  ],
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.description,
  sameAs: [site.social.instagram, site.social.github],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Business inquiries",
    email: site.contact.email,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} ${display.variable} font-sans`}>
        <ThemeProvider>
          <Navbar />
          <div id="top" />
          <div id="main" className="min-h-svh">
            <PageTransition>{children}</PageTransition>
          </div>
          <Footer />
          <BackToTop />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
