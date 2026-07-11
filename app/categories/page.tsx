import { categories } from "@/data/categories";
import CategoryCard from "@/components/category/CategoryCard";

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-16">

      <div className="max-w-7xl mx-auto mt-16">

        <h1 className="text-5xl font-bold text-center">
          AI Categories
        </h1>

        <p className="text-gray-400 text-center mt-5 mb-16">
          Browse AI tools by category.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

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