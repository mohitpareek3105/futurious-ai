import Link from "next/link";
import type { ReactNode } from "react";

import { logout } from "@/app/auth/actions";
import { requireAdmin } from "@/lib/admin";

type AdminLayoutProps = {
  children: ReactNode;
};

const navigationItems = [
  {
    href: "/admin",
    label: "Dashboard",
  },
  {
    href: "/admin/tools",
    label: "AI Tools",
  },
  {
    href: "/admin/categories",
    label: "Categories",
  },
  {
    href: "/admin/blog",
    label: "Blog",
  },
  {
    href: "/admin/prompts",
    label: "Prompts",
  },
];

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-gray-800 bg-[#0a0a0a]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <div>
            <Link
              href="/admin"
              className="text-xl font-bold tracking-tight"
            >
              Futurious.AI Admin
            </Link>

            <p className="mt-1 text-xs text-gray-500">
              {user.email}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-gray-500 hover:text-white"
            >
              View Website
            </Link>

            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-gray-800 bg-[#111827] p-4">
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}