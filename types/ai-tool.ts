export interface AITool {
  id: number;

  name: string;
  company: string;
  category: string;
  description: string;

  pricing: "Free" | "Freemium" | "Paid";

  rating: number;

  website: string;

  featured: boolean;

  logo: string;

  founded: string;

  users: string;

  platforms: string[];

  pros: string[];

  cons: string[];

  tags: string[];
}