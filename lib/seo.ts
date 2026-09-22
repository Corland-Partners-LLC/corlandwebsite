import type { Metadata } from "next";
import { company } from "@/content/company";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.corlandpartners.com";

/** Default Open Graph / Twitter card image, shared by every page that
 * doesn't supply its own. 1200x630 (the standard OG size), branded with
 * the Corland Partners mark, name, and tagline. */
const defaultOgImage = {
  url: `${siteUrl}/images/og-default.png`,
  width: 1200,
  height: 630,
  alt: `${company.name} — ${company.tagline}`,
};

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
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage.url],
    },
  };
}
