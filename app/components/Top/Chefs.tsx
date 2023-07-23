import { trpcCaller } from "@/server/trpc/router";
import Image from "next/image";
import Link from "next/link";
import { ChefCard } from "../Chefs/ChefCard";

export default async function Chefs() {
  const chefs = await trpcCaller.chefs({});

  return (
    <section className="pt-[20px] px-[15px] pb-[48px]">
      <div className="flex center justify-between">
        <h2 className="text-[20px] font-bold text-title">シェフ</h2>
        {chefs.length > 5 && (
          <Link href="/search/chef" className="font-bold text-[16px]">
            もっと見る
          </Link>
        )}
      </div>
      {chefs.length === 0 ? (
        <p className="mt-[16px] text-title">シェフがいません！</p>
      ) : (
        <ul className="mt-[16px] flex flex-col gap-y-[20px]">
          {chefs.slice(0, 4).map((chef) => (
            <ChefCard key={chef.id} chef={chef} />
            // <li className="mt-[25px]" key={chef.id}>
            //   <Link href={`/chef/${chef.id}/recipes`} className="flex gap-x-[16px]">
            //     <div className="relative w-[88px] h-[116px] flex-none rounded-[16px] overflow-hidden ">
            //       <Image
            //         src={chef.profileImageUrl}
            //         alt={chef.displayName}
            //         fill
            //       />
            //     </div>

            //     <div>
            //       <p className="text-[18px] font-bold text-title">{chef.displayName}</p>
            //       <p className="text-[14px] mt-[5px] line-clamp-3">{chef.bio}</p>
            //       <p className="text-[14px] mt-[5px] pl-[22px] relative leading-[16px]">
            //         <span className="absolute left-0 top-0">
            //           <Image
            //             src="/images/top/chefs/tabler-icon-tools-kitchen-2.png"
            //             alt="table icon"
            //             width={16}
            //             height={16}
            //           />
            //         </span>
            //         {chef.recipeCount} レシピ
            //       </p>
            //     </div>
            //   </Link>
            // </li>
          ))}
        </ul>
      )}
    </section>
  );
}
