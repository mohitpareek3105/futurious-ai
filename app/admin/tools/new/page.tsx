import ToolForm from "@/components/admin/ToolForm";
import { requireAdmin } from "@/lib/admin";

import { createTool } from "../actions";

export default async function NewToolPage() {
  await requireAdmin();

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Content Management
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
          Create AI Tool
        </h1>

        <p className="mt-3 max-w-2xl text-gray-400">
          Add a new AI tool to the Futurious.AI directory.
          Complete all required information before publishing.
        </p>
      </div>

      <ToolForm
        mode="create"
        action={createTool}
      />
    </div>
  );
}