"use client";

import { useState } from "react";

type Props = {
  title: string;
  description: string;
  prompt: string;
};

export default function PromptDetail({
  title,
  description,
  prompt,
}: Props) {
  const [copied, setCopied] = useState(false);

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <h1 className="text-5xl font-bold">
        {title}
      </h1>

      <p className="text-gray-400 text-xl mt-5">
        {description}
      </p>

      <div className="mt-12 bg-[#111827] border border-gray-800 rounded-2xl p-8">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-3xl font-bold">
            Prompt
          </h2>

          <button
            onClick={copyPrompt}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl"
          >
            {copied ? "✅ Copied" : "📋 Copy"}
          </button>

        </div>

        <pre className="whitespace-pre-wrap text-gray-300 leading-8">
          {prompt}
        </pre>

      </div>
    </>
  );
}