import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-950/90 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        <Link href="/" className="text-3xl font-bold">
  <span className="text-white">Futurious</span>
  <span className="text-blue-500">.AI</span>
</Link>

        <div className="hidden md:flex items-center gap-8 text-gray-300 font-medium">

  <Link href="/tools" className="hover:text-blue-500 duration-300">
    AI Tools
  </Link>

  <Link href="/compare" className="hover:text-blue-500 duration-300">
    Compare
  </Link>

  <Link href="/prompts" className="hover:text-blue-500 duration-300">
    Prompt Library
  </Link>

  <Link href="/categories" className="hover:text-blue-500 duration-300">
    Categories
  </Link>

  <Link href="/blog" className="hover:text-blue-500 duration-300">
    Blog
  </Link>

</div>

        <button className="bg-blue-600 hover:bg-blue-700 duration-300 px-5 py-2 rounded-lg">
          Login
        </button>

      </div>
    </nav>
  );
}