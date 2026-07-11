type Props = {
  founded: string;
  users: string;
  pricing: string;
  rating: number;
};

export default function ToolQuickInfo({
  founded,
  users,
  pricing,
  rating,
}: Props) {
  return (
    <section className="mt-14">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 text-center">
          <h3 className="text-3xl">📅</h3>

          <p className="text-gray-400 mt-3">
            Founded
          </p>

          <h4 className="text-2xl font-bold mt-2">
            {founded}
          </h4>
        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 text-center">
          <h3 className="text-3xl">👥</h3>

          <p className="text-gray-400 mt-3">
            Users
          </p>

          <h4 className="text-2xl font-bold mt-2">
            {users}
          </h4>
        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 text-center">
          <h3 className="text-3xl">💰</h3>

          <p className="text-gray-400 mt-3">
            Pricing
          </p>

          <h4 className="text-2xl font-bold mt-2">
            {pricing}
          </h4>
        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 text-center">
          <h3 className="text-3xl">⭐</h3>

          <p className="text-gray-400 mt-3">
            Rating
          </p>

          <h4 className="text-2xl font-bold mt-2">
            {rating}/5
          </h4>
        </div>

      </div>

    </section>
  );
}