export default function Newsletter() {
  return (
    <section className="mt-28">

      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-3xl p-12 text-center">

        <h2 className="text-5xl font-bold">
          Stay Updated
        </h2>

        <p className="text-gray-200 mt-6 max-w-2xl mx-auto text-lg">
          Get the latest AI tools, news, prompts and updates directly
          in your inbox.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">

          <input
            type="email"
            placeholder="Enter your email"
            className="bg-white text-black rounded-xl px-6 py-4 w-full md:w-[420px] outline-none"
          />

          <button className="bg-black hover:bg-gray-900 px-8 py-4 rounded-xl font-semibold transition">
            Subscribe
          </button>

        </div>

      </div>

    </section>
  );
}