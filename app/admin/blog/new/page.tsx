import Link from "next/link";

import { createBlog } from "@/app/admin/blog/actions";
import BlogForm from "@/components/admin/BlogForm";
import { requireAdmin } from "@/lib/admin";

export default async function NewBlogPage() {
  await requireAdmin();

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/blog"
          className="text-sm font-semibold text-blue-400 transition hover:text-blue-300"
        >
          ← Back to Blog Articles
        </Link>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Content Management
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Create Blog Article
        </h1>

        <p className="mt-3 max-w-2xl text-gray-400">
          Add a new article, configure its publishing status and
          make it available on Futurious.AI.
        </p>
      </div>

      <BlogForm
        mode="create"
        action={createBlog}
        initialValues={{
          author: "Futurious.AI Editorial Team",
          readingTime: "5 min read",
          published: false,
          featured: false,
        }}
      />
    </div>
  );
}