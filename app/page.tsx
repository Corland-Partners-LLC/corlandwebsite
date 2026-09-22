import Link from "next/link";
import Hero from "@/components/Hero";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ImpactCard from "@/components/ImpactCard";
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

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="py-20">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              kicker={company.missionIntro}
              heading={company.missionStatement}
            />
            <p className="mt-6 font-body italic text-navy-700">
              {company.missionQuote}
            </p>
            <p className="mt-4 font-body text-navy-700">
              {company.missionSecondary}
            </p>
            <Button href="/about" variant="outline" className="mt-8">
              About Corland Partners
            </Button>
          </div>
          <div className="rounded-lg bg-navy-50 p-8">
            <p className="font-heading text-lg font-semibold text-navy-900">
              The Triple Bottom Line
            </p>
            <p className="mt-2 font-body text-sm text-navy-700">
              Every Corland Partners engagement is measured against three
              kinds of impact.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-20">
        <Container>
          <SectionHeading
            kicker="Triple Bottom Line"
            heading="Kingdom, Social &amp; Financial Impact"
            align="center"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {impact.map((item) => (
              <ImpactCard key={item.title} {...item} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            kicker="Business Pillars"
            heading="Four Pillars of a Healthy Business"
            subhead={company.strategyIntro}
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <PillarCard key={pillar.slug} {...pillar} />
            ))}
          </div>
          <div className="mt-10">
            <Button href="/business-pillars" variant="primary">
              View All Business Pillars
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-navy-900 py-16 text-center">
        <Container>
          <p className="mx-auto max-w-3xl font-heading text-2xl font-semibold italic text-white sm:text-3xl">
            &ldquo;{company.focusQuote}&rdquo;
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            kicker="Suite of Services"
            heading="How We Help Kingdom Businesses Grow"
            subhead={company.servicesSubhead}
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </div>
          <div className="mt-10">
            <Button href="/services" variant="primary">
              View All Services
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-20">
        <Container className="max-w-3xl">
          <SectionHeading
            kicker="FAQ"
            heading="Frequently Asked Questions"
            align="center"
          />
          <div className="mt-10">
            <FAQAccordion items={faq} />
          </div>
          <p className="mt-6 text-center font-body text-sm text-navy-700">
            Have another question?{" "}
            <Link href="/faq" className="font-semibold text-teal-700 hover:underline">
              Visit our full FAQ page
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="font-semibold text-teal-700 hover:underline">
              contact us
            </Link>
            .
          </p>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
