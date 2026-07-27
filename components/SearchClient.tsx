"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import ToolLogo from "@/components/ui/ToolLogo";
import type { SearchTool } from "@/components/Search";

interface Props {
  tools: SearchTool[];
}

const MAX_RESULTS = 8;

const suggestions = [
  "Writing",
  "Coding",
  "Image",
  "Video",
  "SEO",
  "Automation",
];

export default function SearchClient({ tools }: Props) {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const keyword = search.trim().toLowerCase();

  const filteredTools = useMemo(() => {
    if (!keyword) {
      return [];
    }

    return tools
      .map((tool) => {
        const name = tool.name.toLowerCase();
        const company = tool.company.toLowerCase();
        const category = tool.category.toLowerCase();
        const tagMatches = tool.tags.some((tag) =>
          tag.toLowerCase().includes(keyword),
        );

        const matches =
          name.includes(keyword) ||
          company.includes(keyword) ||
          category.includes(keyword) ||
          tagMatches;

        let score = 0;

        if (name === keyword) {
          score += 100;
        } else if (name.startsWith(keyword)) {
          score += 70;
        } else if (name.includes(keyword)) {
          score += 50;
        }

        if (company.includes(keyword)) {
          score += 25;
        }

        if (category.includes(keyword)) {
          score += 20;
        }

        if (tagMatches) {
          score += 15;
        }

        return {
          tool,
          score,
          matches,
        };
      })
      .filter((item) => item.matches)
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        return b.tool.rating - a.tool.rating;
      })
      .slice(0, MAX_RESULTS)
      .map((item) => item.tool);
  }, [keyword, tools]);

  const showResults = isFocused && keyword.length > 0;

  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">
            Search the directory
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Find the right AI tool instantly
          </h2>

          <p className="mt-4 text-lg text-gray-400">
            Search by tool name, company, category, or tag.
          </p>
        </div>

        <div className="relative mt-10">
          <input
            type="search"
            role="combobox"
            placeholder="Try: video editing, coding, SEO, automation..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              window.setTimeout(() => setIsFocused(false), 150);
            }}
            aria-label="Search AI tools"
            aria-autocomplete="list"
            aria-expanded={showResults}
            aria-controls="tool-search-results"
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-5 text-lg text-white shadow-2xl outline-none transition placeholder:text-zinc-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />

          {showResults && (
            <div
              id="tool-search-results"
              role="listbox"
              aria-label="AI tool search results"
              className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-950 shadow-2xl"
            >
              {filteredTools.length > 0 ? (
                <div className="divide-y divide-zinc-800">
                  {filteredTools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.slug}`}
                      role="option"
                      aria-selected="false"
                      className="flex items-center gap-4 px-5 py-4 transition hover:bg-zinc-900"
                    >
                      <ToolLogo
                        name={tool.name}
                        slug={tool.slug}
                        logo={tool.logo}
                        website={tool.website}
                        size={44}
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="truncate font-semibold text-white">
                            {tool.name}
                          </h3>

                          <span className="shrink-0 text-sm text-yellow-400">
                            ★ {tool.rating}
                          </span>
                        </div>

                        <p className="mt-1 truncate text-sm text-zinc-400">
                          {tool.company} · {tool.category}
                        </p>
                      </div>
                    </Link>
                  ))}

                  <Link
                    href="/tools"
                    className="block px-5 py-4 text-center font-medium text-blue-400 transition hover:bg-zinc-900 hover:text-blue-300"
                  >
                    Browse all AI tools
                  </Link>
                </div>
              ) : (
                <div className="px-6 py-8 text-center">
                  <p className="font-medium text-white">No AI tools found</p>

                  <p className="mt-2 text-sm text-zinc-400">
                    Try another keyword, category, or tag.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                setSearch(suggestion);
                setIsFocused(true);
              }}
              className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition hover:border-blue-500 hover:text-white"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}