"use client";

import {
  useActionState,
  useEffect,
  useMemo,
  useState,
} from "react";

export type BlogFormValues = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  readingTime: string;
  author: string;
  coverImage: string;
  featured: boolean;
  published: boolean;
};

export type BlogFormFieldErrors = Partial<
  Record<keyof BlogFormValues | "form", string>
>;

export type BlogFormState = {
  success: boolean;
  message: string;
  errors: BlogFormFieldErrors;
  values?: Partial<BlogFormValues>;
};

export type BlogFormAction = (
  previousState: BlogFormState,
  formData: FormData,
) => Promise<BlogFormState>;

type BlogFormProps = {
  mode: "create" | "edit";
  action: BlogFormAction;
  initialValues?: Partial<BlogFormValues>;
  blogId?: string;
};

const EMPTY_VALUES: BlogFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  tags: [],
  readingTime: "",
  author: "",
  coverImage: "",
  featured: false,
  published: false,
};

const INITIAL_STATE: BlogFormState = {
  success: false,
  message: "",
  errors: {},
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function BlogForm({
  mode,
  action,
  initialValues,
  blogId,
}: BlogFormProps) {
  const [state, formAction, isPending] = useActionState(
    action,
    INITIAL_STATE,
  );

  const values = useMemo<BlogFormValues>(
    () => ({
      ...EMPTY_VALUES,
      ...initialValues,
      ...state.values,
      tags:
        state.values?.tags ??
        initialValues?.tags ??
        EMPTY_VALUES.tags,
    }),
    [initialValues, state.values],
  );

  const [title, setTitle] = useState(values.title);
  const [slug, setSlug] = useState(values.slug);

  const [slugEditedManually, setSlugEditedManually] =
    useState(mode === "edit" || Boolean(values.slug));

  useEffect(() => {
    setTitle(values.title);
    setSlug(values.slug);
  }, [values.title, values.slug]);

  function handleTitleChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const nextTitle = event.target.value;

    setTitle(nextTitle);

    if (!slugEditedManually) {
      setSlug(slugify(nextTitle));
    }
  }

  function handleSlugChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const nextSlug = slugify(event.target.value);

    setSlug(nextSlug);
    setSlugEditedManually(Boolean(nextSlug));
  }

  function handleSlugBlur() {
    if (!slug.trim()) {
      setSlug(slugify(title));
      setSlugEditedManually(false);
    }
  }
    const submitLabel =
    mode === "create" ? "Create Blog Post" : "Save Changes";

  return (
    <form action={formAction} className="space-y-6">
      {blogId && (
        <input type="hidden" name="blogId" value={blogId} />
      )}

      {state.message && (
        <div
          role="alert"
          className={[
            "rounded-xl border px-4 py-3 text-sm",
            state.success
              ? "border-green-800 bg-green-950/40 text-green-300"
              : "border-red-800 bg-red-950/40 text-red-300",
          ].join(" ")}
        >
          {state.message}
        </div>
      )}

      {state.errors.form && !state.message && (
        <div
          role="alert"
          className="rounded-xl border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-300"
        >
          {state.errors.form}
        </div>
      )}

      <section className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
        <div className="border-b border-gray-800 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            Basic Information
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Enter the blog title, URL slug and introductory details.
          </p>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Blog Title
              <span
                aria-hidden="true"
                className="ml-1 text-red-400"
              >
                *
              </span>
            </label>

            <input
              id="title"
              name="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Example: ChatGPT vs Claude Comparison"
              required
              autoComplete="off"
              aria-invalid={Boolean(state.errors.title)}
              className={[
                "w-full rounded-xl border bg-gray-950 px-4 py-3",
                "text-sm text-white outline-none transition",
                "placeholder:text-gray-600",
                state.errors.title
                  ? "border-red-700 focus:border-red-500"
                  : "border-gray-700 focus:border-blue-500",
              ].join(" ")}
            />

            {state.errors.title && (
              <p className="mt-2 text-xs font-medium text-red-400">
                {state.errors.title}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="slug"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              URL Slug
              <span
                aria-hidden="true"
                className="ml-1 text-red-400"
              >
                *
              </span>
            </label>

            <input
              id="slug"
              name="slug"
              value={slug}
              onChange={handleSlugChange}
              onBlur={handleSlugBlur}
              placeholder="chatgpt-vs-claude-comparison"
              required
              autoComplete="off"
              spellCheck={false}
              aria-invalid={Boolean(state.errors.slug)}
              className={[
                "w-full rounded-xl border bg-gray-950 px-4 py-3",
                "text-sm text-white outline-none transition",
                "placeholder:text-gray-600",
                state.errors.slug
                  ? "border-red-700 focus:border-red-500"
                  : "border-gray-700 focus:border-blue-500",
              ].join(" ")}
            />

            <p className="mt-2 text-xs text-gray-500">
              Public URL: /blog/{slug || "your-blog-slug"}
            </p>

            {state.errors.slug && (
              <p className="mt-2 text-xs font-medium text-red-400">
                {state.errors.slug}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="author"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Author
              <span
                aria-hidden="true"
                className="ml-1 text-red-400"
              >
                *
              </span>
            </label>

            <input
              id="author"
              name="author"
              defaultValue={values.author}
              placeholder="Example: Futurious.AI Editorial Team"
              required
              autoComplete="off"
              aria-invalid={Boolean(state.errors.author)}
              className={[
                "w-full rounded-xl border bg-gray-950 px-4 py-3",
                "text-sm text-white outline-none transition",
                "placeholder:text-gray-600",
                state.errors.author
                  ? "border-red-700 focus:border-red-500"
                  : "border-gray-700 focus:border-blue-500",
              ].join(" ")}
            />

            {state.errors.author && (
              <p className="mt-2 text-xs font-medium text-red-400">
                {state.errors.author}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Category
              <span
                aria-hidden="true"
                className="ml-1 text-red-400"
              >
                *
              </span>
            </label>

            <input
              id="category"
              name="category"
              defaultValue={values.category}
              placeholder="Example: AI Guides"
              required
              autoComplete="off"
              aria-invalid={Boolean(state.errors.category)}
              className={[
                "w-full rounded-xl border bg-gray-950 px-4 py-3",
                "text-sm text-white outline-none transition",
                "placeholder:text-gray-600",
                state.errors.category
                  ? "border-red-700 focus:border-red-500"
                  : "border-gray-700 focus:border-blue-500",
              ].join(" ")}
            />

            {state.errors.category && (
              <p className="mt-2 text-xs font-medium text-red-400">
                {state.errors.category}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="readingTime"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Reading Time
              <span
                aria-hidden="true"
                className="ml-1 text-red-400"
              >
                *
              </span>
            </label>

            <input
              id="readingTime"
              name="readingTime"
              defaultValue={values.readingTime}
              placeholder="Example: 8 min read"
              required
              autoComplete="off"
              aria-invalid={Boolean(state.errors.readingTime)}
              className={[
                "w-full rounded-xl border bg-gray-950 px-4 py-3",
                "text-sm text-white outline-none transition",
                "placeholder:text-gray-600",
                state.errors.readingTime
                  ? "border-red-700 focus:border-red-500"
                  : "border-gray-700 focus:border-blue-500",
              ].join(" ")}
            />

            {state.errors.readingTime && (
              <p className="mt-2 text-xs font-medium text-red-400">
                {state.errors.readingTime}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="coverImage"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Cover Image URL
            </label>

            <input
              id="coverImage"
              name="coverImage"
              type="text"
              defaultValue={values.coverImage}
              placeholder="/blogs/example-cover.jpg or https://..."
              autoComplete="off"
              aria-invalid={Boolean(state.errors.coverImage)}
              className={[
                "w-full rounded-xl border bg-gray-950 px-4 py-3",
                "text-sm text-white outline-none transition",
                "placeholder:text-gray-600",
                state.errors.coverImage
                  ? "border-red-700 focus:border-red-500"
                  : "border-gray-700 focus:border-blue-500",
              ].join(" ")}
            />

            <p className="mt-2 text-xs text-gray-500">
              Use an existing public image path or a complete external URL.
            </p>

            {state.errors.coverImage && (
              <p className="mt-2 text-xs font-medium text-red-400">
                {state.errors.coverImage}
              </p>
            )}
          </div>
        </div>
      </section>
            <section className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
        <div className="border-b border-gray-800 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            Blog Content
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Add the blog summary, full content and searchable tags.
          </p>
        </div>

        <div className="space-y-6 p-6">
          <div>
            <label
              htmlFor="excerpt"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Excerpt
              <span
                aria-hidden="true"
                className="ml-1 text-red-400"
              >
                *
              </span>
            </label>

            <textarea
              id="excerpt"
              name="excerpt"
              defaultValue={values.excerpt}
              rows={4}
              placeholder="Write a concise summary for blog cards, search results and metadata."
              required
              aria-invalid={Boolean(state.errors.excerpt)}
              className={[
                "w-full resize-y rounded-xl border bg-gray-950 px-4 py-3",
                "text-sm leading-6 text-white outline-none transition",
                "placeholder:text-gray-600",
                state.errors.excerpt
                  ? "border-red-700 focus:border-red-500"
                  : "border-gray-700 focus:border-blue-500",
              ].join(" ")}
            />

            <p className="mt-2 text-xs text-gray-500">
              Recommended length: approximately 120–180 characters.
            </p>

            {state.errors.excerpt && (
              <p className="mt-2 text-xs font-medium text-red-400">
                {state.errors.excerpt}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="content"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Blog Content
              <span
                aria-hidden="true"
                className="ml-1 text-red-400"
              >
                *
              </span>
            </label>

            <textarea
              id="content"
              name="content"
              defaultValue={values.content}
              rows={18}
              placeholder="Write the complete blog article here."
              required
              aria-invalid={Boolean(state.errors.content)}
              className={[
                "min-h-96 w-full resize-y rounded-xl border",
                "bg-gray-950 px-4 py-3 font-mono text-sm leading-7",
                "text-white outline-none transition placeholder:text-gray-600",
                state.errors.content
                  ? "border-red-700 focus:border-red-500"
                  : "border-gray-700 focus:border-blue-500",
              ].join(" ")}
            />

            <p className="mt-2 text-xs text-gray-500">
              Plain text and Markdown-style formatting can be entered here.
            </p>

            {state.errors.content && (
              <p className="mt-2 text-xs font-medium text-red-400">
                {state.errors.content}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="tags"
              className="mb-2 block text-sm font-semibold text-gray-200"
            >
              Tags
            </label>

            <input
              id="tags"
              name="tags"
              defaultValue={values.tags.join(", ")}
              placeholder="Example: ChatGPT, Claude, AI comparison"
              autoComplete="off"
              aria-invalid={Boolean(state.errors.tags)}
              className={[
                "w-full rounded-xl border bg-gray-950 px-4 py-3",
                "text-sm text-white outline-none transition",
                "placeholder:text-gray-600",
                state.errors.tags
                  ? "border-red-700 focus:border-red-500"
                  : "border-gray-700 focus:border-blue-500",
              ].join(" ")}
            />

            <p className="mt-2 text-xs text-gray-500">
              Separate multiple tags with commas.
            </p>

            {state.errors.tags && (
              <p className="mt-2 text-xs font-medium text-red-400">
                {state.errors.tags}
              </p>
            )}
          </div>
        </div>
      </section>
            <section className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
        <div className="border-b border-gray-800 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            Publishing Settings
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Control whether this blog is visible and featured.
          </p>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div className="rounded-xl border border-gray-800 bg-gray-950 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <label
                  htmlFor="published"
                  className="block text-sm font-semibold text-gray-200"
                >
                  Published
                </label>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Published posts can appear on the public blog pages.
                </p>
              </div>

              <input
                id="published"
                name="published"
                type="checkbox"
                value="true"
                defaultChecked={values.published}
                className="h-5 w-5 shrink-0 cursor-pointer accent-blue-600"
              />
            </div>

            {state.errors.published && (
              <p className="mt-3 text-xs font-medium text-red-400">
                {state.errors.published}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-950 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <label
                  htmlFor="featured"
                  className="block text-sm font-semibold text-gray-200"
                >
                  Featured
                </label>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Featured posts can receive prominent placement.
                </p>
              </div>

              <input
                id="featured"
                name="featured"
                type="checkbox"
                value="true"
                defaultChecked={values.featured}
                className="h-5 w-5 shrink-0 cursor-pointer accent-blue-600"
              />
            </div>

            {state.errors.featured && (
              <p className="mt-3 text-xs font-medium text-red-400">
                {state.errors.featured}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        <a
          href="/admin/blog"
          className={[
            "inline-flex items-center justify-center rounded-xl",
            "border border-gray-700 px-5 py-3 text-sm font-semibold",
            "text-gray-300 transition hover:border-gray-600",
            "hover:bg-gray-900 hover:text-white",
          ].join(" ")}
        >
          Cancel
        </a>

        <button
          type="submit"
          disabled={isPending}
          className={[
            "inline-flex items-center justify-center rounded-xl",
            "bg-blue-600 px-5 py-3 text-sm font-semibold text-white",
            "transition hover:bg-blue-500",
            "disabled:cursor-not-allowed disabled:opacity-60",
          ].join(" ")}
        >
          {isPending ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}