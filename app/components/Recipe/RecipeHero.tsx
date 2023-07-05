"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
  page: string;
};

const RecipeHero: FC<Props> = ({ page }) => {
  return (
    <>
      {/* Hero */}
      <div className="relative">
        <Image
          src="/images/RecipeImage.png"
          alt="Picture of the recipe"
          width={390}
          height={390}
          style={{ width: "100%", height: "auto" }}
        />

        <Link href="/" className="stroke-white hover:stroke-primary absolute top-[20px] left-[20px]">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M25.3333 16H6.66666"
              // stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 25.3333L6.66666 16L16 6.66666"
              // stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      {/* Recipe詳細 */}
      <div className="px-[16px] pt-[16px] pb-[18.17px]">
        <h1 className="font-bold text-title text-[27px]">グラタン</h1>
        <p className="mt-[16px] text-title text-[16px] leading-snug ">
          はじめてでも失敗なく作れるような、鶏肉や玉ねぎを具とした基本的なマカロニグラタンのレシピです。
          <br></br>
          ソースと具材炒めを別器具で行うレシピも多いですが、グラタンの具を炒めたフライパンの中で、そのままホワイトソースを仕上げる手軽な作り方にしています。ぜひお試しください。
        </p>
        <div className="flex gap-x-[16px] text-title pt-[14.17px] text-[16px] leading-snug">
          <Link href="/chef/1/recipes">しまぶーシェフ</Link>
          <p>
            <span className="font-bold">456</span> お気に入り
          </p>
        </div>
        <button
          onClick={() => {
            window.alert("お気に入りに追加！");
          }}
          className="mt-[16px] bg-primary text-white px-[12px] py-[4px] text-[14px] rounded-[4px]"
        >
          お気に入りに追加
        </button>
      </div>

      {/* ナビゲーション */}
      <nav className="border-b-[1px] border-border">
        <ul className="flex text-title">
          <li className={`w-1/2 text-center text-[16px]  ${page === "steps" ? "font-bold border-b-2" : ""}`}>
            <Link href="/recipe/1/steps" className="block py-[10px]">
              作り方
            </Link>
          </li>
          <li className={`w-1/2 text-center text-[16px]  ${page === "ingredients" ? "font-bold border-b-2" : ""}`}>
            <Link href="/recipe/1/ingredients" className="block py-[10px]">
              材料
            </Link>
          </li>
          <li className={`w-1/2 text-center text-[16px]  ${page === "links" ? "font-bold border-b-2" : ""}`}>
            <Link href="/recipe/1/links" className="block py-[10px]">
              リンク
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default RecipeHero;
