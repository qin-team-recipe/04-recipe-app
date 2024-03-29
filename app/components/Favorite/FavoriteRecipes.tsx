import { trpcClient } from "@/app/utils/trpc";
import { RecipeCard } from "../Recipes/RecipeCard";

export default async function FavoriteRecipes() {
  const favoriteRecipes = await trpcClient.favoriteRecipes.query();

  return (
    <section className="px-[16px] py-[48px]">
      <div className="flex center justify-between">
        <h2 className="text-[20px] font-bold text-title">お気に入りレシピ</h2>
      </div>

      {favoriteRecipes?.length === 0 ? (
        <p className="text-title mt-[12px]">まだレシピをお気に入りに追加していません！</p>
      ) : (
        <ul className="flex justify-between gap-y-[16px] gap-x-[12px] mt-[10px] flex-wrap">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </ul>
      )}
    </section>
  );
}
