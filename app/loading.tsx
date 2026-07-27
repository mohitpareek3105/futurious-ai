export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505]">
      <div className="flex flex-col items-center gap-6">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500" />

        <div className="text-center">
          <h2 className="text-xl font-semibold text-white">
            Loading Futurious.AI
          </h2>

          <p className="mt-2 text-gray-400">
            Please wait...
          </p>
        </div>
      </div>
    </main>
  );
}