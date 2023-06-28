import Image from "next/image";
import Link from "next/link";

export default function AllRecipes({
  searchParams,
  recipes,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  recipes: {
    id: string;
    name: string;
    description: string;
    _count: {
      favorites: number;    
    };
  }[];
}) {

  return (
    <section className="pt-[20px] px-[15px] pb-[48px]">
      <h2 className=" text-title font-bold text-[20px]">
        {searchParams.q ? `「${searchParams.q}」で検索` : "話題のレシピ"}
      </h2>
      <ul className="flex justify-between gap-y-[16px] gap-x-[12px] mt-[10px] flex-wrap">
        {recipes.map((recipe) => (
          <li className="w-[calc(50%_-_6px)] h-auto relative" key={recipe.id}>
            <Link href={`/recipe/{recipe.id}/steps`}>
              <Image
                src="/images/top/recipes/recipe1.png"
                alt="シェフの写真"
                width={173}
                height={173}
                style={{ width: "100%", height: "auto" }}
              />
              <div className="rounded-[16px] absolute top-[8px] right-[8px] py-[8px] pr-[8px] pl-[25px] text-white text-[15px] leading-none bg-[#040013]/[.48]">
                <span className="absolute top-1/2 left-[8px] -translate-y-1/2 w-[14px] h-[14px] mt-[1.3px]">
                  <Image src="/images/top/recipes/favIcon.png" width={14} height={14} alt="vector icon" />
                </span>
                {recipe._count.favorites}
              </div>
              <p className="text-title font-bold mt-[8px] text-[12px]">{recipe.name}</p>
              <p className="text-[10px] mt-[4px] line-clamp-1">{recipe.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
