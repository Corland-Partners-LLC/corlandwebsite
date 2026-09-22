import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import PillarBody from "@/components/PillarBody";
import PillarCrossLinks from "@/components/PillarCrossLinks";
import CTASection from "@/components/CTASection";
import { getPillarBySlug } from "@/content/pillars";
import { pageMetadata } from "@/lib/seo";

const pillar = getPillarBySlug("financial");

export const metadata: Metadata = pageMetadata({
  title: pillar?.title ?? "Financial Model",
  description: pillar?.teaser ?? "",
  path: "/business-pillars/financial",
});

export default function FinancialPillarPage() {
  if (!pillar) {
    notFound();
  }

  return (
    <>
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Business Pillars", href: "/business-pillars" },
            { label: pillar.title },
          ]}
        />
      </Container>

      <section className="py-12">
        <Container className="max-w-3xl">
          <SectionHeading level="h1" kicker="Business Pillar" heading={pillar.title} />
          <div className="mt-8">
            <PillarBody blocks={pillar.body} />
          </div>
        </Container>
      </section>

      <PillarCrossLinks currentSlug={pillar.slug} />

      <CTASection />
    </>
  );
}
