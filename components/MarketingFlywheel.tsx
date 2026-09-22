import Image from "next/image";

const stages = [
  {
    name: "Awareness",
    src: "/images/pillars/marketing-flywheel-awareness.jpg",
  },
  {
    name: "Consideration",
    src: "/images/pillars/marketing-flywheel-consideration.jpg",
  },
  {
    name: "Sales/Decision",
    src: "/images/pillars/marketing-flywheel-sales-decision.jpg",
  },
  {
    name: "Fulfillment",
    src: "/images/pillars/marketing-flywheel-fulfillment.jpg",
  },
  {
    name: "Customer Service",
    src: "/images/pillars/marketing-flywheel-customer-service.jpg",
  },
];

/**
 * The Marketing Flywheel: the full wheel shown large up top, followed by
 * one wheel diagram per stage of the customer journey, each highlighting
 * that stage's position and touch points.
 */
export default function MarketingFlywheel() {
  return (
    <div>
      <figure className="mx-auto max-w-2xl">
        <Image
          src="/images/pillars/marketing-flywheel-full.jpg"
          alt="The Marketing Flywheel: a wheel with five stages around a central customer hub — Awareness, Consideration, Sales/Decision, Fulfillment, and Customer Service — each shown with its key touch points."
          width={1920}
          height={1080}
          className="h-auto w-full"
        />
        <figcaption className="mt-3 text-center font-heading text-sm font-bold uppercase tracking-wide text-navy-800">
          The Marketing Flywheel
        </figcaption>
      </figure>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stages.map((stage) => (
          <figure
            key={stage.name}
            className="flex flex-col items-center gap-3 rounded-lg border border-navy-100 bg-white p-4"
          >
            <Image
              src={stage.src}
              alt=""
              aria-hidden="true"
              width={1920}
              height={1080}
              className="h-auto w-full"
            />
            <figcaption className="font-heading text-sm font-bold uppercase tracking-wide text-navy-800">
              {stage.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
