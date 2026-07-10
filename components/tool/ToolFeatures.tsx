type Props = {
  features: string[];
};

export default function ToolFeatures({ features }: Props) {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8 mt-10">
      <h2 className="text-3xl font-bold mb-8">
        ✨ Features
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((feature) => (
          <div
            key={feature}
            className="bg-gray-800 rounded-xl px-4 py-3 text-center hover:bg-blue-600 transition"
          >
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}