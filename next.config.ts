import type { NextConfig } from "next";

/**
 * Permanent redirects from the old corlandpartners.com (WordPress/Avada)
 * URL structure to this rebuild's routes. The old site had exactly 7 real
 * pages (confirmed via its Yoast page-sitemap.xml) plus one default
 * WordPress "Uncategorized" category archive — every one of them is
 * listed here, either mapped to its real equivalent or sent to the
 * homepage where no equivalent exists.
 *
 * Sources are listed without a trailing slash. The old site's own URLs
 * all had one (e.g. /organizational/), but Next (trailingSlash: false,
 * the default) strips it via its own permanent redirect before these
 * rules are even evaluated — so a slash-form request becomes a 2-hop
 * chain (old-with-slash -> old-without-slash -> new path), both hops
 * permanent. That's fully fine for SEO (search engines follow permanent
 * redirect chains) and adding slash-form entries here wouldn't change
 * it, since they'd never be reached.
 */
const legacyRedirects = [
  { source: "organizational", destination: "/business-pillars/organizational" },
  { source: "operational", destination: "/business-pillars/operational" },
  { source: "financial", destination: "/business-pillars/financial" },
  // The old site's "Marketing and Sales Model" pillar lived at /marketing/;
  // this rebuild uses the more specific /marketing-sales to match the
  // pillar's actual name and avoid ambiguity with the Suite of Services'
  // "Marketing Assistance" service.
  { source: "marketing", destination: "/business-pillars/marketing-sales" },
  // /investors/ was empty on the old site (no real content ever existed
  // there) and was intentionally dropped from this rebuild — send it home
  // rather than to a 404.
  { source: "investors", destination: "/" },
  // /leland/ hosted an embedded Google Calendar booking widget for Leland
  // specifically. The rebuild's booking CTA and calendar link now live on
  // the Contact page, which is the closest real equivalent.
  { source: "leland", destination: "/contact" },
  // Default WordPress "Uncategorized" category archive — never had real
  // content, but was picked up by the old site's Yoast category-sitemap.xml
  // so it may be indexed.
  { source: "category/uncategorized", destination: "/" },
].map(({ source, destination }) => ({
  source: `/${source}`,
  destination,
  permanent: true,
}));

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
