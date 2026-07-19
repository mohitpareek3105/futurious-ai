"use client";

import { Search, X } from "lucide-react";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function PromptSearch({
  search,
  setSearch,
}: Props) {
  return (
    <div className="relative mt-12">
      <label htmlFor="prompt-search" className="sr-only">
        Search AI prompts
      </label>

      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
      />

      <input
        id="prompt-search"
        type="search"
        placeholder="Search by title, category, description or tag..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-[#111827] py-4 pl-13 pr-13 text-white shadow-lg shadow-black/20 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      />

      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white/5 hover:text-white"
          aria-label="Clear prompt search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}