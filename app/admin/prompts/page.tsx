import Link from "next/link";

import AdminPromptActions from "@/components/admin/AdminPromptActions";
import { requireAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

type AdminPromptsPageProps = {
  searchParams: Promise<{
    search?: string;
    page?: string;
    featured?: string;
    published?: string;
    message?: string;
    error?: string;
  }>;
};

type AdminPromptRow = {
  id: number;
  title: string;
  slug: string;
  category: string;
  difficulty: string;
  featured: boolean;
  published: boolean;
  updated_at: string;
};

const PROMPTS_PER_PAGE = 20;

function getPageNumber(value?: string): number {
  const page = Number(value);

  return Number.isInteger(page) && page > 0
    ? page
    : 1;
}

function createReturnPath(
  params: Awaited<
    AdminPromptsPageProps["searchParams"]
  >,
): string {
  const query = new URLSearchParams();

  if (params.search) {
    query.set("search", params.search);
  }

  if (params.page) {
    query.set("page", params.page);
  }

  if (params.featured) {
    query.set("featured", params.featured);
  }

  if (params.published) {
    query.set("published", params.published);
  }

  const queryString = query.toString();

  return queryString
    ? `/admin/prompts?${queryString}`
    : "/admin/prompts";
}

export default async function AdminPromptsPage({
  searchParams,
}: AdminPromptsPageProps) {
  await requireAdmin();

  const params = await searchParams;
  const search = params.search?.trim() ?? "";
  const page = getPageNumber(params.page);

  const start = (page - 1) * PROMPTS_PER_PAGE;
  const end = start + PROMPTS_PER_PAGE - 1;

  const supabase = await createClient();

  let query = supabase
    .from("prompts")
    .select(
      `
        id,
        title,
        slug,
        category,
        difficulty,
        featured,
        published,
        updated_at
      `,
      {
        count: "exact",
      },
    )
    .order("updated_at", {
      ascending: false,
    })
    .range(start, end);

  if (search) {
    const safeSearch = search
      .replace(/[%_,()]/g, " ")
      .trim();

    if (safeSearch) {
      query = query.or(
        `title.ilike.%${safeSearch}%,slug.ilike.%${safeSearch}%,category.ilike.%${safeSearch}%`,
      );
    }
  }

  if (params.featured === "true") {
    query = query.eq("featured", true);
  }

  if (params.featured === "false") {
    query = query.eq("featured", false);
  }

  if (params.published === "true") {
    query = query.eq("published", true);
  }

  if (params.published === "false") {
    query = query.eq("published", false);
  }

  const { data, error, count } = await query;

  const prompts =
    (data ?? []) as AdminPromptRow[];

  const totalPages = Math.max(
    1,
    Math.ceil(
      (count ?? 0) / PROMPTS_PER_PAGE,
    ),
  );

  const returnPath = createReturnPath(params);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Content Management
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white">
            Prompts
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Create and manage Prompt Library
            content.
          </p>
        </div>

        <Link
          href="/admin/prompts/new"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Add Prompt
        </Link>
      </div>

      {params.message && (
        <div className="rounded-xl border border-green-800 bg-green-950/40 px-4 py-3 text-sm text-green-300">
          {params.message}
        </div>
      )}

      {(params.error || error) && (
        <div className="rounded-xl border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-300">
          {params.error ??
            error?.message ??
            "Unable to load prompts."}
        </div>
      )}

      <form className="grid gap-4 rounded-2xl border border-gray-800 bg-gray-900 p-5 md:grid-cols-4">
        <input
          name="search"
          defaultValue={search}
          placeholder="Search prompts..."
          className="rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-blue-500 md:col-span-2"
        />

        <select
          name="published"
          defaultValue={params.published ?? ""}
          className="rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
        >
          <option value="">
            All statuses
          </option>
          <option value="true">
            Published
          </option>
          <option value="false">
            Draft
          </option>
        </select>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500"
          >
            Filter
          </button>

          <Link
            href="/admin/prompts"
            className="inline-flex items-center justify-center rounded-xl border border-gray-700 px-4 py-3 text-sm font-semibold text-gray-300"
          >
            Reset
          </Link>
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-950">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Prompt
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Category
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800">
              {prompts.map((prompt) => (
                <tr key={prompt.id}>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-white">
                      {prompt.title}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      /prompts/{prompt.slug}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-300">
                    {prompt.category}
                    <p className="mt-1 text-xs text-gray-500">
                      {prompt.difficulty}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={
                          prompt.published
                            ? "rounded-full bg-green-950 px-2.5 py-1 text-xs font-semibold text-green-300"
                            : "rounded-full bg-gray-800 px-2.5 py-1 text-xs font-semibold text-gray-300"
                        }
                      >
                        {prompt.published
                          ? "Published"
                          : "Draft"}
                      </span>

                      {prompt.featured && (
                        <span className="rounded-full bg-blue-950 px-2.5 py-1 text-xs font-semibold text-blue-300">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <AdminPromptActions
                      id={prompt.id}
                      slug={prompt.slug}
                      title={prompt.title}
                      featured={prompt.featured}
                      published={prompt.published}
                      returnPath={returnPath}
                    />
                  </td>
                </tr>
              ))}

              {!error && prompts.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-12 text-center text-sm text-gray-400"
                  >
                    No prompts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>
          Page {page} of {totalPages}
        </span>

        <div className="flex gap-2">
          {page > 1 && (
            <Link
              href={`${returnPath}${
                returnPath.includes("?") ? "&" : "?"
              }page=${page - 1}`}
              className="rounded-lg border border-gray-700 px-4 py-2 hover:text-white"
            >
              Previous
            </Link>
          )}

          {page < totalPages && (
            <Link
              href={`${returnPath}${
                returnPath.includes("?") ? "&" : "?"
              }page=${page + 1}`}
              className="rounded-lg border border-gray-700 px-4 py-2 hover:text-white"
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}