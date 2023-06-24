"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchInput1() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const value = event.target.value;
    setInputValue(value);

    const newTimeoutId = setTimeout(() => {
      // console.log('入力値の変更が止まりました:', value);
      router.push(`/search/recipe?q=${value}`);
    }, 1000);

    setTimeoutId(newTimeoutId);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = inputValue;
    router.push(`/search/recipe?q=${value}`);
  };

  return (
    <form className="py-[8px] px-[15px] border-b-[1px] border-border" onSubmit={handleSubmit}>
      <div className="relative">
        <input
          className="bg-[#eeedef] w-full h-[40px] rounded-[12px] border-none py-[8px] pl-[53px] pr-[16px] text-[16px] text-title placeholder:font-bold placeholder:text-text focus:outline-text"
          type="text"
          placeholder="シェフやレシピを検索"
          value={inputValue}
          onChange={handleInputChange}
        />
        <span className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[20px] h-[20px]">
          <Image src="/images/SearchIcon.png" alt="search icon" fill />
        </span>
        {inputValue && (
          <span>
            <svg
              aria-hidden="true"
              className="w-[20px] h-[20px] animate-spin  absolute right-[16px] top-[10px] fill-[#eeedef] text-text"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
                // fill="#eeedef"
              />
            </svg>
          </span>
        )}
      </div>
    </form>
  );
}
