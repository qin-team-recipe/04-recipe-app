import { trpcCaller } from "@/server/trpc/router";
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
          ))}
        </ul>
      )}
    </section>
  );
}
