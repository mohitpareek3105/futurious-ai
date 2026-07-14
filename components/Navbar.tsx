"use client";

import { useEffect } from "react";
import Link from "next/link";

import { logout } from "@/app/auth/actions";
import { useAppStore } from "@/store/appStore";

type NavbarProps = {
  userEmail?: string | null;
};

export default function Navbar({ userEmail }: NavbarProps) {
  const { favorites, compare, loadData } = useAppStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-gray-800 bg-gray-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <Link href="/" className="text-3xl font-bold">
          <span className="text-white">Futurious</span>
          <span className="text-blue-500">.AI</span>
        </Link>

        <div className="hidden items-center gap-8 font-medium text-gray-300 md:flex">
          <Link href="/tools" className="duration-300 hover:text-blue-500">
            AI Tools
          </Link>

          <Link href="/compare" className="duration-300 hover:text-blue-500">
            Compare ({compare.length})
          </Link>

          <Link href="/favorites" className="duration-300 hover:text-blue-500">
            Favorites ({favorites.length})
          </Link>

          <Link href="/prompts" className="duration-300 hover:text-blue-500">
            Prompt Library
          </Link>

          <Link href="/categories" className="duration-300 hover:text-blue-500">
            Categories
          </Link>

          <Link href="/blog" className="duration-300 hover:text-blue-500">
            Blog
          </Link>
        </div>

        {userEmail ? (
          <div className="flex items-center gap-3">
            <span className="hidden max-w-40 truncate text-sm text-gray-400 lg:block">
              {userEmail}
            </span>

            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg bg-gray-800 px-5 py-2 text-white duration-300 hover:bg-gray-700"
              >
                Logout
              </button>
            </form>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg border border-gray-700 px-4 py-2 text-white duration-300 hover:border-blue-500"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white duration-300 hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}