"use client";

type Props = {
  title: string;
};

export default function ShareButtons({
  title,
}: Props) {
  const copy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert("Link copied!");
  };

  return (
    <div className="mt-14">

      <h2 className="text-2xl font-bold mb-5">
        Share Article
      </h2>

      <div className="flex gap-4">

        <button
          onClick={copy}
          className="bg-blue-600 px-5 py-3 rounded-xl"
        >
          🔗 Copy Link
        </button>

      </div>

    </div>
  );
}