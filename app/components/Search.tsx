export default function Search() {
  return (
    <section className="bg-black py-24">

      <div className="max-w-5xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-white">
          Search AI Tools
        </h2>

        <p className="text-center text-gray-400 mt-4">
          Search from 5000+ AI Tools
        </p>

        <input
          type="text"
          placeholder="🔍 Search AI tools..."
          className="mt-10 w-full bg-zinc-900 border border-zinc-700 rounded-xl px-6 py-5 text-xl text-white outline-none"
        />

        <div className="flex flex-wrap justify-center gap-4 mt-8">

          <button className="bg-zinc-800 px-5 py-2 rounded-full text-white hover:bg-blue-600 duration-300">
            ChatGPT
          </button>

          <button className="bg-zinc-800 px-5 py-2 rounded-full text-white hover:bg-blue-600 duration-300">
            Claude
          </button>

          <button className="bg-zinc-800 px-5 py-2 rounded-full text-white hover:bg-blue-600 duration-300">
            Gemini
          </button>

          <button className="bg-zinc-800 px-5 py-2 rounded-full text-white hover:bg-blue-600 duration-300">
            Canva AI
          </button>

          <button className="bg-zinc-800 px-5 py-2 rounded-full text-white hover:bg-blue-600 duration-300">
            Cursor
          </button>

        </div>

      </div>

    </section>
  );
}