import type { Metadata } from "next";

import CategoryCard from "@/components/category/CategoryCard";
import { categories } from "@/data/categories";

export const metadata: Metadata = {
  title: "AI Tool Categories",
  description:
    "Browse AI tools by category, including writing, coding, image generation, video, marketing, education and productivity.",
  alternates: {
    canonical: "/categories",
  },
  openGraph: {
    title: "AI Tool Categories | Futurious.AI",
    description:
      "Explore curated AI tools across writing, coding, productivity, marketing and more.",
    url: "/categories",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tool Categories | Futurious.AI",
    description:
      "Browse curated AI tools by category and find the right tool for your workflow.",
  },
};

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-16 text-white">
      <div className="mx-auto mt-14 max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
            AI Tool Directory
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Explore AI Categories
          </h1>

          <p className="mt-5 text-base leading-7 text-gray-400 sm:text-lg">
            Find the best AI tools for every workflow, from content creation
            and coding to marketing, learning and productivity.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              name={category.name}
              slug={category.slug}
              icon={category.icon}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
