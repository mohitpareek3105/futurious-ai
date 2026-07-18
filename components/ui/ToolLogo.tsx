"use client";

import { useEffect, useMemo, useState } from "react";
import { getLocalToolLogo } from "@/lib/tool-logos";

type ToolLogoProps = {
  name: string;
  slug?: string | null;
  logo?: string | null;
  website?: string | null;
  size?: number;
};

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

function getFaviconUrl(
  website?: string | null,
  name?: string
): string | null {
  if (!website) {
    return null;
  }

  try {
    const url = new URL(website);
    const domain = url.hostname.replace(/^www\./, "");

    const params = new URLSearchParams({
      domain,
      name: name?.trim() || "AI Tool",
    });

    return `/api/tool-logo?${params.toString()}`;
  } catch {
    return null;
  }
}

export default function ToolLogo({
  name,
  slug,
  logo,
  website,
  size = 40,
}: ToolLogoProps) {
  const sources = useMemo(() => {
    const localLogo = getLocalToolLogo(slug);
    const faviconLogo = getFaviconUrl(website, name);

    return Array.from(
      new Set(
        [localLogo, logo, faviconLogo]
          .filter(
            (source): source is string =>
              typeof source === "string" &&
              source.trim().length > 0
          )
          .map((source) => source.trim())
      )
    );
  }, [slug, logo, website, name]);

  const [sourceIndex, setSourceIndex] = useState(0);

  useEffect(() => {
    setSourceIndex(0);
  }, [sources]);

  const currentSource = sources[sourceIndex] ?? null;

  
  const initials = getInitials(name);

  function handleImageError() {
    setSourceIndex((currentIndex) => currentIndex + 1);
  }

  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
      {currentSource ? (
        <img
  key={currentSource}
  src={currentSource}
  alt={`${name} logo`}
  width={size}
  height={size}
  className="h-10 w-auto max-w-10 object-contain"
  onError={handleImageError}
/>
      ) : (
        <span
          aria-label={`${name} logo placeholder`}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-sm font-bold text-white"
        >
          {initials}
        </span>
      )}
    </div>
  );
}