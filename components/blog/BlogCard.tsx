import Link from "next/link";

import { Blog } from "@/types/blog";

type Props = {
  blog: Blog;
};

export default function BlogCard({
  blog,
}: Props) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="block bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500 transition"
    >
      <div className="h-52 bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center text-6xl">
        📰
      </div>

      <div className="p-6">

        <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
          {blog.category}
        </span>

        <h2 className="text-2xl font-bold mt-5">
          {blog.title}
        </h2>

        <p className="text-gray-400 mt-4">
          {blog.excerpt}
        </p>

        <div className="flex justify-between mt-8 text-sm text-gray-500">

          <span>{blog.author}</span>

          <span>{blog.readingTime}</span>

        </div>

      </div>

    </Link>
  );
}