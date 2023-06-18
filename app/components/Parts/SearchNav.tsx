import Link from "next/link";
import { FC } from "react";

type Props = {
  page: string;
};

// className = {`w-1/2 text-center text-[16px]  ${page === "recipes" ? "font-bold border-b-2" : ""}`}

const SearchNav: FC<Props> = ({ page }) => {
  return (
    <nav className="border-b-[1px] border-border">
      <ul className="flex text-title">
        <li className="w-1/2 text-center text-[16px] ">
          <Link
            href="/search/recipe"
            className={`block py-[10px] ${page === "recipes" ? "font-bold border-b-[2px]" : ""} `}
          >
            レシピ
          </Link>
        </li>
        <li className="w-1/2 text-center text-[16px] ">
          <Link
            href="/search/chef"
            className={`block py-[10px] ${page === "chefs" ? "font-bold border-b-[2px]" : ""} `}
          >
            シェフ
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SearchNav;
