type Props = {
  useCases: string[];
};

export default function ToolUseCases({
  useCases,
}: Props) {
  return (
    <section className="mt-20">

      <h2 className="text-4xl font-bold mb-8">
        🎯 Best Use Cases
      </h2>

      <div className="flex flex-wrap gap-4">

        {useCases.map((item) => (
          <span
            key={item}
            className="bg-blue-900/40 border border-blue-700 px-5 py-3 rounded-full"
          >
            {item}
          </span>
        ))}

      </div>

    </section>
  );
}