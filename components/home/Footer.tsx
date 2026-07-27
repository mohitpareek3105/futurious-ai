import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h2 className="text-3xl font-bold">
              Futurious
              <span className="text-blue-500">.AI</span>
            </h2>

            <p className="mt-5 leading-8 text-gray-400">
              Discover, compare, and explore the world&apos;s best AI tools
              with detailed reviews, comparisons, blogs, and prompt resources.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-bold">Explore</h3>

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

              <Link href="/about" className="block hover:text-blue-400">
                About
              </Link>

              <Link href="/contact" className="block hover:text-blue-400">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-bold">Resources</h3>

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
            <h3 className="mb-5 text-xl font-bold">Legal</h3>

            <div className="space-y-3">
              <Link href="/privacy" className="block hover:text-blue-400">
                Privacy Policy
              </Link>

              <Link href="/terms" className="block hover:text-blue-400">
                Terms &amp; Conditions
              </Link>

              <Link href="/disclaimer" className="block hover:text-blue-400">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-800 pt-8 text-center text-gray-500">
          &copy; {new Date().getFullYear()} Futurious.AI — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}