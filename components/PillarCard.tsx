import Link from "next/link";
import type { Pillar } from "@/content/pillars";

type PillarCardProps = Pillar & {
  index?: number;
  /** Heading level for the card title. Defaults to "h3" (cards nested under
   * an "h2" SectionHeading). Pass "h2" when the card grid sits directly
   * under a page's "h1" with no intervening heading, to avoid skipping a
   * level. */
  headingLevel?: "h2" | "h3";
};

export default function PillarCard({
  slug,
  title,
  teaser,
  index,
  headingLevel = "h3",
}: PillarCardProps) {
  const number = typeof index === "number" ? String(index + 1).padStart(2, "0") : null;
  const Heading = headingLevel;

  return (
    <Link
      href={`/business-pillars/${slug}`}
      className="group flex h-full flex-col border-t-4 border-navy-200 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-500 hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:border-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
    >
      {number ? (
        <span className="font-heading text-xs font-semibold uppercase tracking-widest text-teal-700">
          Pillar {number}
        </span>
      ) : null}
      <Heading className="mt-3 font-heading text-xl font-bold text-navy-900">
        {title}
      </Heading>
      <p className="mt-3 line-clamp-4 font-body text-sm leading-relaxed text-navy-700">
        {teaser}
      </p>
      <span className="mt-6 inline-flex items-center font-heading text-sm font-semibold text-navy-700 transition-colors duration-200 group-hover:text-teal-700">
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
