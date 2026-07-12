"use client";

import Link from "next/link";

import { useCompare } from "@/hooks/useCompare";
import type { AITool } from "@/types/ai-tool";

type CompareClientProps = {
  tools: AITool[];
};

export default function CompareClient({
  tools,
}: CompareClientProps) {
  const { compare } = useCompare();

  const selectedTools = tools.filter((tool) =>
    compare.includes(tool.id)
  );

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mt-16 text-center text-5xl font-bold">
          Compare AI Tools
        </h1>

        <p className="mt-4 mb-12 text-center text-gray-400">
          Compare your selected AI tools side by side.
        </p>

        {selectedTools.length === 0 ? (
          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold">
              No tools selected
            </h2>

            <Link
              href="/tools"
              className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 hover:bg-blue-700"
            >
              Browse AI Tools
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-800">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-800 bg-[#111827]">
                  <td className="w-52 p-5 font-bold">
                    Tool
                  </td>

                  {selectedTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="p-5 text-center text-xl font-bold"
                    >
                      {tool.name}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="p-5 font-semibold">
                    Company
                  </td>

                  {selectedTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="p-5 text-center"
                    >
                      {tool.company}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-800 bg-[#111827]">
                  <td className="p-5 font-semibold">
                    Rating
                  </td>

                  {selectedTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="p-5 text-center font-bold text-yellow-400"
                    >
                      ⭐ {tool.rating}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="p-5 font-semibold">
                    Pricing
                  </td>

                  {selectedTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="p-5 text-center text-green-400"
                    >
                      {tool.pricing}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-800 bg-[#111827]">
                  <td className="p-5 font-semibold">
                    Founded
                  </td>

                  {selectedTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="p-5 text-center"
                    >
                      {tool.founded}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="p-5 font-semibold">
                    Users
                  </td>

                  {selectedTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="p-5 text-center"
                    >
                      {tool.users}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-800 bg-[#111827]">
                  <td className="p-5 font-semibold">
                    API
                  </td>

                  {selectedTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="p-5 text-center text-2xl"
                    >
                      {tool.api ? "✅" : "❌"}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="p-5 font-semibold">
                    Open Source
                  </td>

                  {selectedTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="p-5 text-center text-2xl"
                    >
                      {tool.openSource ? "✅" : "❌"}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-800 bg-[#111827]">
                  <td className="p-5 font-semibold">
                    Languages
                  </td>

                  {selectedTools.map((tool) => (
                    <td key={tool.id} className="p-5">
                      <div className="flex flex-wrap justify-center gap-2">
                        {tool.languages.map((language) => (
                          <span
                            key={language}
                            className="rounded-full bg-gray-800 px-2 py-1 text-xs"
                          >
                            {language}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-800">
                  <td className="p-5 font-semibold">
                    Platforms
                  </td>

                  {selectedTools.map((tool) => (
                    <td key={tool.id} className="p-5">
                      <div className="flex flex-wrap justify-center gap-2">
                        {tool.platforms.map((platform) => (
                          <span
                            key={platform}
                            className="rounded-full border border-blue-700 bg-blue-900/30 px-2 py-1 text-xs"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                <tr className="bg-[#111827]">
                  <td className="p-5 font-semibold">
                    Official Website
                  </td>

                  {selectedTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="p-5 text-center"
                    >
                      <a
                        href={tool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
                      >
                        Visit →
                      </a>
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