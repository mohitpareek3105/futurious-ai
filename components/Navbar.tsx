"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { logout } from "@/app/auth/actions";
import { useAppStore } from "@/store/appStore";

type NavbarProps = {
  userEmail?: string | null;
};

const navItems = [
  { href: "/tools", label: "AI Tools" },
  { href: "/compare", label: "Compare" },
  { href: "/favorites", label: "Favorites" },
  { href: "/prompts", label: "Prompt Library" },
  { href: "/categories", label: "Categories" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar({ userEmail }: NavbarProps) {
  const pathname = usePathname();

  const { favorites, compare, loadData } = useAppStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function getLabel(label: string) {
    if (label === "Compare") {
      return `Compare (${compare.length})`;
    }

    if (label === "Favorites") {
      return `Favorites (${favorites.length})`;
    }

    return label;
  }

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-gray-800 bg-gray-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <Link href="/" className="text-3xl font-bold">
          <span className="text-white">Futurious</span>
          <span className="text-blue-500">.AI</span>
        </Link>

        <div className="hidden items-center gap-8 font-medium md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`border-b-2 pb-1 transition duration-300 ${
                  active
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-300 hover:text-blue-500"
                }`}
              >
                {getLabel(item.label)}
              </Link>
            );
          })}
        </div>

        {userEmail ? (
          <div className="flex items-center gap-3">
            <span className="hidden max-w-40 truncate text-sm text-gray-400 lg:block">
              {userEmail}
            </span>

            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg bg-gray-800 px-5 py-2 text-white transition duration-300 hover:bg-gray-700"
              >
                Logout
              </button>
            </form>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className={`rounded-lg border px-4 py-2 text-white transition duration-300 ${
                pathname === "/login"
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-700 hover:border-blue-500"
              }`}
            >
              Login
            </Link>

            <Link
              href="/signup"
              className={`rounded-lg px-4 py-2 text-white transition duration-300 ${
                pathname === "/signup"
                  ? "bg-blue-800 ring-2 ring-blue-400"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}