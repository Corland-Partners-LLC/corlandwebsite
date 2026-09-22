import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { company } from "@/content/company";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Suite of Services",
  description: company.servicesSubhead,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Container>
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Suite of Services" }]}
        />
      </Container>

      <section className="py-12">
        <Container>
          <SectionHeading
            level="h1"
            kicker="Suite of Services"
            heading="How We Help Kingdom Businesses Grow"
            subhead={company.servicesSubhead}
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} headingLevel="h2" {...service} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
