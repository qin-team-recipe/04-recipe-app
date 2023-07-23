import Link from "next/link";
import Image from "next/image";
import { LoginScreen } from "../components/Auth/LoginScreen";
import { getServerSession } from "next-auth";
import { trpcClient } from "../utils/trpc";
import { RouterOutput } from "@/server/trpc/router";
import { HorizontalRecipeCard } from "../components/Recipes/HorizontalRecipeCard";

export const metadata = {
  title: "Favorite",
  description: "Generated by create next app",
};

type Chef = {
  id: string;
  displayName: string;
  profileImageUrl: string;
};

function ChefCard({ chef }: { chef: Chef }) {
  return (
    <li className="w-[68px] relative overflow-hidden flex-none">
      <Link href={`/chef/${chef.id}/recipes`}>
        <div className="relative w-[68px] h-[68px] object-cover rounded-[34px] overflow-hidden">
          <Image src={chef.profileImageUrl} alt="シェフの写真" fill />
        </div>

        <p className="text-[12px] mt-[4px] text-center line-clamp-1">{chef.displayName}</p>
      </Link>
    </li>
  );
}

type Recipe = RouterOutput["favoriteRecipes"][number];

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <li className="w-[calc(50%_-_6px)] h-auto relative">
      <Link href={`/recipe/${recipe.id}/steps`}>
        <Image
          src={recipe.imageUrl ?? "/images/top/recipes/recipe1.png"}
          alt="レシピの写真"
          width={173}
          height={173}
          style={{ width: "100%" }}
          className="aspect-square object-cover rounded-[16px]"
        />
        <div className="rounded-[16px] absolute top-[8px] right-[8px] py-[8px] pr-[8px] pl-[25px] text-white text-[15px] leading-none bg-[#040013]/[.48]">
          <span className="absolute top-1/2 left-[8px] -translate-y-1/2 w-[14px] h-[14px] mt-[1.3px]">
            <Image src="/images/top/recipes/favIcon.png" width={14} height={14} alt="vector icon" />
          </span>
          {recipe.favoriteCount}
        </div>
        <p className="text-title font-bold mt-[8px] text-[12px] line-clamp-2">{recipe.name}</p>
        <p className="text-[10px] mt-[4px] line-clamp-1">{recipe.author?.displayName}</p>
      </Link>
    </li>
  );
}

async function FavoriteContents() {
  const [followingChefs, newRecipes, favoriteRecipes] = await Promise.all([
    trpcClient.followingChefs.query(),
    trpcClient.chefsNewRecipes.query(),
    trpcClient.favoriteRecipes.query(),
  ]);

  return (
    <>
      {/* シェフ */}
      <section className=" pt-[20px] overflow-hidden">
        <h2 className="text-title font-bold text-[20px] px-[16px]">シェフ</h2>
        <ul className="flex gap-x-[16px] mt-[12px] w-screen  overflow-x-scroll md:w-full pl-[16px]">
          {followingChefs.map((chef) => (
            <ChefCard key={chef.id} chef={chef} />
          ))}
        </ul>
      </section>

      {/* 新着レシピ */}
      <section className="overflow-hidden pt-[48px]">
        <div className="flex center justify-between px-[16px]">
          <h2 className="text-[20px] font-bold text-title">新着レシピ</h2>
          <Link href="/new-recipes" className="font-bold text-[16px]">
            もっと見る
          </Link>
        </div>
        <ul className="flex gap-x-[16px] w-screen  overflow-x-scroll md:w-full pl-[15px]">
          {newRecipes.map((recipe) => (
            <HorizontalRecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </ul>
      </section>

      {/* お気に入りレシピ */}
      <section className="px-[16px] py-[48px]">
        <div className="flex center justify-between">
          <h2 className="text-[20px] font-bold text-title">お気に入りレシピ</h2>
        </div>
        <ul className="flex justify-between gap-y-[16px] gap-x-[12px] flex-wrap mt-[10px]">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </ul>
      </section>
    </>
  );
}

export default async function Favorite() {
  const session = await getServerSession();

  return (
    <>
      {/* ヘッダー */}
      <div className="flex justify-between px-[15px] border-b-[1px] border-border text-center text-title font-bold text-[20px] py-[12px]">
        <Link href="/settings">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 8H20M4 16H20" stroke="#1A1523" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <h1>お気に入り</h1>
        <Link href="/mypage">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M6.16797 18.849C6.41548 18.0252 6.92194 17.3032 7.61222 16.79C8.30249 16.2768 9.13982 15.9997 9.99997 16H14C14.8612 15.9997 15.6996 16.2774 16.3904 16.7918C17.0811 17.3062 17.5874 18.0298 17.834 18.855M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12ZM9 10C9 10.7956 9.31607 11.5587 9.87868 12.1213C10.4413 12.6839 11.2044 13 12 13C12.7956 13 13.5587 12.6839 14.1213 12.1213C14.6839 11.5587 15 10.7956 15 10C15 9.20435 14.6839 8.44129 14.1213 7.87868C13.5587 7.31607 12.7956 7 12 7C11.2044 7 10.4413 7.31607 9.87868 7.87868C9.31607 8.44129 9 9.20435 9 10Z"
              stroke="#1A1523"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      {session === null ? (
        <div>
          <Image
            src="/images/girlBakingCookie.png"
            width="200"
            height="200"
            alt="クッキーを焼く女の子"
            className="mx-auto"
            priority={true}
          />
          <LoginScreen />
        </div>
      ) : (
        <FavoriteContents />
      )}
    </>
  );
}
