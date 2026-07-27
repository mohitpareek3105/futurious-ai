export type PromptDifficulty =
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export type Prompt = {
  id: number;
  title: string;
  slug: string;
  description: string;
  prompt: string;
  category: string;

  tags: string[];
  difficulty: PromptDifficulty;
  aiModels: string[];
  variables: string[];

  exampleInput: string;
  exampleOutput: string;
  tips: string[];

  featured: boolean;
  published: boolean;

  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PromptRow = {
  id: number;
  title: string;
  slug: string;
  description: string;
  prompt: string;
  category: string;

  tags: string[] | null;
  difficulty: string | null;
  ai_models: string[] | null;
  variables: string[] | null;

  example_input: string | null;
  example_output: string | null;
  tips: string[] | null;

  featured: boolean | null;
  published: boolean | null;

  published_at: string | null;
  created_at: string;
  updated_at: string;
};