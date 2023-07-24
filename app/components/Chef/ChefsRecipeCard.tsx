import Image from "next/image";
import Link from "next/link";

type Recipe = {
  id: string;
  name: string;
  imageUrl: string | null;
  favoriteCount: number;
  description: string;
};

export function ChefsRecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <li key={recipe.id} className="w-[calc(50%_-_6px)] h-auto relative">
      <Link href={`/recipe/${recipe.id}/steps`}>
        <div className="relative w-full aspect-square object-cover rounded-2xl overflow-hidden">
          <Image src={recipe.imageUrl ?? ""} alt="レシピの写真" fill />
        </div>
        <div className="rounded-[16px] absolute top-[8px] right-[8px] py-[8px] pr-[8px] pl-[25px] text-white text-[15px] leading-none bg-[#040013]/[.48]">
          <span className="absolute top-1/2 left-[8px] -translate-y-1/2 w-[14px] h-[14px] mt-[1.3px]">
            <Image src="/images/top/recipes/favIcon.png" width={14} height={14} alt="vector icon" />
          </span>
          {recipe.favoriteCount}
        </div>
        <p className="text-title font-bold mt-[8px] text-[12px] line-clamp-2">{recipe.name}</p>
        <p className="text-[10px] mt-[4px] line-clamp-1">{recipe.description}</p>
      </Link>
    </li>
  );
}
