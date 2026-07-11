import { aiTools } from "@/data/ai-tools";
import Link from "next/link";

import ToolHeader from "@/components/tool/ToolHeader";
import ToolQuickInfo from "@/components/tool/ToolQuickInfo";
import ToolFeatures from "@/components/tool/ToolFeatures";
import ToolUseCases from "@/components/tool/ToolUseCases";
import ToolIntegrations from "@/components/tool/ToolIntegrations";
import ToolLanguages from "@/components/tool/ToolLanguages";
import ToolProsCons from "@/components/tool/ToolProsCons";
import SimilarTools from "@/components/tool/SimilarTools";
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
          <h1 className="text-5xl font-bold">
            Tool Not Found 😔
          </h1>

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

        <ToolHeader tool={tool} />
<ToolQuickInfo
  founded={tool.founded}
  users={tool.users}
  pricing={tool.pricing}
  rating={tool.rating}
/>
        {/* Description */}

        <div className="mt-12">

          <h2 className="text-3xl font-bold">
            Description
          </h2>

          <p className="text-gray-300 text-lg leading-8 mt-5">
            {tool.description}
          </p>

        </div>

        <ToolFeatures features={tool.features} />
<ToolUseCases
  useCases={tool.useCases}
/>
<ToolLanguages
  languages={tool.languages}
/>
<ToolIntegrations
  integrations={tool.integrations}
  api={tool.api}
/>
<ToolProsCons
  pros={tool.pros}
  cons={tool.cons}
/>
<SimilarTools
  currentTool={tool}
/>
        
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

        {/* Visit Website */}

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