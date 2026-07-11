type Props = {
  integrations: string[];
  api: boolean;
};

export default function ToolIntegrations({
  integrations,
  api,
}: Props) {
  return (
    <section className="mt-20">

      <h2 className="text-4xl font-bold mb-8">
        🔗 Integrations
      </h2>

      <div className="flex flex-wrap gap-3">

        {integrations.map((item) => (
          <span
            key={item}
            className="bg-gray-800 px-4 py-2 rounded-full"
          >
            {item}
          </span>
        ))}

      </div>

      <div className="mt-8">

        <span
          className={`px-5 py-3 rounded-full ${
            api
              ? "bg-green-700"
              : "bg-red-700"
          }`}
        >
          {api ? "✅ API Available" : "❌ No API"}
        </span>

      </div>

    </section>
  );
}