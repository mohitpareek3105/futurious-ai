import Link from "next/link";
import { aiTools } from "@/data/ai-tools";

export default function TrendingTools() {
  const tools = aiTools.slice(0, 6);

  return (
    <section className="mt-24">

      <div className="flex justify-between items-center mb-10">

        <h2 className="text-4xl font-bold">
          🔥 Trending AI Tools
        </h2>

        <Link
          href="/tools"
          className="text-blue-500 hover:text-blue-400"
        >
          View All →
        </Link>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/tools/${tool.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-blue-500 transition"
          >
            <div className="flex justify-between items-center">

              <h3 className="text-2xl font-bold">
                {tool.name}
              </h3>

              <span className="text-yellow-400">
                ⭐ {tool.rating}
              </span>

            </div>

            <p className="text-gray-400 mt-3">
              {tool.company}
            </p>

            <p className="mt-5 text-gray-300 line-clamp-3">
              {tool.description}
            </p>

          </Link>
        ))}

      </div>

    </section>
  );
}