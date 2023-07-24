import Image from "next/image";
import Link from "next/link";

type Recipe = {
  id: string;
  name: string;
  imageUrl: string | null;
  favoriteCount: number;
  author?: {
    displayName: string;
  } | null;
  chef?: {
    displayName: string;
  } | null;
};

export function HorizontalRecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <li className="w-[160px] relative mt-[16px] flex-none" key={recipe.id}>
      <Link href={`/recipe/${recipe.id}/steps`}>
        <div className="relative object-cover rounded-2xl w-[160px] h-[160px] overflow-hidden">
          <Image src={recipe.imageUrl ?? ""} alt={recipe.name} fill />
        </div>

        <div className="rounded-[16px] absolute top-[8px] right-[8px] py-[8px] pr-[8px] pl-[25px] text-white text-[15px] leading-none bg-[#040013]/[.48]">
          <span className="absolute top-1/2 left-[8px] -translate-y-1/2 w-[14px] h-[14px] mt-[1.3px]">
            <Image src="/images/top/recipes/favIcon.png" width={14} height={14} alt="vector icon" />
          </span>
          {recipe.favoriteCount}
        </div>
        <p className="text-title font-bold mt-[8px] text-[12px] line-clamp-1">{recipe.name}</p>
        <p className="text-[10px] mt-[4px] line-clamp-3">{recipe.chef?.displayName || recipe.author?.displayName}</p>
      </Link>
    </li>
  );
}
