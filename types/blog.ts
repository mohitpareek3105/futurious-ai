export interface Blog {
  id: number;

  title: string;

  slug: string;

  excerpt: string;

  content: string;

  category: string;

  coverImage: string;

  author: string;

  publishedAt: string;

  readingTime: string;

  featured: boolean;

  tags: string[];
}