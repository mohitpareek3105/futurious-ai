"use client";

import { useState } from "react";

import { prompts } from "@/data/prompts";

import PromptCard from "@/components/prompt/PromptCard";
import PromptSearch from "@/components/prompt/PromptSearch";
import PromptCategory from "@/components/prompt/PromptCategory";

export default function PromptLibrary() {

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("All");

  const categories = [
    ...new Set(prompts.map((p) => p.category)),
  ];

  const filteredPrompts = prompts.filter((prompt) => {

    const matchCategory =
      selected === "All"
        ? true
        : prompt.category === selected;

    const matchSearch =
      prompt.title
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-16">

      <div className="max-w-7xl mx-auto mt-16">

        <h1 className="text-5xl font-bold text-center">
          Prompt Library
        </h1>

        <p className="text-center text-gray-400 mt-5 mb-12">
          Discover ready-to-use AI prompts.
        </p>

        <PromptSearch
          search={search}
          setSearch={setSearch}
        />

        <PromptCategory
          categories={categories}
          selected={selected}
          setSelected={setSelected}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
            />
          ))}

        </div>

      </div>

    </main>
  );
}