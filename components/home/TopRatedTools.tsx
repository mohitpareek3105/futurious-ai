import Link from "next/link";

import { getTopRatedTools } from "@/lib/tools";

export default async function TopRatedTools() {
  const tools = await getTopRatedTools(5);

  if (tools.length === 0) {
    return null;
  }

  return (
    <section className="mt-24">
      <h2 className="mb-10 text-4xl font-bold">
        Top Rated Tools
      </h2>

      <div className="space-y-5">
        {tools.map((tool, index) => (
          <Link
            key={tool.id}
            href={`/tools/${tool.name
              .toLowerCase()
              .trim()
              .replace(/\s+/g, "-")}`}
            className="flex items-center justify-between rounded-xl border border-gray-800 bg-[#111827] p-5 transition hover:border-blue-500"
          >
            <div className="flex items-center gap-5">
              <div className="text-2xl font-bold text-blue-500">
                #{index + 1}
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  {tool.name}
                </h3>

                <p className="text-gray-400">
                  {tool.company}
                </p>
              </div>
            </div>

            <div className="font-bold text-yellow-400">
              ★ {tool.rating}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
