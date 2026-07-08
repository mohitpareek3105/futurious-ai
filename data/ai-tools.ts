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

  founded: string;
  users: string;
  platforms: string[];
  pros: string[];
  cons: string[];
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

    founded: "2022",
    users: "500M+",
    platforms: ["Web", "Android", "iPhone", "Windows", "Mac"],

    pros: [
      "Very accurate",
      "Fast responses",
      "Excellent coding",
    ],

    cons: [
      "Free plan has limits",
      "Requires internet",
    ],
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

    founded: "",
    users: "",
    platforms: [],
    pros: [],
    cons: [],
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

    founded: "",
    users: "",
    platforms: [],
    pros: [],
    cons: [],
  },
];