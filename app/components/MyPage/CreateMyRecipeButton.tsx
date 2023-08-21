import Link from "next/link";

export default function CreateMyRecipeButton() {
  return (
    <Link
      href="/my-recipe/create"
      className="text-white bg-primary py-[8px] px-[12px] inline-block rounded-full fixed left-1/2 -translate-x-1/2 bottom-[81px] md:bottom-[24px]"
    >
      マイレシピを追加する
    </Link>
  );
}
