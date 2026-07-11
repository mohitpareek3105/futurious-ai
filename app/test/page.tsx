import { supabase } from "@/lib/supabase";

export default async function TestPage() {
  const { data, error } = await supabase
    .from("tools")
    .select("*");

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-8">
        Supabase Test
      </h1>

      <pre className="bg-gray-900 p-6 rounded-xl overflow-auto">
        {JSON.stringify({ data, error }, null, 2)}
      </pre>
    </main>
  );
}