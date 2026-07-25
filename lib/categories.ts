import { createClient } from "@/lib/supabase/server";

export type Category = {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string | null;
  featured: boolean;
  sortOrder: number;
};

type CategoryRow = {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string | null;
  featured: boolean;
  sort_order: number;
};

function mapCategory(category: CategoryRow): Category {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    icon: category.icon,
    description: category.description,
    featured: category.featured,
    sortOrder: category.sort_order,
  };
}

export async function getAllCategories(): Promise<Category[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Unable to load categories: ${error.message}`);
  }

  return (data ?? []).map(mapCategory);
}

export async function getCategoryById(
  id: number,
): Promise<Category | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Unable to load category: ${error.message}`,
    );
  }

  return data ? mapCategory(data) : null;
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Unable to load category: ${error.message}`);
  }

  return data ? mapCategory(data) : null;
}