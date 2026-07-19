"use client";

type Props = {
  categories: string[];
  selected: string;
  setSelected: (value: string) => void;
};

export default function PromptCategory({
  categories,
  selected,
  setSelected,
}: Props) {
  const allCategories = ["All", ...categories];

  return (
    <div
      className="my-8 flex flex-wrap justify-center gap-3"
      aria-label="Prompt categories"
    >
      {allCategories.map((category) => {
        const isSelected = selected === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => setSelected(category)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
              isSelected
                ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "border-white/10 bg-white/5 text-gray-300 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-white"
            }`}
            aria-pressed={isSelected}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}