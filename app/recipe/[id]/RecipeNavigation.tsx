import Link from "next/link";

export function RecipeNavigation({ page, recipeId }: { recipeId: string; page: "steps" | "ingredients" }) {
  return (
    <nav className="border-b-[1px] border-border">
      <ul className="flex text-title">
        <li className={`w-1/2 text-center text-[16px]  ${page === "steps" ? "font-bold border-b-2" : ""}`}>
          <Link href={`/recipe/${recipeId}/steps`} className="block py-[10px]">
            作り方
          </Link>
        </li>
        <li className={`w-1/2 text-center text-[16px]  ${page === "ingredients" ? "font-bold border-b-2" : ""}`}>
          <Link href={`/recipe/${recipeId}/ingredients`} className="block py-[10px]">
            材料
          </Link>
        </li>
      </ul>
    </nav>
  );
}
