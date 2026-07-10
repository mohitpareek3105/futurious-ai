import Link from "next/link";

export default function Hero() {
  return (
    <section className="text-center py-24">

      <span className="inline-block bg-blue-900/40 border border-blue-700 text-blue-300 px-5 py-2 rounded-full text-sm">
        🚀 Discover the Best AI Tools
      </span>

      <h1 className="text-6xl md:text-7xl font-extrabold mt-8 leading-tight">
        Find the Perfect
        <br />

        <span className="text-blue-500">
          AI Tool
        </span>

        {" "}for Every Task
      </h1>

      <p className="text-gray-400 text-xl max-w-3xl mx-auto mt-8 leading-9">
        Explore thousands of AI tools for writing, coding,
        image generation, productivity, marketing,
        research, automation and much more.
      </p>

      <div className="flex justify-center gap-5 mt-12 flex-wrap">

        <Link
          href="/tools"
          className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition"
        >
          Explore AI Tools →
        </Link>

        <Link
          href="/compare"
          className="border border-gray-700 hover:border-blue-500 px-8 py-4 rounded-xl transition"
        >
          Compare Tools
        </Link>

      </div>

    </section>
  );
}