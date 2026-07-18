import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const CACHE_CONTROL =
  "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000";

function normalizeDomain(value: string): string | null {
  const trimmedValue = value.trim().toLowerCase();

  if (!trimmedValue) {
    return null;
  }

  try {
    const parsedUrl = new URL(
      trimmedValue.startsWith("http://") ||
        trimmedValue.startsWith("https://")
        ? trimmedValue
        : `https://${trimmedValue}`
    );

    return parsedUrl.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function getInitials(name: string): string {
  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return "?";
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return words
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

function escapeSvgText(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function createFallbackSvg(name: string): string {
  const initials = escapeSvgText(getInitials(name));

  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="128"
      height="128"
      viewBox="0 0 128 128"
      role="img"
      aria-label="${initials}"
    >
      <rect
        width="128"
        height="128"
        rx="28"
        fill="#111827"
      />
      <text
        x="64"
        y="68"
        text-anchor="middle"
        dominant-baseline="middle"
        font-family="Arial, Helvetica, sans-serif"
        font-size="46"
        font-weight="700"
        fill="#ffffff"
      >
        ${initials}
      </text>
    </svg>
  `.trim();
}

function fallbackResponse(name: string): NextResponse {
  return new NextResponse(createFallbackSvg(name), {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": CACHE_CONTROL,
      "X-Content-Type-Options": "nosniff",
    },
  });
}

async function fetchImage(url: string): Promise<Response | null> {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "image/avif,image/webp,image/svg+xml,image/*,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 Futurious.ai Logo Proxy",
      },
      next: {
        revalidate: 604800,
      },
    });

    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get("content-type") ?? "";

    if (!contentType.startsWith("image/")) {
      return null;
    }

    return response;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const domainParameter =
    request.nextUrl.searchParams.get("domain") ?? "";

  const name =
    request.nextUrl.searchParams.get("name") ?? "AI Tool";

  const domain = normalizeDomain(domainParameter);

  if (!domain) {
    return fallbackResponse(name);
  }

  const faviconSources = [
    `https://${domain}/favicon.ico`,
    `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
      domain
    )}&sz=128`,
  ];

  for (const faviconUrl of faviconSources) {
    const faviconResponse = await fetchImage(faviconUrl);

    if (!faviconResponse) {
      continue;
    }

    const imageBuffer = await faviconResponse.arrayBuffer();
    const contentType =
      faviconResponse.headers.get("content-type") ?? "image/x-icon";

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": CACHE_CONTROL,
        "X-Content-Type-Options": "nosniff",
      },
    });
  }

  return fallbackResponse(name);
}