import Button from "./Button";
import Container from "./Container";
import { company } from "@/content/company";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-600 text-white">
      {/* Decorative abstract geometry — echoes the interlocking-diamond
          motif of the logo. Purely ornamental, built with inline SVG
          (no photography, no external image assets). */}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 800 800"
        className="pointer-events-none absolute -right-40 -top-28 h-[28rem] w-[28rem] text-white opacity-[0.08] sm:-right-24 sm:h-[36rem] sm:w-[36rem] lg:-right-10 lg:top-1/2 lg:h-[44rem] lg:w-[44rem] lg:-translate-y-1/2 lg:opacity-[0.12]"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="180" y="180" width="300" height="300" transform="rotate(45 330 330)" />
          <rect x="255" y="255" width="220" height="220" transform="rotate(45 365 365)" className="text-teal-300" />
          <rect x="335" y="335" width="140" height="140" transform="rotate(45 405 405)" />
        </g>
        <g fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal-300">
          <rect x="440" y="60" width="170" height="170" transform="rotate(45 525 145)" />
        </g>
      </svg>

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
