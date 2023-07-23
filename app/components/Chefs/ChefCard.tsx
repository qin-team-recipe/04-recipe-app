import { RouterOutput } from "@/server/trpc/router";
import Image from "next/image";
import Link from "next/link";

type Chef = RouterOutput["chefs"][number];

export function ChefCard({ chef }: { chef: Chef }) {
  return (
    <li>
      <Link href={`/chef/${chef.id}/recipes`} className="flex gap-x-[16px]">
        <div className="relative w-[88px] h-[116px] flex-none rounded-[16px] overflow-hidden ">
          <Image src={chef.profileImageUrl} alt={chef.displayName} fill />
        </div>
        <div>
          <p className="text-[18px] font-bold text-title">{chef.displayName}</p>
          <p className="text-[14px] mt-[5px] line-clamp-3">{chef.bio}</p>
          <p className="text-[14px] mt-[5px] pl-[22px] relative leading-[16px]">
            <span className="absolute left-0 top-0">
              <Image src="/images/top/chefs/tabler-icon-tools-kitchen-2.png" alt="table icon" width={16} height={16} />
            </span>
            {chef.recipeCount} レシピ
          </p>
        </div>
      </Link>
    </li>
  );
}
