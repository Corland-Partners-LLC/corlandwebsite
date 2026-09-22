import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import Button from "@/components/Button";
import { company } from "@/content/company";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Get in touch with ${company.name} in Grandview, TX — send a message or book a consultation directly.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      </Container>

      <section className="py-12">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              kicker="Contact"
              heading="Let's Talk"
              subhead="Send us a message and we'll be in touch, or book a consultation directly on our calendar."
            />

            <div className="mt-8 space-y-4 font-body text-navy-800">
              <p>
                <span className="font-heading font-semibold">Address:</span>
                <br />
                {company.address.street}
                <br />
                {company.address.city}, {company.address.state}{" "}
                {company.address.zip}
              </p>
              <p>
                <span className="font-heading font-semibold">Phone:</span>{" "}
                <a href={company.phoneHref} className="text-teal-700 hover:underline">
                  {company.phone}
                </a>
              </p>
              <p>
                <span className="font-heading font-semibold">Email:</span>{" "}
                <a
                  href={`mailto:${company.email}`}
                  className="text-teal-700 hover:underline"
                >
                  {company.email}
                </a>
              </p>
            </div>

            <Button href={company.bookingUrl} variant="primary" className="mt-8">
              Book an Appointment with Leland
            </Button>
          </div>

          <div className="rounded-lg border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
