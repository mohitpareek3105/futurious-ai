import type { MetadataRoute } from "next";

import { blogs } from "@/data/blogs";
import { categories } from "@/data/categories";
import { prompts } from "@/data/prompts";
import { siteConfig } from "@/lib/site-config";
import { getAllTools } from "@/lib/tools";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tools = await getAllTools();
  const currentDate = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/tools`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/categories`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/prompts`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${siteConfig.url}/tools/${tool.slug}`,
    lastModified: tool.lastUpdated
      ? new Date(tool.lastUpdated)
      : currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map(
    (category) => ({
      url: `${siteConfig.url}/categories/${category.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${siteConfig.url}/blog/${blog.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: blog.featured ? 0.8 : 0.7,
  }));

  const promptPages: MetadataRoute.Sitemap = prompts.map((prompt) => ({
    url: `${siteConfig.url}/prompts/${prompt.slug}`,
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