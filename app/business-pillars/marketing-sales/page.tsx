import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import PillarBody from "@/components/PillarBody";
import CTASection from "@/components/CTASection";
import { getPillarBySlug } from "@/content/pillars";

const pillar = getPillarBySlug("marketing-sales");

export const metadata: Metadata = {
  title: pillar?.title ?? "Marketing and Sales Model",
  description: pillar?.teaser,
};

export default function MarketingSalesPillarPage() {
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
          <SectionHeading kicker="Business Pillar" heading={pillar.title} />
          <div className="mt-8">
            <PillarBody blocks={pillar.body} />
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
