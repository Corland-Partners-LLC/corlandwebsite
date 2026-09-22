import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import Button from "./Button";
import { company } from "@/content/company";
import { services } from "@/content/services";

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/business-pillars", label: "Business Pillars" },
  { href: "/services", label: "Suite of Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-neutral-300">
      <Container className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/logo/corland-partners-mark.png"
            alt=""
            aria-hidden="true"
            width={526}
            height={404}
            className="h-10 w-auto"
          />
          <p className="mt-3 font-heading text-lg font-extrabold text-white">
            {company.name}
          </p>
          <p className="mt-3 text-sm leading-relaxed">{company.tagline}</p>
          <Button
            href={company.bookingUrl}
            variant="secondary"
            className="mt-5"
          >
            Book a Consultation
          </Button>
        </div>

        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-wide text-teal-400">
            Quick Links
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-wide text-teal-400">
            Services
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="transition-colors hover:text-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-wide text-teal-400">
            Contact
          </p>
          <address className="mt-4 space-y-2 text-sm not-italic">
            <p>
              {company.address.street}
              <br />
              {company.address.city}, {company.address.state}{" "}
              {company.address.zip}
            </p>
            <p>
              <a
                href={company.phoneHref}
                className="transition-colors hover:text-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
              >
                {company.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${company.email}`}
                className="transition-colors hover:text-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
              >
                {company.email}
              </a>
            </p>
            <p>
              <a
                href={company.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
              >
                Facebook
              </a>
            </p>
          </address>
        </div>
      </Container>

      <div className="border-t border-neutral-700">
        <Container className="flex flex-col gap-3 py-6 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {company.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link
              href="/privacy"
              className="transition-colors hover:text-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
            >
              Terms of Use
            </Link>
            <a
              href={company.transparencyInCoverageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
            >
              Transparency in Coverage
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
