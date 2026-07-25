import Link from "next/link";

import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";
export type AdminCategoryRow = {
  id: number;
  name: string;
  slug: string;
  icon: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
};

type CategoryTableProps = {
  categories: AdminCategoryRow[];
};

function formatDate(value: string) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function CategoryTable({
  categories,
}: CategoryTableProps) {
  if (categories.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-800 bg-[#111827] px-6 py-16 text-center">
        <h2 className="text-xl font-bold text-white">
          No categories found
        </h2>

        <p className="mt-3 text-gray-400">
          Add your first category or change the search filters.
        </p>
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-800 bg-[#111827]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="border-b border-gray-800 bg-gray-950/60 text-xs uppercase tracking-wider text-gray-500">
            <tr>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Slug</th>
              <th className="px-5 py-4">Icon</th>
              <th className="px-5 py-4">Featured</th>
              <th className="px-5 py-4">Sort</th>
              <th className="px-5 py-4">Created</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800">
            {categories.map((category) => (
              <tr
                key={category.id}
                className="transition hover:bg-gray-900/60"
              >
                <td className="px-5 py-4 font-semibold text-white">
                  {category.name}
                </td>

                <td className="px-5 py-4 text-sm text-gray-400">
                  {category.slug}
                </td>

                <td className="px-5 py-4 text-sm text-gray-300">
                  {category.icon}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={
                      category.featured
                        ? "rounded-full border border-green-900 bg-green-950/40 px-3 py-1 text-xs font-semibold text-green-300"
                        : "rounded-full border border-gray-700 bg-gray-900 px-3 py-1 text-xs font-semibold text-gray-400"
                    }
                  >
                    {category.featured ? "Featured" : "Standard"}
                  </span>
                </td>

                <td className="px-5 py-4 text-gray-300">
                  {category.sort_order}
                </td>

                <td className="px-5 py-4 text-gray-400">
                  {formatDate(category.created_at)}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/categories/${category.id}/edit`}
                      className="text-sm font-semibold text-blue-400 hover:text-blue-300"
                    >
                      Edit
                    </Link>

                    <DeleteCategoryButton
  categoryId={category.id}
  categoryName={category.name}
/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}