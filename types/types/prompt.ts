export interface Prompt {
  id: number;

  title: string;

  slug: string;

  category: string;

  description: string;

  prompt: string;

  tags: string[];

  featured: boolean;
}