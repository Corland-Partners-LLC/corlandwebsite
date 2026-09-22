import Button from "./Button";
import Container from "./Container";
import { company } from "@/content/company";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-600 text-white">
      <Container className="flex flex-col items-start gap-6 py-20 sm:py-28">
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-teal-300 sm:text-sm">
          {company.heroKicker}
        </p>
        <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
          {company.heroHeadline}
        </h1>
        <p className="max-w-2xl font-body text-lg text-navy-100 sm:text-xl">
          {company.heroSubhead}
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <Button href={company.bookingUrl} variant="secondary">
            Book a Consultation
          </Button>
          <Button href="/about" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-900">
            Learn More
          </Button>
        </div>
      </Container>
    </section>
  );
}
