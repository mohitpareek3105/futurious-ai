import { notFound } from "next/navigation";

import CategoryForm from "@/components/admin/CategoryForm";
import { getCategoryById } from "@/lib/categories";
import { requireAdmin } from "@/lib/admin";
import { updateCategoryAction } from "../../actions";

type EditCategoryPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata = {
  title: "Edit Category | Admin",
};

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  await requireAdmin();

  const { id } = await params;
  const categoryId = Number.parseInt(id, 10);

  if (!Number.isInteger(categoryId) || categoryId <= 0) {
    notFound();
  }

  const category = await getCategoryById(categoryId);

  if (!category) {
    notFound();
  }

  const updateAction = updateCategoryAction.bind(
  null,
  category.id,
);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Content Management
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
          Edit Category
        </h1>

        <p className="mt-3 text-gray-400">
          Update category details and public visibility settings.
        </p>
      </div>

      <CategoryForm
        mode="edit"
        action={updateAction}
        initialValues={{
          name: category.name,
          slug: category.slug,
          icon: category.icon,
          description: category.description ?? "",
          sortOrder: category.sortOrder,
          featured: category.featured,
        }}
      />
    </div>
  );
}