"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";

import {
  deleteBlog,
  toggleBlogFeatured,
  toggleBlogPublished,
} from "@/app/admin/blog/actions";

type AdminBlogActionsProps = {
  id: number;
  slug: string;
  title: string;
  featured: boolean;
  published: boolean;
  returnPath: string;
};

function FeaturedSubmitButton({
  featured,
}: {
  featured: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg border border-gray-700 px-3 py-2 text-xs font-semibold text-gray-300 transition hover:border-blue-500 hover:text-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending
        ? "Saving..."
        : featured
          ? "Unfeature"
          : "Feature"}
    </button>
  );
}

function PublishedSubmitButton({
  published,
}: {
  published: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg border border-gray-700 px-3 py-2 text-xs font-semibold text-gray-300 transition hover:border-green-500 hover:text-green-300 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending
        ? "Saving..."
        : published
          ? "Unpublish"
          : "Publish"}
    </button>
  );
}

function DeleteSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg border border-red-900 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-950/50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}

export default function AdminBlogActions({
  id,
  slug,
  title,
  featured,
  published,
  returnPath,
}: AdminBlogActionsProps) {
  const featuredAction = toggleBlogFeatured.bind(
    null,
    id,
    !featured,
    returnPath,
  );

  const publishedAction = toggleBlogPublished.bind(
    null,
    id,
    !published,
    returnPath,
  );

  const deleteAction = deleteBlog.bind(
    null,
    id,
    returnPath,
  );

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {published && (
        <Link
          href={`/blog/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-gray-700 px-3 py-2 text-xs font-semibold text-gray-300 transition hover:border-gray-500 hover:text-white"
        >
          View
        </Link>
      )}

      <Link
        href={`/admin/blog/${id}/edit`}
        className="rounded-lg border border-gray-700 px-3 py-2 text-xs font-semibold text-gray-300 transition hover:border-blue-500 hover:text-blue-300"
      >
        Edit
      </Link>

      <form action={featuredAction}>
        <FeaturedSubmitButton featured={featured} />
      </form>

      <form action={publishedAction}>
        <PublishedSubmitButton published={published} />
      </form>

      <form
        action={deleteAction}
        onSubmit={(event) => {
          const confirmed = window.confirm(
            `Delete "${title}" permanently?\n\nThis action cannot be undone.`,
          );

          if (!confirmed) {
            event.preventDefault();
          }
        }}
      >
        <DeleteSubmitButton />
      </form>
    </div>
  );
}