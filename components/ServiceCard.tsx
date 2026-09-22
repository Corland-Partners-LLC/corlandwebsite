import Link from "next/link";
import type { Service } from "@/content/services";

export default function ServiceCard({ slug, title, description }: Service) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group flex h-full flex-col rounded-lg border border-navy-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
    >
      <h3 className="font-heading text-xl font-bold text-navy-900 group-hover:text-teal-700">
        {title}
      </h3>
      <p className="mt-3 line-clamp-4 font-body text-sm leading-relaxed text-navy-700">
        {description}
      </p>
      <span className="mt-4 font-heading text-sm font-semibold text-teal-700">
        Learn more &rarr;
      </span>
    </Link>
  );
}
