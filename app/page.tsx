import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";

import Search from "@/components/Search";
import FeaturedTools from "@/components/FeaturedTools";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">

      <div className="max-w-7xl mx-auto px-6">

        <Hero />

        <Stats />

        <Search />

        <FeaturedTools />

      </div>

    </main>
  );
}