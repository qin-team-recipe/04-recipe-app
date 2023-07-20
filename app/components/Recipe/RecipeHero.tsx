"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import "./styles.css";
import { FavoriteButton } from "./FavoriteButton";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {
  page: string;
  recipe: {
    id: string;
    name: string;
    description: string;
    _count: {
      favorites: number;
    };
    primaryImageUrl: string | null;
    chef: { id: string; displayName: string } | undefined;
    isFavoriting: boolean;
  };
};

const RecipeHero: FC<Props> = ({ page, recipe }) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      {/* Hero */}
      <div className="relative">
        <Image
          src={recipe.primaryImageUrl ?? "/images/RecipeImage.png"}
          alt="Picture of the recipe"
          width={390}
          height={390}
          style={{ width: "100%" }}
          className="max-h-[480px] object-cover"
          priority={true}
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
        <div className="flex justify-between items-start">
          <h1 className="font-bold text-title text-[27px]">{recipe.name}</h1>
          {/* Links */}
          <div className="flex items-center justify-between gap-x-[12px] ">
            <Link href="https://youtube.com" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 9C3 7.93913 3.42143 6.92172 4.17157 6.17157C4.92172 5.42143 5.93913 5 7 5H17C18.0609 5 19.0783 5.42143 19.8284 6.17157C20.5786 6.92172 21 7.93913 21 9V15C21 16.0609 20.5786 17.0783 19.8284 17.8284C19.0783 18.5786 18.0609 19 17 19H7C5.93913 19 4.92172 18.5786 4.17157 17.8284C3.42143 17.0783 3 16.0609 3 15V9Z"
                  stroke="#1A1523"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 9L15 12L10 15V9Z"
                  stroke="#1A1523"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link href="https://youtube.com" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16.5 7.5V7.51M4 8C4 6.93913 4.42143 5.92172 5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4H16C17.0609 4 18.0783 4.42143 18.8284 5.17157C19.5786 5.92172 20 6.93913 20 8V16C20 17.0609 19.5786 18.0783 18.8284 18.8284C18.0783 19.5786 17.0609 20 16 20H8C6.93913 20 5.92172 19.5786 5.17157 18.8284C4.42143 18.0783 4 17.0609 4 16V8ZM9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12Z"
                  stroke="#1A1523"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            {/* <Link href="https://youtube.com" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 12V12.01M12 12V12.01M16 12V12.01M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z"
                  stroke="#1A1523"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link> */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 12V12.01M12 12V12.01M16 12V12.01M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z"
                    stroke="#1A1523"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content sideOffset={5} align="end" className="DropdownMenuContent w-[260px]">
                  <ul>
                    <li>
                      <Link
                        className="py-[6px] pr-[12px] pl-[34px] block hover:bg-backgroundGray relative"
                        href="/recipe/1/steps"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                          className="absolute top-1/2 -translate-y-1/2 left-[12px]"
                        >
                          <path
                            d="M14 5.778V8.46733C12.7907 8.34736 11.6376 7.89743 10.6667 7.16667V10.1667C10.6665 10.9808 10.437 11.7783 10.0045 12.468C9.57194 13.1577 8.95388 13.7116 8.22111 14.0662C7.48833 14.4209 6.67047 14.5619 5.86123 14.4732C5.05199 14.3846 4.2841 14.0697 3.64554 13.5648C3.00697 13.0598 2.52356 12.3852 2.25068 11.6182C1.97781 10.8512 1.92651 10.0229 2.10266 9.22806C2.27881 8.43326 2.67529 7.70416 3.24667 7.12428C3.81805 6.5444 4.54122 6.1372 5.33333 5.94933V8.83333C5.10606 9.00379 4.92613 9.22951 4.81063 9.48907C4.69513 9.74862 4.64789 10.0334 4.6734 10.3163C4.69891 10.5993 4.79633 10.871 4.9564 11.1057C5.11647 11.3404 5.33388 11.5303 5.58798 11.6574C5.84208 11.7844 6.12444 11.8444 6.40825 11.8316C6.69205 11.8189 6.96789 11.7338 7.20955 11.5844C7.45122 11.4351 7.65069 11.2264 7.78904 10.9783C7.92738 10.7301 8 10.4508 8 10.1667V2.5H10.722C10.8608 3.31894 11.2509 4.07442 11.8382 4.66175C12.4256 5.24909 13.1811 5.63919 14 5.778Z"
                            stroke="#6F6E77"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Tiktok
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://youtube.com"
                        target="_blank"
                        className="py-[6px] pr-[12px] pl-[34px] block hover:bg-backgroundGray relative w-full text-left"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                          className="absolute top-1/2 -translate-y-1/2 left-[12px]"
                        >
                          <path
                            d="M14.6667 3.17334C14 3.50001 13.3467 3.63268 12.6667 3.83334C11.9193 2.99001 10.8113 2.94334 9.74666 3.34201C8.68199 3.74068 7.98466 4.71534 7.99999 5.83334V6.50001C5.83666 6.55534 3.90999 5.57001 2.66666 3.83334C2.66666 3.83334 -0.121338 8.78868 5.33333 11.1667C4.08533 11.998 2.84066 12.5587 1.33333 12.5C3.53866 13.702 5.94199 14.1153 8.02266 13.5113C10.4093 12.818 12.3707 11.0293 13.1233 8.35001C13.3479 7.53512 13.4593 6.69325 13.4547 5.84801C13.4547 5.68201 14.4613 4.00001 14.6667 3.17268V3.17334Z"
                            stroke="#6F6E77"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Twitter
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://youtube.com"
                        target="_blank"
                        className="py-[6px] pr-[12px] pl-[34px] block hover:bg-backgroundGray relative w-full text-left"
                      >
                        <svg
                          className="absolute top-1/2 -translate-y-1/2 left-[12px]"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                        >
                          <path
                            d="M4.66667 7.16667V9.83333H6.66667V14.5H9.33334V9.83333H11.3333L12 7.16667H9.33334V5.83333C9.33334 5.65652 9.40358 5.48695 9.5286 5.36193C9.65363 5.2369 9.82319 5.16667 10 5.16667H12V2.5H10C9.11595 2.5 8.2681 2.85119 7.64298 3.47631C7.01786 4.10143 6.66667 4.94928 6.66667 5.83333V7.16667H4.66667Z"
                            stroke="#6F6E77"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Facebook
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://youtube.com"
                        target="_blank"
                        className="py-[6px] pr-[12px] pl-[34px]  block hover:bg-backgroundGray relative w-full text-left"
                      >
                        <svg
                          className="absolute top-1/2 -translate-y-1/2 left-[12px]"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                        >
                          <path
                            d="M6 10.5L10 6.5M7.33333 4.50004L7.642 4.14271C8.2672 3.51759 9.11513 3.16644 9.99924 3.1665C10.8833 3.16657 11.7312 3.51784 12.3563 4.14304C12.9814 4.76824 13.3326 5.61617 13.3325 6.50028C13.3325 7.38439 12.9812 8.23226 12.356 8.85737L12 9.16671M8.66666 12.5L8.40199 12.856C7.76949 13.4815 6.91585 13.8323 6.02633 13.8323C5.1368 13.8323 4.28316 13.4815 3.65066 12.856C3.3389 12.5477 3.09139 12.1807 2.92247 11.7761C2.75354 11.3715 2.66656 10.9374 2.66656 10.499C2.66656 10.0606 2.75354 9.62649 2.92247 9.2219C3.09139 8.81732 3.3389 8.45027 3.65066 8.142L3.99999 7.83333"
                            stroke="#6F6E77"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        hogehoge.com
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://youtube.com"
                        target="_blank"
                        className="py-[6px] pr-[12px] pl-[34px] block hover:bg-backgroundGray relative w-full text-left"
                      >
                        <svg
                          className="absolute top-1/2 -translate-y-1/2 left-[12px]"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                        >
                          <path
                            d="M6 10.5L10 6.5M7.33333 4.50004L7.642 4.14271C8.2672 3.51759 9.11513 3.16644 9.99924 3.1665C10.8833 3.16657 11.7312 3.51784 12.3563 4.14304C12.9814 4.76824 13.3326 5.61617 13.3325 6.50028C13.3325 7.38439 12.9812 8.23226 12.356 8.85737L12 9.16671M8.66666 12.5L8.40199 12.856C7.76949 13.4815 6.91585 13.8323 6.02633 13.8323C5.1368 13.8323 4.28316 13.4815 3.65066 12.856C3.3389 12.5477 3.09139 12.1807 2.92247 11.7761C2.75354 11.3715 2.66656 10.9374 2.66656 10.499C2.66656 10.0606 2.75354 9.62649 2.92247 9.2219C3.09139 8.81732 3.3389 8.45027 3.65066 8.142L3.99999 7.83333"
                            stroke="#6F6E77"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        foobar.com
                      </Link>
                    </li>
                  </ul>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>

        <p className="mt-[16px] text-title text-[16px] leading-snug ">{recipe.description}</p>
        <div className="flex gap-x-[16px] text-title pt-[14.17px] text-[16px] leading-snug">
          {recipe.chef && <Link href={`/chef/${recipe.chef.id}/recipes`}>{recipe.chef.displayName}</Link>}
          <p>
            <span className="font-bold">{recipe._count.favorites}</span> お気に入り
          </p>
        </div>

        <div className="mt-4">
          <FavoriteButton
            isFavoriting={recipe.isFavoriting}
            recipeId={recipe.id}
            refresh={() => router.refresh()}
            isLoggedIn={session !== null}
            onUnauthenticated={() => router.push("/favorite")}
          />
        </div>
      </div>

      {/* ナビゲーション */}
      <nav className="border-b-[1px] border-border">
        <ul className="flex text-title">
          <li className={`w-1/2 text-center text-[16px]  ${page === "steps" ? "font-bold border-b-2" : ""}`}>
            <Link href={`/recipe/${recipe.id}/steps`} className="block py-[10px]">
              作り方
            </Link>
          </li>
          <li className={`w-1/2 text-center text-[16px]  ${page === "ingredients" ? "font-bold border-b-2" : ""}`}>
            <Link href={`/recipe/${recipe.id}/ingredients`} className="block py-[10px]">
              材料
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default RecipeHero;
