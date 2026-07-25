"use client";

import { useMemo, useState } from "react";

import BlogCard from "@/components/blog/BlogCard";
import BlogCategory from "@/components/blog/BlogCategory";
import BlogSearch from "@/components/blog/BlogSearch";
import type { Blog } from "@/types/blog";

type BlogListClientProps = {
  blogs: Blog[];
};

export default function BlogListClient({
  blogs,
}: BlogListClientProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const categories = useMemo(
    () => [
      ...new Set(
        blogs.map((blog) => blog.category),
      ),
    ],
    [blogs],
  );

  const filteredBlogs = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        blog.excerpt
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "All" ||
        blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [blogs, search, selectedCategory]);

  const featuredBlogs = useMemo(
    () => blogs.filter((blog) => blog.featured),
    [blogs],
  );

  return (
    <>
      <BlogSearch
        value={search}
        onChange={setSearch}
      />

      <BlogCategory
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <h2 className="mt-16 mb-8 text-3xl font-bold">
        ⭐ Featured Articles
      </h2>

      {featuredBlogs.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">
          No featured articles available.
        </p>
      )}

      <h2 className="mt-20 mb-8 text-3xl font-bold">
        All Articles
      </h2>

      {filteredBlogs.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-800 bg-gray-950/50 px-6 py-12 text-center">
          <h3 className="text-xl font-semibold">
            No articles found
          </h3>

          <p className="mt-2 text-gray-400">
            Try changing your search or category filter.
          </p>
        </div>
      )}
    </>
  );
}