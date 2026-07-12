import Link from "next/link";

import { getTrendingTools } from "@/lib/tools";

export default async function TrendingTools() {
  const tools = await getTrendingTools(6);

  if (tools.length === 0) {
    return null;
  }

  return (
    <section className="mt-24">
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-4xl font-bold">
          Trending AI Tools
        </h2>

        <Link
          href="/tools"
          className="text-blue-500 hover:text-blue-400"
        >
          View All →
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/tools/${tool.slug}`}
            className="rounded-2xl border border-gray-800 bg-[#111827] p-6 transition hover:border-blue-500"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">
                {tool.name}
              </h3>

              <span className="text-yellow-400">
                ★ {tool.rating}
              </span>
            </div>

            <p className="mt-3 text-gray-400">
              {tool.company}
            </p>

            <p className="mt-5 line-clamp-3 text-gray-300">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

