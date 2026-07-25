import Link from "next/link";

import AdminBlogActions from "@/components/admin/AdminBlogActions";
import { requireAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

type AdminBlogPageProps = {
  searchParams: Promise<{
    search?: string;
    sort?: string;
    direction?: string;
    page?: string;
    featured?: string;
    published?: string;
    message?: string;
    error?: string;
  }>;
};

type AdminBlogRow = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  cover_image: string;
  author: string;
  published_at: string;
  reading_time: string;
  featured: boolean;
  published: boolean;
  updated_at: string;
};

const BLOGS_PER_PAGE = 20;

const allowedSortColumns = new Set([
  "title",
  "category",
  "author",
  "published_at",
  "reading_time",
  "featured",
  "published",
  "updated_at",
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
    : "published_at";
}

function getSortDirection(value: string | undefined) {
  return value === "asc" ? "asc" : "desc";
}

function buildAdminBlogUrl({
  search,
  sort,
  direction,
  page,
  featured,
  published,
}: {
  search: string;
  sort: string;
  direction: string;
  page: number;
  featured: string;
  published: string;
}) {
  const params = new URLSearchParams();

  if (search) {
    params.set("search", search);
  }

  if (sort !== "published_at") {
    params.set("sort", sort);
  }

  if (direction !== "desc") {
    params.set("direction", direction);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  if (featured) {
    params.set("featured", featured);
  }

  if (published) {
    params.set("published", published);
  }

  const queryString = params.toString();

  return queryString
    ? `/admin/blog?${queryString}`
    : "/admin/blog";
}

function formatDate(value: string) {
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

export default async function AdminBlogPage({
  searchParams,
}: AdminBlogPageProps) {
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

  const publishedFilter =
    params.published === "yes" || params.published === "no"
      ? params.published
      : "";

  const supabase = await createClient();

  let countQuery = supabase
    .from("blogs")
    .select("id", {
      count: "exact",
      head: true,
    });

  let blogsQuery = supabase
    .from("blogs")
    .select(`
      id,
      title,
      slug,
      excerpt,
      category,
      cover_image,
      author,
      published_at,
      reading_time,
      featured,
      published,
      updated_at
    `);

  if (search) {
    const safeSearch = search
      .replaceAll("%", "")
      .replaceAll(",", " ")
      .trim();

    if (safeSearch) {
      const filter =
        `title.ilike.%${safeSearch}%,` +
        `slug.ilike.%${safeSearch}%,` +
        `category.ilike.%${safeSearch}%,` +
        `author.ilike.%${safeSearch}%`;

      countQuery = countQuery.or(filter);
      blogsQuery = blogsQuery.or(filter);
    }
  }

  if (featuredFilter === "yes") {
    countQuery = countQuery.eq("featured", true);
    blogsQuery = blogsQuery.eq("featured", true);
  }

  if (featuredFilter === "no") {
    countQuery = countQuery.eq("featured", false);
    blogsQuery = blogsQuery.eq("featured", false);
  }

  if (publishedFilter === "yes") {
    countQuery = countQuery.eq("published", true);
    blogsQuery = blogsQuery.eq("published", true);
  }

  if (publishedFilter === "no") {
    countQuery = countQuery.eq("published", false);
    blogsQuery = blogsQuery.eq("published", false);
  }

  const { count, error: countError } =
    await countQuery;

  const totalBlogs = count ?? 0;
  const totalPages = Math.max(
    1,
    Math.ceil(totalBlogs / BLOGS_PER_PAGE),
  );

  const currentPage = Math.min(
    requestedPage,
    totalPages,
  );

  const startIndex =
    (currentPage - 1) * BLOGS_PER_PAGE;

  const endIndex =
    startIndex + BLOGS_PER_PAGE - 1;

  const {
    data,
    error: blogsError,
  } = await blogsQuery
    .order(sort, {
      ascending: direction === "asc",
    })
    .range(startIndex, endIndex);

  const blogs = (data ?? []) as unknown as AdminBlogRow[];

  const returnPath = buildAdminBlogUrl({
    search,
    sort,
    direction,
    page: currentPage,
    featured: featuredFilter,
    published: publishedFilter,
  });

  const firstDisplayedBlog =
    totalBlogs === 0 ? 0 : startIndex + 1;

  const lastDisplayedBlog = Math.min(
    startIndex + blogs.length,
    totalBlogs,
  );

  const previousPageUrl = buildAdminBlogUrl({
    search,
    sort,
    direction,
    page: Math.max(1, currentPage - 1),
    featured: featuredFilter,
    published: publishedFilter,
  });

  const nextPageUrl = buildAdminBlogUrl({
    search,
    sort,
    direction,
    page: Math.min(totalPages, currentPage + 1),
    featured: featuredFilter,
    published: publishedFilter,
  });

  const databaseError =
    countError?.message ?? blogsError?.message;

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Content Management
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Blog Articles
          </h1>

          <p className="mt-3 max-w-2xl text-gray-400">
            Search, review and manage the articles
            published on Futurious.AI.
          </p>
        </div>

        <Link
          href="/admin/blog/new"
          className="inline-flex w-fit items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          + Add Blog Article
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
          Unable to load blog articles: {databaseError}
        </div>
      )}

      <form
        method="get"
        className="mt-8 grid gap-4 rounded-2xl border border-gray-800 bg-[#111827] p-5 xl:grid-cols-[minmax(0,1fr)_170px_170px_180px_120px]"
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
            placeholder="Title, slug, category or author"
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
            <option value="">All articles</option>
            <option value="yes">Featured only</option>
            <option value="no">Not featured</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="published"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500"
          >
            Status
          </label>

          <select
            id="published"
            name="published"
            defaultValue={publishedFilter}
            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
          >
            <option value="">All statuses</option>
            <option value="yes">Published</option>
            <option value="no">Draft</option>
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
            <option value="published_at">
              Published date
            </option>
            <option value="updated_at">
              Last updated
            </option>
            <option value="title">Title</option>
            <option value="category">Category</option>
            <option value="author">Author</option>
            <option value="reading_time">
              Reading time
            </option>
            <option value="featured">Featured</option>
            <option value="published">Status</option>
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
          Showing {firstDisplayedBlog}–
          {lastDisplayedBlog} of {totalBlogs} articles
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <span>Direction:</span>

          <Link
            href={buildAdminBlogUrl({
              search,
              sort,
              direction:
                direction === "asc" ? "desc" : "asc",
              page: 1,
              featured: featuredFilter,
              published: publishedFilter,
            })}
            className="font-semibold text-blue-400 hover:text-blue-300"
          >
            {direction === "asc"
              ? "Ascending"
              : "Descending"}
          </Link>

          {(search ||
            featuredFilter ||
            publishedFilter) && (
            <Link
              href="/admin/blog"
              className="font-semibold text-gray-300 hover:text-white"
            >
              Clear filters
            </Link>
          )}
        </div>
      </div>

      <section className="mt-5 overflow-hidden rounded-2xl border border-gray-800 bg-[#111827]">
        {blogs.length > 0 ? (
          <>
            <div className="hidden overflow-x-auto xl:block">
              <table className="w-full min-w-[1250px] text-left">
                <thead className="border-b border-gray-800 bg-gray-950/60 text-xs uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="px-5 py-4">
                      Article
                    </th>
                    <th className="px-5 py-4">
                      Category
                    </th>
                    <th className="px-5 py-4">
                      Author
                    </th>
                    <th className="px-5 py-4">
                      Published
                    </th>
                    <th className="px-5 py-4">
                      Featured
                    </th>
                    <th className="px-5 py-4">
                      Status
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
                  {blogs.map((blog) => (
                    <tr
                      key={blog.id}
                      className="transition hover:bg-gray-900/60"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-700 bg-gray-950">
                            {blog.cover_image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={blog.cover_image}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center px-2 text-center text-xs font-semibold text-gray-600">
                                No image
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-[280px] truncate font-semibold text-white">
                              {blog.title}
                            </p>

                            <p className="mt-1 max-w-[280px] truncate text-xs text-gray-500">
                              {blog.excerpt || blog.slug}
                            </p>

                            <p className="mt-1 text-xs text-gray-600">
                              {blog.reading_time}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-300">
                        {blog.category}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-300">
                        {blog.author}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-400">
                        {formatDate(blog.published_at)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={
                            blog.featured
                              ? "rounded-full border border-blue-900 bg-blue-950/40 px-3 py-1 text-xs font-semibold text-blue-300"
                              : "rounded-full border border-gray-700 bg-gray-900 px-3 py-1 text-xs font-semibold text-gray-400"
                          }
                        >
                          {blog.featured
                            ? "Featured"
                            : "Standard"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={
                            blog.published
                              ? "rounded-full border border-green-900 bg-green-950/40 px-3 py-1 text-xs font-semibold text-green-300"
                              : "rounded-full border border-amber-900 bg-amber-950/40 px-3 py-1 text-xs font-semibold text-amber-300"
                          }
                        >
                          {blog.published
                            ? "Published"
                            : "Draft"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-400">
                        {formatDate(blog.updated_at)}
                      </td>

                      <td className="px-5 py-4">
                        <AdminBlogActions
                          id={blog.id}
                          slug={blog.slug}
                          title={blog.title}
                          featured={blog.featured}
                          published={blog.published}
                          returnPath={returnPath}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-gray-800 xl:hidden">
              {blogs.map((blog) => (
                <article
                  key={blog.id}
                  className="p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-700 bg-gray-950">
                      {blog.cover_image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={blog.cover_image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-gray-600">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-semibold">
                        {blog.title}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {blog.category}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span
                      className={
                        blog.published
                          ? "rounded-full border border-green-900 bg-green-950/40 px-3 py-1 text-xs font-semibold text-green-300"
                          : "rounded-full border border-amber-900 bg-amber-950/40 px-3 py-1 text-xs font-semibold text-amber-300"
                      }
                    >
                      {blog.published
                        ? "Published"
                        : "Draft"}
                    </span>

                    <span
                      className={
                        blog.featured
                          ? "rounded-full border border-blue-900 bg-blue-950/40 px-3 py-1 text-xs font-semibold text-blue-300"
                          : "rounded-full border border-gray-700 bg-gray-900 px-3 py-1 text-xs font-semibold text-gray-400"
                      }
                    >
                      {blog.featured
                        ? "Featured"
                        : "Standard"}
                    </span>
                  </div>

                  <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="text-gray-500">
                        Author
                      </dt>
                      <dd className="mt-1 text-gray-300">
                        {blog.author}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-gray-500">
                        Reading time
                      </dt>
                      <dd className="mt-1 text-gray-300">
                        {blog.reading_time}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-gray-500">
                        Published
                      </dt>
                      <dd className="mt-1 text-gray-300">
                        {formatDate(blog.published_at)}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-gray-500">
                        Updated
                      </dt>
                      <dd className="mt-1 text-gray-300">
                        {formatDate(blog.updated_at)}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-5 border-t border-gray-800 pt-4">
                    <AdminBlogActions
                      id={blog.id}
                      slug={blog.slug}
                      title={blog.title}
                      featured={blog.featured}
                      published={blog.published}
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
              No blog articles found
            </h2>

            <p className="mt-3 text-gray-400">
              Change the search filters or add a new
              article.
            </p>

            <Link
              href="/admin/blog"
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