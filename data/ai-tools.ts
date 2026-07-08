export interface AITool {
  id: number;
  name: string;
  company: string;
  category: string;
  description: string;
  pricing: "Free" | "Paid" | "Freemium";
  rating: number;
  website: string;
  featured: boolean;
}

export const aiTools: AITool[] = [
  {
    id: 1,
    name: "ChatGPT",
    company: "OpenAI",
    category: "AI Assistant",
    description: "TEST BY MOHIT 123",
    pricing: "Freemium",
    rating: 4.9,
    website: "https://chatgpt.com",
    featured: true,
  },
  {
    id: 2,
    name: "Claude",
    company: "Anthropic",
    category: "Writing",
    description: "Powerful AI assistant for writing and coding.",
    pricing: "Freemium",
    rating: 4.8,
    website: "https://claude.ai",
    featured: true,
  },
  {
    id: 3,
    name: "Gemini",
    company: "Google",
    category: "AI Assistant",
    description: "Google's multimodal AI assistant.",
    pricing: "Free",
    rating: 4.7,
    website: "https://gemini.google.com",
    featured: true,
  },
];