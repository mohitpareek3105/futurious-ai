import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { blogs } from "@/data/blogs";
import { siteConfig } from "@/lib/site-config";

import BlogMeta from "@/components/blog/BlogMeta";
import BlogTags from "@/components/blog/BlogTags";
import ShareButtons from "@/components/blog/ShareButtons";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

function createMetaDescription(
  title: string,
  content: string,
) {
  const plainText = content
    .replace(/\s+/g, " ")
    .trim();

  const fallback =
    `Read ${title} on FuturiousAI and discover practical insights, ` +
    `guides and updates about artificial intelligence and AI tools.`;

  const description = plainText || fallback;

  return description.length > 160
    ? `${description.slice(0, 157).trimEnd()}...`
    : description;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const blog = blogs.find(
    (item) => item.slug === slug,
  );

  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description:
        "The requested blog post could not be found on FuturiousAI.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = blog.title;

  const description = createMetaDescription(
    blog.title,
    blog.content,
  );

  const canonicalPath = `/blog/${blog.slug}`;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalPath,
    },

    openGraph: {
      type: "article",
      url: canonicalPath,
      siteName: siteConfig.name,
      title,
      description,
      publishedTime: blog.publishedAt,
      authors: [blog.author],
      tags: blog.tags,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },

    keywords: [
      blog.title,
      ...blog.tags,
      "AI blog",
      "artificial intelligence",
      "AI tools",
      "FuturiousAI",
    ],
  };
}

export default async function BlogDetail({
  params,
}: Props) {
  const { slug } = await params;

  const blog = blogs.find(
    (item) => item.slug === slug,
  );

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-16 text-white">
      <article className="mx-auto mt-16 max-w-4xl">
        <Link
          href="/blog"
          className="text-blue-400 hover:text-blue-300"
        >
          ← Back to Blog
        </Link>

        <h1 className="mt-10 text-5xl font-bold">
          {blog.title}
        </h1>

        <BlogMeta
          author={blog.author}
          publishedAt={blog.publishedAt}
          readingTime={blog.readingTime}
        />

        <div className="mt-12">
          <pre className="whitespace-pre-wrap font-sans text-lg leading-8 text-gray-300">
            {blog.content}
          </pre>
        </div>

        <BlogTags tags={blog.tags} />

        <ShareButtons title={blog.title} />
      </article>
    </main>
  );
}