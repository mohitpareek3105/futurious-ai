const tools = [
  {
    name: "ChatGPT",
    category: "AI Assistant",
    rating: "4.9",
    price: "Free / Paid",
  },
  {
    name: "Claude",
    category: "Writing Assistant",
    rating: "4.8",
    price: "Free / Paid",
  },
  {
    name: "Gemini",
    category: "Google AI",
    rating: "4.7",
    price: "Free",
  },
  {
    name: "Midjourney",
    category: "Image Generator",
    rating: "4.9",
    price: "Paid",
  },
  {
    name: "Perplexity",
    category: "AI Search",
    rating: "4.8",
    price: "Free",
  },
  {
    name: "Runway",
    category: "Video AI",
    rating: "4.7",
    price: "Paid",
  },
];

export default function FeaturedTools() {
  return (
    <section className="bg-[#050505] py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-white text-5xl font-bold text-center">
          Featured AI Tools
        </h2>

        <p className="text-gray-400 text-center mt-4 mb-14">
          Discover the world's most popular AI tools.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {tools.map((tool) => (

            <div
              key={tool.name}
              className="bg-[#111827] rounded-2xl p-8 border border-gray-800 hover:border-blue-500 hover:-translate-y-2 transition duration-300"
            >

              <h3 className="text-white text-3xl font-bold">
                {tool.name}
              </h3>

              <p className="text-blue-400 mt-2">
                {tool.category}
              </p>

              <div className="flex justify-between mt-8 text-gray-300">

                <span>⭐ {tool.rating}</span>

                <span>{tool.price}</span>

              </div>

              <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl text-white font-semibold">
                Visit Tool
              </button>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}