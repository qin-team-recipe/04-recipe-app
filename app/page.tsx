import SearchInput1 from "./components/Parts/SearchInput1";
import Chefs from "./components/Top/Chefs";
import TopChefs from "./components/Top/TopChefs";
import TopRecipes from "./components/Top/TopRecipes";

export default function Home() {
  return (
    <>
      <SearchInput1 />
      <TopChefs />
      <TopRecipes />
      <Chefs />
    </>
  );
}
