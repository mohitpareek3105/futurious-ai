type Props = {
  languages: string[];
};

export default function ToolLanguages({
  languages,
}: Props) {
  return (
    <section className="mt-20">

      <h2 className="text-4xl font-bold mb-8">
        🌍 Supported Languages
      </h2>

      <div className="flex flex-wrap gap-3">

        {languages.map((lang) => (
          <span
            key={lang}
            className="bg-[#111827] border border-gray-700 px-4 py-2 rounded-full"
          >
            {lang}
          </span>
        ))}

      </div>

    </section>
  );
}