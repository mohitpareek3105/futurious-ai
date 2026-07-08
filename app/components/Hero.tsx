export default function Hero() {
  return (
    <section className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6">

      <p className="uppercase tracking-widest text-blue-500 mb-6">
        🚀 THE FUTURE OF AI STARTS HERE
      </p>

      <h1 className="text-6xl lg:text-7xl font-extrabold text-center leading-tight">
        Discover The Best
        <br />
        AI Tools &
        <span className="text-blue-500"> Prompts</span>
      </h1>

      <p className="text-gray-400 text-xl text-center max-w-4xl mt-8">
        Explore thousands of AI tools, curated prompts, and productivity resources
        to boost your work, business, and creativity.
      </p>

      <button className="mt-10 bg-blue-600 hover:bg-blue-700 hover:scale-105 duration-300 px-8 py-4 rounded-xl text-xl font-semibold">
        Explore AI Tools →
      </button>

    </section>
  );
}