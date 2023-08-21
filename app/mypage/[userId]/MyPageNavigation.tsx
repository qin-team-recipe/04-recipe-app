import Link from "next/link";

export function MyPageNavigation({ page, userId }: { userId: string; page: "recipes" | "hotrecipes" }) {
  return (
    <nav className="border-b-[1px] border-border">
      <ul className="flex text-title">
        <li className={`w-1/2 text-center text-[16px]  ${page === "recipes" ? "font-bold border-b-2" : ""}`}>
          <Link href={`/mypage/${userId}/recipes`} className="block py-[10px]">
            新着レシピ
          </Link>
        </li>
        <li className={`w-1/2 text-center text-[16px]  ${page === "hotrecipes" ? "font-bold border-b-2" : ""}`}>
          <Link href={`/mypage/${userId}/hotrecipes`} className="block py-[10px]">
            人気レシピ
          </Link>
        </li>
      </ul>
    </nav>
  );
}
