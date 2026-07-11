import Link from "next/link";
import { prompts } from "@/data/prompts";
import PromptDetail from "@/components/prompt/PromptDetail";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PromptPage({ params }: Props) {

  const { slug } = await params;

  const prompt = prompts.find(
    (item) => item.slug === slug
  );

  if (!prompt) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <h1 className="text-5xl font-bold">
          Prompt Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-16">

      <div className="max-w-5xl mx-auto mt-16">

        <Link
          href="/prompts"
          className="text-blue-400 hover:text-blue-300"
        >
          ← Back to Prompt Library
        </Link>

        <PromptDetail
          title={prompt.title}
          description={prompt.description}
          prompt={prompt.prompt}
        />

      </div>

    </main>
  );
}