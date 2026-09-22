import type { PillarBodyBlock } from "@/content/pillars";

export default function PillarBody({ blocks }: { blocks: PillarBodyBlock[] }) {
  return (
    <div className="space-y-6 font-body text-lg leading-relaxed text-navy-800">
      {blocks.map((block, index) => {
        if (block.type === "list") {
          return (
            <ul key={index} className="list-disc space-y-2 pl-6">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return <p key={index}>{block.text}</p>;
      })}
    </div>
  );
}
