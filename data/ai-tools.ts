import { AITool } from "@/types/ai-tool";

export const aiTools: AITool[] = [
  {
    id: 1,
    name: "ChatGPT",
    company: "OpenAI",
    category: "AI Assistant",
    description: "The world's most popular AI assistant for writing, coding, research, brainstorming, and productivity.",
    pricing: "Freemium",
    rating: 4.9,
    website: "https://chatgpt.com",
    featured: true,

    logo: "/logos/chatgpt.png",

    founded: "2022",
    users: "500M+",

    platforms: [
      "Web",
      "Android",
      "iPhone",
      "Windows",
      "Mac",
    ],

    pros: [
      "Excellent reasoning",
      "Powerful coding assistant",
      "Fast and accurate responses",
    ],

    cons: [
      "Free plan has limits",
      "Internet required",
    ],

    tags: [
      "Chatbot",
      "Coding",
      "Writing",
    ],
  },

  {
    id: 2,
    name: "Claude",
    company: "Anthropic",
    category: "AI Assistant",
    description: "Advanced AI assistant with excellent writing and long-context reasoning capabilities.",
    pricing: "Freemium",
    rating: 4.8,
    website: "https://claude.ai",
    featured: true,

    logo: "/logos/claude.png",

    founded: "2023",
    users: "20M+",

    platforms: [
      "Web",
      "Android",
      "iPhone",
    ],

    pros: [
      "Excellent writing",
      "Very large context window",
      "Great reasoning",
    ],

    cons: [
      "Limited free usage",
      "Not available in some regions",
    ],

    tags: [
      "Writing",
      "Coding",
      "Reasoning",
    ],
  },

  {
    id: 3,
    name: "Gemini",
    company: "Google",
    category: "AI Assistant",
    description: "Google's multimodal AI assistant integrated with Google Workspace.",
    pricing: "Free",
    rating: 4.7,
    website: "https://gemini.google.com",
    featured: true,

    logo: "/logos/gemini.png",

    founded: "2023",
    users: "100M+",

    platforms: [
      "Web",
      "Android",
      "iPhone",
    ],

    pros: [
      "Google integration",
      "Fast responses",
      "Multimodal AI",
    ],

    cons: [
      "Some features require paid plan",
      "Performance varies by task",
    ],

    tags: [
      "Google",
      "Chatbot",
      "Search",
    ],
  },
];