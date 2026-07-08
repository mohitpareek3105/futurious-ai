import { aiTools } from "@/data/ai-tools";
import Link from "next/link";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;

  const tool = aiTools.find(
    (item) =>
      item.name.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
  );

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-5xl font-bold">Tool Not Found 😔</h1>

        <Link
          href="/"
          className="mt-8 bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-16">
      <div className="max-w-5xl mx-auto mt-16">
        <Link
          href="/tools"
          className="text-blue-400 hover:text-blue-300"
        >
          ← Back to All Tools
        </Link>

        <h1 className="text-6xl font-bold mt-8">
          {tool.name}
        </h1>

        <p className="text-xl text-gray-400 mt-3">
          {tool.company}
        </p>

        <div className="flex gap-4 mt-8 flex-wrap">
          <span className="bg-blue-600 px-4 py-2 rounded-full">
            {tool.category}
          </span>

          <span className="bg-green-600 px-4 py-2 rounded-full">
            {tool.pricing}
          </span>

          <span className="bg-yellow-500 text-black px-4 py-2 rounded-full">
            ⭐ {tool.rating}
          </span>
        </div>

        <p className="mt-10 text-lg leading-8 text-gray-300">
          {tool.description}
        </p>

        <a
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-12 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition"
        >
          Visit Official Website →
        </a>
      </div>
    </main>
  );
}