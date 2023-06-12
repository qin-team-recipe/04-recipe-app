import AllChefs from "../components/Chefs/AllChefs";
import SideBar from "../components/NavBar/SideBar";
import SearchInput2 from "../components/Parts/SearchInput2";

export const metadata = {
  title: "Chefs",
  description: "Generated by create next app",
};

export default function Chefs() {
  return (
    <main className=" pb-[58px] md:pb-[8px] md:max-w-[390px] md:mx-auto md:w-[390px] md:h-auto md:border-x-border md:border-x-[1px] md:relative">
      <SearchInput2 />
      <AllChefs />
      <SideBar />
    </main>
  );
}
