import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-28">

      <div className="max-w-5xl mx-auto text-center px-6">

        <h2 className="text-5xl font-bold">
          Discover the Best AI Tools
        </h2>

        <p className="text-gray-400 mt-6 text-xl">
          Compare, review and explore hundreds of AI tools in one place.
        </p>

        <Link
          href="/tools"
          className="inline-block mt-10 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl"
        >
          Explore AI Tools
        </Link>

      </div>

    </section>
  );
}