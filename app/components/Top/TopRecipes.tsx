import { trpcCaller } from "@/server/trpc/router";
import Link from "next/link";
import { HorizontalRecipeCard } from "../Recipes/HorizontalRecipeCard";
import styles from "../../styles/noscrollbar.module.css";

export default async function TopRecipes() {
  const recipes = await trpcCaller.featuredRecipes();
  return (
    <section className="pt-[20px] pb-[48px] overflow-hidden">
      <div className="flex center justify-between px-[15px]">
        <h2 className="font-serif text-[20px] font-bold text-title">話題のレシピ</h2>
        {recipes.length > 5 && (
          <Link href="/search/recipe" className="font-bold text-[16px]">
            もっと見る
          </Link>
        )}
      </div>

      {recipes?.length === 0 ? (
        <p className="mt-[16px] text-title  pl-[15px]">話題のレシピがありません！</p>
      ) : (
        <ul className={`flex gap-x-[16px] w-screen  overflow-x-scroll md:w-full pl-[15px] ${styles.noscrollbar}`}>
          {recipes.slice(0, 5).map((recipe) => (
            <HorizontalRecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </ul>
      )}
    </section>
  );
}
