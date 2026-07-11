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
  return (
    <div className="flex flex-wrap gap-3 mb-10">

      <button
        onClick={() => setSelected("All")}
        className={`px-5 py-2 rounded-full transition ${
          selected === "All"
            ? "bg-blue-600"
            : "bg-[#111827] hover:bg-gray-800"
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelected(category)}
          className={`px-5 py-2 rounded-full transition ${
            selected === category
              ? "bg-blue-600"
              : "bg-[#111827] hover:bg-gray-800"
          }`}
        >
          {category}
        </button>
      ))}

    </div>
  );
}