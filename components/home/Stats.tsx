export default function Stats() {
  const stats = [
    {
      value: "5000+",
      label: "AI Tools",
    },
    {
      value: "250+",
      label: "Categories",
    },
    {
      value: "2M+",
      label: "Monthly Users",
    },
    {
      value: "10K+",
      label: "Reviews",
    },
  ];

  return (
    <section className="mt-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {stats.map((item) => (
          <div
            key={item.label}
            className="bg-[#111827] border border-gray-800 rounded-2xl p-8 text-center hover:border-blue-500 transition"
          >
            <h3 className="text-4xl font-bold text-blue-500">
              {item.value}
            </h3>

            <p className="text-gray-400 mt-3">
              {item.label}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}