"use client";

import Link from "next/link";
import { Prompt } from "@/types/prompt";
import { usePromptFavorites } from "@/hooks/usePromptFavorites";

type Props = {
  prompt: Prompt;
};

export default function PromptCard({ prompt }: Props) {
  const { favorites, toggleFavorite } = usePromptFavorites();

  const isFavorite = favorites.includes(prompt.id);

  return (
    <div className="relative">

      {/* Favorite Button */}

      <button
  onClick={(e) => {
    e.preventDefault();
    toggleFavorite(prompt.id);
  }}
  className="absolute top-4 right-4 text-2xl z-10"
>
  {isFavorite ? "❤️" : "🤍"}
</button>

      <Link
        href={`/prompts/${prompt.slug}`}
        className="block bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-blue-500 transition"
      >
        <h2 className="text-2xl font-bold">
          {prompt.title}
        </h2>

        <p className="text-gray-400 mt-3">
          {prompt.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {prompt.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-900/40 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>

    </div>
  );
}