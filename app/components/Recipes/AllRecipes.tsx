import { trpcCaller } from "@/server/trpc/router";
import { RecipeCard } from "./RecipeCard";

export default async function AllRecipes({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search = Array.isArray(searchParams.q) ? searchParams.q[0] : searchParams.q;
  const recipes = await trpcCaller.recipes({ search });

  return (
    <section className="pt-[20px] px-[15px] pb-[48px]">
      <h2 className="text-title font-bold text-[20px]">
        {searchParams.q ? `「${searchParams.q}」で検索` : "話題のレシピ"}
      </h2>

      {recipes?.length === 0 ? (
        <p className="text-title mt-[10px]">レシピが見つかりませんでした！</p>
      ) : (
        <ul className="flex justify-between gap-y-[16px] gap-x-[12px] mt-[10px] flex-wrap">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </ul>
      )}
    </section>
  );
}
