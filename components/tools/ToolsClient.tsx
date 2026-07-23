"use client";


import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import ToolLogo from "@/components/ui/ToolLogo";
import { useAppStore } from "@/store/appStore";
import type { AITool } from "@/types/ai-tool";

type ToolsClientProps = {
  tools: AITool[];
  initialSearch?: string;
};

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-5 w-5 ${
        filled ? "fill-red-500 text-red-500" : "fill-none text-gray-300"
      }`}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
      />
    </svg>
  );
}

function CompareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M8 3v18M16 3v18M4 7h8M12 17h8M5 7l-2 4h4L5 7Zm14 10-2 4h4l-2-4Z"
      />
    </svg>
  );
}

export default function ToolsClient({
  tools,
  initialSearch = "",
}: ToolsClientProps) {
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  const [search, setSearch] = useState(initialSearch);

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
    <main className="min-h-screen bg-[#050505] px-4 py-16 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mt-14 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
            AI Tools Directory
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Discover the Best AI Tools
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Search, compare and save the right AI tools for your workflow.
          </p>

          <div className="mt-5 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            Compare selected: {compare.length} / 4
          </div>
        </div>

        <div className="mt-10">
          <label htmlFor="tool-search" className="sr-only">
            Search AI tools
          </label>

          <input
            id="tool-search"
            type="search"
            placeholder="Search by tool, company, category or tag..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#111827] px-5 py-4 text-white shadow-lg shadow-black/20 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                  isSelected
                    ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "border-white/10 bg-white/5 text-gray-300 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <p className="mb-8 mt-8 text-center text-sm text-gray-400">
          Showing {filteredTools.length} of {tools.length} tools
        </p>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredTools.map((tool) => {
            const isFavorite = favorites.includes(tool.id);
            const isCompared = compare.includes(tool.id);

            return (
              <article
                key={tool.id}
                className="group flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-[#111827] to-[#0b1120] p-6 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1.5 hover:border-blue-500/50 hover:shadow-blue-950/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
                    <ToolLogo
  name={tool.name}
  slug={tool.slug}
  logo={tool.logo}
  website={tool.website}
/>

                    <div className="min-w-0">
                      <h2 className="truncate text-xl font-semibold text-white">
                        {tool.name}
                      </h2>

                      <p className="mt-1 truncate text-sm text-gray-400">
                        by {tool.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleFavorite(tool.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:border-red-500/40 hover:bg-red-500/10"
                      title={
                        isFavorite
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                      aria-label={
                        isFavorite
                          ? `Remove ${tool.name} from favorites`
                          : `Add ${tool.name} to favorites`
                      }
                    >
                      <HeartIcon filled={isFavorite} />
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleCompare(tool.id)}
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                        isCompared
                          ? "border-green-500/50 bg-green-500/15 text-green-400"
                          : "border-white/10 bg-white/5 text-gray-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-300"
                      }`}
                      title={
                        isCompared
                          ? "Remove from compare"
                          : "Add to compare"
                      }
                      aria-label={
                        isCompared
                          ? `Remove ${tool.name} from comparison`
                          : `Add ${tool.name} to comparison`
                      }
                    >
                      <CompareIcon />
                    </button>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                    {tool.category}
                  </span>

                  <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-300">
                    {tool.pricing}
                  </span>

                  <span className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-yellow-400">
                    <span aria-hidden="true">★</span>
                    {tool.rating}
                  </span>
                </div>

                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-400">
                  {tool.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {tool.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 pt-7">
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="inline-flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                  >
                    View Details
                  </Link>

                  {tool.website && (
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-gray-200 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
                    >
                      Visit
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 px-6 py-12 text-center">
            <h2 className="text-xl font-semibold">
              No AI tools found
            </h2>
            <p className="mt-2 text-gray-400">
              Try a different search keyword or category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}