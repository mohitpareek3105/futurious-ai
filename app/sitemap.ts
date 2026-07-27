import type { MetadataRoute } from "next";

import { prompts } from "@/data/prompts";
import { getPublishedBlogs } from "@/lib/blogs";
import { getAllCategories } from "@/lib/categories";
import { siteConfig } from "@/lib/site-config";
import { getAllTools } from "@/lib/tools";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  const [tools, categories, blogs] = await Promise.all([
    getAllTools(),
    getAllCategories(),
    getPublishedBlogs(),
  ]);

  const currentDate = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/prompts`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: tool.lastUpdated
      ? new Date(tool.lastUpdated)
      : currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map(
    (category) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.publishedAt
      ? new Date(blog.publishedAt)
      : currentDate,
    changeFrequency: "monthly",
    priority: blog.featured ? 0.8 : 0.7,
  }));

  const promptPages: MetadataRoute.Sitemap = prompts.map((prompt) => ({
    url: `${baseUrl}/prompts/${prompt.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: prompt.featured ? 0.7 : 0.6,
  }));

  return [
    ...staticPages,
    ...toolPages,
    ...categoryPages,
    ...blogPages,
    ...promptPages,
  ];
}