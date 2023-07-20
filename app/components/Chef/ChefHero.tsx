"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import "./styles.css";
import { BrandYoutube, BrandInstagram, DotsCircleHorizontal } from "tabler-icons-react";
import { FollowButton } from "./FollowButton";

type Props = {
  page: string;
  chef: {
    id: string;
    displayName: string;
    bio: string;
    followerCount: number;
    profileImageUrl: string;
    isFollowing: boolean;
  };
};

const ChefHero: FC<Props> = ({ page, chef }) => {
  const router = useRouter();

  return (
    <>
      {/* Chef詳細 */}
      <div className="px-[16px] pt-[16px] pb-[18.17px]">
        <div className="flex justify-between items-center">
          {/* Go back */}
          {/* ブラウザ戻るリンク */}
          <button onClick={() => router.back()}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_393_1908)">
                <path d="M5 12H19" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 12L11 18" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 12L11 6" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_393_1908">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
          {/* Links */}
          <div className="flex items-center justify-between gap-x-[12px]">
            <Link href="https://youtube.com" target="_blank">
              <BrandYoutube className="text-black" />
            </Link>
            <Link href="https://youtube.com" target="_blank">
              <BrandInstagram className="text-black" />
            </Link>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <DotsCircleHorizontal className="text-black" />
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

        <div className="flex justify-between items-center mt-[15px]">
          <div>
            <h1 className="font-bold text-title text-[27px]">{chef.displayName}</h1>
            <p className="text-title text-[14px]">{chef.id}</p>
          </div>
          <Image
            src={chef.profileImageUrl}
            alt="Picture of the chef"
            width={64}
            height={64}
            className="w-16 h-16 object-cover rounded-[32px]"
          />
        </div>

        {/* image */}
        <p className="mt-[16px] text-title text-[16px] leading-snug ">{chef.bio}</p>
        <div className="flex gap-x-[16px]">
          <p className="pt-[14.17px] text-[16px] leading-snug">
            <span className="font-bold">123</span> レシピ
          </p>
          <p className="pt-[14.17px] text-[16px] leading-snug">
            <span className="font-bold">{chef.followerCount}</span> フォロワー
          </p>
        </div>

        {/* フォローするボタン */}
        <div className="mt-4">
          {/* TODO: ログインしていない場合は、ログイン画面にリダイレクトする */}
          <FollowButton isFollowing={chef.isFollowing} chefId={chef.id} refresh={() => router.refresh()} />
        </div>
      </div>

      {/* ナビゲーション */}
      <nav className="border-b-[1px] border-border">
        <ul className="flex text-title">
          <li className={`w-1/2 text-center text-[16px]  ${page === "recipes" ? "font-bold border-b-2" : ""}`}>
            <Link href={`/chef/${chef.id}/recipes`} className="block py-[10px]">
              新着レシピ
            </Link>
          </li>
          <li className={`w-1/2 text-center text-[16px]  ${page === "hotrecipes" ? "font-bold border-b-2" : ""}`}>
            <Link href={`/chef/${chef.id}/hotrecipes`} className="block py-[10px]">
              人気レシピ
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default ChefHero;
