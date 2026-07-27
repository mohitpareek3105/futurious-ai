import Link from "next/link";

import { createPrompt } from "@/app/admin/prompts/actions";
import PromptForm from "@/components/admin/PromptForm";
import { requireAdmin } from "@/lib/admin";

export default async function NewPromptPage() {
  await requireAdmin();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Prompt Library
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white">
            Create Prompt
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Add a new reusable AI prompt to the
            library.
          </p>
        </div>

        <Link
          href="/admin/prompts"
          className="inline-flex items-center justify-center rounded-xl border border-gray-700 px-4 py-2 text-sm font-semibold text-gray-300 transition hover:bg-gray-900 hover:text-white"
        >
          Back to Prompts
        </Link>
      </div>

      <PromptForm
        mode="create"
        action={createPrompt}
      />
    </div>
  );
}