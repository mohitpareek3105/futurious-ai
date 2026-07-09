"use client";

import Link from "next/link";
import { aiTools } from "@/data/ai-tools";
import { useCompare } from "@/hooks/useCompare";

export default function ComparePage() {
  const { compare } = useCompare();

  const selectedTools = aiTools.filter((tool) =>
    compare.includes(tool.id)
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mt-16">
          Compare AI Tools
        </h1>

        <p className="text-center text-gray-400 mt-4 mb-12">
          Compare your selected AI tools side by side.
        </p>

        {selectedTools.length === 0 ? (
          <div className="text-center mt-24">

            <h2 className="text-3xl font-bold">
              No tools selected
            </h2>

            <Link
              href="/tools"
              className="inline-block mt-8 bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700"
            >
              Browse AI Tools
            </Link>

          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full border border-gray-800">

              <tbody>

                <tr className="border-b border-gray-800">
                  <td className="p-4 font-bold">Tool</td>

                  {selectedTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="p-4 text-center font-bold"
                    >
                      {tool.name}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="p-4 font-bold">Company</td>

                  {selectedTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="p-4 text-center"
                    >
                      {tool.company}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="p-4 font-bold">Rating</td>

                  {selectedTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="p-4 text-center"
                    >
                      ⭐ {tool.rating}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="p-4 font-bold">Pricing</td>

                  {selectedTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="p-4 text-center"
                    >
                      {tool.pricing}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="p-4 font-bold">Category</td>

                  {selectedTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="p-4 text-center"
                    >
                      {tool.category}
                    </td>
                  ))}
                </tr>

              </tbody>

            </table>

          </div>
        )}

      </div>
    </main>
  );
}