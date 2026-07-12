import Link from "next/link";

import { getSimilarTools } from "@/lib/tools";
import type { AITool } from "@/types/ai-tool";

type Props = {
  currentTool: AITool;
};

export default async function SimilarTools({
  currentTool,
}: Props) {
  const similarTools = await getSimilarTools(
    currentTool.id,
    currentTool.category,
    3
  );

  if (similarTools.length === 0) {
    return null;
  }

  return (
    <section className="mt-20">
      <h2 className="mb-8 text-3xl font-bold">
        🔥 Similar AI Tools
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {similarTools.map((tool) => (
          <Link
            key={tool.id}
            href={`/tools/${tool.name
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
            className="rounded-2xl border border-gray-800 bg-[#111827] p-6 transition hover:border-blue-500"
          >
            <h3 className="text-2xl font-bold">
              {tool.name}
            </h3>

            <p className="mt-2 text-gray-400">
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