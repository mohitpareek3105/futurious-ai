import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ToolsClient from "@/components/tools/ToolsClient";
import { categories } from "@/data/categories";
import { siteConfig } from "@/lib/site-config";
import { getToolsByCategorySlug } from "@/lib/tools";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;

  const category = categories.find(
    (item) => item.slug === slug,
  );

  if (!category) {
    return {
      title: "AI Tool Category Not Found",
      description:
        "The requested AI tool category could not be found on Futurious.AI.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `Best ${category.name} AI Tools`;

  const description =
    `Discover the best ${category.name} AI tools on Futurious.AI. ` +
    `Compare features, pricing, ratings, use cases and alternatives to find the right AI tool.`;

  const canonicalPath = `/categories/${category.slug}`;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalPath,
    },

    openGraph: {
      type: "website",
      url: canonicalPath,
      siteName: siteConfig.name,
      title,
      description,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },

    keywords: [
      category.name,
      `${category.name} AI tools`,
      `best ${category.name} tools`,
      `${category.name} software`,
      "AI tools",
      "artificial intelligence tools",
      "AI tool directory",
      "Futurious.AI",
    ],
  };
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const category = categories.find(
    (item) => item.slug === slug,
  );

  if (!category) {
    notFound();
  }

  const tools = await getToolsByCategorySlug(slug);

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
        name: "Categories",
        item: `${siteConfig.url}/categories`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${siteConfig.url}/categories/${category.slug}`,
      },
    ],
  };

  const serializedBreadcrumbStructuredData = JSON.stringify(
    breadcrumbStructuredData,
  ).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializedBreadcrumbStructuredData,
        }}
      />

      <ToolsClient tools={tools} />
    </>
  );
}
