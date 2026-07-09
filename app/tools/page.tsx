"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { aiTools } from "@/data/ai-tools";

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(aiTools.map((tool) => tool.category)),
    ];
  }, []);

  const filteredTools = aiTools.filter((tool) => {
    const matchesCategory =
      selectedCategory === "All" ||
      tool.category === selectedCategory;

    const keyword = search.toLowerCase();

    const matchesSearch =
      tool.name.toLowerCase().includes(keyword) ||
      tool.company.toLowerCase().includes(keyword) ||
      tool.category.toLowerCase().includes(keyword) ||
      tool.tags.some((tag) =>
        tag.toLowerCase().includes(keyword)
      );

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mt-16">
          All AI Tools
        </h1>

        <p className="text-center text-gray-400 mt-4">
          Discover the best AI tools.
        </p>

        <input
          type="text"
          placeholder="🔍 Search AI Tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mt-10 bg-[#111827] border border-gray-700 rounded-xl px-6 py-4 outline-none"
        />

        <div className="flex flex-wrap justify-center gap-3 mt-8">

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full transition ${
                selectedCategory === category
                  ? "bg-blue-600"
                  : "bg-gray-800 hover:bg-blue-600"
              }`}
            >
              {category}
            </button>
          ))}

        </div>

        <p className="text-center text-gray-400 mt-8 mb-10">
          Showing {filteredTools.length} tools
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-blue-500 hover:-translate-y-2 transition duration-300"
            >
              <div className="flex justify-between">

                <div className="w-14 h-14 rounded-xl bg-white text-black flex items-center justify-center text-2xl font-bold">
                  {tool.name.charAt(0)}
                </div>

                <span className="text-yellow-400">
                  ⭐ {tool.rating}
                </span>

              </div>

              <h2 className="text-3xl font-bold mt-6">
                {tool.name}
              </h2>

              <p className="text-gray-400 mt-2">
                {tool.company}
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-800 px-3 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-gray-400 mt-6">
                {tool.description}
              </p>

              <div className="flex justify-between items-center mt-8">

                <span className="text-green-400">
                  {tool.pricing}
                </span>

                <Link
                  href={`/tools/${tool.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
                >
                  View Details →
                </Link>

              </div>
            </div>
          ))}

        </div>

      </div>
    </main>
  );
}