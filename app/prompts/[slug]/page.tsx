import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { prompts } from "@/data/prompts";
import { siteConfig } from "@/lib/site-config";
import { ArrowLeft } from "lucide-react";

import PromptDetail from "@/components/prompt/PromptDetail";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

function createPromptDescription(
  title: string,
  description: string,
) {
  const fallback =
    `Use this ${title} AI prompt to generate better, clearer and more useful results. ` +
    `Copy and customize it from the FuturiousAI prompt library.`;

  const sourceDescription =
    description?.replace(/\s+/g, " ").trim() || fallback;

  return sourceDescription.length > 160
    ? `${sourceDescription.slice(0, 157).trimEnd()}...`
    : sourceDescription;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const prompt = prompts.find(
    (item) => item.slug === slug,
  );

  if (!prompt) {
    return {
      title: "AI Prompt Not Found",
      description:
        "The requested AI prompt could not be found in the FuturiousAI prompt library.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${prompt.title} — AI Prompt Template`;

  const description = createPromptDescription(
    prompt.title,
    prompt.description,
  );

  const canonicalPath = `/prompts/${prompt.slug}`;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalPath,
    },

    openGraph: {
      type: "article",
      url: canonicalPath,
      siteName: siteConfig.name,
      title,
      description,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },

    keywords: [
      prompt.title,
      `${prompt.title} prompt`,
      "AI prompt",
      "AI prompt template",
      "ChatGPT prompts",
      "prompt library",
      "artificial intelligence prompts",
      "FuturiousAI",
    ],
  };
}

export default async function PromptPage({
  params,
}: Props) {
  const { slug } = await params;

  const prompt = prompts.find(
    (item) => item.slug === slug,
  );

  if (!prompt) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-16 text-white">
      <div className="mx-auto mt-16 max-w-5xl">
        <Link
  href="/prompts"
  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
>
  <ArrowLeft className="h-4 w-4" />
  Back to Prompt Library
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