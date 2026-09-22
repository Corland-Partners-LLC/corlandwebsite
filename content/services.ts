export type Service = {
  slug: string;
  title: string;
  description: string;
  /** Path under public/ for this service's icon, matched from the live
   * reference site. Not every service has one yet — more are on the way. */
  icon?: string;
};

export const services: Service[] = [
  {
    slug: "organizational-health",
    title: "Organizational Health",
    description:
      "Relationships are key. Individual strengths that cannot be assimilated well into the organization produce little value. Organizational team health is determined by measuring the health and strength of the individuals and the relationships between them as a team. Corland Partners has developed a very simple process to measure this.",
    icon: "/images/services/organizational-health.png",
  },
  {
    slug: "marketing-assistance",
    title: "Marketing Assistance",
    description:
      "Corland Partners created a tool called the Marketing Flywheel. It is a customer-centric model with clearly defined stages of the customer experience. The customer should experience the same level of excellence through all 5 stages.",
    icon: "/images/services/marketing-assistance.png",
  },
  {
    slug: "leader-development",
    title: "Leader Development",
    description:
      "Corland Partners is certified by LivePlan in business plan development. We believe every business should have a written business plan where the vision, mission, core values and operating plans are clearly communicated and shared by everyone in the organization beginning with its leaders.",
    icon: "/images/services/leader-development.png",
  },
  {
    slug: "website-development",
    title: "Website Development",
    description:
      "Our approach to website development is customer-centric. A website should clearly communicate your unique value proposition by buyer persona. We offer hosting on AWS (Amazon) secure dedicated servers. Our websites have a higher than 99% up-time. Our multi-store plugin can send leads directly to HubSpot and assign the leads to the appropriate sales person, or it can round robin the leads.",
    icon: "/images/services/website-development.png",
  },
  {
    slug: "sales-team-training",
    title: "Sales Team Training",
    description:
      "With access to numerous in house and 3rd party tools, we are able to assist in sales team training at whatever level your company needs. Training and implementation of these tools is the basis of our operational model.",
    icon: "/images/services/sales-team-training.png",
  },
  {
    slug: "purchasing-power",
    title: "Purchasing Power",
    description:
      "At Corland Partners we believe in creating self-sustaining kingdom businesses, and therefore create custom business plans that fit each individual company and their long term goals that will result in purchasing power for your business.",
    icon: "/images/services/purchasing-power.png",
  },
  {
    slug: "banking-relationships",
    title: "Banking Relationships",
    description:
      "With years of business experience behind us, Corland Partners is able to bring with it an array of knowledge and contacts within the financial realm to assist in your business growth needs.",
    icon: "/images/services/banking-relationships.png",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
