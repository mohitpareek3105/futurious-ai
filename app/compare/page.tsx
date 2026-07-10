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
              className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
            >
              Browse AI Tools
            </Link>

          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-800">

            <table className="w-full">

              <tbody>

                {/* Tool */}

                <tr className="border-b border-gray-800 bg-[#111827]">
                  <td className="p-5 font-bold w-52">
                    Tool
                  </td>

                  {selectedTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="p-5 text-center font-bold text-xl"
                    >
                      {tool.name}
                    </td>
                  ))}
                </tr>

                {/* Company */}

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

                {/* Rating */}

                <tr className="border-b border-gray-800 bg-[#111827]">
                  <td className="p-5 font-semibold">
                    Rating
                  </td>

                  {selectedTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="p-5 text-center text-yellow-400 font-bold"
                    >
                      ⭐ {tool.rating}
                    </td>
                  ))}
                </tr>

                {/* Pricing */}

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

                {/* Founded */}

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

                {/* Users */}

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

                {/* API */}

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

                {/* Open Source */}

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

                {/* Languages */}

                <tr className="border-b border-gray-800 bg-[#111827]">
                  <td className="p-5 font-semibold">
                    Languages
                  </td>

                  {selectedTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="p-5"
                    >
                      <div className="flex flex-wrap gap-2 justify-center">
                        {tool.languages.map((lang) => (
                          <span
                            key={lang}
                            className="bg-gray-800 px-2 py-1 rounded-full text-xs"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Platforms */}

                <tr className="border-b border-gray-800">
                  <td className="p-5 font-semibold">
                    Platforms
                  </td>

                  {selectedTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="p-5"
                    >
                      <div className="flex flex-wrap gap-2 justify-center">
                        {tool.platforms.map((platform) => (
                          <span
                            key={platform}
                            className="bg-blue-900/30 border border-blue-700 px-2 py-1 rounded-full text-xs"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Website */}

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
                        className="inline-block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
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