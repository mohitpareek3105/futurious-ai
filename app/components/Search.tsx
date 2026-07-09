"use client";

import { useState } from "react";
import Link from "next/link";
import { aiTools } from "@/data/ai-tools";

export default function Search() {
  const [search, setSearch] = useState("");

  const filteredTools = aiTools.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-black py-24">
      <div className="max-w-5xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-white">
          Search AI Tools
        </h2>

        <p className="text-center text-gray-400 mt-4">
          Search from thousands of AI tools
        </p>

        <input
          type="text"
          placeholder="🔍 Search AI tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-10 w-full bg-zinc-900 border border-zinc-700 rounded-xl px-6 py-5 text-xl text-white outline-none"
        />

        <div className="grid md:grid-cols-2 gap-4 mt-10">

          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 hover:border-blue-500 transition"
              >
                <h3 className="text-white text-2xl font-bold">
                  {tool.name}
                </h3>

                <p className="text-gray-400 mt-2">
                  {tool.company}
                </p>

                <div className="flex justify-between mt-4">
                  <span className="text-green-400">
                    {tool.pricing}
                  </span>

                  <span className="text-yellow-400">
                    ⭐ {tool.rating}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-red-400 col-span-2">
              No AI tools found.
            </p>
          )}

        </div>
      </div>
    </section>
  );
}