import { trpcCaller } from "@/server/trpc/router";
import Image from "next/image";
import Link from "next/link";

type Recipe = {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  favoriteCount: number;
};

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <li className="w-[calc(50%_-_6px)] h-auto relative">
      <Link href={`/recipe/${recipe.id}/steps`}>
        <Image
          src={recipe.imageUrl ?? ""}
          alt="レシピの写真"
          width={173}
          height={173}
          style={{ width: "100%", height: "auto" }}
        />
        <div className="rounded-[16px] absolute top-[8px] right-[8px] py-[8px] pr-[8px] pl-[25px] text-white text-[15px] leading-none bg-[#040013]/[.48]">
          <span className="absolute top-1/2 left-[8px] -translate-y-1/2 w-[14px] h-[14px] mt-[1.3px]">
            <Image src="/images/top/recipes/favIcon.png" width={14} height={14} alt="vector icon" />
          </span>
          {recipe.favoriteCount}
        </div>
        <p className="text-title font-bold mt-[8px] text-[12px]">{recipe.name}</p>
        <p className="text-[10px] mt-[4px]">{recipe.description}</p>
      </Link>
    </li>
  );
}

export default async function AllRecipes({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search = Array.isArray(searchParams.q) ? searchParams.q[0] : searchParams.q;
  const recipes = await trpcCaller.recipes({ search });

  return (
    <section className="pt-[20px] px-[15px] pb-[48px]">
      <h2 className=" text-title font-bold text-[20px]">
        {searchParams.q ? `「${searchParams.q}」で検索` : "話題のレシピ"}
      </h2>
      <ul className="flex justify-between gap-y-[16px] gap-x-[12px] mt-[10px] flex-wrap">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </section>
  );
}
