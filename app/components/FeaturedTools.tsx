import { aiTools } from "@/data/ai-tools";
import Link from "next/link";

export default function FeaturedTools() {
  return (
    <section className="bg-[#050505] py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center text-white">
          Featured AI Tools
        </h2>

        <p className="text-gray-400 text-center mt-4 mb-14">
          Discover the world's best AI tools.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {aiTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-blue-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
            >

              {/* Top */}

              <div className="flex justify-between items-start">

                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-black text-2xl font-bold">
                  {tool.name.charAt(0)}
                </div>

                <span className="text-yellow-400 font-semibold text-lg">
                  ⭐ {tool.rating}
                </span>

              </div>

              {/* Title */}

              <h3 className="text-white text-3xl font-bold mt-6">
                {tool.name}
              </h3>

              <p className="text-gray-400 mt-2">
                {tool.company}
              </p>

              {/* Tags */}

              <div className="flex flex-wrap gap-2 mt-5">

                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}

              </div>

              {/* Description */}

              <p className="text-gray-400 mt-6 leading-7">
                {tool.description}
              </p>

              {/* Footer */}

              <div className="flex justify-between items-center mt-8">

                <span className="text-green-400 font-semibold">
                  {tool.pricing}
                </span>

                <Link
                  href={`/tools/${tool.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white transition"
                >
                  View Details →
                </Link>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}