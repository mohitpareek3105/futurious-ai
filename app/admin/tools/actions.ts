"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type {
  ToolFormFieldErrors,
  ToolFormState,
  ToolFormValues,
} from "@/components/admin/ToolForm";

import { requireAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

type ToolDatabasePayload = {
  name: string;
  slug: string;
  company: string;
  website: string;
  logo: string;
  cover_image: string;
  category: string;
  tags: string[];
  description: string;
  pricing: string;
  rating: number;
  founded: string;
  users: string;
  platforms: string[];
  features: string[];
  pros: string[];
  cons: string[];
  use_cases: string[];
  integrations: string[];
  api: boolean;
  open_source: boolean;
  languages: string[];
  featured: boolean;
  last_updated: string;
};

function getString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string"
    ? value.trim()
    : "";
}

function getBoolean(formData: FormData, key: string) {
  return formData.get(key) === "true";
}

function getMultilineArray(
  formData: FormData,
  key: string,
) {
  const value = getString(formData, key);

  if (!value) {
    return [];
  }

  return Array.from(
    new Set(
      value
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  );
}

function normalizeSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function isValidHttpUrl(value: string) {
  try {
    const url = new URL(value);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
}

function getToolFormValues(
  formData: FormData,
): ToolFormValues {
  const rawRating = getString(formData, "rating");
  const parsedRating = Number.parseFloat(rawRating);

  return {
    name: getString(formData, "name"),
    slug: normalizeSlug(getString(formData, "slug")),
    company: getString(formData, "company"),
    website: getString(formData, "website"),
    logo: getString(formData, "logo"),
    coverImage: getString(formData, "coverImage"),
    category: getString(formData, "category"),
    tags: getMultilineArray(formData, "tags"),
    description: getString(formData, "description"),
    pricing: getString(formData, "pricing"),
    rating: Number.isFinite(parsedRating)
      ? parsedRating
      : Number.NaN,
    founded: getString(formData, "founded"),
    users: getString(formData, "users"),
    platforms: getMultilineArray(
      formData,
      "platforms",
    ),
    features: getMultilineArray(
      formData,
      "features",
    ),
    pros: getMultilineArray(formData, "pros"),
    cons: getMultilineArray(formData, "cons"),
    useCases: getMultilineArray(
      formData,
      "useCases",
    ),
    integrations: getMultilineArray(
      formData,
      "integrations",
    ),
    api: getBoolean(formData, "api"),
    openSource: getBoolean(
      formData,
      "openSource",
    ),
    languages: getMultilineArray(
      formData,
      "languages",
    ),
    featured: getBoolean(
      formData,
      "featured",
    ),
  };
}

function validateToolForm(
  values: ToolFormValues,
): ToolFormFieldErrors {
  const errors: ToolFormFieldErrors = {};

  if (values.name.length < 2) {
    errors.name =
      "Tool name must contain at least 2 characters.";
  } else if (values.name.length > 100) {
    errors.name =
      "Tool name cannot exceed 100 characters.";
  }

  if (!values.slug) {
    errors.slug = "Slug is required.";
  } else if (
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
      values.slug,
    )
  ) {
    errors.slug =
      "Slug can contain lowercase letters, numbers and single hyphens only.";
  } else if (values.slug.length > 120) {
    errors.slug =
      "Slug cannot exceed 120 characters.";
  }

  if (values.company.length < 2) {
    errors.company =
      "Company must contain at least 2 characters.";
  } else if (values.company.length > 100) {
    errors.company =
      "Company cannot exceed 100 characters.";
  }

  if (!values.category) {
    errors.category = "Category is required.";
  } else if (values.category.length > 100) {
    errors.category =
      "Category cannot exceed 100 characters.";
  }

  if (!values.website) {
    errors.website =
      "Official website is required.";
  } else if (!isValidHttpUrl(values.website)) {
    errors.website =
      "Enter a valid HTTP or HTTPS website URL.";
  }

  if (
    values.logo &&
    !isValidHttpUrl(values.logo)
  ) {
    errors.logo =
      "Enter a valid HTTP or HTTPS logo URL.";
  }

  if (
    values.coverImage &&
    !isValidHttpUrl(values.coverImage)
  ) {
    errors.coverImage =
      "Enter a valid HTTP or HTTPS cover image URL.";
  }

  if (!values.pricing) {
    errors.pricing = "Pricing is required.";
  } else if (values.pricing.length > 100) {
    errors.pricing =
      "Pricing cannot exceed 100 characters.";
  }

  if (
    !Number.isFinite(values.rating) ||
    values.rating < 0 ||
    values.rating > 5
  ) {
    errors.rating =
      "Rating must be a number from 0 to 5.";
  }

  if (!values.description) {
    errors.description =
      "Description is required.";
  } else if (values.description.length < 20) {
    errors.description =
      "Description must contain at least 20 characters.";
  } else if (
    values.description.length > 10000
  ) {
    errors.description =
      "Description cannot exceed 10,000 characters.";
  }

  if (
    values.founded &&
    values.founded.length > 50
  ) {
    errors.founded =
      "Founded value cannot exceed 50 characters.";
  }

  if (
    values.users &&
    values.users.length > 100
  ) {
    errors.users =
      "Users value cannot exceed 100 characters.";
  }

  return errors;
}

function hasValidationErrors(
  errors: ToolFormFieldErrors,
) {
  return Object.keys(errors).length > 0;
}

function toDatabasePayload(
  values: ToolFormValues,
): ToolDatabasePayload {
  return {
    name: values.name,
    slug: values.slug,
    company: values.company,
    website: values.website,
    logo: values.logo,
    cover_image: values.coverImage,
    category: values.category,
    tags: values.tags,
    description: values.description,
    pricing: values.pricing,
    rating: values.rating,
    founded: values.founded,
    users: values.users,
    platforms: values.platforms,
    features: values.features,
    pros: values.pros,
    cons: values.cons,
    use_cases: values.useCases,
    integrations: values.integrations,
    api: values.api,
    open_source: values.openSource,
    languages: values.languages,
    featured: values.featured,
    last_updated: new Date().toISOString(),
  };
}

async function slugAlreadyExists({
  slug,
  excludeToolId,
}: {
  slug: string;
  excludeToolId?: number;
}) {
  const supabase = await createClient();

  let query = supabase
    .from("tools")
    .select("id")
    .eq("slug", slug);

  if (excludeToolId !== undefined) {
    query = query.neq("id", excludeToolId);
  }

  const {
    data,
    error,
  } = await query.limit(1).maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return Boolean(data);
}

function getFormErrorState(
  message: string,
  values?: Partial<ToolFormValues>,
  errors: ToolFormFieldErrors = {},
): ToolFormState {
  return {
    success: false,
    message,
    errors,
    values,
  };
}

function revalidateToolPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/tools");
  revalidatePath("/categories");
  revalidatePath("/admin");
  revalidatePath("/admin/tools");
  revalidatePath("/sitemap.xml");

  if (slug) {
    revalidatePath(`/tools/${slug}`);
  }
}

