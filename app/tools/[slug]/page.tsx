import Link from "next/link";
import { notFound } from "next/navigation";

import { getToolBySlug } from "@/lib/tools";

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

  const tool = await getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-16 text-white">
      <div className="mx-auto mt-16 max-w-6xl">
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

        <div className="mt-12">
          <h2 className="text-3xl font-bold">
            Description
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-300">
            {tool.description}
          </p>
        </div>

        <ToolFeatures features={tool.features} />

        <ToolUseCases useCases={tool.useCases} />

        <ToolLanguages languages={tool.languages} />

        <ToolIntegrations
          integrations={tool.integrations}
          api={tool.api}
        />

        <ToolProsCons
          pros={tool.pros}
          cons={tool.cons}
        />

        <SimilarTools currentTool={tool} />

        <div className="mt-16">
          <h2 className="mb-6 text-3xl font-bold">
            Tags
          </h2>

          <div className="flex flex-wrap gap-3">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-blue-600 bg-blue-900/40 px-4 py-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <a
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-16 inline-block rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
        >
          Visit Official Website →
        </a>
      </div>
    </main>
  );
}