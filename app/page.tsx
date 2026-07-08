import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedTools from "./components/FeaturedTools";
import Categories from "./components/Categories";
import Search from "./components/Search";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedTools />
      <Categories />
      <Search />
    </>
  );
}