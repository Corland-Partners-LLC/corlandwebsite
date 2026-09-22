type SectionHeadingProps = {
  kicker?: string;
  heading: string;
  subhead?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionHeading({
  kicker,
  heading,
  subhead,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

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
      <h2
        className={`font-heading text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        {heading}
      </h2>
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
