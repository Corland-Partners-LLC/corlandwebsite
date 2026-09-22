import type { ImpactItem } from "@/content/impact";

export default function ImpactCard({ title, body }: ImpactItem) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-navy-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="font-heading text-lg font-bold tracking-wide text-navy-900">
        {title}
      </h3>
      <p className="mt-3 font-body text-sm leading-relaxed text-navy-700">
        {body}
      </p>
    </div>
  );
}
