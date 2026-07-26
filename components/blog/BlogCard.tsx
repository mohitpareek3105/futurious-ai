import Image from "next/image";
import Link from "next/link";

import type { Blog } from "@/types/blog";

type Props = {
  blog: Blog;
};

export default function BlogCard({ blog }: Props) {
  const coverImage = blog.coverImage?.trim();

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group block overflow-hidden rounded-2xl border border-gray-800 bg-[#111827] transition hover:border-blue-500"
    >
      <div className="relative h-52 overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={`${blog.title} cover image`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-lg font-semibold text-white">
            Futurious.AI Blog
          </div>
        )}
      </div>

      <div className="p-6">
        <span className="rounded-full bg-blue-600 px-3 py-1 text-sm">
          {blog.category}
        </span>

        <h2 className="mt-5 text-2xl font-bold">
          {blog.title}
        </h2>

        <p className="mt-4 text-gray-400">
          {blog.excerpt}
        </p>

        <div className="mt-8 flex justify-between text-sm text-gray-500">
          <span>{blog.author}</span>
          <span>{blog.readingTime}</span>
        </div>
      </div>
    </Link>
  );
}