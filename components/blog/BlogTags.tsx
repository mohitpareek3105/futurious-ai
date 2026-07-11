type Props = {
  tags: string[];
};

export default function BlogTags({
  tags,
}: Props) {
  return (
    <div className="mt-12">

      <h2 className="text-2xl font-bold mb-5">
        Tags
      </h2>

      <div className="flex flex-wrap gap-3">

        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-900/40 border border-blue-600 px-4 py-2 rounded-full"
          >
            {tag}
          </span>
        ))}

      </div>

    </div>
  );
}