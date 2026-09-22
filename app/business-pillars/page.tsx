import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import PillarCard from "@/components/PillarCard";
import CTASection from "@/components/CTASection";
import { company } from "@/content/company";
import { pillars } from "@/content/pillars";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Business Pillars",
  description: company.strategyIntro,
  path: "/business-pillars",
});

export default function BusinessPillarsPage() {
  return (
    <>
      <Container>
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Business Pillars" }]}
        />
      </Container>

      <section className="py-12">
        <Container>
          <SectionHeading
            kicker="Business Pillars"
            heading="Four Pillars of a Healthy Business"
            subhead={company.strategyIntro}
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, index) => (
              <PillarCard key={pillar.slug} index={index} {...pillar} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
