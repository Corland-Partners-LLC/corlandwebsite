import type { MetadataRoute } from "next";
import { pillars } from "@/content/pillars";
import { services } from "@/content/services";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.corlandpartners.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: { route: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    { route: "", changeFrequency: "monthly", priority: 1 },
    { route: "/about", changeFrequency: "yearly", priority: 0.7 },
    { route: "/business-pillars", changeFrequency: "monthly", priority: 0.9 },
    { route: "/services", changeFrequency: "monthly", priority: 0.9 },
    { route: "/faq", changeFrequency: "monthly", priority: 0.6 },
    { route: "/contact", changeFrequency: "yearly", priority: 0.6 },
  ];

  const pillarRoutes = pillars.map((pillar) => ({
    route: `/business-pillars/${pillar.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const serviceRoutes = services.map((service) => ({
    route: `/services/${service.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const routes = [...staticRoutes, ...pillarRoutes, ...serviceRoutes];

  return routes.map(({ route, changeFrequency, priority }) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
