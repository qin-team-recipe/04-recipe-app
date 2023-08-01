"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  BrandYoutube,
  BrandInstagram,
  DotsCircleHorizontal,
  BrandFacebook,
  BrandTwitter,
  BrandTiktok,
  Link as LinkIcon,
} from "tabler-icons-react";
import { FollowButton } from "./FollowButton";
import { useSession } from "next-auth/react";
import { ChefLinks, formatSocialLinks } from "@/app/utils/social-link";
import styles from "../../styles/dropdownMenuContent.module.css";

type Props = {
  chef: {
    id: string;
    displayName: string;
    bio: string;
    followerCount: number;
    recipeCount: number;
    profileImageUrl: string;
    isFollowing: boolean;
    links: { url: string; siteName: string }[];
  };
};

/**
 * Twitter、Instagram以外のリンクが存在するか
 */
function hasOtherLinks(links: ChefLinks) {
  return (
    links.tiktok !== undefined ||
    links.twitter !== undefined ||
    links.facebook !== undefined ||
    links.websites.length > 0
  );
}

const ChefHero: FC<Props> = ({ chef }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const chefLinks = formatSocialLinks(chef.links);

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
            {chefLinks.youtube && (
              <a href={chefLinks.youtube.url} target="_blank">
                <BrandYoutube className="text-black" />
              </a>
            )}
            {chefLinks.instagram && (
              <a href={chefLinks.instagram.url} target="_blank">
                <BrandInstagram className="text-black" />
              </a>
            )}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                {hasOtherLinks(chefLinks) && <DotsCircleHorizontal className="text-black" />}
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content sideOffset={5} align="end" className={`{${styles.DropdownMenuContent} w-[260px]`}>
                  <ul>
                    <li>
                      {chefLinks.tiktok && (
                        <a
                          className="py-[6px] pr-[12px] pl-[34px] block hover:bg-backgroundGray relative"
                          target="_blank"
                          href={chefLinks.tiktok.url}
                        >
                          <BrandTiktok size={16} className="absolute top-1/2 -translate-y-1/2 left-[12px]" />
                          Tiktok
                        </a>
                      )}
                    </li>
                    <li>
                      {chefLinks.twitter && (
                        <a
                          href={chefLinks.twitter.url}
                          target="_blank"
                          className="py-[6px] pr-[12px] pl-[34px] block hover:bg-backgroundGray relative w-full text-left"
                        >
                          <BrandTwitter size={16} className="absolute top-1/2 -translate-y-1/2 left-[12px]" />
                          Twitter
                        </a>
                      )}
                    </li>
                    <li>
                      {chefLinks.facebook && (
                        <a
                          href={chefLinks.facebook.url}
                          target="_blank"
                          className="py-[6px] pr-[12px] pl-[34px] block hover:bg-backgroundGray relative w-full text-left"
                        >
                          <BrandFacebook size={16} className="absolute top-1/2 -translate-y-1/2 left-[12px]" />
                          Facebook
                        </a>
                      )}
                    </li>
                    {chefLinks.websites.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.url}
                          target="_blank"
                          className="py-[6px] pr-[12px] pl-[34px]  block hover:bg-backgroundGray relative w-full text-left overflow-hidden text-ellipsis"
                        >
                          <LinkIcon size={16} className="absolute top-1/2 -translate-y-1/2 left-[12px]" />
                          {link.siteName}
                        </a>
                      </li>
                    ))}
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
            <span className="font-bold">{chef.recipeCount}</span> レシピ
          </p>
          <p className="pt-[14.17px] text-[16px] leading-snug">
            <span className="font-bold">{chef.followerCount}</span> フォロワー
          </p>
        </div>

        {/* フォローするボタン */}
        <div className="mt-4">
          <FollowButton
            isFollowing={chef.isFollowing}
            chefId={chef.id}
            refresh={() => router.refresh()}
            isLoggedIn={session !== null}
            onUnauthenticated={() => router.push("/favorite")}
          />
        </div>
      </div>
    </>
  );
};

export default ChefHero;
