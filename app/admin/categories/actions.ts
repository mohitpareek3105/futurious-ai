"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";
import type {
  CategoryFormAction,
  CategoryFormState,
  CategoryFormValues,
} from "@/components/admin/CategoryForm";

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function getValues(formData: FormData): CategoryFormValues {
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();

  return {
    name,
    slug: slugify(slugInput || name),
    icon: String(formData.get("icon") ?? "").trim(),
    description: String(
      formData.get("description") ?? "",
    ).trim(),
    sortOrder: Number.parseInt(
  String(formData.get("sortOrder") ?? "0"),
  10,
),
    featured: formData.get("featured") === "on",
  };
}

export const createCategoryAction: CategoryFormAction =
  async (
    previousState: CategoryFormState,
    formData: FormData,
  ) => {
    await requireAdmin();

    const values = getValues(formData);

    const errors: CategoryFormState["errors"] = {};

    if (!values.name) {
      errors.name = "Category name is required.";
    }

    if (!values.slug) {
      errors.slug = "Slug is required.";
    }

    if (!values.icon) {
      errors.icon = "Icon is required.";
    }

    if (
      Number.isNaN(values.sortOrder) ||
      values.sortOrder < 0
    ) {
      errors.sortOrder =
        "Sort order must be zero or greater.";
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: "Please fix the highlighted fields.",
        errors,
        values,
      };
    }

    const supabase = await createClient();

    const { data: existing } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", values.slug)
      .maybeSingle();

    if (existing) {
      return {
        success: false,
        message: "Slug already exists.",
        errors: {
          slug:
            "Another category already uses this slug.",
        },
        values,
      };
    }

    const { error } = await supabase
      .from("categories")
      .insert({
        name: values.name,
        slug: values.slug,
        icon: values.icon,
        description: values.description,
        sort_order: values.sortOrder,
        featured: values.featured,
      });

    if (error) {
      return {
        success: false,
        message: error.message,
        errors: {
          form: error.message,
        },
        values,
      };
    }

    revalidatePath("/admin/categories");
    revalidatePath("/categories");

    redirect(
      "/admin/categories?message=Category created successfully",
    );
  };

  export async function updateCategoryAction(
  categoryId: number,
  previousState: CategoryFormState,
  formData: FormData,
): Promise<CategoryFormState> {
  await requireAdmin();

  const values = getValues(formData);
  const errors: CategoryFormState["errors"] = {};

  if (!Number.isInteger(categoryId) || categoryId <= 0) {
    return {
      success: false,
      message: "Invalid category.",
      errors: {
        form: "The category ID is invalid.",
      },
      values,
    };
  }

  if (!values.name) {
    errors.name = "Category name is required.";
  }

  if (!values.slug) {
    errors.slug = "Slug is required.";
  }

  if (!values.icon) {
    errors.icon = "Icon is required.";
  }

  if (
    !Number.isInteger(values.sortOrder) ||
    values.sortOrder < 0
  ) {
    errors.sortOrder =
      "Sort order must be a whole number of zero or greater.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please fix the highlighted fields.",
      errors,
      values,
    };
  }

  const supabase = await createClient();

  const {
    data: existingCategory,
    error: existingCategoryError,
  } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", values.slug)
    .neq("id", categoryId)
    .maybeSingle();

  if (existingCategoryError) {
    return {
      success: false,
      message: "Unable to validate the category slug.",
      errors: {
        form: existingCategoryError.message,
      },
      values,
    };
  }

  if (existingCategory) {
    return {
      success: false,
      message: "Slug already exists.",
      errors: {
        slug: "Another category already uses this slug.",
      },
      values,
    };
  }

  const { error } = await supabase
    .from("categories")
    .update({
      name: values.name,
      slug: values.slug,
      icon: values.icon,
      description: values.description || null,
      sort_order: values.sortOrder,
      featured: values.featured,
    })
    .eq("id", categoryId);

  if (error) {
    return {
      success: false,
      message: "Unable to update category.",
      errors: {
        form: error.message,
      },
      values,
    };
  }

  revalidatePath("/");
  revalidatePath("/admin/categories");
  revalidatePath("/categories");
  revalidatePath(`/categories/${values.slug}`);
  revalidatePath("/sitemap.xml");

  redirect(
    "/admin/categories?message=Category updated successfully",
  );
}

export async function deleteCategoryAction(
  categoryId: number,
): Promise<void> {
  await requireAdmin();

  if (!Number.isInteger(categoryId) || categoryId <= 0) {
    throw new Error("Invalid category ID.");
  }

  const supabase = await createClient();

  const {
    data: category,
    error: categoryError,
  } = await supabase
    .from("categories")
    .select("id, name, slug")
    .eq("id", categoryId)
    .maybeSingle();

  if (categoryError) {
    throw new Error(
      `Unable to load category: ${categoryError.message}`,
    );
  }

  if (!category) {
    throw new Error("Category not found.");
  }

  const {
    count: assignedToolsCount,
    error: toolsCountError,
  } = await supabase
    .from("tools")
    .select("id", {
      count: "exact",
      head: true,
    })
    .eq("category", category.name);

  if (toolsCountError) {
    throw new Error(
      `Unable to check assigned tools: ${toolsCountError.message}`,
    );
  }

  if ((assignedToolsCount ?? 0) > 0) {
    throw new Error(
      `This category is assigned to ${
        assignedToolsCount ?? 0
      } tool(s) and cannot be deleted.`,
    );
  }

  const { error: deleteError } = await supabase
    .from("categories")
    .delete()
    .eq("id", categoryId);

  if (deleteError) {
    throw new Error(
      `Unable to delete category: ${deleteError.message}`,
    );
  }

  revalidatePath("/");
  revalidatePath("/admin/categories");
  revalidatePath("/categories");
  revalidatePath(`/categories/${category.slug}`);
  revalidatePath("/sitemap.xml");
}