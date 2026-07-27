import type { Prompt } from "@/types/prompt";

const currentDate = new Date().toISOString();

export const prompts: Prompt[] = [
  {
    id: 1,

    title: "YouTube Script Generator",
    slug: "youtube-script-generator",
    category: "YouTube",

    description: "Generate engaging YouTube video scripts.",

    prompt: `Act as an expert YouTube script writer.

Write a 10-minute engaging Hindi YouTube video script about:

[TOPIC]

The script should have:

Hook

Storytelling

Examples

Call to Action`,

    tags: ["YouTube", "Content"],

    difficulty: "Beginner",

    aiModels: ["ChatGPT", "Claude", "Gemini"],

    variables: ["TOPIC"],

    exampleInput: "How to earn money using ChatGPT",

    exampleOutput: "",

    tips: [
      "Replace [TOPIC] with a specific video topic.",
      "Mention the target audience for better results.",
      "Add the preferred tone, such as educational or entertaining.",
    ],

    featured: true,
    published: true,

    publishedAt: currentDate,
    createdAt: currentDate,
    updatedAt: currentDate,
  },

  {
    id: 2,

    title: "Excel Formula Expert",
    slug: "excel-formula-expert",
    category: "Excel",

    description: "Generate Excel formulas.",

    prompt: `Act as an Excel Expert.

Help me solve this Excel problem:

[YOUR QUESTION]

Explain step-by-step.`,

    tags: ["Excel"],

    difficulty: "Beginner",

    aiModels: ["ChatGPT", "Claude", "Gemini"],

    variables: ["YOUR QUESTION"],

    exampleInput:
      "Create an Excel formula to calculate total monthly sales based on dates and amounts.",

    exampleOutput: "",

    tips: [
      "Describe the worksheet structure clearly.",
      "Mention exact column names or cell references.",
      "Specify your Excel version when using newer functions.",
    ],

    featured: true,
    published: true,

    publishedAt: currentDate,
    createdAt: currentDate,
    updatedAt: currentDate,
  },

  {
    id: 3,

    title: "Resume Builder",
    slug: "resume-builder",
    category: "Career",

    description: "Professional resume prompt.",

    prompt: `Act as an HR Manager.

Create an ATS-friendly resume using this information:

[DETAILS]`,

    tags: ["Resume"],

    difficulty: "Beginner",

    aiModels: ["ChatGPT", "Claude", "Gemini"],

    variables: ["DETAILS"],

    exampleInput:
      "Accountant with 8 years of experience in GST, TDS, costing and financial reporting.",

    exampleOutput: "",

    tips: [
      "Include work experience, education and key skills.",
      "Mention the job title you are applying for.",
      "Add measurable achievements wherever possible.",
    ],

    featured: true,
    published: true,

    publishedAt: currentDate,
    createdAt: currentDate,
    updatedAt: currentDate,
  },
];