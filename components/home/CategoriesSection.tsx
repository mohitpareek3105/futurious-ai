import Link from "next/link";

const categories = [
  "AI Assistant",
  "Writing",
  "Coding",
  "Image",
  "Video",
  "Marketing",
  "Productivity",
  "Research",
];

export default function CategoriesSection() {
  return (
    <section className="mt-24">

      <h2 className="text-4xl font-bold mb-10">
        📂 Popular Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {categories.map((category) => (

          <Link
            key={category}
            href="/categories"
            className="bg-[#111827] border border-gray-800 rounded-2xl p-8 text-center hover:border-blue-500 hover:-translate-y-1 transition"
          >
            <h3 className="text-xl font-semibold">
              {category}
            </h3>
          </Link>

        ))}

      </div>

    </section>
  );
}