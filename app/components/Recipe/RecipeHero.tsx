"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "../../styles/dropdownMenuContent.module.css";
import { FavoriteButton } from "./FavoriteButton";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  BrandFacebook,
  BrandInstagram,
  BrandTiktok,
  BrandTwitter,
  BrandYoutube,
  DotsCircleHorizontal,
  Link as LinkIcon,
} from "tabler-icons-react";
import { RecipeLinks, formatSocialLinks } from "@/app/utils/social-link";

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
    links: { url: string }[];
  };
};

/**
 * Youtube、Instagram以外のURLがあるか
 */
function hasOtherLinks(links: RecipeLinks): boolean {
  return (
    links.tiktok !== undefined ||
    links.twitter !== undefined ||
    links.facebook !== undefined ||
    links.websites.length > 0
  );
}

const RecipeHero: FC<Props> = ({ page, recipe }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const recipeLinks = formatSocialLinks(recipe.links);

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
            {recipeLinks.youtube && (
              <a href={recipeLinks.youtube.url} target="_blank">
                <BrandYoutube className="text-black" />
              </a>
            )}
            {recipeLinks.instagram && (
              <a href={recipeLinks.instagram.url} target="_blank">
                <BrandInstagram className="text-black" />
              </a>
            )}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                {hasOtherLinks(recipeLinks) && <DotsCircleHorizontal className="text-black" />}
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content sideOffset={5} align="end" className={`{${styles.DropdownMenuContent} w-[260px]`}>
                  <ul>
                    <li>
                      {recipeLinks.tiktok && (
                        <a
                          href={recipeLinks.tiktok.url}
                          target="_blank"
                          className="py-[6px] pr-[12px] pl-[34px] block hover:bg-backgroundGray relative"
                        >
                          <BrandTiktok size={16} className="absolute top-1/2 -translate-y-1/2 left-[12px]" />
                          Tiktok
                        </a>
                      )}
                    </li>
                    <li>
                      {recipeLinks.twitter && (
                        <a
                          href={recipeLinks.twitter.url}
                          target="_blank"
                          className="py-[6px] pr-[12px] pl-[34px] block hover:bg-backgroundGray relative w-full text-left"
                        >
                          <BrandTwitter size={16} className="absolute top-1/2 -translate-y-1/2 left-[12px]" />
                          Twitter
                        </a>
                      )}
                    </li>
                    <li>
                      {recipeLinks.facebook && (
                        <a
                          href={recipeLinks.facebook.url}
                          target="_blank"
                          className="py-[6px] pr-[12px] pl-[34px] block hover:bg-backgroundGray relative w-full text-left"
                        >
                          <BrandFacebook size={16} className="absolute top-1/2 -translate-y-1/2 left-[12px]" />
                          Facebook
                        </a>
                      )}
                    </li>
                    {recipeLinks.websites.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.url}
                          target="_blank"
                          className="py-[6px] pr-[12px] pl-[34px]  block hover:bg-backgroundGray relative w-full text-left overflow-hidden text-ellipsis"
                        >
                          <LinkIcon size={16} className="absolute top-1/2 -translate-y-1/2 left-[12px]" />
                          {/* TODO: サイト名を表示する？ */}
                          {link.url}
                        </a>
                      </li>
                    ))}
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

        {/* フォローボタン */}
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
