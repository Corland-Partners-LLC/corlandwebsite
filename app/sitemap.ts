import type { MetadataRoute } from "next";
import { pillars } from "@/content/pillars";
import { services } from "@/content/services";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.corlandpartners.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/business-pillars",
    "/services",
    "/faq",
    "/contact",
  ];

  const pillarRoutes = pillars.map((pillar) => `/business-pillars/${pillar.slug}`);
  const serviceRoutes = services.map((service) => `/services/${service.slug}`);

  const routes = [...staticRoutes, ...pillarRoutes, ...serviceRoutes];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
