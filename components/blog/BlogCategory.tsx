"use client";

type Props = {
  categories: string[];
  selected: string;
  onSelect: (value: string) => void;
};

export default function BlogCategory({
  categories,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3 mb-10">

      <button
        onClick={() => onSelect("All")}
        className={`px-4 py-2 rounded-full ${
          selected === "All"
            ? "bg-blue-600"
            : "bg-[#111827]"
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 rounded-full ${
            selected === category
              ? "bg-blue-600"
              : "bg-[#111827]"
          }`}
        >
          {category}
        </button>
      ))}

    </div>
  );
}