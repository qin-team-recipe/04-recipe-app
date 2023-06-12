import SideBar from "./components/NavBar/SideBar";
import Top from "./components/Top/Top";

export default function Home() {
  return (
    <main className="pb-[58px] md:pb-[8px] md:max-w-[480px] md:mx-auto md:w-[480px] md:h-auto md:border-x-border md:border-x-[1px] md:relative">
      <Top />
      <SideBar />
    </main>
  );
}
