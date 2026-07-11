"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function BlogSearch({
  value,
  onChange,
}: Props) {
  return (
    <input
      type="text"
      placeholder="Search blog..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#111827] border border-gray-800 rounded-xl px-5 py-4 mb-10 outline-none focus:border-blue-500"
    />
  );
}