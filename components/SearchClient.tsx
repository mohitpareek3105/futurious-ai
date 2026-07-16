"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import type { AITool } from "@/types/ai-tool";

interface Props {
  tools: AITool[];
}

export default function SearchClient({ tools }: Props) {
  const [search, setSearch] = useState("");

  const filteredTools = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return tools.filter((tool) => {
      if (!keyword) {
        return true;
      }

      return (
        tool.name.toLowerCase().includes(keyword) ||
        tool.company.toLowerCase().includes(keyword) ||
        tool.category.toLowerCase().includes(keyword) ||
        tool.tags.some((tag) =>
          tag.toLowerCase().includes(keyword)
        )
      );
    });
  }, [search, tools]);

  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center text-5xl font-bold text-white">
          Search AI Tools
        </h2>

        <p className="mt-4 text-center text-gray-400">
          Find AI tools by name, company, category, or tag.
        </p>

        <input
          type="search"
          placeholder="Search AI tools..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="mt-10 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-5 text-xl text-white outline-none transition focus:border-blue-500"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="rounded-xl border border-zinc-700 bg-zinc-900 p-5 transition hover:border-blue-500"
              >
                <h3 className="text-2xl font-bold text-white">
                  {tool.name}
                </h3>

                <p className="mt-2 text-gray-400">
                  {tool.company}
                </p>

                <div className="mt-4 flex justify-between">
                  <span className="text-green-400">
                    {tool.pricing}
                  </span>

                  <span className="text-yellow-400">
                    Rating: {tool.rating}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-2 text-center text-red-400">
              No AI tools found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}