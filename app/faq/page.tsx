import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import { faq } from "@/content/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about Corland Partners and kingdom business.",
  path: "/faq",
});

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      </Container>

      <section className="py-12">
        <Container className="max-w-3xl">
          <SectionHeading
            level="h1"
            kicker="FAQ"
            heading="Frequently Asked Questions"
            align="center"
          />
          <div className="mt-10">
            <FAQAccordion items={faq} headingLevel="h2" />
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
