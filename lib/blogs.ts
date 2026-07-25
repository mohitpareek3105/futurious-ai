import { createClient } from "@/lib/supabase/server";

import type { Blog } from "@/types/blog";

type BlogRow = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  cover_image: string;
  author: string;
  published_at: string;
  reading_time: string;
  featured: boolean;
  published: boolean;
  tags: string[];
};

function mapBlog(blog: BlogRow): Blog {
  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.content,
    category: blog.category,
    coverImage: blog.cover_image,
    author: blog.author,
    publishedAt: blog.published_at,
    readingTime: blog.reading_time,
    featured: blog.featured,
    tags: blog.tags ?? [],
  };
}

export async function getAllBlogs(): Promise<Blog[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("published_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(
      `Unable to load blogs: ${error.message}`,
    );
  }

  return (data ?? []).map(mapBlog);
}

export async function getPublishedBlogs(): Promise<Blog[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .order("published_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(
      `Unable to load blogs: ${error.message}`,
    );
  }

  return (data ?? []).map(mapBlog);
}

export async function getFeaturedBlogs(): Promise<Blog[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .order("published_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(
      `Unable to load featured blogs: ${error.message}`,
    );
  }

  return (data ?? []).map(mapBlog);
}

export async function getBlogById(
  id: number,
): Promise<Blog | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Unable to load blog: ${error.message}`,
    );
  }

  return data ? mapBlog(data) : null;
}

export async function getBlogBySlug(
  slug: string,
): Promise<Blog | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Unable to load blog: ${error.message}`,
    );
  }

  return data ? mapBlog(data) : null;
}