import PromptLibraryClient from "@/components/prompt/PromptLibraryClient";
import { getPublishedPrompts } from "@/lib/prompts";

export default async function PromptsPage() {
  const prompts = await getPublishedPrompts();

  return <PromptLibraryClient prompts={prompts} />;
}