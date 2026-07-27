import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">
      <section className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
          Error 404
        </p>

        <h1 className="mt-6 text-5xl font-bold sm:text-6xl">
          Page not found
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-400">
          The page you are looking for may have been moved, deleted,
          or the address may be incorrect.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            Go to Homepage
          </Link>

          <Link
            href="/tools"
            className="rounded-xl border border-gray-700 px-6 py-3 font-semibold text-gray-200 transition hover:border-blue-500 hover:text-white"
          >
            Browse AI Tools
          </Link>
        </div>
      </section>
    </main>
  );
}