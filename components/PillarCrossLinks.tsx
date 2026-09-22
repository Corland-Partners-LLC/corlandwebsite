import Link from "next/link";
import Container from "./Container";
import { pillars } from "@/content/pillars";

/**
 * "See the other pillars" cross-link section shown at the bottom of each
 * individual pillar page. Both the heading and each row item are real
 * working links (the original live site had a dead label here — this
 * rebuild fixes that into working navigation).
 */
export default function PillarCrossLinks({ currentSlug }: { currentSlug: string }) {
  const otherPillars = pillars.filter((pillar) => pillar.slug !== currentSlug);

  return (
    <section className="border-t border-navy-100 bg-navy-50 py-16 sm:py-20">
      <Container>
        <Link
          href="/business-pillars"
          className="group inline-flex items-baseline gap-2 font-heading text-2xl font-bold text-navy-900 transition-colors hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:text-3xl"
        >
          Explore the Other Pillars
          <span
            aria-hidden="true"
            className="text-lg transition-transform duration-200 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {otherPillars.map((pillar, index) => (
            <Link
              key={pillar.slug}
              href={`/business-pillars/${pillar.slug}`}
              className="group flex items-center gap-4 rounded-md border border-navy-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-500 hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:border-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-navy-200 font-heading text-sm font-bold text-navy-500 transition-colors duration-200 group-hover:border-teal-400 group-hover:text-teal-600"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-heading text-base font-semibold text-navy-900 transition-colors duration-200 group-hover:text-teal-700">
                {pillar.title}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
