"use client";

import { useState } from "react";
import Link from "next/link";
import { aiTools } from "@/data/ai-tools";

export default function ToolsPage() {
  const categories = [
    "All",
    "AI Assistant",
    "Writing",
    "Coding",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools =
    selectedCategory === "All"
      ? aiTools
      : aiTools.filter(
          (tool) => tool.category === selectedCategory
        );

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mt-16 text-center">
          All AI Tools
        </h1>

        <p className="text-center text-gray-400 mt-4 mb-14">
          Discover the best AI tools for productivity, coding, writing, design and more.
        </p>

        {/* Category Filter */}

        <div className="flex flex-wrap justify-center gap-3 mb-12">

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

        {/* Total Tools */}

        <p className="text-center text-gray-400 mb-8">
          Showing {filteredTools.length} Tools
        </p>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-blue-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
            >

              <div className="flex justify-between items-center">

                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-black text-2xl font-bold">
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
                    className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}

              </div>

              <p className="text-gray-400 mt-5 leading-7">
                {tool.description}
              </p>

              <div className="flex justify-between items-center mt-8">

                <span className="text-green-400 font-semibold">
                  {tool.pricing}
                </span>

                <Link
                  href={`/tools/${tool.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition"
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