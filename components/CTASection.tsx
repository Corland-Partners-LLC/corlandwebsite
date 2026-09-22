import Button from "./Button";
import Container from "./Container";
import { company } from "@/content/company";

type CTASectionProps = {
  heading?: string;
  subhead?: string;
  buttonLabel?: string;
  href?: string;
};

export default function CTASection({
  heading = "Ready to build a sustainable kingdom business?",
  subhead = "Let's talk about where your organization is today and where God is calling it to go.",
  buttonLabel = "Book a Consultation",
  href = company.bookingUrl,
}: CTASectionProps) {
  return (
    <section className="bg-navy-900">
      <Container className="flex flex-col items-center gap-6 py-16 text-center text-white">
        <h2 className="max-w-2xl font-heading text-3xl font-bold sm:text-4xl">
          {heading}
        </h2>
        <p className="max-w-xl font-body text-navy-100">{subhead}</p>
        <Button href={href} variant="secondary">
          {buttonLabel}
        </Button>
      </Container>
    </section>
  );
}
