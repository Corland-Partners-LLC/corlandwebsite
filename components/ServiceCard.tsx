import Link from "next/link";
import type { Service } from "@/content/services";

type ServiceCardProps = Service & {
  /** Heading level for the card title. Defaults to "h3" (cards nested under
   * an "h2" SectionHeading). Pass "h2" when the card grid sits directly
   * under a page's "h1" with no intervening heading, to avoid skipping a
   * level. */
  headingLevel?: "h2" | "h3";
};

export default function ServiceCard({
  slug,
  title,
  description,
  headingLevel = "h3",
}: ServiceCardProps) {
  const Heading = headingLevel;

  return (
    <Link
      href={`/services/${slug}`}
      className="group flex h-full flex-col rounded-md border border-navy-100 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:border-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
    >
      <Heading className="font-heading text-lg font-bold text-navy-900 transition-colors duration-200 group-hover:text-teal-700">
        {title}
      </Heading>
      <p className="mt-3 line-clamp-4 font-body text-sm leading-relaxed text-navy-700">
        {description}
      </p>
      <span className="mt-5 inline-flex items-center font-heading text-sm font-semibold text-teal-700">
        Learn more
        <span
          aria-hidden="true"
          className="ml-1 transition-transform duration-200 group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </span>
    </Link>
  );
}
