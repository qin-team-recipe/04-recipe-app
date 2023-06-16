import Link from "next/link";

export default function SearchInput2() {
  return (
    <form className="py-[8px] px-[15px] ">
      <div className="flex gap-x-[16px] items-center">
        <Link href="/" className="stroke-[#6F6E77] hover:stroke-primary">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current"
          >
            <path
              d="M15.8333 10H4.16666"
              // stroke="#6F6E77"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.99999 15.8333L4.16666 9.99996L9.99999 4.16663"
              // stroke="#6F6E77"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        <input
          className="bg-[#eeedef] w-full h-[40px] rounded-[12px] border-none py-[8px] px-[16px] text-[16px] font-bold"
          type="text"
          placeholder="シェフやレシピを検索"
        />
      </div>
    </form>
  );
}
