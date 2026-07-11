export default function HomeStats() {
  const stats = [
    { number: "500+", label: "AI Tools" },
    { number: "100+", label: "Categories" },
    { number: "10K+", label: "Monthly Users" },
    { number: "4.9★", label: "Average Rating" },
  ];

  return (
    <section className="py-24 bg-[#0b0b0b]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-8">

          {stats.map((item) => (
            <div
              key={item.label}
              className="text-center"
            >
              <h2 className="text-5xl font-bold text-blue-500">
                {item.number}
              </h2>

              <p className="text-gray-400 mt-3">
                {item.label}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}