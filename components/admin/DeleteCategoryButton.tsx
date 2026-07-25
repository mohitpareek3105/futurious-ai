"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { deleteCategoryAction } from "@/app/admin/categories/actions";

type DeleteCategoryButtonProps = {
  categoryId: number;
  categoryName: string;
};

export default function DeleteCategoryButton({
  categoryId,
  categoryName,
}: DeleteCategoryButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${categoryName}"?\n\nThis action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setError(null);

    startTransition(async () => {
      try {
        await deleteCategoryAction(categoryId);
        router.refresh();
      } catch (caughtError) {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Unable to delete category.",
        );
      }
    });
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="text-sm font-semibold text-red-500 transition hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>

      {error ? (
        <p
          role="alert"
          className="max-w-64 text-right text-xs text-red-400"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}