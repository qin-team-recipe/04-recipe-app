import { trpcCaller } from "@/server/trpc/router";
import { ChefCard } from "./ChefCard";

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
        {chefs.length === 0 ? (
          <p className=" text-title">シェフが見つかりませんでした！</p>
        ) : (
          chefs.map((chef) => <ChefCard key={chef.id} chef={chef} />)
        )}
      </ul>
    </section>
  );
}
