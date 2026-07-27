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
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-gray-800 bg-[#111827] p-8 text-center transition hover:border-blue-500"
          >
            <h3 className="text-4xl font-bold text-blue-500">
              {item.value}
            </h3>

            <p className="mt-3 text-gray-400">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}