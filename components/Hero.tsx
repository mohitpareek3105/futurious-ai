import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-white">
      <p className="mb-6 uppercase tracking-widest text-blue-500">
        THE FUTURE OF AI STARTS HERE
      </p>

      <h1 className="text-center text-6xl font-extrabold leading-tight lg:text-7xl">
        Discover The Best
        <br />
        AI Tools &amp;
        <span className="text-blue-500"> Prompts</span>
      </h1>

      <p className="mt-8 max-w-4xl text-center text-xl text-gray-400">
        Explore thousands of AI tools, curated prompts, and productivity
        resources to boost your work, business, and creativity.
      </p>

      <Link
        href="/tools"
        className="mt-10 rounded-xl bg-blue-600 px-8 py-4 text-xl font-semibold transition duration-300 hover:scale-105 hover:bg-blue-700"
      >
        Explore AI Tools
      </Link>
    </section>
  );
}