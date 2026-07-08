import { aiTools } from "@/data/ai-tools";

export default function FeaturedTools() {
  return (
    <section className="bg-[#050505] py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center text-white">
          Featured AI Tools
        </h2>

        <p className="text-gray-400 text-center mt-4 mb-14">
          Discover the world's best AI tools.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {aiTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex justify-between items-center">

                <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                  {tool.category}
                </span>

                <span className="text-yellow-400 font-semibold">
                  ⭐ {tool.rating}
                </span>

              </div>

              <h3 className="text-white text-3xl font-bold mt-6">
                {tool.name}
              </h3>

              <p className="text-gray-500 mt-2">
                {tool.company}
              </p>

              <p className="text-gray-400 mt-5">
                {tool.description}
              </p>

              <div className="flex justify-between items-center mt-8">

                <span className="text-green-400 font-semibold">
                  {tool.pricing}
                </span>

                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white transition"
                >
                  Visit →
                </a>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}