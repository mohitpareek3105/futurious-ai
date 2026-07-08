import Link from "next/link";
import { aiTools } from "@/data/ai-tools";

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-10 mt-16">
          All AI Tools
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {aiTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-[#111827] rounded-2xl p-6 border border-gray-800"
            >
              <h2 className="text-2xl font-bold">
                {tool.name}
              </h2>

              <p className="text-gray-400 mt-2">
                {tool.company}
              </p>

              <Link
                href={`/tools/${tool.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="inline-block mt-6 bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                View Details →
              </Link>

            </div>
          ))}

        </div>

      </div>
    </main>
  );
}