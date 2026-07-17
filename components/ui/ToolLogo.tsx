"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ToolLogoProps = {
  name: string;
  logo?: string | null;
  size?: number;
};

export default function ToolLogo({
  name,
  logo,
  size = 40,
}: ToolLogoProps) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [logo]);

  const showImage = Boolean(logo) && !imageFailed;

  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
      {showImage ? (
        <Image
          src={logo as string}
          alt={`${name} logo`}
          width={size}
          height={size}
          className="h-10 w-auto max-w-10 object-contain"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span
          aria-label={`${name} logo placeholder`}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-xl font-bold text-white"
        >
          {name.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}