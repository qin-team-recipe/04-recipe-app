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
        <button className="absolute -bottom-[2px] right-[18px]">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="30" fill="#E54D2E" />
            <path
              d="M42.63 20.87C41.8775 20.1149 40.9833 19.5157 39.9987 19.1069C39.0142 18.6981 37.9586 18.4876 36.8925 18.4876C35.8264 18.4876 34.7708 18.6981 33.7863 19.1069C32.8017 19.5157 31.9075 20.1149 31.155 20.87L30 22.04L28.845 20.87C28.0925 20.1149 27.1983 19.5157 26.2137 19.1069C25.2292 18.6981 24.1736 18.4876 23.1075 18.4876C22.0414 18.4876 20.9858 18.6981 20.0013 19.1069C19.0167 19.5157 18.1225 20.1149 17.37 20.87C14.19 24.05 13.995 29.42 18 33.5L30 45.5L42 33.5C46.005 29.42 45.81 24.05 42.63 20.87Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Recipe詳細 */}
      <div className="px-[16px] pt-[16px] pb-[18.17px]">
        <h1 className="font-bold text-title text-[27px]">グラタン</h1>
        <p className="mt-[16px] text-title text-[16px] leading-snug ">
          はじめてでも失敗なく作れるような、鶏肉や玉ねぎを具とした基本的なマカロニグラタンのレシピです。
          <br></br>
          ソースと具材炒めを別器具で行うレシピも多いですが、グラタンの具を炒めたフライパンの中で、そのままホワイトソースを仕上げる手軽な作り方にしています。ぜひお試しください。
        </p>
        <p className="pt-[14.17px] text-[16px] leading-snug">
          <span className="text-title font-bold">456</span> お気に入り
        </p>
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
        </ul>
      </nav>
    </>
  );
};

export default RecipeHero;
