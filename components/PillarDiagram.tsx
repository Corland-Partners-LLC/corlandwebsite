const SLOT_COUNT = 4;

type PillarDiagramProps = {
  /** Which of the 4 pillar slots is active, in the site's canonical order:
   * 0 = Organizational, 1 = Operational, 2 = Financial, 3 = Marketing & Sales. */
  activeIndex: 0 | 1 | 2 | 3;
  /** The pillar's model name, shown rotated inside the highlighted column. */
  label: string;
};

/**
 * Recreates the "COACH / four pillars" structural diagram that appeared on
 * the original site's individual pillar pages (one per pillar, with that
 * page's own pillar highlighted). Built natively with CSS rather than as an
 * image asset, so it renders crisply at any size and needs no external file.
 */
export default function PillarDiagram({ activeIndex, label }: PillarDiagramProps) {
  return (
    <div
      className="mx-auto w-full max-w-xl select-none"
      role="img"
      aria-label={`Diagram of the four business pillars, with ${label} highlighted as the pillar this page covers`}
    >
      <div className="h-2 bg-navy-700" aria-hidden="true" />

      <div className="flex h-14 items-center justify-center bg-navy-800" aria-hidden="true">
        <span className="font-heading text-lg font-extrabold tracking-[0.15em] text-white sm:text-xl">
          COACH
        </span>
      </div>

      <div className="grid grid-cols-4" aria-hidden="true">
        {Array.from({ length: SLOT_COUNT }, (_, i) => {
          const isActive = i === activeIndex;
          return (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`flex h-7 w-full items-center justify-center text-[10px] font-bold tracking-widest sm:text-xs ${
                  isActive ? "bg-teal-500 text-white" : "text-navy-100"
                }`}
              >
                SME
              </div>

              <div
                className={`flex h-48 w-full items-center justify-center bg-white sm:h-56 ${
                  isActive ? "border-x-4 border-teal-500" : ""
                }`}
              >
                {isActive ? (
                  <span className="origin-center whitespace-nowrap font-heading text-[11px] font-extrabold tracking-wide text-navy-900 [transform:rotate(-90deg)] sm:text-xs">
                    {label}
                  </span>
                ) : null}
              </div>

              <div className={`h-2 w-full ${isActive ? "bg-teal-500" : ""}`} />
            </div>
          );
        })}
      </div>

      <div className="h-2 bg-navy-700" aria-hidden="true" />

      <div className="flex h-14 items-center justify-center bg-navy-800" aria-hidden="true">
        <span className="font-heading text-base font-extrabold tracking-[0.1em] text-white sm:text-lg">
          4 PILLARS OF BUSINESS
        </span>
      </div>
    </div>
  );
}
