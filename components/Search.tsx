import { getAllTools } from "@/lib/tools";
import SearchClient from "@/components/SearchClient";

export default async function Search() {
  const tools = await getAllTools();

  return <SearchClient tools={tools} />;
}