export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-950/90 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        <h1 className="text-3xl font-bold">
          <span className="text-white">Futurious</span>
          <span className="text-blue-500">.AI</span>
        </h1>

        <div className="hidden md:flex items-center gap-8 text-gray-300 font-medium">

          <a href="#" className="hover:text-blue-500 duration-300">
            AI Tools
          </a>

          <a href="#" className="hover:text-blue-500 duration-300">
            Prompt Library
          </a>

          <a href="#" className="hover:text-blue-500 duration-300">
            Categories
          </a>

          <a href="#" className="hover:text-blue-500 duration-300">
            Blog
          </a>

        </div>

        <button className="bg-blue-600 hover:bg-blue-700 duration-300 px-5 py-2 rounded-lg">
          Login
        </button>

      </div>
    </nav>
  );
}