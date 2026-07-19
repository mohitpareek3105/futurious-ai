import type { Metadata } from "next";
import { BookOpen, Copy, Search, Sparkles } from "lucide-react";

import PromptLibraryClient from "@/components/prompt/PromptLibraryClient";
import { prompts } from "@/data/prompts";

export const metadata: Metadata = {
  title: "AI Prompt Library",
  description:
    "Discover ready-to-use AI prompts for writing, coding, marketing, productivity and more.",
  alternates: {
    canonical: "/prompts",
  },
  openGraph: {
    title: "AI Prompt Library | Futurious.AI",
    description:
      "Browse practical AI prompts for writing, coding, marketing, productivity and more.",
    url: "/prompts",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Prompt Library | Futurious.AI",
    description:
      "Explore ready-to-use AI prompts designed to improve your workflow.",
  },
};

const benefits = [
  {
    label: `${prompts.length}+ curated prompts`,
    icon: BookOpen,
  },
  {
    label: "Search and filter",
    icon: Search,
  },
  {
    label: "Ready to copy",
    icon: Copy,
  },
];

export default function PromptLibraryPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-4 py-16 text-white sm:px-6">
      <div className="mx-auto mt-14 max-w-7xl">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#111827] to-[#080d18] px-6 py-14 text-center shadow-2xl shadow-black/30 sm:px-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-3xl"
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
              <Sparkles className="h-4 w-4" />
              Prompt Library
            </span>

            <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Better prompts for better AI results
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
              Discover practical, ready-to-use prompts for content creation,
              coding, marketing, learning and everyday productivity.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {benefits.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300"
                >
                  <Icon className="h-4 w-4 text-blue-400" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14">
          <PromptLibraryClient />
        </section>
      </div>
    </main>
  );
}
