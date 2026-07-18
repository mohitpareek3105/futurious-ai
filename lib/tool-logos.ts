const LOCAL_TOOL_LOGOS: Readonly<Record<string, string>> = {
  claude: "/logos/claude.svg",
  gemini: "/logos/googlegemini.svg",
  "google-gemini": "/logos/googlegemini.svg",
  googlegemini: "/logos/googlegemini.svg",
};

function normalizeToolSlug(slug: string): string {
  return slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getLocalToolLogo(
  slug?: string | null
): string | null {
  if (!slug) {
    return null;
  }

  const normalizedSlug = normalizeToolSlug(slug);

  return LOCAL_TOOL_LOGOS[normalizedSlug] ?? null;
}