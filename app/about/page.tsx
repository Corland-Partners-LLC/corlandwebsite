import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTASection from "@/components/CTASection";
import ImpactCard from "@/components/ImpactCard";
import { company } from "@/content/company";
import { impact } from "@/content/impact";

export const metadata: Metadata = {
  title: "About",
  description: company.aboutParagraphs[0],
};

export default function AboutPage() {
  return (
    <>
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      </Container>

      <section className="py-12">
        <Container className="max-w-3xl">
          <SectionHeading kicker="About Us" heading={`About ${company.name}`} />
          <div className="mt-8 space-y-6 font-body text-lg leading-relaxed text-navy-800">
            {company.aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-16">
        <Container>
          <SectionHeading
            kicker="Our Philosophy"
            heading="The Triple Bottom Line"
            align="center"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {impact.map((item, index) => (
              <ImpactCard key={item.title} index={index} {...item} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
