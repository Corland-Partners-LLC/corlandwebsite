import type { LegalDocument as LegalDocumentType } from "@/content/legal";

export default function LegalDocument({ title, effectiveDate, intro, sections }: LegalDocumentType) {
  return (
    <article>
      <h1 className="font-heading text-3xl font-bold text-navy-900 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-2 font-body text-sm text-navy-600">
        Effective: {effectiveDate}
      </p>

      <div className="mt-8 space-y-4 font-body text-base leading-relaxed text-navy-800">
        {intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-10 space-y-10">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-heading text-xl font-bold text-navy-900">
              {section.heading}
            </h2>
            <div className="mt-3 space-y-4 font-body text-base leading-relaxed text-navy-800">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.list ? (
                <ul className="list-disc space-y-2 pl-6">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
