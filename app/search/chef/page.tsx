import AllChefs from "@/app/components/Chefs/AllChefs";
import SearchInput2 from "@/app/components/Parts/SearchInput2";
import SearchNav from "@/app/components/Parts/SearchNav";
import Link from "next/link";

export const metadata = {
  title: "Chefs",
  description: "Generated by create next app",
};

export default function Chefs() {
  return (
    <>
      <SearchInput2 />
      <SearchNav page="chefs" />
      <AllChefs />
    </>
  );
}