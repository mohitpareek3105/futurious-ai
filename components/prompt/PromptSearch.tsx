"use client";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function PromptSearch({
  search,
  setSearch,
}: Props) {
  return (
    <div className="mb-12">

      <input
        type="text"
        placeholder="Search prompts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-[#111827] border border-gray-800 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
      />

    </div>
  );
}