import Link from "next/link";
import { aiTools } from "@/data/ai-tools";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const tools = aiTools.filter(
    (tool) =>
      tool.category.toLowerCase().replace(/\s+/g, "-") === slug
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-16">

      <div className="max-w-7xl mx-auto mt-16">

        <Link
          href="/categories"
          className="text-blue-400 hover:text-blue-300"
        >
          ← Back to Categories
        </Link>

        <h1 className="text-5xl font-bold mt-8 capitalize">
          {slug.replace(/-/g, " ")}
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.name
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-blue-500 transition"
            >
              <h2 className="text-2xl font-bold">
                {tool.name}
              </h2>

              <p className="text-gray-400 mt-2">
                {tool.description}
              </p>
            </Link>
          ))}

        </div>

      </div>

    </main>
  );
}