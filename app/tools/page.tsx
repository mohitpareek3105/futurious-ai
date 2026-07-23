import ToolsClient from "@/components/tools/ToolsClient";
import { getAllTools } from "@/lib/tools";

type ToolsPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
};

export default async function ToolsPage({
  searchParams,
}: ToolsPageProps) {
  const tools = await getAllTools();

  const {
    search = "",
    category = "All",
  } = await searchParams;

  return (
    <ToolsClient
      tools={tools}
      initialSearch={search}
      initialCategory={category}
    />
  );
}
