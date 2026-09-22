import type { Metadata } from "next";
import { company } from "@/content/company";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.corlandpartners.com";

type PageSeoInput = {
  /** Per-page title. The root layout's "%s | Corland Partners" template
   * applies this automatically — do not repeat the site name here. */
  title: string;
  description: string;
  /** Absolute-from-root path, e.g. "/about" or "/" for the homepage. */
  path: string;
};

/**
 * Builds the per-page `Metadata` object (canonical, Open Graph, Twitter)
 * shared by every route, so each `page.tsx` only has to supply the
 * page-specific title/description/path instead of repeating the same
 * openGraph/twitter boilerplate everywhere.
 */
/** `Service` JSON-LD for an individual service page — name + description
 * only, provided by the organization. No fabricated ratings/reviews. */
export function serviceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${siteUrl}${path}`,
    provider: {
      "@type": "Organization",
      name: company.name,
      url: siteUrl,
    },
  };
}

export function pageMetadata({ title, description, path }: PageSeoInput): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: company.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
