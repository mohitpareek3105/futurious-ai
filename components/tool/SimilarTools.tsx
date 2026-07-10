import Link from "next/link";
import { aiTools } from "@/data/ai-tools";
import { AITool } from "@/types/ai-tool";

type Props = {
  currentTool: AITool;
};

export default function SimilarTools({
  currentTool,
}: Props) {
  const similarTools = aiTools
    .filter(
      (tool) =>
        tool.category === currentTool.category &&
        tool.id !== currentTool.id
    )
    .slice(0, 3);

  if (similarTools.length === 0) return null;

  return (
    <section className="mt-20">

      <h2 className="text-3xl font-bold mb-8">
        🔥 Similar AI Tools
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {similarTools.map((tool) => (

          <Link
            key={tool.id}
            href={`/tools/${tool.name
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
            className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-blue-500 transition"
          >

            <h3 className="text-2xl font-bold">
              {tool.name}
            </h3>

            <p className="text-gray-400 mt-2">
              {tool.company}
            </p>

            <div className="mt-4 text-yellow-400">
              ⭐ {tool.rating}
            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}