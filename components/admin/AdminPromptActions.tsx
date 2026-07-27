"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";

import {
  deletePrompt,
  togglePromptFeatured,
  togglePromptPublished,
} from "@/app/admin/prompts/actions";

type AdminPromptActionsProps = {
  id: number;
  slug: string;
  title: string;
  featured: boolean;
  published: boolean;
  returnPath: string;
};

function ActionButton({
  pendingLabel,
  label,
  className,
}: {
  pendingLabel: string;
  label: string;
  className: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={className}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

export default function AdminPromptActions({
  id,
  slug,
  title,
  featured,
  published,
  returnPath,
}: AdminPromptActionsProps) {
  const featuredAction =
    togglePromptFeatured.bind(
      null,
      id,
      !featured,
      returnPath,
    );

  const publishedAction =
    togglePromptPublished.bind(
      null,
      id,
      !published,
      returnPath,
    );

  const deleteAction = deletePrompt.bind(
    null,
    id,
    returnPath,
  );

  const normalButton =
    "rounded-lg border border-gray-700 px-3 py-2 text-xs font-semibold text-gray-300 transition hover:border-blue-500 hover:text-blue-300 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {published && (
        <Link
          href={`/prompts/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className={normalButton}
        >
          View
        </Link>
      )}

      <Link
        href={`/admin/prompts/${id}/edit`}
        className={normalButton}
      >
        Edit
      </Link>

      <form action={featuredAction}>
        <ActionButton
          pendingLabel="Saving..."
          label={featured ? "Unfeature" : "Feature"}
          className={normalButton}
        />
      </form>

      <form action={publishedAction}>
        <ActionButton
          pendingLabel="Saving..."
          label={
            published ? "Unpublish" : "Publish"
          }
          className={normalButton}
        />
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
        <ActionButton
          pendingLabel="Deleting..."
          label="Delete"
          className="rounded-lg border border-red-900 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-950/50 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </form>
    </div>
  );
}