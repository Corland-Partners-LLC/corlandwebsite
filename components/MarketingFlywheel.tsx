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
 * The Marketing Flywheel: one wheel diagram per stage of the customer
 * journey, each highlighting that stage's position and touch points. Shown
 * together as a gallery so the reader can see all 5 stages side by side
 * before reading the detailed paragraph for each.
 */
export default function MarketingFlywheel() {
  return (
    <div
      role="img"
      aria-label="The Marketing Flywheel: five wheel diagrams, one for each stage of the customer journey — Awareness, Consideration, Sales/Decision, Fulfillment, and Customer Service — each highlighting that stage's touch points around a central customer."
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
    >
      {stages.map((stage) => (
        <figure
          key={stage.name}
          className="flex flex-col items-center gap-2 rounded-lg border border-navy-100 bg-white p-3"
        >
          <Image
            src={stage.src}
            alt=""
            aria-hidden="true"
            width={1920}
            height={1080}
            className="h-auto w-full"
          />
          <figcaption className="font-heading text-xs font-bold uppercase tracking-wide text-navy-800 sm:text-sm">
            {stage.name}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
