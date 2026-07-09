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
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Tool Not Found 😔</h1>

          <Link
            href="/tools"
            className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
          >
            ← Back to All Tools
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-16">
      <div className="max-w-6xl mx-auto mt-16">

        <Link
          href="/tools"
          className="text-blue-400 hover:text-blue-300"
        >
          ← Back to All Tools
        </Link>

        {/* Header */}

        <div className="flex items-center gap-6 mt-10">

          <div className="w-24 h-24 rounded-2xl bg-white text-black flex items-center justify-center text-5xl font-bold">
            {tool.name.charAt(0)}
          </div>

          <div>

            <h1 className="text-6xl font-bold">
              {tool.name}
            </h1>

            <p className="text-2xl text-gray-400 mt-2">
              {tool.company}
            </p>

          </div>

        </div>

        {/* Badges */}

        <div className="flex flex-wrap gap-4 mt-10">

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

        {/* Description */}

        <div className="mt-12">

          <h2 className="text-3xl font-bold">
            Description
          </h2>

          <p className="text-gray-300 text-lg leading-8 mt-5">
            {tool.description}
          </p>

        </div>

        {/* Information */}

        <div className="grid md:grid-cols-2 gap-8 mt-16">

          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">

            <h2 className="text-2xl font-bold mb-6">
              Tool Information
            </h2>

            <div className="space-y-4">

              <p>
                <span className="text-gray-400">Founded:</span>{" "}
                {tool.founded}
              </p>

              <p>
                <span className="text-gray-400">Users:</span>{" "}
                {tool.users}
              </p>

              <div>

                <p className="text-gray-400 mb-2">
                  Platforms
                </p>

                <div className="flex flex-wrap gap-2">

                  {tool.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {platform}
                    </span>
                  ))}

                </div>

              </div>

            </div>

          </div>

          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">

            <h2 className="text-2xl font-bold mb-6">
              Pros
            </h2>

            <ul className="space-y-3">

              {tool.pros.map((pro) => (
                <li key={pro}>
                  ✅ {pro}
                </li>
              ))}

            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-6">
              Cons
            </h2>

            <ul className="space-y-3">

              {tool.cons.map((con) => (
                <li key={con}>
                  ❌ {con}
                </li>
              ))}

            </ul>

          </div>

        </div>

        {/* Tags */}

        <div className="mt-16">

          <h2 className="text-3xl font-bold mb-6">
            Tags
          </h2>

          <div className="flex flex-wrap gap-3">

            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-900/40 border border-blue-600 px-4 py-2 rounded-full"
              >
                {tag}
              </span>
            ))}

          </div>

        </div>

        {/* Button */}

        <a
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-16 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition"
        >
          Visit Official Website →
        </a>

      </div>
    </main>
  );
}