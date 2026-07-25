import Link from "next/link";

import CategoryTable, {
  type AdminCategoryRow,
} from "@/components/admin/CategoryTable";
import { requireAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

type AdminCategoriesPageProps = {
  searchParams: Promise<{
    search?: string;
    sort?: string;
    direction?: string;
    page?: string;
    featured?: string;
    message?: string;
    error?: string;
  }>;
};

const CATEGORIES_PER_PAGE = 20;

const allowedSortColumns = new Set([
  "name",
  "slug",
  "featured",
  "sort_order",
  "created_at",
]);

function getPageNumber(value: string | undefined) {
  const parsedValue = Number.parseInt(value ?? "1", 10);

  return Number.isInteger(parsedValue) && parsedValue > 0
    ? parsedValue
    : 1;
}

function getSortColumn(value: string | undefined) {
  return value && allowedSortColumns.has(value)
    ? value
    : "sort_order";
}

function getSortDirection(value: string | undefined) {
  return value === "desc" ? "desc" : "asc";
}

function buildAdminCategoriesUrl({
  search,
  sort,
  direction,
  page,
  featured,
}: {
  search: string;
  sort: string;
  direction: string;
  page: number;
  featured: string;
}) {
  const params = new URLSearchParams();

  if (search) {
    params.set("search", search);
  }

  if (sort !== "sort_order") {
    params.set("sort", sort);
  }

  if (direction !== "asc") {
    params.set("direction", direction);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  if (featured) {
    params.set("featured", featured);
  }

  const queryString = params.toString();

  return queryString
    ? `/admin/categories?${queryString}`
    : "/admin/categories";
}

export default async function AdminCategoriesPage({
  searchParams,
}: AdminCategoriesPageProps) {
  await requireAdmin();

  const params = await searchParams;

  const search = (params.search ?? "").trim();
  const sort = getSortColumn(params.sort);
  const direction = getSortDirection(params.direction);
  const requestedPage = getPageNumber(params.page);

  const featuredFilter =
    params.featured === "yes" || params.featured === "no"
      ? params.featured
      : "";

  const supabase = await createClient();

  let countQuery = supabase
    .from("categories")
    .select("id", {
      count: "exact",
      head: true,
    });

  let categoriesQuery = supabase
    .from("categories")
    .select(`
      id,
      name,
      slug,
      icon,
      featured,
      sort_order,
      created_at
    `);

  if (search) {
    const safeSearch = search
      .replaceAll("%", "")
      .replaceAll(",", " ")
      .trim();

    if (safeSearch) {
      const filter =
        `name.ilike.%${safeSearch}%,` +
        `slug.ilike.%${safeSearch}%,` +
        `icon.ilike.%${safeSearch}%`;

      countQuery = countQuery.or(filter);
      categoriesQuery = categoriesQuery.or(filter);
    }
  }

  if (featuredFilter === "yes") {
    countQuery = countQuery.eq("featured", true);
    categoriesQuery = categoriesQuery.eq("featured", true);
  }

  if (featuredFilter === "no") {
    countQuery = countQuery.eq("featured", false);
    categoriesQuery = categoriesQuery.eq("featured", false);
  }

  const { count, error: countError } = await countQuery;

  const totalCategories = count ?? 0;

  const totalPages = Math.max(
    1,
    Math.ceil(totalCategories / CATEGORIES_PER_PAGE),
  );

  const currentPage = Math.min(
    requestedPage,
    totalPages,
  );

  const startIndex =
    (currentPage - 1) * CATEGORIES_PER_PAGE;

  const endIndex =
    startIndex + CATEGORIES_PER_PAGE - 1;

  const {
    data,
    error: categoriesError,
  } = await categoriesQuery
    .order(sort, {
      ascending: direction === "asc",
    })
    .range(startIndex, endIndex);

  const categories =
    (data ?? []) as unknown as AdminCategoryRow[];

  const firstDisplayedCategory =
    totalCategories === 0 ? 0 : startIndex + 1;

  const lastDisplayedCategory = Math.min(
    startIndex + categories.length,
    totalCategories,
  );

  const previousPageUrl = buildAdminCategoriesUrl({
    search,
    sort,
    direction,
    page: Math.max(1, currentPage - 1),
    featured: featuredFilter,
  });

  const nextPageUrl = buildAdminCategoriesUrl({
    search,
    sort,
    direction,
    page: Math.min(totalPages, currentPage + 1),
    featured: featuredFilter,
  });

  const databaseError =
    countError?.message ?? categoriesError?.message;

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Content Management
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Categories
          </h1>

          <p className="mt-3 max-w-2xl text-gray-400">
            Search, review and manage the categories published
            across Futurious.AI.
          </p>
        </div>

        <Link
          href="/admin/categories/new"
          className="inline-flex w-fit items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          + Add Category
        </Link>
      </div>

      {params.message && (
        <div className="mt-6 rounded-xl border border-green-900 bg-green-950/30 px-5 py-4 text-sm text-green-300">
          {params.message}
        </div>
      )}

      {params.error && (
        <div className="mt-6 rounded-xl border border-red-900 bg-red-950/30 px-5 py-4 text-sm text-red-300">
          {params.error}
        </div>
      )}

      {databaseError && (
        <div className="mt-6 rounded-xl border border-red-900 bg-red-950/30 px-5 py-4 text-sm text-red-300">
          Unable to load categories: {databaseError}
        </div>
      )}

      <form
        method="get"
        className="mt-8 grid gap-4 rounded-2xl border border-gray-800 bg-[#111827] p-5 md:grid-cols-[minmax(0,1fr)_180px_180px_120px]"
      >
        <div>
          <label
            htmlFor="search"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500"
          >
            Search
          </label>

          <input
            id="search"
            name="search"
            type="search"
            defaultValue={search}
            placeholder="Name, slug or icon"
            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="featured"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500"
          >
            Featured
          </label>

          <select
            id="featured"
            name="featured"
            defaultValue={featuredFilter}
            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
          >
            <option value="">All categories</option>
            <option value="yes">Featured only</option>
            <option value="no">Not featured</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="sort"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500"
          >
            Sort by
          </label>

          <select
            id="sort"
            name="sort"
            defaultValue={sort}
            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
          >
            <option value="sort_order">Sort order</option>
            <option value="name">Name</option>
            <option value="slug">Slug</option>
            <option value="featured">Featured</option>
            <option value="created_at">Created</option>
          </select>

          <input
            type="hidden"
            name="direction"
            value={direction}
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </form>

      <div className="mt-5 flex flex-col justify-between gap-3 text-sm text-gray-400 sm:flex-row sm:items-center">
        <p>
          Showing {firstDisplayedCategory}–
          {lastDisplayedCategory} of {totalCategories} categories
        </p>

        <div className="flex items-center gap-3">
          <span>Direction:</span>

          <Link
            href={buildAdminCategoriesUrl({
              search,
              sort,
              direction:
                direction === "asc" ? "desc" : "asc",
              page: 1,
              featured: featuredFilter,
            })}
            className="font-semibold text-blue-400 hover:text-blue-300"
          >
            {direction === "asc"
              ? "Ascending"
              : "Descending"}
          </Link>

          {(search || featuredFilter) && (
            <Link
              href="/admin/categories"
              className="font-semibold text-gray-300 hover:text-white"
            >
              Clear filters
            </Link>
          )}
        </div>
      </div>

      <div className="mt-5">
        <CategoryTable categories={categories} />
      </div>

      {totalPages > 1 && (
        <nav className="mt-6 flex items-center justify-between gap-4">
          {currentPage > 1 ? (
            <Link
              href={previousPageUrl}
              className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-semibold text-gray-300 transition hover:border-gray-500 hover:text-white"
            >
              Previous
            </Link>
          ) : (
            <span className="rounded-lg border border-gray-800 px-4 py-2 text-sm text-gray-600">
              Previous
            </span>
          )}

          <p className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </p>

          {currentPage < totalPages ? (
            <Link
              href={nextPageUrl}
              className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-semibold text-gray-300 transition hover:border-gray-500 hover:text-white"
            >
              Next
            </Link>
          ) : (
            <span className="rounded-lg border border-gray-800 px-4 py-2 text-sm text-gray-600">
              Next
            </span>
          )}
        </nav>
      )}
    </div>
  );
}