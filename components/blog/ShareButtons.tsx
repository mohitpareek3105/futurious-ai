"use client";

import { useState } from "react";

type Props = {
  title: string;
};

export default function ShareButtons({ title }: Props) {
  const [copied, setCopied] = useState(false);

  const getShareData = () => {
    const url = window.location.href;

    return {
      url,
      encodedUrl: encodeURIComponent(url),
      encodedTitle: encodeURIComponent(title),
      encodedText: encodeURIComponent(`${title} ${url}`),
    };
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Unable to copy article link:", error);
    }
  };

  const openShareWindow = (url: string) => {
    window.open(
      url,
      "_blank",
      "noopener,noreferrer,width=720,height=640"
    );
  };

  const shareOnWhatsApp = () => {
    const { encodedText } = getShareData();

    openShareWindow(
      `https://wa.me/?text=${encodedText}`
    );
  };

  const shareOnX = () => {
    const { encodedUrl, encodedTitle } = getShareData();

    openShareWindow(
      `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
    );
  };

  const shareOnLinkedIn = () => {
    const { encodedUrl } = getShareData();

    openShareWindow(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    );
  };

  const shareOnFacebook = () => {
    const { encodedUrl } = getShareData();

    openShareWindow(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    );
  };

  return (
    <section className="mt-14 border-t border-gray-800 pt-10">
      <h2 className="mb-5 text-2xl font-bold text-white">
        Share Article
      </h2>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={copyLink}
          className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500"
        >
          {copied ? "Link Copied" : "Copy Link"}
        </button>

        <button
          type="button"
          onClick={shareOnWhatsApp}
          className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-500"
        >
          WhatsApp
        </button>

        <button
          type="button"
          onClick={shareOnX}
          className="rounded-xl bg-zinc-800 px-5 py-3 font-medium text-white transition hover:bg-zinc-700"
        >
          X
        </button>

        <button
          type="button"
          onClick={shareOnLinkedIn}
          className="rounded-xl bg-blue-700 px-5 py-3 font-medium text-white transition hover:bg-blue-600"
        >
          LinkedIn
        </button>

        <button
          type="button"
          onClick={shareOnFacebook}
          className="rounded-xl bg-indigo-700 px-5 py-3 font-medium text-white transition hover:bg-indigo-600"
        >
          Facebook
        </button>
      </div>
    </section>
  );
}