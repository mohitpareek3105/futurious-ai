import Link from "next/link";

const categories = [
  "AI Assistant",
  "Image Generator",
  "Video Generator",
  "Code Assistant",
  "Writing",
  "Marketing",
  "Productivity",
  "Education",
];

export default function HomeCategories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      <h2 className="text-4xl font-bold text-center mb-12">
        Browse by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {categories.map((category) => (
          <Link
            key={category}
            href="/categories"
            className="bg-[#111827] border border-gray-800 rounded-2xl p-8 text-center hover:border-blue-500 transition"
          >
            <h3 className="font-semibold text-lg">
              {category}
            </h3>
          </Link>
        ))}

      </div>

    </section>
  );
}