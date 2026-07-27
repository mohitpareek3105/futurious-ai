import Link from "next/link";
import { notFound } from "next/navigation";

import { updatePrompt } from "@/app/admin/prompts/actions";
import PromptForm from "@/components/admin/PromptForm";
import { requireAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";
import type { PromptDifficulty } from "@/types/prompt";

type EditPromptPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type PromptEditRow = {
  id: number;
  title: string;
  slug: string;
  description: string;
  prompt: string;
  category: string;
  tags: string[] | null;
  difficulty: string | null;
  ai_models: string[] | null;
  variables: string[] | null;
  example_input: string | null;
  example_output: string | null;
  tips: string[] | null;
  featured: boolean | null;
  published: boolean | null;
};

function getDifficulty(
  value: string | null,
): PromptDifficulty {
  if (
    value === "Intermediate" ||
    value === "Advanced"
  ) {
    return value;
  }

  return "Beginner";
}

export default async function EditPromptPage({
  params,
}: EditPromptPageProps) {
  await requireAdmin();

  const { id } = await params;
  const promptId = Number(id);

  if (!Number.isInteger(promptId) || promptId <= 0) {
    notFound();
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("prompts")
    .select(
      `
        id,
        title,
        slug,
        description,
        prompt,
        category,
        tags,
        difficulty,
        ai_models,
        variables,
        example_input,
        example_output,
        tips,
        featured,
        published
      `,
    )
    .eq("id", promptId)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const prompt = data as PromptEditRow;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Prompt Library
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white">
            Edit Prompt
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Update {prompt.title}.
          </p>
        </div>

        <Link
          href="/admin/prompts"
          className="inline-flex items-center justify-center rounded-xl border border-gray-700 px-4 py-2 text-sm font-semibold text-gray-300 transition hover:bg-gray-900 hover:text-white"
        >
          Back to Prompts
        </Link>
      </div>

      <PromptForm
        mode="edit"
        action={updatePrompt}
        promptId={String(prompt.id)}
        initialValues={{
          title: prompt.title,
          slug: prompt.slug,
          description: prompt.description,
          prompt: prompt.prompt,
          category: prompt.category,
          tags: prompt.tags ?? [],
          difficulty: getDifficulty(
            prompt.difficulty,
          ),
          aiModels: prompt.ai_models ?? [],
          variables: prompt.variables ?? [],
          exampleInput:
            prompt.example_input ?? "",
          exampleOutput:
            prompt.example_output ?? "",
          tips: prompt.tips ?? [],
          featured: Boolean(prompt.featured),
          published: Boolean(prompt.published),
        }}
      />
    </div>
  );
}