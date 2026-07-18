import type { Metadata } from "next";
import { ROLES } from "@/lib/roles";
import { SITE } from "@/lib/site";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://hreysolutions.com"
).replace(/\/$/, "");

export const DEFAULT_DESCRIPTION =
  "Aurex Solutions: recruiting hospitality a Roma. Candidati per lavoro come cameriere, barista, cuoco o hostess. Selezione riservata su tutto il territorio nazionale.";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle =
    title === SITE.name
      ? `${SITE.name} — lavoro camerieri, baristi, cuochi, hostess a Roma`
      : title;

  return {
    title,
    description,
    keywords: [
      "Aurex Solutions",
      "lavoro Roma",
      "recruiting hospitality",
      "cameriere Roma",
      "barista Roma",
      "cuoco Roma",
      "hostess Roma",
      "Ho.Re.Ca.",
      ...keywords,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      locale: "it_IT",
      type: "website",
      images: [
        {
          url: absoluteUrl("/gallery/catering-chef.png"),
          width: 1200,
          height: 800,
          alt: `${SITE.name} — hospitality e recruiting`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl("/gallery/catering-chef.png")],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: SITE.name,
    url: SITE_URL,
    email: SITE.email,
    description: DEFAULT_DESCRIPTION,
    areaServed: [
      { "@type": "City", name: "Roma" },
      { "@type": "Country", name: "Italia" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Roma",
      addressCountry: "IT",
    },
    sameAs: [],
    knowsAbout: [
      "Ho.Re.Ca.",
      "Recruiting",
      "Camerieri",
      "Baristi",
      "Cuochi",
      "Hostess",
      "Logistica",
      "Settore commerciale",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE_URL,
    inLanguage: "it-IT",
    description: DEFAULT_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
    },
  };
}

export function roleJobJsonLd(slug: string) {
  const role = ROLES.find((r) => r.slug === slug);
  if (!role) return null;

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.description,
    datePosted: new Date().toISOString().slice(0, 10),
    hiringOrganization: {
      "@type": "Organization",
      name: SITE.name,
      sameAs: SITE_URL,
      email: SITE.email,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Roma",
        addressRegion: "RM",
        addressCountry: "IT",
      },
    },
    employmentType: ["FULL_TIME", "PART_TIME", "TEMPORARY"],
    industry: "Ho.Re.Ca.",
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Italia",
    },
    directApply: true,
    url: absoluteUrl(`/${role.slug}`),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
