import type { ImpactItem } from "@/content/impact";

const numerals = ["I", "II", "III", "IV", "V"];

type ImpactCardProps = ImpactItem & { index?: number };

export default function ImpactCard({ title, body, index }: ImpactCardProps) {
  const numeral = typeof index === "number" ? numerals[index] ?? String(index + 1) : null;

  return (
    <div className="group flex flex-col items-start text-left">
      {numeral ? (
        <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-navy-200 bg-white font-heading text-lg font-bold text-navy-500 transition-colors duration-200 group-hover:border-teal-400 group-hover:text-teal-600">
          {numeral}
        </span>
      ) : null}
      <h3 className="mt-6 font-heading text-lg font-bold tracking-wide text-navy-900">
        {title}
      </h3>
      <span
        aria-hidden="true"
        className="mt-3 block h-0.5 w-10 bg-teal-500 transition-all duration-300 group-hover:w-16"
      />
      <p className="mt-4 font-body text-base leading-relaxed text-navy-700">
        {body}
      </p>
    </div>
  );
}
