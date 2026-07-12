import CompareClient from "@/components/compare/CompareClient";
import { getAllTools } from "@/lib/tools";

export default async function ComparePage() {
  const tools = await getAllTools();

  return <CompareClient tools={tools} />;
}