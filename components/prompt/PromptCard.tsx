"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Heart,
  Sparkles,
} from "lucide-react";

import { usePromptFavorites } from "@/hooks/usePromptFavorites";
import type { Prompt } from "@/types/prompt";

type Props = {
  prompt: Prompt;
};

export default function PromptCard({ prompt }: Props) {
  const { favorites, toggleFavorite } = usePromptFavorites();

  const isFavorite = favorites.includes(prompt.id);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#111827] to-[#0b1120] p-6 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1.5 hover:border-blue-500/50 hover:shadow-blue-950/30">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl transition duration-300 group-hover:bg-blue-500/20"
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
          <Sparkles className="h-3.5 w-3.5" />
          {prompt.category}
        </span>

        <button
          type="button"
          onClick={() => toggleFavorite(prompt.id)}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition ${
            isFavorite
              ? "border-red-500/40 bg-red-500/10 text-red-400"
              : "border-white/10 bg-white/5 text-gray-400 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
          }`}
          aria-label={
            isFavorite
              ? `Remove ${prompt.title} from favorites`
              : `Add ${prompt.title} to favorites`
          }
          title={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? "fill-current" : ""
            }`}
          />
        </button>
      </div>

      <Link
        href={`/prompts/${prompt.slug}`}
        className="relative mt-6 flex flex-1 flex-col"
      >
        <h2 className="text-xl font-semibold tracking-tight text-white transition group-hover:text-blue-200">
          {prompt.title}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-400">
          {prompt.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {prompt.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-7 text-sm font-semibold text-blue-400">
          <span>View prompt</span>

          <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </Link>
    </article>
  );
}