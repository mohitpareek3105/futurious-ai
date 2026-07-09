import Link from "next/link";

export default function PromptsPage() {
  const prompts = [
    "ChatGPT Prompts",
    "Midjourney Prompts",
    "Claude Prompts",
    "Gemini Prompts",
    "Coding Prompts",
    "Marketing Prompts",
    "SEO Prompts",
    "Business Prompts",
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-20">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center">
          Prompt Library
        </h1>

        <p className="text-center text-gray-400 mt-4 mb-16">
          Discover high-quality AI prompts for every use case.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {prompts.map((prompt) => (
            <Link
              key={prompt}
              href="#"
              className="bg-[#111827] border border-gray-800 rounded-2xl p-8 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300 text-center"
            >
              <h2 className="text-xl font-bold">
                {prompt}
              </h2>
            </Link>
          ))}

        </div>

      </div>
    </main>
  );
}