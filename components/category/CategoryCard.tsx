import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

type Props = {
  name: string;
  slug: string;
  icon: LucideIcon;
};

export default function CategoryCard({
  name,
  slug,
  icon: Icon,
}: Props) {
  return (
    <Link
      href={`/categories/${slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#111827] to-[#0b1120] p-7 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1.5 hover:border-blue-500/50 hover:shadow-blue-950/30"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition duration-300 group-hover:bg-blue-500/20"
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-300 transition duration-300 group-hover:scale-105 group-hover:border-blue-400/40 group-hover:bg-blue-500/15 group-hover:text-blue-200">
          <Icon className="h-7 w-7" strokeWidth={1.8} />
        </div>

        <ArrowUpRight className="h-5 w-5 text-gray-600 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-300" />
      </div>

      <div className="relative mt-8">
        <h2 className="text-xl font-semibold tracking-tight text-white">
          {name}
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-400">
          Explore top AI tools for {name.toLowerCase()}.
        </p>
      </div>

      <div className="relative mt-auto pt-7">
        <span className="inline-flex items-center text-sm font-semibold text-blue-400 transition group-hover:text-blue-300">
          Explore category
        </span>
      </div>
    </Link>
  );
}