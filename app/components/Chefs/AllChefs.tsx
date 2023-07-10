import { RouterOutput, trpcCaller } from "@/server/trpc/router";
import Image from "next/image";
import Link from "next/link";

type Chef = RouterOutput["chefs"][number];

function ChefCard({ chef }: { chef: Chef }) {
  return (
    <li>
      <Link href="/chef/1/recipes" className="flex gap-x-[16px]">
        <Image
          className="w-[88px] flex-none h-[116px] rounded-[16px] overflow-hidden"
          src={chef.profileImageUrl}
          alt="シェフの写真"
          width={88}
          height={116}
        />
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

export default async function AllChefs({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search = Array.isArray(searchParams.q) ? searchParams.q[0] : searchParams.q;
  const chefs = await trpcCaller.chefs({ search });

  return (
    <section className="pt-[20px] px-[15px] pb-[48px]">
      <h2 className=" text-title font-bold text-[20px]">
        {searchParams.q ? `「${searchParams.q}」で検索` : "シェフ一覧"}
      </h2>
      <ul className="flex flex-col gap-y-[20px] mt-[10px]">
        {chefs.map((chef) => (
          <ChefCard key={chef.id} chef={chef} />
        ))}
      </ul>
    </section>
  );
}
