import BlogListClient from "@/components/blog/BlogListClient";
import { getPublishedBlogs } from "@/lib/blogs";

export const revalidate = 3600;

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-16 text-white">
      <div className="mx-auto mt-16 max-w-7xl">
        <h1 className="text-center text-5xl font-bold">
          AI Blog
        </h1>

        <p className="mt-4 mb-12 text-center text-gray-400">
          Latest AI News, Tutorials &amp; Comparisons
        </p>

        <BlogListClient blogs={blogs} />
      </div>
    </main>
  );
}