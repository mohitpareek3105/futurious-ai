import ToolsClient from "@/components/tools/ToolsClient";
import { getAllTools } from "@/lib/tools";

export default async function ToolsPage() {
  const tools = await getAllTools();

  return <ToolsClient tools={tools} />;
}