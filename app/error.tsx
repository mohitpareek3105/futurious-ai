"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">
      <section className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
          Something went wrong
        </p>

        <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
          We could not load this page
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-400">
          An unexpected error occurred. Please try again.
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-10 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
        >
          Try Again
        </button>
      </section>
    </main>
  );
}