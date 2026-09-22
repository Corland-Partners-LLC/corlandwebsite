import Button from "./Button";
import Container from "./Container";
import { company } from "@/content/company";

type CTASectionProps = {
  heading?: string;
  subhead?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function CTASection({
  heading = "Ready for Your Consultation?",
  subhead = "Corland Partners is here to help. Let's talk about where your organization is today and where God is calling it to go.",
  primaryLabel = "Book a Consultation",
  primaryHref = company.bookingUrl,
  secondaryLabel = "Contact Us",
  secondaryHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="bg-navy-900">
      <Container className="flex flex-col items-center gap-6 py-16 text-center text-white sm:py-20">
        <h2 className="max-w-2xl font-heading text-3xl font-bold sm:text-4xl">
          {heading}
        </h2>
        <p className="max-w-xl font-body text-navy-100">{subhead}</p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row">
          <Button href={primaryHref} variant="secondary">
            {primaryLabel}
          </Button>
          <Button
            href={secondaryHref}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-navy-900"
          >
            {secondaryLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
