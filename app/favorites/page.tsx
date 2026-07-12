import FavoritesClient from "@/components/favorites/FavoritesClient";
import { getAllTools } from "@/lib/tools";

export default async function FavoritesPage() {
  const tools = await getAllTools();

  return <FavoritesClient tools={tools} />;
}