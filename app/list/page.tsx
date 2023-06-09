"use client";
import Link from "next/link";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import "./styles.css";

// use clientとmetadata併記するとエラーになる、、
// export const metadata = {
//   title: "List",
//   description: "Generated by create next app",
// };

// この辺はトグルの挙動確認用なのであとで消して頂いてOKです

const myMemoArray = [
  { item: "マカロニ", checked: false },
  { item: "ベーコン", checked: false },
  { item: "玉ねぎ", checked: false },
];

const curryArray = [
  { item: "にんじん", checked: false },
  { item: "牛すじ", checked: false },
  { item: "カレー粉", checked: false },
];

const gratinArray = [
  { item: "にんじん", checked: false },
  { item: "牛すじ", checked: false },
  { item: "カレー粉", checked: false },
];

export default function List() {
  // この辺はトグルの挙動確認用なのであとで消して頂いてOKです
  const [myMemo, setMyMeo] = useState(myMemoArray);
  const [curry, setCurry] = useState(curryArray);
  const [gratin, setGratin] = useState(gratinArray);

  const toggleMyMemoChecked = (index: number) => {
    const newMyMemo = [...myMemoArray];
    newMyMemo[index].checked = !newMyMemo[index].checked;
    setMyMeo(newMyMemo);
  };

  const toggleCurryChecked = (index: number) => {
    const newCurry = [...curryArray];
    newCurry[index].checked = !newCurry[index].checked;
    setCurry(newCurry);
  };

  const toggleGratinChecked = (index: number) => {
    const newGratin = [...gratinArray];
    newGratin[index].checked = !newGratin[index].checked;
    setGratin(newGratin);
  };

  return (
    <>
      <DropdownMenu.Root>
        {/* ヘッダー */}
        <div className="px-[15px] border-b-[1px] border-border text-center text-title font-bold text-[20px] py-[12px] ">
          <h1>買い物リスト</h1>
        </div>

        {/* じぶんメモ */}
        <section className=" pt-[8px] pb-[24px] ">
          <div className="flex justify-between py-[12px] items-center px-[16px] border-border border-b-[1px]">
            <h2 className="font-bold text-title text-[16px]">じぶんメモ</h2>
            <button
              onClick={() => {
                window.alert("じぶんメモ追加");
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 4.16666V15.8333"
                  stroke="#6F6E77"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.16675 10H15.8334"
                  stroke="#6F6E77"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <ul className="bg-white">
            {myMemoArray.map((memo, index) => (
              <li
                key={index}
                className="relative py-[15.5px] pl-[48px] pr-[16px] text-[14px] border-border border-b-[1px] leading-[18px]"
              >
                <input
                  type="checkbox"
                  className={`
               appearance-none absolute w-[20px] h-[20px] top-1/2 -translate-y-1/2 left-[16px] 
              ${
                memo.checked
                  ? "after:content-[''] after:absolute after:w-[20px] after:h-[20px] bg-[url('/images/checked.png')]"
                  : "before:content-[''] cursor-pointer before:absolute before:w-[20px] before:h-[20px] before:border-primary before:border-[1.5px] before:rounded-full"
              }
              `}
                  onChange={() => toggleMyMemoChecked(index)}
                  checked={memo.checked}
                ></input>
                <label className="text-title">{memo.item}</label>
                <button
                  className="absolute top-1/2 -translate-y-1/2 right-[16px] text-primary"
                  onClick={() => {
                    window.alert("じぶんメモ削除");
                  }}
                >
                  削除
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* レシピ別 */}

        <section className=" pt-[8px] pb-[24px]">
          <div className="flex justify-between py-[12px] items-center px-[16px] border-border border-b-[1px]">
            <h2 className="font-bold text-title text-[16px]">カレー</h2>
            <DropdownMenu.Trigger>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_450_2165)">
                  <path
                    d="M9.16675 10C9.16675 10.221 9.25455 10.433 9.41083 10.5893C9.56711 10.7455 9.77907 10.8333 10.0001 10.8333C10.2211 10.8333 10.4331 10.7455 10.5893 10.5893C10.7456 10.433 10.8334 10.221 10.8334 10C10.8334 9.77899 10.7456 9.56703 10.5893 9.41075C10.4331 9.25447 10.2211 9.16667 10.0001 9.16667C9.77907 9.16667 9.56711 9.25447 9.41083 9.41075C9.25455 9.56703 9.16675 9.77899 9.16675 10Z"
                    stroke="#6F6E77"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.16675 15.8333C9.16675 16.0543 9.25455 16.2663 9.41083 16.4226C9.56711 16.5789 9.77907 16.6667 10.0001 16.6667C10.2211 16.6667 10.4331 16.5789 10.5893 16.4226C10.7456 16.2663 10.8334 16.0543 10.8334 15.8333C10.8334 15.6123 10.7456 15.4004 10.5893 15.2441C10.4331 15.0878 10.2211 15 10.0001 15C9.77907 15 9.56711 15.0878 9.41083 15.2441C9.25455 15.4004 9.16675 15.6123 9.16675 15.8333Z"
                    stroke="#6F6E77"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.16675 4.16666C9.16675 4.38768 9.25455 4.59964 9.41083 4.75592C9.56711 4.9122 9.77907 4.99999 10.0001 4.99999C10.2211 4.99999 10.4331 4.9122 10.5893 4.75592C10.7456 4.59964 10.8334 4.38768 10.8334 4.16666C10.8334 3.94565 10.7456 3.73369 10.5893 3.57741C10.4331 3.42113 10.2211 3.33333 10.0001 3.33333C9.77907 3.33333 9.56711 3.42113 9.41083 3.57741C9.25455 3.73369 9.16675 3.94565 9.16675 4.16666Z"
                    stroke="#6F6E77"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_450_2165">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </DropdownMenu.Trigger>
          </div>

          <ul className="bg-white">
            {curryArray.map((curry, index) => (
              <li
                key={index}
                className="relative py-[15.5px] pl-[48px] pr-[16px] text-[14px] border-border border-b-[1px] leading-[18px]"
              >
                <input
                  type="checkbox"
                  className={`
               appearance-none absolute w-[20px] h-[20px] top-1/2 -translate-y-1/2 left-[16px] 
              ${
                curry.checked
                  ? "after:content-[''] after:absolute after:w-[20px] after:h-[20px] bg-[url('/images/checked.png')]"
                  : "before:content-[''] cursor-pointer before:absolute before:w-[20px] before:h-[20px] before:border-primary before:border-[1.5px] before:rounded-full"
              }
              `}
                  onChange={() => toggleCurryChecked(index)}
                  checked={curry.checked}
                ></input>
                <label className="text-title">{curry.item}</label>
              </li>
            ))}
          </ul>

          <DropdownMenu.Portal>
            <DropdownMenu.Content sideOffset={5} align="end" className="DropdownMenuContent">
              <ul>
                <li>
                  <Link
                    className="py-[6px] pr-[12px] pl-[34px] block text-title hover:bg-backgroundGray relative"
                    href="/recipe/1/steps"
                  >
                    <svg
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-1/2 -translate-y-1/2 left-[12px]"
                    >
                      <path
                        d="M3 2.75H9L8.25 9.5H3.75L3 2.75Z"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.25 14H6.75V16.25H5.25V14Z"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.9999 2.75V11.75H11.2499C11.2327 8.98925 11.3879 6.1955 14.9999 2.75Z"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M15 11.75V16.25H14.25V14" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 9.5V14" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    レシピ詳細をみる
                  </Link>
                </li>
                <li>
                  <button className="py-[6px] pr-[12px] pl-[34px] text-title block hover:bg-backgroundGray relative w-full text-left">
                    <svg
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-1/2 -translate-y-1/2 left-[12px]"
                    >
                      <path
                        d="M4.5 11.75L9 7.25L13.5 11.75"
                        stroke="#1A1523"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    上に移動する
                  </button>
                </li>
                <li>
                  <button className="py-[6px] pr-[12px] pl-[34px] text-title block hover:bg-backgroundGray relative w-full text-left">
                    <svg
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-1/2 -translate-y-1/2 left-[12px]"
                    >
                      <path
                        d="M4.5 7.25L9 11.75L13.5 7.25"
                        stroke="#1A1523"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    下に移動する
                  </button>
                </li>
                <li>
                  <button className="py-[6px] pr-[12px] pl-[34px] text-title block hover:bg-backgroundGray relative w-full text-left">
                    <svg
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-1/2 -translate-y-1/2 left-[12px]"
                    >
                      <path d="M9 4.25V14.75" stroke="#1A1523" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3.75 9.5H14.25" stroke="#1A1523" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    買うものを追加する
                  </button>
                </li>
                <li>
                  <button className="py-[6px] pr-[12px] pl-[34px] text-primary block hover:bg-backgroundGray relative w-full text-left">
                    <svg
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-1/2 -translate-y-1/2 left-[12px]"
                    >
                      <path
                        d="M3 14.75C3 15.1478 3.15804 15.5294 3.43934 15.8107C3.72064 16.092 4.10218 16.25 4.5 16.25C4.89782 16.25 5.27936 16.092 5.56066 15.8107C5.84197 15.5294 6 15.1478 6 14.75C6 14.3522 5.84197 13.9706 5.56066 13.6893C5.27936 13.408 4.89782 13.25 4.5 13.25C4.10218 13.25 3.72064 13.408 3.43934 13.6893C3.15804 13.9706 3 14.3522 3 14.75Z"
                        stroke="#E54D2E"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.25 14.75C11.25 15.1478 11.408 15.5294 11.6893 15.8107C11.9706 16.092 12.3522 16.25 12.75 16.25C13.1478 16.25 13.5294 16.092 13.8107 15.8107C14.092 15.5294 14.25 15.1478 14.25 14.75C14.25 14.3522 14.092 13.9706 13.8107 13.6893C13.5294 13.408 13.1478 13.25 12.75 13.25C12.3522 13.25 11.9706 13.408 11.6893 13.6893C11.408 13.9706 11.25 14.3522 11.25 14.75Z"
                        stroke="#E54D2E"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M12.75 13.25H4.5V2.75H3" stroke="#E54D2E" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M4.5 4.25L10.5 4.67825M14.5725 8.00075L14.2508 10.2508H4.50075"
                        stroke="#E54D2E"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M12.75 2.75L15.75 5.75" stroke="#E54D2E" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M15.75 2.75L12.75 5.75" stroke="#E54D2E" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    リストから削除
                  </button>
                </li>
              </ul>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </section>
      </DropdownMenu.Root>
    </>
  );
}
