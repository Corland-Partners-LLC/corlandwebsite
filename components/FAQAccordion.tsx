"use client";

import { useId, useState } from "react";
import { faq as defaultFaq, type FaqItem } from "@/content/faq";

type FAQAccordionProps = {
  items?: FaqItem[];
  /** Heading level wrapping each question trigger. Defaults to "h3" (used
   * under an "h2" SectionHeading, e.g. the homepage's FAQ section). Pass
   * "h2" when the accordion sits directly under a page's "h1" with no
   * intervening heading, such as the standalone /faq page. */
  headingLevel?: "h2" | "h3";
};

export default function FAQAccordion({
  items = defaultFaq,
  headingLevel = "h3",
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const uid = useId();
  const Heading = headingLevel;

  return (
    <div className="divide-y divide-navy-100 rounded-md border border-navy-100 bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${uid}-panel-${index}`;
        const buttonId = `${uid}-button-${index}`;

        return (
          <div key={item.question}>
            <Heading>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-heading text-base font-semibold text-navy-900 transition-colors duration-150 hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={`flex h-6 w-6 shrink-0 items-center justify-center text-2xl leading-none text-teal-700 transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </Heading>
            {/* grid-rows 0fr -> 1fr animates height to fit content of any
                length without a hardcoded max-height, and collapses to a
                snap open/close under prefers-reduced-motion (see globals.css). */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 font-body text-sm leading-relaxed text-navy-700">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
