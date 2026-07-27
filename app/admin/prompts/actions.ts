"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type {
  PromptFormState,
  PromptFormValues,
} from "@/components/admin/PromptForm";
import { requireAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

function getFormString(
  formData: FormData,
  fieldName: string,
): string {
  const value = formData.get(fieldName);

  return typeof value === "string" ? value.trim() : "";
}

function normalizeSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseList(value: string): string[] {
  return Array.from(
    new Set(
      value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  );
}

function parsePromptFormData(
  formData: FormData,
): PromptFormValues {
  const difficulty = getFormString(
    formData,
    "difficulty",
  );

  return {
    title: getFormString(formData, "title"),

    slug: normalizeSlug(
      getFormString(formData, "slug"),
    ),

    description: getFormString(
      formData,
      "description",
    ),

    prompt: getFormString(formData, "prompt"),

    category: getFormString(formData, "category"),

    tags: parseList(
      getFormString(formData, "tags"),
    ),

    difficulty:
      difficulty === "Intermediate" ||
      difficulty === "Advanced"
        ? difficulty
        : "Beginner",

    aiModels: parseList(
      getFormString(formData, "aiModels"),
    ),

    variables: parseList(
      getFormString(formData, "variables"),
    ),

    exampleInput: getFormString(
      formData,
      "exampleInput",
    ),

    exampleOutput: getFormString(
      formData,
      "exampleOutput",
    ),

    tips: parseList(
      getFormString(formData, "tips"),
    ),

    featured: formData.get("featured") === "true",

    published:
      formData.get("published") === "true",
  };
}

function validatePromptValues(
  values: PromptFormValues,
): PromptFormState["errors"] {
  const errors: PromptFormState["errors"] = {};

  if (!values.title) {
    errors.title = "Prompt title is required.";
  } else if (values.title.length < 5) {
    errors.title =
      "Prompt title must contain at least 5 characters.";
  } else if (values.title.length > 200) {
    errors.title =
      "Prompt title cannot exceed 200 characters.";
  }

  if (!values.slug) {
    errors.slug = "URL slug is required.";
  } else if (
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
      values.slug,
    )
  ) {
    errors.slug =
      "Slug may contain lowercase letters, numbers and hyphens only.";
  } else if (values.slug.length > 200) {
    errors.slug =
      "URL slug cannot exceed 200 characters.";
  }

  if (!values.description) {
    errors.description =
      "Prompt description is required.";
  } else if (values.description.length < 20) {
    errors.description =
      "Description must contain at least 20 characters.";
  } else if (values.description.length > 500) {
    errors.description =
      "Description cannot exceed 500 characters.";
  }

  if (!values.prompt) {
    errors.prompt = "Prompt content is required.";
  } else if (values.prompt.length < 20) {
    errors.prompt =
      "Prompt content must contain at least 20 characters.";
  }

  if (!values.category) {
    errors.category = "Prompt category is required.";
  } else if (values.category.length < 2) {
    errors.category =
      "Category must contain at least 2 characters.";
  } else if (values.category.length > 100) {
    errors.category =
      "Category cannot exceed 100 characters.";
  }

  if (values.tags.length > 20) {
    errors.tags =
      "A prompt can contain a maximum of 20 tags.";
  }

  if (values.aiModels.length > 20) {
    errors.aiModels =
      "A prompt can contain a maximum of 20 AI models.";
  }

  if (values.variables.length > 30) {
    errors.variables =
      "A prompt can contain a maximum of 30 variables.";
  }

  if (values.tips.length > 20) {
    errors.tips =
      "A prompt can contain a maximum of 20 tips.";
  }

  return errors;
}

function hasValidationErrors(
  errors: PromptFormState["errors"],
): boolean {
  return Object.keys(errors).length > 0;
}

function revalidatePromptPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/prompts");
  revalidatePath("/admin");
  revalidatePath("/admin/prompts");
  revalidatePath("/sitemap.xml");

  if (slug) {
    revalidatePath(`/prompts/${slug}`);
  }
}

