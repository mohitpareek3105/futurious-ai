import Link from "next/link";

import { requireAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

type DashboardStat = {
  label: string;
  value: string;
  description: string;
};

export default async function AdminDashboardPage() {
  const user = await requireAdmin();
  const supabase = await createClient();

  const [
    totalToolsResult,
    featuredToolsResult,
    freeToolsResult,
  ] = await Promise.all([
    supabase
      .from("tools")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("tools")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("featured", true),

    supabase
      .from("tools")
      .select("*", {
        count: "exact",
        head: true,
      })
      .ilike("pricing", "%free%"),
  ]);

  const stats: DashboardStat[] = [
    {
      label: "Total AI Tools",
      value: String(totalToolsResult.count ?? 0),
      description: "Tools currently stored in Supabase.",
    },
    {
      label: "Featured Tools",
      value: String(featuredToolsResult.count ?? 0),
      description: "Tools promoted across the website.",
    },
    {
      label: "Free Tools",
      value: String(freeToolsResult.count ?? 0),
      description: "Tools containing a free pricing option.",
    },
    {
      label: "Admin Status",
      value: "Active",
      description: "Protected administration access enabled.",
    },
  ];

  const hasDatabaseError =
    totalToolsResult.error ||
    featuredToolsResult.error ||
    freeToolsResult.error;

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Administration
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-gray-400">
            Manage Futurious.AI content, tools and launch
            operations from one protected workspace.
          </p>
        </div>

        <Link
          href="/admin/tools"
          className="inline-flex w-fit items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Manage AI Tools
        </Link>
      </div>

      {hasDatabaseError && (
        <div className="mt-8 rounded-xl border border-red-900 bg-red-950/30 px-5 py-4 text-sm text-red-300">
          Dashboard statistics could not be loaded. Check the
          Supabase tools table and RLS configuration.
        </div>
      )}

      <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-gray-800 bg-[#111827] p-6"
          >
            <p className="text-sm font-medium text-gray-400">
              {stat.label}
            </p>

            <p className="mt-3 text-3xl font-bold">
              {stat.value}
            </p>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              {stat.description}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-gray-800 bg-[#111827] p-6 sm:p-8">
        <div>
          <h2 className="text-xl font-bold">
            Admin Foundation Status
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Logged in as {user.email}
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-green-900 bg-green-950/20 p-5">
            <h3 className="font-semibold text-green-300">
              Completed
            </h3>

            <ul className="mt-3 space-y-2 text-sm text-gray-300">
              <li>Supabase authentication</li>
              <li>Protected admin route</li>
              <li>Admin email authorization</li>
              <li>Dashboard statistics</li>
              <li>Secure server-side validation</li>
            </ul>
          </div>

          <div className="rounded-xl border border-blue-900 bg-blue-950/20 p-5">
            <h3 className="font-semibold text-blue-300">
              Next Milestone
            </h3>

            <ul className="mt-3 space-y-2 text-sm text-gray-300">
              <li>AI Tools management table</li>
              <li>Add new AI tool</li>
              <li>Edit existing AI tool</li>
              <li>Delete tool protection</li>
              <li>Featured tool control</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}