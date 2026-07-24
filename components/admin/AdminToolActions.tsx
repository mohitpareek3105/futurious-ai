"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";

import {
  deleteTool,
  toggleToolFeatured,
} from "@/app/admin/tools/actions";

type AdminToolActionsProps = {
  id: number;
  slug: string;
  name: string;
  featured: boolean;
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

export default function AdminToolActions({
  id,
  slug,
  name,
  featured,
  returnPath,
}: AdminToolActionsProps) {
  const toggleAction = toggleToolFeatured.bind(
    null,
    id,
    !featured,
    returnPath,
  );

  const deleteAction = deleteTool.bind(
    null,
    id,
    returnPath,
  );

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Link
        href={`/tools/${slug}`}
        target="_blank"
        className="rounded-lg border border-gray-700 px-3 py-2 text-xs font-semibold text-gray-300 transition hover:border-gray-500 hover:text-white"
      >
        View
      </Link>

      <Link
        href={`/admin/tools/${id}/edit`}
        className="rounded-lg border border-gray-700 px-3 py-2 text-xs font-semibold text-gray-300 transition hover:border-blue-500 hover:text-blue-300"
      >
        Edit
      </Link>

      <form action={toggleAction}>
        <FeaturedSubmitButton featured={featured} />
      </form>

      <form
        action={deleteAction}
        onSubmit={(event) => {
          const confirmed = window.confirm(
            `Delete "${name}" permanently?\n\nThis action cannot be undone.`,
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