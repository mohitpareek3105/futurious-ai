import Link from "next/link";
import { ArrowRight } from "lucide-react";

import CategoryCard from "@/components/category/CategoryCard";
import { categories } from "@/data/categories";

export default function HomeCategories() {
  const homepageCategories = categories.slice(0, 8);

  return (
    <section className="border-y border-white/5 bg-[#070707]">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
            Explore by use case
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Browse AI Tools by Category
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-400 sm:text-lg">
            Discover curated AI tools for writing, coding, productivity,
            marketing and more.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homepageCategories.map((category) => (
            <CategoryCard
              key={category.slug}
              name={category.name}
              slug={category.slug}
              icon={category.icon}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
          >
            View all categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}