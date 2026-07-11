import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-gray-800">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          <div>

            <h2 className="text-3xl font-bold">
              Futurious
              <span className="text-blue-500">.AI</span>
            </h2>

            <p className="text-gray-400 mt-5 leading-8">
              Discover, compare and explore the world's best AI tools.
            </p>

          </div>

          <div>

            <h3 className="font-bold text-xl mb-5">
              Explore
            </h3>

            <div className="space-y-3">

              <Link href="/tools" className="block hover:text-blue-400">
                AI Tools
              </Link>

              <Link href="/compare" className="block hover:text-blue-400">
                Compare
              </Link>

              <Link href="/categories" className="block hover:text-blue-400">
                Categories
              </Link>

            </div>

          </div>

          <div>

            <h3 className="font-bold text-xl mb-5">
              Resources
            </h3>

            <div className="space-y-3">

              <Link href="/blog" className="block hover:text-blue-400">
                Blog
              </Link>

              <Link href="/prompts" className="block hover:text-blue-400">
                Prompt Library
              </Link>

            </div>

          </div>

          <div>

            <h3 className="font-bold text-xl mb-5">
              Legal
            </h3>

            <div className="space-y-3">

              <a href="#" className="block hover:text-blue-400">
                Privacy Policy
              </a>

              <a href="#" className="block hover:text-blue-400">
                Terms & Conditions
              </a>

            </div>

          </div>

        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500">

          © 2026 Futurious.AI — All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}