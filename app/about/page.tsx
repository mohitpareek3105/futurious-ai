import Link from "next/link";

export const metadata = {
  title: "About Futurious.AI",
  description:
    "Learn more about Futurious.AI, our mission, and our goal of helping people discover the best AI tools.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="space-y-12">
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
            About Us
          </p>

          <h1 className="mt-4 text-5xl font-bold text-white">
            Welcome to Futurious.AI
          </h1>

          <p className="mt-8 text-lg leading-8 text-gray-300">
            Futurious.AI is an independent AI tools discovery platform built to
            help professionals, students, developers, creators, marketers and
            businesses discover the best Artificial Intelligence tools in one
            place.
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            Our mission is simple — make AI easier to discover, compare and
            understand so everyone can choose the right tools with confidence.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white">
            What We Offer
          </h2>

          <ul className="mt-6 list-disc space-y-3 pl-6 text-gray-300">
            <li>Curated AI tool directory</li>
            <li>Detailed tool reviews</li>
            <li>AI news and educational blogs</li>
            <li>Prompt library</li>
            <li>Tool comparisons</li>
            <li>Categories to explore AI faster</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white">
            Our Vision
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            We believe Artificial Intelligence should be accessible to everyone.
            Futurious.AI aims to become one of the most trusted destinations for
            discovering AI products and learning how to use them effectively.
          </p>
        </section>

        <section>
          <Link
            href="/contact"
            className="inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </main>
  );
}