export async function createPrompt(
  previousState: PromptFormState,
  formData: FormData,
): Promise<PromptFormState> {
  await requireAdmin();

  const values = parsePromptFormData(formData);
  const errors = validatePromptValues(values);

  if (hasValidationErrors(errors)) {
    return {
      success: false,
      message:
        "Please correct the highlighted fields and try again.",
      errors,
      values,
    };
  }

  const supabase = await createClient();

  const { data: existingPrompt, error: slugError } =
    await supabase
      .from("prompts")
      .select("id")
      .eq("slug", values.slug)
      .maybeSingle();

  if (slugError) {
    return {
      success: false,
      message:
        "Unable to verify the prompt URL slug.",
      errors: {
        form: slugError.message,
      },
      values,
    };
  }

  if (existingPrompt) {
    return {
      success: false,
      message:
        "A prompt with this URL slug already exists.",
      errors: {
        slug:
          "Choose a different URL slug for this prompt.",
      },
      values,
    };
  }

  const now = new Date().toISOString();

  const { error: insertError } = await supabase
    .from("prompts")
    .insert({
      title: values.title,
      slug: values.slug,
      description: values.description,
      prompt: values.prompt,
      category: values.category,
      tags: values.tags,
      difficulty: values.difficulty,
      ai_models: values.aiModels,
      variables: values.variables,
      example_input: values.exampleInput,
      example_output: values.exampleOutput,
      tips: values.tips,
      featured: values.featured,
      published: values.published,
      published_at: values.published ? now : null,
      updated_at: now,
    });

  if (insertError) {
    const duplicateSlug =
      insertError.code === "23505";

    return {
      success: false,
      message: duplicateSlug
        ? "A prompt with this URL slug already exists."
        : "Unable to create the prompt.",
      errors: duplicateSlug
        ? {
            slug:
              "Choose a different URL slug for this prompt.",
          }
        : {
            form: insertError.message,
          },
      values,
    };
  }

  revalidatePromptPaths(values.slug);

  redirect(
    `/admin/prompts?message=${encodeURIComponent(
      `${values.title} was created successfully.`,
    )}`,
  );
}

export async function updatePrompt(
  previousState: PromptFormState,
  formData: FormData,
): Promise<PromptFormState> {
  await requireAdmin();

  const promptId = Number(
    getFormString(formData, "promptId"),
  );

  if (!Number.isInteger(promptId) || promptId <= 0) {
    return {
      success: false,
      message: "Unable to update the prompt.",
      errors: {
        form: "Invalid prompt ID.",
      },
    };
  }

  const values = parsePromptFormData(formData);
  const errors = validatePromptValues(values);

  if (hasValidationErrors(errors)) {
    return {
      success: false,
      message:
        "Please correct the highlighted fields and try again.",
      errors,
      values,
    };
  }

  const supabase = await createClient();

  const { data: existingPrompt, error: readError } =
    await supabase
      .from("prompts")
      .select(
        "id, title, slug, published, published_at",
      )
      .eq("id", promptId)
      .maybeSingle();

  if (readError) {
    return {
      success: false,
      message: "Unable to load the prompt.",
      errors: {
        form: readError.message,
      },
      values,
    };
  }

  if (!existingPrompt) {
    return {
      success: false,
      message: "The prompt was not found.",
      errors: {
        form:
          "This prompt may have been deleted. Return to the prompt list and try again.",
      },
      values,
    };
  }

  const { data: duplicatePrompt, error: slugError } =
    await supabase
      .from("prompts")
      .select("id")
      .eq("slug", values.slug)
      .neq("id", promptId)
      .maybeSingle();

  if (slugError) {
    return {
      success: false,
      message:
        "Unable to verify the prompt URL slug.",
      errors: {
        form: slugError.message,
      },
      values,
    };
  }

  if (duplicatePrompt) {
    return {
      success: false,
      message:
        "A prompt with this URL slug already exists.",
      errors: {
        slug:
          "Choose a different URL slug for this prompt.",
      },
      values,
    };
  }

  const now = new Date().toISOString();

  const publishedAt = values.published
    ? existingPrompt.published_at ?? now
    : null;

  const { error: updateError } = await supabase
    .from("prompts")
    .update({
      title: values.title,
      slug: values.slug,
      description: values.description,
      prompt: values.prompt,
      category: values.category,
      tags: values.tags,
      difficulty: values.difficulty,
      ai_models: values.aiModels,
      variables: values.variables,
      example_input: values.exampleInput,
      example_output: values.exampleOutput,
      tips: values.tips,
      featured: values.featured,
      published: values.published,
      published_at: publishedAt,
      updated_at: now,
    })
    .eq("id", promptId);

  if (updateError) {
    const duplicateSlug =
      updateError.code === "23505";

    return {
      success: false,
      message: duplicateSlug
        ? "A prompt with this URL slug already exists."
        : "Unable to update the prompt.",
      errors: duplicateSlug
        ? {
            slug:
              "Choose a different URL slug for this prompt.",
          }
        : {
            form: updateError.message,
          },
      values,
    };
  }

  revalidatePromptPaths(existingPrompt.slug);

  if (existingPrompt.slug !== values.slug) {
    revalidatePromptPaths(values.slug);
  }

  redirect(
    `/admin/prompts?message=${encodeURIComponent(
      `${values.title} was updated successfully.`,
    )}`,
  );
}
function getValidPromptId(value: number): number {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error("Invalid prompt ID.");
  }

  return value;
}

