import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import SimilarTools from "@/components/tool/SimilarTools";
import ToolFeatures from "@/components/tool/ToolFeatures";
import ToolHeader from "@/components/tool/ToolHeader";
import ToolIntegrations from "@/components/tool/ToolIntegrations";
import ToolLanguages from "@/components/tool/ToolLanguages";
import ToolProsCons from "@/components/tool/ToolProsCons";
import ToolQuickInfo from "@/components/tool/ToolQuickInfo";
import ToolUseCases from "@/components/tool/ToolUseCases";

import { siteConfig } from "@/lib/site-config";
import { getToolBySlug } from "@/lib/tools";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

function createToolDescription(
  toolName: string,
  description: string,
  pricing: string,
) {
  const fallbackDescription =
    `Explore ${toolName}, including its features, pricing, pros, cons, ` +
    "use cases and similar AI tools.";

  const sourceDescription =
    description?.replace(/\s+/g, " ").trim() ||
    fallbackDescription;

  const completeDescription =
    `${sourceDescription} Pricing: ${
      pricing || "See official website"
    }.`;

  return completeDescription.length > 160
    ? `${completeDescription.slice(0, 157).trimEnd()}...`
    : completeDescription;
}

function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    return {
      title: "AI Tool Not Found",
      description:
        "The requested AI tool could not be found on Futurious.AI.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    `${tool.name} Review: Features, Pricing, Pros & Cons`;

  const description = createToolDescription(
    tool.name,
    tool.description,
    tool.pricing,
  );

  const canonicalPath = `/tools/${tool.slug}`;

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
      images: tool.coverImage
        ? [
            {
              url: tool.coverImage,
              alt: `${tool.name} AI tool review`,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: tool.coverImage
        ? [tool.coverImage]
        : undefined,
    },

    keywords: [
      tool.name,
      `${tool.name} review`,
      `${tool.name} pricing`,
      `${tool.name} alternatives`,
      `${tool.name} features`,
      "AI tools",
      tool.category,
      ...tool.tags,
    ],
  };
}

export default async function ToolPage({
  params,
}: Props) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    notFound();
  }
const pageUrl = `${siteConfig.url}/tools/${tool.slug}`;

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${pageUrl}#software-application`,
    name: tool.name,
    description: tool.description,
    url: pageUrl,
    sameAs: tool.website,
    applicationCategory:
      tool.category || "BusinessApplication",
    operatingSystem:
      tool.platforms.length > 0
        ? tool.platforms.join(", ")
        : "Web",
    ...(tool.coverImage
      ? {
          image: tool.coverImage,
        }
      : {}),
    ...(tool.company
      ? {
          creator: {
            "@type": "Organization",
            name: tool.company,
          },
        }
      : {}),
    ...(tool.features.length > 0
      ? {
          featureList: tool.features,
        }
      : {}),
    ...(tool.languages.length > 0
      ? {
          inLanguage: tool.languages,
        }
      : {}),
    keywords: [
      tool.name,
      tool.category,
      ...tool.tags,
    ]
      .filter(Boolean)
      .join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
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
        name: "AI Tools",
        item: `${siteConfig.url}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            softwareApplicationSchema,
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbSchema),
        }}
      />

    <main className="min-h-screen bg-[#050505] px-6 py-16 text-white">
      <div className="mx-auto mt-16 max-w-6xl">
        <Link
          href="/tools"
          className="text-blue-400 transition hover:text-blue-300"
        >
          &larr; Back to All Tools
        </Link>

        <ToolHeader tool={tool} />

        <ToolQuickInfo
          founded={tool.founded}
          users={tool.users}
          pricing={tool.pricing}
          rating={tool.rating}
        />

        <section className="mt-12">
          <h2 className="text-3xl font-bold">
            Description
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-300">
            {tool.description}
          </p>
        </section>

        <ToolFeatures features={tool.features} />

        <ToolUseCases useCases={tool.useCases} />

        <ToolLanguages languages={tool.languages} />

        <ToolIntegrations
          integrations={tool.integrations}
          api={tool.api}
        />

        <ToolProsCons
          pros={tool.pros}
          cons={tool.cons}
        />

        <SimilarTools currentTool={tool} />

        {tool.tags.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-3xl font-bold">
              Tags
            </h2>

            <div className="flex flex-wrap gap-3">
              {tool.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-blue-600 bg-blue-900/40 px-4 py-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        <a
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-16 inline-block rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
        >
          Visit Official Website &rarr;
        </a>
      </div>
          </main>
    </>
  );
}