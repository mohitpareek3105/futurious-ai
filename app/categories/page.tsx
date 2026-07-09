import Link from "next/link";

export default function CategoriesPage() {
  const categories = [
    "AI Assistant",
    "Image Generator",
    "Video Generator",
    "Writing",
    "Coding",
    "Productivity",
    "Voice AI",
    "Marketing",
    "Design",
    "Education",
    "Music",
    "Research",
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-20">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center">
          AI Categories
        </h1>

        <p className="text-center text-gray-400 mt-4 mb-16">
          Browse AI tools by category.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {categories.map((category) => (
            <Link
              key={category}
              href="/tools"
              className="bg-[#111827] border border-gray-800 rounded-2xl p-8 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300 text-center"
            >
              <h2 className="text-2xl font-bold">
                {category}
              </h2>
            </Link>
          ))}

        </div>

      </div>
    </main>
  );
}