function getSafeReturnPath(value: string): string {
  if (
    !value.startsWith("/admin/prompts") ||
    value.startsWith("//") ||
    value.includes("://")
  ) {
    return "/admin/prompts";
  }

  return value;
}

function appendMessage(
  returnPath: string,
  key: "message" | "error",
  message: string,
): string {
  const separator = returnPath.includes("?") ? "&" : "?";

  return `${returnPath}${separator}${key}=${encodeURIComponent(
    message,
  )}`;
}

export async function togglePromptFeatured(
  promptId: number,
  featured: boolean,
  returnPath: string,
) {
  await requireAdmin();

  const id = getValidPromptId(promptId);
  const safeReturnPath = getSafeReturnPath(returnPath);
  const supabase = await createClient();

  const { data: prompt, error: readError } =
    await supabase
      .from("prompts")
      .select("slug")
      .eq("id", id)
      .maybeSingle();

  if (readError) {
    redirect(
      appendMessage(
        safeReturnPath,
        "error",
        readError.message,
      ),
    );
  }

  if (!prompt) {
    redirect(
      appendMessage(
        safeReturnPath,
        "error",
        "Prompt was not found.",
      ),
    );
  }

  const { error } = await supabase
    .from("prompts")
    .update({
      featured,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    redirect(
      appendMessage(
        safeReturnPath,
        "error",
        error.message,
      ),
    );
  }

  revalidatePromptPaths(prompt.slug);

  redirect(
    appendMessage(
      safeReturnPath,
      "message",
      featured
        ? "Prompt added to featured prompts."
        : "Prompt removed from featured prompts.",
    ),
  );
}

export async function togglePromptPublished(
  promptId: number,
  published: boolean,
  returnPath: string,
) {
  await requireAdmin();

  const id = getValidPromptId(promptId);
  const safeReturnPath = getSafeReturnPath(returnPath);
  const supabase = await createClient();

  const { data: prompt, error: readError } =
    await supabase
      .from("prompts")
      .select("slug, published_at")
      .eq("id", id)
      .maybeSingle();

  if (readError) {
    redirect(
      appendMessage(
        safeReturnPath,
        "error",
        readError.message,
      ),
    );
  }

  if (!prompt) {
    redirect(
      appendMessage(
        safeReturnPath,
        "error",
        "Prompt was not found.",
      ),
    );
  }

  const { error } = await supabase
    .from("prompts")
    .update({
      published,
      published_at: published
        ? prompt.published_at ??
          new Date().toISOString()
        : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    redirect(
      appendMessage(
        safeReturnPath,
        "error",
        error.message,
      ),
    );
  }

  revalidatePromptPaths(prompt.slug);

  redirect(
    appendMessage(
      safeReturnPath,
      "message",
      published
        ? "Prompt published successfully."
        : "Prompt moved to draft.",
    ),
  );
}

export async function deletePrompt(
  promptId: number,
  returnPath: string,
) {
  await requireAdmin();

  const id = getValidPromptId(promptId);
  const safeReturnPath = getSafeReturnPath(returnPath);
  const supabase = await createClient();

  const { data: prompt, error: readError } =
    await supabase
      .from("prompts")
      .select("title, slug")
      .eq("id", id)
      .maybeSingle();

  if (readError) {
    redirect(
      appendMessage(
        safeReturnPath,
        "error",
        readError.message,
      ),
    );
  }

  if (!prompt) {
    redirect(
      appendMessage(
        safeReturnPath,
        "error",
        "Prompt was not found.",
      ),
    );
  }

  const { error } = await supabase
    .from("prompts")
    .delete()
    .eq("id", id);

  if (error) {
    redirect(
      appendMessage(
        safeReturnPath,
        "error",
        error.message,
      ),
    );
  }

  revalidatePromptPaths(prompt.slug);

  redirect(
    `/admin/prompts?message=${encodeURIComponent(
      `${prompt.title} was deleted successfully.`,
    )}`,
  );
}