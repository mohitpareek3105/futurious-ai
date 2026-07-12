"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { useAppStore } from "@/store/appStore";
import type { AITool } from "@/types/ai-tool";

type ToolsClientProps = {
  tools: AITool[];
};

export default function ToolsClient({
  tools,
}: ToolsClientProps) {
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  const [search, setSearch] = useState("");

  const {
    favorites,
    compare,
    toggleFavorite,
    toggleCompare,
    loadData,
  } = useAppStore();

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(tools.map((tool) => tool.category)),
    ];
  }, [tools]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredTools = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesCategory =
        selectedCategory === "All" ||
        tool.category === selectedCategory;

      const matchesSearch =
        keyword.length === 0 ||
        tool.name.toLowerCase().includes(keyword) ||
        tool.company.toLowerCase().includes(keyword) ||
        tool.category.toLowerCase().includes(keyword) ||
        tool.tags.some((tag) =>
          tag.toLowerCase().includes(keyword)
        );

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory, tools]);

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="mt-16 text-center text-blue-400">
          Compare Selected: {compare.length} / 4
        </p>

        <h1 className="mt-4 text-center text-5xl font-bold">
          All AI Tools
        </h1>

        <p className="mt-4 text-center text-gray-400">
          Discover the best AI tools.
        </p>

        <input
          type="text"
          placeholder="ðŸ” Search AI Tools..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="mt-10 w-full rounded-xl border border-gray-700 bg-[#111827] px-6 py-4 outline-none"
        />

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2 transition ${
                selectedCategory === category
                  ? "bg-blue-600"
                  : "bg-gray-800 hover:bg-blue-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="mt-8 mb-10 text-center text-gray-400">
          Showing {filteredTools.length} tools
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="rounded-2xl border border-gray-800 bg-[#111827] p-6 transition duration-300 hover:-translate-y-2 hover:border-blue-500"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-2xl font-bold text-black">
                  {tool.name.charAt(0)}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(tool.id)}
                    className="text-2xl transition hover:scale-125"
                    title="Favorite"
                    aria-label={`Toggle ${tool.name} favorite`}
                  >
                    {favorites.includes(tool.id) ? "â¤ï¸" : "ðŸ¤"}
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleCompare(tool.id)}
                    className={`rounded-lg px-3 py-1 text-sm transition ${
                      compare.includes(tool.id)
                        ? "bg-green-600"
                        : "bg-gray-700 hover:bg-blue-600"
                    }`}
                    title="Compare"
                    aria-label={`Toggle ${tool.name} comparison`}
                  >
                    âš–ï¸
                  </button>

                  <span className="text-yellow-400">
                    â­ {tool.rating}
                  </span>
                </div>
              </div>

              <h2 className="mt-6 text-3xl font-bold">
                {tool.name}
              </h2>

              <p className="mt-2 text-gray-400">
                {tool.company}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-800 px-3 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-gray-400">
                {tool.description}
              </p>

              <div className="mt-8 flex items-center justify-between">
                <span className="text-green-400">
                  {tool.pricing}
                </span>

                <Link
                  href={`/tools/${tool.slug}`}
                  className="rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-700"
                >
                  View Details â†’
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <p className="mt-12 text-center text-red-400">
            No AI tools found.
          </p>
        )}
      </div>
    </main>
  );
}
