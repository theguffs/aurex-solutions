import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import {
  DEFAULT_DESCRIPTION,
  SITE_URL,
  absoluteUrl,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { SITE } from "@/lib/site";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} — lavoro camerieri, baristi, cuochi, hostess a Roma`,
    template: `%s | ${SITE.name}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "recruiting",
  keywords: [
    "Aurex Solutions",
    "lavoro cameriere Roma",
    "lavoro barista Roma",
    "lavoro cuoco Roma",
    "lavoro hostess Roma",
    "recruiting Ho.Re.Ca.",
    "selezione personale ristorazione",
    "candidatura hospitality Roma",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE.name} — selezione hospitality a Roma`,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE.name,
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: absoluteUrl("/gallery/catering-chef.png"),
        width: 1200,
        height: 800,
        alt: `${SITE.name} recruiting hospitality`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — selezione hospitality a Roma`,
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl("/gallery/catering-chef.png")],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Analytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