export async function updateTool(
  toolId: number,
  _previousState: ToolFormState,
  formData: FormData,
): Promise<ToolFormState> {
  await requireAdmin();

  const id = getValidToolId(toolId);
  const values = getToolFormValues(formData);
  const errors = validateToolForm(values);

  if (hasValidationErrors(errors)) {
    return getFormErrorState(
      "Please correct the highlighted fields.",
      values,
      errors,
    );
  }

  try {
    const supabase = await createClient();

    const {
      data: existingTool,
      error: readError,
    } = await supabase
      .from("tools")
      .select("id, name, slug")
      .eq("id", id)
      .maybeSingle();

    if (readError) {
      return getFormErrorState(
        "The tool could not be loaded.",
        values,
        {
          form: readError.message,
        },
      );
    }

    if (!existingTool) {
      return getFormErrorState(
        "The tool was not found.",
        values,
        {
          form:
            "This tool may have been deleted by another administrator.",
        },
      );
    }

    const duplicateSlug = await slugAlreadyExists({
      slug: values.slug,
      excludeToolId: id,
    });

    if (duplicateSlug) {
      return getFormErrorState(
        "A tool with this slug already exists.",
        values,
        {
          slug:
            "This slug is already in use. Enter a different slug.",
        },
      );
    }

    const payload = toDatabasePayload(values);

    const { error: updateError } = await supabase
      .from("tools")
      .update(payload)
      .eq("id", id);

    if (updateError) {
      if (updateError.code === "23505") {
        return getFormErrorState(
          "A tool with the same unique information already exists.",
          values,
          {
            slug:
              "This slug is already in use. Enter a different slug.",
          },
        );
      }

      return getFormErrorState(
        "The tool could not be updated. Please try again.",
        values,
        {
          form: updateError.message,
        },
      );
    }

    revalidateToolPaths(existingTool.slug);

    if (existingTool.slug !== values.slug) {
      revalidateToolPaths(values.slug);
    }
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred.";

    return getFormErrorState(
      "The tool could not be updated. Please try again.",
      values,
      {
        form: message,
      },
    );
  }

  redirect(
    `/admin/tools?message=${encodeURIComponent(
      `${values.name} was updated successfully.`,
    )}`,
  );
}

