import { supabase } from "@/lib/supabase";
import type { AITool } from "@/types/ai-tool";

type ToolRow = {
  id: number;
  name: string;
  company: string;
  slug: string;
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

function mapTool(tool: ToolRow): AITool {
  return {
    id: tool.id,
    name: tool.name,
    company: tool.company,
    website: tool.website,
    logo: tool.logo,
    coverImage: tool.cover_image,
    category: tool.category,
    tags: tool.tags ?? [],
    description: tool.description,
    pricing: tool.pricing,
    rating: tool.rating,
    founded: tool.founded,
    users: tool.users,
    platforms: tool.platforms ?? [],
    features: tool.features ?? [],
    pros: tool.pros ?? [],
    cons: tool.cons ?? [],
    useCases: tool.use_cases ?? [],
    integrations: tool.integrations ?? [],
    api: tool.api,
    openSource: tool.open_source,
    languages: tool.languages ?? [],
    featured: tool.featured,
    lastUpdated: tool.last_updated,
  };
}

export async function getAllTools(): Promise<AITool[]> {
  const { data, error } = await supabase
    .from("tools")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Failed to fetch tools:", error.message);
    return [];
  }

  return (data as ToolRow[]).map(mapTool);
}

export async function getFeaturedTools(): Promise<AITool[]> {
  const { data, error } = await supabase
    .from("tools")
    .select("*")
    .eq("featured", true)
    .order("rating", { ascending: false });

  if (error) {
    console.error("Failed to fetch featured tools:", error.message);
    return [];
  }

  return (data as ToolRow[]).map(mapTool);
}

export async function getToolBySlug(
  slug: string
): Promise<AITool | null> {
  const normalizedSlug = slug.trim().toLowerCase();

  const { data, error } = await supabase
    .from("tools")
    .select("*")
    .eq("slug", normalizedSlug)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch tool:", {
      slug: normalizedSlug,
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    throw new Error(`Unable to load tool: ${normalizedSlug}`);
  }

  if (!data) {
    return null;
  }

  return mapTool(data as ToolRow);
}

export async function getSimilarTools(
  currentToolId: number,
  category: string,
  limit = 3
): Promise<AITool[]> {
  const { data, error } = await supabase
    .from("tools")
    .select("*")
    .eq("category", category)
    .neq("id", currentToolId)
    .order("rating", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Failed to fetch similar tools:", error.message);
    return [];
  }

  return (data as ToolRow[]).map(mapTool);
}