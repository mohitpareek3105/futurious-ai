import Link from "next/link";
import { notFound } from "next/navigation";

import { updateBlog } from "@/app/admin/blog/actions";
import BlogForm from "@/components/admin/BlogForm";
import { requireAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

type EditBlogPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBlogPage({
  params,
}: EditBlogPageProps) {
  await requireAdmin();

  const { id } = await params;
  const blogId = Number(id);

  if (!Number.isInteger(blogId) || blogId <= 0) {
    notFound();
  }

  const supabase = await createClient();

  const { data: blog, error } = await supabase
    .from("blogs")
    .select(
      `
        id,
        title,
        slug,
        excerpt,
        content,
        category,
        tags,
        reading_time,
        author,
        cover_image,
        featured,
        published
      `,
    )
    .eq("id", blogId)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Unable to load the blog article: ${error.message}`,
    );
  }

  if (!blog) {
    notFound();
  }

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
          Edit Blog Article
        </h1>

        <p className="mt-3 max-w-2xl text-gray-400">
          Update the article content, publishing status and
          public blog details.
        </p>
      </div>

      <BlogForm
        mode="edit"
        action={updateBlog}
        blogId={String(blog.id)}
        initialValues={{
          title: blog.title ?? "",
          slug: blog.slug ?? "",
          excerpt: blog.excerpt ?? "",
          content: blog.content ?? "",
          category: blog.category ?? "",
          tags: Array.isArray(blog.tags) ? blog.tags : [],
          readingTime: blog.reading_time ?? "",
          author: blog.author ?? "",
          coverImage: blog.cover_image ?? "",
          featured: Boolean(blog.featured),
          published: Boolean(blog.published),
        }}
      />
    </div>
  );
}