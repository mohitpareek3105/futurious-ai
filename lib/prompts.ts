import type {
  Prompt,
  PromptDifficulty,
  PromptRow,
} from "@/types/prompt";

import { createClient } from "@/lib/supabase/server";

function normalizeStringArray(
  value: string[] | null | undefined,
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeDifficulty(
  value: string | null | undefined,
): PromptDifficulty {
  if (
    value === "Intermediate" ||
    value === "Advanced"
  ) {
    return value;
  }

  return "Beginner";
}

export function mapPromptRow(row: PromptRow): Prompt {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    prompt: row.prompt,
    category: row.category,

    tags: normalizeStringArray(row.tags),
    difficulty: normalizeDifficulty(row.difficulty),
    aiModels: normalizeStringArray(row.ai_models),
    variables: normalizeStringArray(row.variables),

    exampleInput: row.example_input ?? "",
    exampleOutput: row.example_output ?? "",
    tips: normalizeStringArray(row.tips),

    featured: Boolean(row.featured),
    published: Boolean(row.published),

    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const PUBLIC_PROMPT_COLUMNS = `
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
  published,
  published_at,
  created_at,
  updated_at
`;

export async function getPublishedPrompts(): Promise<Prompt[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("prompts")
    .select(PUBLIC_PROMPT_COLUMNS)
    .eq("published", true)
    .order("featured", {
      ascending: false,
    })
    .order("published_at", {
      ascending: false,
      nullsFirst: false,
    })
    .order("title", {
      ascending: true,
    });

  if (error) {
    throw new Error(
      `Unable to load published prompts: ${error.message}`,
    );
  }

  return ((data ?? []) as unknown as PromptRow[]).map(
    mapPromptRow,
  );
}

export async function getPromptBySlug(
  slug: string,
): Promise<Prompt | null> {
  const normalizedSlug = slug.trim().toLowerCase();

  if (!normalizedSlug) {
    return null;
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("prompts")
    .select(PUBLIC_PROMPT_COLUMNS)
    .eq("slug", normalizedSlug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Unable to load prompt: ${error.message}`,
    );
  }

  return data
    ? mapPromptRow(data as unknown as PromptRow)
    : null;
}

export async function getRelatedPrompts({
  promptId,
  category,
  limit = 4,
}: {
  promptId: number;
  category: string;
  limit?: number;
}): Promise<Prompt[]> {
  const safeLimit = Math.min(
    Math.max(Math.trunc(limit), 1),
    12,
  );

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("prompts")
    .select(PUBLIC_PROMPT_COLUMNS)
    .eq("published", true)
    .eq("category", category)
    .neq("id", promptId)
    .order("featured", {
      ascending: false,
    })
    .order("published_at", {
      ascending: false,
      nullsFirst: false,
    })
    .limit(safeLimit);

  if (error) {
    throw new Error(
      `Unable to load related prompts: ${error.message}`,
    );
  }

  return ((data ?? []) as unknown as PromptRow[]).map(
    mapPromptRow,
  );
}

export async function getPublishedPromptCount(): Promise<number> {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("prompts")
    .select("id", {
      count: "exact",
      head: true,
    })
    .eq("published", true);

  if (error) {
    throw new Error(
      `Unable to count published prompts: ${error.message}`,
    );
  }

  return count ?? 0;
}