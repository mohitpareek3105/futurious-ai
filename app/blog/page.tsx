"use client";

import { useMemo, useState } from "react";

import { blogs } from "@/data/blogs";

import BlogCard from "@/components/blog/BlogCard";
import BlogSearch from "@/components/blog/BlogSearch";
import BlogCategory from "@/components/blog/BlogCategory";

export default function BlogPage() {
  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const categories = [
    ...new Set(blogs.map((blog) => blog.category)),
  ];

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        blog.excerpt
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const featuredBlogs = blogs.filter(
    (blog) => blog.featured
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-16">

      <div className="max-w-7xl mx-auto mt-16">

        <h1 className="text-5xl font-bold text-center">
          AI Blog
        </h1>

        <p className="text-center text-gray-400 mt-4 mb-12">
          Latest AI News, Tutorials & Comparisons
        </p>

        <BlogSearch
          value={search}
          onChange={setSearch}
        />

        <BlogCategory
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <h2 className="text-3xl font-bold mt-16 mb-8">
          ⭐ Featured Articles
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {featuredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
            />
          ))}

        </div>

        <h2 className="text-3xl font-bold mt-20 mb-8">
          All Articles
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
            />
          ))}

        </div>

      </div>

    </main>
  );
}