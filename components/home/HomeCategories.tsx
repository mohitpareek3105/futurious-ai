import Link from "next/link";

import { categories } from "@/data/categories";

export default function HomeCategories() {
  const homepageCategories = categories.slice(0, 8);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="mb-12 text-center text-4xl font-bold">
        Browse by Category
      </h2>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {homepageCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="rounded-2xl border border-gray-800 bg-[#111827] p-8 text-center transition hover:border-blue-500"
          >
            <h3 className="text-lg font-semibold">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/categories"
          className="font-semibold text-blue-400 transition hover:text-blue-300"
        >
          View all categories →
        </Link>
      </div>
    </section>
  );
}