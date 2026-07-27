type Props = {
  author: string;
  publishedAt: string;
  readingTime: string;
};

function formatPublishedDate(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogMeta({
  author,
  publishedAt,
  readingTime,
}: Props) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-400">
      <span className="flex items-center gap-2">
        <span aria-hidden="true">👤</span>
        {author}
      </span>

      <span className="flex items-center gap-2">
        <span aria-hidden="true">📅</span>
        {formatPublishedDate(publishedAt)}
      </span>

      <span className="flex items-center gap-2">
        <span aria-hidden="true">⏱️</span>
        {readingTime}
      </span>
    </div>
  );
}