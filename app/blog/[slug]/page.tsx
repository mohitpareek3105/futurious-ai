import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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

          <div className="mt-12">
            <pre className="whitespace-pre-wrap font-sans text-lg leading-8 text-gray-300">
              {blog.content}
            </pre>
          </div>

          <BlogTags tags={blog.tags} />

          <ShareButtons title={blog.title} />
        </article>
      </main>
    </>
  );
}