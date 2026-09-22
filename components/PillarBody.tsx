import type { PillarBodyBlock } from "@/content/pillars";

export default function PillarBody({ blocks }: { blocks: PillarBodyBlock[] }) {
  return (
    <div className="space-y-7 font-body text-lg leading-relaxed text-navy-800">
      {blocks.map((block, index) => {
        if (block.type === "list") {
          return (
            <ul
              key={index}
              className="space-y-3 rounded-lg border border-navy-100 bg-navy-50/60 p-6"
            >
              {block.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-2 w-2 shrink-0 rotate-45 bg-teal-500"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        const isFirst = index === 0;
        return (
          <p
            key={index}
            className={isFirst ? "font-heading text-xl font-medium text-navy-900" : undefined}
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
