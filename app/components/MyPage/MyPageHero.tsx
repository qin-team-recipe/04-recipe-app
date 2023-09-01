"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BrandYoutube, BrandInstagram, DotsCircleHorizontal, ArrowLeft, Copy, Pencil } from "tabler-icons-react";
// import { useSession } from "next-auth/react";
import styles from "../../styles/dropdownMenuContent.module.css";
import Link from "next/link";
import { toast } from "react-toastify";

type Props = {
  user: {
    id: string;
    displayName: string;
    bio?: string;
    followerCount: number;
    recipeCount: number;
    profileImageUrl?: string;
    links?: {
      youtube?: { url: string; siteName: string };
      instagram?: { url: string; siteName: string };
    };
  };
  userId: string;
};

const onClickClipboardHandler = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    await toast.success("クリップボードにコピーしました！");
  } catch (error) {
    await toast.success("コピーに失敗しました。");
  }
};

const MyPageHero: FC<Props> = ({ user, userId }) => {
  const router = useRouter();
  // const { data: session } = useSession();

  return (
    <>
      <div className="px-[16px] pt-[16px] pb-[18.17px]">
        <div className="flex justify-between items-center">
          {/* お気にいりページに戻る */}
          <Link href="/favorite">
            <ArrowLeft size={24} strokeWidth={1.5} color={"black"} />
          </Link>

          {/* Links */}
          <div className="flex items-center justify-between gap-x-[12px]">
            {user.links?.youtube && (
              <a href={user.links.youtube.url} target="_blank">
                <BrandYoutube className="text-black" />
              </a>
            )}
            {user.links?.instagram && (
              <a href={user.links.instagram.url} target="_blank">
                <BrandInstagram className="text-black" />
              </a>
            )}

            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <DotsCircleHorizontal className="text-black" />
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content sideOffset={5} align="end" className={`${styles.DropdownMenuContent} w-[260px]`}>
                  <DropdownMenu.Item>
                    <a
                      className="py-[6px] pr-[12px] pl-[34px] block hover:bg-backgroundGray relative"
                      href={`/mypage/${userId}/edit/`}
                    >
                      <Pencil
                        size={16}
                        strokeWidth={1.5}
                        color={"#6F6E77"}
                        className="absolute top-1/2 -translate-y-1/2 left-[12px]"
                      />
                      プロフィールを編集する
                    </a>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item>
                    <button
                      className="py-[6px] pr-[12px] pl-[34px] block hover:bg-backgroundGray relative w-full text-left"
                      onClick={() =>
                        onClickClipboardHandler(`https://04-qin-recipe-app.vercel.app/mypage/${userId}/recipes`)
                      }
                    >
                      <Copy
                        size={16}
                        strokeWidth={1.5}
                        color={"#6F6E77"}
                        className="absolute top-1/2 -translate-y-1/2 left-[12px]"
                      />
                      URLをコピーする
                    </button>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>

        <div className="flex justify-between items-center mt-[15px]">
          <div>
            <h1 className="font-bold text-title text-[27px]">{user.displayName}</h1>
            <p className="text-title text-[14px]">{user.id}</p>
          </div>
          {user.profileImageUrl && (
            <Image
              src={user.profileImageUrl}
              alt="Picture of the chef"
              width={64}
              height={64}
              className="w-16 h-16 object-cover rounded-[32px]"
            />
          )}
        </div>

        {user.bio && <p className="mt-[16px] text-title text-[16px] leading-snug ">{user.bio}</p>}

        <div className="flex gap-x-[16px]">
          <p className="pt-[14.17px] text-[16px] leading-snug">
            <span className="font-bold">{user.recipeCount}</span> レシピ
          </p>
          <p className="pt-[14.17px] text-[16px] leading-snug">
            <span className="font-bold">{user.followerCount}</span> フォロワー
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link
            href={`/mypage/${userId}/edit`}
            className="block w-full py-[8px] px-[12px] rounded-[4px] text-[14px] leading-[17px] text-title border border-text"
          >
            プロフィールを編集
          </Link>
        </div>
      </div>
    </>
  );
};

export default MyPageHero;
