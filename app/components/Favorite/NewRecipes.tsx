import { trpcClient } from "@/app/utils/trpc";
import Link from "next/link";
import { HorizontalRecipeCard } from "../Recipes/HorizontalRecipeCard";

export default async function NewRecipes() {
  const newRecipes = await trpcClient.chefsNewRecipes.query();

  return (
    <section className="overflow-hidden pt-[48px]">
      <div className="flex center justify-between px-[16px]">
        <h2 className="text-[20px] font-bold text-title">新着レシピ</h2>
        {newRecipes.length > 5 && (
          <Link href="/new-recipes" className="font-bold text-[16px]">
            もっと見る
          </Link>
        )}
      </div>
      <ul className="flex gap-x-[16px] w-screen  overflow-x-scroll md:w-full pl-[15px]">
        {newRecipes.length === 0 ? (
          <p className="mt-[16px] text-title">新着レシピがありません！</p>
        ) : (
          newRecipes.slice(0, 5).map((recipe) => <HorizontalRecipeCard key={recipe.id} recipe={recipe} />)
        )}
      </ul>
    </section>
  );
}