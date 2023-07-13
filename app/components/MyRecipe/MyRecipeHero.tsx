"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
  page: string;
  recipe: {
    id: string;
    name: string;
    description: string;
    _count: {
      favorites: number;
    };
  };
};

const MyRecipeHero: FC<Props> = ({ page, recipe }) => {
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

        <Link href="/mypage" className="stroke-white hover:stroke-primary absolute top-[20px] left-[20px]">
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
        <h1 className="font-bold text-title text-[27px]">{recipe.name}</h1>
        <p className="mt-[16px] text-title text-[16px] leading-snug ">{recipe.description}</p>
        <div className="flex gap-x-[16px] text-title pt-[14.17px] text-[16px] leading-snug items-center">
          <div className="text-primary bg-white px-[12px] py-[4px] text-[14px] rounded-[4px] inline-block border-[1px] border-primary">
            公開中のマイレシピ
          </div>
          <p>
            <span className="font-bold">{recipe._count.favorites}</span> お気に入り
          </p>
        </div>
      </div>

      {/* ナビゲーション */}
      <nav className="border-b-[1px] border-border">
        <ul className="flex text-title">
          <li className={`w-1/2 text-center text-[16px]  ${page === "steps" ? "font-bold border-b-2" : ""}`}>
            <Link href={`/my-recipe/${recipe.id}/steps`} className="block py-[10px]">
              作り方
            </Link>
          </li>
          <li className={`w-1/2 text-center text-[16px]  ${page === "ingredients" ? "font-bold border-b-2" : ""}`}>
            <Link href={`/my-recipe/${recipe.id}/ingredients`} className="block py-[10px]">
              材料
            </Link>
          </li>
          <li className={`w-1/2 text-center text-[16px]  ${page === "links" ? "font-bold border-b-2" : ""}`}>
            <Link href={`/my-recipe/${recipe.id}/links`} className="block py-[10px]">
              リンク
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MyRecipeHero;
