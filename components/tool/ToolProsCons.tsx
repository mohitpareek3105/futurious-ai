type Props = {
  pros: string[];
  cons: string[];
};

export default function ToolProsCons({ pros, cons }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-16">

      <div className="bg-[#111827] border border-green-700 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-green-400 mb-6">
          👍 Pros
        </h2>

        <ul className="space-y-4">
          {pros.map((pro) => (
            <li key={pro} className="flex gap-3">
              <span>✅</span>
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-[#111827] border border-red-700 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-red-400 mb-6">
          👎 Cons
        </h2>

        <ul className="space-y-4">
          {cons.map((con) => (
            <li key={con} className="flex gap-3">
              <span>❌</span>
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}