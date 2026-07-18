const fallbackSiteUrl = "http://localhost:3000";

function normalizeSiteUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "Futurious.AI",
  shortName: "Futurious",
  description:
    "Discover and compare the best AI tools, prompts, and productivity resources for work, business, and creativity.",
  url: normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl
  ),
  locale: "en_US",
  keywords: [
    "AI tools",
    "best AI tools",
    "AI tool directory",
    "AI prompts",
    "AI software",
    "artificial intelligence tools",
    "AI productivity tools",
    "AI writing tools",
    "AI coding tools",
    "AI image generators",
  ],
} as const;