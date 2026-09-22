import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTASection from "@/components/CTASection";
import ImpactCard from "@/components/ImpactCard";
import { company } from "@/content/company";
import { impact } from "@/content/impact";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: company.aboutParagraphs[0],
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      </Container>

      {/* Editorial split: a pull-quote statement anchors the left column
          while the four aboutParagraphs read as a story on the right,
          rather than stacking with no hierarchy. */}
      <section className="py-12 sm:py-16">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-heading text-sm font-semibold uppercase tracking-widest text-teal-700">
              About Us
            </p>
            <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
              {company.tagline}
            </h1>
            <blockquote className="relative mt-8 border-l-4 border-teal-500 pl-6">
              <p className="font-heading text-xl font-medium italic leading-snug text-navy-800 sm:text-2xl">
                &ldquo;{company.missionStatement}&rdquo;
              </p>
            </blockquote>
          </div>

          <div className="space-y-6 font-body text-lg leading-relaxed text-navy-800">
            {company.aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-16 sm:py-20">
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
