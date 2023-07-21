import { trpcCaller } from "@/server/trpc/router";
import Image from "next/image";
import Link from "next/link";

export default async function TopRecipes() {
  const recipes = await trpcCaller.recipes({});
  return (
    <section className="pt-[20px] pb-[48px] overflow-hidden">
      <div className="flex center justify-between px-[15px]">
        <h2 className="text-[20px] font-bold text-title">話題のレシピ</h2>
        <Link href="/search/recipe" className="font-bold text-[16px]">
          もっと見る
        </Link>
      </div>

      <ul className="flex gap-x-[16px] w-screen  overflow-x-scroll md:w-full pl-[15px]">
        {recipes.slice(0, 5).map((recipe) => (
          <li className="w-[160px] relative mt-[16px] flex-none" key={recipe.id}>
            <Link href={`/recipe/${recipe.id}/steps`}>
              <Image
                src={recipe.imageUrl ?? ""}
                alt={recipe.name}
                width={160}
                height={160}
                className="aspect-square object-cover rounded-2xl"
              />
              <div className="rounded-[16px] absolute top-[8px] right-[8px] py-[8px] pr-[8px] pl-[25px] text-white text-[15px] leading-none bg-[#040013]/[.48]">
                <span className="absolute top-1/2 left-[8px] -translate-y-1/2 w-[14px] h-[14px] mt-[1.3px]">
                  <Image src="/images/top/recipes/favIcon.png" width={14} height={14} alt="vector icon" />
                </span>
                1,234
              </div>
              <p className="text-title font-bold mt-[8px] text-[12px] line-clamp-1">{recipe.name}</p>
              <p className="text-[10px] mt-[4px] line-clamp-3">{recipe.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
