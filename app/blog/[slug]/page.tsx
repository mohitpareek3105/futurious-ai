import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import BlogMeta from "@/components/blog/BlogMeta";
import BlogTags from "@/components/blog/BlogTags";
import ShareButtons from "@/components/blog/ShareButtons";
import { getBlogBySlug } from "@/lib/blogs";
import { siteConfig } from "@/lib/site-config";

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
    `Read ${title} on Futurious.AI and discover practical insights, ` +
    `guides and updates about artificial intelligence and AI tools.`;

  const description = plainText || fallback;

  return description.length > 160
    ? `${description.slice(0, 157).trimEnd()}...`
    : description;
}

function formatPublishedDateForSchema(
  publishedAt: string,
) {
  const parsedDate = new Date(publishedAt);

  if (Number.isNaN(parsedDate.getTime())) {
    return publishedAt;
  }

  return parsedDate.toISOString().split("T")[0];
}

function getAbsoluteImageUrl(imageUrl: string) {
  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://")
  ) {
    return imageUrl;
  }

  const normalizedPath = imageUrl.startsWith("/")
    ? imageUrl
    : `/${imageUrl}`;

  return `${siteConfig.url}${normalizedPath}`;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description:
        "The requested blog post could not be found on Futurious.AI.",
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
  const coverImageUrl = getAbsoluteImageUrl(
    blog.coverImage,
  );

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
      publishedTime: formatPublishedDateForSchema(
        blog.publishedAt,
      ),
      authors: [blog.author],
      tags: blog.tags,
      images: [
        {
          url: coverImageUrl,
          alt: blog.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [coverImageUrl],
    },

    keywords: [
      blog.title,
      ...blog.tags,
      "AI blog",
      "artificial intelligence",
      "AI tools",
      "Futurious.AI",
    ],
  };
}

export default async function BlogDetail({
  params,
}: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const canonicalUrl =
    `${siteConfig.url}/blog/${blog.slug}`;

  const coverImageUrl = getAbsoluteImageUrl(
    blog.coverImage,
  );

  const description = createMetaDescription(
    blog.title,
    blog.content,
  );

  const publishedDate =
    formatPublishedDateForSchema(blog.publishedAt);

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteConfig.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: canonicalUrl,
      },
    ],
  };

  const blogPostingStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description,
    image: coverImageUrl,
    datePublished: publishedDate,
    author: {
      "@type": "Person",
      name: blog.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    articleSection: blog.category,
    keywords: blog.tags.join(", "),
    url: canonicalUrl,
  };

  const serializedBreadcrumbStructuredData =
    JSON.stringify(
      breadcrumbStructuredData,
    ).replace(/</g, "\\u003c");

  const serializedBlogPostingStructuredData =
    JSON.stringify(
      blogPostingStructuredData,
    ).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializedBreadcrumbStructuredData,
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializedBlogPostingStructuredData,
        }}
      />

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

<div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
  <Image
    src={blog.coverImage}
    alt={`${blog.title} cover image`}
    fill
    priority
    sizes="(max-width: 896px) 100vw, 896px"
    className="object-cover"
  />
</div>

<div className="mt-12 text-lg leading-8 text-gray-300">
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      h1: ({ children }) => (
        <h1 className="mb-6 mt-12 text-4xl font-bold text-white">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="mb-5 mt-10 text-3xl font-bold text-white">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="mb-4 mt-8 text-2xl font-semibold text-white">
          {children}
        </h3>
      ),
      p: ({ children }) => (
        <p className="mb-6 text-gray-300">
          {children}
        </p>
      ),
      ul: ({ children }) => (
        <ul className="mb-6 list-disc space-y-2 pl-7 text-gray-300">
          {children}
        </ul>
      ),
      ol: ({ children }) => (
        <ol className="mb-6 list-decimal space-y-2 pl-7 text-gray-300">
          {children}
        </ol>
      ),
      li: ({ children }) => (
        <li className="pl-1">
          {children}
        </li>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-8 border-l-4 border-blue-500 bg-gray-900/70 px-6 py-4 italic text-gray-300">
          {children}
        </blockquote>
      ),
      a: ({ href, children }) => (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline decoration-blue-500/50 underline-offset-4 hover:text-blue-300"
        >
          {children}
        </a>
      ),
      table: ({ children }) => (
        <div className="my-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base">
            {children}
          </table>
        </div>
      ),
      thead: ({ children }) => (
        <thead className="bg-gray-900 text-white">
          {children}
        </thead>
      ),
      th: ({ children }) => (
        <th className="border border-gray-700 px-4 py-3 font-semibold">
          {children}
        </th>
      ),
      td: ({ children }) => (
        <td className="border border-gray-800 px-4 py-3 text-gray-300">
          {children}
        </td>
      ),
      code: ({ children }) => (
        <code className="rounded bg-gray-900 px-1.5 py-0.5 text-sm text-blue-300">
          {children}
        </code>
      ),
      pre: ({ children }) => (
        <pre className="my-8 overflow-x-auto rounded-xl border border-gray-800 bg-gray-950 p-5 text-sm leading-7">
          {children}
        </pre>
      ),
      hr: () => (
        <hr className="my-10 border-gray-800" />
      ),
    }}
  >
    {blog.content
      .replace(/\r\n?/g, "\n")
      .replace(/^\n+/, "")}
  </ReactMarkdown>
</div>

<BlogTags tags={blog.tags} />

<ShareButtons title={blog.title} />
      </article>
    </main>
  </>
);
}