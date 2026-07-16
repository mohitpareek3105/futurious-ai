import Link from "next/link";
import Image from "next/image";
import { getFeaturedTools } from "@/lib/tools";

export default async function FeaturedTools() {
  const aiTools = await getFeaturedTools();

  return (
    <section className="bg-[#050505] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-5xl font-bold text-white">
          Featured AI Tools
        </h2>

        <p className="mb-14 mt-4 text-center text-gray-400">
          Discover the world&apos;s best AI tools.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {aiTools.map((tool) => (
            <div
              key={tool.id}
              className="rounded-2xl border border-gray-800 bg-[#111827] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-2xl font-bold text-black">
                  {tool.name.charAt(0)}
                </div>

                <span className="text-lg font-semibold text-yellow-400">
                  Rating: {tool.rating}
                </span>
              </div>

              <h3 className="mt-6 text-3xl font-bold text-white">
                {tool.name}
              </h3>

              <p className="mt-2 text-gray-400">
                {tool.company}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-6 leading-7 text-gray-400">
                {tool.description}
              </p>

              <div className="mt-8 flex items-center justify-between">
                <span className="font-semibold text-green-400">
                  {tool.pricing}
                </span>

                <Link
                  href={`/tools/${tool.slug}`}
                  className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {aiTools.length === 0 && (
          <p className="mt-10 text-center text-gray-400">
            No featured tools found.
          </p>
        )}
      </div>
    </section>
  );
}