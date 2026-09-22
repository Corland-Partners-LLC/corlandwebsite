import type { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/Hero";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import PillarCard from "@/components/PillarCard";
import ServiceCard from "@/components/ServiceCard";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import Button from "@/components/Button";
import { company } from "@/content/company";
import { impact } from "@/content/impact";
import { pillars } from "@/content/pillars";
import { services } from "@/content/services";
import { faq } from "@/content/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: company.tagline,
  description: company.heroSubhead,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Philosophy / intro — editorial pull-quote treatment */}
      <section className="py-20 sm:py-28">
        <Container className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-teal-700">
            {company.missionIntro}
          </h2>
          <blockquote className="relative mt-8">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 select-none font-heading text-7xl leading-none text-navy-100 sm:-top-10 sm:text-8xl"
            >
              &ldquo;
            </span>
            <p className="relative font-heading text-2xl font-medium italic leading-snug text-navy-900 sm:text-3xl">
              {company.missionQuote}
            </p>
          </blockquote>
          <p className="mx-auto mt-8 max-w-xl font-body text-lg leading-relaxed text-navy-700">
            {company.missionSecondary}
          </p>
        </Container>
      </section>

      {/* 3. Sustainable Kingdom Communities — major visual moment */}
      <section className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 py-20 sm:py-28">
        <Container className="mx-auto max-w-4xl text-center">
          <span aria-hidden="true" className="mx-auto mb-8 block h-px w-16 bg-teal-400" />
          <h2 className="font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            {company.missionStatement}
          </h2>
        </Container>
      </section>

      {/* 4. Triple Bottom Line — the original site's own icon graphic,
          referenced directly per the brand's existing visual identity */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <SectionHeading kicker="Our Philosophy" heading="The Triple Bottom Line" align="center" />
          <div className="mt-12 flex justify-center">
            <Image
              src="/images/triple-bottom-line.webp"
              alt="Triple Bottom Line: Kingdom Impact, Social Impact, and Financial Impact"
              width={2000}
              height={739}
              className="h-auto w-full max-w-4xl"
            />
          </div>
          <div className="mt-14 grid grid-cols-1 gap-10 text-center sm:grid-cols-3 sm:text-left">
            {impact.map((item) => (
              <div key={item.title}>
                <h3 className="font-heading text-lg font-bold text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-3 font-body text-base leading-relaxed text-navy-700">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Four Business Pillars */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            kicker="Business Pillars"
            heading="Four Pillars of a Healthy Business"
            subhead={company.strategyIntro}
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, index) => (
              <PillarCard key={pillar.slug} index={index} {...pillar} />
            ))}
          </div>
          <div className="mt-10">
            <Button href="/business-pillars" variant="outline">
              View All Business Pillars
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-navy-900 py-16 sm:py-20">
        <Container>
          <blockquote className="mx-auto max-w-3xl text-center">
            <p className="font-heading text-2xl font-semibold italic leading-snug text-white sm:text-3xl">
              &ldquo;{company.focusQuote}&rdquo;
            </p>
          </blockquote>
        </Container>
      </section>

      {/* 6. Suite of Services */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            kicker="Suite of Services"
            heading="How We Help Kingdom Businesses Grow"
            subhead={company.servicesSubhead}
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </div>
          <div className="mt-10">
            <Button href="/services" variant="outline">
              Explore Our Services
            </Button>
          </div>
        </Container>
      </section>

      {/* 7. About teaser — editorial two-column excerpt */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-widest text-teal-700">
              About Us
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
              {company.tagline}
            </h2>
          </div>
          <div className="space-y-6 font-body text-lg leading-relaxed text-navy-800">
            <p>{company.aboutParagraphs[0]}</p>
            <p>{company.aboutParagraphs[1]}</p>
            <Button href="/about" variant="outline" className="mt-2">
              Learn More About Us
            </Button>
          </div>
        </Container>
      </section>

      {/* 8. FAQ — full accordion, same content the /faq page reuses */}
      <section className="py-20 sm:py-28">
        <Container className="max-w-3xl">
          <SectionHeading kicker="FAQ" heading="Frequently Asked Questions" align="center" />
          <div className="mt-12">
            <FAQAccordion items={faq} />
          </div>
        </Container>
      </section>

      {/* 9. Final CTA / contact band */}
      <CTASection />
    </>
  );
}