export async function createTool(
  _previousState: ToolFormState,
  formData: FormData,
): Promise<ToolFormState> {
  await requireAdmin();

  const values = getToolFormValues(formData);
  const errors = validateToolForm(values);

  if (hasValidationErrors(errors)) {
    return getFormErrorState(
      "Please correct the highlighted fields.",
      values,
      errors,
    );
  }

  try {
    const duplicateSlug = await slugAlreadyExists({
      slug: values.slug,
    });

    if (duplicateSlug) {
      return getFormErrorState(
        "A tool with this slug already exists.",
        values,
        {
          slug:
            "This slug is already in use. Enter a different slug.",
        },
      );
    }

    const supabase = await createClient();
    const payload = toDatabasePayload(values);

    const { error } = await supabase
      .from("tools")
      .insert(payload);

    if (error) {
      if (error.code === "23505") {
        return getFormErrorState(
          "A tool with the same unique information already exists.",
          values,
          {
            slug:
              "This slug is already in use. Enter a different slug.",
          },
        );
      }

      return getFormErrorState(
        "The tool could not be created. Please try again.",
        values,
        {
          form: error.message,
        },
      );
    }
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred.";

    return getFormErrorState(
      "The tool could not be created. Please try again.",
      values,
      {
        form: message,
      },
    );
  }

  revalidateToolPaths(values.slug);

  redirect(
    `/admin/tools?message=${encodeURIComponent(
      `${values.name} was created successfully.`,
    )}`,
  );
}

function getValidToolId(value: number) {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error("Invalid tool ID.");
  }

  return value;
}

function getSafeReturnPath(value: string) {
  if (
    !value.startsWith("/admin/tools") ||
    value.startsWith("//") ||
    value.includes("://")
  ) {
    return "/admin/tools";
  }

  return value;
}

export async function toggleToolFeatured(
  toolId: number,
  featured: boolean,
  returnPath: string,
) {
  await requireAdmin();

  const id = getValidToolId(toolId);
  const safeReturnPath = getSafeReturnPath(returnPath);
  const supabase = await createClient();

  const { error } = await supabase
    .from("tools")
    .update({
      featured,
      last_updated: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    redirect(
      `${safeReturnPath}${
        safeReturnPath.includes("?") ? "&" : "?"
      }error=${encodeURIComponent(error.message)}`,
    );
  }

  revalidatePath("/");
  revalidatePath("/tools");
  revalidatePath("/admin");
  revalidatePath("/admin/tools");

  redirect(
    `${safeReturnPath}${
      safeReturnPath.includes("?") ? "&" : "?"
    }message=${encodeURIComponent(
      featured
        ? "Tool added to featured tools."
        : "Tool removed from featured tools.",
    )}`,
  );
}

export async function deleteTool(
  toolId: number,
  returnPath: string,
) {
  await requireAdmin();

  const id = getValidToolId(toolId);
  const safeReturnPath = getSafeReturnPath(returnPath);
  const supabase = await createClient();

  const { data: tool, error: readError } = await supabase
    .from("tools")
    .select("name")
    .eq("id", id)
    .maybeSingle();

  if (readError) {
    redirect(
      `${safeReturnPath}${
        safeReturnPath.includes("?") ? "&" : "?"
      }error=${encodeURIComponent(readError.message)}`,
    );
  }

  if (!tool) {
    redirect(
      `${safeReturnPath}${
        safeReturnPath.includes("?") ? "&" : "?"
      }error=${encodeURIComponent("Tool was not found.")}`,
    );
  }

  const { error } = await supabase
    .from("tools")
    .delete()
    .eq("id", id);

  if (error) {
    redirect(
      `${safeReturnPath}${
        safeReturnPath.includes("?") ? "&" : "?"
      }error=${encodeURIComponent(error.message)}`,
    );
  }

  revalidatePath("/");
  revalidatePath("/tools");
  revalidatePath("/admin");
  revalidatePath("/admin/tools");

  redirect(
    `/admin/tools?message=${encodeURIComponent(
      `${tool.name} was deleted successfully.`,
    )}`,
  );
}