const categories = [
  "💬 Chatbots",
  "🎨 Image AI",
  "🎥 Video AI",
  "✍️ Writing",
  "💻 Coding",
  "🎵 Music",
  "📊 Productivity",
  "📈 Marketing",
  "🎓 Education",
  "🤖 Automation",
  "🎤 Voice AI",
  "🔍 Search",
];

export default function Categories() {
  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-white text-center">
          Browse Categories
        </h2>

        <p className="text-center text-gray-400 mt-4 mb-14">
          Find AI tools by category.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {categories.map((category) => (

            <div
              key={category}
              className="bg-[#111827] rounded-xl p-8 text-center
              border border-gray-800
              hover:bg-blue-600
              hover:border-blue-600
              transition-all
              duration-300
              cursor-pointer"
            >

              <h3 className="text-white text-xl font-semibold">
                {category}
              </h3>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}