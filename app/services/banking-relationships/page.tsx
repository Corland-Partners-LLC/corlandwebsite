import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTASection from "@/components/CTASection";
import { getServiceBySlug } from "@/content/services";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

const service = getServiceBySlug("banking-relationships");
const path = "/services/banking-relationships";

export const metadata: Metadata = pageMetadata({
  title: service?.title ?? "Banking Relationships",
  description: service?.description ?? "",
  path,
});

export default function BankingRelationshipsServicePage() {
  if (!service) {
    notFound();
  }

  const jsonLd = serviceJsonLd({ name: service.title, description: service.description, path });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Suite of Services", href: "/services" },
            { label: service.title },
          ]}
        />
      </Container>

      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <SectionHeading level="h1" kicker="Service" heading={service.title} />
          <p className="mt-8 font-body text-lg leading-relaxed text-navy-800">
            {service.description}
          </p>

          <Link
            href="/services"
            className="group mt-10 inline-flex items-center gap-2 rounded-md border border-navy-200 bg-navy-50 px-5 py-3 font-heading text-sm font-semibold text-navy-800 transition-colors duration-200 hover:border-teal-400 hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            Part of our Suite of Services
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
