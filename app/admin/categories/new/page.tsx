import CategoryForm from "@/components/admin/CategoryForm";
import { requireAdmin } from "@/lib/admin";
import { createCategoryAction } from "../actions";

export const metadata = {
  title: "Create Category | Admin",
};

export default async function NewCategoryPage() {
  await requireAdmin();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Content Management
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
          Create Category
        </h1>

        <p className="mt-3 text-gray-400">
          Add a new category that can be assigned to AI tools.
        </p>
      </div>

      <CategoryForm
        mode="create"
        action={createCategoryAction}
      />
    </div>
  );
}