"use client";

import { useState } from "react";
import {
  Check,
  Clipboard,
  Sparkles,
} from "lucide-react";

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

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <article className="mt-10">

      <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
        <Sparkles className="h-4 w-4" />
        AI Prompt
      </div>

      <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h1>

      <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-400">
        {description}
      </p>

      <section className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#111827] to-[#0b1120] shadow-xl shadow-black/20">

        <div className="flex flex-col gap-4 border-b border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-2xl font-semibold">
              Prompt Template
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Copy this prompt and customize it for your use case.
            </p>
          </div>

          <button
            onClick={copyPrompt}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
              copied
                ? "bg-green-600 text-white"
                : "bg-blue-600 text-white hover:bg-blue-500"
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Clipboard className="h-4 w-4" />
                Copy Prompt
              </>
            )}
          </button>

        </div>

        <div className="p-6">

          <pre className="overflow-x-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-[#050505] p-6 text-sm leading-8 text-gray-300">
            {prompt}
          </pre>

        </div>

      </section>

    </article>
  );
}