import Hero from "@/components/Hero";
import FeaturedTools from "@/components/FeaturedTools";
import Search from "@/components/Search";

import HomeCategories from "@/components/home/HomeCategories";
import HomeStats from "@/components/home/HomeStats";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeStats />
      <Search />
      <FeaturedTools />
      <HomeCategories />
      <CTA />
    </>
  );
}