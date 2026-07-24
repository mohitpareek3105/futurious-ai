import Link from "next/link";

import AdminToolActions from "@/components/admin/AdminToolActions";
import { requireAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

type AdminToolsPageProps = {
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

type AdminToolRow = {
  id: number;
  name: string;
  slug: string;
  company: string;
  category: string;
  pricing: string;
  rating: number;
  featured: boolean;
  logo: string;
  last_updated: string;
};

const TOOLS_PER_PAGE = 20;

const allowedSortColumns = new Set([
  "name",
  "category",
  "pricing",
  "rating",
  "featured",
  "last_updated",
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
    : "name";
}

function getSortDirection(value: string | undefined) {
  return value === "desc" ? "desc" : "asc";
}

function buildAdminToolsUrl({
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

  if (sort !== "name") {
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
    ? `/admin/tools?${queryString}`
    : "/admin/tools";
}

function formatUpdatedDate(value: string) {
  if (!value) {
    return "Not available";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

export default async function AdminToolsPage({
  searchParams,
}: AdminToolsPageProps) {
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
    .from("tools")
    .select("id", {
      count: "exact",
      head: true,
    });

  let toolsQuery = supabase
  .from("tools")
  .select(`
    id,
    name,
    slug,
    company,
    category,
    pricing,
    rating,
    featured,
    logo,
    last_updated
  `);

  if (search) {
    const safeSearch = search
      .replaceAll("%", "")
      .replaceAll(",", " ")
      .trim();

    if (safeSearch) {
      const filter =
        `name.ilike.%${safeSearch}%,` +
        `company.ilike.%${safeSearch}%,` +
        `category.ilike.%${safeSearch}%,` +
        `slug.ilike.%${safeSearch}%`;

      countQuery = countQuery.or(filter);
      toolsQuery = toolsQuery.or(filter);
    }
  }

  if (featuredFilter === "yes") {
    countQuery = countQuery.eq("featured", true);
    toolsQuery = toolsQuery.eq("featured", true);
  }

  if (featuredFilter === "no") {
    countQuery = countQuery.eq("featured", false);
    toolsQuery = toolsQuery.eq("featured", false);
  }

  const { count, error: countError } =
    await countQuery;

  const totalTools = count ?? 0;
  const totalPages = Math.max(
    1,
    Math.ceil(totalTools / TOOLS_PER_PAGE),
  );

  const currentPage = Math.min(
    requestedPage,
    totalPages,
  );

  const startIndex =
    (currentPage - 1) * TOOLS_PER_PAGE;

  const endIndex =
    startIndex + TOOLS_PER_PAGE - 1;

  const {
    data,
    error: toolsError,
  } = await toolsQuery
    .order(sort, {
      ascending: direction === "asc",
    })
    .range(startIndex, endIndex);

  const tools = (data ?? []) as unknown as AdminToolRow[];

  const returnPath = buildAdminToolsUrl({
    search,
    sort,
    direction,
    page: currentPage,
    featured: featuredFilter,
  });

  const firstDisplayedTool =
    totalTools === 0 ? 0 : startIndex + 1;

  const lastDisplayedTool = Math.min(
    startIndex + tools.length,
    totalTools,
  );

  const previousPageUrl = buildAdminToolsUrl({
    search,
    sort,
    direction,
    page: Math.max(1, currentPage - 1),
    featured: featuredFilter,
  });

  const nextPageUrl = buildAdminToolsUrl({
    search,
    sort,
    direction,
    page: Math.min(totalPages, currentPage + 1),
    featured: featuredFilter,
  });

  const databaseError =
    countError?.message ?? toolsError?.message;

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Content Management
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            AI Tools
          </h1>

          <p className="mt-3 max-w-2xl text-gray-400">
            Search, review and manage the AI tools
            published on Futurious.AI.
          </p>
        </div>

        <Link
          href="/admin/tools/new"
          className="inline-flex w-fit items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          + Add AI Tool
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
          Unable to load tools: {databaseError}
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
            placeholder="Name, company, category or slug"
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
            <option value="">All tools</option>
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
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="pricing">Pricing</option>
            <option value="rating">Rating</option>
            <option value="featured">Featured</option>
            <option value="last_updated">
              Last updated
            </option>
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
          Showing {firstDisplayedTool}–
          {lastDisplayedTool} of {totalTools} tools
        </p>

        <div className="flex items-center gap-3">
          <span>Direction:</span>

          <Link
            href={buildAdminToolsUrl({
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
              href="/admin/tools"
              className="font-semibold text-gray-300 hover:text-white"
            >
              Clear filters
            </Link>
          )}
        </div>
      </div>

      <section className="mt-5 overflow-hidden rounded-2xl border border-gray-800 bg-[#111827]">
        {tools.length > 0 ? (
          <>
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1050px] text-left">
                <thead className="border-b border-gray-800 bg-gray-950/60 text-xs uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="px-5 py-4">
                      Tool
                    </th>
                    <th className="px-5 py-4">
                      Category
                    </th>
                    <th className="px-5 py-4">
                      Pricing
                    </th>
                    <th className="px-5 py-4">
                      Rating
                    </th>
                    <th className="px-5 py-4">
                      Featured
                    </th>
                    <th className="px-5 py-4">
                      Updated
                    </th>
                    <th className="px-5 py-4 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-800">
                  {tools.map((tool) => (
                    <tr
                      key={tool.id}
                      className="transition hover:bg-gray-900/60"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-700 bg-gray-950">
                            {tool.logo ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={tool.logo}
                                alt=""
                                className="h-full w-full object-contain p-1"
                              />
                            ) : (
                              <span className="text-sm font-bold text-gray-500">
                                {tool.name
                                  .slice(0, 1)
                                  .toUpperCase()}
                              </span>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="font-semibold text-white">
                              {tool.name}
                            </p>

                            <p className="mt-1 max-w-[230px] truncate text-xs text-gray-500">
                              {tool.company ||
                                tool.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-300">
                        {tool.category}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-300">
                        {tool.pricing}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-300">
                        {tool.rating}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={
                            tool.featured
                              ? "rounded-full border border-green-900 bg-green-950/40 px-3 py-1 text-xs font-semibold text-green-300"
                              : "rounded-full border border-gray-700 bg-gray-900 px-3 py-1 text-xs font-semibold text-gray-400"
                          }
                        >
                          {tool.featured
                            ? "Featured"
                            : "Standard"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-400">
                        {formatUpdatedDate(
                          tool.last_updated,
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <AdminToolActions
                          id={tool.id}
                          slug={tool.slug}
                          name={tool.name}
                          featured={tool.featured}
                          returnPath={returnPath}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-gray-800 lg:hidden">
              {tools.map((tool) => (
                <article
                  key={tool.id}
                  className="p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-semibold">
                        {tool.name}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {tool.company || tool.slug}
                      </p>
                    </div>

                    <span
                      className={
                        tool.featured
                          ? "rounded-full border border-green-900 bg-green-950/40 px-3 py-1 text-xs font-semibold text-green-300"
                          : "rounded-full border border-gray-700 bg-gray-900 px-3 py-1 text-xs font-semibold text-gray-400"
                      }
                    >
                      {tool.featured
                        ? "Featured"
                        : "Standard"}
                    </span>
                  </div>

                  <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="text-gray-500">
                        Category
                      </dt>
                      <dd className="mt-1 text-gray-300">
                        {tool.category}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-gray-500">
                        Pricing
                      </dt>
                      <dd className="mt-1 text-gray-300">
                        {tool.pricing}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-gray-500">
                        Rating
                      </dt>
                      <dd className="mt-1 text-gray-300">
                        {tool.rating}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-gray-500">
                        Updated
                      </dt>
                      <dd className="mt-1 text-gray-300">
                        {formatUpdatedDate(
                          tool.last_updated,
                        )}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-5 border-t border-gray-800 pt-4">
                    <AdminToolActions
                      id={tool.id}
                      slug={tool.slug}
                      name={tool.name}
                      featured={tool.featured}
                      returnPath={returnPath}
                    />
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="px-6 py-16 text-center">
            <h2 className="text-xl font-bold">
              No tools found
            </h2>

            <p className="mt-3 text-gray-400">
              Change the search filters or add a new
              AI tool.
            </p>

            <Link
              href="/admin/tools"
              className="mt-6 inline-flex rounded-lg border border-gray-700 px-5 py-3 text-sm font-semibold text-gray-300 transition hover:border-gray-500 hover:text-white"
            >
              Clear filters
            </Link>
          </div>
        )}
      </section>

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