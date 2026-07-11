import Link from "next/link";

type Props = {
  name: string;
  slug: string;
  icon: string;
};

export default function CategoryCard({
  name,
  slug,
  icon,
}: Props) {
  return (
    <Link
      href={`/categories/${slug}`}
      className="bg-[#111827] border border-gray-800 rounded-2xl p-8 hover:border-blue-500 transition text-center block"
    >
      <div className="text-5xl mb-4">
        {icon}
      </div>

      <h2 className="text-2xl font-bold">
        {name}
      </h2>
    </Link>
  );
}