import Link from "next/link";
import { FC } from "react";

type Props = {
  page: string;
  searchParams: { [key: string]: string | string[] | undefined };
};

const SearchNav: FC<Props> = ({ page, searchParams }) => {
  return (
    <nav className="border-b-[1px] border-border">
      <ul className="flex text-title">
        <li className="w-1/2 text-center text-[16px] ">
          <Link
            href={searchParams.q ? `/search/recipe?q=${searchParams.q}` : "/search/recipe"}
            className={`block py-[10px] ${page === "recipe" ? "font-bold border-b-[2px]" : ""} `}
          >
            レシピ
          </Link>
        </li>
        <li className="w-1/2 text-center text-[16px] ">
          <Link
            href={searchParams.q ? `/search/chef?q=${searchParams.q}` : "/search/chef"}
            className={`block py-[10px] ${page === "chef" ? "font-bold border-b-[2px]" : ""} `}
          >
            シェフ
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SearchNav;
