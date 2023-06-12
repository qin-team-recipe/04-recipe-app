"use client";

import { useRouter } from "next/navigation";

export default function SearchInput2() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <form className="py-[8px] px-[15px] border-b-[1px] border-border">
      <div className="flex gap-x-[16px] items-center">
        <button
          onClick={handleBack}
          className="stroke-[#6F6E77] hover:stroke-primary"
        >
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
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.99999 15.8333L4.16666 9.99996L9.99999 4.16663"
              // stroke="#6F6E77"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <input
          className="bg-[#eeedef] w-full h-[40px] rounded-[12px] border-none py-[8px] px-[16px] text-[16px] font-bold"
          type="text"
          placeholder="シェフやレシピを検索"
        />
      </div>
    </form>
  );
}
