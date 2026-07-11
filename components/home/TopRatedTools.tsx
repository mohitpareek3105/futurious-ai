import Link from "next/link";
import { aiTools } from "@/data/ai-tools";

export default function TopRatedTools() {

  const tools = [...aiTools]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <section className="mt-24">

      <h2 className="text-4xl font-bold mb-10">
        ⭐ Top Rated Tools
      </h2>

      <div className="space-y-5">

        {tools.map((tool, index) => (

          <Link
            key={tool.id}
            href={`/tools/${tool.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex justify-between items-center bg-[#111827] border border-gray-800 rounded-xl p-5 hover:border-blue-500 transition"
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

            <div className="text-yellow-400 font-bold">
              ⭐ {tool.rating}
            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}