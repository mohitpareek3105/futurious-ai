import { blogs } from "@/data/blogs";
import Link from "next/link";

import BlogMeta from "@/components/blog/BlogMeta";
import BlogTags from "@/components/blog/BlogTags";
import ShareButtons from "@/components/blog/ShareButtons";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogDetail({
  params,
}: Props) {
  const { slug } = await params;

  const blog = blogs.find(
    (b) => b.slug === slug
  );

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
        Blog Not Found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-16">

      <div className="max-w-4xl mx-auto mt-16">

        <Link
          href="/blog"
          className="text-blue-400 hover:text-blue-300"
        >
          ← Back to Blog
        </Link>

        <h1 className="text-5xl font-bold mt-10">
          {blog.title}
        </h1>

        <BlogMeta
          author={blog.author}
          publishedAt={blog.publishedAt}
          readingTime={blog.readingTime}
        />

        <div className="mt-12">

          <pre className="whitespace-pre-wrap leading-8 text-lg font-sans text-gray-300">
            {blog.content}
          </pre>

        </div>

        <BlogTags
          tags={blog.tags}
        />

        <ShareButtons
          title={blog.title}
        />

      </div>

    </main>
  );
}