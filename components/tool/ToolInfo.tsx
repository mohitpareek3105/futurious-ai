type Props = {
  founded: string;
  users: string;
  platforms: string[];
};

export default function ToolInfo({
  founded,
  users,
  platforms,
}: Props) {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8 mt-16">

      <h2 className="text-3xl font-bold mb-8">
        📊 Tool Information
      </h2>

      <div className="space-y-6">

        <div className="flex justify-between border-b border-gray-800 pb-4">
          <span className="text-gray-400">
            Founded
          </span>

          <span className="font-semibold">
            {founded}
          </span>
        </div>

        <div className="flex justify-between border-b border-gray-800 pb-4">
          <span className="text-gray-400">
            Users
          </span>

          <span className="font-semibold">
            {users}
          </span>
        </div>

        <div>

          <p className="text-gray-400 mb-3">
            Platforms
          </p>

          <div className="flex flex-wrap gap-2">

            {platforms.map((platform) => (
              <span
                key={platform}
                className="bg-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {platform}
              </span>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}