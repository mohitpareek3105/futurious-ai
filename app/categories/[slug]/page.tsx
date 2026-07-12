import { notFound } from "next/navigation";

import ToolsClient from "@/components/tools/ToolsClient";
import { categories } from "@/data/categories";
import { getToolsByCategorySlug } from "@/lib/tools";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const category = categories.find(
    (item) => item.slug === slug
  );

  if (!category) {
    notFound();
  }

  const tools = await getToolsByCategorySlug(slug);

  return <ToolsClient tools={tools} />;
}
