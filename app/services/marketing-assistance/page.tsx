import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTASection from "@/components/CTASection";
import { getServiceBySlug } from "@/content/services";

const service = getServiceBySlug("marketing-assistance");

export const metadata: Metadata = {
  title: service?.title ?? "Marketing Assistance",
  description: service?.description,
};

export default function MarketingAssistanceServicePage() {
  if (!service) {
    notFound();
  }

  return (
    <>
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Suite of Services", href: "/services" },
            { label: service.title },
          ]}
        />
      </Container>

      <section className="py-12">
        <Container className="max-w-3xl">
          <SectionHeading kicker="Service" heading={service.title} />
          <p className="mt-8 font-body text-lg leading-relaxed text-navy-800">
            {service.description}
          </p>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
