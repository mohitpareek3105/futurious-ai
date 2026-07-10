import { AITool } from "@/types/ai-tool";

export const aiTools: AITool[] = [
  {
    id: 1,
    name: "ChatGPT",
    company: "OpenAI",
    website: "https://chatgpt.com",
    logo: "/logos/chatgpt.png",
    coverImage: "/covers/chatgpt.jpg",

    category: "AI Assistant",

    tags: [
      "Chatbot",
      "Writing",
      "Coding",
      "Research",
      "Productivity",
    ],

    description:
      "The world's most popular AI assistant for writing, coding, research and productivity.",

    pricing: "Freemium",

    rating: 4.9,

    founded: "2022",

    users: "500M+",

    platforms: [
      "Web",
      "Windows",
      "Mac",
      "Android",
      "iPhone",
    ],

    features: [
      "Writing",
      "Coding",
      "Image Generation",
      "Voice",
      "Deep Research",
      "Vision",
    ],

    pros: [
      "Excellent reasoning",
      "Fast responses",
      "Best coding assistant",
    ],

    cons: [
      "Free plan has limits",
      "Internet required",
    ],

    useCases: [
      "Students",
      "Developers",
      "Marketing",
      "Business",
      "Content Creation",
    ],

    integrations: [
      "Google Drive",
      "GitHub",
      "Zapier",
      "Slack",
    ],

    api: true,

    languages: [
      "English",
      "Hindi",
      "Spanish",
      "French",
    ],

    featured: true,

    lastUpdated: "2026-07-10",
  },

  {
    id: 2,
    name: "Claude",
    company: "Anthropic",
    website: "https://claude.ai",
    logo: "/logos/claude.png",
    coverImage: "/covers/claude.jpg",

    category: "AI Assistant",

    tags: [
      "Writing",
      "Coding",
      "Reasoning",
    ],

    description:
      "Advanced AI assistant with excellent writing and long-context reasoning.",

    pricing: "Freemium",

    rating: 4.8,

    founded: "2023",

    users: "20M+",

    platforms: [
      "Web",
      "Android",
      "iPhone",
    ],

    features: [
      "Writing",
      "Coding",
      "Long Context",
      "Reasoning",
    ],

    pros: [
      "Excellent writing",
      "Large context window",
      "Great reasoning",
    ],

    cons: [
      "Limited free usage",
      "Regional availability",
    ],

    useCases: [
      "Writing",
      "Coding",
      "Research",
    ],

    integrations: [
      "API",
      "GitHub",
    ],

    api: true,

    languages: [
      "English",
    ],

    featured: true,

    lastUpdated: "2026-07-10",
  },

  {
    id: 3,
    name: "Gemini",
    company: "Google",
    website: "https://gemini.google.com",
    logo: "/logos/gemini.png",
    coverImage: "/covers/gemini.jpg",

    category: "AI Assistant",

    tags: [
      "Google",
      "Search",
      "Chatbot",
    ],

    description:
      "Google's multimodal AI assistant integrated with Google Workspace.",

    pricing: "Free",

    rating: 4.7,

    founded: "2023",

    users: "100M+",

    platforms: [
      "Web",
      "Android",
      "iPhone",
    ],

    features: [
      "Search",
      "Writing",
      "Image Understanding",
    ],

    pros: [
      "Google ecosystem",
      "Fast responses",
    ],

    cons: [
      "Advanced features need subscription",
    ],

    useCases: [
      "Students",
      "Search",
      "Office Work",
    ],

    integrations: [
      "Google Docs",
      "Gmail",
      "Drive",
    ],

    api: true,

    languages: [
      "English",
      "Hindi",
    ],

    featured: true,

    lastUpdated: "2026-07-10",
  },
];