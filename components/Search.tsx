import SearchClient from "@/components/SearchClient";
import { getAllTools } from "@/lib/tools";

export interface SearchTool {
  id: number;
  name: string;
  company: string;
  slug: string;
  logo: string | null;
  website: string;
  category: string;
  tags: string[];
  rating: number;
}

export default async function Search() {
  const tools = await getAllTools();

  const searchTools: SearchTool[] = tools.map((tool) => ({
    id: tool.id,
    name: tool.name,
    company: tool.company,
    slug: tool.slug,
    logo: tool.logo || null,
    website: tool.website,
    category: tool.category,
    tags: tool.tags ?? [],
    rating: tool.rating,
  }));

  return <SearchClient tools={searchTools} />;
}