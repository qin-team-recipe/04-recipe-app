import Image from "next/image";

export default function SearchInput1() {
  return (
    <form className="py-[8px] px-[15px] border-b-[1px] border-border">
      <div className="relative">
        <input
          className="bg-[#eeedef] w-full h-[40px] rounded-[12px] border-none py-[8px] pl-[53px] pr-[16px] text-[16px] text-title placeholder:font-bold placeholder:text-DEFAULT"
          type="text"
          placeholder="シェフやレシピを検索"
        />
        <span className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[20px] h-[20px]">
          <Image src="/images/SearchIcon.png" alt="search icon" fill />
        </span>
      </div>
    </form>
  );
}
