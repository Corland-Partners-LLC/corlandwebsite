import Image from "next/image";
import Button from "./Button";
import Container from "./Container";
import { company } from "@/content/company";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <Image
        src="/images/hero-partnership.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-60"
      />
      {/* Gradient scrim over the photo so hero text stays legible at every
          width, strongest on the left where the headline sits. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/50"
      />

      <Container className="relative flex flex-col items-start gap-6 py-24 sm:py-32">
        <p className="max-w-xl font-heading text-xs font-semibold uppercase tracking-[0.2em] text-teal-300 sm:max-w-2xl sm:text-sm">
          {company.heroKicker}
        </p>
        <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
          {company.heroHeadline}
        </h1>
        <p className="max-w-2xl font-body text-lg text-navy-100 sm:text-xl">
          {company.heroSubhead}
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <Button href="/services" variant="secondary">
            Explore Our Services
          </Button>
          <Button
            href="/contact"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-navy-900"
          >
            Contact Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
