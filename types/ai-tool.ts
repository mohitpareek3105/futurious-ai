export interface AITool {
  id: number;

  name: string;
  company: string;
  website: string;
  logo: string;
  coverImage: string;

  category: string;
  tags: string[];

  description: string;

  pricing: string;
  rating: number;

  founded: string;
  users: string;

  platforms: string[];

  features: string[];

  pros: string[];
  cons: string[];

  useCases: string[];

  integrations: string[];

  api: boolean;

  languages: string[];

  featured: boolean;

  lastUpdated: string;
}