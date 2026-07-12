"use client";

import Link from "next/link";

import { useFavorites } from "@/hooks/useFavorites";
import type { AITool } from "@/types/ai-tool";

type FavoritesClientProps = {
  tools: AITool[];
};

export default function FavoritesClient({
  tools,
}: FavoritesClientProps) {
  const { favorites } = useFavorites();

  const favoriteTools = tools.filter((tool) =>
    favorites.includes(tool.id)
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mt-16">
          My Favorite AI Tools
        </h1>

        <p className="text-center text-gray-400 mt-4 mb-12">
          Your saved AI tools.
        </p>

        {favoriteTools.length === 0 ? (
          <div className="text-center mt-20">

            <h2 className="text-3xl font-bold">
              No Favorite Tools
            </h2>

            <Link
              href="/tools"
              className="inline-block mt-8 bg-blue-600 px-6 py-3 rounded-xl"
            >
              Browse AI Tools
            </Link>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {favoriteTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-[#111827] rounded-2xl p-6 border border-gray-800"
              >
                <h2 className="text-2xl font-bold">
                  {tool.name}
                </h2>

                <p className="text-gray-400 mt-2">
                  {tool.company}
                </p>

                <p className="mt-4 text-gray-400">
                  {tool.description}
                </p>

                <Link
                  href={`/tools/${tool.slug}`}
                  className="inline-block mt-6 bg-blue-600 px-5 py-2 rounded-lg"
                >
                  View Details â†’
                </Link>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}
