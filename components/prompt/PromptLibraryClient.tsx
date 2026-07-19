"use client";

import { useMemo, useState } from "react";
import { Library } from "lucide-react";

import PromptCard from "@/components/prompt/PromptCard";
import PromptCategory from "@/components/prompt/PromptCategory";
import PromptSearch from "@/components/prompt/PromptSearch";
import { prompts } from "@/data/prompts";

export default function PromptLibraryClient() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("All");

  const categories = useMemo(
    () => [...new Set(prompts.map((prompt) => prompt.category))],
    []
  );

  const filteredPrompts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return prompts.filter((prompt) => {
      const matchesCategory =
        selected === "All" || prompt.category === selected;

      const matchesSearch =
        keyword.length === 0 ||
        prompt.title.toLowerCase().includes(keyword) ||
        prompt.description.toLowerCase().includes(keyword) ||
        prompt.category.toLowerCase().includes(keyword) ||
        prompt.tags.some((tag) =>
          tag.toLowerCase().includes(keyword)
        );

      return matchesCategory && matchesSearch;
    });
  }, [search, selected]);

  return (
    <>
      <PromptSearch search={search} setSearch={setSearch} />

      <PromptCategory
        categories={categories}
        selected={selected}
        setSelected={setSelected}
      />

      <div className="mb-8 flex items-center justify-between gap-4">
        <p className="text-sm text-gray-400">
          Showing{" "}
          <span className="font-semibold text-white">
            {filteredPrompts.length}
          </span>{" "}
          of {prompts.length} prompts
        </p>
      </div>

      {filteredPrompts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-300">
            <Library className="h-7 w-7" />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-white">
            No prompts found
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Try another keyword or choose a different category.
          </p>
        </div>
      )}
    </>
  );
}