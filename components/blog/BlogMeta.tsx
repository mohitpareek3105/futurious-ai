type Props = {
  author: string;
  publishedAt: string;
  readingTime: string;
};

export default function BlogMeta({
  author,
  publishedAt,
  readingTime,
}: Props) {
  return (
    <div className="flex flex-wrap gap-6 mt-6 text-gray-400">

      <span>👤 {author}</span>

      <span>📅 {publishedAt}</span>

      <span>⏱ {readingTime}</span>

    </div>
  );
}