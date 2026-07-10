type Props = {
  tool: {
    name: string;
    company: string;
    logo: string;
    rating: number;
    pricing: string;
    founded: string;
    users: string;
    platforms: string[];
  };
};

export default function ToolHeader({ tool }: Props) {
  return (
    <div className="bg-[#111827] rounded-3xl border border-gray-800 p-8">

      <div className="flex flex-col md:flex-row gap-8">

        <div className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center text-5xl font-bold text-black">
          {tool.name.charAt(0)}
        </div>

        <div className="flex-1">

          <h1 className="text-5xl font-bold">
            {tool.name}
          </h1>

          <p className="text-xl text-gray-400 mt-2">
            {tool.company}
          </p>

          <div className="flex flex-wrap gap-3 mt-6">

            <span className="bg-yellow-500 text-black px-4 py-2 rounded-full">
              ⭐ {tool.rating}
            </span>

            <span className="bg-green-600 px-4 py-2 rounded-full">
              {tool.pricing}
            </span>

            <span className="bg-blue-600 px-4 py-2 rounded-full">
              👥 {tool.users}
            </span>

            <span className="bg-purple-600 px-4 py-2 rounded-full">
              📅 {tool.founded}
            </span>

          </div>

          <div className="flex flex-wrap gap-2 mt-8">

            {tool.platforms.map((platform) => (
              <span
                key={platform}
                className="bg-gray-800 px-4 py-2 rounded-full"
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