type SectionHeadingProps = {
  kicker?: string;
  heading: string;
  subhead?: string;
  align?: "left" | "center";
  light?: boolean;
  /**
   * Heading level to render. Defaults to "h2" for subsection headings
   * (e.g. within the homepage or About page, which supply their own h1
   * elsewhere). Pages that use SectionHeading as their sole top-of-page
   * heading (Business Pillars, Services, FAQ, Contact, and their detail
   * pages) pass level="h1" so every page has exactly one h1.
   */
  level?: "h1" | "h2";
};

export default function SectionHeading({
  kicker,
  heading,
  subhead,
  align = "left",
  light = false,
  level = "h2",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const Heading = level;

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {kicker ? (
        <p
          className={`mb-2 font-heading text-sm font-semibold uppercase tracking-widest ${
            light ? "text-teal-300" : "text-teal-700"
          }`}
        >
          {kicker}
        </p>
      ) : null}
      <Heading
        className={`font-heading text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        {heading}
      </Heading>
      {subhead ? (
        <p
          className={`mt-4 font-body text-lg ${
            light ? "text-navy-100" : "text-navy-700"
          }`}
        >
          {subhead}
        </p>
      ) : null}
    </div>
  );
}
