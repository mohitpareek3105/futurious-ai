import ToolsClient from "@/components/tools/ToolsClient";
import { getAllTools } from "@/lib/tools";

type ToolsPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    pricing?: string;
    sort?: string;
    page?: string;
  }>;
};

export default async function ToolsPage({
  searchParams,
}: ToolsPageProps) {
  const tools = await getAllTools();

  const {
    search = "",
    category = "All",
    pricing = "All",
    sort = "default",
    page = "1",
  } = await searchParams;

  const parsedPage = Number.parseInt(page, 10);

  const initialPage =
    Number.isInteger(parsedPage) && parsedPage > 0
      ? parsedPage
      : 1;

  return (
    <ToolsClient
      tools={tools}
      initialSearch={search}
      initialCategory={category}
      initialPricing={pricing}
      initialSort={sort}
      initialPage={initialPage}
    />
  );
}