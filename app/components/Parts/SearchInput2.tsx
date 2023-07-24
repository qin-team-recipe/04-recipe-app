"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SearchInput2({
  searchParams,
  page,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  page: "chef" | "recipe";
}) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(searchParams.q || "");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const value = event.target.value;
    setInputValue(value);
    setLoading(true);

    const newTimeoutId = setTimeout(() => {
      // console.log('入力値の変更が止まりました:', value);
      setLoading(false);
      // console.log(value);

      if (!value) {
        router.push(`/search/${page}`);
      } else {
        router.push(`/search/${page}?q=${value}`);
      }
    }, 1000);

    setTimeoutId(newTimeoutId);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search/${page}?q=${inputValue}`);
  };

  const handleClear = () => {
    setInputValue("");
    router.push(`/search/${page}`);
  };

  return (
    <div className="py-[8px] px-[15px]">
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

        <form className="relative w-full" onSubmit={handleSubmit}>
          <input
            className="bg-[#eeedef] w-full h-[40px] rounded-[12px] border-none py-[8px] pr-[16px] pl-[53px] text-[16px] text-title placeholder:font-bold focus:outline-text"
            type="text"
            placeholder="シェフやレシピを検索"
            value={inputValue}
            onChange={handleInputChange}
          />
          <span className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[20px] h-[20px]">
            <Image src="/images/SearchIcon.png" alt="search icon" fill />
          </span>

          {inputValue && loading && (
            // ローディングボタン
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

          {inputValue && !loading && (
            // クリアボタン
            <button className="absolute top-1/2 right-[16px] -translate-y-1/2" onClick={handleClear}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_5580_3032)">
                  <path d="M15 5L5 15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 5L15 15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_5580_3032">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
