import Link from "next/link";

export function ChefNavigation({ page, chefId }: { chefId: string; page: "recipes" | "hotrecipes" }) {
  return (
    <nav className="border-b-[1px] border-border">
      <ul className="flex text-title">
        <li className={`w-1/2 text-center text-[16px]  ${page === "recipes" ? "font-bold border-b-2" : ""}`}>
          <Link href={`/chef/${chefId}/recipes`} className="block py-[10px]">
            新着レシピ
          </Link>
        </li>
        <li className={`w-1/2 text-center text-[16px]  ${page === "hotrecipes" ? "font-bold border-b-2" : ""}`}>
          <Link href={`/chef/${chefId}/hotrecipes`} className="block py-[10px]">
            人気レシピ
          </Link>
        </li>
      </ul>
    </nav>
  );
}
